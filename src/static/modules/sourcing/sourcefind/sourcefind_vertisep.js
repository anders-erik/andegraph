

let xCoordWhenEnabled = 0;

function sourcingVertisep1(index){

	let panel = document.createElement('div');
	panel.id = 'sourcing-vertisep-1';
	panel.classList.add('seperation-panel');
	panel.tabIndex = 0;

	panel.addEventListener('mousedown', panelFocus);
	panel.addEventListener('focusout', panelFocusout);

	return panel;
}


function panelFocus(mouseevent){
	

	addEventListener('mousemove', movePointerWhileDragable);
	addEventListener('mouseup', panelFocusout);

	xCoordWhenEnabled = mouseevent.clientX;
	//console.log(xCoordWhenEnabled);
}


function panelFocusout(event){
	

	removeEventListener('mousemove', movePointerWhileDragable);
}


function movePointerWhileDragable(mouseevent){
	//console.log(mouseevent.movementX);

	let findPanel = document.getElementById('sourcefind-panel-outer');

	findPanel.style.width = (findPanel.clientWidth + mouseevent.movementX) + 'px';

	//console.log(findPanel.style.width);
}



export {
	sourcingVertisep1
}
