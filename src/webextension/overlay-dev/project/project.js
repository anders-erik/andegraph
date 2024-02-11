

let searchButton;
let propertiesButton;

let searchInput;
let searchTable;
let propertiesTable;

let focusProjectSearch = false;


function initProject() {

	// if (!extensionStateFront.active) {
	// 	console.log('STATE INACTIVE')

	// 	document.getElementById('contextOverlay').style.display = 'none';
	// }

	searchButton = document.getElementById('searchButton');
	propertiesButton = document.getElementById('propertiesButton');

	searchInput = document.getElementById('searchInput');
	searchTable = document.getElementById('searchTable');
	propertiesTable = document.getElementById('propertiesTable');

	searchButton.addEventListener('click', projectToggleClicked);
	propertiesButton.addEventListener('click', projectToggleClicked);

	searchInput.addEventListener('focus', searchProjectIn);
	searchInput.addEventListener('focusout', searchProjectOut);

	console.log('INTINTINTITNIT')

	keyDownDuringSearch();
}


function searchProjectIn() {
	focusProjectSearch = true;
	if (searchInput.textContent == '') {
		searchInput.innerHTML = '<br>';
		// setInterval(() => { searchInput.innerHTML += '<br>' }, 50);
	}
	console.log('focus search ')
	// searchInput.addEventListener('keypress', keyPressDuringSearch)
	searchInput.addEventListener('keydown', keyDownDuringSearch)
	keyDownDuringSearch();
}

function searchProjectOut() {
	focusProjectSearch = false;
	// console.log('focusout search ')
	// searchInput.removeEventListener('keypress', keyPressDuringSearch)
	searchInput.addEventListener('keydown', keyDownDuringSearch)
}

let lastSearchString = '';
// Perform search with slight delay to make sure new input is written to contentEditanle input
function keyDownDuringSearch(keyEvent) {
	// keyEvent.preventDefault();
	setTimeout(() => {

		// console.log()
		lastSearchString = searchInput.textContent;
		dbisWe.Project_SelectLikeString(lastSearchString)
			.then((data) => {
				// console.log(data)
				populateChildTable(data);
			})
	}, 100);

}

function populateChildTable(childObjects) {
	// console.log('populate with children dones', childObjects)

	let tbody = document.getElementById('searchTable-tbody');
	tbody.innerHTML = '';

	for (let childObject of childObjects) {
		let tableRowHtml = `
                
                <th data-Uuid="${childObject.Uuid}">${childObject.Table}</th>
                <td data-Uuid="${childObject.Uuid}">${childObject.Title}</td>

            `;
		let tr = document.createElement('tr');
		tr.id = 'projectSearchNode-' + childObject.Uuid;
		tr.nodeObject = childObject;
		// tr.dataset.Node = 1;
		// tr.dataset.Uuid = childObject.Uuid;
		tr.setAttribute('data-Node', '1');
		tr.setAttribute('data-Uuid', childObject.Uuid);
		tr.tabIndex = 0;
		tr.innerHTML = tableRowHtml;
		tr.addEventListener('click', clickProjectRow);
		// tr.contentEditable = 'True';

		tbody.append(tr);
		// console.log(tr)
	}
	// console.table(childObjects)

}

function clickProjectRow(event) {
	// console.log(event.target.dataset.Uuid)
	if (event.target.dataset.node != '1') {
		console.log('NOT ELEMENT WITH NODE OBJECT')

		let nodeRow = document.getElementById('projectSearchNode-' + event.target.dataset.uuid)

		// console.log(nodeRow.nodeObject)

		// extensionStateFront.current_projectUuid = nodeRow.dataset.Uuid;
		extensionStateFront.current_projectUuid = nodeRow.nodeObject.Uuid;
		extensionStateFront.current_projectObject = nodeRow.nodeObject;
		document.getElementById('titleDiv').textContent = nodeRow.nodeObject.Title;
		// extensionStateFront.current_projectUuid = event.target.dataset.uuid;
		console.log(extensionStateFront)
		writeStateFromFront();
	}
	else {
		console.log('ELMENET CONTAINS NODEOBJECTSS')
	}



}



function projectToggleClicked(event) {
	// propertiesButton.style.backgroundColor = 'rgba(26, 133, 180, 0.568)';
	// searchButton.style.backgroundColor = 'rgba(26, 133, 180, 0.568)';

	propertiesButton.classList.remove('projectButtonOff');
	propertiesButton.classList.remove('projectButtonOn');
	searchButton.classList.remove('projectButtonOff');
	searchButton.classList.remove('projectButtonOn');


	searchInput.classList.add('displayNone');
	searchInput.classList.remove('centerWithFlex');
	searchTable.classList.add('displayNone');

	propertiesTable.classList.add('displayNone');




	if (event.target.id === 'searchButton') {
		searchButton.classList.add('projectButtonOn');
		propertiesButton.classList.add('projectButtonOff');

		searchInput.classList.remove('displayNone');
		searchInput.classList.add('centerWithFlex');
		searchTable.classList.remove('displayNone');
	}
	else {
		searchButton.classList.add('projectButtonOff');
		propertiesButton.classList.add('projectButtonOn');

		propertiesTable.classList.remove('displayNone');
	}

}