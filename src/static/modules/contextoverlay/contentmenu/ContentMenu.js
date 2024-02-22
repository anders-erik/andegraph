


export class ContentMenu {

	parentElement;
	element;

	active = false;

	constructor(parentElement) {
		this.parentElement = parentElement;

		this.element = document.createElement('div');
		this.element.id = 'contextOverlay_contentMenu';
		this.element.classList.add('contextElement');
		this.element.tabIndex = 0;
		// parentElement.append(this.element);

		this.element.innerHTML = this.elementInnerHtml;
	}


	remove() {
		if (this.active) {
			this.parentElement.removeChild(this.element);
			this.active = false;
		}

	}

	toggle(contentObjectElement) {
		console.log('TOGGLE PROPERTIES TABLE')

		if (this.active) {
			this.parentElement.removeChild(this.element);
			this.active = false;
		}
		else {
			this.populate(contentObjectElement.contentObject);
			this.place(contentObjectElement);
			this.parentElement.append(this.element);
			this.active = true;
		}
	}



	populate(contentObject) {
		// console.log('POPOPOPO', this.propertiesTableBody)
		// let tableBody = propertiesMenu.getElementById('contextOverlay_propertiesTableBody')
		// https://stackoverflow.com/questions/2899072/get-child-by-id
		let tableBody = this.element.querySelector('#contextOverlay_contentTableBody')
		tableBody.innerHTML = ``;
		console.log('tabtab', tableBody)
		console.log(contentObject)
		for (const key in contentObject) {

			// console.log(`${key}: ${projectObject[key]}`);
			// let contentEditable = 'false';
			let contentEditable = key == 'Title' ? 'contenteditable="true"' : '';
			let tabindex = key == 'Title' ? 'tabindex=0' : '';


			tableBody.innerHTML += `
		
			<tr>
				<th>${key}</th>
				<td class="contextElement" ${contentEditable} ${tabindex}>${contentObject[key]}</td>
			</tr>
		
		`;

		}
	}

	place(contentObjectElement) {
		let contentObjectElementClientRect = contentObjectElement.getBoundingClientRect();

		this.element.style.left = contentObjectElementClientRect.right + 20 + 'px';
		this.element.style.top = contentObjectElementClientRect.top + 'px';
		console.log(this.element.left)
		console.log(contentObjectElementClientRect)
		// let menuHeight = this.propertiesMenu.offsetHeight;
		// let elementTopSpace = nodeObjectElement.offsetTop;
		// console.log(menuHeight, elementTopSpace)
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