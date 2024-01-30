


-- -- -- -- -- -- -- -- -- -- -- -- --
--  Extract Temp Table - shard text --
-- -- -- -- -- -- -- -- -- -- -- -- --

--
-- EXTRACT SOURCE SHARDS FROM OLD DATA
--
DROP TABLE IF EXISTS "nodesTemp";
CREATE TABLE "nodesTemp" AS SELECT * FROM "nodes" WHERE "nodeType" = 'shard';


CREATE TABLE "TextNodesTemp" AS 
SELECT * FROM "nodesTemp"
WHERE 
	"fileName" IS ''
AND
	"textContent" NOT LIKE '%{%' AND "textContent" NOT LIKE '%$ %' AND "textContent" NOT LIKE '%const %' AND "textContent" NOT LIKE '%console.log%' AND "textContent" NOT LIKE '%//%' AND "textContent" NOT LIKE '%console.log%' AND "textContent" NOT LIKE '%git commit -m%'
AND
	"textContent" NOT LIKE '%http%'
;


select COUNT(*) from "TextNodesTemp";






--
-- COPY OLD SOURCE SHARD INTO NEW TEMP SOURCE TABLE
--
DROP TABLE IF EXISTS "TextTemp";
CREATE TABLE "TextTemp" AS SELECT * FROM "Text" WHERE 0;

INSERT INTO "TextTemp" ("Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange", "TextContent", "Language", "IAmAuthor")
SELECT 
	"id", 
	'Text' AS "Tabl",
	'',
	"title",
	strftime('%s', "dateCreated") AS "TimeCreate",
	strftime('%s', "dateCreated") AS "TimeLastChang",
	"textContent",
	'',
	0
FROM
	"TextNodesTemp"
;

-- select * from TextTemp;


--
-- WRITE TO REAL SOURCE TABLE

-- select count(*) from Source where 0;--
-- select count(*) from Source;
-- select count(*) from TextTemp;
INSERT INTO "Text" 
SELECT *
FROM "TextTemp";
-- select count(*) from Source;



--
-- UPDATE THE NODE TABLE
--
INSERT INTO "Node" ("Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange")
SELECT "Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange"
FROM "TextTemp";





DROP TABLE IF EXISTS "nodesTemp";
DROP TABLE IF EXISTS "TextNodesTemp";
DROP TABLE IF EXISTS "TextTemp";






