
const { getDb } = require('../../db/Db.js');
let db = getDb();


async function Review_Insert(reviewObject) {
    return new Promise((acc, rej) => {


        //codeObject.Uuid = newUuid();

        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

            INSERT INTO "Review" ("Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange", "ReviewDate", "ReviewCompleted", "ReviewCompletedOnDate", "NodeToReviewUuid")
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        
        ;`;

        db.all(queryString,
            [reviewObject.Uuid, reviewObject.Table, reviewObject.Type, reviewObject.Title, reviewObject.TimeCreated, reviewObject.TimeLastChange, reviewObject.ReviewDate, reviewObject.ReviewCompleted, reviewObject.ReviewCompletedOnDate, reviewObject.NodeToReviewUuid],
            (err, rows) => {
                if (err) return rej(err);

                acc(1);
            });

    });
}

module.exports = {
    Review_Insert,
}

