

	if(document.getElementById('ae-contextOverlay') != undefined){
		// document.remove(document.getElementById('contextOverlay'))
		// document.getElementById('contextOverlay').remove()
		window.location.reload();
	}

	



document.body.innerHTML += `




	<div id="ae-contextOverlay" class="ae-element">
		<div id="ae-overlayRightPanel" class="ae-element">



			<div id="ae-projectContainer" class="ae-panelContainer ae-element">

				<div id="ae-projectOuter" class="ae-element">
					<div id="ae-projectInner" class="ae-element">

						<div id="aa-projectTitle" class="ae-element">Placeholder Project Title</div>

						<div id="ae-projectButtonContainer" class="ae-element">
							<div id="ae-projectSearchButton"
								class="ae-projectButton ae-projectButtonOn ae-centerWithFlex ae-element">
								Search</div>
							<div id="ae-projectPropertiesButton"
								class="ae-projectButton ae-projectButtonOff ae-centerWithFlex ae-element">
								Properties
							</div>
							<div id="ae-projectNewButton" class="ae-projectButton ae-centerWithFlex ae-element">
								N
							</div>
						</div>

						<div id="ae-projectTableContainer" class="ae-element">

							<div id="ae-projectSearchInput" class="ae-centerWithFlex ae-element" contenteditable="true"
								tabindex="0">
							</div>
							<table id="ae-projectSearchTable" class="ae-element">
								<thead id="ae-projectSearchTable-thead" class="ae-element">
									<tr id="ae-projectSearchTable-thead-tr" class="ae-element">
										<th class="ae-element">Table</th>
										<th class="ae-element">Title</th>
									</tr>
								</thead>
								<tbody id="ae-projectSearchTable-tbody" class="ae-element">
									<tr>
										<th class="ae-element">Data 1</th>
										<td class="ae-element">Data 2</td>
									</tr>
								</tbody>
							</table>


							<table id="ae-projectPropertiesTable" class="ae-displayNone ae-element">
								<thead id="ae-projectPropertiesTable-thead" class="ae-element">
									<tr id="ae-projectPropertiesTable-thead-tr" class="ae-element">
										<th class="ae-element">Key</th>
										<th class="ae-element">Value</th>
									</tr>
								</thead>
								<tbody id="ae-projectPropertiesTable-tbody" class="ae-element">
									<!-- <tr>
										<th>Uuid</th>
										<td>121404555264</td>
									</tr>
									<tr>
										<th>Table</th>
										<td>Project</td>
									</tr>
									<tr>
										<th>Type</th>
										<td></td>
									</tr>
									<tr>
										<th>Title</th>
										<td>projproj titletitle aaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaa</td>
									</tr>
									<tr>
										<th>TimeCreated</th>
										<td>1707415749</td>
									</tr>
									<tr>
										<th>TimeLastChange</th>
										<td>1707415749</td>
									</tr>
									<tr>
										<th>Goal</th>
										<td></td>
									</tr> -->
								</tbody>
							</table>

						</div>

					</div>
				</div>
			</div>





			<div id="ae-sourceContainer" class="ae-panelContainer ae-element">
				<div id="ae-sourceOuter" class="ae-element">
					<div id="ae-sourceInner" class="ae-element">

						<div id="aa-sourceTitle" class="ae-element">Placeholder Source Title</div>

						<div id="ae-sourceButtonContainer" class="ae-element">
							<div id="ae-sourceSearchButton"
								class="ae-sourceButton ae-sourceButtonOn ae-centerWithFlex ae-element">
								Children</div>
							<div id="ae-sourcePropertiesButton"
								class="ae-sourceButton ae-sourceButtonOff ae-centerWithFlex ae-element">
								Properties
							</div>
							<div id="ae-sourceNewButton" class="ae-sourceButton ae-centerWithFlex ae-element">
								N
							</div>
						</div>

						<div id="ae-sourceTableContainer" class="ae-element">


							<table id="ae-sourceSearchTable" class="ae-element">
								<thead id="ae-sourceSearchTable-thead" class="ae-element">
									<tr id="ae-sourceSearchTable-thead-tr" class="ae-element">
										<th class="ae-element">Table</th>
										<th class="ae-element">Title</th>
									</tr>
								</thead>
								<tbody id="ae-sourceSearchTable-tbody" class="ae-element">
									<tr>
										<th class="ae-element">Data 1</th>
										<td class="ae-element">Data 2</td>
									</tr>
								</tbody>
							</table>


							<table id="ae-sourcePropertiesTable" class="ae-displayNone ae-element">
								<thead id="ae-sourcePropertiesTable-thead" class="ae-element">
									<tr id="ae-sourcePropertiesTable-thead-tr" class="ae-element">
										<th class="ae-element">Key</th>
										<th class="ae-element">Value</th>
									</tr>
								</thead>
								<tbody id="ae-sourcePropertiesTable-tbody" class="ae-element">
									<!-- <tr>
														<th>Uuid</th>
														<td>121404555264</td>
													</tr>
													<tr>
														<th>Table</th>
														<td>Source</td>
													</tr>
													<tr>
														<th>Type</th>
														<td></td>
													</tr>
													<tr>
														<th>Title</th>
														<td>projproj titletitle aaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaa</td>
													</tr>
													<tr>
														<th>TimeCreated</th>
														<td>1707415749</td>
													</tr>
													<tr>
														<th>TimeLastChange</th>
														<td>1707415749</td>
													</tr>
													<tr>
														<th>Goal</th>
														<td></td>
													</tr> -->
								</tbody>
							</table>

						</div>

					</div>
				</div>
			</div>








			<div id="ae-clipboardContainer" class="ae-panelContainer ae-element">clipboardContainer</div>

		</div>
	</div>





		`
	



let styleSheet = document.createElement("style");
styleSheet.innerText = `

.ae-displayNone {
	display: none;
}

.ae-centerWithFlex {
	display: flex;
	justify-content: center;
	align-items: center;
}

.ae-projectButtonOn {
	background-color: rgb(26, 114, 192);
	box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.638);
}

.ae-projectButtonOff {
	background-color: rgb(89, 148, 206);
}

.ae-sourceButtonOn {
	background-color: rgb(26, 114, 192);
	box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.638);
}

.ae-sourceButtonOff {
	background-color: rgb(89, 148, 206);
}

.ae-element {
	font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
	color: rgb(23, 19, 19);
	font-weight: 400;

}
#ae-projectOuter {
	height: 100%;
	width: 100%;
}


#ae-projectInner {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
}

#aa-projectTitle {
	width: 90%;
	height: 30px;
	min-height: 30px;


	margin: 3px;
	padding: 6px;
	border-radius: 5px;

	border: solid rgba(67, 53, 53, 0.599) 1px;
	background-color: rgb(128, 191, 246);

	display: flex;
	justify-content: center;
	align-items: center;

	letter-spacing: 1px;
	text-align: center;
	font-weight: 600;

}

#ae-projectButtonContainer {
	width: 100%;
	height: 30px;

	margin: 5px 0px 5px 0px;

	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
}

#ae-projectSearchButton {
	/* background-color: rgba(26, 133, 180, 0.568); */
	width: 35%;
	height: 20px;
}

#ae-projectPropertiesButton {
	/* background-color: rgba(26, 133, 180, 0.568); */
	width: 35%;
	height: 20px;
}

#ae-projectNewButton {
	background-color: darkblue;
	color: aliceblue;
	width: 20px;
}

.ae-projectButton {
	margin: 3px;
	padding: 3px;
	border-radius: 5px;

}

.ae-projectButton:hover {
	cursor: pointer;
}

.ae-projectButton.selected {}



#ae-projectTableContainer {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	flex-grow: 1;
	box-shadow: inset 0 0 0 2px rgb(0, 0, 0);
	overflow-y: scroll;

}






/* SEARCH TABLE */


#ae-projectSearchInput {

	width: 90%;
	height: 1.5rem;
	min-height: 1.5rem;

	pointer-events: all;

	margin: 5px;
	padding: 3px;
	border-radius: 5px;

	background-color: rgb(180, 189, 198);

	/* display: none; */
	/* display: flex;
	justify-content: center;
	align-items: center; */
}


#ae-projectSearchTable {
	width: 100%;
	/* display: none; */
	/* display: inline; */
	/* flex-direction: column;
	justify-content: start; */
	border-collapse: collapse;
	background-color: rgb(61, 178, 228);
	margin: 5px 5px 5px 5px;
}

#ae-projectSearchTable thead {
	/* background-color: rgb(85, 123, 177); */
}

#ae-projectSearchTable thead th {
	padding: 3px;
	background-color: rgb(85, 123, 177);
	box-shadow: inset 0 0 0 1px rgb(0, 0, 0);
}


#ae-projectSearchTable tbody {
	background-color: rgb(109, 58, 58);
	/* padding: 30px; */
}


#ae-projectSearchTable tbody tr {
	font-size: 0.9rem;

	/* border: solid black 1px;
	background-color: rgb(106, 168, 80);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408); */

}

/* #searchTable tbody tr :active {
	border: solid black 3px;
} */

#ae-projectSearchTable tbody tr :hover {
	cursor: pointer;
}

#ae-projectSearchTable tbody th {
	/* border: solid black 1px; */
	padding: 3px;
	background-color: rgb(83, 133, 203);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408);

	width: 100px;

}

#ae-projectSearchTable tbody td {
	/* border: solid black 1px; */
	padding: 3px;
	background-color: rgb(129, 151, 183);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408);

}









/* PROPERTIES TABLE */



#ae-projectPropertiesTable {
	/* display: none; */
	/* display: block; */

	border-collapse: collapse;
	width: 100%;
	background-color: rgb(61, 178, 228);

	margin: 5px 0px 5px 0px;
	/* 
	display: flex;
	flex-direction: column;
	justify-content: start; */
}

#ae-projectPropertiesTable thead {
	/* background-color: rgb(85, 123, 177); */
}

#ae-projectPropertiesTable thead th {
	padding: 3px;
	background-color: rgb(85, 123, 177);
	box-shadow: inset 0 0 0 1px rgb(0, 0, 0);
}

/* #ae-projectPropertiesTable-thead {

	background-color: rgb(109, 58, 58);
} */

#ae-projectPropertiesTable tbody {
	background-color: rgb(109, 58, 58);
	/* padding: 30px; */
}

#ae-projectPropertiesTable tbody tr {
	font-size: 0.9rem;

	/* border: solid black 1px;
	background-color: rgb(106, 168, 80);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408); */

}

#ae-projectPropertiesTable tbody th {
	/* border: solid black 1px; */
	padding: 3px;
	background-color: rgb(83, 133, 203);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408);

	width: 100px;

}

#ae-projectPropertiesTable tbody td {
	/* border: solid black 1px; */
	padding: 3px;
	background-color: rgb(129, 151, 183);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408);

}

#ae-projectPropertiesTable tbody td.ae-editableProjectProperty {
	background-color: rgb(140, 166, 205);
	box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.408);
}
#ae-sourceOuter {
	height: 100%;
	width: 100%;
}


#ae-sourceInner {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
}

#aa-sourceTitle {
	width: 90%;
	height: 30px;
	min-height: 30px;


	margin: 3px;
	padding: 6px;
	border-radius: 5px;

	border: solid rgba(67, 53, 53, 0.599) 1px;
	background-color: rgb(128, 191, 246);

	display: flex;
	justify-content: center;
	align-items: center;

	letter-spacing: 1px;
	text-align: center;
	font-weight: 600;

}

#ae-sourceButtonContainer {
	width: 100%;
	height: 30px;

	margin: 5px 0px 5px 0px;

	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
}

#ae-sourceSearchButton {
	/* background-color: rgba(26, 133, 180, 0.568); */
	width: 35%;
	height: 20px;
}

#ae-sourcePropertiesButton {
	/* background-color: rgba(26, 133, 180, 0.568); */
	width: 35%;
	height: 20px;
}

#ae-sourceNewButton {
	background-color: darkblue;
	color: aliceblue;
	width: 20px;
}

.ae-sourceButton {
	margin: 3px;
	padding: 3px;
	border-radius: 5px;

}

.ae-sourceButton:hover {
	cursor: pointer;
}

.ae-sourceButton.selected {}



#ae-sourceTableContainer {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	flex-grow: 1;
	box-shadow: inset 0 0 0 2px rgb(0, 0, 0);
	overflow-y: scroll;

}






/* SEARCH TABLE */


#ae-sourceSearchInput {

	width: 90%;
	height: 1.5rem;
	min-height: 1.5rem;

	pointer-events: all;

	margin: 5px;
	padding: 3px;
	border-radius: 5px;

	background-color: rgb(180, 189, 198);

	/* display: none; */
	/* display: flex;
	justify-content: center;
	align-items: center; */
}


#ae-sourceSearchTable {
	width: 100%;
	/* display: none; */
	/* display: inline; */
	/* flex-direction: column;
	justify-content: start; */
	border-collapse: collapse;
	background-color: rgb(61, 178, 228);
	margin: 5px 5px 5px 5px;
}

#ae-sourceSearchTable thead {
	/* background-color: rgb(85, 123, 177); */
}

#ae-sourceSearchTable thead th {
	padding: 3px;
	background-color: rgb(85, 123, 177);
	box-shadow: inset 0 0 0 1px rgb(0, 0, 0);
}


#ae-sourceSearchTable tbody {
	background-color: rgb(109, 58, 58);
	/* padding: 30px; */
}


#ae-sourceSearchTable tbody tr {
	font-size: 0.9rem;

	/* border: solid black 1px;
	background-color: rgb(106, 168, 80);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408); */

}

/* #searchTable tbody tr :active {
	border: solid black 3px;
} */

#ae-sourceSearchTable tbody tr :hover {
	cursor: pointer;
}

#ae-sourceSearchTable tbody th {
	/* border: solid black 1px; */
	padding: 3px;
	background-color: rgb(83, 133, 203);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408);

	width: 100px;

}

#ae-sourceSearchTable tbody td {
	/* border: solid black 1px; */
	padding: 3px;
	background-color: rgb(129, 151, 183);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408);

}









/* PROPERTIES TABLE */



#ae-sourcePropertiesTable {
	/* display: none; */
	/* display: block; */

	border-collapse: collapse;
	width: 100%;
	background-color: rgb(61, 178, 228);

	margin: 5px 0px 5px 0px;
	/* 
	display: flex;
	flex-direction: column;
	justify-content: start; */
}

#ae-sourcePropertiesTable thead {
	/* background-color: rgb(85, 123, 177); */
}

#ae-sourcePropertiesTable thead th {
	padding: 3px;
	background-color: rgb(85, 123, 177);
	box-shadow: inset 0 0 0 1px rgb(0, 0, 0);
}

/* #ae-sourcePropertiesTable-thead {

	background-color: rgb(109, 58, 58);
} */

#ae-sourcePropertiesTable tbody {
	background-color: rgb(109, 58, 58);
	/* padding: 30px; */
}

#ae-sourcePropertiesTable tbody tr {
	font-size: 0.9rem;

	/* border: solid black 1px;
	background-color: rgb(106, 168, 80);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408); */

}

#ae-sourcePropertiesTable tbody th {
	/* border: solid black 1px; */
	padding: 3px;
	background-color: rgb(83, 133, 203);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408);

	width: 100px;

}

#ae-sourcePropertiesTable tbody td {
	/* border: solid black 1px; */
	padding: 3px;
	background-color: rgb(129, 151, 183);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408);

}

#ae-sourcePropertiesTable tbody td.ae-editablesourceProperty {
	background-color: rgb(140, 166, 205);
	box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.408);
}
#ae-contextOverlay {
	width: calc(100%);
	height: calc(100%);
	/* background-color: rgba(0, 0, 0, 0.4); */
	/* border: solid green 3px; */
	box-shadow: inset 0 0 0 4px rgb(20, 194, 20);
	/* margin: 1px; */
	/* padding-right: 5px; */

	/* otherwise clicks won't register on page */
	pointer-events: none;

	display: flex;
	flex-direction: row;
	justify-content: end;
	align-items: center;
	top: 0px;
	left: 0px;
	position: fixed;
	z-index: 100000000;
}

#ae-overlayRightPanel {
	background-color: rgba(77, 44, 44, 0.618);
	height: 98%;
	margin-right: 8px;
	width: 300px;
	overflow-x: hidden;
	box-shadow: 0 0 0 2px rgb(0, 0, 0);

	pointer-events: all;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.ae-panelContainer {
	width: 100%;
	min-width: 250px;
	height: 32%;
	overflow-x: hidden;

	border-radius: 3px;
	background-color: rgb(109, 129, 146);
};
`
document.head.appendChild(styleSheet);

	



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






// VARS
let waitingSecondShift = 0;
let waitingSecondCtrlShift = 0;


function addExtensionActiveEventListener() {

	document.addEventListener('copy', copyEvent)
	document.addEventListener('cut', cutEvent)
	document.addEventListener('paste', pasteEvent)
	document.addEventListener('keydown', keydownActiveExtension)

	console.log('event listerners for active extension added')
}

function removeExtensionActiveEventListener() {

	document.removeEventListener('copy', copyEvent)
	document.removeEventListener('cut', cutEvent)
	document.removeEventListener('paste', pasteEvent)
	document.removeEventListener('keydown', keydownActiveExtension)

	console.log('event listerners for active extension removed')
}








function copyEvent(event) {

	// console.log('copcop')
	// console.log(event.clipboardData )
	// let cbd = event.clipboardData || window.clipboardData
	// let copiedData = cbd.getData('Text');
	// console.log('copiedData', copiedData)

	// browser.runtime.sendMessage( {
	// 	command: "copycopy"
	// });

	console.log('COPYEVENT')


	// navigator.clipboard
	// 	.read()
	// 	.then(
	// 		(clipText) => (console.log(clipText)),
	// 	);

}

function pasteEvent(event) {
	// console.log('pastepaste')
	console.log('PASTE EVENT')
	console.log(event.clipboardData.files[0])
	// let pastedData = event.clipboardData.getData('Text');
	// console.log(pastedData)


}
// const paspas = new ClipboardEvent('paste');
// document.dispatchEvent(paspas);



function cutEvent(event) {
	console.log('CUT EVENT')
}





// document.execCommand('paste')


async function keydownActiveExtension(keyEvent) {



	if (document.activeElement.isContentEditable) {
		// console.log('EDITABLE')
		return;
	}


	if (keyEvent.key == 'Shift') {

		if (keyEvent.ctrlKey) {

			if (waitingSecondCtrlShift == 1) {

				console.log('ctrlshift ctrlshift')
				waitingSecondCtrlShift = 0;

			}
			else {
				waitingSecondCtrlShift = 1;
				setTimeout(() => { waitingSecondCtrlShift = 0 }, 300);
			}

		}
		else {

			if (waitingSecondShift == 1) {

				console.log('shiftshift')
				waitingSecondShift = 0;
				// showOverlay()

			}
			else {
				waitingSecondShift = 1;
				setTimeout(() => { waitingSecondShift = 0 }, 300);
			}


		}

	}


	if (keyEvent.ctrlKey) {

		switch (keyEvent.key) {
			case 'c':
				console.log('Ctrl + c')
				break;
			case '`':
				console.log('Ctrl + `')
				break;
			case '/':
				console.log('Ctrl + /')
				break;
			case '.':
				console.log('Ctrl + .')
				break;
			case ',':
				console.log('Ctrl + ,')
				break;
			case '\\':
				console.log('Ctrl + \\')
				break;
			case '\'':
				console.log('Ctrl + \'')
				break;

			case ';':
				console.log('Ctrl + ;')
				break;

			case '[':
				console.log('Ctrl + [')

				break;

			case ']':
				console.log('Ctrl + ]')
				break;

			default:
				break;
		}
	}



	if (keyEvent.altKey) {

		switch (keyEvent.key) {
			case 'p':
				// console.log('Alt + p')
				console.log(extensionStateFront);
				break;
			case '[':
				console.log('Alt + [')
				break;
			case ']':
				console.log('Alt + ]')
				break;


			default:
				break;
		}
	}




}


















// console.log('dbis-we')



// function fetchData(url) {
// 	return fetch(url)
// 		.then(response => {
// 			if (!response.ok) {
// 				throw new Error('Network response was not ok');
// 			}
// 			return response.json();
// 		})
// 		.catch(error => {
// 			console.error('There was a problem with the fetch operation:', error);
// 		});
// }



const baseUrl = 'http://localhost:3000';
const basePath = '/api/v02'


class dbisWe {

	// static async Content_SelectChildOfUuid(Uuid) { return contentGet('Content-SelectChildOfUuid', {'Uuid': Uuid}) };

	static async Node_SelectChildOfUuid(Uuid) { return nodeGet('Node-SelectChildOfUuid', { 'Uuid': Uuid }) };
	// static async NodeEdge_SelectChildOfUuid(Uuid) { return contentGet('NodeEdge-SelectChildOfUuid', {'Uuid': Uuid}) };

	static async Project_SelectLikeString(searchString) { return await contentGet('Project-SelectLikeString', { 'searchString': searchString }) };

	static async Content_UpdateOnContentObject(contentObject) { return await contentPut('Content-UpdateOnContentObject', contentObject) };

	static async Content_InsertOnTable(table) { return contentPost('Content-InsertOnTable', { 'Table': table }) };

	static async Content_InsertChildUuidTable(Uuid, childTable) { return contentPost('Content-InsertChildUuidTable', { 'Uuid': Uuid, 'Table': childTable }) };
}



async function contentGet(functionstring, paramObject) {
	let url = baseUrl + basePath + `/content/${functionstring}?`;

	for (const [key, value] of Object.entries(paramObject)) {
		// console.log(`${key}: ${value}`);
		url += `${key}=${value}`;
	}

	console.log(url)

	const options = { method: 'GET', body: undefined };
	// console.log(url)
	try {
		const response = await fetch(url, options);
		const data = await response.json();
		// console.log(data)
		return data;
		// console.table(data);
	} catch (error) {
		console.error(error);
	}


}

async function nodeGet(functionstring, paramObject) {
	let url = baseUrl + basePath + `/node/${functionstring}?`;

	for (const [key, value] of Object.entries(paramObject)) {
		// console.log(`${key}: ${value}`);
		url += `${key}=${value}`;
	}

	console.log(url)

	const options = { method: 'GET', body: undefined };
	// console.log(url)
	try {
		const response = await fetch(url, options);
		const data = await response.json();
		// console.log(data)
		return data;
		// console.table(data);
	} catch (error) {
		console.error(error);
	}


}

async function contentPost(functionstring, paramObject) {

	let url = baseUrl + basePath + `/content/${functionstring}`;
	console.log(url)

	let bodyArray = [];

	for (const [key, value] of Object.entries(paramObject)) {
		// console.log(`${key}: ${value}`);
		// url += `${key}=${value}`;
		bodyArray.push(value);
	}

	const options = {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(bodyArray),
	};
	console.log(options)

	try {
		const response = await fetch(url, options);
		const data = await response.json();
		console.log(response.status)
		if (response.status == 200) {
			return data;
		}
		else {
			throw new Error('FAILED PUT FROM: contentPut in dbis-we')
		}
		// console.table(data);
	} catch (error) {
		console.error(error);
	}


}

async function contentPut(functionstring, putObject) {
	let url = baseUrl + basePath + `/content/${functionstring}`;
	console.log(url)

	const options = {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify([putObject]),
	};
	// console.log(options)
	try {
		const response = await fetch(url, options);
		// const data = await response.json();
		console.log(response.status)
		if (response.status == 200) {
			return;
		}
		else {
			throw new Error('FAILED PUT FROM: contentPut in dbis-we')
		}
		// console.table(data);
	} catch (error) {
		console.error(error);
	}


}

dbisWe.Project_SelectLikeString('')
	.then((data) => {
		// console.log(data)
	})



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


let overlayElement;
let overlayRightPanel;
let projectContainer;
let sourceContainer;
let clipboardContainer;







function showOverlay() {
	document.getElementById('ae-contextOverlay').style.display = 'flex';
	// overlayElement.style.display = 'flex';
}


function hideOverlay() {
	document.getElementById('ae-contextOverlay').style.display = 'none';
	// overlayElement.style.display = 'none';
}








function showState() {

	let overlayElement = document.getElementById('ae-andegraph-overlay');


}







let extensionStateFront = {
	active: false,
	capturing: false,
	current_tabId: 0,
	current_tabUrl: '',
	current_tabTitle: '',
	current_projectUuid: 0,
	current_projectObject: {},
	current_sourceUuid: 0,
	current_sourceObject: {},
	current_sourceChildNodes: [],
}



function writeToState(propertiesToWriteObject) {

	// let entries = Object.entries(propertiesToWriteObject)
	// let data = entries.map(([key, val] = entry) => {
	// 	// return `The ${key} is ${val}`;
	// 	console.log(`The ${key} is ${val}`)
	// });

	Object.keys(propertiesToWriteObject).forEach(key => {
		console.log(key, ':', propertiesToWriteObject[key]);

	});

	console.log(extensionStateFront)

}
// writeToState({ active: 'true' });


// createOverlay();

// getCurrentState();

// browser.runtime.sendMessage({
// 	name: "requestBackStateOnFrontLoaded",
// });


// initProject();


// function updateFrontOnState() {

// }
console.log("Reload page update. ")
browser.runtime.sendMessage({
	name: "requestBackStateOnFrontLoaded",
});


document.addEventListener("focus", function () {
	console.log("Page in focus")
	browser.runtime.sendMessage({
		name: "requestBackStateOnFrontLoaded",
	});

})



// initProject();
// initProject();



// hideOverlay();
// showOverlay()


// setInterval(() => {
// 	console.log(document.activeElement)
// }, 1000);

