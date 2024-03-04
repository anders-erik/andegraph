
import { LeftPanel } from "./leftpanel/LeftPanel.js";

import { MainMenu } from "./mainmenu/MainMenu.js";
import { Project } from "./project/Project.js";
import { Review } from "./review/Review.js";
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
	reviewContainer;
	review;


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

		this.reviewContainer = this.element.querySelector('#reviewContainer');
		this.review = new Review(this.reviewContainer);

		// console.log(this.mainMenuContainer)
		// console.log(this.stateContainer)
		// console.log(this.projectContainer)
		// console.log(this.searchContainer)

		// localStorage.setItem('stateSelected', document.getElementById('mainMenuState').classList.contains('selected') ? '1' : '0');
		// localStorage.setItem('projectSelected', document.getElementById('mainMenuProject').classList.contains('selected') ? '1' : '0');
		let stateSelected = localStorage.getItem('stateSelected');
		let projectSelected = localStorage.getItem('projectSelected');
		console.log('stateSelected', stateSelected)
		console.log('projectSelected', projectSelected)

		if (stateSelected == '1') {
			document.getElementById('mainMenuState').classList.add('selected');
			this.stateContainer.classList.remove('hide')
			// document.getElementById('mainMenuState').click();
		}
		else {
			this.stateContainer.classList.add('hide')
		}

		if (projectSelected == '1') {
			document.getElementById('mainMenuProject').classList.add('selected');
			// document.getElementById('mainMenuProject').click();
			this.projectContainer.classList.remove('hide')
		}
		else {
			this.projectContainer.classList.add('hide')
		}

		// const value1 = localStorage.getItem('key1');

	}


	toggleContainersFromSelectedMainMenuButtons() {

		this.mainMenu.stateBtn.classList.contains('selected') ? this.stateContainer.classList.remove('hide') : this.stateContainer.classList.add('hide');

		this.mainMenu.projectBtn.classList.contains('selected') ? this.projectContainer.classList.remove('hide') : this.projectContainer.classList.add('hide');

		this.mainMenu.searchBtn.classList.contains('selected') ? this.searchContainer.classList.remove('hide') : this.searchContainer.classList.add('hide');

		this.mainMenu.reviewBtn.classList.contains('selected') ? this.reviewContainer.classList.remove('hide') : this.reviewContainer.classList.add('hide');

		// (this.mainMenu.searchBtn.classList.contains('selected') || this.mainMenu.reviewBtn.classList.contains('selected')) ? this.searchContainer.classList.remove('hide') : this.searchContainer.classList.add('hide');

	}


	mainOverlayInnerHtml = `
	<div id="mainMenuContainer" ></div>
	<div id="stateContainer" class="hide" tabindex=0></div>
	<div id="projectContainer" class="hide" tabindex=0></div>
	<div id="searchContainer" class="hide" tabindex=0></div>
	<div id="reviewContainer" class="hide" tabindex=0></div>
	`
}