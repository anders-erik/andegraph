
const models = require('../../models/models')
const queries = require("../Queries");
const enumContentTables = require('../../enums/contentTables');
const { Content_InsertOnTable } = require('./Content_InsertOnTable');



async function Edge_InsertUuidUuidDir(Node1Uuid, Node2Uuid, Directed) {
    return new Promise(async (acc, rej) => {


        
            let edgeObject = models.getEmptyObject('Edge');
            edgeObject.Node1Uuid = Node1Uuid;
            edgeObject.Node2Uuid = Node2Uuid;
            edgeObject.Directed = Directed;
            //console.table([edgeObject])

			try{

				await queries.Edge_Insert(edgeObject);

            	acc(edgeObject);

			} catch(error){

				rej('Not a valid content table name');

			}
            

    });
}

module.exports = {
    Edge_InsertUuidUuidDir,
}

