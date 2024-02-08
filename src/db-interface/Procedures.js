

const { Content_SelectFromNode } = require("./procedures/Content_SelectFromNode");
const { Content_InsertObject } = require('./procedures/Content_InsertObject');
const { Content_InsertChildUuidTable } = require('./procedures/Content_InsertChildUuidTable');
const { Content_DeleteFromGraph } = require('./procedures/Content_DeleteFromGraph');
const { Content_SelectChildOfUuid } = require('./procedures/Content_SelectChildOfUuid');

// EDGE
const { Edge_InsertUuidUuidDir } = require('./procedures/Edge_InsertUuidUuidDir');


// CONTENT CRUD
const { Content_SelectOnUuid } = require('./procedures/Content_SelectOnUuid');
const { Content_InsertOnTable } = require('./procedures/Content_InsertOnTable');
const { Content_DropFullOnUuid } = require('./procedures/Content_DropFullOnUuid');
const { Content_UpdateOnContentObject } = require('./procedures/Content_UpdateOnContentObject');




module.exports = {
	
	Content_SelectFromNode,
	Content_InsertObject,
	Content_InsertChildUuidTable,
	Content_DeleteFromGraph,
	Content_SelectChildOfUuid,

	// EDGE
	Edge_InsertUuidUuidDir,

	// CONTENT CRUD
	Content_InsertOnTable,
	Content_SelectOnUuid,
	Content_DropFullOnUuid,
	Content_UpdateOnContentObject,

}

