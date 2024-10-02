import * as fetcher from "../fetcher";
import { HTMLProjectTableRow, HTMLTableContentObject } from "./source_dom";
import { age_dbis } from "../dbi-send";



let sidePanel: Element;

let sourceTitleElement : HTMLElement;

let sourceContainer: Element;
let sourceCss: HTMLElement;

let sourceChildrenTable: HTMLTableElement;
let projectContentEdgeChildren: any;

let sourcePropertiesTable: HTMLTableContentObject;

 
let currentSourceObject: any;
let currentSourceUuid: any; 
export function getCurrentSourceObject(): any { return sourcePropertiesTable.contentObject};
export function getCurrentSourceUuid(): any { return currentSourceUuid };


export function initSourceContainer(_sidePanel: Element, _sourceMoreOptionsContextMenu: HTMLDivElement): void {
    console.log('initSourceContainer(...)');

    sidePanel = _sidePanel;

    sourceContainer = document.createElement('div');
    sourceContainer.id = "age_sourceContainer";
    sourceContainer.classList.add("age_panelContainer");
    sourceContainer.addEventListener("click", clickedSourceContainer);
    // sourceContainer.addEventListener("focusout", sourcePropertyFocusedOut);
    sourceContainer.addEventListener("focusout", sourceFocusOut);
    

    fetcher.fetchHtml("source.html")
        .then(html => {
            // console.log("HTML : ", html)
            sourceContainer.innerHTML = html;
            sourceTitleElement = sourceContainer.querySelector("#age_sourceTitle");
            sourceChildrenTable = sourceContainer.querySelector("#age_sourceChildTable");
            sourcePropertiesTable = sourceContainer.querySelector("#age_sourcePropertiesTable");
        })

    sourceCss = document.createElement("style");
    sourceCss.id = "age_sourceStyle";
    fetcher.fetchCss("source.css")
        .then(css => {
            sourceCss.innerText = css;
        })


    sidePanel.append(sourceContainer);

}

function sourceFocusOut(event : FocusEvent){
    let focusoutTarget = event.target as HTMLElement;
    if (focusoutTarget.classList.contains("age_sourceChildTable-Title")){
        sourceChildTitleFocusedOut(focusoutTarget);
    }
    else if (focusoutTarget.classList.contains("age_sourcePropValue")){
        sourcePropertyFocusedOut(focusoutTarget);
    }

    // switch (focusoutTarget.id) {
    //     case "ae-sourceChildTable-Title":
    //         sourceChildTitleFocusedOut(focusoutTarget);
    //         break;
    //     // age_sourcePropTable
    //     case "age_sourcePropTable-Title-value":
    //     case "age_sourcePropTable-Type-value":
    //     case "age_sourcePropTable-Uuid-value":
    //     case "age_sourcePropTable-IAmSource-value":
    //         sourcePropertyFocusedOut(focusoutTarget);
    //         break;
    //     default:
    //         break;
    // }
}

function sourceChildTitleFocusedOut(dataElement : HTMLElement) {
    let sourceChildRow = dataElement.parentElement as HTMLProjectTableRow;
    // console.log('FOCUS OUT SOURCE CHILD');
    // console.log("event.target = ", event.target);
    // console.log("this = ", this);

    // console.log('dataElement.textContent = ', dataElement.textContent);
    // console.log('sourceChildRow.nodeObject.content.Title = ', sourceChildRow.nodeObject.content.Title);
    
    sourceChildRow.nodeObject.content.Title = dataElement.textContent;

    age_dbis.Content_UpdateWithContentObject(sourceChildRow.nodeObject.content)
        .then(updatedContentObject => {
            // console.log("Updated source child-row : ", updatedContentObject)
        })
    // // let projectContentObject = document.getElementById("age_projectPropertiesTable") as HTMLTableContentObject;

    // console.log("sourceContentObject.contentObject = ", sourcePropertiesTable.contentObject);

}


function sourcePropertyFocusedOut(focusoutElement: HTMLElement){
    // console.log('FOCUS OUT PROJECT PROPERTY');
    // console.log("event.target = ", event.target);
    // console.log("this = ", this);

    // let dataElement = event.target as HTMLElement;
    // console.log('dataElement.textContent = ', focusoutElement.textContent);
    
    // let projectTable: HTMLTableContentObject = this;


    // console.log('', event.target.)
    switch (focusoutElement.id) {
        // TYPE
        case "age_sourcePropTable-Type-value":
            sourcePropertiesTable.contentObject.Type = focusoutElement.textContent;
            break;
        // TITLE
        case "age_sourcePropTable-Title-value":
            sourcePropertiesTable.contentObject.Title = focusoutElement.textContent;
            sourceTitleElement.textContent = focusoutElement.textContent;
            break;
        // GOAL
        case "age_sourcePropTable-Url-value":
            sourcePropertiesTable.contentObject.Url = focusoutElement.textContent;
            break;

        default:
            break;
    }

    age_dbis.Content_UpdateWithContentObject(sourcePropertiesTable.contentObject)
        .then(updatedContentObject => {
            switch (focusoutElement.id) {
                // TYPE
                case "age_sourcePropTable-Type-value":
                    console.assert(updatedContentObject.Type == sourcePropertiesTable.contentObject.Type, "'PUT' content Object Type does not match the project table .contentObject.Type !");
                    break;
                // TITLE
                case "age_sourcePropTable-Title-value":
                    console.assert(updatedContentObject.Title == sourcePropertiesTable.contentObject.Title, "'PUT' content Object Title does not match the project table .contentObject.Title !");
                    break;
                // GOAL
                case "age_sourcePropTable-Url-value":
                    console.assert(updatedContentObject.Url == sourcePropertiesTable.contentObject.Url, "'PUT' content Object Goal does not match the project table .contentObject.Goal !");
                    break;

                default:
                    break;
            }


        })
    // let projectContentObject = document.getElementById("age_projectPropertiesTable") as HTMLTableContentObject;

    // console.log("sourceContentObject.contentObject = ", sourcePropertiesTable.contentObject);

}

function clickedSourceContainer(event : MouseEvent){
    let eventTarget = event.target as HTMLElement;

    switch (eventTarget.id) {
        case "age_sourceSearchButton":
        case "age_sourcePropertiesButton":
            toggleSourceTables(eventTarget.id);
            break;

        case "age_sourceNewButton":
            console.log('New source button clicked');
            
            break;
    
        default:
            break;
    }

}

function toggleSourceTables(buttonID : string){
    let childrenButton = document.getElementById("age_sourceSearchButton");
    let propertiesButton = document.getElementById("age_sourcePropertiesButton");

    sourceChildrenTable.classList.add("age_displayNone");
    sourcePropertiesTable.classList.add("age_displayNone");
    childrenButton.classList.remove("age_sourceButtonOn");
    propertiesButton.classList.remove("age_sourceButtonOn");
    
    if (buttonID == "age_sourceSearchButton"){
        sourceChildrenTable.classList.remove("age_displayNone");
        childrenButton.classList.add("age_sourceButtonOn");
    }
    else if (buttonID == "age_sourcePropertiesButton") {
        sourcePropertiesTable.classList.remove("age_displayNone");
        propertiesButton.classList.add("age_sourceButtonOn");
    }

}


export async function loadWithContentObject(_contentObject : any){
    console.log('loading Source panel with ', _contentObject);

    currentSourceObject = _contentObject;

    // let sourceObject = extensionStateFront.current_sourceObject;
    // extensionStateFront.current_sourceUuid = sourceObject.Uuid;
    sourcePropertiesTable.addEventListener("focusout", sourcePropertyFocusOut)
    sourcePropertiesTable.contentObject = _contentObject;
 
    document.getElementById('age_sourceTitle').textContent = _contentObject.Title;

    let tbody = document.getElementById('age_sourcePropertiesTable-tbody');
    tbody.innerHTML = '';

    for (const key in _contentObject) {
        // console.log(`${key}: ${sourceObject[key]}`);
        if (key === 'Type' || key === 'Title' || key === 'Url' || key === 'IAmSource') {

            tbody.innerHTML += `
		
			<tr>
				<td id=age_sourcePropTable-${key}-key class="age_element" >${key}</td>
				<td id=age_sourcePropTable-${key}-value class="age_sourcePropValue age_element" contenteditable="true" >${_contentObject[key]}</td>
			</tr>
		
		`;

        }
        else {
            tbody.innerHTML += `
		
			<tr>
				<td id=age_sourcePropTable-${key}-key class="age_element" >${key}</td>
				<td id=age_sourcePropTable-${key}-value class="age_sourcePropValue age_element">${_contentObject[key]}</td>
			</tr>
		
		`;
        }

    }

    // // console.log(document.querySelectorAll('#age_sourcePropertiesTable tbody tr'))
    // let editableSourcePropertyTds = document.querySelectorAll('.age_editableSourceProperty');
    // // // console.log(editableSourcePropertyTd)
    // for (let editableSourcePropertyTd of editableSourcePropertyTds) {
    //     // console.log(editableSourcePropertyTd.textContent);
    //     // console.log(propertyRow.textContent.length)
    //     // editableSourcePropertyTd.addEventListener('focusout', readSourcePropertiesFromDomAndWritePut)
    //     editableSourcePropertyTd.addEventListener('focusout', editableSourcePropertyFocusOut)

    // }

    await loadSourceChildren(_contentObject);
}

async function loadSourceChildren(_contentObject : any){

    let childContentEdgeObjects = await age_dbis.ContentEdge_SelectChildOfUuid(_contentObject.Uuid);



    let tbody = document.getElementById('age_sourceChildTable-tbody');
    tbody.innerHTML = '';

    for (let childContentEdgeObject of childContentEdgeObjects) {
        let tableRowHtml = `
                
                <td class="age_element age_sourceChildTable-Table" data-Uuid="${childContentEdgeObject.content.Uuid}">${childContentEdgeObject.content.Table}</td>
				<td class="age_element age_sourceChildTable-Type" data-Uuid="${childContentEdgeObject.content.Uuid}">${childContentEdgeObject.content.Type}</td>
                <td class="age_element age_sourceChildTable-Title" data-Uuid="${childContentEdgeObject.content.Uuid}" contenteditable="true">${childContentEdgeObject.content.Title}</td>

            `;
        let tr = document.createElement('tr') as HTMLProjectTableRow;
        tr.id = 'age_sourceSearchNode-' + childContentEdgeObject.content.Uuid;
        tr.nodeObject = childContentEdgeObject;
        // tr.aaa = "asd";
        tr.setAttribute('data-fuck', 'f*ck');
        // tr.dataset.Node = 1;
        // tr.dataset.Uuid = childObject.Uuid;
        tr.setAttribute('data-Node', '1');
        tr.setAttribute('data-Uuid', childContentEdgeObject.content.Uuid);
        // tr.tabIndex = 1;
        tr.innerHTML = tableRowHtml;
        // tr.addEventListener('click', clickSourceChildRow);
        // tr.addEventListener('click', (event) => { console.log(event.target.parentNode.nodeObject) });
        // Targets only the last (i.e. Title) column
        // tr.lastElementChild.addEventListener("focusout", async (event) => {

        //     let uuid = event.target.parentElement.nodeObject.content.Uuid;
        //     let contentObject = event.target.parentElement.nodeObject.content;
        //     contentObject.Title = event.target.textContent;
        //     // console.log("CCCCCCCCCC", contentObject)
        //     let putContentObject = await dbis.Content_UpdateWithContentObject(contentObject);

        //     let fetchedContentObject = await dbis.Content_SelectOnUuid(uuid);

        //     await fetchCurrentSourceChildrenThenWriteToStates();
        //     populateSourceChildTableFromState();

        //     // console.log("DDDDDDDDDD", fetchedContentObject)
        //     // copySourceChildTableFromDom();

        //     // putCurrentSourceObject();
        //     // fetchCurrentSourceChildrenThenWriteToStates();
        //     // populateSourceChildTableFromState();
        // });
        // tr.contentEditable = 'True';

        tbody.append(tr);
        // console.log(tr)
    }
    // console.table(childObjects)

}

function sourcePropertyFocusOut(event : FocusEvent){
    console.log('FOCUS OUT FROM SOURCE PROPERTY');

}

export function focusOnLastChildRowTitle(){
    let tbody = document.getElementById("age_sourceChildTable-tbody") as HTMLTableSectionElement;
    // console.log("tbody = ", tbody)
    let lastRow = tbody.lastElementChild.lastElementChild as HTMLTableCellElement;
    // console.log("lastRow = ", lastRow)

    if(lastRow.textContent.length == 0){
        lastRow.innerHTML = "<div><br></div>"
        lastRow.focus();
    }
    else{
        lastRow.focus();
            // this.selectionStart = this.selectionEnd = this.value.length;
         
            var range = document.createRange()
            var sel = window.getSelection()
        
            range.setStart(lastRow.childNodes[0], lastRow.childNodes[0].textContent.length)
            range.collapse(true)
        
            sel.removeAllRanges()
            sel.addRange(range)

    }
}




export function appendCss(): void {
    document.head.append(sourceCss);
}


export function removeCss(): void {
    sourceCss.remove();
}