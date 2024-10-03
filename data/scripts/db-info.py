import sqlite3
try:
    conn = sqlite3.connect('/home/anders/dev/andegraph/data/live/graph-v0.3.0.db')
except sqlite3.Error as e:
    print('Db Not found', str(e))

db_list = []
mycursor = conn.cursor()
for db_name in mycursor.execute("SELECT name FROM sqlite_master WHERE type = 'table'"):
    db_list.append(db_name)

for x in db_list:
    print("Searching",x[0])
    # try:
    #     mycursor.execute('SELECT * FROM '+x[0]+' WHERE columnA" = "-"')
    #     stats = mycursor.fetchall()
    #     for stat in stats:
    #         print stat, "found in ", x
    # except sqlite3.Error as e:
    #    continue
conn.close()