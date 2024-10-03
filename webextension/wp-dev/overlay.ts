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


function initOverlay() : void{
    console.log('OVERLAY TS INIT');

    overlayContainer = document.createElement('div');
    overlayContainer.id = "age_overlayContainer"; 
    overlayContainer.setAttribute("spellcheck","false");
    overlayContainer.addEventListener("click", extensionClickHandler);
    overlayContainer.addEventListener("focusin", overlayFocusin);

    overlayContainer.addEventListener("loadsource", (event : CustomEvent) => {
        source.loadWithContentObject(event.detail.contentObject);
    });
    overlayContainer.addEventListener("newsource", (event: CustomEvent) => {
        source.loadWithContentObject(event.detail.contentObject);
        source.showSourceProperties(); // Make sure we go to the properties tab when crating a new source!
    });
    overlayContainer.addEventListener("newproject", (event: CustomEvent) => {});


    fetcher.fetchHtml("overlay.html")
        .then(html => {
            // console.log("HTML : ", html)
            overlayContainer.innerHTML = html;
            contextOverlay = overlayContainer.querySelector("#age_contextOverlay");
            // contextOverlay.addEventListener("click", hideContextMenus);
            sidePanel = overlayContainer.querySelector("#age_overlayRightPanel");

            
            projects.initProjects(sidePanel, contextOverlay.querySelector("#age_moreProjectOptionsContextMenu")); // Pass the context menu!
            source.initSourceContainer(sidePanel, contextOverlay.querySelector("#age_moreSourceOptionsContextMenu")); // Pass the context menu!
            clipboard.initClipboard(sidePanel);
        })

    overlayCss = document.createElement("style");
    overlayCss.id = "age_overlayStyle";
    fetcher.fetchCss("overlay.css")
    .then(css => {
        overlayCss.innerText = css;
    })

    tableCss = document.createElement("style");
    tableCss.id = "age_tableStyle";
    fetcher.fetchCss("tables.css") 
        .then(css => {
            tableCss.innerText = css;
        })

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