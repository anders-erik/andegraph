const shardQueries = require('../../../persistence/ShardQueries');


module.exports = async (req, res) => {
    console.log('post shard');

    let sourceid = req.params.sourceid;
    console.log(sourceid);
    
    
    try {
        await shardQueries.insertShard(sourceid);
        let rows = await shardQueries.selectShards(sourceid);
        res.send(rows);
    } catch (error) {
        console.log('error on new shard!');
        res.status(404).send({'message': 'error posting shard'});
    }
    
    
};



