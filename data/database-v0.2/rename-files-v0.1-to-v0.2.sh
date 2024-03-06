
#!/bin/bash

# ONLY CHANGES THE NAMES OF THE OLD FORMAT!
# The remaing ones I simply remove manually



# Function to rename files
rename_files() {
    local directory="$1"
    cd "$directory" || exit 1

  

	for file in *_sh*; do
		if [ -f "$file" ]; then
			# Remove the '_sh' substring from the filename
			extension="${file##*.}"
			filename="${file%.*}"

			new_base=$(echo "$filename" | sed 's/_sh//')
			
			new_base_padded=$(printf "%03d" "$new_base")

			new_base_padded_56="56${new_base_padded}"

			#new_file="${new_base_padded_56}.${extension}"
			new_file="${new_base_padded_56}"

			mv "$file" "$new_file"

			echo "Renamed $file to $new_file"
		fi
	done

	for file in *_so*; do
		if [ -f "$file" ]; then
			# Remove the '_so' substring from the filename
			extension="${file##*.}"
			filename="${file%.*}"

			new_base=$(echo "$filename" | sed 's/_so//')
			
			new_base_padded=$(printf "%03d" "$new_base")

			new_base_padded_50="50${new_base_padded}"

			#new_file="${new_base_padded_50}.${extension}"
			new_file="${new_base_padded_50}"

			mv "$file" "$new_file"

			echo "Renamed $file to $new_file"
		fi
	done

  
}



# Specify the directory containing the files
directory_path="../live/files-v0.2.0"


# Call the function to rename files in the directory
rename_files "$directory_path"












