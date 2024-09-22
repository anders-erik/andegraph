import { dbis } from "../../dbi-send/dbi-send.js";
import * as reviewtoolbar from "./ReviewToolbar.js"
import * as reviewsidepanel from "./ReviewSidePanel.js"
import * as reviewcontent from "./ReviewContent.js"


async function createReview(uuid){
    console.log('CREATING REVIEW');

    let _mainContent = document.getElementById("mainContentContainer");

    initReviewContainers(_mainContent);

    // populateReviewContainers(uuid);

    // TODO:
    // TOOLBAR
    reviewtoolbar.populateReviewToolbar();
    reviewtoolbar.loadReviewToolbarWithObject(uuid);
    // SIDE PANEL
    reviewsidepanel.populateReviewSidePanel();
    reviewsidepanel.populateSidePanelTables(uuid);

    // CONTENT
    reviewcontent.populateReviewContent();
    reviewcontent.fillShardList(uuid);
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





async function populateReviewContainers(_uuid){
    let contentObject = dbis.Content_SelectOnUuid(_uuid);


    
    // console.log('1')
    // this.sourceContent = new SourceContent(this.mainContentContentContainer);

    
    // console.log('2')
    // this.toolbar = new SourceToolbar(this.mainContentToolbar);
    

    // console.log('3')
    // this.sidePanel = new SourceSidePanel(this.mainContentSidepanel);

    // this.toolbar.element.addEventListener('click', this.clickMainSourceContent.bind(this));
    // this.sourceContent.element.addEventListener('click', this.clickMainSourceContent.bind(this));



    // this.parentContentEdge = await dbis.ContentEdge_SelectParentOfUuid(contentObject.Uuid);
    // this.parentContentEdge.sort((a, b) => {
    //     if (a.content.Title.toLowerCase() < b.content.Title.toLowerCase()) { return -1; }
    //     if (a.content.Title.toLowerCase() > b.content.Title.toLowerCase()) { return 1; }
    //     return 0;
    // })

    // this.undirectedContentEdge = await dbis.ContentEdge_SelectUndirectedOfUuid(contentObject.Uuid);

    // this.childrenContentEdge = await dbis.ContentEdge_SelectChildOfUuid(contentObject.Uuid);
    // this.childrenContentEdge.sort((a, b) => {
    //     // sort by edge age
    //     let aUuid = a.edge.Uuid;
    //     let bUuid = b.edge.Uuid;
    //     if (parseInt(aUuid) < parseInt(bUuid)) { return -1; }
    //     if (parseInt(aUuid) > parseInt(bUuid)) { return 1; }
    //     return 0;
    // })


    // this.filesContentEdge = this.undirectedContentEdge.filter(contentEdge => contentEdge.content.Table === 'File');
    // this.filesContentEdge.sort((a, b) => {
    //     if (a.content.Title.toLowerCase() < b.content.Title.toLowerCase()) { return -1; }
    //     if (a.content.Title.toLowerCase() > b.content.Title.toLowerCase()) { return 1; }
    //     return 0;
    // })

    // this.reviewContentEdge = this.undirectedContentEdge.filter(contentEdge => contentEdge.content.Table === 'Review');
    // this.reviewContentEdge.sort((a, b) => {
    //     if (a.content.ReviewDate < b.content.ReviewDate) { return -1; }
    //     if (a.content.ReviewDate > b.content.ReviewDate) { return 1; }
    //     return 0;
    // })

    // this.otherConnectedContentEdge = this.undirectedContentEdge.filter(contentEdge => !(contentEdge.content.Table === 'Review' || contentEdge.content.Table === 'File'));
    // this.otherConnectedContentEdge.sort((a, b) => {
    //     if (a.content.Title.toLowerCase() < b.content.Title.toLowerCase()) { return -1; }
    //     if (a.content.Title.toLowerCase() > b.content.Title.toLowerCase()) { return 1; }
    //     return 0;
    // })


    // this.toolbar.load(contentObject);
    // this.sourceContent.load(this.childrenContentEdge);
    // this.sidePanel.load();

    // this.sidePanel.loadParents(this.parentContentEdge);
    // this.sidePanel.loadFiles(this.filesContentEdge);
    // this.sidePanel.loadReviews(this.reviewContentEdge);
    // this.sidePanel.loadConnected(this.otherConnectedContentEdge);
    // // this.sidePanel.loadConnected(this.undirectedContentEdge);

    // this.displayPanelsFromLocalStorage();


}



export {
    createReview
}