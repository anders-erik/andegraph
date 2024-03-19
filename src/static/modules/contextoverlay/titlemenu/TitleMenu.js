import { dbis } from "../../dbi-send/dbi-send.js";
import { showToast } from "../../log/toast.js";


export class TitleMenu {

	parentElement;

	element;


	active = false;

	constructor(parentElement) {
		this.parentElement = parentElement;
		// this.place = place;

		this.element = document.createElement('div');
		this.element.id = 'titleMenu';
		this.element.classList.add('contextElement');
		this.element.tabIndex = 0;
		this.element.contentEditable = true;

		// this.element.tabIndex = 0;
		parentElement.append(this.element);

		this.element.addEventListener('keydown', this.keydownTitleMenu.bind(this));
		this.element.addEventListener('focusout', this.focusout.bind(this));

		this.element.innerHTML = this.elementInnerHtml;
	}


	async focusout(event) {
		await this.updateObjectWithNewTitle();
	}


	// NOT BOUND TO CLASS
	async keydownTitleMenu(event) {

		if (event.key === 'Escape') {
			// console.log('ESCESC');

			event.stopPropagation();

			await this.updateObjectWithNewTitle();

		}
		// else if (event.key === 'Enter') {
		// 	event.preventDefault();
		// }

	}


	async updateObjectWithNewTitle() {

		let contentObjectElement = this.parentElement.contentObjectElement;

		let contentObject = contentObjectElement.contentObject;

		// contentObject.Title = event.target.textContent;
		contentObject.Title = this.element.textContent;

		// console.log(newContentObject)
		try {

			await dbis.Content_UpdateWithContentObject(contentObject);

			// https://stackoverflow.com/questions/7084557/select-all-elements-with-a-data-xxx-attribute-without-using-jquery
			let contentElementsWithSameUuid = document.querySelectorAll(`[data-uuid='${contentObject.Uuid}']`);
			for (const element of contentElementsWithSameUuid) {
				element.dataset.uuid = contentObject.Uuid;
				element.contentObject = contentObject;
				element.update();
			}
			// console.log('contentElementsWithSameUuid: ', contentElementsWithSameUuid)
			// this.extractContentObjectFromDom()
			// console.log('NEW FOCUS: ', document.activeElement)

		} catch (error) {
			showToast('Error PUT contentObject')
		}


		this.parentElement.contentObjectElement.focus();

	}




	populate(contentObjectElement) {
		// console.log('POPULATE')
		this.parentElement.append(this.element)

		let contentObject = contentObjectElement.contentObject;

		this.element.innerHTML = `<p>${contentObject.Title}</p>`

	}





	elementInnerHtml = `
	<div></div>
	`;

}