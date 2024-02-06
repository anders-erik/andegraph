
const { getDb } = require('../../db/ErigraphDB');
let db = getDb();


async function Code_DeleteOnUuid(codeUuid) {
    return new Promise((acc, rej) => {



        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

            DELETE FROM Code
            WHERE
                Uuid = ?
        
        ;`;


        db.all(queryString,
            [codeUuid],
            (err, rows) => {
               if (err) return rej(err);

               acc(1);

           });

    });
}

module.exports = {
    Code_DeleteOnUuid,
}

