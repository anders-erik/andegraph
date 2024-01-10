
import { nodeCreate, audioSetup, startAudioNav, viewAudioChunks,   frequencyString } from "../audiowidget/audiowidget.js";


let loadHomedash = function() {
	//console.log('loadHomedash')

	let mainContent = document.getElementById('mainContent');
	mainContent.innerHTML = '';
	mainContent.innerHTML = 'home';


	let audioWidget = document.createElement('div');
	audioWidget.id = 'audioWidget';
	//audioWidget.textContent = 'audioWidget';
	audioWidget.addEventListener('click', viewAudioChunks);
	mainContent.appendChild(audioWidget);


	//audioSetup();
	nodeCreate();


	//setInterval(nodeCreate, 1000);
	//startAudioNav();
	//viewAudioChunks();
	//setTimeout(viewAudioChunks, 500);

	setInterval(updatefrequencyElement, 300);

}

function updatefrequencyElement(){
	let elem = document.getElementById('audioWidget');
	elem.textContent = frequencyString;

	
}


export {
	loadHomedash
}