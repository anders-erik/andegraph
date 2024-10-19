
import { MainContent } from './maincontent/MainContent.js';
import { MainOverlay } from './mainoverlay/MainOverlay.js';
// import { LeftPanel } from './leftpanel/LeftPanel.js';
import { GlobalEventHandler } from './globalhandlers/GlobalEventhandler.js';
// 2024-10-19
import * as global from './globalhandlers/GlobalEventhandler.js';
import { ContextOverlay, staticContextOverlay } from './contextoverlay/ContextOverlay.js';

import * as maincontent from "./maincontent/MainContent.js"



// 2024-10-18
import * as appstyling from "./globalui/styling.js"
import * as appui from "./globalui/appui.js"

let leftMenuElement;
let leftMenuToggleElement;
let mainContentElement;
let contextOverlayElement;
let mainOverlayElement;




class App {

	rootElement;
	appElement;
	globalEventHandler;

	mainContent;
	mainOverlay;
	contextOverlay;
	// leftPanel;

	focusOverlayElement;

	projectUuid;
	projectnodeObject;
	selectedUuid;
	selectedNodeUuid;
	activeUuid;
	activeNodeUuid;


	constructor(rootElementId) {

		this.rootElement = document.getElementById(rootElementId);

		this.appElement = document.createElement('div');
		this.appElement.id = 'app-con';
		this.appElement.tabIndex = 0;
		this.rootElement.append(this.appElement);


		
	}

	
	async reloadApp(){


		/** Load all major ui elements so that all submodules can query during initialization  */
		appui.init(this.appElement);
		


		/** INIT GLOBAL EVENT HANDLER */


		// keep local reference to elements for now - 2024-10-19
		leftMenuElement = this.appElement.querySelector("#left-menu-con");
		leftMenuToggleElement = this.appElement.querySelector("#left-menu-toggle-inner");
		mainContentElement = this.appElement.querySelector("#main-content-con");
		contextOverlayElement = this.appElement.querySelector("#context-overlay-con");
		mainOverlayElement = this.appElement.querySelector("#main-overlay-con");
		
		// console.log(`contextOverlayElement = `, contextOverlayElement)


		this.mainContent = new MainContent(mainContentElement);
		// await this.mainContent.loadFromUrl();
		maincontent.loadFromUrl();


		this.mainOverlay = new MainOverlay(mainOverlayElement);
		// this.leftPanel = new LeftPanel(this.appElement);

		this.contextOverlay = new ContextOverlay();
		contextOverlayElement.append(this.contextOverlay.overlayElement);
		staticContextOverlay.initKeymap();


		// leftPanel.LeftPanelDevTests();

		// leftPanelTestFunction();

		this.appElement.focus();

		this.globalEventHandler = new GlobalEventHandler(this, this.appElement);


		/** NEW EVENTS !  -- 2024-10-19  */
		this.appElement.addEventListener('click', global.globalClick, true);
		// this.appElement.addEventListener('mouseover', global.globalMouseEnter, true);

		/**   */
		


		this.appElement.addEventListener('contextmenu', this.globalEventHandler.contextMenuEvent.bind(this.globalEventHandler));

		this.appElement.addEventListener('click', this.globalEventHandler.click.bind(this.globalEventHandler), true);
		
		// this.appElement.addEventListener('click', this.appClick.bind(this));
		// this.appElement.addEventListener('keydown', this.globalEventHandler.keydown.bind(this.globalEventHandler))
		// this.appElement.addEventListener('keyup', this.globalEventHandler.keyup.bind(this.globalEventHandler))
		window.addEventListener('keydown', this.globalEventHandler.keydown.bind(this.globalEventHandler))
		window.addEventListener('keyup', this.globalEventHandler.keyup.bind(this.globalEventHandler))
		// this.appElement.addEventListener('keydown', this.appKeyup.bind(this))
		
		// Didn't work as intended...
		// window.addEventListener("contentClick", this.contentClick, true)

		this.appElement.addEventListener('focusin', this.appFocusIn.bind(this))
		window.addEventListener('paste', this.globalEventHandler.paste.bind(this.globalEventHandler))

		// window.addEventListener("hashchange", (event) => {
		// 	console.log("URL CHANGESD!")
		// });

		addEventListener("popstate", (event) => { 
			maincontent.loadFromUrl();
		});
	}


	contentClick(event){
		console.log("CONTENT CARD CLICK DETECTED IN APP@")

		// IF CURRENT FOCUED ELEMENT IS CONTENT --> TRIGGER MENU!
		console.log("id of focued element: ", document.activeElement.id);

		// HAS CONTETNT OBJECT?
		if (document.activeElement.hasOwnProperty("contentObject"))
			console.log("CONTENT OBJECT CLICKED DURING FOCUS")

		// console.log("id of clicked content card element: ", event.id);
		// console.log("event.ctrlKey in contentClick ? ", event.ctrlKey)	

	}



	appFocusIn(event) {
		// console.log('FOCUS CHANGE')

		// this.moveFocusOverlay();

		let isContextMenuDescendant = false;
		let contextMenu = document.getElementById('contextMenu');
		for (const element of contextMenu.querySelectorAll('*')) {
			if (event.target == element) {
				// console.log('IS CONTEXT MENU DESCENDANT')
				isContextMenuDescendant = true;
			}
		}



		// console.log('new focused element', event.target)
		if (event.target == document.body) {
			console.log('Body is currently in focus.')
		}
		else if (event.target.classList.contains('contextElement') || event.target.classList.contains('contextMenu')) {

		}
		else if (isContextMenuDescendant) {

		}
		else if (event.target.contentObject) {
			this.contextOverlay.updateCurrentContextMenu(event.target);
		}
		else {
			this.contextOverlay.hideContextMenu();
		}

	}


	createFocusOverlayElement() {
		this.focusOverlayElement = document.createElement('div');
		this.focusOverlayElement.id = 'focusOverlayElement';
		this.focusOverlayElement.textContent = "FFFFFF";
		this.appElement.append(this.focusOverlayElement);
	}

	moveFocusOverlay() {

		let activeElement = document.activeElement;

		if (activeElement.id === 'app') {
			this.focusOverlayElement.classList.add('hidden');
		}
		else {
			this.focusOverlayElement.classList.remove('hidden');

			let activeClientRec = activeElement.getBoundingClientRect();
			console.log(activeClientRec)

			this.focusOverlayElement.style.width = activeClientRec.width + 'px';
			this.focusOverlayElement.style.height = activeClientRec.height + 'px';

			this.focusOverlayElement.style.top = activeClientRec.top + 'px';
			this.focusOverlayElement.style.left = activeClientRec.left + 'px';
		}

	}

}



// const appInnerHtml = `
// <div id="app-inner">
// 	<div id="left-menu"></div>
// 	<div id="main-content"></div>
// 	<div id="context-overlay"></div>
// 	<div id="main-overlay"></div>
// </div>
// `;





export {
	App,
}
