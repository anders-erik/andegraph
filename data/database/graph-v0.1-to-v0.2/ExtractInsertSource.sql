
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
--  MOVE SOURCES TO NEW TABLE + EXTRACT AND LINK IF FILE EXISTS! !   --
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


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

--
--	POPULATE THE SOURCE TABLE
--

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


--
--	POPULATE THE NODE TABLE
--

INSERT INTO "Node" ("Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange")
SELECT "Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange"
FROM "SourceTemp";










--
--	CREATE NEW FILE NODES FROM THE OLD SOURCES
--

DROP TABLE IF EXISTS FileTemp;

CREATE TABLE FileTemp (
	"Uuid" TEXT,
	"Table" TEXT DEFAULT 'File' NOT NULL, 
	"Type" TEXT DEFAULT '' NOT NULL, 
	"Title" TEXT DEFAULT '' NOT NULL,
	"TimeCreated" INTEGER NOT NULL, 
	"TimeLastChange" INTEGER NOT NULL,

	"Extension" TEXT NOT NULL,
	"SizeBytes" INTEGER DEFAULT 0 NOT NULL,
	"IAmAuthor" INTEGER DEFAULT 0 NOT NULL,

	-- TEMP
	"SourceId" INTEGER DEFAULT 0 NOT NULL
	-- TEMP

	-- FOREIGN KEY("Type") REFERENCES FileType("Type")
);


INSERT INTO "FileTemp" ("Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange", "Extension", "SourceId")
SELECT 
	"fileName",
	'File' AS "Tabl",
	"elementType",
	"title",
	strftime('%s', "dateCreated") AS "TimeCreate",
	strftime('%s', "dateCreated") AS "TimeLastChang",
	"fileExtension",
	"id"
FROM 
	nodes
WHERE 
	"fileName" IS NOT ''
AND 
	"nodeType" = 'source';



-- CREATE NEW FILE-UUID 
-- +50000 for sources, +56000 for shards

-- Remove file extension
UPDATE "FileTemp"
SET
	"Uuid"=SUBSTR("Uuid", 0, INSTR("Uuid", '.'));

-- Source id extraction and shift
UPDATE "FileTemp"
SET
	"Uuid"=SUBSTR("Uuid", 0, INSTR("Uuid", '_')) + 50000
WHERE
	SUBSTR("Uuid", INSTR("Uuid", '_'), LENGTH("Uuid")) = '_so';

-- Update dated fields
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

-- Copy temp files to real file table
INSERT INTO "File" ("Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange", "Extension")
SELECT "Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange", "Extension"
FROM "FileTemp";

--
--	POPULATE THE NODE TABLE
--

INSERT INTO "Node" ("Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange")
SELECT "Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange"
FROM "FileTemp";




--
-- Create node siblings between source and now new file (which used to be part of old source!)
-- ids: 69000

DROP TABLE IF EXISTS "EdgeTemp";
CREATE TABLE "EdgeTemp" (
	"Uuid" INTEGER PRIMARY KEY AUTOINCREMENT,
	"Node1Uuid" INTEGER NOT NULL, 
	"Node2Uuid" INTEGER NOT NULL, 
	"Directed" INTEGER NOT NULL,
	"Type" TEXT DEFAULT '' NOT NULL,
	"Order" INTEGER DEFAULT 0 NOT NULL,
	"Path" TEXT DEFAULT '/' NOT NULL,

	FOREIGN KEY("Node1Uuid") REFERENCES Node("Uuid"),
	FOREIGN KEY("Node2Uuid") REFERENCES Node("Uuid")	
);
-- UPDATE SQLITE_SEQUENCE SET seq = 60000 WHERE name = "EdgeTemp"; -- Didn't work.. Update stament below instead


INSERT INTO "EdgeTemp" ("Node1Uuid", "Node2Uuid", "Directed")
SELECT "SourceId", "Uuid", 0
FROM "FileTemp";

UPDATE "EdgeTemp"
SET
	"Uuid"="Uuid" + 60000;

-- Copy to real edge table
INSERT INTO "Edge"
SELECT * FROM "EdgeTemp";


-- select * from "FileTemp";
-- select * from "EdgeTemp";


DROP TABLE IF EXISTS "SourceTemp";
DROP TABLE IF EXISTS "FileTemp";
DROP TABLE IF EXISTS "EdgeTemp";

-- SELECT * FROM "Source";
