

let dbi = require('../db-interface/DbInterface');


module.exports = async (req, res) => {
	//console.log(req.headers.id)

	// queries = require('../db-interface/Queries');

	let functionstring = req.params.functionstring;
	console.log(functionstring)
	let queryObject = req.query;
	console.log(queryObject)

	let returnArray = [];

	switch (functionstring) {

		// NODE
		case 'Node-SelectChildOfUuid':
			console.log(functionstring, 'selected. ', queryObject.Uuid, ' as query value.');
			returnArray = await dbi.queries.Node_SelectChildOfUuid(queryObject.Uuid);
			break;

		case 'NodeEdge-SelectChildOfUuid':
			console.log(functionstring, 'selected. ', queryObject.Uuid, ' as query value.');
			returnArray = await dbi.queries.NodeEdge_SelectChildOfUuid(queryObject.Uuid);
			break;

		case 'Node-SelectParentOfUuid':
			console.log(functionstring, 'selected. ', queryObject.Uuid, ' as query value.');
			returnArray = await dbi.queries.Node_SelectParentOfUuid(queryObject.Uuid);
			break;

		case 'NodeEdge-SelectParentOfUuid':
			console.log(functionstring, 'selected. ', queryObject.Uuid, ' as query value.');
			returnArray = await dbi.queries.NodeEdge_SelectParentOfUuid(queryObject.Uuid);
			break;

		case 'NodeEdge-SelectAdjacentOfUuid':
			console.log(functionstring, 'selected. ', queryObject.Uuid, ' as query value.');
			returnArray = await dbi.queries.NodeEdge_SelectAdjacentOfUuid(queryObject.Uuid);
			// console.log(returnArray);
			break;

		case 'Node-SelectAdjacentOfUuid':
			console.log(functionstring, 'selected. ', queryObject.Uuid, ' as query value.');
			returnArray = await dbi.queries.Node_SelectAdjacentOfUuid(queryObject.Uuid);
			// console.log(returnArray);
			break;



		default:
			res.status(400).send({});
			return;
			break;
	}


	res.set('Access-Control-Allow-Origin', `*`);
	res.status(200).send(returnArray);

};

