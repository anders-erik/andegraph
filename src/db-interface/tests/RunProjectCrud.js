

const models = require('../../models/models');

// https://stackoverflow.com/questions/53780447/nodejs-imported-module-is-undefined-but-works-when-checked-with-if-statement-or 
// const { queries } = require('../DbInterface'); // Cannot use because DbInterface depends on 'tests'
const queries = require('../Queries')


async function runProjectCrud(){

	console.log(`
    
===========================================
        
        START PROJECT CRUD TEST
    `)

    let projectObject = models.emptyProject();
    console.table([projectObject]);

    await queries.Project_Insert(projectObject);
    console.table(await queries.Project_SelectOnUuid(projectObject.Uuid));

    projectObject.Title = 'project title';
    await queries.Project_Update(projectObject);
    console.table(await queries.Project_SelectOnUuid(projectObject.Uuid));

    await queries.Project_DeleteOnUuid(projectObject.Uuid);
    console.table(await queries.Project_SelectOnUuid(projectObject.Uuid));


	console.log(`
	END PROJECT CRUD TEST

===========================================



	`)

}


module.exports = {
	runProjectCrud,
}
