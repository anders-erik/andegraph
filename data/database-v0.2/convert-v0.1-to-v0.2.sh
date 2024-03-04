rm ./graph-v0.1-to-v0.2/output.db
cp ./graph-v0.1-to-v0.2/input.db ./graph-v0.1-to-v0.2/output.db 


sqlite3 ./graph-v0.1-to-v0.2/output.db < ./tables/Node.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./tables/NodeTable.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./tables/Edge.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./tables/FileType.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./tables/File.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./tables/SourceType.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./tables/Source.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./tables/TextType.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./tables/Text.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./tables/CodeType.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./tables/Code.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./tables/Project.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./tables/Review.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./tables/Event.sql
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./tables/Equation.sql

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

