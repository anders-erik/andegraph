DROP TABLE IF EXISTS Node;

CREATE TABLE Node (
	"Uuid" INTEGER PRIMARY KEY, 
	"Table" TEXT DEFAULT '' NOT NULL, 
	"Type" TEXT DEFAULT '' NOT NULL, 
	"Title" TEXT DEFAULT '' NOT NULL,
	"TimeCreated" INTEGER DEFAULT 0 NOT NULL, 
	"TimeLastChange" INTEGER DEFAULT 0 NOT NULL

);

CREATE INDEX "Index_Node_Table" ON Node("Table");
CREATE INDEX "Index_Node_Type" ON Node("Type");

-- CREATE INDEX "Table" ON Edge("Node2Uuid");

