


export class Table {

	element;
	elementInnerHtml;


	tableHead;
	tableBody;

	constructor(parentElement) {
		this.element = document.createElement('div');
		this.element.id = 'searchTableDiv';
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
<table id="searchTable" tabindex=0>
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