const queries = require("../Queries");
const { Content_SelectOnUuid } = require('./Content_SelectOnUuid.js');



async function ContentEdge_SelectAdjacentOfUuid(Uuid) {

	console.log('AAAAAAAAAAAAAA')
	let nodeEdges = await queries.NodeEdge_SelectAdjacentOfUuid(Uuid);

	let contentEdges = [];

	for (const nodeEdge of nodeEdges) {
		console.log('_____', nodeEdge)
		let contentEdge = {
			content: {},
			edge: {},
		}

		contentEdge.content = (await Content_SelectOnUuid(nodeEdge.Uuid))[0];
		contentEdge.edge = nodeEdge.edge;
		contentEdges.push(contentEdge);
	}

	return contentEdges;

}





module.exports = {
	ContentEdge_SelectAdjacentOfUuid,
}


