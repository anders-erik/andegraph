const devtest_dbR = require('./sqlite_devtests');
//devtest_db.init();

module.exports = async (req, res) => {
    console.log('addTableRoute');
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
    //let newId = randomNumber();
    //await devtest_dbR.createTable();
    await devtest_dbR.addToTable();

    res.send({'a':'a'});
};



