
console.log('import dbir');


// CONTENT
const content = require('./Content.js')

// EDGE
const edge = require('./Edge.js')

// CONTENT-EDGE
const contentedge = require('./ContentEdge.js')

// FILE
const file = require('./File');



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
	app.get('/api/v02/file/:fileUuid', file);
	app.put('/api/v02/file/:fileUuid', express.raw({ limit: "200mb", type: "*/*" }), file);
	app.delete('/api/v02/file/:fileUuid', file);


}


module.exports = {
	initDbir,
}
