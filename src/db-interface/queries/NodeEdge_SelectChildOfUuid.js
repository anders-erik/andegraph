const { getDb } = require('../../db/Db-v0.2.js');
const { dbNodeEdgesToObjects } = require('../utils/dbNodeEdgeToObject');

let db = getDb();



async function NodeEdge_SelectChildOfUuid(Uuid) {
	return new Promise((acc, rej) => {

		// Insert table name here bacause query builder does not accept variables for table names
		let queryString = `

		SELECT 
			"Node".*, 
			"Edge"."Uuid" AS edge_Uuid, 
			"Edge"."Node1Uuid" AS  edge_Node1Uuid,
			"Edge"."Node2Uuid" AS  edge_Node2Uuid,
			"Edge"."Directed" AS  edge_Directed,
			"Edge"."Type" AS  edge_Type,
			"Edge"."Order" AS  edge_Order,
			"Edge"."Path" AS  edge_Path
		FROM "Node"
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

				let nodeEdgeObjectRows = dbNodeEdgesToObjects(rows);

				acc(nodeEdgeObjectRows);
			});

	});
}

module.exports = {
	NodeEdge_SelectChildOfUuid,
}


