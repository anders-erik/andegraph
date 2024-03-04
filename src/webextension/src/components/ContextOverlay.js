

let overlayElement;
let overlayRightPanel;
let projectContainer;
let sourceContainer;
let clipboardContainer;


function showOverlay() {
	overlayElement.style.display = 'flex';
}

function hideOverlay() {
	overlayElement.style.display = 'none';
}


function createOverlay() {
	// console.log(document.getElementById('andegraph-overlay'))
	// if (document.getElementById('andegraph-overlay') == null) {

	overlayElement = document.createElement('div');
	overlayElement.id = 'andegraph-overlay';

	overlayElement.style.width = '100%';
	overlayElement.style.height = '100%';
	// overlayElement.style.backgroundColor = 'rgb(0 ,0 ,0 , 0.4)';
	overlayElement.style.border = 'solid green 3px';
	overlayElement.style.display = 'none';
	overlayElement.style.flexDirection = 'row';
	overlayElement.style.justifyContent = 'end';

	// below is done through trial and error on a few popular websites..
	overlayElement.style.top = '0px';
	overlayElement.style.left = '0px';
	overlayElement.style.position = 'fixed';
	overlayElement.style.zIndex = '100000000';

	document.body.appendChild(overlayElement);

	addOverlayStructure()

	// document.body.insertBefore(overlayElement, document.body.children[0]);
	// }

}


function addOverlayStructure() {
	// console.log('||||||||||||||||||||||', overlayElement);

	overlayElement.innerHTML = `
			<div id="overlayRightPanel">

			<div id="projectContainer" class="panelContainer">projectContainer</div>
			<div id="sourceContainer" class="panelContainer">sourceContainer</div>
			<div id="clipboardContainer" class="panelContainer">clipboardContainer</div>

			</div>
			<style>
				#overlayRightPanel {
					background-color: rgba(71, 4, 4, 0.198);
					height: 100%;
					width: 300px;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
				}

				.panelContainer {
					width: 100%;
					height: 30%;
					border-radius: 5px;
					background-color: rgba(165, 206, 242, 0.424);
				}
			</style>
	`;
}








function showState() {
	let overlayElement = document.getElementById('andegraph-overlay');




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


