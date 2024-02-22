
import { LeftPanel } from "./leftpanel/LeftPanel.js";

import { MainMenu } from "./mainmenu/MainMenu.js";
import { Project } from "./project/Project.js";
import { Search } from "./search/Search.js";
import { State } from "./state/State.js";

export class MainOverlay {

	element;
	leftPanel;
	searchPanel;

	mainMenuContainer;
	mainMenu;
	stateContainer;
	state;
	projectContainer;
	project;
	searchContainer;
	search;


	constructor(appElement) {
		this.element = document.createElement('div');
		this.element.id = 'mainOverlay';


		this.element.innerHTML = this.mainOverlayInnerHtml;
		appElement.append(this.element)

		// REMOVE
		// this.leftPanel = new LeftPanel(this.element);

		// console.log(this.mainOverlayElement.children);
		this.mainMenuContainer = this.element.querySelector('#mainMenuContainer')
		this.mainMenu = new MainMenu(this.mainMenuContainer);

		this.stateContainer = this.element.querySelector('#stateContainer')
		this.state = new State(this.stateContainer);

		this.projectContainer = this.element.querySelector('#projectContainer')
		this.project = new Project(this.projectContainer);
		this.project.updateCurrentProjectOnUuid(121264848896);

		this.searchContainer = this.element.querySelector('#searchContainer');
		this.search = new Search(this.searchContainer);

		// console.log(this.mainMenuContainer)
		// console.log(this.stateContainer)
		// console.log(this.projectContainer)
		// console.log(this.searchContainer)



	}


	toggleContainersFromSelectedMainMenuButtons() {

		this.mainMenu.stateBtn.classList.contains('selected') ? this.stateContainer.classList.remove('hide') : this.stateContainer.classList.add('hide');

		this.mainMenu.projectBtn.classList.contains('selected') ? this.projectContainer.classList.remove('hide') : this.projectContainer.classList.add('hide');

		(this.mainMenu.searchBtn.classList.contains('selected') || this.mainMenu.reviewBtn.classList.contains('selected')) ? this.searchContainer.classList.remove('hide') : this.searchContainer.classList.add('hide');

	}


	mainOverlayInnerHtml = `
	<div id="mainMenuContainer"></div>
	<div id="stateContainer" tabindex=0></div>
	<div id="projectContainer" tabindex=0></div>
	<div id="searchContainer" tabindex=0></div>
	
	`
}