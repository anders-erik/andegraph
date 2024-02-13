
// LISTEN FOR MESSAGES
browser.runtime.onMessage.addListener((message) => {
	// console.log('evevev')

	if (message.name === 'startExtension') {
		// startExtension();
		showOverlay();
		addExtensionActiveEventListener();
	}
	if (message.name === 'stopExtension') {
		// stopExtension();
		hideOverlay();
		removeExtensionActiveEventListener();
	}

	if (message.name === 'newState') {
		console.log('STATE CHANGE')
		extensionStateFront = message.state;
		console.log('new state', extensionStateFront)

		// initProject();

	}

	if (message.name === 'currentState') {
		// console.log(message.state);
		updateFromCurrentState(message.state);
	}

	if (message.name === 'backStateToFront') {
		console.log('State from back recieved')
		extensionStateFront = message.state;
		console.log('new state', extensionStateFront)

	}


	if (message.name === 'responseBackStateOnFrontLoaded') {
		console.log('State recieved from back on front load')

		extensionStateFront = message.state;
		// console.log('new state', extensionStateFront)

		initExtension();
		// initProject();
		// initSource();

		if (extensionStateFront.active) {
			showOverlay();
		}
		else {
			hideOverlay();
		}

	}




	if (message.asa == 'ev') {
		console.log('EVEVEVEV')
		//   getClipboardContents();
		getClipboardContents();
	}

});




// SEND MESSAGES

function sendShiftShift() {

	browser.runtime.sendMessage({
		command: "shiftshift"
	});

}

function getCurrentState() {

	browser.runtime.sendMessage({
		name: "getState",
	});

}

function writeStateFromFront() {

	browser.runtime.sendMessage({
		name: "writeStateFromFront",
		state: extensionStateFront,
	});

}


function requestBackStateOnLOad() {

	browser.runtime.sendMessage({
		name: "requestBackStateOnLOad",
	});

}



