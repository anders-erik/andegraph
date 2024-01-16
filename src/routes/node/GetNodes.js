
const nodeQueries = require('../../sql/graphQueries/NodeQueries');


module.exports = async (req, res) => {
    //console.log(req.headers.id)

    let nodeId = req.params.nodeId;
    let parentsBit = req.query.parents;
    let childrenBit = req.query.children;

    console.log(parentsBit);
    console.log(childrenBit);

    if(parentsBit == 1){
      let parentNodes = await nodeQueries.selectAllParentNodes(nodeId);
      res.status(200).send(parentNodes);
    }
    else if(childrenBit == 1){
      let childrenNodes = await nodeQueries.selectAllChildrenNodes(nodeId);
      res.status(200).send(childrenNodes);
    }
    else {
      console.log('Query bits not set');
      res.status(400).send({'message': `Query bits not set`});
    }

    

    //console.log(childrenNodes);

    // const queriedRows = await nodeQueries.selectNodeFromId(req.query.id);

    // if (queriedRows == '') {

    //     res.status(404).send('The node does not exist.');

    // }
    // else {

		

		

		
    // }

    
};
