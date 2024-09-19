

let dbi = require('../db-interface/DbInterface');
let Content_ExistsOnUuid = require("../db-interface/Procedures")


module.exports = async (req, res) => {
	//console.log(req.headers.id)

	// queries = require('../db-interface/Queries');

	let functionstring = req.params.functionstring;
	let queryObject = req.query;

	// console.log(functionstring)
	// console.log(queryObject)

	let returnArray = [];
	let returnStatus = 200;

	res.set('Access-Control-Allow-Origin', `*`);
	
	try {
		
		
		// Make sure that the uuid exists, or else 200s are returned by the 'Select'-methods
		let nodeOnUuid = await dbi.queries.Node_SelectOnUuid(queryObject.Uuid);
		// EMPTY ARRAY
		if(nodeOnUuid == ''){
			console.log("Failed to find a matching uuid. in File: ", __filename);
			throw new Error('Failed to find a matching uuid');
		}
		

		switch (functionstring) {


			case 'ContentEdge-InsertAdjacentToUuidIntoTable':
				// console.log('ra', returnArray)
				// console.log(functionstring, 'selected. ', queryObject, ' as query value.');
				returnArray = await dbi.procedures.ContentEdge_InsertAdjacentToUuidIntoTable(queryObject.Uuid, queryObject.Directed, queryObject.Table, queryObject.Type, queryObject.Order, queryObject.Path);
				// console.log('ra', returnArray)
				break;
				
			case 'ContentEdge-SelectChildOfUuid':
				// console.log(functionstring, 'selected. ', queryObject.Uuid, ' as query value.');
				returnArray = await dbi.procedures.ContentEdge_SelectChildOfUuid(queryObject.Uuid);
				break;
				
			case 'ContentEdge-SelectParentOfUuid':
				// console.log(functionstring, 'selected. ', queryObject.Uuid, ' as query value.');
				returnArray = await dbi.procedures.ContentEdge_SelectParentOfUuid(queryObject.Uuid);
				break;
					
			case 'ContentEdge-SelectUndirectedOfUuid':
				// console.log(functionstring, 'selected. ', queryObject.Uuid, ' as query value.');
				returnArray = await dbi.procedures.ContentEdge_SelectUndirectedOfUuid(queryObject.Uuid);
				break;
				
				case 'ContentEdge-SelectAdjacentOfUuid':
				// console.log("______________");
				// console.log(functionstring, 'selected. ', queryObject.Uuid, ' as query value.');
				returnArray = await dbi.procedures.ContentEdge_SelectAdjacentOfUuid(queryObject.Uuid);
				break;

			default:
				res.status(400).send({});
				return;
				break;
		}



	} catch (error) {
		// console.log("1")
		returnStatus = 400;
	}


	var datetime = new Date();
	if(returnStatus == 400){
		// console.log("2")
		console.log('400: ', functionstring, ' QueryObject:  ', queryObject, '\n @ ', datetime);
		console.log("^^^^^^^^^^^^^^^^^^^^^^^^");
	}
	else if (returnStatus == 200) {

		// Try to get uuid to be logged. Sometimes that is not provided (search, current review, etc.)
		console.log(200, ',' + functionstring, ',' + queryObject.Uuid, ',', datetime);
	}
	
	res.status(returnStatus).send(returnArray);
	// res.status(200).send(returnArray);

};

