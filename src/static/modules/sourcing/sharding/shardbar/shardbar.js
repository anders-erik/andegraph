

import * as Sourcecard from '../shardlist/shardcard/shardcard.js';

import * as api from '../../../Fetches/api/api.js';

import * as PropertiesCard from '../../sourceview/propertiescard/PropertiesCard.js';

import * as listcard from '../shardlist/shardlist.js';

import * as models from '../../../models/models.js';

import * as shardlist from '../shardlist/shardlist.js';

import * as shardbarComponents from './shardbar_components.js';


function createShardbar(){

	let shardbar = document.createElement('div');
	shardbar.id = 'sharding-shardbar';
	shardbar.classList.add('card', 'sharding-shardbar');
	// shardbar.innerHTML = `
	// 	<button id='sharding-add' >
	// 		add shard
	// 	</button>
	// `;
	
	//sourcefindSearchcard.textContent = 'cardcard';


	// let sourcefindSearchbar = Elements.getSosInput('sourcefind-searchbar', 'Source Search', 'type to search for source');
	// sourcefindSearchbar.style.gridColumn = '1 / span 4'
	// sourcefindSearchcard.appendChild(sourcefindSearchbar);


	// ADD SHARD
	shardbar.appendChild(newAddShardButton());
	shardbar.appendChild(newNodeInfoDropdown());

	

	// DELETE
	// let shardbarDelete = document.createElement('button');
	// shardbarDelete.id = 'shardbar-delete';
	// shardbarDelete.textContent = 'Delete';
	// shardbarDelete.addEventListener('click', deleteShardClicked);
	// shardbar.appendChild(shardbarDelete);

	
	

	return shardbar;
}


function newAddShardButton(){
	
	let shardbarAdd = document.createElement('button');
	shardbarAdd.id = 'sharding-add';
	shardbarAdd.textContent = 'Add Shard';
	shardbarAdd.addEventListener('click', addShardClicked);
	return shardbarAdd
}

function newNodeInfoDropdown(){
	let newNodeInfoDropdown = document.createElement('div');
	newNodeInfoDropdown.id = 'node-info-dropdown';
	newNodeInfoDropdown.textContent = 'Node object';

	newNodeInfoDropdown.addEventListener('click', displayNodeInfoDropdown);

	return newNodeInfoDropdown;

}

function displayNodeInfoDropdown(event){
	console.log('display')
}

function updateNodeInfoDropdown(nodeObject){
	//console.log('update shardbar info dropdown with : ', nodeObject);
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

	createNewSourceChild('shard');

	




	//console.log('new shard fetched')

	//console.log('new shard added the shardlist')
}


async function createNewSourceChild(newNodeType){

	let sourceid = PropertiesCard.extractCurrentSourceId();

	//Sourcecard.highlightSourceCard('sourcefind-sourcecard-' + newSourceResponse.id);
	let newNodeObject;
	if(newNodeType === 'shard'){
		newNodeObject = models.generateNewShard();
	}
	//let newShard = models.generateNewShard();

	await api.postNode(newNodeObject, 1, PropertiesCard.extractCurrentSourceId());
	console.log('new shard posted')

	//PropertiesCard.loadSource(sourceid);
	shardlist.loadShardsIntoShardlist(sourceid);

}











export {
	createShardbar,
	updateNodeInfoDropdown,
	
	
}