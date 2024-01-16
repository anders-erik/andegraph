


const reviewDatesQueries = require('../../sql/graphQueries/ReviewDatesQueries');


module.exports = async (req, res) => {
    //console.log(req.headers.id)

    //let nodeId = req.query.nodeId;
    let nodeId = req.params.nodeId;
    
    // TODO : CHECK IF THE SOURCEID EXISTS!

    try {
      
      const queriedRows = await reviewDatesQueries.selectReviewDates(nodeId);

      //console.log(queriedRow)

      res.status(200).send(queriedRows);

      /* if(queriedRows == ''){
        res.status(404).send({'message': `Unable to find any review dates`});
      }
      else{
        res.status(200).send(queriedRows);
  
      } */


    } catch (error) {
      
      res.status(404).send({'message': `Review Date query failed`});
      throw error;

    }

    
    
};

