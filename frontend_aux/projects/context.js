

export class context {


    static printContext(){
        // console.log("CONETXT");
    }

    static createContextMenuEvent(mouseEvent){
        // console.log('CONTEXT MENU CREATED');
        
        if(!mouseEvent.shiftKey){
            document.querySelector("#contextOverlay").innerHTML = "";
            return;
        }

        let contextMenu = document.createElement('div');
        contextMenu.id = "contextMenu";
        contextMenu.style.left = mouseEvent.pageX + "px";
        contextMenu.style.top = mouseEvent.pageY + "px";

        let contextOverlay = document.querySelector("#contextOverlay");
        contextOverlay.innerHTML = "";
        contextOverlay.appendChild(contextMenu);
    }

    
}