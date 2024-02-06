
const { emptyCode } = require('./Code');
const { emptyEdge } = require('./Edge');
const { emptyEquation } = require('./Equation');
const { emptyEvent } = require('./Event');
const { emptyFile } = require('./File');
const { emptyNode } = require('./Node');
const { emptyProject } = require('./Project');
const { emptyReview } = require('./Review');
const { emptySource } = require('./Source');
const { emptyText } = require('./Text');


function getEmptyObject(tableName){

	let contentObject = {};

	switch (tableName) {

		case 'Code':
			contentObject = emptyCode(); break;
			
		case 'Edge':
			contentObject = emptyEdge(); break;

		case 'Equation':
			contentObject = emptyEquation(); break;
			
		case 'Event':
			contentObject = emptyEvent(); break;
			
		case 'File':
			contentObject = emptyFile(); break;

		case 'Node':
			contentObject = emptyNode(); break;

		case 'Project':
			contentObject = emptyProject(); break;
			
		case 'Review':
			contentObject = emptyReview(); break;
			
		case 'Source':
			contentObject = emptySource(); break;
			
		case 'Text':
			contentObject = emptyText(); break;
			
		default:
			break;
	}

	return contentObject;

}


module.exports = {
	emptyCode,
	emptyEdge,
	emptyEquation,
	emptyEvent,
	emptyFile,
	emptyNode,
	emptyProject,
	emptyReview,
	emptySource,
	emptyText,

	getEmptyObject,
}

