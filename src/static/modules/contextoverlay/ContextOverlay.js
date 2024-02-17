


class ContextOverlay {

	overlayElement;

	propertiesMenu;
	propertiesMenuActive = false;
	// propertiesTableBody;

	constructor() {

		this.createOverlayElements();


	}


	isDisplayingNodeContext() {
		if (this.propertiesMenuActive) {
			return true;
		}
		else {
			return false;
		}
	}

	updateElementContexts(nodeObjectElement) {
		this.populatePropertiesTable(nodeObjectElement.nodeObject);
		this.placePropertiesTable(nodeObjectElement);
	}

	removeElementContexts() {
		for (let overlayChild of this.overlayElement.children) {
			this.overlayElement.removeChild(overlayChild);
		}
		this.propertiesMenuActive = false;
	}

	togglePropertiesTable(nodeObjectElement) {
		console.log('TOGGLE PROPERTIES TABLE')

		if (this.propertiesMenuActive) {
			this.overlayElement.removeChild(this.propertiesMenu);
			this.propertiesMenuActive = false;
		}
		else {
			this.populatePropertiesTable(nodeObjectElement.nodeObject);
			this.placePropertiesTable(nodeObjectElement);
			this.overlayElement.append(this.propertiesMenu);
			this.propertiesMenuActive = true;
		}
	}


	populatePropertiesTable(nodeObject) {
		// console.log('POPOPOPO', this.propertiesTableBody)
		// let tableBody = propertiesMenu.getElementById('contextOverlay_propertiesTableBody')
		// https://stackoverflow.com/questions/2899072/get-child-by-id
		let tableBody = this.propertiesMenu.querySelector('#contextOverlay_propertiesTableBody')
		tableBody.innerHTML = ``;
		console.log('tabtab', tableBody)
		console.log(nodeObject)
		for (const key in nodeObject) {

			// console.log(`${key}: ${projectObject[key]}`);

			tableBody.innerHTML += `
		
			<tr>
				<th id=ae-projPropTable-${key}-key class="ae-element" >${key}</th>
				<td id=ae-projPropTable-${key}-value class="ae-element">${nodeObject[key]}</td>
			</tr>
		
		`;

		}
	}

	placePropertiesTable(nodeObjectElement) {
		let nodeObjectElementClientRect = nodeObjectElement.getBoundingClientRect();

		this.propertiesMenu.style.left = nodeObjectElementClientRect.right + 20 + 'px';
		this.propertiesMenu.style.top = nodeObjectElementClientRect.top + 'px';
		console.log(this.propertiesMenu.left)
		console.log(nodeObjectElementClientRect)
		// let menuHeight = this.propertiesMenu.offsetHeight;
		// let elementTopSpace = nodeObjectElement.offsetTop;
		// console.log(menuHeight, elementTopSpace)
	}


	createOverlayElements() {
		this.overlayElement = document.createElement('div');
		this.overlayElement.id = 'contextOverlay';
		// this.overlayElement.classlist.add('');

		this.propertiesMenu = document.createElement('div');
		this.propertiesMenu.id = 'contextOverlay_propertiesMenu';
		this.propertiesMenu.innerHTML = `
			<table id="contextOverlay_propertiesTable" class="contextOverlay_displayNone contextOverlay_element">
				<thead id="contextOverlay_propertiesThead" class="contextOverlay_element">
					<tr class="contextOverlay_element">
						<th class="contextOverlay_element">Key</th>
						<th class="contextOverlay_element">Value</th>
					</tr>
				</thead>
				<tbody id="contextOverlay_propertiesTableBody" class="contextOverlay_element">

				</tbody>
			</table>
		`;
		// this.overlayElement.append(this.propertiesMenu);

		// this.propertiesTableBody = document.getElementById('contextOverlay_propertiesTableBody');
	}

}


export {
	ContextOverlay,
}