
#  EDIT VERSION
extensionVersion="v0.3.1"

startDir=$(pwd)
# echo "startDir = $startDir"

zipName="ag-webextension-$extensionVersion.zip"
srcDir="$startDir/webextension/src/"
zipDistDir="$startDir/webextension/approved-extensions/$extensionVersion/"
mkdir -p $zipDistDir # Create if not exists


zipDistFullPath="$zipDistDir/$zipName"

# echo "srcDir = $srcDir"
# echo "zipDistDir = $zipDistDir"
# echo "zipDistFullPath = $zipDistFullPath"

# move to directory to prevent inclusion of parent directory
cd "$srcDir"
zip -r "$zipDistFullPath" .
cd -
