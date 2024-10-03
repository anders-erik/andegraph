
const { getDb } = require('../../db/Db.js');
let db = getDb();


async function Text_Update(codeObject) {
    return new Promise((acc, rej) => {



        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

            UPDATE "Text" 
            SET 
                "Uuid" = ?, 
                "Table" = ?, 
                "Type" = ?, 
                "Title" = ?, 
                "TimeCreated" = ?, 
                "TimeLastChange" = strftime('%s'), 
                "TextContent" = ?,
                "Language" = ?,
                "IAmAuthor" = ?
            WHERE 
                Uuid = ?
        
        ;`;


        db.all(queryString,
            [codeObject.Uuid, codeObject.Table, codeObject.Type, codeObject.Title, codeObject.TimeCreated, codeObject.TextContent, codeObject.Language, codeObject.IAmAuthor, codeObject.Uuid],
            (err, rows) => {
                if (err) return rej(err);

                acc(1);

            });

    });
}

module.exports = {
    Text_Update,
}

