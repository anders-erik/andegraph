
import * as Elements from '../../Elements.js';
//import * as Fetches from '../../Fetches/BaseFetches.js'
//import * as UpdateDOM from '../../UpdateDOM.js';
//import * as ExtractDOM from '../../ExtractDOM.js';

// PropertiesCard - children
import { extractCurrentSourceObject, extractCurrentSourceId, extractCurrentSourceFileType } from './PropertiesCard_Extract.js';
import { sourceviewFieldFocusout, uploadSourceFilePressed, loadSourceFilePressed } from './PropertiesCard_Events.js';
import { loadSource, clearSourceviewPropertiescard, displayNewSourceFile, saveCurrentSource } from './PropertiesCard_Update.js';



function createSourceviewPropertiescard() {
	// outer and inner div to enable collapsing by user
	let sourceviewPropertiescardOuter = document.createElement('div');
	sourceviewPropertiescardOuter.id = 'sourceview-propertiescard-outer';
	sourceviewPropertiescardOuter.classList.add('card');
	//sourceviewPropertiescardOuter.textContent = 'sourceview-propertiescard-outer';

	let sourceviewPropertiescardInner = document.createElement('div');
	sourceviewPropertiescardInner.id = 'sourceview-propertiescard-inner';
	sourceviewPropertiescardInner.classList.add('card');
	//sourceviewPropertiescardInner.textContent = 'sourceview-propertiescard-inner';

	sourceviewPropertiescardOuter.appendChild(sourceviewPropertiescardInner);

	let sourceviewName = Elements.getSosInput('sourceview-title', 'Title', '');
	sourceviewName.classList.add('sourceview-element');
	sourceviewName.addEventListener('focusout', sourceviewFieldFocusout);
	sourceviewPropertiescardInner.appendChild(sourceviewName);

	let sourceviewUrl = Elements.getSosInput('sourceview-url', 'URL', '');
	sourceviewUrl.classList.add('sourceview-element');
	sourceviewUrl.addEventListener('focusout', sourceviewFieldFocusout);
	sourceviewPropertiescardInner.appendChild(sourceviewUrl);

	let sourceviewId = Elements.getSosDisabledInput('sourceview-id', 'ID', '');
	sourceviewId.classList.add('sourceview-element');
	sourceviewPropertiescardInner.appendChild(sourceviewId);

	let sourceviewDate = Elements.getSosDisabledInput('sourceview-datecreated', 'Date Created:', '');
	sourceviewDate.classList.add('sourceview-element');
	sourceviewPropertiescardInner.appendChild(sourceviewDate);

	let sourceviewHasFile = Elements.getSosDisabledInput('sourceview-hasfile', 'Has File:', '');
	sourceviewHasFile.classList.add('sourceview-element');
	sourceviewPropertiescardInner.appendChild(sourceviewHasFile);

	let sourceviewFileType = Elements.getSosDisabledInput('sourceview-filetype', 'File Type:', '');
	sourceviewFileType.classList.add('sourceview-element');
	sourceviewPropertiescardInner.appendChild(sourceviewFileType);

	let sourceviewFileEnding = Elements.getSosDisabledInput('sourceview-fileending', 'File Ending:', '');
	sourceviewFileEnding.classList.add('sourceview-element');
	sourceviewPropertiescardInner.appendChild(sourceviewFileEnding);

	let sourceviewReviewDates = Elements.getDateViewer('sourceview-reviewdates');
	sourceviewReviewDates.classList.add('sourceview-element');
	sourceviewPropertiescardInner.appendChild(sourceviewReviewDates);

	let sourceviewButtonCard = getSourceviewButtonCard();
	sourceviewButtonCard.id = 'sourceview-button-card';
	//sourceviewButtonCard.addEventListener('click', deleteSourceClicked);
	sourceviewPropertiescardInner.appendChild(sourceviewButtonCard);





	return sourceviewPropertiescardOuter;
}


/* PRIVATE */
function getSourceviewButtonCard(){
	let buttonCard = document.createElement('div');
	//buttonCard.classList.add('button-card');

	let sourceviewLoad = Elements.getSosButton('load');
	sourceviewLoad.id = 'sourceview-load';
	sourceviewLoad.addEventListener('click', loadSourceFilePressed);
	buttonCard.appendChild(sourceviewLoad);


	// Set costum label for file selector
	// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
	let sourceviewUpload = document.createElement('input');
	sourceviewUpload.id = 'sourceview-upload';
	sourceviewUpload.type = 'file';
	sourceviewUpload.addEventListener('change', uploadSourceFilePressed);
	let sourceviewUploadLabel = document.createElement('label');
	sourceviewUploadLabel.id = 'sourceview-upload-label';
	// https://stackoverflow.com/questions/15750290/setting-the-html-label-for-attribute-in-javascript
	sourceviewUploadLabel.htmlFor = 'sourceview-upload';
	sourceviewUploadLabel.textContent = 'upload';
	
	buttonCard.appendChild(sourceviewUpload);
	buttonCard.appendChild(sourceviewUploadLabel);

	

	return buttonCard;
}



// let sourceviewFieldFocusout = async function(e){
// 	/* 
// 	console.log('lost focus');
// 	let object = 
// 		{
// 		"id": "12",
// 		"name": "a",
// 		"url": "a.org",
// 		"date": "2023-12-03",
// 		"completed": "false"
// 		}
// 	;
// 	let objectString = JSON.stringify(object);
//  	*/

// 	UpdateDOM.saveCurrentSource();


// 	// let currentSourceObject = ExtractDOM.extractCurrentSourceObject();
	
// 	// //console.log(JSON.stringify(currentSourceObject));
// 	// //console.log(objectString);

// 	// Fetches.updateSource(JSON.stringify(currentSourceObject));

// 	// UpdateDOM.updateSourcefindCard(currentSourceObject.id);

// }


// async function uploadSourceFilePressed(e){
// 	console.log("File selected: ", e.target.files[0]);
	
// 	Fetches.uploadSourceFile(extractCurrentSourceId(), e.target.files[0]);

// 	document.getElementById('sourceview-fileending-field').value = 'ending';
// 	document.getElementById('sourceview-filetype-field').value = 'type';

// 	//UpdateDOM.saveCurrentSource();
// 	//UpdateDOM.loadSource();

// }


// async function loadSourceFilePressed(e){
// 	//console.log("File load pressed");
// 	let currentSourceId = extractCurrentSourceId();

// 	//console.log(typeof(+document.getElementById('sourceview-hasfile-field').value));

// 	if(currentSourceId == ''){
// 		console.log('no source selected')
// 	}
// 	else if (+document.getElementById('sourceview-hasfile-field').value != 1) { //sourceview-hasfile-field
// 		// check if source has a file to load. If not we don't do anything
// 		console.log('There is no file associated with this source.')
// 	}
// 	else{
// 		let fetchedBlob = await Fetches.loadSourceFile(extractCurrentSourceId());
// 		// console.log('fetched blob:');
// 		// console.log(fetchedBlob);
// 		// console.log('Size : ' + fetchedBlob.slice(1, 100).text().then((obj) => {console.log(obj)}));
// 		// console.log();
	
// 		let fileUrl = URL.createObjectURL(fetchedBlob);
// 		// console.log('file Url:');
// 		// console.log(fileUrl);
	
// 		//let viewcard = document.getElementById('sourceview-viewcard');

// //sourceview-filetype-field

// 		//viewcard.style.backgroundImage = 'url(' + fileUrl  + ')';	
// 		UpdateDOM.displayNewSourceFile(extractCurrentSourceFileType(), fileUrl);
// 	}

	
// }






/* 
FROM EXTRACT-DOM BELOW
*/

// function extractCurrentSourceObject(){
// 	let currentSource = {};

// 	currentSource.title = document.getElementById('sourceview-title-field').value;
// 	currentSource.url = document.getElementById('sourceview-url-field').value;
// 	currentSource.id = document.getElementById('sourceview-id-field').value;
// 	currentSource.dateCreated = document.getElementById('sourceview-datecreated-field').value;
// 	currentSource.hasFile = document.getElementById('sourceview-hasfile-field').value;
// 	currentSource.fileType = document.getElementById('sourceview-filetype-field').value;
// 	currentSource.fileEnding = document.getElementById('sourceview-fileending-field').value;
	
	
// 	//console.log('extracting source: ' + currentSource.id);
// 	return currentSource;
// }

// function extractCurrentSourceId(){
// 	return document.getElementById('sourceview-id-field').value;
// }

// function extractCurrentSourceFileType(){
// 	return document.getElementById('sourceview-filetype-field').value;
// }



export {
	createSourceviewPropertiescard,
	// sourceviewFieldFocusout,
	// uploadSourceFilePressed,
	// loadSourceFilePressed,
	extractCurrentSourceObject,
	extractCurrentSourceId,
	extractCurrentSourceFileType,

	loadSource,
	clearSourceviewPropertiescard,
	displayNewSourceFile,
	saveCurrentSource
}