


class LeftPanelDom {

	leftPanelElement;

	homebutton;
	projectButton;
	searchButton;

	mainContent;

	projectContent;
	projectTitle;
	projectTable;
	projectTableHead;
	projectTableBody;
	// projectRowElements = [];

	leftPanelCurrentContent;


	constructor(leftPanelElement) {
		this.leftPanelElement = leftPanelElement;

		this.populateLeftPanelElement()

		// DEV VARIABLE
		this.leftPanelCurrentContent = 'project';
		this.projectButton.classList.add('selected');

	}

	toggleProject() {

		if (this.leftPanelCurrentContent == 'project') {
			this.emptyPanelMainContent();
			this.leftPanelCurrentContent = '';
			this.projectButton.classList.remove('selected');
		}
		else {
			this.emptyPanelMainContent();
			this.mainContent.append(this.projectContent);
			this.leftPanelCurrentContent = 'project';
			this.projectButton.classList.add('selected');
		}

	}


	updateProjectContent(projectObject, childNodeEdges) {

		// console.log(childNodeEdges)
		// console.log(projectObject)

		this.projectTitle.textContent = projectObject.Title;
		this.projectTitle.contentObject = projectObject;
		// console.log(this.projectTableBody);
		this.projectTableBody.innerHTML = ``;

		// console.log('TYPEOF ', typeof childNodeEdges)
		// console.log('isArray', Array.isArray(childNodeEdges))

		for (let childNodeEdge of childNodeEdges) {

			let tableRow = document.createElement('tr');
			tableRow.tabIndex = 0;

			let rowTable = document.createElement('td');
			rowTable.textContent = `${childNodeEdge.Table}`;

			let rowTitle = document.createElement('td');
			rowTitle.textContent = `${childNodeEdge.Title}`;

			tableRow.append(rowTable, rowTitle);
			this.projectTableBody.append(tableRow);
		}
	}



	emptyPanelMainContent() {
		console.log('emptying')
		// https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
		for (let childElement of this.mainContent.childNodes) {
			console.log(childElement);
			this.mainContent.removeChild(childElement);
		}
	}


	populateLeftPanelElement() {

		let leftPanelInner = document.createElement('div');
		leftPanelInner.id = 'leftPanel_inner';


		/*
			TOP MENU BAR
		*/

		let leftPanelTopMenu = document.createElement('div');
		leftPanelTopMenu.id = 'leftPanel_topMenu';
		leftPanelTopMenu.tabIndex = '0';

		this.homeButton = document.createElement('div');
		this.homeButton.id = 'leftPanel_homeButton';
		this.homeButton.className = 'leftPanel_button';
		this.homeButton.textContent = 'H';
		this.homeButton.tabIndex = '0';

		this.projectButton = document.createElement('div');
		this.projectButton.id = 'leftPanel_projectButton';
		this.projectButton.className = 'leftPanel_button';
		this.projectButton.textContent = 'P';
		this.projectButton.tabIndex = '0';
		// this.projectButton = projectButton;

		this.searchButton = document.createElement('div');
		this.searchButton.id = 'leftPanel_searchButton';
		this.searchButton.className = 'leftPanel_button';
		this.searchButton.textContent = 'Q';
		this.searchButton.tabIndex = '0';

		leftPanelTopMenu.appendChild(this.homeButton);
		leftPanelTopMenu.appendChild(this.projectButton);
		leftPanelTopMenu.appendChild(this.searchButton);


		/* 
			MAIN CONTENT
		*/
		let mainContent = document.createElement('div');
		mainContent.id = 'leftPanel_mainContent';
		mainContent.textContent = '';
		this.mainContent = mainContent;
		this.mainContent.tabIndex = '0';

		// PROJECT CONTENT
		this.projectContent = document.createElement('div');
		this.projectContent.id = 'leftPanel_projectContent';

		this.projectTitle = document.createElement('div');
		this.projectTitle.textContent = 'placeholder title';
		this.projectTitle.tabIndex = '0';

		this.projectTable = document.createElement('table');
		this.projectTable.id = 'leftPanel_projectTable';
		this.projectTable.tabIndex = '0';
		this.populateProjectTable();
		this.projectContent.append(this.projectTitle, this.projectTable);

		this.mainContent.appendChild(this.projectContent);


		leftPanelInner.appendChild(leftPanelTopMenu);
		leftPanelInner.appendChild(mainContent);

		// Append leftPanelInner to leftPanelElement
		this.leftPanelElement.appendChild(leftPanelInner);


	}



	populateProjectTable() {
		// this.projectTable =

		// let projectTableElement = document.getElementById('parentElementId');

		// let projectTable = document.createElement('table');
		// projectTable.id = 'leftPanel_projectTable';

		this.projectTableHead = document.createElement('thead');
		this.projectTableHead.id = 'leftPanel_projectTableHead';

		let tableHeadRow = document.createElement('tr');

		let tableHeader1 = document.createElement('th');
		tableHeader1.className = 'leftPanel_tableElement';
		tableHeader1.textContent = 'Table';

		let tableHeader2 = document.createElement('th');
		tableHeader2.className = 'leftPanel_tableElement';
		tableHeader2.textContent = 'Title';

		tableHeadRow.appendChild(tableHeader1);
		tableHeadRow.appendChild(tableHeader2);

		this.projectTableHead.appendChild(tableHeadRow);

		this.projectTableBody = document.createElement('tbody');
		this.projectTableBody.id = 'leftPanel_projectTableBody';

		this.projectTable.appendChild(this.projectTableHead);
		this.projectTable.appendChild(this.projectTableBody);



	}



}



export {
	LeftPanelDom,
}