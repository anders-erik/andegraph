//const connection = require('../persistence/Connection');

//const sqlite = require('../../persistence/SourceQueries');
const sourceReviewDatesQueries = require('../../../sql/SourceReviewDatesQueries');

module.exports = async (req, res) => {
    //console.log(req.headers.id)

    //const items = await sqlite.getSource(req.headers.id);
    const sourceReviewDates = await sourceReviewDatesQueries.selectReviewDates(req.query.sourceid);
    
    //console.log(req.param('id')); // depreciated
    //console.log(req.query.id);
    //console.log(sourceReviewDates);

    //items[0]['sourceReviewDates'] = sourceReviewDates;

    //console.log(items);

    console.log(`Review Dates for source id ${req.query.sourceid} returned.`);
    res.send(sourceReviewDates);
    
};


