
import * as PropertiesCard from './propertiescard/PropertiesCard.js';
import * as ViewCard from './viewcard/Viewcard.js';


function createSourceviewPanel(){

	let sourceviewPanel = document.createElement('div');
	sourceviewPanel.id = 'sourceview-panel';
	sourceviewPanel.classList.add('panel');

	sourceviewPanel.appendChild(PropertiesCard.createSourceviewPropertiescard());

	sourceviewPanel.appendChild(ViewCard.getSourceviewViewcard());

	return sourceviewPanel;
}



export {
	createSourceviewPanel
}