const queries = require("../Queries");

const models = require('../../models/models')
const enumContentTables = require('../../enums/contentTables');

// Will drop the content row, node row, and all connected edges

async function Content_DropFullOnUuid(Uuid) {
    return new Promise(async (acc, rej) => {


        let nodeObject = (await queries.Node_SelectOnUuid(Uuid))[0];

        // If there are no Uuid matches, the first array entry of the above query doesn't exist
        if (nodeObject === undefined) {
            // console.log('nodeObject', nodeObject)

            // rej("NO MATCHING NODE OBJECTS")
            // acc({});
            console.log(`No matching Uuid [${Uuid}] in file : `, __filename);
            rej({});
            return;
        }



        try {

            // Make sure a correct table is used
            if (enumContentTables.includes(nodeObject.Table)) {
            
                switch (nodeObject.Table) {
        
                    case 'Code':
                        await queries.Code_DeleteOnUuid(Uuid); break;
                        
                    case 'Equation':
                        await queries.Equation_DeleteOnUuid(Uuid); break;
                        
                    case 'Event':
                        await queries.Event_DeleteOnUuid(Uuid); break;
                        
                    case 'File':
                        await queries.File_DeleteOnUuid(Uuid); break;
                        
                    case 'Project':
                        await queries.Project_DeleteOnUuid(Uuid); break;
                        
                    case 'Review':
                        await queries.Review_DeleteOnUuid(Uuid); break;
                        
                    case 'Source':
                        await queries.Source_DeleteOnUuid(Uuid); break;
                        
                    case 'Text':
                        await queries.Text_DeleteOnUuid(Uuid); break;
                        
                    default:
                        rej('tried to remove contentObject with no valid table.')
                        return;
                        break;
                }

                try {
                    
                    let adjacentNodeEdges = await queries.NodeEdge_SelectAdjacentOfUuid(Uuid);
    
                    for (let adjacentNodeEdge of adjacentNodeEdges) {
                        //console.log(adjacentNodeEdge.edge.Uuid)
                        await queries.Edge_DeleteOnUuid(adjacentNodeEdge.edge.Uuid);
                    }
    
                    await queries.Node_DeleteOnUuid(Uuid);
    
                    acc(1);
                    return;

                } catch (error) {
                    console.log(`Error in deleting edge on ${Uuid}. . File: `, __filename);
                    console.log("WARNING: DELETED NODE NOT ROLLED BACK!");
                    rej();
                    return;
                }

            }
            else {
                console.log("Error in matching table name. File: ", __filename);
                rej('no matching content table.');
                return;
            }


        } catch (error) {

            // Catch errors returned from select queries
            console.log(`Error in deletion query on Uuid [${Uuid}]. File: `, __filename);
            rej('Error in deletion query on Uuid. ');
            
        }




    });
}

module.exports = {
    Content_DropFullOnUuid,
}

