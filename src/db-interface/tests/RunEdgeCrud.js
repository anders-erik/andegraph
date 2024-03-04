

const models = require('../../models/models');
const { insertNode } = require('../../sql/graphQueries/NodeQueries');

// https://stackoverflow.com/questions/53780447/nodejs-imported-module-is-undefined-but-works-when-checked-with-if-statement-or 
// const { queries } = require('../DbInterface'); // Cannot use because DbInterface depends on 'tests'
const queries = require('../Queries')


async function runEdgeCrud(){

	console.log(`
    
===========================================
        
        START EDGE CRUD TEST
    `)

    let node1 = models.emptyNode();
    let node2 = models.emptyNode();

    let edgeObject = models.emptyEdge();
    edgeObject.Node1Uuid = node1.Uuid;
    edgeObject.Node2Uuid = node2.Uuid;
    console.table([edgeObject]);

    await queries.Node_Insert(node1);
    await queries.Node_Insert(node2);


    await queries.Edge_Insert(edgeObject);
    console.table(await queries.Edge_SelectOnUuid(edgeObject.Uuid));

    edgeObject.Directed = 1;
    await queries.Edge_Update(edgeObject);
    console.table(await queries.Edge_SelectOnUuid(edgeObject.Uuid));

    await queries.Edge_DeleteOnUuid(edgeObject.Uuid);
    console.table(await queries.Edge_SelectOnUuid(edgeObject.Uuid));

    await queries.Node_DeleteOnUuid(node1.Uuid)
    await queries.Node_DeleteOnUuid(node2.Uuid)

	console.log(`
	END EDGE CRUD TEST

===========================================



	`)

}


module.exports = {
	runEdgeCrud,
}
