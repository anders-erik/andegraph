

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

		case 'Content-DropFullOnUuid':
			console.log(functionstring, 'selected. ', queryObject.Uuid, ' as query value.');
			await dbi.procedures.Content_DropFullOnUuid(queryObject.Uuid);
			break;


		default:
			res.status(400).send({});
			return;
			break;
	}


	res.set('Access-Control-Allow-Origin', `*`);
	res.status(200).send(returnArray);

};

