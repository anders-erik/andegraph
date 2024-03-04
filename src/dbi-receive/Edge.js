

let dbi = require('../db-interface/DbInterface');


module.exports = async (req, res) => {
	//console.log(req.headers.id)

	// queries = require('../db-interface/Queries');

	let functionstring = req.params.functionstring;
	let queryObject = req.query;
	let body = req.body;

	console.log(functionstring)
	console.log(queryObject)
	console.log(body)

	let returnArray = [];

	switch (functionstring) {

		case 'Edge-InsertUuidUuid':
			console.log(functionstring, 'selected. ', queryObject, ' as query object.');
			returnArray = await dbi.procedures.Edge_InsertUuidUuidDir(queryObject.Node1Uuid, queryObject.Node2Uuid, queryObject.Directed, queryObject.Order, queryObject.Path);
			break;

		case 'Edge-UpdateWithEdgeObject':
			console.log(functionstring, 'selected. ', body, ' as bodyArray.');
			returnArray = await dbi.queries.Edge_UpdateWithEdgeObject(body);
			returnArray = (await dbi.queries.Edge_SelectOnUuid(body.Uuid))[0]
			break;

		case 'Edge-DeleteEdgeOnUuid':
			console.log(functionstring, 'selected. ', queryObject, ' as queryObject.');
			await dbi.queries.Edge_DeleteOnEdgeUuid(queryObject.Uuid);
			returnArray = [];
			break;

		case 'Edge-DeleteOnNodeUuids':
			console.log(functionstring, 'selected. ', queryObject, ' as queryObject.');
			await dbi.queries.Edge_DeleteOnNodeUuids(queryObject.Uuid1, queryObject.Uuid2);
			returnArray = [];
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
