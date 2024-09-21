
import { ConnectMenu } from "./connectmenu/ConnectMenu.js";
import { ContentCardMenu } from "./contentcardmenu/ContentCardMenu.js";
import { ContentMenu } from "./contentmenu/ContentMenu.js";
import { EdgeMenu } from "./edgemenu/EdgeMenu.js";
import { NewAdjacentMenu } from "./newadjacentmenu/NewAdjacentMenu.js";
import { TitleMenu } from "./titlemenu/TitleMenu.js";

import { TrueContextMenu } from "./truecontextmenu/TrueContextMenu.js";


class ContextOverlay {

	overlayElement;

	contextMenu;

	contentMenu;
	contentCardMenu;
	titleMenu;
	edgeMenu;
	connectMenu;
	newAdjacentMenu;
	contentObjectElement;

	TrueContextMenu;

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
		this.contentCardMenu = new ContentCardMenu(this.contextMenu);
		this.titleMenu = new TitleMenu(this.contextMenu);
		this.edgeMenu = new EdgeMenu(this.contextMenu);
		this.connectMenu = new ConnectMenu(this.contextMenu);
		this.newAdjacentMenu = new NewAdjacentMenu(this.contextMenu);


		this.TrueContextMenu = new TrueContextMenu(this.overlayElement);

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
		else if (classlist.contains('contentCard') && currentObjectElement.contentObject) {
			this.updateContextMenuWithContentCardElement(currentObjectElement);
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

	updateContextMenuWithContentCardElement(contentObjectElement) {
		// this.contextMenu.
		this.contextMenu.contentObjectElement = contentObjectElement;
		this.setContextClass('contentCard');

		// this.contentMenu.element.contentObjectElement = contentObjectElement;
		this.contextMenu.innerHTML = '';
		this.contentCardMenu.populate(contentObjectElement);
		this.place(contentObjectElement);

	}

	updateContextMenuWithTitleElement(contentObjectElement) {
		// this.contextMenu.
		this.contextMenu.contentObjectElement = contentObjectElement;
		this.setContextClass('title');

		// this.contentMenu.element.contentObjectElement = contentObjectElement;
		this.contextMenu.innerHTML = '';
		this.titleMenu.populate(contentObjectElement);
		this.place(contentObjectElement);
		this.titleMenu.element.focus();

		// Set focus to end of title!
		let selObj = window.getSelection();
		// console.log('LENLEN: ', selObj.focusNode.length)
		selObj.extend(selObj.focusNode, selObj.focusNode.length)
		selObj.collapseToEnd();
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

	updateContextMenuWithConnect(referenceElement, contentObject1, contentObject2, Directed) {
		// this.contextMenu.
		this.contextMenu.contentObjectElement = referenceElement;
		this.setContextClass('connect');

		// this.contentMenu.element.contentObjectElement = contentObjectElement;
		this.contextMenu.innerHTML = '';
		this.connectMenu.createForm(contentObject1, contentObject2, Directed);
		this.place(referenceElement);

	}

	updateContextMenuWithNewAdjacent(contentObjectElement, Directed) {
		// this.contextMenu.
		this.contextMenu.contentObjectElement = contentObjectElement;
		this.setContextClass('newAdjacent');

		// this.contentMenu.element.contentObjectElement = contentObjectElement;
		this.contextMenu.innerHTML = '';
		this.newAdjacentMenu.createForm(contentObjectElement.contentObject, Directed);
		this.place(contentObjectElement);

	}



	setContextClass(newContextClass) {
		this.contextMenu.classList.remove('content');
		this.contextMenu.classList.remove('contentCard');
		this.contextMenu.classList.remove('title');
		this.contextMenu.classList.remove('edge');
		this.contextMenu.classList.remove('connect');
		this.contextMenu.classList.remove('newAdjacent');

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
	place(referenceElement) {
		// console.log(this)
		// this.element.contentObjectElement = contentObjectElement;

		let contentElementRect = referenceElement.getBoundingClientRect();
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
			this.contextMenu.style.left = (contentElementRect.left - this.contextMenu.offsetWidth - 20) + 'px';
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