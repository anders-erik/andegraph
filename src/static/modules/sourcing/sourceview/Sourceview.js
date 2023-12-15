
import * as PropertiesCard from './PropertiesCard.js';
import * as ViewCard from './Viewcard.js';


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