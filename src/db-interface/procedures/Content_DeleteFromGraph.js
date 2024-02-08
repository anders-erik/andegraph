const queries = require("../Queries");

// NEVER USED (?????)

async function Content_DeleteFromGraph(contentObject) {
    return new Promise(async (acc, rej) => {

        

        switch (contentObject.Table) {

            case 'Code':
                await queries.Code_DeleteOnUuid(contentObject); break;
                
            case 'Equation':
                await queries.Equation_DeleteOnUuid(contentObject); break;
                
            case 'Event':
                await queries.Event_DeleteOnUuid(contentObject); break;
                
            case 'File':
                await queries.File_DeleteOnUuid(contentObject); break;
                
            case 'Project':
                await queries.Project_DeleteOnUuid(contentObject); break;
                
            case 'Review':
                await queries.Review_DeleteOnUuid(contentObject); break;
                
            case 'Source':
                await queries.Source_DeleteOnUuid(contentObject); break;
                
            case 'Text':
                await queries.Text_DeleteOnUuid(contentObject); break;
                
            default:
                rej('tried to remove contentObject with no valid table.')
                return;
                break;
        }


        let adjacentNodeEdges = await queries.NodeEdge_SelectAdjacentOfUuid(contentObject.Uuid);
        
        for( let adjacentNodeEdge of adjacentNodeEdges){
            //console.log(adjacentNodeEdge.edge.Uuid)
            await queries.Edge_DeleteOnUuid(adjacentNodeEdge.edge.Uuid);
        }

        await queries.Node_DeleteOnUuid(contentObject.Uuid);
        
        acc(1);

    });
}

module.exports = {
    Content_DeleteFromGraph,
}

