
const connection = require('./Connection');



async function insertShard(sourceid) {
    return new Promise((acc, rej) => {
        connection.db.all(
            `
            INSERT INTO shards 
            (prompt, dateCreated, sourceId) 
            values('', DATE('now'), ?)
            ;`,
            [sourceid],

            (err, rows) => {
                if (err) return rej(err);
                acc(rows);
            },
        );
    });
}

async function selectShard(shardid) {
    return new Promise((acc, rej) => {
        connection.db.all(
            `
            SELECT * 
            FROM shards 
            WHERE id = ?
            ;`,
            [shardid],

            (err, rows) => {
                if (err) return rej(err);
                acc(rows);
            },
        );
    });
}

async function selectShardsOnSourceid(sourceid) {
    return new Promise((acc, rej) => {
        connection.db.all(
            `
            SELECT * 
            FROM shards 
            WHERE sourceId = ?
            ORDER BY id DESC
            ;`,
            [sourceid],

            (err, rows) => {
                if (err) return rej(err);
                acc(rows);
            },
        );
    });
}


async function updateShard(shardid, prompt) {
    return new Promise((acc, rej) => {
        connection.db.all(
            `
            UPDATE shards 
            set prompt=? 
            WHERE id = ?
            ;`,
            [prompt, shardid],

            (err, rows) => {
                if (err) return rej(err);
                acc(rows);
            },
        );
    });
}

async function updateShardFileInfo(shardid, fileType, fileEnding) {
    return new Promise((acc, rej) => {
        connection.db.all(
            `
            UPDATE shards 
            set fileType=?, fileEnding=? 
            WHERE id = ?
            ;`,
            [fileType, fileEnding, shardid],

            (err, rows) => {
                if (err) return rej(err);
                acc(rows);
            },
        );
    });
}

async function deleteShard(shardid) {
    return new Promise((acc, rej) => {
        connection.db.all(
            `
            DELETE FROM shards 
            WHERE id = ?
            ;`,
            [shardid],

            (err, rows) => {
                if (err) return rej(err);
                acc(rows);
            },
        );
    });
}

async function deleteShardsOnSourceid(sourceid) {
    return new Promise((acc, rej) => {
        connection.db.all(
            `
            DELETE FROM shards 
            WHERE sourceId = ?
            ;`,
            [sourceid],
            
            (err, rows) => {
                if (err) return rej(err);
                acc(rows);
            },
        );
    });
}



module.exports = {
	insertShard,
    selectShard,
    selectShardsOnSourceid,
    updateShard,
    updateShardFileInfo,
    deleteShard,
    deleteShardsOnSourceid
}
