const { Code_DeleteOnUuid } = require("./queries/Code_DeleteOnUuid");
const { Code_Insert } = require("./queries/Code_Insert");
const { Code_SelectOnUuid } = require("./queries/Code_SelectOnUuid");
const { Code_Update } = require("./queries/Code_Update");


const { Edge_DeleteOnUuid } = require("./queries/Edge_DeleteOnUuid");
const { Edge_DeleteOnNodeUuids } = require("./queries/Edge_DeleteOnNodeUuids");
const { Edge_Insert } = require("./queries/Edge_Insert");
const { Edge_SelectOnUuid } = require("./queries/Edge_SelectOnUuid");
const { Edge_Update } = require("./queries/Edge_Update");

const { Equation_DeleteOnUuid } = require("./queries/Equation_DeleteOnUuid");
const { Equation_Insert } = require("./queries/Equation_Insert");
const { Equation_SelectOnUuid } = require("./queries/Equation_SelectOnUuid");
const { Equation_Update } = require("./queries/Equation_Update");

const { Event_DeleteOnUuid } = require("./queries/Event_DeleteOnUuid");
const { Event_Insert } = require("./queries/Event_Insert");
const { Event_SelectOnUuid } = require("./queries/Event_SelectOnUuid");
const { Event_Update } = require("./queries/Event_Update");

const { File_DeleteOnUuid } = require("./queries/File_DeleteOnUuid");
const { File_Insert } = require("./queries/File_Insert");
const { File_SelectOnUuid } = require("./queries/File_SelectOnUuid");
const { File_Update } = require("./queries/File_Update");

const { Project_DeleteOnUuid } = require("./queries/Project_DeleteOnUuid");
const { Project_Insert } = require("./queries/Project_Insert");
const { Project_SelectOnUuid } = require("./queries/Project_SelectOnUuid");
const { Project_Update } = require("./queries/Project_Update");

const { Review_DeleteOnUuid } = require("./queries/Review_DeleteOnUuid");
const { Review_Insert } = require("./queries/Review_Insert");
const { Review_SelectOnUuid } = require("./queries/Review_SelectOnUuid");
const { Review_Update } = require("./queries/Review_Update");

const { Source_DeleteOnUuid } = require("./queries/Source_DeleteOnUuid");
const { Source_Insert } = require("./queries/Source_Insert");
const { Source_SelectOnUuid } = require("./queries/Source_SelectOnUuid");
const { Source_Update } = require("./queries/Source_Update");

const { Text_DeleteOnUuid } = require("./queries/Text_DeleteOnUuid");
const { Text_Insert } = require("./queries/Text_Insert");
const { Text_SelectOnUuid } = require("./queries/Text_SelectOnUuid");
const { Text_Update } = require("./queries/Text_Update");


const { Node_DeleteOnUuid } = require("./queries/Node_DeleteOnUuid");
const { Node_Insert } = require("./queries/Node_Insert");
const { Node_InsertEmpty } = require("./queries/Node_InsertEmpty");
const { Node_SelectOnUuid } = require("./queries/Node_SelectOnUuid");
const { Node_SelectUndirectedOfUuid } = require("./queries/Node_SelectUndirectedOfUuid");
const { Node_SelectReviewOfUuid } = require("./queries/Node_SelectReviewOfUuid");
const { Node_SelectChildOfUuid } = require("./queries/Node_SelectChildOfUuid");
const { Node_SelectAdjacentOfUuid } = require("./queries/Node_SelectAdjacentOfUuid");
const { Node_SelectParentOfUuid } = require("./queries/Node_SelectParentOfUuid");
const { Node_Update } = require("./queries/Node_Update");

const { NodeEdge_SelectChildOfUuid } = require("./queries/NodeEdge_SelectChildOfUuid");
const { NodeEdge_SelectAdjacentOfUuid } = require("./queries/NodeEdge_SelectAdjacentOfUuid");
const { NodeEdge_SelectReviewOfUuid } = require("./queries/NodeEdge_SelectReviewOfUuid");
const { NodeEdge_SelectUndirectedOfUuid } = require("./queries/NodeEdge_SelectUndirectedOfUuid");
const { NodeEdge_SelectParentOfUuid } = require("./queries/NodeEdge_SelectParentOfUuid");







module.exports = {
	
	Code_DeleteOnUuid,
	Code_Insert,
	Code_SelectOnUuid,
	Code_Update,
	
	Edge_DeleteOnUuid,
	Edge_DeleteOnNodeUuids,
	Edge_Insert,
	Edge_SelectOnUuid,
	Edge_Update,
	
	Equation_DeleteOnUuid,
	Equation_Insert,
	Equation_SelectOnUuid,
	Equation_Update,

	Event_DeleteOnUuid,
	Event_Insert,
	Event_SelectOnUuid,
	Event_Update,

	File_DeleteOnUuid,
	File_Insert,
	File_SelectOnUuid,
	File_Update,

	Project_DeleteOnUuid,
	Project_Insert,
	Project_SelectOnUuid,
	Project_Update,

	Review_DeleteOnUuid,
	Review_Insert,
	Review_SelectOnUuid,
	Review_Update,

	Source_DeleteOnUuid,
	Source_Insert,
	Source_SelectOnUuid,
	Source_Update,

	Text_DeleteOnUuid,
	Text_Insert,
	Text_SelectOnUuid,
	Text_Update,

	Node_DeleteOnUuid,
	Node_Insert,
	Node_InsertEmpty,
	Node_SelectOnUuid,
	Node_SelectUndirectedOfUuid,
	Node_SelectReviewOfUuid,
	Node_SelectChildOfUuid,
	Node_SelectAdjacentOfUuid,
	Node_SelectParentOfUuid,
	Node_Update,

	NodeEdge_SelectChildOfUuid,
	NodeEdge_SelectAdjacentOfUuid,
	NodeEdge_SelectReviewOfUuid,
	NodeEdge_SelectUndirectedOfUuid,
	NodeEdge_SelectParentOfUuid,

}

