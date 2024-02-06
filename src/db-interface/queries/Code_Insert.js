const { newUuid } = require('../../utils/uuid-v0.2');
const { getDb } = require('../../db/ErigraphDB');
let db = getDb();


async function Code_Insert(codeObject) {
    return new Promise((acc, rej) => {


        //codeObject.Uuid = newUuid();

        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

            INSERT INTO "Code" ("Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange", "CodeContent")
            VALUES (?, ?, ?, ?, ?, ?, ?)
                        
        ;`;

        db.all(queryString,
            [codeObject.Uuid, codeObject.Table, codeObject.Type, codeObject.Title, codeObject.TimeCreated, codeObject.TimeLastChange, codeObject.CodeContent],
            (err, rows) => {
               if (err) return rej(err);

               // RETURN NEWLY CREATED OBJECT!
               acc(1);
           });

    });
}

module.exports = {
    Code_Insert,
}

