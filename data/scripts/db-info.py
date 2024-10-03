# https://stackoverflow.com/questions/38549815/python-sqlite-loop-thought-all-tables-in-database

import sqlite3
import subprocess
import pathlib

currentFileDir = pathlib.Path(__file__).parent.resolve()
print(currentFileDir)

try:
    conn = sqlite3.connect(f'{currentFileDir}/../live/graph.db')
except sqlite3.Error as e:
    print('Db Not found', str(e))
mycursor = conn.cursor()

tables = []
for db_name in mycursor.execute("SELECT name FROM sqlite_master WHERE type = 'table'"):
    tables.append(db_name)

# Print all tables
printTables = True
if(printTables):
    print("Tables found:")
    for table in tables:
        print( "\t", table[0])
    print()

# Fetch and print all rows from all tables
allRows = False
if(allRows):
    for table in tables:
        print("Searching",table[0])
        try:
            mycursor.execute('SELECT * FROM ' + table[0])
            stats = mycursor.fetchall()
            for stat in stats:
                print( stat, "found in ", table)
        except sqlite3.Error as e:
            continue


# Fetch and count all rows from all tables
countRows = True
totalNumberOfRows = 0
if(countRows):
    for table in tables:
        try:
            mycursor.execute('SELECT count(*) FROM ' + table[0])
            stats = mycursor.fetchall()
            for stat in stats:
                print( stat[0], "\trows found in table", table[0])
                totalNumberOfRows += stat[0]
        except sqlite3.Error as e:
            continue
    print("\nTotal number of rows:", totalNumberOfRows)

conn.close()


# .sha3sum command is only database content dependent. Not affected by VACUUM.
process = subprocess.run(["sqlite3", f"{currentFileDir}/../live/graph.db", ".sha3sum"], capture_output=True, text=True)
print(process.stdout)

