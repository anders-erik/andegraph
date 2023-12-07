
# BACKUP SCRIPTS


### 'npm run backup'
https://www.reddit.com/r/sqlite/comments/178iq1i/bash_variables_in_sqlite/
```
timestamp=$(date +%s)
DataFile="./data/sources.db"
BackupFile="./data/sql-backup/backup-$timestamp.db"
touch $BackupFile
sqlite3 "$DataFile" ".backup $BackupFile"
```


### SQLite Backup 
```
timestamp=$(date +%s)
DataFile="./sources.db"
BackupFile="./sql-backup/backup-$timestamp.db"
touch $BackupFile
sqlite3 "$DataFile" ".backup $BackupFile"
```




-----------------------------------------------------------------------------

<br>
<br>
<br>

# .CLI info

https://sqlite.org/cli.html

-----------------------------------------------------------------------------

<br>

### Manual INSERT backup

```
$ sqlite3 ./data/sources.db

# SQLITE3
.output ./data/sql-backup/sources-UNIXTIME.sql
.dump
.quit

# MODIFY THIS ONE
.output ./data/sql-backup/sources-1701920466.sql
```


-----------------------------------------------------------------------------
<br>

### .DUMP

SOURCE: https://www.sqlitetutorial.net/sqlite-dump/

$ sqlite3 ./data/original.db

sqlite> .output ./data/sql-backup/dumped.sql
sqlite> .dump [sources]
sqlite> .quit







-----------------------------------------------------------------------------
<br>

### .READ

SOURCE: https://stackoverflow.com/questions/2049109/how-to-import-sql-files-into-sqlite3

$ sqlite3 ./data/new.db

sqlite> .read ./data/sql-backup/dumped.sql







-----------------------------------------------------------------------------
<br>
<br>


# Trying to backup from node-connection

### .dump is part of CLI, not the database library itself
https://stackoverflow.com/questions/6221816/how-do-i-perform-a-dump-on-sqlite-database-through-php


The SQLite3 .dump command is part of the command shell, and not part of the database library itself.
See the section Special commands to sqlite3 on the page Command Line Shell For SQLite.
The only way you can do this is via PHP exec()

