
const { getDb } = require('../../db/Db-v0.2.js');

let db = getDb();


async function Source_SelectLikeString(searchString) {
    return new Promise((acc, rej) => {


        // https://stackoverflow.com/questions/63652590/issue-in-sqlite-while-using-node-js-like-operator-and-parameters
        searchString = '%' + searchString + '%';


        let queryString = `
        
        SELECT * FROM "Source"
        WHERE Title LIKE ?
                    
        ;`;

        db.all(queryString,
            [searchString],
            (err, rows) => {
                if (err) return rej(err);

                acc(rows);
            });

    });
}

module.exports = {
    Source_SelectLikeString,
}

