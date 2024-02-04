
rm graph-v0.2-empty.db
touch graph-v0.2-empty.db

sqlite3 graph-v0.2-empty.db < ./tables/NodeTable.sql
sqlite3 graph-v0.2-empty.db < ./tables/Node.sql
sqlite3 graph-v0.2-empty.db < ./tables/Edge.sql
sqlite3 graph-v0.2-empty.db < ./tables/FileType.sql
sqlite3 graph-v0.2-empty.db < ./tables/File.sql
sqlite3 graph-v0.2-empty.db < ./tables/SourceType.sql
sqlite3 graph-v0.2-empty.db < ./tables/Source.sql
sqlite3 graph-v0.2-empty.db < ./tables/TextType.sql
sqlite3 graph-v0.2-empty.db < ./tables/Text.sql
sqlite3 graph-v0.2-empty.db < ./tables/CodeType.sql
sqlite3 graph-v0.2-empty.db < ./tables/Code.sql
sqlite3 graph-v0.2-empty.db < ./tables/Project.sql
sqlite3 graph-v0.2-empty.db < ./tables/Review.sql
sqlite3 graph-v0.2-empty.db < ./tables/Event.sql
sqlite3 graph-v0.2-empty.db < ./tables/Equation.sql

