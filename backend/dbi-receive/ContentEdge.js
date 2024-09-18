

let dbi = require('../db-interface/DbInterface');


module.exports = async (req, res) => {
	//console.log(req.headers.id)

	// queries = require('../db-interface/Queries');

	let functionstring = req.params.functionstring;
	let queryObject = req.query;

	console.log(functionstring)
	console.log(queryObject)

	let returnArray = [];

	switch (functionstring) {


		case 'ContentEdge-InsertAdjacentToUuidIntoTable':
			// console.log('ra', returnArray)
			console.log(functionstring, 'selected. ', queryObject, ' as query value.');
			returnArray = await dbi.procedures.ContentEdge_InsertAdjacentToUuidIntoTable(queryObject.Uuid, queryObject.Directed, queryObject.Table, queryObject.Type, queryObject.Order, queryObject.Path);
			// console.log('ra', returnArray)
			break;

		case 'ContentEdge-SelectChildOfUuid':
			console.log("______________")
			console.log(functionstring, 'selected. ', queryObject.Uuid, ' as query value.');
			returnArray = await dbi.procedures.ContentEdge_SelectChildOfUuid(queryObject.Uuid);
			break;

		case 'ContentEdge-SelectParentOfUuid':
			console.log(functionstring, 'selected. ', queryObject.Uuid, ' as query value.');
			returnArray = await dbi.procedures.ContentEdge_SelectParentOfUuid(queryObject.Uuid);
			break;

		case 'ContentEdge-SelectUndirectedOfUuid':
			console.log(functionstring, 'selected. ', queryObject.Uuid, ' as query value.');
			returnArray = await dbi.procedures.ContentEdge_SelectUndirectedOfUuid(queryObject.Uuid);
			break;

		case 'ContentEdge-SelectAdjacentOfUuid':
			console.log(functionstring, 'selected. ', queryObject.Uuid, ' as query value.');
			returnArray = await dbi.procedures.ContentEdge_SelectAdjacentOfUuid(queryObject.Uuid);
			break;

		default:
			res.status(400).send({});
			return;
			break;
	}


	res.set('Access-Control-Allow-Origin', `*`);
	res.status(200).send(returnArray);

};

