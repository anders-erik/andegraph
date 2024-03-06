

CREATE TABLE IF NOT EXISTS Equation (
	"Uuid" INTEGER PRIMARY KEY,
	"Table" TEXT DEFAULT "Text" NOT NULL, 
	"Type" TEXT DEFAULT "" NOT NULL, 
	"Title" TEXT DEFAULT "" NOT NULL,
	"TimeCreated" INTEGER NOT NULL, 
	"TimeLastChange" INTEGER NOT NULL,
	
	"Tex" TEXT NOT NULL,
	"MathMl" TEXT NOT NULL

);

