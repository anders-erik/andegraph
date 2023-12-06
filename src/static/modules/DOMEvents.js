//import { fetchAllSources, getSource, newSource, updateSource, deleteSource } from "./Fetches.js";
//import { /* addSourceListItem, */ createSourcefindSourcecard } from './Cards.js';
//import { loadSource,removeSourcefindCard, clearSourceviewPropertiescard } from "./UpdateDOM.js";
//import { extractCurrentSourceObject, extractCurrentSourceId } from './ExtractDOM.js';

import * as Fetches from './Fetches.js';
import * as Cards from './Cards.js';
import * as UpdateDOM from './UpdateDOM.js';
import * as ExtractDOM from './ExtractDOM.js';
//import { updateItem } from '../../persistence/sqlite.js';

/*
async function populateSourceList() {
	try {
		let fetchedSources = await fetchAllSources();
		let sourceList = document.getElementById('source-list');
		sourceList.innerHTML = '';
		fetchedSources.forEach(source => {
			addSourceListItem(source.id);
		});

	} catch (error) {
		console.trace();
	}


}

async function addNewSource(){
	console.log('adding new source');
	newSource();
	populateSourceList();
}

async function loadSourceViewerHeader(e){
	
	
	let fetchedSource = await getSource(e.target.textContent);
	
	let sourceViewerHeader = document.getElementById('source-viewer-header');
	
	sourceViewerHeader.textContent = '';
	sourceViewerHeader.textContent = fetchedSource.id;
	sourceViewerHeader.textContent = fetchedSource.id + ' ' + fetchedSource.name;

}
*/



/* NEW 2023-12-03  */


let fetchSourcesClicked = async function(e){
	console.log('fetch');
	let sourcefindSearchcard = document.getElementById('sourcefind-searchcard');

	let sourcefindListcard = document.getElementById('sourcefind-listcard');
	sourcefindListcard.innerHTML = '';
	//sourcefindListcard.innerHTML = '';

	let allFetchedSources = await Fetches.fetchAllSources();
	//console.log(allFetchedSources);
	
	allFetchedSources.forEach(fetchedSource => {
		//console.log(fetchedSource);
		sourcefindListcard.appendChild(Cards.createSourcefindSourcecard(fetchedSource));
	});
}


let addSourceClicked = async function(e){
	console.log('create new source');
	Fetches.newSource();
	fetchSourcesClicked();
}

let deleteSourceClicked = async function(e){
	
	//newSource();
	//fetchSourcesClicked();
	if (confirm("Really delete?!") == true) {
		
		console.log('deleting source: ' + ExtractDOM.extractCurrentSourceId());

		Fetches.deleteSource(ExtractDOM.extractCurrentSourceId());

		UpdateDOM.removeSourcefindCard(ExtractDOM.extractCurrentSourceId());

		UpdateDOM.clearSourceviewPropertiescard();
	} 
	else {
		console.log('nothing deleted')
	}

}


let sourceCardClicked = async function(e){
	let clickedElementId = e.target.id;
	let sourceId = clickedElementId.match(/\d+$/g)
	console.log('source clicked: ' + sourceId );

	let fetchedSource = await Fetches.getSource(sourceId);
	console.log(fetchedSource);

	UpdateDOM.loadSource(fetchedSource);

	UpdateDOM.unhighlightAllSourceCards();
	UpdateDOM.highlightSourceCard(clickedElementId);
}


async function uploadSourceFilePressed(e){
	console.log("File selected: ", e.target.files[0]);
	Fetches.uploadSourceFile(ExtractDOM.extractCurrentSourceId(), e.target.files[0]);
}

async function loadSourceFilePressed(e){
	console.log("File load pressed");

	let fetchedBlob = await Fetches.loadSourceFile(ExtractDOM.extractCurrentSourceId());
	console.log('fetched blob:');
	console.log(fetchedBlob);

	let fileUrl = URL.createObjectURL(fetchedBlob);
	console.log('file Url:');
	console.log(fileUrl);

	let viewcard = document.getElementById('sourceview-viewcard');
	viewcard.style.backgroundImage = 'url(' + fileUrl  + ')';	
	
}

let sourceviewFieldFocusout = async function(e){
	/* 
	console.log('lost focus');
	let object = 
		{
		"id": "12",
		"name": "a",
		"url": "a.org",
		"date": "2023-12-03",
		"completed": "false"
		}
	;
	let objectString = JSON.stringify(object);
 	*/

	let currentSourceObject = ExtractDOM.extractCurrentSourceObject();
	
	//console.log(JSON.stringify(currentSourceObject));
	//console.log(objectString);

	Fetches.updateSource(JSON.stringify(currentSourceObject));

	UpdateDOM.updateSourcefindCard(currentSourceObject.id);

}




export {
	// populateSourceList,
	// addNewSource,
	// loadSourceViewerHeader,

	fetchSourcesClicked,
	addSourceClicked,
	deleteSourceClicked,
	sourceCardClicked,
	uploadSourceFilePressed,
	loadSourceFilePressed,
	sourceviewFieldFocusout
	
}

