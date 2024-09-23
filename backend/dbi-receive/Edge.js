

let dbi = require('../db-interface/DbInterface');


module.exports = async (req, res) => {
	//console.log(req.headers.id)

	// queries = require('../db-interface/Queries');

	let functionstring = req.params.functionstring;
	let queryObject = req.query;
	let body = req.body;

	// console.log(functionstring)
	// console.log(queryObject)
	// console.log(body)

	res.set('Access-Control-Allow-Origin', `*`);

	let returnArray = [];
	let returnStatus = 200;

	try {


		switch (functionstring) {

			case 'Edge-InsertUuidUuid':
				// console.log(functionstring, 'selected. ', queryObject, ' as query object.');
				returnArray = await dbi.procedures.Edge_InsertUuidUuid(queryObject.Node1Uuid, queryObject.Node2Uuid, queryObject.Directed, queryObject.Order, queryObject.Path);
				break;
				
			case 'Edge-UpdateWithEdgeObject':
				// console.log(functionstring, 'selected. ', body, ' as bodyArray.');
				returnArray = await dbi.queries.Edge_UpdateWithEdgeObject(body);
				returnArray = (await dbi.queries.Edge_SelectOnUuid(body.Uuid))[0]
				break;

			case 'Edge-DeleteEdgeOnUuid':
				// console.log(functionstring, 'selected. ', queryObject, ' as queryObject.');
				await dbi.queries.Edge_DeleteOnEdgeUuid(queryObject.Uuid);
				returnArray = [];
				break;

			case 'Edge-DeleteOnNodeUuids':
				// console.log("_________");
				// console.log(functionstring, 'selected. ', queryObject, ' as queryObject.');
				await dbi.queries.Edge_DeleteOnNodeUuids(queryObject.Uuid1, queryObject.Uuid2);
				returnArray = [];
				break;


			default:
				res.status(400);
				res.send(returnArray);
				return;
				break;

		}
		
	} catch (error) {
		returnStatus = 400;

	}



	var datetime = new Date();
	if (returnStatus == 400) {
		// console.log("2")
		console.log('400: ', functionstring, ' QueryObject:  ', queryObject, '\n @ ', datetime);
		console.log("^^^^^^^^^^^^^^^^^^^^^^^^");
	}
	else if (returnStatus == 200) {

		// Try to get uuid to be logged. Sometimes that is not provided (search, current review, etc.)
		console.log(200, ',' + functionstring, ',' + queryObject.Uuid1, ',', datetime);
	}



	// console.log(222222222)
	
	res.status(returnStatus).send(returnArray);
	// console.log(333333)
	// console.log(returnArray)
	// res.send(returnArray);

};
