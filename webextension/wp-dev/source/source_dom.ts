import { age_dbis } from "../dbi-send";

export interface HTMLProjectTableRow extends HTMLTableRowElement {
    nodeObject: any;
}
export interface HTMLTableContentObject extends HTMLTableElement {
    contentObject: any;
}
export interface HTMLProjectChildRow extends HTMLTableRowElement {
    ContentEdgeObject: any;
    isProjectChildRow: boolean;
}
