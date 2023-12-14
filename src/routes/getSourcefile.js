const db = require('../persistence/sqlite');

module.exports = async (req, res) => {


    let querySource = await db.queryString(`SELECT * FROM sources WHERE id=${req.params.id}`);
    
    //console.log(`/data/live/sources/${req.params.id}.${queryReturn[0].fileEnding}`);
    const file = `/data/live/sources/${req.params.id}/${req.params.id}.${querySource[0].fileEnding}`;

    
    res.download(file); 
};
