import { dbis } from "../dbi-send/dbi-send.js";
import { Source } from "./source/Source.js";



export class MainContent {

	element;
	mainToolbar;
	mainSidepanel;
	mainContentContent;

	source;

	constructor(parentElement) {
		this.element = document.createElement('div');
		this.element.id = 'mainContentContainer';
		this.element.textContent = ''
		parentElement.append(this.element);

		this.mainContentContent = document.createElement('div');
		this.mainContentContent.id = 'mainContentContentContainer';
		this.mainContentContent.textContent = ''
		this.element.append(this.mainContentContent);

		this.mainToolbar = document.createElement('div');
		this.mainToolbar.id = 'mainToolbarContainer';
		this.mainToolbar.tabIndex = 0;
		this.element.append(this.mainToolbar);

		this.mainSidepanel = document.createElement('div');
		this.mainSidepanel.id = 'mainSidepanelContainer';
		this.element.append(this.mainSidepanel);


		this.source = new Source(this.element, this.mainContentContent, this.mainToolbar, this.mainSidepanel);
		// this.source.loadSourceFromUuid(372);

		// this.loadSourceFromUuid(372);
	}

	async loadFromUrl() {
		let urlState = new URL(window.location.href)
		console.table(urlState)
		let pathArray = urlState.pathname.split('/');
		pathArray.pop();
		pathArray.shift();
		console.log(pathArray)

		if (pathArray[0] === 'source') {
			await this.loadSourceFromUuid(pathArray[1]);
		}
	}

	loadFromContentObject(contentObject) {

	}

	async loadSourceFromUuid(Uuid) {
		// history.pushState(null, 'source', `http://localhost:3000/source/${Uuid}`);

		let contentObject = await dbis.Content_SelectOnUuid(Uuid);
		await this.source.load(contentObject)
	}

}