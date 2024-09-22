import { dbis } from "../../dbi-send/dbi-send.js";

export class Home {
	mainContentContainer;

	homeContainer;


	constructor(mainContentContainer) {

		this.mainContentContainer = mainContentContainer;




	}

	async load(contentObject) {
		this.mainContentContainer.innerHTML = '';

		this.homeContainer = document.createElement('div');
		this.homeContainer.id = 'homeContainer';
		this.homeContainer.innerHTML = this.homeInnerHtml;

		this.mainContentContainer.append(this.homeContainer);



	}


	homeInnerHtml = `

<div id="homeContent">

	<a href="/scroll">Scroll</a>
	<p>b</p>
	<p>c</p>

</div>

	`;

}