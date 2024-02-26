
import { ContentMenu } from "./contentmenu/ContentMenu.js";
import { EdgeMenu } from "./edgemenu/EdgeMenu.js";

class ContextOverlay {

	overlayElement;

	contextMenu;

	contentMenu;
	edgeMenu;
	contentObjectElement;


	propertiesMenu;
	propertiesMenuActive = false;
	// propertiesTableBody;

	constructor() {

		this.overlayElement = document.createElement('div');
		this.overlayElement.id = 'contextOverlay';

		this.contextMenu = document.createElement('div');
		this.contextMenu.id = 'contextMenu';
		this.contextMenu.classList.add('contextMenu', 'hide');
		this.contextMenu.tabIndex = 0;
		this.overlayElement.append(this.contextMenu);

		this.contentMenu = new ContentMenu(this.contextMenu);
		this.edgeMenu = new EdgeMenu(this.contextMenu);

	}


	updateCurrentContextMenu(currentObjectElement) {
		let classlist = this.contextMenu.classList;

		// make sure that the current active element has the appropriate object attached to it, else context menu is hidden
		if (classlist.contains('content') && currentObjectElement.contentObject) {
			this.updateContextMenuWithContentElement(currentObjectElement);
		}
		else if (classlist.contains('edge') && currentObjectElement.edgeObject) {
			this.updateContextMenuWithEdgeElement(currentObjectElement);
		}
		else {
			this.hideContextMenu();
		}
	}



	updateContextMenuWithContentElement(contentObjectElement) {
		// this.contextMenu.
		this.contextMenu.contentObjectElement = contentObjectElement;
		this.setContextClass('content');

		// this.contentMenu.element.contentObjectElement = contentObjectElement;
		this.contextMenu.innerHTML = '';
		this.contentMenu.populate(contentObjectElement);
		this.place(contentObjectElement);

	}

	updateContextMenuWithEdgeElement(edgeObjectElement) {
		// this.contextMenu.
		this.contextMenu.contentObjectElement = edgeObjectElement;
		this.setContextClass('edge');

		// this.contentMenu.element.contentObjectElement = contentObjectElement;
		this.contextMenu.innerHTML = '';
		this.edgeMenu.populate(edgeObjectElement);
		this.place(edgeObjectElement);

	}




	setContextClass(newContextClass) {
		this.contextMenu.classList.remove('content');
		this.contextMenu.classList.remove('edge');

		this.contextMenu.classList.add(newContextClass);
	}

	removeContextClass() {
		this.contextMenu.classList.remove('content', 'edge');
	}

	showContextMenu() {
		this.contextMenu.classList.remove('hide');
	}

	hideContextMenu() {
		this.contextMenu.classList.add('hide');
		this.removeContextClass();
	}

	contextMenuIsOpen() {
		return (this.contextMenu.classList.contains('hide') ? false : true);
	}

	getCurrentMenuClass() {
		if (this.contextMenu.classList.contains('content')) {
			return 'content';
		}
		else if (this.contextMenu.classList.contains('edge')) {
			return 'edge';
		}
	}






	// Place contextMenu next to a passed DOM-element
	place(contentObjectElement) {
		// console.log(this)
		// this.element.contentObjectElement = contentObjectElement;

		let contentElementRect = contentObjectElement.getBoundingClientRect();
		// console.log(contentElementRect)
		let Xcenter = contentElementRect.left + (contentElementRect.width * 0.5);
		let Ycenter = contentElementRect.top + (contentElementRect.height * 0.5);

		let viewportHeight = window.innerHeight;
		let viewportWidth = window.innerWidth;
		// console.log(viewportHeight, viewportWidth)


		if (Xcenter < viewportWidth * 0.5) {
			this.contextMenu.style.left = contentElementRect.right + 20 + 'px';
		}
		else {
			this.contextMenu.style.left = (contentElementRect.left - contentElementRect.width - 20) + 'px';
		}

		if (Ycenter < viewportHeight * 0.5) {
			this.contextMenu.style.top = contentElementRect.top + 'px';
		}
		else {
			this.contextMenu.style.top = contentElementRect.bottom - this.contextMenu.offsetHeight + 'px';
		}


	}



}


export {
	ContextOverlay,
}