


const reviewDatesQueries = require('../../sql/graphQueries/ReviewDatesQueries');


module.exports = async (req, res) => {
    //console.log(req.headers.id)

    let reviewDateId = req.params.id;

    

    try {
      
      const reviewDateExists = await reviewDatesQueries.reviewDateExists(reviewDateId);

      if(reviewDateExists){
        await reviewDatesQueries.deleteReviewDate(reviewDateId);
        res.status(200).send({'message': `reviewDate deleted`});
      }
      else{
        res.status(404).send({'message': `Unable to find selected reviewDate. Nothing Deleted.`});
  
      }


    } catch (error) {
      
      res.status(404).send({'message': `Review Date delete-queries failed`});
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

