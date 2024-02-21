const { getDb } = require('../../db/Db-v0.2.js');
const { emptyNode } = require('../../models/models');
let db = getDb();



async function Node_InsertEmpty() {
    return new Promise((acc, rej) => {

        let nodeObject = emptyNode();

        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

            INSERT INTO "Node" ("Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange")
            VALUES (?, ?, ?, ?, ?, ?)
            
        ;`;

        db.all(queryString,
            [nodeObject.Uuid, nodeObject.Table, nodeObject.Type, nodeObject.Title, nodeObject.TimeCreated, nodeObject.TimeLastChange],
            (err, rows) => {
                if (err) return rej(err);
                acc([nodeObject]);
            });

    });
}

module.exports = {
    Node_InsertEmpty,
}

