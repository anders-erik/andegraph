


export class Settings {

	element;
	elementInnerHtml;

	selectedTables;

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
		this.element.tabIndex = 0;
		parentElement.append(this.element);

		this.element.innerHTML = this.elementInnerHtml;

		this.descCheckbox = this.element.querySelector('#descSearchCheckbox');
		this.tableLimitInput = this.element.querySelector('#tableLimitSearchInput');
		this.orderBySelect = this.element.querySelector('#orderSearchBySelect');


		this.searchSettingsTables = this.element.querySelector('#searchSettings_tables')
		this.fileCheckbox = this.element.querySelector('#fileSearchCheckbox');
		this.projectCheckbox = this.element.querySelector('#projectSearchCheckbox');
		this.sourceCheckbox = this.element.querySelector('#sourceSearchCheckbox');
		this.textCheckbox = this.element.querySelector('#textSearchCheckbox');

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
		<label for="orderSearchBySelect">
			<select name="orderSearchBySelect" id="orderSearchBySelect">
				<option value=""></option>
				<option value="Uuid">Uuid</option>
				<option value="Table">Table</option>
				<option value="Type">Type</option>
				<option value="Title">Title</option>
				<option value="TimeCreated">TimeCreated</option>
				<option value="TimeLastChange">TimeLastChange</option>
				</select>
				ORDER
		</label>
	</div>
</div>

<div id="searchSettings_tables" class="search_subcontainer">
	<div>
		<label for="codeSearchCheckbox">
			<input type="checkbox" id="codeSearchCheckbox" name="codeSearchCheckbox"  />
			Code
		</label>
	</div>
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