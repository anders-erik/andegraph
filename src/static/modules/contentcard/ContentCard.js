import { determineClipboardContentType } from "../filehandling/DetermineClipboardContents.js";
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

	constructor(contentEdgeObject) {


		this.element = document.createElement('div');
		this.element.id = 'contentCard-' + contentEdgeObject.content.Uuid;
		this.element.classList.add('contentCard');


		// this.element.textContent = this.element.id;
		this.element.tabIndex = 0;

		this.element.contentObject = contentEdgeObject.content;
		this.element.edgeObject = contentEdgeObject.edge;
		this.element.dataset.uuid = this.element.contentObject.Uuid;
		this.element.dataset.edgeuuid = this.element.edgeObject.Uuid;

		this.element.addEventListener('focusin', this.focusinContentCard)
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

	focusinContentCard(event) {
		if (event.target.querySelector('.contentCardOverlay')) {
			event.target.querySelector('.contentCardOverlay').classList.add('hidden')
			// event.target.focus();
		}
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


	keydown(event) {
		console.log('event.key: ', event.key);

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

			case 'Source':
				// console.log('')
				if (event.key === ' ') {
					console.log('GOGO SOURCE');
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

	paste(event) {

		let clipboardContentType = determineClipboardContentType(event.clipboardData);

		let editing = this.content.element.classList.contains('editing');
		let isText = clipboardContentType === 'text' ? true : false;
		let isEmpty = this.content.element.textContent === '';

		switch (this.element.contentObject.Table) {

			case 'Text':
				if (!editing && isText && isEmpty) {
					console.log('PASTE TEXT TO TEXT-CONTENTCARD')
					let clipboardText = (event.clipboardData || window.clipboardData).getData("text");
					this.content.insertTextContent(this.content.element, clipboardText);
				}
				else {
					console.log(`Can't paste to non-empty content`)
				}
				break;

			default:
				break;
		}

	}




}