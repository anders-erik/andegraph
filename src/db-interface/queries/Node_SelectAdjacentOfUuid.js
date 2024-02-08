const { getDb } = require('../../db/ErigraphDB');
let db = getDb();



async function Node_SelectAdjacentOfUuid(Uuid) {
    return new Promise((acc, rej) => {

        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

        	SELECT "Node".* FROM "Node"
			INNER JOIN "Edge"
			ON "Node"."Uuid" = "Edge"."Node2Uuid"
			WHERE
				"Edge"."Node1Uuid" = ?

            UNION

            SELECT "Node".* FROM "Node"
			INNER JOIN "Edge"
			ON "Node"."Uuid" = "Edge"."Node1Uuid"
			WHERE
				"Edge"."Node2Uuid" = ?
        ;`;


        db.all(queryString,
            [Uuid, Uuid],
            (err, rows) => {
               if (err) return rej(err);
               acc(rows);
           });

    });
}

module.exports = {
    Node_SelectAdjacentOfUuid,
}




