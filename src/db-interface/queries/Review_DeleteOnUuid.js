
const { getDb } = require('../../db/ErigraphDB');
let db = getDb();


async function Review_DeleteOnUuid(Uuid) {
    return new Promise((acc, rej) => {



        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

            DELETE FROM Review
            WHERE
                Uuid = ?
        
        ;`;


        db.all(queryString,
            [Uuid],
            (err, rows) => {
               if (err) return rej(err);

               acc(1);

           });

    });
}

module.exports = {
    Review_DeleteOnUuid,
}

