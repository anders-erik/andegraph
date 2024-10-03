
# echo "Run this from project root!:"

dbName="graph-v0.3.0.db"

cwd=`pwd`
liveDB="$cwd/data/live/$dbName"


echo "Analyzing sqlite3 db @ \"$liveDB\""

# sqlite3 "$cwd/data/live/graph-v0.3.0.db"  < "$cwd/data/scripts/analyze-1.sql"
sqlite3 "$cwd/data/live/graph-v0.3.0.db" "select count(*) from Project;"
sqlite3 "$cwd/data/live/graph-v0.3.0.db" "select count(*) from Project;"
sqlite3 "$cwd/data/live/graph-v0.3.0.db" "select count(*) from Project;"
sqlite3 "$cwd/data/live/graph-v0.3.0.db" "select count(*) from Project;"
sqlite3 "$cwd/data/live/graph-v0.3.0.db" "select count(*) from Project;"
sqlite3 "$cwd/data/live/graph-v0.3.0.db" "select count(*) from Project;"

