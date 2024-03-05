import { dbis } from "../../dbi-send/dbi-send.js";



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

		let lastState1Uuid = localStorage.getItem('state1Uuid');
		let lastState2Uuid = localStorage.getItem('state2Uuid');
		let lastState3Uuid = localStorage.getItem('state3Uuid');

		// console.log('lastState1Uuid', lastState1Uuid)
		if (lastState1Uuid) {
			dbis.Content_SelectOnUuid(lastState1Uuid)
				.then((state1ContentObject) => {
					this.setState1(state1ContentObject);
				});
		}
		if (lastState2Uuid) {
			dbis.Content_SelectOnUuid(lastState2Uuid)
				.then((state2ContentObject) => {
					this.setState2(state2ContentObject);
				});
		}
		if (lastState3Uuid) {
			dbis.Content_SelectOnUuid(lastState3Uuid)
				.then((state3ContentObject) => {
					this.setState3(state3ContentObject);
				});
		}

	}

	setState1(contentObject) {
		this.element_1.textContent = contentObject.Title;
		this.element_1.contentObject = contentObject;
		this.element_1.dataset.uuid = contentObject.Uuid;
		this.element_1.update = function () {
			this.textContent = this.contentObject.Title;
		}
	}

	setState2(contentObject) {
		this.element_2.textContent = contentObject.Title;
		this.element_2.contentObject = contentObject;
		this.element_2.dataset.uuid = contentObject.Uuid;
		this.element_2.update = function () {
			this.textContent = this.contentObject.Title;
		}
	}

	setState3(contentObject) {
		this.element_3.textContent = contentObject.Title;
		this.element_3.contentObject = contentObject;
		this.element_3.dataset.uuid = contentObject.Uuid;
		this.element_3.update = function () {
			this.textContent = this.contentObject.Title;
		}
	}


	stateElementInnerHtml = `

<div id="contentState_1" tabindex=0>1</div>
<div id="contentState_2" tabindex=0>2</div>
<div id="contentState_3" tabindex=0>3</div>
	
	`;
}