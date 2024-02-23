
import { ContentMenu } from "./contentmenu/ContentMenu.js";

class ContextOverlay {

	overlayElement;

	contentMenu;


	propertiesMenu;
	propertiesMenuActive = false;
	// propertiesTableBody;

	constructor() {

		this.overlayElement = document.createElement('div');
		this.overlayElement.id = 'contextOverlay';

		this.contentMenu = new ContentMenu(this.overlayElement);

	}






	isDisplayingNodeContext() {
		if (this.contentMenu.active) {
			return true;
		}
		else {
			return false;
		}
	}

	updateElementContexts(contentObjectElement) {
		this.contentMenu.populate(contentObjectElement);
		this.contentMenu.place(contentObjectElement);
	}

	removeElementContexts() {
		// for (let overlayChild of this.overlayElement.children) {
		// 	this.overlayElement.removeChild(overlayChild);
		// }
		// this.contentMenu.active = false;
		this.contentMenu.remove();
	}





}


export {
	ContextOverlay,
}