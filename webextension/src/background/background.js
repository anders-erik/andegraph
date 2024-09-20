
console.clear()




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


