

let htmlContent = `

<table id="childtable">
    <thead id="childtable-thead">
        <tr id="childtable-thead-tr">
            <th>Table</th>
            <th>Title</th>
            <!-- Add more column headers as needed -->
        </tr>
    </thead>
    <tbody id="childtable-tbody">
        <tr>
            <td>Data 1</td>
            <td>Data 2</td>
            <!-- Add more cells as needed -->
        </tr>
        <!-- Add more rows as needed -->
    </tbody>
</table>

`;


export class ChildTable {

	tableElement;

	constructor(){
		
	}

    createChildTable(){
        this.tableElement = document.createElement('div');
		this.tableElement.id = 'childtable-outer';
		this.tableElement.innerHTML = htmlContent;
        document.body.append(this.tableElement)
        // console.log(this.tableElement.innerHTML)
    }

	static insertChildren(nodeObjects){
        let tbody = document.getElementById('childtable-tbody');
        tbody.innerHTML = '';

        for(let nodeObject of nodeObjects){
            let tableRowHtml = `
                
                <td class="childtable-td childtable-td-table">${nodeObject.Table}</td>
                <td class="childtable-td childtable-td-title">${nodeObject.Title}</td>

            `;
            let tr = document.createElement('tr');
            tr.id = `childtable-tr-${nodeObject.Uuid}`;
            tr.classList.add('childtable-tr');
            tr.nodeObject = nodeObject;
            tr.dataset.Node = 1;
            tr.tabIndex = 0;
            tr.innerHTML = tableRowHtml;
            // tr.contentEditable = 'True';

            tbody.append(tr);
            console.log(tr)
        }
        console.table(nodeObjects)

	}
}



