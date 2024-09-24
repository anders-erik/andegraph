let keymapIconElement = document.createElement('div');
let keymapContainerElement = document.createElement("div");
let contextOverlayElement;



/**
 * Creates the keymap and the icon, and append them both to the context overlay.
 */
function initKeymap(){
    console.log("INIT KEYMAP!")
    
    keymapContainerElement.id = "keymap-container";
    keymapContainerElement.classList.add("hide");
    // populate keymapElement
    fetch('/modules/contextoverlay/keymap/keymap.html')
        .then(response => response.text())
        .then(html => keymapContainerElement.innerHTML = html);



    keymapIconElement.id = "keymap-icon";
    keymapIconElement.addEventListener("click", toggleKeymap);


    
    contextOverlayElement = document.getElementById("contextOverlay");
    contextOverlayElement.append(keymapContainerElement);
    contextOverlayElement.append(keymapIconElement);
}

function showKeymapIcon(){

}

function toggleKeymap(){
    // console.log('SHOW KEYMAP');
    if (keymapContainerElement.classList.contains("hide"))
        keymapContainerElement.classList.remove("hide");
    else
        keymapContainerElement.classList.add("hide");
}

function hideKeymap(){
    keymapContainerElement.classList.add("hide");
}


export {
    initKeymap,
    showKeymapIcon,
    toggleKeymap,
    hideKeymap,
}