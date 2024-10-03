
# echo "Run this from project root!:"

dbName="graph.db"

cwd=`pwd`
liveDB="$cwd/data/live/$dbName"


echo "Analyzing sqlite3 db @ \"$liveDB\""

# sqlite3 "$cwd/data/live/graph-v0.3.0.db"  < "$cwd/data/scripts/analyze-1.sql"
sqlite3 "$cwd/data/live/graph.db" "select count(*) from Project;"
sqlite3 "$cwd/data/live/graph.db" "select count(*) from Project;"
sqlite3 "$cwd/data/live/graph.db" "select count(*) from Project;"
sqlite3 "$cwd/data/live/graph.db" "select count(*) from Project;"
sqlite3 "$cwd/data/live/graph.db" "select count(*) from Project;"
sqlite3 "$cwd/data/live/graph.db" "select count(*) from Project;"

