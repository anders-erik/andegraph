

const models = require('../../models/models');

// https://stackoverflow.com/questions/53780447/nodejs-imported-module-is-undefined-but-works-when-checked-with-if-statement-or 
// const { queries } = require('../DbInterface'); // Cannot use because DbInterface depends on 'tests'
const queries = require('../Queries')


async function runTextCrud(){

	console.log(`
    
===========================================
        
        START TEXT CRUD TEST
    `)

    let textObject = models.emptyText();
    console.table([textObject]);

    await queries.Text_Insert(textObject);
    console.table(await queries.Text_SelectOnUuid(textObject.Uuid));

    textObject.Title = 'text title';
    await queries.Text_Update(textObject);
    console.table(await queries.Text_SelectOnUuid(textObject.Uuid));

    await queries.Text_DeleteOnUuid(textObject.Uuid);
    console.table(await queries.Text_SelectOnUuid(textObject.Uuid));


	console.log(`
	END TEXT CRUD TEST

===========================================



	`)

}


module.exports = {
	runTextCrud,
}
