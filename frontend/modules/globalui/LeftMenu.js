
import * as auxcontent from "../globalui/auxcontent.js";
import {AuxType, toggleAuxContent} from "globalui/auxcontent.js";


/** @type {HTMLElement} */
let leftMenu = null;



export function getLeftMenu(){
	if(leftMenu == null){
		console.error("Tried to get left menu before instantiation.")
		return null;
	}

	return leftMenu;
}



export class LeftMenu {

	/** @type {HTMLElement} */
	leftMenuContainer = null;

	/** @type {HTMLElement} */
	mouseoverElement;
	
	/** @type {Array} */
	buttonElements = [];

	/** @type {boolean} */
	openedWithHover = false;
	
	constructor(leftMenuContainer) {
		this.leftMenuContainer = leftMenuContainer;
		leftMenu = this;

		this.buttonElements = [
			document.getElementById("left-menu-project"),
			document.getElementById("left-menu-search"),
			document.getElementById("left-menu-review"),
			document.getElementById("left-menu-state"),
		]

	}


	loadButtonElements(){
		
	}

	/**
	 * Update menu buttons on click.
	 * @param {MouseEvent} clickEvent
	 */
	buttonClick(clickEvent){
		let buttonElement = clickEvent.target;
		// console.log('CLICKED PROJECT BUTTON  : id =', buttonElement.id);

		if(buttonElement.id === "left-menu-home"){
			// TODO : LOAD HOME HERE
			return;
		}


		/** @type {HTMLElement} */
		// let buttonTarget = this.runButtonAction(buttonElement.id);


		

		let auxType = auxcontent.getAuxTypeFromButtonId(buttonElement.id);
		auxcontent.toggleAuxContent(auxType);


		this.updateButtonHighlight(buttonElement);

		// Toggle container visibility
		// buttonTarget.classList.contains("hide") ? buttonTarget.classList.remove("hide") : buttonTarget.classList.add("hide");
		
	}

	getButtonElem(){

	}

		
	updateButtonHighlight(buttonElement){
		
		let clickedOnCurrentSelected = buttonElement.classList.contains("selected");

		this.turnOffAllButtonHighlights();

		// if(buttonElement.classList.contains("selected"))
		// 	buttonElement.classList.remove("selected");
		// else 

		if(!clickedOnCurrentSelected)
			buttonElement.classList.add("selected");
	}

	turnOffAllButtonHighlights(){
		// if(this.buttonElements.length === 0){
		// 	this.loadButtonElements();
		// }

		this.buttonElements.forEach((buttonElement) => {
			buttonElement.classList.remove("selected");
		});
	}

	/**
	 * Returns the element the button is targeting. E.g. the search panel for the search menu-button.
	 * @param {string} buttonID
	 * @returns {HTMLElement}
	 */
	runButtonAction(buttonId){
		switch (buttonId) {

			case "left-menu-project":
				toggleAuxContent(AuxType.Project);
				break;

			case "left-menu-search":
				toggleAuxContent(AuxType.Search);
				break;

			case "left-menu-review":
				toggleAuxContent(AuxType.Review);
				break;

				
			case "left-menu-state":
				toggleAuxContent(AuxType.State);
				break;
		
			default:
				console.error("Unable to resolve left menu click target.")
				return null;
				break;
		}
		
	}

}

// export let leftMenu = new LeftMenu();


// /**
//  * 
//  * @param {string} buttonElementId
//  */
// export function buttonClick(buttonElementId){
// 	// console.log('CLICKED PROJECT BUTTON  : id =', buttonElement.id);

// 	if(buttonElementId === "left-menu-home"){
// 		// TODO : LOAD HOME HERE
// 		return;
// 	}

// 	/** @type {HTMLElement} */
// 	let buttonTarget = runButtonAction(buttonElementId);

// 	updateButtonHighlight(buttonElementId)

// 	// Toggle container visibility
// 	// buttonTarget.classList.contains("hide") ? buttonTarget.classList.remove("hide") : buttonTarget.classList.add("hide");
	
// }

// function updateButtonHighlight(clickedButtonElementId){
	
// }

// function turnOffAllButtonHighlights(){

// }

// /**
//  * Returns the element the button is targeting. E.g. the search panel for the search menu-button.
//  * @param {string} buttonID
//  * @returns {HTMLElement}
//  */
// function runButtonAction(buttonId){
// 	switch (buttonId) {

// 		case "left-menu-project":
// 			toggleAuxContent(AuxType.Project);
// 			break;

// 		case "left-menu-search":
// 			toggleAuxContent(AuxType.Search);
// 			break;

// 		case "left-menu-review":
// 			toggleAuxContent(AuxType.Review);
// 			break;

			
// 		case "left-menu-state":
// 			toggleAuxContent(AuxType.State);
// 			break;
	
// 		default:
// 			console.error("Unable to resolve left menu click target.")
// 			return null;
// 			break;
// 	}
	
// }