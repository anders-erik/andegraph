
import { LeftPanelModel } from "./LeftPanelModel.js";
import { LeftPanelDom } from "./LeftPanelDom.js";


class LeftPanel {

	leftPanelElement;
	leftPanelModel;
	leftPanelDom;

	leftPanelMain;
	leftPanelProjectTable;

	constructor(parentElement) {

		this.leftPanelElement = document.createElement('div');
		this.leftPanelElement.id = 'leftPanel';
		this.leftPanelElement.tabIndex = '0';


		this.leftPanelModel = new LeftPanelModel();
		this.leftPanelDom = new LeftPanelDom(this.leftPanelElement);

		// https://stackoverflow.com/questions/36489579/this-within-es6-class-method
		this.leftPanelElement.addEventListener('click', this.leftPanelClickHandler.bind(this));

		// console.log(this.leftPanelDom.tableBody)
		this.LeftPanelDevTests();

		parentElement.append(this.leftPanelElement);
	}


	async LeftPanelDevTests() {
		// console.log(leftPanel.getPanelId());
		await this.setProjectUuid(121264848896);
	}



	async leftPanelClickHandler(event) {
		if (event.target.id == 'leftPanel_projectButton') {
			console.log('LEFT PANEL PROJECT BUTTON CLICKED')

			this.leftPanelDom.toggleProject();


		}
	}



	async setProjectUuid(projectUuid) {
		await this.leftPanelModel.updateModelOnNewProjectUuid(projectUuid);
		this.leftPanelDom.updateProjectContent(this.leftPanelModel.projectContentObject, this.leftPanelModel.projectNodeEdges);
	}


	getPanelId() {
		return this.leftPanelElement.id;
	}


}







export {
	LeftPanel
}