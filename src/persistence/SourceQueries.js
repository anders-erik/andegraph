
const connection = require('./Connection');



async function getSource(id) {
    return new Promise((acc, rej) => {
        connection.db.all('SELECT * FROM sources WHERE id=?', [id], (err, rows) => {
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

async function storeSource() {
    return new Promise((acc, rej) => {
        connection.db.run(
            "INSERT INTO sources (dateCreated, hasFile) values(DATE('now'), 0)",
            (err, rows)  => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}

async function updateSource(item) {
    return new Promise((acc, rej) => {
        connection.db.run(
            'UPDATE sources SET id=?, title=?, url=?, dateCreated=? WHERE sources.id=?',
            [item.id, item.title, item.url, item.dateCreated, item.id],
            err => {
                if (err) return rej(err);
                acc();
            },
        );
        return 'query ok :)';
    });
}

async function deleteSource(id) {
    return new Promise((acc, rej) => {
        connection.db.all('DELETE FROM sources WHERE id=?', [id], (err, rows) => {
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
	getSource,
    storeSource,
    updateSource,
    deleteSource
}
