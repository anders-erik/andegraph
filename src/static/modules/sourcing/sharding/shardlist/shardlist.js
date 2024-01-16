
import { getShardcard } from "./shardcard/shardcard.js";

import * as api from "../../../Fetches/api/api.js";
import { loadShardFile } from "./shardcard/fileviewer/fileviewer.js";



function createShardlistcard(){
	let shardlist = document.createElement('div');
	shardlist.id = 'sharding-listcard';
	shardlist.classList.add('card');
	//sourcefindList.textContent = 'sourcefind-listcard';
	
	//loadShardsIntoShardlist();

	return shardlist;
}

// sourceid??
async function loadShardsIntoShardlist(sourceId){
	//console.log('start loading shards');

	clearShardlist();

	let shardlist = document.getElementById('sharding-listcard');


	//let shards = await api.getShards(sourceId);
	let shards = await api.getNodesAdjacent(sourceId, 0, 1);
	//console.log('back')
	
	// get the cards in place
	shards.forEach(shard => {
		//console.log(shard);
		//console.log(Math.random())
		shardlist.appendChild(getShardcard(shard));
		
	});


	// TODOO
	// load file into cards
	for(let i = 0; i <shards.length; i++){
		//console.log(i);

		await loadShardFile(shards[i], sourceId);
	}
	

	// unable to call async function from for-each....
	shards.forEach(shard => {
		//console.log(shard);
		//await loadShardFile(shard, sourceId);

	});


	//let shardblob = await api.getShardFile(117, 12);
	//console.log(shardblob);


	// Old shards for testing
	let shard1 = {
		id: 22,
		dateCreated: 2023-12-17,
		fileType: 'image',
		fileEnding: 'jpeg',
		sourceId: 117
	}
	let shard2 = {
		id: 23,
		dateCreated: 2023-12-17,
		fileType: 'text',
		fileEnding: 'css',
		sourceId: 117
	}


	//shardlist.appendChild(getShardcard(shard1));
	//shardlist.appendChild(getShardcard(shard2));

	console.log('done loading shards');
}

function clearShardlist(){
	let shardlist = document.getElementById('sharding-listcard');

	// Quick and dirty..
	shardlist.innerHTML = '';

	//let shardlistChildren = shardlist.childNodes();

}

function deleteShardcard(shardid){
	console.log('deleteing shardcard ', shardid);
	let shardcardDelete = document.getElementById('shardcard-' + shardid);

	shardcardDelete.remove();
	
}


export {
	createShardlistcard,
	loadShardsIntoShardlist,
	deleteShardcard
}
/* 
import * as listcard from '../listcard/Listcard.js';

listcard.getFirstSourcecardId();
listcard.getLastSourcecardId();

*/


