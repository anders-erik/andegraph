
const sourceQueries = require('../../../persistence/SourceQueries');

const fs = require('node:fs');

module.exports = async (req, res) => {

    let reqContentType = req.get('Content-Type');
    // req.is(); // depreciated ??

    // Client needs to set file type/fileneding
    if(!reqContentType){
        console.log(`400 @ /api/source/file/${req.params.id}. Content-type header not found.`);
        res.status(400);
        res.send({'message': `400 @ /api/source/file/${req.params.id}. Content-type header not found.`}); 
    } 

    //let fileType = reqContentType.match(/^\w+/g)[0];
    //let fileEnding = reqContentType.match(/\w+$/g)[0];

    let fileType = req.get('Content-fileType');
    let fileEnding = req.get('Content-fileEnding');

    //console.log('fileType: ' + req.get('Content-fileType'));
    //console.log('fileEnding: ' + req.get('Content-fileEnding'));


    //const buffer = req.body;
    //const blob = new Blob([buffer], {type: "application/octet-stream"})

    try {
        // https://stackoverflow.com/questions/39395195/how-to-write-wav-file-from-blob-in-javascript-node
        //console.log(Buffer.from(new Uint8Array( req.body )));
        fs.appendFile(`/data/live/sources/${req.params.id}/${req.params.id}_so.${fileEnding}`, Buffer.from(new Uint8Array(req.body)), function (err) {
            if (err) throw err;
            console.log(`File for source #${req.params.id} saved successfully at /data/live/sources/${req.params.id}/${req.params.id}.${fileEnding}`);

            // if image write was succesful, update file fields in db
            //await sqlite.queryString(`UPDATE sources SET fileType='${fileType}', fileEnding='${fileEnding}', hasFile=1 WHERE id='${req.params.id}'`);
            sourceQueries.updateSourceFileInfo(req.params.id, fileType, fileEnding).then(() => {

                console.log(`File info for source #${req.params.id} successfully updated in database.`);
                res.status(200);
                res.send({'message': `File saved successfully for source #${req.params.id}`});

            })
        });

    } catch (error) {

        console.log(`Error @ /api/source/file/${req.params.id}. Unable to properly create new file. `);

        res.status(500);
        res.send({'message': `Error @ /api/source/file/${req.params.id}. Unable to properly create new file. `});
    }

};
