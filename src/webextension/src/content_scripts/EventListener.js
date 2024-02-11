
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




const copcop = new ClipboardEvent('copy');
document.dispatchEvent(copcop);







// window.clipboardData.getData('Text')
// navigator.clipboard
// 		.read()
// 		.then(
// 			(clipText) => {
// 				console.log(clipText[0])
// 			} //(console.log('AAAAAAAAAAAAAA', clipText[0])),
// 		);

async function getClipboardContents() {
	const clipboardItems = await navigator.clipboard.read();

	// console.log('OOOOOOOOOOOOOOOOO', clipboardItems[0].types)

	// console.log(22222222)
	for (const clipboardItem of clipboardItems) {

		// console.log(33333333)
		// const blob = await clipboardItem.getType(clipboardItem);
		// console.log(clipboardItem.types[0])

		for (const type of clipboardItem.types) {

			// console.log(444444)
			const blob = await clipboardItem.getType(type);
			// we can now use blob here
			console.log('BLOB : ', blob)


			// blob.text().then((textt) => {
			// 	console.log('Blob text: ', textt)
			// })

			// console.log(555555)
		}
	}
}
// console.log(1111111111)
// getClipboardContents();


function copyEvent(event) {

	// console.log('copcop')
	// console.log(event.clipboardData )
	// let cbd = event.clipboardData || window.clipboardData
	// let copiedData = cbd.getData('Text');
	// console.log('copiedData', copiedData)

	// browser.runtime.sendMessage( {
	// 	command: "copycopy"
	// });

	console.log('CCCCCCCCCCCCCCC')


	// navigator.clipboard
	// 	.read()
	// 	.then(
	// 		(clipText) => (console.log(clipText)),
	// 	);

}

function pasteEvent(event) {
	// console.log('pastepaste')
	console.log(event.clipboardData.files[0])
	// let pastedData = event.clipboardData.getData('Text');
	// console.log(pastedData)


	// navigator.clipboard
	// 	.read()
	// 	.then(
	// 		(clipText) => (console.log(clipText)),
	// 	);
}
const paspas = new ClipboardEvent('paste');
// document.dispatchEvent(paspas);



function cutEvent(event) {
	console.log('UUUUUUUUUUUUUUUUUUUUUUUUUUU')
}





// document.execCommand('paste')


async function keydownActiveExtension(keyEvent) {

	console.log('pre')
	console.log('KEYCHECKER: ', keyEvent.key)


	// console.log('shshsh')
	// console.log(ran)

	if (keyEvent.key == 'Escape') {
		hideOverlay();
	}


	if (keyEvent.key == 'Shift') {

		if (keyEvent.ctrlKey) {

			if (waitingSecondCtrlShift == 1) {

				console.log('ctrlshift ctrlshift')
				waitingSecondCtrlShift = 0;
				//showOverlay()

				browser.runtime.sendMessage({
					command: "shiftshift"
				});

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
				showOverlay()

				browser.runtime.sendMessage({
					command: "shiftshift"
				});

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

				// let a = browser.tabs.query({active: true}, function(tabs){})
				// console.log(a)

				browser.runtime.sendMessage({
					command: "copycopy",
					// id: browser.tabs.Tab.id,
				});
				// await getClipboardContents();
				break;
			case '`':
				console.log('Ctrl + `')
				break;
			case '/':
				console.log('Ctrl + /')
				break;
			case '.':
				console.log('Ctrl + .')
				browser.browserAction.openPopup()
				break;
			case ',':
				console.log('Ctrl + ,')
				break;

			case '\\':
				console.log('Ctrl + \\')
				// document.dispatchEvent(paspas);
				await getClipboardContents();
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
				// fetchData('http://localhost:3000/api/v02/content/Node-SelectChildOfUuid?Uuid=372')
				// 	.then(data => {
				// 		console.log('Data:', data);
				// 	});

				break;

			default:
				break;
		}
	}



	if (keyEvent.altKey) {

		switch (keyEvent.key) {
			case 'g':
				console.log('Alt + g')

				browser.runtime.sendMessage({
					name: "getState",
					// id: browser.tabs.Tab.id,
				});
				// await getClipboardContents();
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



	switch (keyEvent.key) {

		case 'Shift':
			waitingSecondShift = 1;
			setTimeout(() => { waitingSecondShift = 0 }, 300);
			break;

		case 'Escape':
			hideOverlay()
			break;

		default:
			break;
	}



}










