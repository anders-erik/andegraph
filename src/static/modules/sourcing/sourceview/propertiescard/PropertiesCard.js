
import * as Elements from '../../../Elements.js';
//import * as Fetches from '../../Fetches/BaseFetches.js'
//import * as UpdateDOM from '../../UpdateDOM.js';
//import * as ExtractDOM from '../../ExtractDOM.js';

// PropertiesCard - children
import { extractCurrentSourceObject, extractCurrentSourceId, extractCurrentSourceFileType, hasFile } from './PropertiesCard_Extract.js';
import { sourceviewFieldFocusout, deleteSourceFromDatabase} from './PropertiesCard_Events.js';
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



	let deleteSourceButton = document.createElement('div');
	deleteSourceButton.id = 'delete-source-button';
	deleteSourceButton.classList.add('sourceview-element');
	deleteSourceButton.tabIndex = 0;
	deleteSourceButton.textContent = 'Delete Source';
	deleteSourceButton.addEventListener('click', deleteSourceFromDatabase)
	sourceviewPropertiescardInner.appendChild(deleteSourceButton);
	


	// let sourceviewReviewDates = Elements.getDateViewer('sourceview-reviewdates');
	// sourceviewReviewDates.classList.add('sourceview-element');
	let sourceviewReviewDates = addReviewDatesElement();
	sourceviewPropertiescardInner.appendChild(sourceviewReviewDates);



	return sourceviewPropertiescardOuter;
}






export {
	createSourceviewPropertiescard,
	// sourceviewFieldFocusout,
	// uploadSourceFilePressed,
	// loadSourceFilePressed,
	extractCurrentSourceObject,
	extractCurrentSourceId,
	extractCurrentSourceFileType,
	hasFile,

	loadSource,
	clearSourceviewPropertiescard,
	saveCurrentSource
}