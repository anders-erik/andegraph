const queries = require("../Queries");

// Will drop the content row, node row, and all connected edges

async function Content_DropFullOnUuid(Uuid) {
    return new Promise(async (acc, rej) => {


        let nodeObject = (await queries.Node_SelectOnUuid(Uuid))[0];


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


        let adjacentNodeEdges = await queries.NodeEdge_SelectAdjacentOfUuid(Uuid);
        
        for( let adjacentNodeEdge of adjacentNodeEdges){
            //console.log(adjacentNodeEdge.edge.Uuid)
            await queries.Edge_DeleteOnUuid(adjacentNodeEdge.edge.Uuid);
        }

        await queries.Node_DeleteOnUuid(Uuid);
        
        acc(1);

    });
}

module.exports = {
    Content_DropFullOnUuid,
}

