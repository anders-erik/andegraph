const fs = require('fs');

exports.getFileData = function(filePath){
    let data;
    try {
        data = fs.readFileSync(__dirname + "/" + filePath, { flag: 'r' });
        // console.log(data)
    } catch (error) {
        console.log(error)
        data = null;
    }

    return data;

    // console.log("HELLO FROM FILE HANDLER")
}


exports.writeFileData = function (filePath, data) {
    
    try {
        fs.writeFileSync(__dirname + "/" + filePath, data);
        // console.log(data)
    } catch (error) {
        console.log(error)
        data = null;
    }

    // console.log("HELLO FROM FILE HANDLER")
}
