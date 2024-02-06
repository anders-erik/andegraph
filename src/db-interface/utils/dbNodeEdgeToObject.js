


function dbNodeEdgesToObjects(dbNodeEdges){
	let nodeEdgeObjectArray = [];
	//console.log('type for array object: ', typeof nodeEdgeObjectArray)
	//console.log('isArray: ', Array.isArray(dbNodeEdges))
	
	for(const dbNodeEdge of dbNodeEdges){
		// console.log('ddNodeEdges: ', dbNodeEdges)
		// console.log('isArray: ', Array.isArray(dbNodeEdges))
		//console.log('dbNodeEdge', dbNodeEdge)

		let nodeEdgeObject = dbNodeEdgeToObject(dbNodeEdge);

		nodeEdgeObjectArray.push(nodeEdgeObject);

	}

	return nodeEdgeObjectArray;
}



function dbNodeEdgeToObject(dbNodeEdge){
	// console.log('dbNodeEdge',dbNodeEdge)
	let nodeObject = {};
	let edgeObject = {};
	let nodeEdgeObject = {};

	for (const [key, value] of Object.entries(dbNodeEdge)) {
		//console.log(key.substring(0, 5));
		if(key.substring(0, 5) == 'edge_'){
			edgeObject[key.substring(5)] = value;
			
		}
		else{
			nodeObject[key] = value;
		}

	}
	//console.log('nodeObject', nodeObject)
	//console.log('edgeObject', edgeObject)

	nodeEdgeObject = nodeObject;
	nodeEdgeObject.edge = edgeObject;

	return nodeEdgeObject;
}




module.exports = {
	dbNodeEdgesToObjects
}