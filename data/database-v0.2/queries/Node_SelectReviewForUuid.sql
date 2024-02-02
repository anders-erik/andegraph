.mode box --wrap 30
.timer on


SELECT "Node".* FROM "Node"
INNER JOIN "Edge"
ON "Node"."Uuid" = "Edge"."Node2Uuid"
WHERE
	"Edge"."Directed" = 0
AND
	"Edge"."Node1Uuid" = 106979190784
AND 
	"Node"."Table" = 'Review'
;


.timer off