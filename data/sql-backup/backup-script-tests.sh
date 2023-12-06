# Figuring out the quotation marks took way to long... I need to practice!

#timestamp=$(date +%s)

# https://superuser.com/questions/1276707/insert-quote-into-string-variable-in-bash
#sqlcommand='.backup "./backup-'$timestamp'.db"'
#sqlcommand="\".backup ./backup-"$timestamp".db\""
#sqlcommand=./backup-$timestamp.db

# https://stackoverflow.com/questions/1250079/how-to-escape-single-quotes-within-single-quoted-strings
# Make sure the 'timestamp' quotes are single quotation!
# sqlcommand=' '"'"'.backup ./backup-'$timestamp'.db'"'"' '

#sqlite3 ./read.db ".backup ./sss"$sqlcommand".db"

##sqlite3 ./read.db $sqlcommand


# SOLVED!!!!!!!!!!!!!
timestamp=$(date +%s)
DataFile="./read.db"
BackupFile="./backup-$timestamp.db"
sqlite3 "$DataFile" ".backup $BackupFile"



