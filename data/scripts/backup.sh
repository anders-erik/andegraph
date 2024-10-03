#!/bin/bash

# echo "Run this from project root!"
# echo "Run using package.json script!"

echo "Data backup script:"
echo ""

# Make sure a backup target directory is supplied, else exit
if [ $# -eq 0 ]
  then
    echo "No supplied backup directory. Exiting script."
    echo ""
    exit
fi

# directory printing
cwd=`pwd`
srcDir="$cwd/data/live/"
echo "Current live directory:    $srcDir"
echo "Selected backup directory: $1"
echo ""

# create target directory
if [ -d "$1" ]; then
    echo "Target directory exists!"
else
    echo "Target directory doesn't exist!"
fi


echo ""
echo "WARNING : BACKUP NOT YET IMPLEMENTED! NO FILES MOVED!"
echo ""
