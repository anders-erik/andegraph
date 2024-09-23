const { getDb } = require('../../db/Db-v0.2.js');
let db = getDb();



async function Node_SelectChildOfUuid(Uuid) {
    return new Promise((acc, rej) => {

        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

        	SELECT "Node".* FROM "Node"
			INNER JOIN "Edge"
			ON "Node"."Uuid" = "Edge"."Node2Uuid"
			WHERE
				"Edge"."Directed" = 1
			AND
				"Edge"."Node1Uuid" = ?
                    
        ;`;

        db.all(queryString,
            [Uuid],
            (err, rows) => {
                if (err) return rej(err);
                acc(rows);
            });

    });
}

module.exports = {
    Node_SelectChildOfUuid,
}




