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

		this.element.addEventListener('keydown', this.keydownTitleMenu)

		this.element.innerHTML = this.elementInnerHtml;
	}



	// NOT BOUND TO CLASS
	async keydownTitleMenu(event) {

		if (event.key === 'Escape') {
			console.log('ESCESC');

			let contentObjectElement = this.parentElement.contentObjectElement;

			let contentObject = contentObjectElement.contentObject;

			contentObject.Title = event.target.textContent;

			// console.table(contentObject)
			// console.log(this.target)

			// const event = new KeyboardEvent('keydown', { 'key': 'Escape' });
			// this.element.dispatchEvent(event);
			event.stopPropagation();

			// Focus on the element that initiated the context menu


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
		else if (event.key === 'Enter') {
			event.preventDefault();
		}


		// // console.log('TARGET> ', event.target.classList.cont)
		// if (event.target.classList.contains('contextElement')) {
		// 	// console.log('FOCUS OUT ON CONTEXTDATA. PUT!')

		// 	let newContentObject = {};

		// 	let tableRows = document.querySelectorAll('#contextOverlay_contentTableBody tr');
		// 	console.log('EXTRACT: ', tableRows)
		// 	for (const tableRow of tableRows) {
		// 		let key = tableRow.children[0].textContent;
		// 		let content = tableRow.children[1].textContent;
		// 		// console.log(JSON.stringify(key), JSON.stringify(content))
		// 		newContentObject[key] = content;

		// 	}

		// 	// DEV TEST - make sure update fails
		// 	// newContentObject.Uuid = -123;

		// 	// console.log(newContentObject)
		// 	try {

		// 		await dbis.Content_UpdateWithContentObject(newContentObject);

		// 		// https://stackoverflow.com/questions/7084557/select-all-elements-with-a-data-xxx-attribute-without-using-jquery
		// 		let contentElementsWithSameUuid = document.querySelectorAll(`[data-uuid='${newContentObject.Uuid}']`);
		// 		for (const element of contentElementsWithSameUuid) {
		// 			element.dataset.uuid = newContentObject.Uuid;
		// 			element.contentObject = newContentObject;
		// 			element.update();
		// 		}
		// 		// console.log('contentElementsWithSameUuid: ', contentElementsWithSameUuid)
		// 		// this.extractContentObjectFromDom()
		// 		// console.log('NEW FOCUS: ', document.activeElement)

		// 	} catch (error) {
		// 		showToast('Error PUT contentObject')
		// 	}
		// }
	}





	populate(contentObjectElement) {
		// console.log('POPULATE')
		this.parentElement.append(this.element)

		let contentObject = contentObjectElement.contentObject;

		this.element.innerHTML = `<p>${contentObject.Title}</p>`

		// this.element.innerHTML = `<div class="contextElement" contentEditanle="true" tabindex=0>${contentObject.Title}</div>`;


		// let editableContentColumns = ['Type', 'Title', 'Url', 'IAmSource', 'IAmAuthor', 'Goal', 'CodeContent', 'TextContent', 'Language', 'ReviewDate', 'ReviewCompleted', 'ReviewCompletedOnDate'];

		// // https://stackoverflow.com/questions/2899072/get-child-by-id
		// let tableBody = this.element.querySelector('#contextOverlay_contentTableBody')
		// tableBody.innerHTML = ``;
		// // console.log('tabtab', tableBody)
		// // console.log(contentObject)

		// let contentEditableString;
		// let tabindexString;
		// let classString;
		// for (const key in contentObject) {

		// 	// console.log(`${key}: ${projectObject[key]}`);
		// 	// let contentEditable = 'false';

		// 	// let contentEditable = key == 'Title' ? 'contenteditable="true"' : '';
		// 	// let tabindex = key == 'Title' ? 'tabindex=0' : '';

		// 	// exclude 'File.Type' content to be editable because it is set at file POST or PUT only. 
		// 	if (editableContentColumns.includes(key) && !(contentObject.Table === 'File' && key === 'Type')) {
		// 		contentEditableString = 'contenteditable="true"';
		// 		tabindexString = 'tabindex=0';
		// 		classString = 'class="contextElement editableContextElement"';
		// 	}
		// 	else {
		// 		contentEditableString = '';
		// 		tabindexString = '';
		// 		classString = 'class="contextElement"';
		// 	}


		// 	tableBody.innerHTML += `

		// 	<tr>
		// 		<th>${key}</th>
		// 		<td ${classString} ${contentEditableString} ${tabindexString}>${contentObject[key]}</td>
		// 	</tr>

		// `;



		// }
	}





	elementInnerHtml = `
	<div></div>
	`;

}