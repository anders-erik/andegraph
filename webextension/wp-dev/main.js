import * as fetcher from "./fetcher";
import * as overlay from "./overlay";

let extensionStateFront = {};
extensionStateFront.active = false;

browser.runtime.onMessage.addListener((message) => {
	// console.log('evevev')

	if(extensionStateFront.active)
		stop();
	else
		start();


});

function init(){
	overlay.initOverlay();
}
init();

async function start() {
	console.log("START");
	extensionStateFront.active = true;
	
	// console.log(await fetcher.fetchHtml("overlay.html"))
	
	overlay.showOverlay();
}

function stop(){
	console.log("STOP");
	extensionStateFront.active = false;
	overlay.hideOverlay();
}





