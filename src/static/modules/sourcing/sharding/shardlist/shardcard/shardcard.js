

import * as api from '../../../../Fetches/api/api.js';
import { hasFile, extractCurrentSourceFileType, extractCurrentSourceId } from '../../../sourceview/propertiescard/PropertiesCard_Extract.js';
import { getSourceviewHeaderbar } from './headerbar/shardcardHeaderbar.js';
import { newFileviewer, /* postFile,  displayShardFile, removeCurrentFileFromDOM */} from './fileviewer/fileviewer.js';
import { deleteShardcard } from '../shardlist.js';

import { determineFileCategories } from './fileviewer/fileviewer_utils.js';

import { loadShardFile } from './fileviewer/fileviewer.js';
import { loadSource } from '../../../sourceview/propertiescard/PropertiesCard_Update.js';



function getShardcard(shard){
	let shardcard = document.createElement('div');
	shardcard.id = 'shardcard-' + shard.id;
	shardcard.classList.add('shardcard');
	shardcard.tabIndex = 0;


	
	shardcard.appendChild(getSourceviewHeaderbar(shard));


	shardcard.appendChild(newFileviewer(shard));


	// deleting shard
	shardcard.addEventListener('focus', focusShardcard);
	shardcard.addEventListener('focusout', focusoutShardcard);

	// // FILE PASTING
	// shardcard.addEventListener('paste', pasteOnViewcard);

	// shardcard.addEventListener('dragenter', dragEnterViewcard);
	// shardcard.addEventListener('dragleave', dragLeaveViewcard);
	// shardcard.addEventListener('drop', dropOnViewcard);

	
	return shardcard;
}

function focusShardcard(event){
	//console.log('focus: ' + event.target.id);

	event.target.addEventListener('keydown', keydownDuringShardcardFocus);
	event.target.addEventListener('paste', pasteDuringShardcardFocus);

}

function focusoutShardcard(event){
	//console.log('focusout: ', event.target.id);

	event.target.removeEventListener('keydown', keydownDuringShardcardFocus);
	event.target.removeEventListener('paste', pasteDuringShardcardFocus);

}

async function keydownDuringShardcardFocus(event) {
	//console.log('keykey' + event.key);
	if (event.altKey && event.shiftKey && (event.key == 'Delete')) {

		let shardid = event.target.id.match(/\d+$/g)[0];
		//console.log(shardid);

		let sourceid = extractCurrentSourceId();
		//console.log(sourceid);

		console.log(`Delete keypress detected : shard ${shardid} (source id : ${sourceid})`);

		if (confirm(`Really delete shard no. ${shardid}?!`) == true) {


			let deleteResponse = await api.deleteShard(sourceid, shardid);
			//console.log(deleteResponse)

			if(deleteResponse.ok)
				deleteShardcard(shardid);
			else
				console.log('Unable to delete shard');
				
		}

		

	}


}




function extractSourceIdFromCard(shardcardElement){

	
}


// PASTE
async function pasteDuringShardcardFocus(event){
	//console.log('pasteDuringShardcardFocus - ', event.target.childNodes);

	let shardid = event.target.id.match(/\d+$/g)[0];
	let sourceid = extractCurrentSourceId();


	// Disable paste when file is present!
	let regex = new RegExp(/[null]$/g);
	let result = regex.exec(document.getElementById('shardcard-filetype-' + shardid).textContent)
	
	if (result == null){
		console.log('This source already has a file. Returning.');
		return;
	}


	// https://stackoverflow.com/questions/3390396/how-can-i-check-for-undefined-in-javascript
	if(typeof event.clipboardData.files[0] !== 'undefined'){
		//console.log("File selected: ", event.clipboardData.files[0]);
		postFile(event.clipboardData.files[0], sourceid, shardid);
	}
	else if((event.clipboardData || window.clipboardData).getData("text") !== ''){
		//console.log((event.clipboardData || window.clipboardData).getData("text"));

		let clipboardText = (event.clipboardData || window.clipboardData).getData("text");
		let blob = new Blob([clipboardText], { type: 'text/plain' });
		 let file = new File([blob], "clipboard.txt", {type: "text/plain"});

		postFile(file, sourceid, shardid);
	}
	else {
		console.log('No file nor text detected.');
	}

	
}






async function postFile(selectedFile, sourceid, shardid){
	//console.log('postie pete');
	//console.log(selectedFile)

	let fileCategories = determineFileCategories(selectedFile);
	//console.log('Extracted file-type data: ', fileCategories);

	// await api.postSourceFile(extractCurrentSourceId(), selectedFile, fileCategories.fileType, fileCategories.fileEnding);

	await api.postShardFile(selectedFile, sourceid, shardid, fileCategories.fileType, fileCategories.fileEnding);



	//loadShardFile(shardid, sourceid);
	loadSource(extractCurrentSourceId());
	// loadSource(extractCurrentSourceId());
}





// BELOW IS DEAD







// https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event
function pasteOnViewcard(event) {

	
	// Disable paste when file is present!
	if (+document.getElementById('sourceview-hasfile-field').value == 1){
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
	getShardcard,

	// // headerbar
	// enablePostButton,
	// disablePostButton,

	// // fileviewer
	// displaySourceFile,
	// removeCurrentFileFromDOM,
	// pasteOnViewcard
}


