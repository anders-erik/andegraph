
export class SourceListItem {
    
    element;
    class = 'source-list-item';

    constructor() {
        this.element = document.createElement('div');
        this.element.class = this.class;


        this.setElementCSS();
    }

    setElementCSS(){
        this.element.style.backgroundColor = 'orange';
        this.element.textContent = 'sli';
        this.element.style.margin = '10px';
    }

    
}

