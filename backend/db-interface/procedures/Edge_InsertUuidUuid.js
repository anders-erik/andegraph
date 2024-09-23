
const models = require('../../models/models')
const queries = require("../Queries");
const enumContentTables = require('../../enums/contentTables');
const { Content_InsertOnTable } = require('./Content_InsertOnTable');



async function Edge_InsertUuidUuid(Node1Uuid, Node2Uuid, Directed, Order, Path) {
    return new Promise(async (acc, rej) => {



        let edgeObject = models.getEmptyObject('Edge');
        edgeObject.Node1Uuid = Node1Uuid;
        edgeObject.Node2Uuid = Node2Uuid;
        edgeObject.Directed = Directed;
        edgeObject.Order = Order;
        edgeObject.Path = Path;
        //console.table([edgeObject])

        try {

            await queries.Edge_Insert(edgeObject);

            acc(edgeObject);

        } catch (error) {

            console.log('Unable to create a new edge. In file : ', __filename);
            rej('Unable to create a new edge. In file : ', __filename);

        }


    });
}

module.exports = {
    Edge_InsertUuidUuid,
}

