//const connection = require('../persistence/Connection');

//const sqlite = require('../../persistence/SourceQueries');
const sourceReviewDatesQueries = require('../../../persistence/SourceReviewDatesQueries');



module.exports = async (req, res) => {
    //console.log(req.headers.id)

    //const items = await sqlite.getSource(req.headers.id);

    // 1 -> complete review
    // 0 -> uncomplete review 
    if( req.query.complete == 1 ){
        const sourceReviewDates = await sourceReviewDatesQueries.completeReviewDate(req.query.reviewdate, req.query.sourceid);
        console.log(`Patched: Review-Date for sourceid ${req.query.sourceid}, on the date ${req.query.reviewdate} marked as completed.`);
        res.send({'message': `Patched: Review-Date for sourceid ${req.query.sourceid}, on the date ${req.query.reviewdate} marked as completed.`});
    }
    else if ( req.query.complete == 0 ){
        const sourceReviewDates = await sourceReviewDatesQueries.uncompleteReviewDate(req.query.reviewdate, req.query.sourceid);
        console.log(`Patched: Review-Date for sourceid ${req.query.sourceid}, on the date ${req.query.reviewdate} marked as NOT completed. `);
        res.send({'message': `Patched: Review-Date for sourceid ${req.query.sourceid}, on the date ${req.query.reviewdate} marked as NOT completed.`});
    }
    else {
        console.log('Bad request @ PATCH, /api/source/reviewdate/ : Invalid `complete` query value.')
        res.status(400).send({'message': 'Bad request @ PATCH, /api/source/reviewdate/ : Invalid `complete` query value.'})
    }
    
    

    
};


