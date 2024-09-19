const queries = require("../Queries");
const models = require('../../models/models')
const enumContentTables = require('../../enums/contentTables');


async function Content_SelectOnUuid(Uuid) {
    return new Promise(async (acc, rej) => {

        let returnObject;

        let nodeObject;

        try {
            nodeObject = (await queries.Node_SelectOnUuid(Uuid))[0];
            
        } catch (error) {
            console.log(`No matching Uuid [${Uuid}] in file : `, __filename);
            rej(1);
            return 1;
        }


        // If there are no Uuid matches, the first array entry of the above query doesn't exist
        if (nodeObject === undefined) {
            // console.log('nodeObject', nodeObject)

            // rej("NO MATCHING NODE OBJECTS")
            // acc({});
            // console.log(`No matching Uuid [${Uuid}] in file : `, __filename);
            // rej({});
            // return 1;
        }


        try {
            
            // Make sure a correct table is used
            if (enumContentTables.includes(nodeObject.Table)) {
    
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
                console.log("Error in matching table name. File: ", __filename);
                rej('no matching content table.');
            }


        } catch (error) {
            // Catch errors returned from select queries
            console.log("Error in selecting on Uuid [${Uuid}]. File: ", __filename);
            rej('Error in selecting on Uuid. ');
        }


    });
}

module.exports = {
    Content_SelectOnUuid,
}

