
console.log('routes');

const deleteSource = require('./Source/deleteSource');
const getSource = require('./Source/getSource');
const getSourcefile = require('./Source/File/getSourcefile');
const addSource = require('./Source/addSource');
const postSourcefile = require('./Source/File/postSourcefile');
const putSource = require('./Source/putSource');

const getSources = require('./Source/Search/getSources');


function initRoutes(app, express) {

	app.delete('/source/:id', deleteSource);
	app.get('/source', getSource);
	app.get('/sourcefile/:id', getSourcefile);
	app.post('/source', addSource);
	app.post('/sourcefile/:id', express.raw({ limit: "10000kb", type: "*/*" }), postSourcefile);
	app.put('/source', putSource);

	app.get('/sources', getSources);
}


module.exports = {
	initRoutes
}


