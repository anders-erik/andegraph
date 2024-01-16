
const edgeQueries = require('../../sql/graphQueries/EdgeQueries');


module.exports = async (req, res) => {

    //console.log(req.params.id)
	//console.log(req.body[0])

	try {
		let edgeIdExists = await edgeQueries.checkIfEdgeIdExists(req.params.id);

		if(edgeIdExists){
			res.status(404).send({'message': `Edge already exists`});
		}
		else{
			console.log('gfds')
			await edgeQueries.insertEdge(req.body[0]);
			console.log('Edge posted');
			res.status(200).send({'message': `Edge Posted`});
		}
		
	} catch (error) {
		res.status(400).send({'message': `Edge Posting failed`});
	}

	//const reviewDateExists = await reviewDatesQueries.reviewDateExists(req.body[0].id);
	//console.log('bool: ', reviewDateExists)

	//let reviewDateExists = Object.values(queriedRows[0])[0]
	//console.log('bool: ', queriedRows)

	// if(!reviewDateExists){

	// 	await reviewDatesQueries.insertReviewDate(req.body[0])

	// 	res.status(200).send('New review date inserted.');
	// }
	// else{
	// 	res.status(404).send('Review date already exists.');
	// }
	//console.log(queriedRows);

	

    /* if (queriedRows == '') {
        res.status(404).send('The node does not exist.');
    }
    else {

		res.status(200).send(queriedRows);

		
    }
 */
    
};
