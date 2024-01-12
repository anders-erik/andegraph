//const connection = require('../persistence/Connection');

//const sqlite = require('../../persistence/SourceQueries');
const sourceReviewDatesQueries = require('../../../sql/SourceReviewDatesQueries');



module.exports = async (req, res) => {
    //console.log(req.headers.id)

    //const items = await sqlite.getSource(req.headers.id);

    if(req.query.alldates == 0){
        const sourceReviewDates = await sourceReviewDatesQueries.deleteReviewDate(req.query.reviewdate, req.query.sourceid);
        console.log(`Deleted: Review-Date for source id ${req.query.sourceid}, on the date ${req.query.reviewdate}. `);
        res.send({'message': `Deleted: Review-Date for source id ${req.query.sourceid}, on the date ${req.query.reviewdate}. `});
    }
    else if (req.query.alldates == 1){
        const sourceReviewDates = await sourceReviewDatesQueries.deleteAllReviewDates(req.query.sourceid);
        console.log(`Deleted: all review-dates for source id ${req.query.sourceid}. `);

        //console.log('ALLL');
        res.send({'message': `Deleted: all review-dates for source id ${req.query.sourceid}. `});
    }
    else {
        console.log('Bad request @ DELETE, /api/source/reviewdate/ : Invalid `alldates` query.')
        res.status(400).send({'message': 'Bad request @ DELETE, /api/source/reviewdate/ : Invalid `alldates` query.'})
    }
    

    //items[0]['sourceReviewDates'] = sourceReviewDates;

    //console.log(items);

    
};


