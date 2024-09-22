
// import { domUpdater } from "../../domupdater/DomUpdater.js";



/* 
    CONTEXT MENU GLOBALS
*/



export class TrueContextMenu {

    parentElement;

    element;
    inner_element;

    

    constructor (parentElement){

        this.parentElement = parentElement;

        this.element = document.createElement('div');
        this.element.id = 'trueContextMenu';
        this.element.classList.add("hide");
        // this.element.textContent = "RIGHT CLICK MENU";

        this.element.innerHTML = `<div id="trueContextMenu_inner"><div>`;
        this.inner_element = this.element.firstElementChild;
        // 
        

        // this.element.printHello = function () {
        //     console.log("PRINTING HELLO! ! ! !")
        // };
        
        // console.log("ADDING PRINT HELLO");

        this.element.printHello = this.printHello.bind(this);
        this.element.populate = this.populate.bind(this);

        // this.element.tabIndex = 0;

        // this.element.tabIndex = 0;
        parentElement.append(this.element);

        // console.log("HELLO FROM NEW RIGHT CLICK MENU!");

    }

    contextMenuVariations = {
        "ContentObject": 1,
    };

    populate(TypeString){
        // domUpdater.sayHello();

        this.basePopulate();
        
        if (TypeString === "ContentObject")
            this.contentObjectPopulate();
    }

    basePopulate(){ 
        this.inner_element.innerHTML = `
        <button id="context-1" type="button" class="btn btn-dark">Empty Main Content</button>
        <button id="context-2" type="button" class="btn btn-dark">Load Home</button>
        <button id="context-3" type="button" class="btn btn-dark">Load Scroll</button>
        <button id="context-4" type="button" class="btn btn-dark">Load PDF</button>
        <hr id="context-menu-hr">
        `;
    }

    contentObjectPopulate() {
        this.inner_element.innerHTML += `
        <button id="context-source" type="button" class="btn btn-dark">Load Source</button>
        <button type="button" class="btn btn-dark">Add Child</button>
        `;
    }

    printHello(){
        console.log("PRINTING HELLO! ! ! !")
    }

};




let innerHtml = `
<div id="trueContextMenu_inner">
    
<div>
`;
