const nodeQueries = require('../../sql/graphQueries/NodeQueries');


module.exports = async (req, res) => {
    //console.log(req.headers.id)

    

    const queriedRows = await nodeQueries.selectNodeFromId(req.query.id);

    if (queriedRows == '') {


		res.status(404).send('The node does not exist.');

		

        
    }
    else {

		//console.log('dummy delete')
		await nodeQueries.deleteNode(req.query.id);
		
		res.status(200).send('Node Deleted');
		
    }

    
};
