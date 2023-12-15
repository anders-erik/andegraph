import { createSourcefindSearchcard, createSourcefindListcard, createSourceviewPropertiescard, getSourceviewViewcard } from "./Cards.js";

function createSourcefindPanel(){

	let sourcefindPanel = document.createElement('div');
	sourcefindPanel.id = 'sourcefind-panel';
	sourcefindPanel.classList.add('panel');
	//sourcefindPanel.textContent = 'panelpanel';


	sourcefindPanel.appendChild(createSourcefindSearchcard());
	sourcefindPanel.appendChild(createSourcefindListcard());


	return sourcefindPanel;
}

function createSourceviewPanel(){

	let sourceviewPanel = document.createElement('div');
	sourceviewPanel.id = 'sourceview-panel';
	sourceviewPanel.classList.add('panel');

	sourceviewPanel.appendChild(createSourceviewPropertiescard());

	sourceviewPanel.appendChild(getSourceviewViewcard());

	return sourceviewPanel;
}

function createShardlistPanel(){

	let sourceviewPanel = document.createElement('div');
	sourceviewPanel.id = 'shardlist-panel';
	sourceviewPanel.classList.add('panel');
	sourceviewPanel.textContent = 'panelpanel';

	//sourceviewPanel.appendChild();

	return sourceviewPanel;
}


function createVerticalSerperationPanel(index){

	let panel = document.createElement('div');
	panel.id = 'separation-panel-' + index;
	panel.classList.add('seperation-panel');
	//panel.textContent = 'panelpanel';


	return panel;
}


export {
	createSourcefindPanel,
	createSourceviewPanel,
	createShardlistPanel,
	createVerticalSerperationPanel,
	createSourceviewPropertiescard
	
}
