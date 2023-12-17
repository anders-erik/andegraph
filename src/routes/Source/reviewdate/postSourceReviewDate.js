//const connection = require('../persistence/Connection');

//const sqlite = require('../../persistence/SourceQueries');
const sourceReviewDatesQueries = require('../../../persistence/SourceReviewDatesQueries');

module.exports = async (req, res) => {
    //console.log(req.headers.id)

    //const items = await sqlite.getSource(req.headers.id);
    

    if(req.query.setschedule == 1){

        await setSchedule(req, res);
        
    }
    else if (req.query.setschedule == 0){


        if( !(await reviewDateAlreadyExists(req.query.reviewdate, req.query.sourceid) )){

            const sourceReviewDates = await sourceReviewDatesQueries.insertReviewDate(req.query.reviewdate, req.query.sourceid);
            console.log(`Review Date for source id ${req.query.sourceid}, on the date ${req.query.reviewdate} created. `);
            res.send({'message': `Review Date for source id ${req.query.sourceid}, on the date ${req.query.reviewdate} created.`});
       
        }
        else {
        
            console.log(`Review Date for source id ${req.query.sourceid}, on the date ${req.query.reviewdate} already exists. `);
            res.send({'message': `Review Date for source id ${req.query.sourceid}, on the date ${req.query.reviewdate} already exists.`});
        
        }
        
    }
    

    //items[0]['sourceReviewDates'] = sourceReviewDates;

    //console.log(items);

    
};



async function setSchedule(req, res) {
    let sourceid = req.query.sourceid;
    let schedule = req.query.schedule;
    let offset = req.query.offset;

    

    await sourceReviewDatesQueries.deleteFutureReviewDates(sourceid);
    

    // generate review schedule
    //let today = new Date(Date.now());
    //let todayDateIsoString = today.toISOString().slice(0, 10);

    for (let i = offset; i < 10; i++) {
        let today = new Date(Date.now() + 86_400_000 * 2 ** i);
        let todayDateIsoString = today.toISOString().slice(0, 10);
        await sourceReviewDatesQueries.insertReviewDate(todayDateIsoString, sourceid);

    }

    console.log(`Generated schedule for sourceid: ${sourceid}, using schedule type: ${schedule}, with an offset of: ${offset}`);
    res.send({'message': `Generated schedule for sourceid: ${sourceid}, using schedule type: ${schedule}, with an offset of: ${offset}`});
}






async function reviewDateAlreadyExists(reviewdate, sourceid){
    let dateExistsArray = await sourceReviewDatesQueries.selectReviewDateExists(reviewdate, sourceid);
    let dateExistsObject = dateExistsArray[0];
    let dateExistsNum = Object.values(dateExistsObject)[0];

    //console.log( dateExistsNum );
    
    return dateExistsNum;
}




