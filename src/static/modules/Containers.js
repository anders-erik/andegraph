import { addSourceList, addSourceListHeader, addSourceListItem, addSourceViewerHeader } from './Cards.js';

//temporary for population on page load
import { populateSourceList } from './DOMEvents.js';



function addSourceListContainer(){
	let sourceListContainer = document.createElement('div');
	sourceListContainer.id = 'source-list-container';
	sourceListContainer.textContent = 'slcc';
	sourceListContainer.style.backgroundColor = 'yellow';
	sourceListContainer.style.width = '20%'; 
	sourceListContainer.style.display = 'flex';
	sourceListContainer.style.flexDirection = 'column';
	sourceListContainer.style.justifyContent = 'start';

	document.getElementById('root').appendChild(sourceListContainer);

	addSourceListHeader();
	addSourceList();

	populateSourceList();
	//addSourceListItem();
	//addSourceListItem();
}

function addSourceViewerContainer() {
	let sourceViewerContainer = document.createElement('div');
	sourceViewerContainer.id = 'source-viewer-container';
	sourceViewerContainer.textContent = 'svc';
	sourceViewerContainer.style.backgroundColor = 'green';
	sourceViewerContainer.style.width = '40%';
	sourceViewerContainer.style.display = 'flex';
	sourceViewerContainer.style.flexDirection = 'column';
	sourceViewerContainer.style.justifyContent = 'start';

	document.getElementById('root').appendChild(sourceViewerContainer);

	addSourceViewerHeader();
}

export {
	addSourceListContainer,
	addSourceViewerContainer
}