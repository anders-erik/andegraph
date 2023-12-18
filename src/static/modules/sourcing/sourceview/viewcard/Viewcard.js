//import * as Fetches from '../../../Fetches/BaseFetches.js'
// import { getSourceFile } from '../../../Fetches/api/source/file/GetSourceFile.js';
import * as api from '../../../Fetches/api/api.js';


function getSourceviewViewcard(){
	let sourceviewViewcard = document.createElement('div');
	sourceviewViewcard.id = 'sourceview-viewcard';
	sourceviewViewcard.classList.add('card');

	return sourceviewViewcard;
}






async function displaySourceFile(currentSourceId, fileType){


	//let fetchedBlob = await Fetches.loadSourceFile(currentSourceId);
	let fetchedBlob = await api.getSourceFile(currentSourceId);

		// console.log('fetched blob:');
		// console.log(fetchedBlob);
		// console.log('Size : ' + fetchedBlob.slice(1, 100).text().then((obj) => {console.log(obj)}));
		// console.log();
	
	let fileUrl = URL.createObjectURL(fetchedBlob);

	

	loadFileIntoDom(fileType, fileUrl);

}



function loadFileIntoDom(fileType, fileUrl){
	
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


export {
	getSourceviewViewcard,
	displaySourceFile,

}