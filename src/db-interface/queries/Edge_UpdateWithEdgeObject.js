
const { getDb } = require('../../db/Db-v0.2.js');
let db = getDb();


async function Edge_UpdateWithEdgeObject(edgeObject) {
    return new Promise((acc, rej) => {


        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

            UPDATE "Edge" 
            SET 
                "Uuid" = ?, 
                "Node1Uuid" = ?, 
                "Node2Uuid" = ?, 
                "Directed" = ?, 
                "Type" = ?, 
                "Order" = ?, 
                "Path" = ?
            WHERE 
                Uuid = ?
        
        ;`;


        db.all(queryString,
            [edgeObject.Uuid, edgeObject.Node1Uuid, edgeObject.Node2Uuid, edgeObject.Directed, edgeObject.Type, edgeObject.Order, edgeObject.Path, edgeObject.Uuid],
            (err, rows) => {
                if (err) return rej(err);

                acc(1);

            });

    });
}

module.exports = {
    Edge_UpdateWithEdgeObject,
}

