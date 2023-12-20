

function createShardlistcard(){
	let shardlist = document.createElement('div');
	shardlist.id = 'sharding-listcard';
	shardlist.classList.add('card');
	//sourcefindList.textContent = 'sourcefind-listcard';
	

	return shardlist;
}




export {
	createShardlistcard,
}
/* 
import * as listcard from '../listcard/Listcard.js';

listcard.getFirstSourcecardId();
listcard.getLastSourcecardId();

*/


