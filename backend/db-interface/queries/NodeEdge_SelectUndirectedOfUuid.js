const { getDb } = require('../../db/Db.js');
const { dbNodeEdgesToObjects } = require('../utils/dbNodeEdgeToObject.js');
let db = getDb();



async function NodeEdge_SelectUndirectedOfUuid(Uuid) {
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
				"Edge"."Directed" = 0
			AND
				"Edge"."Node1Uuid" = ?

			UNION 
			
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
			ON "Node"."Uuid" = "Edge"."Node1Uuid"
			WHERE
				"Edge"."Directed" = 0
			AND
				"Edge"."Node2Uuid" = ?

        ;`;

		db.all(queryString,
			[Uuid, Uuid],
			(err, rows) => {
				if (err) return rej(err);

				let nodeEdgeObjectRows = dbNodeEdgesToObjects(rows);

				acc(nodeEdgeObjectRows);
			});

	});
}

module.exports = {
	NodeEdge_SelectUndirectedOfUuid,
}
