import type { Tfetcher } from "./fetcher";

// import { fetchHtml} from "./fetcher";
import * as fetcher from "./fetcher";
import * as overlay from "./overlay";

// console.log("fetchHtml-type?", typeof fetchHtml)


let extensionStateFront ={
    active: false,
};
// extensionStateFront.active = true;

let elem = document.getElementById("d");

browser.runtime.onMessage.addListener((message) => {
    console.log('evevev')
    
    // fetcher.fetchHtml("overlay.html")
    // .then(html => console.log(html));


    if (extensionStateFront.active)
        stop();
    else
        start();


});



function init() {
    overlay.initOverlay();
}
init();

function start() {
    console.log("START");
    
    extensionStateFront.active = true;

    // console.log(await fetcher.fetchHtml("overlay.html"))

    overlay.showOverlay();
}

function stop() {
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