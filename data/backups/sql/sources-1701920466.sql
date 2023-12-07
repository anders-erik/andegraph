PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "sources" (
	"id"	INTEGER,
	"title"	varchar(255),
	"url"	varchar(255),
	"dateCreated"	varchar(16),
	"hasFile"	INTEGER,
	"fileType"	varchar(8),
	"fileEnding"	varchar(8),
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO sources VALUES(1,'','','',1,'video','mp4');
INSERT INTO sources VALUES(12,'a d f d ddd','aasdfsdfddd','aa',NULL,NULL,NULL);
INSERT INTO sources VALUES(13,'asdf','example.org','2023-12-03',1,'img','jpg');
INSERT INTO sources VALUES(28,'aaaaab','aaaaa.aaax','2023-12-03',NULL,NULL,NULL);
INSERT INTO sources VALUES(35,'353535dccvcv','353535.35','2023-12-04',NULL,NULL,NULL);
INSERT INTO sources VALUES(36,'sfdgdsssd',NULL,'2023-12-05',NULL,NULL,NULL);
CREATE TABLE IF NOT EXISTS "shards" (
	"id"	INTEGER,
	"prompt"	varchar(255),
	"fileType"	varchar(8),
	"fileEnding"	varchar(8),
	"sourceId"	INTEGER NOT NULL,
	FOREIGN KEY("sourceId") REFERENCES "sources"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "sourceReviewDates" (
	"id"	INTEGER,
	"date"	varchar(255),
	"completed"	INTEGER,
	"sourceId"	INTEGER NOT NULL,
	FOREIGN KEY("sourceId") REFERENCES "sources"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('sources',39);
INSERT INTO sqlite_sequence VALUES('shards',0);
INSERT INTO sqlite_sequence VALUES('sourceReviewDates',0);
COMMIT;
