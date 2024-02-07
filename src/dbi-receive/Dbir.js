
console.log('import dbir');

// NODE
const contentGet = require('./ContentGet');
// const contentPost = require('./ContentPost');
// const contentPut = require('./ContentPut');
// const contentPatch = require('./ContentPatch');
// const contentDelete = require('./ContentDelete');


function initDbir(app, express){
	console.log('init dbir')

	// CONTENT
	app.get('/api/v02/content/:functionstring', contentGet);
	// app.post('/api/node/:nodeId', postNode);
	// app.put('/api/node/:nodeId', putNode);
	// app.delete('/api/node/:nodeId', deleteNode);
}


module.exports = {
	initDbir,
}
