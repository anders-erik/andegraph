



/** @type {HTMLElement} */
let auxcontentElement;
/** @type {HTMLElement} */
let auxTitleElement;


/**
 * Auxillary panel content types
 * @readonly
 * @enum {number}
 */
export const AuxType = {
	None: 0,
    Project: 1,
    Search: 2,
	Review: 3,
	State: 4,
};


/**
 * @enum {number} Stored variables for Auxillary Panel in local storage.
 */
const StorageType = {
	AuxType: 1,
	PanelOpen: 2,
}




/** @type {boolean} State of Auxillary panel.  */
let auxcontentOpen = false;


/** @type {AuxType} State of Auxillary panel.  */
let loadedAuxType = AuxType.None;


/**
 * @type {string} - 
 */
const auxPanelHtml = `
<div id="aux-panel">
	<div id="aux-top-bar">
		<div id="aux-title">TITLE</div>
		<div id="aux-close-btn">CLOSE</div>
	</div>
</div>
`;






export function init(){
	auxcontentElement = document.getElementById("aux-content-con");
	auxcontentElement.innerHTML = auxPanelHtml;

	auxTitleElement = auxcontentElement.querySelector("#aux-title");

	console.log('getStoredVariable(StorageType.PanelOpen) = ', getStoredVariable(StorageType.PanelOpen));
	
	if(getStoredVariable(StorageType.PanelOpen) === "true"){
		console.log('OPENEOPNEPEONEPEON');
		
		
		showPanel();
	}
}


// export function closeAuxPanel(){
// 	// console.log('CLOSECLOSECLOSELSOES');
	
// }


/**
 * 	If the particular AuxType is already loaded, it is hidden. 
 * 	If the Aux-panel is hidden, or displaying another AuxType, the requested types is shown.
 * 
 * @param {AuxType} toggleAuxType	- Project, Search, Review, etc.
 */
export function toggleAuxContent(toggleAuxType){

	let togglingLoadedType = loadedAuxType === toggleAuxType;

	let panelIsOpen = auxcontentElement.classList.contains("open");
	

	/** Targeting the currently loaded panel type. */
	if(togglingLoadedType){
		panelIsOpen ? hidePanel() : showPanel(); 
		return;
	}
	// if(togglingLoadedType && panelIsOpen){
	// 	hidePanel();
	// 	return;
	// }
	// else if(togglingLoadedType && !panelIsOpen){
	// 	showPanel();
	// 	return;
	// }


	// Update Type
	loadedAuxType = toggleAuxType;


	// Load Panel With New Type
	switch (toggleAuxType) {
		case AuxType.Project:
			setStoredVariable(StorageType.AuxType, AuxType.Project);
			auxTitleElement.textContent = "Project";
			// toggleProject();
			break;

		case AuxType.Search:
			setStoredVariable(StorageType.AuxType, AuxType.Search);
			auxTitleElement.textContent = "Search";
			break;

		case AuxType.Review:
			setStoredVariable(StorageType.AuxType, AuxType.Review);
			auxTitleElement.textContent = "Review";
			break;

		case AuxType.State:
			setStoredVariable(StorageType.AuxType, AuxType.State);
			auxTitleElement.textContent = "State";
			break;

		default:
			break;
	}


	// Always Display if not currently shown
	if(!auxcontentOpen){
		showPanel();
	}
}







/**
	 * Returns the element the button is targeting. E.g. the search panel for the search menu-button.
	 * @param {string} buttonID
	 * @returns {HTMLElement}
	 */
function runButtonAction(buttonId){
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


export function getAuxTypeFromButtonId(buttonId){
	switch (buttonId) {
		case "left-menu-project":
			return AuxType.Project;
			break;

		case "left-menu-search":
			return AuxType.Search;
			break;

		case "left-menu-review":
			return AuxType.Review;
			break;

		case "left-menu-state":
			return AuxType.State;
			break;

		default:
			break;
	}
}


export function hidePanel(){
	auxcontentElement.classList.remove("open");
	auxcontentElement.style.width = "0px";
	auxcontentOpen = false;
	setStoredVariable(StorageType.PanelOpen, false);
}

export function showPanel(){
	auxcontentElement.classList.add("open");
	auxcontentElement.style.width = "var(--aux-width)";
	auxcontentOpen = true;
	setStoredVariable(StorageType.PanelOpen, true);
}


function loadProject(){
	console.log('TOGGLE AUX PROJECT');
	

}




function setStoredVariable(storageType, value){
	switch (storageType) {
		case StorageType.AuxType:
			localStorage.setItem("AuxPanel_AuxType", value);
			break;
		
		case StorageType.PanelOpen:
			localStorage.setItem("AuxPanel_PanelOpen", value);
			break;
	
		default:
			console.error("Trying to store unknown type.")
			break;
	}
}

function getStoredVariable(storageType){

	switch (storageType) {
		case StorageType.AuxType:
			return localStorage.getItem("AuxPanel_AuxType");
			break;

		case StorageType.PanelOpen:
			return localStorage.getItem("AuxPanel_PanelOpen");
			break;
	
		default:
			console.error("Trying to store unknown type.")
			return null;
			break;
	}
}