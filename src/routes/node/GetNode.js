
const nodeQueries = require('../../sql/graphQueries/NodeQueries');


module.exports = async (req, res) => {
    //console.log(req.headers.id)

    

    const queriedRows = await nodeQueries.selectNodeFromId(req.query.id);

    if (queriedRows == '') {

        res.status(404).send('The node does not exist.');

    }
    else {

		

		res.status(200).send(queriedRows);

		
    }

    
};
