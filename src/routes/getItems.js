const db = require('../persistence/sqlite');

module.exports = async (req, res) => {
    const items = await db.getItems();
    res.send(items);
};
