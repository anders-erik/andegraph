
const nodeQueries = require('../../sql/graphQueries/NodeQueries');
const edgeQueries = require('../../sql/graphQueries/EdgeQueries');
const uuid = require('../../utils/uuid')


module.exports = async (req, res) => {
    //console.log(req.headers.id)



    //console.log(req.body)

	


    //const queriedRows = await nodeQueries.insertNode(req.body[0]);
	const queriedRows = await nodeQueries.checkIfNodeExists(req.body[0].id);

	if(queriedRows == ''){

		await nodeQueries.insertNode(req.body[0])

		// NOTE : NOT DONE
		// Make sure that we pass the associated sourceId with new shards!
		if (req.body[0].nodeType == 'shard') {
			console.log(req.query.sourceId);
			let uuid = uuid.generate('edge');
			await edgeQueries.insertEdge({
				id: uuid,
				node1: req.query.sourceId,
				node2: req.body[0].id,
				directed: 1,
				edgeOrder: 1,
				edgePath: ''
			});

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
