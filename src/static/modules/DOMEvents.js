import { fetchAllSources, getSource, newSource } from "./Fetches.js";
import { addSourceListItem } from './Cards.js';


async function populateSourceList() {
	try {
		let fetchedSources = await fetchAllSources();
		let sourceList = document.getElementById('source-list');
		sourceList.innerHTML = '';
		fetchedSources.forEach(source => {
			addSourceListItem(source.id);
		});

	} catch (error) {
		console.trace();
	}


}

async function addNewSource(){
	console.log('adding new source');
	newSource();
	populateSourceList();
}

async function loadSourceViewerHeader(e){
	
	let fetchedSource = await getSource(e.target.textContent);
	
	let sourceViewerHeader = document.getElementById('source-viewer-header');
	
	sourceViewerHeader.textContent = '';
	sourceViewerHeader.textContent = fetchedSource.id;
	sourceViewerHeader.textContent = fetchedSource.id + ' ' + fetchedSource.name;

}


export {
	populateSourceList,
	addNewSource,
	loadSourceViewerHeader
}

