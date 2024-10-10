import * as overlay from "./overlay";


let extensionStateFront ={
    active: false,
};


// Set up modules and fetch data, but does not render anything
(function init() {
    // DEV DEV
    // Make sure any existing overlays are removed
    if (document.getElementById("age_overlayContainer") !== null)
        window.location.reload(); 
    
    overlay.initOverlay();  
})();
 


/* 
    TOGGLES THE EXTENSION FRONTEND UI
*/
browser.runtime.onMessage.addListener((message) => {
    
    if (message.name === 'toggleExtension') {
        console.log("Toggle Exitension Message recieved!")

        if (extensionStateFront.active){
            extensionStateFront.active = false;
            overlay.hideOverlay();

            
        }
        else{
            extensionStateFront.active = true;
            overlay.showOverlay();
        }
    }

});

