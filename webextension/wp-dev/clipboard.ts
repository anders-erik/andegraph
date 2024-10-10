import * as fetcher from "./fetcher";
import * as source from "./source/source";
import * as project from "./projects/projects";
import { age_dbis } from "./dbi-send";

let sidePanel: Element;


let clipboardContainer: Element;
let clipboardCss: HTMLElement;


// VARS
let waitingSecondShift = 0;
let waitingSecondCtrlShift = 0;


let clipboardInner : HTMLElement;
let clipboardCodeCheckbox : HTMLInputElement;
let clipboardTextTypeInput : HTMLInputElement;

let clipboardConcatContents : HTMLElement;
let textConcatenationCapturing : boolean = false;
let textConcatenationContent : string = "";




export function initClipboard(_sidePanel: Element) {
	// clipboardCodeCheckbox.addEventListener('change', toggleSelectCode);

	// writeTextConcatenationContentToDom();

	// if (extensionStateFront.textConcatenationCapturing) {
	// 	clipboardInner.classList.add('age_activeClipboard');
	// }
	// else {
	// 	clipboardInner.classList.remove('age_activeClipboard');
	// }

	/* 
	
			NEW NEW NEW - 2024-10-02
	
	*/

	sidePanel = _sidePanel;

	clipboardContainer = document.createElement('div');
	clipboardContainer.id = "age_clipboardContainer";
	clipboardContainer.classList.add("age_panelContainer", "collapsed");



	document.addEventListener('copy', copyEvent)
	document.addEventListener('cut', cutEvent)
	document.addEventListener('paste', pasteEvent)
	document.addEventListener('keydown', keydownActiveExtension)


	fetcher.fetchHtml("clipboard.html")
		.then(html => {
			clipboardContainer.innerHTML = html;


			clipboardInner = clipboardContainer.querySelector("#age_clipboardInner");
			clipboardCodeCheckbox = clipboardContainer.querySelector("#age_clipboardCodeCheckbox");
			clipboardTextTypeInput = clipboardContainer.querySelector("#age_clipboardTextTypeInput");
			clipboardConcatContents = clipboardContainer.querySelector("#age_clipboardConcatContent");
		})

	clipboardCss = document.createElement("style");
	clipboardCss.id = "age_clipboardStyle";
	fetcher.fetchCss("clipboard.css")
		.then(css => {
			clipboardCss.innerText = css;
		})

	// console.log("sidePanel.id = ", sidePanel.id)

	sidePanel.append(clipboardContainer);

 

}




/* 

	CLIPBOARD FUNCTIONS

*/


function writeTextConcatenationContentToDom() {

	let clipboardString = textConcatenationContent;
	let clipboardInnerHtml = '<div>' + clipboardString.replace(/\n/g, '<br>') + '</div>';
	document.getElementById('age_clipboardConcatContent').innerHTML = clipboardInnerHtml;

}



function startClipboardTextConcatenation() {

	textConcatenationCapturing = true;
	// extensionStateFront.textConcatenationContent = '';
	// writeTextConcatenationContentToDom();
	//writeStateFromFront();
	// document.getElementById('age_clipboardContainer').classList.remove('age_displayNone');
	clipboardInner.classList.add('age_activeClipboard');
	console.log('start text concatentation capture');

}

function addSpaceCharacterToCaptureConcatenationContents() {
	console.log('added new space')
	if (textConcatenationCapturing) {
		textConcatenationContent += ' ';
		//writeStateFromFront();
	}

}

function addNewLineToCaptureConcatenationContents() {
	console.log('added new line')
	if (textConcatenationCapturing) {
		textConcatenationContent += '\n';
		//writeStateFromFront();
	}

}

function stopClipboardTextConcatenation() {



	textConcatenationCapturing = false;
	textConcatenationContent = '';
	writeTextConcatenationContentToDom();
	clipboardInner.classList.remove('age_activeClipboard');
	//writeStateFromFront();

}






/* 

	CLIPBOARD EVENTS

*/

// function toggleSelectCode() {
// 	if (clipboardCodeCheckbox.checked) {
// 		clipboardTextTypeInput.disabled = false;
// 	}
// 	else {
// 		clipboardTextTypeInput.disabled = true;
// 	}

// }

async function pasteEvent(event : ClipboardEvent) {
	// console.log('pastepaste')
	console.log('PASTE EVENT')
	// console.log(event.clipboardData.files[0])


	let activeElement = document.activeElement as HTMLElement;
	if (activeElement.isContentEditable) {
		// console.log("ContentEditable. No new shard!")
		return;
	}


	let clipboardContentType = determineClipboardContentType(event.clipboardData);


	if (clipboardContentType === 'text') {
		console.log('deal with text'); 

		let clipboardText = (event.clipboardData /* || window.clipboardData */).getData("text");
		console.log('clipboardText = ', clipboardText);
		

		if (textConcatenationCapturing) {

			textConcatenationContent += clipboardText;

			writeTextConcatenationContentToDom()

			//writeStateFromFront();
			// console.log(extensionStateFront.textConcatenationContent);

		}
		else {
			console.log('PASTE TO NEW SHARD')

			// console.log(clipboardCodeCheckbox.checked)

			if (clipboardCodeCheckbox.checked) {
				postNewCodeObjectToCurrentSourceAndFullReloadOfSourceChildren(clipboardTextTypeInput.value, clipboardText)
			}
			else {
				postNewTextNodeToCurrentSourceAndFullReloadOfSourceChildren(clipboardTextTypeInput.value, clipboardText);
			}

		}

		// if (shardcard.contentEditable === 'true') {
		// 	document.execCommand("insertHTML", false, clipboardText);
		// 	event.preventDefault();
		// }
		// else if (shardObject.textContent == '' && shardObject.fileName == '') {
		// 	insertShardcardTextContent(shardcard, clipboardText);
		// 	//shardcard.shard.elementType = 'text';
		// 	updateShardcardTextContent(shardcard);
		// }
		// else {
		// 	console.log('This source already has content. Returning.');

		// }



	}
	else if (clipboardContentType === 'file') {
		console.log('deal with file')

		let newFile = event.clipboardData.files[0];

		let fileCategoryObject = determineFileCategories(newFile);
		console.log('fileCategoryObject: ', fileCategoryObject)

		if (fileCategoryObject.fileType === 'typetype') {
			console.error('FILE EXTENSION HAD NO MATCHING CONTENT TYPE')
			return;
		}

		let postFileQueryParameters = {
			Type: fileCategoryObject.fileType,
			Title: "",
			Extension: fileCategoryObject.fileExtension,
			IAmAuthor: 0,
		}

		postNewFileToCurrentSourceAndFullReloadOfSourceChildren(newFile, postFileQueryParameters, fileCategoryObject.mimeType);

		// console.log(newFile)

		// console.log(await age_dbisWe.fileGet(121627279360));

		// let sourceid = extractCurrentSourceId();

		// if (shardObject.fileName == '' && shardObject.textContent == '') {
		// 	postFile(event.clipboardData.files[0], sourceid, shardid);
		// 	console.log('nonono')
		// }
		// else {
		// 	console.log('This source already has content. Returning.');
		// }



	}



}
// const paspas = new ClipboardEvent('paste');
// document.dispatchEvent(paspas);





function copyEvent(event : ClipboardEvent) {

	// console.log('copcop')
	// console.log(event.clipboardData )
	// let cbd = event.clipboardData || window.clipboardData
	// let copiedData = cbd.getData('Text');
	// console.log('copiedData', copiedData)

	// browser.runtime.sendMessage( {
	// 	command: "copycopy"
	// });

	console.log('COPYEVENT')


	// navigator.clipboard
	// 	.read()
	// 	.then(
	// 		(clipText) => (console.log(clipText)),
	// 	);

}




function cutEvent(event : KeyboardEvent) {
	console.log('CUT EVENT')
}



/* 

	HELPER FUNCTIONS

*/




let determineClipboardContentType = function (eventClipboardData : any) {

	if (typeof eventClipboardData.files[0] !== 'undefined') {
		// postFile(dataClipboardEvent.files[0], sourceid, shardid);
		return 'file';
	}
	else if ((eventClipboardData /* || window.clipboardData */).getData("text") !== '') {
		//console.log((event.clipboardData || window.clipboardData).getData("text"));

		let clipboardText = (eventClipboardData /* || window.clipboardData */).getData("text");
		let blob = new Blob([clipboardText], { type: 'text/plain' });
		let file = new File([blob], "clipboard.txt", { type: "text/plain" });

		//postFile(file, sourceid, shardid);
		return 'text';
	}
	else {
		console.log('No file nor text detected.');
		return 'empty';
	}

	//return 'clipboardContentType';
}





let extensionObject : any = {
	// https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
	image: ['apng', 'avif', 'gif', 'bmp', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp'],
	// https://www.canto.com/blog/audio-file-types/
	audio: ['m4a', 'flac', 'mp3', 'wav', 'wma', 'aac'],
	// https://www.adobe.com/creativecloud/video/discover/best-video-format.html
	video: ['mp4', 'mov', 'wmv', 'avi', 'AVCHD', 'flv', 'f4v', 'swf', 'mkv', 'webm', 'mpg'],
	pdf: ['pdf'],
	data: ['json', 'csv', 'tsv', 'db', 'xlsx', 'ods', 'odb'],
	// Textarea extension
	text: ['txt', 'md'],
	code: ['js', 'ts', 'css', 'html', 'cs'],
}



function determineFileCategories(selectedFile : any) : any {

	let selectedFileType: string = selectedFile.type;
	let fileCategories = {
		mimeType: selectedFileType,
		baseFileName: 'basename',
		fileExtension: 'extext',
		fileType: 'typetype'
	}



	fileCategories.fileExtension = determineFileExtension(selectedFile);
	fileCategories.baseFileName = determineBaseFileName(selectedFile);

	// fileCategories.fileType = determineFileType(fileCategories.mimeType, fileCategories.fileEnding);

	// fileCategories.fileType = Object.entries(extensionObject).forEach(typeArray => typeArray.filter(extension => extension === fileCategories.fileExtension))
	fileCategories.fileType = Object.keys(extensionObject).find(type => extensionObject[type].includes(fileCategories.fileExtension));
	// console.log(fileCategories.fileType)
	//console.log('file type determined here!');
	// if (fileCategories.fileExtension === 'db') {
	// 	// http://fileformats.archiveteam.org/wiki/DB_(SQLite)
	// 	fileCategories.mimeType = 'application/vnd.sqlite3';
	// }
	console.log(fileCategories.mimeType)
	if (fileCategories.mimeType == '') {
		// fileCategories.mimeType == 'application/stream';
		fileCategories.mimeType = 'application/octet-stream';
	}

	return fileCategories;
}




function determineFileExtension(selectedFile : File) {

	return selectedFile.name.match(/\w+$/g)[0];

}

function determineBaseFileName(selectedFile: File) {

	return selectedFile.name.match(/^.*(?=\.[^.]+$)/)[0];

}













/* 

	CLIPBOARD FETCH

*/


async function postNewTextNodeToCurrentSourceAndFullReloadOfSourceChildren(textType : string, TextContent : string) {

	let sourceObject: any = source.getCurrentSourceObject();
	if(sourceObject == undefined){
		console.warn("Unable to post new text object. No selected sourceObject.")
		return;
	}
	
	// let sourceUuid = sourceObject.Uuid;
	// let sourceUuid = source.getCurrentSourceUuid();

	// let sourceObject: any = source.currentSourceObject;
	let sourceUuid = sourceObject.Uuid;

	// console.log('postNewTextNodeToCurrentSourceAndFullReloadOfSourceChildren()');
	// console.log('sourceUuid = ', sourceUuid);
	
	

	// Content_InsertChildUuidTable(Uuid, childTable)
	if (sourceUuid !== undefined) {

		// let newTextObject = (await age_dbisWe.Content_InsertChildUuidTable(extensionStateFront.current_sourceObject.Uuid, 'Text')).Content;
		let newTextContentObject = (await age_dbis.ContentEdge_InsertAdjacentToUuidIntoTable(sourceUuid, 1, 'Text', '', '', '/')).content;

		// console.log(newTextObject)

		newTextContentObject.Title = TextContent.substring(0, 25);
		newTextContentObject.TextContent = TextContent;
		newTextContentObject.Type = textType;


		await age_dbis.Content_UpdateWithContentObject(newTextContentObject);
		
		// TODO 
		// UPDATE SOURCE PANEL x3 
		// await fetchCurrentSourceChildrenThenWriteToStates();
		// populateSourceChildTableFromState();
		await source.loadWithContentObject(sourceObject);
		source.focusOnLastChildRowTitle();

		// setTimeout(() => {
		// }, 100);

	}

}

async function postNewCodeObjectToCurrentSourceAndFullReloadOfSourceChildren(Type: string, CodeContent: string) {

	let sourceObject: any = source.getCurrentSourceObject();
	let sourceUuid = sourceObject.Uuid;

	if (sourceObject == undefined) {
		console.warn("Unable to post new code object. No selected sourceObject.")
		return;
	}

	// Content_InsertChildUuidTable(Uuid, childTable)
	if (sourceUuid !== undefined) {

		// let newCodeObject = (await age_dbisWe.Content_InsertChildUuidTable(extensionStateFront.current_sourceObject.Uuid, 'Code')).Content;
		let newCodeContentObject = (await age_dbis.ContentEdge_InsertAdjacentToUuidIntoTable(sourceUuid, 1, 'Code', '', '', '/')).content;

		// console.log(newTextObject)

		newCodeContentObject.Title = CodeContent.substring(0, 25);
		newCodeContentObject.Type = Type;
		newCodeContentObject.CodeContent = CodeContent;


		await age_dbis.Content_UpdateWithContentObject(newCodeContentObject);


		await source.loadWithContentObject(sourceObject);
		source.focusOnLastChildRowTitle();
	}

}

async function postNewFileToCurrentSourceAndFullReloadOfSourceChildren(file : File , queryParams : any , mimeType : string) {

	let sourceObject: any = source.getCurrentSourceObject();
	let sourceUuid = sourceObject.Uuid;

	if (sourceObject == undefined) {
		console.warn("Unable to post new file. No selected sourceObject.")
		return;
	}

	// console.log(sourceUuid)

	// Content_InsertChildUuidTable(Uuid, childTable)
	if (sourceUuid !== undefined) {

		// let newFileObject = (await age_dbisWe.Content_InsertChildUuidTable(sourceUuid, 'File')).Content;
		let newFileContentObject = (await age_dbis.ContentEdge_InsertAdjacentToUuidIntoTable(sourceUuid, 1, 'File', '', '', '/')).content;

		// console.log(newTextObject)

		// newFileObject.Title = CodeContent.substring(0, 25);
		// newFileObject.Type = Type;
		// newFileObject.CodeContent = CodeContent;


		// await age_dbisWe.Content_UpdateOnContentObject(newFileObject);
		// await age_dbisWe.filePost(newFileContentObject.Uuid, file, queryParams, mimeType);
		await age_dbis.Post_File(newFileContentObject.Uuid, file, queryParams, mimeType);


		// TODO UPDATE USING NEW STRUCTURE
		// await fetchCurrentSourceChildrenThenWriteToStates();
		// populateSourceChildTableFromState();
		await source.loadWithContentObject(sourceObject);
		source.focusOnLastChildRowTitle();

		// Focus last row title for easy editing!
		// let _tbody = document.getElementById('age_sourceChildTable-tbody');
		/* _tbody.lastElementChild.lastElementChild.focus(); */

	}
	else {
		console.log('No slected source. Couldn"t POST file.')
	}

}


async function keydownActiveExtension(keyEvent : KeyboardEvent) {

	let activeElement = document.activeElement as HTMLElement;

	if (activeElement.isContentEditable) {
		// console.log('EDITABLE')
		return;
	}

	if (keyEvent.key === 'Escape') {
		stopClipboardTextConcatenation();
		document.getElementById("age_clipboardContainer").classList.add("collapsed");
	}


	// document.addEventListener("keydown", (event) => { console.log(event.code) }) 
	if (keyEvent.altKey) {

		// Switched to .code to enable extension on swedish keyboard
		switch (keyEvent.code) {
			case "KeyP": // 'p' = prints the current project object
				// NOT WORKING YET! UNABLE TO GET THE TYPING CORRECT

				// console.log("textConcatenationContent = ", textConcatenationContent);
				// let projectObject = document.getElementById("age_projectPropertiesTable");
				// console.log('projectObject = ', projectObject);

				
				break;

			case "KeyR": // 'r' = refresh project data
				project.reloadCurrentProject();
				break;

			case "KeyN": // 'n' = new source
				project.insertNewSourceToActiveProject();
				break;

			case "KeyM": // 'm' = move
				project.toggleExtensionLocation();
				break;

			case "Slash": // '/' = go to search
				document.getElementById("age_projectSearchButton").click()
				document.getElementById("age_projectSearchInput").focus();
				break;

			case "KeyX": // 'x' = toggle text/code
				// console.log('Alt + x')
				let checked = clipboardCodeCheckbox.checked;
				if (checked) {
					clipboardCodeCheckbox.checked = false;
				}
				else {
					clipboardCodeCheckbox.checked = true;
				}
				toggleSelectCode();
				break;

			case "BracketLeft": // '[' = start text capturing
				// console.log('Alt + [')
				startClipboardTextConcatenation();
				document.getElementById("age_clipboardContainer").classList.remove("collapsed");
				break;
 
			case "Enter": // 'Enter' = add new line
				// console.log('Alt + Enter')
				addNewLineToCaptureConcatenationContents()
				break;

			case "Minus": // '-' = add new space
				// console.log('Alt + Enter')
				addSpaceCharacterToCaptureConcatenationContents(); 
				break;

			case "BracketRight": // ']' = stop conactenating and send to backend
				// console.log('Alt + ]')

				if (clipboardCodeCheckbox.checked) {
					await postNewCodeObjectToCurrentSourceAndFullReloadOfSourceChildren(clipboardTextTypeInput.value, textConcatenationContent)
				}
				else {
					await postNewTextNodeToCurrentSourceAndFullReloadOfSourceChildren(clipboardTextTypeInput.value, textConcatenationContent);
				}

				document.getElementById("age_clipboardContainer").classList.add("collapsed"); 
				stopClipboardTextConcatenation();
				
				break;

			default:
				break;
		}
	}






	if (keyEvent.ctrlKey) {

		switch (keyEvent.key) {
			case '`':
				console.log('Ctrl + `')
				break;
			case '/':
				console.log('Ctrl + /')
				break;
			case '.':
				console.log('Ctrl + .')
				break;
			case ',':
				console.log('Ctrl + ,')
				break;
			case '\\':
				console.log('Ctrl + \\')
				break;
			case '\'':
				console.log('Ctrl + \'')
				break;

			case ';':
				console.log('Ctrl + ;')
				break;

			case '[':
				console.log('Ctrl + [')

				break;

			case ']':
				console.log('Ctrl + ]')
				break;

			default:
				break;
		}
	}



}

function toggleSelectCode() {
	if (clipboardCodeCheckbox.checked) {
		clipboardTextTypeInput.disabled = false;
	}
	else {
		clipboardTextTypeInput.disabled = true;
	}

}



// The Annunciation is an oil painting by the Early Netherlandish painter Hans Memling.It depicts the Annunciation, the archangel Gabriel's announcement to the Virgin Mary that she would conceive and become the mother of Jesus, described in the Gospel of Luke. 






export function appendCss(): void {
	document.head.append(clipboardCss);
}


export function removeCss(): void {
	clipboardCss.remove();
}