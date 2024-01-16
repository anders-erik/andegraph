

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const dbLocation = process.env.GRAPH_DB_LOCATION || '/data/live/graph.db';

let connection;



connection = new sqlite3.Database(dbLocation, err => {
    if (err) return rej(err);

    if (process.env.NODE_ENV !== 'test')
        console.log(`Using sqlite database at ${dbLocation}`);

    //console.log('Database Init: ');
    //console.log(dirName);

    // Foreign Key not applying??
    // https://stackoverflow.com/questions/9937713/does-sqlite3-not-support-foreign-key-constraints
    // You need to enable foreign key ON EVERY QUERY, in order to fulfill backwards compatibility with sqlite 2.x
    // PRAGMA FOREIGN_keys = on;
    // 
    // I will for now, NOT be applying the constraints

    // CHANGED PLANS. I GUESS THIS WORKS??
    // https://github.com/TryGhost/node-sqlite3/issues/896
    connection.get("PRAGMA foreign_keys = ON");

    connection.run(
        `CREATE TABLE IF NOT EXISTS "nodes" (
            "id"	INTEGER,
            "dateCreated"	TEXT NOT NULL,
            "title"	TEXT NOT NULL DEFAULT '',
            "textContent"	TEXT NOT NULL DEFAULT '',
            "elementType"	TEXT NOT NULL DEFAULT '',
            "nodeType"	TEXT NOT NULL DEFAULT '',
            "nodeTypeType"	TEXT NOT NULL DEFAULT '',
            "url"	TEXT NOT NULL DEFAULT '',
            "fileName"	TEXT NOT NULL DEFAULT '',
            "fileExtension"	TEXT NOT NULL DEFAULT '',
            PRIMARY KEY("id")
        );`,
        (err, result) => {
            if (err) throw err;
        },
    );
    connection.run( 
        `CREATE TABLE IF NOT EXISTS "edges" (
            "id"	INTEGER,
            "node1"	INTEGER NOT NULL,
            "node2"	INTEGER NOT NULL,
            "directed"	INTEGER NOT NULL,
            "edgeOrder"	INTEGER DEFAULT '',
            "edgePath"	TEXT DEFAULT '',
            PRIMARY KEY("id")
        );`, // FOREIGN KEY(sourceId) REFERENCES sources(id)
        (err, result) => {
            if (err) throw err;
        },
    );
    connection.run( 
        `CREATE TABLE IF NOT EXISTS "reviewDates" (
            "id"	INT,
            "date"	TEXT,
            "completed"	INT,
            "nodeId"	INT,
            PRIMARY KEY("id")
        );`, // FOREIGN KEY(sourceId) REFERENCES sources(id)
        (err, result) => {
            if (err) throw err;
        },
    );
    
    // this is needed. Otherwise program exits!!
    //acc();
});

async function teardown() {
    return new Promise((acc, rej) => {
        connection.close(err => {
            if (err) throw err;
            else acc();
        });
    });
}


module.exports = {
    connection,
	teardown
}



