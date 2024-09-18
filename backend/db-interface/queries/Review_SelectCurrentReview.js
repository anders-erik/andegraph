
const { getDb } = require('../../db/Db-v0.2.js');

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
                
                if (err){
                    console.log("Error review selection query. FILE: ", __filename);
                    return rej(err);
                }    

                acc(rows);
            });

    });
}

module.exports = {
    Review_SelectCurrentReview,
}

