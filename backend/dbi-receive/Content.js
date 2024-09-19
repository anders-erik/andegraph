
let dbi = require('../db-interface/DbInterface');



module.exports = async (req, res) => {
	//console.log(req.headers.id)

	// queries = require('../db-interface/Queries');

	let functionstring = req.params.functionstring;
	let queryObject = req.query;
	let body = req.body;

	// console.log(functionstring)
	// console.log(queryObject)
	// console.log(body)

	let returnArray = [];

	let returnStatus = 200;

	try {


		switch (functionstring) {


			
			case 'Content-InsertOnTable':
				returnArray = await dbi.procedures.Content_InsertOnTable(queryObject.Table);
				break;
			
			case 'Content-SelectOnUuid':
				returnArray = (await dbi.procedures.Content_SelectOnUuid(queryObject.Uuid))[0];
				break;

			
			case 'Content-UpdateWithContentObject':
				returnArray = await dbi.procedures.Content_UpdateWithContentObject(body);
				// return the updated array
				returnArray = (await dbi.procedures.Content_SelectOnUuid(body.Uuid))[0];

				break;
			
			
			case 'Content-DropFullOnUuid':
				await dbi.procedures.Content_DropFullOnUuid(queryObject.Uuid);
				returnArray = [];
				break;


			case 'Content-SelectOnTitleLikeString':
				returnArray = await dbi.procedures.Content_SelectOnTitleLikeString(queryObject.searchString, queryObject.tableLimit, queryObject.includeTable, queryObject.orderColumn, queryObject.desc);
				break;

			
			case 'Review-InsertScheduleOnUuid':
				await dbi.procedures.Review_InsertScheduleOnUuid(queryObject.Uuid, queryObject.scheduleType);
				break;
			
			case 'Review-SelectCurrentReview':
				returnArray = await dbi.queries.Review_SelectCurrentReview();
				break;



			default:
				returnStatus = 400;
				console.log('API ERROR:', functionstring, ' Could not find matching function string! ');
				res.status(returnStatus).send({});
				return;
				break;
		}

		
	} catch (error) {
		// Currently we simply set 
		returnStatus = 400;
	}


	if(returnStatus == 400){
		console.log('400: ', functionstring, ' QueryObject:  ',queryObject, body, ' as body.');
		console.log("^^^^^^^^^^^^^^^^^^^^^^^^");
	}
	else if(returnStatus == 200){
		var datetime = new Date();
		
		// Try to get uuid to be logged. Sometimes that is not provided (search, current review, etc.)
		if (queryObject.Uuid == undefined && returnArray.Uuid == undefined)
			console.log(200, ',' + functionstring, ',' + returnArray[0].Uuid, ',', datetime)
		else if (queryObject.Uuid == undefined)
			console.log(200, ',' + functionstring, ',' + returnArray.Uuid, ',', datetime)
		else
			console.log(200, ',' + functionstring, ',' + queryObject.Uuid, ',', datetime)
	}

	res.set('Access-Control-Allow-Origin', `*`);
	res.status(returnStatus).send(returnArray);
	
};
