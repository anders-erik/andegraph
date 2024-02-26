
import { dbis } from "../../dbi-send/dbi-send.js";

export class Project {

	element;
	projectTitleElement;
	tableBody;

	contentObject;
	childrenContentEdgeObject;
	// childrenDomElements;

	constructor(parentElement) {
		this.element = document.createElement('div');
		this.element.id = 'mainOverlayProject';
		parentElement.append(this.element)

		this.element.innerHTML = this.projectInnerHtml;
		this.projectTitleElement = this.element.querySelector('#mainOverlay_projectTitle');
		this.tableBody = this.element.querySelector('#mainOverlay_projectTableBody')
	}

	async updateCurrentProjectOnUuid(projectUuid) {

		this.contentObject = await dbis.Content_SelectOnUuid(projectUuid);

		this.childrenContentEdgeObject = await dbis.ContentEdge_SelectChildOfUuid(projectUuid);

		this.projectTitleElement.innerHTML = this.contentObject.Title;
		this.projectTitleElement.contentObject = this.contentObject;
		this.projectTitleElement.dataset.uuid = this.contentObject.Uuid;
		this.projectTitleElement.update = function () {
			this.innerHTML = this.contentObject.Title;
		}

		this.insertContentEdgesIntoDom();
	}

	insertContentEdgesIntoDom() {
		this.tableBody.innerHTML = ``;

		for (const contentEdgeObject of this.childrenContentEdgeObject) {
			// console.log(contentEdgeObject)
			let tableRow = document.createElement('tr');
			tableRow.tabIndex = 0;
			tableRow.contentObject = contentEdgeObject.content;
			tableRow.dataset.uuid = contentEdgeObject.content.Uuid;
			tableRow.edgeObject = contentEdgeObject.edge;
			tableRow.dataset.edgeuuid = contentEdgeObject.edge.Uuid;
			tableRow.update = function () {
				this.innerHTML = `
				<td>${this.contentObject.Table}</td>
				<td>${this.contentObject.Title}</td>
				<td>${this.edgeObject.Path}</td>
			`
			}
			this.tableBody.append(tableRow);

			tableRow.innerHTML += `
				<td>${contentEdgeObject.content.Table}</td>
				<td>${contentEdgeObject.content.Title}</td>
				<td>${contentEdgeObject.edge.Path}</td>
			`

		}
	}





	projectInnerHtml = `

<div id="mainOverlay_projectTitle" tabindex=0>PLACEHOLDER TITLE</div>

<table id="mainOverlay_projectTable" tabindex=0>
	<thead>
		<tr id="mainOverlay_projectTableHead">
			<th class="mainOverlay_tableElement">Table</th>
			<th class="mainOverlay_tableElement">Title</th>
			<th class="mainOverlay_tableElement">edge.Path</th>
		</tr>
	</thead>
	<tbody id="mainOverlay_projectTableBody">

	</tbody>
</table>

`;

	/* 
	<div id="mainOverlay_projectPadding"></div>
	 */
}