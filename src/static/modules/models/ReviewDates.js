
import * as uuid from '../utils/uuid.js';

let createReviewDate = function(nodeId, date){
	let id = uuid.generate('reviewDates');

	return [{
		"id": id,
		"date": date,
		"completed": 0,
		"nodeId": nodeId,
	}]

}

export {
	createReviewDate
}