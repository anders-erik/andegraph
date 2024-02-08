

export function initGlobalListener(){

	window.addEventListener('keydown', globalKeyPressed);
	window.addEventListener('click', globalClick);

}

function globalClick(event){
	console.log(event.target)
	console.log(document.activeElement)

	if (document.activeElement.dataset.Node == 1) {
		document.getElementById('statustable-active').textContent = document.activeElement.nodeObject.Title;
		document.getElementById('statustable-active').nodeObject = document.activeElement.nodeObject;

	}
}

function globalKeyPressed(keyEvent) {
	console.log(keyEvent.key)
	//console.log(document.activeElement.dataset.Node);
	let activeElement = document.activeElement;
	console.log('active element: ', activeElement)

	if (activeElement.dataset.Node == 1) {
		console.log('selectable node object')


		if (activeElement.contentEditable == 'true' || activeElement.nodeName === 'INPUT') {
			console.log('editable')
		}
		else {
			console.log('not editable')

			nonEditableNode(keyEvent.key, activeElement);

		}

	}

}


function nonEditableNode(key, activeElement){

	switch (key) {

		case 'P':
			if(activeElement.nodeObject.Table === 'Project'){
				document.getElementById('statustable-project').textContent = document.activeElement.nodeObject.Title;
			}
			break;

		case 'S':
			document.getElementById('statustable-selected').textContent = document.activeElement.nodeObject.Title;
			break;
	
		default:
			break;
	}

}



