

let sourceSearchButton;
let sourcePropertiesButton;
let sourceNewButton;

let sourceSearchInput;
let sourceSearchTable;
let sourcePropertiesTable;

let focusSourceSearch = false;


function initSource() {

	// if (!extensionStateFront.active) {
	// 	console.log('STATE INACTIVE')

	// 	document.getElementById('contextOverlay').style.display = 'none';
	// }

	writeSourcePropertiesToDom();


	sourceSearchButton = document.getElementById('ae-sourceSearchButton');
	sourcePropertiesButton = document.getElementById('ae-sourcePropertiesButton');
	sourceNewButton = document.getElementById('ae-sourceNewButton');

	// sourceSearchInput = document.getElementById('ae-sourceSearchInput');
	sourceSearchTable = document.getElementById('ae-sourceSearchTable');
	sourcePropertiesTable = document.getElementById('ae-sourcePropertiesTable');

	sourceSearchButton.addEventListener('click', sourceToggleClicked);
	sourcePropertiesButton.addEventListener('click', sourceToggleClicked);
	sourceNewButton.addEventListener('click', addNewSourceToCurrentProject);

	// sourceSearchInput.addEventListener('focus', searchSourceIn);
	// sourceSearchInput.addEventListener('focusout', searchSourceOut);

	// console.log('|||||||||||||||||||||||||||||||||||||||||||')

	// keyDownDuringSearch();
	console.log('extensionState.current_sourceObject.Uuid', extensionStateFront.current_sourceObject.Uuid)

	dbisWe.Node_SelectChildOfUuid(extensionStateFront.current_sourceObject.Uuid)
		.then((data) => {

			console.log(data)
			populateSourceChildTable(data);
			console.log('Updated source child table')
		});

}





async function addNewSourceToCurrentProject() {

	if (extensionStateFront.current_projectObject.Uuid == 0 || extensionStateFront.current_projectObject.Uuid === undefined) {
		console.log('NO PROJECT SELECTED')
	}
	else {
		console.log()
		console.log('NEW SOURCE')
		// console.log('Url:', window.location.href)
		// console.log('Title:', document.title)
		let newSourceObject = await dbisWe.Content_InsertChildUuidTable(extensionStateFront.current_projectObject.Uuid, 'Source')

		newSourceObject.Content.Url = window.location.href;
		newSourceObject.Content.Title = document.title;
		// console.log('new source object: ', newSourceObject)

		console.log(newSourceObject.Content)

		extensionStateFront.current_sourceObject = newSourceObject.Content;

		await putSourceProperties();

		writeStateFromFront();

		writeSourcePropertiesToDom();

		// no chilren to fetch yet!

	}

}

// function searchSourceIn() {
// 	focusSourceSearch = true;
// 	if (sourceSearchInput.textContent == '') {
// 		sourceSearchInput.innerHTML = '<br>';
// 		// setInterval(() => { searchInput.innerHTML += '<br>' }, 50);
// 	}
// 	console.log('focus search ')
// 	// sourceSearchInput.addEventListener('keypress', keyPressDuringSearch)
// 	sourceSearchInput.addEventListener('keydown', keyDownDuringSearch)
// 	keyDownDuringSearch();
// }

// function searchSourceOut() {
// 	focusSourceSearch = false;
// 	// console.log('focusout search ')
// 	// sourceSearchInput.removeEventListener('keypress', keyPressDuringSearch)
// 	sourceSearchInput.addEventListener('keydown', keyDownDuringSearch)
// }

// let lastSourceSearchString = '';
// // Perform search with slight delay to make sure new input is written to contentEditanle input
// function keyDownDuringSearch(keyEvent) {
// 	// keyEvent.preventDefault();
// 	setTimeout(() => {

// 		// console.log()
// 		lastSourceSearchString = sourceSearchInput.textContent;
// 		dbisWe.Source_SelectLikeString(lastSourceSearchString)
// 			.then((data) => {
// 				// console.log(data)
// 				populateSourceChildTable(data);
// 			})
// 	}, 100);

// }

function populateSourceChildTable(childObjects) {
	// console.log('populate with children dones', childObjects)

	console.log('childObjects', childObjects)

	let tbody = document.getElementById('ae-sourceSearchTable-tbody');
	tbody.innerHTML = '';

	for (let childObject of childObjects) {
		let tableRowHtml = `
                
                <th data-Uuid="${childObject.Uuid}" class="ae-element">${childObject.Table}</th>
                <td data-Uuid="${childObject.Uuid}" class="ae-element">${childObject.Title}</td>

            `;
		let tr = document.createElement('tr');
		tr.id = 'ae-sourceSearchNode-' + childObject.Uuid;
		tr.nodeObject = childObject;
		// tr.dataset.Node = 1;
		// tr.dataset.Uuid = childObject.Uuid;
		tr.setAttribute('data-Node', '1');
		tr.setAttribute('data-Uuid', childObject.Uuid);
		tr.tabIndex = 0;
		tr.innerHTML = tableRowHtml;
		tr.addEventListener('click', clickSourceRow);
		// tr.contentEditable = 'True';

		tbody.append(tr);
		// console.log(tr)
	}
	// console.table(childObjects)

}

function clickSourceRow(event) {
	// console.log(event.target.dataset.Uuid)
	if (event.target.dataset.node != '1') {
		console.log('NOT ELEMENT WITH NODE OBJECT')

		let nodeRow = document.getElementById('ae-sourceSearchNode-' + event.target.dataset.uuid)

		// console.log(nodeRow.nodeObject)

		// extensionStateFront.current_sourceUuid = nodeRow.dataset.Uuid;
		extensionStateFront.current_sourceUuid = nodeRow.nodeObject.Uuid;
		extensionStateFront.current_sourceObject = nodeRow.nodeObject;
		document.getElementById('aa-sourceTitle').textContent = nodeRow.nodeObject.Title;
		// extensionStateFront.current_sourceUuid = event.target.dataset.uuid;
		console.log(extensionStateFront)
		writeStateFromFront();

		writeSourcePropertiesToDom();


	}
	else {
		console.log('ELMENET CONTAINS NODEOBJECTSS')
	}



}

function writeSourcePropertiesToDom() {

	let sourceObject = extensionStateFront.current_sourceObject;
	extensionStateFront.current_sourceUuid = sourceObject.Uuid;

	document.getElementById('aa-sourceTitle').textContent = sourceObject.Title;

	let tbody = document.getElementById('ae-sourcePropertiesTable-tbody');
	tbody.innerHTML = '';

	for (const key in sourceObject) {
		// console.log(`${key}: ${sourceObject[key]}`);
		if (key === 'Type' || key === 'Title' || key === 'Goal') {

			tbody.innerHTML += `
		
			<tr>
				<th id=ae-projPropTable-${key}-key class="ae-element" >${key}</th>
				<td id=ae-projPropTable-${key}-value class="ae-editableSourceProperty ae-element" contenteditable="true" >${sourceObject[key]}</td>
			</tr>
		
		`;

		}
		else {
			tbody.innerHTML += `
		
			<tr>
				<th id=ae-projPropTable-${key}-key class="ae-element" >${key}</th>
				<td id=ae-projPropTable-${key}-value class="ae-element">${sourceObject[key]}</td>
			</tr>
		
		`;
		}

	}

	// console.log(document.querySelectorAll('#ae-sourcePropertiesTable tbody tr'))
	let editableSourcePropertyTds = document.querySelectorAll('.ae-editableSourceProperty');
	// console.log(editableSourcePropertyTd)
	for (let editableSourcePropertyTd of editableSourcePropertyTds) {
		console.log(editableSourcePropertyTd.textContent);
		// console.log(propertyRow.textContent.length)
		editableSourcePropertyTd.addEventListener('focusout', readSourcePropertiesFromDomAndWritePut)
		// editableSourcePropertyTd.addEventListener('focusout', postSourceProperties)
	}

}

// extract values, update title, save to extensionStateFront, and then return the object
function readSourcePropertiesFromDomAndWritePut() {

	// let tbody = document.getElementById('ae-sourcePropertiesTable-tbody');

	// let editableSourcePropertyTds = document.querySelectorAll('.ae-editableSourceProperty');

	// for (let editableSourcePropertyTd of editableSourcePropertyTds) {
	// 	console.log(editableSourcePropertyTd.textContent);
	// 	// console.log(propertyRow.textContent.length)
	// 	editableSourcePropertyTd.addEventListener('focusout', readSourcePropertiesFromDom)
	// 	editableSourcePropertyTd.addEventListener('focusout', postSourceProperties)
	// }

	let newType = document.getElementById('ae-projPropTable-Type-value').textContent;
	let newTitle = document.getElementById('ae-projPropTable-Title-value').textContent;
	let newGoal = document.getElementById('ae-projPropTable-Goal-value').textContent;

	// SET TITLE
	document.getElementById('aa-sourceTitle').textContent = newTitle;

	extensionStateFront.current_sourceObject.Type = newType;
	extensionStateFront.current_sourceObject.Title = newTitle;
	extensionStateFront.current_sourceObject.Goal = newGoal;

	writeStateFromFront();

	// console.log(extensionStateFront.current_sourceObject)

	console.log(newType, newTitle, newGoal)

	putSourceProperties();

	return '';
}



async function putSourceProperties() {
	// console.log('Posting current source properties', readSourcePropertiesFromDom())
	console.log('PUT SourceObject: ', extensionStateFront.current_sourceObject)
	await dbisWe.Content_UpdateOnContentObject(extensionStateFront.current_sourceObject);


}




function sourceToggleClicked(event) {
	// sourcePropertiesButton.style.backgroundColor = 'rgba(26, 133, 180, 0.568)';
	// sourceSearchButton.style.backgroundColor = 'rgba(26, 133, 180, 0.568)';

	sourcePropertiesButton.classList.remove('ae-sourceButtonOff');
	sourcePropertiesButton.classList.remove('ae-sourceButtonOn');
	sourceSearchButton.classList.remove('ae-sourceButtonOff');
	sourceSearchButton.classList.remove('ae-sourceButtonOn');


	// sourceSearchInput.classList.add('ae-displayNone');
	// sourceSearchInput.classList.remove('ae-centerWithFlex');
	sourceSearchTable.classList.add('ae-displayNone');

	sourcePropertiesTable.classList.add('ae-displayNone');




	if (event.target.id === 'ae-sourceSearchButton') {
		sourceSearchButton.classList.add('ae-sourceButtonOn');
		sourcePropertiesButton.classList.add('ae-sourceButtonOff');

		// sourceSearchInput.classList.remove('ae-displayNone');
		// sourceSearchInput.classList.add('ae-centerWithFlex');
		sourceSearchTable.classList.remove('ae-displayNone');
	}
	else {
		sourceSearchButton.classList.add('ae-sourceButtonOff');
		sourcePropertiesButton.classList.add('ae-sourceButtonOn');

		sourcePropertiesTable.classList.remove('ae-displayNone');
	}

}