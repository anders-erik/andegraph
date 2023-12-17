//const sqlite = require('../persistence/sqlite');
const sourceQueries = require('../../../persistence/SourceQueries');


module.exports = async (req, res) => {

    let today = req.query.today;
    let searchall = req.query.searchall;
    let dateinterval = req.query.dateinterval;
    let searchstring = req.query.searchstring;
    let fromdate = req.query.fromdate;
    let todate = req.query.todate;
    

    
    if(today == 1){
        //console.log('dateinterval');
        
        let resultLimit = 100000;

        let todaysDate = (new Date(Date.now()) ).toISOString().substring(0, 10);
        //console.log(todaysDate);
        const items = await sourceQueries.selectDatesLikeString(searchstring, resultLimit, todaysDate, todaysDate);
    
        console.log(`Searched and fetched sources from today using the searchstring '${searchstring}'. `);
        res.send(items);
    }
    else if (dateinterval == 1) {
        //console.log('dateinterval');

        let resultLimit = 100000;

        const items = await sourceQueries.selectDatesLikeString(searchstring, resultLimit, fromdate, todate);
    
        console.log(`Searched and fetched sources created between ${fromdate} and ${todate} using the searchstring '${searchstring}'. `);
        res.send(items);

    }
    else if (searchall == 1) {
        //console.log('searchall');

        let resultLimit = 100000;

        const items = await sourceQueries.selectAllLikeString(searchstring, resultLimit);
    
        console.log(`Searched and fetched all sources using the searchstring '${searchstring}'. `);
        res.send(items);

    }
    else {

    }

    
};
