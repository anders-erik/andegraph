// import * as sdom from "./source_dom";

import * as fetcher from "../fetcher";
import { age_dbis } from "../dbi-send";
import * as util from "../util";


let sidePanel: Element;

let sourceTitleElement : HTMLElement;

let sourceChildrenButton : HTMLElement;
let sourcePropertiesButton : HTMLElement;

let sourceContainer: Element;
let sourceCss: HTMLElement;

let sourceChildrenTable: HTMLTableElement; 
let projectContentEdgeChildren: any;

let sourcePropertiesTable: ContentObjectHTML;

 
let currentSourceObject: any;
let currentSourceUuid: any; 
export function getCurrentSourceObject(): any { return sourcePropertiesTable.contentObject};
export function getCurrentSourceUuid(): any { return currentSourceUuid };


export function initSourceContainer(_sidePanel: Element, _sourceMoreOptionsContextMenu: HTMLDivElement): void {
    console.log('initSourceContainer(...)');

    sidePanel = _sidePanel;

    sourceContainer = document.createElement('div');
    sourceContainer.id = "age_sourceContainer";
    sourceContainer.classList.add("age_panelContainer", "collapsed");
    sourceContainer.addEventListener("click", clickedSourceContainer);
    // sourceContainer.addEventListener("focusout", sourcePropertyFocusedOut);
    sourceContainer.addEventListener("focusout", focusoutSourceContentEditable);
    

    fetcher.fetchHtml("source.html")
        .then(html => {
            // console.log("HTML : ", html)
            sourceContainer.innerHTML = html;
            sourceTitleElement = sourceContainer.querySelector("#age_sourceTitle");
            sourceChildrenTable = sourceContainer.querySelector("#age_sourceChildTable");
            sourcePropertiesTable = sourceContainer.querySelector("#age_sourcePropertiesTable");

            sourceChildrenButton = sourceContainer.querySelector("#age_sourceSearchButton");
            sourcePropertiesButton = sourceContainer.querySelector("#age_sourcePropertiesButton");
        })

    sourceCss = document.createElement("style");
    sourceCss.id = "age_sourceStyle";
    fetcher.fetchCss("source.css")
        .then(css => {
            sourceCss.innerText = css;
        })


    sidePanel.append(sourceContainer);

}

/** Generic focusout-events from content-editable fields that are captured by the source container.
 *  Redirects to specific function depending on if its a source-shard or a property value
 */
function focusoutSourceContentEditable(event : FocusEvent){
    let focusoutTarget = event.target as HTMLElement;
    if (focusoutTarget.classList.contains("Title")){
        focusoutSourceChildTitle(focusoutTarget);
    }
    else if (focusoutTarget.classList.contains("age_sourcePropValue")){
        focusoutSourceProperty(focusoutTarget);
    }

}

/** Grabs the textContent of targeted element and updates the associated contentObject using API */
function focusoutSourceChildTitle(dataElement : HTMLElement) {
    let sourceChildRow = dataElement.parentElement as ContentObjectHTML;
    
    sourceChildRow.contentObject.content.Title = dataElement.textContent;

    util.UuidCheckAndUpdateTitles(sourceChildRow.contentObject.content.Uuid, dataElement.textContent); // Update titles in currently loaded extension

    age_dbis.Content_UpdateWithContentObject(sourceChildRow.contentObject.content)
        .then(updatedContentObject => {
            // console.log("Updated source child-row : ", updatedContentObject)
        })

}

/** Updates the coresponding contentObject, sends it to database, and asserts the returned content objects */
function focusoutSourceProperty(focusoutElement: HTMLElement){

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
            util.UuidCheckAndUpdateTitles(currentSourceObject.Uuid, focusoutElement.textContent); // Update titles in currently loaded extension
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

    currentSourceObject = sourcePropertiesTable.contentObject;


    
}

/** Captures the container-clicks. Current responsabilities:
 *  1. Toggle between the two source tables.
 */
function clickedSourceContainer(event : MouseEvent){
    let eventTarget = event.target as HTMLElement;

    if (eventTarget.id === "age_sourceSearchButton" || eventTarget.id === "age_sourcePropertiesButton"){
        displaySourceTable(eventTarget.id);
    }


}

export function showSourceChildren() {
    sourceChildrenButton.click();
}
export function showSourceProperties(){
    sourcePropertiesButton.click();
}

/** Will load the table and update the button for the corresponding button-id provided */
function displaySourceTable(buttonID : string){
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
                
                <td class="age_element age_sourceChildTable Table" data-Uuid="${childContentEdgeObject.content.Uuid}">${childContentEdgeObject.content.Table}</td>
				<td class="age_element age_sourceChildTable Type" data-Uuid="${childContentEdgeObject.content.Uuid}">${childContentEdgeObject.content.Type}</td>
                <td class="age_element age_sourceChildTable Title" data-Uuid="${childContentEdgeObject.content.Uuid}" contenteditable="true">${childContentEdgeObject.content.Title}</td>

            `;
        
        // Been unable to turn this into a good content obejct so far. I need to extend ALL possible html-elements to make generic interface...
        // potential solution is then HTMLTableRowElement & contentobject : any
        let tr = document.createElement('tr') as HTMLTableRowElement; 
        tr.id = 'age_sourceSearchNode-' + childContentEdgeObject.content.Uuid;
        tr.contentObject = childContentEdgeObject;
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