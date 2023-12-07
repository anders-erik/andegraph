//import { fetchAllSources, getSource, newSource, updateSource, deleteSource } from "./Fetches.js";
//import { /* addSourceListItem, */ createSourcefindSourcecard } from './Cards.js';
//import { loadSource,removeSourcefindCard, clearSourceviewPropertiescard } from "./UpdateDOM.js";
//import { extractCurrentSourceObject, extractCurrentSourceId } from './ExtractDOM.js';

import * as Fetches from './Fetches.js';
import * as Cards from './Cards.js';
import * as UpdateDOM from './UpdateDOM.js';
import * as ExtractDOM from './ExtractDOM.js';
//import { updateItem } from '../../persistence/sqlite.js';





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
	let newSourceResponse = await Fetches.newSource();
	console.log("asdf:::");
	console.log(newSourceResponse);
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
	//console.log("File load pressed");
	let currentSourceId = ExtractDOM.extractCurrentSourceId();

	//console.log(typeof(+document.getElementById('sourceview-hasfile-field').value));

	if(currentSourceId == ''){
		console.log('no source selected')
	}
	else if (+document.getElementById('sourceview-hasfile-field').value != 1) { //sourceview-hasfile-field
		// check if source has a file to load. If not we don't do anything
		console.log('There is no file associated with this source.')
	}
	else{
		let fetchedBlob = await Fetches.loadSourceFile(ExtractDOM.extractCurrentSourceId());
		// console.log('fetched blob:');
		// console.log(fetchedBlob);
		// console.log('Size : ' + fetchedBlob.slice(1, 100).text().then((obj) => {console.log(obj)}));
		// console.log();
	
		let fileUrl = URL.createObjectURL(fetchedBlob);
		// console.log('file Url:');
		// console.log(fileUrl);
	
		//let viewcard = document.getElementById('sourceview-viewcard');

//sourceview-filetype-field

		//viewcard.style.backgroundImage = 'url(' + fileUrl  + ')';	
		UpdateDOM.displayNewSourceFile(ExtractDOM.extractCurrentSourceFileType(), fileUrl);
	}

	
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

