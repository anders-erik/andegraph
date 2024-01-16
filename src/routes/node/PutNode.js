
const nodeQueries = require('../../sql/graphQueries/NodeQueries');


module.exports = async (req, res) => {
    //console.log(req.headers.id)



    console.log(req.body)

    //const queriedRows = await nodeQueries.insertNode(req.body[0]);
	const queriedRows = await nodeQueries.checkIfNodeExists(req.body[0].id);

	if(queriedRows == ''){

		res.status(404).send('The node doesnt exists.');

	}
	else{

		await nodeQueries.updateNode(req.body[0])
		//console.log('dummy update')

		res.status(200).send('Node updated.');
		
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