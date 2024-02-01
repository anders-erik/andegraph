


-- -- -- -- -- -- -- -- -- -- -- -- -- --
--  Extract Temp Table - shard source  --
-- -- -- -- -- -- -- -- -- -- -- -- -- --

--
-- EXTRACT SOURCE SHARDS FROM OLD DATA
--

DROP TABLE IF EXISTS "nodesTemp";
CREATE TABLE "nodesTemp" AS SELECT * FROM "nodes" WHERE "nodeType" = 'shard';


CREATE TABLE "SourceNodesTemp" AS 
SELECT * FROM "nodesTemp"
WHERE 
	"fileName" IS ''
AND
	"textContent" NOT LIKE '%{%' AND "textContent" NOT LIKE '%$ %' AND "textContent" NOT LIKE '%const %' AND "textContent" NOT LIKE '%console.log%' AND "textContent" NOT LIKE '%// %' AND "textContent" NOT LIKE '%console.log%' AND "textContent" NOT LIKE '%git commit -m%'
AND
	"textContent" LIKE '%http%'
;

select COUNT(*) from "SourceNodesTemp";





--
-- COPY OLD SOURCE SHARD INTO NEW TEMP SOURCE TABLE
--
DROP TABLE IF EXISTS "SourceTemp";
CREATE TABLE "SourceTemp" AS SELECT * FROM "Source" WHERE 0;

INSERT INTO "SourceTemp" ("Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange", "Url", "IAmSource")
SELECT 
	"id", 
	'Source' AS "Tabl",
	'',
	"title",
	strftime('%s', "dateCreated") AS "TimeCreate",
	strftime('%s', "dateCreated") AS "TimeLastChang",
	"textContent",
	0
FROM
	"SourceNodesTemp"
;

-- select * from SourceTemp;


--
-- WRITE TO REAL SOURCE TABLE

-- select count(*) from Source where 0;--
-- select count(*) from Source;
-- select count(*) from SourceTemp;
INSERT INTO "Source" 
SELECT *
FROM "SourceTemp";
-- select count(*) from Source;



--
-- UPDATE THE NODE TABLE
--
INSERT INTO "Node" ("Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange")
SELECT "Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange"
FROM "SourceTemp";





DROP TABLE IF EXISTS "nodesTemp";
DROP TABLE IF EXISTS "SourceNodesTemp";
DROP TABLE IF EXISTS "SourceTemp";
















