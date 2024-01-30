DROP TABLE IF EXISTS CodeType;

CREATE TABLE CodeType (
	"Id" INTEGER PRIMARY KEY AUTOINCREMENT,
	"Type" TEXT NOT NULL
);
INSERT INTO "CodeType" (Type) VALUES ('js');
INSERT INTO "CodeType" (Type) VALUES ('html');
INSERT INTO "CodeType" (Type) VALUES ('css');
INSERT INTO "CodeType" (Type) VALUES ('bash');
