


export class MainMenu {

	element;

	homeBtn;
	stateBtn;
	projectBtn;
	searchBtn;
	reviewBtn;

	constructor(parentElement) {
		this.element = document.createElement('div');
		this.element.id = 'MainMenu';
		parentElement.append(this.element)

		this.element.innerHTML = this.elementInnerHtml;

		this.homeBtn = this.element.querySelector('#mainMenuHome');
		this.stateBtn = this.element.querySelector('#mainMenuState');
		this.projectBtn = this.element.querySelector('#mainMenuProject');
		this.searchBtn = this.element.querySelector('#mainMenuSearch');
		this.reviewBtn = this.element.querySelector('#mainMenuReview');

	}

	getMainMenuState() {

	}

	toggleBtnOnId(elementId) {
		let btn = this.element.querySelector(`#${elementId}`)
		if (btn.classList.contains('selected')) {
			btn.classList.remove('selected');
		}
		else {
			btn.classList.add('selected');

			// Only one of search/review can be selected at any point in time
			if (elementId == 'mainMenuSearch') {
				this.element.querySelector(`#mainMenuReview`).classList.remove('selected')
			}
			else if (elementId == 'mainMenuReview') {
				this.element.querySelector(`#mainMenuSearch`).classList.remove('selected')
			}

		}


		return btn;
	}

	elementInnerHtml = `
	
<div id="mainMenuHome" class="mainMenuBtn">H</div>
<div id="mainMenuState" class="mainMenuBtn">S</div>
<div id="mainMenuProject" class="mainMenuBtn selected">P</div>
<div id="mainMenuSearch" class="mainMenuBtn">Q</div>
<div id="mainMenuReview" class="mainMenuBtn">R</div>


	`;

}