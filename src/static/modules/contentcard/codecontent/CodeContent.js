import { dbis } from "../../dbi-send/dbi-send.js";
import { determineClipboardContentType } from "../../filehandling/DetermineClipboardContents.js";


export class CodeContent {

	contentcardElement;
	contentContainer;

	element;

	codeHeader;

	listeningSecondClick;

	constructor(contentcardElement, contentContainer) {
		this.contentcardElement = contentcardElement;
		this.contentContainer = contentContainer;
		this.contentContainer.innerHTML = ``;

		this.codeHeader = this.contentcardElement.querySelector('.codeHeader');
		if (this.codeHeader == null) {
			this.codeHeader = document.createElement('div');
			this.codeHeader.classList.add('codeHeader');
		}
		this.codeHeader.textContent = 'CODE : ' + contentcardElement.contentObject.Type;

		this.element = document.createElement('div');
		// this.element.tabIndex = 0;
		// this.element.contentEditable = true;
		this.element.classList.add('codeContent');



		this.element.addEventListener('focusout', this.focusout.bind(this));
		this.element.addEventListener('keydown', this.keydownDuringFocus.bind(this));
		this.element.addEventListener('paste', this.pasteDuringFocus.bind(this));


		if (contentcardElement.contentObject.CodeContent === '') {
			this.element.innerHTML = `<p><br></p>`
		}
		else {
			this.insertTextContent(this.element, contentcardElement.contentObject.CodeContent)
		}


		this.contentContainer.append(this.codeHeader, this.element);
		// this.contentcardElement.append(this.codeHeader);
	}


	async focusout(event) {

		this.disableEdit();

		// console.log('event.target', event.target)

		let newTextContent = this.extractTextContent(event.target);

		// console.log('TODO: PUT UPDATED TEXT :', newTextContent)
		let newContentObject = this.contentcardElement.contentObject;

		newContentObject.CodeContent = newTextContent;

		let contentObjectFromDb = dbis.Content_UpdateWithContentObject(newContentObject)

		// https://stackoverflow.com/questions/7084557/select-all-elements-with-a-data-xxx-attribute-without-using-jquery
		let contentElementsWithSameUuid = document.querySelectorAll(`[data-uuid='${newContentObject.Uuid}']`);
		for (const element of contentElementsWithSameUuid) {
			element.dataset.uuid = newContentObject.Uuid;
			element.contentObject = newContentObject;
			element.update();
		}
		// console.table(contentObjectFromDb)

		// console.table(newContentObject)
		// console.table(this.contentcardElement.contentObject);
	}

	enableEdit() {
		this.element.contentEditable = "true";
		this.element.classList.add('editing');
		this.element.focus();
	}

	disableEdit() {
		this.element.contentEditable = "false";
		this.element.classList.remove('editing');
		// this.contentcardElement.focus();
	}


	setCaretEnd() {

		let sel = window.getSelection();
		sel.removeAllRanges();

		// TextContent > last paragraph > text of last paragraph
		let emptyP = this.element.lastChild.lastChild;
		let range = document.createRange();
		range.setStart(emptyP, 0);
		// range.collapse(true);

		sel.addRange(range)
		// console.log('sel.focusNode', sel.focusNode)
		// ofucs end of selected node
		sel.extend(sel.focusNode, sel.focusNode.length)
		sel.collapseToEnd()

	}


	/* 
		From old sharding-contentcard
	 */

	keydownDuringFocus(event) {

		if (event.target.contentEditable === 'true') {

			switch (event.key) {
				case 'Backspace':
					// prevent deletion of the last 'p' element!
					if (event.target.textContent == '' && event.target.childElementCount == 1) {
						event.preventDefault();
					}
					break;

				case 'Enter':
					event.stopPropagation();
					break;

				case 'Escape':
					this.contentcardElement.focus();
					break;

				case 'Tab':
					event.preventDefault();
					window.getSelection().getRangeAt(0).insertNode(document.createTextNode(`\xa0\xa0\xa0\xa0`));

					break;

				default:
					break;
			}

		}

	}


	pasteDuringFocus(event) {
		// console.log('pasteDuringFocus')

		let clipboardContentType = determineClipboardContentType(event.clipboardData);
		// console.log('clipboardContentType', clipboardContentType);
		event.preventDefault()

		if (this.element.classList.contains('editing') && clipboardContentType === 'text') {
			// console.log('PASTE TEXT')

			let clipboardText = (event.clipboardData || window.clipboardData).getData("text");
			document.execCommand("insertHTML", false, clipboardText);
		}
	}




	insertTextContent(textElement, textStringInput) {

		// If WHOLE shard-textContent is empty
		if (textStringInput == '') {
			return;
		}

		textElement.innerHTML = '';

		let textStringSpaces = textStringInput.replaceAll('\t', '\xa0\xa0\xa0\xa0');
		//console.log(JSON.stringify(textStringSpaces));


		let textArray = textStringSpaces.split('\n');
		//console.log(textArray);
		//let divString = textArray.join('<br>»');

		for (let i = 0; i < textArray.length; i++) {
			let p = document.createElement('p');
			// p.classList.add('shard-p');
			// p.id = 'shard-p-' + contentcard.shard.id;
			// p.dataset.nodeId = contentcard.shard.id;
			// https://stackoverflow.com/questions/75397803/chrome-skips-over-empty-paragraphs-of-contenteditable-parent-when-moving-cursor/75397804
			if (textArray[i] == '') {
				p.innerHTML = `<br>`;
			}
			else {
				p.textContent = textArray[i];
			}

			textElement.appendChild(p)
		}

		//console.log(divString)

	}

	extractTextContent(contentcard) {
		// console.log(contentcard)

		let stringArray = [];

		for (const child of contentcard.children) {
			//console.log(child.textContent);
			stringArray.push(child.textContent);
		}


		let storeString = stringArray.join(`\n`);

		//console.log('raw extracted: ', JSON.stringify(rawExtractedText));
		return storeString;
	}



}