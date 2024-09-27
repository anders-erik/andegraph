import * as fetcher from "../fetcher";
import * as dom from "./project_dom";
import { HTMLProjectTableRow, HTMLTableContentObject } from "./project_dom";
import {age_dbis} from "../dbi-send";

let sidePanel : Element;

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
    projectContainer.addEventListener("click", projectClick);

    fetcher.fetchHtml("projects.html")
        .then(html => {
            // console.log("HTML : ", html)
            projectContainer.innerHTML = html;
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

        }) 
  
    projectCss = document.createElement("style");
    projectCss.id = "age_projectStyle";
    fetcher.fetchCss("projects.css")
    .then(css => {
        projectCss.innerText = css;
    })

    

    console.log("sidePanel.id = ", sidePanel.id)
    
    sidePanel.append(projectContainer);


    fetchProjectSearch("")
        .then((contentObjectArray) => {
            console.log(contentObjectArray)
            dom.populateProjectSearchTable(projectSearchTable, projectSearchObjects);
        })
    

}

function clickedProjectContextMenu(event: MouseEvent){
    let eventTarget = event.target as HTMLElement;
    switch (eventTarget.id) {
        case "btn1":
            console.log(eventTarget.id)
            break;
        case "btn2":
            console.log(eventTarget.id)
            break;
        case "btn3":
            console.log(eventTarget.id)
            break;
        case "btn4":
            console.log(eventTarget.id)
            break;
        case "btn5":
            console.log(eventTarget.id)
            break;

        default:
            break;
    }
    
}

function hideProjectContextMenu(event: MouseEvent) {
    let eventTarget = event.target as HTMLElement;
    // console.log('_^_^_^_^_^_^', eventTarget.id);

    let isContextElement: boolean = eventTarget.id === "age_moreProjectOptionsContextMenu" || eventTarget.id === "age_projectMoreOptions";
    // console.log('isContextElement = ', isContextElement);

    if (!isContextElement) {
        // console.log("CLICKED CONTEXT MENU!@")
        let optionsContextMenu = document.getElementById("age_moreProjectOptionsContextMenu");
        optionsContextMenu.classList.add("age_displayNone")
    }
}



/**
 *  Main event handler in the project container.
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
        // set title
        document.getElementById('age_projectTitle').textContent = tableRowTarget.nodeObject.Title;

        
        dom.populatePropertiesTable(projectPropertiesTable, tableRowTarget.nodeObject);
        // populate properties table 
        fetchProjectChildren(clickTarget.dataset.uuid)
            .then((contentEdgeObjects) => { dom.populateChildrenTable(projectChildrenTable, projectContentEdgeChildren)}
        );

        // move focus to the children-tab
        document.getElementById("age_projectChildrenButton").click()
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
        // projectTitleClicked(event.target as HTMLElement);
        let projectContainerElement : HTMLElement = document.getElementById("age_projectContainer");
        projectContainerElement.classList.contains("collapsed") ? projectContainerElement.classList.remove("collapsed") : projectContainerElement.classList.add("collapsed");
    }

    else{
        // console.log('Ignored Project Click.');
    }
}

function toggleMoreOptions(){
    // console.log("TOGGLE MORE OPTIONS")
    let buttonBoundingRect = projectMoreOptionsButton.getBoundingClientRect();
    let btnLeft = buttonBoundingRect.left;
    let btnBottom = buttonBoundingRect.bottom;
    
    let moreOptionsContextMenu = document.getElementById("age_moreProjectOptionsContextMenu");
    moreOptionsContextMenu.style.left = btnLeft + "px";
    moreOptionsContextMenu.style.top = btnBottom + 5 + "px";

    moreOptionsContextMenu.classList.contains("age_displayNone") ? moreOptionsContextMenu.classList.remove("age_displayNone") : moreOptionsContextMenu.classList.add("age_displayNone");
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
    // console.log('focus search ')
    // projectSearchInput.addEventListener('keypress', keyPressDuringSearch)
    projectSearchElement.addEventListener('keydown', keyDownDuringSearch)
    // keyDownDuringSearch();
}


function searchProjectOut() {
    // console.log('searchProjectOut()');
    
    let searchStringLength = projectSearchElement.textContent.length;
    if(searchStringLength === 0){
        // console.log('EMPTY SEARCH STRING');
        searchStringExists = false;
        projectSearchElement.innerHTML = '<div>Q  :  Search . . .<br></div>';
    }
    else{
        searchStringExists = true;
    }
    // extensionStateFront.projectSearchActive = false;
    //writeStateFromFront();
    // focusProjectSearch = false;
    // console.log('focusout search ')
    // projectSearchInput.removeEventListener('keypress', keyPressDuringSearch)
    projectSearchElement.removeEventListener('keydown', keyDownDuringSearch)
}


// Perform search with slight delay to make sure new input is written to contentEditanle input
async function keyDownDuringSearch(event : KeyboardEvent) {
    // keyEvent.preventDefault();
    // console.log('keyDownDuringSearch()');
    // console.log('event.key = ', event.key);
    
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
        
        // console.log("projectSearchElement.textContent = ", projectSearchElement.textContent);

        fetchProjectSearch(projectSearchElement.textContent)
            .then((contentObjectArray) => {
                // console.log(contentObjectArray)
                dom.populateProjectSearchTable(projectSearchTable, projectSearchObjects);
            })

        // age_dbis.Content_SelectOnTitleLikeString();

        // await fetchProjectSearchThenWriteToStates();

        // populateProjectSearchTableFromState();

    }, 100);


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

function projectTitleClicked(tableRow: HTMLElement): void {
    console.log("Project title clicked: ", tableRow)
}
function projectSearchButtonClicked(tableRow: HTMLElement) : void {
    console.log("Project search clicked: ", tableRow)
}
function projectChildrenButtonClicked(tableRow: HTMLElement): void {
    console.log("Project children clicked: ", tableRow)
}
function projectPropertiesButtonClicked(tableRow: HTMLElement): void {
    console.log("Project properties clicked: ", tableRow)
}
function projectMoreOptionsButtonClicked(tableRow: HTMLElement): void {
    console.log("Project options clicked: ", tableRow)
}
function projectSearchRowClicked(tableRow: HTMLProjectTableRow): void {
    console.log("Table row clicked: ", tableRow)
}


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