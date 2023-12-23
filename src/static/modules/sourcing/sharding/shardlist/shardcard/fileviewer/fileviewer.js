// import * as api from '../../../../Fetches/api/api.js';
// import { extractCurrentSourceId, extractCurrentSourceFileType, loadSource } from "../../propertiescard/PropertiesCard.js";
import { extractCurrentSourceId, extractCurrentSourceFileType } from '../../../../sourceview/propertiescard/PropertiesCard_Extract.js';
import { determineFileCategories } from './fileviewer_utils.js';
// import { enablePostButton, disablePostButton } from '../Viewcard.js';
import * as api from '../../../../../Fetches/api/api.js';




function newFileviewer(shard) {

	let shardfileContainer = document.createElement('div');
	shardfileContainer.id = 'shardcard-fileviewer-' + shard.id;
	shardfileContainer.classList.add('shardcard-fileviewer');

	shardfileContainer.appendChild(newFileElement(shard.id))


	return shardfileContainer;
}



function newFileElement(shardid){

	let shardfileElement = document.createElement('div');
	shardfileElement.id = 'shardcard-file-' + shardid;
	shardfileElement.classList.add('shardcard-file');
	shardfileElement.textContent = shardfileElement.id;


	// let fetchedBlob = await api.getSourceFile(extractCurrentSourceId(), shardid);

	// //let fetchedFile = new File(  [fetchedBlob], 'testname.file' );
	// let fileUrl = URL.createObjectURL(fetchedBlob);

	// console.log(fileUrl);

	//loadFileIntoDom(fileUrl, fetchedBlob);


	return shardfileElement;
}


async function loadShardFile(shard, sourceid){

	//console.log('loading shard file for ', shard.id);

	let fileType = shard.fileType;
	if(fileType == null){
		//console.log(`no filetype detected for shard no. ${shard.id}. No file fetch performed.`);
		return;
	}

	let shardBlob;
	let fileUrl;
	
	if (shard.fileType == 'text'){
		let shardTextReadableStream = await api.getShardFileText(sourceid, shard.id);
		//console.log(shardTextReadableStream[0].textContent)
		shardBlob = new Blob([shardTextReadableStream[0].textContent]);
		// const file = new File(
		// 	[shardTextReadableStream[0].textContent], 
		// 	"foo.txt", {
		// 	type: "text/plain",
		//   });
		
		fileUrl = URL.createObjectURL(shardBlob);
		  
	}
	else {
		shardBlob = await api.getShardFile(sourceid, shard.id);
		fileUrl = URL.createObjectURL(shardBlob);
	}
	
	//console.log(shardBlob);

	

	//console.log(shardBlob);
	//console.log(fileUrl);

	loadShardfileIntoDom(fileUrl, shardBlob, shard, sourceid);
	
}





async function loadShardfileIntoDom(fileUrl, fetchedBlob, shard, sourceid){
	
	let fileViewer;
	//let fileType = extractCurrentSourceFileType();
	let fileType = shard.fileType;

	if(fileType == null){
		console.log(`Shard id ${shard.id} : no file detected!`)
		return;
	}

	removeCurrentShardFileFromDOM(shard.id);

	//removeCurrentShardFileFromDOM(shard.id);

	// Remove if already exists a file element in DOM
	// let fileElement = document.getElementById('sourceview-file');
	// if(fileElement){
	// 	document.getElementById('sourceview-file').remove()
	// }


	switch (fileType) {

		case 'image':
			fileViewer = document.createElement('img');
			fileViewer.id = 'shardcard-file-' + shard.id;
			break;

		case 'text':
			fileViewer = document.createElement('textarea');
			fileViewer.id = 'shardcard-file-' + shard.id;
			fileViewer.classList.add('shardcard-file-text');
			//fileViewer.setAttribute('readonly', 'false');
			fileViewer.textContent = await fetchedBlob.text()

			//console.log('text length: ', fetchedBlob.size)
			let textareaRows = 5 + Math.floor(fetchedBlob.size / 30);
			if (textareaRows > 20)
				fileViewer.setAttribute('rows', 20);
			else
				fileViewer.setAttribute('rows', textareaRows);
			
			fileViewer.addEventListener('focusout', patchTextOnFocusout);
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
			fileViewer.id = 'shardcard-file-' + shard.id;
			fileViewer.classList.add('shardcard-file-video');

			fileViewer.setAttribute("controls", "controls");
			fileViewer.setAttribute("preload", "auto"); // this enabled they playback to work as expected!
			//fileViewer.setAttribute('type', 'video/mp4');
			
			// move focus to card
			// fileViewer.addEventListener('focus', (event) => {
			// 	document.getElementById('sourceview-viewcard').focus();
			// });
			
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
				fileViewer.id = 'shardcard-file-' + shard.id;
				break;

			case 'embed':
				// WARNINGS + logs....
				// https://github.com/mozilla/pdf.js/issues/13103
				// https://stackoverflow.com/questions/43202973/google-chrome-does-not-show-pdf-files-in-iframe
				fileViewer = document.createElement('embed');
				//fileViewer.setAttribute('controls', 'controls');
				//fileViewer.src = '';
				fileViewer.id = 'shardcard-file-' + shard.id;
				fileViewer.classList.add('sourceview-file-embed');
				break;

		default:
			break;
	}

	fileViewer.classList.add('shardcard-file'); 
	fileViewer.src = fileUrl;
	//fileViewer.addEventListener('click', focusOnClick);
	//fileViewer.setAttribute('type', 'video/mp4');
	//fileViewer.style.maxWidth = '100%';

	//document.getElementById('sourceview-viewcard').innerHTML = '';
	//document.getElementById('sourceview-viewcard').overflow = 'hidden';

	

	let shardcardFileContainer = document.getElementById('shardcard-fileviewer-' + shard.id);

	//sourceviewFileContainer.addEventListener('paste', pasteOnViewcard);

	shardcardFileContainer.appendChild(fileViewer);
	//document.getElementById('sourceview-viewcard').appendChild(fileViewer);

}


async function patchTextOnFocusout(event){

	let patchText = event.target.value;
	//console.log(patchText)
	
	let shardid = event.target.id.match(/\d+/g)[0];

	let fileEnding = document.getElementById('shardcard-fileending-' + shardid).textContent.match(/\w+$/g)[0];

	let sourceid = extractCurrentSourceId();

	await api.patchShardFileText(sourceid, shardid, fileEnding, patchText);
	
}



function removeCurrentShardFileFromDOM(shardid) {
	// Remove if already exists a file element in DOM
	let fileElement = document.getElementById('shardcard-file-' + shardid);

	if(fileElement){
		fileElement.remove()

		// let currentUrl = (import.meta.url).substring(20);
		// let indexOfThirdSlash = currentUrl.split('/', 3).join('/').length
		// let curentFilePath = currentUrl.substring(indexOfThirdSlash);
		
		//console.log(`File removed from DOM from file : ${curentFilePath}`);
		//console.log('Removed in : ' + import.meta.url);
	}
}



// async function postFile(selectedFile){
// 	//console.log('postie pete');

// 	let fileCategories = determineFileCategories(selectedFile);
// 	console.log('Extracted file-type data: ', fileCategories);

// 	await api.postSourceFile(extractCurrentSourceId(), selectedFile, fileCategories.fileType, fileCategories.fileEnding);

// 	loadSource(extractCurrentSourceId());
// }






// async function displayShardFile() {

// 	let currentSourceId = extractCurrentSourceId();

// 	removeCurrentFileFromDOM();


// 	if (currentSourceId == '') {

// 		console.log('no source selected');

// 	}
// 	else if (+document.getElementById('sourceview-hasfile-field').value != 1) { //sourceview-hasfile-field
		
// 		// check if source has a file to load. If not we don't do anything
// 		//console.log('There is no file associated with this source.')

// 		// no file detected. Make sure post button is available
// 		enablePostButton();
// 	}
// 	else {


// 		let fetchedBlob = await api.getSourceFile(currentSourceId);

		
// 		//let fetchedFile = new File(  [fetchedBlob], 'testname.file' );

// 		let fileUrl = URL.createObjectURL(fetchedBlob);
// 		// console.log('fetched blob:');
// 		// console.log(fetchedBlob);
// 		// console.log('Size : ' + fetchedBlob.slice(1, 100).text().then((obj) => {console.log(obj)}));
// 		// console.log();

		
// 		loadFileIntoDom(fileUrl, fetchedBlob);

// 		disablePostButton();

// 	}



// }







export {
	newFileviewer,
	loadShardFile,


	//postFile,
	//displayShardFile,
	removeCurrentShardFileFromDOM
}