DROP TABLE IF EXISTS FileType;

CREATE TABLE FileType (
	"Id" INTEGER PRIMARY KEY AUTOINCREMENT,
	"Type" TEXT NOT NULL
);
INSERT INTO "FileType" (Type) VALUES ('');
INSERT INTO "FileType" (Type) VALUES ('image');
INSERT INTO "FileType" (Type) VALUES ('audio');
INSERT INTO "FileType" (Type) VALUES ('video');
INSERT INTO "FileType" (Type) VALUES ('text');
INSERT INTO "FileType" (Type) VALUES ('code');
INSERT INTO "FileType" (Type) VALUES ('data');
INSERT INTO "FileType" (Type) VALUES ('3d');
INSERT INTO "FileType" (Type) VALUES ('pdf');
