import { extractCurrentSourceObject, extractCurrentSourceId, extractCurrentSourceFileType } from './PropertiesCard_Extract.js';
import { reviewDateClicked } from './PropertiesCard_Events.js';
import * as Fetches from '../../Fetches/BaseFetches.js';
import * as Sourcecard from '../sourcefind/Sourcecard.js';




function loadSource(fetchedSource) {
	console.log('loading source');
	console.log(fetchedSource);
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
	let sourceviewReviewDates = document.getElementById('sourceview-reviewdates');
	sourceviewReviewDates.innerHTML = '';
	fetchedSource.sourceReviewDates.forEach(reviewDate => {
		//console.log(reviewDate.date);
		let reviewDateLabel = document.createElement('label');
		if(reviewDate.completed){
			reviewDateLabel.classList.add('sourceview-reviewdate-labels-done');

		}else {
			reviewDateLabel.classList.add('sourceview-reviewdate-labels');
		}
		reviewDateLabel.addEventListener('click', reviewDateClicked);
		reviewDateLabel.textContent = reviewDate.date;
		sourceviewReviewDates.appendChild(reviewDateLabel);
	});


	// For now we simply guarantee no lingering source files
	document.getElementById('sourceview-viewcard').innerHTML = '';
	// Load file for currrent source
	document.getElementById('sourceview-load').click();

	//let currentSource = extractCurrentSourceObject();
	//displayNewSourceFile(currentSource.)
}




function clearSourceviewPropertiescard(){
	console.log('clear');
	document.getElementById('sourceview-title-field').value = '';
	document.getElementById('sourceview-url-field').value = '';
	document.getElementById('sourceview-id-field').value = '';
	document.getElementById('sourceview-datecreated-field').value = '';
	document.getElementById('sourceview-hasfile-field').value = '';
	document.getElementById('sourceview-filetype-field').value = '';
	document.getElementById('sourceview-fileending-field').value = '';

	document.getElementById('sourceview-viewcard').innerHTML = '';
}


function displayNewSourceFile(fileType, fileUrl){
	
	let fileViewer;
	
	switch (fileType) {
		case 'image':
			fileViewer = document.createElement('img');
			break;

		case 'video':
			fileViewer = document.createElement('video');
			fileViewer.id = 'sourceview-file-video';
			fileViewer.setAttribute("controls", "controls");
			fileViewer.setAttribute("preload", "auto"); // this enabled they playback to work as expected!
			//fileViewer.setAttribute('type', 'video/mp4');
			break;
	
		default:
			break;
	}

	fileViewer.classList.add('sourceview-file'); 
	fileViewer.src = fileUrl;
	//fileViewer.setAttribute('type', 'video/mp4');
	//fileViewer.style.maxWidth = '100%';

	document.getElementById('sourceview-viewcard').innerHTML = '';
	//document.getElementById('sourceview-viewcard').overflow = 'hidden';
	document.getElementById('sourceview-viewcard').appendChild(fileViewer);

}


function saveCurrentSource(){
	let currentSourceObject = extractCurrentSourceObject();
	
	//console.log(JSON.stringify(currentSourceObject));
	//console.log(objectString);

	Fetches.updateSource(JSON.stringify(currentSourceObject));

	Sourcecard.updateSourcefindCard(currentSourceObject.id);
}


export {
	loadSource,
	clearSourceviewPropertiescard,
	displayNewSourceFile,
	saveCurrentSource
}