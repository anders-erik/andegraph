const db = require('../persistence/sqlite');


module.exports = async (req, res) => {
    console.log('post shard');
    try {
        await db.newShard();
    } catch (error) {
        console.log('error on new shard!');
    }
    
    res.send({});
};



