import * as shardlist from "./CardList.js"

async function populateReviewContent(){

    let reviewContentContentContainer = document.getElementById("reviewContentContentContainer");

    reviewContentContentContainer.innerHTML = ``;
    

    let element = document.createElement('div');
    element.id = 'reviewContent';
    // this.element.tabIndex = 0;
    element.innerHTML = reviewContentInnerHtml;

    reviewContentContentContainer.append(element);

    // let shardlistContainer = element.querySelector('#shardlistContainer_review');

    shardlist.populateReviewLists();


    // SHOW / HIDE FROM STORE KEY-VALUES
    

    // this.filePanelContainer = this.element.querySelector('#filePanelContainer');
    // this.shardlistContainer = this.element.querySelector('#shardlistContainer');
    // this.reviewlistContainer = this.element.querySelector('#reviewlistContainer');

    // this.shardList = new ShardList(this.shardlistContainer);
    // this.reviewList = new ReviewList(this.reviewlistContainer);

}

async function fillShardList(uuid){
    shardlist.loadShardCards(uuid);
}
async function fillReviewList(uuid) {
    shardlist.loadReviewCards(uuid);
}


export {
    populateReviewContent,
    fillShardList,
    fillReviewList,
}



let reviewContentInnerHtml = `


<div id="filePanelContainer_review" class="hidden" tabindex=0>
	file panel
</div>

<div id="shardlistContainer_review" class="" tabindex=0>
	
</div>

<div id="reviewlistContainer_review" class="" tabindex=0>
	
</div>
	`;
