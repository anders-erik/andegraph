
const { getDb } = require('../../db/ErigraphDB');
let db = getDb();


async function Source_Insert(sourceObject) {
    return new Promise((acc, rej) => {


        //codeObject.Uuid = newUuid();

        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

            INSERT INTO "Source" ("Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange", "Url", "IAmSource")
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                        
        ;`;

        db.all(queryString,
            [sourceObject.Uuid, sourceObject.Table, sourceObject.Type, sourceObject.Title, sourceObject.TimeCreated, sourceObject.TimeLastChange, sourceObject.Url, sourceObject.IAmSource],
            (err, rows) => {
               if (err) return rej(err);

               // RETURN NEWLY CREATED OBJECT!
               acc(1);
           });

    });
}

module.exports = {
    Source_Insert,
}

