rm ./graph-v0.1-to-v0.2/output.db
cp ./graph-v0.1-to-v0.2/input.db ./graph-v0.1-to-v0.2/output.db 


sqlite3 ./graph-v0.1-to-v0.2/output.db < ./tables/CreateNode.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./tables/CreateEdge.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./tables/CreateFileType.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./tables/CreateFile.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./tables/CreateSourceType.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./tables/CreateSource.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./tables/CreateTextType.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./tables/CreateText.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./tables/CreateCodeType.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./tables/CreateCode.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./tables/CreateProject.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./tables/CreateReview.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./tables/CreateEvent.sql

sqlite3 ./graph-v0.1-to-v0.2/output.db < ./graph-v0.1-to-v0.2/ExtractInsertEdge.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./graph-v0.1-to-v0.2/ExtractInsertSource.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./graph-v0.1-to-v0.2/ExtractInsertShardFile.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./graph-v0.1-to-v0.2/ExtractInsertShardCode.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./graph-v0.1-to-v0.2/ExtractInsertShardSource.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./graph-v0.1-to-v0.2/ExtractInsertShardText.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./graph-v0.1-to-v0.2/ExtractInsertReview.sql


# Save new db
sqlite3 graph-v0.1-to-v0.2/output.db .dump > ./graph-v0.1-to-v0.2/output.sql


#sqlite3 ./graph-v0.1-to-v0.2/output.db < ./graph-v0.1-to-v0.2/ExtractInsertFile.sql
# sqlite3 ./graph-v0.1-to-v0.2/output.db < ./graph-v0.1-to-v0.2/ExtractInsertShard.sql

