// DONT WANT THESE, BUT HAD TO IMPELMENT TO UPDATE SOURCE!
import * as ExtractDOM from './ExtractDOM.js';
import * as Fetches from './Fetches.js';


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
		reviewDateLabel.classList.add('sourceview-reviewdate-labels');
		reviewDateLabel.textContent = reviewDate.date;
		sourceviewReviewDates.appendChild(reviewDateLabel);
	});


	// For now we simply guarantee no lingering source files
	document.getElementById('sourceview-viewcard').innerHTML = '';
}


function removeSourcefindCard(id){
	document.getElementById('sourcefind-sourcecard-' + id).remove();
	console.log('remove card');
}

function updateSourcefindCard(id){
	//let currentSourcefindCard = document.getElementById('sourcefind-sourcecard-' + id);
	//console.log(document.getElementById('sourcefind-title-' + id).textContent);

	document.getElementById('sourcefind-title-' + id).textContent = document.getElementById('sourceview-title-field').value;
	document.getElementById('sourcefind-id-' + id).textContent = document.getElementById('sourceview-id-field').value;
	document.getElementById('sourcefind-datecreated-' + id).textContent = document.getElementById('sourceview-datecreated-field').value;

	console.log('updated curent Sourcefind card');
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

function highlightSourceCard(elementId){
	// https://getcssscan.com/css-box-shadow-examples
	document.getElementById(elementId).style.boxShadow = 'rgb(51, 51, 51) 0px 0px 0px 2px';
	//document.getElementById(elementId).style.boxShadow = 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset';
}

function unhighlightAllSourceCards(){
	let sourcecardArray = document.getElementsByClassName('sourcefind-sourcecard');
	//console.log(sourcecardArray.toString());

	for (let card of sourcecardArray){
		//card.style.border = 'solid black 0px';
		card.style.boxShadow = '';
	}
	
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
	let currentSourceObject = ExtractDOM.extractCurrentSourceObject();
	
	//console.log(JSON.stringify(currentSourceObject));
	//console.log(objectString);

	Fetches.updateSource(JSON.stringify(currentSourceObject));

	updateSourcefindCard(currentSourceObject.id);
}



export {
	loadSource,
	removeSourcefindCard,
	updateSourcefindCard,
	clearSourceviewPropertiescard,
	highlightSourceCard,
	unhighlightAllSourceCards,
	displayNewSourceFile,
	saveCurrentSource
}
