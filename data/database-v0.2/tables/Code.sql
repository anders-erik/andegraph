-- select * from dummyTableHehe; -- create breaking change during new db creation

CREATE TABLE IF NOT EXISTS Code (
	"Uuid" INTEGER PRIMARY KEY,
	"Table" TEXT DEFAULT "Code" NOT NULL, 
	"Type" TEXT DEFAULT "" NOT NULL, 
	"Title" TEXT DEFAULT "" NOT NULL,
	"TimeCreated" INTEGER NOT NULL, 
	"TimeLastChange" INTEGER NOT NULL,
	
	"CodeContent" TEXT NOT NULL
	
);


