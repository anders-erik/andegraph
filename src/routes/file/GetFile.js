

module.exports = async (req, res) => {
    //console.log(req.headers.id)

    //console.log(req.query.fileName)

	const file = `/data/live/files/${req.query.fileName}`;

    console.log(`Downloaded file #${req.query.fileName}, at path ${file}`);

	try{

		res.download(file);
		
	} catch (error) {
		throw error;	
	}

	
    

    /* const items = await sqlite.selectSource(req.query.sourceid);

    if (items == '') {
        res.status(410).send('The source no longer exists.');
    }
    else {

        const sourceReviewDates = await sourceReviewDatesQueries.selectReviewDates(req.query.sourceid);
        //console.log(sourceReviewDates);
        items[0]['sourceReviewDates'] = sourceReviewDates;

        //console.log(items);
        console.log(`GET - source no. ${req.query.sourceid}. Also the associated reviewDates.`);
        res.send(items);

    } */

	//res.send('asdf')

    
};