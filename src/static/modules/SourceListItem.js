
export class sourceListItem{
    
    sourceListContainer;

    constructor(id) {
        this.sourceListContainer = document.getElementById(id);
        this.sourceListContainer.style.backgroundColor = 'blue';
    }

    static test1() {
        return 'test1';
    }
}

