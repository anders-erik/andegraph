


// EXTENSION COMMANDS
browser.commands.onCommand.addListener((command) => {
	if (command === "activate_extension") {
		browser.browserAction.openPopup();
		// Add your extension activation logic here
	}
	if (command === "active") {

		if (extensionState.active) {
			console.log('stop extension')
			extensionState.active = false;
			sendStopExtensionMessage();
		}
		else {
			console.log('start extension')
			extensionState.active = true;
			sendStartExtensionMessage();
		}

	}
});



/*

// moved to a different tab
browser.tabs.onActivated.addListener((onActivatedObject) => {


	writeCurrentTabToState()
		.then((response) => {
			notifyContentScriptOfStateChange();
			sendStateToContentScript();

			if (extensionState.active == true) {
				sendStartExtensionMessage();
			}
			else {
				sendStopExtensionMessage();
			}

		})

});


// change of content in tab
browser.tabs.onUpdated.addListener((id, change, tab) => {
	// console.log('tab updated: ', id, change, tab)
	// console.log('tabs.onUpdated, updated tab where tabId = ', id)
	// extensionState.current_tabId = id.tabId;

	// console.log(id)
	// writeCurrentTabToState();
	// Prevent the onUpdate call-spam during state change

	// console.log(tab)
	if (tab.status === 'complete') {
		// console.log("UPDATE ON ")


		writeCurrentTabToState()
			.then((response) => {
				notifyContentScriptOfStateChange();

				if (extensionState.active == true) {
					sendStartExtensionMessage();
				}
				else {
					sendStopExtensionMessage();
				}
			})

	}
	else {
		// console.log('WAITING')
	}
	// if()




});

*/








// // DOESNT WORK
// document.addEventListener('keypress', (keyEvent) => {
// 	console.log('shift')
// 	if (keyEvent.key == 'Shift') {
// 		console.log('shift')
// 	}
// });
