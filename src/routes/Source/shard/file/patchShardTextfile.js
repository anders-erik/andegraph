
const shardQueries = require('../../../../persistence/ShardQueries');


module.exports = async (req, res) => {

    console.log('patching shard textfile');

    let sourceid = req.params.sourceid;
    let shardid = req.params.shardid;



    let fileEnding = req.get('Content-fileEnding');
    console.log(fileEnding)


    let queryShard = await shardQueries.selectShard(shardid);

    if (queryShard == '') {
        console.log('shard does not exist');
        res.status(400).send({ 'message': `Shard not found` })
    }
    else {

        

        try {


            //let textContent = await req.body.text();
                //console.log( req.body);
                //console.log( Buffer.from(req.body).toString('utf-8'));
                //let textContent = Buffer.from(req.body).toString('utf-8');
                console.log('TEXT : ', req.body.textContent)

                //console.log('TEXT - WRITE TO DB INSTEAD');
    
                // console.log('a');
                await shardQueries.updateShardFileInfo(shardid, 'text', fileEnding, req.body.textContent);
                // console.log('b');
                
                res.status(200);
                res.send({ 'message': `Textshard patched successfully : id = #${shardid}` });


        } catch (error) {

            //console.log(`Error @ /api/source/file/${sourceid}. Unable to properly create new file. `);

            res.status(500).message({ 'message': `unable to post new shard file for shardId = ${shardid}` });
            //res.send({'message': `Error @ /api/source/file/${sourceid}. Unable to properly create new file. `});
        }



    }



};
