DROP TABLE IF EXISTS TextType;

CREATE TABLE TextType (
	"Id" INTEGER PRIMARY KEY AUTOINCREMENT,
	"Type" TEXT NOT NULL
);
INSERT INTO "TextType" (Type) VALUES ('');
INSERT INTO "TextType" (Type) VALUES ('joke');
INSERT INTO "TextType" (Type) VALUES ('comment');
INSERT INTO "TextType" (Type) VALUES ('poem');
