import * as api from '../../../../Fetches/api/api.js';
import { extractCurrentSourceId, extractCurrentSourceFileType, loadSource } from "../../propertiescard/PropertiesCard.js";
import { determineFileCategories } from './fileviewer_utils.js';
import { enablePostButton, disablePostButton } from '../Viewcard.js';



function newFileviewer() {

	let sourceviewFileContainer = document.createElement('div');
	sourceviewFileContainer.id = 'sourceview-fileviewer';

	return sourceviewFileContainer;
}


async function postFile(selectedFile){
	//console.log('postie pete');

	let fileCategories = determineFileCategories(selectedFile);
	console.log('Extracted file-type data: ', fileCategories);

	await api.postSourceFile(extractCurrentSourceId(), selectedFile, fileCategories.fileType, fileCategories.fileEnding);

	loadSource(extractCurrentSourceId());
}






async function displaySourceFile() {

	let currentSourceId = extractCurrentSourceId();

	removeCurrentFileFromDOM();


	if (currentSourceId == '') {

		console.log('no source selected');

	}
	else if (+document.getElementById('sourceview-hasfile-field').value != 1) { //sourceview-hasfile-field
		
		// check if source has a file to load. If not we don't do anything
		//console.log('There is no file associated with this source.')

		// no file detected. Make sure post button is available
		enablePostButton();
	}
	else {


		let fetchedBlob = await api.getSourceFile(currentSourceId);

		
		//let fetchedFile = new File(  [fetchedBlob], 'testname.file' );

		let fileUrl = URL.createObjectURL(fetchedBlob);
		// console.log('fetched blob:');
		// console.log(fetchedBlob);
		// console.log('Size : ' + fetchedBlob.slice(1, 100).text().then((obj) => {console.log(obj)}));
		// console.log();

		
		loadFileIntoDom(fileUrl, fetchedBlob);

		disablePostButton();

	}



}


async function loadFileIntoDom(fileUrl, fetchedBlob){
	
	let fileViewer;
	let fileType = extractCurrentSourceFileType();


	// Remove if already exists a file element in DOM
	// let fileElement = document.getElementById('sourceview-file');
	// if(fileElement){
	// 	document.getElementById('sourceview-file').remove()
	// }


	switch (fileType) {
		case 'image':
			fileViewer = document.createElement('img');
			fileViewer.id = 'sourceview-file';
			break;

		case 'text':
			fileViewer = document.createElement('textarea');
			fileViewer.id = 'sourceview-file';
			fileViewer.classList.add('sourceview-file-text');
			fileViewer.setAttribute('readonly', 'true');
			fileViewer.textContent = await fetchedBlob.text()

			
			//console.log(await fetchedBlob.text());
			
			// fileViewer.src = fileUrl;
			// let reader = new FileReader();
			// reader.addEventListener("load", function (e) {
			// 	/* What we do here is take the result of the fileReader and put it inside our output div to display it to the users. This is where you could do your scrambling and maybe save the result in a variable ? */
			// 	console.log(reader.readAsArrayBuffer(fetchedBlob));
			// 	console.log('loader');
			//   });
			
			
			break;

		case 'video':
			fileViewer = document.createElement('video');
			fileViewer.id = 'sourceview-file';
			fileViewer.setAttribute("controls", "controls");
			fileViewer.setAttribute("preload", "auto"); // this enabled they playback to work as expected!
			//fileViewer.setAttribute('type', 'video/mp4');
			
			// move focus to card
			fileViewer.addEventListener('focus', (event) => {
				document.getElementById('sourceview-viewcard').focus();
			});
			
			//fileViewer.appendChild(addVideoClickCapturer());

			// // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#events
			// fileViewer.addEventListener('play', focusOnVideoClick);
			// fileViewer.addEventListener('pause', focusOnVideoClick);
			// fileViewer.addEventListener('volumechange', focusOnVideoClick);
			// fileViewer.addEventListener('seeking', focusOnVideoClick);
			// // https://stackoverflow.com/questions/60760150/how-can-i-detect-if-a-video-is-full-screen-using-js-jquery
			// fileViewer.addEventListener('fullscreenchange webkitfullscreenchange mozfullscreenchange', focusOnVideoClick);

			break;

		case 'audio':
				fileViewer = document.createElement('audio');
				fileViewer.setAttribute('controls', 'controls');
				//fileViewer.src = '';
				fileViewer.id = 'sourceview-file';
				break;

			case 'embed':
				// WARNINGS + logs....
				// https://github.com/mozilla/pdf.js/issues/13103
				// https://stackoverflow.com/questions/43202973/google-chrome-does-not-show-pdf-files-in-iframe
				fileViewer = document.createElement('embed');
				//fileViewer.setAttribute('controls', 'controls');
				//fileViewer.src = '';
				fileViewer.id = 'sourceview-file';
				fileViewer.classList.add('sourceview-file-embed');
				break;

		default:
			break;
	}

	fileViewer.classList.add('sourceview-file'); 
	fileViewer.src = fileUrl;
	//fileViewer.addEventListener('click', focusOnClick);
	//fileViewer.setAttribute('type', 'video/mp4');
	//fileViewer.style.maxWidth = '100%';

	//document.getElementById('sourceview-viewcard').innerHTML = '';
	//document.getElementById('sourceview-viewcard').overflow = 'hidden';

	

	let sourceviewFileContainer = document.getElementById('sourceview-fileviewer');

	//sourceviewFileContainer.addEventListener('paste', pasteOnViewcard);

	sourceviewFileContainer.appendChild(fileViewer);
	//document.getElementById('sourceview-viewcard').appendChild(fileViewer);

}


function removeCurrentFileFromDOM() {
	// Remove if already exists a file element in DOM
	let fileElement = document.getElementById('sourceview-file');
	if(fileElement){
		document.getElementById('sourceview-file').remove()

		let currentUrl = (import.meta.url).substring(20);
		let indexOfThirdSlash = currentUrl.split('/', 3).join('/').length
		let curentFilePath = currentUrl.substring(indexOfThirdSlash);
		
		//console.log(`File removed from DOM from file : ${curentFilePath}`);
		//console.log('Removed in : ' + import.meta.url);
	}
}



export {
	newFileviewer,
	postFile,
	displaySourceFile,
	removeCurrentFileFromDOM
}