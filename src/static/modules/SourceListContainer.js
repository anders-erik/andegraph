
export class SourceListContainer{
    
    sourceListContainer;
    containerElement;

    constructor(id) {
        this.containerElement = document.createElement('div');

        this.containerElement.style.backgroundColor = 'yellow';
    }

    static test1() {
        return 'test1';
    }
}

