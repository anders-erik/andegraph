
const edgeQueries = require('../../sql/graphQueries/EdgeQueries');


module.exports = async (req, res) => {
    //console.log(req.headers.id)

    //req.parameter

    try {
      
      const queriedRow = await edgeQueries.selectEdgeFromId(req.params.id);

	  //console.log(queriedRow)

	  res.status(200).send(queriedRow[0]);


    } catch (error) {
      
      res.status(404).send({'message': `Review Date query failed`});
      throw error;

    }

    

    
};
