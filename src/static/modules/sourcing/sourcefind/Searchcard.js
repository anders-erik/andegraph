

import * as Elements from '../../Elements.js';
import * as Sourcecard from './Sourcecard.js';
import * as Fetches from '../../Fetches/BaseFetches.js'

//import * as UpdateDOM from '../../UpdateDOM.js';
//import * as UpdateDOM from '../../UpdateDOM.js';
//import * as Sourcecard from './Sourcecard.js';
//import * as ExtractDOM from '../../ExtractDOM.js';
import * as PropertiesCard from '../sourceview/PropertiesCard.js';


function createSourcefindSearchcard(){
	let sourcefindSearchcard = document.createElement('div');
	sourcefindSearchcard.id = 'sourcefind-searchcard';
	sourcefindSearchcard.classList.add('card', 'sourcefind-searchcard');
	//sourcefindSearchcard.textContent = 'cardcard';

	let sourcefindSearchbar = Elements.getSosInput('sourcefind-searchbar', 'Source Search', 'type to search for source');
	sourcefindSearchbar.style.gridColumn = '1 / span 4'
	sourcefindSearchcard.appendChild(sourcefindSearchbar);

	let sourcefindFetch = Elements.getSosButton('sourcefind-fetch');
	sourcefindFetch.addEventListener('click', fetchSourcesClicked);
	sourcefindSearchcard.appendChild(sourcefindFetch);

	let sourcefindAdd = Elements.getSosButton('sourcefind-add');
	sourcefindAdd.addEventListener('click', addSourceClicked);
	sourcefindSearchcard.appendChild(sourcefindAdd);

	let sourcefindDelete = Elements.getSosButton('sourcefind-delete');
	sourcefindDelete.addEventListener('click', deleteSourceClicked);
	sourcefindSearchcard.appendChild(sourcefindDelete);
	

	return sourcefindSearchcard;
}


/* 
EVENTS

*/

// let sourceCardClicked = async function(e){
// 	let clickedElementId = e.target.id;
// 	let sourceId = clickedElementId.match(/\d+$/g)
// 	console.log('source clicked: ' + sourceId );

// 	let fetchedSource = await Fetches.getSource(sourceId);
// 	console.log(fetchedSource);

// 	PropertiesCard.loadSource(fetchedSource);

// 	Sourcecard.unhighlightAllSourceCards();
// 	Sourcecard.highlightSourceCard(clickedElementId);
// }

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
		sourcefindListcard.appendChild(Sourcecard.createSourcefindSourcecard(fetchedSource));
	});
}

let addSourceClicked = async function(e){
	console.log('create new source');
	let newSourceResponse = await Fetches.newSource();
	console.log("asdf:::");
	console.log(newSourceResponse);

	// simulate clicking on fetch button
	fetchSourcesClicked();

	
}

let deleteSourceClicked = async function(e){
	
	//newSource();
	//fetchSourcesClicked();
	if (confirm("Really delete?!") == true) {
		
		console.log('deleting source: ' + PropertiesCard.extractCurrentSourceId());

		Fetches.deleteSource(PropertiesCard.extractCurrentSourceId());

		Sourcecard.removeSourcefindCard(PropertiesCard.extractCurrentSourceId());

		PropertiesCard.clearSourceviewPropertiescard();
	} 
	else {
		console.log('nothing deleted')
	}

}










export {
	createSourcefindSearchcard,
	fetchSourcesClicked,

	
	
}