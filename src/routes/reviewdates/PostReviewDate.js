
const reviewDatesQueries = require('../../sql/graphQueries/ReviewDatesQueries');


module.exports = async (req, res) => {

    //console.log(req.body)


	const reviewDateExists = await reviewDatesQueries.reviewDateExists(req.body[0].id);
	//console.log('bool: ', reviewDateExists)

	//let reviewDateExists = Object.values(queriedRows[0])[0]
	//console.log('bool: ', queriedRows)

	if(!reviewDateExists){

		await reviewDatesQueries.insertReviewDate(req.body[0])

		res.status(200).send('New review date inserted.');
	}
	else{
		res.status(404).send('Review date already exists.');
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
