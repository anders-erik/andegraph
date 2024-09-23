import { dbis } from "../../dbi-send/dbi-send.js";
import { showToast } from "../../log/toast.js";


export class EdgeMenu {

	parentElement;

	element;


	active = false;

	constructor(parentElement) {
		this.parentElement = parentElement;
		// this.place = place;

		this.element = document.createElement('div');
		this.element.id = 'edgeMenu';

		// this.element.tabIndex = 0;
		parentElement.append(this.element);

		this.element.addEventListener('focusout', this.focusOutOnEditableEdgeCell)

		this.element.innerHTML = this.elementInnerHtml;
	}



	// NOT BOUND TO CLASS
	async focusOutOnEditableEdgeCell(event) {
		// console.log('TARGET> ', event.target.classList.cont)
		if (event.target.classList.contains('contextElement')) {
			// console.log('FOCUS OUT ON CONTEXTDATA. PUT!')

			let newEdgeObject = {};

			let tableRows = document.querySelectorAll('#contextOverlay_edgeTableBody tr');
			console.log('EXTRACT: ', tableRows)
			for (const tableRow of tableRows) {
				let key = tableRow.children[0].textContent;
				let edge = tableRow.children[1].textContent;
				// console.log(JSON.stringify(key), JSON.stringify(edge))
				newEdgeObject[key] = edge;

			}

			// DEV TEST - make sure update fails
			// newEdgeObject.Uuid = -123;

			console.log(newEdgeObject)
			try {

				await dbis.Edge_UpdateWithEdgeObject(newEdgeObject);

				// https://stackoverflow.com/questions/7084557/select-all-elements-with-a-data-xxx-attribute-without-using-jquery
				let edgeElementsWithSameUuid = document.querySelectorAll(`[data-edgeuuid='${newEdgeObject.Uuid}']`);
				for (const element of edgeElementsWithSameUuid) {
					element.dataset.edgeuuid = newEdgeObject.Uuid;
					element.edgeObject = newEdgeObject;
					element.update();
				}
				// console.log('edgeElementsWithSameUuid: ', edgeElementsWithSameUuid)
				// this.extractEdgeObjectFromDom()
				// console.log('NEW FOCUS: ', document.activeElement)

			} catch (error) {
				showToast('Error PUT edgeObject')
			}
		}
	}

	extractEdgeObjectFromDom() {

	}

	async putEdges() {

	}




	populate(edgeObjectElement) {
		// console.log('POPULATE')
		this.parentElement.append(this.element)

		let edgeObject = edgeObjectElement.edgeObject;

		let editableEdgeColumns = ['Path', 'Type', 'Order'];

		// https://stackoverflow.com/questions/2899072/get-child-by-id
		let tableBody = this.element.querySelector('#contextOverlay_edgeTableBody')
		tableBody.innerHTML = ``;
		// console.log('tabtab', tableBody)
		// console.log(edgeObject)

		let contentEditableString;
		let tabindexString;
		let classString;
		for (const key in edgeObject) {

			// console.log(`${key}: ${projectObject[key]}`);
			// let edgeEditable = 'false';

			// let edgeEditable = key == 'Title' ? 'edgeeditable="true"' : '';
			// let tabindex = key == 'Title' ? 'tabindex=0' : '';

			// exclude 'File.Type' edge to be editable because it is set at file POST or PUT only. 
			if (editableEdgeColumns.includes(key)) {
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
				<td ${classString} ${contentEditableString} ${tabindexString}>${edgeObject[key]}</td>
			</tr>
		
		`;



		}
	}





	elementInnerHtml = `
	<table id="contextOverlay_edgeTable" class="contextOverlay_displayNone contextOverlay_element">
		<thead id="contextOverlay_edgeThead" class="contextOverlay_element">
			<tr class="contextOverlay_element">
				<th class="contextOverlay_element">Key</th>
				<th class="contextOverlay_element">Value</th>
			</tr>
		</thead>
		<tbody id="contextOverlay_edgeTableBody" class="contextOverlay_element">

		</tbody>
	</table>
	`;

}