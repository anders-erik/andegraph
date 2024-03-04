


-- -- -- -- -- -- -- -- -- -- -- -- --
--  Extract Temp Table - shard text --
-- -- -- -- -- -- -- -- -- -- -- -- --



CREATE TABLE "reviewDatesTemp" AS 
SELECT * FROM "reviewDates";


select COUNT(*) from "reviewDatesTemp";






--
-- COPY OLD SOURCE SHARD INTO NEW TEMP Review TABLE
--
DROP TABLE IF EXISTS "ReviewTemp";
CREATE TABLE "ReviewTemp" AS SELECT * FROM "Review" WHERE 0;

INSERT INTO "ReviewTemp" ("Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange", "ReviewDate", "ReviewCompleted", "ReviewCompletedOnDate", "NodeToReviewUuid")
SELECT 
	"id", 
	'Review' AS "Tabl",
	'',
	"title",
	strftime('%s', "2023-12-01") AS "TimeCreate",
	strftime('%s', "2023-12-01") AS "TimeLastChang",

	"date",
	"completed",
	'',
	"nodeId"
FROM
	"reviewDatesTemp"
;

-- select * from TextTemp;


--
-- WRITE TO REAL SOURCE TABLE

-- select count(*) from Source where 0;--
-- select count(*) from Source;
-- select count(*) from TextTemp;
INSERT INTO "Review" 
SELECT *
FROM "ReviewTemp";
-- select count(*) from Source;



--
-- UPDATE THE NODE TABLE
--
INSERT INTO "Node" ("Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange")
SELECT "Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange"
FROM "ReviewTemp";

-- select * from ReviewTemp;


--INSERT INTO "Edge"
INSERT INTO "Edge" ("Uuid", "Node1Uuid", "Node2Uuid", "Directed")
SELECT "Uuid"+1000000,"NodeToReviewUuid", "Uuid", 0
FROM "ReviewTemp";


-- select * from Edge;



DROP TABLE IF EXISTS "nodesTemp";
DROP TABLE IF EXISTS "reviewDatesTemp";
DROP TABLE IF EXISTS "ReviewTemp";






