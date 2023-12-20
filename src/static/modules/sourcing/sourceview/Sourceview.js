
import * as PropertiesCard from './propertiescard/PropertiesCard.js';
import * as ViewCard from './viewcard/Viewcard.js';


function createSourceviewPanel(){

	let sourceviewPanelOuter = document.createElement('div');
	sourceviewPanelOuter.id = 'sourceview-panel-outer';


	let sourceviewPanel = document.createElement('div');
	sourceviewPanel.id = 'sourceview-panel';
	sourceviewPanel.classList.add('panel');

	sourceviewPanel.appendChild(PropertiesCard.createSourceviewPropertiescard());
	sourceviewPanel.appendChild(ViewCard.getSourceviewViewcard());

	sourceviewPanelOuter.appendChild(sourceviewPanel);

	return sourceviewPanelOuter;
}



export {
	createSourceviewPanel
}