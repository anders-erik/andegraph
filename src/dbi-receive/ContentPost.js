

let dbi = require('../db-interface/DbInterface');


module.exports = async (req, res) => {
	//console.log(req.headers.id)

	// queries = require('../db-interface/Queries');

	let functionstring = req.params.functionstring;
	console.log(functionstring)
	let bodyArray = req.body;
	console.log(bodyArray)

	let returnArray = [];

	switch (functionstring) {

		case 'Content-InsertChildUuidTable':
			console.log(functionstring, 'selected. ', bodyArray, ' as bodyArray.');
			returnArray = await dbi.procedures.Content_InsertChildUuidTable(bodyArray[0], bodyArray[1]);
			break;

		case 'Content-InsertOnTable':
			console.log(functionstring, 'selected. ', bodyArray, ' as bodyArray.');
			returnArray = await dbi.procedures.Content_InsertOnTable(bodyArray[0]);
			break;

		case 'Review-InsertScheduleOnUuid':
			console.log(functionstring, 'selected. ', bodyArray, ' as bodyArray.');
			await dbi.procedures.Review_InsertScheduleOnUuid(bodyArray[0], bodyArray[1]);
			break;


		default:
			res.status(400).send({});
			return;
			break;
	}


	res.set('Access-Control-Allow-Origin', `*`);
	res.status(200).send(returnArray);

};

