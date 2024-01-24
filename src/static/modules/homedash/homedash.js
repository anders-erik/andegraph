
import { newAudioWidgetElement } from "../audiowidget/audiowidget.js";



let loadHomedash = function() {
	//console.log('loadHomedash')

	let mainContent = document.getElementById('mainContent');
	mainContent.innerHTML = '';
	mainContent.innerHTML = 'home';



	let audioWidget = newAudioWidgetElement();

	let nodesOverview = newNodesOverview();
	console.log(typeof nodesOverview)

	
	mainContent.append(nodesOverview, audioWidget);

	

	

}


function newNodesOverview(){
	let nodesOverview = document.createElement('div');
	nodesOverview.id = 'nodes-overview';
	nodesOverview.textContent = 'nodes overview';
	
	return nodesOverview;
	
}



export {
	loadHomedash
}