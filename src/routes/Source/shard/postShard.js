const shardQueries = require('../../../sql/ShardQueries');


module.exports = async (req, res) => {
    console.log('post shard');

    let sourceid = req.params.sourceid;
    console.log(sourceid);
    
    
    try {
        await shardQueries.insertShard(sourceid);
        let rows = await shardQueries.selectShardsOnSourceid(sourceid);
        res.send(rows);
    } catch (error) {
        console.log('error on new shard!');
        console.log(error)
        res.status(404).send({'message': 'error posting shard'});
    }
    
    
};



