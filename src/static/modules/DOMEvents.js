import { fetchAllSources, getSource, newSource, updateSource, deleteSource } from "./Fetches.js";
import { /* addSourceListItem, */ createSourcefindSourcecard } from './Cards.js';
import { loadSource,removeSourcefindCard, clearSourceviewPropertiescard } from "./UpdateDOM.js";
import { extractCurrentSourceObject, extractCurrentSourceId } from './ExtractDOM.js';

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
	sourcefindListcard.innerHTML = 'sourcefind-listcard';
	//sourcefindListcard.innerHTML = '';

	let allFetchedSources = await fetchAllSources();
	//console.log(allFetchedSources);
	
	allFetchedSources.forEach(fetchedSource => {
		//console.log(fetchedSource);
		sourcefindListcard.appendChild(createSourcefindSourcecard(fetchedSource));
	});
}


let addSourceClicked = async function(e){
	console.log('create new source');
	newSource();
	fetchSourcesClicked();
}

let deleteSourceClicked = async function(e){
	
	//newSource();
	//fetchSourcesClicked();
	if (confirm("Really delete?!") == true) {
		
		console.log('deleting source: ' + extractCurrentSourceId());

	deleteSource(extractCurrentSourceId());

	removeSourcefindCard(extractCurrentSourceId());

	clearSourceviewPropertiescard();
	} 
	else {
		console.log('nothing deleted')
	}

}


let sourceCardClicked = async function(e){
	let clickedElementId = e.target.id;
	let sourceId = clickedElementId.match(/\d+$/g)
	console.log('source clicked: ' + sourceId );

	let fetchedSource = await getSource(sourceId);
	console.log(fetchedSource);

	loadSource(fetchedSource);
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

	let currentSourceObject = extractCurrentSourceObject();
	
	//console.log(JSON.stringify(currentSourceObject));
	//console.log(objectString);

	updateSource(JSON.stringify(currentSourceObject));
}


export {
	// populateSourceList,
	// addNewSource,
	// loadSourceViewerHeader,

	fetchSourcesClicked,
	addSourceClicked,
	deleteSourceClicked,
	sourceCardClicked,
	sourceviewFieldFocusout
}

