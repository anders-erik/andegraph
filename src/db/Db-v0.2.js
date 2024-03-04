

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const dbLocationLegacy = process.env.GRAPH_DB_LOCATION;
const dbLocation = '/data/live/graph-v0.2-test.db';
const dbLocationTemp = '/data/live/graph-v0.2-temp.db';
let db = {};
// let r = 0;



const tableNames = [
    'CodeType',
    'Code',
    'FileType',
    'File',
    'SourceType',
    'Source',
    'TextType',
    'Text',

    'Event',
    'Equation',
    'Project',
    'Review',

    'NodeTable',
    'Node',
    'Edge'
]

function getDb() {
    return db;
}

async function initDB() {
    // r = Math.random();
    // console.log(r)

    // Legacy check
    if (process.env.NODE_ENV !== 'test') {
        //console.log(`Using sqlite database at ${dbLocation}`);
    }

    // console.log(1)
    // If the db-file does not exist, create new db
    if (!fs.existsSync(dbLocation)) {

        // TODO : on table-string errors the console informs me of an uncaught error,
        // effectively preventing me from unlinking the temp-db
        // I am yet to figure out how to resolving this issue...

        // Remove temporary db-file on error
        // NOT WOKRING. SE NOTE ABOVE!
        try {
            // console.log(2)
            console.log('No database found. Creating new.')
            await newDatabase();
            // console.log(3)
        } catch (error) {
            // console.log('|||||||||||||||||||||||||||||||||||||||||')
            fs.unlinkSync(dbLocationTemp);
            return new Error('No db and failed to create new db.')

        }
        // console.log(4)
    }

    // console.log(5)
    // Connect to Database
    try {
        console.log('Connecting to database at', dbLocation)
        // console.trace('Connecting to database at', dbLocation)
        let connectionPromise = await connectDB(dbLocation);
        console.log(connectionPromise)
    } catch (error) {
        throw error;
    }

    // console.log(6)

    // https://stackoverflow.com/questions/9937713/does-sqlite3-not-support-foreign-key-constraints
    // You need to enable foreign key ON EVERY QUERY, in order to fulfill backwards compatibility with sqlite 2.x
    // https://github.com/TryGhost/node-sqlite3/issues/896
    // I GUESS THIS WORKS?!
    db.get("PRAGMA foreign_keys = ON");

}




async function newDatabase() {

    return new Promise(async (resolve, reject) => {

        // Make sure owner is 'node' before connecting
        // TODO: I should really make sure its writable as well!
        console.log(21)
        try {
            let content = '';
            fs.writeFileSync(dbLocationTemp, content);
            fs.chownSync(dbLocationTemp, 1000, 1000);
            // file written successfully
        } catch (error) {
            return error;
        }

        console.log(22)
        // console.log('1')
        try {
            let connectionPromise = await connectDB(dbLocationTemp);
            console.log(connectionPromise)
        } catch (error) {
            return error;
        }

        // console.log('3')
        console.log(23)



        // https://stackoverflow.com/questions/9937713/does-sqlite3-not-support-foreign-key-constraints
        // You need to enable foreign key ON EVERY QUERY, in order to fulfill backwards compatibility with sqlite 2.x
        // https://github.com/TryGhost/node-sqlite3/issues/896
        // I GUESS THIS WORKS??
        db.get("PRAGMA foreign_keys = ON");



        // Create Tables
        try {
            console.log('231')
            let createTablePromise = await createTables();
            console.log('Tables ok? \n', createTablePromise)
            console.log('232')
        } catch (error) {
            console.log('createTables error')
            reject('error at create table call')
        }

        console.log(24)



        // Move db to 'real' db location
        try {

            await dbTeardown();

            fs.renameSync(dbLocationTemp, dbLocation);

            // console.log('1')

            let connectionPromise = await connectDB(dbLocation);
            console.log(connectionPromise)

        } catch (error) {
            return error;
        }
        console.log(25)

    });

}



async function connectDB(dbPath) {


    function DBConnectionPromise(resolve, reject) {
        db = new sqlite3.Database(dbPath, (error) => {
            if (error) {
                // console.log('2')
                return reject('Connection Failed');
            }
            else {
                // console.log('2')
                return resolve('Connection OK');
            }

        })
    }


    return new Promise(DBConnectionPromise);

}




async function createTables() {

    return new Promise(async (resolve, reject) => {

        let tableDir = __dirname + '/tables/';

        let filenames = fs.readdirSync(tableDir);

        //console.log(filenames)

        for (const tableName of tableNames) {
            let tablePath = tableDir + tableName + '.sql';
            let data;
            try {
                data = fs.readFileSync(tablePath, 'utf8');
            } catch (error) {
                reject('failed to read tablePath');
                return; // necessary to halt execution?!?!
            }

            try {
                let execTableStringPromise = await execTableString(data);
                console.log(execTableStringPromise, tableName);
                console.log('New Table from file : ', tablePath);

            } catch (error) {
                console.log('AAAAAAAAAAAAA')
                reject('failed to execute new table');
                return; // necessary to halt execution?!?!
            }



            //console.log(tablePath)
        }

        resolve('ok')

        console.log('DONE?')
        // console.log(__dirname)


    });



}


async function execTableString(tableString) {

    return new Promise((resolve, reject) => {

        try {

            db.exec(tableString, (firstParam) => {

                // If firstParam is not null, an error occured dring the sqlite call
                // https://github.com/TryGhost/node-sqlite3/wiki/API#execsql--callback

                //console.log("firstParam: ", typeof firstParam)
                if (firstParam != null) {
                    //throw new Error('Unable to run tableString: \n' + tableString);
                    reject('Unable to run tableString: \n' + tableString)
                }

                resolve('ok')
            })

        } catch (error) {
            //reject('Unable to run tableString: \n' + tableString)
        }

    });


}



// // let filenames = fs.readdirSync('/src/db/tables/CreateCode.sql');
// let tableDir = __dirname + '/tables/';

// let filenames = fs.readdirSync(tableDir );

// for (const filename of filenames){
//     console.log('a')
//     fs.readFile(tableDir + filename, 'utf8', function(err, data) {
//         if (err) throw err;

//         console.log('b')
//         db.run(data, (err, result) => {
//             if (err) throw err;
//             console.log('c')
//             console.log('ran table at : ', tableDir + filename);
//             console.log(typeof data)
//         },)

//         console.log(data)
//       });
// }
// console.log('d')
// console.log(filenames)
// // console.log(__dirname)













// connection = new sqlite3.Database(dbLocation, err => {




//     //console.log('Database Init: ');
//     //console.log(dirName);



//     connection.run(
//         `CREATE TABLE IF NOT EXISTS "nodes" (
//             "id"	INTEGER,
//             "dateCreated"	TEXT NOT NULL,
//             "title"	TEXT NOT NULL DEFAULT '',
//             "textContent"	TEXT NOT NULL DEFAULT '',
//             "elementType"	TEXT NOT NULL DEFAULT '',
//             "nodeType"	TEXT NOT NULL DEFAULT '',
//             "nodeTypeType"	TEXT NOT NULL DEFAULT '',
//             "url"	TEXT NOT NULL DEFAULT '',
//             "fileName"	TEXT NOT NULL DEFAULT '',
//             "fileExtension"	TEXT NOT NULL DEFAULT '',
//             PRIMARY KEY("id")
//         );`,
//         (err, result) => {
//             if (err) throw err;
//         },
//     );
//     connection.run(
//         `CREATE TABLE IF NOT EXISTS "edges" (
//             "id"	INTEGER,
//             "node1"	INTEGER NOT NULL,
//             "node2"	INTEGER NOT NULL,
//             "directed"	INTEGER NOT NULL,
//             "edgeOrder"	INTEGER DEFAULT '',
//             "edgePath"	TEXT DEFAULT '',
//             PRIMARY KEY("id")
//         );`, // FOREIGN KEY(sourceId) REFERENCES sources(id)
//         (err, result) => {
//             if (err) throw err;
//         },
//     );
//     connection.run(
//         `CREATE TABLE IF NOT EXISTS "reviewDates" (
//             "id"	INT,
//             "date"	TEXT,
//             "completed"	INT,
//             "nodeId"	INT,
//             PRIMARY KEY("id")
//         );`, // FOREIGN KEY(sourceId) REFERENCES sources(id)
//         (err, result) => {
//             if (err) throw err;
//         },
//     );

//     // this is needed. Otherwise program exits!!
//     //acc();
// });

async function dbTeardown() {
    return new Promise((acc, rej) => {
        db.close(err => {
            if (err) throw err;
            else acc();
        });
    });
}


module.exports = {
    db,
    initDB,
    dbTeardown,
    getDb
}



