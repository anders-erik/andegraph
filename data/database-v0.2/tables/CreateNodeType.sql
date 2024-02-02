DROP TABLE IF EXISTS "NodeType";

CREATE TABLE "NodeType" (
	"Type" TEXT PRIMARY KEY
);
INSERT INTO "FileType" (Type) VALUES ('');
INSERT INTO "FileType" (Type) VALUES ('Project');
INSERT INTO "FileType" (Type) VALUES ('Source');
INSERT INTO "FileType" (Type) VALUES ('File');
INSERT INTO "FileType" (Type) VALUES ('Review');
INSERT INTO "FileType" (Type) VALUES ('Text');
INSERT INTO "FileType" (Type) VALUES ('Code');
