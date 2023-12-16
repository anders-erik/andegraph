
const connection = require('./Connection');



async function getSources() {

	//console.log(connection.db);
	//console.log('|||||||||||');

    return new Promise((acc, rej) => {
        connection.db.all('SELECT * FROM sources', (err, rows) => {
            if (err) return rej(err);
            acc(
                rows.map(item =>
                    Object.assign({}, item, {
                        completed: item.completed === 1,
                    }),
                ),
            );
        });
    });
}


module.exports = {
	getSources
}
