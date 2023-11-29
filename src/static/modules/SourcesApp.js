//import { sourceListItem as sourceListItem } from './SourceListItem.js';
import { SourceListContainer } from './SourceListContainer.js';


export class SourcesApp {
    
    element;
    sourceListContainer;
    //sourceViewerContainer;
    //shardListContainer;


    constructor(rootId) {
        this.element = document.getElementById(rootId);
        this.setelementCSS();

        
        this.addSourceListContainer();

    }

    addSourceListContainer() {
        this.sourceListContainer = new SourceListContainer('source-list-container');
        this.element.appendChild(this.sourceListContainer.element);
    }



    setelementCSS(){
        this.element.style.display = 'flex';
        this.element.style.flexDirection = 'row';
        this.element.style.backgroundColor = 'red';
    }
}

