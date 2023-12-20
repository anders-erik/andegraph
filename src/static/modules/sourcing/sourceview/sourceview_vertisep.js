

let xCoordWhenEnabled = 0;

function sourcingVertisep2(index){

	let panel = document.createElement('div');
	panel.id = 'sourcing-vertisep-2';
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

	let findPanel = document.getElementById('sourceview-panel-outer');
	
	findPanel.style.width = (findPanel.clientWidth + mouseevent.movementX) + 'px';

	//console.log(findPanel.style.width);
}



export {
	sourcingVertisep2
}
