console.log('background')

// extension environment
console.log('background this: ', this)


browser.runtime.onMessage.addListener((message) => {
    console.log('asdfasdfasdfasdfasdasfdsafdfasdfasfdasdfasdfasdfasdfs')
  });



browser.commands.onCommand.addListener((command) => {
	if (command === "activate_extension") {
		
	  // Add your extension activation logic here
	}
});

  

// inject code on change
browser.tabs.onActivated.addListener((id, change, tab) => {

	console.log('tabs.onActivated, switched to tabId : ', id.tabId)

  browser.tabs.get(id.tabId)
    .then((tabObject) =>{
      console.log(tabObject.url)
    })

    //browser.tabs.query({ currentWindow: true }).then((tabs) => {console.log(tabs)})
    // inject js file called 'inject.js'
    // chrome.tabs.executeScript(id, {
    //     file: 'inject.js'
    // });
});



browser.tabs.onUpdated.addListener((id, change, tab) => {

	console.log('tabs.onUpdated, updated to : ', id)
    // inject js file called 'inject.js'
    // chrome.tabs.executeScript(id, {
    //     file: 'inject.js'
    // });
});







// DOESNT WORK
document.addEventListener('keypress', (keyEvent) => {
	console.log('shift')
	if(keyEvent.key == 'Shift'){
		console.log('shift')
	}
});

