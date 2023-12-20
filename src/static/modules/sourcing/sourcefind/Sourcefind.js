
import * as Searchcard from './searchcard/Searchcard.js';
import * as Listcard from './listcard/Listcard.js';

function createSourcefindPanel(){

	let sourcefindPanelOuter = document.createElement('div');
	sourcefindPanelOuter.id = 'sourcefind-panel-outer';

	let sourcefindPanel = document.createElement('div');
	sourcefindPanel.id = 'sourcefind-panel';
	sourcefindPanel.classList.add('panel');
	//sourcefindPanel.textContent = 'panelpanel';


	sourcefindPanel.appendChild(Searchcard.createSourcefindSearchcard());
	sourcefindPanel.appendChild(Listcard.createSourcefindListcard());

	sourcefindPanelOuter.appendChild(sourcefindPanel);

	return sourcefindPanelOuter;
}






export {
	createSourcefindPanel
}