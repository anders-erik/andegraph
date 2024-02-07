

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

		case 'Content-SelectChildOfUuid':
			console.log(functionstring, 'selected. ', queryObject.Uuid, ' as query value.');
			returnArray = await dbi.procedures.Content_SelectChildOfUuid(queryObject.Uuid);
			break;

		case 'Node-SelectChildOfUuid':
			console.log(functionstring, 'selected. ', queryObject.Uuid, ' as query value.');
			returnArray = await dbi.queries.Node_SelectChildOfUuid(queryObject.Uuid);
			break;

		case 'NodeEdge-SelectChildOfUuid':
			console.log(functionstring, 'selected. ', queryObject.Uuid, ' as query value.');
			returnArray = await dbi.queries.NodeEdge_SelectChildOfUuid(queryObject.Uuid);
			break;
	
		default:
			res.status(400).send({});
			return;
			break;
	}



	res.status(200).send(returnArray);

};

