import { sourceListItem as sourceListItem } from './SourceListItem.js';
import { SourceListContainer as SourceListContainer } from './SourceListContainer.js';


export class SourcesApp{
    
    sourceAppContainer;
    sourceListContainer;

    constructor(rootId) {
        this.sourceAppContainer = document.getElementById(rootId);
        this.setCSS();

        sourceListContainer = new sourceListContainer('source-list-container');

    }

    setCSS(){
        this.sourceAppContainer.style.display = 'flex';
        this.sourceAppContainer.style.flexDirection = 'row';
        this.sourceAppContainer.style.backgroundColor = 'red';
    }
}

