
import * as Searchcard from './Searchcard.js';
import * as Listcard from './Listcard.js';

function createSourcefindPanel(){

	let sourcefindPanel = document.createElement('div');
	sourcefindPanel.id = 'sourcefind-panel';
	sourcefindPanel.classList.add('panel');
	//sourcefindPanel.textContent = 'panelpanel';


	sourcefindPanel.appendChild(Searchcard.createSourcefindSearchcard());
	sourcefindPanel.appendChild(Listcard.createSourcefindListcard());


	return sourcefindPanel;
}




export {
	createSourcefindPanel
}