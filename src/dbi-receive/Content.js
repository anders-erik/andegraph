
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



		case 'Content-InsertOnTable':
			console.log(functionstring, 'selected. ', queryObject.Table, ' as table string.');
			returnArray = await dbi.procedures.Content_InsertOnTable(queryObject.Table);
			break;

		case 'Content-SelectOnUuid':
			console.log(functionstring, 'selected. ', queryObject.Uuid, ' as query value.');
			returnArray = (await dbi.procedures.Content_SelectOnUuid(queryObject.Uuid))[0];
			break;

		case 'Content-UpdateWithContentObject':
			console.log(functionstring, 'selected. ', body, ' as body.');
			returnArray = await dbi.procedures.Content_UpdateWithContentObject(body);
			returnArray = (await dbi.procedures.Content_SelectOnUuid(body.Uuid))[0];
			break;

		case 'Content-DropFullOnUuid':
			console.log(functionstring, 'selected. ', queryObject.Uuid, ' as query value.');
			await dbi.procedures.Content_DropFullOnUuid(queryObject.Uuid);
			returnArray = [];
			break;




		case 'Content-SelectOnTitleLikeString':
			console.log('AAA')
			console.log(functionstring, 'selected. ', queryObject.searchString, ' as query value.');
			returnArray = await dbi.procedures.Content_SelectOnTitleLikeString(queryObject.searchString, queryObject.tableLimit, queryObject.includeTable, queryObject.orderColumn, queryObject.desc);
			// res.set('Access-Control-Allow-Origin', `*`);
			break;

		case 'Review-InsertScheduleOnUuid':
			console.log(functionstring, 'selected. ', body, ' as body.');
			await dbi.procedures.Review_InsertScheduleOnUuid(queryObject.Uuid, queryObject.scheduleType);
			break;

		case 'Review-SelectCurrentReview':
			console.log(functionstring, 'selected. ');
			returnArray = await dbi.queries.Review_SelectCurrentReview();
			// res.set('Access-Control-Allow-Origin', `*`);
			break;



		default:
			res.status(400).send({});
			return;
			break;
	}





	/* 
			case 'Content-InsertChildUuidTable':
				console.log(functionstring, 'selected. ', body, ' as body.');
				returnArray = await dbi.procedures.Content_InsertChildUuidTable(body[0], body[1]);
				break;
	
			case 'Source-SelectLikeString':
				console.log(functionstring, 'selected. ', queryObject.searchString, ' as query value.');
				returnArray = await dbi.queries.Source_SelectLikeString(queryObject.searchString);
				// res.set('Access-Control-Allow-Origin', `*`);
				break;
	
	
			case 'Content-SelectChildOfUuid':
				console.log(functionstring, 'selected. ', queryObject.Uuid, ' as query value.');
				returnArray = await dbi.procedures.Content_SelectChildOfUuid(queryObject.Uuid);
				break;
	
	
	 */







	// not working??
	// res.status(200).send(returnArray);
	res.set('Access-Control-Allow-Origin', `*`);
	// res.sendStatus(200);
	res.status(200).send(returnArray);

};
