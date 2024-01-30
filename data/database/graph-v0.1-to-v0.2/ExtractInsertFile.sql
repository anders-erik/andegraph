

-- BECAISE WE HAVE A FILE NUMBERING OVERLAP WE NEED TO GENERATE NEW FIILE NAMES!
-- WELL, WE NEED TO NAME THE FILES ACCORDING TO THE UUID, AND THEIR OLD UUIDS ARE NOT GOOD ENOUGH!

-- - give "File" good file-uuid
-- 	- source + 50000 (50=SO)
-- 	- shard + 56000 (56=SH)
-- - rename the real files to match
-- - edges betweeen the new separate nodes
-- 	- so maybe files last??



DROP TABLE IF EXISTS FileTemp;
-- Temp table to prevent old strange content types messing with contraints
-- When all fields conform to contraints, we copy over to real "File"-table
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

	--
	"SourceNode" INTEGER DEFAULT 0 NOT NULL
	--

	-- FOREIGN KEY("Type") REFERENCES FileType("Type")
);


INSERT INTO "FileTemp" ("Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange", "Extension")
SELECT 
	"fileName",
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


-- ALTER TABLE "FileTemp"
-- 	ADD "UuidTemp" TEXT;


-- CREATE NEW FILE-UUID 
-- +50000 for sources, +56000 for shards

-- Remove file extension
UPDATE "FileTemp"
SET
	"Uuid"=SUBSTR("Uuid", 0, INSTR("Uuid", '.'));

-- Shard id extraction and shift
UPDATE "FileTemp"
SET
	"Uuid"=SUBSTR("Uuid", 0, INSTR("Uuid", '_')) + 56000
WHERE
	SUBSTR("Uuid", INSTR("Uuid", '_'), LENGTH("Uuid")) = '_sh';

-- Source id extraction and shift
UPDATE "FileTemp"
SET
	"Uuid"=SUBSTR("Uuid", 0, INSTR("Uuid", '_')) + 50000
WHERE
	SUBSTR("Uuid", INSTR("Uuid", '_'), LENGTH("Uuid")) = '_so';

-- SELECT * FROM "FileTemp";




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



INSERT INTO "File" ("Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange", "Extension")
SELECT "Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange", "Extension"
FROM "FileTemp";

DROP TABLE IF EXISTS "FileTemp";

-- SELECT * FROM "File";



--
--	CREATE EDGE BEWTEEN NODES 
--




