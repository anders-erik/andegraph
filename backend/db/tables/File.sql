

CREATE TABLE IF NOT EXISTS File (
	"Uuid" INTEGER PRIMARY KEY,
	"Table" TEXT DEFAULT "File" NOT NULL, 
	"Type" TEXT DEFAULT "" NOT NULL, 
	"Title" TEXT DEFAULT "" NOT NULL,
	"TimeCreated" INTEGER NOT NULL, 
	"TimeLastChange" INTEGER NOT NULL,

	"Extension" TEXT NOT NULL,
	"SizeBytes" INTEGER DEFAULT 0 NOT NULL,
	"IAmAuthor" INTEGER DEFAULT 0 NOT NULL,

	FOREIGN KEY("Type") REFERENCES FileType("Type")
);
