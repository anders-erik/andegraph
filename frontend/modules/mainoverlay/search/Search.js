
import { dbis } from "../../dbi-send/dbi-send.js";
import { Input } from "./input/Input.js";
import { Settings } from "./settings/Settings.js";
import { Table } from "./table/Table.js";


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
		this.subscribeToSettingsChange();

		this.table = new Table(this.element);
	}


	subscribeToSettingsChange() {
		this.settings.descCheckbox.addEventListener('change', this.searchOnSettingsChange.bind(this))
		this.settings.tableLimitInput.addEventListener('change', this.searchOnSettingsChange.bind(this))
		this.settings.orderBySelect.addEventListener('change', this.searchOnSettingsChange.bind(this))

		this.settings.codeCheckbox.addEventListener('change', this.searchOnSettingsChange.bind(this))
		this.settings.fileCheckbox.addEventListener('change', this.searchOnSettingsChange.bind(this))
		this.settings.projectCheckbox.addEventListener('change', this.searchOnSettingsChange.bind(this))
		this.settings.sourceCheckbox.addEventListener('change', this.searchOnSettingsChange.bind(this))
		this.settings.textCheckbox.addEventListener('change', this.searchOnSettingsChange.bind(this))
	}


	searchOnSettingsChange() {
		this.doSearch(this.input.element.value);
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

