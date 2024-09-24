
import { MainContent } from './maincontent/MainContent.js';
import { MainOverlay } from './mainoverlay/MainOverlay.js';
// import { LeftPanel } from './leftpanel/LeftPanel.js';
import { GlobalEventHandler } from './GlobalEventhandler.js';
import { ContextOverlay, staticContextOverlay } from './contextoverlay/ContextOverlay.js';

import * as maincontent from "./maincontent/MainContent.js"



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
		this.appElement.id = 'app';
		this.appElement.tabIndex = 0;
		this.rootElement.append(this.appElement);


		
		// this.createFocusOverlayElement();



		// this.appElement.addEventListener('keydown', this.getLeftPanelId.bind(this));

		// this.mainContent = new MainContent(this.appElement);


		// this.mainContent.loadFromUrl();
		// let urlState = this.getUrlState();
		// let urlState = new URL(window.location.href)
		// console.table(urlState)
		// let pathArray = urlState.pathname.split('/');
		// pathArray.pop();
		// pathArray.shift();
		// console.log(pathArray)

		// if (pathArray[0] === 'source') {
		// 	this.mainContent.loadSourceFromUuid(pathArray[1]);
		// }

		// DEVDEV
		// this.mainContent.loadSourceFromUuid(330);
		// this.mainContent.loadSourceFromUuid(372);
		// this.mainContent.loadSourceFromUuid(106979190784);



		// this.mainOverlay = new MainOverlay(this.appElement);
		// // this.leftPanel = new LeftPanel(this.appElement);

		// this.contextOverlay = new ContextOverlay();
		// this.appElement.append(this.contextOverlay.overlayElement);

		// // leftPanel.LeftPanelDevTests();

		// // leftPanelTestFunction();

		// this.appElement.focus();

		// this.globalEventHandler = new GlobalEventHandler(this, this.appElement);

		// this.appElement.addEventListener('click', this.globalEventHandler.click.bind(this.globalEventHandler));
		// // this.appElement.addEventListener('click', this.appClick.bind(this));
		// // this.appElement.addEventListener('keydown', this.globalEventHandler.keydown.bind(this.globalEventHandler))
		// // this.appElement.addEventListener('keyup', this.globalEventHandler.keyup.bind(this.globalEventHandler))
		// window.addEventListener('keydown', this.globalEventHandler.keydown.bind(this.globalEventHandler))
		// window.addEventListener('keyup', this.globalEventHandler.keyup.bind(this.globalEventHandler))
		// // this.appElement.addEventListener('keydown', this.appKeyup.bind(this))
		// this.appElement.addEventListener('focusin', this.appFocusIn.bind(this))
		// window.addEventListener('paste', this.globalEventHandler.paste.bind(this.globalEventHandler))
	}

	
	async reloadApp(){

		this.appElement.innerHTML = "";

		this.mainContent = new MainContent(this.appElement);
		// await this.mainContent.loadFromUrl();
		maincontent.loadFromUrl();


		this.mainOverlay = new MainOverlay(this.appElement);
		// this.leftPanel = new LeftPanel(this.appElement);

		this.contextOverlay = new ContextOverlay();
		this.appElement.append(this.contextOverlay.overlayElement);
		staticContextOverlay.initKeymap();


		// leftPanel.LeftPanelDevTests();

		// leftPanelTestFunction();

		this.appElement.focus();

		this.globalEventHandler = new GlobalEventHandler(this, this.appElement);

		
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









export {
	App,
}
