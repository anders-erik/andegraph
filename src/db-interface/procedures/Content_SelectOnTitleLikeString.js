
const { getDb } = require('../../db/Db-v0.2.js');

let db = getDb();


async function Content_SelectOnTitleLikeString(searchString, tableLimit, tableArrayString, orderColumn, desc) {

    let tableArray = tableArrayString.split(',');
    // console.log(searchString, tableLimit, tableArray);

    let allTableRows = [];

    // QUERY
    for (const tableName of tableArray) {
        let tableRows = await SearchTable(searchString, tableLimit, tableName);
        // console.log(tableRows)
        allTableRows = allTableRows.concat(tableRows);
    }


    // APPLY SORT
    console.log(orderColumn, desc)
    if (desc == 0) {
        console.log('CHECK')
        allTableRows = sortAsc(allTableRows, orderColumn)
    }
    else {
        allTableRows = sortDesc(allTableRows, orderColumn)
    }


    return allTableRows;

}

function sortAsc(allRows, col) {
    allRows.sort((a, b) => {
        if (a[col] < b[col]) return -1;
        if (a[col] > b[col]) return 1;
        return 0;
    });

    return allRows;
}

function sortDesc(allRows, col) {
    allRows.sort((a, b) => {
        if (a[col] > b[col]) return -1;
        if (a[col] < b[col]) return 1;
        return 0;
    });

    return allRows;
}




function SearchTable(searchString, tableLimit, tableName) {
    return new Promise((acc, rej) => {


        // https://stackoverflow.com/questions/63652590/issue-in-sqlite-while-using-node-js-like-operator-and-parameters
        searchString = '%' + searchString + '%';


        let queryString = `
        
        SELECT * FROM "${tableName}"
        WHERE Title LIKE ?
        LIMIT ${tableLimit}
                    
        ;`;

        db.all(queryString,
            [searchString],
            (err, rows) => {
                if (err) return rej(err);

                acc(rows);
            });

    });

}

module.exports = {
    Content_SelectOnTitleLikeString,
}

