

import * as Elements from '../../../Elements.js';
import * as Sourcecard from '../listcard/sourcecard/Sourcecard.js';
//import * as Fetches from '../../../Fetches/BaseFetches.js'

import * as api from '../../../Fetches/api/api.js';

import * as models from '../../../models/models.js';
// import { postSource } from '../../../Fetches/api/source/PostSource.js';
// import { deleteSource } from '../../../Fetches/api/source/DeleteSource.js';
// import { getSourceSearch } from '../../../Fetches/api/source/search/GetSourceSearch.js';

//import * as UpdateDOM from '../../UpdateDOM.js';
//import * as UpdateDOM from '../../UpdateDOM.js';
//import * as Sourcecard from './Sourcecard.js';
//import * as ExtractDOM from '../../ExtractDOM.js';
import * as PropertiesCard from '../../sourceview/propertiescard/PropertiesCard.js';

import * as listcard from '../listcard/Listcard.js';

import * as searchcardComponents from './searchcard_components.js';


function createSourcefindSearchcard(){

	let sourcefindSearchcard = document.createElement('div');
	sourcefindSearchcard.id = 'sourcefind-searchcard';
	sourcefindSearchcard.classList.add('card', 'sourcefind-searchcard');
	//sourcefindSearchcard.textContent = 'cardcard';


	// let sourcefindSearchbar = Elements.getSosInput('sourcefind-searchbar', 'Source Search', 'type to search for source');
	// sourcefindSearchbar.style.gridColumn = '1 / span 4'
	// sourcefindSearchcard.appendChild(sourcefindSearchbar);

	
	let sourcefindSearchbar = searchcardComponents.newSourcefindSearchbar();
	//sourcefindSearchbar.style.gridColumn = '1 / span 4'
	sourcefindSearchcard.appendChild(sourcefindSearchbar);

	let sourcefindAscContainer = searchcardComponents.newSourcefindAsc();
	sourcefindSearchcard.appendChild(sourcefindAscContainer);

	let sourcefindReviewContainer = searchcardComponents.newSourcefindReview();
	sourcefindSearchcard.appendChild(sourcefindReviewContainer);

	let sourcefindTodayContainer = searchcardComponents.newSourcefindToday();
	sourcefindSearchcard.appendChild(sourcefindTodayContainer);

	let sourcefindDaterangeContainer = searchcardComponents.newSourcefindDaterangeContainer();
	sourcefindSearchcard.appendChild(sourcefindDaterangeContainer);


	//let sourcefindFetch = Elements.getSosButton('sourcefind-fetch');
	let sourcefindFetch = document.createElement('button');
	sourcefindFetch.id = 'sourcefind-fetch';
	sourcefindFetch.textContent = 'Search';
	sourcefindFetch.addEventListener('click', fetchSourcesClicked);
	sourcefindSearchcard.appendChild(sourcefindFetch);

	//let sourcefindAdd = Elements.getSosButton('sourcefind-add');
	let sourcefindAdd = document.createElement('button');
	sourcefindAdd.id = 'sourcefind-add';
	sourcefindAdd.textContent = 'Add';
	sourcefindAdd.addEventListener('click', addSourceClicked);
	sourcefindSearchcard.appendChild(sourcefindAdd);

	
	

	return sourcefindSearchcard;
}


/* 
EVENTS

*/



let addSourceClicked = async function(e){
	//console.log('create new source');
	//let newSourceResponse = await Fetches.newSource();

	let newSourceNode = models.generateNewSource();

	//console.log(newSourceNode)

	let postNodeResponse = await api.postNode(newSourceNode, 0, '');
	//let newSourceResponse = await api.postSource();	


	if(postNodeResponse.ok){
		//console.log('postpost goodgood');
		await PropertiesCard.loadSource(newSourceNode[0].id);

		// simulate clicking on fetch button
		await fetchSourcesClicked();

		Sourcecard.highlightSourceCard('sourcefind-sourcecard-' + newSourceNode[0].id);
	}
	else{
		console.log('Node POST failed!')
	}


	
	
	
}





let fetchSourcesClicked = async function(e){
	//console.log('fetch');
	let sourcefindSearchcard = document.getElementById('sourcefind-searchcard');

	let sourcefindListcard = document.getElementById('sourcefind-listcard');
	sourcefindListcard.innerHTML = '';
	//sourcefindListcard.innerHTML = '';

	// Search parameters
	let searchParameters = extractSearchParameters();
	//console.log(searchParameters);

	
	//
	//let allFetchedSources = await api.getSourceSearch(searchParameters);
	let allFetchedSources = await api.getNodeSearch(searchParameters);

	//console.log(allFetchedSources);
	
	allFetchedSources.forEach(fetchedSource => {
		//console.log(fetchedSource);
		sourcefindListcard.appendChild(Sourcecard.createSourcefindSourcecard(fetchedSource));
	});

	
}



function extractSearchParameters(){

	let parameters = {
		today: 0,
		dateinterval: 0,
		searchall: 1,
		fromdate: '2023-12-12',
		todate: '2023-12-19',
		asc: 0,
		review: 0,
		searchstring: '',
	}

	let reviewBox = document.getElementById('sourcefind-review-box');
	let todayBox = document.getElementById('sourcefind-today-box');
	let intervalBox = document.getElementById('sourcefind-daterange-box');
	let ascBox = document.getElementById('sourcefind-asc-box');

	parameters.review = reviewBox.checked ? 1 : 0;
	if(todayBox.checked){
		parameters.today = 1;
	}
	else if(intervalBox.checked){
		parameters.dateinterval = 1;
	}
	parameters.asc = ascBox.checked ? 1 : 0;



	parameters.fromdate = document.getElementById('sourcefind-startdate').value;
	parameters.todate = document.getElementById('sourcefind-enddate').value;
	parameters.searchstring = document.getElementById('sourcefind-searchbar').value;

	
	return parameters;
}








export {
	createSourcefindSearchcard,
	fetchSourcesClicked,

	
	
}