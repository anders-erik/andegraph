/*
1. sources
2. sourceReviewDates
3. shards
4. shardReviewDates
*/



-- SOURCES
CREATE TABLE "sources" (
	"id"	INTEGER,
	"title"	varchar(255),
	"url"	TEXT,
	"dateCreated"	varchar(10),
	"hasFile"	INTEGER,
	"fileType"	varchar(16),
	"fileEnding"	varchar(8),
	PRIMARY KEY("id" AUTOINCREMENT)
)


-- SOURCE REVIEW DATES
CREATE TABLE "sourceReviewDates" (
	"id"	INTEGER,
	"date"	varchar(10),
	"completed"	INTEGER,
	"sourceId"	INTEGER NOT NULL,
	FOREIGN KEY("sourceId") REFERENCES "sources"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
)


-- SHARDS
CREATE TABLE "shards" (
	"id"	INTEGER,
	"prompt"	varchar(255),
	"dateCreated"	varchar(10),
	"fileType"	varchar(16),
	"fileEnding"	varchar(8),
	"sourceId"	INTEGER NOT NULL,
	FOREIGN KEY("sourceId") REFERENCES "sources"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
)


-- SHARD REVIEW DATES
CREATE TABLE "shardReviewDates" (
	"id"	INTEGER,
	"date"	varchar(16),
	"completed"	INTEGER,
	"shardId"	INTEGER NOT NULL,
	FOREIGN KEY("shardId") REFERENCES "shards"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
)

