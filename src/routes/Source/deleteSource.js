const sourceQueries = require('../../persistence/SourceQueries');
const queries = require('../../persistence/Queries');
const fs = require('node:fs/promises');

module.exports = async (req, res) => {

    
    try {
        fs.rm(`/data/live/sources/${req.params.id}`, { recursive: true });
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
    
    
    // Source cannot be deleted unless entries with foreign keys pointing to the source are deleted first 
    await queries.queryString(`DELETE FROM sourceReviewDates WHERE sourceId = ${req.params.id}`);
    


    await sourceQueries.deleteSource(req.params.id);
    
    res.sendStatus(200);
};
