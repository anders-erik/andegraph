const queries = require("../Queries");
const models = require('../../models/models')
const enumContentTables = require('../../enums/contentTables');


async function Content_SelectOnUuid(Uuid) {
    return new Promise(async (acc, rej) => {

        let returnObject;

        let nodeObject = (await queries.Node_SelectOnUuid(Uuid))[0];


        if (enumContentTables.includes(nodeObject.Table)){

            switch (nodeObject.Table) {

                case 'Code':
                    returnObject = await queries.Code_SelectOnUuid(Uuid); break;
                    
                case 'Equation':
                    returnObject = await queries.Equation_SelectOnUuid(Uuid); break;
                    
                case 'Event':
                    returnObject = await queries.Event_SelectOnUuid(Uuid); break;
                    
                case 'File':
                    returnObject = await queries.File_SelectOnUuid(Uuid); break;
                    
                case 'Project':
                    returnObject = await queries.Project_SelectOnUuid(Uuid); break;
                    
                case 'Review':
                    returnObject = await queries.Review_SelectOnUuid(Uuid); break;
                    
                case 'Source':
                    returnObject = await queries.Source_SelectOnUuid(Uuid); break;
                    
                case 'Text':
                    returnObject = await queries.Text_SelectOnUuid(Uuid); break;
                    
                default:
                    rej('error in table matching switch statement.');
                    return;
                    break;
            }
    
    
            acc(returnObject)


        }
        else {
            rej('no matching content table.');
        }


    });
}

module.exports = {
    Content_SelectOnUuid,
}

