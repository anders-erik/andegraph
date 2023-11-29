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

        this.subscribeToBubblingEvents();
    }

    setElementCSS(){
        this.element.id = 'source-list-container';
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

    // Primary purpose: intercept bubbling clicks from deep within the DOM
    subscribeToBubblingEvents(){

        // This is needed in order to give the event functions access to the target opbjects
        let sourceList = this.sourceList;
        


        this.element.addEventListener(
            'click',
            async function (e) {
                
                //console.log(e.target.id + ' was clicked.');
                if(e.target.id == 'source-list-fetch-button'){
                    //console.log('fetch button pressed ');
                    //console.log(this);
                    sourceList.fetchAndUpdateSources();
                    //console.log('done fetching')
                    //sourceList.populateList(fetchedSources);
                    
                    //console.log(this.sourceList.fetchSources());
                }
               
                
            },
            false,
        );
    }

}

