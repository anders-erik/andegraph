import * as fetcher from "./fetcher";

let overlayContainer;


function initOverlay(){
    // console.log('OVERLAY INIT');

    overlayContainer = document.createElement('div');
    overlayContainer.id = "agw_overlay-container";

    fetcher.fetchHtml("overlay.html")
        .then(html => {
            // console.log("HTML : ", html)
            overlayContainer.innerHTML = html;
        })

}

function showOverlay(){
    document.body.lastElementChild.after(overlayContainer);
    // fetcher.fetchHtml("overlay.html")
    //     .then(html => overlayContainer.innerHtml = html)
}


function hideOverlay() {
    overlayContainer.remove();
}




export {
    initOverlay,
    showOverlay,
    hideOverlay,
}