
console.log('routes');

const deleteSource = require('./Source/deleteSource');
const getSource = require('./Source/getSource');
const getSourcefile = require('./Source/File/getSourcefile');
const postSource = require('./Source/postSource');
const postSourcefile = require('./Source/File/postSourcefile');
const putSource = require('./Source/putSource');

const getSourceReviewDates = require('./Source/reviewdate/getSourceReviewDates');
const postSourceReviewDate = require('./Source/reviewdate/postSourceReviewDate');
const deleteSourceReviewDate = require('./Source/reviewdate/deleteSourceReviewDates');
const patchSourceReviewDate = require('./Source/reviewdate/patchSourceReviewDate');

const getSources = require('./Source/Search/getSources');


const postShard = require('./shard/postShard');



function initRoutes(app, express) {

	app.delete('/source/:id', deleteSource);
	app.get('/source', getSource);
	app.get('/sourcefile/:id', getSourcefile);
	app.post('/source', postSource);
	app.post('/sourcefile/:id', express.raw({ limit: "10000kb", type: "*/*" }), postSourcefile);
	app.put('/source', putSource);

	app.get('/api/source/reviewdate', getSourceReviewDates);
	app.post('/api/source/reviewdate', postSourceReviewDate);
	app.delete('/api/source/reviewdate', deleteSourceReviewDate);
	app.patch('/api/source/reviewdate', patchSourceReviewDate);

	app.get('/sources', getSources);

	app.post('/shard', postShard);

	

}


module.exports = {
	initRoutes
}


