
import { age_dbis } from "../dbi-send";

export interface HTMLProjectTableRow extends HTMLTableRowElement {
    nodeObject: any;
}
export interface HTMLTableContentObject extends HTMLTableElement {
    contentObject: any;
}
export interface HTMLProjectChildRow extends HTMLTableRowElement {
    ContentEdgeObject: any;
    isProjectChildRow : boolean;
}


export function populatePropertiesTable(propertiesTable: HTMLTableContentObject, projectContentObject: any) {

    console.log("projectContentObject = ", projectContentObject)

    // let projectObject = extensionStateFront.current_projectObject;
    let projectObject = projectContentObject;

    propertiesTable.contentObject = projectContentObject;
    // propertiesTable.addEventListener("focusout", projectPropertyFocusOut)

    // extensionStateFront.current_projectUuid = projectObject.Uuid;

    // document.getElementById('aa-projectTitle').textContent = projectObject.Title;

    // let tbody = document.getElementById('age_projectPropertiesTable-tbody');
    let tbody = propertiesTable.querySelector("tbody");
    tbody.innerHTML = '';


    for (const key in projectObject) {
        // console.log(`${key}: ${projectObject[key]}`);
        if (key === 'Type' || key === 'Title' || key === 'Goal') {

            tbody.innerHTML += `
		
			<tr>
				<td id=age_projPropTable-${key}-key class="age_element" >${key}</td>
				<td id=age_projPropTable-${key}-value class="age_element" contenteditable="true" >${projectObject[key]}</td>
			</tr>
		
		`;

        }
        else {
            tbody.innerHTML += `
		
			<tr>
				<td id=age_projPropTable-${key}-key class="age_element" >${key}</td>
				<td id=age_projPropTable-${key}-value class="age_element">${projectObject[key]}</td>
			</tr>
		
		`;
        }

    }

    // Set property rows to be tabbable
    let propertyRows = tbody.children;
    for (let i = 0; i < propertyRows.length; i++) {
        let propertyRow = propertyRows[i] as HTMLElement;
        // console.log('child = ', propertyRow);
        propertyRow.tabIndex = 0;
    }

    // console.log(document.querySelectorAll('#age_projectPropertiesTable tbody tr'))
    // let editableProjectPropertyTds: NodeListOf<Element> = tbody.querySelectorAll('.age_editableProjectProperty');
    // console.log(editableProjectPropertyTd)

    // Array.from(editableProjectPropertyTds).forEach((editablePropertyElement) => {
    //     editablePropertyElement.addEventListener('focusout', editableProjectPropertyFocusOut)
    // })
    // for (let editableProjectPropertyTd of editableProjectPropertyTds) {
    //     // console.log(editableProjectPropertyTd.textContent);
    //     // console.log(propertyRow.textContent.length)

    //     // editableProjectPropertyTd.addEventListener('focusout', readProjectPropertiesFromDomAndWritePut)
    //     editableProjectPropertyTd.addEventListener('focusout', editableProjectPropertyFocusOut)
    //     // editableProjectPropertyTd.addEventListener('focusout', postProjectProperties)
    // }

}



export function populateChildrenTable(table : HTMLTableElement, projectChildContentEdges : any){

    // let projectChildContentEdges = extensionStateFront.current_projectChildContentEdges;

    // extensionStateFront.current_projectUuid = projectObject.Uuid;

    // document.getElementById('aa-projectTitle').textContent = projectObject.Title;


    let tbody = table.querySelector('tbody');

    tbody.innerHTML = '';

    for (const contentEdge of projectChildContentEdges) {

        let newProjectChildRow = document.createElement('tr') as HTMLProjectChildRow;

        newProjectChildRow.isProjectChildRow = true;
        newProjectChildRow.tabIndex = 0;

        // Custom event to specifically load the source from the overlay-ts module
        newProjectChildRow.addEventListener("click", (event : Event) => {
            // https://www.reddit.com/r/webdev/comments/rhf2mu/friendly_reminder_use_eventcurrenttarget_not/
            let elementCurrentTarget = event.currentTarget as HTMLProjectChildRow;
            // console.log("event.currentTarget = ", elementCurrentTarget)
            let loadsourceEvent = new CustomEvent( "loadsource", { 
                bubbles: true,
                detail: {contentObject: elementCurrentTarget.ContentEdgeObject.content},

                });
            let _this = this as HTMLProjectChildRow;
            // console.log("_this = ", _this);
            // console.log("event.target = ", event.target);
            
            elementCurrentTarget.dispatchEvent(loadsourceEvent);
            
         })

        newProjectChildRow.id = `age_projchildTableRow-${contentEdge.content.Uuid}`;
        newProjectChildRow.classList.add("age_projchildTableRow");
        newProjectChildRow.ContentEdgeObject = contentEdge;

        newProjectChildRow.innerHTML += `
		
				<td id=age_projchildTable-Table-${contentEdge.content.Uuid} class="age_element age_projchildTable Table" data-Uuid=${contentEdge.content.Uuid}>${contentEdge.content.Table}</td>
				<td id=age_projchildTable-Title-${contentEdge.content.Uuid} class="age_element age_projchildTable Title" data-Uuid=${contentEdge.content.Uuid}>${contentEdge.content.Title}</td>
			
		`;

        // document.getElementById(`id=age_projchildTableRow-${nodeEdge.Uuid}`);

        // console.log(document.getElementById(`id=age_projchildTableRow-${nodeEdge.Uuid}`))


        // newProjectChildRow.addEventListener('click', projectChildRowClicked)

        tbody.appendChild(newProjectChildRow)

    }

}

export function populateProjectSearchTable(projectSearchTable : any, projectObjects : any): void {
    // console.log('PROJECT TBALE POP');

    // childObjects = extensionStateFront.current_projectSearchObjects;

    // let projectTable = document.getElementById('age_projectTable');
    // console.log("SSSSSSSSSSSSSSSSS = ", projectObjects.length)
    let tbody = projectSearchTable.getElementsByTagName('tbody')[0]
    // console.log("tbody = ", tbody);

    tbody.innerHTML = '';

    for (let childObject of projectObjects) {

        let tableRowHtml = `
                
                <td data-Uuid="${childObject.Uuid}" class="age_element age_projectRowSearchData Table">${childObject.Table}</th>
                <td data-Uuid="${childObject.Uuid}" class="age_element age_projectRowSearchData Title">${childObject.Title}</td>

            `;
        // let tr = document.createElement('tr');
        let tr = document.createElement('tr') as HTMLProjectTableRow;
        tr.id = 'age_projectSearchRow-' + childObject.Uuid;
        tr.classList.add('age_projectSearchRow');
        // tr.setAttribute("tabIndex")
        tr.tabIndex = 0;
        tr.nodeObject = childObject;
        // tr.dataset.Node = 1;
        // tr.dataset.Uuid = childObject.Uuid;
        // tr.setAttribute('data-Node', '1');
        tr.setAttribute('data-Uuid', childObject.Uuid);
        // tr.tabIndex = 0;
        tr.innerHTML = tableRowHtml;
        // tr.addEventListener('click', clickCallback);
        // tr.contentEditable = 'True';

        tbody.append(tr);
        // console.log(tr)
    }

}