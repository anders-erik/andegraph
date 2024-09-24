import * as fetcher from "./fetcher";

let overlayContainer : Element;


function initOverlay() : void{
    console.log('OVERLAY TS INIT');

    overlayContainer = document.createElement('div');
    overlayContainer.id = "agw_overlay-container";

    fetcher.fetchHtml("overlay.html")
        .then(html => {
            // console.log("HTML : ", html)
            overlayContainer.innerHTML = html;
            
        })

}

function showOverlay() : void{
    document.body.lastElementChild.after(overlayContainer);
    // fetcher.fetchHtml("overlay.html")
    //     .then(html => overlayContainer.innerHtml = html)
}


function hideOverlay() : void {
    overlayContainer.remove();
}




export {
    initOverlay,
    showOverlay,
    hideOverlay,
}