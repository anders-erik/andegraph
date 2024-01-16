const nodeQueries = require('../../sql/graphQueries/NodeQueries');
const edgeQueries = require('../../sql/graphQueries/EdgeQueries');
const reviewDatesQueries = require('../../sql/graphQueries/ReviewDatesQueries');


module.exports = async (req, res) => {
  //console.log(req.headers.id)

  let nodeId = req.params.nodeId;
  


  const queriedRows = await nodeQueries.selectNodeFromId(nodeId);

  if (queriedRows == '') {


    res.status(404).send('The node does not exist.');


  }
  else {

    //let nodeId = req.query.id;

    await reviewDatesQueries.deleteAllReviewDatesOnNodeId(nodeId);

    await edgeQueries.deleteEdgeOnNodeId(nodeId);

    await nodeQueries.deleteNode(nodeId);

    res.status(200).send('Node Deleted');

  }


};
