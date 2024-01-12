
const connection = require('./Connection');

async function insertReviewDate(date, sourceId){
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
        connection.db.all('SELECT * FROM sourceReviewDates WHERE sourceId=? ORDER BY date ASC', [sourceId], (err, rows) => {
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

async function selectReviewDateExists(date, sourceId) {
    return new Promise((acc, rej) => {
        connection.db.all('SELECT EXISTS(SELECT 1 FROM sourceReviewDates WHERE date=? AND sourceId=?)', [date, sourceId], (err, rows) => {
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

async function deleteReviewDate(date, sourceId){
    return new Promise((acc, rej) => {

        connection.db.run(
            'DELETE FROM sourceReviewDates WHERE date = ? AND sourceId = ?',
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

async function deleteFutureReviewDates(sourceId){
    return new Promise((acc, rej) => {

        connection.db.run(
            "DELETE FROM sourceReviewDates WHERE date > DATE('now') AND sourceId = ?",
            [sourceId],
            (err, rows)  => {
                if (err){
                    return rej(err);
                } 
                acc();
            },
        );
    });
}

async function deleteAllReviewDates(sourceId) {
    return new Promise((acc, rej) => {
        connection.db.all('DELETE FROM sourceReviewDates WHERE sourceId = ?', [sourceId], (err, rows) => {
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

async function completeReviewDate(date, sourceId){
    return new Promise((acc, rej) => {

        connection.db.run(
            'UPDATE sourceReviewDates SET completed = 1 WHERE date = ? AND sourceId = ?',
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

async function uncompleteReviewDate(date, sourceId){
    return new Promise((acc, rej) => {

        connection.db.run(
            'UPDATE sourceReviewDates SET completed = 0 WHERE date = ? AND sourceId = ?',
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

module.exports = {
    insertReviewDate,
	selectReviewDates,
    selectReviewDateExists,
    deleteReviewDate,
    deleteFutureReviewDates,
    deleteAllReviewDates,
    completeReviewDate,
    uncompleteReviewDate
}
