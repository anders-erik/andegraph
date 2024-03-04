

import * as api from '../../../../Fetches/api/api.js';
import { hasFile, extractCurrentSourceFileType, extractCurrentSourceId } from '../../../sourceview/propertiescard/PropertiesCard_Extract.js';
//import { getSourceviewHeaderbar } from './headerbar/shardcardHeaderbar.js';
import { newFileviewer, /* postFile,  displayShardFile, removeCurrentFileFromDOM */ } from './fileviewer/fileviewer.js';
import { deleteShardcard } from '../shardlist.js';

//import { determineFileCategories_ } from './fileviewer/fileviewer_utils.js';
import { determineFileCategories } from '../../../../filehandling/DetermineFileCategories.js';

import { loadShardFile } from './fileviewer/fileviewer.js';
import { loadSource } from '../../../sourceview/propertiescard/PropertiesCard_Update.js';

import { determineClipboardContentType } from '../../../../filehandling/DetermineClipboardContents.js';

import * as uuid from '../../../../utils/uuid.js';

import * as shardbar from '../../shardbar/shardbar.js';

import * as shardlist from '../shardlist.js';

let shardcardShortcutsString = '';

let shardcardInnerHtmlOnFocus = '';
let listeningDoubleClick = false;
let doubleClickNodeId = 0;

// PROBLEM!
// CANT PUT MENU INSIDE SHARDCARD BECAUS$E THAT INTEFERES WITH THE TEXTCONTENT!!!
function testFloatingMenu() {
	let floatmenu = document.createElement('div');
	floatmenu.textContent = 'floatfloat';
	floatmenu.style.position = 'absolute';

	return floatmenu;
}

function newShardcard(shard) {
	let shardcard = document.createElement('div');
	shardcard.id = 'shardcard-' + shard.id;
	shardcard.dataset.nodeId = shard.id;
	shardcard.classList.add('shardcard');
	shardcard.tabIndex = 0;




	// Append shard object to shardcard
	shardcard.shard = shard;

	// No file detected, so we load node.textContent
	if (shard.fileName == '') {

		insertShardcardTextContent(shardcard, shard.textContent);

		shardcard.contentEditable = false;

	}
	else {

		shardcard.appendChild(newFileviewer(shard));

	}


	// Event listeners that will add and remove keybindings when focusing/focusingout of shardcard
	shardcard.addEventListener('focus', focusShardcard);
	shardcard.addEventListener('focusout', focusoutShardcard);


	// DRAG AND DROP FILES
	// shardcard.addEventListener('dragenter', dragEnterViewcard);
	// shardcard.addEventListener('dragleave', dragLeaveViewcard);
	// shardcard.addEventListener('drop', dropOnViewcard);


	return shardcard;
}


function insertShardcardTextContent(shardcard, textStringInput) {

	// If WHOLE shard-textContent is empty
	if (textStringInput == '') {
		return;
	}

	shardcard.innerHTML = '';

	let textStringSpaces = textStringInput.replaceAll('\t', '\xa0\xa0\xa0\xa0');
	//console.log(JSON.stringify(textStringSpaces));


	let textArray = textStringSpaces.split('\n');
	//console.log(textArray);
	//let divString = textArray.join('<br>»');

	for (let i = 0; i < textArray.length; i++) {
		let p = document.createElement('p');
		p.classList.add('shard-p');
		// p.id = 'shard-p-' + shardcard.shard.id;
		p.dataset.nodeId = shardcard.shard.id;
		// https://stackoverflow.com/questions/75397803/chrome-skips-over-empty-paragraphs-of-contenteditable-parent-when-moving-cursor/75397804
		if (textArray[i] == '') {
			p.innerHTML = `<br>`;
		}
		else {
			p.textContent = textArray[i];
		}

		shardcard.appendChild(p)
	}

	//console.log(divString)

}

function extractShardcardTextContent(shardcard) {

	let stringArray = [];

	for (const child of shardcard.children) {
		//console.log(child.textContent);
		stringArray.push(child.textContent);
	}


	let storeString = stringArray.join(`\n`);

	//console.log('raw extracted: ', JSON.stringify(rawExtractedText));
	return storeString;
}





function focusShardcard(event) {
	//console.log('focus')

	event.target.addEventListener('keydown', keydownDuringShardcardFocus);
	event.target.addEventListener('paste', pasteDuringShardcardFocus);
	event.target.addEventListener('click', clickDuringShardcardFocus);

	shardbar.updateNodeInfoDropdown(event.target.shard);


	//let shardTop = event.target.offsetTop;
	//console.log(shardTop)
	let miniMenu = document.getElementById('shard-mini-menu');
	miniMenu.style.top = event.target.offsetTop + 'px';
	miniMenu.style.display = 'flex';


	shardcardInnerHtmlOnFocus = event.target.innerHTML;
}

async function focusoutShardcard(event) {

	let nodeId = event.target.dataset.nodeId;
	let shardcard = document.getElementById('shardcard-' + nodeId);

	shardcardShortcutsString = '';

	event.target.removeEventListener('keydown', keydownDuringShardcardFocus);
	event.target.removeEventListener('paste', pasteDuringShardcardFocus);
	event.target.removeEventListener('click', clickDuringShardcardFocus);

	let miniMenu = document.getElementById('shard-mini-menu');
	miniMenu.style.display = 'none';

	//if(shardcard.shard.fileName === '')

	// convert to text type (2024-01-19 - AE)
	/* if(event.target.textContent != ''){
			event.target.shard.textContent = extractShardcardTextContent(event.target);
			event.target.shard.elementType = 'text';
			console.log(JSON.stringify(event.target.shard.textContent))
			await api.putNode([event.target.shard]);
	} */

	shardcard.contentEditable = false;
	shardcard.classList.remove('shardcard-editing');

	updateShardcardTextContent(shardcard);




}

async function updateShardcardTextContent(shardcard) {

	let hasTextContent = shardcard.textContent != '';
	let isTextContentShard = shardcard.shard.elementType === 'text';
	let isFileNode = shardcard.shard.fileName !== '';


	if (!isFileNode) {

		if (shardcard.innerHTML == '' || (shardcard.childElementCount == 1 && shardcard.textContent == '')) {
			shardcard.innerHTML = '';
			shardcard.shard.elementType = '';
		}

		// update InnerHTML if changed
		if (shardcard.innerHTML != shardcardInnerHtmlOnFocus) {

			shardcard.shard.textContent = extractShardcardTextContent(shardcard);
			shardcard.shard.elementType = 'text';
			console.log(JSON.stringify(shardcard.shard.textContent))
			await api.putNode([shardcard.shard]);

			let updatedNodeFromServer = await api.getNode(shardcard.shard.id);
			insertShardcardTextContent(shardcard, updatedNodeFromServer.textContent)
		}

	}
}



//function saveShard

async function keydownDuringShardcardFocus(event) {
	//console.log(event.target)
	//console.log('keykey' + event.key);
	let shardid = event.target.id.match(/\d+$/g)[0];
	let shardcard = document.getElementById('shardcard-' + shardid);


	if (event.target.contentEditable === 'true') {

		if (event.key == 'Escape') {

			updateShardcardTextContent(shardcard);

			shardcard.contentEditable = false;
			shardcard.classList.remove('shardcard-editing');

		}
		if (event.key == 'Backspace' && shardcard.textContent == '' && shardcard.childElementCount == 1) {
			// prevent deletion of the last 'p' element!
			// if the last one is deleted any new textContent is not extracted and saved!!
			console.log('dsds')
			event.preventDefault();
		}
		if (event.key == 'Tab') {
			event.preventDefault();
			window.getSelection().getRangeAt(0).insertNode(document.createTextNode(`\xa0\xa0\xa0\xa0`));
			// window.getSelection().getRangeAt(0)
			// window.getSelection().empty()
		}

	}
	else {

		//console.log(event.key)


		if (event.key === 'ArrowUp') {
			focusPreviousSibling(shardcard);
			event.preventDefault();
		}
		else if (event.key === 'ArrowDown') {
			focusNextSibling(shardcard);
			event.preventDefault();
		}
		// DELETE !
		else if (event.altKey && event.shiftKey && (event.key == 'D')) {

			//let shardid = event.target.id.match(/\d+$/g)[0];
			//console.log(shardid);

			let sourceid = extractCurrentSourceId();
			//console.log(sourceid);

			console.log(`Delete keypress detected : shard ${shardid} (source id : ${sourceid})`);


			let isEmpty = (event.target.innerHTML === '');

			if (isEmpty || confirm(`Really delete shard no. ${shardid}?!`)) {


				//let deleteResponse = await api.deleteShard(sourceid, shardid);

				if (event.target.shard.fileName != '') {
					await api.deleteFile(event.target.shard.fileName);
				}


				let deleteResponse = await api.deleteNode(shardid);
				//console.log(deleteResponse)

				if (deleteResponse.ok) {
					focusNextSibling(shardcard);
					deleteShardcard(shardid);

				}
				else {
					console.log('Unable to delete shard');
				}


			}



		}
		else if (event.key == 'Enter') {
			//alert('enter on ' + event.target.id)
			if (event.target.shard.fileName == '') {

				if (event.target.contentEditable === 'false') {

					event.preventDefault();

					//console.log('enabling editable')
					event.target.contentEditable = true;
					event.target.classList.add('shardcard-editing');


					if (event.target.textContent == '') {

						event.target.innerHTML = `<p id='shard-p-${event.target.shard.id}' class='shard-p'></p>`

						// move the curesor/caret to the new, empty paragraph element
						// If this is not done the users input will end up in the wrapping instead
						// 
						let emptyP = document.getElementById(`shard-p-${event.target.shard.id}`);
						let range = document.createRange();
						range.setStart(emptyP, 0);
						range.collapse(true);
						let sel = window.getSelection();
						sel.removeAllRanges();
						sel.addRange(range);
						console.log();
					}



				}
				else {
					//let elementText = event.target.textContent;

					// https://stackoverflow.com/questions/3972014/get-contenteditable-caret-position
					let caretIndex = window.getSelection().focusOffset;
					//console.log(elementText.slice(0, caretIndex) + '<br>' + elementText.slice(caretIndex))

					//window.getSelection().getRangeAt(0).insertNode(document.createElement("br"))
					//window.getSelection().getRangeAt(0).insertNode(document.createTextNode('»'))

					//event.preventDefault();
				}

			}

		}


		// KEYBOARD COMMAND BUILDER
		if (event.key === 'Escape') {
			// CLEAR KEYBOARD COMMAND BUILDING
			shardcardShortcutsString = '';
		}
		else {

			// KEYBOARD COMMAND BUILDING USING SINGLE LETTERS
			// If other than single letters are entered, then they will be cleared during detection below due to too many characters
			shardcardShortcutsString += event.key;
		}


		// KEYBOARD COMMAND BUILDING DETECTION
		if (shardcardShortcutsString != '' && shardcardShortcutsString.length <= 3) console.log(shardcardShortcutsString);
		switch (shardcardShortcutsString) {
			case 'i': console.log(event.target.id); shardcardShortcutsString = ''; break;
			case 'o': console.log(event.target.shard); shardcardShortcutsString = ''; break;
			case 'ncj': console.log('new javascript code!'); shardcardShortcutsString = ''; break;

			default:
				if (shardcardShortcutsString.length > 2) {
					shardcardShortcutsString = '';
				}

				break;
		}



	}

}

function focusNextSibling(shardcard) {
	let nextSibling = shardcard.nextElementSibling;
	if (nextSibling != null) {
		nextSibling.focus();
	}
}
function focusPreviousSibling(shardcard) {
	let previousSibling = shardcard.previousElementSibling;
	if (previousSibling != null) {
		previousSibling.focus();
	}
}


function clickDuringShardcardFocus(event) {

	let shardid = event.target.dataset.nodeId;
	let shardcard = document.getElementById('shardcard-' + shardid);


	//console.log('click')
	if (shardcard.shard.fileName != '') {
		listeningDoubleClick = false;
	}
	else if (!listeningDoubleClick) {


		listeningDoubleClick = true;
		doubleClickNodeId = event.target.dataset.nodeId;

		setTimeout(() => {
			listeningDoubleClick = false;
			//console.log('stop listening')
		}, 300);

	}
	else if (listeningDoubleClick && doubleClickNodeId == event.target.dataset.nodeId) {
		//console.log('double click!')

		//let shardid = event.target.id.match(/\d+$/g)[0];

		//window.getSelection().empty();

		shardcard.contentEditable = true;
		shardcard.classList.add('shardcard-editing');

		if (shardcard.textContent == '') {
			shardcard.innerHTML = `<p id='shard-p-${shardid}' class='shard-p'></p>`
			// move the curesor/caret to the new, empty paragraph element
			// If this is not done the users input will end up in the wrapping instead
			// 
			let emptyP = document.getElementById(`shard-p-${event.target.shard.id}`);
			let range = document.createRange();
			range.setStart(emptyP, 0);
			range.collapse(true);
			let sel = window.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);
			console.log();
		}
	}



}


function extractSourceIdFromCard(shardcardElement) {


}

function editingShardcard(shardcard) {
	//console.log(document.activeElement)
	if (shardcard.contentEditable === 'true') {
		return true;
		//console.log('aaaa')
	}
	else {
		return false;
	}
	// else if (document.activeElement == shardcard){
	// 	//return 'focus';
	// 	console.log('bbbbb')
	// }

}


// PASTE
async function pasteDuringShardcardFocus(event) {


	//console.log(event.clipboardData.getData())

	//console.log('pasteDuringShardcardFocus - ', event.target.childNodes);

	//console.log('pasting to : ', event.target.id)

	/* if(event.target.textContent != ''){
		console.log('Cant post file to a shard with text!')
		return;
	} */

	//https://stackoverflow.com/questions/58980235/stop-pasting-html-style-in-a-contenteditable-div-only-paste-the-plain-text
	/* let isEditable = (event.target.contentEditable === 'true');
	if (isEditable) {
		console.log('editable')
		event.preventDefault()
		return;
	} */
	console.log('pasted to element id: ', event.target.id)



	//let shardid = event.target.id.match(/\d+$/g)[0];
	let shardid = event.target.dataset.nodeId;
	let shardcard = document.getElementById('shardcard-' + shardid);
	let shardObject = shardcard.shard;


	//let shardObject = event.target.shard;

	// console.log()
	// console.log('pasted to element-id: ', event.target.id)
	// console.log('pasted to shard-id: ', shardid)
	// console.log('shard object: ', shardObject)

	//let shardid = event.target.id.match(/\d+$/g)[0];
	//let shardObject = document.getElementById('shardcard-' + shardid).shard;

	// console.log(shardObject.fileName != '')
	// console.log(shardObject.textContent != '')
	// Prevent automatic pasting when editing shard-text
	//let pastingWhileEditing = false;
	/* if(event.target.id.substring(0, 7) === 'shard-p'){
		console.log('pasting when editing text');
		pastingWhileEditing = true;
		event.preventDefault();  
	} */



	/* if ( (shardObject.fileName != '') || (shardObject.textContent != '')){
		console.log('This source already has a file or textContent. Returning.');
		return;
	} */


	let clipboardContentType = determineClipboardContentType(event.clipboardData);


	if (clipboardContentType === 'text') {
		console.log('add to textContent');

		let clipboardText = (event.clipboardData || window.clipboardData).getData("text");


		if (shardcard.contentEditable === 'true') {
			document.execCommand("insertHTML", false, clipboardText);
			event.preventDefault();
		}
		else if (shardObject.textContent == '' && shardObject.fileName == '') {
			insertShardcardTextContent(shardcard, clipboardText);
			//shardcard.shard.elementType = 'text';
			updateShardcardTextContent(shardcard);
		}
		else {
			console.log('This source already has content. Returning.');

		}



	}
	else if (clipboardContentType === 'file') {
		console.log('deal with file')

		let sourceid = extractCurrentSourceId();

		if (shardObject.fileName == '' && shardObject.textContent == '') {
			postFile(event.clipboardData.files[0], sourceid, shardid);
			console.log('nonono')
		}
		else {
			console.log('This source already has content. Returning.');
		}



	}

	//console.log();



}






async function postFile(selectedFile, sourceid, shardid) {
	//console.log('postie pete');
	//console.log(selectedFile)

	let fileCategories = determineFileCategories(selectedFile);
	console.log('Extracted file-type data: ', fileCategories);

	// await api.postSourceFile(extractCurrentSourceId(), selectedFile, fileCategories.fileType, fileCategories.fileEnding);

	let shardObject = document.getElementById('shardcard-' + shardid).shard;
	let fileUuid = uuid.generate('file');
	let fileName = fileUuid + '.' + fileCategories.fileEnding;

	shardObject.fileName = fileName;
	shardObject.fileExtension = fileCategories.fileEnding;
	shardObject.elementType = fileCategories.fileType;


	await api.postFile(selectedFile, fileName);

	await api.putNode([shardObject]);

	// TODO
	//await api.postShardFile(selectedFile, sourceid, shardid, fileCategories.fileType, fileCategories.fileEnding);


	//loadShardFile(shardid, sourceid);
	shardlist.loadShardsIntoShardlist(extractCurrentSourceId());
	// loadSource(extractCurrentSourceId());
}


















// BELOW IS DEAD







// https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event
function pasteOnViewcard(event) {


	// Disable paste when file is present!
	if (+document.getElementById('sourceview-hasfile-field').value == 1) {
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
		if (typeof event.clipboardData.files[0] !== 'undefined') {
			//console.log("File selected: ", event.clipboardData.files[0]);
			postFile(event.clipboardData.files[0]);
		}
		else if ((event.clipboardData || window.clipboardData).getData("text") !== '') {
			//console.log((event.clipboardData || window.clipboardData).getData("text"));
			let clipboardText = (event.clipboardData || window.clipboardData).getData("text");
			let blob = new Blob([clipboardText], { type: 'text/plain' });
			let file = new File([blob], "clipboard.txt", { type: "text/plain" });

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
function dragEnterViewcard(event) {
	console.log('drag enter viewcard');
	document.getElementById('sourceview-viewcard').classList.add('shadow-all');

	//event.target.classList.add('shadow-all');
	event.preventDefault();
}
function dragLeaveViewcard(event) {
	console.log('Left viewcard');
	//event.target.classList.remove('shadow-all');
	document.getElementById('sourceview-viewcard').classList.remove('shadow-all');
	event.preventDefault();
}
function dropOnViewcard(event) {

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
	newShardcard,

	// // headerbar
	// enablePostButton,
	// disablePostButton,

	// // fileviewer
	// displaySourceFile,
	// removeCurrentFileFromDOM,
	// pasteOnViewcard
}


