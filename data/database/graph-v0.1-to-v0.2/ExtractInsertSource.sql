


DROP TABLE IF EXISTS SourceTemp;
-- Temp table to prevent old strange content types messing with contraints
CREATE TABLE SourceTemp (
	"Uuid" INTEGER PRIMARY KEY,
	"Table" TEXT DEFAULT 'File' NOT NULL, 
	"Type" TEXT DEFAULT '' NOT NULL, 
	"Title" TEXT DEFAULT '' NOT NULL,
	"TimeCreated" INTEGER NOT NULL, 
	"TimeLastChange" INTEGER NOT NULL,

	"Url" TEXT NOT NULL,
	"IAmSource" INTEGER DEFAULT 0 NOT NULL

	-- FOREIGN KEY("Type") REFERENCES SourceType("Type")
);


INSERT INTO "SourceTemp" ("Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange", "Url")
SELECT 
	"id", 
	'Source' AS "Tabl",
	'',
	"title",
	strftime('%s', "dateCreated") AS "TimeCreate",
	strftime('%s', "dateCreated") AS "TimeLastChang",
	"url"
FROM
	nodes
WHERE 
	"nodeType" = 'source';


INSERT INTO "Source" ("Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange", "Url")
SELECT "Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange", "Url"
FROM "SourceTemp";


DROP TABLE IF EXISTS "SourceTemp";

-- SELECT * FROM "Source";
