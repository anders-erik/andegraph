
import * as Elements from '../../../Elements.js';
//import * as Fetches from '../../Fetches/BaseFetches.js'
//import * as UpdateDOM from '../../UpdateDOM.js';
//import * as ExtractDOM from '../../ExtractDOM.js';

// PropertiesCard - children
import { extractCurrentSourceObject, extractCurrentSourceId,extractCurrentSourceFileName, extractCurrentSourceFileType, hasFile } from './PropertiesCard_Extract.js';
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

	let sourceviewFileName = Elements.getSosDisabledInput('sourceview-filename', 'File Name:', '');
	sourceviewFileName.classList.add('sourceview-element');
	sourceviewPropertiescardInner.appendChild(sourceviewFileName);

	let sourceviewElementType = Elements.getSosDisabledInput('sourceview-elementtype', 'elementType:', '');
	sourceviewElementType.classList.add('sourceview-element');
	sourceviewPropertiescardInner.appendChild(sourceviewElementType);

	let sourceviewFileExtension = Elements.getSosDisabledInput('sourceview-fileextension', 'File Extension:', '');
	sourceviewFileExtension.classList.add('sourceview-element');
	sourceviewPropertiescardInner.appendChild(sourceviewFileExtension);

	let sourceviewTextContent = Elements.getSosDisabledInput('sourceview-textcontent', 'Text cont.', '');
	sourceviewTextContent.classList.add('sourceview-element');
	sourceviewPropertiescardInner.appendChild(sourceviewTextContent);

	let sourceviewNodeType = Elements.getSosDisabledInput('sourceview-nodetype', 'Node Type:', '');
	sourceviewNodeType.classList.add('sourceview-element');
	sourceviewPropertiescardInner.appendChild(sourceviewNodeType);

	let sourceviewNodeTypeType = Elements.getSosDisabledInput('sourceview-nodetypetype', 'Node TypeType:', '');
	sourceviewNodeTypeType.classList.add('sourceview-element');
	sourceviewPropertiescardInner.appendChild(sourceviewNodeTypeType);



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
	extractCurrentSourceFileName,
	extractCurrentSourceFileType,
	hasFile,

	loadSource,
	clearSourceviewPropertiescard,
	saveCurrentSource
}