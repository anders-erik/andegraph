
console.log('import dbir');


// 

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

// FILE
const fileAll = require('./FileAll');

function initDbir(app, express) {
	console.log('init dbir')

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

	// FILE
	app.post('/api/v02/file/:fileUuid', express.raw({ limit: "200mb", type: "*/*" }), fileAll);
	// app.post('/api/v02/file/:fileUuid', fileAll);
	app.get('/api/v02/file/:fileUuid', fileAll);
	app.put('/api/v02/file/:fileUuid', express.raw({ limit: "200mb", type: "*/*" }), fileAll);
	app.delete('/api/v02/file/:fileUuid', fileAll);
}


module.exports = {
	initDbir,
}
