
const { getDb } = require('../../db/Db-v0.2.js');
let db = getDb();


async function File_Update(fileObject) {
    return new Promise((acc, rej) => {



        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

            UPDATE "File" 
            SET 
                "Uuid" = ?, 
                "Table" = ?, 
                "Type" = ?, 
                "Title" = ?, 
                "TimeCreated" = ?, 
                "TimeLastChange" = strftime('%s'), 
                "Extension" = ?,
                "SizeBytes" = ?,
                "IAmAuthor" = ?
            WHERE 
                Uuid = ?
        
        ;`;


        db.all(queryString,
            [fileObject.Uuid, fileObject.Table, fileObject.Type, fileObject.Title, fileObject.TimeCreated, fileObject.Extension, fileObject.SizeBytes, fileObject.IAmAuthor, fileObject.Uuid],
            (err, rows) => {
                if (err) return rej(err);

                acc(1);

            });

    });
}

module.exports = {
    File_Update,
}

