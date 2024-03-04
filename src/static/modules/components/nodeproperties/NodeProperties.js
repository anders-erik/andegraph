

let htmlContent = `

<table id="nodeproperties" class="nodeproperties">
    <thead id="nodeproperties-thead">
        <tr id="nodeproperties-thead-tr">
            <th>Key</th>
            <th>Value</th>
            <!-- Add more column headers as needed -->
        </tr>
    </thead>
    <tbody id="nodeproperties-tbody">
        <tr>
            <td>Data 1</td>
            <td>Data 2</td>
            <!-- Add more cells as needed -->
        </tr>
        <!-- Add more rows as needed -->
    </tbody>
</table>

`;


export class NodeProperties {

    propertiesElement;

    constructor() {

    }

    createNodeProperties() {
        this.propertiesElement = document.createElement('div');
        this.propertiesElement.id = 'nodeproperties-outer';
        this.propertiesElement.innerHTML = htmlContent;
        document.body.append(this.propertiesElement)
        // console.log(this.propertiesElement.innerHTML)
    }


    insertProperties(nodeObject) {
        let tbody = document.getElementById('nodeproperties-tbody');
        tbody.innerHTML = '';

        let tbodyHtmlString = ``;

        console.log(nodeObject)
        for (const [key, value] of Object.entries(nodeObject)) {

            console.log(key, value)

            let trString = `
            <tr class="nodeproperties-tbody-tr">
                <td class="nodeproperties-td nodeproperties-td-key">${key}</td>
                <td class="nodeproperties-td nodeproperties-td-value">${value}</td>
            </tr>
                
            `
            tbodyHtmlString += trString;

        }

        tbody.innerHTML = tbodyHtmlString;

        let propertiesElement = document.getElementById('nodeproperties');
        propertiesElement.nodeObject = nodeObject;
        propertiesElement.dataset.Node = 1;
        propertiesElement.tabIndex = 0;

        // let tr = document.createElement('tr');
        // tr.id = `nodeproperties-tr-${nodeObject.Uuid}`;
        // tr.classList.add('nodeproperties-tr');
        // tr.nodeObject = nodeObject;
        // tr.dataset.Node = 1;
        // tr.tabIndex = 1;
        // tr.innerHTML = propertiesRowHtml;

        // tr.contentEdiproperties = 'True';

        // tbody.append(tr);
        // console.log(tr)
        // console.properties(nodeObjects)

    }
}



