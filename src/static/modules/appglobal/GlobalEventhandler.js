



class GlobalEventHandler {

	app;
	appElement;

	listeningSecondShift = false;
	listeningSecondCtrlShift = false;

	mode = '';
	modeTimeout;

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


	keyup(event) {

		if (event.key === 'Shift') {

			this.listeningSecondShift = true;
			setTimeout(() => { this.listeningSecondShift = false }, 100)

		}


	}



	async keydown(event) {
		// console.log(event.keyCode)

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

				document.getElementById('mainMenuSearch').click();

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

		// console.log(this)
		if (this.mode === '') {

			switch (event.key) {
				case 't':
					console.log('TOGGLE STATE')
					this.mode = 't';
					// Make sure the mode timeout is not reseting toggled modes pressed in quick succession
					clearTimeout(this.modeTimeout);
					this.modeTimeout = setTimeout(() => { this.mode = '' }, 1000);
					return;
					break;

				case 'f':
					// console.log('TOGGLE STATE')
					this.mode = 'f';
					// Make sure the mode timeout is not reseting toggled modes pressed in quick succession
					clearTimeout(this.modeTimeout);
					setTimeout(() => { this.mode = '' }, 1000);
					return;
					break;

				case 'g':
					// console.log('TOGGLE STATE')
					this.mode = 'g';
					// Make sure the mode timeout is not reseting toggled modes pressed in quick succession
					clearTimeout(this.modeTimeout);
					setTimeout(() => { this.mode = '' }, 1000);
					return;
					break;

				default:
					break;
			}

		}

		console.log(this.mode)

		let elem;
		switch (this.mode) {



			/*
				GGGGGGG
			*/
			case 'g':

				switch (event.key) {

					case 'c':
					case 't': // NEW TAB
					case 'w': // NEW WINDOW 
						// console.log("GO :", event.target)
						let contentObject = event.target.contentObject;
						// console.log('typeof contentObject: ', contentObject)
						if (contentObject !== undefined) {

							history.pushState(null, `${contentObject.Table.toLowerCase()}`, `/${contentObject.Table.toLowerCase()}/${contentObject.Uuid}/`);

							this.app.mainContent.loadFromUrl();

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
						console.log('LOAD CONTENT TO REVIEW INTO MAIN')
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
				FFFFFFF
			*/
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
						document.getElementById('sourceToolbarTitle').focus();
						break;
					case 'u':
						document.getElementById('sourceToolbar_filePanel').classList.remove('selected');
						document.getElementById('sourceToolbar_filePanel').click();
						document.getElementById('filePanelContainer').focus();
						break;
					case 'i':
						// document.getElementById('sourceToolbar_shardPanel').click();
						document.getElementById('sourceToolbar_shardPanel').classList.remove('selected');
						document.getElementById('sourceToolbar_shardPanel').click();
						document.getElementById('shardlistContainer').focus();
						break;
					case 'o':
						document.getElementById('sourceToolbar_reviewPanel').classList.remove('selected');
						document.getElementById('sourceToolbar_reviewPanel').click();
						document.getElementById('reviewlistContainer').focus();
						break;
					case 'h':
						document.getElementById('sourceToolbar_reviewStatus').focus();
						break;


					case '[':
						elem = document.getElementById('sourceParentContainer');
						elem.classList.remove('selected');
						elem.click();
						this.focusFirstDescendant(elem);
						break;
					case ']':
						elem = document.getElementById('sourceFileContainer');
						elem.classList.remove('selected');
						elem.click();
						this.focusFirstDescendant(elem);
						break;
					case '\'':
						elem = document.getElementById('sourceReviewContainer');
						elem.classList.remove('selected');
						elem.click();
						this.focusFirstDescendant(elem);
						break;
					case '\\':
						elem = document.getElementById('sourceConnectedContainer');
						elem.classList.remove('selected');
						elem.click();
						this.focusFirstDescendant(elem);
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



					case 'u':
						document.getElementById('sourceToolbar_filePanel').click();
						break;
					case 'i':
						document.getElementById('sourceToolbar_shardPanel').click();
						break;
					case 'o':
						document.getElementById('sourceToolbar_reviewPanel').click();
						break;


					case '[':
						document.getElementById('sourceToolbar_parentList').click();
						break;
					case ']':
						document.getElementById('sourceToolbar_fileList').click();
						break;
					case '\'':
						document.getElementById('sourceToolbar_reviewList').click();
						break;
					case '\\':
						document.getElementById('sourceToolbar_childList').click();
						break;

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
				if (event.ctrlKey && event.shiftKey) {
					if (!this.app.mainOverlay.mainMenu.projectBtn.classList.contains('selected')) {
						this.app.mainOverlay.mainMenu.projectBtn.click();
					}
					this.app.mainOverlay.project.projectTitleElement.focus()
				}
				else if (event.altKey) {
					console.log('NEW PROJECT and focus');
				}
				else if (event.shiftKey) {

					if (event.target.contentObject && event.target.contentObject.Table == 'Project') {
						this.app.mainOverlay.project.updateCurrentProjectOnUuid(event.target.contentObject.Uuid);
					}
				}
				break;



			// key=1 , 11111111, state 1
			case 49:
				if (event.ctrlKey && event.shiftKey) {
					if (!this.app.mainOverlay.mainMenu.stateBtn.classList.contains('selected')) {
						this.app.mainOverlay.mainMenu.stateBtn.click();
					}
					this.app.mainOverlay.state.element_1.focus()
				}
				else if (event.shiftKey) {
					event.target.contentObject ? this.app.mainOverlay.state.setState1(event.target.contentObject) : 0;
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
				if (event.ctrlKey && event.shiftKey) {
					if (!this.app.mainOverlay.mainMenu.stateBtn.classList.contains('selected')) {
						this.app.mainOverlay.mainMenu.stateBtn.click();
					}
					this.app.mainOverlay.state.element_2.focus()
				}
				else if (event.shiftKey) {
					event.target.contentObject ? this.app.mainOverlay.state.setState2(event.target.contentObject) : 0;
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
				if (event.ctrlKey && event.shiftKey) {
					if (!this.app.mainOverlay.mainMenu.stateBtn.classList.contains('selected')) {
						this.app.mainOverlay.mainMenu.stateBtn.click();
					}
					this.app.mainOverlay.state.element_3.focus()
				}
				else if (event.shiftKey) {
					event.target.contentObject ? this.app.mainOverlay.state.setState3(event.target.contentObject) : 0;
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
				// toggle mainContent toolbar
				if (event.shiftKey && event.ctrlKey) {
					document.getElementById('sourceToolbar_shardPanel').click();
				}
				else if (event.target.contentObject && this.app.mainOverlay.state.element_1.contentObject) {
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
				// toggle mainContent toolbar
				if (event.shiftKey && event.ctrlKey) {
					document.getElementById('sourceToolbar_reviewPanel').click();
				}
				else if (event.target.contentObject && this.app.mainOverlay.state.element_2.contentObject) {
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



		switch (event.key) {






			case 'c':
				if (event.target.contentObject && event.altKey) {
					this.app.contextOverlay.showContextMenu();
					this.app.contextOverlay.updateContextMenuWithNewAdjacent(event.target, 'child');
					this.app.contextOverlay.contextMenu.focus();
					// this.app.contextOverlay.connectMenu.path.focus();
				}
				break;



			case 'g':
				if (event.target.contentObject) {
					console.log('GO TO CONTENT')
				}
				break;
			case 'h':
				// console.log('HOME SWEET HOME')
				this.app.mainOverlay.mainMenu.homeBtn.click();
				break;

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

			// context menu focus
			case 'm':
				let contextMenuIsOpen = this.app.contextOverlay.contextMenuIsOpen();

				if (event.target.contentObject && contextMenuIsOpen) {
					this.app.contextOverlay.contextMenu.focus();
				}
				else if (event.target.classList.contains('contextMenu')) {
					event.target.contentObjectElement.focus();
				}
				break;


			case 'n':
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

			case 'r':
				if (event.target.contentObject.Table == 'Review') {
					console.log('GO TO LINKED CONTENT FOR REVIEW')
				}
				break;


			// content context menu toggle
			case 'o':
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





			case 'q':
			case 'Escape':
				if (event.target.classList.contains('contextMenu')) {
					// console.log('TTTTTTTTTTTT', event.target.contentObjectElement)
					console.log(event.target.contentObjectElement)
					event.target.contentObjectElement.focus();
				}
				else if (this.app.contextOverlay.contextMenuIsOpen()) {
					// this.app.contextOverlay.removeElementContexts();
					this.app.contextOverlay.hideContextMenu();
				}
				else if (document.getElementById('mainMenuSearch').classList.contains('selected')) {
					document.getElementById('mainMenuSearch').click();
				}
				else if (event.target.tabIndex == '0') {
					this.focusFirstFocusableAncestor(event.target);
				}
				break;



			case 'u':
				if (event.target.contentObject && event.altKey) {
					this.app.contextOverlay.showContextMenu();
					this.app.contextOverlay.updateContextMenuWithNewAdjacent(event.target, 'undirected');
					this.app.contextOverlay.contextMenu.focus();
					// this.app.contextOverlay.connectMenu.path.focus();
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


	click(event) {
		// this.app.getLeftPanelId()
		// console.log('click: ', event.target);
		// console.log('activeElement on click', document.activeElement);
		// console.log('clic event.target: ', event.target)
		// console.log(this)
		// return {
		// 	action: 'clickAction',
		// 	event: event.target
		// };

		switch (event.target.id) {
			case 'mainMenuHome':
				console.log('HOME SWEET HOME')
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
				this.app.mainOverlay.mainMenu.toggleBtnOnId(event.target.id);
				this.app.mainOverlay.toggleContainersFromSelectedMainMenuButtons();
				// setting changed does NOT trigger the 'change' event! Therefore set checked to opposite of desired before synthetic click.
				// this.app.mainOverlay.search.settings.reviewCheckbox.checked = false;
				// this.app.mainOverlay.search.settings.reviewCheckbox.click();
				break;
			default:
				break;
		}

	}


	createConnectMenu() {

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