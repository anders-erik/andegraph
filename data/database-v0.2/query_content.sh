

# Source
echo
echo "Source"
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./queries/SelectSource.sql

echo
echo "Source"
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./queries/SelectSourceInList.sql
