import { populateSourceList, loadSourceViewerHeader, addNewSource } from "./DOMEvents.js";
import { createSourceViewerHeaderFieldId } from "./Elements.js";

function addSourceListHeader() {
	let sourceListHeader = document.createElement('div');
	sourceListHeader.id = 'source-list-header';
	sourceListHeader.style.backgroundColor = 'purple';
	sourceListHeader.textContent = 'slh \n FETCH SOURCES';
	sourceListHeader.style.margin = '10px';
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
	sourceList.style.backgroundColor = 'aqua';
	sourceList.textContent = 'sl';
	sourceList.style.margin = '10px';

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

	sourceViewerHeader.appendChild(createSourceViewerHeaderFieldId());


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


export {
	addSourceListHeader,
	addSourceList,
	addSourceListItem,
	addSourceViewerHeader,
	addSourceViewerMedia
}
