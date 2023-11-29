import { MakeGetRequest } from './fetchAPI.js';

export class SourceListHeader{
    
    id = 'source-list-header';
    element;

    constructor() {
        this.element = document.createElement('div');
        this.element.id = this.id;

        this.setElementCSS();

        //this.fetchSources();
        this.element.addEventListener('click', this.fetchSources);
        
    }

    setElementCSS(){
        this.element.style.backgroundColor = 'purple';
        this.element.textContent = 'slh \n FETCH SOURCES';
        this.element.style.margin = '10px';
    }



    async fetchSources(){
        console.log('fetching');

        const url = '/sources';
        const response = await MakeGetRequest(url);
        console.log('Response:', response);

    }
    
}

