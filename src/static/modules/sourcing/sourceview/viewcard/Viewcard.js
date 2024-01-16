//import * as Fetches from '../../../Fetches/BaseFetches.js'
// import { getSourceFile } from '../../../Fetches/api/source/file/GetSourceFile.js';
import * as api from '../../../Fetches/api/api.js';
import { hasFile, extractCurrentSourceFileType, extractCurrentSourceId } from '../propertiescard/PropertiesCard_Extract.js';
import { getSourceviewHeaderbar, enablePostButton, disablePostButton } from './headerbar/viewcardHeaderbar.js';
import { newFileviewer, postFile, displaySourceFile, removeCurrentFileFromDOM } from './fileviewer/fileviewer.js';





function getSourceviewViewcard(){
	let sourceviewViewcard = document.createElement('div');
	sourceviewViewcard.id = 'sourceview-viewcard';
	sourceviewViewcard.tabIndex = 0;
	sourceviewViewcard.classList.add('card');

	
	sourceviewViewcard.appendChild(getSourceviewHeaderbar());

	
	sourceviewViewcard.appendChild(newFileviewer());

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

	
	// Disable paste when file is present!
	if (document.getElementById('sourceview-filename-field').value != ''){
		//console.log('This source already has a file. Returning.');
		return;
	}



	// make sure we paste to viewcard
	//if (document.activeElement === event.target) {
	if (document.activeElement.id === 'sourceview-viewcard') {

		// Some exec-links:
		// https://stackoverflow.com/questions/7144702/the-proper-use-of-execcommandpaste-in-a-chrome-extension/24984030
		//console.log(document.execCommand("paste"));
		
		// https://stackoverflow.com/questions/3390396/how-can-i-check-for-undefined-in-javascript
		if(typeof event.clipboardData.files[0] !== 'undefined'){
			//console.log("File selected: ", event.clipboardData.files[0]);
			postFile(event.clipboardData.files[0]);
		}
		else if((event.clipboardData || window.clipboardData).getData("text") !== ''){
			//console.log((event.clipboardData || window.clipboardData).getData("text"));
			let clipboardText = (event.clipboardData || window.clipboardData).getData("text");

			/* 
				IMPLEMENT TEXT TYPE DETECTION ! ! !
			*/

			let blob = new Blob([clipboardText], { type: 'text/plain' });
 			let file = new File([blob], "clipboard.txt", {type: "text/plain"});

			postFile(file);
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









export {
	getSourceviewViewcard,

	// headerbar
	enablePostButton,
	disablePostButton,

	// fileviewer
	displaySourceFile,
	removeCurrentFileFromDOM,
	pasteOnViewcard
}
