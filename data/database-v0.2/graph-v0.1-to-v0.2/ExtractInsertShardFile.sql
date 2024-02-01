


-- -- -- -- -- -- -- -- -- -- -- -- --
--  Extract Temp nodes - shard file --
-- -- -- -- -- -- -- -- -- -- -- -- --

-- SHARDS
DROP TABLE IF EXISTS "nodesTemp";
CREATE TABLE "nodesTemp" AS SELECT * FROM "nodes" WHERE "nodeType" = 'shard';


CREATE TABLE "FileNodesTemp" AS 
SELECT * FROM "nodesTemp"
WHERE 
	"fileName" IS NOT ''
;
-- CREATE TABLE "FileTemp" AS SELECT * FROM "FileNodesTemp" WHERE "nodeType" = 'shard';

select count(*) from "FileNodesTemp";












-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
--  SHARD -> FILE -> NEW ID BASED ON FILE!!!!         --
-- CODE BELOW IS BASED ON 'ExtractInsertSource.sql'   --
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --



--
--	CREATE NEW FILE NODES FROM THE OLD SOURCES
--

DROP TABLE IF EXISTS "FileTemp";

CREATE TABLE "FileTemp" (
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
	"OldShardId" INTEGER DEFAULT 0 NOT NULL
	-- TEMP

	-- FOREIGN KEY("Type") REFERENCES FileType("Type")
);


INSERT INTO "FileTemp" ("Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange", "Extension", "OldShardId")
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
	"FileNodesTemp"
;




-- CREATE NEW FILE-UUID 
-- +50000 for sources, +56000 for shards

-- Remove file extension
UPDATE "FileTemp"
SET
	"Uuid"=SUBSTR("Uuid", 0, INSTR("Uuid", '.'));

-- Source id extraction and shift
UPDATE "FileTemp"
SET
	"Uuid"=SUBSTR("Uuid", 0, INSTR("Uuid", '_')) + 56000
WHERE
	SUBSTR("Uuid", INSTR("Uuid", '_'), LENGTH("Uuid")) = '_sh';

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


-- select * from "FileTemp";

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
--	UPDATE EDGE WITH NEW SHARD ID
--
UPDATE "Edge" 
SET 
	"Node2Uuid" = "FileTemp"."Uuid"
FROM "FileTemp"
WHERE
	"OldShardId" = "Edge"."Node2Uuid"
;

-- select "OldShardId" from "FileTemp";
-- select * from Edge;




DROP TABLE IF EXISTS "SourceTemp";
DROP TABLE IF EXISTS "FileTemp";
DROP TABLE IF EXISTS "EdgeTemp";
DROP TABLE IF EXISTS "nodesTemp";
DROP TABLE IF EXISTS "FileNodesTemp";


-- SELECT * FROM "Source";





DROP TABLE IF EXISTS "nodesTemp";













