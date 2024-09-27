
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
    propertiesTable.addEventListener("focusout", projectPropertyFocusOut)

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
				<th id=age_projPropTable-${key}-key class="age_element" >${key}</th>
				<td id=age_projPropTable-${key}-value class="age_editableProjectProperty age_element" contenteditable="true" >${projectObject[key]}</td>
			</tr>
		
		`;

        }
        else {
            tbody.innerHTML += `
		
			<tr>
				<th id=age_projPropTable-${key}-key class="age_element" >${key}</th>
				<td id=age_projPropTable-${key}-value class="age_element">${projectObject[key]}</td>
			</tr>
		
		`;
        }

    }

    // console.log(document.querySelectorAll('#age_projectPropertiesTable tbody tr'))
    let editableProjectPropertyTds: NodeListOf<Element> = tbody.querySelectorAll('.age_editableProjectProperty');
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

function projectPropertyFocusOut(event: FocusEvent) : void{
    console.log('FOCUS OUT PROJECT PROPERTY');
    // console.log("event.target = ", event.target);
    // console.log("this = ", this);

    let dataElement = event.target as HTMLElement;
    let projectTable: HTMLTableContentObject = this;

    // console.log('', event.target.)
    switch (dataElement.id) {
        // TYPE
        case "age_projPropTable-Type-value":
            projectTable.contentObject.Type = dataElement.textContent;
            break;
        // TITLE
        case "age_projPropTable-Title-value":
            projectTable.contentObject.Title = dataElement.textContent;
            break;
        // GOAL
        case "age_projPropTable-Goal-value":
            projectTable.contentObject.Goal = dataElement.textContent;
            break;
    
        default:
            break;
    }

    age_dbis.Content_UpdateWithContentObject(projectTable.contentObject)
    .then(updatedContentObject => {
        // console.log("updatedContentObject = ", updatedContentObject);

        // let updatedString = JSON.stringify(updatedContentObject);
        // let tableObjectString = JSON.stringify(projectTable.contentObject);

        // console.log(updatedString);
        // console.log(tableObjectString);
        
        // let equality = JSON.stringify(updatedContentObject) == JSON.stringify(projectTable.contentObject);

        // console.log("Equal ? : ", equality)

        // for(let i = 0; i < updatedString.length; i++){
        //     if(updatedString[i] !== tableObjectString[i])
        //         console.log(updatedString[i] + " !== " + tableObjectString[i])
        // }
        
        // console.log(JSON.stringify(updatedContentObject).length)
        // console.log(JSON.stringify(projectTable.contentObject).length);
        switch (dataElement.id) {
            // TYPE
            case "age_projPropTable-Type-value":
                console.assert(updatedContentObject.Type == projectTable.contentObject.Type, "'PUT' content Object Type does not match the project table .contentObject.Type !");
                break;
            // TITLE
            case "age_projPropTable-Title-value":
                console.assert(updatedContentObject.Type == projectTable.contentObject.Type, "'PUT' content Object Title does not match the project table .contentObject.Title !");
                break;
            // GOAL
            case "age_projPropTable-Goal-value":
                console.assert(updatedContentObject.Type == projectTable.contentObject.Type, "'PUT' content Object Goal does not match the project table .contentObject.Goal !");
                break;

            default:
                break;
        }
        
        
    })
    // let projectContentObject = document.getElementById("age_projectPropertiesTable") as HTMLTableContentObject;

    console.log("projectContentObject.contentObject = ", projectTable.contentObject);

    
    // let eventTarget = event.target as HTMLElement;
    // console.log('eventTarget.textContent = ', eventTarget.textContent);
    
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
		
				<th id=age_projchildTable-Table-${contentEdge.content.Uuid} class="age_element" data-Uuid=${contentEdge.content.Uuid}>${contentEdge.content.Table}</th>
				<td id=age_projchildTable-Title-${contentEdge.content.Uuid} class="age_element" data-Uuid=${contentEdge.content.Uuid}>${contentEdge.content.Title}</td>
			
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
                
                <td data-Uuid="${childObject.Uuid}" class="age_element age_projectRowSearchData">${childObject.Table}</th>
                <td data-Uuid="${childObject.Uuid}" class="age_element age_projectRowSearchData">${childObject.Title}</td>

            `;
        // let tr = document.createElement('tr');
        let tr = document.createElement('tr') as HTMLProjectTableRow;
        tr.id = 'age_projectSearchRow-' + childObject.Uuid;
        tr.classList.add('age_projectSearchRow');
        tr.nodeObject = childObject;
        // tr.dataset.Node = 1;
        // tr.dataset.Uuid = childObject.Uuid;
        tr.setAttribute('data-Node', '1');
        tr.setAttribute('data-Uuid', childObject.Uuid);
        // tr.tabIndex = 0;
        tr.innerHTML = tableRowHtml;
        // tr.addEventListener('click', clickCallback);
        // tr.contentEditable = 'True';

        tbody.append(tr);
        // console.log(tr)
    }

}