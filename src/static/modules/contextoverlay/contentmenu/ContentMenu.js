import { dbis } from "../../dbi-send/dbi-send.js";
import { showToast } from "../../log/toast.js";


export class ContentMenu {

	parentElement;

	element;


	active = false;

	constructor(parentElement) {
		this.parentElement = parentElement;
		// this.place = place;

		this.element = document.createElement('div');
		this.element.id = 'contentMenu';

		// this.element.tabIndex = 0;
		parentElement.append(this.element);

		this.element.addEventListener('focusout', this.focusOutOnEditableContentCell)

		this.element.innerHTML = this.elementInnerHtml;
	}



	// NOT BOUND TO CLASS
	async focusOutOnEditableContentCell(event) {
		// console.log('TARGET> ', event.target.classList.cont)
		if (event.target.classList.contains('contextElement')) {
			// console.log('FOCUS OUT ON CONTEXTDATA. PUT!')

			let newContentObject = {};

			let tableRows = document.querySelectorAll('#contextOverlay_contentTableBody tr');
			console.log('EXTRACT: ', tableRows)
			for (const tableRow of tableRows) {
				let key = tableRow.children[0].textContent;
				let content = tableRow.children[1].textContent;
				// console.log(JSON.stringify(key), JSON.stringify(content))
				newContentObject[key] = content;

			}

			// DEV TEST - make sure update fails
			// newContentObject.Uuid = -123;

			// console.log(newContentObject)
			try {

				await dbis.Content_UpdateWithContentObject(newContentObject);

				// https://stackoverflow.com/questions/7084557/select-all-elements-with-a-data-xxx-attribute-without-using-jquery
				let contentElementsWithSameUuid = document.querySelectorAll(`[data-uuid='${newContentObject.Uuid}']`);
				for (const element of contentElementsWithSameUuid) {
					element.dataset.uuid = newContentObject.Uuid;
					element.contentObject = newContentObject;
					element.update();
				}
				// console.log('contentElementsWithSameUuid: ', contentElementsWithSameUuid)
				// this.extractContentObjectFromDom()
				// console.log('NEW FOCUS: ', document.activeElement)

			} catch (error) {
				showToast('Error PUT contentObject')
			}
		}
	}

	extractContentObjectFromDom() {

	}

	async putContents() {

	}




	populate(contentObjectElement) {
		// console.log('POPULATE')
		this.parentElement.append(this.element)

		let contentObject = contentObjectElement.contentObject;

		let editableContentColumns = ['Type', 'Title', 'Url', 'IAmSource', 'IAmAuthor', 'Goal', 'CodeContent', 'TextContent', 'Language', 'ReviewDate', 'ReviewCompleted', 'ReviewCompletedOnDate'];

		// https://stackoverflow.com/questions/2899072/get-child-by-id
		let tableBody = this.element.querySelector('#contextOverlay_contentTableBody')
		tableBody.innerHTML = ``;
		// console.log('tabtab', tableBody)
		// console.log(contentObject)

		let contentEditableString;
		let tabindexString;
		let classString;
		for (const key in contentObject) {

			// console.log(`${key}: ${projectObject[key]}`);
			// let contentEditable = 'false';

			// let contentEditable = key == 'Title' ? 'contenteditable="true"' : '';
			// let tabindex = key == 'Title' ? 'tabindex=0' : '';

			// exclude 'File.Type' content to be editable because it is set at file POST or PUT only. 
			if (editableContentColumns.includes(key) && !(contentObject.Table === 'File' && key === 'Type')) {
				contentEditableString = 'contenteditable="true"';
				tabindexString = 'tabindex=0';
				classString = 'class="contextElement editableContextElement"';
			}
			else {
				contentEditableString = '';
				tabindexString = '';
				classString = 'class="contextElement"';
			}


			tableBody.innerHTML += `
		
			<tr>
				<th>${key}</th>
				<td ${classString} ${contentEditableString} ${tabindexString}>${contentObject[key]}</td>
			</tr>
		
		`;



		}
	}





	elementInnerHtml = `
	<table id="contextOverlay_contentTable" class="contextOverlay_displayNone contextOverlay_element">
		<thead id="contextOverlay_contentThead" class="contextOverlay_element">
			<tr class="contextOverlay_element">
				<th class="contextOverlay_element">Key</th>
				<th class="contextOverlay_element">Value</th>
			</tr>
		</thead>
		<tbody id="contextOverlay_contentTableBody" class="contextOverlay_element">

		</tbody>
	</table>
	`;

}