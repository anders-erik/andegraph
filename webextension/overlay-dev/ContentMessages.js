// OLD WEBEXTENSION!

// LISTEN FOR MESSAGES
browser.runtime.onMessage.addListener((message) => {
	// console.log('evevev')

	if (message.name === 'toggleExtension') {
		// startExtension();
		if (!extensionStateFront.active) {

			appendOverlay(); // from build.js

			initExtension();
			addExtensionActiveEventListener();

			extensionStateFront.active = true;

		}
		else {

			removeExtensionActiveEventListener();
			document.getElementById('ae-container').remove();

			extensionStateFront.active = false;

		}

	}


});





