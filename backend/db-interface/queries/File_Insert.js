
const { getDb } = require('../../db/Db.js');
let db = getDb();


async function File_Insert(fileObject) {
    return new Promise((acc, rej) => {


        //codeObject.Uuid = newUuid();

        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

            INSERT INTO "File" ("Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange", "Extension", "SizeBytes", "IAmAuthor")
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                        
        ;`;

        db.all(queryString,
            [fileObject.Uuid, fileObject.Table, fileObject.Type, fileObject.Title, fileObject.TimeCreated, fileObject.TimeLastChange, fileObject.Extension, fileObject.SizeBytes, fileObject.IAmAuthor],
            (err, rows) => {
                if (err) return rej(err);

                // RETURN NEWLY CREATED OBJECT!
                acc(1);
            });

    });
}

module.exports = {
    File_Insert,
}

