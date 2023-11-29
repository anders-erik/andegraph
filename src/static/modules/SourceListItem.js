
class SourceListItem {
    
    element;
    class = 'source-list-item';
    fetchedObject;

    constructor(fetchedObject) {
        this.element = document.createElement('div');
        this.element.class = this.class;

        this.fetchedObject = fetchedObject;

        this.setElementCSS();

        this.element.id = fetchedObject.id;

        this.element.addEventListener('click', () => {});
    }

    setElementCSS(){
        this.element.style.backgroundColor = 'orange';
        this.element.textContent = 'sli';
        this.element.style.margin = '10px';
    }



    
}



export {
    SourceListItem
}
