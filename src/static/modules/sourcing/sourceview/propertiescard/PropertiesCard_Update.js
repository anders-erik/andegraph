import { extractCurrentSourceObject, extractCurrentSourceId, extractCurrentSourceFileType } from './PropertiesCard_Extract.js';
import { reviewDateClicked, loadReviewDates } from './PropertiesCard_reviewdates.js';

// import * as Fetches from '../../../Fetches/BaseFetches.js';
// import * as Fetchess from '../../../Fetches/BaseFetches.js';
// import { patchSource } from '../../../Fetches/api/source/PatchSource.js';
// import { getSource } from '../../../Fetches/api/source/GetSource.js';
import * as api from '../../../Fetches/api/api.js';


import * as Sourcecard from '../../sourcefind/listcard/sourcecard/Sourcecard.js';




async function loadSource(sourceId) {
	console.log('loading source');
	//console.log(fetchedSource);

	let fetchedSource = await api.getSource(sourceId);

	let sourceviewPropertiescardInner = document.getElementById('sourceview-propertiescard-outer');
	
	let sourceviewName = document.getElementById('sourceview-title-field');
	sourceviewName.value = fetchedSource.title;
	

	let sourceviewUrl = document.getElementById('sourceview-url-field');
	sourceviewUrl.value = fetchedSource.url;


	let sourceviewId = document.getElementById('sourceview-id-field');
	sourceviewId.value = fetchedSource.id;
	
	let sourceviewDate = document.getElementById('sourceview-datecreated-field');
	sourceviewDate.value = fetchedSource.dateCreated;
	
	let sourceviewHasFile = document.getElementById('sourceview-hasfile-field');
	sourceviewHasFile.value = fetchedSource.hasFile;

	let sourceviewFileType = document.getElementById('sourceview-filetype-field');
	sourceviewFileType.value = fetchedSource.fileType;

	let sourceviewFileEnding = document.getElementById('sourceview-fileending-field');
	sourceviewFileEnding.value = fetchedSource.fileEnding;

	// review dates
	loadReviewDates(sourceId);
	//let sourceviewReviewDates = document.getElementById('sourceview-reviewdates');

	// let sourceviewReviewDates = document.getElementById('sourceview-dates-list');
	// sourceviewReviewDates.innerHTML = '';
	// fetchedSource.sourceReviewDates.forEach(reviewDate => {
	// 	//console.log(reviewDate.date);
	// 	let reviewDateLabel = document.createElement('label');
	// 	if(reviewDate.completed){
	// 		reviewDateLabel.classList.add('sourceview-dates-list-labels-done');

	// 	}else {
	// 		reviewDateLabel.classList.add('sourceview-dates-list-labels');
	// 	}
	// 	reviewDateLabel.addEventListener('click', reviewDateClicked);
	// 	reviewDateLabel.textContent = reviewDate.date;
	// 	sourceviewReviewDates.appendChild(reviewDateLabel);
	// });


	// For now we simply want to guarantee no lingering source files
	document.getElementById('sourceview-viewcard').innerHTML = '';

	// Load file for currrent source
	document.getElementById('sourceview-load').click();

	//let currentSource = extractCurrentSourceObject();
	//displayNewSourceFile(currentSource.)
}




function clearSourceviewPropertiescard(){
	console.log('clear');
	document.getElementById('sourceview-title-field').value = '';
	document.getElementById('sourceview-url-field').value = '';
	document.getElementById('sourceview-id-field').value = '';
	document.getElementById('sourceview-datecreated-field').value = '';
	document.getElementById('sourceview-hasfile-field').value = '';
	document.getElementById('sourceview-filetype-field').value = '';
	document.getElementById('sourceview-fileending-field').value = '';

	document.getElementById('sourceview-viewcard').innerHTML = '';
}



function saveCurrentSource(){
	let currentSourceObject = extractCurrentSourceObject();
	
	//console.log(JSON.stringify(currentSourceObject));
	//console.log(objectString);

	//Fetches.updateSource(JSON.stringify(currentSourceObject));
	api.patchSource(JSON.stringify(currentSourceObject));

	Sourcecard.updateSourcefindCard(currentSourceObject.id);
}


export {
	loadSource,
	clearSourceviewPropertiescard,
	saveCurrentSource
}