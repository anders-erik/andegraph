
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
const getFile = require('./file/GetFile');
const postFile = require('./file/PostFile');
const putFile = require('./file/PutFile');
const deleteFile = require('./file/DeleteFile');


// NODE
const getNode = require('./node/GetNode');
const postNode = require('./node/PostNode');
const putNode = require('./node/PutNode');
const deleteNode = require('./node/DeleteNode');

// NODES
const getNodes = require('./node/GetNodes');
const getNodeSearch = require('./node/search/GetNodeSearch');

// EDGE
const getEdge = require('./edge/GetEdge');
const postEdge = require('./edge/PostEdge');

// REVIEWDATES
const getReviewDate = require('./reviewdates/GetReviewDate');
const postReviewDate = require('./reviewdates/PostReviewDate');
const patchReviewDate = require('./reviewdates/PatchReviewDate');
const deleteReviewDate = require('./reviewdates/DeleteReviewDate');

const getReviewDates = require('./reviewdates/GetReviewDates');



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
	app.get('/api/file/:fileName', getFile);
	app.post('/api/file/:fileName', express.raw({ limit: "200mb", type: "*/*" }), postFile);
	app.put('/api/file/:fileName', express.raw({ limit: "200mb", type: "*/*" }), putFile);
	app.delete('/api/file/:fileName', deleteFile);

	// NODE
	app.get('/api/node/:nodeId', getNode);
	app.post('/api/node/:nodeId', postNode);
	app.put('/api/node/:nodeId', putNode);
	app.delete('/api/node/:nodeId', deleteNode);

	// NODES
	app.get('/api/nodes/:nodeId', getNodes);
	app.get('/api/node/search', getNodeSearch);

	// EDGE
	app.get('/api/edge/:id', getEdge);
	app.post('/api/edge/:id', postEdge);

	// REVIEWDATES
	app.get('/api/reviewdate/:id', getReviewDate);
	app.post('/api/reviewdate/:id', postReviewDate); // add params to get more meaningfull url!
	app.patch('/api/reviewdate/:id', patchReviewDate);
	app.delete('/api/reviewdate/:id', deleteReviewDate);

	app.get('/api/reviewdates/:nodeId', getReviewDates);

}


module.exports = {
	initRoutes
}


