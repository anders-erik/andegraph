import { extractCurrentSourceObject, extractCurrentSourceId, extractCurrentSourceFileType } from './PropertiesCard_Extract.js';
import { reviewDateClicked, loadReviewDates } from './PropertiesCard_reviewdates.js';

import * as viewcard from '../viewcard/Viewcard.js';

// import * as Fetches from '../../../Fetches/BaseFetches.js';
// import * as Fetchess from '../../../Fetches/BaseFetches.js';
// import { patchSource } from '../../../Fetches/api/source/PatchSource.js';
// import { getSource } from '../../../Fetches/api/source/GetSource.js';
import * as api from '../../../Fetches/api/api.js';


import * as Sourcecard from '../../sourcefind/listcard/sourcecard/Sourcecard.js';




async function loadSource(sourceId) {
	//console.log('loading source');
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

	// Display file
	viewcard.displaySourceFile();

}




function clearSourceviewPropertiescard(){

	let sourceId = document.getElementById('sourceview-id-field');
	
	document.getElementById('sourceview-title-field').value = '';
	document.getElementById('sourceview-url-field').value = '';
	document.getElementById('sourceview-id-field').value = '';
	document.getElementById('sourceview-datecreated-field').value = '';
	document.getElementById('sourceview-hasfile-field').value = '';
	document.getElementById('sourceview-filetype-field').value = '';
	document.getElementById('sourceview-fileending-field').value = '';

	//document.getElementById('sourceview-viewcard').innerHTML = '';
	//viewcard.removeCurrentFileFromDOM();

	//console.log(`Source with id ${sourceId} removed from properties card.`);

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