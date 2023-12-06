
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
.output ./data/sql-backup/sources-1701812046.sql
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
