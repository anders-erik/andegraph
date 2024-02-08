

// (async () => {
// 	const src = chrome.runtime.getURL("content_scripts/reach.js");
// 	const contentMain = await import(src);
// 	// console.log(contentMain);
// 	contentMain.main();
//   })();

reach();


// Page sandbox environment for all tabs (on extension first load)
console.log('eventlistener this: ', this)

const ran = Math.random();

// console.log('extext')

let waitingSecondShift = 0;


document.addEventListener('keydown', (keyEvent) => {
	// console.log('extext keykey')

	

	console.log(ran)

	if(waitingSecondShift == 1 && keyEvent.key == 'Shift'){
		console.log('shiftshift')
		waitingSecondShift = 0;
		showOverlay()

		browser.runtime.sendMessage( {
			command: "shiftshift"
		});
	}

	if(keyEvent.ctrlKey && keyEvent.key == ']'){
		fetchData('http://localhost:3000/api/v02/content/Node-SelectChildOfUuid?Uuid=372')
			.then(data => {
			console.log('Data:', data);
		});
	}


	switch (keyEvent.key) {

		case 'Shift':
			waitingSecondShift = 1;
			setTimeout(() => { waitingSecondShift = 0 }, 300);
			break;

		case 'Escape':
			hideOverlay()
			break;

		default:
			break;
	}


})



function fetchData(url) {
	return fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
		});
}




function showOverlay() {

	if (document.getElementById('andegraph-overlay') == null) {


		let overlayElement = document.createElement('div');
		overlayElement.id = 'andegraph-overlay';

		overlayElement.style.width = '100%';
		overlayElement.style.height = '100%';
		overlayElement.style.backgroundColor = 'rgb(0 ,0 ,0 , 0.2)';

		// below is done through trial and error on a few popular websites..
		overlayElement.style.top = '0px';
		overlayElement.style.left = '0px';
		overlayElement.style.position = 'fixed';
		overlayElement.style.zIndex = '100000000';

		document.body.appendChild(overlayElement);
		// document.body.insertBefore(overlayElement, document.body.children[0]);
	}
}

function hideOverlay(){
	let overlayElement = document.getElementById('andegraph-overlay');
	if(overlayElement != null){
		document.body.removeChild(document.getElementById('andegraph-overlay'));
	}
	//console.log(overlayElement)
	
}




// function messageListener(message){
// 	console.log(message)
// }
// browser.runtime.onMessage.addListener((message) => {
//     console.log('asdfasdfasdfasdfasdasfdsafdfasdfasfdasdfasdfasdfasdfs')
//   });


// browser.tabs.executeScript({file: "/components/box.js"})
// browser.runtime.sendMessage('','sendsend')
// 	.catch(console.log('error sending'));





// browser.runtime.onMessage.addListener((message) => {
//     if (message.command === "listen") {
//       console.log('start listening')
//     }
//   });



browser.runtime.sendMessage( {
	command: "shiftshift"
});