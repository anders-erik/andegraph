

BECAISE WE HAVE A FILE NUMBERING OVERLAP WE NEED TO GENERATE NEW FIILE NAMES!
WELL, WE NEED TO NAME THE FILES ACCORDING TO THE UUID, AND THEIR OLD UUIDS ARE NOT GOOD ENOUGH!

- give "File" good file-uuid
	- source + 3000
	- shard + 4000
- rename the real files to match
- edges betweeen the new separate nodes
	- so maybe files last??



DROP TABLE IF EXISTS FileTemp;
-- Temp table to prevent old strange content types messing with contraints
-- When all fields conform to contraints, we copy over to real "File"-table
CREATE TABLE FileTemp (
	"Uuid" INTEGER PRIMARY KEY,
	"Table" TEXT DEFAULT 'File' NOT NULL, 
	"Type" TEXT DEFAULT '' NOT NULL, 
	"Title" TEXT DEFAULT '' NOT NULL,
	"TimeCreated" INTEGER NOT NULL, 
	"TimeLastChange" INTEGER NOT NULL,

	"Extension" TEXT NOT NULL,
	"SizeBytes" INTEGER DEFAULT 0 NOT NULL,
	"IAmAuthor" INTEGER DEFAULT 0 NOT NULL

	-- FOREIGN KEY("Type") REFERENCES FileType("Type")
);


INSERT INTO "FileTemp" ("Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange", "Extension")
SELECT 
	"id", 
	'File' AS "Tabl",
	"elementType",
	"title",
	strftime('%s', "dateCreated") AS "TimeCreate",
	strftime('%s', "dateCreated") AS "TimeLastChang",
	"fileExtension"
FROM 
	nodes
WHERE 
	"fileName" IS NOT '';

UPDATE "FileTemp"
SET
	"Type"='pdf'
WHERE
	"Extension"='pdf';

UPDATE "FileTemp"
SET
	"Extension"='txt'
WHERE
	"Extension"='plain'
OR
	"Extension"='text';
	
-- SELECT * FROM "FileTemp";

INSERT INTO "File" ("Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange", "Extension")
SELECT "Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange", "Extension"
FROM "FileTemp";

DROP TABLE IF EXISTS "FileTemp";