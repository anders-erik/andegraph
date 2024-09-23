

export class SourceSidePanel {
	sidepanelContainer;

	element;

	parentContainer;
	fileContainer;
	reviewContainer;
	connectedContainer;




	constructor(sidepanelContainer) {
		this.sidepanelContainer = sidepanelContainer;

		this.element = document.createElement('div');
		this.element.id = 'sourceSidePanel';
		// this.element.tabIndex = 0;
		this.element.innerHTML = this.sidePanelInnerHtml;

		this.parentContainer = this.element.querySelector('#sourceParentContainer');
		this.fileContainer = this.element.querySelector('#sourceFileContainer');
		this.reviewContainer = this.element.querySelector('#sourceReviewContainer');
		this.connectedContainer = this.element.querySelector('#sourceConnectedContainer');


	}


	load() {
		this.sidepanelContainer.innerHTML = ``;
		this.sidepanelContainer.append(this.element);

	}


	loadParents(parentContentEdges) {
		let tbody = this.parentContainer.querySelector('table tbody')
		tbody.innerHTML = ``;
		// console.log(tbody)
		for (const contentEdge of parentContentEdges) {
			// console.log(contentEdge)
			let tr = document.createElement('tr');
			tr.contentObject = contentEdge.content;
			tr.edgeObject = contentEdge.edge;
			tr.dataset.uuid = contentEdge.content.Uuid;
			tr.dataset.edgeuuid = contentEdge.edge.Uuid;
			tr.tabIndex = 0;

			tr.update = function () {
				this.innerHTML = `
					<td class="">${this.contentObject.Table}</td>
					<td class="">${this.contentObject.Title}</td>
				`;
			}

			tr.innerHTML = `
				<td class="">${contentEdge.content.Table}</td>
				<td class="">${contentEdge.content.Title}</td>
			`;
			tbody.append(tr)
		}
	}

	loadFiles(fileContentEdges) {
		let tbody = this.fileContainer.querySelector('table tbody')
		tbody.innerHTML = ``;
		// console.log(tbody)
		for (const contentEdge of fileContentEdges) {
			// console.log(contentEdge)
			let tr = document.createElement('tr');
			tr.contentObject = contentEdge.content;
			tr.edgeObject = contentEdge.edge;
			tr.dataset.uuid = contentEdge.content.Uuid;
			tr.dataset.edgeuuid = contentEdge.edge.Uuid;
			tr.tabIndex = 0;

			tr.update = function () {
				this.innerHTML = `
					<td class="">${this.contentObject.Table}</td>
					<td class="">${this.contentObject.Title}</td>
				`;
			}

			tr.innerHTML = `
				<td class="">${contentEdge.content.Table}</td>
				<td class="">${contentEdge.content.Title}</td>
			`;
			tbody.append(tr)
		}
	}


	loadReviews(reviewContentEdges) {
		let tbody = this.reviewContainer.querySelector('table tbody')
		tbody.innerHTML = ``;
		// console.log(tbody)
		for (const contentEdge of reviewContentEdges) {
			// console.log(contentEdge)
			let tr = document.createElement('tr');
			tr.contentObject = contentEdge.content;
			tr.edgeObject = contentEdge.edge;
			tr.dataset.uuid = contentEdge.content.Uuid;
			tr.dataset.edgeuuid = contentEdge.edge.Uuid;
			tr.tabIndex = 0;



			tr.update = function () {
				let completedString = this.contentObject.ReviewCompleted ? 'completed' : '';
				this.innerHTML = `
					<td class="${completedString} reviewDate">${contentEdge.content.ReviewDate}</td>
				`;
			}

			let completedString = contentEdge.content.ReviewCompleted ? 'completed' : '';
			tr.innerHTML = `
				<td class="${completedString} reviewDate">${contentEdge.content.ReviewDate}</td>
			`;
			tbody.append(tr)
		}
	}


	loadConnected(connectedContentEdges) {
		let tbody = this.connectedContainer.querySelector('table tbody')
		tbody.innerHTML = ``;
		// console.log(tbody)
		for (const contentEdge of connectedContentEdges) {
			// console.log(contentEdge)
			let tr = document.createElement('tr');
			tr.contentObject = contentEdge.content;
			tr.edgeObject = contentEdge.edge;
			tr.dataset.uuid = contentEdge.content.Uuid;
			tr.dataset.edgeuuid = contentEdge.edge.Uuid;
			tr.tabIndex = 0;

			tr.update = function () {
				this.innerHTML = `
					<td class="">${this.contentObject.Table}</td>
					<td class="">${this.contentObject.Title}</td>
				`;
			}

			tr.innerHTML = `
				<td class="">${contentEdge.content.Table}</td>
				<td class="">${contentEdge.content.Title}</td>
			`;
			tbody.append(tr)
		}
	}



	sidePanelInnerHtml = `


<div id="sourceParentContainer" class="" tabindex=0>
	<div>PARENTS</div>
	<table>
		<thead>
			<tr>
				<th>Table</th>
				<th>Title</th>
			</tr>
		</thead>
		<tbody>
		</tbody>
	</table>
</div>

<div id="sourceFileContainer" class="" tabindex=0>
	<div>FILES</div>
	<table>
		<thead>
			<tr>
				<th>Table</th>
				<th>Title</th>
			</tr>
		</thead>
		<tbody>
		</tbody>
	</table>
</div>

<div id="sourceReviewContainer" class="" tabindex=0>
	<div>REVIEWS</div>
	<table>
		<thead>
			<tr>
				<th>Date</th>
			</tr>
		</thead>
		<tbody>
		</tbody>
	</table>
</div>

<div id="sourceConnectedContainer" class="" tabindex=0>
	<div>OTHER</div>
	<table>
		<thead>
			<tr>
				<th>Table</th>
				<th>Title</th>
			</tr>
		</thead>
		<tbody>
		</tbody>
	</table>
</div>

	`;

}