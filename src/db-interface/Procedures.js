



// CONTENT CRUD
const { Content_SelectOnUuid } = require('./procedures/Content_SelectOnUuid');
const { Content_InsertOnTable } = require('./procedures/Content_InsertOnTable');
const { Content_DropFullOnUuid } = require('./procedures/Content_DropFullOnUuid');
const { Content_UpdateWithContentObject } = require('./procedures/Content_UpdateWithContentObject');
const { Content_SelectOnTitleLikeString } = require('./procedures/Content_SelectOnTitleLikeString');


// CONTENT ADDITIONAL
const { Content_SelectFromNode } = require("./procedures/Content_SelectFromNode");
const { Content_InsertObject } = require('./procedures/Content_InsertObject');
const { Content_InsertChildUuidTable } = require('./procedures/Content_InsertChildUuidTable');
const { Content_SelectChildOfUuid } = require('./procedures/Content_SelectChildOfUuid');

// CONTENT-EDGE
const { ContentEdge_InsertAdjacentToUuidIntoTable } = require("./procedures/ContentEdge_InsertAdjacentToUuidIntoTable");
const { ContentEdge_SelectAdjacentOfUuid } = require("./procedures/ContentEdge_SelectAdjacentOfUuid");
const { ContentEdge_SelectChildOfUuid } = require("./procedures/ContentEdge_SelectChildOfUuid");
const { ContentEdge_SelectParentOfUuid } = require("./procedures/ContentEdge_SelectParentOfUuid");
const { ContentEdge_SelectUndirectedOfUuid } = require("./procedures/ContentEdge_SelectUndirectedOfUuid");



// EDGE
const { Edge_InsertUuidUuid } = require('./procedures/Edge_InsertUuidUuid');



// REVIEWS
const { Review_InsertScheduleOnUuid } = require('./procedures/Review_InsertScheduleOnUuid');



module.exports = {

	// CONTENT CRUD
	Content_InsertOnTable,
	Content_SelectOnUuid,
	Content_DropFullOnUuid,
	Content_UpdateWithContentObject,
	Content_SelectOnTitleLikeString,

	// CONTENT ADDITIONAL
	Content_SelectFromNode,
	Content_InsertObject,
	Content_InsertChildUuidTable,
	Content_SelectChildOfUuid,

	// EDGE
	Edge_InsertUuidUuid,

	// CONTENT-EDGE
	ContentEdge_InsertAdjacentToUuidIntoTable,
	ContentEdge_SelectAdjacentOfUuid,
	ContentEdge_SelectChildOfUuid,
	ContentEdge_SelectParentOfUuid,
	ContentEdge_SelectUndirectedOfUuid,

	// REVIEWS
	Review_InsertScheduleOnUuid,

}

