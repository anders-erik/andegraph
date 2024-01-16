
const nodeQueries = require('../../sql/graphQueries/NodeQueries');


module.exports = async (req, res) => {
    //console.log(req.headers.id)

    let nodeId = req.params.nodeId;

    const queriedRows = await nodeQueries.selectNodeFromId(nodeId);

    if (queriedRows == '') {

        res.status(404).send('The node does not exist.');

    }
    else {

		

		res.status(200).send(queriedRows);

		
    }

    
};
