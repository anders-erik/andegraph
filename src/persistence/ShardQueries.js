
const connection = require('./Connection');



async function newShard() {
    return new Promise((acc, rej) => {
        connection.db.run(
            "INSERT INTO shards (sourceId) values(1)",
            err => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}



module.exports = {
	newShard
}
