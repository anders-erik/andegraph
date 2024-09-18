
const { getDb } = require('../../db/Db-v0.2.js');
let db = getDb();


async function Edge_DeleteOnEdgeUuid(edgeUuid) {
    return new Promise((acc, rej) => {


        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

            DELETE FROM Edge
            WHERE
                Uuid = ?
        
        ;`;


        db.all(queryString,
            [edgeUuid],
            (err, rows) => {
                if (err) return rej(err);

                acc(1);

            });

    });
}

module.exports = {
    Edge_DeleteOnEdgeUuid,
}

