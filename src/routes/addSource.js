const db = require('../persistence/sqlite');

function randomNumber() {
    return Math.floor(Math.random() * 100000) + 1;
  }

module.exports = async (req, res) => {
    /*
    const item = {
        id: randomNumber(),
        name: req.body.name,
        url: req.body.url,
        date: req.body.date
    };

    await db.storeSource(item);
    res.send(item);
    */
   let newId = randomNumber();
    await db.storeSource();
    res.send({});
};



