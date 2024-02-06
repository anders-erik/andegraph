

const models = require('../../models/models');

// https://stackoverflow.com/questions/53780447/nodejs-imported-module-is-undefined-but-works-when-checked-with-if-statement-or 
// const { queries } = require('../DbInterface'); // Cannot use because DbInterface depends on 'tests'
const queries = require('../Queries')


async function runNodeCrud(){
    // console.table([{'Node Crud': 'Node Crud'}])
    //console.assert(false)
    console.log(`
    
===========================================
        
        START NODE CRUD TEST
    `)

    let nodeObject = models.emptyNode();
    console.table([nodeObject]);

    await queries.Node_Insert(nodeObject);
    console.table(await queries.Node_SelectOnUuid(nodeObject.Uuid));

    nodeObject.Title = 'Node title';
    await queries.Node_Update(nodeObject);
    console.table(await queries.Node_SelectOnUuid(nodeObject.Uuid));

    await queries.Node_DeleteOnUuid(nodeObject.Uuid);
    console.table(await queries.Node_SelectOnUuid(nodeObject.Uuid));




    console.log(`
        END NODE CRUD TEST
    
===========================================



    `)

}


module.exports = {
	runNodeCrud,
}
