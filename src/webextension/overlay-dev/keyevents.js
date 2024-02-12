



// VARS
let waitingSecondShift = 0;
let waitingSecondCtrlShift = 0;


function addExtensionActiveEventListener() {

	document.addEventListener('copy', copyEvent)
	document.addEventListener('cut', cutEvent)
	document.addEventListener('paste', pasteEvent)
	document.addEventListener('keydown', keydownActiveExtension)

	console.log('event listerners for active extension added')
}

function removeExtensionActiveEventListener() {

	document.removeEventListener('copy', copyEvent)
	document.removeEventListener('cut', cutEvent)
	document.removeEventListener('paste', pasteEvent)
	document.removeEventListener('keydown', keydownActiveExtension)

	console.log('event listerners for active extension removed')
}








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

function pasteEvent(event) {
	// console.log('pastepaste')
	console.log('PASTE EVENT')
	console.log(event.clipboardData.files[0])
	// let pastedData = event.clipboardData.getData('Text');
	// console.log(pastedData)


}
// const paspas = new ClipboardEvent('paste');
// document.dispatchEvent(paspas);



function cutEvent(event) {
	console.log('CUT EVENT')
}





// document.execCommand('paste')


async function keydownActiveExtension(keyEvent) {



	if (document.activeElement.isContentEditable) {
		// console.log('EDITABLE')
		return;
	}


	if (keyEvent.key == 'Shift') {

		if (keyEvent.ctrlKey) {

			if (waitingSecondCtrlShift == 1) {

				console.log('ctrlshift ctrlshift')
				waitingSecondCtrlShift = 0;

			}
			else {
				waitingSecondCtrlShift = 1;
				setTimeout(() => { waitingSecondCtrlShift = 0 }, 300);
			}

		}
		else {

			if (waitingSecondShift == 1) {

				console.log('shiftshift')
				waitingSecondShift = 0;
				// showOverlay()

			}
			else {
				waitingSecondShift = 1;
				setTimeout(() => { waitingSecondShift = 0 }, 300);
			}


		}

	}


	if (keyEvent.ctrlKey) {

		switch (keyEvent.key) {
			case 'c':
				console.log('Ctrl + c')
				break;
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



	if (keyEvent.altKey) {

		switch (keyEvent.key) {
			case 'p':
				// console.log('Alt + p')
				console.log(extensionStateFront);
				break;
			case '[':
				console.log('Alt + [')
				break;
			case ']':
				console.log('Alt + ]')
				break;


			default:
				break;
		}
	}




}











