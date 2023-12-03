const db = require('../persistence/sqlite');

module.exports = async (req, res) => {
    await db.deleteSource(req.params.id);
    res.sendStatus(200);
};
