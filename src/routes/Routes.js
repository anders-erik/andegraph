
console.log('Run routes');

// SOURCES
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


// SHARDS
const postShard = require('./Source/shard/postShard');
const getShard = require('./Source/shard/getShard');
const deleteShard = require('./Source/shard/deleteShard');
const patchShard = require('./Source/shard/patchShard');

const postShardFile = require('./Source/shard/file/postShardFile');
const getShardFile = require('./Source/shard/file/getShardFile');
const putShardFile = require('./Source/shard/file/putShardFile');
const patchShardTextfile = require('./Source/shard/file/patchShardTextfile');


// FILES
const getFile = require('./files/GetFile');




function initRoutes(app, express) {
	console.log('Init routes');

	// SOURCE
	app.delete('/api/source', deleteSource);
	app.get('/api/source', getSource);
	app.post('/api/source', postSource);
	app.patch('/api/source', patchSource);

	app.post('/api/source/file/:id', express.raw({ limit: "200mb", type: "*/*" }), postSourcefile);
	app.get('/api/source/file/:id', getSourcefile);
	
	app.get('/api/source/search', getSourceSearch);

	app.get('/api/source/reviewdate', getSourceReviewDates);
	app.post('/api/source/reviewdate', postSourceReviewDate);
	app.delete('/api/source/reviewdate', deleteSourceReviewDate);
	app.patch('/api/source/reviewdate', patchSourceReviewDate);


	// SOURCE / # / SHARD
	app.post('/api/source/:sourceid/shard', postShard);
	app.get('/api/source/:sourceid/shard', getShard);
	app.delete('/api/source/:sourceid/shard/:shardid', deleteShard);
	app.patch('/api/source/:sourceid/shard/:shardid', patchShard);

	app.post('/api/source/:sourceid/shard/:shardid/file', express.raw({ limit: "20mb", type: "*/*" }), postShardFile);
	app.get('/api/source/:sourceid/shard/:shardid/file', getShardFile);
	app.patch('/api/source/:sourceid/shard/:shardid/textfile', patchShardTextfile);
	app.put('/api/source/:sourceid/shard/:shardid/file', express.raw({ limit: "20mb", type: "*/*" }), putShardFile);



	// FILE
	//app.get('/api/file/:fileid', getFile);

}


module.exports = {
	initRoutes
}


