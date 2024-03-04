

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
		localStorage.setItem('hideShardcontentCheckbox', document.getElementById('hideShardcontentCheckbox').checked ? '1' : '0');
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

<div id="mainContentReview" tabindex=0>
	-
</div>

<input id="hideShardcontentCheckbox" type="checkbox" ></input>

<div id="sourceToolbar_mainPanelsMenu">
	<div id="sourceToolbar_filePanel" class="button">sourcefile</div>
	<div id="sourceToolbar_shardPanel" class="button selected">shardlist</div>
	<div id="sourceToolbar_reviewPanel" class="button">reviewlist</div>
</div>

	
<div id="sourceToolbar_sidepanelMenu">
	<div id="sourceToolbar_parentList" class="button">parents</div>
	<div id="sourceToolbar_fileList" class="button">files</div>
	<div id="sourceToolbar_reviewList" class="button">review</div>
	<div id="sourceToolbar_connectedList" class="button">connected</div>
</div>
	`;

}