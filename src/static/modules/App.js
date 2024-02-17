//import { addSourceListContainer, addSourceViewerContainer } from './Containers.js';
//import { createSourcefindPanel, createSourceviewPanel,createVerticalSerperationPanel, createShardlistPanel } from './Panels.js';

//import * as log from './log/log.js';

import * as log from './log/log.js';

import * as threepanels from './uiskeleton/threepanels/threepanels.js';

// window.showToast = log.showToast;
// window.addEventListener("error", function (event) {
// 	log.showToast();
// 	console.log('AAAAAAAAAAA')
//   })




import * as mainMenu from './mainMenu/mainMenu.js';

import * as Sourcing from './sourcing/sourcing.js';

import * as Homedash from './homedash/homedash.js';

import * as globalNodeContext from './globalnodecontext/GlobalNodeContext.js';

/* 
import {dbis} from './dbi-send/dbi-send.js';
// dbis.Content_SelectChildOfUuid(372);
let childNodes = await dbis.Node_SelectChildOfUuid(369);
// dbis.NodeEdge_SelectChildOfUuid(372);

import { ChildTable } from './components/childtable/ChildTable.js';
let childTable = new ChildTable();
childTable.createChildTable();
ChildTable.insertChildren(childNodes);

import { StatusTable } from './components/statustable/StatusTable.js';
let statusTable = new StatusTable();
statusTable.createStatusTable();

import { NodeProperties } from './components/nodeproperties/NodeProperties.js';
let nodeProperties = new NodeProperties();
nodeProperties.createNodeProperties();
nodeProperties.insertProperties(childNodes[0])

import { initGlobalListener } from './globallistener/GlobalListener.js';
initGlobalListener();
 */

import { LeftPanel } from './leftpanel/LeftPanel.js';
import { GlobalEventHandler } from './globalevents/GlobalEventhandler.js';
import { GlobalAction } from './globalevents/GlobalAction.js';




class App {

	rootElement;
	appElement;
	mainContent;
	globalEventHandler;
	leftPanel;



	constructor(rootElementId) {

		this.rootElement = document.getElementById(rootElementId);

		this.appElement = document.createElement('div');
		this.appElement.id = 'app';
		this.rootElement.append(this.appElement);



		this.leftPanel = new LeftPanel(this.appElement);
		// leftPanel.LeftPanelDevTests();

		// leftPanelTestFunction();

		this.globalEventHandler = new GlobalEventHandler(this, this.appElement);

		// this.appElement.addEventListener('click', this.globalEventHandler.click.bind(this.globalEventHandler));
		this.appElement.addEventListener('click', this.appClick.bind(this));
		// this.appElement.addEventListener('keyup', this.globalEventHandler.keyup.bind(this.globalEventHandler))
		this.appElement.addEventListener('keyup', this.appKeyup.bind(this))


		// this.appElement.addEventListener('keydown', this.getLeftPanelId.bind(this));

	}

	appKeyup(event) {
		let action = this.globalEventHandler.keyup(event);
		console.log('ACTION ', action)

	}

	appClick(event) {
		let action = this.globalEventHandler.click(event);
		console.log('ACTION ', action)

	}

	initGlobalEventHandler(app) {

	}

	getLeftPanelId() {
		console.log('PANPAN')
		console.log(this.leftPanel)
		console.log(this.leftPanel.getPanelId())
	}




	globalActionListener(actionObject) {
		if (actionObject.action == '') {
			console.log('aaaaaaaaaaaaaaaaa');
		}
	}


}




function initApp(rootId) {

	let root = document.getElementById(rootId);



	root.appendChild(mainMenu.createMainMenu());

	let mainContent = document.createElement('div');
	mainContent.id = 'mainContent';
	root.appendChild(mainContent);

	root.append(globalNodeContext.newGlobalNodeContext());


	let urlPath = window.location.pathname;

	/* 
		SOURCING ENTRY POINT!
	*/
	loadMainFromUrlPath(urlPath);

	//mainContent.appendChild(threepanels.initThreePanels(mainContent));

	//threepanels.animateToWidthPanel1(100, 1000);
}


let loadMainFromUrlPath = function (urlPath) {

	let urlPathBase = urlPath.split('/')[1];
	// window.location.pathname.split('/')[1]


	if (urlPathBase === 'sourcing') {
		//console.log('sourcing detected');
		//loadSourcing();
		let urlPathId = urlPath.split('/')[2];
		//console.log(urlPathId);


		Sourcing.loadSourcing(urlPathId);

	}
	else {
		Homedash.loadHomedash();
	}

}








export {
	App,
	initApp,
	loadMainFromUrlPath
}
