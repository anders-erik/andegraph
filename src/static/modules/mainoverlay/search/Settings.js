


export class Settings {

	element;
	elementInnerHtml;

	selectedTables;

	reviewCheckbox;
	descCheckbox;
	tableLimitInput;
	orderBySelect;

	searchSettingsTables;
	fileCheckbox;
	projectCheckbox;
	sourceCheckbox;
	textCheckbox;


	constructor(parentElement) {
		this.element = document.createElement('div');
		this.element.id = 'searchSettings';
		parentElement.append(this.element);

		this.element.innerHTML = this.elementInnerHtml;

		this.reviewCheckbox = this.element.querySelector('#reviewSearchCheckbox');
		this.reviewCheckbox.addEventListener('change', this.reviewBoxChange.bind(this));
		this.descCheckbox = this.element.querySelector('#descSearchCheckbox');
		this.tableLimitInput = this.element.querySelector('#tableLimitSearchInput');
		this.orderBySelect = this.element.querySelector('#orderSearchBySelect');


		this.searchSettingsTables = this.element.querySelector('#searchSettings_tables')
		this.fileCheckbox = this.element.querySelector('#fileSearchCheckbox');
		this.projectCheckbox = this.element.querySelector('#projectSearchCheckbox');
		this.sourceCheckbox = this.element.querySelector('#sourceSearchCheckbox');
		this.textCheckbox = this.element.querySelector('#textSearchCheckbox');

	}


	reviewBoxChange(event) {
		if (this.reviewCheckbox.checked) {
			this.disableTables();
		}
		else {
			this.enableTables();
		}
	}

	disableTables() {
		this.fileCheckbox.disabled = true;
		this.projectCheckbox.disabled = true;
		this.sourceCheckbox.disabled = true;
		this.textCheckbox.disabled = true;
		this.searchSettingsTables.classList.add('dis')
	}

	enableTables() {
		this.fileCheckbox.disabled = false;
		this.projectCheckbox.disabled = false;
		this.sourceCheckbox.disabled = false;
		this.textCheckbox.disabled = false;
		this.searchSettingsTables.classList.remove('dis')
	}

	getTableList() {
		let listString = `
		${this.fileCheckbox.checked ? 'File,' : ''}
		${this.projectCheckbox.checked ? 'Project,' : ''}
		${this.sourceCheckbox.checked ? 'Source,' : ''}
		${this.textCheckbox.checked ? 'Text' : ''}
		`;
		return listString.replace(/\s/g, '');
	}


	elementInnerHtml = `
<div id="searchSettings_options" class="search_subcontainer">
	<div>
		<label for="reviewSearchCheckbox">
			<input type="checkbox" id="reviewSearchCheckbox" name="reviewSearchCheckbox"  />
			Review
		</label>
	</div>
	<div>
		<label for="tableLimitSearchInput">
			<input type="text" id="tableLimitSearchInput" name="tableLimitSearchInput" value=50>
			LIMIT
		</label>
	</div>
	<div>
		<label for="descSearchCheckbox">
			<input type="checkbox" id="descSearchCheckbox" name="descSearchCheckbox"  />
			DESC
		</label>
	</div>
	<div>
		<label for="orderSearchBySelect">ORDER
			<select name="orderSearchBySelect" id="orderSearchBySelect">
				<option value=""></option>
				<option value="Uuid">Uuid</option>
				<option value="Table">Table</option>
				<option value="Type">Type</option>
				<option value="Title">Title</option>
				<option value="TimeCreated">TimeCreated</option>
				<option value="TimeLastChange">TimeLastChange</option>
			</select>
		</label>
	</div>
</div>

<div id="searchSettings_tables" class="search_subcontainer">
	<div>
		<label for="fileSearchCheckbox">
			<input type="checkbox" id="fileSearchCheckbox" name="fileSearchCheckbox"  />
			File
		</label>
	</div>
	<div>
		<label for="projectSearchCheckbox">
		<input type="checkbox" id="projectSearchCheckbox" name="projectSearchCheckbox"  />
			Project
		</label>
	</div>
	<div>
		<label for="sourceSearchCheckbox">
			<input type="checkbox" id="sourceSearchCheckbox" name="sourceSearchCheckbox"  />
			Source
		</label>
	</div>
	<div>
		<label for="textSearchCheckbox">
			<input type="checkbox" id="textSearchCheckbox" name="textSearchCheckbox"  />
			Text
		</label>
	</div>
</div>
	`;
}