import { ContentCard } from "../../../../contentcard/ContentCard.js";


export class ReviewList {
	reviewListContainer;

	element;




	constructor(reviewListContainer) {
		this.reviewListContainer = reviewListContainer;

		this.element = document.createElement('div');
		this.element.id = 'reviewList';
		// this.element.tabIndex = 0;
		this.element.innerHTML = this.shardListInnerHtml;

		reviewListContainer.append(this.element)

	}


	load(reviewChildContentEdges) {

		this.reviewListContainer.innerHTML = ``;
		this.reviewListContainer.append(this.element);
		this.element.innerHTML = '';


		for (const contentEdge of reviewChildContentEdges) {

			let contentCard = new ContentCard(contentEdge.content);
			contentCard.edgeObject = contentEdge.edge;
			contentCard.dataset.edgeuuid = contentEdge.edge.Uuid;


			this.element.append(contentCard)
		}

	}


	insertContentEdge(contentEdge) {

		let contentCard = new ContentCard(contentEdge.content);
		contentCard.edgeObject = contentEdge.edge;
		contentCard.dataset.edgeuuid = contentEdge.edge.Uuid;

		this.element.appendChild(contentCard);
		contentCard.scrollIntoView({ behavior: 'instant', block: 'center' });
		contentCard.focus();

	}



	shardListInnerHtml = `

	`;

}