import { SourceListItem } from './SourceListItem.js';

export class SourceList{
    
	element;
    id = 'source-list';
    sourceListItems = [];

    constructor() {
        this.element = document.createElement('div');
        this.element.id = this.id;

        this.setElementCSS();

		
		this.addSourceListItems(3);
    }

    setElementCSS(){
        this.element.style.backgroundColor = 'aqua';
        this.element.textContent = 'sl';
		this.element.style.margin = '10px';
    }

	addSourceListItems(listItemsCount){

		for (let i = 0; i<listItemsCount; i++){
			this.addSourceListItem();
		}
	}

	addSourceListItem(){
		let newItem = new SourceListItem();
		this.element.appendChild(newItem.element);
		this.sourceListItems.push(newItem);
	}
    
}