import { Source } from "./source/Source.js";



export class MainContent {

	element;
	mainToolbar;
	mainSidepanel;

	source;

	constructor(parentElement) {
		this.element = document.createElement('div');
		this.element.id = 'mainContentContainer';
		this.element.textContent = 'mainmainmain'
		parentElement.append(this.element);

		this.mainToolbar = document.createElement('div');
		this.mainToolbar.id = 'mainToolbarContainer';
		this.element.append(this.mainToolbar);

		this.mainSidepanel = document.createElement('div');
		this.mainSidepanel.id = 'mainSidepanelContainer';
		this.element.append(this.mainSidepanel);


		this.source = new Source();

		this.loadSourceFromUuid(372);
	}


	loadSourceFromUuid(Uuid) {

	}

}