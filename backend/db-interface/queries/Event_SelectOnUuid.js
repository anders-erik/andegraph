
const { getDb } = require('../../db/Db.js');

let db = getDb();


async function Event_SelectOnUuid(Uuid) {
    return new Promise((acc, rej) => {


        //let codeObject = newCode();

        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `
        
        SELECT * FROM "Event"
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
    Event_SelectOnUuid,
}

