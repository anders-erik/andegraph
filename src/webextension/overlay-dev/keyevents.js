



// VARS
let waitingSecondShift = 0;
let waitingSecondCtrlShift = 0;










// document.execCommand('paste')


async function keydownActiveExtension(keyEvent) {



	if (document.activeElement.isContentEditable) {
		// console.log('EDITABLE')
		return;
	}

	if (keyEvent.key === 'Escape') {
		stopClipboardTextConcatenation();
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
				// console.log('Alt + [')
				startClipboardTextConcatenation();

				break;

			case 'Enter':
				// console.log('Alt + Enter')
				// console.log('before: ', extensionStateFront.textConcatenationContent);
				addNewLineToCaptureConcatenationContents()
				// console.log('after: ', extensionStateFront.textConcatenationContent);
				break;

			case '-':
				// console.log('Alt + Enter')
				// console.log('before: ', extensionStateFront.textConcatenationContent);
				addSpaceCharacterToCaptureConcatenationContents();
				// console.log('after: ', extensionStateFront.textConcatenationContent);
				break;

			case ']':
				// console.log('Alt + ]')
				console.log('New text concatentation shard: ');
				console.log(extensionStateFront.textConcatenationContent)

				if (clipboardCodeCheckbox.checked) {
					await postNewCodeObjectToCurrentSourceAndFullReloadOfSourceChildren(clipboardCodeSelect.value, extensionStateFront.textConcatenationContent)
				}
				else {
					await postNewTextNodeToCurrentSourceAndFullReloadOfSourceChildren(extensionStateFront.textConcatenationContent);
				}



				stopClipboardTextConcatenation();
				break;



			default:
				break;
		}
	}




}











