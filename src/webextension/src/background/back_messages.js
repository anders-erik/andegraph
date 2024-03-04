


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
		console.log('sending state to front')
		sendStateToContentScript();
		// console.log(extensionState);
	}

	if (message.name == 'writeStateFromFront') {
		console.log('recieved state from front')
		// sendStateToContentScript();
		extensionState = message.state;
		console.log(message.state);

	}

	if (message.name == 'requestBackStateOnFrontLoaded') {
		console.log('requestBackStateOnFrontLoaded')
		writeCurrentTabToState().then(() => {
			responseBackStateOnFrontLoaded();
		})

	}



});






// SEND MESSAGES

function responseBackStateOnFrontLoaded() {

	browser.tabs.sendMessage(extensionState.current_tabId, {
		name: 'responseBackStateOnFrontLoaded',
		state: extensionState
	});

}

function notifyContentScriptOfStateChange() {

	browser.tabs.sendMessage(extensionState.current_tabId, {
		name: 'newState',
		state: extensionState
	});

}


function sendStateToContentScript() {

	browser.tabs.sendMessage(extensionState.current_tabId, {
		name: 'backStateToFront',
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























