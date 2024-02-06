

const models = require('../../models/models');

// https://stackoverflow.com/questions/53780447/nodejs-imported-module-is-undefined-but-works-when-checked-with-if-statement-or 
// const { queries } = require('../DbInterface'); // Cannot use because DbInterface depends on 'tests'
const queries = require('../Queries')


async function runFileCrud(){

	console.log(`
    
===========================================
        
        START FILE CRUD TEST
    `)

    let fileObject = models.emptyFile();
    console.table([fileObject]);

    await queries.File_Insert(fileObject);
    console.table(await queries.File_SelectOnUuid(fileObject.Uuid));

    fileObject.Title = 'file title';
    await queries.File_Update(fileObject);
    console.table(await queries.File_SelectOnUuid(fileObject.Uuid));

    await queries.File_DeleteOnUuid(fileObject.Uuid);
    console.table(await queries.File_SelectOnUuid(fileObject.Uuid));


	console.log(`
	END FILE CRUD TEST

===========================================



	`)

}


module.exports = {
	runFileCrud,
}
