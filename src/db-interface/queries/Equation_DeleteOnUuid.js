
const { getDb } = require('../../db/Db-v0.2.js');
let db = getDb();


async function Equation_DeleteOnUuid(Uuid) {
    return new Promise((acc, rej) => {



        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

            DELETE FROM Equation
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
    Equation_DeleteOnUuid,
}

