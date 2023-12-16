const sqlite = require('../../../persistence/Queries');
const fs = require('node:fs');

module.exports = async (req, res) => {



    //let source = await db.queryString(`SELECT * FROM sources WHERE id=${req.params.id}`);
    //console.log(source);
    //console.log(req.headers.type);
    //console.log(req.get('Content-Types'));

    let reqContentType = req.get('Content-Type');
    // req.is();

    // Client needs to set file type/fileneding
    if(!reqContentType){
        res.status(400);
        res.send({}); 
    } 

    let fileType = reqContentType.match(/^\w+/g);
    let fileEnding = reqContentType.match(/\w+$/g);
    console.log(fileType);
    console.log(fileEnding);

    //console.log(`/data/live/sources/${req.params.id}.${queryReturn[0].fileEnding}`);
    //const file = `/data/live/sources/${req.params.id}.${queryReturn[0].fileEnding}`;

    //const buffer = req.body;
    //const blob = new Blob([buffer], {type: "application/octet-stream"})

    try {
        // https://stackoverflow.com/questions/39395195/how-to-write-wav-file-from-blob-in-javascript-node
        //console.log(Buffer.from(new Uint8Array( req.body )));
        await fs.appendFile(`/data/live/sources/${req.params.id}/${req.params.id}.${fileEnding}`, Buffer.from(new Uint8Array( req.body )), function (err) {
            if (err) throw err;
            console.log('File saved!');
          });

        // if image write was succesful, update file fields in db
        await sqlite.queryString(`UPDATE sources SET fileType='${fileType}', fileEnding='${fileEnding}', hasFile=1 WHERE id='${req.params.id}'`);
        
          //fs.writeFileSync('/data/live/source/1234.webp', Buffer.from(new Uint8Array( req.body )));
        //console.log('wrote file');
        res.send({}); 
    } catch (error) {
        console.log('Writing file failed!')
        console.log(error);
        res.send({}); 
    }
    

    
    
};
