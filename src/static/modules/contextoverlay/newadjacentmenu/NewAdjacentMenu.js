import { dbis } from "../../dbi-send/dbi-send.js";
import { showToast } from "../../log/toast.js";


export class NewAdjacentMenu {

	parentElement;

	element;

	table;
	contentType;
	node;
	directed;
	path;
	button;

	nodeLabel = document.createElement('label');
	directedLabel = document.createElement('label');
	pathLabel = document.createElement('label');


	active = false;

	constructor(parentElement) {
		this.parentElement = parentElement;
		// this.place = place;

		this.element = document.createElement('div');
		this.element.id = 'newAdjacentMenu';
		// this.element.tabIndex = 0;

		// this.element.tabIndex = 0;
		parentElement.append(this.element);


		this.element.innerHTML = this.elementInnerHtml;


		this.table = this.element.querySelector('#newAdjacentMenu_table');
		this.contentType = this.element.querySelector('#newAdjacentMenu_contentType');
		this.node = this.element.querySelector('#newAdjacentMenu_node');
		this.directed = this.element.querySelector('#newAdjacentMenu_directed');
		this.path = this.element.querySelector('#newAdjacentMenu_path');
		this.button = this.element.querySelector('#newAdjacentMenu_button');


		this.element.addEventListener('paste', this.pasteNewAdjacent)
		this.button.addEventListener('click', this.testButtonClick.bind(this));

	}



	async pasteNewAdjacent(event) {
		console.log('PASTE PASTE')
		event.preventDefault();
	}


	createForm(contentObject, directed) {



		this.element.innerHTML = ` <h4>NEW CHILD</h4>`;


		this.node.querySelector('div').textContent = contentObject.Title;
		this.node.contentObject = contentObject;

		this.directed.querySelector('div').textContent = directed;

		this.path.querySelector('div').textContent = '';

		this.button.style.backgroundColor = 'gray';


		this.element.append(
			this.table,
			this.contentType,
			this.node,
			this.directed,
			this.path,
			this.button
		);
		this.parentElement.append(this.element);

	}


	async testButtonClick(event) {
		console.log('BUTTON FORM CLICK!')

		let newAdjecentObject = {};

		let path = this.path.textContent.trim();
		if (path.length == 0) {
			path = '/';
		}
		if (path[0] !== '/') {
			path = '/' + path;
		}
		if (path[path.length - 1] !== '/') {
			path = path + '/';
		}




		// newEdgeObject.Uuid 
		newAdjecentObject.Uuid = this.parentElement.contentElement.Uuid;
		// newAdjecentObject.Table =
		newAdjecentObject.Directed = this.directed.textContent === 'child' ? 1 : 0;
		newAdjecentObject.Type = '';
		newAdjecentObject.Order = 0;
		newAdjecentObject.Path = path;



		console.table(newAdjecentObject);

		// let newEdgeFromDb = await dbis.Edge_InsertUuidUuid(
		// 	newEdgeObject.Node1Uuid,
		// 	newEdgeObject.Node2Uuid,
		// 	newEdgeObject.Directed,
		// 	newEdgeObject.Type,
		// 	newEdgeObject.Order,
		// 	newEdgeObject.Path
		// );

		// console.log(newEdgeFromDb)

		// AFTER POST
		/* CHECK PROJECT CHILDREN AND UPDATE */
		/* CHECK CURRENT PROJECT. IF ONE OF THE CONNECTED NODE, UPDATE ADJACENT TABLES */

		setTimeout(() => {
			this.parentElement.contentObjectElement.focus()
			// document.getElementById('connectMenu_button').style.backgroundColor = 'none';

		}, 1000)
		this.button.style.backgroundColor = 'green';
	}






	// NOT BOUND TO CLASS
	async sendForm(event) {
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

		}
	}





	elementInnerHtml = `
<h3>NEW CHILD</h3>

<div id="newAdjacentMenu_table">
	<label>Table</label>
	<select class="contextElement">
		<option value="Code">Code</option>
		<option value="Project">Project</option>
		<option value="Source">Source</option>
		<option value="Text">Text</option>
	</select>
</div>

<div id="newAdjacentMenu_contentType">
	<label>Content Type</label>
	<div class="contextElement editable" contentEditable="true" tabindex=0></div>
</div>

<div id="newAdjacentMenu_node">
	<label>Node Title</label>
	<div></div>
</div>

<div id="newAdjacentMenu_directed">
	<label>Direction</label>
	<div></div>
</div>

<div id="newAdjacentMenu_path">
	<label>Path</label>
	<div class="contextElement editable" contentEditable="true" tabindex=0></div>
</div>

<button id="newAdjacentMenu_button" class="contextElement" tabindex=0>SEND</button>
	`;

}