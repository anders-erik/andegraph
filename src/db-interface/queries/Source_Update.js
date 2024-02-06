
const { getDb } = require('../../db/ErigraphDB');
let db = getDb();


async function Source_Update(sourceObject) {
    return new Promise((acc, rej) => {


        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

            UPDATE "Source" 
            SET 
                "Uuid" = ?, 
                "Table" = ?, 
                "Type" = ?, 
                "Title" = ?, 
                "TimeCreated" = ?, 
                "TimeLastChange" = ?, 
                "Url" = ?,
                "IAmSource" = ?
            WHERE 
                Uuid = ?
        
        ;`;


        db.all(queryString,
            [sourceObject.Uuid, sourceObject.Table, sourceObject.Type, sourceObject.Title, sourceObject.TimeCreated, sourceObject.TimeLastChange, sourceObject.Url, sourceObject.IAmSource, sourceObject.Uuid],
            (err, rows) => {
               if (err) return rej(err);

               acc(1);
               
           });

    });
}

module.exports = {
    Source_Update,
}

