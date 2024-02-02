
rm graph-v0.2-empty.db
touch graph-v0.2-empty.db

sqlite3 graph-v0.2.db < ./tables/CreateNode.sql
sqlite3 graph-v0.2.db < ./tables/CreateEdge.sql
sqlite3 graph-v0.2.db < ./tables/CreateFileType.sql
sqlite3 graph-v0.2.db < ./tables/CreateFile.sql
sqlite3 graph-v0.2.db < ./tables/CreateSourceType.sql
sqlite3 graph-v0.2.db < ./tables/CreateSource.sql
sqlite3 graph-v0.2.db < ./tables/CreateTextType.sql
sqlite3 graph-v0.2.db < ./tables/CreateText.sql
sqlite3 graph-v0.2.db < ./tables/CreateCodeType.sql
sqlite3 graph-v0.2.db < ./tables/CreateCode.sql
sqlite3 graph-v0.2.db < ./tables/CreateProject.sql
sqlite3 graph-v0.2.db < ./tables/CreateReview.sql
sqlite3 graph-v0.2.db < ./tables/CreateEvent.sql
