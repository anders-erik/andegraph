
import { newShardcard } from "./shardcard/shardcard.js";

import * as api from "../../../Fetches/api/api.js";
import { loadShardFile } from "./shardcard/fileviewer/fileviewer.js";


let shardlistScrollValue = 0;


function createShardlistcard(){
	let shardlistOuter = document.createElement('div');
	shardlistOuter.id = 'sharding-listcard-outer';
	shardlistOuter.classList.add('card');


	let shardlistInner = document.createElement('div');
	shardlistInner.id = 'sharding-listcard-inner';
	shardlistInner.classList.add('card');
	//shardlistInner.tabIndex = 0;

	//createShardMiniMenu();

	// let shardMiniMenu = document.createElement('div');
	// shardMiniMenu.id = 'shard-mini-menu';
	// shardMiniMenu.textContent = 'M';
	// shardlist.appendChild(shardMiniMenu);

	//sourcefindList.textContent = 'sourcefind-listcard';

	//shardlist.addEventListener('scroll', (e) => {console.log(e.target.scrollTop)})
	
	//loadShardsIntoShardlist();

	shardlistOuter.appendChild(shardlistInner);

	return shardlistOuter;
}

function createShardMiniMenu(){
	let shardlist = document.getElementById('sharding-listcard-inner');
	
	let shardMiniMenu = document.createElement('div');
	shardMiniMenu.id = 'shard-mini-menu';
	shardMiniMenu.textContent = 'M';
	shardlist.appendChild(shardMiniMenu);

}


async function loadNodeAtShardlistTop(nodeId){
	//console.log(nodeObject)
	let shardlist = document.getElementById('sharding-listcard-inner');

	let nodeObject = await api.getNode(nodeId);

	shardlist.insertBefore(newShardcard(nodeObject), shardlist.firstChild);

	//	I am not at the moment trying to add a file to the shardcard because its a completely new node!

	//console.log(nodeObject);

}


// sourceid??
async function loadShardsIntoShardlist(sourceId){
	//console.log('start loading shards');

	clearShardlist();

	createShardMiniMenu()

	let shardlist = document.getElementById('sharding-listcard-inner');


	//let shards = await api.getShards(sourceId);
	let shards = await api.getNodesAdjacent(sourceId, 0, 1);
	//console.log('back')
	
	// get the cards in place
	shards.forEach(shard => {
		//console.log(shard);
		//console.log(Math.random())
		shardlist.appendChild(newShardcard(shard));
		
	});


	// TODOO
	// load file into cards
	for(let i = 0; i <shards.length; i++){
		//console.log(i);

		if(shards[i].fileName != ''){
			await loadShardFile(shards[i], sourceId);
		}
		
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

	//console.log('done loading shards');
}

function clearShardlist(){
	let shardlist = document.getElementById('sharding-listcard-inner');

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
	loadNodeAtShardlistTop,
	loadShardsIntoShardlist,
	deleteShardcard
}
/* 
import * as listcard from '../listcard/Listcard.js';

listcard.getFirstSourcecardId();
listcard.getLastSourcecardId();

*/


