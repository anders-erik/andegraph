


let extensionStateFront = {
	active: false,
	capturing: false,
	current_tabId: 0,
	current_tabUrl: '',
	current_tabTitle: '',
	current_projectUuid: 0,
	current_projectObject: {},
	current_sourceUuid: 0,
	current_sourceObject: {},
	current_sourceChildNodes: [],
}



function writeToState(propertiesToWriteObject) {

	// let entries = Object.entries(propertiesToWriteObject)
	// let data = entries.map(([key, val] = entry) => {
	// 	// return `The ${key} is ${val}`;
	// 	console.log(`The ${key} is ${val}`)
	// });

	Object.keys(propertiesToWriteObject).forEach(key => {
		console.log(key, ':', propertiesToWriteObject[key]);

	});

	console.log(extensionStateFront)

}
// writeToState({ active: 'true' });


// createOverlay();

// getCurrentState();

// browser.runtime.sendMessage({
// 	name: "requestBackStateOnFrontLoaded",
// });


// initProject();


// function updateFrontOnState() {

// }
console.log("Reload. ")
browser.runtime.sendMessage({
	name: "requestBackStateOnFrontLoaded",
});


document.addEventListener("focus", function () {
	console.log("Page in focus")
	browser.runtime.sendMessage({
		name: "requestBackStateOnFrontLoaded",
	});

})



// initProject();
// initProject();



// hideOverlay();
// showOverlay()


// setInterval(() => {
// 	console.log(document.activeElement)
// }, 1000);

