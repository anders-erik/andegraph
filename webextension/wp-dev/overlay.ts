import * as fetcher from "./fetcher";
import * as projects from "./projects";


let overlayContainer : Element;
let overlayCss: HTMLElement;
// other cached elements
let contextOverlay: Element;
let sidePanel: Element;


function initOverlay() : void{
    console.log('OVERLAY TS INIT');

    overlayContainer = document.createElement('div');
    overlayContainer.id = "age_overlayContainer";  

    fetcher.fetchHtml("overlay.html")
        .then(html => {
            // console.log("HTML : ", html)
            overlayContainer.innerHTML = html;
            contextOverlay = overlayContainer.querySelector("#age_contextOverlay");
            sidePanel = overlayContainer.querySelector("#age_overlayRightPanel");
            projects.initProjects(sidePanel);
        })

    overlayCss = document.createElement("style");
    overlayCss.id = "age_overlayStyle";
    fetcher.fetchCss("overlay.css")
    .then(css => {
        overlayCss.innerText = css;
    })

}


function showOverlay() : void{
    document.body.lastElementChild.after(overlayContainer);

    document.head.append(overlayCss);
    projects.appendCss();
    // fetcher.fetchHtml("overlay.html")
    //     .then(html => overlayContainer.innerHtml = html)
}


function hideOverlay() : void {
    overlayContainer.remove();
    overlayCss.remove();

    projects.removeCss();
}




export {
    initOverlay,
    showOverlay,
    hideOverlay,
}