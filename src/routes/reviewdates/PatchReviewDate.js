
const reviewDatesQueries = require('../../sql/graphQueries/ReviewDatesQueries');


module.exports = async (req, res) => {

    //console.log(req.body)

	let reviewDateId = req.params.id;

	const reviewDateExists = await reviewDatesQueries.reviewDateExists(reviewDateId);


	//let reviewDateExists = Object.values(queriedRows[0])[0]
	//console.log('bool: ', queriedRows)

	if(reviewDateExists){

		//await reviewDatesQueries.insertReviewDate(req.body[0])
		if(req.query.complete == 1){
			await reviewDatesQueries.completeReviewDate(reviewDateId)
			console.log('complete')
			res.status(200).send('Review Date completed.');
		}
		else{
			await reviewDatesQueries.uncompleteReviewDate(reviewDateId)
			console.log('uncomplete')
			res.status(200).send('Review Date uncompleted.');
		}

	}
	else{
		res.status(404).send('Review date doesnt exists.');
	}
	//console.log(queriedRows);

	

    /* if (queriedRows == '') {
        res.status(404).send('The node does not exist.');
    }
    else {

		res.status(200).send(queriedRows);

		
    }
 */
    
};
