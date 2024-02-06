

const models = require('../../models/models');

// https://stackoverflow.com/questions/53780447/nodejs-imported-module-is-undefined-but-works-when-checked-with-if-statement-or 
// const { queries } = require('../DbInterface'); // Cannot use because DbInterface depends on 'tests'
const queries = require('../Queries')


async function runReviewCrud(){

	console.log(`
    
===========================================
        
        START REVIEW CRUD TEST
    `)

    let reviewObject = models.emptyReview();
    console.table([reviewObject]);

    await queries.Review_Insert(reviewObject);
    console.table(await queries.Review_SelectOnUuid(reviewObject.Uuid));

    reviewObject.Title = 'review title';
    await queries.Review_Update(reviewObject);
    console.table(await queries.Review_SelectOnUuid(reviewObject.Uuid));

    await queries.Review_DeleteOnUuid(reviewObject.Uuid);
    console.table(await queries.Review_SelectOnUuid(reviewObject.Uuid));


	console.log(`
	END REVIEW CRUD TEST

===========================================



	`)

}


module.exports = {
	runReviewCrud,
}
