const sourceQueries = require('../../persistence/SourceQueries');
//const sqlite = require('../../persistence/Queries');
const sourceReviewDatesQueries = require('../../persistence/SourceReviewDatesQueries');
const fs = require('node:fs/promises');


module.exports = async (req, res) => {
    
    await sourceQueries.insertEmptySource();

    // get id of new source
    //let queryReturn_ = await sqlite.queryString('SELECT MAX(id) FROM sources');
    let queryReturn = await sourceQueries.selectMaxId();
    
    let newSourceId = Object.values(queryReturn[0])[0];
    console.log('New Source id: ' + newSourceId);

    //console.log('New Source id:__ ' + Object.values(queryReturn_[0])[0]);


    // Add directories
    try {

        await fs.mkdir(`/data/live/sources/${newSourceId}`);
        await fs.mkdir(`/data/live/sources/${newSourceId}/shards`);

    } catch (error) {

        sourceQueries.deleteSource(newSourceId);

        console.log('Unable to create new source directory or shard directory');
        console.log(error);

    }
    
    


    // generate review schedule
    //let today = new Date(Date.now());
    //let todayDateIsoString = today.toISOString().slice(0,10);
    for(let i = 0; i < 10; i++){
        let today = new Date(Date.now() + 86_400_000*2**i );
        let todayDateIsoString = today.toISOString().slice(0,10);
        await sourceReviewDatesQueries.insertReviewDate(todayDateIsoString, newSourceId);

    }
   
    //console.log(Object.values(queryReturn[0])[0]);

    console.log(`New empty source created. Source id: ${newSourceId}`)
    res.send({'id': newSourceId });
};



