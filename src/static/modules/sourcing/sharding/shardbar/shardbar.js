

import * as Sourcecard from '../shardlist/shardcard/shardcard.js';

import * as api from '../../../Fetches/api/api.js';

import * as PropertiesCard from '../../sourceview/propertiescard/PropertiesCard.js';

import * as listcard from '../shardlist/shardlist.js';



function createShardbar(){

	let shardbar = document.createElement('div');
	shardbar.id = 'sharding-shardbar';
	shardbar.classList.add('card', 'sharding-shardbar');
	//sourcefindSearchcard.textContent = 'cardcard';


	// let sourcefindSearchbar = Elements.getSosInput('sourcefind-searchbar', 'Source Search', 'type to search for source');
	// sourcefindSearchbar.style.gridColumn = '1 / span 4'
	// sourcefindSearchcard.appendChild(sourcefindSearchbar);


	//let sourcefindFetch = Elements.getSosButton('sourcefind-fetch');
	let shardbarAdd = document.createElement('button');
	shardbarAdd.id = 'sharding-add';
	shardbarAdd.textContent = 'Add';
	shardbarAdd.addEventListener('click', addShardClicked);
	shardbar.appendChild(shardbarAdd);

	//let sourcefindAdd = Elements.getSosButton('sourcefind-add');
	let shardbarDelete = document.createElement('button');
	shardbarDelete.id = 'shardbar-delete';
	shardbarDelete.textContent = 'Delete';
	shardbarDelete.addEventListener('click', deleteShardClicked);
	shardbar.appendChild(shardbarDelete);

	
	

	return shardbar;
}


/* 
EVENTS

*/



let deleteShardClicked = async function(e){
	console.log('delete shard!');
	//let newSourceResponse = await Fetches.newSource();
	//let newSourceResponse = await api.postSource();
	
	//await PropertiesCard.loadSource(newSourceResponse.id);


	// simulate clicking on fetch button
	//await fetchSourcesClicked();


	//Sourcecard.highlightSourceCard('sourcefind-sourcecard-' + newSourceResponse.id);
	
}


let addShardClicked = async function(e){

	console.log('new shard clicked!');
	//let newSourceResponse = await Fetches.newSource();
	//let newSourceResponse = await api.postSource();
	
	//await PropertiesCard.loadSource(newSourceResponse.id);


	// simulate clicking on fetch button
	//await fetchSourcesClicked();


	//Sourcecard.highlightSourceCard('sourcefind-sourcecard-' + newSourceResponse.id);
	
	console.log('new shard posted')

	console.log('new shard fetched')

	console.log('new shard added the shardlist')
}












export {
	createShardbar,

	
	
}