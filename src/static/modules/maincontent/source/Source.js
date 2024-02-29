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
		this.undirectedContentEdge = await dbis.ContentEdge_SelectUndirectedOfUuid(contentObject.Uuid);
		this.childrenContentEdge = await dbis.ContentEdge_SelectChildOfUuid(contentObject.Uuid);
		this.filesContentEdge = this.undirectedContentEdge.filter(contentEdge => contentEdge.content.Table === 'File');
		this.reviewContentEdge = this.undirectedContentEdge.filter(contentEdge => contentEdge.content.Table === 'Review');
		this.otherConnectedContentEdge = this.undirectedContentEdge.filter(contentEdge => !(contentEdge.content.Table === 'Review' || contentEdge.content.Table === 'File'));



		this.toolbar.load(contentObject);
		this.sourceContent.load(this.childrenContentEdge);
		this.sidePanel.load();

		this.sidePanel.loadParents(this.parentContentEdge);
		this.sidePanel.loadFiles(this.filesContentEdge);
		this.sidePanel.loadReviews(this.reviewContentEdge);

	}



	clickMainSourceContent(event) {
		// console.log(event.target.id)
		let containsSelected = event.target.classList.contains('selected');

		switch (event.target.id) {

			// CONTENT PANELS
			case 'sourceToolbar_filePanel':
				if (containsSelected) {
					event.target.classList.remove('selected')
					this.sourceContent.filePanelContainer.classList.add('hidden');
				}
				else {
					event.target.classList.add('selected')
					this.sourceContent.filePanelContainer.classList.remove('hidden');
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
			case 'sourceToolbar_parentList':
				if (containsSelected) {
					event.target.classList.remove('selected')
					this.sidePanel.parentContainer.classList.add('hidden');
				}
				else {
					event.target.classList.add('selected')
					this.sidePanel.parentContainer.classList.remove('hidden');
				}
				break;
			case 'sourceToolbar_fileList':
				if (containsSelected) {
					event.target.classList.remove('selected')
					this.sidePanel.fileContainer.classList.add('hidden');
				}
				else {
					event.target.classList.add('selected')
					this.sidePanel.fileContainer.classList.remove('hidden');
				}
				break;
			case 'sourceToolbar_reviewList':
				if (containsSelected) {
					event.target.classList.remove('selected')
					this.sidePanel.reviewContainer.classList.add('hidden');
				}
				else {
					event.target.classList.add('selected')
					this.sidePanel.reviewContainer.classList.remove('hidden');
				}
				break;
			case 'sourceToolbar_childList':
				if (containsSelected) {
					event.target.classList.remove('selected')
					this.sidePanel.connectedContainer.classList.add('hidden');
				}
				else {
					event.target.classList.add('selected')
					this.sidePanel.connectedContainer.classList.remove('hidden');
				}
				break;

			default:
				break;
		}
	}





}