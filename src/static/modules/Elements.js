
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


function createReadElement(id, title, labeltext){
	let readElement = document.createElement('div');
	readElement.classList.add('read-element');
	readElement.id = id;

	let readElementTitle = document.createElement('div');
	readElement.appendChild(readElementTitle);
	readElementTitle.textContent = title;

	let readElementLabel = document.createElement('label');
	readElementLabel.id = id + '-field';
	readElement.appendChild(readElementLabel);
	readElementLabel.textContent = labeltext;

	return readElement;
}

function createInputElement(id, title, placeholder){
	let inputElement = document.createElement('div');
	inputElement.classList.add('input-element');
	inputElement.id = id;

	let inputElementTitle = document.createElement('div');
	inputElement.appendChild(inputElementTitle);
	inputElementTitle.textContent = title;

	let inputElementinput = document.createElement('input');
	inputElementinput.id = id + '-field';
	inputElementinput.placeholder = placeholder;
	inputElement.appendChild(inputElementinput);
	

	return inputElement;

}

function createButtonElement(text){
	let buttonElement = document.createElement('div');
	buttonElement.classList.add('button-element');

	buttonElement.textContent = text;

	return buttonElement;
}



export {
	createSourceViewerHeaderField,
	createReadElement,
	createInputElement,
	createButtonElement
}

