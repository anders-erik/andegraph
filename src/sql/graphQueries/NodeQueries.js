
const graphDb = require('../GraphDb');




async function selectNodeFromId(sourceId) {
    return new Promise((acc, rej) => {
        graphDb.connection.all('SELECT * FROM nodes WHERE id=?', [sourceId], (err, rows) => {
            if (err) return rej(err);
            acc(rows);
        });
    });
}



async function selectAllChildrenNodes(parentId) {

    let queryString = `
        SELECT nodes.* FROM nodes
        INNER JOIN edges
        ON edges.node1 = ?
        WHERE
        nodes.id = edges.node2
        ORDER BY nodes.id DESC
    `;

    return new Promise((acc, rej) => {
        graphDb.connection.all(
            queryString, 
            [parentId], 
            (err, rows) => {
            if (err) return rej(err);
            acc(rows);
        });
    });
}


async function selectAllParentNodes(childId) {

    let queryString = `
        SELECT nodes.* FROM nodes
        INNER JOIN edges
        ON edges.node2 = ?
        WHERE
        nodes.id = edges.node1
    `;

    return new Promise((acc, rej) => {
        graphDb.connection.all(
            queryString, 
            [childId], 
            (err, rows) => {
            if (err) return rej(err);
            acc(rows);
        });
    });
}

async function checkIfNodeExists(sourceId) {
    return new Promise((acc, rej) => {
        graphDb.connection.all('SELECT nodes.id FROM nodes WHERE id=?', [sourceId], (err, rows) => {
            if (err) return rej(err);
            acc(rows);
        });
    });
}


async function insertNode(node) {
    //let newNodeId = (Math.floor( (Date.now() - 1) / 1000)) << 14;
    //newNodeId += Math.floor(Math.random() * 0x1000);

	let queryString = `
        INSERT INTO nodes(id, dateCreated, title, textContent, elementType, nodeType, nodeTypeType, url, fileName, fileExtension)
		values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    return new Promise((acc, rej) => {
        graphDb.connection.run(
            queryString,
            [node.id, node.dateCreated, node.title, node.textContent, node.elementType, node.nodeType, node.nodeTypeType, node.url, node.fileName, node.fileExtension],
            (err, rows)  => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}



async function updateNode(node) {

	let queryString = `
		UPDATE nodes 
		SET
			dateCreated=?,
			title=?,
			textContent=?,
			elementType=?,
			nodeType=?,
			nodeTypeType=?,
			url=?,
			fileName=?,
			fileExtension=?
		WHERE id=?;
    `;

    return new Promise((acc, rej) => {
        graphDb.connection.all(queryString, 
			[node.dateCreated, node.title, node.textContent, node.elementType, node.nodeType, node.nodeTypeType, node.url, node.fileName, node.fileExtension, node.id], 
			(err, rows) => {
            if (err) {
                return rej(err);
                //throw err;
            } 
            acc(rows);
        });
    });
}



async function deleteNode(id) {
    return new Promise((acc, rej) => {
        graphDb.connection.all('DELETE FROM nodes WHERE id=?', [id], (err, rows) => {
            if (err) return rej(err);
            acc(rows);
        });
    });
}









// NOTE: THE BELOW DEFINED QUERIES ARE ONLY FOR SOURCES ! ! ! ! !


async function selectAllLikeString(searchstring, limit, order) {

    // Didnt get the query parameter to work with " LIKE '%?%' ". 
    // No idea why the linked example works either. Probably something to do with the apstrophes.
    // https://stackoverflow.com/questions/63652590/issue-in-sqlite-while-using-node-js-like-operator-and-parameters
    let string = '%' + searchstring + '%';
    //console.log(order);


    // 'Need' to change 'ORDER BY ASC/DESC'. 
    //  API provides a boolean value to be passed, which is converted to ASC/DESC at API endpoint
    // https://stackoverflow.com/questions/39559072/sqlite3-query-order-by-parameter-with-notation
    let queryString = `

        SELECT * FROM nodes 
        WHERE title LIKE ?
        AND nodeType = 'source'
        ORDER BY id {}
        LIMIT ?

    `
    queryString = queryString.replace('{}', order);
    

    return new Promise((acc, rej) => {
        // 'IS NULL' was added to not ignore newly created entries
        graphDb.connection.all( queryString, [string, limit], (err, rows) => {

            // changed 2023-12-20
            if (err) return rej(err);
            acc(rows);
        });
    });
}

async function selectDatesAndLikeString(searchstring, limit, fromdate, todate, order) {

	// Didnt get the query parameter to work with " LIKE '%?%' ". 
    // No idea why the linked example works either. Probably something to do with the apstrophes.
    // https://stackoverflow.com/questions/63652590/issue-in-sqlite-while-using-node-js-like-operator-and-parameters
    let string = '%' + searchstring + '%';

    // 'Need' to change 'ORDER BY ASC/DESC'. 
    //  API provides a boolean value to be passed, which is converted to ASC/DESC at API endpoint
    // https://stackoverflow.com/questions/39559072/sqlite3-query-order-by-parameter-with-notation
    let queryString = `

        SELECT * FROM nodes 
        WHERE nodeType = 'source'
        AND dateCreated >= ? 
        AND dateCreated <= ? 
        AND title LIKE ?
        ORDER BY id {}
        LIMIT ?

    `
    queryString = queryString.replace('{}', order);


    return new Promise((acc, rej) => {
        graphDb.connection.all(queryString, [fromdate, todate, string, limit], (err, rows) => {

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




async function selectForReview(searchstring, limit) {

	// Didnt get the query parameter to work with " LIKE '%?%' ". 
    // No idea why the linked example works either. Probably something to do with the apstrophes.
    // https://stackoverflow.com/questions/63652590/issue-in-sqlite-while-using-node-js-like-operator-and-parameters
    let string = '%' + searchstring + '%';

    return new Promise((acc, rej) => {
        graphDb.connection.all(`

                SELECT DISTINCT nodes.* from nodes
                INNER JOIN reviewDates
                ON nodes.id = reviewDates.nodeId
                WHERE reviewDates.date <= DATE('now')
                AND reviewDates.completed = 0
                AND nodes.title LIKE ?
                ORDER BY reviewDates.date DESC
                LIMIT ?
        
            `, [string , limit ], (err, rows) => {

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
	selectNodeFromId,
    selectAllChildrenNodes,
    selectAllParentNodes,
	checkIfNodeExists,
	insertNode,
	updateNode,
	deleteNode,
    // below is source specific....
    selectAllLikeString,
    selectDatesAndLikeString,
    selectForReview,


}
