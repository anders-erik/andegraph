

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

        this.basePopulate();
        
        // console.log("ASDASKHDASKHGGDS 1")
    }

    basePopulate(){
        // console.log("ASDASKHDASKHGGDS 2")
        // this.inner_element = this.element.firstElementChild;
        // console.log("this.inner_element.id = ", this.inner_element.tagName)
        // console.log("this.element.childElementCount =", this.element.childElementCount)
        // this.element.innerHTML = 'AAAAAAA'
        // this.inner_element.innerHTML = `<button>BUTBUT</button>`; 
        this.inner_element.innerHTML = `<button type="button" class="btn">Base class</button>`;
        this.inner_element.innerHTML = `
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Library</li>
                </ol>
            </nav>
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
