

let lastProjectSearchString = '';


function searchProjectIn() {
	// focusProjectSearch = true;
	if (projectSearchInput.textContent == '') {
		projectSearchInput.innerHTML = '<br><br>';
		// setInterval(() => { searchInput.innerHTML += '<br>' }, 50);
	}
	console.log('focus search ')
	// projectSearchInput.addEventListener('keypress', keyPressDuringSearch)
	projectSearchInput.addEventListener('keydown', keyDownDuringSearch)
	keyDownDuringSearch();
}


function searchProjectOut() {
	// focusProjectSearch = false;
	console.log('focusout search ')
	// projectSearchInput.removeEventListener('keypress', keyPressDuringSearch)
	projectSearchInput.removeEventListener('keydown', keyDownDuringSearch)
}


// Perform search with slight delay to make sure new input is written to contentEditanle input
function keyDownDuringSearch(keyEvent) {
	// keyEvent.preventDefault();
	setTimeout(() => {

		// console.log()
		lastProjectSearchString = projectSearchInput.textContent;
		dbisWe.Project_SelectLikeString(lastProjectSearchString)
			.then((data) => {
				// console.log(data)
				populateChildTable(data);
			})
	}, 100);

}

function populateChildTable(childObjects) {
	// console.log('populate with children dones', childObjects)

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

		let nodeRow = document.getElementById('ae-projectSearchNode-' + event.target.dataset.uuid)

		// console.log(nodeRow.nodeObject)

		// extensionStateFront.current_projectUuid = nodeRow.dataset.Uuid;
		extensionStateFront.current_projectUuid = nodeRow.nodeObject.Uuid;
		extensionStateFront.current_projectObject = nodeRow.nodeObject;
		document.getElementById('aa-projectTitle').textContent = nodeRow.nodeObject.Title;
		// extensionStateFront.current_projectUuid = event.target.dataset.uuid;
		console.log(extensionStateFront)
		writeStateFromFront();

		writeProjectPropertiesToDom();


	}
	else {
		console.log('ELMENET CONTAINS NODEOBJECTSS')
	}



}

