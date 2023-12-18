
import * as Elements from '../../../Elements.js';
//import * as Fetches from '../../Fetches/BaseFetches.js'
//import * as UpdateDOM from '../../UpdateDOM.js';
//import * as ExtractDOM from '../../ExtractDOM.js';

// PropertiesCard - children
import { extractCurrentSourceObject, extractCurrentSourceId, extractCurrentSourceFileType } from './PropertiesCard_Extract.js';
import { sourceviewFieldFocusout, uploadSourceFilePressed, loadSourceFilePressed } from './PropertiesCard_Events.js';
import { loadSource, clearSourceviewPropertiescard, saveCurrentSource } from './PropertiesCard_Update.js';
import { addReviewDatesElement } from './PropertiesCard_reviewdates.js';


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


	let sourceviewButtonCard = getSourceviewButtonCard();
	sourceviewButtonCard.id = 'sourceview-button-card';
	//sourceviewButtonCard.addEventListener('click', deleteSourceClicked);
	sourceviewPropertiescardInner.appendChild(sourceviewButtonCard);

	

	// let sourceviewReviewDates = Elements.getDateViewer('sourceview-reviewdates');
	// sourceviewReviewDates.classList.add('sourceview-element');
	let sourceviewReviewDates = addReviewDatesElement();
	sourceviewPropertiescardInner.appendChild(sourceviewReviewDates);



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
	saveCurrentSource
}