

class GlobalEventHandler {

	app;
	appElement;

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




	keydown(event) {
		let actionObject = {
			action: '',
			element: event.target,
		}
		// console.log('keyup: ', event.target);
		// console.log(this)
		// let rr;
		if (event.target.contentEditable == 'true' || event.target.type == 'text') {
			console.log('TEXT INPUT ELEMENT')
			if (event.key == 'Escape') {
				if (event.target.type == 'text') {
					this.focusNextSibling(event.target);
				}
				else if (event.target.classList.contains('contextElement')) {
					this.focusFirstFocusableAncestor(event.target);
				}

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

		switch (event.key) {

			case '!':
				isContentObject ? this.app.mainOverlay.state.setState1(event.target.contentObject) : 0;
				break;
			case '@':
				isContentObject ? this.app.mainOverlay.state.setState2(event.target.contentObject) : 0;
				break;
			case '#':
				isContentObject ? this.app.mainOverlay.state.setState3(event.target.contentObject) : 0;
				break;

			case '1':
				if (event.altKey) {
					document.getElementById('mainMenuHome').click()
				}
				else {
					console.log('trying to connect')
				}
				break;
			case '2':
				if (event.altKey) {
					document.getElementById('mainMenuState').click()
				}
				else {
					console.log('trying to connect')
				}
				break;
			case '3':
				if (event.altKey) {
					document.getElementById('mainMenuProject').click()
				}
				else {
					console.log('trying to connect')
				}
				break;
			case '4':
				if (event.altKey) {
					document.getElementById('mainMenuSearch').click()
					// setting changed does NOT trigger the 'change' event! Therefore set checked to opposite of desired before synthetic click.
					// this.app.mainOverlay.search.settings.reviewCheckbox.checked = true;
					// this.app.mainOverlay.search.settings.reviewCheckbox.click();
				}
				break;
			case '5':
				if (event.altKey) {
					document.getElementById('mainMenuReview').click();

				}
				break;

			case 'G':
				if (event.target.contentObject) {
					console.log('GO TO CONTENT')
				}
				break;
			case 'H':
				console.log('HOME SWEET HOME')
				break;

			// context menu focus
			case 'm':
				contextMenuOpen = this.app.contextOverlay.contentMenu.active;

				if (event.target.contentObject) {
					if (contextMenuOpen) {
						this.app.contextOverlay.contentMenu.element.focus();
					}
				}
				else if (event.target.classList.contains('contextMenu')) {
					event.target.contentObjectElement.focus();
				}
				break;

			case 'R':
				if (event.target.contentObject.Table == 'Review') {
					console.log('GO TO LINKED CONTENT FOR REVIEW')
				}



			// content context menu toggle
			case 'o':
				if (event.target.contentObject) {
					this.app.contextOverlay.contentMenu.toggle(event.target);
					this.app.contextOverlay.updateElementContexts(event.target);
				}
				else if (event.target.classList.contains('contextMenu')) {
					event.target.contentObjectElement.focus();
				}
				break;




			case 'Escape':
				if (event.target.classList.contains('contextMenu')) {
					// console.log('TTTTTTTTTTTT', event.target.contentObjectElement)
					event.target.contentObjectElement.focus();
				}
				else if (this.app.contextOverlay.isDisplayingNodeContext()) {
					this.app.contextOverlay.removeElementContexts();
				}
				else if (event.target.tabIndex == '0') {
					this.focusFirstFocusableAncestor(event.target);
				}
				break;

			case 'Enter':
				if (event.target.tabIndex == '0') {
					this.focusFirstDescendant(event.target);
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
				this.app.mainOverlay.search.settings.reviewCheckbox.checked = true;
				this.app.mainOverlay.search.settings.reviewCheckbox.click();
				break;
			case 'mainMenuReview':
				this.app.mainOverlay.mainMenu.toggleBtnOnId(event.target.id);
				this.app.mainOverlay.toggleContainersFromSelectedMainMenuButtons();
				// setting changed does NOT trigger the 'change' event! Therefore set checked to opposite of desired before synthetic click.
				this.app.mainOverlay.search.settings.reviewCheckbox.checked = false;
				this.app.mainOverlay.search.settings.reviewCheckbox.click();
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