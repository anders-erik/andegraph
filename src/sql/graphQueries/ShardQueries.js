
const graphDb = require('../GraphDb');





async function insertShard(sourceid) {
    return new Promise((acc, rej) => {
        graphDb.connection.all(
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
        graphDb.connection.all(
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
        graphDb.connection.all(
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


async function selectShardTextContent(shardid) {
    return new Promise((acc, rej) => {
        graphDb.connection.all(
            `
            SELECT textContent 
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


async function updateShard(shardid, prompt) {
    return new Promise((acc, rej) => {
        graphDb.connection.all(
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

async function updateShardFileInfo(shardid, fileType, fileEnding, textContent) {
    return new Promise((acc, rej) => {
        graphDb.connection.all(
            `
            UPDATE shards 
            set fileType=?, fileEnding=?, textContent=?
            WHERE id = ?
            ;`,
            [fileType, fileEnding, textContent, shardid],

            (err, rows) => {
                if (err) return rej(err);
                acc(rows);
            },
        );
    });
}

async function deleteShard(shardid) {
    return new Promise((acc, rej) => {
        graphDb.connection.all(
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
        graphDb.connection.all(
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
    selectShardTextContent,
    updateShard,
    updateShardFileInfo,
    deleteShard,
    deleteShardsOnSourceid
}
