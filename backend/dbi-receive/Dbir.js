
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

	// Allow all preflight requests
	app.options('*', (req, res) => {
		// https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request

		res.set('Access-Control-Allow-Origin', `*`);
		// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		// res.set('Access-Control-Allow-Methods', 'PUT');
		res.set('Access-Control-Allow-Methods', '*');
		// res.set('Access-Control-Allow-Headers', 'content-tyzpe');
		res.set('Access-Control-Allow-Headers', '*');
		res.status(200).send("");
	});


	
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
