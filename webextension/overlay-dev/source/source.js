

let sourceSearchButton;
let sourcePropertiesButton;
let sourceNewButton;

let sourceSearchInput;
let sourceChildTable;
let sourcePropertiesTable;

let focusSourceSearch = false;


function initSource() {

	// if (!extensionStateFront.active) {
	// 	console.log('STATE INACTIVE')

	// 	document.getElementById('contextOverlay').style.display = 'none';
	// }

	// writeCurrentSourceObjectToDom();


	sourceSearchButton = document.getElementById('ae-sourceSearchButton');
	sourcePropertiesButton = document.getElementById('ae-sourcePropertiesButton');
	sourceNewButton = document.getElementById('ae-sourceNewButton');

	// sourceSearchInput = document.getElementById('ae-sourceSearchInput');
	sourceChildTable = document.getElementById('ae-sourceChildTable');
	sourcePropertiesTable = document.getElementById('ae-sourcePropertiesTable');

	sourceSearchButton.addEventListener('click', sourceToggleClicked);
	sourcePropertiesButton.addEventListener('click', sourceToggleClicked);
	sourceNewButton.addEventListener('click', addNewSourceToCurrentProject);




	// console.log(JSON.stringify(extensionStateFront.current_sourceObject) == '{}')
	// console.log(Object.keys(extensionStateFront.current_sourceObject).length === 0)

	let sourceExistsInState = !(Object.keys(extensionStateFront.current_sourceObject).length === 0);

	if (sourceExistsInState) {
		// console.log('SOURCE DETECTED ON INIT, BUT NO LOAD IMPLEMENTED')
		writeCurrentSourceObjectToDom();
		populateSourceChildTableFromState();
	}

}






/* 

	DOM EVENTS

*/



async function editableSourcePropertyFocusOut() {

	copySourcePropertiesFromDomToState()

	await putCurrentSourceObject();

	// console.log('editableSourcePRoperty - fcous out')

}


// function clickSourceChildRow(event) {

// 	// console.log(event.target.dataset.Uuid)
// 	if (event.target.dataset.node != '1') {
// 		console.log('NOT ELEMENT WITH NODE OBJECT')

// 		let nodeRow = document.getElementById('ae-sourceSearchNode-' + event.target.dataset.uuid)

// 		// console.log(nodeRow.nodeObject)

// 		// extensionStateFront.current_sourceUuid = nodeRow.dataset.Uuid;
// 		extensionStateFront.current_sourceUuid = nodeRow.nodeObject.Uuid;
// 		extensionStateFront.current_sourceObject = nodeRow.nodeObject;
// 		document.getElementById('aa-sourceTitle').textContent = nodeRow.nodeObject.Title;
// 		// extensionStateFront.current_sourceUuid = event.target.dataset.uuid;
// 		console.log(extensionStateFront)
// 		//writeStateFromFront();

// 		writeCurrentSourceObjectToDom();


// 	}
// 	else {
// 		console.log('ELMENET CONTAINS NODEOBJECTSS')
// 	}

// }




function sourceToggleClicked(event) {


	sourcePropertiesButton.classList.remove('ae-sourceButtonOn');
	sourceSearchButton.classList.remove('ae-sourceButtonOn');


	sourceChildTable.classList.add('ae-displayNone');
	sourcePropertiesTable.classList.add('ae-displayNone');


	if (event.target.id === 'ae-sourceSearchButton') {

		sourceSearchButton.classList.add('ae-sourceButtonOn');
		sourceChildTable.classList.remove('ae-displayNone');

	}
	else {

		sourcePropertiesButton.classList.add('ae-sourceButtonOn');
		sourcePropertiesTable.classList.remove('ae-displayNone');

	}

}












/* 

	READ WRITE DOM

*/

// function copySourceChildTableFromDom() {
// 	// console.log('populate with children dones', childObjects)

// 	// console.log('childObjects', childObjects)

// 	let childContentEdgeObjects = extensionStateFront.current_sourceChildContentEdges;


// 	let tbody = document.getElementById('ae-sourceChildTable-tbody');

	

// 	// let rows = tbody.children();
// 	let rowCount = 0;
// 	for (let sourceRow of Array.from(tbody.children)) {
		
// 		// console.log(sourceRow)
// 		let kids = sourceRow.children;

// 		// console.log(sourceRow.aaa)
// 		// console.log();
// 		// console.log(sourceRow.dataset.uuid);
// 		// console.log(kids[0].textContent, kids[1].textContent, kids[2].textContent)

// 		for (let _childContentEdgeObject of childContentEdgeObjects){
// 			if (sourceRow.dataset.uuid == _childContentEdgeObject.content.Uuid){
// 				// console.log("MATCH ", sourceRow.dataset.uuid)
// 				_childContentEdgeObject.content.Title = kids[2].textContent;
// 			}
// 		}
		
// 	}

// 	return;


// 	tbody.innerHTML = '';

// 	for (let childContentEdgeObject of childContentEdgeObjects) {
// 		let tableRowHtml = `
                
//                 <th class="ae-element ae-sourceChildTable-Table" data-Uuid="${childContentEdgeObject.content.Uuid}">${childContentEdgeObject.content.Table}</th>
// 				<td class="ae-element ae-sourceChildTable-Type" data-Uuid="${childContentEdgeObject.content.Uuid}">${childContentEdgeObject.content.Type}</td>
//                 <td class="ae-element ae-sourceChildTable-Title" data-Uuid="${childContentEdgeObject.content.Uuid}" contenteditable="true">${childContentEdgeObject.content.Title}</td>

//             `;
// 		let tr = document.createElement('tr');
// 		tr.id = 'ae-sourceSearchNode-' + childContentEdgeObject.content.Uuid;
// 		tr.nodeObject = childContentEdgeObject;
// 		// tr.dataset.Node = 1;
// 		// tr.dataset.Uuid = childObject.Uuid;
// 		tr.setAttribute('data-Node', '1');
// 		tr.setAttribute('data-Uuid', childContentEdgeObject.content.Uuid);
// 		tr.tabIndex = 0;
// 		tr.innerHTML = tableRowHtml;
// 		// tr.addEventListener('click', clickSourceChildRow);
// 		tr.addEventListener('click', (event) => { console.log(event.target.parentNode.nodeObject) });
// 		tr.addEventListener("focusout", (event) => {

// 			putCurrentSourceObject();
// 		});
// 		// tr.contentEditable = 'True';

// 		tbody.append(tr);
// 		// console.log(tr)
// 	}
// 	// console.table(childObjects)

// }



function populateSourceChildTableFromState() {
	// console.log('populate with children dones', childObjects)

	// console.log('childObjects', childObjects)

	let childContentEdgeObjects = extensionStateFront.current_sourceChildContentEdges;


	let tbody = document.getElementById('ae-sourceChildTable-tbody');
	tbody.innerHTML = '';

	for (let childContentEdgeObject of childContentEdgeObjects) {
		let tableRowHtml = `
                
                <th class="ae-element ae-sourceChildTable-Table" data-Uuid="${childContentEdgeObject.content.Uuid}">${childContentEdgeObject.content.Table}</th>
				<td class="ae-element ae-sourceChildTable-Type" data-Uuid="${childContentEdgeObject.content.Uuid}">${childContentEdgeObject.content.Type}</td>
                <td class="ae-element ae-sourceChildTable-Title" data-Uuid="${childContentEdgeObject.content.Uuid}" contenteditable="true">${childContentEdgeObject.content.Title}</td>

            `;
		let tr = document.createElement('tr');
		tr.id = 'ae-sourceSearchNode-' + childContentEdgeObject.content.Uuid;
		tr.nodeObject = childContentEdgeObject;
		// tr.aaa = "asd";
		tr.setAttribute('data-fuck', 'f*ck');
		// tr.dataset.Node = 1;
		// tr.dataset.Uuid = childObject.Uuid;
		tr.setAttribute('data-Node', '1');
		tr.setAttribute('data-Uuid', childContentEdgeObject.content.Uuid);
		tr.tabIndex = 0;
		tr.innerHTML = tableRowHtml; 
		// tr.addEventListener('click', clickSourceChildRow);
		tr.addEventListener('click', (event) => { console.log(event.target.parentNode.nodeObject) });
		// Targets only the last (i.e. Title) column
		tr.lastElementChild.addEventListener("focusout", async (event) => {
			
			let uuid = event.target.parentElement.nodeObject.content.Uuid;
			let contentObject = event.target.parentElement.nodeObject.content;
			contentObject.Title = event.target.textContent;
			// console.log("CCCCCCCCCC", contentObject)
			let putContentObject = await dbis.Content_UpdateWithContentObject(contentObject);

			let fetchedContentObject = await dbis.Content_SelectOnUuid(uuid);
			
			await fetchCurrentSourceChildrenThenWriteToStates();
			populateSourceChildTableFromState();

			// console.log("DDDDDDDDDD", fetchedContentObject)
			// copySourceChildTableFromDom();
			
			// putCurrentSourceObject();
			// fetchCurrentSourceChildrenThenWriteToStates();
			// populateSourceChildTableFromState();
		});
		// tr.contentEditable = 'True';

		tbody.append(tr);
		// console.log(tr)
	}
	// console.table(childObjects)

}




function writeCurrentSourceObjectToDom() {

	let sourceObject = extensionStateFront.current_sourceObject;
	// extensionStateFront.current_sourceUuid = sourceObject.Uuid;

	document.getElementById('aa-sourceTitle').textContent = sourceObject.Title;

	let tbody = document.getElementById('ae-sourcePropertiesTable-tbody');
	tbody.innerHTML = '';

	for (const key in sourceObject) {
		// console.log(`${key}: ${sourceObject[key]}`);
		if (key === 'Type' || key === 'Title' || key === 'Url' || key === 'IAmSource') {

			tbody.innerHTML += `
		
			<tr>
				<th id=ae-sourcePropTable-${key}-key class="ae-element" >${key}</th>
				<td id=ae-sourcePropTable-${key}-value class="ae-editableSourceProperty ae-element" contenteditable="true" >${sourceObject[key]}</td>
			</tr>
		
		`;

		}
		else {
			tbody.innerHTML += `
		
			<tr>
				<th id=ae-sourcePropTable-${key}-key class="ae-element" >${key}</th>
				<td id=ae-sourcePropTable-${key}-value class="ae-element">${sourceObject[key]}</td>
			</tr>
		
		`;
		}

	}

	// console.log(document.querySelectorAll('#ae-sourcePropertiesTable tbody tr'))
	let editableSourcePropertyTds = document.querySelectorAll('.ae-editableSourceProperty');
	// console.log(editableSourcePropertyTd)
	for (let editableSourcePropertyTd of editableSourcePropertyTds) {
		// console.log(editableSourcePropertyTd.textContent);
		// console.log(propertyRow.textContent.length)
		// editableSourcePropertyTd.addEventListener('focusout', readSourcePropertiesFromDomAndWritePut)
		editableSourcePropertyTd.addEventListener('focusout', editableSourcePropertyFocusOut)

	}

}


function copySourcePropertiesFromDomToState() {



	extensionStateFront.current_sourceObject.Uuid = document.getElementById('ae-sourcePropTable-Uuid-value').textContent;
	extensionStateFront.current_sourceObject.Table = document.getElementById('ae-sourcePropTable-Table-value').textContent;
	extensionStateFront.current_sourceObject.Type = document.getElementById('ae-sourcePropTable-Type-value').textContent;
	extensionStateFront.current_sourceObject.Title = document.getElementById('ae-sourcePropTable-Title-value').textContent;
	extensionStateFront.current_sourceObject.TimeCreated = document.getElementById('ae-sourcePropTable-TimeCreated-value').textContent;
	extensionStateFront.current_sourceObject.TimeLastChange = document.getElementById('ae-sourcePropTable-TimeLastChange-value').textContent;
	extensionStateFront.current_sourceObject.Url = document.getElementById('ae-sourcePropTable-Url-value').textContent;
	extensionStateFront.current_sourceObject.IAmSource = document.getElementById('ae-sourcePropTable-IAmSource-value').textContent;

	//writeStateFromFront();


	// console.log(extensionStateFront.current_sourceObject)
}








/* 

	ADD FUNCTIONS

*/



async function addNewSourceToCurrentProject() {

	// if (extensionStateFront.current_projectObject.Uuid == 0 || extensionStateFront.current_projectObject.Uuid === undefined) {
	if (extensionStateFront.current_projectObject.Uuid === undefined) {
		console.log('NO PROJECT SELECTED')
	}
	else {
		console.log()
		console.log('NEW SOURCE')
		// console.log('Url:', window.location.href)
		// console.log('Title:', document.title)
		// let newSourceContentEdge = await dbisWe.Content_InsertChildUuidTable(extensionStateFront.current_projectObject.Uuid, 'Source')
		let newSourceContentEdge = await dbis.ContentEdge_InsertAdjacentToUuidIntoTable(extensionStateFront.current_projectObject.Uuid, 1, 'Source', '', '', '/');

		let newSourceObject = newSourceContentEdge.content;
		newSourceObject.Url = window.location.href;
		newSourceObject.Title = document.title;
		// console.log('new source object: ', newSourceObject)

		// console.log(newSourceObject)

		extensionStateFront.current_sourceObject = newSourceObject;

		// extensionStateFront.current_sourceObject = newSourceObject.Content;

		await putCurrentSourceObject();

		writeCurrentSourceObjectToDom();

		// dbisWe.Review_InsertScheduleOnUuid(newSourceObject.Uuid, '')
		dbis.Review_InsertScheduleOnUuid(newSourceObject.Uuid, '');

		await fetchCurrentProjectChildrenThenWriteToStates();


		writeProjectChildrenFromStateToDom()


		//writeStateFromFront();

		// Review_InsertScheduleOnUuid(Uuid, scheduleType)

		// writeCurrentSourceObjectToDom();

		// no chilren to fetch yet!

	}

}











/* 

	FETCH FUNCTIONS

*/

async function fetchCurrentSourceChildrenThenWriteToStates() {


	// extensionStateFront.current_sourceChildContentEdges = await dbisWe.NodeEdge_SelectChildOfUuid(extensionStateFront.current_sourceObject.Uuid);
	extensionStateFront.current_sourceChildContentEdges = await dbis.ContentEdge_SelectChildOfUuid(extensionStateFront.current_sourceObject.Uuid);


	//writeStateFromFront();


}

async function putCurrentSourceObject() {
	// console.log('Posting current source properties', readSourcePropertiesFromDom())
	// console.log('PUT SourceObject: ', extensionStateFront.current_sourceObject)

	console.log(extensionStateFront.current_sourceObject)
	// await dbisWe.Content_UpdateOnContentObject(extensionStateFront.current_sourceObject);
	await dbis.Content_UpdateWithContentObject(extensionStateFront.current_sourceObject);

}











