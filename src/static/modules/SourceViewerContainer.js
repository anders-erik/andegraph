import { getSource } from './fetchAPI.js';

export class SourceViewerContainer{
    
    element;
    headerContainer;
    mediaContainer;

    constructor() {
        this.element = document.createElement('div');
        this.headerContainer = document.createElement('div');
        

        this.setElementCSS();
        this.setHeaderCSS();
        this.element.appendChild(this.headerContainer);
    }

    setElementCSS(){
        this.element.id = 'source-viewer-container';
        this.element.textContent = 'svc';
        this.element.style.backgroundColor = 'green';
        this.element.style.width = '40%'; 
        this.element.style.display = 'flex';
        this.element.style.flexDirection = 'column';
        this.element.style.justifyContent = 'start';
    }

    setHeaderCSS(){
        this.headerContainer.id = 'source-viewer-header';
        this.headerContainer.textContent = 'header';
        this.headerContainer.style.backgroundColor = 'orange';
        this.headerContainer.style.width = '40%'; 
        this.headerContainer.style.height = '100px'; 
        this.headerContainer.style.whiteSpace = 'preWrap';
        //console.log('added header');
    }

    async setNewHeader(selectedSourceId){
        let fetchedObject = (await getSource('source', selectedSourceId))[0];
        console.log(fetchedObject);
        console.log('testing');
        console.log(selectedSourceId);
        this.headerContainer.textContent = fetchedObject.id + '\n\n ' + fetchedObject.name + '\n';

    }


}

