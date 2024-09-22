import { dbis } from "../dbi-send/dbi-send.js";
import { Home } from "./home/Home.js";
import { loadPdfReader } from "./pdfreader/PdfReader.js";
import { Scroll } from "./scroll/Scroll.js";
import { Source } from "./source/Source.js";

import * as pdfreader from "pdfreader";
import * as review from "review";

/* 
	LETS STOP USING THESE AWFUL CLASSES?OBJECT FOR A LITTLE BIT
*/

async function loadFromUrl(){
	console.log('LOADING FROM URL STAND ALONG FUNCTION!');

	let urlState = new URL(window.location.href)
	// console.table(urlState)
	let pathArray = urlState.pathname.split('/');
	pathArray.pop();
	pathArray.shift();
	console.log(pathArray)
	
	if (pathArray.length === 0) {
		loadHome()
	}
	else if (pathArray[0] === 'scroll') {
		loadScroll()
	}
	else if (pathArray[0] === 'source') {
		loadSource(pathArray[1]);
	}
	else if (pathArray[0] === 'pdf') {
		loadPdf(pathArray[1]);
	}
	else if (pathArray[0] === 'review') {
		loadReview(pathArray[1]);
	}

}

async function loadHome(){
	// console.log("LOADING HOME")

	// clear current main cuontent
	clearMainContent();
	let _mainContent = document.getElementById("mainContentContainer");
	

	let _home = new Home(_mainContent);
	_home.load();

	// cleanup
	_home = null;
	_mainContent = null;
}

async function loadScroll() {
	// console.log("LOADING SCROLL")

	// clear current main cuontent
	clearMainContent();
	let _mainContent = document.getElementById("mainContentContainer");


	let _scroll = new Scroll(_mainContent);
	_scroll.load();

	// cleanup
	_scroll = null;
	_mainContent = null;
}


async function loadSource(Uuid) {
	// console.log("LOADING SCROLL")

	// clear current main cuontent
	clearMainContent();
	let _mainContent = document.getElementById("mainContentContainer");


	let _source = new Source(_mainContent);

	let contentObject = await dbis.Content_SelectOnUuid(Uuid);
	_source.load(contentObject);


	// cleanup
	_source = null;
	_mainContent = null;
}

async function loadReview(Uuid) {
	// console.log("LOADING SCROLL")

	// clear current main cuontent
	clearMainContent();
	let _mainContent = document.getElementById("mainContentContainer");


	review.createReview(Uuid);

	// let contentObject = await dbis.Content_SelectOnUuid(Uuid);
	// _source.load(contentObject);


	// cleanup
	// _source = null;
	_mainContent = null;
}

async function loadPdf(Uuid) {

	clearMainContent();
	let _mainContent = document.getElementById("mainContentContainer");

	pdfreader.loadPdfReader(Uuid);

	


	// cleanup
	// _mainContent = null;
}


function clearMainContent(){
	console.log("CLEARING MAIN CONTENT")

	let _mainContent = document.getElementById("mainContentContainer");
	_mainContent.innerHTML = "";
	_mainContent = null;
}

export {
	loadFromUrl,
	loadHome,
	loadScroll,
	loadSource,
	loadPdf,
	clearMainContent
}




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

		// console.log(pathArray)

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
		else if (pathArray[0] === 'pdf') {
			await loadPdfReader(pathArray[1]);
		}
		else if (pathArray[0] === 'review'){
			loadFromUrl();
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