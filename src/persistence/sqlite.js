const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const location = process.env.SQLITE_DB_LOCATION || '/data/live/sources.db';

let db, dbAll, dbRun;
let asdf = 'asdas';

function init() {
    const dirName = require('path').dirname(location);
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName, { recursive: true });
    }

    return new Promise((acc, rej) => {
        console.log(asdf);
        db = new sqlite3.Database(location, err => {
            if (err) return rej(err);

            if (process.env.NODE_ENV !== 'test')
                console.log(`Using sqlite database at ${location}`);

            //console.log('Database Init: ');
            console.log(dirName);

            // Foreign Key not applying??
            // https://stackoverflow.com/questions/9937713/does-sqlite3-not-support-foreign-key-constraints
            // You need to enable foreign key ON EVERY QUERY, in order to fulfill backwards compatibility with sqlite 2.x
            // PRAGMA FOREIGN_keys = on;
            // 
            // I will for now, NOT be applying the constraints

            // CHANGED PLANS. I GUESS THIS WORKS??
            // https://github.com/TryGhost/node-sqlite3/issues/896
            db.get("PRAGMA foreign_keys = ON");

            db.run(
                `CREATE TABLE IF NOT EXISTS sources (
                    "id"	INTEGER,
                    "title"	varchar(255),
                    "url"	varchar(255),
                    "dateCreated"	varchar(16),
                    "hasFile"	INTEGER,
                    "fileType"	varchar(8),
                    "fileEnding"	varchar(8),
                    PRIMARY KEY("id" AUTOINCREMENT)
                );`,
                (err, result) => {
                    if (err) return rej(err);
                },
            );
            db.run( 
                `CREATE TABLE IF NOT EXISTS shards (
                    "id"	INTEGER,
	                "prompt"	varchar(255),
	                "fileType"	varchar(8),
	                "fileEnding"	varchar(8),
	                "sourceId"	INTEGER NOT NULL,
	                FOREIGN KEY("sourceId") REFERENCES "sources"("id"),
	                PRIMARY KEY("id" AUTOINCREMENT)
                );`, // FOREIGN KEY(sourceId) REFERENCES sources(id)
                (err, result) => {
                    if (err) return rej(err);
                },
            ); 
            db.run(
                `CREATE TABLE IF NOT EXISTS sourceReviewDates (
                    "id"	INTEGER,
	                "date"	varchar(255),
	                "completed"	INTEGER,
	                "sourceId"	INTEGER NOT NULL,
	                FOREIGN KEY("sourceId") REFERENCES "sources"("id"),
	                PRIMARY KEY("id" AUTOINCREMENT)
                );`, // FOREIGN KEY(sourceId) REFERENCES sources(id)
                (err, result) => {
                    if (err) return rej(err);
                },
            );
            // this is needed. Otherwise program exits!!
            acc();
        });
    });
}

async function teardown() {
    return new Promise((acc, rej) => {
        db.close(err => {
            if (err) rej(err);
            else acc();
        });
    });
}



// async function getItem(id) {
//     return new Promise((acc, rej) => {
//         db.all('SELECT * FROM todo_items WHERE id=?', [id], (err, rows) => {
//             if (err) return rej(err);
//             acc(
//                 rows.map(item =>
//                     Object.assign({}, item, {
//                         completed: item.completed === 1,
//                     }),
//                 )[0],
//             );
//         });
//     });
// }




async function queryString(string) {
    return new Promise((acc, rej) => {
        db.all(
            string,
            (err, rows) => {
                if (err) return rej(err);
                acc(rows);
            },
        );
        return 'query ok :)';
    });
}



async function storeSource() {
    return new Promise((acc, rej) => {
        db.run(
            "INSERT INTO sources (dateCreated, hasFile) values(DATE('now'), 0)",
            (err, rows)  => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}

async function updateSource(item) {
    return new Promise((acc, rej) => {
        db.run(
            'UPDATE sources SET id=?, title=?, url=?, dateCreated=? WHERE sources.id=?',
            [item.id, item.title, item.url, item.dateCreated, item.id],
            err => {
                if (err) return rej(err);
                acc();
            },
        );
        return 'query ok :)';
    });
}

async function getSources() {
    return new Promise((acc, rej) => {
        db.all('SELECT * FROM sources', (err, rows) => {
            if (err) return rej(err);
            acc(
                rows.map(item =>
                    Object.assign({}, item, {
                        completed: item.completed === 1,
                    }),
                ),
            );
        });
    });
}

async function getSource(id) {
    return new Promise((acc, rej) => {
        db.all('SELECT * FROM sources WHERE id=?', [id], (err, rows) => {
            if (err) return rej(err);
            acc(
                rows.map(item =>
                    Object.assign({}, item, {
                        completed: item.completed === 1,
                    }),
                ),
            );
        });
    });
}

async function deleteSource(id) {
    return new Promise((acc, rej) => {
        db.all('DELETE FROM sources WHERE id=?', [id], (err, rows) => {
            if (err) return rej(err);
            acc(
                rows.map(item =>
                    Object.assign({}, item, {
                        completed: item.completed === 1,
                    }),
                ),
            );
        });
    });
}


async function newShard() {
    return new Promise((acc, rej) => {
        db.run(
            "INSERT INTO shards (sourceId) values(1)",
            err => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}



module.exports = {
    init,
    teardown,
    queryString,
    storeSource,
    getSources,
    getSource,
    updateSource,
    deleteSource,
    newShard
};
