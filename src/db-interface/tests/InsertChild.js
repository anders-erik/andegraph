

// const models = require('../../models/models');
const { Content_InsertChild, Content_DeleteFromGraph } = require('../Procedures')
const queries = require('../Queries');



async function InsertChild(){

	console.log(`
    
===========================================
        
        START INSERT CHILD TEST
    `)

	let childObjects = await queries.Node_SelectChildOfUuid(372);
	console.table(childObjects);

	let edgeContentObject = await Content_InsertChild(372, 'Code');

	console.log('\n----------------------\n\tINSERT\n----------------------\n')
	
	childObjects = await queries.Node_SelectChildOfUuid(372);
	console.table(childObjects);

	await Content_DeleteFromGraph(edgeContentObject.Content);

	console.log('\n----------------------\n\tDELETE\n----------------------\n')

	childObjects = await queries.Node_SelectChildOfUuid(372);
	console.table(childObjects);


	console.log(`
	END INSERT CHILD TEST

===========================================



	`)

}


module.exports = {
	InsertChild,
}

