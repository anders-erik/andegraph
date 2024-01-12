
const shardQueries = require('../../../../sql/ShardQueries');

const fs = require('node:fs');

module.exports = async (req, res) => {

    console.log('posting shard file');

    let sourceid = req.params.sourceid;
    let shardid = req.params.shardid;


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


    let queryShard = await shardQueries.selectShard(shardid);

    if (queryShard == '') {
        console.log('shard does not exist');
        res.status(400).send({ 'message': `Shard not found` })
    }
    else {

        

        try {

            if(fileType == 'text'){

                //let textContent = await req.body.text();
                //console.log( req.body);
                //console.log( Buffer.from(req.body).toString('utf-8'));
                let textContent = Buffer.from(req.body).toString('utf-8');
                console.log('TEXT : ', textContent)

                //console.log('TEXT - WRITE TO DB INSTEAD');
    
                // console.log('a');
                await shardQueries.updateShardFileInfo(shardid, fileType, fileEnding, textContent);
                // console.log('b');
                
                res.status(200);
                res.send({ 'message': `File saved successfully for source #${sourceid}` });
                


            }
            else{

                fs.appendFile(`/data/live/sources/${sourceid}/shards/${shardid}_sh.${fileEnding}`, Buffer.from(new Uint8Array(req.body)), function (err) {
                    if (err) throw err;
                    //console.log(`File for source #${sourceid} saved successfully at /data/live/sources/${sourceid}/${sourceid}.${fileEnding}`);
    
                    // if image write was succesful, update file fields in db
                    //await sqlite.queryString(`UPDATE sources SET fileType='${fileType}', fileEnding='${fileEnding}', hasFile=1 WHERE id='${sourceid}'`);
                    shardQueries.updateShardFileInfo(shardid, fileType, fileEnding, '').then(() => {
    
                        //console.log(`File info for source #${sourceid} successfully updated in database.`);
                        res.status(200);
                        res.send({ 'message': `File saved successfully for source #${sourceid}` });
    
                    })
                });

            }


        } catch (error) {

            //console.log(`Error @ /api/source/file/${sourceid}. Unable to properly create new file. `);

            res.status(500).message({ 'message': `unable to post new shard file for shardId = ${shardid}` });
            //res.send({'message': `Error @ /api/source/file/${sourceid}. Unable to properly create new file. `});
        }



    }



};
