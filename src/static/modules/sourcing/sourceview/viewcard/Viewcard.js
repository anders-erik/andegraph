//import * as Fetches from '../../../Fetches/BaseFetches.js'
// import { getSourceFile } from '../../../Fetches/api/source/file/GetSourceFile.js';
import * as api from '../../../Fetches/api/api.js';
import { hasFile, extractCurrentSourceFileType, extractCurrentSourceId } from '../propertiescard/PropertiesCard_Extract.js';
import { getSourceviewHeaderbar } from './headerbar/viewcardHeaderbar.js';

function getSourceviewViewcard(){
	let sourceviewViewcard = document.createElement('div');
	sourceviewViewcard.id = 'sourceview-viewcard';
	sourceviewViewcard.tabIndex = 0;
	sourceviewViewcard.classList.add('card');

	
	sourceviewViewcard.appendChild(getSourceviewHeaderbar());

	let sourceviewFileContainer = document.createElement('div');
	sourceviewFileContainer.id = 'sourceview-file-container';
	sourceviewViewcard.appendChild(sourceviewFileContainer);

	// FILE PASTING
	sourceviewViewcard.addEventListener('paste', pasteOnViewcard);

	sourceviewViewcard.addEventListener('dragenter', dragEnterViewcard);
	sourceviewViewcard.addEventListener('dragleave', dragLeaveViewcard);
	sourceviewViewcard.addEventListener('drop', dropOnViewcard);

	return sourceviewViewcard;
}


// PASTE
// https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event
function pasteOnViewcard(event) {
	// make sure we paste to viewcard
	if (document.activeElement === event.target) {
		// Some exec-links:
		// https://stackoverflow.com/questions/7144702/the-proper-use-of-execcommandpaste-in-a-chrome-extension/24984030
		//console.log(document.execCommand("paste"));
		
		// https://stackoverflow.com/questions/3390396/how-can-i-check-for-undefined-in-javascript
		if(typeof event.clipboardData.files[0] !== 'undefined'){
			console.log(event.clipboardData.files[0]);
		}
		else if((event.clipboardData || window.clipboardData).getData("text") !== ''){
			console.log((event.clipboardData || window.clipboardData).getData("text"));
		}
		else {
			console.log('No file nor text detected.');
		}
		
	}


   
    // const clipboardContents = navigator.clipboard.read().then((e) => {
    //     // console.log(e[0]);
    //     console.log('clipboard');
    //     for (const item of e) {
    //         console.log(item);
    //         const blob =  item.getType("image/png");
    //         destinationImage.src = URL.createObjectURL(blob);
    //     }
    // })
    
//   let img = document.querySelector('#img');
//   let imgUrl = URL.createObjectURL(event.clipboardData.files[0]);
//   img.src = imgUrl;

};


// DRAG & ROP FILE
// VERY BUGGY - DO NOT USE! ! ! !
function dragEnterViewcard(event){
	console.log('drag enter viewcard');
	document.getElementById('sourceview-viewcard').classList.add('shadow-all');

	//event.target.classList.add('shadow-all');
	event.preventDefault();
}
function dragLeaveViewcard(event){
	console.log('Left viewcard');
	//event.target.classList.remove('shadow-all');
	document.getElementById('sourceview-viewcard').classList.remove('shadow-all');
	event.preventDefault();
}
function dropOnViewcard(event){
	
	event.preventDefault();

	console.log('dropped');

	
	
	document.getElementById('sourceview-viewcard').classList.remove('shadow-all');

	if (event.dataTransfer.items) {
		// Use DataTransferItemList interface to access the file(s)
		[...event.dataTransfer.items].forEach((item, i) => {
		  // If dropped items aren't files, reject them
		  if (item.kind === "file") {
			const file = item.getAsFile();
			console.log(`… file[${i}].name = ${file.name}`);
		  }
		});
	  } else {
		// Use DataTransfer interface to access the file(s)
		[...event.dataTransfer.files].forEach((file, i) => {
		  console.log(`… file[${i}].name = ${file.name}`);
		});
	  }

}

// function focusDetected(event) {
// 	var videoElement = document.getElementById("sourceview-file-video");
// 	if (videoElement) {
// 		console.log('Focus on video')
// 		videoElement.setAttribute("controls", "controls");
// 	}
// }
// function focusoutDetected(event){
// 	var videoElement = document.getElementById("sourceview-file-video");
// 	if (videoElement) {
// 		console.log('Focusout from video')
// 		videoElement.removeAttribute("controls");
// 	}
// }


async function displaySourceFile() {

	let currentSourceId = extractCurrentSourceId();

	removeCurrentFileFromDOM();


	if (currentSourceId == '') {

		console.log('no source selected');

	}
	else if (+document.getElementById('sourceview-hasfile-field').value != 1) { //sourceview-hasfile-field
		
		// check if source has a file to load. If not we don't do anything
		console.log('There is no file associated with this source.')

	}
	else {


		let fetchedBlob = await api.getSourceFile(currentSourceId);

		let fileUrl = URL.createObjectURL(fetchedBlob);
		// console.log('fetched blob:');
		// console.log(fetchedBlob);
		// console.log('Size : ' + fetchedBlob.slice(1, 100).text().then((obj) => {console.log(obj)}));
		// console.log();

		
		loadFileIntoDom(fileUrl);

	}



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



function loadFileIntoDom(fileUrl){
	
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

	let sourceviewFileContainer = document.getElementById('sourceview-file-container');
	sourceviewFileContainer.appendChild(fileViewer);
	//document.getElementById('sourceview-viewcard').appendChild(fileViewer);

}






export {
	getSourceviewViewcard,
	displaySourceFile,
	removeCurrentFileFromDOM
}