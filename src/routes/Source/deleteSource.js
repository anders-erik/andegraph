const sourceQueries = require('../../sql/SourceQueries');
//const queries = require('../../persistence/Queries');
const sourceReviewDatesQueries = require('../../sql/SourceReviewDatesQueries');

const fs = require('node:fs/promises');

module.exports = async (req, res) => {
    
    let sourceId = req.query.sourceid;

    // Delete files
    try {
        fs.rm(`/data/live/sources/${sourceId}`, { recursive: true });
        console.log(`Source directories successfully deleted @ /data/live/sources/${sourceId}`)

    } catch (error) {

        console.log(`Failed to delete directories @ /data/live/sources/${sourceId}`)
        res.sendStatus(400);
        throw error;
    }



    // Delete review-dates
    try {
        // Source cannot be deleted unless entries with foreign keys pointing to the source are deleted first 
        //await queries.queryString(`DELETE FROM sourceReviewDates WHERE sourceId = ${sourceId}`);
        await sourceReviewDatesQueries.deleteAllReviewDates(sourceId);
        console.log(`Source review date successfully deleted for source no. ${sourceId}`)

    } catch (error) {
        //console.log(error);
        
        console.log(`Source review date successfully deleted for source no. ${sourceId}`);
        res.sendStatus(400);
    }



    // Delete source from Database
    try {
        await sourceQueries.deleteSource(sourceId);
        console.log(`Source no. ${sourceId} was successfully deleted from the database.`)

    } catch (error) {
        //console.log(error);
        console.log(`Source no. ${sourceId} was NOT successfully deleted from the database.`);
        res.sendStatus(400);
    }

    

    res.sendStatus(200);
};
