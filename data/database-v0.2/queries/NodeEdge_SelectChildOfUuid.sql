.mode box --wrap 30
.timer on

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
	"Edge"."Node1Uuid" = 372
;



.timer off

