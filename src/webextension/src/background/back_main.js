console.clear()



// EXTENSION VARIABLES / STATE

let extensionState = {
	active: true,
	capturing: false,
	current_tabId: 0,
	current_tabUrl: '',
	current_tabTitle: '',
	// current_projectUuid: 0,
	current_projectObject: {},
	current_projectSearchObjects: [],
	current_projectChildNodeEdges: [],
	// current_sourceUuid: 0,
	current_sourceObject: {},
	current_sourceChildNodeEdges: [],
	projectSearchActive: false,
	projectSearchString: '',
	textConcatenationCapturing: false,
	textConcatenationContent: '',
}


// set current tab info on load
writeCurrentTabToState();





// browser.tabs.sendMessage(extensionState.current_tabId, {
// 	name: 'currentState',
// 	state: extensionState
// });

// browser.tabs.get(id.tabId)
// 	.then((tabObject) => {
// 		// console.log(tabObject.url)
// 		extensionState.current_url = tabObject.url;
// 		// notifyContentScriptOfStateChange();
// 	})




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





