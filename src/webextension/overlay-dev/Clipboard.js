

let clipboardInner;

let clipboardCodeCheckbox;
let clipboardCodeSelect;

let clipboardConcatContents;


function initClipboard() {
	clipboardConcatContents = document.getElementById('ae-clipboardConcatContent');
	clipboardInner = document.getElementById('ae-clipboardInner');
	clipboardCodeCheckbox = document.getElementById('ae-clipboardCodeCheckbox');
	clipboardCodeSelect = document.getElementById('ae-clipboardCodeSelect');

	clipboardCodeCheckbox.addEventListener('click', toggleSelectCode);

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
	writeStateFromFront();
	// document.getElementById('ae-clipboardContainer').classList.remove('ae-displayNone');
	clipboardInner.classList.add('ae-activeClipboard');
	console.log('start text concatentation capture');

}

function addSpaceCharacterToCaptureConcatenationContents() {
	console.log('added new space')
	if (extensionStateFront.textConcatenationCapturing) {
		extensionStateFront.textConcatenationContent += ' ';
		writeStateFromFront();
	}

}

function addNewLineToCaptureConcatenationContents() {
	console.log('added new line')
	if (extensionStateFront.textConcatenationCapturing) {
		extensionStateFront.textConcatenationContent += '\n';
		writeStateFromFront();
	}

}

function stopClipboardTextConcatenation() {



	extensionStateFront.textConcatenationCapturing = false;
	extensionStateFront.textConcatenationContent = '';
	writeTextConcatenationContentToDom();
	clipboardInner.classList.remove('ae-activeClipboard');
	writeStateFromFront();

}






/* 

	CLIPBOARD EVENTS

*/

function toggleSelectCode() {
	if (clipboardCodeCheckbox.checked) {
		clipboardCodeSelect.disabled = false;
	}
	else {
		clipboardCodeSelect.disabled = true;
	}

}

function pasteEvent(event) {
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

			writeStateFromFront();
			// console.log(extensionStateFront.textConcatenationContent);

		}
		else {
			console.log('PASTE TO NEW SHARD')

			// console.log(clipboardCodeCheckbox.checked)

			if (clipboardCodeCheckbox.checked) {
				postNewCodeObjectToCurrentSourceAndFullReloadOfSourceChildren(clipboardCodeSelect.value, clipboardText)
			}
			else {
				postNewTextNodeToCurrentSourceAndFullReloadOfSourceChildren(clipboardText);
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


		let fileCategoryObject = determineFileCategories(event.clipboardData.files[0]);
		console.log(fileCategoryObject)

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

	CLIPBOARD FETCH

*/


async function postNewTextNodeToCurrentSourceAndFullReloadOfSourceChildren(TextContent) {

	console.log(extensionStateFront.current_sourceObject.Uuid)

	// Content_InsertChildUuidTable(Uuid, childTable)
	if (extensionStateFront.current_sourceObject.Uuid !== undefined) {

		let newTextObject = (await dbisWe.Content_InsertChildUuidTable(extensionStateFront.current_sourceObject.Uuid, 'Text')).Content;

		// console.log(newTextObject)

		newTextObject.Title = TextContent.substring(0, 25);
		newTextObject.TextContent = TextContent;


		await dbisWe.Content_UpdateOnContentObject(newTextObject);

		await fetchCurrentSourceChildrenThenWriteToStates();

		populateSourceChildTableFromState();

	}

}

async function postNewCodeObjectToCurrentSourceAndFullReloadOfSourceChildren(Type, CodeContent) {

	console.log(extensionStateFront.current_sourceObject.Uuid)

	// Content_InsertChildUuidTable(Uuid, childTable)
	if (extensionStateFront.current_sourceObject.Uuid !== undefined) {

		let newCodeObject = (await dbisWe.Content_InsertChildUuidTable(extensionStateFront.current_sourceObject.Uuid, 'Code')).Content;

		// console.log(newTextObject)

		newCodeObject.Title = CodeContent.substring(0, 25);
		newCodeObject.Type = Type;
		newCodeObject.CodeContent = CodeContent;


		await dbisWe.Content_UpdateOnContentObject(newCodeObject);

		await fetchCurrentSourceChildrenThenWriteToStates();

		populateSourceChildTableFromState();

	}

}


// The Annunciation is an oil painting by the Early Netherlandish painter Hans Memling.It depicts the Annunciation, the archangel Gabriel's announcement to the Virgin Mary that she would conceive and become the mother of Jesus, described in the Gospel of Luke. 
