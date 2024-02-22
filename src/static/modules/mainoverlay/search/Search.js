
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
		this.settings.reviewCheckbox.addEventListener('change', this.reviewCheckboxChange.bind(this));

		this.table = new Table(this.element);
	}


	reviewCheckboxChange(event) {
		if (this.settings.reviewCheckbox.checked) {
			this.tryFetch();
		}
		else {
			this.doSearch(this.input.element.value)
		}
	}

	inputFocusIn(event) {
		this.pollInputInterval = setInterval(() => {

			this.tryFetch();

		}, 300)
	}
	inputFocusOut(event) {
		clearInterval(this.pollInputInterval);
	}






	async tryFetch() {

		if (this.settings.reviewCheckbox.checked) {
			console.log('GET REVIEW!')
			let reviewContentObjects = await dbis.Review_SelectCurrentReview();
			this.table.insertReviewObjects(reviewContentObjects);
			console.log(reviewContentObjects)
		}
		else {

			let newSearchString = this.input.element.value;

			if (newSearchString !== this.lastSearchString) {
				console.log('SEARCH SEARCH: ', newSearchString)
				this.lastSearchString = newSearchString;

				await this.doSearch(newSearchString);
			}

		}

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

