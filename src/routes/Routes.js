
console.log('Run routes');

const deleteSource = require('./Source/deleteSource');
const getSource = require('./Source/getSource');
const postSource = require('./Source/postSource');
const patchSource = require('./Source/patchSource');
const getSourcefile = require('./Source/File/getSourcefile');
const postSourcefile = require('./Source/File/postSourcefile');
const getSourceSearch = require('./Source/Search/getSourceSearch');


const getSourceReviewDates = require('./Source/reviewdate/getSourceReviewDates');
const postSourceReviewDate = require('./Source/reviewdate/postSourceReviewDate');
const deleteSourceReviewDate = require('./Source/reviewdate/deleteSourceReviewDates');
const patchSourceReviewDate = require('./Source/reviewdate/patchSourceReviewDate');



const postShard = require('./shard/postShard');



function initRoutes(app, express) {
	console.log('Init routes');


	app.delete('/api/source/:id', deleteSource);
	app.get('/api/source', getSource);
	app.post('/api/source', postSource);
	app.patch('/api/source', patchSource);
	app.get('/api/source/file/:id', getSourcefile);
	app.post('/api/source/file/:id', express.raw({ limit: "10000kb", type: "*/*" }), postSourcefile);
	app.get('/api/source/search', getSourceSearch);


	app.get('/api/source/reviewdate', getSourceReviewDates);
	app.post('/api/source/reviewdate', postSourceReviewDate);
	app.delete('/api/source/reviewdate', deleteSourceReviewDate);
	app.patch('/api/source/reviewdate', patchSourceReviewDate);




	app.post('/api/shard', postShard);


}


module.exports = {
	initRoutes
}


