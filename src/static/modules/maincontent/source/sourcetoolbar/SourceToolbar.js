

export class SourceToolbar {
	toolbarContainer;

	element;

	sourceLabel;

	mainContentTitle;
	mainContentReview;

	hideShardcontentCheckbox;

	constructor(toolbarContainer) {
		this.toolbarContainer = toolbarContainer;

		this.element = document.createElement('div');
		this.element.id = 'sourceToolbar';
		// this.element.tabIndex = 0;
		this.element.innerHTML = this.sourceToolbarInnerHtml;

		// this.element.addEventListener('keydown', this.keydownToolbar);


		this.hideShardcontentCheckbox = this.element.querySelector('#hideShardcontentCheckbox');
		// console.log('hideShardcontentCheckbox', this.hideShardcontentCheckbox)
		this.hideShardcontentCheckbox.addEventListener('change', this.hideShardcontentCheckboxChange);



		// this.element.querySelector('#sourceToolbar_mainPanelsMenu').addEventListener('click', this.clickMainPanelsMenu);
		// this.element.querySelector('#sourceToolbar_sidepanelMenu').addEventListener('click', this.clickSidepanelMenu);

	}


	hideShardcontentCheckboxChange(event) {
		// console.log('CHCH')
		let isChecked = document.getElementById('hideShardcontentCheckbox').checked;

		localStorage.setItem('hideShardcontentCheckbox', isChecked ? '1' : '0');

		// toggle content card overlay immediately
		let shardList = document.getElementById('shardList');
		for (const contentCardOverlay of shardList.querySelectorAll('.contentCardOverlay')) {
			if (isChecked) {
				contentCardOverlay.classList.add('hidden');
			}
			else {
				contentCardOverlay.classList.remove('hidden');
			}
		}
	}


	load(contentObject) {
		this.toolbarContainer.innerHTML = ``;
		this.toolbarContainer.append(this.element);

		this.mainContentReview = document.getElementById('mainContentReview');
		this.mainContentReview.innerHTML = `-`;
		this.mainContentReview.classList.remove('completed');
		this.mainContentReview.classList.remove('notcompleted');

		this.mainContentReview.update = function () {
			this.innerHTML = `${this.contentObject.ReviewDate}`;
			if (this.contentObject.ReviewCompleted == 1) {
				this.classList.add('completed');
				this.classList.remove('notcompleted');
			}
			else {
				this.classList.remove('completed');
				this.classList.add('notcompleted');
			}
		}


		if (contentObject.Title === '') {
			document.getElementById('mainContentTitle').textContent = '-';
		}
		else {
			document.getElementById('mainContentTitle').textContent = contentObject.Title;
		}

		document.getElementById('mainContentTitle').contentObject = contentObject;


		let hideShardcontentCheckbox = localStorage.getItem('hideShardcontentCheckbox');
		// console.log('hideShardcontentCheckbox', hideShardcontentCheckbox)
		if (hideShardcontentCheckbox == '1') {
			this.hideShardcontentCheckbox.checked = true;
		}
		else {

		}


	}






	// keydownToolbar(event) {
	// 	console.log('AAAAAAAAAAAAA')
	// 	console.log(event.target)
	// 	// Send click on spacebar or enter
	// 	if (event.key === ' ' || event.keyCode === 13) {
	// 		event.target.click();
	// 	}

	// 	if (event.target.id === 'mainToolbarContainer') {
	// 		console.log('19')
	// 	}

	// }





	sourceToolbarInnerHtml = `

<label>Source</label>

<div id="mainContentTitle" tabindex=0>
	-
</div>

<input id="hideShardcontentCheckbox" type="checkbox" ></input>

<div id="mainContentReview" tabindex=0>
	-
</div>

<button id="toolbar_completeReview" class="button selected">Complete</button>

<div id="sourceToolbar_mainPanelsMenu">
	<div id="sourceToolbar_shardPanel" class="button selected">shardlist</div>
	<div id="sourceToolbar_reviewPanel" class="button">reviewlist</div>
</div>

	
<div id="sourceToolbar_sidePanel" class="button">Connections</div>

	`;

}