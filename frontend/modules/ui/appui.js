
import * as auxcontent from "./auxpanel.js";
import { LeftMenu } from "./LeftMenu.js";

let leftMenu;

let leftMenuConElement;


let mainContentElement;
let contextOverlayElement;
let mainOverlayElement;


/** 
 * @param {HTMLElement} appcontainer
 */
export function init(appcontainer){

	appcontainer.innerHTML = appuiHtml;

	leftMenuConElement = appcontainer.querySelector("#left-menu-con");
	leftMenu = new LeftMenu(leftMenuConElement);
	
	auxcontent.init();


	//
	mainContentElement = appcontainer.querySelector("#main-content");
	contextOverlayElement = appcontainer.querySelector("#context-overlay");
	mainOverlayElement = appcontainer.querySelector("#main-overlay");
	
	console.log(`contextOverlayElement = `, contextOverlayElement)
}

/** 
 * Global function that will update all app elements that depend on the particular content bject
 * 
 */
export function contentObjectUpdated(contentObject){

}



const appuiHtml = `
<div id="app" class="appstyle">

	<div id="left-menu-con" class=""></div>

	<div id="aux-content-con"></div>

	<div id="main-content-con" ></div>

	<div id="context-overlay-con"></div>

	<div id="main-overlay-con"></div>

</div>
`;

