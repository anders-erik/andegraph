
import { dbis } from "../../dbi-send/dbi-send.js";
import { Input } from "./Input.js";
import { Settings } from "./Settings.js";
import { Table } from "./Table.js";


export class Search {

	element;

	input;
	settings;
	table;

	lastSearchString = '';
	pollInputInterval;


	constructor(parentElement) {
		this.element = document.createElement('div');
		this.element.id = 'search';
		parentElement.append(this.element);


		this.input = new Input(this.element);
		this.input.element.addEventListener('focusin', this.inputFocusIn.bind(this));
		this.input.element.addEventListener('focusout', this.inputFocusOut.bind(this));

		this.settings = new Settings(this.element);

		this.table = new Table(this.element);
	}



	inputFocusIn(event) {

		this.pollInputInterval = setInterval(() => {

			let newSearchString = this.input.element.value;

			if (this.lastSearchString !== newSearchString) {
				this.lastSearchString = newSearchString;

				this.doSearch(this.input.element.value)
			}


		}, 400)

		this.doSearch(this.input.element.value)
	}


	inputFocusOut(event) {

		clearInterval(this.pollInputInterval);

	}




	async doSearch(searchString) {

		let tableLimit = this.settings.tableLimitInput.value;
		let tableList = this.settings.getTableList();
		let orderColumn = this.settings.orderBySelect.value;
		let desc = this.settings.descCheckbox.checked ? 1 : 0;
		// console.log('SEARCH TABLES: ', tableList)

		let searchRows = await dbis.Content_SelectOnTitleLikeString(

			searchString,
			tableLimit,
			tableList,
			orderColumn,
			desc,

		);
		// console.log(searchRows);
		this.table.insertContentObjects(searchRows)
	}


}

