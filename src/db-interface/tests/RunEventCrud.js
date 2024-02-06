

const models = require('../../models/models');

// https://stackoverflow.com/questions/53780447/nodejs-imported-module-is-undefined-but-works-when-checked-with-if-statement-or 
// const { queries } = require('../DbInterface'); // Cannot use because DbInterface depends on 'tests'
const queries = require('../Queries')


async function runEventCrud(){

	console.log(`
    
===========================================
        
        START EVENT CRUD TEST
    `)

    let EventObject = models.emptyEvent();
    console.table([EventObject]);

    await queries.Event_Insert(EventObject);
    console.table(await queries.Event_SelectOnUuid(EventObject.Uuid));

    EventObject.Title = 'Event title';
    await queries.Event_Update(EventObject);
    console.table(await queries.Event_SelectOnUuid(EventObject.Uuid));

    await queries.Event_DeleteOnUuid(EventObject.Uuid);
    console.table(await queries.Event_SelectOnUuid(EventObject.Uuid));


	console.log(`
	END EVENT CRUD TEST

===========================================



	`)

}


module.exports = {
	runEventCrud,
}
