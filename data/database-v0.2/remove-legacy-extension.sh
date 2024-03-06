#!/bin/bash

# Courtesy Claude 3
# https://claude.ai/chat/9231bc30-ae29-4bcb-8c9e-3d650a0e846b

# Get directory data before renaming
echo "Before renaming files:"
num_files=$(ls -1 | wc -l)
echo "Number of files: $num_files"
num_dirs=$(find . -type d | wc -l)
echo "Number of directories: $num_dirs"
total_size=$(du -sh | cut -f1)
echo "Total size: $total_size"

# Number of files: 425
# Number of directories: 1
# Total size: 507M


# Run the file renaming script
for file in *.*
do
    base="${file%%.*}"
    mv "$file" "$base"
done


# Get directory data after renaming
echo "After renaming files:"
num_files=$(ls -1 | wc -l)
echo "Number of files: $num_files"
num_dirs=$(find . -type d | wc -l)
echo "Number of directories: $num_dirs"
total_size=$(du -sh | cut -f1)
echo "Total size: $total_size"


# Number of files: 425
# Number of directories: 1
# Total size: 507M
