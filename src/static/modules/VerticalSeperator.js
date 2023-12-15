


function createVerticalSerperationPanel(index){

	let panel = document.createElement('div');
	panel.id = 'separation-panel-' + index;
	panel.classList.add('seperation-panel');
	//panel.textContent = 'panelpanel';


	return panel;
}

export {
	createVerticalSerperationPanel
}
