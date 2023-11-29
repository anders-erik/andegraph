import { SourceListHeader } from './SourceListHeader.js';
import { SourceList } from './SourceList.js';


export class SourceListContainer{
    
    element;
    sourceListHeader;
    sourceList;

    constructor(id) {
        this.element = document.createElement('div');

        this.setElementCSS();

        this.addSourceListHeader();
        this.addSourceList();

    }

    setElementCSS(){
        this.element.textContent = 'slc';
        this.element.style.backgroundColor = 'yellow';
        this.element.style.width = '20%'; 
        this.element.style.display = 'flex';
        this.element.style.flexDirection = 'column';
        this.element.style.justifyContent = 'start';
    }

    addSourceListHeader() {
        this.sourceListHeader = new SourceListHeader('source-list-container');
        this.element.appendChild(this.sourceListHeader.element);
    }
    addSourceList() {
        this.sourceList = new SourceList();
        this.element.appendChild(this.sourceList.element);
    }

}

