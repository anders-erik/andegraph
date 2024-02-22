
console.log('import dbir');


// CONTENT

const content = require('./Content.js')
const edge = require('./Edge.js')
const contentedge = require('./ContentEdge.js')
// FILE
const file = require('./File');



// NODE
const nodeGet = require('./NodeGet');

// EDGE
const edgeAll = require('./EdgeAll');

// CONTENT
const contentGet = require('./ContentGet');
const contentPost = require('./ContentPost');
const contentPut = require('./ContentPut');
// const contentPatch = require('./ContentPatch');
const contentDelete = require('./ContentDelete');


function initDbir(app, express) {
	console.log('init dbir')


	// CONTENT 
	app.all('/api/v02/content/:functionstring', content);
	// EDGE
	app.all('/api/v02/edge/:functionstring', edge)
	// CONTENT-EDGE
	app.all('/api/v02/contentedge/:functionstring', contentedge)
	// FILE
	app.post('/api/v02/file/:fileUuid', express.raw({ limit: "200mb", type: "*/*" }), file);
	// app.post('/api/v02/file/:fileUuid', file);
	app.get('/api/v02/file/:fileUuid', file);
	app.put('/api/v02/file/:fileUuid', express.raw({ limit: "200mb", type: "*/*" }), file);
	app.delete('/api/v02/file/:fileUuid', file);





	// NODE
	app.get('/api/v02/node/:functionstring', nodeGet);

	// EDGE
	app.post('/api/v02/edge/:functionstring', edgeAll);
	app.delete('/api/v02/edge/:functionstring', edgeAll);


	// CONTENT
	app.get('/api/v02/content/:functionstring', contentGet);
	app.post('/api/v02/content/:functionstring', contentPost);
	// app.patch('/api/v02/content/:functionstring', contentPatch);
	app.put('/api/v02/content/:functionstring', contentPut);
	app.delete('/api/v02/content/:functionstring', contentDelete);

}


module.exports = {
	initDbir,
}
