//const sqlite = require('../persistence/sqlite');
const sourceQueries = require('../../../persistence/SourceQueries');


module.exports = async (req, res) => {

    let today = req.query.today;
    let searchall = req.query.searchall;
    let dateinterval = req.query.dateinterval;
    let searchstring = req.query.searchstring;
    let fromdate = req.query.fromdate;
    let todate = req.query.todate;
    let asc = req.query.asc;
    let review = req.query.review;

    // what if I pass 2? Strange conversions from string?
    let order = (asc == 1) ? `ASC` : "DESC";


    let resultLimit = 100;


    if(review == 1){
        
        const items = await sourceQueries.selectForReview(searchstring, resultLimit);
    
        console.log(`Searched and fetched sources to be reviewed using the searchstring '${searchstring}'. `);
        res.send(items);

    }
    else if(today == 1){
        //console.log('dateinterval');
        

        let todaysDate = (new Date(Date.now()) ).toISOString().substring(0, 10);
        //console.log(todaysDate);
        const items = await sourceQueries.selectDatesAndLikeString(searchstring, resultLimit, todaysDate, todaysDate, order);
    
        console.log(`Searched and fetched sources from today using the searchstring '${searchstring}'. `);
        res.send(items);
    }
    else if (dateinterval == 1) {
        //console.log('dateinterval');


        //console.log(searchstring + ' ' + fromdate + ' ' + todate)
        const items = await sourceQueries.selectDatesAndLikeString(searchstring, resultLimit, fromdate, todate, order);
        //console.log(items);
        
        console.log(`Searched and fetched sources created between ${fromdate} and ${todate} using the searchstring '${searchstring}'. `);
        res.send(items);

    }
    else if (searchall == 1) {
        //console.log('searchall');


        const items = await sourceQueries.selectAllLikeString(searchstring, resultLimit, order);
    
        console.log(`Searched and fetched all sources using the searchstring '${searchstring}'. `);
        res.send(items);

    }
    else {

    }

    
};
