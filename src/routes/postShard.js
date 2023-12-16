const sqlite = require('../persistence/ShardQueries');


module.exports = async (req, res) => {
    console.log('post shard');
    try {
        await sqlite.newShard();
    } catch (error) {
        console.log('error on new shard!');
    }
    
    res.send({});
};



