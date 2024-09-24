
# BOTH BELOW WORKS!
# https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#Command-Substitution
# Command substitution : Bash performs the expansion by executing command in a subshell environment and replacing the command substitution with the standard output of the command, with any trailing newlines deleted. 

dockerid1=`docker ps | grep andegraph | awk '{print $1}'`
# echo $dockerid1

dockerid2=$(docker ps | grep andegraph | awk '{print $1}')
# echo $dockerid2


docker logs -f "$dockerid2"
