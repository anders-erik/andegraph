
import * as auxcontent from "../globalui/auxcontent.js";
import {AuxType, toggleAuxContent} from "globalui/auxcontent.js";

/**
 * @enum {number} Stored variables for Left Menu in local storage.
 */
const StorageType = {
		Pinned: 1,
}

/** @type {HTMLElement} */
let leftMenu = null;



export function getLeftMenu(){
	if(leftMenu == null){
		console.error("Tried to get left menu before instantiation.")
		return null;
	}

	return leftMenu;
}

const leftMenuHtml = `
<div id="left-menu">
	<div id="left-menu-topbar">
		<div id="left-menu-close-button">OPEN</div>
		<div id="left-menu-title">Menu</div>
		<div id="left-menu-pin">PIN</div>
	</div>	

	<div id="left-menu-home" class="left-menu-item">Home</div>
	<div id="left-menu-project" class="left-menu-item">Project</div>
	<div id="left-menu-search" class="left-menu-item">Search</div>
	<div id="left-menu-review" class="left-menu-item">Review</div>
	<div id="left-menu-state" class="left-menu-item">State</div>
</div>

<div id="left-menu-open-button"></div>
<div id="left-menu-mouseenter"></div>
`;


export class LeftMenu {

	/** @type {HTMLElement} */
	leftMenuContainer = null;
	/** @type {HTMLElement} */
	leftMenuElement;

	/** @type {HTMLElement} */
	leftMenuToggleInnerElement;
	/** @type {HTMLElement} */
	leftMenuToggleOuterElement;
	/** @type {HTMLElement} */
	leftMenuPinElement;
	/** @type {HTMLElement} */
	mouseenterElement;

	/** @type {HTMLElement} */
	leftMenuHome;
	/** @type {HTMLElement} */
	leftMenuState;
	/** @type {HTMLElement} */
	leftMenuProject;
	/** @type {HTMLElement} */
	leftMenuSearch;
	/** @type {HTMLElement} */
	leftMenuReview;

	
	
	/** @type {Array} */
	buttonElements = [];

	/** @type {boolean} */
	openedWithHover = false;

	/** @type {boolean} */
	pinned = false;
	
	constructor(leftMenuContainer) {
		leftMenu = this;
		
		this.leftMenuContainer = leftMenuContainer;
		this.leftMenuContainer.innerHTML = leftMenuHtml;


		this.leftMenuElement = this.leftMenuContainer.querySelector("#left-menu");
		console.log("this.leftMenuElement = ", this.leftMenuElement)

		/** Buttons */
		this.leftMenuHome = this.leftMenuElement.querySelector("#left-menu-home");
		this.leftMenuState = this.leftMenuElement.querySelector("#left-menu-state");
		this.leftMenuProject = this.leftMenuElement.querySelector("#left-menu-project");
		this.leftMenuSearch = this.leftMenuElement.querySelector("#left-menu-search");
		this.leftMenuReview = this.leftMenuElement.querySelector("#left-menu-review");
		
		
		/** Menu Toggles */
		this.leftMenuToggleInnerElement = this.leftMenuElement.querySelector("#left-menu-close-button");
		// query these from container since they are sitting uotside of the menu element
		this.leftMenuToggleOuterElement = this.leftMenuContainer.querySelector("#left-menu-open-button");
		this.mouseenterElement = this.leftMenuContainer.querySelector("#left-menu-mouseenter");

		this.leftMenuPinElement = this.leftMenuContainer.querySelector("#left-menu-pin");
		if (this.getStoredVariable(StorageType.Pinned) === "true"){
			this.leftMenuPinElement.classList.add("pinned");
			this.pinned = true;
		}

		/** Events */
		this.leftMenuToggleOuterElement.addEventListener("click", this.openLeftMenuClick.bind(this));
		this.leftMenuToggleInnerElement.addEventListener("click", this.closeLeftMenuClick.bind(this));
		this.leftMenuPinElement.addEventListener("click", this.pinMenuClicked.bind(this));

		this.mouseenterElement.addEventListener("mouseenter", this.mouseEnterLeftMenuStrip.bind(this));
		this.leftMenuElement.addEventListener("mouseleave", this.mouseLeaveMenu.bind(this))



		this.buttonElements = [
			document.getElementById("left-menu-project"),
			document.getElementById("left-menu-search"),
			document.getElementById("left-menu-review"),
			document.getElementById("left-menu-state"),
		]

	}





	/**
	 * Pin the menu by setting the 'openedWithHover' bool to false.
	 * @param {clickEvent} pinMenuEvent 
	 */
	pinMenuClicked(pinMenuEvent){
		// console.log('pinMenuClicked');
		
		// Toggle pinned state
		if(this.pinned){
			this.pinned = false;
			this.leftMenuPinElement.classList.remove("pinned");
			this.setStoredVariable(StorageType.Pinned, "false");
		}
		else {
			this.pinned = true;
			this.leftMenuPinElement.classList.add("pinned");
			this.setStoredVariable(StorageType.Pinned, "true");
		}


		if(!this.pinned){
			// this.closeLeftMenu();
		}

	}

	/**
	 * Sets the CSS values of an opened left menu. No Logic.
	 * @param {MouseEvent} enterMenuStripEvent 
	 */
	mouseEnterLeftMenuStrip(enterMenuStripEvent){

		this.openLeftMenu();
		
		/* Previous logic with effective pinning when clicking */
		// let menuIsOpen = this.leftMenuContainer.classList.contains("open");
		// if(!menuIsOpen){
		// 	this.mouseoverElement.style.pointerEvents = "none";
		// 	this.openedWithHover = true;
		// 	this.openLeftMenu();
		// }
		
	}

	/**
	 * Sets the CSS values of an opened left menu. No Logic.
	 * @param {MouseEvent} leaveMenuEvent 
	 */
	mouseLeaveMenu(leaveMenuEvent){

		if(this.pinned){
			return;
		}

		this.closeLeftMenu();

		/* Previous logic with effective pinning when clicking */
		// let menuIsOpen = this.leftMenuContainer.classList.contains("open");
		
		// if(menuIsOpen && this.openedWithHover){
		// 	this.closeLeftMenu();
		// }
		
	}

	/**
	 * Registered click to open left menu.
	 * @param {MouseEvent} clickEvent 
	 */
	openLeftMenuClick(clickEvent){
		this.openLeftMenu();
	}

	/**
	 * Registered click to open left menu.
	 * @param {MouseEvent} clickEvent 
	 */
	closeLeftMenuClick(clickEvent){
		this.pinned = false;
		this.leftMenuPinElement.classList.remove("pinned");
		
		this.closeLeftMenu();
	}






	/**
	 * Sets the CSS values of an opened left menu. No Logic.
	 */
	openLeftMenu(){

		this.leftMenuContainer.classList.add("open");

		this.leftMenuElement.style.width = "250px";
		// leftMenuToggleOuterElement.style.display = "none";
		this.leftMenuToggleOuterElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
		this.leftMenuToggleOuterElement.style.pointerEvents = "none";

		// this.mouseoverElement.style.pointerEvents = "none";
		// this.mouseoverElement.style.display = "none";
		this.mouseenterElement.style.backgroundColor = "rgba(0,0,0,0)";
	}
	
	/**
	 * Sets the CSS values of a closed left menu. No Logic.
	 */
	closeLeftMenu(){
		
		
		this.leftMenuContainer.classList.remove("open");

		/** Reset  */
		this.openedWithHover = false;

		this.leftMenuElement.style.width = "0px";
		// leftMenuToggleOuterElement.style.display = "block";
		this.leftMenuToggleOuterElement.style.backgroundColor = "rgba(128, 0, 124, 255)";
		this.leftMenuToggleOuterElement.style.pointerEvents = "all";

		this.mouseenterElement.style.pointerEvents = "all";
		// this.mouseoverElement.style.display = "block";
		// this.mouseoverElement.style.backgroundColor = "rgba(255,255,255,255)";
	}




	/**
	 * Update menu buttons on click.
	 * @param {MouseEvent} clickEvent
	 */
	listButtonClick(clickEvent){
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




	setStoredVariable(storageType, value){
		switch (storageType) {
			case StorageType.Pinned:
				localStorage.setItem("LeftMenu_Pinned", value);
				break;
		
			default:
				console.error("Trying to store unknown type.")
				break;
		}
	}

	getStoredVariable(storageType){
		switch (storageType) {
			case StorageType.Pinned:
				return localStorage.getItem("LeftMenu_Pinned");
				break;
		
			default:
				console.error("Trying to store unknown type.")
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