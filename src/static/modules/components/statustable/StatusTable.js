

let htmlContent = `

<div id="statustable-inner">
    <div id="statustable-project" class="statustable-row" tabindex="1">
        project
    </div>
    <div id="statustable-selected" class="statustable-row" tabindex="1">
        selected
    </div>
    <div id="statustable-active" class="statustable-row" tabindex="1">
        active
    </div>
</div>

`;


export class StatusTable {

	tableElement;

	constructor(){
		
	}

    createStatusTable(){
        this.tableElement = document.createElement('div');
		this.tableElement.id = 'statustable-outer';
		this.tableElement.innerHTML = htmlContent;
        document.body.append(this.tableElement)
        // console.log(this.tableElement.innerHTML)
    }

	
}



