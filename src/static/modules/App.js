

import { MainContent } from './maincontent/MainContent.js';
import { MainOverlay } from './mainoverlay/MainOverlay.js';
// import { LeftPanel } from './leftpanel/LeftPanel.js';
import { GlobalEventHandler } from './GlobalEventhandler.js';
import { ContextOverlay } from './contextoverlay/ContextOverlay.js';




class App {

	rootElement;
	appElement;
	globalEventHandler;

	mainContent;
	mainOverlay;
	contextOverlay;
	// leftPanel;

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






		// this.appElement.addEventListener('keydown', this.getLeftPanelId.bind(this));

		this.mainContent = new MainContent(this.appElement);


		this.mainContent.loadFromUrl();
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



		this.mainOverlay = new MainOverlay(this.appElement);
		// this.leftPanel = new LeftPanel(this.appElement);

		this.contextOverlay = new ContextOverlay();
		this.appElement.append(this.contextOverlay.overlayElement);

		// leftPanel.LeftPanelDevTests();

		// leftPanelTestFunction();

		this.appElement.focus();

		this.globalEventHandler = new GlobalEventHandler(this, this.appElement);

		this.appElement.addEventListener('click', this.globalEventHandler.click.bind(this.globalEventHandler));
		// this.appElement.addEventListener('click', this.appClick.bind(this));
		// this.appElement.addEventListener('keydown', this.globalEventHandler.keydown.bind(this.globalEventHandler))
		// this.appElement.addEventListener('keyup', this.globalEventHandler.keyup.bind(this.globalEventHandler))
		window.addEventListener('keydown', this.globalEventHandler.keydown.bind(this.globalEventHandler))
		window.addEventListener('keyup', this.globalEventHandler.keyup.bind(this.globalEventHandler))
		// this.appElement.addEventListener('keydown', this.appKeyup.bind(this))
		this.appElement.addEventListener('focusin', this.appFocusIn.bind(this))
		window.addEventListener('paste', this.globalEventHandler.paste.bind(this.globalEventHandler))
	}




	appFocusIn(event) {
		// console.log('FOCUS CHANGE')

		let isContextMenuDescendant = false;
		let contextMenu = document.getElementById('contextMenu');
		for (const element of contextMenu.querySelectorAll('*')) {
			if (event.target == element) {
				// console.log('IS CONTEXT MENU DESCENDANT')
				isContextMenuDescendant = true;
			}
		}



		console.log('new focused element', event.target)
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




}









export {
	App,
}
