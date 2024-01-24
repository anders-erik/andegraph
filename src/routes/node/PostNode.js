
const nodeQueries = require('../../sql/graphQueries/NodeQueries');
const edgeQueries = require('../../sql/graphQueries/EdgeQueries');
const reviewDatesQueries = require('../../sql/graphQueries/ReviewDatesQueries');

const uuid = require('../../utils/uuid')


module.exports = async (req, res) => {
    //console.log(req.headers.id)


	//console.log('asdff')
    //console.log(req.body)

	// let edgeId = uuid.generate('edge');
	// console.log(edgeId);

	//let newNodeId = req.body[0].id;
	let newNodeId = req.params.nodeId;
 

    //const queriedRows = await nodeQueries.insertNode(req.body[0]);
	const queriedRows = await nodeQueries.checkIfNodeExists(newNodeId);

	if(queriedRows == ''){

		await nodeQueries.insertNode(req.body[0])


		// NOTE : NOT DONE
		// Make sure that we pass the associated sourceId with new shards!
		if (req.query.isChild == 1) {
			//console.log('new child ')
			//console.log(req.query.parentId);
			let edgeId = uuid.generate('edges');
			//console.log(edgeId);
			console.log(`new child : childId = ${newNodeId}, parentId = ${req.query.parentId}, edgeId = ${edgeId}`)

			await edgeQueries.insertEdge({
				id: edgeId,
				node1: req.query.parentId,
				node2: newNodeId,
				directed: 1,
				edgeOrder: 1,
				edgePath: ''
			});

		}



		// generate review schedule for sources
		if (req.body[0].nodeType == 'source') {
			//console.log('dummy generate review dates');
			
			// TOMORROW
			let reviewDate = new Date(Date.now() + 86_400_000);
			let reviewDateDateIsoString = reviewDate.toISOString().slice(0, 10);
			let reviewDateObject = {
				id: uuid.generate('reviewDates'),
				date: reviewDateDateIsoString,
				complete: 0,
				nodeId: newNodeId
			};
			await reviewDatesQueries.insertReviewDate(reviewDateObject);

			// SCHEDULE
			for (let i = 0; i < 10; i++) {
				reviewDate = new Date(Date.now() + 86_400_000 * 7 * (2 ** i) );
				reviewDateDateIsoString = reviewDate.toISOString().slice(0, 10);
				reviewDateObject = {
					id: uuid.generate('reviewDates'),
					date: reviewDateDateIsoString,
					complete: 0,
					nodeId: newNodeId
				};
				await reviewDatesQueries.insertReviewDate(reviewDateObject);
			}
		}

		res.status(200).send('New node inserted.');
	}
	else{
		res.status(404).send('The node already exists.');
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
