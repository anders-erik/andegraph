//const sqlite = require('../persistence/sqlite');
const sqlite = require('../../../persistence/SourcesQueries');


module.exports = async (req, res) => {

    //console.log(sqlite.getSources)

    const items = await sqlite.getSources();
    
    console.log(items);
    
    res.send(items);
};
