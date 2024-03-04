import { dbis } from "../../dbi-send/dbi-send.js";
import { showStoastSuccess, showToast } from "../../log/toast.js";


export class ConnectMenu {

	parentElement;

	element;

	node1;
	node2;
	directed;
	path;
	button;

	node1Label = document.createElement('label');
	node2Label = document.createElement('label');
	directedLabel = document.createElement('label');
	pathLabel = document.createElement('label');


	active = false;

	constructor(parentElement) {
		this.parentElement = parentElement;
		// this.place = place;

		this.element = document.createElement('div');
		this.element.id = 'connectMenu';
		// this.element.tabIndex = 0;

		// this.element.tabIndex = 0;
		parentElement.append(this.element);


		this.element.innerHTML = this.elementInnerHtml;

		this.node1Label.textContent = 'Node 1';
		this.node2Label.textContent = 'Node 2';
		this.directedLabel.textContent = 'Directed';
		this.pathLabel.textContent = 'Path';

		this.node1 = this.element.querySelector('#connectMenu_node1');
		this.node2 = this.element.querySelector('#connectMenu_node2');
		this.directed = this.element.querySelector('#connectMenu_directed');
		this.path = this.element.querySelector('#connectMenu_path');
		this.button = this.element.querySelector('#connectMenu_button');

		this.button.addEventListener('click', this.testButtonClick.bind(this));

	}


	createForm(contentObject1, contentObject2, directed) {



		this.element.innerHTML = ` <h3>CONNECT</h3>`;


		this.node1.textContent = contentObject1.Title;
		this.node1.contentObject = contentObject1;

		this.node2.textContent = contentObject2.Title;
		this.node2.contentObject = contentObject2;

		this.directed.textContent = directed;

		this.path.textContent = '';

		this.button.style.backgroundColor = 'gray';


		this.element.append(
			this.node1Label,
			this.node1,
			this.node2Label,
			this.node2,
			this.directedLabel,
			this.directed,
			this.pathLabel,
			this.path,
			this.button
		);
		this.parentElement.append(this.element);

	}


	async testButtonClick(event) {
		console.log('BUTTON FORM CLICK!')

		let newEdgeObject = {};

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
		newEdgeObject.Node1Uuid = this.node1.contentObject.Uuid;
		newEdgeObject.Node2Uuid = this.node2.contentObject.Uuid;
		newEdgeObject.Directed = this.directed.textContent;
		newEdgeObject.Type = '';
		newEdgeObject.Order = 0;
		newEdgeObject.Path = path;



		console.table(newEdgeObject);

		let newEdgeFromDb = await dbis.Edge_InsertUuidUuid(
			newEdgeObject.Node1Uuid,
			newEdgeObject.Node2Uuid,
			newEdgeObject.Directed,
			newEdgeObject.Type,
			newEdgeObject.Order,
			newEdgeObject.Path
		);

		// console.log(newEdgeFromDb)

		// AFTER POST
		/* CHECK PROJECT CHILDREN AND UPDATE */
		/* CHECK CURRENT PROJECT. IF ONE OF THE CONNECTED NODE, UPDATE ADJACENT TABLES */

		setTimeout(() => {
			this.parentElement.contentObjectElement.focus()
			// document.getElementById('connectMenu_button').style.backgroundColor = 'none';

		}, 1000)
		this.button.style.backgroundColor = 'green';

		showStoastSuccess('New Edge! ')
	}



	/* 
		BELOW IS NOT YET IMPLEMENTED !
	*/






	// // NOT BOUND TO CLASS
	// async sendForm(event) {
	// 	// console.log('TARGET> ', event.target.classList.cont)
	// 	if (event.target.classList.contains('contextElement')) {
	// 		// console.log('FOCUS OUT ON CONTEXTDATA. PUT!')

	// 		let newContentObject = {};

	// 		let tableRows = document.querySelectorAll('#contextOverlay_contentTableBody tr');
	// 		console.log('EXTRACT: ', tableRows)
	// 		for (const tableRow of tableRows) {
	// 			let key = tableRow.children[0].textContent;
	// 			let content = tableRow.children[1].textContent;
	// 			// console.log(JSON.stringify(key), JSON.stringify(content))
	// 			newContentObject[key] = content;

	// 		}


	// 		// DEV TEST - make sure update fails
	// 		// newContentObject.Uuid = -123;

	// 		// console.log(newContentObject)

	// 	}
	// }

	// extractContentObjectFromDom() {

	// }

	// async postEdge() {

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
	// 		

	// 	} catch (error) {
	// 		showToast('Error PUT contentObject')
	// 	}

	// }




	// populate(contentObject1, contentObject2) {

	// }





	elementInnerHtml = `
<h3>CONNECT</h3>

<div id="connectMenu_node1" class="contextElement"></div>
<div id="connectMenu_node2" class="contextElement"></div>

<div id="connectMenu_directed" class="contextElement"></div>
<div id="connectMenu_path" class="contextElement" contentEditable="true" tabindex=0></div>

<button id="connectMenu_button" class="contextElement" tabindex=0>SEND</button>
	`;

}