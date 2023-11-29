//import { sourceListItem as sourceListItem } from './SourceListItem.js';
import { SourceListContainer } from './SourceListContainer.js';
import { SourceViewerContainer } from './SourceViewerContainer.js';


export class SourcesApp {
    
    element;
    sourceListContainer;
    sourceViewerContainer;
    //shardListContainer;


    constructor(rootId) {
        this.element = document.getElementById(rootId);
        this.setelementCSS();

        
        this.addSourceListContainer();
        this.addSourceViewerContainer();

        this.subscribeToBubblingEvents();

    }

    addSourceListContainer() {
        this.sourceListContainer = new SourceListContainer('source-list-container');
        this.element.appendChild(this.sourceListContainer.element);
    }

    addSourceViewerContainer() {
        this.sourceViewerContainer = new SourceViewerContainer('source-list-container');
        this.element.appendChild(this.sourceViewerContainer.element);
    }


    setelementCSS(){
        this.element.style.display = 'flex';
        this.element.style.flexDirection = 'row';
        this.element.style.backgroundColor = 'red';
    }




    subscribeToBubblingEvents(){

        // This is needed in order to give the event functions access to the target opbjects
        let sourceViewerContainer = this.sourceViewerContainer;
        


        this.element.addEventListener(
            'click',
            async function (e) {
                
                if (e.target.class == 'source-list-item'){
                    console.log('source id: ' + e.target.id);
                    sourceViewerContainer.setNewHeader(e.target.id);
                }
                else if (e.target.id == 'source-list-add-button'){
                    console.log('source id: ' + e.target.id);
                }
                
            },
            false,
        );
    }
}

