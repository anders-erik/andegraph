

let clipboardInner;

let clipboardCodeCheckbox;
let clipboardTextTypeInput;

let clipboardConcatContents;


function initClipboard() {
	clipboardConcatContents = document.getElementById('ae-clipboardConcatContent');
	clipboardInner = document.getElementById('ae-clipboardInner');
	clipboardCodeCheckbox = document.getElementById('ae-clipboardCodeCheckbox');
	clipboardTextTypeInput = document.getElementById('ae-clipboardTextTypeInput');

	// clipboardCodeCheckbox.addEventListener('change', toggleSelectCode);

	writeTextConcatenationContentToDom();

	if (extensionStateFront.textConcatenationCapturing) {
		clipboardInner.classList.add('ae-activeClipboard');
	}
	else {
		clipboardInner.classList.remove('ae-activeClipboard');
	}

}




/* 

	CLIPBOARD FUNCTIONS

*/


function writeTextConcatenationContentToDom() {

	let clipboardString = extensionStateFront.textConcatenationContent;
	let clipboardInnerHtml = '<div>' + clipboardString.replace(/\n/g, '<br>') + '</div>';
	document.getElementById('ae-clipboardConcatContent').innerHTML = clipboardInnerHtml;

}



function startClipboardTextConcatenation() {

	extensionStateFront.textConcatenationCapturing = true;
	// extensionStateFront.textConcatenationContent = '';
	// writeTextConcatenationContentToDom();
	//writeStateFromFront();
	// document.getElementById('ae-clipboardContainer').classList.remove('ae-displayNone');
	clipboardInner.classList.add('ae-activeClipboard');
	console.log('start text concatentation capture');

}

function addSpaceCharacterToCaptureConcatenationContents() {
	console.log('added new space')
	if (extensionStateFront.textConcatenationCapturing) {
		extensionStateFront.textConcatenationContent += ' ';
		//writeStateFromFront();
	}

}

function addNewLineToCaptureConcatenationContents() {
	console.log('added new line')
	if (extensionStateFront.textConcatenationCapturing) {
		extensionStateFront.textConcatenationContent += '\n';
		//writeStateFromFront();
	}

}

function stopClipboardTextConcatenation() {



	extensionStateFront.textConcatenationCapturing = false;
	extensionStateFront.textConcatenationContent = '';
	writeTextConcatenationContentToDom();
	clipboardInner.classList.remove('ae-activeClipboard');
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

async function pasteEvent(event) {
	// console.log('pastepaste')
	console.log('PASTE EVENT')
	// console.log(event.clipboardData.files[0])



	let clipboardContentType = determineClipboardContentType(event.clipboardData);


	if (clipboardContentType === 'text') {
		console.log('deal with text');

		let clipboardText = (event.clipboardData || window.clipboardData).getData("text");

		if (extensionStateFront.textConcatenationCapturing) {

			extensionStateFront.textConcatenationContent += clipboardText;

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
			Title: fileCategoryObject.baseFileName,
			Extension: fileCategoryObject.fileExtension,
			IAmAuthor: 0,
		}

		postNewFileToCurrentSourceAndFullReloadOfSourceChildren(newFile, postFileQueryParameters, fileCategoryObject.mimeType);

		// console.log(newFile)

		// console.log(await dbisWe.fileGet(121627279360));

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





function copyEvent(event) {

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




function cutEvent(event) {
	console.log('CUT EVENT')
}



/* 

	HELPER FUNCTIONS

*/




let determineClipboardContentType = function (eventClipboardData) {

	if (typeof eventClipboardData.files[0] !== 'undefined') {
		// postFile(dataClipboardEvent.files[0], sourceid, shardid);
		return 'file';
	}
	else if ((eventClipboardData || window.clipboardData).getData("text") !== '') {
		//console.log((event.clipboardData || window.clipboardData).getData("text"));

		let clipboardText = (eventClipboardData || window.clipboardData).getData("text");
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





let extensionObject = {
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



function determineFileCategories(selectedFile) {

	let fileCategories = {
		mimeType: selectedFile.type,
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




function determineFileExtension(selectedFile) {

	return selectedFile.name.match(/\w+$/g)[0];

}

function determineBaseFileName(selectedFile) {

	return selectedFile.name.match(/^.*(?=\.[^.]+$)/)[0];

}













/* 

	CLIPBOARD FETCH

*/


async function postNewTextNodeToCurrentSourceAndFullReloadOfSourceChildren(textType, TextContent) {

	console.log(extensionStateFront.current_sourceObject.Uuid)

	// Content_InsertChildUuidTable(Uuid, childTable)
	if (extensionStateFront.current_sourceObject.Uuid !== undefined) {

		// let newTextObject = (await dbisWe.Content_InsertChildUuidTable(extensionStateFront.current_sourceObject.Uuid, 'Text')).Content;
		let newTextContentObject = (await dbis.ContentEdge_InsertAdjacentToUuidIntoTable(extensionStateFront.current_sourceObject.Uuid, 1, 'Text', '', '', '/')).content;

		// console.log(newTextObject)

		newTextContentObject.Title = TextContent.substring(0, 25);
		newTextContentObject.TextContent = TextContent;
		newTextContentObject.Type = textType;


		// await dbisWe.Content_UpdateOnContentObject(newTextContentObject);
		await dbis.Content_UpdateWithContentObject(newTextContentObject);

		await fetchCurrentSourceChildrenThenWriteToStates();

		populateSourceChildTableFromState();

	}

}

async function postNewCodeObjectToCurrentSourceAndFullReloadOfSourceChildren(Type, CodeContent) {

	console.log(extensionStateFront.current_sourceObject.Uuid)

	// Content_InsertChildUuidTable(Uuid, childTable)
	if (extensionStateFront.current_sourceObject.Uuid !== undefined) {

		// let newCodeObject = (await dbisWe.Content_InsertChildUuidTable(extensionStateFront.current_sourceObject.Uuid, 'Code')).Content;
		let newCodeContentObject = (await dbis.ContentEdge_InsertAdjacentToUuidIntoTable(extensionStateFront.current_sourceObject.Uuid, 1, 'Code', '', '', '/')).content;

		// console.log(newTextObject)

		newCodeContentObject.Title = CodeContent.substring(0, 25);
		newCodeContentObject.Type = Type;
		newCodeContentObject.CodeContent = CodeContent;


		// await dbisWe.Content_UpdateOnContentObject(newCodeContentObject);
		await dbis.Content_UpdateWithContentObject(newCodeContentObject);

		await fetchCurrentSourceChildrenThenWriteToStates();

		populateSourceChildTableFromState();

	}

}

async function postNewFileToCurrentSourceAndFullReloadOfSourceChildren(file, queryParams, mimeType) {

	let sourceUuid = extensionStateFront.current_sourceObject.Uuid;

	console.log(sourceUuid)

	// Content_InsertChildUuidTable(Uuid, childTable)
	if (sourceUuid !== undefined) {

		// let newFileObject = (await dbisWe.Content_InsertChildUuidTable(sourceUuid, 'File')).Content;
		let newFileContentObject = (await dbis.ContentEdge_InsertAdjacentToUuidIntoTable(sourceUuid, 1, 'File', '', '', '/')).content;

		// console.log(newTextObject)

		// newFileObject.Title = CodeContent.substring(0, 25);
		// newFileObject.Type = Type;
		// newFileObject.CodeContent = CodeContent;


		// await dbisWe.Content_UpdateOnContentObject(newFileObject);
		// await dbisWe.filePost(newFileContentObject.Uuid, file, queryParams, mimeType);
		await dbis.Post_File(newFileContentObject.Uuid, file, queryParams, mimeType);



		await fetchCurrentSourceChildrenThenWriteToStates();

		populateSourceChildTableFromState();

	}
	else {
		console.log('No slected source. Couldn"t POST file.')
	}

}


// The Annunciation is an oil painting by the Early Netherlandish painter Hans Memling.It depicts the Annunciation, the archangel Gabriel's announcement to the Virgin Mary that she would conceive and become the mother of Jesus, described in the Gospel of Luke. 
