
DROP TABLE IF EXISTS Edge;
CREATE TABLE Edge (
	"Uuid" INTEGER PRIMARY KEY,
	"Node1Uuid" INTEGER NOT NULL, 
	"Node2Uuid" INTEGER NOT NULL, 
	"Directed" INTEGER NOT NULL,
	"Type" TEXT NOT NULL,
	"Path" TEXT DEFAULT '/' NOT NULL,

	FOREIGN KEY("Node1Uuid") REFERENCES Node("Uuid"),
	FOREIGN KEY("Node2Uuid") REFERENCES Node("Uuid")	
);

CREATE INDEX "IndexEdgeNode1Uuid" ON Edge("Node1Uuid");
CREATE INDEX "IndexEdgeNode2Uuid" ON Edge("Node2Uuid");
