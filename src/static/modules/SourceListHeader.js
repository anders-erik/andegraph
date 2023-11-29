import { MakeGetRequest } from './fetchAPI.js';
import {  } from './fetchAPI.js';

export class SourceListHeader{
    
    id = 'source-list-header';
    element;
    fetchButton;
    addButton;

    constructor() {
        this.element = document.createElement('div');
        this.element.id = this.id;

        this.setElementCSS();

        this.createFetchButton();
        this.createAddButton();

        //this.fetchSources();
        //this.element.addEventListener('click', this.fetchSources);
        
    }

    setElementCSS(){
        this.element.style.backgroundColor = 'purple';
        this.element.textContent = 'slh \n FETCH SOURCES';
        this.element.style.margin = '10px';
        this.element.style.display = 'flex';
        this.element.style.flexDirection = 'column';

    }

    createFetchButton(){
        this.fetchButton = document.createElement('button');
        this.fetchButton.id = 'source-list-fetch-button';
        this.fetchButton.innerHTML = 'Fetch Sources';
        this.element.appendChild(this.fetchButton);
        this.element.addEventListener('click', () => {});
    }

    createAddButton(){
        this.addButton = document.createElement('button');
        this.addButton.id = 'source-list-add-button';
        this.addButton.innerHTML = 'Add source';
        this.element.appendChild(this.addButton);
        this.element.addEventListener('click', () => {});

    }


    async fetchSources(){
        console.log('fetching');

        const url = '/sources';
        const response = await MakeGetRequest(url);
        console.log('Response:', response);

    }
    
    
}

