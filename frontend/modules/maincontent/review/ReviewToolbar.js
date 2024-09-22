import { dbis } from "../../dbi-send/dbi-send.js";




async function populateReviewToolbar() {
    console.log("------------------------------")
    let _toolbarContainer = document.getElementById("reviewToolbarContainer");


    let toolbar = document.createElement('div');
    toolbar.id = 'reviewToolbar';
    // this.element.tabIndex = 0;
    toolbar.innerHTML = reviewToolbarInnerHtml;
    toolbar.hideShardcontentCheckbox;

    // this.element.addEventListener('keydown', this.keydownToolbar);


    // let contentTable = this.element.querySelector('#toolbar_contentTable');


    let hideShardcontentCheckbox = toolbar.querySelector('#hideShardcontentCheckbox_review');
    // // console.log('hideShardcontentCheckbox', this.hideShardcontentCheckbox)
    hideShardcontentCheckbox.addEventListener('change', hideShardcontentCheckboxChange);

    _toolbarContainer.append(toolbar);
}



async function loadReviewToolbarWithObject(uuid){
    let _toolbarElement = document.getElementById("reviewToolbar");
    let hideShardcontentCheckbox = document.querySelector('#hideShardcontentCheckbox_review');
    let contentObject = await dbis.Content_SelectOnUuid(uuid);
    // this.toolbarContainer.innerHTML = ``;
    // this.toolbarContainer.append(this.element);

    let contentTableLabel = document.getElementById("toolbar_contentTable_review");
    contentTableLabel.textContent = contentObject.Table;

    let mainContentReview = document.getElementById('reviewContentReview');
    mainContentReview.innerHTML = `-`;
    mainContentReview.classList.remove('completed');
    mainContentReview.classList.remove('notcompleted');

    mainContentReview.update = function () {
        this.innerHTML = `${contentObject.ReviewDate}`;
        if (contentObject.ReviewCompleted == 1) {
            this.classList.add('completed');
            this.classList.remove('notcompleted');
        }
        else {
            this.classList.remove('completed');
            this.classList.add('notcompleted');
        }
    }
    // Make sure that it is updated - 2024-09-22
    // mainContentReview.update();

    if (contentObject.Title === '') {
        document.getElementById('reviewContentTitle').textContent = '-';
    }
    else {
        document.getElementById('reviewContentTitle').textContent = contentObject.Title;
    }

    document.getElementById('reviewContentTitle').contentObject = contentObject;


    let hideShardcontentCheckbox_val = localStorage.getItem('hideShardcontentCheckbox_review');
    // console.log('hideShardcontentCheckbox', hideShardcontentCheckbox)
    if (hideShardcontentCheckbox_val == '1') {
        hideShardcontentCheckbox.checked = true;
    }
    else {

    }

    
}




function hideShardcontentCheckboxChange(event) {
    // console.log('CHCH')
    let isChecked = document.getElementById('hideShardcontentCheckbox_review').checked;

    localStorage.setItem('hideShardcontentCheckbox', isChecked ? '1' : '0');

    // toggle content card overlay immediately
    // let shardList = document.getElementById('shardList');
    // for (const contentCardOverlay of shardList.querySelectorAll('.contentCardOverlay')) {
    //     if (isChecked) {
    //         contentCardOverlay.classList.add('hidden');
    //     }
    //     else {
    //         contentCardOverlay.classList.remove('hidden');
    //     }
    // }
}



export{
    populateReviewToolbar,
    loadReviewToolbarWithObject
}




let reviewToolbarInnerHtml = `

    <label id="toolbar_contentTable_review">-</label>

    <div id="reviewContentTitle" tabindex=0>
        -
    </div>
    <div id="reviewToolbar_shardPanel" class="button selected">Shard List</div>
    <label id="hideShardcontentLabel" for="hideShardcontentCheckbox">Show</label>
    <input id="hideShardcontentCheckbox_review" type="checkbox" ></input>


    <div id="reviewContentReview" tabindex=0>
        -
    </div>
    <button id="toolbar_completeReview_review" class=" ">Complete</button>
    <div id="reviewToolbar_reviewPanel_review" class="button">Review List</div>


    <div id="reviewToolbar_sidePanel_review" class="button">Connections</div>

`;

