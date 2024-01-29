
//import { newPanel1 } from "./panel1.js";

export let panel1;
export let panel2;
export let panel3;


let mainMenuWidth = 50;

let parentContainerWidth;

let maxWidth;

let panel1Width;
let panel1MinWidth = 0;
let panel1MaxWidth = 3000;
let panel2Width;
let panel2MinWidth = 400;
let panel2MaxWidth = 3000;
let panel3Width;
let panel3MinWidth = 400;
let panel3MaxWidth = 3000;


let vertisep1;
let vertisep2;

let vertisepWidth = 8;
let vertisepHalfWidth = 4;
let vertisepX1;
let vertisepX2;

let cursorX;

let xCoordWhenEnabled1;
let xCoordWhenEnabled2;


export function initThreePanels(parentContainer){

	let threePanelsContainer = document.createElement('div');
	threePanelsContainer.id = 'threepanels-container';

	parentContainerWidth = parentContainer.clientWidth;
	maxWidth = parentContainerWidth;
	//console.log(parentContainerWidth)

	//panel3Width = Math.floor(parentContainerWidth * 0.35);
	panel1Width = Math.floor(parentContainerWidth * 0.30);
	panel2Width = Math.floor(parentContainerWidth * 0.40); 
	panel3Width = parentContainerWidth - panel1Width - panel2Width - 2 * vertisepWidth;
	//panel1Width = parentContainerWidth - panel3Width - panel2Width - 2 * vertisepWidth;
	if(panel1Width < panel1MinWidth)
		panel1Width = panel1MinWidth + 5;
	if(panel2Width < panel2MinWidth)
		panel2Width = panel2MinWidth + 5;
	if(panel3Width < panel3MinWidth)
		panel3Width = panel3MinWidth + 5;
	
	
	vertisepX1 = mainMenuWidth + panel1Width + vertisepHalfWidth;
	vertisepX2 = vertisepX1 + vertisepHalfWidth + panel2Width + vertisepHalfWidth;
	// console.log(vertisepX1)
	// console.log(vertisepX2)


	threePanelsContainer.appendChild(newPanel(1, panel1Width));
	threePanelsContainer.appendChild(newVertisep(1));
	threePanelsContainer.appendChild(newPanel(2, panel2Width));
	threePanelsContainer.appendChild(newVertisep(2));
	threePanelsContainer.appendChild(newPanel(3, panel3Width));

	

	return threePanelsContainer;

}


function newPanel(panelIndex, panelWidth) {

	let panel = document.createElement('div');
	panel.id = 'threepanels-panel-' + panelIndex;
	panel.classList.add('threepanels-panel');
	panel.style.width = panelWidth + 'px';
	switch (panelIndex) {
		case 1:
			panel1 = panel;
			break;
		case 2:
			panel2 = panel;
			break;
		case 3:
			panel3 = panel;
			break;
		default:
			break;
	}
	//panel.textContent = 'panel ' + panelWidth;

	return panel;
}

function newVertisep(index){

	let vertisep = document.createElement('div');
	vertisep.id = 'threepanels-vertisep-' + index;
	vertisep.classList.add('threepanels-vertisep');
	vertisep.style.width = vertisepWidth + 'px';
	vertisep.tabIndex = 0;
	//vertisep.textContent = index;

	if(index == 1){
		vertisep1 = vertisep;
		vertisep.addEventListener('mousedown', panelFocus1);
		vertisep.addEventListener('focusout', panelFocusout1);
	}
	else{
		vertisep2 = vertisep;
		vertisep.addEventListener('mousedown', panelFocus2);
		vertisep.addEventListener('focusout', panelFocusout2);
	}
	

	return vertisep;
}



/* 
	VERTISEP 1 MOVEMENT
*/
function panelFocus1(mouseevent){
	
	//console.log(mouseevent.target)
	mouseevent.target.classList.add('threepanels-vertisep-grabbed');

	addEventListener('mousemove', movePointerWhileDragable1);
	addEventListener('mouseup', panelFocusout1);

	xCoordWhenEnabled1 = mouseevent.clientX;
	//console.log(xCoordWhenEnabled);
}
function panelFocusout1(event){
	
	event.target.classList.remove('threepanels-vertisep-grabbed');

	removeEventListener('mousemove', movePointerWhileDragable1);
}
function movePointerWhileDragable1(mouseevent){
	//console.log(mouseevent.movementX);

	let vertisep1 = document.getElementById('threepanels-vertisep-1');

	let newVertisep1X = mouseevent.clientX;
	let diffX1 = newVertisep1X - vertisepX1;

	let panel1 = document.getElementById('threepanels-panel-1');
	let panel2 = document.getElementById('threepanels-panel-2');
	let panel3 = document.getElementById('threepanels-panel-3');

	// let newwidthPanel1 = panel1.clientWidth + mouseevent.movementX;
	// let newwidthPanel2 = panel2.clientWidth - mouseevent.movementX;
	// let newwidthPanel1 = panel1.clientWidth + diffX1;
	// let newwidthPanel2 = panel2.clientWidth - diffX1;
	let newwidthPanel1 = panel1.offsetWidth + diffX1;
	let newwidthPanel2 = panel2.offsetWidth - diffX1;
	
	

	if (isNewWidthGoodPanel1(newwidthPanel1) && isNewWidthGoodPanel2(newwidthPanel2)) {

		vertisepX1 = newVertisep1X;


		panel1.style.width = newwidthPanel1 + 'px';
		panel2.style.width = newwidthPanel2 + 'px';


	}

	//console.log(findPanel.style.width);
}



/* 
	VERTISEP 2 MOVEMENT
*/
function panelFocus2(mouseevent){

	mouseevent.target.classList.add('threepanels-vertisep-grabbed');

	addEventListener('mousemove', movePointerWhileDragable2);
	addEventListener('mouseup', panelFocusout2);

	xCoordWhenEnabled2 = mouseevent.clientX;
	//console.log(xCoordWhenEnabled);
}
function panelFocusout2(event){

	event.target.classList.remove('threepanels-vertisep-grabbed');

	removeEventListener('mousemove', movePointerWhileDragable2);
}
function movePointerWhileDragable2(mouseevent){
	//console.log(mouseevent.movementX);

	let vertisep2 = document.getElementById('threepanels-vertisep-2');

	let newVertisep2X = mouseevent.clientX;
	let diffX2 = newVertisep2X - vertisepX2;
	

	let panel1 = document.getElementById('threepanels-panel-1');
	let panel2 = document.getElementById('threepanels-panel-2');
	let panel3 = document.getElementById('threepanels-panel-3');
	
	// let newwidthPanel2 = panel2.clientWidth + mouseevent.movementX;
	// let newwidthPanel3 = panel3.clientWidth - mouseevent.movementX;
	// let newwidthPanel2 = panel2.clientWidth + diffX2;
	// let newwidthPanel3 = panel3.clientWidth - diffX2;
	let newwidthPanel2 = panel2.offsetWidth + diffX2;
	let newwidthPanel3 = panel3.offsetWidth - diffX2;
	

	if(isNewWidthGoodPanel2(newwidthPanel2) && isNewWidthGoodPanel3(newwidthPanel3)){

		vertisepX2 = newVertisep2X;
		
		// console.log()
		// console.log('style: ', panel2.style.width)
		// console.log('client: ', panel2.clientWidth)
		// console.log(diffX2)
		panel2.style.width = newwidthPanel2 + 'px';
		panel3.style.width = newwidthPanel3 + 'px';

		
	}
	

	//console.log(findPanel.style.width);
}






function isNewWidthGoodPanel1(newWidth){
	if(newWidth < panel1MinWidth || newWidth > panel1MaxWidth)
		return false;
	else
		return true;
}
function isNewWidthGoodPanel2(newWidth){
	if(newWidth < panel2MinWidth || newWidth > panel2MaxWidth)
		return false;
	else
		return true;
}
function isNewWidthGoodPanel3(newWidth){
	if(newWidth < panel3MinWidth || newWidth > panel3MaxWidth)
		return false;
	else
		return true;
}



/* 
	TERRIBLE LOOKING ANIMATION
*/
export function animateToWidthPanel1(toWidth, animationTimeMs){
	let animationIndex = 0;
	let animationFrames = 100;
	let animationTimeStep = animationTimeMs / animationFrames;

	let panel1 = document.getElementById('threepanels-panel-1');
	let panel2 = document.getElementById('threepanels-panel-2');

	let startWidthPanel1 = panel1.clientWidth;
	let endWidthPanel1 = toWidth;
	let startWidthPanel2 = panel2.clientWidth;
	let endWidthPanel2 = startWidthPanel2 - (endWidthPanel1 - startWidthPanel1);

	let frameWidthStep =  (startWidthPanel1 - toWidth) / (animationFrames-1) ;


	function animate(){

		if(animationIndex < animationFrames){

			panel1.style.width = (panel1.clientWidth - frameWidthStep) + 'px';
			panel2.style.width = (panel2.clientWidth + frameWidthStep) + 'px';

			animationIndex++;

			setTimeout(animate, animationTimeStep);
		}
		else{
			panel1.style.width = endWidthPanel1 + 'px';
			panel2.style.width = endWidthPanel2 + 'px';
		}
		
		
	}

	setTimeout(animate, animationTimeStep);
}

/* export {
	initThreePanels,
} */

