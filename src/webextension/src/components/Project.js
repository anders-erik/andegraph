

let projectOuter;
let projectInner;

let titleDiv;

let toggleContainer;
let searchButton;
let propertiesButton;

let tableContainer;
let searchInput;
let searchTable;
let propertiesTable;

let projectStyleSheet;

// const style = document.createElement('style');
// style.textContent = styleString;
// document.head.append(style);

function appendProjectElement() {

	let projectElementParent = document.getElementById('projectContainer');
	projectElementParent.innerHTML = projectInnerHtml;

	projectStyleSheet = document.createElement('style');
	projectStyleSheet.textContent = projectInnerCss;
	document.head.append(projectStyleSheet);


	searchButton = document.getElementById('searchButton');
	propertiesButton = document.getElementById('propertiesButton');
	searchTable = document.getElementById('searchTable');

	searchButton.addEventListener('click', projectToggleClicked);
	propertiesButton.addEventListener('click', projectToggleClicked);
}


function projectToggleClicked(event) {
	propertiesButton.style.backgroundColor = 'rgba(26, 133, 180, 0.568)';
	searchButton.style.backgroundColor = 'rgba(26, 133, 180, 0.568)';
	searchTable.style.display = 'none';


	if (event.target.id === 'searchButton') {
		searchButton.style.backgroundColor = 'rgba(20, 85, 113, 0.568)';
		searchTable.style.display = 'flex';
	}
	else {
		propertiesButton.style.backgroundColor = 'rgba(20, 85, 113, 0.568)';

	}

}


let projectInnerCss = `
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
}

#titleDiv {
	width: 100%;
	height: 30px;
}

#toggleContainer {
	width: 100%;
	height: 30px;

	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
}

#searchButton {
	background-color: rgba(26, 133, 180, 0.568);
	width: 40%;
	height: 20px;
}

#propertiesButton {
	background-color: rgba(26, 133, 180, 0.568);
	width: 40%;
	height: 20px;
}


/* TABLE */




#searchTable {
	width: 100%;
	
	display: none;
	flex-direction: column;
	justify-content: start;
	border-collapse: collapse;
	background-color: rgb(61, 178, 228);
}

#searchTable-tbody {

	background-color: rgb(109, 58, 58);
}

#searchTable-tbody tr {
	border: solid black 1px;
	background-color: rgb(106, 168, 80);
}

.searchTable-td {
	margin: 0px;
	padding: 5px;
}

.searchTable-td-table {
	width: 50px;
	margin: 0px;
	padding: 5px;
}

.searchTable-td-title {
	width: 150px;
	margin: 0px;
	padding: 5px;
}
`;



let projectInnerHtml = `

<div id="projectOuter">
	<div id="projectInner">

		<div id="titleDiv">Project Title</div>

		<div id="toggleContainer">
			<div id="searchButton">Search</div>
			<div id="propertiesButton">Properties</div>
		</div>

		<div id="tableContainer">

			<div id="searchInput">input placeholder</div>
			<table id="searchTable">
				<thead id="searchTable-thead">
					<tr id="searchTable-thead-tr">
						<th>Table</th>
						<th>Title</th>
					</tr>
				</thead>
				<tbody id="searchTable-tbody">
					<tr>
						<td>Data 1</td>
						<td>Data 2</td>
					</tr>
				</tbody>
			</table>


			<table id="propertiesTable">
				<thead id="propertiesTable-thead">
					<tr id="propertiesTable-thead-tr">
						<th>Key</th>
						<th>Value</th>
					</tr>
				</thead>
				<tbody id="propertiesTable-tbody">
					<tr>
						<td>Data 1</td>
						<td>Data 2</td>
					</tr>
				</tbody>
			</table>

		</div>

	</div>
</div>

`;



