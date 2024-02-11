console.clear()



// EXTENSION VARIABLES / STATE

let extensionState = {
	capturing: false,
	current_tabId: 0,
	current_url: '',
	current_projectUuid: 0,
	current_projectObject: {},
	current_sourceUuid: 0,
	current_sourceObject: {},
	current_sourceChildNodes: [],
}


let current_tabId = 0;

let current_url = '';

let current_projectUuid = 0;
let current_projectObject = {};

let current_sourceUuid = 0;
let current_sourceObject = {};

let current_sourceChildNodes = [];



// EXTENSION COMMANDS
browser.commands.onCommand.addListener((command) => {
	if (command === "activate_extension") {
		browser.browserAction.openPopup();
		// Add your extension activation logic here
	}
	if (command === "capture") {

		if (extensionState.capturing) {
			console.log('stop capture')
			extensionState.capturing = false;
		}
		else {
			console.log('start capture')
			extensionState.capturing = true;
		}

	}
});


function notifyContentScriptOfStateChange() {

	browser.tabs.sendMessage(current_tabId, {
		messageName: 'newState',
		newState: extensionState
	});

}


// moved to a different tab
browser.tabs.onActivated.addListener((id, change, tab) => {

	current_tabId = id.tabId;
	console.log('tabs.onActivated, switched to tabId : ', id.tabId)
	// browser.tabs.get(currentTabId)

	browser.tabs.get(id.tabId)
		.then((tabObject) => {
			// console.log(tabObject.url)
			extensionState.current_url = tabObject.url;
			notifyContentScriptOfStateChange();
		})



});

// change of content in tab
browser.tabs.onUpdated.addListener((id, change, tab) => {

	console.log('tabs.onUpdated, updated tab where tabId = ', id)
	browser.tabs.get(id)
		.then((tabObject) => {

			// Prevent the onUpdate call-spam during state change
			if (extensionState.current_url !== tabObject.url) {

				extensionState.current_url = tabObject.url;
				notifyContentScriptOfStateChange();
			}

		})

});


// console.log('background')

// browser.tabs.create({url: "popup/choose_beast.html"})
// browser.action.openPopup({url: "popup/choose_beast.html"})
// browser.windows.create({
//   url: browser.runtime.getURL("popup/choose_beast.html"),
//   type: "popup",
//   top: 0,
//   left: 0,
//   width: 400,
//   height: 600,
// });



// extension environment
// console.log('background this: ', this)



// window.clipboardData.getData('Text')

// navigator.clipboard
// 		.readText()
// 		.then(
// 			(clipText) => (console.log(clipText)),
// 		);

async function getClipboardContents() {
	const clipboardItems = await navigator.clipboard.read();

	// console.log('OOOOOOOOOOOOOOOOO', clipboardItems[0].types)

	// console.log(22222222)
	for (const clipboardItem of clipboardItems) {

		// console.log(33333333)
		// const blob = await clipboardItem.getType(clipboardItem);
		// console.log(clipboardItem.types[0])

		for (const type of clipboardItem.types) {

			// console.log(444444)
			const blob = await clipboardItem.getType(type);
			// we can now use blob here
			console.log('BLOB : ', blob)
			// console.log(555555)
		}
	}
}


browser.runtime.onMessage.addListener((message) => {
	console.log('asdfasdfasdfasdfasdasfdsafdfasdfasfdasdfasdfasdfasdfs')

	if (message.command == 'shiftshift') {
		//console.log('""""""""""""""""')
	}

	if (message.command == 'copycopy') {
		console.log('""""""""""""""""')
		// getClipboardContents();
		browser.tabs.sendMessage(current_tabId, {
			asa: "ev"
		});
	}

});




















// DOESNT WORK
document.addEventListener('keypress', (keyEvent) => {
	console.log('shift')
	if (keyEvent.key == 'Shift') {
		console.log('shift')
	}
});

