import type { Tfetcher } from "./fetcher";


import * as overlay from "./overlay";

let extensionStateFront ={
    active: false,
};


// Set up modules and fetch data
(function init() {
    overlay.initOverlay();  

    // let settingItem = browser.storage.local.set({ test: "VALUE" });

})();


// Display the extension-container
browser.runtime.onMessage.addListener((message) => {
    console.log("ToggleExitension Message recieved!")

    if (message.name === 'toggleExtension') {
        if (extensionStateFront.active)
            stop();
        else
            start();
    }

});


/**
 *  Show injected container
 */
function start() : void {
    console.log("START");
    
    extensionStateFront.active = true;

    // console.log(await fetcher.fetchHtml("overlay.html"))

    overlay.showOverlay();
}


/**
 *  
 *  Hide injected container
 */
function stop() : void {
    console.log("STOP");
    extensionStateFront.active = false;
    overlay.hideOverlay();
}


// const message = "Hello World!";


// console.log("TYPESCRIPT@")

// console.log(message.toLowerCase(), "2")

// // message();

// let typeA = {
//     a: "a",
//     A: 1,
// }


// function funfun(_x: string){
//     console.log(_x);
// }
// funfun(typeA.a);

// function greet(person:string, date:string) {
//     console.log(`Hello ${person}, today is ${date}!`);
// }

// // greet("Brendan");