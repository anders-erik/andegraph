
import * as uuid from '../utils/uuid.js';
import * as isoDates from '../utils/IsoDates.js';

let generateNewSource = function(){
	//console.log('new node with uuid : ', uuid.generate(uuidType));
	//console.log(isoDates.getTodaysDate());

	return [ {
		"id": uuid.generate('nodes'),
		"dateCreated": isoDates.getTodaysDate(),
		"title": "",
		"textContent": "",
		"elementType": "",
		"nodeType": "source",
		"nodeTypeType": "",
		"url": "",
		"fileName": "",
		"fileExtension": ""
	} ];
}


let generateNewShard = function(){
	//console.log('new node with uuid : ', uuid.generate(uuidType));
	//console.log(isoDates.getTodaysDate());

	return [ {
		"id": uuid.generate('nodes'),
		"dateCreated": isoDates.getTodaysDate(),
		"title": "",
		"textContent": "",
		"elementType": "",
		"nodeType": "shard",
		"nodeTypeType": "",
		"url": "",
		"fileName": "",
		"fileExtension": ""
	} ];
}


export {
	generateNewSource,
	generateNewShard,
}