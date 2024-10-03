
const { getDb } = require('../../db/Db.js');
let db = getDb();


async function Edge_DeleteOnNodeUuids(Uuid1, Uuid2) {
    return new Promise((acc, rej) => {


        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

            DELETE FROM Edge
            WHERE
                ( Node1Uuid = ? AND Node2Uuid = ? )
            OR
                ( Node2Uuid = ? AND Node1Uuid = ? )
            
        ;`;


        db.all(queryString,
            [Uuid1, Uuid2, Uuid1, Uuid2],
            (err, rows) => {
                if (err){
                    console.log("Error when deleting edge in node uuids. In file : ", __filename);
                    return rej(err);
                } 

                acc(1);

            });

    });
}

module.exports = {
    Edge_DeleteOnNodeUuids,
}

