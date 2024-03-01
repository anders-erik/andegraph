import { determineClipboardContentType } from "../../../../../../filehandling/DetermineClipboardContents.js";
import { animateToWidthPanel1 } from "../../../../../../uiskeleton/threepanels/threepanels.js";


export class SourceContent {

	shardcardElement;
	contentContainer;

	element;


	constructor(shardcardElement, contentContainer) {
		this.shardcardElement = shardcardElement;
		this.contentContainer = contentContainer;
		this.contentContainer.innerHTML = ``;

		this.element = document.createElement('div');
		// this.element.tabIndex = 0;
		// this.element.contentEditable = true;
		this.element.classList.add('sourceContent');


		// this.element.addEventListener('keydown', this.keydown.bind(this));

		this.element.textContent = shardcardElement.contentObject.Url;

		this.contentContainer.append(this.element);
	}



	// keydown(event) {

	// 	if (event.key === 'Space') {
	// 		console.log('GOGO SOURCE')
	// 	}


	// }



}