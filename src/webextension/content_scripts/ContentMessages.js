
// LISTEN FOR MESSAGES
browser.runtime.onMessage.addListener((message) => {
	console.log('evevev')

	if (message.name === 'startExtension') {
		startExtension();
	}
	if (message.name === 'stopExtension') {
		stopExtension();
	}

	if (message.name === 'newState') {
		console.log('STATE CHANGE')

	}

	if (message.name === 'currentState') {
		// console.log(message.state);
		updateFromCurrentState(message.state);
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


