


-- -- -- -- -- -- -- -- -- -- -- -- --
--  Extract Temp Table - shard code --
-- -- -- -- -- -- -- -- -- -- -- -- --






--
-- EXTRACT CODE SHARDS FROM OLD DATA
--
DROP TABLE IF EXISTS "nodesTemp";
CREATE TABLE "nodesTemp" AS SELECT * FROM "nodes" WHERE "nodeType" = 'shard';


CREATE TABLE "CodeNodesTemp" AS 
SELECT * FROM "nodesTemp"
WHERE 
	"fileName" IS ''
AND
	"textContent" LIKE '%{%' OR "textContent" LIKE '%$ %' OR "textContent" LIKE '%const %' OR "textContent" LIKE '%console.log%' OR "textContent" LIKE '%// %' OR "textContent" LIKE '%console.log%' OR "textContent" LIKE '%git commit -m%'
;

select COUNT(*) from "CodeNodesTemp";





--
-- COPY OLD CODE SHARD INTO NEW TEMP CODE TABLE
--
DROP TABLE IF EXISTS "CodeTemp";
CREATE TABLE "CodeTemp" AS SELECT * FROM "Code" WHERE 0;

INSERT INTO "CodeTemp" ("Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange", "CodeContent")
SELECT 
	"id", 
	'Code' AS "Tabl",
	'',
	"title",
	strftime('%s', "dateCreated") AS "TimeCreate",
	strftime('%s', "dateCreated") AS "TimeLastChang",
	"textContent"
FROM
	"CodeNodesTemp"
;




--
-- UPDATE TO REAL CODE TABLE
--
INSERT INTO "Code" 
SELECT *
FROM "CodeTemp";




--
-- UPDATE THE NODE TABLE
--
INSERT INTO "Node" ("Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange")
SELECT "Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange"
FROM "CodeTemp";





DROP TABLE IF EXISTS "nodesTemp";
DROP TABLE IF EXISTS "CodeNodesTemp";
DROP TABLE IF EXISTS "CodeTemp";














