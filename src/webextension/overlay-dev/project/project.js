

let projectSearchButton;
let projectChildrenButton;
let projectPropertiesButton;
let projectNewButton;

let projectSearchInput;
let projectSearchTable;
let projectChildrenTable;
let projectPropertiesTable;

let focusProjectSearch = false;

// let lastProjectSearchString = '';




function initProject() {

	// if (!extensionStateFront.active) {
	// 	console.log('STATE INACTIVE')

	// 	document.getElementById('contextOverlay').style.display = 'none';
	// }



	projectSearchButton = document.getElementById('ae-projectSearchButton');
	projectChildrenButton = document.getElementById('ae-projectChildrenButton');
	projectPropertiesButton = document.getElementById('ae-projectPropertiesButton');
	projectNewButton = document.getElementById('ae-projectNewButton');

	projectSearchInput = document.getElementById('ae-projectSearchInput');
	projectSearchTable = document.getElementById('ae-projectSearchTable');
	projectChildrenTable = document.getElementById('ae-projectChildrenTable');
	projectPropertiesTable = document.getElementById('ae-projectPropertiesTable');

	projectSearchButton.addEventListener('click', projectToggleClicked);
	projectChildrenButton.addEventListener('click', projectToggleClicked);
	projectPropertiesButton.addEventListener('click', projectToggleClicked);
	projectNewButton.addEventListener('click', newProjectButtonClicked);

	projectSearchInput.addEventListener('focus', searchProjectIn);
	projectSearchInput.addEventListener('focusout', searchProjectOut);



	writeProjectFromStateToDom();



	// THIS DOESN'T WORK BECAUSE I LOOSE FOCUS ON SEARCH BAR WHEN SWITCHING TABS ETC.
	// if (extensionStateFront.projectSearchActive) {
	// 	projectSearchInput.focus();

	// }

	// document.body.focus();

	// projectSearchInput.blur()

	projectSearchInput.innerHTML = `<div>${extensionStateFront.projectSearchString}<br></div>`;

	// make sure an empty search is loaded into search table on load
	keyDownDuringSearch();

	// setTimeout(() => {

	// 	projectSearchInput.textContent = `<div>${extensionStateFront.projectSearchString}<br></div>`;

	// 	// make sure an empty search is loaded into search table on load
	// 	keyDownDuringSearch();

	// }, 100)


}






/* 

	DOM EVENTS

*/


async function newProjectButtonClicked() {


	let newProject = await postNewProject();

	extensionStateFront.current_projectObject = newProject;

	writeProjectFromStateToDom();

	writeStateFromFront();

}



async function editableProjectPropertyFocusOut() {

	copyProjectPropertiesFromDomToState();

	// update title, etc.
	writeProjectFromStateToDom();

	writeStateFromFront();

	await putCurrentProjectObject();

	// Re-perform search to get rid of old node-values in search table
	keyDownDuringSearch();
}


function searchProjectIn() {
	// focusProjectSearch = true;
	extensionStateFront.projectSearchActive = true;
	writeStateFromFront();

	if (projectSearchInput.textContent == '') {
		projectSearchInput.innerHTML = '<div><br></div>'; // default content on 'contenteditable' elements 
		// setInterval(() => { searchInput.innerHTML += '<br>' }, 50);
	}
	// console.log('focus search ')
	// projectSearchInput.addEventListener('keypress', keyPressDuringSearch)
	projectSearchInput.addEventListener('keydown', keyDownDuringSearch)
	keyDownDuringSearch();
}


function searchProjectOut() {
	extensionStateFront.projectSearchActive = false;
	writeStateFromFront();
	// focusProjectSearch = false;
	// console.log('focusout search ')
	// projectSearchInput.removeEventListener('keypress', keyPressDuringSearch)
	projectSearchInput.removeEventListener('keydown', keyDownDuringSearch)
}


// Perform search with slight delay to make sure new input is written to contentEditanle input
async function keyDownDuringSearch(keyEvent) {
	// keyEvent.preventDefault();


	setTimeout(async () => {

		await fetchProjectSearchThenWriteToStates();

		populateProjectSearchTableFromState();

	}, 100);


}



async function projectSearchRowClicked(event) {

	/* 
		WRITE THE PROJECT PROPERTIES TO STATE, THEN DOM
	*/

	// Can't get projectObject directly because click will register the row-child: either th, or td
	let uuidOfNodeClicked = event.target.dataset.uuid;

	if (uuidOfNodeClicked === undefined) {
		console.log('No Uuid of project detected on projectSearchTable-click. No project selected.')
		return;
	}

	let nodeTableRow = document.getElementById('ae-projectSearchNode-' + event.target.dataset.uuid)

	extensionStateFront.current_projectObject = nodeTableRow.nodeObject;

	writeProjectFromStateToDom();



	/* 
		FETCH PROJECT CHILDREN AND POPULATE DOM
	*/

	await fetchCurrentProjectChildrenThenWriteToStates();

	// console.log(extensionStateFront.current_projectChildNodeEdges)

	writeProjectChildrenFromStateToDom();




	writeStateFromFront();

}


async function projectChildRowClicked(event) {
	// console.log('projectChildRowClicked called')

	// console.log(event.target.dataset.uuid)
	let projectChildUuid = event.target.dataset.uuid;

	let projectChildNodeEdge = extensionStateFront.current_projectChildNodeEdges.find(obj => obj.Uuid == projectChildUuid);

	if (projectChildNodeEdge.Table === 'Source') {
		// console.log('Source clicked')

		await fetchSourceOnUuidThenWriteToStates(projectChildUuid);

		// loadCurrentSourceIntoDom();
		writeCurrentSourceObjectToDom();

		await fetchCurrentSourceChildrenThenWriteToStates();

		populateSourceChildTableFromState();

	}
	else {
		console.log('Only Sources can be selected');
	}


}


function projectToggleClicked(event) {


	projectPropertiesButton.classList.remove('ae-projectButtonOn');
	projectChildrenButton.classList.remove('ae-projectButtonOn');
	projectSearchButton.classList.remove('ae-projectButtonOn');


	projectSearchInput.classList.add('ae-displayNone');
	projectSearchInput.classList.remove('ae-centerWithFlex');
	projectSearchTable.classList.add('ae-displayNone');

	projectChildrenTable.classList.add('ae-displayNone');

	projectPropertiesTable.classList.add('ae-displayNone');



	if (event.target.id === 'ae-projectSearchButton') {

		projectSearchButton.classList.add('ae-projectButtonOn');

		projectSearchInput.classList.remove('ae-displayNone');
		projectSearchInput.classList.add('ae-centerWithFlex');
		projectSearchTable.classList.remove('ae-displayNone');

	}
	else if (event.target.id === 'ae-projectChildrenButton') {

		projectChildrenButton.classList.add('ae-projectButtonOn');
		projectChildrenTable.classList.remove('ae-displayNone');

	}
	else if (event.target.id === 'ae-projectPropertiesButton') {

		projectPropertiesButton.classList.add('ae-projectButtonOn');
		projectPropertiesTable.classList.remove('ae-displayNone');
	}

}













/* 

	READ WRITE DOM

*/



function populateProjectSearchTableFromState() {
	// console.log('populate with children dones', childObjects)

	childObjects = extensionStateFront.current_projectSearchObjects;

	let tbody = document.getElementById('ae-projectSearchTable-tbody');
	tbody.innerHTML = '';

	for (let childObject of childObjects) {
		let tableRowHtml = `
                
                <th data-Uuid="${childObject.Uuid}" class="ae-element">${childObject.Table}</th>
                <td data-Uuid="${childObject.Uuid}" class="ae-element">${childObject.Title}</td>

            `;
		let tr = document.createElement('tr');
		tr.id = 'ae-projectSearchNode-' + childObject.Uuid;
		tr.nodeObject = childObject;
		// tr.dataset.Node = 1;
		// tr.dataset.Uuid = childObject.Uuid;
		tr.setAttribute('data-Node', '1');
		tr.setAttribute('data-Uuid', childObject.Uuid);
		tr.tabIndex = 0;
		tr.innerHTML = tableRowHtml;
		tr.addEventListener('click', projectSearchRowClicked);
		// tr.contentEditable = 'True';

		tbody.append(tr);
		// console.log(tr)
	}
	// console.table(childObjects)

}





function copyProjectPropertiesFromDomToState() {

	let tempProjectObjectFromDom = {};

	if (document.getElementById('ae-projPropTable-Uuid-value') == null) {
		console.log('Project properties not loaded into DOM')
		return;
	}

	tempProjectObjectFromDom.Uuid = document.getElementById('ae-projPropTable-Uuid-value').textContent
	tempProjectObjectFromDom.Table = document.getElementById('ae-projPropTable-Table-value').textContent
	tempProjectObjectFromDom.Type = document.getElementById('ae-projPropTable-Type-value').textContent
	tempProjectObjectFromDom.Title = document.getElementById('ae-projPropTable-Title-value').textContent
	tempProjectObjectFromDom.TimeCreated = document.getElementById('ae-projPropTable-TimeCreated-value').textContent
	tempProjectObjectFromDom.TimeLastChange = document.getElementById('ae-projPropTable-TimeLastChange-value').textContent
	tempProjectObjectFromDom.Goal = document.getElementById('ae-projPropTable-Goal-value').textContent

	// console.log('copyProjectPropertiesFromDomToState() : ', tempProjectObject)
	// console.table(tempProjectObjectFromDom)

	extensionStateFront.current_projectObject = tempProjectObjectFromDom;

	writeStateFromFront();

}



function writeProjectChildrenFromStateToDom() {

	let projectChildNodeEdges = extensionStateFront.current_projectChildNodeEdges;

	// extensionStateFront.current_projectUuid = projectObject.Uuid;

	// document.getElementById('aa-projectTitle').textContent = projectObject.Title;

	let tbody = document.getElementById('ae-projectChildrenTable-tbody');

	tbody.innerHTML = '';

	for (const nodeEdge of projectChildNodeEdges) {

		let newProjectChildRow = document.createElement('tr');

		newProjectChildRow.id = `ae-projchildTableRow-${nodeEdge.Uuid}`;
		newProjectChildRow.nodeEdgeObject = nodeEdge;

		newProjectChildRow.innerHTML += `
		
				<th id=ae-projchildTable-Table-${nodeEdge.Uuid} class="ae-element" data-Uuid=${nodeEdge.Uuid}>${nodeEdge.Table}</th>
				<td id=ae-projchildTable-Title-${nodeEdge.Uuid} class="ae-element" data-Uuid=${nodeEdge.Uuid}>${nodeEdge.Title}</td>
			
		`;

		// document.getElementById(`id=ae-projchildTableRow-${nodeEdge.Uuid}`);

		// console.log(document.getElementById(`id=ae-projchildTableRow-${nodeEdge.Uuid}`))


		newProjectChildRow.addEventListener('click', projectChildRowClicked)

		tbody.appendChild(newProjectChildRow)

	}


}



function writeProjectFromStateToDom() {

	let projectObject = extensionStateFront.current_projectObject;
	// extensionStateFront.current_projectUuid = projectObject.Uuid;

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
		// console.log(editableProjectPropertyTd.textContent);
		// console.log(propertyRow.textContent.length)

		// editableProjectPropertyTd.addEventListener('focusout', readProjectPropertiesFromDomAndWritePut)
		editableProjectPropertyTd.addEventListener('focusout', editableProjectPropertyFocusOut)
		// editableProjectPropertyTd.addEventListener('focusout', postProjectProperties)
	}

}










/* 

	FETCH FUNCTIONS

*/


async function fetchProjectSearchThenWriteToStates() {


	extensionStateFront.projectSearchString = projectSearchInput.textContent.trim();


	extensionStateFront.current_projectSearchObjects = await dbisWe.Project_SelectLikeString(extensionStateFront.projectSearchString);


	writeStateFromFront();


	// populateProjectSearchTableFromState();


}


async function fetchCurrentProjectChildrenThenWriteToStates() {


	extensionStateFront.current_projectChildNodeEdges = await dbisWe.NodeEdge_SelectChildOfUuid(extensionStateFront.current_projectObject.Uuid);


	writeStateFromFront();


}

async function fetchSourceOnUuidThenWriteToStates(sourceUuid) {

	let selectedSourceObject = (await dbisWe.Content_SelectOnUuid(sourceUuid))[0];
	// console.table(selectedSourceObject)

	extensionStateFront.current_sourceObject = selectedSourceObject;

	console.log('New current source object: ', extensionStateFront.current_sourceObject)


	writeStateFromFront();

}



async function postNewProject() {

	return await dbisWe.Content_InsertOnTable('Project');

}




function addSourceToCurrentProject() {

	// current_projectUuid
	let noProjectSelected = Object.keys(extensionStateFront.current_projectObject).length === 0 ? 1 : 0;

	if (noProjectSelected) {
		console.log('NO PROJECT SELECTED')
	}
	else {
		dbisWe.Content_InsertChildUuidTable(extensionStateFront.current_projectObject.Uuid, 'Source')
	}

}






async function putCurrentProjectObject() {
	// console.log('Posting current project properties', readProjectPropertiesFromDom())
	// console.log('PUT ProjectObject: ', extensionStateFront.current_projectObject)
	await dbisWe.Content_UpdateOnContentObject(extensionStateFront.current_projectObject);
}








