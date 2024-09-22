import { dbis } from "dbis";

async function populateReviewSidePanel() {
	console.log("------------------------------")
	let _sidePanelContainer = document.getElementById("reviewSidepanelContainer");


	let toolbar = document.createElement('div');
	toolbar.id = 'reviewSidePanel';
	// this.element.tabIndex = 0;
	toolbar.innerHTML = reviewSidePanelInnerHtml;
	// toolbar.hideShardcontentCheckbox;

	// this.element.addEventListener('keydown', this.keydownToolbar);


	// let contentTable = this.element.querySelector('#toolbar_contentTable');


	// let hideShardcontentCheckbox = toolbar.querySelector('#hideShardcontentCheckbox');
	// // console.log('hideShardcontentCheckbox', this.hideShardcontentCheckbox)
	// hideShardcontentCheckbox.addEventListener('change', hideShardcontentCheckboxChange);

	_sidePanelContainer.append(toolbar);
}

function populateSidePanelTables(uuid){
	loadParents(uuid);
	loadFiles(uuid);
	loadReviews(uuid);
	loadConnected(uuid);
}



async function loadParents(uuid) {
	
	let contentObject = await dbis.Content_SelectOnUuid(uuid);
	let parentContentEdges = await dbis.ContentEdge_SelectParentOfUuid(contentObject.Uuid);
	parentContentEdges.sort((a, b) => {
		if (a.content.Title.toLowerCase() < b.content.Title.toLowerCase()) { return -1; }
		if (a.content.Title.toLowerCase() > b.content.Title.toLowerCase()) { return 1; }
		return 0;
	})

	let parentContainer = document.getElementById("reviewParentContainer");
	let tbody = parentContainer.querySelector('table tbody')
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




async function loadFiles(uuid) {

	let contentObject = await dbis.Content_SelectOnUuid(uuid);
	let undirectedContentEdges = await dbis.ContentEdge_SelectUndirectedOfUuid(contentObject.Uuid);
	let fileContentEdges = undirectedContentEdges.filter(contentEdge => contentEdge.content.Table === 'File');
	fileContentEdges.sort((a, b) => {
	    if (a.content.Title.toLowerCase() < b.content.Title.toLowerCase()) { return -1; }
	    if (a.content.Title.toLowerCase() > b.content.Title.toLowerCase()) { return 1; }
	    return 0;
	})

	let fileContainer = document.getElementById("reviewFileContainer");
	let tbody = fileContainer.querySelector('table tbody')
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



async function loadReviews(uuid) {

	let contentObject = await dbis.Content_SelectOnUuid(uuid);
	let undirectedContentEdges = await dbis.ContentEdge_SelectUndirectedOfUuid(contentObject.Uuid);

	let reviewContentEdges = undirectedContentEdges.filter(contentEdge => contentEdge.content.Table === 'Review');
	reviewContentEdges.sort((a, b) => {
	    if (a.content.ReviewDate < b.content.ReviewDate) { return -1; }
	    if (a.content.ReviewDate > b.content.ReviewDate) { return 1; }
	    return 0;
	})

	let reviewContainer = document.getElementById("reviewReviewContainer");
	let tbody = reviewContainer.querySelector('table tbody')
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


async function loadConnected(uuid) {

	let contentObject = await dbis.Content_SelectOnUuid(uuid);
	let undirectedContentEdges = await dbis.ContentEdge_SelectUndirectedOfUuid(contentObject.Uuid);
	console.log(undirectedContentEdges)
	undirectedContentEdges = undirectedContentEdges.filter(contentEdge => !(contentEdge.content.Table === 'Review' || contentEdge.content.Table === 'File'));
	undirectedContentEdges.sort((a, b) => {
	    if (a.content.Title.toLowerCase() < b.content.Title.toLowerCase()) { return -1; }
	    if (a.content.Title.toLowerCase() > b.content.Title.toLowerCase()) { return 1; }
	    return 0;
	})

	let connectedContainer = document.getElementById("reviewConnectedContainer");

	let tbody = connectedContainer.querySelector('table tbody')
	tbody.innerHTML = ``;
	// console.log(tbody)
	for (const contentEdge of undirectedContentEdges) {
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


export {
	populateReviewSidePanel,
	populateSidePanelTables,
}







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

}

let reviewSidePanelInnerHtml = `


<div id="reviewParentContainer" class="" tabindex=0>
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

<div id="reviewFileContainer" class="" tabindex=0>
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

<div id="reviewReviewContainer" class="" tabindex=0>
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

<div id="reviewConnectedContainer" class="" tabindex=0>
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

