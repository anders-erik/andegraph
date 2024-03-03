import { ReviewList } from "./reviewlist/ReviewList.js";
import { ShardList } from "./shardlist/ShardList.js";


export class SourceContent {
	contentContentContainer;

	element;

	filePanelContainer;
	shardlistContainer;
	reviewlistContainer;

	shardList;
	reviewList;



	constructor(contentContainer) {
		this.contentContentContainer = contentContainer;

		this.element = document.createElement('div');
		this.element.id = 'sourceContent';
		// this.element.tabIndex = 0;
		this.element.innerHTML = this.sourceContentInnerHtml;

		this.filePanelContainer = this.element.querySelector('#filePanelContainer');
		this.shardlistContainer = this.element.querySelector('#shardlistContainer');
		this.reviewlistContainer = this.element.querySelector('#reviewlistContainer');

		this.shardList = new ShardList(this.shardlistContainer);
		this.reviewList = new ReviewList(this.reviewlistContainer);

	}


	load(childrenContentEdge) {
		this.contentContentContainer.innerHTML = ``;
		this.contentContentContainer.append(this.element);

		this.shardList.load(childrenContentEdge);
		// this.reviewList.load([]);
	}




	sourceContentInnerHtml = `


<div id="filePanelContainer" class="hidden" tabindex=0>
	file panel
</div>

<div id="shardlistContainer" class="" tabindex=0>
	
</div>

<div id="reviewlistContainer" class="" tabindex=0>
	
</div>
	`;

}