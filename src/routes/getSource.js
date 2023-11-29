const db = require('../persistence/sqlite');

module.exports = async (req, res) => {
    //console.log(req.headers.id)
    const items = await db.getSource(req.headers.id);
    res.send(items);
};
