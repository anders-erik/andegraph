
const { getDb } = require('../../db/ErigraphDB');

let db = getDb();


async function Review_SelectCurrentReview() {
    return new Promise((acc, rej) => {

        // let todayIso = '"' + (new Date(Date.now())).toISOString().substring(0, 10) + '"';
        let todayIso = (new Date(Date.now())).toISOString().substring(0, 10);

        console.log(todayIso)

        let queryString = `
        
        SELECT * FROM "Review"
        WHERE 
            ReviewCompleted = 0
        AND
            ReviewDate <= "${todayIso}"
        
        ORDER BY ReviewDate ASC
        LIMIT 300
        ;`;

        db.all(queryString,
            (err, rows) => {
                if (err) return rej(err);

                acc(rows);
            });

    });
}

module.exports = {
    Review_SelectCurrentReview,
}

