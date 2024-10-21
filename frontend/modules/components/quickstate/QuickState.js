import { dbis } from "dbis";

export {
	quickState,
	QuickState,
}

// TODO: EVENT THAT UPDATE ALL QUICK STATE PANELS IN THE APP !

// customElements.define("content-object", HTMLContentObject, { extends: "div" });
// customElements.define("quick-state", HTMLContentObject, { extends: "content-object" });


// -------------------------------------------------------------------
// TODO: MOVE THIS TO A GLOBALY ACCESSIBLE LOCATION

/** @type {Object} */
class ContentObject {
	Uuid;
	Type;
	Title;
}



// class HTMLContentObject extends HTMLDivElement {
// 	constructor(){
// 		super();
// 	}
// 	/** @type {ContentObject} */
// 	contentObject;
// }
// customElements.define("content-object", HTMLContentObject, { extends: "div" });

// -------------------------------------------------------------------



let quickStates = null;



/** @type {{state1Uuid: number, state2Uuid: number, state3Uuid: number}} stateUuids */
// let stateUuids;
// let stateUuids = {
// 	state1Uuid: 0,
// 	state3Uuid: 0,
// 	state2Uuid: 0,
// }

export function getQuickState(){
	if(quickStates === null){
		console.error("Trying to get the satare before initilizatio!")
		return null;
	}

	return quickStates;
}




class HTML_QuickState extends HTMLDivElement {
	/** @type {ContentObject} */
	contentObject;

	constructor(){
		super();
	}
	update(contentObject){
		this.textContent = this.contentObject.Title;

	}

}
customElements.define("quick-state", HTML_QuickState, { extends: "div" });



/** A div element that necessarily contains 3 children, each representing a contentObject easily available to the user. */
class HTML_QuickStatePanel extends HTMLDivElement {
	/** @type {HTML_QuickState} */
	stateElement1;
	/** @type {HTML_QuickState} */
	stateElement2;
	/** @type {HTML_QuickState} */
	stateElement3;
}



/**
 * Interface and references to all quick state panels and their quick state buttons. 
 * @class
 */
class QuickState {

	/**
	 * Array of all currently generated quickstate panels.
	 *  @type {Array.<HTML_QuickStatePanel>} 
	 */
	quickstatePanels = [];


	/**
	 * Object representing the current state of the quickstate. All panels show the same state uuids. 
	 * @type {{state1Uuid: number, state2Uuid: number, state3Uuid: number}} stateUuids
	 */
	stateUuids = {
		state1Uuid: 0,
		state3Uuid: 0,
		state2Uuid: 0,
	};
	
	

	constructor(){}


	/** REPLACES THE CONSTRUCTOR! - 2024-10-21 */
	createNewPanel(parentElement){
		/** @type {HTML_QuickStatePanel} */
		let newQuickstatePanel = document.createElement("div");
		newQuickstatePanel.classList.add("quickstate-panel")
		newQuickstatePanel.innerHTML = this.quickstatePanelInnerHtml;
		this.quickstatePanels.push(newQuickstatePanel);

		// newQuickstatePanel.ASDF = "ASDFASDF";
		newQuickstatePanel.stateElement1 = newQuickstatePanel.querySelector('.quickstateElem1');
		// newQuickstatePanel.stateElement1.setAttribute('is', 'quick-state');
		newQuickstatePanel.stateElement2 = newQuickstatePanel.querySelector('.quickstateElem2');
		newQuickstatePanel.stateElement3 = newQuickstatePanel.querySelector('.quickstateElem3');

		// TESTING WEB COMPONENTS
		newQuickstatePanel.stateElementTest = new HTML_QuickState();
		newQuickstatePanel.stateElementTest.textContent = "TESTINGTESTING";
		newQuickstatePanel.appendChild(newQuickstatePanel.stateElementTest)
		// newQuickstatePanel.stateElementTest = new HTMLQuickState();

		// document.createElement("div")
		

		// make sure current Uuid values are up to date
		this.readLocalStorageStates();

		this.loadState1FromApi();
		this.loadState2FromApi();
		this.loadState3FromApi();

		// Append to dom/parent only when all comopnents added, although the data has not yet been returned
		parentElement.append(newQuickstatePanel);
	}
	

	
	/**
	 * 
	 * @param {ContentObject} contentObject 
	 */
	setState1WithCO(contentObject){
		this.quickstatePanels.forEach((quickstatePanel) => {
			quickstatePanel.stateElement1.contentObject = contentObject;
			quickstatePanel.stateElement1.update();
			this.writeState1ToLocalStorage(contentObject.Uuid);
		})

	}

	/**
	 * 
	 * @param {ContentObject} contentObject 
	 */
	setState2WithCO(contentObject){
		this.quickstatePanels.forEach((quickstatePanel) => {
			quickstatePanel.stateElement2.contentObject = contentObject;
			quickstatePanel.stateElement2.update();
			this.writeState2ToLocalStorage(contentObject.Uuid);
		})

	}

	/**
	 * 
	 * @param {ContentObject} contentObject 
	 */
	setState3WithCO(contentObject){
		this.quickstatePanels.forEach((quickstatePanel) => {
			quickstatePanel.stateElement3.contentObject = contentObject;
			quickstatePanel.stateElement3.update();
			this.writeState3ToLocalStorage(contentObject.Uuid);
		})

	}



	/** Fetch state 1 object from Api and updates all panels state 1. */
	loadState1FromApi(){
		if (this.stateUuids.state1Uuid) {
			dbis.Content_SelectOnUuid(this.stateUuids.state1Uuid)
				.then((state1ContentObject) => {
					this.setState1WithCO(state1ContentObject);
				});
		}
		else{
			console.warn("Unable to verify state 1 uuid. Did not load content object.");
		}
	}

	/** Fetch state 2 object from Api and updates all panels state 1. */
	loadState2FromApi(){
		if (this.stateUuids.state2Uuid) {
			dbis.Content_SelectOnUuid(this.stateUuids.state2Uuid)
				.then((state2ContentObject) => {
					this.quickstatePanels.forEach((quickstatePanel) => {
						quickstatePanel.stateElement2.contentObject = state2ContentObject;
						quickstatePanel.stateElement2.update();
					})
				});
		}
		else{
			console.warn("Unable to verify state 2 uuid. Did not load content object.");
		}
	}

	/** Fetch state 3 object from Api and updates all panels state 1. */
	loadState3FromApi(){
		if (this.stateUuids.state3Uuid) {
			dbis.Content_SelectOnUuid(this.stateUuids.state3Uuid)
				.then((state3ContentObject) => {
					this.quickstatePanels.forEach((quickstatePanel) => {
						quickstatePanel.stateElement3.contentObject = state3ContentObject;
						quickstatePanel.stateElement3.update();
					})
				});
		}
		else{
			console.warn("Unable to verify state 3 uuid. Did not load content object.");
		}
	}

	// /**
	//  * Reads state 1/2/3 from local storage
	//  * @param {HTML_QuickStatePanel} panelElement 
	//  */
	// fetchAndUpdatePanelFromApi(panelElement){
	// 	let lastState1Uuid = localStorage.getItem('state1Uuid');
	// 	let lastState2Uuid = localStorage.getItem('state2Uuid');
	// 	let lastState3Uuid = localStorage.getItem('state3Uuid');

	// 	// console.log('lastState1Uuid', lastState1Uuid)
	// 	if (lastState1Uuid) {
	// 		dbis.Content_SelectOnUuid(lastState1Uuid)
	// 			.then((state1ContentObject) => {
	// 				this.setState1(state1ContentObject);
	// 			});
	// 	}
	// 	if (lastState2Uuid) {
	// 		dbis.Content_SelectOnUuid(lastState2Uuid)
	// 			.then((state2ContentObject) => {
	// 				this.setState2(state2ContentObject);
	// 			});
	// 	}
	// 	if (lastState3Uuid) {
	// 		dbis.Content_SelectOnUuid(lastState3Uuid)
	// 			.then((state3ContentObject) => {
	// 				this.setState3(state3ContentObject);
	// 			});
	// 	}
	// }


	/** Updates the QuickState stateUuids-object with the state uuids previously written to local storage. */
	readLocalStorageStates(){
		this.stateUuids.state1Uuid = Number(localStorage.getItem('state1Uuid'));
		this.stateUuids.state2Uuid = Number(localStorage.getItem('state2Uuid'));
		this.stateUuids.state3Uuid = Number(localStorage.getItem('state3Uuid'));
	}


	/** Writed the QuickState stateUuids-uuid's to local sorage. */
	writeToLocalStorageStates(){
		writeState1ToLocalStorage(this.stateUuids.state1Uuid);
		writeState1ToLocalStorage(this.stateUuids.state2Uuid);
		writeState1ToLocalStorage(this.stateUuids.state3Uuid);
	}

	writeState1ToLocalStorage(state1Uuid){
		localStorage.setItem('state1Uuid', state1Uuid);
	}
	writeState2ToLocalStorage(state2Uuid){
		localStorage.setItem('state2Uuid', state2Uuid);
	}
	writeState3ToLocalStorage(state3Uuid){
		localStorage.setItem('state3Uuid', state3Uuid);
	}





	quickstatePanelInnerHtml = `
<div class="quickstateElem quickstateElem1" tabindex=0 is="quick-state">1</div>
<div class="quickstateElem quickstateElem2" tabindex=0 is="quick-state">2</div>
<div class="quickstateElem quickstateElem3" tabindex=0 is="quick-state">3</div>
	`;
}


const quickState = new QuickState();
