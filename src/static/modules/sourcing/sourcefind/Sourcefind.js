
import * as Searchcard from './searchcard/Searchcard.js';
import * as Listcard from './listcard/Listcard.js';

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