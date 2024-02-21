
const { getDb } = require('../../db/Db-v0.2.js');
let db = getDb();


async function Code_Update(codeObject) {
    return new Promise((acc, rej) => {



        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

            UPDATE "Code" 
            SET 
                "Uuid" = ?, 
                "Table" = ?, 
                "Type" = ?, 
                "Title" = ?, 
                "TimeCreated" = ?, 
                "TimeLastChange" = strftime('%s'), 
                "CodeContent" = ?
            WHERE 
                Uuid = ?
        
        ;`;


        db.all(queryString,
            [codeObject.Uuid, codeObject.Table, codeObject.Type, codeObject.Title, codeObject.TimeCreated, codeObject.CodeContent, codeObject.Uuid],
            (err, rows) => {
                if (err) return rej(err);

                acc(1);

            });

    });
}

module.exports = {
    Code_Update,
}

