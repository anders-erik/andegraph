import { dbis } from "../../dbi-send/dbi-send.js";


export class Review {

	element;
	elementInnerHtml;

	table;
	tableBody;



	constructor(parentElement) {
		this.element = document.createElement('div');
		this.element.id = 'review';
		parentElement.append(this.element);

		this.element.innerHTML = this.elementInnerHtml;


		this.tableBody = this.element.querySelector('#reviewTableBody');

		this.fetch();



	}




	async fetch() {

		// console.log('GET REVIEW!')
		let reviewContentObjects = await dbis.Review_SelectCurrentReview();
		this.insertReviewObjects(reviewContentObjects);
		// console.log(reviewContentObjects)

	}




	insertReviewObjects(reviewObjects) {


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







	elementInnerHtml = `
	<h3>REVIEW</h3>
<table id="reviewTable">
	<thead>
		<tr id="reviewTableHead">
			<th class="reviewTableElement">ReviewDate</th>
			<th class="reviewTableElement">NodeToReviewUuid</th>
		</tr>
	</thead>
	<tbody id="reviewTableBody">

	</tbody>
</table>
	`;


}

