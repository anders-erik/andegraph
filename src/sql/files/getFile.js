

const sourceQueries = require('../../../sql/SourceQueries');

module.exports = async (req, res) => {


    //let querySource = await sqlite.queryString(`SELECT * FROM sources WHERE id=${req.params.id}`);
    let querySource = await sourceQueries.selectSource(req.params.id);

    
    //console.log(`/data/live/sources/${req.params.id}.${queryReturn[0].fileEnding}`);
    const file = `/data/live/files/${req.params.id}_so.${querySource[0].fileEnding}`;

    console.log(`Downloaded file for source #${req.params.id}, at path ${file}`);
    res.download(file); 
};



