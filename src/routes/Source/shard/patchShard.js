const shardQueries = require('../../../persistence/ShardQueries');


module.exports = async (req, res) => {
    console.log('patch shard');

    let shardid = req.params.shardid;
    console.log(shardid);

    let prompt = req.query.prompt;
    console.log(prompt);
    
    
    
    try {
        await shardQueries.updateShard(shardid, prompt);

        let updateCheck =  await shardQueries.selectShard(shardid);
        //console.log('new prompt: ', updateCheck);
        
        if(updateCheck[0].prompt == prompt)
            console.log('shard patch good');
        else
            console.log('shard patch failed');
            
            
        
        res.send(updateCheck);


    } catch (error) {
        throw error;
        console.log('error on get shard!');
        res.status(404).send({'message': 'error patching shard'});
    }
    
    
};



