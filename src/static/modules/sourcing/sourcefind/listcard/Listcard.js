

function createSourcefindListcard(){
	let sourcefindList = document.createElement('div');
	sourcefindList.id = 'sourcefind-listcard';
	sourcefindList.classList.add('card');
	//sourcefindList.textContent = 'sourcefind-listcard';
	

	return sourcefindList;
}


function getFirstSourcecardId(){
	let listcard  = document.getElementById('sourcefind-listcard');
	let firstSourcecard = listcard.firstElementChild;
	let firstSourcecardId = firstSourcecard.id.match(/\d+/g)[0];
	return firstSourcecardId;
	//console.log(firstSourcecardId);
}

function getLastSourcecardId(){
	let listcard  = document.getElementById('sourcefind-listcard');
	let lastSourcecard = listcard.lastElementChild;
	let lastSourcecardId = lastSourcecard.id.match(/\d+/g)[0];
	return lastSourcecardId;
	//console.log(lastSourcecardId);
}

export {
	createSourcefindListcard,
	getFirstSourcecardId,
	getLastSourcecardId
}
/* 
import * as listcard from '../listcard/Listcard.js';

listcard.getFirstSourcecardId();
listcard.getLastSourcecardId();

*/


