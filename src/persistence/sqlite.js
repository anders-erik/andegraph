const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const location = process.env.SQLITE_DB_LOCATION || '/data/sources.db';

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
            // You need to enable foreign key ON EVERY QUERY, in order to fulfill backwards compatible with sqlite 2.x
            // PRAGMA FOREIGN_keys = on;
            // 
            // I will for now, NOT be applying the constraints
            db.run(
                `CREATE TABLE IF NOT EXISTS sources (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    name varchar(255), 
                    url varchar(255), 
                    date varchar(255),
                    fileEnding varchar(255)
                );`,
                (err, result) => {
                    if (err) return rej(err);
                },
            );
            db.run( 
                `CREATE TABLE IF NOT EXISTS shards (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    name varchar(255), 
                    type varchar(255), 
                    content varchar(255), 
                    sourceId INTEGER
                    
                );`, // FOREIGN KEY(sourceId) REFERENCES sources(id)
                (err, result) => {
                    if (err) return rej(err);
                },
            ); 
            db.run(
                `CREATE TABLE IF NOT EXISTS sourceReviewDates (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    date varchar(255), 
                    sourceId INTEGER
                    
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

async function getItems() {
    return new Promise((acc, rej) => {
        db.all('SELECT * FROM todo_items', (err, rows) => {
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

async function getItem(id) {
    return new Promise((acc, rej) => {
        db.all('SELECT * FROM todo_items WHERE id=?', [id], (err, rows) => {
            if (err) return rej(err);
            acc(
                rows.map(item =>
                    Object.assign({}, item, {
                        completed: item.completed === 1,
                    }),
                )[0],
            );
        });
    });
}

async function storeItem(item) {
    return new Promise((acc, rej) => {
        db.run(
            'INSERT INTO todo_items (id, name, completed) VALUES (?, ?, ?)',
            [item.id, item.name, item.completed ? 1 : 0],
            err => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}

async function updateItem(id, item) {
    return new Promise((acc, rej) => {
        db.run(
            'UPDATE todo_items SET name=?, completed=? WHERE id = ?',
            [item.name, item.completed ? 1 : 0, id],
            err => {
                if (err) return rej(err);
                acc();
            },
        );
    });
} 

async function removeItem(id) {
    return new Promise((acc, rej) => {
        db.run('DELETE FROM todo_items WHERE id = ?', [id], err => {
            if (err) return rej(err);
            acc();
        });
    });
}

/* 
ADDED BY ANDERS-ERIK
*/
/* 
async function storeSource(item) {
    return new Promise((acc, rej) => {
        db.run(
            'INSERT INTO sources (id, name, url, date) VALUES (?, ?, ?, ?)',
            [item.id, item.name, item.url, item.date ],
            err => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}
 */

async function storeSource() {
    return new Promise((acc, rej) => {
        db.run(
            "INSERT INTO sources (date) values(DATE('now'))",
            err => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}

async function updateSource(item) {
    return new Promise((acc, rej) => {
        db.run(
            'UPDATE sources SET id=?, name=?, url=?, date=? WHERE sources.id=?',
            [item.id, item.name, item.url, item.date, item.id],
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

async function backupDatabase() {
    return new Promise((acc, rej) => {
        let unixTime = Math.floor(Date.now() / 1000);
        db.all('.backup /data/sql-backup/sources-asdf.db', (err, rows) => {
            if (err) return rej(err);
            acc();
        });
    });
}

module.exports = {
    init,
    teardown,
    getItems,
    getItem,
    storeItem,
    updateItem,
    removeItem,
    storeSource,
    getSources,
    getSource,
    updateSource,
    deleteSource,
    backupDatabase
};
