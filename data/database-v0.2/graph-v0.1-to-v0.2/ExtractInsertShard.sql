

-- CHECKS PLAN
-- 	1. is file?
-- 	2. textContent contains http*
-- 		- move to  source and make sure it is still a child to original parent!
-- 	3. textContent contains code (e.g. {, [, +, =, etc. ) 
-- 	4. turn into 'Text'




-- -- -- -- -- -- -- -- -- -- -- -- --
--  Extract Temp Tables for shards  --
-- -- -- -- -- -- -- -- -- -- -- -- --


CREATE TABLE "nodesTemp" AS SELECT * FROM "nodes" WHERE "nodeType" = 'shard';
-- select * from "nodesTemp";

CREATE TABLE "FileNodesTemp" AS 
SELECT * FROM "nodesTemp"
WHERE 
	"fileName" IS NOT ''
;
-- CREATE TABLE "FileTemp" AS SELECT * FROM "FileNodesTemp" WHERE "nodeType" = 'shard';

CREATE TABLE "CodeNodesTemp" AS 
SELECT * FROM "nodesTemp"
WHERE 
	"fileName" IS ''
AND
	"textContent" LIKE '%{%' OR "textContent" LIKE '%$ %' OR "textContent" LIKE '%const %' OR "textContent" LIKE '%console.log%' OR "textContent" LIKE '%// %' OR "textContent" LIKE '%console.log%' OR "textContent" LIKE '%git commit -m%'
;


CREATE TABLE "SourceNodesTemp" AS 
SELECT * FROM "nodesTemp"
WHERE 
	"fileName" IS ''
AND
	"textContent" NOT LIKE '%{%' AND "textContent" NOT LIKE '%$ %' AND "textContent" NOT LIKE '%const %' AND "textContent" NOT LIKE '%console.log%' AND "textContent" NOT LIKE '%// %' AND "textContent" NOT LIKE '%console.log%' AND "textContent" NOT LIKE '%git commit -m%'
AND
	"textContent" LIKE '%http%'
;


CREATE TABLE "TextNodesTemp" AS 
SELECT * FROM "nodesTemp"
WHERE 
	"fileName" IS ''
AND
	"textContent" NOT LIKE '%{%' AND "textContent" NOT LIKE '%$ %' AND "textContent" NOT LIKE '%const %' AND "textContent" NOT LIKE '%console.log%' AND "textContent" NOT LIKE '%//%' AND "textContent" NOT LIKE '%console.log%' AND "textContent" NOT LIKE '%git commit -m%'
AND
	"textContent" NOT LIKE '%http%'
;












-- -- -- -- -- 
--  PRINT   --
-- -- -- -- --


-- select * from "nodesTemp";
-- select * from "FileNodesTemp";
select * from "CodeNodesTemp";
-- select * from "SourceNodesTemp";
-- select * from "TextNodesTemp";

select COUNT(*) from "nodesTemp";
select COUNT(*) from "FileNodesTemp";
select COUNT(*) from "CodeNodesTemp";
select COUNT(*) from "SourceNodesTemp";
select COUNT(*) from "TextNodesTemp";




















