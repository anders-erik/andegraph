DROP TABLE IF EXISTS Project;


CREATE TABLE Project (
	"Uuid" INTEGER PRIMARY KEY,
	"Table" TEXT DEFAULT 'Project' NOT NULL, 
	"Type" TEXT DEFAULT '' NOT NULL, 
	"Title" TEXT DEFAULT '' NOT NULL,
	"TimeCreated" INTEGER NOT NULL, 
	"TimeLastChange" INTEGER NOT NULL,
	
	"Goal" TEXT NOT NULL

);
