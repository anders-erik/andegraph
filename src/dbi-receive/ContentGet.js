

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

		case 'Review-SelectCurrentReview':
			console.log(functionstring, 'selected. ');
			returnArray = await dbi.queries.Review_SelectCurrentReview();
			// res.set('Access-Control-Allow-Origin', `*`);
			break;

		case 'Project-SelectLikeString':
			console.log(functionstring, 'selected. ', queryObject.searchString, ' as query value.');
			returnArray = await dbi.queries.Project_SelectLikeString(queryObject.searchString);
			// res.set('Access-Control-Allow-Origin', `*`);
			break;

		case 'Source-SelectLikeString':
			console.log(functionstring, 'selected. ', queryObject.searchString, ' as query value.');
			returnArray = await dbi.queries.Source_SelectLikeString(queryObject.searchString);
			// res.set('Access-Control-Allow-Origin', `*`);
			break;

		case 'Content-SelectOnUuid':
			console.log(functionstring, 'selected. ', queryObject.Uuid, ' as query value.');
			returnArray = await dbi.procedures.Content_SelectOnUuid(queryObject.Uuid);
			break;

		case 'Content-SelectChildOfUuid':
			console.log(functionstring, 'selected. ', queryObject.Uuid, ' as query value.');
			returnArray = await dbi.procedures.Content_SelectChildOfUuid(queryObject.Uuid);
			break;





		default:
			res.status(400).send({});
			return;
			break;
	}


	res.set('Access-Control-Allow-Origin', `*`);
	res.status(200).send(returnArray);

};

