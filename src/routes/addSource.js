const db = require('../persistence/sqlite');
const fs = require('node:fs/promises');


module.exports = async (req, res) => {
    
    await db.storeSource();

    // get id of new source
    let queryReturn = await db.queryString('SELECT MAX(id) FROM sources');
    let sourceId = Object.values(queryReturn[0])[0];
    console.log('New Source id: ' + sourceId);

    // Add directories
    await fs.mkdir(`/data/live/sources/${sourceId}`);
    await fs.mkdir(`/data/live/sources/${sourceId}/shards`);


    // generate review schedule
    let today = new Date(Date.now());
    let todayDateIsoString = today.toISOString().slice(0,10);
    for(let i = 0; i < 10; i++){
        let today = new Date(Date.now() + 86_400_000*2**i );
        let todayDateIsoString = today.toISOString().slice(0,10);
        await db.addReviewDate(todayDateIsoString, sourceId);

    }
   
    //console.log(Object.values(queryReturn[0])[0]);

    res.send({'id': Object.values(queryReturn[0])[0] });
};



