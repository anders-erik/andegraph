



// SEND MESSAGES

function notifyContentScriptOfStateChange() {

	browser.tabs.sendMessage(extensionState.current_tabId, {
		name: 'newState',
		state: extensionState
	});

}


function sendStateToContentScript() {

	browser.tabs.sendMessage(extensionState.current_tabId, {
		name: 'currentState',
		state: extensionState
	});

}

function sendStartExtensionMessage() {

	browser.tabs.sendMessage(extensionState.current_tabId, {
		name: 'startExtension'
	});

}

function sendStopExtensionMessage() {

	browser.tabs.sendMessage(extensionState.current_tabId, {
		name: 'stopExtension'
	})

}





// LISTEN FOR MESSAGES
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

	if (message.name == 'getState') {
		//sendStateToContentScript();
		console.log(extensionState);
	}

});





















