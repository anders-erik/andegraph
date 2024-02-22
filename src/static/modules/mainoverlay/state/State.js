


export class State {

	element;

	element_1;
	element_2;
	element_3;

	constructor(parentElement) {
		this.element = document.createElement('div');
		this.element.id = 'mainOverlay_state';
		parentElement.append(this.element);

		this.element.innerHTML = this.stateElementInnerHtml;
		this.element_1 = this.element.querySelector('#contentState_1');
		this.element_2 = this.element.querySelector('#contentState_2');
		this.element_3 = this.element.querySelector('#contentState_3');

	}

	setState1(contentObject) {
		this.element_1.textContent = contentObject.Title;
		this.element_1.contentObject = contentObject;
	}

	setState2(contentObject) {
		this.element_2.textContent = contentObject.Title;
		this.element_2.contentObject = contentObject;
	}

	setState3(contentObject) {
		this.element_3.textContent = contentObject.Title;
		this.element_3.contentObject = contentObject;
	}


	stateElementInnerHtml = `

<div id="contentState_1" tabindex=0>1</div>
<div id="contentState_2" tabindex=0>2</div>
<div id="contentState_3" tabindex=0>3</div>
	
	`;
}