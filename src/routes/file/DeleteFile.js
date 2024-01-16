
const fs = require('node:fs');

module.exports = async (req, res) => {
        //console.log(req.headers.id)

    //console.log(req.query.fileName)

    let fileName = req.params.fileName;

    const file = `/data/live/files/${fileName}`;

    console.log(`POSTing file #${fileName}, at path ${file}`);


    if(!fs.existsSync(file)){
        console.log(`Can't DELETE file. File doesn't exist: ${file}.`);
        res.status(400);
        res.send({'message': `Can't DELETE file. File doesn't exist: ${file}.`})
    } 
    else {

        try {
            // https://stackoverflow.com/questions/39395195/how-to-write-wav-file-from-blob-in-javascript-node
            //console.log(Buffer.from(new Uint8Array( req.body )));
            fs.unlink(file, function (err) {
                if (err) throw err;
                console.log(`File #${fileName} deleted successfully at ${file}`);
    
            });
    
            res.status(200);
            res.send({'message': `Success. File deleted at ${file}.`})
    
        } catch (error) {
    
            console.log(`Error @ /api/file/${fileName}. Unable to delete file. `);
    
            res.status(500);
            res.send({'message': `Error @ /api/file/${fileName}. Unable to delete file. `});
        }

    }

	

    //console.log(req.body)

	
    

    
    
};