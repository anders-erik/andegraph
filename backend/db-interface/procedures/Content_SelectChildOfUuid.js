
const queries = require("../Queries");
const { Node_SelectChildOfUuid } = require('../queries/Node_SelectChildOfUuid')
const { Content_SelectFromNode } = require('./Content_SelectFromNode');
const { getDb } = require('../../db/Db.js');
let db = getDb();



async function Content_SelectChildOfUuid(Uuid) {
    return new Promise(async (acc, rej) => {

        let contentObjects = [];

        let childNodeObjects = await Node_SelectChildOfUuid(Uuid);
        // console.table(childNodeObjects);

        for (let childNodeObject of childNodeObjects) {
            let childContentObject = await Content_SelectFromNode(childNodeObject);
            // console.table(childContentObject)
            contentObjects.push(childContentObject[0]);
        }
        // console.table(contentObjects);

        acc(contentObjects);

    });
}

module.exports = {
    Content_SelectChildOfUuid,
}

