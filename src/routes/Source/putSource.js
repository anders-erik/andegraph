const sqlite = require('../../persistence/SourceQueries');


module.exports = async (req, res) => {

   

    const item = {
        id: req.body.id,
        title: req.body.title,
        url: req.body.url,
        dateCreated: req.body.dateCreated
    };

    // console.log('PUT SOURCE:');
    // console.log(req.body.id);
    // console.log(req.body.title);
    // console.log(req.body.url);
    // console.log(req.body.dateCreated);
    // console.log(req.body.hasFile);
    // console.log(req.body.fileType);
    // console.log(req.body.fileEnding);




    let returnedValue = await sqlite.updateSource(item);
    //console.log(returnedValue);
    
    res.send(item);
    
};



