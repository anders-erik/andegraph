# RUN ONLY WITH :
# 'npm run backup'

# https://www.reddit.com/r/sqlite/comments/178iq1i/bash_variables_in_sqlite/

timestamp=$(date +%s)
DataFile="../live/sources.db"
BackupFile="../backups/db/sources-$timestamp.db"
#touch $BackupFile
sqlite3 "$DataFile" ".backup $BackupFile"


# Note:
# Initial problems were due to trying to backup 'source.db', instead of the actual db, 'sources.db'

# TODO:
# - create separate 'live' data, backup data, practice data, and data scripts/docs
# - live and backup data should be included in .gitignore, practice data should have a few example databases
# - add npm run scripts to load example databases into live. Alternatively, run app with different scripts and example dbs are loaded dynamically.




