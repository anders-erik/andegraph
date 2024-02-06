
const { getDb } = require('../../db/ErigraphDB');
let db = getDb();


async function Node_SelectOnUuid(nodeUuid) {
    return new Promise((acc, rej) => {



        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

            SELECT * FROM Node
            WHERE
                Uuid = ?
        ;`;


        db.all(queryString,
            [nodeUuid],
            (err, rows) => {
               if (err) return rej(err);

               acc(rows);

           });

    });
}

module.exports = {
    Node_SelectOnUuid,
}

