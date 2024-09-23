// import { dbis } from "../../dbi-send/dbi-send.js";
import { dbis } from "dbis";
import * as reviewtoolbar from "./ReviewToolbar.js"
import * as reviewsidepanel from "./ReviewSidePanel.js"
import * as reviewcontent from "./ReviewContent.js"



async function createReview(uuid){
    console.log('CREATING REVIEW');

    let _mainContent = document.getElementById("mainContentContainer");

    initReviewContainers(_mainContent);

    // populateReviewContainers(uuid);

    let reviewObject = await dbis.Content_SelectOnUuid(uuid);

    let objectToReview = await dbis.Content_SelectOnUuid(reviewObject.NodeToReviewUuid);
    // console.log("^_^_^_^_^ : ", objectToReview)

    // TODO:
    // TOOLBAR
    reviewtoolbar.populateReviewToolbar();
    reviewtoolbar.loadReviewToolbarWithObject(objectToReview, reviewObject);
    // SIDE PANEL
    reviewsidepanel.populateReviewSidePanel();
    reviewsidepanel.populateSidePanelTables(objectToReview.Uuid);

    // CONTENT
    reviewcontent.populateReviewContent();
    // Fill the panels with the children content-cards
    reviewcontent.fillShardList(objectToReview.Uuid);
    reviewcontent.fillReviewList(reviewObject.Uuid);

    // let _toolbar = document.getElementById("reviewToolbar");
    // _toolbar.addEventListener()

    displayPanelsFromLocalStorage();
}



function initReviewContainers(_mainContent){
    let mainContentContentContainer = document.createElement('div');
    mainContentContentContainer.id = 'reviewContentContentContainer';
    mainContentContentContainer.textContent = ''
    _mainContent.append(mainContentContentContainer);

    let mainContentToolbar = document.createElement('div');
    mainContentToolbar.id = 'reviewToolbarContainer';
    mainContentToolbar.tabIndex = 0;
    _mainContent.append(mainContentToolbar);

    let mainContentSidepanel = document.createElement('div');
    mainContentSidepanel.id = 'reviewSidepanelContainer';
    _mainContent.append(mainContentSidepanel);


}


function displayPanelsFromLocalStorage() {
    // console.log('sourceToolbar_filePanel', sourceToolbar_filePanel)
    // console.log('sourceToolbar_shardPanel', sourceToolbar_shardPanel)


    // let sourceToolbar_filePanel = localStorage.getItem('sourceToolbar_filePanel');
    // if (sourceToolbar_filePanel == '1') {
    // 	document.getElementById('sourceToolbar_filePanel').classList.add('selected')
    // 	this.sourceContent.filePanelContainer.classList.remove('hidden');
    // }
    // else {
    // 	document.getElementById('sourceToolbar_filePanel').classList.remove('selected')
    // 	this.sourceContent.filePanelContainer.classList.add('hidden');
    // }

    let sourceToolbar_shardPanel = localStorage.getItem('reviewToolbar_shardPanel');
    let _shardlistContainer = document.getElementById("shardlistContainer_review");
    if (sourceToolbar_shardPanel == '1') {
        document.getElementById('reviewToolbar_shardPanel').classList.add('selected')
        _shardlistContainer.classList.remove('hidden');
    }
    else {
        document.getElementById('reviewToolbar_shardPanel').classList.remove('selected')
        _shardlistContainer.classList.add('hidden');
    }


    let sourceToolbar_reviewPanel = localStorage.getItem('reviewToolbar_reviewPanel_review');
    let _reviewlistContainer = document.getElementById("reviewlistContainer_review");
    if (sourceToolbar_reviewPanel == '1') {
        document.getElementById('reviewToolbar_reviewPanel_review').classList.add('selected')
        _reviewlistContainer.classList.remove('hidden');
    }
    else {
        document.getElementById('reviewToolbar_reviewPanel_review').classList.remove('selected')
        _reviewlistContainer.classList.add('hidden');
    }




    let sourceToolbar_sidePanel = localStorage.getItem('reviewToolbar_sidePanel_review');
    let _reviewSidePanelContainer = document.getElementById("reviewSidepanelContainer");
    if (sourceToolbar_sidePanel == '1') {
        document.getElementById('reviewToolbar_sidePanel_review').classList.add('selected')
        _reviewSidePanelContainer.classList.remove('hidden');
    }
    else {
        document.getElementById('reviewToolbar_sidePanel_review').classList.remove('selected')
        _reviewSidePanelContainer.classList.add('hidden');
    }



    // let sourceToolbar_parentList = localStorage.getItem('sourceToolbar_parentList');
    // if (sourceToolbar_parentList == '1') {
    // 	document.getElementById('sourceToolbar_parentList').classList.add('selected')
    // 	this.sidePanel.parentContainer.classList.remove('hidden');
    // }
    // else {
    // 	document.getElementById('sourceToolbar_parentList').classList.remove('selected')
    // 	this.sidePanel.parentContainer.classList.add('hidden');
    // }


    // let sourceToolbar_fileList = localStorage.getItem('sourceToolbar_fileList');
    // if (sourceToolbar_fileList == '1') {
    // 	document.getElementById('sourceToolbar_fileList').classList.add('selected')
    // 	this.sidePanel.fileContainer.classList.remove('hidden');
    // }
    // else {
    // 	document.getElementById('sourceToolbar_fileList').classList.remove('selected')
    // 	this.sidePanel.fileContainer.classList.add('hidden');
    // }


    // let sourceToolbar_reviewList = localStorage.getItem('sourceToolbar_reviewList');
    // if (sourceToolbar_reviewList == '1') {
    // 	document.getElementById('sourceToolbar_reviewList').classList.add('selected')
    // 	this.sidePanel.reviewContainer.classList.remove('hidden');
    // }
    // else {
    // 	document.getElementById('sourceToolbar_reviewList').classList.remove('selected')
    // 	this.sidePanel.reviewContainer.classList.add('hidden');
    // }



    // let sourceToolbar_connectedList = localStorage.getItem('sourceToolbar_connectedList');
    // if (sourceToolbar_connectedList == '1') {
    // 	document.getElementById('sourceToolbar_connectedList').classList.add('selected')
    // 	this.sidePanel.connectedContainer.classList.remove('hidden');
    // }
    // else {
    // 	document.getElementById('sourceToolbar_connectedList').classList.remove('selected')
    // 	this.sidePanel.connectedContainer.classList.add('hidden');
    // }


}




export {
    createReview
}