
const models = require('../../models/models')
const queries = require("../Queries");
const enumContentTables = require('../../enums/contentTables');
const { Content_InsertOnTable } = require('./Content_InsertOnTable');



async function ContentEdge_InsertAdjacentToUuidIntoTable(parentUuid, Directed, childTableName, Type, Order, Path) {
    return new Promise(async (acc, rej) => {


        // console.log(Array.isArray(enumContentTables))
        if (enumContentTables.includes(childTableName)) {

            // let newChildObject = models.getEmptyObject(childTableName);
            //console.table([newChildObject])

            let newChildObject = await Content_InsertOnTable(childTableName);


            let edgeObject = models.getEmptyObject('Edge');
            edgeObject.Node1Uuid = parentUuid;
            edgeObject.Node2Uuid = newChildObject.Uuid;
            edgeObject.Directed = Directed;
            edgeObject.Type = Type;
            edgeObject.Order = Order;
            edgeObject.Path = Path;
            //console.table([edgeObject])

            await queries.Edge_Insert(edgeObject);

            acc({
                Content: newChildObject,
                Edge: edgeObject
            });

        } else {
            rej('Not a valid content table name');
        }


    });
}

module.exports = {
    ContentEdge_InsertAdjacentToUuidIntoTable,
}

