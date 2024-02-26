


class GlobalEventHandler {

	app;
	appElement;

	listeningSecondShift = false;
	listeningSecondCtrlShift = false;

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
			setTimeout(() => { this.listeningSecondShift = false }, 300)

		}
	}



	async keydown(event) {

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

		switch (event.key) {


			case '/':
				document.getElementById('mainMenuReview').click();
				this.app.mainOverlay.review.tableBody.firstElementChild.focus();
				break;
			case '?':
				document.getElementById('mainMenuSearch').click()
				this.app.mainOverlay.search.input.element.focus()
				event.preventDefault()
				break;





			case '$':
				break;
			case '%':
				break;
			case '^':
				break;
			case '&':
				break;
			case '*':
				break;
			case '(':
				break;



			case '1':
				if (event.altKey) {
					console.log('new child to slot 1 object')
				}
				else {
					console.log('connect new child of slot 1 object')
				}
				break;
			// Shift + 1
			case '!':
				// Ctrl + Shift + 1
				if (event.ctrlKey) {
					if (!this.app.mainOverlay.mainMenu.stateBtn.classList.contains('selected')) {
						this.app.mainOverlay.mainMenu.stateBtn.click();
					}
					this.app.mainOverlay.state.element_1.focus()
				}
				// Shift + 1
				else {
					event.target.contentObject ? this.app.mainOverlay.state.setState1(event.target.contentObject) : 0;
				}
				break;


			case '2':
				console.log('trying to connect to state 2')
				break;
			// Shift + 2
			case '@':
				// Ctrl + Shift + 2
				if (event.ctrlKey) {
					if (!this.app.mainOverlay.mainMenu.stateBtn.classList.contains('selected')) {
						this.app.mainOverlay.mainMenu.stateBtn.click();
					}
					this.app.mainOverlay.state.element_2.focus()
				}
				// Shift + 2
				else {
					event.target.contentObject ? this.app.mainOverlay.state.setState2(event.target.contentObject) : 0;
				}
				break;


			case '3':
				console.log('trying to connect to state 3')
				break;
			// Shift + 3
			case '#':
				// Ctrl + Shift + 3
				if (event.ctrlKey) {
					if (!this.app.mainOverlay.mainMenu.stateBtn.classList.contains('selected')) {
						this.app.mainOverlay.mainMenu.stateBtn.click();
					}
					this.app.mainOverlay.state.element_3.focus()
				}
				// Shift + 3
				else {
					event.target.contentObject ? this.app.mainOverlay.state.setState3(event.target.contentObject) : 0;
				}
				break;

			case '4':
				if (event.altKey) {
					console.log('new undirected to slot 1 object')
				}
				else {
					console.log('connect new undirected to slot 1 object')
				}
				break;
			case '5':
				break;
			case '6':
				break;
			case '7':
				if (event.altKey) {
					console.log('new parent to slot 1 object')
				}
				else {
					console.log('connect new parent to slot 1 object')
				}
				break;
			case '8':
				break;
			case '9':
				break;

			case '0':
				if (event.altKey) {
					console.log('NEW PROJECT and focus');
				}
				else {
					this.app.mainOverlay.mainMenu.projectBtn.click();
				}
				break;
			case ')':
				// Ctrl + Shift + 0
				if (event.ctrlKey) {
					if (!this.app.mainOverlay.mainMenu.projectBtn.classList.contains('selected')) {
						this.app.mainOverlay.mainMenu.projectBtn.click();
					}
					this.app.mainOverlay.project.projectTitleElement.focus()
				}
				// Shift + 0
				else {

					if (event.target.contentObject && event.target.contentObject.Table == 'Project') {
						this.app.mainOverlay.project.updateCurrentProjectOnUuid(event.target.contentObject.Uuid);
					}
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


			case 's':
				this.app.mainOverlay.mainMenu.stateBtn.click();

				// if (!this.app.mainOverlay.mainMenu.stateBtn.classList.contains('selected')) {
				// 	this.app.mainOverlay.mainMenu.stateBtn.click();
				// }
				// this.app.mainOverlay.state.element_1.focus();
				break;


			case 'q':
			case 'Escape':
				if (event.target.classList.contains('contextMenu')) {
					// console.log('TTTTTTTTTTTT', event.target.contentObjectElement)
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