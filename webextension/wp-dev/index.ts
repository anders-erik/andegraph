import * as overlay from "./overlay";


let extensionStateFront ={
    active: false,
};


// Set up modules and fetch data, but does not render anything
(function init() {
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

