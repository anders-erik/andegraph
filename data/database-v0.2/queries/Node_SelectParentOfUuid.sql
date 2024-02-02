.mode box --wrap 30
.timer on

SELECT "Node".* FROM "Node"
INNER JOIN "Edge"
ON "Node"."Uuid" = "Edge"."Node1Uuid"
WHERE
	"Edge"."Directed" = 1
AND
	"Edge"."Node2Uuid" = 9751
;


.timer off