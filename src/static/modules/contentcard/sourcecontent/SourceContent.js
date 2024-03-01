import { determineClipboardContentType } from "../../filehandling/DetermineClipboardContents.js";


export class SourceContent {

	contentcardElement;
	contentContainer;

	element;


	constructor(contentcardElement, contentContainer) {
		this.contentcardElement = contentcardElement;
		this.contentContainer = contentContainer;
		this.contentContainer.innerHTML = ``;

		this.element = document.createElement('div');
		// this.element.tabIndex = 0;
		// this.element.contentEditable = true;
		this.element.classList.add('sourceContent');


		// this.element.addEventListener('keydown', this.keydown.bind(this));

		this.element.textContent = contentcardElement.contentObject.Url;

		this.contentContainer.append(this.element);
	}



	// keydown(event) {

	// 	if (event.key === 'Space') {
	// 		console.log('GOGO SOURCE')
	// 	}


	// }



}