

const models = require('../../models/models');

// https://stackoverflow.com/questions/53780447/nodejs-imported-module-is-undefined-but-works-when-checked-with-if-statement-or 
// const { queries } = require('../DbInterface'); // Cannot use because DbInterface depends on 'tests'
const queries = require('../Queries')


async function runEquationCrud(){

	console.log(`
    
===========================================
        
        START EQUATION CRUD TEST
    `)

    let equationObject = models.emptyEquation();
    console.table([equationObject]);

    await queries.Equation_Insert(equationObject);
    console.table(await queries.Equation_SelectOnUuid(equationObject.Uuid));

    equationObject.Title = 'equation title';
    await queries.Equation_Update(equationObject);
    console.table(await queries.Equation_SelectOnUuid(equationObject.Uuid));

    await queries.Equation_DeleteOnUuid(equationObject.Uuid);
    console.table(await queries.Equation_SelectOnUuid(equationObject.Uuid));


	console.log(`
	END EQUATION CRUD TEST

===========================================



	`)

}


module.exports = {
	runEquationCrud,
}
