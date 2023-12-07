PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE sources (id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(255), url varchar(255), date varchar(255));
INSERT INTO sources VALUES(1,NULL,NULL,NULL);
INSERT INTO sources VALUES(12,'a d f d ddd','aasdfsdfddd','aa');
INSERT INTO sources VALUES(13,'asdf','example.org','2023-12-03');
INSERT INTO sources VALUES(28,'aaaaab','aaaaa.aaax','2023-12-03');
INSERT INTO sources VALUES(35,'353535dccvcv','353535.35','2023-12-04');
INSERT INTO sources VALUES(36,'sfdgdsssd','','2023-12-05');
CREATE TABLE shards (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    name varchar(255), 
                    type varchar(255), 
                    content varchar(255), 
                    sourceId INTEGER,
                    FOREIGN KEY(sourceId) REFERENCES sources(id)
                );
CREATE TABLE sourceReviewDates (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    date varchar(255), 
                    sourceId INTEGER,
                    FOREIGN KEY(sourceId) REFERENCES sources(id)
                );
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('sources',36);
COMMIT;
