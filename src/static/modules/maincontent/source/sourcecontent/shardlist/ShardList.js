import { ContentCard } from "../../../../contentcard/ContentCard.js";


export class ShardList {
	shardListContainer;

	element;




	constructor(shardListContainer) {
		this.shardListContainer = shardListContainer;

		this.element = document.createElement('div');
		this.element.id = 'shardList';
		// this.element.tabIndex = 0;
		this.element.innerHTML = this.shardListInnerHtml;

		shardListContainer.append(this.element)

	}


	load(shardContentEdges) {
		this.shardListContainer.innerHTML = ``;
		this.shardListContainer.append(this.element);
		this.element.innerHTML = '';

		let hideContentCheckboxChecked = document.getElementById('hideShardcontentCheckbox').checked;

		// console.log('LOAD SHARD LIST ', shardContentEdges)

		for (const contentEdge of shardContentEdges) {
			// console.log(contentEdge.content.Title)
			let shardCard = new ContentCard(contentEdge.content);
			shardCard.edgeObject = contentEdge.edge;
			shardCard.dataset.edgeuuid = contentEdge.edge.Uuid;

			if (hideContentCheckboxChecked) {
				// shardCard.overlayElement.classList.add('hidden');
				shardCard.querySelector('.contentCardOverlay').classList.add('hidden')
				// console.log(shardCard.element)
			}

			this.element.append(shardCard)
		}

	}


	insertContentEdge(contentEdge) {

		let hideContentCheckboxChecked = document.getElementById('hideShardcontentCheckbox').checked;

		// console.log('LOAD SHARD LIST ', shardContentEdges)

		let shardCard = new ContentCard(contentEdge.content);
		shardCard.edgeObject = contentEdge.edge;
		shardCard.dataset.edgeuuid = contentEdge.edge.Uuid;

		if (hideContentCheckboxChecked) {
			// shardCard.overlayElement.classList.add('hidden');
			shardCard.querySelector('.contentCardOverlay').classList.add('hidden')
			// console.log(shardCard.element)
		}

		// this.element.insertAdjacentHTML("afterbegin", shardCard)
		// this.element.inser(shardCard, this.element.lastElementChild)
		this.element.appendChild(shardCard);
		shardCard.scrollIntoView({ behavior: 'instant', block: 'center' });
		shardCard.focus();
		// this.element.append(shardCard)



	}



	shardListInnerHtml = `

	`;

}