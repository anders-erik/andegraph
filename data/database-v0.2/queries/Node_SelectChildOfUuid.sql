.mode box --wrap 30
.timer on


SELECT "Node".* FROM "Node"
INNER JOIN "Edge"
ON "Node"."Uuid" = "Edge"."Node2Uuid"
WHERE
	"Edge"."Directed" = 1
AND
	"Edge"."Node1Uuid" = 330
;


.timer off