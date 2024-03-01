import { determineClipboardContentType } from "../../../../../filehandling/DetermineClipboardContents.js";
import { CodeContent } from "./codecontent/CodeContent.js";
import { SourceContent } from "./sourcecontent/SourceContent.js";
import { TextContent } from "./textcontent/TextContent.js";


export class ShardCard {

	element;
	contentContainerElement;
	overlayElement;

	// Shardcard Content Class
	content;

	listeningDoubleClick;

	constructor(contentEdgeObject) {


		this.element = document.createElement('div');
		this.element.id = 'shardCard-' + contentEdgeObject.content.Uuid;
		this.element.classList.add('shardCard');


		// this.element.textContent = this.element.id;
		this.element.tabIndex = 0;

		this.element.contentObject = contentEdgeObject.content;
		this.element.edgeObject = contentEdgeObject.edge;
		this.element.dataset.uuid = this.element.contentObject.Uuid;
		this.element.dataset.edgeuuid = this.element.edgeObject.Uuid;

		this.element.addEventListener('focusin', this.focusinShardcard)
		this.element.addEventListener('focusout', this.focusoutShardcard)

		this.element.addEventListener('keydown', this.keydown.bind(this))
		this.element.addEventListener('click', this.click.bind(this))
		this.element.addEventListener('paste', this.paste.bind(this))



		// this.insertShardcardContent(this.element);

		// this.element.update = function () {
		// 	// console.log(this)
		// 	this.textContent = this.contentObject.Title;

		// }
		// this.element.update();
		this.element.update = this.insertShardcardContent.bind(this)

		this.contentContainerElement = document.createElement('div');
		// this.contentContainerElement.textContent = 'content';
		this.contentContainerElement.classList.add('shardCardContentContainer');
		this.element.append(this.contentContainerElement);



		this.overlayElement = document.createElement('div');
		this.overlayElement.textContent = 'overlay';
		this.overlayElement.classList.add('shardCardOverlay');
		this.element.append(this.overlayElement);

		this.overlayElement.textContent = this.element.contentObject.Title;


		this.insertShardcardContent();

		return this.element;

	}

	focusinShardcard(event) {
		if (event.target.querySelector('.shardCardOverlay')) {
			event.target.querySelector('.shardCardOverlay').classList.add('hidden')
			// event.target.focus();
		}
	}

	focusoutShardcard(event) {
		// event.target.querySelector('.shardCardOverlay').classList.remove('hidden')
	}


	insertShardcardContent() {
		console.log(this.element.contentObject.Table)

		switch (this.element.contentObject.Table) {
			case 'Code':
				// this.contentContainerElement.textContent = 'CONDE CODE CODE';
				this.content = new CodeContent(this.element, this.contentContainerElement);
				break;
			case 'File':
				this.contentContainerElement.textContent = 'FILE FILE FILE';
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
					console.log('PASTE TEXT TO TEXT-SHARDCARD')
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