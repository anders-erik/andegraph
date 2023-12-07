const db = require('../persistence/sqlite');


module.exports = async (req, res) => {
    
    await db.storeSource();


    // get id of new source
    let queryReturn = await db.queryString('SELECT MAX(id) FROM sources');
    console.log('New Source id: ' + Object.values(queryReturn[0])[0]);
    //console.log(Object.values(queryReturn[0])[0]);

    res.send({'id': Object.values(queryReturn[0])[0] });
};



