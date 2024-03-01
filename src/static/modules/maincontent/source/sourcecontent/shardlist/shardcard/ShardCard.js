import { TextContent } from "./textcontent/TextContent.js";


export class ShardCard {

	element;
	contentContainerElement;
	overlayElement;

	// Shardcard Content Class
	content;


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



		// this.insertShardcardContent(this.element);

		// this.element.update = function () {
		// 	// console.log(this)
		// 	this.textContent = this.contentObject.Title;

		// }
		// this.element.update();

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


	insertShardcardContent() {
		console.log(this.element.contentObject.Table)

		switch (this.element.contentObject.Table) {
			case 'Code':
				this.contentContainerElement.textContent = 'CONDE CODE CODE';
				break;
			case 'File':
				this.contentContainerElement.textContent = 'FILE FILE FILE';
				break;
			case 'Source':
				this.contentContainerElement.innerHTML = `<a href=${this.element.contentObject.Url}>${this.element.contentObject.Url} : LINK TO SOURCE URL</a>`;
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


	focusinShardcard(event) {
		if (event.target.querySelector('.shardCardOverlay')) {
			event.target.querySelector('.shardCardOverlay').classList.add('hidden')
		}
	}

	focusoutShardcard(event) {
		// event.target.querySelector('.shardCardOverlay').classList.remove('hidden')
	}


}