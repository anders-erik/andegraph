
console.clear()

// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea/set
// TypeError: can't access property "local", browser.storage is undefined
// --> Had to add "storage" to manifest.json!
browser.storage.local.set(test = {test_key: "test_value"}).then(() =>{
	browser.storage.local.get(test).then(obj => { console.log(obj) }, error => { console.error(error) })
})
 


// DEV : MAKE SURE THAT THE EXTENSION IS TURNED ON ON REALOD!
browser.tabs.query({ active: true, currentWindow: true })
	.then((_tabs) => {

		let _activeTabId = _tabs[0].id;
 
		console.log('Toggle current tab!  id:', _activeTabId);
		
		// Make sure the message is recieved to toggle the extension!
		// 200ms ~ 50/50
		// 300ms ~ 100/0
		setTimeout(() => {
			sendToggleExtensionMessageToTabId(_activeTabId)
		}, 400);
	})


	


// EXTENSION COMMANDS
browser.commands.onCommand.addListener((command) => {

	if (command === "active") {

		browser.tabs.query({ active: true, currentWindow: true })
			.then((tabs) => {

				let activeTabId = tabs[0].id;

				console.log('Toggle current tab!  id:', activeTabId);

				sendToggleExtensionMessageToTabId(activeTabId)
			})

	}
});


function sendToggleExtensionMessageToTabId(tabId) {
	
	browser.tabs.sendMessage(tabId, {
		name: 'toggleExtension'
	});

}


