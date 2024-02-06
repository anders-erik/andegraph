
const models = require('../../models/models')
const queries = require("../Queries");
const enumContentTables = require('../../enums/contentTables');
const { Content_InsertObject } = require('./Content_InsertObject');



async function Content_InsertChild(parentUuid, childTableName) {
    return new Promise(async (acc, rej) => {


        // console.log(Array.isArray(enumContentTables))
        if (enumContentTables.includes(childTableName)) {

            let newChildObject = models.getEmptyObject(childTableName);
            //console.table([newChildObject])

            await Content_InsertObject(newChildObject);


            let edgeObject = models.getEmptyObject('Edge');
            edgeObject.Node1Uuid = parentUuid;
            edgeObject.Node2Uuid = newChildObject.Uuid;
            edgeObject.Directed = 1;
            //console.table([edgeObject])

            await queries.Edge_Insert(edgeObject);

            acc({
                Content : newChildObject,
                Edge: edgeObject
            });

        }else {
            rej('Not a valid content table name');
        }


    });
}

module.exports = {
    Content_InsertChild,
}

