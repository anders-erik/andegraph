

let projectSearchButton;
let projectPropertiesButton;
let projectNewButton;

let projectSearchInput;
let projectSearchTable;
let projectPropertiesTable;

let focusProjectSearch = false;


function initProject() {

	// if (!extensionStateFront.active) {
	// 	console.log('STATE INACTIVE')

	// 	document.getElementById('contextOverlay').style.display = 'none';
	// }

	writeProjectPropertiesToDom();


	projectSearchButton = document.getElementById('ae-projectSearchButton');
	projectPropertiesButton = document.getElementById('ae-projectPropertiesButton');
	projectNewButton = document.getElementById('ae-projectNewButton');

	projectSearchInput = document.getElementById('ae-projectSearchInput');
	projectSearchTable = document.getElementById('ae-projectSearchTable');
	projectPropertiesTable = document.getElementById('ae-projectPropertiesTable');

	projectSearchButton.addEventListener('click', projectToggleClicked);
	projectPropertiesButton.addEventListener('click', projectToggleClicked);
	projectNewButton.addEventListener('click', createNewProject);

	projectSearchInput.addEventListener('focus', searchProjectIn);
	projectSearchInput.addEventListener('focusout', searchProjectOut);

	console.log('INTINTINTITNIT')

	keyDownDuringSearch();
}


function createNewProject() {
	console.log('new project')

	dbisWe.Content_InsertOnTable('Project')
		.then((newProject) => {
			// console.log(newProject)
			extensionStateFront.current_projectObject = newProject;
			writeProjectPropertiesToDom();
			writeStateFromFront();
		})

}



function addSourceToCurrentProject() {

	if (extensionStateFront.current_projectUuid == 0) {
		console.log('NO PROJECT SELECTED')
	}
	else {
		dbisWe.Content_InsertChildUuidTable(extensionStateFront.current_projectUuid, 'Source')
	}

}


function writeProjectPropertiesToDom() {

	let projectObject = extensionStateFront.current_projectObject;
	extensionStateFront.current_projectUuid = projectObject.Uuid;

	document.getElementById('aa-projectTitle').textContent = projectObject.Title;

	let tbody = document.getElementById('ae-projectPropertiesTable-tbody');
	tbody.innerHTML = '';

	for (const key in projectObject) {
		// console.log(`${key}: ${projectObject[key]}`);
		if (key === 'Type' || key === 'Title' || key === 'Goal') {

			tbody.innerHTML += `
		
			<tr>
				<th id=ae-projPropTable-${key}-key class="ae-element" >${key}</th>
				<td id=ae-projPropTable-${key}-value class="ae-editableProjectProperty ae-element" contenteditable="true" >${projectObject[key]}</td>
			</tr>
		
		`;

		}
		else {
			tbody.innerHTML += `
		
			<tr>
				<th id=ae-projPropTable-${key}-key class="ae-element" >${key}</th>
				<td id=ae-projPropTable-${key}-value class="ae-element">${projectObject[key]}</td>
			</tr>
		
		`;
		}

	}

	// console.log(document.querySelectorAll('#ae-projectPropertiesTable tbody tr'))
	let editableProjectPropertyTds = document.querySelectorAll('.ae-editableProjectProperty');
	// console.log(editableProjectPropertyTd)
	for (let editableProjectPropertyTd of editableProjectPropertyTds) {
		console.log(editableProjectPropertyTd.textContent);
		// console.log(propertyRow.textContent.length)
		editableProjectPropertyTd.addEventListener('focusout', readProjectPropertiesFromDomAndWritePut)
		// editableProjectPropertyTd.addEventListener('focusout', postProjectProperties)
	}

}

// extract values, update title, save to extensionStateFront, and then return the object
function readProjectPropertiesFromDomAndWritePut() {

	// let tbody = document.getElementById('ae-projectPropertiesTable-tbody');

	// let editableProjectPropertyTds = document.querySelectorAll('.ae-editableProjectProperty');

	// for (let editableProjectPropertyTd of editableProjectPropertyTds) {
	// 	console.log(editableProjectPropertyTd.textContent);
	// 	// console.log(propertyRow.textContent.length)
	// 	editableProjectPropertyTd.addEventListener('focusout', readProjectPropertiesFromDom)
	// 	editableProjectPropertyTd.addEventListener('focusout', postProjectProperties)
	// }

	let newType = document.getElementById('ae-projPropTable-Type-value').textContent;
	let newTitle = document.getElementById('ae-projPropTable-Title-value').textContent;
	let newGoal = document.getElementById('ae-projPropTable-Goal-value').textContent;

	// SET TITLE
	document.getElementById('aa-projectTitle').textContent = newTitle;

	extensionStateFront.current_projectObject.Type = newType;
	extensionStateFront.current_projectObject.Title = newTitle;
	extensionStateFront.current_projectObject.Goal = newGoal;

	writeStateFromFront();

	// console.log(extensionStateFront.current_projectObject)

	console.log(newType, newTitle, newGoal)

	putProjectProperties();

	return '';
}



function putProjectProperties() {
	// console.log('Posting current project properties', readProjectPropertiesFromDom())
	console.log('PUT ProjectObject: ', extensionStateFront.current_projectObject)
	dbisWe.Content_UpdateOnContentObject(extensionStateFront.current_projectObject);
}




function projectToggleClicked(event) {
	// projectPropertiesButton.style.backgroundColor = 'rgba(26, 133, 180, 0.568)';
	// projectSearchButton.style.backgroundColor = 'rgba(26, 133, 180, 0.568)';

	projectPropertiesButton.classList.remove('ae-projectButtonOff');
	projectPropertiesButton.classList.remove('ae-projectButtonOn');
	projectSearchButton.classList.remove('ae-projectButtonOff');
	projectSearchButton.classList.remove('ae-projectButtonOn');


	projectSearchInput.classList.add('ae-displayNone');
	projectSearchInput.classList.remove('ae-centerWithFlex');
	projectSearchTable.classList.add('ae-displayNone');

	projectPropertiesTable.classList.add('ae-displayNone');




	if (event.target.id === 'ae-projectSearchButton') {
		projectSearchButton.classList.add('ae-projectButtonOn');
		projectPropertiesButton.classList.add('ae-projectButtonOff');

		projectSearchInput.classList.remove('ae-displayNone');
		projectSearchInput.classList.add('ae-centerWithFlex');
		projectSearchTable.classList.remove('ae-displayNone');
	}
	else {
		projectSearchButton.classList.add('ae-projectButtonOff');
		projectPropertiesButton.classList.add('ae-projectButtonOn');

		projectPropertiesTable.classList.remove('ae-displayNone');
	}

}