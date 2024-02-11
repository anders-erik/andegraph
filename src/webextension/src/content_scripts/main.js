// Page sandbox environment for all tabs (on extension first load)
// console.log('eventlistener this: ', this)
createOverlay();
// console.log('|||||||||||||', overlayElement)
appendProjectElement()

let extensionStateCopy = {};

function startExtension() {
	console.log('EXTENSION STARTED');
	// document.body.style.border = 'solid green 3px';
	showOverlay();
	addExtensionActiveEventListener();
}


function stopExtension() {
	console.log('EXTENSION STOPPED');
	// document.body.style.border = '';
	hideOverlay();
	removeExtensionActiveEventListener();
}

function startCapture() {

}

function stopCapture() {

}



function updateFromCurrentState(stateObject) {
	if (!stateObject.active) {
		stopCapture();
		stopExtension();
	}
	else {



		// let overlayElement = document.getElementById('andegraph-overlay');
		// if (overlayElement != null) {
		// 	startExtension();
		// }


	}
}




// (async () => {
// 	const src = chrome.runtime.getURL("content_scripts/reach.js");
// 	const contentMain = await import(src);
// 	// console.log(contentMain);
// 	contentMain.main();
//   })();