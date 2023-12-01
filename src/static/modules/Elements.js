
function createSourceViewerHeaderField(id, ){
	let container = document.createElement('div');
	container.style.backgroundColor = 'lightblue';
	container.style.width = '45%';
	container.style.display = 'flex';
	container.style.flexDirection = 'row';
	container.style.justifyContent = 'center';


	let labelElement = document.createElement('label');
	labelElement.textContent = 'placeholder';
	labelElement.style.margin = '5px';
	labelElement.style.marginRight = '10px';
	//labelElement.style.width = '20%';
	let valueElement = document.createElement('input');
	valueElement.value = 'placeholder2';
	
	container.appendChild(labelElement);
	container.appendChild(valueElement);

	return container;

	//console.log('filed');
}


export {
	createSourceViewerHeaderField
}

