import { /* populateSourceList, loadSourceViewerHeader, addNewSource, */ fetchSourcesClicked, addSourceClicked, sourceCardClicked, sourceviewFieldFocusout, deleteSourceClicked } from "./DOMEvents.js";
import { /* createSourceViewerHeaderField, */ createInputElement, createButtonElement, createReadElement  } from "./Elements.js";

/* 
function addSourceListHeader() {
	let sourceListHeader = document.createElement('div');
	sourceListHeader.id = 'source-list-header';
	sourceListHeader.classList.add("sub-panel");
	
	//sourceListHeader.style.backgroundColor = 'purple';
	sourceListHeader.textContent = 'source-list-container';
	//sourceListHeader.style.margin = '10px';
	sourceListHeader.style.display = 'flex';
	sourceListHeader.style.flexDirection = 'column';

	let fetchButton = document.createElement('button');
	fetchButton.id = 'source-list-fetch-button';
	fetchButton.innerHTML = 'Fetch Sources';
	sourceListHeader.appendChild(fetchButton);
	fetchButton.addEventListener('click', populateSourceList);

	let addButton = document.createElement('button');
	addButton.id = 'source-list-add-button';
	addButton.innerHTML = 'Add source';
	sourceListHeader.appendChild(addButton);
	addButton.addEventListener('click', addNewSource);

	document.getElementById('source-list-container').appendChild(sourceListHeader);


}

function addSourceList() {
	let sourceList = document.createElement('div');
	sourceList.id = 'source-list';
	sourceList.classList.add("sub-panel");

	//sourceList.style.backgroundColor = 'aqua';
	//sourceList.textContent = 'sl';
	//sourceList.style.margin = '10px';
	sourceList.style.flexGrow = '1';

	document.getElementById('source-list-container').appendChild(sourceList);


}

function addSourceListItem(sourceId) {
	let sourceListItem = document.createElement('div');
	sourceListItem.id = 'source-list-item';
	sourceListItem.style.backgroundColor = 'orange';
	sourceListItem.textContent = sourceId;
	sourceListItem.style.margin = '10px';
	sourceListItem.addEventListener('click', loadSourceViewerHeader);

	document.getElementById('source-list').appendChild(sourceListItem);



}

function addSourceViewerHeader() {
	let sourceViewerHeader = document.createElement('div');
	sourceViewerHeader.id = 'source-viewer-header';
	sourceViewerHeader.textContent = 'header';
	sourceViewerHeader.style.backgroundColor = 'orange';
	sourceViewerHeader.style.margin = '10px'
	sourceViewerHeader.style.height = '100px';
	sourceViewerHeader.style.whiteSpace = 'preWrap';
	sourceViewerHeader.style.display = 'flex';
	sourceViewerHeader.style.flexDirection = 'column';
	sourceViewerHeader.style.justifyContent = 'spaceEvenly';

	sourceViewerHeader.appendChild(createSourceViewerHeaderField('source-viewer-id-label'));


	document.getElementById('source-viewer-container').appendChild(sourceViewerHeader);

}

function addSourceViewerMedia() {
	let sourceViewerMedia = document.createElement('div');
	sourceViewerMedia.id = 'source-viewer-header';
	sourceViewerMedia.textContent = 'media';
	sourceViewerMedia.style.backgroundColor = 'aliceblue';
	sourceViewerMedia.style.margin = '10px'
	sourceViewerMedia.style.height = '100px';
	sourceViewerMedia.style.whiteSpace = 'preWrap';
	sourceViewerMedia.style.flexGrow = '1';


	document.getElementById('source-viewer-container').appendChild(sourceViewerMedia);

}
 */



/*  

NEW BELOW 2023-12-03

*/


 /*
	SOURCEFIND PANEL
 */

function createSourcefindSearchcard(){
	let sourcefindSearchcard = document.createElement('div');
	sourcefindSearchcard.id = 'sourcefind-searchcard';
	sourcefindSearchcard.classList.add('card', 'sourcefind-searchcard');
	//sourcefindSearchcard.textContent = 'cardcard';

	let sourcefindSearchbar = createInputElement('sourcefind-searchbar', 'Source Search', 'type to search for source');
	sourcefindSearchbar.style.gridColumn = '1 / span 4'
	sourcefindSearchcard.appendChild(sourcefindSearchbar);

	let sourcefindFetch = createButtonElement('sourcefind-fetch');
	sourcefindFetch.addEventListener('click', fetchSourcesClicked);
	sourcefindSearchcard.appendChild(sourcefindFetch);

	let sourcefindAdd = createButtonElement('sourcefind-add');
	sourcefindAdd.addEventListener('click', addSourceClicked);
	sourcefindSearchcard.appendChild(sourcefindAdd);

	let sourcefindDelete = createButtonElement('sourcefind-delete');
	sourcefindDelete.addEventListener('click', deleteSourceClicked);
	sourcefindSearchcard.appendChild(sourcefindDelete);
	

	return sourcefindSearchcard;
}

function createSourcefindListcard(){
	let sourcefindList = document.createElement('div');
	sourcefindList.id = 'sourcefind-listcard';
	sourcefindList.classList.add('card');
	//sourcefindList.textContent = 'sourcefind-listcard';
	

	return sourcefindList;
}


function createSourcefindSourcecard(fetchedSource){
	let sourcefindListcard = document.getElementById('sourcefind-listcard');

	let sourcefindSourcecard = document.createElement('div');
	sourcefindSourcecard.id = 'sourcefind-sourcecard-' + fetchedSource.id;
	sourcefindSourcecard.classList.add('sourcefind-sourcecard');
	sourcefindSourcecard.addEventListener('click', sourceCardClicked);
	

	//sourcefindSourcecard.textContent = 'sourcefind-sourcecard-' + fetchedSource.id;
	
	let sourcefindName = createReadElement('sourcefind-name-' + fetchedSource.id, 'source name:', fetchedSource.name);
	sourcefindName.classList.add('sourcefind-name', 'sourcefind-readelement');
	sourcefindSourcecard.appendChild(sourcefindName);

	let sourcefindId = createReadElement('sourcefind-id-' + fetchedSource.id, 'source id:', fetchedSource.id);
	sourcefindId.classList.add('sourcefind-id', 'sourcefind-readelement');
	sourcefindSourcecard.appendChild(sourcefindId);

	let sourcefindDate = createReadElement('sourcefind-date-' + fetchedSource.id, 'source date:', fetchedSource.date);
	sourcefindDate.classList.add('sourcefind-date', 'sourcefind-readelement');
	sourcefindSourcecard.appendChild(sourcefindDate);


	sourcefindListcard.appendChild(sourcefindSourcecard);

	return sourcefindSourcecard;
}





 /*
	SOURCEVIEW PANEL
 */

	function createSourceviewPropertiescard(){
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

		let sourceviewName = createInputElement('sourceview-name', 'source name:', '');
		sourceviewName.classList.add('sourceview-element');
		sourceviewName.addEventListener('focusout', sourceviewFieldFocusout);
		sourceviewPropertiescardInner.appendChild(sourceviewName);

		let sourceviewUrl = createInputElement('sourceview-url', 'source url:', '');
		sourceviewUrl.classList.add('sourceview-element');
		sourceviewUrl.addEventListener('focusout', sourceviewFieldFocusout);
		sourceviewPropertiescardInner.appendChild(sourceviewUrl);

		let sourceviewId = createReadElement('sourceview-id', 'source id:', '');
		sourceviewId.classList.add('sourceview-element');
		sourceviewPropertiescardInner.appendChild(sourceviewId);

		let sourceviewDate = createReadElement('sourceview-date', 'date created:', '');
		sourceviewDate.classList.add('sourceview-element');
		sourceviewPropertiescardInner.appendChild(sourceviewDate);
		

		return sourceviewPropertiescardOuter;
	}




export {
	// addSourceListHeader,
	// addSourceList,
	// addSourceListItem,
	// addSourceViewerHeader,
	// addSourceViewerMedia,

	createSourcefindSearchcard,
	createSourcefindListcard,
	createSourcefindSourcecard,
	createSourceviewPropertiescard
}
