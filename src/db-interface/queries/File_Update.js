
const { getDb } = require('../../db/ErigraphDB');
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
                "TimeLastChange" = ?, 
                "Extension" = ?,
                "SizeBytes" = ?,
                "IAmAuthor" = ?
            WHERE 
                Uuid = ?
        
        ;`;


        db.all(queryString,
            [fileObject.Uuid, fileObject.Table, fileObject.Type, fileObject.Title, fileObject.TimeCreated, fileObject.TimeLastChange, fileObject.Extension, fileObject.SizeBytes, fileObject.IAmAuthor, fileObject.Uuid],
            (err, rows) => {
               if (err) return rej(err);

               acc(1);
               
           });

    });
}

module.exports = {
    File_Update,
}

