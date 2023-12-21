
const shardQueries = require('../../../../persistence/ShardQueries');

const fs = require('node:fs');

module.exports = async (req, res) => {

    
    let sourceid = req.params.sourceid;
    let shardid = req.params.shardid;


    console.log('Putting new shard file for shardid = ' + shardid);


    let reqContentType = req.get('Content-Type');
    // req.is(); // depreciated ??

    // Client needs to set file type/fileneding
    if (!reqContentType) {
        console.log(`400 @ /api/source/${sourceid}/shard/${shardid}/file. Content-type header not found.`);
        res.status(400);
        res.send({ 'message': `400 @ /api/source/${sourceid}/shard/${shardid}/file. Content-type header not found.` });
    }

    let fileType = req.get('Content-fileType');
    let fileEnding = req.get('Content-fileEnding');
    //console.log('fileType: ' + req.get('Content-fileType'));
    //console.log('fileEnding: ' + req.get('Content-fileEnding'));


    // make sure shard exists
    let queryShard = await shardQueries.selectShard(shardid);

    if (queryShard == '') {
        console.log('shard does not exist');
        res.status(400).send({ 'message': `Shard not found` })
    }
    else {

        try {

            // REMOVE CURRENT SHARD FILE
            fs.rm(`/data/live/sources/${sourceid}/shards/${shardid}_sh.${queryShard[0].fileEnding}`, (error) => {

                



                try {


                    // Write new file
                    fs.appendFile(`/data/live/sources/${sourceid}/shards/${shardid}_sh.${fileEnding}`, Buffer.from(new Uint8Array(req.body)), function (err) {
                        if (err) throw err;
                        //console.log(`File for source #${sourceid} saved successfully at /data/live/sources/${sourceid}/${sourceid}.${fileEnding}`);
    
                        // if image write was succesful, update file fields in db
                        //await sqlite.queryString(`UPDATE sources SET fileType='${fileType}', fileEnding='${fileEnding}', hasFile=1 WHERE id='${sourceid}'`);
                        shardQueries.updateShardFileInfo(shardid, fileType, fileEnding).then(() => {
    
                            //console.log(`File info for source #${sourceid} successfully updated in database.`);
                            res.status(200);
                            res.send({ 'message': `File saved successfully for shard #${sourceid}` });
    
                        })
                    });
    
    
                } catch (error) {
    
                    //console.log(`Error @ /api/source/file/${sourceid}. Unable to properly create new file. `);
    
                    res.status(500).message({ 'message': `unable to write the new shard file for shardId = ${shardid}` });
                    //res.send({'message': `Error @ /api/source/file/${sourceid}. Unable to properly create new file. `});
                }

            })




        } catch (error) {
            res.status(400).message({ 'message': `unable to remove old shard file for shardId = ${shardid}` });

        }





    }



};
