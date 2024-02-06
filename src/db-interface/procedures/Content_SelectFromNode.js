const queries = require("../Queries");
const { getDb } = require('../../db/ErigraphDB');
let db = getDb();



async function Content_SelectFromNode(nodeObject) {
    return new Promise(async (acc, rej) => {

        
        switch (nodeObject.Table) {

            case 'Code':
                await queries.Code_SelectOnUuid(nodeObject); break;
                
            case 'Equation':
                await queries.Equation_SelectOnUuid(nodeObject); break;
                
            case 'Event':
                await queries.Event_SelectOnUuid(nodeObject); break;
                
            case 'File':
                await queries.File_SelectOnUuid(nodeObject); break;
                
            case 'Project':
                await queries.Project_SelectOnUuid(nodeObject); break;
                
            case 'Review':
                await queries.Review_SelectOnUuid(nodeObject); break;
                
            case 'Source':
                await queries.Source_SelectOnUuid(nodeObject); break;
                
            case 'Text':
                await queries.Text_SelectOnUuid(nodeObject); break;
                
            default:
                break;
        }


    });
}

module.exports = {
    Content_SelectFromNode,
}

