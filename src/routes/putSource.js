const db = require('../persistence/sqlite');


module.exports = async (req, res) => {
    
    const item = {
        id: req.body.id,
        name: req.body.name,
        url: req.body.url,
        date: req.body.date
    };
    console.log('Id: ' + req.body.id);

    let returnedValue = await db.updateSource(item);
    console.log(returnedValue);
    
    res.send(item);
    
   //let newId = randomNumber();
    //await db.storeSource();
    //res.send({});
};



