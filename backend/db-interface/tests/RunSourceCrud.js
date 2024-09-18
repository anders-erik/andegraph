

const models = require('../../models/models');

// https://stackoverflow.com/questions/53780447/nodejs-imported-module-is-undefined-but-works-when-checked-with-if-statement-or 
// const { queries } = require('../DbInterface'); // Cannot use because DbInterface depends on 'tests'
const queries = require('../Queries')


async function runSourceCrud(){

	console.log(`
    
===========================================
        
        START SOURCE CRUD TEST
    `)

    let sourceObject = models.emptySource();
    console.table([sourceObject]);

    await queries.Source_Insert(sourceObject);
    console.table(await queries.Source_SelectOnUuid(sourceObject.Uuid));

    sourceObject.Title = 'source title';
    await queries.Source_Update(sourceObject);
    console.table(await queries.Source_SelectOnUuid(sourceObject.Uuid));

    await queries.Source_DeleteOnUuid(sourceObject.Uuid);
    console.table(await queries.Source_SelectOnUuid(sourceObject.Uuid));


	console.log(`
	END SOURCE CRUD TEST

===========================================



	`)

}


module.exports = {
	runSourceCrud,
}
