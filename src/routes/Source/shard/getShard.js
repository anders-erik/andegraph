const shardQueries = require('../../../persistence/ShardQueries');


module.exports = async (req, res) => {
    

    let sourceid = req.params.sourceid;
    //console.log(sourceid);
    console.log('get shards for source ' + sourceid);
    
    try {
        let rows = await shardQueries.selectShardsOnSourceid(sourceid);
        res.send(rows);
    } catch (error) {
        console.log('error on get shard!');
        res.status(404).send({'message': 'error getting shard'});
    }
    
    
};



