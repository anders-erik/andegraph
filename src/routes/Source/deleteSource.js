const sourceQueries = require('../../persistence/SourceQueries');
//const queries = require('../../persistence/Queries');
const sourceReviewDatesQueries = require('../../persistence/SourceReviewDatesQueries');

const fs = require('node:fs/promises');

module.exports = async (req, res) => {
    
    

    // Delete files
    try {
        fs.rm(`/data/live/sources/${req.params.id}`, { recursive: true });
        console.log(`Source directories successfully deleted @ /data/live/sources/${req.params.id}`)

    } catch (error) {

        console.log(`Failed to delete directories @ /data/live/sources/${req.params.id}`)
        res.sendStatus(400);
        throw error;
    }



    // Delete review-dates
    try {
        // Source cannot be deleted unless entries with foreign keys pointing to the source are deleted first 
        //await queries.queryString(`DELETE FROM sourceReviewDates WHERE sourceId = ${req.params.id}`);
        await sourceReviewDatesQueries.deleteAllReviewDates(req.params.id);
        console.log(`Source review date successfully deleted for source no. ${req.params.id}`)

    } catch (error) {
        //console.log(error);
        
        console.log(`Source review date successfully deleted for source no. ${req.params.id}`);
        res.sendStatus(400);
    }



    // Delete source from Database
    try {
        await sourceQueries.deleteSource(req.params.id);
        console.log(`Source no. ${req.params.id} was successfully deleted from the database.`)

    } catch (error) {
        //console.log(error);
        console.log(`Source no. ${req.params.id} was NOT successfully deleted from the database.`);
        res.sendStatus(400);
    }

    

    res.sendStatus(200);
};
