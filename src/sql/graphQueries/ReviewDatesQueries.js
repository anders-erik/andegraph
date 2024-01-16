
const graphDb = require('../GraphDb');





async function selectReviewDate(reviewDateId) {
    return new Promise((acc, rej) => {
        graphDb.connection.all('SELECT * FROM reviewDates WHERE id=?', [reviewDateId], (err, rows) => {
            if (err) return rej(err);
            acc(rows);
        });
    });
}


async function selectReviewDates(nodeId) {
    return new Promise((acc, rej) => {
        graphDb.connection.all('SELECT * FROM reviewDates WHERE nodeId=? ORDER BY date ASC', [nodeId], (err, rows) => {
            if (err) return rej(err);
            acc(rows);
        });
    });
}



async function reviewDateExists(reviewDateId) {
    return new Promise((acc, rej) => {
        graphDb.connection.all('SELECT EXISTS(SELECT * FROM reviewDates WHERE id=?)', [reviewDateId], (err, rows) => {
            if (err) return rej(err);

            acc(Object.values(rows[0])[0]); // extract bool and 'accept'
        });
    });
}


async function insertReviewDate(reviewDateObject){
    return new Promise((acc, rej) => {

        graphDb.connection.run(
            'INSERT INTO reviewDates (id, date, completed, nodeId) values(?, ?, ?, ?)',
            [reviewDateObject.id, reviewDateObject.date, reviewDateObject.complete, reviewDateObject.nodeId],
            (err, rows)  => {
                if (err){
                    return rej(err);
                } 
                acc();
            },
        );
    });
}



async function completeReviewDate(reviewDateId){
    return new Promise((acc, rej) => {

        graphDb.connection.run(
            'UPDATE reviewDates SET completed = 1 WHERE id = ?',
            [reviewDateId],
            (err, rows)  => {
                if (err){
                    return rej(err);
                } 
                acc();
            },
        );
    });
}

async function uncompleteReviewDate(reviewDateId){
    return new Promise((acc, rej) => {

        graphDb.connection.run(
            'UPDATE reviewDates SET completed = 0 WHERE id = ?',
            [reviewDateId],
            (err, rows)  => {
                if (err){
                    return rej(err);
                } 
                acc();
            },
        );
    });
}


async function deleteReviewDate(reviewDateId){
    return new Promise((acc, rej) => {

        graphDb.connection.run(
            'DELETE FROM reviewDates WHERE id = ?',
            [reviewDateId],
            (err, rows)  => {
                if (err){
                    return rej(err);
                } 
                acc();
            },
        );
    });
}

async function deleteAllReviewDatesOnNodeId(nodeId) {
    return new Promise((acc, rej) => {
        graphDb.connection.all('DELETE FROM reviewDates WHERE nodeId = ?', 
        [nodeId], 
        (err, rows) => {
            if (err) return rej(err);
            acc(rows);
        });
    });
}

async function deleteUncompletedReviewDatesOnNodeId(nodeId) {
    return new Promise((acc, rej) => {
        graphDb.connection.all('DELETE FROM reviewDates WHERE nodeId = ? AND complete = 0', 
        [nodeId], 
        (err, rows) => {
            if (err) return rej(err);
            acc(rows);
        });
    });
}



















// ----------------------------





async function deleteFutureReviewDates(sourceId){
    return new Promise((acc, rej) => {

        graphDb.connection.run(
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
        graphDb.connection.all('DELETE FROM sourceReviewDates WHERE sourceId = ?', [sourceId], (err, rows) => {
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
    selectReviewDate,
	selectReviewDates,
    reviewDateExists,
    insertReviewDate,
    completeReviewDate,
    uncompleteReviewDate,
    deleteReviewDate,
    deleteAllReviewDatesOnNodeId,
    deleteUncompletedReviewDatesOnNodeId,

    
    deleteFutureReviewDates,
    deleteAllReviewDates,
    
}
