
DROP TABLE IF EXISTS Code;
CREATE TABLE Code (
	"Uuid" INTEGER PRIMARY KEY,
	"NodeUuid" INTEGER NOT NULL, 
	"Table" TEXT DEFAULT 'Code' NOT NULL, 
	"Type" TEXT DEFAULT '' NOT NULL, 
	"Title" TEXT DEFAULT '' NOT NULL,
	"TimeCreated" INTEGER NOT NULL, 
	"TimeLastChange" INTEGER NOT NULL,
	
	"CodeContent" TEXT NOT NULL,
	

	FOREIGN KEY("NodeUuid") REFERENCES Node("Uuid")
);
