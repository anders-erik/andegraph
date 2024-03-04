import { dbis } from "../dbi-send/dbi-send.js";
import { determineClipboardContentType } from "../filehandling/DetermineClipboardContents.js";
import { determineFileCategories } from './DetermineFileCategories.js';
import { CodeContent } from "./codecontent/CodeContent.js";
import { FileContent } from "./filecontent/FileContent.js";
import { SourceContent } from "./sourcecontent/SourceContent.js";
import { TextContent } from "./textcontent/TextContent.js";


export class ContentCard {

	element;
	contentContainerElement;
	overlayElement;

	// ContentCard Content Class
	content;

	listeningDoubleClick;

	constructor(contentObject) {

		this.element = document.createElement('div');
		this.element.id = 'contentCard-' + contentObject.Uuid;
		this.element.classList.add('contentCard');


		// this.element.textContent = this.element.id;
		this.element.tabIndex = 0;

		this.element.contentObject = contentObject;
		// this.element.edgeObject = contentEdgeObject.edge;
		this.element.dataset.uuid = this.element.contentObject.Uuid;
		// this.element.dataset.edgeuuid = this.element.edgeObject.Uuid;

		this.element.addEventListener('focusin', this.focusinContentCard.bind(this))
		this.element.addEventListener('focusout', this.focusoutContentCard)

		this.element.addEventListener('keydown', this.keydown.bind(this))
		this.element.addEventListener('click', this.click.bind(this))
		this.element.addEventListener('paste', this.paste.bind(this))



		// this.insertContentCardContent(this.element);

		// this.element.update = function () {
		// 	// console.log(this)
		// 	this.textContent = this.contentObject.Title;

		// }
		// this.element.update();
		this.element.update = this.insertContentCardContent.bind(this)

		this.contentContainerElement = document.createElement('div');
		// this.contentContainerElement.textContent = 'content';
		this.contentContainerElement.classList.add('contentCardContentContainer');
		this.element.append(this.contentContainerElement);



		this.overlayElement = document.createElement('div');
		this.overlayElement.textContent = 'overlay';
		this.overlayElement.classList.add('contentCardOverlay');
		this.element.append(this.overlayElement);

		this.overlayElement.textContent = this.element.contentObject.Title;


		this.insertContentCardContent();

		return this.element;

	}

	// setEdge(edgeObject) {
	// 	this.element.edgeObject = edgeObject;
	// 	this.element.dataset.edgeuuid = edgeObject.Uuid;
	// }

	focusinContentCard(event) {

		if (event.target.querySelector('.contentCardOverlay')) {
			event.target.querySelector('.contentCardOverlay').classList.add('hidden')


			// event.target.focus();

			// console.log('target', event.target)
			// event.target.focus();
			// setTimeout(() => {
			// 	event.target.click();
			// }, 1000);
			// event.target.focus();
		}

		// Prevent selection from movfying away from content card, especially when hiding the overlay
		// This is necessary for pasting as paste event occur at selection nodes/elements
		if (this.element.contentObject.Table === 'Text' || this.element.contentObject.Table === 'Code') {
			// this.content.setCaretEnd();
		}
		else {
			//
			this.setSelectionToContentCard();
		}

		// console.log('selection node: ', window.getSelection().focusNode)
	}


	setSelectionToContentCard() {
		let sel = window.getSelection();
		sel.removeAllRanges();

		// TextContent > last paragraph > text of last paragraph
		let ele = this.element;
		let range = document.createRange();
		range.setStart(ele, 0);
		// range.collapse(true);

		sel.addRange(range)
		// console.log('sel.focusNode', sel.focusNode)
		// ofucs end of selected node
		// sel.extend(sel.focusNode, sel.focusNode.length)
		sel.collapseToEnd()
	}

	setSelectionToContentCard() {
		let sel = window.getSelection();
		sel.removeAllRanges();

		// TextContent > last paragraph > text of last paragraph
		let ele = this.element;
		let range = document.createRange();
		range.setStart(ele, 0);
		// range.collapse(true);

		sel.addRange(range)
		// console.log('sel.focusNode', sel.focusNode)
		// ofucs end of selected node
		// sel.extend(sel.focusNode, sel.focusNode.length)
		sel.collapseToEnd()
	}

	focusoutContentCard(event) {
		// event.target.querySelector('.contentCardOverlay').classList.remove('hidden')
	}


	insertContentCardContent() {
		// console.log(this.element.contentObject.Table)

		switch (this.element.contentObject.Table) {
			case 'Code':
				// this.contentContainerElement.textContent = 'CONDE CODE CODE';
				this.content = new CodeContent(this.element, this.contentContainerElement);
				break;
			case 'File':
				// this.contentContainerElement.textContent = 'FILE FILE FILE';
				this.content = new FileContent(this.element, this.contentContainerElement);
				break;
			case 'Source':
				// this.contentContainerElement.innerHTML = `<a href=${this.element.contentObject.Url}>${this.element.contentObject.Url} : LINK TO SOURCE URL</a>`;
				this.content = new SourceContent(this.element, this.contentContainerElement);
				break;
			case 'Text':
				this.content = new TextContent(this.element, this.contentContainerElement);
				// TextContent.populate(this.element, this.elementContent)
				break;
			default:
				this.contentContainerElement.textContent = 'CONTCONT'
				break;
		}
	}


	async keydown(event) {
		// console.log('event.key: ', event.key);


		// DELETE FILE
		if (event.key === 'F' && event.ctrlKey && event.shiftKey && event.altKey) {

			let contentObject = this.element.contentObject;

			if (contentObject.Table === 'File') {
				console.log("Delete File")

				await dbis.Delete_File(contentObject.Uuid);

				let updatedFileContentObject = await dbis.Content_SelectOnUuid(contentObject.Uuid);

				this.element.contentObject = updatedFileContentObject;
				// this.element.dataset.uuid = contentObject.Uuid;
				this.element.update();

			}
		}

		switch (this.element.contentObject.Table) {

			case 'Code':

				switch (event.key) {
					case 'Enter':
						this.content.enableEdit();
						this.content.setCaretEnd();
						event.stopPropagation();
						event.preventDefault();
						break;

					default:
						break;
				}
				break;

			case 'File':
				// console.log('')
				if (event.key === ' ') {
					document.activeElement.click();
					event.preventDefault();

				}
				break;

			case 'Source':
				// console.log('')
				if (event.key === ' ') {
					// console.log('GOGO SOURCE');
					document.activeElement.click();
					event.preventDefault();

				}
				break;

			case 'Text':

				switch (event.key) {
					case 'Enter':
						this.content.enableEdit();
						this.content.setCaretEnd();
						event.stopPropagation();
						event.preventDefault();
						break;

					default:
						break;
				}

				break;


			default:
				break;
		}
	}

	click(event) {

		// DOUBLE CLICK
		if (!this.listeningDoubleClick) {
			this.listeningDoubleClick = true;
			setTimeout(() => { this.listeningDoubleClick = false }, 400);

		}
		else {
			// console.log('double click!')

			switch (this.element.contentObject.Table) {

				case 'Code':
					this.content.enableEdit();
					break;

				case 'Text':
					this.content.enableEdit();
					break;

				default:
					break;
			}



		}
	}

	async paste(event) {
		// console.log('PPPPPPPPPPPPPPPPPPPPPPPPP')


		let pastedToContentCard = document.activeElement.classList.contains('contentCard');

		if (!pastedToContentCard) {
			console.log('Content Card not in focus during paste.');
			return;
		}


		// console.log(event.target.classList.contains('contentCard'))

		let clipboardContentType = determineClipboardContentType(event.clipboardData);

		let editing;
		let cardIsEmpty;
		let clipIsText = clipboardContentType === 'text' ? true : false;
		let clipIsFile = clipboardContentType === 'file' ? true : false;
		let text;
		let file;
		let contentObject = this.element.contentObject;


		switch (contentObject.Table) {

			case 'Code':
				// console.log('PASTE ON TEXT')
				// editing = this.content.element.classList.contains('editing');
				cardIsEmpty = this.content.element.textContent === '';

				if (clipIsText && cardIsEmpty /* !editing &&  */) {

					let clipboardText = (event.clipboardData || window.clipboardData).getData("text");
					this.content.insertTextContent(this.content.element, clipboardText);
					console.log('pasted ', clipboardText)
				}
				else {
					console.log(`No paste. Either already contains text, or clipboard is not a string.`)
				}
				break;

			case 'Text':
				// console.log('PASTE ON TEXT')
				// editing = this.content.element.classList.contains('editing');
				cardIsEmpty = this.content.element.textContent === '';

				if (clipIsText && cardIsEmpty /* !editing &&  */) {

					let clipboardText = (event.clipboardData || window.clipboardData).getData("text");
					this.content.insertTextContent(this.content.element, clipboardText);
					console.log('pasted ', clipboardText)
				}
				else {
					console.log(`No paste. Either already contains text, or clipboard is not a string.`)
				}
				break;

			case 'File':
				// console.log('PASTE ON FILE')
				if (clipIsFile && contentObject.Type === '') {
					file = event.clipboardData.files[0];

					let fileCategories = determineFileCategories(file)

					console.log('pasted ', file)
					console.log('fileCategories', fileCategories)

					if (fileCategories.mimeType == '' || fileCategories.fileExtension == '') {
						console.log('File is not supported. Made sure the file extension is correct. ')
						return;
					}

					let queryParams = {
						Type: fileCategories.fileType,
						Title: fileCategories.baseFileName,
						Extension: fileCategories.fileExtension,
						IAmAuthor: '0',
					};

					let fileFromDb = await dbis.Post_File(
						contentObject.Uuid,
						file,
						queryParams,
						fileCategories.mimeType
					);

					let updatedFileContentObject = await dbis.Content_SelectOnUuid(contentObject.Uuid);

					this.element.contentObject = updatedFileContentObject;
					// this.element.dataset.uuid = this.element.contentObject.Uuid;
					this.element.update();


				}
				else {
					console.log('Already has contentObject.Type, or no clipboard file detected')
				}
				break;

			default:
				break;
		}

	}




}