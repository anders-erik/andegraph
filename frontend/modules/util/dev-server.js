

export function init(){
	
	attachDevSocket();

	addAutoReloadToggle();
}


// Automatic Reload Toggle
const toggleElement = document.createElement('div');

let autoReloadOn;
if(localStorage.getItem("autoReloadOn") === "false")
	autoReloadOn = false;
else // deafults to true unless "autoReloadOn" speficically instructs us not to
	autoReloadOn = true;


// if(isDev){
// 	console.log('DEVELEOPMENT!')
// 	attachDevSocket();
// }


/** Connects to local filewatcher and reloads page if server sends "reload"-status */
function attachDevSocket(){
	 
	let devSocket = new WebSocket("ws://localhost:3001");

	// Connection opened 
	devSocket.addEventListener("open", (event) => {
		devSocket.send("Hello Server!"); 
	});

	// Listen for messages
	devSocket.addEventListener("message", (event) => {
		let serverData = JSON.parse(event.data);
		if(serverData.status === "connected"){
			console.log('NEW WS CONNECTION');
			
		}
		else if (serverData.status === "reload"){
			if (autoReloadOn)
				window.location.reload();
			else
				console.log("Reload signal recieved, but 'autoReloadOn' turned off!");
		}
		// console.log("Message from server : ", event.data);
	});
}



/** Dynamically creates the toggle for automatic reload */
function addAutoReloadToggle() {
	
	toggleElement.style.position = 'fixed';
	toggleElement.style.bottom = '10px';
	toggleElement.style.left = '10px';
	toggleElement.style.width = '50px';
	toggleElement.style.height = '50px';
	toggleElement.style.backgroundColor = 'lightgreen';
	toggleElement.style.borderRadius = '25px';
	toggleElement.style.display = 'flex';
	toggleElement.style.alignItems = 'center';
	toggleElement.style.justifyContent = 'center';
	toggleElement.style.fontSize = '24px';
	toggleElement.textContent = 'ON';
	toggleElement.style.cursor = "pointer";

	// We assume on. If not we turn the css to 'off'
	if(!autoReloadOn){
		toggleElement.style.backgroundColor = 'lightgray';
		toggleElement.textContent = 'OFF';
	}

	document.body.appendChild(toggleElement);


	toggleElement.addEventListener('click', toggleCallback);
}


/** Toggles the autoreload state during development and updates the local storage. */
function toggleCallback() {
	autoReloadOn = !autoReloadOn;
	toggleElement.textContent = autoReloadOn ? 'ON' : 'OFF';
	toggleElement.style.backgroundColor = autoReloadOn ? 'lightgreen' : 'lightgray';

	localStorage.setItem("autoReloadOn", `${autoReloadOn}`);
}


// const observer = new MutationObserver(callback);
