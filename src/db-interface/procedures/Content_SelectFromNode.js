const queries = require("../Queries");
const { getDb } = require('../../db/ErigraphDB');
let db = getDb();



async function Content_SelectFromNode(nodeObject) {
    return new Promise(async (acc, rej) => {

        let contentObject;
        
        switch (nodeObject.Table) {

            case 'Code':
                contentObject = await queries.Code_SelectOnUuid(nodeObject.Uuid); break;
                
            case 'Equation':
                contentObject = await queries.Equation_SelectOnUuid(nodeObject.Uuid); break;
                
            case 'Event':
                contentObject = await queries.Event_SelectOnUuid(nodeObject.Uuid); break;
                
            case 'File':
                contentObject = await queries.File_SelectOnUuid(nodeObject.Uuid); break;
                
            case 'Project':
                contentObject = await queries.Project_SelectOnUuid(nodeObject.Uuid); break;
                
            case 'Review':
                contentObject = await queries.Review_SelectOnUuid(nodeObject.Uuid); break;
                
            case 'Source':
                contentObject = await queries.Source_SelectOnUuid(nodeObject.Uuid); break;
                
            case 'Text':
                contentObject = await queries.Text_SelectOnUuid(nodeObject.Uuid); break;
                
            default:
                rej('no valid table name');
                return;
                break;
        }


        acc(contentObject)


    });
}

module.exports = {
    Content_SelectFromNode,
}

