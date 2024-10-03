
const { getDb } = require('../../db/Db.js');
let db = getDb();


async function Review_Update(reviewObject) {
    return new Promise((acc, rej) => {



        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

            UPDATE "Review" 
            SET 
                "Uuid" = ?, 
                "Table" = ?, 
                "Type" = ?, 
                "Title" = ?, 
                "TimeCreated" = ?, 
                "TimeLastChange" = strftime('%s'), 
                "ReviewDate" = ?,
                "ReviewCompleted" = ?,
                "ReviewCompletedOnDate" = ?,
                "NodeToReviewUuid" = ?
            WHERE 
                Uuid = ?
        
        ;`;


        db.all(queryString,
            [reviewObject.Uuid, reviewObject.Table, reviewObject.Type, reviewObject.Title, reviewObject.TimeCreated, reviewObject.ReviewDate, reviewObject.ReviewCompleted, reviewObject.ReviewCompletedOnDate, reviewObject.NodeToReviewUuid, reviewObject.Uuid],
            (err, rows) => {
                if (err) return rej(err);

                acc(1);

            });

    });
}

module.exports = {
    Review_Update,
}

