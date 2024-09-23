


export class Input {

	element;
	elementInnerHtml;


	constructor(parentElement) {
		this.element = document.createElement('input');
		this.element.id = 'searchInput';
		this.element.type = 'text';
		this.element.placeholder = 'Search Content Titles ...';
		parentElement.append(this.element);

		this.element.innerHTML = this.elementInnerHtml;
	}



	elementInnerHtml = `



	
	`;
}