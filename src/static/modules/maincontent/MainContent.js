import { dbis } from "../dbi-send/dbi-send.js";
import { Home } from "./home/Home.js";
import { Scroll } from "./scroll/Scroll.js";
import { Source } from "./source/Source.js";



export class MainContent {

	element;
	mainToolbar;
	mainSidepanel;
	mainContentContent;

	home;
	scroll;
	source;

	constructor(parentElement) {

		this.element = document.createElement('div');
		this.element.id = 'mainContentContainer';
		this.element.textContent = ''
		parentElement.append(this.element);




		this.home = new Home(this.element);
		this.scroll = new Scroll(this.element);
		// this.source = new Source(this.element, this.mainContentContent, this.mainToolbar, this.mainSidepanel);

		// this.source.loadSourceFromUuid(372);

		// this.loadSourceFromUuid(372);
	}

	// Make sure that we FULLY RELOAD app, not just parts of it
	async loadFromUrl() {
		this.element.innerHTML = "";
		let urlState = new URL(window.location.href)
		// console.table(urlState)
		let pathArray = urlState.pathname.split('/');
		pathArray.pop();
		pathArray.shift();
		console.log(pathArray)

		console.log(pathArray)

		if (pathArray.length === 0) {
			// console.log('HOM<EOHEOMEOEN')
			this.home.load();
		}
		else if (pathArray[0] === 'scroll') {
			await this.scroll.load();
		}
		else if (pathArray[0] === 'source') {
			await this.loadSourceFromUuid(pathArray[1]);
		}
	}

	loadFromContentObject(contentObject) {

	}

	async loadSourceFromUuid(Uuid) {
		// history.pushState(null, 'source', `http://localhost:3000/source/${Uuid}`);

		console.log(this.mainContentContent)
		console.log(this.mainToolbar)

		let contentObject = await dbis.Content_SelectOnUuid(Uuid);
		this.source = new Source(this.element);
		await this.source.load(contentObject)
	}

}