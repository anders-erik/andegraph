
const { getDb } = require('../../db/Db-v0.2.js');
const { newCode } = require('../../models/Code');

let db = getDb();


async function Code_SelectOnUuid(Uuid) {
    return new Promise((acc, rej) => {


        //let codeObject = newCode();

        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `
        
        SELECT * FROM "Code"
        WHERE Uuid = ?
                    
        ;`;

        db.all(queryString,
            [Uuid],
            (err, rows) => {
                if (err) return rej(err);


                acc(rows);
            });

    });
}

module.exports = {
    Code_SelectOnUuid,
}

