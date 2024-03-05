


export class Table {

	element;
	elementInnerHtml;


	tableHead;
	tableBody;

	constructor(parentElement) {
		this.element = document.createElement('div');
		this.element.id = 'searchTableDiv';
		this.element.tabIndex = 0;
		parentElement.append(this.element);

		this.element.innerHTML = this.elementInnerHtml;


		this.tableHead = this.element.querySelector('#searchTableHead');
		this.tableBody = this.element.querySelector('#searchTableBody');
	}


	insertReviewObjects(reviewObjects) {

		this.tableHead.innerHTML = this.reviewHeadInnerHtml;

		this.tableBody.innerHTML = ``;

		for (const reviewObject of reviewObjects) {

			// console.log(contentEdgeObject)
			let tableRow = document.createElement('tr');
			tableRow.tabIndex = 0;
			tableRow.contentObject = reviewObject;
			tableRow.dataset.uuid = reviewObject.Uuid;
			tableRow.update = function () {
				this.innerHTML = `
				<td>${this.contentObject.ReviewDate}</td>
				<td>${this.contentObject.NodeToReviewUuid}</td>
			`
			}
			this.tableBody.append(tableRow);

			tableRow.innerHTML += `
				<td>${reviewObject.ReviewDate}</td>
				<td>${reviewObject.NodeToReviewUuid}</td>
			`

		}
	}


	insertContentObjects(contentObjects) {

		this.tableHead.innerHTML = this.contentHeadInnerHtml;

		this.tableBody.innerHTML = ``;

		for (const contentObject of contentObjects) {

			// console.log(contentEdgeObject)
			let tableRow = document.createElement('tr');
			tableRow.tabIndex = 0;
			tableRow.contentObject = contentObject;
			tableRow.dataset.uuid = contentObject.Uuid;
			tableRow.update = function () {
				this.innerHTML = `
				<td>${this.contentObject.Uuid}</td>
				<td>${this.contentObject.Table}</td>
				<td>${this.contentObject.Type}</td>
				<td>${this.contentObject.Title}</td>
				<td>${this.contentObject.TimeCreated}</td>
				<td>${this.contentObject.TimeLastChange}</td>
			`
			}
			this.tableBody.append(tableRow);

			tableRow.innerHTML += `
				<td>${contentObject.Uuid}</td>
				<td>${contentObject.Table}</td>
				<td>${contentObject.Type}</td>
				<td>${contentObject.Title}</td>
				<td>${contentObject.TimeCreated}</td>
				<td>${contentObject.TimeLastChange}</td>
			`

		}
	}


	contentHeadInnerHtml = `
		<th class="searchTableElement">Uuid</th>
		<th class="searchTableElement">Table</th>
		<th class="searchTableElement">Type</th>
		<th class="searchTableElement">Title</th>
		<th class="searchTableElement">TimeCreated</th>
		<th class="searchTableElement">TimeLastChange</th>
	`;

	reviewHeadInnerHtml = `
		<th class="searchTableElement">ReviewDate</th>
		<th class="searchTableElement">NodeToReviewUuid</th>
	`;


	elementInnerHtml = `
<table id="searchTable">
	<thead>
		<tr id="searchTableHead">
			<th class="searchTableElement">Uuid</th>
			<th class="searchTableElement">Table</th>
			<th class="searchTableElement">Type</th>
			<th class="searchTableElement">Title</th>
			<th class="searchTableElement">TimeCreated</th>
			<th class="searchTableElement">TimeLastChange</th>
		</tr>
	</thead>
	<tbody id="searchTableBody">

	</tbody>
</table>
	`;
}