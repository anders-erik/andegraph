import { dbis } from "../../dbi-send/dbi-send.js";




async function populateReviewToolbar() {
    console.log("------------------------------")
    let _toolbarContainer = document.getElementById("reviewToolbarContainer");


    let toolbar = document.createElement('div');
    toolbar.id = 'reviewToolbar';
    // this.element.tabIndex = 0;
    toolbar.innerHTML = reviewToolbarInnerHtml;
    toolbar.hideShardcontentCheckbox;

    toolbar.addEventListener("click", clickToolbar);

    // this.element.addEventListener('keydown', this.keydownToolbar);


    // let contentTable = this.element.querySelector('#toolbar_contentTable');


    let hideShardcontentCheckbox = toolbar.querySelector('#hideShardcontentCheckbox_review');
    // // console.log('hideShardcontentCheckbox', this.hideShardcontentCheckbox)
    hideShardcontentCheckbox.addEventListener('change', hideShardcontentCheckboxChange);

    // toolbar.click();
    _toolbarContainer.append(toolbar);
}





async function clickToolbar(event) {

    // console.log(event.target.id)
    let containsSelected = event.target.classList.contains('selected');

    switch (event.target.id) {

        // CONTENT PANELS
        // case 'sourceToolbar_filePanel':
        // 	if (containsSelected) {
        // 		event.target.classList.remove('selected')
        // 		this.sourceContent.filePanelContainer.classList.add('hidden');
        // 	}
        // 	else {
        // 		event.target.classList.add('selected')
        // 		this.sourceContent.filePanelContainer.classList.remove('hidden');
        // 	}
        // 	break;


        case 'toolbar_completeReview_review':
            // console.log('clickclick')
            let currentReviewElement = document.getElementById('reviewContentReview');

            // only do if review is not completed
            if (currentReviewElement.contentObject && (currentReviewElement.contentObject.ReviewCompleted == '0')) {

                let newContentObject = currentReviewElement.contentObject;
                // console.table(contentObject)
                newContentObject.ReviewCompleted = 1;
                let currentDate = new Date(Date.now());
                // newContentObject.ReviewCompletedOnDate = currentDate.getUTCFullYear() + '-' + currentDate.getUTCMonth() + '-' + currentDate.getUTCDate();
                newContentObject.ReviewCompletedOnDate = currentDate.toISOString().substring(0, 10);

                newContentObject = await dbis.Content_UpdateWithContentObject(newContentObject);

                currentReviewElement.contentObject = newContentObject;
                currentReviewElement.update();
                
                // Update all with same uuid
                let contentElementsWithSameUuid = document.querySelectorAll(`[data-uuid='${newContentObject.Uuid}']`);
                for (const element of contentElementsWithSameUuid) {
                    element.dataset.uuid = newContentObject.Uuid;
                    element.contentObject = newContentObject;
                    element.update();
                }

                // remove from review list menu
                let reviewsDueMenu = document.getElementById('review');
                let reviewElementDueWithSameUuid = reviewsDueMenu.querySelector(`[data-uuid='${newContentObject.Uuid}']`);
                reviewElementDueWithSameUuid.remove();
            }
            break;


        case 'reviewToolbar_shardPanel':
            let _shardlistContainer = document.getElementById('shardlistContainer_review');
            if (containsSelected) {
                event.target.classList.remove('selected')
                _shardlistContainer.classList.add('hidden');
            }
            else {
                event.target.classList.add('selected')
                _shardlistContainer.classList.remove('hidden');
            }
            break;

        case 'reviewToolbar_reviewPanel_review':
            let _reviewShardListContainer = document.getElementById('reviewlistContainer_review');
            if (containsSelected) {
                event.target.classList.remove('selected')
                _reviewShardListContainer.classList.add('hidden');
            }
            else {
                event.target.classList.add('selected')
                _reviewShardListContainer.classList.remove('hidden');
            }
            break;


        // SIDE PANEL

        case 'reviewToolbar_sidePanel_review':
            // console.log('Side panel button clicked')
            let _mainContentSidePanel = document.getElementById("reviewSidepanelContainer");

            if (containsSelected) {
                event.target.classList.remove('selected')
                _mainContentSidePanel.classList.add('hidden');
            }
            else {
                event.target.classList.add('selected')
                _mainContentSidePanel.classList.remove('hidden');
            }
            break;

        default:
            break;
    }

    updateLocalStorage_toolbarValues();

}

function updateLocalStorage_toolbarValues() {


    // localStorage.setItem('sourceToolbar_filePanel', document.getElementById('sourceToolbar_filePanel').classList.contains('selected') ? '1' : '0');
    localStorage.setItem('reviewToolbar_shardPanel', document.getElementById('reviewToolbar_shardPanel').classList.contains('selected') ? '1' : '0');
    localStorage.setItem('reviewToolbar_reviewPanel_review', document.getElementById('reviewToolbar_reviewPanel_review').classList.contains('selected') ? '1' : '0');

    localStorage.setItem('reviewToolbar_sidePanel_review', document.getElementById('reviewToolbar_sidePanel_review').classList.contains('selected') ? '1' : '0');
    // localStorage.setItem('sourceToolbar_parentList', document.getElementById('sourceToolbar_parentList').classList.contains('selected') ? '1' : '0');
    // localStorage.setItem('sourceToolbar_fileList', document.getElementById('sourceToolbar_fileList').classList.contains('selected') ? '1' : '0');
    // localStorage.setItem('sourceToolbar_reviewList', document.getElementById('sourceToolbar_reviewList').classList.contains('selected') ? '1' : '0');
    // localStorage.setItem('sourceToolbar_connectedList', document.getElementById('sourceToolbar_connectedList').classList.contains('selected') ? '1' : '0');
}




async function loadReviewToolbarWithObject(_contentObject, _reviewObject){
    let _toolbarElement = document.getElementById("reviewToolbar");
    let hideShardcontentCheckbox = document.querySelector('#hideShardcontentCheckbox_review');
    // let contentObject = await dbis.Content_SelectOnUuid(_contentObject.uuid);
    // this.toolbarContainer.innerHTML = ``;
    // this.toolbarContainer.append(this.element);

    let contentTableLabel = document.getElementById("toolbar_contentTable_review");
    contentTableLabel.textContent = _contentObject.Table;

    let reviewContentReview = document.getElementById('reviewContentReview');
    reviewContentReview.innerHTML = `-`;
    reviewContentReview.classList.remove('completed');
    reviewContentReview.classList.remove('notcompleted');

    reviewContentReview.update = function () {
        this.innerHTML = `${this.contentObject.ReviewDate}`;
        if (this.contentObject.ReviewCompleted == 1) {
            this.classList.add('completed');
            this.classList.remove('notcompleted');
        }
        else {
            this.classList.remove('completed');
            this.classList.add('notcompleted');
        }
    }

    // SET REVIEW-OBJECT IN TOOLBAR

    reviewContentReview.contentObject = _reviewObject;
    reviewContentReview.dataset.uuid = _reviewObject.Uuid;
    reviewContentReview.update();
    // Make sure that it is updated - 2024-09-22
    // mainContentReview.update();

    if (_contentObject.Title === '') {
        document.getElementById('reviewContentTitle').textContent = '-';
    }
    else {
        document.getElementById('reviewContentTitle').textContent = _contentObject.Title;
    }

    document.getElementById('reviewContentTitle').contentObject = _contentObject;


    let hideShardcontentCheckbox_val = localStorage.getItem('hideShardcontentCheckbox_review');
    // console.log('hideShardcontentCheckbox', hideShardcontentCheckbox)
    if (hideShardcontentCheckbox_val == '1') {
        hideShardcontentCheckbox.checked = true;
    }
    else {
        hideShardcontentCheckbox.checked = false;
    }

    
}




function hideShardcontentCheckboxChange(event) {
    // console.log('CHCH')
    let isChecked = document.getElementById('hideShardcontentCheckbox_review').checked;

    localStorage.setItem('hideShardcontentCheckbox_review', isChecked ? '1' : '0');

    // toggle content card overlay immediately
    let shardList = document.getElementById('shardList_review');
    for (const contentCardOverlay of shardList.querySelectorAll('.contentCardOverlay')) {
        if (isChecked) {
            contentCardOverlay.classList.add('hidden');
        }
        else {
            contentCardOverlay.classList.remove('hidden');
        }
    }
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

