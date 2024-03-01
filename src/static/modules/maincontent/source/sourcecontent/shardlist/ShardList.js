import { ShardCard } from "./shardcard/ShardCard.js";


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

		console.log('LOAD SHARD LIST ', shardContentEdges)

		for (const contentEdge of shardContentEdges) {
			console.log(contentEdge.content.Title)
			let shardCard = new ShardCard(contentEdge);
			this.element.append(shardCard)
		}

	}


	insertShardCard(contentEdge) {


	}



	shardListInnerHtml = `

	`;

}