

	if(document.getElementById('contextOverlay') != undefined){
		// document.remove(document.getElementById('contextOverlay'))
		// document.getElementById('contextOverlay').remove()
		window.location.reload();
	}

	



document.body.innerHTML += `




	<div id="contextOverlay">
		<div id="overlayRightPanel">



			<div id="projectContainer" class="panelContainer">

				<div id="projectOuter">
					<div id="projectInner">

						<div id="titleDiv" contenteditable="true">Project Title</div>

						<div id="toggleContainer">
							<div id="searchButton" class="projectButton projectButtonOn centerWithFlex">Search</div>
							<div id="propertiesButton" class="projectButton projectButtonOff centerWithFlex">Properties
							</div>
						</div>

						<div id="tableContainer">

							<div id="searchInput" class="centerWithFlex" contenteditable="true" tabindex="0"></div>
							<table id="searchTable">
								<thead id="searchTable-thead">
									<tr id="searchTable-thead-tr">
										<th>Table</th>
										<th>Title</th>
									</tr>
								</thead>
								<tbody id="searchTable-tbody">
									<tr>
										<th>Data 1</th>
										<td>Data 2</td>
									</tr>
								</tbody>
							</table>


							<table id="propertiesTable" class="displayNone">
								<thead id="propertiesTable-thead">
									<tr id="propertiesTable-thead-tr">
										<th>Key</th>
										<th>Value</th>
									</tr>
								</thead>
								<tbody id="propertiesTable-tbody">
									<tr>
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
									</tr>
								</tbody>
							</table>

						</div>

					</div>
				</div>
			</div>





			<div id="sourceContainer" class="panelContainer">sourceContainer</div>
			<div id="clipboardContainer" class="panelContainer">clipboardContainer</div>

		</div>
	</div>





		`
	



let styleSheet = document.createElement("style");
styleSheet.innerText = `

.displayNone {
	display: none;
}

.centerWithFlex {
	display: flex;
	justify-content: center;
	align-items: center;
}

.projectButtonOn {
	background-color: rgb(26, 114, 192);
	box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.638);
}

.projectButtonOff {
	background-color: rgb(89, 148, 206);
}
#projectOuter {
	height: 100%;
	width: 100%;
}


#projectInner {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
}

#titleDiv {
	width: 90%;
	height: 30px;
	min-height: 30px;


	margin: 3px;
	padding: 3px;
	border-radius: 5px;

	border: solid rgba(67, 53, 53, 0.599) 1px;
	background-color: aliceblue;

	display: flex;
	justify-content: center;
	align-items: center;

}

#toggleContainer {
	width: 100%;
	height: 30px;

	margin: 5px 0px 5px 0px;

	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
}

#searchButton {
	/* background-color: rgba(26, 133, 180, 0.568); */
	width: 40%;
	height: 20px;
}

#propertiesButton {
	/* background-color: rgba(26, 133, 180, 0.568); */
	width: 40%;
	height: 20px;
}

.projectButton {
	margin: 3px;
	padding: 3px;
	border-radius: 5px;

}

.projectButton:hover {
	cursor: pointer;
}

.projectButton.selected {}



#tableContainer {
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


#searchInput {

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


#searchTable {
	width: 100%;
	/* display: none; */
	/* display: inline; */
	/* flex-direction: column;
	justify-content: start; */
	border-collapse: collapse;
	background-color: rgb(61, 178, 228);
	margin: 5px 5px 5px 5px;
}

#searchTable thead {
	/* background-color: rgb(85, 123, 177); */
}

#searchTable thead th {
	padding: 3px;
	background-color: rgb(85, 123, 177);
	box-shadow: inset 0 0 0 1px rgb(0, 0, 0);
}


#searchTable tbody {
	background-color: rgb(109, 58, 58);
	/* padding: 30px; */
}


#searchTable tbody tr {
	font-size: 0.9rem;

	/* border: solid black 1px;
	background-color: rgb(106, 168, 80);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408); */

}

/* #searchTable tbody tr :active {
	border: solid black 3px;
} */

#searchTable tbody tr :hover {
	cursor: pointer;
}

#searchTable tbody th {
	/* border: solid black 1px; */
	padding: 3px;
	background-color: rgb(83, 133, 203);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408);

	width: 100px;

}

#searchTable tbody td {
	/* border: solid black 1px; */
	padding: 3px;
	background-color: rgb(129, 151, 183);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408);

}









/* PROPERTIES TABLE */



#propertiesTable {
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

#propertiesTable thead {
	/* background-color: rgb(85, 123, 177); */
}

#propertiesTable thead th {
	padding: 3px;
	background-color: rgb(85, 123, 177);
	box-shadow: inset 0 0 0 1px rgb(0, 0, 0);
}

/* #propertiesTable-thead {

	background-color: rgb(109, 58, 58);
} */

#propertiesTable tbody {
	background-color: rgb(109, 58, 58);
	/* padding: 30px; */
}

#propertiesTable tbody tr {
	font-size: 0.9rem;

	/* border: solid black 1px;
	background-color: rgb(106, 168, 80);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408); */

}

#propertiesTable tbody th {
	/* border: solid black 1px; */
	padding: 3px;
	background-color: rgb(83, 133, 203);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408);

	width: 100px;

}

#propertiesTable tbody td {
	/* border: solid black 1px; */
	padding: 3px;
	background-color: rgb(129, 151, 183);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408);

}
#contextOverlay {
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

#overlayRightPanel {
	background-color: rgba(71, 4, 4, 0.198);
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

.panelContainer {
	width: 100%;
	min-width: 250px;
	height: 32%;
	overflow-x: hidden;

	/* border-radius: 5px; */
	background-color: rgba(109, 129, 146, 0.917);
};
`
document.head.appendChild(styleSheet);

	

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

	static async Node_SelectChildOfUuid(Uuid) { return contentGet('Node-SelectChildOfUuid', { 'Uuid': Uuid }) };
	// static async NodeEdge_SelectChildOfUuid(Uuid) { return contentGet('NodeEdge-SelectChildOfUuid', {'Uuid': Uuid}) };

	static async Project_SelectLikeString(searchString) { return await contentGet('Project-SelectLikeString', { 'searchString': searchString }) };

}



async function contentGet(functionstring, paramObject) {
	let url = baseUrl + basePath + `/content/${functionstring}?`;

	for (const [key, value] of Object.entries(paramObject)) {
		// console.log(`${key}: ${value}`);
		url += `${key}=${value}`;
	}

	// console.log(url)

	const options = { method: 'GET', body: undefined };
	// console.log(url)
	try {
		const response = await fetch(url, options);
		const data = await response.json();
		return data;
		// console.table(data);
	} catch (error) {
		console.error(error);
	}


}

dbisWe.Project_SelectLikeString('')
	.then((data) => {
		// console.log(data)
	})



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


let overlayElement;
let overlayRightPanel;
let projectContainer;
let sourceContainer;
let clipboardContainer;







function showOverlay() {
	document.getElementById('contextOverlay').style.display = 'flex';
	// overlayElement.style.display = 'flex';
}


function hideOverlay() {
	document.getElementById('contextOverlay').style.display = 'none';
	// overlayElement.style.display = 'none';
}


function createOverlay() {
	// console.log(document.getElementById('andegraph-overlay'))
	// if (document.getElementById('andegraph-overlay') == null) {

	overlayElement = document.createElement('div');
	overlayElement.id = 'andegraph-overlay';

	overlayElement.style.width = '100%';
	overlayElement.style.height = '100%';
	// overlayElement.style.backgroundColor = 'rgb(0 ,0 ,0 , 0.4)';
	overlayElement.style.border = 'solid green 3px';
	overlayElement.style.display = 'none';
	overlayElement.style.flexDirection = 'row';
	overlayElement.style.justifyContent = 'end';

	// below is done through trial and error on a few popular websites..
	overlayElement.style.top = '0px';
	overlayElement.style.left = '0px';
	overlayElement.style.position = 'fixed';
	overlayElement.style.zIndex = '100000000';

	document.body.appendChild(overlayElement);

	addOverlayStructure()

	// document.body.insertBefore(overlayElement, document.body.children[0]);
	// }

}
function addOverlayStructure() {
	// console.log('||||||||||||||||||||||', overlayElement);

	overlayElement.innerHTML = `
			<div id="overlayRightPanel">

			<div id="projectContainer" class="panelContainer">projectContainer</div>
			<div id="sourceContainer" class="panelContainer">sourceContainer</div>
			<div id="clipboardContainer" class="panelContainer">clipboardContainer</div>

			</div>
			<style>
				#overlayRightPanel {
					background-color: rgba(71, 4, 4, 0.198);
					height: 100%;
					width: 300px;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
				}

				.panelContainer {
					width: 100%;
					height: 30%;
					border-radius: 5px;
					background-color: rgba(165, 206, 242, 0.424);
				}
			</style>
	`;
}








function showState() {
	let overlayElement = document.getElementById('andegraph-overlay');




}




// function messageListener(message){
// 	console.log(message)
// }
// browser.runtime.onMessage.addListener((message) => {
//     console.log('asdfasdfasdfasdfasdasfdsafdfasdfasfdasdfasdfasdfasdfs')
//   });


// browser.tabs.executeScript({file: "/components/box.js"})
// browser.runtime.sendMessage('','sendsend')
// 	.catch(console.log('error sending'));





// browser.runtime.onMessage.addListener((message) => {
//     if (message.command === "listen") {
//       console.log('start listening')
//     }
//   });






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
console.log("Reload. ")
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

