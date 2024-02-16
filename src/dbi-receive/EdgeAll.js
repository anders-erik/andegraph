

let dbi = require('../db-interface/DbInterface');


module.exports = async (req, res) => {
	//console.log(req.headers.id)

	// queries = require('../db-interface/Queries');

	let functionstring = req.params.functionstring;
	console.log(functionstring)
	let bodyArray = req.body;
	console.log(bodyArray)
	let queryObject = req.query;
	console.log(queryObject)

	let returnArray = [];

	switch (functionstring) {


		case 'Edge-DeleteOnUuid':
			console.log(functionstring, 'selected. ', queryObject, ' as queryObject.');
			await dbi.queries.Edge_DeleteOnUuid(queryObject.Uuid);
			returnArray = [];
			break;

		case 'Edge-DeleteOnNodeUuids':
			console.log(functionstring, 'selected. ', queryObject, ' as queryObject.');
			await dbi.queries.Edge_DeleteOnNodeUuids(queryObject.Uuid1, queryObject.Uuid2);
			returnArray = [];
			break;


		case 'Edge-InsertUuidUuidDir':
			console.log(functionstring, 'selected. ', bodyArray, ' as bodyArray.');
			returnArray = await dbi.procedures.Edge_InsertUuidUuidDir(bodyArray[0], bodyArray[1], bodyArray[2]);
			break;


		default:
			res.status(400);
			res.send(returnArray);
			return;
			break;
	}


	// console.log(222222222)
	res.set('Access-Control-Allow-Origin', `*`);
	res.status(200).send(returnArray);
	// console.log(333333)
	// console.log(returnArray)
	// res.send(returnArray);

};

