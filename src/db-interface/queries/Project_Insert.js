
const { getDb } = require('../../db/Db-v0.2.js');
let db = getDb();


async function Project_Insert(codeObject) {
    return new Promise((acc, rej) => {


        //codeObject.Uuid = newUuid();

        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

            INSERT INTO "Project" ("Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange", "Goal")
            VALUES (?, ?, ?, ?, ?, ?, ?)
                        
        ;`;

        db.all(queryString,
            [codeObject.Uuid, codeObject.Table, codeObject.Type, codeObject.Title, codeObject.TimeCreated, codeObject.TimeLastChange, codeObject.Goal],
            (err, rows) => {
                if (err) return rej(err);

                acc(1);
            });

    });
}

module.exports = {
    Project_Insert,
}

