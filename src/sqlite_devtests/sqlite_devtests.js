const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const location = process.env.SQLITE_DB_LOCATION || './src/sqlite_devtests/sqlite_devtests.db';

let devtest_dbS;
console.log('sqlite_devtests.js');


function init() {
    console.log();
    console.log('sqlite_devtests.init()');
    


    const dirName = require('path').dirname(location);
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName, { recursive: true });
    }
    console.log(dirName);
    return new Promise((acc, rej) => {
        devtest_dbS = new sqlite3.Database(location, err => {
            if (err) return rej(err);

            if (process.env.NODE_ENV !== 'test')
                console.log(`Using sqlite database at ${location}`);

            console.log('Dev db init: ');
            
            devtest_dbS.run(
                'CREATE TABLE IF NOT EXISTS devTable (id INTEGER PRIMARY KEY AUTOINCREMENT, col2 varchar(255))',
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
        devtest_dbS.close(err => {
            if (err) rej(err);
            else acc();
        });
    });
}

async function createTable() {
    console.log('sqlite_devtests.createTable()');

    return new Promise((acc, rej) => {
        devtest_dbS.run(
            'CREATE TABLE IF NOT EXISTS devTable (id INTEGER PRIMARY KEY AUTOINCREMENT, col2 varchar(255));',
            (err, result) => {
                if (err) return rej(err);
            },
        );
        // this is needed. Otherwise program exits!!
        acc();
    });
}

async function addToTable() {
    console.log('sqlite_devtests.addToTable()');
    return new Promise((acc, rej) => {
        devtest_dbS.run(
            "INSERT INTO devTable (col2) values('col2value');",
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
    createTable,
    addToTable
};
