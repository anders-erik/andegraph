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
		this.contentObject = contentObject;
		this.textContent = this.contentObject.Title;

	}

}
customElements.define("quick-state", HTML_QuickState, { extends: "div" });



/** A div element that necessarily contains 3 children, each representing a contentObject easily available to the user. */
class HTML_QuickStatePanel extends HTMLDivElement {
	constructor(){
		super();
	}

	/** @type {HTML_QuickState} */
	stateElement1;
	/** @type {HTML_QuickState} */
	stateElement2;
	/** @type {HTML_QuickState} */
	stateElement3;
}
customElements.define("quick-state-panel", HTML_QuickStatePanel, { extends: "div" });


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

	/**
	 * Object representing the current state of the quickstate. All panels show the same state uuids. 
	 * @type {{stateContentObject_1: ContentObject, stateContentObject_2: ContentObject, stateContentObject_3: ContentObject}} stateContentObjects
	 */
	stateContentObjects = {
		stateContentObject_1: {},
		stateContentObject_2: {},
		stateContentObject_3: {},
	};
	
	

	constructor(){}


	/** REPLACES THE CONSTRUCTOR! - 2024-10-21 */
	createNewPanel(parentElement){

		// INSTANCEOF !
		// let qsp = new HTML_QuickStatePanel();
		// qsp.textContent = "QSP";
		// parentElement.appendChild(qsp);
		// if(qsp instanceof  HTML_QuickStatePanel){
		// 	console.log("IS PANEL!!!");
		// }
		// else {
		// 	console.log("IS NOT PANEL!!!");
		// }

		/** @type {HTML_QuickStatePanel} */
		let newQuickstatePanel = new HTML_QuickStatePanel();
		newQuickstatePanel.classList.add("quickstatePanel");
		// let newQuickstatePanel = document.createElement("div");
		// newQuickstatePanel.classList.add("quickstate-panel");
		newQuickstatePanel.innerHTML = this.quickstatePanelInnerHtml;
		this.quickstatePanels.push(newQuickstatePanel);

		// newQuickstatePanel.ASDF = "ASDFASDF";
		newQuickstatePanel.stateElement1 = newQuickstatePanel.querySelector('.quickstateElem1');
		// newQuickstatePanel.stateElement1.setAttribute('is', 'quick-state');
		newQuickstatePanel.stateElement2 = newQuickstatePanel.querySelector('.quickstateElem2');
		newQuickstatePanel.stateElement3 = newQuickstatePanel.querySelector('.quickstateElem3');

		// TESTING WEB COMPONENTS
		// newQuickstatePanel.stateElementTest = new HTML_QuickState();
		// newQuickstatePanel.stateElementTest.textContent = "TESTINGTESTING";
		// newQuickstatePanel.appendChild(newQuickstatePanel.stateElementTest);
		// newQuickstatePanel.stateElementTest = new HTMLQuickState();

		// Beware of this call reloading from the api for EVERY panel, regardless of how many panels are present in the app.
		this.reloadFromApi();

		// Append to dom/parent only when all comopnents added, although the data has not yet been returned
		parentElement.append(newQuickstatePanel);
	}


	/** Reloads the  */
	reloadFromApi(){
		// make sure current Uuid values are up to date
		this.readLocalStorageStates();

		this.loadStateFromApi_1();
		this.loadStateFromApi_2();
		this.loadStateFromApi_3();
	}

	reloadFromStorage(){
		this.readLocalStorageStates()
		this.reloadFromState();
	}

	reloadFromState(){
		this.updateQuickStateWithCO_1(this.stateContentObjects.stateContentObject_1);
		this.updateQuickStateWithCO_2(this.stateContentObjects.stateContentObject_2);
		this.updateQuickStateWithCO_3(this.stateContentObjects.stateContentObject_3);
	}
	
	/**
	 * Intended to provide class methods and external modules with and easy way of determining if uuid is currently in any of the states.
	 * @param {uuid} number - andegraph uuid
	 * @returns {boolean} hasUuid
	 */
	uuidIsPartOfQuickState(uuid){
		if( this.stateUuids.state1Uuid === uuid ||
			this.stateUuids.state2Uuid === uuid ||
			this.stateUuids.state3Uuid === uuid ){

			return true;
		}
		return false;
	}

	/**
	 * 
	 * @param {ContentObject} contentObject 
	 */
	updateWithchangedContentObject(contentObject){
		// Semantic nicety
		let objectLodedInState1 = contentObject.Uuid === this.stateUuids.state1Uuid;
		let objectLodedInState2 = contentObject.Uuid === this.stateUuids.state2Uuid;
		let objectLodedInState3 = contentObject.Uuid === this.stateUuids.state3Uuid;
		
		// The same uuid could be loaded in all states, so we can't assume no overlap
		if(objectLodedInState1){
			updateQuickStateWithCO_1(contentObject);
		}
		if(objectLodedInState2){
			updateQuickStateWithCO_2(contentObject);
		}
		if(objectLodedInState3){
			updateQuickStateWithCO_3(contentObject);
		}
	}
	
	/**
	 * State 1! 
	 * Updates state 1 element in all panels, quickstate-state, and local storage.
	 * @param {ContentObject} contentObject 
	 */
	updateQuickStateWithCO_1(contentObject){
		// QuickState State
		this.stateContentObjects.stateContentObject_1 = contentObject;
		this.writeState1ToLocalStorage(contentObject.Uuid);
		this.stateUuids.state1Uuid = contentObject.Uuid;

		this.quickstatePanels.forEach((quickstatePanel) => {
			quickstatePanel.stateElement1.update(contentObject);
		})

	}

	/**
	 * State 2! 
	 * Updates state 2 element in all panels, quickstate-state, and local storage.
	 * @param {ContentObject} contentObject 
	 */
	updateQuickStateWithCO_2(contentObject){
		// QuickState State
		this.stateContentObjects.stateContentObject_2 = contentObject;
		this.stateUuids.state2Uuid = contentObject.Uuid;
		this.writeState2ToLocalStorage(contentObject.Uuid);

		this.quickstatePanels.forEach((quickstatePanel) => {
			quickstatePanel.stateElement2.update(contentObject);
		})

	}

	/**
	 * State 3! 
	 * Updates state 3 element in all panels, quickstate-state, and local storage.
	 * @param {ContentObject} contentObject 
	 */
	updateQuickStateWithCO_3(contentObject){
		// QuickState State
		this.stateContentObjects.stateContentObject_3 = contentObject;
		this.stateUuids.state3Uuid = contentObject.Uuid;
		this.writeState3ToLocalStorage(contentObject.Uuid);

		this.quickstatePanels.forEach((quickstatePanel) => {
			quickstatePanel.stateElement3.update(contentObject);
		})

	}



	/** Fetch state 1 object from Api and updates all panels state 1. */
	loadStateFromApi_1(){
		if (this.stateUuids.state1Uuid) {
			dbis.Content_SelectOnUuid(this.stateUuids.state1Uuid)
				.then((state1ContentObject) => {
					this.updateQuickStateWithCO_1(state1ContentObject);
				});
		}
		else{
			console.warn("Unable to verify state 1 uuid. Did not load content object.");
		}
	}

	/** Fetch state 2 object from Api and updates all panels state 1. */
	loadStateFromApi_2(){
		if (this.stateUuids.state2Uuid) {
			dbis.Content_SelectOnUuid(this.stateUuids.state2Uuid)
				.then((state2ContentObject) => {
					this.updateQuickStateWithCO_2(state2ContentObject);
				});
		}
		else{
			console.warn("Unable to verify state 2 uuid. Did not load content object.");
		}
	}

	/** Fetch state 3 object from Api and updates all panels state 1. */
	loadStateFromApi_3(){
		if (this.stateUuids.state3Uuid) {
			dbis.Content_SelectOnUuid(this.stateUuids.state3Uuid)
				.then((state3ContentObject) => {
					this.updateQuickStateWithCO_3(state3ContentObject);
				});
		}
		else{
			console.warn("Unable to verify state 3 uuid. Did not load content object.");
		}
	}




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
