

export class AgeContentObject {
    object : any;

    contentEdgeObject: any;
    
    constructor(_contentObject: any){
        this.object = _contentObject;
    }

    getTable(){
        return this.object.Table;
    }
}
export class AgeContentEdgeObject {
    content: any;
    edge: any;

    constructor(_contentEdgeObject: any) {
        this.content = _contentEdgeObject.content;
        this.edge = _contentEdgeObject.edge;
    }

}

/** Updates all elements that contains the title of the passed uuid */
export function UuidCheckAndUpdateTitles(_uuid : string|number, _title : string){
    let uuidElements = document.querySelectorAll(`[data-uuid='${_uuid}']`);

    uuidElements.forEach((_element : HTMLElement) => {
        console.log("element = ", _element)
        if (_element.classList.contains("Title"))
            _element.textContent = _title;
    })
}