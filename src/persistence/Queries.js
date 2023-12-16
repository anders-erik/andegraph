
const connection = require('./Connection');


async function queryString(string) {
    return new Promise((acc, rej) => {
        connection.db.all(
            string,
            (err, rows) => {
                if (err) return rej(err);
                acc(rows);
            },
        );
        return 'query ok :)';
    });
}


module.exports = {
    queryString
}
