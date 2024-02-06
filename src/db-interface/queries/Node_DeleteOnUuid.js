
const { getDb } = require('../../db/ErigraphDB');
let db = getDb();


async function Node_DeleteOnUuid(nodeUuid) {
    return new Promise((acc, rej) => {



        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

            DELETE FROM Node
            WHERE
                Uuid = ?
        
        ;`;


        db.all(queryString,
            [nodeUuid],
            (err, rows) => {
               if (err) return rej(err);

               acc(1);

           });

    });
}

module.exports = {
    Node_DeleteOnUuid,
}

