const shardQueries = require('../../../persistence/ShardQueries');

const fs = require('node:fs/promises');


module.exports = async (req, res) => {
    console.log('delete shard');

    let sourceid = req.params.sourceid;
    let shardid = req.params.shardid;
    //console.log(shardid);

    // Cant use wildcard?
    // https://stackoverflow.com/questions/14917757/delete-unlink-files-matching-a-regex
    let shard = (await shardQueries.selectShard(shardid))[0];
    //console.log(shard);


    // check if shard exists
    let queryShard = await shardQueries.selectShard(shardid);
    if (queryShard == '') {
        console.log('shard does not exist');
        res.status(400).send({ 'message': `Shard not found` })
    }
    else {

        // If there is a filetype -> remove file
        if (shard.fileType !== null) {
            console.log('shard file detected during deletion ');

            let filePath = `/data/live/sources/${sourceid}/shards/${shardid}_sh.${shard.fileEnding}`;


            // Delete shard file
            try {


                await fs.rm(filePath);

                console.log(`Source directories successfully deleted @ ${filePath}`)

            } catch (error) {

                console.log(`Failed to delete shardfile @ ${filePath}`)
                res.sendStatus(400);
                throw error;
            }

        }
        else{
            console.log('no shard file during deletion');
            
        }




        // OLD
        try {
            let rows = await shardQueries.deleteShard(shardid);
            console.log(`Shard no. ${shardid} was successfully deleted from database.`)
            res.status(200).send({});
        } catch (error) {
            console.log(`Shard no. ${shardid} was NOT successfully deleted from database.`);
            res.status(404).send({ 'message': `Shard no. ${shardid} was NOT successfully deleted from database.` });
        }

    }




};



