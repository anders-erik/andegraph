const sqlite = require('../../../persistence/Queries');

module.exports = async (req, res) => {


    let querySource = await sqlite.queryString(`SELECT * FROM sources WHERE id=${req.params.id}`);
    
    //console.log(`/data/live/sources/${req.params.id}.${queryReturn[0].fileEnding}`);
    const file = `/data/live/sources/${req.params.id}/${req.params.id}.${querySource[0].fileEnding}`;

    
    res.download(file); 
};
