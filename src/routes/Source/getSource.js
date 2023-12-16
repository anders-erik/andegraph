//const connection = require('../persistence/Connection');

const sqlite = require('../../persistence/SourceQueries');
const sourceReviewDatesQueries = require('../../persistence/SourceReviewDatesQueries');

module.exports = async (req, res) => {
    //console.log(req.headers.id)

    const items = await sqlite.getSource(req.headers.id);
    const sourceReviewDates = await sourceReviewDatesQueries.selectReviewDates(req.headers.id);
    console.log(sourceReviewDates);
    items[0]['sourceReviewDates'] = sourceReviewDates;

    console.log(items);

    res.send(items);
};
