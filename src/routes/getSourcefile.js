const db = require('../persistence/sqlite');

module.exports = async (req, res) => {
    
    
    const file = `/data/sources/${req.params.id}.bmp`;
    res.download(file); 
};
