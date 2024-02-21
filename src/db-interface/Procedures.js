


// CONTENT-EDGE
const { ContentEdge_InsertAdjacentToUuidIntoTable } = require("./procedures/ContentEdge_InsertAdjacentToUuidIntoTable");
const { ContentEdge_SelectAdjacentOfUuid } = require("./procedures/ContentEdge_SelectAdjacentOfUuid");
const { ContentEdge_SelectChildOfUuid } = require("./procedures/ContentEdge_SelectChildOfUuid");
const { ContentEdge_SelectParentOfUuid } = require("./procedures/ContentEdge_SelectParentOfUuid");
const { ContentEdge_SelectUndirectedOfUuid } = require("./procedures/ContentEdge_SelectUndirectedOfUuid");







const { Content_SelectFromNode } = require("./procedures/Content_SelectFromNode");
const { Content_InsertObject } = require('./procedures/Content_InsertObject');
const { Content_InsertChildUuidTable } = require('./procedures/Content_InsertChildUuidTable');
const { Content_DeleteFromGraph } = require('./procedures/Content_DeleteFromGraph');
const { Content_SelectChildOfUuid } = require('./procedures/Content_SelectChildOfUuid');

// EDGE
const { Edge_InsertUuidUuidDir } = require('./procedures/Edge_InsertUuidUuidDir');
const { Edge_InsertUuidUuid } = require('./procedures/Edge_InsertUuidUuid');



// CONTENT CRUD
const { Content_SelectOnUuid } = require('./procedures/Content_SelectOnUuid');
const { Content_InsertOnTable } = require('./procedures/Content_InsertOnTable');
const { Content_DropFullOnUuid } = require('./procedures/Content_DropFullOnUuid');
const { Content_UpdateWithContentObject } = require('./procedures/Content_UpdateWithContentObject');
const { Content_SelectOnTitleLikeString } = require('./procedures/Content_SelectOnTitleLikeString');


const { Content_UpdateOnContentObject } = require('./procedures/Content_UpdateOnContentObject');


// REVIEWS
const { Review_InsertScheduleOnUuid } = require('./procedures/Review_InsertScheduleOnUuid');



module.exports = {

	ContentEdge_InsertAdjacentToUuidIntoTable,
	ContentEdge_SelectAdjacentOfUuid,
	ContentEdge_SelectChildOfUuid,
	ContentEdge_SelectParentOfUuid,
	ContentEdge_SelectUndirectedOfUuid,





	Content_SelectFromNode,
	Content_InsertObject,
	Content_InsertChildUuidTable,
	Content_DeleteFromGraph,
	Content_SelectChildOfUuid,

	// EDGE
	Edge_InsertUuidUuidDir,
	Edge_InsertUuidUuid,

	// CONTENT CRUD
	Content_InsertOnTable,
	Content_SelectOnUuid,
	Content_DropFullOnUuid,
	Content_UpdateWithContentObject,
	Content_SelectOnTitleLikeString,

	Content_UpdateOnContentObject,

	// REVIEWS
	Review_InsertScheduleOnUuid,

}

