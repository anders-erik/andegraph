
const { getDb } = require('../../db/Db-v0.2.js');
let db = getDb();

let contentTables = require('../../enums/contentTables.js');

async function Content_SelectOnTitleLikeString(searchString, tableLimit, tableArrayString, orderColumn, desc) {
    // console.log(searchString, tableLimit, tableArray);

    // extract table names
    let tableArray = tableArrayString.split(',');
    tableArray = tableArray.filter((tableString) => tableString != '')

    // if no table is provided in the request parameters, all tables are searched!
    if (tableArray.length == 0) {
        tableArray = contentTables;
    }

    
    // QUERY & CONCAT ALL TABLE RESULTS
    let allTableRows = [];
    try {
        for (const tableName of tableArray) {
            let tableRows = await SearchTable(searchString, tableLimit, tableName);
            // console.log(tableRows)
            allTableRows = allTableRows.concat(tableRows);
        }
    } catch (error) {
        console.log("Search query failed in file ", __filename);
        // console.log("Search parameters: \n", "searchString:", searchString, "\n", orderColumn, desc);
        throw error;
    }



    // APPLY SORT
    // console.log(orderColumn, desc)
    if (desc == 0) {
        // console.log('CHECK')
        allTableRows = sortAsc(allTableRows, orderColumn)
    }
    else {
        allTableRows = sortDesc(allTableRows, orderColumn)
    }

    
    return allTableRows;

}

// UNIT TEST
function sortAsc(allRows, col) {
    allRows.sort((a, b) => {
        if (a[col] < b[col]) return -1;
        if (a[col] > b[col]) return 1;
        return 0;
    });

    return allRows;
}
// UINT TEST
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

