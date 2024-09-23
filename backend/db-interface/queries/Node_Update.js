
const { getDb } = require('../../db/Db-v0.2.js');
let db = getDb();


async function Node_Update(objectWithNodeInterface) {
    return new Promise((acc, rej) => {

        let nodeObject = {
            Uuid: objectWithNodeInterface.Uuid,
            Table: objectWithNodeInterface.Table,
            Type: objectWithNodeInterface.Type,
            Title: objectWithNodeInterface.Title,
            TimeCreated: objectWithNodeInterface.TimeCreated,
            TimeLastChange: objectWithNodeInterface.TimeLastChange,
        }


        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

            UPDATE "Node" 
            SET 
                "Uuid" = ?, 
                "Table" = ?, 
                "Type" = ?, 
                "Title" = ?, 
                "TimeCreated" = ?, 
                "TimeLastChange" = ?
            WHERE 
                Uuid = ?
        
        ;`;

        db.all(queryString,
            [nodeObject.Uuid, nodeObject.Table, nodeObject.Type, nodeObject.Title, nodeObject.TimeCreated, nodeObject.TimeLastChange, nodeObject.Uuid],
            (err, rows) => {
                if (err) return rej(err);

                acc(1);
            });

    });
}

module.exports = {
    Node_Update,
}

