

export class SourceToolbar {
	toolbarContainer;

	element;

	sourceLabel;

	sourceTitleElement;



	constructor(toolbarContainer) {
		this.toolbarContainer = toolbarContainer;

		this.element = document.createElement('div');
		this.element.id = 'sourceToolbar';
		// this.element.tabIndex = 0;
		this.element.innerHTML = this.sourceToolbarInnerHtml;

		this.element.addEventListener('keydown', this.keydownToolbar);

		// this.element.querySelector('#sourceToolbar_mainPanelsMenu').addEventListener('click', this.clickMainPanelsMenu);
		// this.element.querySelector('#sourceToolbar_sidepanelMenu').addEventListener('click', this.clickSidepanelMenu);

	}


	load(contentObject) {
		this.toolbarContainer.innerHTML = ``;
		this.toolbarContainer.append(this.element);

		document.getElementById('sourceToolbarTitle').textContent = contentObject.Title;
		document.getElementById('sourceToolbarTitle').contentObject = contentObject;

	}

	keydownToolbar(event) {
		console.log('AAAAAAAAAAAAA')
		console.log(event.target)
		// Send click on spacebar or enter
		if (event.key === ' ' || event.keyCode === 13) {
			event.target.click();
		}

		if (event.target.id === 'mainToolbarContainer') {
			console.log('19')
		}

	}





	sourceToolbarInnerHtml = `

<label>Source</label>

<div id="sourceToolbarTitle" tabindex=0>
	Source title
</div>

<div id="sourceToolbar_mainPanelsMenu">
	<div id="sourceToolbar_filePanel" class="button">sourcefile</div>
	<div id="sourceToolbar_shardPanel" class="button">shardlist</div>
	<div id="sourceToolbar_reviewPanel" class="button">reviewlist</div>
</div>

<div id="sourceToolbar_reviewStatus" tabindex=0>
	_2023-12-12_
</div>
	
<div id="sourceToolbar_sidepanelMenu">
	<div id="sourceToolbar_parentList" class="button">parents</div>
	<div id="sourceToolbar_fileList" class="button">files</div>
	<div id="sourceToolbar_reviewList" class="button">review</div>
	<div id="sourceToolbar_childList" class="button">children</div>
</div>
	`;

}