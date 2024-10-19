
import * as auxcontent from "./auxcontent.js";
import { LeftMenu } from "./LeftMenu.js";

let leftMenu;

let leftMenuElement;
let leftMenuToggleInnerElement;
/** @type {HTMLElement} */
let leftMenuToggleOuterElement;
let leftMenuHome;
let leftMenuState;
let leftMenuProject;
let leftMenuSearch;
let leftMenuReview;


let mainContentElement;
let contextOverlayElement;
let mainOverlayElement;


/** 
 * @param {HTMLElement} appcontainer
 */
export function init(appcontainer){
	
	appcontainer.innerHTML = appuiHtml;

	leftMenu = new LeftMenu();
	
	auxcontent.init();


	/** Left menu objects */
	leftMenuElement = appcontainer.querySelector("#left-menu");
	leftMenuToggleInnerElement = appcontainer.querySelector("#left-menu-toggle-inner");
	leftMenuToggleInnerElement.addEventListener("click", closeLeftMenu);
	leftMenuToggleOuterElement = appcontainer.querySelector("#left-menu-toggle-outer");
	leftMenuToggleOuterElement.addEventListener("click", openLeftMenu);

	leftMenuHome = appcontainer.querySelector("#left-menu-home");
	leftMenuState = appcontainer.querySelector("#left-menu-state");
	leftMenuProject = appcontainer.querySelector("#left-menu-project");
	leftMenuSearch = appcontainer.querySelector("#left-menu-search");
	leftMenuReview = appcontainer.querySelector("#left-menu-review");

	//
	mainContentElement = appcontainer.querySelector("#main-content");
	contextOverlayElement = appcontainer.querySelector("#context-overlay");
	mainOverlayElement = appcontainer.querySelector("#main-overlay");
	
	console.log(`contextOverlayElement = `, contextOverlayElement)
}

function openLeftMenu(clickEvent){
	leftMenuElement.style.width = "250px";
	// leftMenuToggleOuterElement.style.display = "none";
	leftMenuToggleOuterElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
	leftMenuToggleOuterElement.style.pointerEvents = "none";
}

function closeLeftMenu(clickEvent){
	leftMenuElement.style.width = "0px";
	// leftMenuToggleOuterElement.style.display = "block";
	leftMenuToggleOuterElement.style.backgroundColor = "rgba(128, 0, 124, 255)";
	leftMenuToggleOuterElement.style.pointerEvents = "all";
}
// function toggleLeftMenu(){
// 	toggleLeftMenu 
// }


const appuiHtml = `
<div id="app">
	<div id="left-menu-con">
	<div id="left-menu">
		<div id="left-menu-mouseover"></div>
		<div id="left-menu-toggle-inner"></div>

		<div id="left-menu-home" class="left-menu-item">Home</div>
		<div id="left-menu-project" class="left-menu-item">Project</div>
		<div id="left-menu-search" class="left-menu-item">Search</div>
		<div id="left-menu-review" class="left-menu-item">Review</div>
		<div id="left-menu-state" class="left-menu-item">State</div>
	</div>
	</div>
	<div id="left-menu-toggle-outer"></div>


	<div id="aux-content-con"></div>
	<div id="main-content-con"></div>
	<div id="context-overlay-con"></div>
	<div id="main-overlay-con"></div>
</div>
`;

