import { extractCurrentSourceObject, extractCurrentSourceId, extractCurrentSourceFileType } from './PropertiesCard_Extract.js';
import { reviewDateClicked, loadReviewDates } from './PropertiesCard_reviewdates.js';

import * as viewcard from '../viewcard/Viewcard.js';

// import * as Fetches from '../../../Fetches/BaseFetches.js';
// import * as Fetchess from '../../../Fetches/BaseFetches.js';
// import { patchSource } from '../../../Fetches/api/source/PatchSource.js';
// import { getSource } from '../../../Fetches/api/source/GetSource.js';
import * as api from '../../../Fetches/api/api.js';

import * as Sourcecard from '../../sourcefind/listcard/sourcecard/Sourcecard.js';

import { loadShardsIntoShardlist } from '../../sharding/shardlist/shardlist.js';


async function loadSource(sourceId) {

	

	localStorage.setItem("lastLoadedSourceId", sourceId);

	//console.log('loading source');
	//console.log(fetchedSource);

	//let fetchedSource = await api.getSource(sourceId);
	let fetchedSource = await api.getNode(sourceId);

	let sourceviewPropertiescardInner = document.getElementById('sourceview-propertiescard-outer');
	
	let sourceviewName = document.getElementById('sourceview-title-field');
	sourceviewName.value = fetchedSource.title;
	

	let sourceviewUrl = document.getElementById('sourceview-url-field');
	sourceviewUrl.value = fetchedSource.url;


	let sourceviewId = document.getElementById('sourceview-id-field');
	sourceviewId.value = fetchedSource.id;
	
	let sourceviewDate = document.getElementById('sourceview-datecreated-field');
	sourceviewDate.value = fetchedSource.dateCreated;
	
	let sourceviewfileName = document.getElementById('sourceview-filename-field');
	sourceviewfileName.value = fetchedSource.fileName;

	let sourceviewFileExtension = document.getElementById('sourceview-fileextension-field');
	sourceviewFileExtension.value = fetchedSource.fileExtension;

	let sourceviewElementType = document.getElementById('sourceview-elementtype-field');
	sourceviewElementType.value = fetchedSource.elementType;

	let sourceviewTextContent = document.getElementById('sourceview-textcontent-field');
	sourceviewTextContent.value = fetchedSource.textContent;

	let sourceviewNodeType = document.getElementById('sourceview-nodetype-field');
	sourceviewNodeType.value = fetchedSource.nodeType;

	let sourceviewNodeTypeType = document.getElementById('sourceview-nodetypetype-field');
	sourceviewNodeTypeType.value = fetchedSource.nodeTypeType;

	



	// review dates
	loadReviewDates(sourceId);

	// Display file
	viewcard.displaySourceFile();


	// LOAD SHARDS
	loadShardsIntoShardlist(sourceId);
}







function clearSourceviewPropertiescard(){

	let sourceId = document.getElementById('sourceview-id-field');
	
	document.getElementById('sourceview-title-field').value = '';
	document.getElementById('sourceview-url-field').value = '';
	document.getElementById('sourceview-id-field').value = '';
	document.getElementById('sourceview-datecreated-field').value = '';
	document.getElementById('sourceview-filename-field').value = '';
	document.getElementById('sourceview-fileextension-field').value = '';
	document.getElementById('sourceview-elementtype-field').value = '';
	document.getElementById('sourceview-textcontent-field').value = '';
	document.getElementById('sourceview-nodetype-field').value = '';
	document.getElementById('sourceview-nodetypetype-field').value = '';

	//document.getElementById('sourceview-viewcard').innerHTML = '';
	//viewcard.removeCurrentFileFromDOM();

	//console.log(`Source with id ${sourceId} removed from properties card.`);

}



function saveCurrentSource(){
	let currentSourceObject = extractCurrentSourceObject();
	
	//console.log(JSON.stringify(currentSourceObject));
	//console.log(objectString);

	console.log('patchpatchpatch')
	
	//api.patchSource(JSON.stringify(currentSourceObject));
	api.putNode(currentSourceObject);

	Sourcecard.updateSourcefindCard(currentSourceObject[0].id);
}


export {
	loadSource,
	clearSourceviewPropertiescard,
	saveCurrentSource
}