import { dbis } from "../dbi-send/dbi-send.js";
// import { determineClipboardContentType } from "./filehandling/DetermineClipboardContents.js";

import * as maincontent from "../maincontent/MainContent.js";

// import { leftMenu } from "./LeftMenu.js";
import { getLeftMenu, LeftMenu } from "globalui/LeftMenu.js";

/** @type {LeftMenu} */
let leftMenu = null;

import * as auxcontent from "globalui/auxcontent.js";


/**
 * Have *all* clicks with intended global side effects travel through this method for better app overview/control.
 * 
 * @param {MouseEvent} clickEvent 
 */
export function globalClick(clickEvent){
	let eventTarget = clickEvent.target;

	if(leftMenu === null){
		leftMenu = getLeftMenu(); /* TODO : add reference to leftMenu in eventhandler-constructor! */
	}

	switch(eventTarget.id){
		
		/** LEFT MENU */
		case "left-menu-home":
		case "left-menu-state":
		case "left-menu-project":
		case "left-menu-search":
		case "left-menu-review":
			
			leftMenu.listButtonClick(clickEvent);
			// let auxType = auxcontent.getAuxTypeFromButtonId(eventTarget.id);
			// auxcontent.toggleAuxContent(auxType);
			break;
		
		/** AUX PANEL */
		case "aux-close-btn":
			auxcontent.hidePanel();
			leftMenu.turnOffAllButtonHighlights();
			
			
		default:
			// console.log('No global click matches');
			
	}
}

/**
 * Have *all* clicks with intended global side effects travel through this method for better app overview/control.
 * 
 * @param {MouseEvent} clickEvent 
 */
export function globalMouseEnter(mouseoverEvent){
	if(mouseoverEvent.target.id === "left-menu-mouseover"){
		console.log('ENTERED LEFT MENU');
		
	}
}


class GlobalEventHandler {

	app;
	appElement;

	listeningSecondShift = false;
	listeningSecondCtrlShift = false;

	mode = '';
	modeTimeout;

	// mainContentObjectElement;
	// currentReviewObjectElement;
	// currentProjectObjectElement;

	/*  */
	/*  */
	/*  */


	actions = [
		'chooseProject',
		'chooseSelection',
		'propertiesContext',
		'hidePropertiesContext',
		'parentContext',
		'childContext',
		'undirectedContext',
		'adjacentContext',
	];


	constructor(app, appElement) {
		this.app = app;
		this.appElement = appElement;


	}



	paste(event) {
		// console.log('GLOBAL PASTE TO :')
		// console.log('ACTIVE', document.activeElement)
		// console.log('TARGET ', event.target)

		// let clipboardContentType = determineClipboardContentType(event.clipboardData);
		// let isText = clipboardContentType === 'text' ? true : false;
		// let isFile = clipboardContentType === 'file' ? true : false;
		// let contentCard;
		// let contentObject;

		// if (document.activeElement.classList.contains('contentCard')) {
		// 	console.log('paste to content card')
		// 	contentCard = document.activeElement;
		// 	contentObject = contentCard.contentObject;

		// 	switch (contentObject.Table) {

		// 		case 'Text':
		// 			console.log('PASTE ON TEXT')

		// 			editing = contentCard.classList.contains('editing');
		// 			isEmpty = contentCard.textContent === '';

		// 			if (!editing && isText && isEmpty) {
		// 				console.log('PASTE TEXT TO TEXT-CONTENTCARD')
		// 				let clipboardText = (event.clipboardData || window.clipboardData).getData("text");
		// 				this.content.insertTextContent(this.content.element, clipboardText);
		// 			}
		// 			else {
		// 				console.log(`Can't paste to non-empty content`)
		// 			}
		// 			break;

		// 		case 'File':
		// 			console.log('PASTE ON FILE')
		// 			break;

		// 		default:
		// 			break;
		// 	}
		// }

	}


	keyup(event) {

		if (event.key === 'Shift') {

			this.listeningSecondShift = true;
			setTimeout(() => { this.listeningSecondShift = false }, 100)

		}


	}



	async keydown(event) {	
		// console.log(event.keyCode)

		let contentObject = event.target.contentObject;
		let targetingContentObject = event.target.contentObject ? 1 : 0;

		// Create booleans to quickly check if im targeting key state objects
		// the primary purpose is to enable dynamic updating when adding or removing adjacent content nodes
		let mainContentElement = document.getElementById('mainContentTitle');
		let mainReviewElement = document.getElementById('mainContentReview');
		let loadedReviewElement = document.getElementById('mainOverlay_projectTitle');
		let targetingMainContentObject = 0;
		let targetingMainContentReview = 0;
		let targetingLoadedProject = 0;
		if (targetingContentObject) {
			// first check if exists, then if contentobject. Otherwide error will be thrown if elements not loaded
			if (mainContentElement && mainContentElement.contentObject)
				targetingMainContentObject = contentObject.Uuid == mainContentElement.contentObject.Uuid ? 1 : 0;
			if (mainReviewElement && mainReviewElement.contentObject)
				targetingMainContentReview = contentObject.Uuid == mainReviewElement.contentObject.Uuid ? 1 : 0;
			if (loadedReviewElement && loadedReviewElement.contentObject)
				targetingLoadedProject = contentObject.Uuid == loadedReviewElement.contentObject.Uuid ? 1 : 0;
		}
		// console.log('targetingMainContentObject? : ', targetingMainContentObject)
		// console.log('targetingMainContentReview? : ', targetingMainContentReview)
		// console.log('targetingLoadedProject? : ', targetingLoadedProject)


		// DELETE CONTENT OBJECT
		if (targetingContentObject && event.ctrlKey && event.altKey && event.shiftKey && event.key === 'D') {
			// Makes sure no lingering files are accumulated
			if (contentObject.Table === 'File' && contentObject.Title !== '') {
				console.log('remove file-content beofre deleteing contnet object');
				return;
			}

			await dbis.Content_DropFullOnUuid(event.target.contentObject.Uuid);
			event.target.remove();
			return;
		}


		// console.log('KEY: ', event.key)
		let actionObject = {
			action: '',
			element: event.target,
		}

		// DETECT DOUBLE SHIFT AFTER KEYUP KEYUP flag set
		if (event.key === 'Shift' && this.listeningSecondShift) {

			let searchBtn = document.getElementById('mainMenuSearch');

			if (!searchBtn.classList.contains('selected')) {
				document.getElementById('mainMenuSearch').click();
			}

			this.app.mainOverlay.search.input.element.focus()
			this.listeningSecondShift = false;


		}



		// console.log('keyup: ', event.target);
		// console.log(this)
		// let rr;
		if (event.target.contentEditable == 'true' || event.target.type == 'text') {
			console.log('TEXT INPUT ELEMENT')

			if (event.target.id === 'searchInput' && event.key == 'Enter') {

				document.getElementById('searchTableBody').firstElementChild.focus();

			}
			else if (event.target.id === 'searchInput' && event.key == 'Escape') {

				document.getElementById('searchContainer').focus()
				// document.getElementById('mainMenuSearch').click();

			}
			if (event.key === 'Escape' && event.target.classList.contains('contextElement')) {
				this.focusFirstFocusableAncestor(event.target);
			}


			return;
		}

		let isContentObject = event.target.contentObject;
		let isEdgeObject = event.target.edgeObject;

		let contextMenuOpen;
		let focusOnContextMenu;
		let focusOnContentElement;

		// console.log(event.key)
		// console.log('shiftKey: ', event.shiftKey)
		// console.log('ctrlKey: ', event.ctrlKey)


		// case '/':
		// document.getElementById('mainMenuReview').click();
		// this.app.mainOverlay.review.tableBody.firstElementChild.focus();
		// break;
		// 	case '?':
		// document.getElementById('mainMenuSearch').click()
		// this.app.mainOverlay.search.input.element.focus()
		// event.preventDefault()
		// break;



		/*
			MODE SWITCHES
		*/

		// console.log('this.mode', this.mode)
		if (this.mode === '') {

			switch (event.key) {

				// Search
				case '/':
					this.mode = '/';
					break;

				// Child
				case 'c':
					this.mode = 'c';
					break;

				// Focus
				case 'f':
					this.mode = 'f';
					break;

				// Go
				case 'g':
					this.mode = 'g';
					break;

				// Toggle
				case 't':
					this.mode = 't';
					break;

				// Undirected
				case 'v':
					this.mode = 'v';
					break;

				default:
					break;
			}

			if (this.mode !== '') {
				// console.log('TOGGLED TO ', this.mode)

				// Make sure the mode timeout is not reseting toggled modes pressed in quick succession
				clearTimeout(this.modeTimeout);

				this.modeTimeout = setTimeout(() => {
					this.mode = '';
					clearTimeout(this.modeTimeout);
				}, 1000);
				return;
			}

		}
		// console.log(this.mode)

		// console.log('BYPASSED MODE TOGGLE WITH : ', this.mode)


		let elem;
		switch (this.mode) {



			/*
				/////////////////
			*/
			case '/':

				let searchType = '';
				let searchTypeCheckboxId = undefined;

				switch (event.key) {

					case 'c':
						searchTypeCheckboxId = 'codeSearchCheckbox';
						break;

					case 'f':
						searchTypeCheckboxId = 'fileSearchCheckbox';
						break;

					case 'p':
						searchTypeCheckboxId = 'projectSearchCheckbox';
						break;

					case 's':
						searchTypeCheckboxId = 'sourceSearchCheckbox';
						break;

					case 't':
						searchTypeCheckboxId = 'textSearchCheckbox';
						break;

					default:
						break;
				}

				// toggle the element
				if (searchTypeCheckboxId) {
					document.getElementById(searchTypeCheckboxId).click();

				}

				// Make sure the mode timeout is not reseting toggled modes pressed in quick succession
				clearTimeout(this.modeTimeout);
				this.mode = '';
				event.stopPropagation();
				// event.preventDefault();
				return;
				break;




			/*
				CCCCCCCCC
			*/
			case 'c':
				let newContentEdge;
				console.log('NEW CHILD')

				let tableString;

				switch (event.key) {
					case 'c':
						tableString = 'Code'
						break;
					case 'f':
						tableString = 'File'
						break;
					case 's':
						tableString = 'Source'
						break;
					case 't':
						tableString = 'Text'
						break;

					default:
						console.log('no valid child table. Returning.');
						return;
						break;
				}

				newContentEdge = await dbis.ContentEdge_InsertAdjacentToUuidIntoTable(
					contentObject.Uuid,
					1,
					tableString,
					'',
					0,
					'/'
				);

				if (event.key === 's') {
					dbis.Review_InsertScheduleOnUuid(newContentEdge.content.Uuid, '')
				}

				if (targetingMainContentObject) {
					this.app.mainContent.source.sourceContent.shardList.insertContentEdge(newContentEdge);
				}
				if (targetingMainContentReview) {
					this.app.mainContent.source.sourceContent.reviewList.insertContentEdge(newContentEdge);
				}

				// Make sure the mode timeout is not reseting toggled modes pressed in quick succession
				clearTimeout(this.modeTimeout);
				this.mode = '';
				event.stopPropagation();
				// event.preventDefault();
				return;
				break;


			/*
				VVVVVVVVVVV
			*/
			case 'v':
				let newContentEdge_v;
				console.log('NEW ADJACENT')

				let tableString_v;

				switch (event.key) {
					case 'c':
						tableString_v = 'Code'
						break;
					case 'f':
						tableString_v = 'File'
						break;
					case 'r':
						tableString_v = 'Review'
						break;
					case 's':
						tableString_v = 'Source'
						break;
					case 't':
						tableString_v = 'Text'
						break;

					default:
						console.log('no valid table selected. Returning.');
						return;
						break;
				}

				newContentEdge_v = await dbis.ContentEdge_InsertAdjacentToUuidIntoTable(
					contentObject.Uuid,
					0,
					tableString_v,
					'',
					0,
					'/'
				);

				if (event.key === 's') {
					await dbis.Review_InsertScheduleOnUuid(newContentEdge_v.content.Uuid, '')
				}
				if (event.key === 'r') {
					newContentEdge_v.content.NodeToReviewUuid = contentObject.Uuid;
					newContentEdge_v.content.ReviewDate = (new Date(Date.now() + 86_400_400).toISOString().substring(0, 10));
					await dbis.Content_UpdateWithContentObject(newContentEdge_v.content);
				}

				// Make sure the mode timeout is not reseting toggled modes pressed in quick succession
				clearTimeout(this.modeTimeout);
				this.mode = '';
				event.stopPropagation();
				// event.preventDefault();
				return;
				break;





			/*
				GGGGGGG
			*/
			case 'g':

				switch (event.key) {

					case 'h':
						this.app.mainOverlay.mainMenu.homeBtn.click();
						break;

					case 'w': // NEW WINDOW 
					case 't': // NEW TAB
						if (contentObject !== undefined) {

							// window.open(`/${contentObject.Table.toLowerCase()}/${contentObject.Uuid}/`, '_blank');
							window.open(`/source/${contentObject.Uuid}/`, '_blank'); // all objects will for now be loaded as 'source'


						}
						else {
							console.log(`No contentObject detected. Can't go. `)
						}
						break;

					case 'g': // default loading
						if (contentObject !== undefined) {

							if(contentObject.Table === "File"){
								history.pushState(null, `${contentObject.Title.toLowerCase()}`, `/${contentObject.Table.toLowerCase()}/${contentObject.Type.toLowerCase()}/${contentObject.Uuid}/`); // all objects will for now be loaded as 'source'
							}
							else{
								
								history.pushState(null, `${contentObject.Title.toLowerCase()}`, `/${contentObject.Table.toLowerCase()}/${contentObject.Uuid}/`); // all objects will for now be loaded as 'source'
							}
							
							maincontent.loadFromUrl();
						
						}
						else {
							console.log(`No contentObject detected. Can't go. `)
						}
						break;

					case 'c': // GO CONTENT
						// console.log("GO :", event.target)
						// let contentObject = event.target.contentObject;
						// console.log('typeof contentObject: ', contentObject)
						if (contentObject !== undefined) {

							console.log("contentObject.Table = ", contentObject.Table)
							
							if(contentObject.Table === "Source"){
								// history.pushState(null, `${contentObject.Title.toLowerCase()}`, `/${contentObject.Table.toLowerCase()}/${contentObject.Uuid}/`);
								history.pushState(null, `${contentObject.Title.toLowerCase()}`, `/source/${contentObject.Uuid}/`); // all objects will for now be loaded as 'source'

							}
							if (contentObject.Table === "Review") {
								// history.pushState(null, `${contentObject.Title.toLowerCase()}`, `/${contentObject.Table.toLowerCase()}/${contentObject.Uuid}/`);
								history.pushState(null, `${contentObject.Title.toLowerCase()}`, `/review/${contentObject.Uuid}/`); // all objects will for now be loaded as 'source'

							}


							// this.app.mainContent.loadFromUrl();
							maincontent.loadFromUrl();
							// this.app.reloadApp();

							// console.log('GOGOGOGOGOGOGOGO')
							// switch (contentObject.Table) {
							// 	case 'Source':
							// 		this.app.mainContent.loadSourceFromUuid(contentObject.Uuid);
							// 		break;

							// 	default:
							// 		break;
							// }


						}
						else {
							console.log(`No contentObject detected. Can't go. `)
						}
						break;

					case 'r':
						// console.log(event.target)

						if (contentObject && contentObject.Table === 'Review') {

							let reviewObject = contentObject;
							
							// only for correct title - 2024-09-23
							let objectToReview = await dbis.Content_SelectOnUuid(reviewObject.NodeToReviewUuid);

							history.pushState(null, `Review : ${objectToReview.Title.toLowerCase()}`, `/${reviewObject.Table.toLowerCase()}/${reviewObject.Uuid}/`);

							// console.log('LOAD CONTENT TO REVIEW INTO MAIN')


							// await this.app.mainContent.loadFromUrl();
							maincontent.loadFromUrl();

							// await this.app.reloadApp();


							// let reviewChildren = await dbis.ContentEdge_SelectChildOfUuid(contentObject.Uuid);
							// reviewChildren.sort((a, b) => {
							// 	// sort by edge age
							// 	let aUuid = a.edge.Uuid;
							// 	let bUuid = b.edge.Uuid;
							// 	if (parseInt(aUuid) < parseInt(bUuid)) { return -1; }
							// 	if (parseInt(aUuid) > parseInt(bUuid)) { return 1; }
							// 	return 0;
							// })

							// this.app.mainContent.source.sourceContent.reviewList.load(reviewChildren);

							// // SET REVIEW IN TOOLBAR
							// document.getElementById('mainContentReview').contentObject = contentObject;
							// document.getElementById('mainContentReview').dataset.uuid = contentObject.Uuid;
							// document.getElementById('mainContentReview').update();

							// // Show review panel
							// document.getElementById('sourceToolbar_reviewPanel').classList.remove('selected');
							// document.getElementById('sourceToolbar_reviewPanel').click();

							// // CLOSE REVIEW MENU
							// document.getElementById('mainMenuReview').classList.add('selected');
							// document.getElementById('mainMenuReview').click();


						}
						else{
							console.warn("Can't load a non-review object as review.")
						}
						break;

					default:
						console.log("Ran an unused shortcut =  g + " + event.key)
						break;
				}
				// Make sure the mode timeout is not reseting toggled modes pressed in quick succession
				clearTimeout(this.modeTimeout);
				this.mode = '';
				event.stopPropagation();
				// event.preventDefault();
				return;
				break;



			/*
				FFFFFFF
			*/
			// TODO : HANDLE THESE FOCUS SHORTCUTS AS MAIN CONTENT AGNOSTIC
			case 'f':

				switch (event.key) {

					case '1':
						document.getElementById('mainMenuState').classList.remove('selected');
						document.getElementById('mainMenuState').click();
						this.app.mainOverlay.state.element_1.focus();
						break;
					case '2':
						document.getElementById('mainMenuState').classList.remove('selected');
						document.getElementById('mainMenuState').click();
						this.app.mainOverlay.state.element_2.focus();
						break;
					case '3':
						document.getElementById('mainMenuState').classList.remove('selected');
						document.getElementById('mainMenuState').click();
						this.app.mainOverlay.state.element_3.focus();
						break;


					case 'p':
						document.getElementById('mainMenuProject').classList.remove('selected');
						document.getElementById('mainMenuProject').click();
						this.app.mainOverlay.project.projectTitleElement.focus();
						break;
					case 'r':
						document.getElementById('mainMenuReview').classList.remove('selected');
						document.getElementById('mainMenuReview').click();
						this.app.mainOverlay.review.tableBody.firstElementChild.focus();
						break;



					// CURRENT SOURCE
					case 'y':
						document.getElementById('mainContentTitle').focus();
						break;
					case 'u':
						document.getElementById('hideShardcontentCheckbox').focus();
						break;
					case 'h':
						// document.getElementById('sourceToolbar_shardPanel').click();
						document.getElementById('sourceToolbar_shardPanel').classList.remove('selected');
						document.getElementById('sourceToolbar_shardPanel').click();
						this.focusFirstDescendant(document.getElementById('shardlistContainer'));//document.getElementById('shardlistContainer').focus();
						break;



					case 'o':
						document.getElementById('toolbar_completeReview').focus();
						break;
					case 'i':
						document.getElementById('mainContentReview').focus();
						break;
					case 'k':
						document.getElementById('sourceToolbar_reviewPanel').classList.remove('selected');
						document.getElementById('sourceToolbar_reviewPanel').click();
						this.focusFirstDescendant(document.getElementById('reviewlistContainer'));
						// document.getElementById('reviewlistContainer').focus();
						// this.focusFirstDescendant(document.getElementById('reviewlistContainer'));
						break;


					// case 'u':
					// 	document.getElementById('sourceToolbar_filePanel').classList.remove('selected');
					// 	document.getElementById('sourceToolbar_filePanel').click();
					// 	document.getElementById('filePanelContainer').focus();
					// 	break;




					case '[':

						elem = document.getElementById('sourceToolbar_sidePanel');
						elem.classList.remove('selected');
						elem.click();
						this.focusFirstDescendant(document.getElementById('sourceParentContainer'));
						break;
					case ']':
						elem = document.getElementById('sourceToolbar_sidePanel');
						elem.classList.remove('selected');
						elem.click();
						this.focusFirstDescendant(document.getElementById('sourceFileContainer'));
						break;
					case '\'':
						elem = document.getElementById('sourceToolbar_sidePanel');
						elem.classList.remove('selected');
						elem.click();
						this.focusFirstDescendant(document.getElementById('sourceReviewContainer'));
						break;
					case '\\':
						elem = document.getElementById('sourceToolbar_sidePanel');
						elem.classList.remove('selected');
						elem.click();
						this.focusFirstDescendant(document.getElementById('sourceConnectedContainer'));
						break;

					default:
						break;
				}
				// Make sure the mode timeout is not reseting toggled modes pressed in quick succession
				clearTimeout(this.modeTimeout);
				this.mode = '';
				event.stopPropagation();
				// event.preventDefault();
				return;
				break;

			/* 
				TTTTTTT
			*/
			case 't':

				switch (event.key) {

					case 'f':
						document.getElementById('mainMenuSearch').click()
						this.app.mainOverlay.search.input.element.focus()
						event.preventDefault()
						break;
					case 'p':
						this.app.mainOverlay.mainMenu.projectBtn.click();
						break;
					case 'r':
						console.log('RRRRRRRRR')
						document.getElementById('mainMenuReview').click();
						this.app.mainOverlay.review.tableBody.firstElementChild.focus();
						break;
					case 's':
						this.app.mainOverlay.mainMenu.stateBtn.click();
						break;



					// case 'u':
					// 	document.getElementById('sourceToolbar_filePanel').click();
					// 	break;
					case 'y':
					case 'h':
						document.getElementById('sourceToolbar_shardPanel').click();
						break;

					case 'i':
					case 'k':
						document.getElementById('sourceToolbar_reviewPanel').click();
						break;


					case '=':
						document.getElementById('sourceToolbar_sidePanel').click();
						break;

					// case '[':
					// 	document.getElementById('sourceToolbar_parentList').click();
					// 	break;
					// case ']':
					// 	document.getElementById('sourceToolbar_fileList').click();
					// 	break;
					// case '\'':
					// 	document.getElementById('sourceToolbar_reviewList').click();
					// 	break;
					// case '\\':
					// 	document.getElementById('sourceToolbar_connectedList').click();
					// 	break;

					default:
						console.log('not triggered')

						break;
				}
				// clearTimeout(this.modeTimeout);
				// Make sure the mode timeout is not reseting toggled modes pressed in quick succession
				clearTimeout(this.modeTimeout);
				this.mode = '';
				event.stopPropagation();
				// event.preventDefault();
				return;
				break;



			default:
				break;
		}







		switch (event.keyCode) {


			/* 
				NUMBER SHORTCUTS (rule of thmumbs, exceptions exist)
			
				shift + alt : focus
				shift 	 	: set state
				alt			: add new
				#			: connect
			
				project		: 0
				state 1		: 1, 4, 7
				state 2		: 2, 5, 8
				state 3		: 3, 6, 9
			
			*/


			// key=0, 00000000, state 0
			case 48:
				if (event.altKey) {
					console.log('NEW PROJECT and focus');
					let newProjectObject = await dbis.Content_InsertOnTable('Project');
					this.app.mainOverlay.project.updateCurrentProjectOnUuid(newProjectObject.Uuid);
					document.getElementById('mainOverlay_projectTitle').focus();
				}
				else if (event.shiftKey) {

					if (event.target.contentObject && event.target.contentObject.Table == 'Project') {
						this.app.mainOverlay.project.updateCurrentProjectOnUuid(event.target.contentObject.Uuid);
					}
				}
				break;



			// key=1 , 11111111, state 1
			case 49:
				if (event.shiftKey) {
					event.target.contentObject ? this.app.mainOverlay.state.setState1(event.target.contentObject) : 0;
					localStorage.setItem('state1Uuid', `${event.target.contentObject.Uuid}`);
				}
				else if (event.altKey) {
					console.log('new child to slot 1 object')
				}
				else {
					if (event.target.contentObject && this.app.mainOverlay.state.element_1.contentObject) {
						this.app.contextOverlay.showContextMenu();
						this.app.contextOverlay.updateContextMenuWithConnect(
							event.target,
							this.app.mainOverlay.state.element_1.contentObject,
							event.target.contentObject,
							1
						);
						this.app.contextOverlay.connectMenu.path.focus();
					}
				}
				event.preventDefault();
				break;

			// key=2 , 222222, state 2
			case 50:
				if (event.shiftKey) {
					event.target.contentObject ? this.app.mainOverlay.state.setState2(event.target.contentObject) : 0;
					localStorage.setItem('state2Uuid', `${event.target.contentObject.Uuid}`);
				}
				else if (event.altKey) {
					console.log('new child to slot 2 object')
				}
				else {
					if (event.target.contentObject && this.app.mainOverlay.state.element_2.contentObject) {
						this.app.contextOverlay.showContextMenu();
						this.app.contextOverlay.updateContextMenuWithConnect(
							event.target,
							this.app.mainOverlay.state.element_2.contentObject,
							event.target.contentObject,
							1
						);
						this.app.contextOverlay.connectMenu.path.focus();
					}
				}
				event.preventDefault();
				break;

			// key=3 , 33333333, state 3
			case 51:
				if (event.shiftKey) {
					event.target.contentObject ? this.app.mainOverlay.state.setState3(event.target.contentObject) : 0;
					localStorage.setItem('state3Uuid', `${event.target.contentObject.Uuid}`);
				}
				else if (event.altKey) {
					console.log('new child to slot 3 object')
				}
				else {
					if (event.target.contentObject && this.app.mainOverlay.state.element_3.contentObject) {
						this.app.contextOverlay.showContextMenu();
						this.app.contextOverlay.updateContextMenuWithConnect(
							event.target,
							this.app.mainOverlay.state.element_3.contentObject,
							event.target.contentObject,
							1
						);
						this.app.contextOverlay.connectMenu.path.focus();
					}
				}
				event.preventDefault();
				break;



			// key=4 , 4444444, state 1
			case 52:
				if (event.target.contentObject && this.app.mainOverlay.state.element_1.contentObject) {
					this.app.contextOverlay.showContextMenu();
					this.app.contextOverlay.updateContextMenuWithConnect(
						event.target,
						this.app.mainOverlay.state.element_1.contentObject,
						event.target.contentObject,
						0
					);
					this.app.contextOverlay.connectMenu.path.focus();
					event.preventDefault();
				}
				break;
			// key=5 , 5555555, state 2
			case 53:
				if (event.target.contentObject && this.app.mainOverlay.state.element_2.contentObject) {
					this.app.contextOverlay.showContextMenu();
					this.app.contextOverlay.updateContextMenuWithConnect(
						event.target,
						this.app.mainOverlay.state.element_2.contentObject,
						event.target.contentObject,
						0
					);
					this.app.contextOverlay.connectMenu.path.focus();
					event.preventDefault();
				}
				break;
			// key=6 , 66666666, state 3
			case 54:
				// toggle mainContent toolbar
				if (event.shiftKey && event.ctrlKey) {
					document.getElementById('sourceToolbar_filePanel').click();
				}
				else if (event.target.contentObject && this.app.mainOverlay.state.element_3.contentObject) {
					this.app.contextOverlay.showContextMenu();
					this.app.contextOverlay.updateContextMenuWithConnect(
						event.target,
						this.app.mainOverlay.state.element_3.contentObject,
						event.target.contentObject,
						0
					);
					this.app.contextOverlay.connectMenu.path.focus();
					event.preventDefault();
				}
				break;




			// key=7 , 77777777, state 1
			case 55:
				if (event.target.contentObject && this.app.mainOverlay.state.element_1.contentObject) {
					this.app.contextOverlay.showContextMenu();
					this.app.contextOverlay.updateContextMenuWithConnect(
						event.target,
						event.target.contentObject,
						this.app.mainOverlay.state.element_1.contentObject,
						1
					);
					this.app.contextOverlay.connectMenu.path.focus();
					event.preventDefault();
				}
				break;
			// key=8 , 8888888, state 2
			case 56:
				if (event.target.contentObject && this.app.mainOverlay.state.element_2.contentObject) {
					this.app.contextOverlay.showContextMenu();
					this.app.contextOverlay.updateContextMenuWithConnect(
						event.target,
						event.target.contentObject,
						this.app.mainOverlay.state.element_2.contentObject,
						1
					);
					this.app.contextOverlay.connectMenu.path.focus();
					event.preventDefault();
				}
				break;
			// key=9 , 9999999, state 3
			case 57:
				if (event.target.contentObject && this.app.mainOverlay.state.element_3.contentObject) {
					this.app.contextOverlay.showContextMenu();
					this.app.contextOverlay.updateContextMenuWithConnect(
						event.target,
						event.target.contentObject,
						this.app.mainOverlay.state.element_3.contentObject,
						1
					);
					this.app.contextOverlay.connectMenu.path.focus();
					event.preventDefault();
				}
				break;



			default:
				break;
		}




		/* 
			CONTEXT MENUS AND BASIC NAVIGATION WITH RIGHT KEYBOARD HAND

		*/
		switch (event.key) {

			// THE SAME AS FOCUS SHORTCUTS, BUT ENABLE WITHOUT HAVING TO PRESS 'F' BEFORE
			case 'y':
				document.getElementById('mainContentTitle').focus();
				break;
			case 'h':
				document.getElementById('mainContentReview').focus();
				break;


			// CURRENLTY UNREACHABLE
			case 'c':
				if (event.target.contentObject && event.altKey) {
					this.app.contextOverlay.showContextMenu();
					this.app.contextOverlay.updateContextMenuWithNewAdjacent(event.target, 'child');
					this.app.contextOverlay.contextMenu.focus();
					// this.app.contextOverlay.connectMenu.path.focus();
				}
				break;
			// case 'u':
			// 	if (event.target.contentObject && event.altKey) {
			// 		this.app.contextOverlay.showContextMenu();
			// 		this.app.contextOverlay.updateContextMenuWithNewAdjacent(event.target, 'undirected');
			// 		this.app.contextOverlay.contextMenu.focus();
			// 		// this.app.contextOverlay.connectMenu.path.focus();
			// 	}
			// 	break;



			// Attached edge context menu
			case 'i':
				if (event.target.edgeObject) {

					if (!this.app.contextOverlay.contextMenuIsOpen()) {
						this.app.contextOverlay.showContextMenu();
						this.app.contextOverlay.updateContextMenuWithEdgeElement(event.target)
					}
					else if (this.app.contextOverlay.getCurrentMenuClass() !== 'edge') {
						this.app.contextOverlay.updateContextMenuWithEdgeElement(event.target)
					}
					else {
						this.app.contextOverlay.hideContextMenu();
					}

				}
				else if (event.target.classList.contains('contextMenu')) {
					event.target.contentObjectElement.focus();
				}
				break;


			// focus context menu
			case 'm':
				let contextMenuIsOpen = this.app.contextOverlay.contextMenuIsOpen();

				if (event.target.contentObject && contextMenuIsOpen) {
					this.app.contextOverlay.contextMenu.focus();
				}
				else if (event.target.classList.contains('contextMenu')) {
					event.target.contentObjectElement.focus();
				}
				break;



			// Title context menu
			case 'u':
				if (event.target.contentObject) {

					if (!this.app.contextOverlay.contextMenuIsOpen()) {
						this.app.contextOverlay.showContextMenu();
						this.app.contextOverlay.updateContextMenuWithTitleElement(event.target)
					}
					else if (this.app.contextOverlay.getCurrentMenuClass() !== 'title') {
						this.app.contextOverlay.updateContextMenuWithTitleElement(event.target)
					}
					else {
						this.app.contextOverlay.hideContextMenu();
					}
					event.preventDefault()
				}
				else if (event.target.classList.contains('contextMenu')) {
					event.target.contentObjectElement.focus();
				}
				break;

			// Content Card context menu
			case 'o':
				if (event.target.contentObject) {

					if (!this.app.contextOverlay.contextMenuIsOpen()) {
						this.app.contextOverlay.showContextMenu();
						this.app.contextOverlay.updateContextMenuWithContentCardElement(event.target)
					}
					else if (this.app.contextOverlay.getCurrentMenuClass() !== 'contentCard') {
						this.app.contextOverlay.updateContextMenuWithContentCardElement(event.target)
					}
					else {
						this.app.contextOverlay.hideContextMenu();
					}
					event.preventDefault()
				}
				else if (event.target.classList.contains('contextMenu')) {
					event.target.contentObjectElement.focus();
				}
				break;



			// Attached ContentObject Properties menu
			case 'p':
				if (event.target.contentObject) {

					if (!this.app.contextOverlay.contextMenuIsOpen()) {
						this.app.contextOverlay.showContextMenu();
						this.app.contextOverlay.updateContextMenuWithContentElement(event.target)
					}
					else if (this.app.contextOverlay.getCurrentMenuClass() !== 'content') {
						this.app.contextOverlay.updateContextMenuWithContentElement(event.target)
					}
					else {
						this.app.contextOverlay.hideContextMenu();
					}

				}
				else if (event.target.classList.contains('contextMenu')) {
					event.target.contentObjectElement.focus();
				}
				break;




			// exit menus and navigate focusable elements
			case 'q':
			case 'Escape':
				// console.log('document.activeElement', document.activeElement)
				if (event.target.classList.contains('contextMenu')) {
					// console.log('TTTTTTTTTTTT', event.target.contentObjectElement)
					// console.log(event.target.contentObjectElement)
					event.target.contentObjectElement.focus();
				}
				else if (this.app.contextOverlay.contextMenuIsOpen()) {
					// this.app.contextOverlay.removeElementContexts();
					console.log('HIDEHIDE')
					this.app.contextOverlay.hideContextMenu();
				}
				else if (document.getElementById('mainMenuSearch').classList.contains('selected')) {

					// if (document.activeElement == document.getElementById('searchInput')) {
					// 	document.getElementById('search').focus()
					// }
					// else {
					document.getElementById('mainMenuSearch').click();
					// }
				}
				else if (document.getElementById('mainMenuReview').classList.contains('selected')) {
					document.getElementById('mainMenuReview').click();
				}
				else if (event.target.tabIndex == '0') {
					this.focusFirstFocusableAncestor(event.target);
				}
				break;







			case 'l':
			case 'Enter':
				if (event.target.tabIndex == '0') {
					this.focusFirstDescendant(event.target);
					event.preventDefault()
				}
				break;

			case 'h':
			case 'k':
			case 'ArrowLeft':
			case 'ArrowUp':
				if (event.target.tabIndex == '0') {
					this.focusPreviousSibling(event.target);
					event.preventDefault(); // prevent scrolling!
				}
				break;

			case 'l':
			case 'j':
			case 'ArrowRight':
			case 'ArrowDown':
				if (event.target.tabIndex == '0') {
					this.focusNextSibling(event.target);
					event.preventDefault(); // prevent scrolling!
				}
				break;

			default:
				break;
		}

		return actionObject;
	}


	// NEW, *TRUE* CONTEXT MENU
	clickedInsideTrueContextMenu(ctxMenuEventTarget) {
		let element = ctxMenuEventTarget;
		let parent = null;

		if (element.id === "trueContextMenu")
			return true;

		// look through direct line of anscestors
		let maxDepth = 100;
		for (let i = 0; i < maxDepth; i++) {
			parent = element.parentElement;

			if (parent.id === "trueContextMenu")
				return true;

			if (parent.tagName === "HTML")
				return false;

			element = parent;
		}

		return false;
	}


	async contextMenuEvent(ctxMenuEvent){
		// Trigger contextmenu using ctrl key! - 2024-10-19
		if (!ctxMenuEvent.ctrlKey) 
			return;
		ctxMenuEvent.preventDefault();

		// Forces browser to require shift for context menu
		// if (ctxMenuEvent.shiftKey) // necessary for Chrome
		// 	return;
		// ctxMenuEvent.preventDefault();


		let trueContextMenu = document.getElementById("trueContextMenu");


		/* 
			DISPLAY LOGIC - CONTEXT MENU
		*/
		// If menu is hidden, show it
		if (trueContextMenu.classList.contains("hide")){
			trueContextMenu.style.left = ctxMenuEvent.pageX + "px";
			trueContextMenu.style.top = ctxMenuEvent.pageY + "px";
			trueContextMenu.classList.remove("hide");

			/*
				CONTEXT MENU POPULATING
			*/
			let clickedContentObjectElement = this.getContentObject(ctxMenuEvent.target)
			if (clickedContentObjectElement != null){
				trueContextMenu.clickedContentObject = clickedContentObjectElement.contentObject
				trueContextMenu.clickedEdgeObject = clickedContentObjectElement.edgeObject;
				trueContextMenu.populate("ContentObject");
			}
			else{
				trueContextMenu.populate("Base");
				trueContextMenu.clickedContentObject = null;
			}

			// trueContextMenu.classList.contains("hide") ? trueContextMenu.classList.remove("hide") : trueContextMenu.classList.add("hide");
		}
		// if we right click inside context menu, do nothing
		else if (this.clickedInsideTrueContextMenu(ctxMenuEvent.target)){

			// If I want a right click to trigger 'a regular click'
			// https://stackoverflow.com/questions/6157929/how-to-simulate-a-mouse-click-using-javascript
			// let evt = new MouseEvent("click", {
			// 	view: window,
			// 	target: event.target,
			// 	bubbles: true,
			// 	cancelable: true,
			// });
			// event.target.dispatchEvent(evt);

			return;
		}
		// If right clicking outside when shown, hide it
		else {
			// trueContextMenu.classList.contains("hide") ? trueContextMenu.classList.remove("hide") : trueContextMenu.classList.add("hide");
			trueContextMenu.classList.add("hide");
			return;
		}


		/* 
			CONTEXT POPULATING WHEN SHOWN
		*/

		// trueContextMenu.printHello();

		// if (this.getContentObject(event.target) != null)
		// 	trueContextMenu.populate("ContentObject");
		// else
		// 	trueContextMenu.populate("Base");


		// // if (!trueContextMenu.classList.contains("hide")){

		// // }

		// // CONTENT OBJECT CONTEXT MENU
		// let contentObject = this.getContentObject(event.target);
		// if (contentObject != null) {
			
		// }


		
		// if (this.clickedInsideTrueContextMenu(event.target)){
		// 	// if we right click inside context menu, do nothing

		// 	// If I want a right click to trigger 'a regular click'
		// 	// https://stackoverflow.com/questions/6157929/how-to-simulate-a-mouse-click-using-javascript
		// 	// let evt = new MouseEvent("click", {
		// 	// 	view: window,
		// 	// 	target: event.target,
		// 	// 	bubbles: true,
		// 	// 	cancelable: true,
		// 	// });
		// 	// event.target.dispatchEvent(evt);

		// 	return;
		// }
		// else if ( ! trueContextMenu.classList.contains("hide") ){
		// 	// clicked outside menu, but displaying menu
		// 	trueContextMenu.classList.contains("hide") ? trueContextMenu.classList.remove("hide") : trueContextMenu.classList.add("hide");
		// }
		// else{
		// 	// 
		// 	console.log("OUTSIDE WHEN HIDDEN - RIGHT CLICK")
		// 	// trueContextMenu.style.left = event.pageX + "px";
		// 	// trueContextMenu.style.top = event.pageY + "px";
		// 	// trueContextMenu.classList.contains("hide") ? trueContextMenu.classList.remove("hide") : trueContextMenu.classList.add("hide");
		// }


		// IF CLICKED INSIDE A CONTENT OBJECT - GRAB IT
		// let contentObject = this.getContentObject(event.target);
		// if (contentObject != null) {
		// 	// console.log("CLICKED CONTENT OBJECT !")
		// 	// console.log("contentObject.id = ", contentObject.id)
			
		// 	// console.log("CONTENT OBJECT CONTEXT MENU")

		// 	// let trueContextMenu = event.target;

			

		// 	// console.log("pageX = ", event.pageX)
		// 	// trueContextMenu.style.left = event.pageX + "px";
		// 	// trueContextMenu.classList.contains("hide") ? trueContextMenu.classList.remove("hide") : trueContextMenu.classList.add("hide");
		// }

		// event.stopPropagation();

		
	}


	/**
	 * 	After a confirmed click inside context menu, this method will handle implmenting behavior.
	 * 
	 * @param {*} clickEvent 
	 */
	async handleContextMenuClick(clickEvent){
		// console.log("HANDLING CONTEXT CLICK!")

		if(clickEvent.target.id == "context-1"){
			maincontent.clearMainContent();
		}
		else if (clickEvent.target.id == "context-2")
			maincontent.loadHome();
		else if (clickEvent.target.id == "context-3")
			maincontent.loadScroll();
		else if (clickEvent.target.id == "context-4")
			maincontent.loadPdf(439389356032);

		else if (clickEvent.target.id == "context-source")
			maincontent.loadSource(document.getElementById("trueContextMenu").clickedContentObject.Uuid);

	}


	async click(event) {
		// this.app.getLeftPanelId()
		// console.log('click: ', event.target);
		// console.log('activeElement on click', document.activeElement);
		// console.log('clic event.target: ', event.target)
		// console.log(this)
		// return {
		// 	action: 'clickAction',
		// 	event: event.target
		// };

		// console.log("CLICKKLICK")


		// CLOSE TRUE CONTEXT MENU
		if ( ! this.clickedInsideTrueContextMenu(event.target) ){
			let trueContextMenu = document.getElementById("trueContextMenu");

			trueContextMenu.classList.contains("hide") ? true : trueContextMenu.classList.add("hide");

			// prevent other page action when 'closing' context menu
			// DOESN"T WORK BECAUSE 'CLICK' IS TRIGGERED ON 'MOUSE UP', THUS FAILING TO STOP 'MOUSE DOWN' EVENTS!
			// event.preventDefault();
			// event.stopPropagation();
			// return;
		}
		else {
			// CLICKED INSIDE TRUE CONTEXT MENU
			this.handleContextMenuClick(event);
		}

		// console.log("event.ctrlKey in global click ? ", event.ctrlKey)

		// console.log("event.button.value = ", event.button.value)
		
		// IF CLICKED INSIDE A CONTENT OBJECT - GRAB IT
		let contentObject = this.getContentObject(event.target);
		if(contentObject != null){
			// console.log("CLICKED CONTENT OBJECT !")
			// console.log("contentObject.id = ", contentObject.id)
			
		}
		else{
			// console.log("NOT CONTENT OBJECT")
		}

		// if (this.isContentObject(event.target)){
		// 	console.log("CLICKED CONTENT OBJECT ! ! ! !")

		// }
		// this.isDescentantOfContentObject(event);
		
		// console.log('click : event.target.id = ', event.target.id)


		
		// if (event.target.hasOwnProperty('contentCard'))
		// 	console.log('CONTENT CARD CLICKED')

		// if (event.target.hasOwnProperty('contentObject'))
		// 	console.log('event.target.contentObject.Uuid = ', event.target.contentObject.Uuid)
		// if(event.target.contentObject.Uuid)


		switch (event.target.id) {
			case 'mainMenuHome':
				// console.log('HOME SWEET HOME')
				history.pushState(null, `Sources Home`, `/`); // all objects will for now be loaded as 'source'

				// this.app.mainContent.loadFromUrl();
				maincontent.loadFromUrl();
				// this.app.reloadApp();

				break;
			case 'mainMenuState':
				this.app.mainOverlay.mainMenu.toggleBtnOnId(event.target.id);
				this.app.mainOverlay.toggleContainersFromSelectedMainMenuButtons();
				break;
			case 'mainMenuProject':
				this.app.mainOverlay.mainMenu.toggleBtnOnId(event.target.id);
				this.app.mainOverlay.toggleContainersFromSelectedMainMenuButtons();
				break;
			case 'mainMenuSearch':
				this.app.mainOverlay.mainMenu.toggleBtnOnId(event.target.id);
				this.app.mainOverlay.toggleContainersFromSelectedMainMenuButtons();
				// setting changed does NOT trigger the 'change' event! Therefore set checked to opposite of desired before synthetic click.
				// this.app.mainOverlay.search.settings.reviewCheckbox.checked = true;
				// this.app.mainOverlay.search.settings.reviewCheckbox.click();
				break;
			case 'mainMenuReview':
				// if (event.target.classList.contains('selected')) {
				// 	await this.app.mainOverlay.review.fetch();
				// }

				this.app.mainOverlay.mainMenu.toggleBtnOnId(event.target.id);

				this.app.mainOverlay.toggleContainersFromSelectedMainMenuButtons();

				// setting changed does NOT trigger the 'change' event! Therefore set checked to opposite of desired before synthetic click.
				// this.app.mainOverlay.search.settings.reviewCheckbox.checked = false;
				// this.app.mainOverlay.search.settings.reviewCheckbox.click();
				break;
			default:
				break;
		}

		localStorage.setItem('stateSelected', document.getElementById('mainMenuState').classList.contains('selected') ? '1' : '0');
		localStorage.setItem('projectSelected', document.getElementById('mainMenuProject').classList.contains('selected') ? '1' : '0');

		// const value1 = localStorage.getItem('key1');
	}


	createConnectMenu() {

	}


	
	/**
	 * Returns then object or the first of its anscestors that is a content-object.
	 * returns 'null' if there is no match.
	 * @param {Element} elem 
	 */
	getContentObject(elem){
		
		// If element is content object!
		if (elem.hasOwnProperty("contentObject")) {
			return elem;
		}

		// Returns the ascestor, or null if there is no match
		return this.getDescendantContentObject(elem);

	}

	

	getParentElement(element) {
		return element.parentElement;
	}

	getDescendantContentObject(_element) {
		// console.log('click : event.target.tagName = ', _element.tagName);

		let maxDepth = 100;
		let elem = _element;

		// while(1){
		// Prevent infinite loops at faulty logic...
		for (let i = 0; i < maxDepth; i++) {
			let parent = this.getParentElement(elem);

			if (parent.hasOwnProperty("contentObject")) {
				// console.log("HAS CONTENT OBJECT ANSCETOR");
				return parent;
			}

			// console.log(`anscestor depth ${i}:`)
			// console.log(parent.tagName)

			// None found after reaching document root
			if (parent.tagName === "HTML") {
				// console.log("NO CONTENT OBJECT ANSCETOR FOUND");
				return null;
			}


			elem = parent;
		}

		// If not found after maxDepth...
		return null;

	}



	focusFirstFocusableAncestor(eventTarget) {

		let currentelement = eventTarget;
		while (currentelement.parentElement) {


			// console.log(currentelement, currentelement.tabIndex)
			if (currentelement.parentElement.tabIndex == 0) {
				currentelement.parentElement.focus();
				break;
			}

			currentelement = currentelement.parentElement;
		}

	}

	focusFirstDescendant(eventTarget) {

		let ancestor = eventTarget.getElementsByTagName('*');
		for (let descendant of ancestor) {
			// console.log(descendant)
			if (descendant.tabIndex == '0') {
				descendant.focus();
				break;
			}
		}

	}

	focusPreviousSibling(eventTarget) {

		if (eventTarget.previousElementSibling) {
			eventTarget.previousElementSibling.focus()
		}
	}

	focusNextSibling(eventTarget) {

		if (eventTarget.nextElementSibling) {
			eventTarget.nextElementSibling.focus()
		}
	}

	// Child element, not any node
	hasChild(element) {
		if (element.firstElementChild === null)
			return false;
		else
			return true;
	}

}


export {
	GlobalEventHandler,
}