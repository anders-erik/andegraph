const db = require('../persistence/sqlite');

module.exports = async (req, res) => {

    // Source wont be deleted unles entries with foreign keys pointing to the source to be deleted are removed first 
    await db.queryString(`DELETE FROM sourceReviewDates WHERE sourceId = ${req.params.id}`);
    
    await db.deleteSource(req.params.id);
    
    res.sendStatus(200);
};
