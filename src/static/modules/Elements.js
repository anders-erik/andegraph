/* 

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

 */



function getSosButton(text){
	let buttonElement = document.createElement('div');
	buttonElement.classList.add('button-element');

	buttonElement.textContent = text;

	return buttonElement;
}


function getSosInput(id, title, placeholder){
	let sosInput = document.createElement('div');
	sosInput.classList.add('sos-input');
	sosInput.id = id;

	let inputElementTitle = document.createElement('label');
	inputElementTitle.id = id + '-label';
	inputElementTitle.classList.add('sos-input-label');
	inputElementTitle.textContent = title;
	sosInput.appendChild(inputElementTitle);

	let inputElementinput = document.createElement('input');
	inputElementinput.classList.add('sos-input-input');
	inputElementinput.id = id + '-field';
	inputElementinput.placeholder = placeholder;
	sosInput.appendChild(inputElementinput);
	

	return sosInput;
}

function getSosDisabledInput(id, title, placeholder){
	let sosDisabledInput = document.createElement('div');
	sosDisabledInput.classList.add('sos-input');
	sosDisabledInput.id = id;

	let inputElementTitle = document.createElement('label');
	inputElementTitle.classList.add('sos-input-label');
	inputElementTitle.textContent = title;
	sosDisabledInput.appendChild(inputElementTitle);

	let inputElementinput = document.createElement('input');
	inputElementinput.classList.add('sos-dis-input-input');
	inputElementinput.id = id + '-field';
	inputElementinput.placeholder = placeholder;
	inputElementinput.disabled = 'true';
	sosDisabledInput.appendChild(inputElementinput);
	

	return sosDisabledInput;
}

function getSosLabel(id, labeltext){
	let sosLabel = document.createElement('label');
	sosLabel.id = id;
	sosLabel.classList.add('sos-label');
	sosLabel.textContent = labeltext;

	return sosLabel;
}


export {
	// createSourceViewerHeaderField,
	// createReadElement,
	// createInputElement,
	getSosButton,
	getSosLabel,
	getSosInput,
	getSosDisabledInput
}

