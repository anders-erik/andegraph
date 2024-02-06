
const { getDb } = require('../../db/ErigraphDB');
let db = getDb();


async function Text_Insert(textObject) {
    return new Promise((acc, rej) => {


        //codeObject.Uuid = newUuid();

        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

            INSERT INTO "Text" ("Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange", "TextContent", "Language", "IAmAuthor")
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                        
        ;`;

        db.all(queryString,
            [textObject.Uuid, textObject.Table, textObject.Type, textObject.Title, textObject.TimeCreated, textObject.TimeLastChange, textObject.TextContent, textObject.Language, textObject.IAmAuthor],
            (err, rows) => {
               if (err) return rej(err);

               acc(1);
           });

    });
}

module.exports = {
    Text_Insert,
}

