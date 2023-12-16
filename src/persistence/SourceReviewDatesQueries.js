
const connection = require('./Connection');

async function addReviewDate(date, sourceId){
    return new Promise((acc, rej) => {

        connection.db.run(
            'INSERT INTO sourceReviewDates (date, completed, sourceId) values(?, 0, ?)',
            [date, sourceId],
            (err, rows)  => {
                if (err){
                    return rej(err);
                } 
                acc();
            },
        );
    });
}

async function selectReviewDates(sourceId) {
    return new Promise((acc, rej) => {
        connection.db.all('SELECT * FROM sourceReviewDates WHERE sourceId=?', [sourceId], (err, rows) => {
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
    addReviewDate,
	selectReviewDates
}
