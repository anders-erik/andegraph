
const { getDb } = require('../../db/Db.js');
let db = getDb();


async function Edge_Insert(edgeObject) {
    return new Promise((acc, rej) => {


        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

            INSERT INTO "Edge" ("Uuid", "Node1Uuid", "Node2Uuid", "Directed", "Type", "Order", "Path")
            VALUES (?, ?, ?, ?, ?, ?, ?)
                        
        ;`;

        db.all(queryString,
            [edgeObject.Uuid, edgeObject.Node1Uuid, edgeObject.Node2Uuid, edgeObject.Directed, edgeObject.Type, edgeObject.Order, edgeObject.Path],
            (err, rows) => {
                if (err) return rej(err);

                acc(1);
            });

    });
}

module.exports = {
    Edge_Insert,
}

