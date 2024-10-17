import * as fetcher from "./fetcher";
import * as projects from "./projects/projects";
import * as source from "./source/source";
import * as clipboard from "./clipboard";

import { HTMLProjectChildRow } from "./projects/project_dom";

// import { age_dbis } from "./dbi-send";

let overlayContainer : Element;
let overlayCss: HTMLElement;

let tableCss: HTMLElement;

// other cached elements
let contextOverlay: Element;

let sidePanel: Element;

/**
 *  Initializing the extension overlay HTML, CSS, Events, and its sub-modules.
 * 
 */
async function initOverlay() : Promise<void>{
    // console.log('OVERLAY TS INIT'); 

    overlayContainer = document.createElement('div');
    overlayContainer.id = "age_overlayContainer"; 
    overlayContainer.setAttribute("spellcheck","false");


    // Extension-wide events!
    overlayContainer.addEventListener("click", extensionClickHandler);
    overlayContainer.addEventListener("focusin", overlayFocusin);


    // Prevents keystrokes on certain websites from registring when writing in the overlay - tested on youtube shorts - space not working on regular youtube
    // Maybe a bit too much to have listening at all times! BUT I simply need this to work for now..
    overlayContainer.addEventListener("keydown", contentEditableKeyDetection, false);
    overlayContainer.addEventListener("keyup", contentEditableKeyDetection, false);
    overlayContainer.addEventListener("keypress", contentEditableKeyDetection, false);
    
    
    // Custom Events for specific extension-actions
    overlayContainer.addEventListener("loadsource", (event : CustomEvent) => {
        source.loadWithContentObject(event.detail.contentObject);
    });
    overlayContainer.addEventListener("newsource", (event: CustomEvent) => {
        source.loadWithContentObject(event.detail.contentObject);
        source.showSourceProperties(); // Make sure we go to the properties tab when crating a new source!
    });
    overlayContainer.addEventListener("newproject", (event: CustomEvent) => {});
    overlayContainer.addEventListener("refreshextension", (event: CustomEvent) => {
        console.log("Refresh extension");
        projects.reloadCurrentProject();
    });


    // Overlay HTML
    let overlayHtml = await fetcher.fetchHtml("overlay.html");
    overlayContainer.innerHTML = overlayHtml;
    contextOverlay = overlayContainer.querySelector("#age_contextOverlay");
    sidePanel = overlayContainer.querySelector("#age_overlayRightPanel");   

    // CSS
    overlayCss = document.createElement("style");
    overlayCss.id = "age_overlayStyle";
    overlayCss.innerText = await fetcher.fetchCss("overlay.css");

    tableCss = document.createElement("style");
    tableCss.id = "age_tableStyle";
    tableCss.innerText = await fetcher.fetchCss("tables.css");

    // Load Extension Modules
    projects.initProjects(sidePanel, contextOverlay.querySelector("#age_moreProjectOptionsContextMenu")); // Pass the context menu!
    source.initSourceContainer(sidePanel, contextOverlay.querySelector("#age_moreSourceOptionsContextMenu")); // Pass the context menu!
    clipboard.initClipboard(sidePanel);


}


/**
 * Prevents the default behavior and stops propagation of global key-events for:
 * 1) content-editable elements
 * 2) When capturing to the text-clipboard
 * 
 * Also implements the focusing of parent when pressing enter/escape.
 * 
 * @param keyevent 
 */
function contentEditableKeyDetection(keyevent: KeyboardEvent) {
    let activeElement = document.activeElement as HTMLElement;

    if (activeElement.isContentEditable) {
        
        // enable new line using enter+shift
        if (keyevent.key === "Enter" && keyevent.shiftKey){

        }
        // prevent new line and exit field
        else if (keyevent.key === "Enter" || keyevent.key === "Escape"){
            keyevent.preventDefault();
            (keyevent.target as HTMLElement).parentElement.focus();
        }

        keyevent.stopPropagation();
    }

    if(clipboard.textConcatenationCapturing){
        keyevent.preventDefault();
        keyevent.stopPropagation();
    }
}



// make sure that empty element are populated with default editable elements
function overlayFocusin(event: FocusEvent): void {
    let eventTarget = event.target as HTMLElement;

    if (eventTarget.isContentEditable && eventTarget.textContent == "") {
        // eventTarget.innerHTML = "<div></div><br>"; // not working.. Maybe if I have text not centered in elmeent..
    }
}

function extensionClickHandler(event : MouseEvent){

    let eventTarget = event.target as HTMLElement;
    // console.log('_^_^_^_^_^_^', eventTarget.id);
    
    /* 
        NOTE: THIS HAS BEEN MOVED TO ITS OWN EVENT!
    */
    // if (eventTarget.parentElement.classList.contains("age_projchildTableRow")){
    //     let projectChildRow = eventTarget.parentElement as HTMLProjectChildRow;
    //     // console.log('Clicked on child row with uuid = ', projectChildRow.ContentEdgeObject.content.Uuid);
    //     console.log("TODO: LOAD CLICKED SOURCES! ", projectChildRow.ContentEdgeObject.content);
        
    // }
}


function showOverlay() : void{
    document.body.lastElementChild.after(overlayContainer);

    document.head.append(overlayCss);
    document.head.append(tableCss);
    projects.appendCss();
    source.appendCss();
    clipboard.appendCss();
    // fetcher.fetchHtml("overlay.html")
    //     .then(html => overlayContainer.innerHtml = html)
}


function hideOverlay() : void {
    overlayContainer.remove();
    overlayCss.remove();

    tableCss.remove();

    projects.removeCss();
    source.removeCss();
    clipboard.removeCss();
}




export {
    initOverlay,
    showOverlay,
    hideOverlay,
}