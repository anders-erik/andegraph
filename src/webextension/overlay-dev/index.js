


let extensionStateFront = {
	active: false,
	capturing: false,
	current_tabId: 0,
	current_tabUrl: '',
	current_tabTitle: '',
	// current_projectUuid: 0,
	current_projectObject: {},
	current_projectSearchObjects: [],
	current_projectChildContentEdges: [],
	// current_sourceUuid: 0,
	current_sourceObject: {},
	current_sourceChildContentEdges: [],
	projectSearchActive: false,
	projectSearchString: '',
	textConcatenationCapturing: false,
	textConcatenationContent: '',
}


function initExtension() {

	console.log("initExtension()")


	initProject();
	initSource();
	initClipboard();


	if (extensionStateFront.active) {

		showOverlay();
		addExtensionActiveEventListener();

	}
	else {

		hideOverlay();
		removeExtensionActiveEventListener();

	}




}


// function writeToState(propertiesToWriteObject) {

// 	// let entries = Object.entries(propertiesToWriteObject)
// 	// let data = entries.map(([key, val] = entry) => {
// 	// 	// return `The ${key} is ${val}`;
// 	// 	console.log(`The ${key} is ${val}`)
// 	// });

// 	Object.keys(propertiesToWriteObject).forEach(key => {
// 		console.log(key, ':', propertiesToWriteObject[key]);

// 	});

// 	console.log(extensionStateFront)

// }
// writeToState({ active: 'true' });


// createOverlay();

// getCurrentState();

// browser.runtime.sendMessage({
// 	name: "requestBackStateOnFrontLoaded",
// });


// initProject();


// function updateFrontOnState() {

// }
console.log("index.js run.")
browser.runtime.sendMessage({
	name: "requestBackStateOnFrontLoaded",
});


document.addEventListener("focus", function () {
	console.log("Page in focus")
	browser.runtime.sendMessage({
		name: "requestBackStateOnFrontLoaded",
	});

})




function addExtensionActiveEventListener() {

	document.addEventListener('copy', copyEvent)
	document.addEventListener('cut', cutEvent)
	document.addEventListener('paste', pasteEvent)
	document.addEventListener('keydown', keydownActiveExtension)

	console.log('event listerners for active extension added')
}


function removeExtensionActiveEventListener() {

	document.removeEventListener('copy', copyEvent)
	document.removeEventListener('cut', cutEvent)
	document.removeEventListener('paste', pasteEvent)
	document.removeEventListener('keydown', keydownActiveExtension)

	console.log('event listerners for active extension removed')
}




// initProject();
// initProject();



// hideOverlay();
// showOverlay()


// setInterval(() => {
// 	console.log(document.activeElement)
// }, 1000);

