const db = require('../persistence/sqlite');

function randomNumber() {
    return Math.floor(Math.random() * 100000) + 1;
  }

module.exports = async (req, res) => {
    const item = {
        id: randomNumber(),
        name: req.body.name,
        completed: false,
    };

    await db.storeItem(item);
    res.send(item);
};



