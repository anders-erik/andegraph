

// VARS
let waitingSecondShift = 0;
let waitingSecondCtrlShift = 0;






async function keydownActiveExtension(keyEvent) {



	if (document.activeElement.isContentEditable) {
		// console.log('EDITABLE')
		return;
	}

	if (keyEvent.key === 'Escape') {
		stopClipboardTextConcatenation();
	}



	if (keyEvent.altKey) {

		switch (keyEvent.key) {
			case 'p':
				// console.log('Alt + p')
				console.log(extensionStateFront);
				break;

			case 'x':
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

			case '[':
				// console.log('Alt + [')
				startClipboardTextConcatenation();

				break;

			case 'Enter':
				// console.log('Alt + Enter')
				addNewLineToCaptureConcatenationContents()
				break;

			case '-':
				// console.log('Alt + Enter')
				addSpaceCharacterToCaptureConcatenationContents();
				break;

			case ']':
				// console.log('Alt + ]')
				if (clipboardCodeCheckbox.checked) {
					await postNewCodeObjectToCurrentSourceAndFullReloadOfSourceChildren(clipboardTextTypeInput.value, extensionStateFront.textConcatenationContent)
				}
				else {
					await postNewTextNodeToCurrentSourceAndFullReloadOfSourceChildren(clipboardTextTypeInput.value, extensionStateFront.textConcatenationContent);
				}

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











