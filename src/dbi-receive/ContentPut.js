

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

		case 'Content-UpdateOnContentObject':
			console.log(functionstring, 'selected. ', bodyArray, ' as bodyArray.');
			returnArray = await dbi.procedures.Content_UpdateOnContentObject(bodyArray[0]);
			break;



		default:
			res.status(400).send({});
			return;
			break;
	}


	// not working??
	// res.status(200).send(returnArray);
	res.set('Access-Control-Allow-Origin', `*`);
	res.sendStatus(200);

};

