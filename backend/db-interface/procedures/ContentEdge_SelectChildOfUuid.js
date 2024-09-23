const queries = require("../Queries");
const { Content_SelectOnUuid } = require('./Content_SelectOnUuid.js');



async function ContentEdge_SelectChildOfUuid(Uuid) {


	try {


		let nodeEdges = await queries.NodeEdge_SelectChildOfUuid(Uuid);

		let contentEdges = [];

		for (const nodeEdge of nodeEdges) {
			// console.log('_____', nodeEdge)
			let contentEdge = {
				content: {},
				edge: {},
			}

			contentEdge.content = (await Content_SelectOnUuid(nodeEdge.Uuid))[0];
			contentEdge.edge = nodeEdge.edge;
			contentEdges.push(contentEdge);
		}

		return contentEdges;

		
	} catch (error) {

		console.log("Failed to select children of Uuid. In file : ", __filename);
		rej("Failed to select children of Uuid. In file : ", __filename);
	}


}





module.exports = {
	ContentEdge_SelectChildOfUuid,
}

