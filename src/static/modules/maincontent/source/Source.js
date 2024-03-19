import { dbis } from "../../dbi-send/dbi-send.js";
import { SourceContent } from "./sourcecontent/SourceContent.js";
import { SourceSidePanel } from "./sourcesidepanel/SourceSidePanel.js";
import { SourceToolbar } from "./sourcetoolbar/SourceToolbar.js";


export class Source {
	mainContentContainer;
	mainContentContentContainer
	mainContentToolbar;
	mainContentSidepanel;

	toolbar;
	sourceContent;
	sidePanel;

	contentObject;

	parentContentEdge;
	undirectedContentEdge;
	childrenContentEdge;
	filesContentEdge;
	reviewContentEdge;
	otherConnectedContentEdge;


	constructor(mainContentContainer, mainContentContentContainer, mainContentToolbar, mainContentSidepanel) {

		this.mainContentContainer = mainContentContainer;
		this.mainContentContentContainer = mainContentContentContainer;
		this.mainContentToolbar = mainContentToolbar;
		this.mainContentSidepanel = mainContentSidepanel;

		this.toolbar = new SourceToolbar(this.mainContentToolbar);
		this.sourceContent = new SourceContent(this.mainContentContentContainer);
		this.sidePanel = new SourceSidePanel(this.mainContentSidepanel);

		this.toolbar.element.addEventListener('click', this.clickMainSourceContent.bind(this));
		this.sourceContent.element.addEventListener('click', this.clickMainSourceContent.bind(this));

	}

	async load(contentObject) {

		this.parentContentEdge = await dbis.ContentEdge_SelectParentOfUuid(contentObject.Uuid);
		this.parentContentEdge.sort((a, b) => {
			if (a.content.Title.toLowerCase() < b.content.Title.toLowerCase()) { return -1; }
			if (a.content.Title.toLowerCase() > b.content.Title.toLowerCase()) { return 1; }
			return 0;
		})

		this.undirectedContentEdge = await dbis.ContentEdge_SelectUndirectedOfUuid(contentObject.Uuid);

		this.childrenContentEdge = await dbis.ContentEdge_SelectChildOfUuid(contentObject.Uuid);
		this.childrenContentEdge.sort((a, b) => {
			// sort by edge age
			let aUuid = a.edge.Uuid;
			let bUuid = b.edge.Uuid;
			if (parseInt(aUuid) < parseInt(bUuid)) { return -1; }
			if (parseInt(aUuid) > parseInt(bUuid)) { return 1; }
			return 0;
		})


		this.filesContentEdge = this.undirectedContentEdge.filter(contentEdge => contentEdge.content.Table === 'File');
		this.filesContentEdge.sort((a, b) => {
			if (a.content.Title.toLowerCase() < b.content.Title.toLowerCase()) { return -1; }
			if (a.content.Title.toLowerCase() > b.content.Title.toLowerCase()) { return 1; }
			return 0;
		})

		this.reviewContentEdge = this.undirectedContentEdge.filter(contentEdge => contentEdge.content.Table === 'Review');
		this.reviewContentEdge.sort((a, b) => {
			if (a.content.ReviewDate < b.content.ReviewDate) { return -1; }
			if (a.content.ReviewDate > b.content.ReviewDate) { return 1; }
			return 0;
		})

		this.otherConnectedContentEdge = this.undirectedContentEdge.filter(contentEdge => !(contentEdge.content.Table === 'Review' || contentEdge.content.Table === 'File'));
		this.otherConnectedContentEdge.sort((a, b) => {
			if (a.content.Title.toLowerCase() < b.content.Title.toLowerCase()) { return -1; }
			if (a.content.Title.toLowerCase() > b.content.Title.toLowerCase()) { return 1; }
			return 0;
		})

		this.toolbar.load(contentObject);
		this.sourceContent.load(this.childrenContentEdge);
		this.sidePanel.load();

		this.sidePanel.loadParents(this.parentContentEdge);
		this.sidePanel.loadFiles(this.filesContentEdge);
		this.sidePanel.loadReviews(this.reviewContentEdge);
		this.sidePanel.loadConnected(this.otherConnectedContentEdge);
		// this.sidePanel.loadConnected(this.undirectedContentEdge);


		this.displayPanelsFromLocalStorage();
	}



	async clickMainSourceContent(event) {
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


			case 'toolbar_completeReview':
				// console.log('clickclick')
				let currentReviewElement = document.getElementById('mainContentReview');
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
				}
				break;


			case 'sourceToolbar_shardPanel':
				if (containsSelected) {
					event.target.classList.remove('selected')
					this.sourceContent.shardlistContainer.classList.add('hidden');
				}
				else {
					event.target.classList.add('selected')
					this.sourceContent.shardlistContainer.classList.remove('hidden');
				}
				break;
			case 'sourceToolbar_reviewPanel':
				if (containsSelected) {
					event.target.classList.remove('selected')
					this.sourceContent.reviewlistContainer.classList.add('hidden');
				}
				else {
					event.target.classList.add('selected')
					this.sourceContent.reviewlistContainer.classList.remove('hidden');
				}
				break;


			// SIDE PANEL

			case 'sourceToolbar_sidePanel':
				// console.log('Side panel button clicked')
				if (containsSelected) {
					event.target.classList.remove('selected')
					this.mainContentSidepanel.classList.add('hidden');
				}
				else {
					event.target.classList.add('selected')
					this.mainContentSidepanel.classList.remove('hidden');
				}
				break;

			// case 'sourceToolbar_parentList':
			// 	if (containsSelected) {
			// 		event.target.classList.remove('selected')
			// 		this.sidePanel.parentContainer.classList.add('hidden');
			// 	}
			// 	else {
			// 		event.target.classList.add('selected')
			// 		this.sidePanel.parentContainer.classList.remove('hidden');
			// 	}
			// 	break;
			// case 'sourceToolbar_fileList':
			// 	if (containsSelected) {
			// 		event.target.classList.remove('selected')
			// 		this.sidePanel.fileContainer.classList.add('hidden');
			// 	}
			// 	else {
			// 		event.target.classList.add('selected')
			// 		this.sidePanel.fileContainer.classList.remove('hidden');
			// 	}
			// 	break;
			// case 'sourceToolbar_reviewList':
			// 	if (containsSelected) {
			// 		event.target.classList.remove('selected')
			// 		this.sidePanel.reviewContainer.classList.add('hidden');
			// 	}
			// 	else {
			// 		event.target.classList.add('selected')
			// 		this.sidePanel.reviewContainer.classList.remove('hidden');
			// 	}
			// 	break;
			// case 'sourceToolbar_connectedList':
			// 	if (containsSelected) {
			// 		event.target.classList.remove('selected')
			// 		this.sidePanel.connectedContainer.classList.add('hidden');
			// 	}
			// 	else {
			// 		event.target.classList.add('selected')
			// 		this.sidePanel.connectedContainer.classList.remove('hidden');
			// 	}
			// 	break;

			default:
				break;
		}

		this.updateLocalStorage();

	}

	updateLocalStorage() {


		// localStorage.setItem('sourceToolbar_filePanel', document.getElementById('sourceToolbar_filePanel').classList.contains('selected') ? '1' : '0');
		localStorage.setItem('sourceToolbar_shardPanel', document.getElementById('sourceToolbar_shardPanel').classList.contains('selected') ? '1' : '0');
		localStorage.setItem('sourceToolbar_reviewPanel', document.getElementById('sourceToolbar_reviewPanel').classList.contains('selected') ? '1' : '0');

		localStorage.setItem('sourceToolbar_sidePanel', document.getElementById('sourceToolbar_sidePanel').classList.contains('selected') ? '1' : '0');
		// localStorage.setItem('sourceToolbar_parentList', document.getElementById('sourceToolbar_parentList').classList.contains('selected') ? '1' : '0');
		// localStorage.setItem('sourceToolbar_fileList', document.getElementById('sourceToolbar_fileList').classList.contains('selected') ? '1' : '0');
		// localStorage.setItem('sourceToolbar_reviewList', document.getElementById('sourceToolbar_reviewList').classList.contains('selected') ? '1' : '0');
		// localStorage.setItem('sourceToolbar_connectedList', document.getElementById('sourceToolbar_connectedList').classList.contains('selected') ? '1' : '0');
	}


	displayPanelsFromLocalStorage() {
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

		let sourceToolbar_shardPanel = localStorage.getItem('sourceToolbar_shardPanel');
		if (sourceToolbar_shardPanel == '1') {
			document.getElementById('sourceToolbar_shardPanel').classList.add('selected')
			this.sourceContent.shardlistContainer.classList.remove('hidden');
		}
		else {
			document.getElementById('sourceToolbar_shardPanel').classList.remove('selected')
			this.sourceContent.shardlistContainer.classList.add('hidden');
		}

		let sourceToolbar_reviewPanel = localStorage.getItem('sourceToolbar_reviewPanel');
		if (sourceToolbar_reviewPanel == '1') {
			document.getElementById('sourceToolbar_reviewPanel').classList.add('selected')
			this.sourceContent.reviewlistContainer.classList.remove('hidden');
		}
		else {
			document.getElementById('sourceToolbar_reviewPanel').classList.remove('selected')
			this.sourceContent.reviewlistContainer.classList.add('hidden');
		}




		let sourceToolbar_sidePanel = localStorage.getItem('sourceToolbar_sidePanel');
		if (sourceToolbar_sidePanel == '1') {
			document.getElementById('sourceToolbar_sidePanel').classList.add('selected')
			this.mainContentSidepanel.classList.remove('hidden');
		}
		else {
			document.getElementById('sourceToolbar_sidePanel').classList.remove('selected')
			this.mainContentSidepanel.classList.add('hidden');
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

}