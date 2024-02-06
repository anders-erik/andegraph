

const models = require('../../models/models');

// https://stackoverflow.com/questions/53780447/nodejs-imported-module-is-undefined-but-works-when-checked-with-if-statement-or 
// const { queries } = require('../DbInterface'); // Cannot use because DbInterface depends on 'tests'
const queries = require('../Queries')


async function runCodeCrud(){

	console.log(`
    
===========================================
        
        START CODE CRUD TEST
    `)

    let codeObject = models.emptyCode();
    console.table([codeObject]);

    await queries.Code_Insert(codeObject);
    console.table(await queries.Code_SelectOnUuid(codeObject.Uuid));

    codeObject.Title = 'code title';
    await queries.Code_Update(codeObject);
    console.table(await queries.Code_SelectOnUuid(codeObject.Uuid));

    await queries.Code_DeleteOnUuid(codeObject.Uuid);
    console.table(await queries.Code_SelectOnUuid(codeObject.Uuid));


	console.log(`
	END CODE CRUD TEST

===========================================



	`)

}


module.exports = {
	runCodeCrud,
}
