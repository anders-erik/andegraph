


const reviewDateQueries = require('../../sql/graphQueries/ReviewDatesQueries');


module.exports = async (req, res) => {
    //console.log(req.headers.id)

    //req.parameter

    try {
      
      const queriedRow = await reviewDateQueries.selectReviewDate(req.params.id);

      if(queriedRow == ''){
        res.status(404).send({'message': `Unable to find selected reviewDate`});
      }
      else{
        res.status(200).send(queriedRow[0]);
  
      }


    } catch (error) {
      
      res.status(404).send({'message': `Review Date query failed`});
      throw error;

    }

    

/* 
    if (queriedRows == '') {

        res.status(404).send('The node does not exist.');

    }
    else {

		

		res.status(200).send('getReviewDate');

		
    }
*/
    
};

