
const fs = require('node:fs');

module.exports = async (req, res) => {
    //console.log(req.headers.id)

    //console.log(req.query.fileName)

    const file = `/data/live/files/${req.query.fileName}`;

    console.log(`POSTing file #${req.query.fileName}, at path ${file}`);


    if(fs.existsSync(file)){
        console.log(`Can't POST. File already exist ${file}.`);
        res.status(400);
        res.send({'message': `Can't POST. File already exist ${file}.`})
    } 
    else {

        try {
            // https://stackoverflow.com/questions/39395195/how-to-write-wav-file-from-blob-in-javascript-node
            //console.log(Buffer.from(new Uint8Array( req.body )));
            fs.writeFile(file, Buffer.from(new Uint8Array(req.body)), function (err) {
                if (err) throw err;
                console.log(`File #${req.query.fileName} saved successfully at ${file}`);
    
            });
    
            res.status(200);
            res.send({'message': `Success. File created at ${file}.`})
    
        } catch (error) {
    
            console.log(`Error @ /api/file/${req.query.fileName}. Unable to properly create new file. `);
    
            res.status(500);
            res.send({'message': `Error @ /api/file/${req.query.fileName}. Unable to properly create new file. `});
        }

    }

	

    //console.log(req.body)

	
    

    
};