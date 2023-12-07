const db = require('../persistence/sqlite');

module.exports = async (req, res) => {
    //console.log(req.headers.id)

    const items = await db.getSource(req.headers.id);
    const sourceReviewDates = await db.selectReviewDates(req.headers.id);
    console.log(sourceReviewDates);
    items[0]['sourceReviewDates'] = sourceReviewDates;

    console.log(items);

    res.send(items);
};
