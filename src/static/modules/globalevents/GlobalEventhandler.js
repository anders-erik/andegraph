

class GlobalEventHandler {

	app;
	appElement;

	actions = [
		'chooseProject',
		'chooseSelection',
		'propertiesContext',
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
		let actionObject = {
			action: '',
			element: event.target,
		}
		console.log('keyup: ', event.target);
		// console.log(this)
		// let rr;
		if (event.target.contentEditable == 'true' || event.target.type == 'text') {
			console.log('CONTENT EDITABLE. NO SHORTCUT ACTION TAKEN')
			return;
		}

		// console.log(event.key)
		switch (event.key) {

			case 'o':
				actionObject.action = 'o';
				break;

			case 'k':
			case 'ArrowUp':
				if (event.target.tabIndex == '0') {
					this.focusFirstFocusableAncestor(event.target);
				}
				break;

			case 'j':
			case 'ArrowDown':
				if (event.target.tabIndex == '0') {
					this.focusFirstDescendant(event.target);
				}
				break;

			case 'h':
			case 'ArrowLeft':
				if (event.target.tabIndex == '0') {
					this.focusPreviousSibling(event.target);
				}
				break;

			case 'l':
			case 'ArrowRight':
				if (event.target.tabIndex == '0') {
					this.focusNextSibling(event.target)
				}
				break;

			default:
				break;
		}

		return actionObject;
	}


	click(event) {
		// this.app.getLeftPanelId()
		console.log('click: ', event.target);
		// console.log(this)
		return {
			action: 'clickAction',
			event: event.target
		};
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