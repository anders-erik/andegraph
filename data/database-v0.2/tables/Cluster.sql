

CREATE TABLE IF NOT EXISTS Cluster (
	"Uuid" INTEGER PRIMARY KEY,
	"Table" TEXT DEFAULT "Project" NOT NULL, 
	"Type" TEXT DEFAULT "" NOT NULL, 
	"Title" TEXT DEFAULT "" NOT NULL,
	"TimeCreated" INTEGER NOT NULL, 
	"TimeLastChange" INTEGER NOT NULL,
	
	"Description" TEXT NOT NULL
);
