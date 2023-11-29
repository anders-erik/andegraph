import { SourceListItem } from './SourceListItem.js';
import { MakeGetRequest } from './fetchAPI.js';

export class SourceList{
    
	element;
    id = 'source-list';
    sourceListItems = [];

    constructor() {
        this.element = document.createElement('div');
        this.element.id = this.id;

        this.setElementCSS();

		
		//this.addSourceListItems_(3);

		this.fetchAndUpdateSources();
    }

    setElementCSS(){
        this.element.style.backgroundColor = 'aqua';
        this.element.textContent = 'sl';
		this.element.style.margin = '10px';
    }

	/*
	addSourceListItems_(listItemsCount){

		for (let i = 0; i<listItemsCount; i++){
			this.addSourceListItem_();
		}

		
	}

	addSourceListItem_(){
		let newItem = new SourceListItem();
		this.element.appendChild(newItem.element);
		this.sourceListItems.push(newItem);
	}
*/

	


	async fetchAndUpdateSources(){
        //console.log('fetching');

		this.element.innerHTML = '';

        const url = '/sources';
        const fetchedSources = await MakeGetRequest(url);
        //console.log('Fetch Response:', response);

		//console.log('about to return');
		//return response;
		this.populateList(fetchedSources);
    }

	populateList(fetchedSources) {
		//console.log('populating');
		//console.log(fetchedSources);
		this.addSourceListItems(fetchedSources);
	}

	addSourceListItems(fetchedSources){
		fetchedSources.forEach(source => {
			this.addSourceListItem(source);
		});
		
	}

	addSourceListItem(source){
		let newItem = new SourceListItem(source);
		
		newItem.element.textContent = source.id;
		this.element.appendChild(newItem.element);
		this.sourceListItems.push(newItem);
	}
    
}