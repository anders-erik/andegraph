
DROP TABLE IF EXISTS Project;
CREATE TABLE Project (
	"Uuid" INTEGER PRIMARY KEY,
	"NodeUuid" INTEGER NOT NULL, 
	"Table" TEXT DEFAULT 'Project' NOT NULL, 
	"Type" TEXT DEFAULT '' NOT NULL, 
	"Title" TEXT DEFAULT '' NOT NULL,
	"TimeCreated" INTEGER NOT NULL, 
	"TimeLastChange" INTEGER NOT NULL,
	
	"Goal" TEXT NOT NULL,
	
	

	FOREIGN KEY("NodeUuid") REFERENCES Node("Uuid")
);

