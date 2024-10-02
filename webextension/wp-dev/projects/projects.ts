import * as fetcher from "../fetcher";
import * as dom from "./project_dom";
import { HTMLProjectTableRow, HTMLTableContentObject } from "./project_dom";
import {age_dbis} from "../dbi-send";


let currentProjectObject : any = null;

let sidePanel : Element;
let sidePanelIsRight : boolean = true;

let projectMoreOptionsContextMenu : HTMLDivElement;

let projectContainer : Element;
let projectCss: HTMLElement;

let projectMoreOptionsButton : HTMLElement;
let projectMoreOptionsMenu: HTMLElement;

let projectSearchElement : HTMLDivElement;
let searchStringExists : boolean = false;

let projectSearchObjects: any;
let projectSearchTable: HTMLTableElement;

let projectContentEdgeChildren : any;
let projectChildrenTable : HTMLTableElement;

let projectPropertiesTable: HTMLTableContentObject;

let projectTitleElement : HTMLElement;


// interface HTMLTableRowElement {
//     nodeObject?: any;
// }

// interface HTMLProjectTableRow extends HTMLTableRowElement {
//     nodeObject: any;
// }


function initProjects(_sidePanel : Element, _projectMoreOptionsContextMenu : HTMLDivElement) : void{
    console.log('OVERLAY TS INIT');

    sidePanel = _sidePanel;

    // MORE OPTIONS CONTEXT MENU
    projectMoreOptionsContextMenu = _projectMoreOptionsContextMenu;
    projectMoreOptionsContextMenu.addEventListener("click", clickedProjectContextMenu)
    document.body.addEventListener("click", hideProjectContextMenu, {capture: false});

    projectContainer = document.createElement('div');
    projectContainer.id = "age_projectContainer";
    projectContainer.classList.add("age_panelContainer");
    projectContainer.addEventListener("click", projectClick);
    projectContainer.addEventListener("focusout", projectPropertyFocusOut);

    fetcher.fetchHtml("projects.html")
        .then(html => {
            // console.log("HTML : ", html)
            projectContainer.innerHTML = html;
            projectTitleElement = projectContainer.querySelector("#age_projectTitle");
            projectSearchTable = projectContainer.querySelector("table");
            projectChildrenTable = projectContainer.querySelector("#age_projectChildrenTable");
            projectPropertiesTable = projectContainer.querySelector("#age_projectPropertiesTable");
            projectSearchElement = projectContainer.querySelector("#age_projectSearchInput");
            projectSearchElement.addEventListener("focusin", searchProjectIn);
            projectSearchElement.addEventListener("focusout", searchProjectOut);

            // TODO : grab the more options context menu
            // projectMoreOptionsMenu = 
            projectMoreOptionsButton = projectContainer.querySelector("#age_projectMoreOptions");
            let moreOptionsBackgroundUrl = browser.runtime.getURL(
                "resources/more-options.png"
            );
            let backgroundString = `url(${moreOptionsBackgroundUrl})`;
            projectMoreOptionsButton.style.backgroundImage = backgroundString;

            // Search icon
            let searchBackgroundUrl = browser.runtime.getURL(
                "resources/search-icon.png"
            );
            let searchBackgroundString = `url(${searchBackgroundUrl})`;
            projectSearchElement.style.backgroundImage = searchBackgroundString;

            fetchProjectSearch("") // perform search only after guaranteed load
                .then((contentObjectArray) => {
                    console.log(contentObjectArray)
                    dom.populateProjectSearchTable(projectSearchTable, projectSearchObjects);
                })
        }) 
  
    projectCss = document.createElement("style");
    projectCss.id = "age_projectStyle";
    fetcher.fetchCss("projects.css")
    .then(css => {
        projectCss.innerText = css;
    })

    

    console.log("sidePanel.id = ", sidePanel.id)
    
    sidePanel.append(projectContainer);


    
    
    
}




/**
 * Add new project object and
 */
async function createNewProject() {
    let newProjectObject = await age_dbis.Content_InsertOnTable("Project")
    currentProjectObject = newProjectObject;
    // await loadProjectWithContentObject(newProjectObject);
    reloadCurrentProject();
}

/**
 *   Reload using the already set values.
*/
export async function reloadCurrentProject() {
    await reloadChildrenTable();
    await reloadPropertiesTable();
    await refreshProjectTitleElement();
    performSearch();
}


function loadProjectWithUuid(Uuid : string | number){
    age_dbis.Content_SelectOnUuid(Uuid)
        .then((contentObject) => {
            loadProjectWithContentObject(contentObject);
        })
}

async function reloadChildrenTable(){
    let contentEdges = await age_dbis.ContentEdge_SelectChildOfUuid(currentProjectObject.Uuid)
    dom.populateChildrenTable(projectChildrenTable, contentEdges);
}
async function reloadPropertiesTable() {
    
    age_dbis.Content_SelectOnUuid(currentProjectObject.Uuid)
        .then((contentObject) => {
            dom.populatePropertiesTable(projectPropertiesTable, contentObject);
        })   
}
function refreshProjectTitleElement(){
    projectTitleElement.textContent = currentProjectObject.Title;
}


function projectPropertyFocusOut(event: FocusEvent): void {
    console.log('FOCUS OUT PROJECT PROPERTY');
    // console.log("event.target = ", event.target);
    // console.log("this = ", this);

    let dataElement = event.target as HTMLElement;
    // let projectTable: HTMLTableContentObject = this;
    

    // console.log('', event.target.)
    switch (dataElement.id) {
        // TYPE
        case "age_projPropTable-Type-value":
            projectPropertiesTable.contentObject.Type = dataElement.textContent;
            break;
        // TITLE
        case "age_projPropTable-Title-value":
            projectPropertiesTable.contentObject.Title = dataElement.textContent;
            break;
        // GOAL
        case "age_projPropTable-Goal-value":
            projectPropertiesTable.contentObject.Goal = dataElement.textContent;
            break;

        default:
            break;
    }

    age_dbis.Content_UpdateWithContentObject(projectPropertiesTable.contentObject)
        .then(updatedContentObject => {
            switch (dataElement.id) {
                // TYPE
                case "age_projPropTable-Type-value":
                    console.assert(updatedContentObject.Type == projectPropertiesTable.contentObject.Type, "'PUT' content Object Type does not match the project table .contentObject.Type !");
                    break;
                // TITLE
                case "age_projPropTable-Title-value":
                    console.assert(updatedContentObject.Title == projectPropertiesTable.contentObject.Title, "'PUT' content Object Title does not match the project table .contentObject.Title !");
                    break;
                // GOAL
                case "age_projPropTable-Goal-value":
                    console.assert(updatedContentObject.Goal == projectPropertiesTable.contentObject.Goal, "'PUT' content Object Goal does not match the project table .contentObject.Goal !");
                    break;

                default:
                    break;
            }


        })
    // let projectContentObject = document.getElementById("age_projectPropertiesTable") as HTMLTableContentObject;

    // console.log("projectContentObject.contentObject = ", projectPropertiesTable.contentObject);
    currentProjectObject = projectPropertiesTable.contentObject;

    refreshProjectTitleElement();


    // Update Titles in the search
    let elementWithSameUuid = document.querySelectorAll(`[data-uuid='${currentProjectObject.Uuid}']`);
    elementWithSameUuid.forEach((_element) => {
        if (_element.classList.contains("age_element") && _element.classList.contains("age_projectRowSearchData"))
            _element.textContent = dataElement.textContent;
    })
}

async function clickedProjectContextMenu(event: MouseEvent){
    let eventTarget = event.target as HTMLElement;
    switch (eventTarget.id) {
        case "newProjectBtn":
            await createNewProject();
            showProjectProperties();
            break;
        case "newSourceBtn":
            insertNewSourceToActiveProject();
            break;
        case "refreshExtension":
            console.warn("'refreshExtension' NOT FULLY IMPLEMENTED ! ONLY PROJECT IS REFRESHED");
            reloadCurrentProject();
            break;
        case "printCurrentProject":
            console.log(currentProjectObject);
            console.log(JSON.stringify(currentProjectObject));
            break;
        case "moveExtension":
            toggleExtensionLocation();
            break;

        default:
            break;
    }
}

export function toggleExtensionLocation(){
    // Shift between left and right
    if (sidePanelIsRight) {
        document.getElementById("age_overlayContainer").style.justifyContent = "start";
        sidePanelIsRight = false;
    }
    else {
        document.getElementById("age_overlayContainer").style.justifyContent = "end";
        sidePanelIsRight = true;
    }
}
    
// }
// <button id="refreshExtension" > Refresh from server </button>
//     < button id = "printCurrentProject" > Copy Project Properties </button>
//         < button id = "moveExtension" > Move Extension </button>


/**
 * Add new child-source, fires off the loadsource CutomEvent, and then reloads the project child table.
 */
export async function insertNewSourceToActiveProject(){

    if (currentProjectObject === undefined || currentProjectObject === null){
        console.warn("No current Project. Can't add new source.");
        return;
    }

    let contentEdgeObject: any = await age_dbis.ContentEdge_InsertAdjacentToUuidIntoTable(currentProjectObject.Uuid, 1, 'Source', '', '', '/')

    // make sure we set a default url!
    let _newSourceObject = contentEdgeObject.content;
    _newSourceObject.Url = window.location.href;
    _newSourceObject.Title = document.title;
    _newSourceObject = await age_dbis.Content_UpdateWithContentObject(_newSourceObject);

    // SEND NEW SOURCE MESSAGE
    let newsourceEvent = new CustomEvent("newsource", {
        bubbles: true,
        detail: { contentObject: _newSourceObject },
    });
    projectContainer.dispatchEvent(newsourceEvent);
    
    // update project children table
    age_dbis.ContentEdge_SelectChildOfUuid(currentProjectObject.Uuid)
        .then((contentEdges) => {
            dom.populateChildrenTable(projectChildrenTable, contentEdges);
        })
    
}


function hideProjectContextMenu(event: MouseEvent) {
    let eventTarget = event.target as HTMLElement;
    // console.log('_^_^_^_^_^_^', eventTarget.id);

    let isContextElement: boolean = eventTarget.id === "age_moreProjectOptionsContextMenu" || eventTarget.id === "age_projectMoreOptions";
    // console.log('isContextElement = ', isContextElement);

    if (!isContextElement) {
        let optionsContextMenu = document.getElementById("age_moreProjectOptionsContextMenu");
        if (optionsContextMenu !== null)
            optionsContextMenu.classList.add("age_displayNone")
    }
}



/**
 *  Main click handler in the project container.
 * 
 * @param event 
 */

function projectClick(event: Event){

    // console.log("Click detected in project container.");
    let clickTarget = event.target as HTMLElement;

    
// SEARCH ROW
    if (clickTarget.classList.contains("age_projectRowSearchData")){
        // grab parent because we clicked on data-element
        let tableRowTarget = clickTarget.parentElement as HTMLProjectTableRow;
        loadProjectWithContentObject(tableRowTarget.nodeObject);
        showProjectChildren();
    }
// SEARCH/CHILDREN/PROPERTIES BUTTON
    else if (
           clickTarget.id == "age_projectSearchButton" 
        || clickTarget.id == "age_projectChildrenButton" 
        || clickTarget.id == "age_projectPropertiesButton"
    ){
        // projectSearchButtonClicked(event.target as HTMLElement);
        showProjectTable(clickTarget.id);
    }
// MORE OPTIONS BUTTON
    else if (clickTarget.id == "age_projectMoreOptions") {
        // projectMoreOptionsButtonClicked(event.target as HTMLElement);
        toggleMoreOptions();
    }
// TITLE
    else if (clickTarget.id == "age_projectTitle") {
        // TOGGLE Project/source container expansions/collapse
        let projectContainerElement : HTMLElement = document.getElementById("age_projectContainer");
        projectContainerElement.classList.contains("collapsed") ? projectContainerElement.classList.remove("collapsed") : projectContainerElement.classList.add("collapsed");
        let sourceContainerElement: HTMLElement = document.getElementById("age_sourceContainer");
        sourceContainerElement.classList.contains("collapsed") ? sourceContainerElement.classList.remove("collapsed") : sourceContainerElement.classList.add("collapsed");

    }

    else{
        // console.log('Ignored Project Click.');
    }
}

/**
 *  loads an existing project. Usually from clicking on a project during search OR creating a new project object.
 */
function loadProjectWithContentObject(_contentObject : any){
    // Set module variable
    currentProjectObject = _contentObject;

    // set title
    document.getElementById('age_projectTitle').textContent = _contentObject.Title;


    dom.populatePropertiesTable(projectPropertiesTable, _contentObject);
    // populate properties table 
    fetchProjectChildren(_contentObject.Uuid)
        .then((contentEdgeObjects) => { dom.populateChildrenTable(projectChildrenTable, projectContentEdgeChildren) }
    );
    
    // showProjectChildren();
}

function showProjectChildren(){
    // move focus to the children-tab
    document.getElementById("age_projectChildrenButton").click()
}
function showProjectProperties() {
    // move focus to the children-tab
    document.getElementById("age_projectPropertiesButton").click()
}

function toggleMoreOptions(){
    // console.log("TOGGLE MORE OPTIONS")
    let buttonBoundingRect = projectMoreOptionsButton.getBoundingClientRect();
    let btnLeft = buttonBoundingRect.left;
    let btnRight = buttonBoundingRect.right;
    let btnBottom = buttonBoundingRect.bottom;
    let btnX = buttonBoundingRect.x;


    projectMoreOptionsContextMenu.style.top = btnBottom + 5 + "px";
    if(sidePanelIsRight){
        
        projectMoreOptionsContextMenu.style.left = btnLeft - 170  + "px";
    }
    else{
        projectMoreOptionsContextMenu.style.left = btnLeft + "px";
    }

    projectMoreOptionsContextMenu.classList.contains("age_displayNone") ? projectMoreOptionsContextMenu.classList.remove("age_displayNone") : projectMoreOptionsContextMenu.classList.add("age_displayNone");
}



function searchProjectIn() {
    // console.log("searchProjectIn()")
    // focusProjectSearch = true;
    // extensionStateFront.projectSearchActive = true;
    //writeStateFromFront();
    // console.log('projectSearchElement.textContent = ', projectSearchElement.textContent);
    
    // Empty search container if no previous search string exists
    if (!searchStringExists) {
        projectSearchElement.innerHTML = '<div><br></div>'; // default content on 'contenteditable' elements 
        // setInterval(() => { searchInput.innerHTML += '<br>' }, 50);
    }
    searchStringExists = true;
    // console.log('focus search ')
    // projectSearchInput.addEventListener('keypress', keyPressDuringSearch)
    projectSearchElement.addEventListener('keydown', keyDownDuringSearch)
    // keyDownDuringSearch();
}


function searchProjectOut() {
    // console.log('searchProjectOut()');
    
    let searchStringLength = projectSearchElement.textContent.length;
    if(searchStringLength === 0){
        searchStringExists = false;
        projectSearchElement.innerHTML = '<div>Q  :  Search . . .<br></div>';
    }
    else{
        searchStringExists = true;
    }
    projectSearchElement.removeEventListener('keydown', keyDownDuringSearch)
}


// Perform search with slight delay to make sure new input is written to contentEditanle input
async function keyDownDuringSearch(event : KeyboardEvent) {
    
    // User just deleted the last character so we reset the default contenteditable elment structure
    // if we con't do this the user will inadvertiedly remove the containing <div>, breaking the typing-behaviour!
    if (event.key === "Backspace" && projectSearchElement.textContent.length === 1){
        console.log('Last character deletion protection!');
        projectSearchElement.innerHTML = '<div><br></div>'; // default content on 'contenteditable' elements 
        event.preventDefault();
    }
    
    // This does not prevent a request on each keystroke
    // BUT it enables reading the change of each keystroke. When this method is called the textContent of the serach box has not been updated!!
    setTimeout(async () => {

        performSearch();

    }, 100);

}

function performSearch(){
    let searchString : string = "";
    if(searchStringExists)
        searchString = projectSearchElement.textContent;
    else
        searchString = "";

    // console.log("Searching with searchstrign = ", searchString)
    fetchProjectSearch(searchString)
        .then((contentObjectArray) => {
            // console.log(contentObjectArray)
            dom.populateProjectSearchTable(projectSearchTable, contentObjectArray);
        })
}


function showProjectTable(buttonId : string){
    // age_projectButtonOn

    // Search box
    let searchBox = document.getElementById("age_projectSearchInput");
    searchBox.classList.add("age_displayNone");

    // Reset the buttons
    let searchButton = document.getElementById("age_projectSearchButton")
    let childrenButton = document.getElementById("age_projectChildrenButton")
    let propertiesButton = document.getElementById("age_projectPropertiesButton")
    searchButton.classList.remove("age_projectButtonOn");
    childrenButton.classList.remove("age_projectButtonOn");
    propertiesButton.classList.remove("age_projectButtonOn");

    // Reset the Tables
    let searchTable = document.getElementById("age_projectSearchTable");
    let childrenTable = document.getElementById("age_projectChildrenTable");
    let propertiesTable = document.getElementById("age_projectPropertiesTable");
    searchTable.classList.add("age_displayNone");
    childrenTable.classList.add("age_displayNone");
    propertiesTable.classList.add("age_displayNone");

    // Active the correct one
    if (buttonId === "age_projectSearchButton"){
        searchTable.classList.remove("age_displayNone");
        searchButton.classList.add("age_projectButtonOn");
        searchBox.classList.remove("age_displayNone");
    }
    else if (buttonId === "age_projectChildrenButton"){
        childrenTable.classList.remove("age_displayNone");
        childrenButton.classList.add("age_projectButtonOn");
    }
    else if (buttonId === "age_projectPropertiesButton"){
        propertiesTable.classList.remove("age_displayNone");
        propertiesButton.classList.add("age_projectButtonOn");
    }
    
}

// function projectTitleClicked(tableRow: HTMLElement): void {
//     console.log("Project title clicked: ", tableRow)
// }
// function projectSearchButtonClicked(tableRow: HTMLElement) : void {
//     console.log("Project search clicked: ", tableRow)
// }
// function projectChildrenButtonClicked(tableRow: HTMLElement): void {
//     console.log("Project children clicked: ", tableRow)
// }
// function projectPropertiesButtonClicked(tableRow: HTMLElement): void {
//     console.log("Project properties clicked: ", tableRow)
// }
// function projectMoreOptionsButtonClicked(tableRow: HTMLElement): void {
//     console.log("Project options clicked: ", tableRow)
// }
// function projectSearchRowClicked(tableRow: HTMLProjectTableRow): void {
//     console.log("Table row clicked: ", tableRow)
// }


function fetchProjectSearch(searchString : string) : Promise<any>{
    return age_dbis.Content_SelectOnTitleLikeString(searchString, "50", "Project", "", "")
        .then((contentObjectArray: any) => {
            // console.log(contentObjectArray);
            projectSearchObjects = contentObjectArray;
            return Promise.resolve(contentObjectArray);
        })
        .catch((error : Error) => {
            return Promise.reject();
        })
}

function fetchProjectChildren(Uuid : string | number): Promise<any> {
    return age_dbis.ContentEdge_SelectChildOfUuid(Uuid)
        .then((contentEdgeObjectArray: any) => {
            // console.log(contentObjectArray);
            projectContentEdgeChildren = contentEdgeObjectArray;
            console.log('projectContentEdgeChildren = ', projectContentEdgeChildren);
            
            return Promise.resolve(projectContentEdgeChildren);
        })
        .catch((error: Error) => {
            return Promise.reject();
        })
}

function appendCss() : void{
    document.head.append(projectCss);
}


function removeCss() : void {
    projectCss.remove();
}




export {
    initProjects,
    appendCss,
    removeCss,
}