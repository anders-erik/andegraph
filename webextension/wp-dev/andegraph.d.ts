


/** Allowed to hold contentObjects of any format : NOT WORKING*/
interface ContentObject {
    [key: string | number] : any;
}
/** Allowed to hold edgeObjects of any format : NOT WORKING*/
interface EdgeObject {
    [key: string | number]: any;
}
/** Allowed to hold contentEdgeObjects of any format : NOT WORKING */
interface ContentEdgeObject {
    content : ContentObject;
    edge : EdgeObject;
}

/** Extends ALL HTMLElements with contentObject AND contentEdgeObject */
interface HTMLElement {
    contentObject?: ContentObject;
    contentEdgeObject?: ContentEdgeObject;
}

/** Should have a data-uuid="<uuid>" data attribute & uuid as value? */
interface UuidHTML extends HTMLElement {
    uuid: number
}
/** Minimal contentObject-elements */
interface ContentObjectHTML extends HTMLElement {
    // contentObject: ContentObject;
}
/** Minimal contentEdgeObject-elements */
interface ContentEdgeObjectHTML extends HTMLElement {
    // contentEdgeObject: any;
}


