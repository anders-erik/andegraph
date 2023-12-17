const sourceQueries = require('../../persistence/SourceQueries');


module.exports = async (req, res) => {

   try {

    await sourceQueries.updateSourceTitleUrl(req.body.id, req.body.title, req.body.url);
    
    console.log(`PATCH of source no. ${req.body.id} successful. New Title and URL set.`);
    res.send({'message': `PATCH of source no. ${req.body.id} successful. New Title and URL set.`})
    //res.send(item);
    

   } catch (error) {
    
    console.log(`PATCH of source no. ${req.body.id} failed.`)
    res.status(400);
    res.send({'message': `PATCH of source no. ${req.body.id} failed.`});

   }
    
    
};



