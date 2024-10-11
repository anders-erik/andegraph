/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./webextension/wp-dev/clipboard.ts":
/*!******************************************!*\
  !*** ./webextension/wp-dev/clipboard.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appendCss: () => (/* binding */ appendCss),
/* harmony export */   initClipboard: () => (/* binding */ initClipboard),
/* harmony export */   removeCss: () => (/* binding */ removeCss)
/* harmony export */ });
/* harmony import */ var _fetcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetcher */ "./webextension/wp-dev/fetcher.ts");
/* harmony import */ var _source_source__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./source/source */ "./webextension/wp-dev/source/source.ts");
/* harmony import */ var _projects_projects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projects/projects */ "./webextension/wp-dev/projects/projects.ts");
/* harmony import */ var _dbi_send__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dbi-send */ "./webextension/wp-dev/dbi-send.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




let sidePanel;
let clipboardContainer;
let clipboardCss;
// VARS
let waitingSecondShift = 0;
let waitingSecondCtrlShift = 0;
let clipboardInner;
let clipboardCodeCheckbox;
let clipboardTextTypeInput;
let clipboardConcatContents;
let textConcatenationCapturing = false;
let textConcatenationContent = "";
function initClipboard(_sidePanel) {
    // clipboardCodeCheckbox.addEventListener('change', toggleSelectCode);
    // writeTextConcatenationContentToDom();
    // if (extensionStateFront.textConcatenationCapturing) {
    // 	clipboardInner.classList.add('age_activeClipboard');
    // }
    // else {
    // 	clipboardInner.classList.remove('age_activeClipboard');
    // }
    /*
    
            NEW NEW NEW - 2024-10-02
    
    */
    sidePanel = _sidePanel;
    clipboardContainer = document.createElement('div');
    clipboardContainer.id = "age_clipboardContainer";
    clipboardContainer.classList.add("age_panelContainer", "collapsed");
    document.addEventListener('copy', copyEvent);
    document.addEventListener('cut', cutEvent);
    document.addEventListener('paste', pasteEvent);
    document.addEventListener('keydown', keydownActiveExtension);
    _fetcher__WEBPACK_IMPORTED_MODULE_0__.fetchHtml("clipboard.html")
        .then(html => {
        clipboardContainer.innerHTML = html;
        clipboardInner = clipboardContainer.querySelector("#age_clipboardInner");
        clipboardCodeCheckbox = clipboardContainer.querySelector("#age_clipboardCodeCheckbox");
        clipboardTextTypeInput = clipboardContainer.querySelector("#age_clipboardTextTypeInput");
        clipboardConcatContents = clipboardContainer.querySelector("#age_clipboardConcatContent");
    });
    clipboardCss = document.createElement("style");
    clipboardCss.id = "age_clipboardStyle";
    _fetcher__WEBPACK_IMPORTED_MODULE_0__.fetchCss("clipboard.css")
        .then(css => {
        clipboardCss.innerText = css;
    });
    // console.log("sidePanel.id = ", sidePanel.id)
    sidePanel.append(clipboardContainer);
}
/*

    CLIPBOARD FUNCTIONS

*/
function writeTextConcatenationContentToDom() {
    let clipboardString = textConcatenationContent;
    let clipboardInnerHtml = '<div>' + clipboardString.replace(/\n/g, '<br>') + '</div>';
    document.getElementById('age_clipboardConcatContent').innerHTML = clipboardInnerHtml;
}
function startClipboardTextConcatenation() {
    textConcatenationCapturing = true;
    // extensionStateFront.textConcatenationContent = '';
    // writeTextConcatenationContentToDom();
    //writeStateFromFront();
    // document.getElementById('age_clipboardContainer').classList.remove('age_displayNone');
    clipboardInner.classList.add('age_activeClipboard');
    console.log('start text concatentation capture');
}
function addSpaceCharacterToCaptureConcatenationContents() {
    console.log('added new space');
    if (textConcatenationCapturing) {
        textConcatenationContent += ' ';
        //writeStateFromFront();
    }
}
function addNewLineToCaptureConcatenationContents() {
    console.log('added new line');
    if (textConcatenationCapturing) {
        textConcatenationContent += '\n';
        //writeStateFromFront();
    }
}
function stopClipboardTextConcatenation() {
    textConcatenationCapturing = false;
    textConcatenationContent = '';
    writeTextConcatenationContentToDom();
    clipboardInner.classList.remove('age_activeClipboard');
    //writeStateFromFront();
}
/*

    CLIPBOARD EVENTS

*/
// function toggleSelectCode() {
// 	if (clipboardCodeCheckbox.checked) {
// 		clipboardTextTypeInput.disabled = false;
// 	}
// 	else {
// 		clipboardTextTypeInput.disabled = true;
// 	}
// }
function pasteEvent(event) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log('pastepaste')
        console.log('PASTE EVENT');
        // console.log(event.clipboardData.files[0])
        let activeElement = document.activeElement;
        if (activeElement.isContentEditable) {
            // console.log("ContentEditable. No new shard!")
            return;
        }
        let clipboardContentType = determineClipboardContentType(event.clipboardData);
        if (clipboardContentType === 'text') {
            console.log('deal with text');
            let clipboardText = (event.clipboardData /* || window.clipboardData */).getData("text");
            console.log('clipboardText = ', clipboardText);
            if (textConcatenationCapturing) {
                textConcatenationContent += clipboardText;
                writeTextConcatenationContentToDom();
                //writeStateFromFront();
                // console.log(extensionStateFront.textConcatenationContent);
            }
            else {
                console.log('PASTE TO NEW SHARD');
                // console.log(clipboardCodeCheckbox.checked)
                if (clipboardCodeCheckbox.checked) {
                    postNewCodeObjectToCurrentSourceAndFullReloadOfSourceChildren(clipboardTextTypeInput.value, clipboardText);
                }
                else {
                    postNewTextNodeToCurrentSourceAndFullReloadOfSourceChildren(clipboardTextTypeInput.value, clipboardText);
                }
            }
            // if (shardcard.contentEditable === 'true') {
            // 	document.execCommand("insertHTML", false, clipboardText);
            // 	event.preventDefault();
            // }
            // else if (shardObject.textContent == '' && shardObject.fileName == '') {
            // 	insertShardcardTextContent(shardcard, clipboardText);
            // 	//shardcard.shard.elementType = 'text';
            // 	updateShardcardTextContent(shardcard);
            // }
            // else {
            // 	console.log('This source already has content. Returning.');
            // }
        }
        else if (clipboardContentType === 'file') {
            console.log('deal with file');
            let newFile = event.clipboardData.files[0];
            let fileCategoryObject = determineFileCategories(newFile);
            console.log('fileCategoryObject: ', fileCategoryObject);
            if (fileCategoryObject.fileType === 'typetype') {
                console.error('FILE EXTENSION HAD NO MATCHING CONTENT TYPE');
                return;
            }
            let postFileQueryParameters = {
                Type: fileCategoryObject.fileType,
                Title: "",
                Extension: fileCategoryObject.fileExtension,
                IAmAuthor: 0,
            };
            postNewFileToCurrentSourceAndFullReloadOfSourceChildren(newFile, postFileQueryParameters, fileCategoryObject.mimeType);
            // console.log(newFile)
            // console.log(await age_dbisWe.fileGet(121627279360));
            // let sourceid = extractCurrentSourceId();
            // if (shardObject.fileName == '' && shardObject.textContent == '') {
            // 	postFile(event.clipboardData.files[0], sourceid, shardid);
            // 	console.log('nonono')
            // }
            // else {
            // 	console.log('This source already has content. Returning.');
            // }
        }
    });
}
// const paspas = new ClipboardEvent('paste');
// document.dispatchEvent(paspas);
function copyEvent(event) {
    // console.log('copcop')
    // console.log(event.clipboardData )
    // let cbd = event.clipboardData || window.clipboardData
    // let copiedData = cbd.getData('Text');
    // console.log('copiedData', copiedData)
    // browser.runtime.sendMessage( {
    // 	command: "copycopy"
    // });
    console.log('COPYEVENT');
    // navigator.clipboard
    // 	.read()
    // 	.then(
    // 		(clipText) => (console.log(clipText)),
    // 	);
}
function cutEvent(event) {
    console.log('CUT EVENT');
}
/*

    HELPER FUNCTIONS

*/
let determineClipboardContentType = function (eventClipboardData) {
    if (typeof eventClipboardData.files[0] !== 'undefined') {
        // postFile(dataClipboardEvent.files[0], sourceid, shardid);
        return 'file';
    }
    else if ((eventClipboardData /* || window.clipboardData */).getData("text") !== '') {
        //console.log((event.clipboardData || window.clipboardData).getData("text"));
        let clipboardText = (eventClipboardData /* || window.clipboardData */).getData("text");
        let blob = new Blob([clipboardText], { type: 'text/plain' });
        let file = new File([blob], "clipboard.txt", { type: "text/plain" });
        //postFile(file, sourceid, shardid);
        return 'text';
    }
    else {
        console.log('No file nor text detected.');
        return 'empty';
    }
    //return 'clipboardContentType';
};
let extensionObject = {
    // https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
    image: ['apng', 'avif', 'gif', 'bmp', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp'],
    // https://www.canto.com/blog/audio-file-types/
    audio: ['m4a', 'flac', 'mp3', 'wav', 'wma', 'aac'],
    // https://www.adobe.com/creativecloud/video/discover/best-video-format.html
    video: ['mp4', 'mov', 'wmv', 'avi', 'AVCHD', 'flv', 'f4v', 'swf', 'mkv', 'webm', 'mpg'],
    pdf: ['pdf'],
    data: ['json', 'csv', 'tsv', 'db', 'xlsx', 'ods', 'odb'],
    // Textarea extension
    text: ['txt', 'md'],
    code: ['js', 'ts', 'css', 'html', 'cs'],
};
function determineFileCategories(selectedFile) {
    let selectedFileType = selectedFile.type;
    let fileCategories = {
        mimeType: selectedFileType,
        baseFileName: 'basename',
        fileExtension: 'extext',
        fileType: 'typetype'
    };
    fileCategories.fileExtension = determineFileExtension(selectedFile);
    fileCategories.baseFileName = determineBaseFileName(selectedFile);
    // fileCategories.fileType = determineFileType(fileCategories.mimeType, fileCategories.fileEnding);
    // fileCategories.fileType = Object.entries(extensionObject).forEach(typeArray => typeArray.filter(extension => extension === fileCategories.fileExtension))
    fileCategories.fileType = Object.keys(extensionObject).find(type => extensionObject[type].includes(fileCategories.fileExtension));
    // console.log(fileCategories.fileType)
    //console.log('file type determined here!');
    // if (fileCategories.fileExtension === 'db') {
    // 	// http://fileformats.archiveteam.org/wiki/DB_(SQLite)
    // 	fileCategories.mimeType = 'application/vnd.sqlite3';
    // }
    console.log(fileCategories.mimeType);
    if (fileCategories.mimeType == '') {
        // fileCategories.mimeType == 'application/stream';
        fileCategories.mimeType = 'application/octet-stream';
    }
    return fileCategories;
}
function determineFileExtension(selectedFile) {
    return selectedFile.name.match(/\w+$/g)[0];
}
function determineBaseFileName(selectedFile) {
    return selectedFile.name.match(/^.*(?=\.[^.]+$)/)[0];
}
/*

    CLIPBOARD FETCH

*/
function postNewTextNodeToCurrentSourceAndFullReloadOfSourceChildren(textType, TextContent) {
    return __awaiter(this, void 0, void 0, function* () {
        let sourceObject = _source_source__WEBPACK_IMPORTED_MODULE_1__.getCurrentSourceObject();
        if (sourceObject == undefined) {
            console.warn("Unable to post new text object. No selected sourceObject.");
            return;
        }
        // let sourceUuid = sourceObject.Uuid;
        // let sourceUuid = source.getCurrentSourceUuid();
        // let sourceObject: any = source.currentSourceObject;
        let sourceUuid = sourceObject.Uuid;
        // console.log('postNewTextNodeToCurrentSourceAndFullReloadOfSourceChildren()');
        // console.log('sourceUuid = ', sourceUuid);
        // Content_InsertChildUuidTable(Uuid, childTable)
        if (sourceUuid !== undefined) {
            // let newTextObject = (await age_dbisWe.Content_InsertChildUuidTable(extensionStateFront.current_sourceObject.Uuid, 'Text')).Content;
            let newTextContentObject = (yield _dbi_send__WEBPACK_IMPORTED_MODULE_3__.age_dbis.ContentEdge_InsertAdjacentToUuidIntoTable(sourceUuid, 1, 'Text', '', '', '/')).content;
            // console.log(newTextObject)
            newTextContentObject.Title = TextContent.substring(0, 25);
            newTextContentObject.TextContent = TextContent;
            newTextContentObject.Type = textType;
            yield _dbi_send__WEBPACK_IMPORTED_MODULE_3__.age_dbis.Content_UpdateWithContentObject(newTextContentObject);
            // TODO 
            // UPDATE SOURCE PANEL x3 
            // await fetchCurrentSourceChildrenThenWriteToStates();
            // populateSourceChildTableFromState();
            yield _source_source__WEBPACK_IMPORTED_MODULE_1__.loadWithContentObject(sourceObject);
            _source_source__WEBPACK_IMPORTED_MODULE_1__.focusOnLastChildRowTitle();
            // setTimeout(() => {
            // }, 100);
        }
    });
}
function postNewCodeObjectToCurrentSourceAndFullReloadOfSourceChildren(Type, CodeContent) {
    return __awaiter(this, void 0, void 0, function* () {
        let sourceObject = _source_source__WEBPACK_IMPORTED_MODULE_1__.getCurrentSourceObject();
        let sourceUuid = sourceObject.Uuid;
        if (sourceObject == undefined) {
            console.warn("Unable to post new code object. No selected sourceObject.");
            return;
        }
        // Content_InsertChildUuidTable(Uuid, childTable)
        if (sourceUuid !== undefined) {
            // let newCodeObject = (await age_dbisWe.Content_InsertChildUuidTable(extensionStateFront.current_sourceObject.Uuid, 'Code')).Content;
            let newCodeContentObject = (yield _dbi_send__WEBPACK_IMPORTED_MODULE_3__.age_dbis.ContentEdge_InsertAdjacentToUuidIntoTable(sourceUuid, 1, 'Code', '', '', '/')).content;
            // console.log(newTextObject)
            newCodeContentObject.Title = CodeContent.substring(0, 25);
            newCodeContentObject.Type = Type;
            newCodeContentObject.CodeContent = CodeContent;
            yield _dbi_send__WEBPACK_IMPORTED_MODULE_3__.age_dbis.Content_UpdateWithContentObject(newCodeContentObject);
            yield _source_source__WEBPACK_IMPORTED_MODULE_1__.loadWithContentObject(sourceObject);
            _source_source__WEBPACK_IMPORTED_MODULE_1__.focusOnLastChildRowTitle();
        }
    });
}
function postNewFileToCurrentSourceAndFullReloadOfSourceChildren(file, queryParams, mimeType) {
    return __awaiter(this, void 0, void 0, function* () {
        let sourceObject = _source_source__WEBPACK_IMPORTED_MODULE_1__.getCurrentSourceObject();
        let sourceUuid = sourceObject.Uuid;
        if (sourceObject == undefined) {
            console.warn("Unable to post new file. No selected sourceObject.");
            return;
        }
        // console.log(sourceUuid)
        // Content_InsertChildUuidTable(Uuid, childTable)
        if (sourceUuid !== undefined) {
            // let newFileObject = (await age_dbisWe.Content_InsertChildUuidTable(sourceUuid, 'File')).Content;
            let newFileContentObject = (yield _dbi_send__WEBPACK_IMPORTED_MODULE_3__.age_dbis.ContentEdge_InsertAdjacentToUuidIntoTable(sourceUuid, 1, 'File', '', '', '/')).content;
            // console.log(newTextObject)
            // newFileObject.Title = CodeContent.substring(0, 25);
            // newFileObject.Type = Type;
            // newFileObject.CodeContent = CodeContent;
            // await age_dbisWe.Content_UpdateOnContentObject(newFileObject);
            // await age_dbisWe.filePost(newFileContentObject.Uuid, file, queryParams, mimeType);
            yield _dbi_send__WEBPACK_IMPORTED_MODULE_3__.age_dbis.Post_File(newFileContentObject.Uuid, file, queryParams, mimeType);
            // TODO UPDATE USING NEW STRUCTURE
            // await fetchCurrentSourceChildrenThenWriteToStates();
            // populateSourceChildTableFromState();
            yield _source_source__WEBPACK_IMPORTED_MODULE_1__.loadWithContentObject(sourceObject);
            _source_source__WEBPACK_IMPORTED_MODULE_1__.focusOnLastChildRowTitle();
            // Focus last row title for easy editing!
            // let _tbody = document.getElementById('age_sourceChildTable-tbody');
            /* _tbody.lastElementChild.lastElementChild.focus(); */
        }
        else {
            console.log('No slected source. Couldn"t POST file.');
        }
    });
}
function keydownActiveExtension(keyEvent) {
    return __awaiter(this, void 0, void 0, function* () {
        let activeElement = document.activeElement;
        if (activeElement.isContentEditable) {
            // console.log('EDITABLE')
            return;
        }
        if (keyEvent.key === 'Escape') {
            stopClipboardTextConcatenation();
            document.getElementById("age_clipboardContainer").classList.add("collapsed");
        }
        // document.addEventListener("keydown", (event) => { console.log(event.code) }) 
        if (keyEvent.altKey) {
            // Switched to .code to enable extension on swedish keyboard
            switch (keyEvent.code) {
                case "KeyP": // 'p' = prints the current project object
                    // NOT WORKING YET! UNABLE TO GET THE TYPING CORRECT
                    // console.log("textConcatenationContent = ", textConcatenationContent);
                    // let projectObject = document.getElementById("age_projectPropertiesTable");
                    // console.log('projectObject = ', projectObject);
                    break;
                case "KeyR": // 'r' = refresh project data
                    _projects_projects__WEBPACK_IMPORTED_MODULE_2__.reloadCurrentProject();
                    break;
                case "KeyN": // 'n' = new source
                    _projects_projects__WEBPACK_IMPORTED_MODULE_2__.insertNewSourceToActiveProject();
                    break;
                case "KeyM": // 'm' = move
                    _projects_projects__WEBPACK_IMPORTED_MODULE_2__.toggleExtensionLocation();
                    break;
                case "Slash": // '/' = go to search
                    document.getElementById("age_projectSearchButton").click();
                    document.getElementById("age_projectSearchInput").focus();
                    break;
                case "KeyX": // 'x' = toggle text/code
                    // console.log('Alt + x')
                    let checked = clipboardCodeCheckbox.checked;
                    if (checked) {
                        clipboardCodeCheckbox.checked = false;
                    }
                    else {
                        clipboardCodeCheckbox.checked = true;
                    }
                    toggleSelectCode();
                    break;
                case "BracketLeft": // '[' = start text capturing
                    // console.log('Alt + [')
                    startClipboardTextConcatenation();
                    document.getElementById("age_clipboardContainer").classList.remove("collapsed");
                    break;
                case "Enter": // 'Enter' = add new line
                    // console.log('Alt + Enter')
                    addNewLineToCaptureConcatenationContents();
                    break;
                case "Minus": // '-' = add new space
                    // console.log('Alt + Enter')
                    addSpaceCharacterToCaptureConcatenationContents();
                    break;
                case "BracketRight": // ']' = stop conactenating and send to backend
                    // console.log('Alt + ]')
                    if (clipboardCodeCheckbox.checked) {
                        yield postNewCodeObjectToCurrentSourceAndFullReloadOfSourceChildren(clipboardTextTypeInput.value, textConcatenationContent);
                    }
                    else {
                        yield postNewTextNodeToCurrentSourceAndFullReloadOfSourceChildren(clipboardTextTypeInput.value, textConcatenationContent);
                    }
                    document.getElementById("age_clipboardContainer").classList.add("collapsed");
                    stopClipboardTextConcatenation();
                    break;
                default:
                    break;
            }
        }
        if (keyEvent.ctrlKey) {
            switch (keyEvent.key) {
                case '`':
                    console.log('Ctrl + `');
                    break;
                case '/':
                    console.log('Ctrl + /');
                    break;
                case '.':
                    console.log('Ctrl + .');
                    break;
                case ',':
                    console.log('Ctrl + ,');
                    break;
                case '\\':
                    console.log('Ctrl + \\');
                    break;
                case '\'':
                    console.log('Ctrl + \'');
                    break;
                case ';':
                    console.log('Ctrl + ;');
                    break;
                case '[':
                    console.log('Ctrl + [');
                    break;
                case ']':
                    console.log('Ctrl + ]');
                    break;
                default:
                    break;
            }
        }
    });
}
function toggleSelectCode() {
    if (clipboardCodeCheckbox.checked) {
        clipboardTextTypeInput.disabled = false;
    }
    else {
        clipboardTextTypeInput.disabled = true;
    }
}
// The Annunciation is an oil painting by the Early Netherlandish painter Hans Memling.It depicts the Annunciation, the archangel Gabriel's announcement to the Virgin Mary that she would conceive and become the mother of Jesus, described in the Gospel of Luke. 
function appendCss() {
    document.head.append(clipboardCss);
}
function removeCss() {
    clipboardCss.remove();
}


/***/ }),

/***/ "./webextension/wp-dev/dbi-send.ts":
/*!*****************************************!*\
  !*** ./webextension/wp-dev/dbi-send.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   age_dbis: () => (/* binding */ age_dbis),
/* harmony export */   setApiUrl: () => (/* binding */ setApiUrl)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// let age_apiUrl = 'http://localhost:3000/api/v02';
let age_apiUrl = "";
// export function test() : void {
// 	console.log("Loaded dbi-send.ts")
// }
// ALWAYS START OUT BY GRABBING THE API BASE URL
(() => {
    setApiUrl().then(() => {
        console.log('Loaded dbi-send.ts');
    });
})();
/**
 * 	Grabs the base url string from the local webextension storage.
 */
function setApiUrl() {
    return __awaiter(this, void 0, void 0, function* () {
        browser.storage.local.get("apiBaseString").then((object) => {
            age_apiUrl = object.apiBaseString;
            console.log("Loaded API BASE STRING");
            console.log("object.apiBaseString = ", object.apiBaseString);
        }, onLocalStorageError);
    });
}
function onLocalStorageError(error) {
    console.error(error);
}
browser.runtime.onMessage.addListener((request) => {
    console.log("Message recieved in dbi-send.ts!");
    if (request.name === "setApiBase") {
        // console.log("1111")
        age_apiUrl = request.apiBaseString;
        return Promise.resolve({ response: "Api updated in content script. [dbi-send.js]", newApiString: age_apiUrl });
    }
    if (request.name === "getApiBase") {
        // console.log("2222")
        // Promise.resolve : static method that returns a resolved Promise object with the given value
        return Promise.resolve({ apiString: age_apiUrl });
    }
});
class age_dbis {
    /*
        CONTENT
    */
    static Content_InsertOnTable(TableName) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = age_apiUrl + `/content/Content-InsertOnTable?Table=${TableName}`;
            const options = {
                method: 'POST'
            };
            try {
                const response = yield fetch(url, options);
                if (!response.ok) {
                    console.warn("Fetch returned " + response.status + " from " + url);
                    return [];
                }
                const data = yield response.json();
                console.log(response.status, url);
                return data;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static Content_SelectOnUuid(Uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = age_apiUrl + `/content/Content-SelectOnUuid?Uuid=${Uuid}`;
            const options = {
                method: 'GET',
            };
            try {
                const response = yield fetch(url, options);
                if (!response.ok) {
                    console.warn("Fetch returned " + response.status + " from " + url);
                    return [];
                }
                const data = yield response.json();
                console.log(response.status, url);
                return data;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static Content_UpdateWithContentObject(contentObject) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = age_apiUrl + `/content/Content-UpdateWithContentObject`;
            const options = {
                method: 'PUT',
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(contentObject),
            };
            try {
                const response = yield fetch(url, options);
                if (!response.ok) {
                    console.warn("Fetch returned " + response.status + " from " + url);
                    return [];
                }
                const data = yield response.json();
                console.log(response.status, url);
                return data;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static Content_DropFullOnUuid(Uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = age_apiUrl + `/content/Content-DropFullOnUuid?Uuid=${Uuid}`;
            const options = {
                method: 'DELETE',
            };
            try {
                const response = yield fetch(url, options);
                if (!response.ok) {
                    console.warn("Fetch returned " + response.status + " from " + url);
                    return [];
                }
                const data = yield response.json();
                console.log(response.status, url);
                return data;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static Content_SelectOnTitleLikeString(searchString, tableLimit, includeTable, orderColumn, desc) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = age_apiUrl + `/content/Content-SelectOnTitleLikeString?searchString=${searchString}&tableLimit=${tableLimit}&includeTable=${includeTable}&orderColumn=${orderColumn}&desc=${desc}`;
            const options = {
                method: 'GET',
            };
            try {
                let response = yield fetch(url, options);
                if (!response.ok) {
                    console.warn("Fetch returned " + response.status + " from " + url);
                    return [];
                }
                const data = yield response.json();
                console.log(response.status, url);
                return data;
            }
            catch (error) {
                // console.log(response.status, url)
                console.error(error);
            }
        });
    }
    static Review_InsertScheduleOnUuid(Uuid, scheduleType) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = age_apiUrl + `/content/Review-InsertScheduleOnUuid?Uuid=${Uuid}&scheduleType=${scheduleType}`;
            const options = {
                method: 'POST'
            };
            try {
                const response = yield fetch(url, options);
                if (!response.ok) {
                    console.warn("Fetch returned " + response.status + " from " + url);
                    return [];
                }
                const data = yield response.json();
                console.log(response.status, url);
                return data;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static Review_SelectCurrentReview() {
        return __awaiter(this, void 0, void 0, function* () {
            let url = age_apiUrl + `/content/Review-SelectCurrentReview`;
            const options = {
                method: 'GET',
            };
            try {
                const response = yield fetch(url, options);
                if (!response.ok) {
                    console.warn("Fetch returned " + response.status + " from " + url);
                    return [];
                }
                const data = yield response.json();
                console.log(response.status, url);
                return data;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    /*
            CONTENT EDGE
    */
    static ContentEdge_InsertAdjacentToUuidIntoTable(Uuid, Directed, Table, Type, Order, Path) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = age_apiUrl + `/contentedge/ContentEdge-InsertAdjacentToUuidIntoTable?Uuid=${Uuid}&Directed=${Directed}&Table=${Table}&Type=${Type}&Order=${Order}&Path=${Path}`;
            const options = {
                method: 'POST',
            };
            try {
                const response = yield fetch(url, options);
                if (!response.ok) {
                    console.warn("Fetch returned " + response.status + " from " + url);
                    return [];
                }
                const data = yield response.json();
                console.log(response.status, url);
                return data;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static ContentEdge_SelectChildOfUuid(Uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = age_apiUrl + `/contentedge/ContentEdge-SelectChildOfUuid?Uuid=${Uuid}`;
            const options = {
                method: 'GET',
            };
            try {
                const response = yield fetch(url, options);
                if (!response.ok) {
                    console.warn("Fetch returned " + response.status + " from " + url);
                    return [];
                }
                const data = yield response.json();
                console.log(response.status, url);
                return data;
            }
            catch (error) {
                // console.log(response.status, url)
                console.error(error);
            }
        });
    }
    static ContentEdge_SelectParentOfUuid(Uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = age_apiUrl + `/contentedge/ContentEdge-SelectParentOfUuid?Uuid=${Uuid}`;
            const options = {
                method: 'GET',
            };
            try {
                const response = yield fetch(url, options);
                if (!response.ok) {
                    console.warn("Fetch returned " + response.status + " from " + url);
                    return [];
                }
                const data = yield response.json();
                console.log(response.status, url);
                return data;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static ContentEdge_SelectUndirectedOfUuid(Uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = age_apiUrl + `/contentedge/ContentEdge-SelectUndirectedOfUuid?Uuid=${Uuid}`;
            const options = {
                method: 'GET',
            };
            try {
                const response = yield fetch(url, options);
                if (!response.ok) {
                    console.warn("Fetch returned " + response.status + " from " + url);
                    return [];
                }
                const data = yield response.json();
                console.log(response.status, url);
                return data;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static ContentEdge_SelectAdjacentOfUuid(Uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = age_apiUrl + `/contentedge/ContentEdge-SelectAdjacentOfUuid?Uuid=${Uuid}`;
            const options = {
                method: 'GET',
            };
            try {
                const response = yield fetch(url, options);
                if (!response.ok) {
                    console.warn("Fetch returned " + response.status + " from " + url);
                    return [];
                }
                const data = yield response.json();
                console.log(response.status, url);
                return data;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    /*
                FILES
    */
    static Post_File(Uuid, file, queryParams, mimeType) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = age_apiUrl + `/file/${Uuid}?`;
            // console.log(url)
            for (const [key, value] of Object.entries(queryParams)) {
                // console.log(`${key}: ${value}`);
                url += `${key}=${value}&`;
                // bodyArray.push(value);
            }
            url = url.slice(0, -1);
            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": mimeType,
                },
                body: file,
            };
            // console.log(options)
            // console.log(url)
            try {
                const response = yield fetch(url, options);
                const data = yield response.json();
                console.log(response.status, url);
                if (response.status == 200) {
                    return data;
                }
                else {
                    throw new Error('FAILED POST FROM: Post_File in dbis');
                }
                // console.table(data);
            }
            catch (error) {
                // console.log(response.status, url)
                console.error(error);
            }
        });
    }
    static Get_File(Uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = age_apiUrl + `/file/` + Uuid;
            const options = { method: 'GET' };
            try {
                const response = yield fetch(url, options);
                // const data = await response.json();
                console.log(response.status, url);
                if (!response.ok) {
                    console.warn("Fetch returned " + response.status + " from " + url);
                    return [];
                }
                // console.log(response.body) 
                let blob = yield response.blob();
                let contentType = response.headers.get('content-type');
                let extension = contentType.split('/')[1];
                // console.log('FILEFILE:', response.headers.get('content-type'))
                let file = yield new File([blob], `${Uuid}.${extension}`);
                return file;
                // .then(blob => new File([blob], 'testfilename.file'))
                // .then(file => file)
                // .catch(error => console.error(error))
                // .then(file => URL.createObjectURL(file))
                // .then(file => URL.createObjectURL(file))
                // .then(fileUrl => window.open(fileUrl, '_blank'))
            }
            catch (error) {
                // console.log(response.status, url)
                console.error(error);
            }
        });
    }
    static Put_File(Uuid, file, queryParams, mimeType) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = age_apiUrl + `/file/${Uuid}?`;
            // console.log(url)
            for (const [key, value] of Object.entries(queryParams)) {
                // console.log(`${key}: ${value}`);
                url += `${key}=${value}&`;
                // bodyArray.push(value);
            }
            url = url.slice(0, -1);
            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": mimeType,
                },
                body: file,
            };
            // console.log(options)
            // console.log(url)
            try {
                const response = yield fetch(url, options);
                const data = yield response.json();
                console.log(response.status, url);
                if (response.ok) {
                    return data;
                }
                else {
                    throw new Error('FAILED PUT FROM: Put_File in dbis');
                }
                // console.table(data);
            }
            catch (error) {
                // console.log(response.status, url)
                console.error(error);
            }
        });
    }
    static Delete_File(Uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = age_apiUrl + `/file/${Uuid}`;
            const options = {
                method: 'DELETE',
            };
            try {
                const response = yield fetch(url, options);
                if (!response.ok) {
                    console.warn("Fetch returned " + response.status + " from " + url);
                    return [];
                }
                const data = yield response.json();
                console.log(response.status, url);
                return data;
            }
            catch (error) {
                // console.log(response.status, url)
                console.error(error);
            }
        });
    }
}
;



/***/ }),

/***/ "./webextension/wp-dev/fetcher.ts":
/*!****************************************!*\
  !*** ./webextension/wp-dev/fetcher.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchCss: () => (/* binding */ fetchCss),
/* harmony export */   fetchHtml: () => (/* binding */ fetchHtml)
/* harmony export */ });
// import { test } from "./dbi-send"
// test();
const htmlFolder = 'html/';
const cssFolder = 'css/';
function fetchHtml(filename) {
    let url = browser.runtime.getURL(htmlFolder + filename);
    // this is th epromise that we return and letting the fetch function handle resolving the promise
    return fetch(url)
        .then(response => response.text())
        .then(text => text)
        .catch(error => "Error in 'fetchHtml'. File:  fetcher.ts ");
}
function fetchCss(filename) {
    let url = browser.runtime.getURL(cssFolder + filename);
    // this is th epromise that we return and letting the fetch function handle resolving the promise
    return fetch(url)
        .then(response => response.text())
        .then(text => text)
        .catch(error => "Error in 'fetchCss'. File: fetcher.ts");
}
// export {
//     fetchHtml : 
// }


/***/ }),

/***/ "./webextension/wp-dev/overlay.ts":
/*!****************************************!*\
  !*** ./webextension/wp-dev/overlay.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hideOverlay: () => (/* binding */ hideOverlay),
/* harmony export */   initOverlay: () => (/* binding */ initOverlay),
/* harmony export */   showOverlay: () => (/* binding */ showOverlay)
/* harmony export */ });
/* harmony import */ var _fetcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetcher */ "./webextension/wp-dev/fetcher.ts");
/* harmony import */ var _projects_projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects/projects */ "./webextension/wp-dev/projects/projects.ts");
/* harmony import */ var _source_source__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./source/source */ "./webextension/wp-dev/source/source.ts");
/* harmony import */ var _clipboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./clipboard */ "./webextension/wp-dev/clipboard.ts");




// import { age_dbis } from "./dbi-send";
let overlayContainer;
let overlayCss;
let tableCss;
// other cached elements
let contextOverlay;
let sidePanel;
function initOverlay() {
    console.log('OVERLAY TS INIT');
    overlayContainer = document.createElement('div');
    overlayContainer.id = "age_overlayContainer";
    overlayContainer.setAttribute("spellcheck", "false");
    overlayContainer.addEventListener("click", extensionClickHandler);
    overlayContainer.addEventListener("focusin", overlayFocusin);
    // Prevents keystrokes on certain websites from registring when writing in the overlay - tested on youtube shorts - space not working on regular youtube
    // Maybe a bit too much to have listening at all times! BUT I simply need this to work for now..
    overlayContainer.addEventListener("keydown", contentEditableKeyDetection, false);
    overlayContainer.addEventListener("keyup", contentEditableKeyDetection, false);
    overlayContainer.addEventListener("keypress", contentEditableKeyDetection, false);
    function contentEditableKeyDetection(keyevent) {
        let activeElement = document.activeElement;
        if (activeElement.isContentEditable) {
            // enable new line
            if (keyevent.key === "Enter" && keyevent.shiftKey) {
            }
            // prevent new line and exit field
            else if (keyevent.key === "Enter" || keyevent.key === "Escape") {
                keyevent.preventDefault();
                keyevent.target.parentElement.focus();
            }
            keyevent.stopPropagation();
        }
    }
    // overlayContainer.addEventListener("focusout", )
    overlayContainer.addEventListener("loadsource", (event) => {
        _source_source__WEBPACK_IMPORTED_MODULE_2__.loadWithContentObject(event.detail.contentObject);
    });
    overlayContainer.addEventListener("newsource", (event) => {
        _source_source__WEBPACK_IMPORTED_MODULE_2__.loadWithContentObject(event.detail.contentObject);
        _source_source__WEBPACK_IMPORTED_MODULE_2__.showSourceProperties(); // Make sure we go to the properties tab when crating a new source!
    });
    overlayContainer.addEventListener("newproject", (event) => { });
    overlayContainer.addEventListener("refreshextension", (event) => {
        console.log("Refresh extension");
        _projects_projects__WEBPACK_IMPORTED_MODULE_1__.reloadCurrentProject();
    });
    _fetcher__WEBPACK_IMPORTED_MODULE_0__.fetchHtml("overlay.html")
        .then(html => {
        // console.log("HTML : ", html)
        overlayContainer.innerHTML = html;
        contextOverlay = overlayContainer.querySelector("#age_contextOverlay");
        // contextOverlay.addEventListener("click", hideContextMenus);
        sidePanel = overlayContainer.querySelector("#age_overlayRightPanel");
        _projects_projects__WEBPACK_IMPORTED_MODULE_1__.initProjects(sidePanel, contextOverlay.querySelector("#age_moreProjectOptionsContextMenu")); // Pass the context menu!
        _source_source__WEBPACK_IMPORTED_MODULE_2__.initSourceContainer(sidePanel, contextOverlay.querySelector("#age_moreSourceOptionsContextMenu")); // Pass the context menu!
        _clipboard__WEBPACK_IMPORTED_MODULE_3__.initClipboard(sidePanel);
    });
    overlayCss = document.createElement("style");
    overlayCss.id = "age_overlayStyle";
    _fetcher__WEBPACK_IMPORTED_MODULE_0__.fetchCss("overlay.css")
        .then(css => {
        overlayCss.innerText = css;
    });
    tableCss = document.createElement("style");
    tableCss.id = "age_tableStyle";
    _fetcher__WEBPACK_IMPORTED_MODULE_0__.fetchCss("tables.css")
        .then(css => {
        tableCss.innerText = css;
    });
}
// make sure that empty element are populated with default editable elements
function overlayFocusin(event) {
    let eventTarget = event.target;
    if (eventTarget.isContentEditable && eventTarget.textContent == "") {
        // eventTarget.innerHTML = "<div></div><br>"; // not working.. Maybe if I have text not centered in elmeent..
    }
}
function extensionClickHandler(event) {
    let eventTarget = event.target;
    // console.log('_^_^_^_^_^_^', eventTarget.id);
    /*
        NOTE: THIS HAS BEEN MOVED TO ITS OWN EVENT!
    */
    // if (eventTarget.parentElement.classList.contains("age_projchildTableRow")){
    //     let projectChildRow = eventTarget.parentElement as HTMLProjectChildRow;
    //     // console.log('Clicked on child row with uuid = ', projectChildRow.ContentEdgeObject.content.Uuid);
    //     console.log("TODO: LOAD CLICKED SOURCES! ", projectChildRow.ContentEdgeObject.content);
    // }
}
function showOverlay() {
    document.body.lastElementChild.after(overlayContainer);
    document.head.append(overlayCss);
    document.head.append(tableCss);
    _projects_projects__WEBPACK_IMPORTED_MODULE_1__.appendCss();
    _source_source__WEBPACK_IMPORTED_MODULE_2__.appendCss();
    _clipboard__WEBPACK_IMPORTED_MODULE_3__.appendCss();
    // fetcher.fetchHtml("overlay.html")
    //     .then(html => overlayContainer.innerHtml = html)
}
function hideOverlay() {
    overlayContainer.remove();
    overlayCss.remove();
    tableCss.remove();
    _projects_projects__WEBPACK_IMPORTED_MODULE_1__.removeCss();
    _source_source__WEBPACK_IMPORTED_MODULE_2__.removeCss();
    _clipboard__WEBPACK_IMPORTED_MODULE_3__.removeCss();
}



/***/ }),

/***/ "./webextension/wp-dev/projects/project_dom.ts":
/*!*****************************************************!*\
  !*** ./webextension/wp-dev/projects/project_dom.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   populateChildrenTable: () => (/* binding */ populateChildrenTable),
/* harmony export */   populateProjectSearchTable: () => (/* binding */ populateProjectSearchTable),
/* harmony export */   populatePropertiesTable: () => (/* binding */ populatePropertiesTable)
/* harmony export */ });
function populatePropertiesTable(propertiesTable, projectContentObject) {
    console.log("projectContentObject = ", projectContentObject);
    // let projectObject = extensionStateFront.current_projectObject;
    let projectObject = projectContentObject;
    propertiesTable.contentObject = projectContentObject;
    // propertiesTable.addEventListener("focusout", projectPropertyFocusOut)
    // extensionStateFront.current_projectUuid = projectObject.Uuid;
    // document.getElementById('aa-projectTitle').textContent = projectObject.Title;
    // let tbody = document.getElementById('age_projectPropertiesTable-tbody');
    let tbody = propertiesTable.querySelector("tbody");
    tbody.innerHTML = '';
    for (const key in projectObject) {
        // console.log(`${key}: ${projectObject[key]}`);
        if (key === 'Type' || key === 'Title' || key === 'Goal') {
            tbody.innerHTML += `
		
			<tr>
				<td id=age_projPropTable-${key}-key class="age_element" >${key}</td>
				<td id=age_projPropTable-${key}-value class="age_element" contenteditable="true" >${projectObject[key]}</td>
			</tr>
		
		`;
        }
        else {
            tbody.innerHTML += `
		
			<tr>
				<td id=age_projPropTable-${key}-key class="age_element" >${key}</td>
				<td id=age_projPropTable-${key}-value class="age_element">${projectObject[key]}</td>
			</tr>
		
		`;
        }
    }
    let children = tbody.children;
    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        console.log('child = ', child);
        child.tabIndex = 0;
    }
    // console.log(document.querySelectorAll('#age_projectPropertiesTable tbody tr'))
    // let editableProjectPropertyTds: NodeListOf<Element> = tbody.querySelectorAll('.age_editableProjectProperty');
    // console.log(editableProjectPropertyTd)
    // Array.from(editableProjectPropertyTds).forEach((editablePropertyElement) => {
    //     editablePropertyElement.addEventListener('focusout', editableProjectPropertyFocusOut)
    // })
    // for (let editableProjectPropertyTd of editableProjectPropertyTds) {
    //     // console.log(editableProjectPropertyTd.textContent);
    //     // console.log(propertyRow.textContent.length)
    //     // editableProjectPropertyTd.addEventListener('focusout', readProjectPropertiesFromDomAndWritePut)
    //     editableProjectPropertyTd.addEventListener('focusout', editableProjectPropertyFocusOut)
    //     // editableProjectPropertyTd.addEventListener('focusout', postProjectProperties)
    // }
}
function populateChildrenTable(table, projectChildContentEdges) {
    // let projectChildContentEdges = extensionStateFront.current_projectChildContentEdges;
    // extensionStateFront.current_projectUuid = projectObject.Uuid;
    // document.getElementById('aa-projectTitle').textContent = projectObject.Title;
    let tbody = table.querySelector('tbody');
    tbody.innerHTML = '';
    for (const contentEdge of projectChildContentEdges) {
        let newProjectChildRow = document.createElement('tr');
        newProjectChildRow.isProjectChildRow = true;
        newProjectChildRow.tabIndex = 0;
        // Custom event to specifically load the source from the overlay-ts module
        newProjectChildRow.addEventListener("click", (event) => {
            // https://www.reddit.com/r/webdev/comments/rhf2mu/friendly_reminder_use_eventcurrenttarget_not/
            let elementCurrentTarget = event.currentTarget;
            // console.log("event.currentTarget = ", elementCurrentTarget)
            let loadsourceEvent = new CustomEvent("loadsource", {
                bubbles: true,
                detail: { contentObject: elementCurrentTarget.ContentEdgeObject.content },
            });
            let _this = this;
            // console.log("_this = ", _this);
            // console.log("event.target = ", event.target);
            elementCurrentTarget.dispatchEvent(loadsourceEvent);
        });
        newProjectChildRow.id = `age_projchildTableRow-${contentEdge.content.Uuid}`;
        newProjectChildRow.classList.add("age_projchildTableRow");
        newProjectChildRow.ContentEdgeObject = contentEdge;
        newProjectChildRow.innerHTML += `
		
				<td id=age_projchildTable-Table-${contentEdge.content.Uuid} class="age_element age_projchildTable Table" data-Uuid=${contentEdge.content.Uuid}>${contentEdge.content.Table}</td>
				<td id=age_projchildTable-Title-${contentEdge.content.Uuid} class="age_element age_projchildTable Title" data-Uuid=${contentEdge.content.Uuid}>${contentEdge.content.Title}</td>
			
		`;
        // document.getElementById(`id=age_projchildTableRow-${nodeEdge.Uuid}`);
        // console.log(document.getElementById(`id=age_projchildTableRow-${nodeEdge.Uuid}`))
        // newProjectChildRow.addEventListener('click', projectChildRowClicked)
        tbody.appendChild(newProjectChildRow);
    }
}
function populateProjectSearchTable(projectSearchTable, projectObjects) {
    // console.log('PROJECT TBALE POP');
    // childObjects = extensionStateFront.current_projectSearchObjects;
    // let projectTable = document.getElementById('age_projectTable');
    // console.log("SSSSSSSSSSSSSSSSS = ", projectObjects.length)
    let tbody = projectSearchTable.getElementsByTagName('tbody')[0];
    // console.log("tbody = ", tbody);
    tbody.innerHTML = '';
    for (let childObject of projectObjects) {
        let tableRowHtml = `
                
                <td data-Uuid="${childObject.Uuid}" class="age_element age_projectRowSearchData Table">${childObject.Table}</th>
                <td data-Uuid="${childObject.Uuid}" class="age_element age_projectRowSearchData Title">${childObject.Title}</td>

            `;
        // let tr = document.createElement('tr');
        let tr = document.createElement('tr');
        tr.id = 'age_projectSearchRow-' + childObject.Uuid;
        tr.classList.add('age_projectSearchRow');
        // tr.setAttribute("tabIndex")
        tr.tabIndex = 0;
        tr.nodeObject = childObject;
        // tr.dataset.Node = 1;
        // tr.dataset.Uuid = childObject.Uuid;
        // tr.setAttribute('data-Node', '1');
        tr.setAttribute('data-Uuid', childObject.Uuid);
        // tr.tabIndex = 0;
        tr.innerHTML = tableRowHtml;
        // tr.addEventListener('click', clickCallback);
        // tr.contentEditable = 'True';
        tbody.append(tr);
        // console.log(tr)
    }
}


/***/ }),

/***/ "./webextension/wp-dev/projects/projects.ts":
/*!**************************************************!*\
  !*** ./webextension/wp-dev/projects/projects.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appendCss: () => (/* binding */ appendCss),
/* harmony export */   initProjects: () => (/* binding */ initProjects),
/* harmony export */   insertNewSourceToActiveProject: () => (/* binding */ insertNewSourceToActiveProject),
/* harmony export */   reloadCurrentProject: () => (/* binding */ reloadCurrentProject),
/* harmony export */   removeCss: () => (/* binding */ removeCss),
/* harmony export */   toggleExtensionLocation: () => (/* binding */ toggleExtensionLocation)
/* harmony export */ });
/* harmony import */ var _fetcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../fetcher */ "./webextension/wp-dev/fetcher.ts");
/* harmony import */ var _project_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project_dom */ "./webextension/wp-dev/projects/project_dom.ts");
/* harmony import */ var _dbi_send__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dbi-send */ "./webextension/wp-dev/dbi-send.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util */ "./webextension/wp-dev/util.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




let currentProjectObject = null;
let sidePanel;
let sidePanelIsRight = true;
let projectMoreOptionsContextMenu;
let projectContainer;
let projectCss;
let projectMoreOptionsButton;
let projectMoreOptionsMenu;
let projectSearchElement;
let searchStringExists = false;
let projectSearchObjects;
let projectSearchTable;
let projectContentEdgeChildren;
let projectChildrenTable;
let projectPropertiesTable;
let projectTitleElement;
// interface HTMLTableRowElement {
//     nodeObject?: any;
// }
// interface HTMLProjectTableRow extends HTMLTableRowElement {
//     nodeObject: any;
// }
function initProjects(_sidePanel, _projectMoreOptionsContextMenu) {
    console.log('OVERLAY TS INIT');
    sidePanel = _sidePanel;
    // MORE OPTIONS CONTEXT MENU
    projectMoreOptionsContextMenu = _projectMoreOptionsContextMenu;
    projectMoreOptionsContextMenu.addEventListener("click", clickedProjectContextMenu);
    document.body.addEventListener("click", hideProjectContextMenu, { capture: false });
    projectContainer = document.createElement('div');
    projectContainer.id = "age_projectContainer";
    projectContainer.classList.add("age_panelContainer");
    projectContainer.addEventListener("click", projectClick);
    projectContainer.addEventListener("focusout", projectPropertyFocusOut);
    _fetcher__WEBPACK_IMPORTED_MODULE_0__.fetchHtml("projects.html")
        .then(html => {
        // console.log("HTML : ", html)
        projectContainer.innerHTML = html;
        projectTitleElement = projectContainer.querySelector("#age_projectTitle");
        projectSearchTable = projectContainer.querySelector("table");
        projectChildrenTable = projectContainer.querySelector("#age_projectChildrenTable");
        projectPropertiesTable = projectContainer.querySelector("#age_projectPropertiesTable");
        projectSearchElement = projectContainer.querySelector("#age_projectSearchInput");
        projectSearchElement.addEventListener("focusin", searchProjectIn);
        projectSearchElement.addEventListener("focusout", searchProjectOut);
        // TODO : grab the more options context menu
        // projectMoreOptionsMenu = 
        projectMoreOptionsButton = projectContainer.querySelector("#age_projectMoreOptions");
        let moreOptionsBackgroundUrl = browser.runtime.getURL("resources/more-options.png");
        let backgroundString = `url(${moreOptionsBackgroundUrl})`;
        projectMoreOptionsButton.style.backgroundImage = backgroundString;
        // Search icon
        let searchBackgroundUrl = browser.runtime.getURL("resources/search-icon.png");
        let searchBackgroundString = `url(${searchBackgroundUrl})`;
        projectSearchElement.style.backgroundImage = searchBackgroundString;
        fetchProjectSearch("") // perform search only after guaranteed load
            .then((contentObjectArray) => {
            console.log(contentObjectArray);
            _project_dom__WEBPACK_IMPORTED_MODULE_1__.populateProjectSearchTable(projectSearchTable, projectSearchObjects);
        });
    });
    projectCss = document.createElement("style");
    projectCss.id = "age_projectStyle";
    _fetcher__WEBPACK_IMPORTED_MODULE_0__.fetchCss("projects.css")
        .then(css => {
        projectCss.innerText = css;
    });
    console.log("sidePanel.id = ", sidePanel.id);
    sidePanel.append(projectContainer);
}
/**
 * Add new project object and
 */
function createNewProject() {
    return __awaiter(this, void 0, void 0, function* () {
        let newProjectObject = yield _dbi_send__WEBPACK_IMPORTED_MODULE_2__.age_dbis.Content_InsertOnTable("Project");
        currentProjectObject = newProjectObject;
        // await loadProjectWithContentObject(newProjectObject);
        reloadCurrentProject();
    });
}
/**
 *   Reload using the already set values.
*/
function reloadCurrentProject() {
    return __awaiter(this, void 0, void 0, function* () {
        yield reloadChildrenTable();
        yield reloadPropertiesTable();
        yield refreshProjectTitleElement();
        performSearch();
    });
}
function loadProjectWithUuid(Uuid) {
    _dbi_send__WEBPACK_IMPORTED_MODULE_2__.age_dbis.Content_SelectOnUuid(Uuid)
        .then((contentObject) => {
        loadProjectWithContentObject(contentObject);
    });
}
function reloadChildrenTable() {
    return __awaiter(this, void 0, void 0, function* () {
        let contentEdges = yield _dbi_send__WEBPACK_IMPORTED_MODULE_2__.age_dbis.ContentEdge_SelectChildOfUuid(currentProjectObject.Uuid);
        _project_dom__WEBPACK_IMPORTED_MODULE_1__.populateChildrenTable(projectChildrenTable, contentEdges);
    });
}
function reloadPropertiesTable() {
    return __awaiter(this, void 0, void 0, function* () {
        _dbi_send__WEBPACK_IMPORTED_MODULE_2__.age_dbis.Content_SelectOnUuid(currentProjectObject.Uuid)
            .then((contentObject) => {
            _project_dom__WEBPACK_IMPORTED_MODULE_1__.populatePropertiesTable(projectPropertiesTable, contentObject);
        });
    });
}
function refreshProjectTitleElement() {
    projectTitleElement.textContent = currentProjectObject.Title;
}
function projectPropertyFocusOut(event) {
    console.log('FOCUS OUT PROJECT PROPERTY');
    // console.log("event.target = ", event.target);
    // console.log("this = ", this);
    let dataElement = event.target;
    // let projectTable: HTMLTableContentObject = this;
    // console.log('', event.target.)
    switch (dataElement.id) {
        // TYPE
        case "age_projPropTable-Type-value":
            projectPropertiesTable.contentObject.Type = dataElement.textContent;
            break;
        // TITLE
        case "age_projPropTable-Title-value":
            projectPropertiesTable.contentObject.Title = dataElement.textContent;
            break;
        // GOAL
        case "age_projPropTable-Goal-value":
            projectPropertiesTable.contentObject.Goal = dataElement.textContent;
            break;
        default:
            // Return! Else elements will be updated with garbage value when e.g. exiting search input
            return;
            break;
    }
    _dbi_send__WEBPACK_IMPORTED_MODULE_2__.age_dbis.Content_UpdateWithContentObject(projectPropertiesTable.contentObject)
        .then(updatedContentObject => {
        switch (dataElement.id) {
            // TYPE
            case "age_projPropTable-Type-value":
                console.assert(updatedContentObject.Type == projectPropertiesTable.contentObject.Type, "'PUT' content Object Type does not match the project table .contentObject.Type !");
                break;
            // TITLE
            case "age_projPropTable-Title-value":
                console.assert(updatedContentObject.Title == projectPropertiesTable.contentObject.Title, "'PUT' content Object Title does not match the project table .contentObject.Title !");
                _util__WEBPACK_IMPORTED_MODULE_3__.UuidCheckAndUpdateTitles(currentProjectObject.Uuid, updatedContentObject.Title); // Update titles in currently loaded extension
                break;
            // GOAL
            case "age_projPropTable-Goal-value":
                console.assert(updatedContentObject.Goal == projectPropertiesTable.contentObject.Goal, "'PUT' content Object Goal does not match the project table .contentObject.Goal !");
                break;
            default:
                break;
        }
    });
    // let projectContentObject = document.getElementById("age_projectPropertiesTable") as HTMLTableContentObject;
    // console.log("projectContentObject.contentObject = ", projectPropertiesTable.contentObject);
    currentProjectObject = projectPropertiesTable.contentObject;
    refreshProjectTitleElement();
    // Update Titles in the search
    // let elementWithSameUuid = document.querySelectorAll(`[data-uuid='${currentProjectObject.Uuid}']`);
    // elementWithSameUuid.forEach((_element) => {
    //     if (_element.classList.contains("age_element") && _element.classList.contains("age_projectSearchRow")){
    //         // _element.children[1].textContent = dataElement.textContent; // update the second search column; edit: doesn't work...
    //     }
    // })
}
function clickedProjectContextMenu(event) {
    return __awaiter(this, void 0, void 0, function* () {
        let eventTarget = event.target;
        switch (eventTarget.id) {
            case "newProjectBtn":
                yield createNewProject();
                showProjectProperties();
                break;
            case "newSourceBtn":
                insertNewSourceToActiveProject();
                break;
            case "refreshExtension":
                console.warn("'refreshExtension' NOT FULLY IMPLEMENTED ! ONLY PROJECT IS REFRESHED");
                // reloadCurrentProject();
                let newsourceEvent = new CustomEvent("refreshextension", {
                    bubbles: true,
                });
                projectContainer.dispatchEvent(newsourceEvent);
                break;
            case "printCurrentProject":
                console.log(currentProjectObject);
                console.log(JSON.stringify(currentProjectObject));
                break;
            case "moveExtension":
                toggleExtensionLocation();
                break;
            default:
                break;
        }
    });
}
function toggleExtensionLocation() {
    // Shift between left and right
    if (sidePanelIsRight) {
        document.getElementById("age_overlayContainer").style.justifyContent = "start";
        sidePanelIsRight = false;
    }
    else {
        document.getElementById("age_overlayContainer").style.justifyContent = "end";
        sidePanelIsRight = true;
    }
}
// }
// <button id="refreshExtension" > Refresh from server </button>
//     < button id = "printCurrentProject" > Copy Project Properties </button>
//         < button id = "moveExtension" > Move Extension </button>
/**
 * Add new child-source, fires off the loadsource CustomEvent, and then reloads the project child table.
 */
function insertNewSourceToActiveProject() {
    return __awaiter(this, void 0, void 0, function* () {
        if (currentProjectObject === undefined || currentProjectObject === null) {
            console.warn("No current Project. Can't add new source.");
            return;
        }
        let contentEdgeObject = yield _dbi_send__WEBPACK_IMPORTED_MODULE_2__.age_dbis.ContentEdge_InsertAdjacentToUuidIntoTable(currentProjectObject.Uuid, 1, 'Source', '', '', '/');
        // make sure we set a default url!
        let _newSourceObject = contentEdgeObject.content;
        _newSourceObject.Url = window.location.href;
        _newSourceObject.Title = document.title;
        _newSourceObject = yield _dbi_send__WEBPACK_IMPORTED_MODULE_2__.age_dbis.Content_UpdateWithContentObject(_newSourceObject);
        // Insert new Schedule
        yield _dbi_send__WEBPACK_IMPORTED_MODULE_2__.age_dbis.Review_InsertScheduleOnUuid(_newSourceObject.Uuid, "");
        // SEND NEW SOURCE MESSAGE
        let newsourceEvent = new CustomEvent("newsource", {
            bubbles: true,
            detail: { contentObject: _newSourceObject },
        });
        projectContainer.dispatchEvent(newsourceEvent);
        // update project children table
        _dbi_send__WEBPACK_IMPORTED_MODULE_2__.age_dbis.ContentEdge_SelectChildOfUuid(currentProjectObject.Uuid)
            .then((contentEdges) => {
            _project_dom__WEBPACK_IMPORTED_MODULE_1__.populateChildrenTable(projectChildrenTable, contentEdges);
        });
    });
}
function hideProjectContextMenu(event) {
    let eventTarget = event.target;
    // console.log('_^_^_^_^_^_^', eventTarget.id);
    let isContextElement = eventTarget.id === "age_moreProjectOptionsContextMenu" || eventTarget.id === "age_projectMoreOptions";
    // console.log('isContextElement = ', isContextElement);
    if (!isContextElement) {
        let optionsContextMenu = document.getElementById("age_moreProjectOptionsContextMenu");
        if (optionsContextMenu !== null)
            optionsContextMenu.classList.add("age_displayNone");
    }
}
/**
 *  Main click handler in the project container.
 *
 * @param event
 */
function projectClick(event) {
    // console.log("Click detected in project container.");
    let clickTarget = event.target;
    console.log("CLICLCLICLKCICLCICL");
    // SEARCH ROW
    if (clickTarget.classList.contains("age_projectRowSearchData") || clickTarget.classList.contains("age_projectSearchRow")) {
        // grab parent because we clicked on data-element
        let tableRowTarget = clickTarget.parentElement;
        loadProjectWithContentObject(tableRowTarget.nodeObject);
        showProjectChildren();
    }
    // SEARCH/CHILDREN/PROPERTIES BUTTON
    else if (clickTarget.id == "age_projectSearchButton"
        || clickTarget.id == "age_projectChildrenButton"
        || clickTarget.id == "age_projectPropertiesButton") {
        // projectSearchButtonClicked(event.target as HTMLElement);
        showProjectTable(clickTarget.id);
    }
    // MORE OPTIONS BUTTON
    else if (clickTarget.id == "age_projectMoreOptions") {
        // projectMoreOptionsButtonClicked(event.target as HTMLElement);
        toggleMoreOptions();
    }
    // TITLE
    else if (clickTarget.id == "age_projectTitle") {
        // TOGGLE Project/source container expansions/collapse
        let projectContainerElement = document.getElementById("age_projectContainer");
        projectContainerElement.classList.contains("collapsed") ? projectContainerElement.classList.remove("collapsed") : projectContainerElement.classList.add("collapsed");
        let sourceContainerElement = document.getElementById("age_sourceContainer");
        sourceContainerElement.classList.contains("collapsed") ? sourceContainerElement.classList.remove("collapsed") : sourceContainerElement.classList.add("collapsed");
    }
    else {
        // console.log('Ignored Project Click.');
    }
}
/**
 *  loads an existing project. Usually from clicking on a project during search OR creating a new project object.
 */
function loadProjectWithContentObject(_contentObject) {
    // Set module variable
    currentProjectObject = _contentObject;
    // set title
    document.getElementById('age_projectTitle').textContent = _contentObject.Title;
    _project_dom__WEBPACK_IMPORTED_MODULE_1__.populatePropertiesTable(projectPropertiesTable, _contentObject);
    // populate properties table 
    fetchProjectChildren(_contentObject.Uuid)
        .then((contentEdgeObjects) => { _project_dom__WEBPACK_IMPORTED_MODULE_1__.populateChildrenTable(projectChildrenTable, projectContentEdgeChildren); });
    // showProjectChildren();
}
function showProjectChildren() {
    // move focus to the children-tab
    document.getElementById("age_projectChildrenButton").click();
}
function showProjectProperties() {
    // move focus to the children-tab
    document.getElementById("age_projectPropertiesButton").click();
}
function toggleMoreOptions() {
    // console.log("TOGGLE MORE OPTIONS")
    let buttonBoundingRect = projectMoreOptionsButton.getBoundingClientRect();
    let btnLeft = buttonBoundingRect.left;
    let btnRight = buttonBoundingRect.right;
    let btnBottom = buttonBoundingRect.bottom;
    let btnX = buttonBoundingRect.x;
    projectMoreOptionsContextMenu.style.top = btnBottom + 5 + "px";
    if (sidePanelIsRight) {
        projectMoreOptionsContextMenu.style.left = btnLeft - 170 + "px";
    }
    else {
        projectMoreOptionsContextMenu.style.left = btnLeft + "px";
    }
    projectMoreOptionsContextMenu.classList.contains("age_displayNone") ? projectMoreOptionsContextMenu.classList.remove("age_displayNone") : projectMoreOptionsContextMenu.classList.add("age_displayNone");
}
function searchProjectIn() {
    // console.log("searchProjectIn()")
    // focusProjectSearch = true;
    // extensionStateFront.projectSearchActive = true;
    //writeStateFromFront();
    // console.log('projectSearchElement.textContent = ', projectSearchElement.textContent);
    // Empty search container if no previous search string exists
    if (!searchStringExists) {
        projectSearchElement.innerHTML = '<div><br></div>'; // default content on 'contenteditable' elements 
        // setInterval(() => { searchInput.innerHTML += '<br>' }, 50);
    }
    searchStringExists = true;
    // console.log('focus search ')
    // projectSearchInput.addEventListener('keypress', keyPressDuringSearch)
    projectSearchElement.addEventListener('keydown', keyDownDuringSearch);
    // keyDownDuringSearch();
}
function searchProjectOut() {
    // console.log('searchProjectOut()');
    let searchStringLength = projectSearchElement.textContent.length;
    if (searchStringLength === 0) {
        searchStringExists = false;
        projectSearchElement.innerHTML = '<div>Q  :  Search . . .<br></div>';
    }
    else {
        searchStringExists = true;
    }
    projectSearchElement.removeEventListener('keydown', keyDownDuringSearch);
}
// Perform search with slight delay to make sure new input is written to contentEditanle input
function keyDownDuringSearch(event) {
    return __awaiter(this, void 0, void 0, function* () {
        // User just deleted the last character so we reset the default contenteditable elment structure
        // if we con't do this the user will inadvertiedly remove the containing <div>, breaking the typing-behaviour!
        if (event.key === "Backspace" && projectSearchElement.textContent.length === 1) {
            console.log('Last character deletion protection!');
            projectSearchElement.innerHTML = '<div><br></div>'; // default content on 'contenteditable' elements 
            event.preventDefault();
        }
        // This does not prevent a request on each keystroke
        // BUT it enables reading the change of each keystroke. When this method is called the textContent of the serach box has not been updated!!
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            performSearch();
        }), 100);
    });
}
function performSearch() {
    let searchString = "";
    if (searchStringExists)
        searchString = projectSearchElement.textContent;
    else
        searchString = "";
    // console.log("Searching with searchstrign = ", searchString)
    fetchProjectSearch(searchString)
        .then((contentObjectArray) => {
        // console.log(contentObjectArray)
        _project_dom__WEBPACK_IMPORTED_MODULE_1__.populateProjectSearchTable(projectSearchTable, contentObjectArray);
    });
}
function showProjectTable(buttonId) {
    // age_projectButtonOn
    // Search box 
    let searchBox = document.getElementById("age_projectSearchInput");
    searchBox.classList.add("age_displayNone");
    // Reset the buttons
    let searchButton = document.getElementById("age_projectSearchButton");
    let childrenButton = document.getElementById("age_projectChildrenButton");
    let propertiesButton = document.getElementById("age_projectPropertiesButton");
    searchButton.classList.remove("age_projectButtonOn");
    childrenButton.classList.remove("age_projectButtonOn");
    propertiesButton.classList.remove("age_projectButtonOn");
    // Reset the Tables
    let searchTable = document.getElementById("age_projectSearchTable");
    let childrenTable = document.getElementById("age_projectChildrenTable");
    let propertiesTable = document.getElementById("age_projectPropertiesTable");
    searchTable.classList.add("age_displayNone");
    childrenTable.classList.add("age_displayNone");
    propertiesTable.classList.add("age_displayNone");
    // Active the correct one
    if (buttonId === "age_projectSearchButton") {
        searchTable.classList.remove("age_displayNone");
        searchButton.classList.add("age_projectButtonOn");
        searchBox.classList.remove("age_displayNone");
    }
    else if (buttonId === "age_projectChildrenButton") {
        childrenTable.classList.remove("age_displayNone");
        childrenButton.classList.add("age_projectButtonOn");
    }
    else if (buttonId === "age_projectPropertiesButton") {
        propertiesTable.classList.remove("age_displayNone");
        propertiesButton.classList.add("age_projectButtonOn");
    }
}
// function projectTitleClicked(tableRow: HTMLElement): void {
//     console.log("Project title clicked: ", tableRow)
// }
// function projectSearchButtonClicked(tableRow: HTMLElement) : void {
//     console.log("Project search clicked: ", tableRow)
// }
// function projectChildrenButtonClicked(tableRow: HTMLElement): void {
//     console.log("Project children clicked: ", tableRow)
// }
// function projectPropertiesButtonClicked(tableRow: HTMLElement): void {
//     console.log("Project properties clicked: ", tableRow)
// }
// function projectMoreOptionsButtonClicked(tableRow: HTMLElement): void {
//     console.log("Project options clicked: ", tableRow)
// }
// function projectSearchRowClicked(tableRow: HTMLProjectTableRow): void {
//     console.log("Table row clicked: ", tableRow)
// }
function fetchProjectSearch(searchString) {
    return _dbi_send__WEBPACK_IMPORTED_MODULE_2__.age_dbis.Content_SelectOnTitleLikeString(searchString, "50", "Project", "", "")
        .then((contentObjectArray) => {
        // console.log(contentObjectArray);
        projectSearchObjects = contentObjectArray;
        return Promise.resolve(contentObjectArray);
    })
        .catch((error) => {
        return Promise.reject();
    });
}
function fetchProjectChildren(Uuid) {
    return _dbi_send__WEBPACK_IMPORTED_MODULE_2__.age_dbis.ContentEdge_SelectChildOfUuid(Uuid)
        .then((contentEdgeObjectArray) => {
        // console.log(contentObjectArray);
        projectContentEdgeChildren = contentEdgeObjectArray;
        console.log('projectContentEdgeChildren = ', projectContentEdgeChildren);
        return Promise.resolve(projectContentEdgeChildren);
    })
        .catch((error) => {
        return Promise.reject();
    });
}
function appendCss() {
    document.head.append(projectCss);
}
function removeCss() {
    projectCss.remove();
}



/***/ }),

/***/ "./webextension/wp-dev/source/source.ts":
/*!**********************************************!*\
  !*** ./webextension/wp-dev/source/source.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appendCss: () => (/* binding */ appendCss),
/* harmony export */   focusOnLastChildRowTitle: () => (/* binding */ focusOnLastChildRowTitle),
/* harmony export */   getCurrentSourceObject: () => (/* binding */ getCurrentSourceObject),
/* harmony export */   getCurrentSourceUuid: () => (/* binding */ getCurrentSourceUuid),
/* harmony export */   initSourceContainer: () => (/* binding */ initSourceContainer),
/* harmony export */   loadWithContentObject: () => (/* binding */ loadWithContentObject),
/* harmony export */   removeCss: () => (/* binding */ removeCss),
/* harmony export */   showSourceChildren: () => (/* binding */ showSourceChildren),
/* harmony export */   showSourceProperties: () => (/* binding */ showSourceProperties)
/* harmony export */ });
/* harmony import */ var _fetcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../fetcher */ "./webextension/wp-dev/fetcher.ts");
/* harmony import */ var _dbi_send__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dbi-send */ "./webextension/wp-dev/dbi-send.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ "./webextension/wp-dev/util.ts");
// import * as sdom from "./source_dom";
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



let sidePanel;
let sourceTitleElement;
let sourceChildrenButton;
let sourcePropertiesButton;
let sourceContainer;
let sourceCss;
let sourceChildrenTable;
let projectContentEdgeChildren;
let sourcePropertiesTable;
let currentSourceObject;
let currentSourceUuid;
function getCurrentSourceObject() { return sourcePropertiesTable.contentObject; }
;
function getCurrentSourceUuid() { return currentSourceUuid; }
;
function initSourceContainer(_sidePanel, _sourceMoreOptionsContextMenu) {
    console.log('initSourceContainer(...)');
    sidePanel = _sidePanel;
    sourceContainer = document.createElement('div');
    sourceContainer.id = "age_sourceContainer";
    sourceContainer.classList.add("age_panelContainer", "collapsed");
    sourceContainer.addEventListener("click", clickedSourceContainer);
    // sourceContainer.addEventListener("focusout", sourcePropertyFocusedOut);
    sourceContainer.addEventListener("focusout", focusoutSourceContentEditable);
    _fetcher__WEBPACK_IMPORTED_MODULE_0__.fetchHtml("source.html")
        .then(html => {
        // console.log("HTML : ", html)
        sourceContainer.innerHTML = html;
        sourceTitleElement = sourceContainer.querySelector("#age_sourceTitle");
        sourceChildrenTable = sourceContainer.querySelector("#age_sourceChildTable");
        sourcePropertiesTable = sourceContainer.querySelector("#age_sourcePropertiesTable");
        sourceChildrenButton = sourceContainer.querySelector("#age_sourceSearchButton");
        sourcePropertiesButton = sourceContainer.querySelector("#age_sourcePropertiesButton");
    });
    sourceCss = document.createElement("style");
    sourceCss.id = "age_sourceStyle";
    _fetcher__WEBPACK_IMPORTED_MODULE_0__.fetchCss("source.css")
        .then(css => {
        sourceCss.innerText = css;
    });
    sidePanel.append(sourceContainer);
}
/** Generic focusout-events from content-editable fields that are captured by the source container.
 *  Redirects to specific function depending on if its a source-shard or a property value
 */
function focusoutSourceContentEditable(event) {
    let focusoutTarget = event.target;
    if (focusoutTarget.classList.contains("Title")) {
        focusoutSourceChildTitle(focusoutTarget);
    }
    else if (focusoutTarget.classList.contains("age_sourcePropValue")) {
        focusoutSourceProperty(focusoutTarget);
    }
}
/** Grabs the textContent of targeted element and updates the associated contentObject using API */
function focusoutSourceChildTitle(dataElement) {
    let sourceChildRow = dataElement.parentElement;
    sourceChildRow.contentObject.content.Title = dataElement.textContent;
    _util__WEBPACK_IMPORTED_MODULE_2__.UuidCheckAndUpdateTitles(sourceChildRow.contentObject.content.Uuid, dataElement.textContent); // Update titles in currently loaded extension
    _dbi_send__WEBPACK_IMPORTED_MODULE_1__.age_dbis.Content_UpdateWithContentObject(sourceChildRow.contentObject.content)
        .then(updatedContentObject => {
        // console.log("Updated source child-row : ", updatedContentObject)
    });
}
/** Updates the coresponding contentObject, sends it to database, and asserts the returned content objects */
function focusoutSourceProperty(focusoutElement) {
    // console.log('', event.target.)
    switch (focusoutElement.id) {
        // TYPE
        case "age_sourcePropTable-Type-value":
            sourcePropertiesTable.contentObject.Type = focusoutElement.textContent;
            break;
        // TITLE
        case "age_sourcePropTable-Title-value":
            sourcePropertiesTable.contentObject.Title = focusoutElement.textContent;
            sourceTitleElement.textContent = focusoutElement.textContent;
            _util__WEBPACK_IMPORTED_MODULE_2__.UuidCheckAndUpdateTitles(currentSourceObject.Uuid, focusoutElement.textContent); // Update titles in currently loaded extension
            break;
        // GOAL
        case "age_sourcePropTable-Url-value":
            sourcePropertiesTable.contentObject.Url = focusoutElement.textContent;
            break;
        default:
            break;
    }
    _dbi_send__WEBPACK_IMPORTED_MODULE_1__.age_dbis.Content_UpdateWithContentObject(sourcePropertiesTable.contentObject)
        .then(updatedContentObject => {
        switch (focusoutElement.id) {
            // TYPE
            case "age_sourcePropTable-Type-value":
                console.assert(updatedContentObject.Type == sourcePropertiesTable.contentObject.Type, "'PUT' content Object Type does not match the project table .contentObject.Type !");
                break;
            // TITLE
            case "age_sourcePropTable-Title-value":
                console.assert(updatedContentObject.Title == sourcePropertiesTable.contentObject.Title, "'PUT' content Object Title does not match the project table .contentObject.Title !");
                break;
            // GOAL
            case "age_sourcePropTable-Url-value":
                console.assert(updatedContentObject.Url == sourcePropertiesTable.contentObject.Url, "'PUT' content Object Goal does not match the project table .contentObject.Goal !");
                break;
            default:
                break;
        }
    });
    // let projectContentObject = document.getElementById("age_projectPropertiesTable") as HTMLTableContentObject;
    currentSourceObject = sourcePropertiesTable.contentObject;
}
/** Captures the container-clicks. Current responsabilities:
 *  1. Toggle between the two source tables.
 */
function clickedSourceContainer(event) {
    let eventTarget = event.target;
    if (eventTarget.id === "age_sourceSearchButton" || eventTarget.id === "age_sourcePropertiesButton") {
        displaySourceTable(eventTarget.id);
    }
}
function showSourceChildren() {
    sourceChildrenButton.click();
}
function showSourceProperties() {
    sourcePropertiesButton.click();
}
/** Will load the table and update the button for the corresponding button-id provided */
function displaySourceTable(buttonID) {
    let childrenButton = document.getElementById("age_sourceSearchButton");
    let propertiesButton = document.getElementById("age_sourcePropertiesButton");
    sourceChildrenTable.classList.add("age_displayNone");
    sourcePropertiesTable.classList.add("age_displayNone");
    childrenButton.classList.remove("age_sourceButtonOn");
    propertiesButton.classList.remove("age_sourceButtonOn");
    if (buttonID == "age_sourceSearchButton") {
        sourceChildrenTable.classList.remove("age_displayNone");
        childrenButton.classList.add("age_sourceButtonOn");
    }
    else if (buttonID == "age_sourcePropertiesButton") {
        sourcePropertiesTable.classList.remove("age_displayNone");
        propertiesButton.classList.add("age_sourceButtonOn");
    }
}
function loadWithContentObject(_contentObject) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('loading Source panel with ', _contentObject);
        currentSourceObject = _contentObject;
        // let sourceObject = extensionStateFront.current_sourceObject;
        // extensionStateFront.current_sourceUuid = sourceObject.Uuid;
        sourcePropertiesTable.addEventListener("focusout", sourcePropertyFocusOut);
        sourcePropertiesTable.contentObject = _contentObject;
        document.getElementById('age_sourceTitle').textContent = _contentObject.Title;
        let tbody = document.getElementById('age_sourcePropertiesTable-tbody');
        tbody.innerHTML = '';
        for (const key in _contentObject) {
            // console.log(`${key}: ${sourceObject[key]}`);
            if (key === 'Type' || key === 'Title' || key === 'Url' || key === 'IAmSource') {
                tbody.innerHTML += `
		
			<tr>
				<td id=age_sourcePropTable-${key}-key class="age_element" >${key}</td>
				<td id=age_sourcePropTable-${key}-value class="age_sourcePropValue age_element" contenteditable="true" >${_contentObject[key]}</td>
			</tr>
		
		`;
            }
            else {
                tbody.innerHTML += `
		
			<tr>
				<td id=age_sourcePropTable-${key}-key class="age_element" >${key}</td>
				<td id=age_sourcePropTable-${key}-value class="age_sourcePropValue age_element">${_contentObject[key]}</td>
			</tr>
		
		`;
            }
        }
        // // console.log(document.querySelectorAll('#age_sourcePropertiesTable tbody tr'))
        // let editableSourcePropertyTds = document.querySelectorAll('.age_editableSourceProperty');
        // // // console.log(editableSourcePropertyTd)
        // for (let editableSourcePropertyTd of editableSourcePropertyTds) {
        //     // console.log(editableSourcePropertyTd.textContent);
        //     // console.log(propertyRow.textContent.length)
        //     // editableSourcePropertyTd.addEventListener('focusout', readSourcePropertiesFromDomAndWritePut)
        //     editableSourcePropertyTd.addEventListener('focusout', editableSourcePropertyFocusOut)
        // }
        yield loadSourceChildren(_contentObject);
    });
}
function loadSourceChildren(_contentObject) {
    return __awaiter(this, void 0, void 0, function* () {
        let childContentEdgeObjects = yield _dbi_send__WEBPACK_IMPORTED_MODULE_1__.age_dbis.ContentEdge_SelectChildOfUuid(_contentObject.Uuid);
        let tbody = document.getElementById('age_sourceChildTable-tbody');
        tbody.innerHTML = '';
        for (let childContentEdgeObject of childContentEdgeObjects) {
            let tableRowHtml = `
                
                <td class="age_element age_sourceChildTable Table" data-Uuid="${childContentEdgeObject.content.Uuid}">${childContentEdgeObject.content.Table}</td>
				<td class="age_element age_sourceChildTable Type" data-Uuid="${childContentEdgeObject.content.Uuid}">${childContentEdgeObject.content.Type}</td>
                <td class="age_element age_sourceChildTable Title" data-Uuid="${childContentEdgeObject.content.Uuid}" contenteditable="true">${childContentEdgeObject.content.Title}</td>

            `;
            // Been unable to turn this into a good content obejct so far. I need to extend ALL possible html-elements to make generic interface...
            // potential solution is then HTMLTableRowElement & contentobject : any
            let tr = document.createElement('tr');
            tr.id = 'age_sourceSearchNode-' + childContentEdgeObject.content.Uuid;
            tr.contentObject = childContentEdgeObject;
            // tr.aaa = "asd";
            tr.setAttribute('data-fuck', 'f*ck');
            // tr.dataset.Node = 1;
            // tr.dataset.Uuid = childObject.Uuid;
            tr.setAttribute('data-Node', '1');
            tr.setAttribute('data-Uuid', childContentEdgeObject.content.Uuid);
            // tr.tabIndex = 1;
            tr.innerHTML = tableRowHtml;
            // tr.addEventListener('click', clickSourceChildRow);
            // tr.addEventListener('click', (event) => { console.log(event.target.parentNode.nodeObject) });
            // Targets only the last (i.e. Title) column
            // tr.lastElementChild.addEventListener("focusout", async (event) => {
            //     let uuid = event.target.parentElement.nodeObject.content.Uuid;
            //     let contentObject = event.target.parentElement.nodeObject.content;
            //     contentObject.Title = event.target.textContent;
            //     // console.log("CCCCCCCCCC", contentObject)
            //     let putContentObject = await dbis.Content_UpdateWithContentObject(contentObject);
            //     let fetchedContentObject = await dbis.Content_SelectOnUuid(uuid);
            //     await fetchCurrentSourceChildrenThenWriteToStates();
            //     populateSourceChildTableFromState();
            //     // console.log("DDDDDDDDDD", fetchedContentObject)
            //     // copySourceChildTableFromDom();
            //     // putCurrentSourceObject();
            //     // fetchCurrentSourceChildrenThenWriteToStates();
            //     // populateSourceChildTableFromState();
            // });
            // tr.contentEditable = 'True';
            tbody.append(tr);
            // console.log(tr)
        }
        // console.table(childObjects)
    });
}
function sourcePropertyFocusOut(event) {
    console.log('FOCUS OUT FROM SOURCE PROPERTY');
}
function focusOnLastChildRowTitle() {
    let tbody = document.getElementById("age_sourceChildTable-tbody");
    // console.log("tbody = ", tbody)
    let lastRow = tbody.lastElementChild.lastElementChild;
    // console.log("lastRow = ", lastRow)
    if (lastRow.textContent.length == 0) {
        lastRow.innerHTML = "<div><br></div>";
        lastRow.focus();
    }
    else {
        lastRow.focus();
        // this.selectionStart = this.selectionEnd = this.value.length;
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(lastRow.childNodes[0], lastRow.childNodes[0].textContent.length);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }
}
function appendCss() {
    document.head.append(sourceCss);
}
function removeCss() {
    sourceCss.remove();
}


/***/ }),

/***/ "./webextension/wp-dev/util.ts":
/*!*************************************!*\
  !*** ./webextension/wp-dev/util.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AgeContentEdgeObject: () => (/* binding */ AgeContentEdgeObject),
/* harmony export */   AgeContentObject: () => (/* binding */ AgeContentObject),
/* harmony export */   UuidCheckAndUpdateTitles: () => (/* binding */ UuidCheckAndUpdateTitles)
/* harmony export */ });
class AgeContentObject {
    constructor(_contentObject) {
        this.object = _contentObject;
    }
    getTable() {
        return this.object.Table;
    }
}
class AgeContentEdgeObject {
    constructor(_contentEdgeObject) {
        this.content = _contentEdgeObject.content;
        this.edge = _contentEdgeObject.edge;
    }
}
/** Updates all elements that contains the title of the passed uuid */
function UuidCheckAndUpdateTitles(_uuid, _title) {
    let uuidElements = document.querySelectorAll(`[data-uuid='${_uuid}']`);
    uuidElements.forEach((_element) => {
        console.log("element = ", _element);
        if (_element.classList.contains("Title"))
            _element.textContent = _title;
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./webextension/wp-dev/index.ts ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _overlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./overlay */ "./webextension/wp-dev/overlay.ts");

let extensionStateFront = {
    active: false,
};
// Set up modules and fetch data, but does not render anything
(function init() {
    // DEV DEV
    // Make sure any existing overlays are removed
    if (document.getElementById("age_overlayContainer") !== null)
        window.location.reload();
    _overlay__WEBPACK_IMPORTED_MODULE_0__.initOverlay();
})();
/*
    TOGGLES THE EXTENSION FRONTEND UI
*/
browser.runtime.onMessage.addListener((message) => {
    if (message.name === 'toggleExtension') {
        console.log("Toggle Exitension Message recieved!");
        if (extensionStateFront.active) {
            extensionStateFront.active = false;
            _overlay__WEBPACK_IMPORTED_MODULE_0__.hideOverlay();
        }
        else {
            extensionStateFront.active = true;
            _overlay__WEBPACK_IMPORTED_MODULE_0__.showOverlay();
        }
    }
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UUFFbEQsSUFBSSxtQkFBbUIsQ0FBQyxNQUFNLEVBQUMsQ0FBQztZQUM1QixtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ25DLGlEQUFtQixFQUFFLENBQUM7UUFHMUIsQ0FBQzthQUNHLENBQUM7WUFDRCxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2xDLGlEQUFtQixFQUFFLENBQUM7UUFDMUIsQ0FBQztJQUNMLENBQUM7QUFFTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NvdXJjZXMvLi93ZWJleHRlbnNpb24vd3AtZGV2L2NsaXBib2FyZC50cyIsIndlYnBhY2s6Ly9zb3VyY2VzLy4vd2ViZXh0ZW5zaW9uL3dwLWRldi9kYmktc2VuZC50cyIsIndlYnBhY2s6Ly9zb3VyY2VzLy4vd2ViZXh0ZW5zaW9uL3dwLWRldi9mZXRjaGVyLnRzIiwid2VicGFjazovL3NvdXJjZXMvLi93ZWJleHRlbnNpb24vd3AtZGV2L292ZXJsYXkudHMiLCJ3ZWJwYWNrOi8vc291cmNlcy8uL3dlYmV4dGVuc2lvbi93cC1kZXYvcHJvamVjdHMvcHJvamVjdF9kb20udHMiLCJ3ZWJwYWNrOi8vc291cmNlcy8uL3dlYmV4dGVuc2lvbi93cC1kZXYvcHJvamVjdHMvcHJvamVjdHMudHMiLCJ3ZWJwYWNrOi8vc291cmNlcy8uL3dlYmV4dGVuc2lvbi93cC1kZXYvc291cmNlL3NvdXJjZS50cyIsIndlYnBhY2s6Ly9zb3VyY2VzLy4vd2ViZXh0ZW5zaW9uL3dwLWRldi91dGlsLnRzIiwid2VicGFjazovL3NvdXJjZXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc291cmNlcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc291cmNlcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NvdXJjZXMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zb3VyY2VzLy4vd2ViZXh0ZW5zaW9uL3dwLWRldi9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmZXRjaGVyIGZyb20gXCIuL2ZldGNoZXJcIjtcclxuaW1wb3J0ICogYXMgc291cmNlIGZyb20gXCIuL3NvdXJjZS9zb3VyY2VcIjtcclxuaW1wb3J0ICogYXMgcHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0cy9wcm9qZWN0c1wiO1xyXG5pbXBvcnQgeyBhZ2VfZGJpcyB9IGZyb20gXCIuL2RiaS1zZW5kXCI7XHJcblxyXG5sZXQgc2lkZVBhbmVsOiBFbGVtZW50O1xyXG5cclxuXHJcbmxldCBjbGlwYm9hcmRDb250YWluZXI6IEVsZW1lbnQ7XHJcbmxldCBjbGlwYm9hcmRDc3M6IEhUTUxFbGVtZW50O1xyXG5cclxuXHJcbi8vIFZBUlNcclxubGV0IHdhaXRpbmdTZWNvbmRTaGlmdCA9IDA7XHJcbmxldCB3YWl0aW5nU2Vjb25kQ3RybFNoaWZ0ID0gMDtcclxuXHJcblxyXG5sZXQgY2xpcGJvYXJkSW5uZXIgOiBIVE1MRWxlbWVudDtcclxubGV0IGNsaXBib2FyZENvZGVDaGVja2JveCA6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbmxldCBjbGlwYm9hcmRUZXh0VHlwZUlucHV0IDogSFRNTElucHV0RWxlbWVudDtcclxuXHJcbmxldCBjbGlwYm9hcmRDb25jYXRDb250ZW50cyA6IEhUTUxFbGVtZW50O1xyXG5sZXQgdGV4dENvbmNhdGVuYXRpb25DYXB0dXJpbmcgOiBib29sZWFuID0gZmFsc2U7XHJcbmxldCB0ZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnQgOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRDbGlwYm9hcmQoX3NpZGVQYW5lbDogRWxlbWVudCkge1xyXG5cdC8vIGNsaXBib2FyZENvZGVDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0b2dnbGVTZWxlY3RDb2RlKTtcclxuXHJcblx0Ly8gd3JpdGVUZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnRUb0RvbSgpO1xyXG5cclxuXHQvLyBpZiAoZXh0ZW5zaW9uU3RhdGVGcm9udC50ZXh0Q29uY2F0ZW5hdGlvbkNhcHR1cmluZykge1xyXG5cdC8vIFx0Y2xpcGJvYXJkSW5uZXIuY2xhc3NMaXN0LmFkZCgnYWdlX2FjdGl2ZUNsaXBib2FyZCcpO1xyXG5cdC8vIH1cclxuXHQvLyBlbHNlIHtcclxuXHQvLyBcdGNsaXBib2FyZElubmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FnZV9hY3RpdmVDbGlwYm9hcmQnKTtcclxuXHQvLyB9XHJcblxyXG5cdC8qIFxyXG5cdFxyXG5cdFx0XHRORVcgTkVXIE5FVyAtIDIwMjQtMTAtMDJcclxuXHRcclxuXHQqL1xyXG5cclxuXHRzaWRlUGFuZWwgPSBfc2lkZVBhbmVsO1xyXG5cclxuXHRjbGlwYm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRjbGlwYm9hcmRDb250YWluZXIuaWQgPSBcImFnZV9jbGlwYm9hcmRDb250YWluZXJcIjtcclxuXHRjbGlwYm9hcmRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImFnZV9wYW5lbENvbnRhaW5lclwiLCBcImNvbGxhcHNlZFwiKTtcclxuXHJcblxyXG5cclxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjb3B5JywgY29weUV2ZW50KVxyXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2N1dCcsIGN1dEV2ZW50KVxyXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Bhc3RlJywgcGFzdGVFdmVudClcclxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5ZG93bkFjdGl2ZUV4dGVuc2lvbilcclxuXHJcblxyXG5cdGZldGNoZXIuZmV0Y2hIdG1sKFwiY2xpcGJvYXJkLmh0bWxcIilcclxuXHRcdC50aGVuKGh0bWwgPT4ge1xyXG5cdFx0XHRjbGlwYm9hcmRDb250YWluZXIuaW5uZXJIVE1MID0gaHRtbDtcclxuXHJcblxyXG5cdFx0XHRjbGlwYm9hcmRJbm5lciA9IGNsaXBib2FyZENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiI2FnZV9jbGlwYm9hcmRJbm5lclwiKTtcclxuXHRcdFx0Y2xpcGJvYXJkQ29kZUNoZWNrYm94ID0gY2xpcGJvYXJkQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX2NsaXBib2FyZENvZGVDaGVja2JveFwiKTtcclxuXHRcdFx0Y2xpcGJvYXJkVGV4dFR5cGVJbnB1dCA9IGNsaXBib2FyZENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiI2FnZV9jbGlwYm9hcmRUZXh0VHlwZUlucHV0XCIpO1xyXG5cdFx0XHRjbGlwYm9hcmRDb25jYXRDb250ZW50cyA9IGNsaXBib2FyZENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiI2FnZV9jbGlwYm9hcmRDb25jYXRDb250ZW50XCIpO1xyXG5cdFx0fSlcclxuXHJcblx0Y2xpcGJvYXJkQ3NzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdGNsaXBib2FyZENzcy5pZCA9IFwiYWdlX2NsaXBib2FyZFN0eWxlXCI7XHJcblx0ZmV0Y2hlci5mZXRjaENzcyhcImNsaXBib2FyZC5jc3NcIilcclxuXHRcdC50aGVuKGNzcyA9PiB7XHJcblx0XHRcdGNsaXBib2FyZENzcy5pbm5lclRleHQgPSBjc3M7XHJcblx0XHR9KVxyXG5cclxuXHQvLyBjb25zb2xlLmxvZyhcInNpZGVQYW5lbC5pZCA9IFwiLCBzaWRlUGFuZWwuaWQpXHJcblxyXG5cdHNpZGVQYW5lbC5hcHBlbmQoY2xpcGJvYXJkQ29udGFpbmVyKTtcclxuXHJcbiBcclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcbi8qIFxyXG5cclxuXHRDTElQQk9BUkQgRlVOQ1RJT05TXHJcblxyXG4qL1xyXG5cclxuXHJcbmZ1bmN0aW9uIHdyaXRlVGV4dENvbmNhdGVuYXRpb25Db250ZW50VG9Eb20oKSB7XHJcblxyXG5cdGxldCBjbGlwYm9hcmRTdHJpbmcgPSB0ZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnQ7XHJcblx0bGV0IGNsaXBib2FyZElubmVySHRtbCA9ICc8ZGl2PicgKyBjbGlwYm9hcmRTdHJpbmcucmVwbGFjZSgvXFxuL2csICc8YnI+JykgKyAnPC9kaXY+JztcclxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdlX2NsaXBib2FyZENvbmNhdENvbnRlbnQnKS5pbm5lckhUTUwgPSBjbGlwYm9hcmRJbm5lckh0bWw7XHJcblxyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIHN0YXJ0Q2xpcGJvYXJkVGV4dENvbmNhdGVuYXRpb24oKSB7XHJcblxyXG5cdHRleHRDb25jYXRlbmF0aW9uQ2FwdHVyaW5nID0gdHJ1ZTtcclxuXHQvLyBleHRlbnNpb25TdGF0ZUZyb250LnRleHRDb25jYXRlbmF0aW9uQ29udGVudCA9ICcnO1xyXG5cdC8vIHdyaXRlVGV4dENvbmNhdGVuYXRpb25Db250ZW50VG9Eb20oKTtcclxuXHQvL3dyaXRlU3RhdGVGcm9tRnJvbnQoKTtcclxuXHQvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdlX2NsaXBib2FyZENvbnRhaW5lcicpLmNsYXNzTGlzdC5yZW1vdmUoJ2FnZV9kaXNwbGF5Tm9uZScpO1xyXG5cdGNsaXBib2FyZElubmVyLmNsYXNzTGlzdC5hZGQoJ2FnZV9hY3RpdmVDbGlwYm9hcmQnKTtcclxuXHRjb25zb2xlLmxvZygnc3RhcnQgdGV4dCBjb25jYXRlbnRhdGlvbiBjYXB0dXJlJyk7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTcGFjZUNoYXJhY3RlclRvQ2FwdHVyZUNvbmNhdGVuYXRpb25Db250ZW50cygpIHtcclxuXHRjb25zb2xlLmxvZygnYWRkZWQgbmV3IHNwYWNlJylcclxuXHRpZiAodGV4dENvbmNhdGVuYXRpb25DYXB0dXJpbmcpIHtcclxuXHRcdHRleHRDb25jYXRlbmF0aW9uQ29udGVudCArPSAnICc7XHJcblx0XHQvL3dyaXRlU3RhdGVGcm9tRnJvbnQoKTtcclxuXHR9XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGROZXdMaW5lVG9DYXB0dXJlQ29uY2F0ZW5hdGlvbkNvbnRlbnRzKCkge1xyXG5cdGNvbnNvbGUubG9nKCdhZGRlZCBuZXcgbGluZScpXHJcblx0aWYgKHRleHRDb25jYXRlbmF0aW9uQ2FwdHVyaW5nKSB7XHJcblx0XHR0ZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnQgKz0gJ1xcbic7XHJcblx0XHQvL3dyaXRlU3RhdGVGcm9tRnJvbnQoKTtcclxuXHR9XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBzdG9wQ2xpcGJvYXJkVGV4dENvbmNhdGVuYXRpb24oKSB7XHJcblxyXG5cclxuXHJcblx0dGV4dENvbmNhdGVuYXRpb25DYXB0dXJpbmcgPSBmYWxzZTtcclxuXHR0ZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnQgPSAnJztcclxuXHR3cml0ZVRleHRDb25jYXRlbmF0aW9uQ29udGVudFRvRG9tKCk7XHJcblx0Y2xpcGJvYXJkSW5uZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWdlX2FjdGl2ZUNsaXBib2FyZCcpO1xyXG5cdC8vd3JpdGVTdGF0ZUZyb21Gcm9udCgpO1xyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4vKiBcclxuXHJcblx0Q0xJUEJPQVJEIEVWRU5UU1xyXG5cclxuKi9cclxuXHJcbi8vIGZ1bmN0aW9uIHRvZ2dsZVNlbGVjdENvZGUoKSB7XHJcbi8vIFx0aWYgKGNsaXBib2FyZENvZGVDaGVja2JveC5jaGVja2VkKSB7XHJcbi8vIFx0XHRjbGlwYm9hcmRUZXh0VHlwZUlucHV0LmRpc2FibGVkID0gZmFsc2U7XHJcbi8vIFx0fVxyXG4vLyBcdGVsc2Uge1xyXG4vLyBcdFx0Y2xpcGJvYXJkVGV4dFR5cGVJbnB1dC5kaXNhYmxlZCA9IHRydWU7XHJcbi8vIFx0fVxyXG5cclxuLy8gfVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gcGFzdGVFdmVudChldmVudCA6IENsaXBib2FyZEV2ZW50KSB7XHJcblx0Ly8gY29uc29sZS5sb2coJ3Bhc3RlcGFzdGUnKVxyXG5cdGNvbnNvbGUubG9nKCdQQVNURSBFVkVOVCcpXHJcblx0Ly8gY29uc29sZS5sb2coZXZlbnQuY2xpcGJvYXJkRGF0YS5maWxlc1swXSlcclxuXHJcblxyXG5cdGxldCBhY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcclxuXHRpZiAoYWN0aXZlRWxlbWVudC5pc0NvbnRlbnRFZGl0YWJsZSkge1xyXG5cdFx0Ly8gY29uc29sZS5sb2coXCJDb250ZW50RWRpdGFibGUuIE5vIG5ldyBzaGFyZCFcIilcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cclxuXHRsZXQgY2xpcGJvYXJkQ29udGVudFR5cGUgPSBkZXRlcm1pbmVDbGlwYm9hcmRDb250ZW50VHlwZShldmVudC5jbGlwYm9hcmREYXRhKTtcclxuXHJcblxyXG5cdGlmIChjbGlwYm9hcmRDb250ZW50VHlwZSA9PT0gJ3RleHQnKSB7XHJcblx0XHRjb25zb2xlLmxvZygnZGVhbCB3aXRoIHRleHQnKTsgXHJcblxyXG5cdFx0bGV0IGNsaXBib2FyZFRleHQgPSAoZXZlbnQuY2xpcGJvYXJkRGF0YSAvKiB8fCB3aW5kb3cuY2xpcGJvYXJkRGF0YSAqLykuZ2V0RGF0YShcInRleHRcIik7XHJcblx0XHRjb25zb2xlLmxvZygnY2xpcGJvYXJkVGV4dCA9ICcsIGNsaXBib2FyZFRleHQpO1xyXG5cdFx0XHJcblxyXG5cdFx0aWYgKHRleHRDb25jYXRlbmF0aW9uQ2FwdHVyaW5nKSB7XHJcblxyXG5cdFx0XHR0ZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnQgKz0gY2xpcGJvYXJkVGV4dDtcclxuXHJcblx0XHRcdHdyaXRlVGV4dENvbmNhdGVuYXRpb25Db250ZW50VG9Eb20oKVxyXG5cclxuXHRcdFx0Ly93cml0ZVN0YXRlRnJvbUZyb250KCk7XHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKGV4dGVuc2lvblN0YXRlRnJvbnQudGV4dENvbmNhdGVuYXRpb25Db250ZW50KTtcclxuXHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Y29uc29sZS5sb2coJ1BBU1RFIFRPIE5FVyBTSEFSRCcpXHJcblxyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhjbGlwYm9hcmRDb2RlQ2hlY2tib3guY2hlY2tlZClcclxuXHJcblx0XHRcdGlmIChjbGlwYm9hcmRDb2RlQ2hlY2tib3guY2hlY2tlZCkge1xyXG5cdFx0XHRcdHBvc3ROZXdDb2RlT2JqZWN0VG9DdXJyZW50U291cmNlQW5kRnVsbFJlbG9hZE9mU291cmNlQ2hpbGRyZW4oY2xpcGJvYXJkVGV4dFR5cGVJbnB1dC52YWx1ZSwgY2xpcGJvYXJkVGV4dClcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRwb3N0TmV3VGV4dE5vZGVUb0N1cnJlbnRTb3VyY2VBbmRGdWxsUmVsb2FkT2ZTb3VyY2VDaGlsZHJlbihjbGlwYm9hcmRUZXh0VHlwZUlucHV0LnZhbHVlLCBjbGlwYm9hcmRUZXh0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvLyBpZiAoc2hhcmRjYXJkLmNvbnRlbnRFZGl0YWJsZSA9PT0gJ3RydWUnKSB7XHJcblx0XHQvLyBcdGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiaW5zZXJ0SFRNTFwiLCBmYWxzZSwgY2xpcGJvYXJkVGV4dCk7XHJcblx0XHQvLyBcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHQvLyB9XHJcblx0XHQvLyBlbHNlIGlmIChzaGFyZE9iamVjdC50ZXh0Q29udGVudCA9PSAnJyAmJiBzaGFyZE9iamVjdC5maWxlTmFtZSA9PSAnJykge1xyXG5cdFx0Ly8gXHRpbnNlcnRTaGFyZGNhcmRUZXh0Q29udGVudChzaGFyZGNhcmQsIGNsaXBib2FyZFRleHQpO1xyXG5cdFx0Ly8gXHQvL3NoYXJkY2FyZC5zaGFyZC5lbGVtZW50VHlwZSA9ICd0ZXh0JztcclxuXHRcdC8vIFx0dXBkYXRlU2hhcmRjYXJkVGV4dENvbnRlbnQoc2hhcmRjYXJkKTtcclxuXHRcdC8vIH1cclxuXHRcdC8vIGVsc2Uge1xyXG5cdFx0Ly8gXHRjb25zb2xlLmxvZygnVGhpcyBzb3VyY2UgYWxyZWFkeSBoYXMgY29udGVudC4gUmV0dXJuaW5nLicpO1xyXG5cclxuXHRcdC8vIH1cclxuXHJcblxyXG5cclxuXHR9XHJcblx0ZWxzZSBpZiAoY2xpcGJvYXJkQ29udGVudFR5cGUgPT09ICdmaWxlJykge1xyXG5cdFx0Y29uc29sZS5sb2coJ2RlYWwgd2l0aCBmaWxlJylcclxuXHJcblx0XHRsZXQgbmV3RmlsZSA9IGV2ZW50LmNsaXBib2FyZERhdGEuZmlsZXNbMF07XHJcblxyXG5cdFx0bGV0IGZpbGVDYXRlZ29yeU9iamVjdCA9IGRldGVybWluZUZpbGVDYXRlZ29yaWVzKG5ld0ZpbGUpO1xyXG5cdFx0Y29uc29sZS5sb2coJ2ZpbGVDYXRlZ29yeU9iamVjdDogJywgZmlsZUNhdGVnb3J5T2JqZWN0KVxyXG5cclxuXHRcdGlmIChmaWxlQ2F0ZWdvcnlPYmplY3QuZmlsZVR5cGUgPT09ICd0eXBldHlwZScpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcignRklMRSBFWFRFTlNJT04gSEFEIE5PIE1BVENISU5HIENPTlRFTlQgVFlQRScpXHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcG9zdEZpbGVRdWVyeVBhcmFtZXRlcnMgPSB7XHJcblx0XHRcdFR5cGU6IGZpbGVDYXRlZ29yeU9iamVjdC5maWxlVHlwZSxcclxuXHRcdFx0VGl0bGU6IFwiXCIsXHJcblx0XHRcdEV4dGVuc2lvbjogZmlsZUNhdGVnb3J5T2JqZWN0LmZpbGVFeHRlbnNpb24sXHJcblx0XHRcdElBbUF1dGhvcjogMCxcclxuXHRcdH1cclxuXHJcblx0XHRwb3N0TmV3RmlsZVRvQ3VycmVudFNvdXJjZUFuZEZ1bGxSZWxvYWRPZlNvdXJjZUNoaWxkcmVuKG5ld0ZpbGUsIHBvc3RGaWxlUXVlcnlQYXJhbWV0ZXJzLCBmaWxlQ2F0ZWdvcnlPYmplY3QubWltZVR5cGUpO1xyXG5cclxuXHRcdC8vIGNvbnNvbGUubG9nKG5ld0ZpbGUpXHJcblxyXG5cdFx0Ly8gY29uc29sZS5sb2coYXdhaXQgYWdlX2RiaXNXZS5maWxlR2V0KDEyMTYyNzI3OTM2MCkpO1xyXG5cclxuXHRcdC8vIGxldCBzb3VyY2VpZCA9IGV4dHJhY3RDdXJyZW50U291cmNlSWQoKTtcclxuXHJcblx0XHQvLyBpZiAoc2hhcmRPYmplY3QuZmlsZU5hbWUgPT0gJycgJiYgc2hhcmRPYmplY3QudGV4dENvbnRlbnQgPT0gJycpIHtcclxuXHRcdC8vIFx0cG9zdEZpbGUoZXZlbnQuY2xpcGJvYXJkRGF0YS5maWxlc1swXSwgc291cmNlaWQsIHNoYXJkaWQpO1xyXG5cdFx0Ly8gXHRjb25zb2xlLmxvZygnbm9ub25vJylcclxuXHRcdC8vIH1cclxuXHRcdC8vIGVsc2Uge1xyXG5cdFx0Ly8gXHRjb25zb2xlLmxvZygnVGhpcyBzb3VyY2UgYWxyZWFkeSBoYXMgY29udGVudC4gUmV0dXJuaW5nLicpO1xyXG5cdFx0Ly8gfVxyXG5cclxuXHJcblxyXG5cdH1cclxuXHJcblxyXG5cclxufVxyXG4vLyBjb25zdCBwYXNwYXMgPSBuZXcgQ2xpcGJvYXJkRXZlbnQoJ3Bhc3RlJyk7XHJcbi8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQocGFzcGFzKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBjb3B5RXZlbnQoZXZlbnQgOiBDbGlwYm9hcmRFdmVudCkge1xyXG5cclxuXHQvLyBjb25zb2xlLmxvZygnY29wY29wJylcclxuXHQvLyBjb25zb2xlLmxvZyhldmVudC5jbGlwYm9hcmREYXRhIClcclxuXHQvLyBsZXQgY2JkID0gZXZlbnQuY2xpcGJvYXJkRGF0YSB8fCB3aW5kb3cuY2xpcGJvYXJkRGF0YVxyXG5cdC8vIGxldCBjb3BpZWREYXRhID0gY2JkLmdldERhdGEoJ1RleHQnKTtcclxuXHQvLyBjb25zb2xlLmxvZygnY29waWVkRGF0YScsIGNvcGllZERhdGEpXHJcblxyXG5cdC8vIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSgge1xyXG5cdC8vIFx0Y29tbWFuZDogXCJjb3B5Y29weVwiXHJcblx0Ly8gfSk7XHJcblxyXG5cdGNvbnNvbGUubG9nKCdDT1BZRVZFTlQnKVxyXG5cclxuXHJcblx0Ly8gbmF2aWdhdG9yLmNsaXBib2FyZFxyXG5cdC8vIFx0LnJlYWQoKVxyXG5cdC8vIFx0LnRoZW4oXHJcblx0Ly8gXHRcdChjbGlwVGV4dCkgPT4gKGNvbnNvbGUubG9nKGNsaXBUZXh0KSksXHJcblx0Ly8gXHQpO1xyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gY3V0RXZlbnQoZXZlbnQgOiBLZXlib2FyZEV2ZW50KSB7XHJcblx0Y29uc29sZS5sb2coJ0NVVCBFVkVOVCcpXHJcbn1cclxuXHJcblxyXG5cclxuLyogXHJcblxyXG5cdEhFTFBFUiBGVU5DVElPTlNcclxuXHJcbiovXHJcblxyXG5cclxuXHJcblxyXG5sZXQgZGV0ZXJtaW5lQ2xpcGJvYXJkQ29udGVudFR5cGUgPSBmdW5jdGlvbiAoZXZlbnRDbGlwYm9hcmREYXRhIDogYW55KSB7XHJcblxyXG5cdGlmICh0eXBlb2YgZXZlbnRDbGlwYm9hcmREYXRhLmZpbGVzWzBdICE9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0Ly8gcG9zdEZpbGUoZGF0YUNsaXBib2FyZEV2ZW50LmZpbGVzWzBdLCBzb3VyY2VpZCwgc2hhcmRpZCk7XHJcblx0XHRyZXR1cm4gJ2ZpbGUnO1xyXG5cdH1cclxuXHRlbHNlIGlmICgoZXZlbnRDbGlwYm9hcmREYXRhIC8qIHx8IHdpbmRvdy5jbGlwYm9hcmREYXRhICovKS5nZXREYXRhKFwidGV4dFwiKSAhPT0gJycpIHtcclxuXHRcdC8vY29uc29sZS5sb2coKGV2ZW50LmNsaXBib2FyZERhdGEgfHwgd2luZG93LmNsaXBib2FyZERhdGEpLmdldERhdGEoXCJ0ZXh0XCIpKTtcclxuXHJcblx0XHRsZXQgY2xpcGJvYXJkVGV4dCA9IChldmVudENsaXBib2FyZERhdGEgLyogfHwgd2luZG93LmNsaXBib2FyZERhdGEgKi8pLmdldERhdGEoXCJ0ZXh0XCIpO1xyXG5cdFx0bGV0IGJsb2IgPSBuZXcgQmxvYihbY2xpcGJvYXJkVGV4dF0sIHsgdHlwZTogJ3RleHQvcGxhaW4nIH0pO1xyXG5cdFx0bGV0IGZpbGUgPSBuZXcgRmlsZShbYmxvYl0sIFwiY2xpcGJvYXJkLnR4dFwiLCB7IHR5cGU6IFwidGV4dC9wbGFpblwiIH0pO1xyXG5cclxuXHRcdC8vcG9zdEZpbGUoZmlsZSwgc291cmNlaWQsIHNoYXJkaWQpO1xyXG5cdFx0cmV0dXJuICd0ZXh0JztcclxuXHR9XHJcblx0ZWxzZSB7XHJcblx0XHRjb25zb2xlLmxvZygnTm8gZmlsZSBub3IgdGV4dCBkZXRlY3RlZC4nKTtcclxuXHRcdHJldHVybiAnZW1wdHknO1xyXG5cdH1cclxuXHJcblx0Ly9yZXR1cm4gJ2NsaXBib2FyZENvbnRlbnRUeXBlJztcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbmxldCBleHRlbnNpb25PYmplY3QgOiBhbnkgPSB7XHJcblx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvTWVkaWEvRm9ybWF0cy9JbWFnZV90eXBlc1xyXG5cdGltYWdlOiBbJ2FwbmcnLCAnYXZpZicsICdnaWYnLCAnYm1wJywgJ2pwZycsICdqcGVnJywgJ2pmaWYnLCAncGpwZWcnLCAncGpwJywgJ3BuZycsICdzdmcnLCAnd2VicCddLFxyXG5cdC8vIGh0dHBzOi8vd3d3LmNhbnRvLmNvbS9ibG9nL2F1ZGlvLWZpbGUtdHlwZXMvXHJcblx0YXVkaW86IFsnbTRhJywgJ2ZsYWMnLCAnbXAzJywgJ3dhdicsICd3bWEnLCAnYWFjJ10sXHJcblx0Ly8gaHR0cHM6Ly93d3cuYWRvYmUuY29tL2NyZWF0aXZlY2xvdWQvdmlkZW8vZGlzY292ZXIvYmVzdC12aWRlby1mb3JtYXQuaHRtbFxyXG5cdHZpZGVvOiBbJ21wNCcsICdtb3YnLCAnd212JywgJ2F2aScsICdBVkNIRCcsICdmbHYnLCAnZjR2JywgJ3N3ZicsICdta3YnLCAnd2VibScsICdtcGcnXSxcclxuXHRwZGY6IFsncGRmJ10sXHJcblx0ZGF0YTogWydqc29uJywgJ2NzdicsICd0c3YnLCAnZGInLCAneGxzeCcsICdvZHMnLCAnb2RiJ10sXHJcblx0Ly8gVGV4dGFyZWEgZXh0ZW5zaW9uXHJcblx0dGV4dDogWyd0eHQnLCAnbWQnXSxcclxuXHRjb2RlOiBbJ2pzJywgJ3RzJywgJ2NzcycsICdodG1sJywgJ2NzJ10sXHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gZGV0ZXJtaW5lRmlsZUNhdGVnb3JpZXMoc2VsZWN0ZWRGaWxlIDogYW55KSA6IGFueSB7XHJcblxyXG5cdGxldCBzZWxlY3RlZEZpbGVUeXBlOiBzdHJpbmcgPSBzZWxlY3RlZEZpbGUudHlwZTtcclxuXHRsZXQgZmlsZUNhdGVnb3JpZXMgPSB7XHJcblx0XHRtaW1lVHlwZTogc2VsZWN0ZWRGaWxlVHlwZSxcclxuXHRcdGJhc2VGaWxlTmFtZTogJ2Jhc2VuYW1lJyxcclxuXHRcdGZpbGVFeHRlbnNpb246ICdleHRleHQnLFxyXG5cdFx0ZmlsZVR5cGU6ICd0eXBldHlwZSdcclxuXHR9XHJcblxyXG5cclxuXHJcblx0ZmlsZUNhdGVnb3JpZXMuZmlsZUV4dGVuc2lvbiA9IGRldGVybWluZUZpbGVFeHRlbnNpb24oc2VsZWN0ZWRGaWxlKTtcclxuXHRmaWxlQ2F0ZWdvcmllcy5iYXNlRmlsZU5hbWUgPSBkZXRlcm1pbmVCYXNlRmlsZU5hbWUoc2VsZWN0ZWRGaWxlKTtcclxuXHJcblx0Ly8gZmlsZUNhdGVnb3JpZXMuZmlsZVR5cGUgPSBkZXRlcm1pbmVGaWxlVHlwZShmaWxlQ2F0ZWdvcmllcy5taW1lVHlwZSwgZmlsZUNhdGVnb3JpZXMuZmlsZUVuZGluZyk7XHJcblxyXG5cdC8vIGZpbGVDYXRlZ29yaWVzLmZpbGVUeXBlID0gT2JqZWN0LmVudHJpZXMoZXh0ZW5zaW9uT2JqZWN0KS5mb3JFYWNoKHR5cGVBcnJheSA9PiB0eXBlQXJyYXkuZmlsdGVyKGV4dGVuc2lvbiA9PiBleHRlbnNpb24gPT09IGZpbGVDYXRlZ29yaWVzLmZpbGVFeHRlbnNpb24pKVxyXG5cdGZpbGVDYXRlZ29yaWVzLmZpbGVUeXBlID0gT2JqZWN0LmtleXMoZXh0ZW5zaW9uT2JqZWN0KS5maW5kKHR5cGUgPT4gZXh0ZW5zaW9uT2JqZWN0W3R5cGVdLmluY2x1ZGVzKGZpbGVDYXRlZ29yaWVzLmZpbGVFeHRlbnNpb24pKTtcclxuXHQvLyBjb25zb2xlLmxvZyhmaWxlQ2F0ZWdvcmllcy5maWxlVHlwZSlcclxuXHQvL2NvbnNvbGUubG9nKCdmaWxlIHR5cGUgZGV0ZXJtaW5lZCBoZXJlIScpO1xyXG5cdC8vIGlmIChmaWxlQ2F0ZWdvcmllcy5maWxlRXh0ZW5zaW9uID09PSAnZGInKSB7XHJcblx0Ly8gXHQvLyBodHRwOi8vZmlsZWZvcm1hdHMuYXJjaGl2ZXRlYW0ub3JnL3dpa2kvREJfKFNRTGl0ZSlcclxuXHQvLyBcdGZpbGVDYXRlZ29yaWVzLm1pbWVUeXBlID0gJ2FwcGxpY2F0aW9uL3ZuZC5zcWxpdGUzJztcclxuXHQvLyB9XHJcblx0Y29uc29sZS5sb2coZmlsZUNhdGVnb3JpZXMubWltZVR5cGUpXHJcblx0aWYgKGZpbGVDYXRlZ29yaWVzLm1pbWVUeXBlID09ICcnKSB7XHJcblx0XHQvLyBmaWxlQ2F0ZWdvcmllcy5taW1lVHlwZSA9PSAnYXBwbGljYXRpb24vc3RyZWFtJztcclxuXHRcdGZpbGVDYXRlZ29yaWVzLm1pbWVUeXBlID0gJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSc7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gZmlsZUNhdGVnb3JpZXM7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGRldGVybWluZUZpbGVFeHRlbnNpb24oc2VsZWN0ZWRGaWxlIDogRmlsZSkge1xyXG5cclxuXHRyZXR1cm4gc2VsZWN0ZWRGaWxlLm5hbWUubWF0Y2goL1xcdyskL2cpWzBdO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gZGV0ZXJtaW5lQmFzZUZpbGVOYW1lKHNlbGVjdGVkRmlsZTogRmlsZSkge1xyXG5cclxuXHRyZXR1cm4gc2VsZWN0ZWRGaWxlLm5hbWUubWF0Y2goL14uKig/PVxcLlteLl0rJCkvKVswXTtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qIFxyXG5cclxuXHRDTElQQk9BUkQgRkVUQ0hcclxuXHJcbiovXHJcblxyXG5cclxuYXN5bmMgZnVuY3Rpb24gcG9zdE5ld1RleHROb2RlVG9DdXJyZW50U291cmNlQW5kRnVsbFJlbG9hZE9mU291cmNlQ2hpbGRyZW4odGV4dFR5cGUgOiBzdHJpbmcsIFRleHRDb250ZW50IDogc3RyaW5nKSB7XHJcblxyXG5cdGxldCBzb3VyY2VPYmplY3Q6IGFueSA9IHNvdXJjZS5nZXRDdXJyZW50U291cmNlT2JqZWN0KCk7XHJcblx0aWYoc291cmNlT2JqZWN0ID09IHVuZGVmaW5lZCl7XHJcblx0XHRjb25zb2xlLndhcm4oXCJVbmFibGUgdG8gcG9zdCBuZXcgdGV4dCBvYmplY3QuIE5vIHNlbGVjdGVkIHNvdXJjZU9iamVjdC5cIilcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0XHJcblx0Ly8gbGV0IHNvdXJjZVV1aWQgPSBzb3VyY2VPYmplY3QuVXVpZDtcclxuXHQvLyBsZXQgc291cmNlVXVpZCA9IHNvdXJjZS5nZXRDdXJyZW50U291cmNlVXVpZCgpO1xyXG5cclxuXHQvLyBsZXQgc291cmNlT2JqZWN0OiBhbnkgPSBzb3VyY2UuY3VycmVudFNvdXJjZU9iamVjdDtcclxuXHRsZXQgc291cmNlVXVpZCA9IHNvdXJjZU9iamVjdC5VdWlkO1xyXG5cclxuXHQvLyBjb25zb2xlLmxvZygncG9zdE5ld1RleHROb2RlVG9DdXJyZW50U291cmNlQW5kRnVsbFJlbG9hZE9mU291cmNlQ2hpbGRyZW4oKScpO1xyXG5cdC8vIGNvbnNvbGUubG9nKCdzb3VyY2VVdWlkID0gJywgc291cmNlVXVpZCk7XHJcblx0XHJcblx0XHJcblxyXG5cdC8vIENvbnRlbnRfSW5zZXJ0Q2hpbGRVdWlkVGFibGUoVXVpZCwgY2hpbGRUYWJsZSlcclxuXHRpZiAoc291cmNlVXVpZCAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG5cdFx0Ly8gbGV0IG5ld1RleHRPYmplY3QgPSAoYXdhaXQgYWdlX2RiaXNXZS5Db250ZW50X0luc2VydENoaWxkVXVpZFRhYmxlKGV4dGVuc2lvblN0YXRlRnJvbnQuY3VycmVudF9zb3VyY2VPYmplY3QuVXVpZCwgJ1RleHQnKSkuQ29udGVudDtcclxuXHRcdGxldCBuZXdUZXh0Q29udGVudE9iamVjdCA9IChhd2FpdCBhZ2VfZGJpcy5Db250ZW50RWRnZV9JbnNlcnRBZGphY2VudFRvVXVpZEludG9UYWJsZShzb3VyY2VVdWlkLCAxLCAnVGV4dCcsICcnLCAnJywgJy8nKSkuY29udGVudDtcclxuXHJcblx0XHQvLyBjb25zb2xlLmxvZyhuZXdUZXh0T2JqZWN0KVxyXG5cclxuXHRcdG5ld1RleHRDb250ZW50T2JqZWN0LlRpdGxlID0gVGV4dENvbnRlbnQuc3Vic3RyaW5nKDAsIDI1KTtcclxuXHRcdG5ld1RleHRDb250ZW50T2JqZWN0LlRleHRDb250ZW50ID0gVGV4dENvbnRlbnQ7XHJcblx0XHRuZXdUZXh0Q29udGVudE9iamVjdC5UeXBlID0gdGV4dFR5cGU7XHJcblxyXG5cclxuXHRcdGF3YWl0IGFnZV9kYmlzLkNvbnRlbnRfVXBkYXRlV2l0aENvbnRlbnRPYmplY3QobmV3VGV4dENvbnRlbnRPYmplY3QpO1xyXG5cdFx0XHJcblx0XHQvLyBUT0RPIFxyXG5cdFx0Ly8gVVBEQVRFIFNPVVJDRSBQQU5FTCB4MyBcclxuXHRcdC8vIGF3YWl0IGZldGNoQ3VycmVudFNvdXJjZUNoaWxkcmVuVGhlbldyaXRlVG9TdGF0ZXMoKTtcclxuXHRcdC8vIHBvcHVsYXRlU291cmNlQ2hpbGRUYWJsZUZyb21TdGF0ZSgpO1xyXG5cdFx0YXdhaXQgc291cmNlLmxvYWRXaXRoQ29udGVudE9iamVjdChzb3VyY2VPYmplY3QpO1xyXG5cdFx0c291cmNlLmZvY3VzT25MYXN0Q2hpbGRSb3dUaXRsZSgpO1xyXG5cclxuXHRcdC8vIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0Ly8gfSwgMTAwKTtcclxuXHJcblx0fVxyXG5cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gcG9zdE5ld0NvZGVPYmplY3RUb0N1cnJlbnRTb3VyY2VBbmRGdWxsUmVsb2FkT2ZTb3VyY2VDaGlsZHJlbihUeXBlOiBzdHJpbmcsIENvZGVDb250ZW50OiBzdHJpbmcpIHtcclxuXHJcblx0bGV0IHNvdXJjZU9iamVjdDogYW55ID0gc291cmNlLmdldEN1cnJlbnRTb3VyY2VPYmplY3QoKTtcclxuXHRsZXQgc291cmNlVXVpZCA9IHNvdXJjZU9iamVjdC5VdWlkO1xyXG5cclxuXHRpZiAoc291cmNlT2JqZWN0ID09IHVuZGVmaW5lZCkge1xyXG5cdFx0Y29uc29sZS53YXJuKFwiVW5hYmxlIHRvIHBvc3QgbmV3IGNvZGUgb2JqZWN0LiBObyBzZWxlY3RlZCBzb3VyY2VPYmplY3QuXCIpXHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHQvLyBDb250ZW50X0luc2VydENoaWxkVXVpZFRhYmxlKFV1aWQsIGNoaWxkVGFibGUpXHJcblx0aWYgKHNvdXJjZVV1aWQgIT09IHVuZGVmaW5lZCkge1xyXG5cclxuXHRcdC8vIGxldCBuZXdDb2RlT2JqZWN0ID0gKGF3YWl0IGFnZV9kYmlzV2UuQ29udGVudF9JbnNlcnRDaGlsZFV1aWRUYWJsZShleHRlbnNpb25TdGF0ZUZyb250LmN1cnJlbnRfc291cmNlT2JqZWN0LlV1aWQsICdDb2RlJykpLkNvbnRlbnQ7XHJcblx0XHRsZXQgbmV3Q29kZUNvbnRlbnRPYmplY3QgPSAoYXdhaXQgYWdlX2RiaXMuQ29udGVudEVkZ2VfSW5zZXJ0QWRqYWNlbnRUb1V1aWRJbnRvVGFibGUoc291cmNlVXVpZCwgMSwgJ0NvZGUnLCAnJywgJycsICcvJykpLmNvbnRlbnQ7XHJcblxyXG5cdFx0Ly8gY29uc29sZS5sb2cobmV3VGV4dE9iamVjdClcclxuXHJcblx0XHRuZXdDb2RlQ29udGVudE9iamVjdC5UaXRsZSA9IENvZGVDb250ZW50LnN1YnN0cmluZygwLCAyNSk7XHJcblx0XHRuZXdDb2RlQ29udGVudE9iamVjdC5UeXBlID0gVHlwZTtcclxuXHRcdG5ld0NvZGVDb250ZW50T2JqZWN0LkNvZGVDb250ZW50ID0gQ29kZUNvbnRlbnQ7XHJcblxyXG5cclxuXHRcdGF3YWl0IGFnZV9kYmlzLkNvbnRlbnRfVXBkYXRlV2l0aENvbnRlbnRPYmplY3QobmV3Q29kZUNvbnRlbnRPYmplY3QpO1xyXG5cclxuXHJcblx0XHRhd2FpdCBzb3VyY2UubG9hZFdpdGhDb250ZW50T2JqZWN0KHNvdXJjZU9iamVjdCk7XHJcblx0XHRzb3VyY2UuZm9jdXNPbkxhc3RDaGlsZFJvd1RpdGxlKCk7XHJcblx0fVxyXG5cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gcG9zdE5ld0ZpbGVUb0N1cnJlbnRTb3VyY2VBbmRGdWxsUmVsb2FkT2ZTb3VyY2VDaGlsZHJlbihmaWxlIDogRmlsZSAsIHF1ZXJ5UGFyYW1zIDogYW55ICwgbWltZVR5cGUgOiBzdHJpbmcpIHtcclxuXHJcblx0bGV0IHNvdXJjZU9iamVjdDogYW55ID0gc291cmNlLmdldEN1cnJlbnRTb3VyY2VPYmplY3QoKTtcclxuXHRsZXQgc291cmNlVXVpZCA9IHNvdXJjZU9iamVjdC5VdWlkO1xyXG5cclxuXHRpZiAoc291cmNlT2JqZWN0ID09IHVuZGVmaW5lZCkge1xyXG5cdFx0Y29uc29sZS53YXJuKFwiVW5hYmxlIHRvIHBvc3QgbmV3IGZpbGUuIE5vIHNlbGVjdGVkIHNvdXJjZU9iamVjdC5cIilcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdC8vIGNvbnNvbGUubG9nKHNvdXJjZVV1aWQpXHJcblxyXG5cdC8vIENvbnRlbnRfSW5zZXJ0Q2hpbGRVdWlkVGFibGUoVXVpZCwgY2hpbGRUYWJsZSlcclxuXHRpZiAoc291cmNlVXVpZCAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG5cdFx0Ly8gbGV0IG5ld0ZpbGVPYmplY3QgPSAoYXdhaXQgYWdlX2RiaXNXZS5Db250ZW50X0luc2VydENoaWxkVXVpZFRhYmxlKHNvdXJjZVV1aWQsICdGaWxlJykpLkNvbnRlbnQ7XHJcblx0XHRsZXQgbmV3RmlsZUNvbnRlbnRPYmplY3QgPSAoYXdhaXQgYWdlX2RiaXMuQ29udGVudEVkZ2VfSW5zZXJ0QWRqYWNlbnRUb1V1aWRJbnRvVGFibGUoc291cmNlVXVpZCwgMSwgJ0ZpbGUnLCAnJywgJycsICcvJykpLmNvbnRlbnQ7XHJcblxyXG5cdFx0Ly8gY29uc29sZS5sb2cobmV3VGV4dE9iamVjdClcclxuXHJcblx0XHQvLyBuZXdGaWxlT2JqZWN0LlRpdGxlID0gQ29kZUNvbnRlbnQuc3Vic3RyaW5nKDAsIDI1KTtcclxuXHRcdC8vIG5ld0ZpbGVPYmplY3QuVHlwZSA9IFR5cGU7XHJcblx0XHQvLyBuZXdGaWxlT2JqZWN0LkNvZGVDb250ZW50ID0gQ29kZUNvbnRlbnQ7XHJcblxyXG5cclxuXHRcdC8vIGF3YWl0IGFnZV9kYmlzV2UuQ29udGVudF9VcGRhdGVPbkNvbnRlbnRPYmplY3QobmV3RmlsZU9iamVjdCk7XHJcblx0XHQvLyBhd2FpdCBhZ2VfZGJpc1dlLmZpbGVQb3N0KG5ld0ZpbGVDb250ZW50T2JqZWN0LlV1aWQsIGZpbGUsIHF1ZXJ5UGFyYW1zLCBtaW1lVHlwZSk7XHJcblx0XHRhd2FpdCBhZ2VfZGJpcy5Qb3N0X0ZpbGUobmV3RmlsZUNvbnRlbnRPYmplY3QuVXVpZCwgZmlsZSwgcXVlcnlQYXJhbXMsIG1pbWVUeXBlKTtcclxuXHJcblxyXG5cdFx0Ly8gVE9ETyBVUERBVEUgVVNJTkcgTkVXIFNUUlVDVFVSRVxyXG5cdFx0Ly8gYXdhaXQgZmV0Y2hDdXJyZW50U291cmNlQ2hpbGRyZW5UaGVuV3JpdGVUb1N0YXRlcygpO1xyXG5cdFx0Ly8gcG9wdWxhdGVTb3VyY2VDaGlsZFRhYmxlRnJvbVN0YXRlKCk7XHJcblx0XHRhd2FpdCBzb3VyY2UubG9hZFdpdGhDb250ZW50T2JqZWN0KHNvdXJjZU9iamVjdCk7XHJcblx0XHRzb3VyY2UuZm9jdXNPbkxhc3RDaGlsZFJvd1RpdGxlKCk7XHJcblxyXG5cdFx0Ly8gRm9jdXMgbGFzdCByb3cgdGl0bGUgZm9yIGVhc3kgZWRpdGluZyFcclxuXHRcdC8vIGxldCBfdGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdlX3NvdXJjZUNoaWxkVGFibGUtdGJvZHknKTtcclxuXHRcdC8qIF90Ym9keS5sYXN0RWxlbWVudENoaWxkLmxhc3RFbGVtZW50Q2hpbGQuZm9jdXMoKTsgKi9cclxuXHJcblx0fVxyXG5cdGVsc2Uge1xyXG5cdFx0Y29uc29sZS5sb2coJ05vIHNsZWN0ZWQgc291cmNlLiBDb3VsZG5cInQgUE9TVCBmaWxlLicpXHJcblx0fVxyXG5cclxufVxyXG5cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGtleWRvd25BY3RpdmVFeHRlbnNpb24oa2V5RXZlbnQgOiBLZXlib2FyZEV2ZW50KSB7XHJcblxyXG5cdGxldCBhY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcclxuXHJcblx0aWYgKGFjdGl2ZUVsZW1lbnQuaXNDb250ZW50RWRpdGFibGUpIHtcclxuXHRcdC8vIGNvbnNvbGUubG9nKCdFRElUQUJMRScpXHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHRpZiAoa2V5RXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xyXG5cdFx0c3RvcENsaXBib2FyZFRleHRDb25jYXRlbmF0aW9uKCk7XHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9jbGlwYm9hcmRDb250YWluZXJcIikuY2xhc3NMaXN0LmFkZChcImNvbGxhcHNlZFwiKTtcclxuXHR9XHJcblxyXG5cclxuXHQvLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZlbnQpID0+IHsgY29uc29sZS5sb2coZXZlbnQuY29kZSkgfSkgXHJcblx0aWYgKGtleUV2ZW50LmFsdEtleSkge1xyXG5cclxuXHRcdC8vIFN3aXRjaGVkIHRvIC5jb2RlIHRvIGVuYWJsZSBleHRlbnNpb24gb24gc3dlZGlzaCBrZXlib2FyZFxyXG5cdFx0c3dpdGNoIChrZXlFdmVudC5jb2RlKSB7XHJcblx0XHRcdGNhc2UgXCJLZXlQXCI6IC8vICdwJyA9IHByaW50cyB0aGUgY3VycmVudCBwcm9qZWN0IG9iamVjdFxyXG5cdFx0XHRcdC8vIE5PVCBXT1JLSU5HIFlFVCEgVU5BQkxFIFRPIEdFVCBUSEUgVFlQSU5HIENPUlJFQ1RcclxuXHJcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coXCJ0ZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnQgPSBcIiwgdGV4dENvbmNhdGVuYXRpb25Db250ZW50KTtcclxuXHRcdFx0XHQvLyBsZXQgcHJvamVjdE9iamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3Byb2plY3RQcm9wZXJ0aWVzVGFibGVcIik7XHJcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coJ3Byb2plY3RPYmplY3QgPSAnLCBwcm9qZWN0T2JqZWN0KTtcclxuXHJcblx0XHRcdFx0XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwiS2V5UlwiOiAvLyAncicgPSByZWZyZXNoIHByb2plY3QgZGF0YVxyXG5cdFx0XHRcdHByb2plY3QucmVsb2FkQ3VycmVudFByb2plY3QoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJLZXlOXCI6IC8vICduJyA9IG5ldyBzb3VyY2VcclxuXHRcdFx0XHRwcm9qZWN0Lmluc2VydE5ld1NvdXJjZVRvQWN0aXZlUHJvamVjdCgpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcIktleU1cIjogLy8gJ20nID0gbW92ZVxyXG5cdFx0XHRcdHByb2plY3QudG9nZ2xlRXh0ZW5zaW9uTG9jYXRpb24oKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJTbGFzaFwiOiAvLyAnLycgPSBnbyB0byBzZWFyY2hcclxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0U2VhcmNoQnV0dG9uXCIpLmNsaWNrKClcclxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0U2VhcmNoSW5wdXRcIikuZm9jdXMoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJLZXlYXCI6IC8vICd4JyA9IHRvZ2dsZSB0ZXh0L2NvZGVcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZygnQWx0ICsgeCcpXHJcblx0XHRcdFx0bGV0IGNoZWNrZWQgPSBjbGlwYm9hcmRDb2RlQ2hlY2tib3guY2hlY2tlZDtcclxuXHRcdFx0XHRpZiAoY2hlY2tlZCkge1xyXG5cdFx0XHRcdFx0Y2xpcGJvYXJkQ29kZUNoZWNrYm94LmNoZWNrZWQgPSBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRjbGlwYm9hcmRDb2RlQ2hlY2tib3guY2hlY2tlZCA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRvZ2dsZVNlbGVjdENvZGUoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJCcmFja2V0TGVmdFwiOiAvLyAnWycgPSBzdGFydCB0ZXh0IGNhcHR1cmluZ1xyXG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKCdBbHQgKyBbJylcclxuXHRcdFx0XHRzdGFydENsaXBib2FyZFRleHRDb25jYXRlbmF0aW9uKCk7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfY2xpcGJvYXJkQ29udGFpbmVyXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xsYXBzZWRcIik7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiBcclxuXHRcdFx0Y2FzZSBcIkVudGVyXCI6IC8vICdFbnRlcicgPSBhZGQgbmV3IGxpbmVcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZygnQWx0ICsgRW50ZXInKVxyXG5cdFx0XHRcdGFkZE5ld0xpbmVUb0NhcHR1cmVDb25jYXRlbmF0aW9uQ29udGVudHMoKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcIk1pbnVzXCI6IC8vICctJyA9IGFkZCBuZXcgc3BhY2VcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZygnQWx0ICsgRW50ZXInKVxyXG5cdFx0XHRcdGFkZFNwYWNlQ2hhcmFjdGVyVG9DYXB0dXJlQ29uY2F0ZW5hdGlvbkNvbnRlbnRzKCk7IFxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcIkJyYWNrZXRSaWdodFwiOiAvLyAnXScgPSBzdG9wIGNvbmFjdGVuYXRpbmcgYW5kIHNlbmQgdG8gYmFja2VuZFxyXG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKCdBbHQgKyBdJylcclxuXHJcblx0XHRcdFx0aWYgKGNsaXBib2FyZENvZGVDaGVja2JveC5jaGVja2VkKSB7XHJcblx0XHRcdFx0XHRhd2FpdCBwb3N0TmV3Q29kZU9iamVjdFRvQ3VycmVudFNvdXJjZUFuZEZ1bGxSZWxvYWRPZlNvdXJjZUNoaWxkcmVuKGNsaXBib2FyZFRleHRUeXBlSW5wdXQudmFsdWUsIHRleHRDb25jYXRlbmF0aW9uQ29udGVudClcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRhd2FpdCBwb3N0TmV3VGV4dE5vZGVUb0N1cnJlbnRTb3VyY2VBbmRGdWxsUmVsb2FkT2ZTb3VyY2VDaGlsZHJlbihjbGlwYm9hcmRUZXh0VHlwZUlucHV0LnZhbHVlLCB0ZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnQpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfY2xpcGJvYXJkQ29udGFpbmVyXCIpLmNsYXNzTGlzdC5hZGQoXCJjb2xsYXBzZWRcIik7IFxyXG5cdFx0XHRcdHN0b3BDbGlwYm9hcmRUZXh0Q29uY2F0ZW5hdGlvbigpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblx0aWYgKGtleUV2ZW50LmN0cmxLZXkpIHtcclxuXHJcblx0XHRzd2l0Y2ggKGtleUV2ZW50LmtleSkge1xyXG5cdFx0XHRjYXNlICdgJzpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnQ3RybCArIGAnKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICcvJzpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnQ3RybCArIC8nKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICcuJzpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnQ3RybCArIC4nKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICcsJzpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnQ3RybCArICwnKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdcXFxcJzpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnQ3RybCArIFxcXFwnKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdcXCcnOlxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdDdHJsICsgXFwnJylcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgJzsnOlxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdDdHJsICsgOycpXHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlICdbJzpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnQ3RybCArIFsnKVxyXG5cclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgJ10nOlxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdDdHJsICsgXScpXHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlU2VsZWN0Q29kZSgpIHtcclxuXHRpZiAoY2xpcGJvYXJkQ29kZUNoZWNrYm94LmNoZWNrZWQpIHtcclxuXHRcdGNsaXBib2FyZFRleHRUeXBlSW5wdXQuZGlzYWJsZWQgPSBmYWxzZTtcclxuXHR9XHJcblx0ZWxzZSB7XHJcblx0XHRjbGlwYm9hcmRUZXh0VHlwZUlucHV0LmRpc2FibGVkID0gdHJ1ZTtcclxuXHR9XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi8vIFRoZSBBbm51bmNpYXRpb24gaXMgYW4gb2lsIHBhaW50aW5nIGJ5IHRoZSBFYXJseSBOZXRoZXJsYW5kaXNoIHBhaW50ZXIgSGFucyBNZW1saW5nLkl0IGRlcGljdHMgdGhlIEFubnVuY2lhdGlvbiwgdGhlIGFyY2hhbmdlbCBHYWJyaWVsJ3MgYW5ub3VuY2VtZW50IHRvIHRoZSBWaXJnaW4gTWFyeSB0aGF0IHNoZSB3b3VsZCBjb25jZWl2ZSBhbmQgYmVjb21lIHRoZSBtb3RoZXIgb2YgSmVzdXMsIGRlc2NyaWJlZCBpbiB0aGUgR29zcGVsIG9mIEx1a2UuIFxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ3NzKCk6IHZvaWQge1xyXG5cdGRvY3VtZW50LmhlYWQuYXBwZW5kKGNsaXBib2FyZENzcyk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQ3NzKCk6IHZvaWQge1xyXG5cdGNsaXBib2FyZENzcy5yZW1vdmUoKTtcclxufSIsIlxuXG4vLyBsZXQgYWdlX2FwaVVybCA9ICdodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL3YwMic7XG5sZXQgYWdlX2FwaVVybCA9IFwiXCI7XG5cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIHRlc3QoKSA6IHZvaWQge1xuXG4vLyBcdGNvbnNvbGUubG9nKFwiTG9hZGVkIGRiaS1zZW5kLnRzXCIpXG5cdFxuLy8gfVxuXG4vLyBBTFdBWVMgU1RBUlQgT1VUIEJZIEdSQUJCSU5HIFRIRSBBUEkgQkFTRSBVUkxcbigoKT0+e1xuXHRcblx0c2V0QXBpVXJsKCkudGhlbigoKSA9PiB7XG5cdFx0Y29uc29sZS5sb2coJ0xvYWRlZCBkYmktc2VuZC50cycpO1xuXHR9KTtcblx0XG59KSgpO1xuXG4vKipcbiAqIFx0R3JhYnMgdGhlIGJhc2UgdXJsIHN0cmluZyBmcm9tIHRoZSBsb2NhbCB3ZWJleHRlbnNpb24gc3RvcmFnZS4gXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRBcGlVcmwoKXtcblx0YnJvd3Nlci5zdG9yYWdlLmxvY2FsLmdldChcImFwaUJhc2VTdHJpbmdcIikudGhlbigob2JqZWN0KSA9PiB7XG5cdFx0YWdlX2FwaVVybCA9IG9iamVjdC5hcGlCYXNlU3RyaW5nO1xuXHRcdGNvbnNvbGUubG9nKFwiTG9hZGVkIEFQSSBCQVNFIFNUUklOR1wiKVxuXHRcdGNvbnNvbGUubG9nKFwib2JqZWN0LmFwaUJhc2VTdHJpbmcgPSBcIiwgb2JqZWN0LmFwaUJhc2VTdHJpbmcpO1xuXHR9LCBvbkxvY2FsU3RvcmFnZUVycm9yKTtcbn1cbmZ1bmN0aW9uIG9uTG9jYWxTdG9yYWdlRXJyb3IoZXJyb3I6IEVycm9yKSB7XG5cdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xufVxuXG5cblxuYnJvd3Nlci5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigocmVxdWVzdCkgOiBQcm9taXNlPGFueT4gPT4ge1xuXHRjb25zb2xlLmxvZyhcIk1lc3NhZ2UgcmVjaWV2ZWQgaW4gZGJpLXNlbmQudHMhXCIpO1xuXG5cdGlmIChyZXF1ZXN0Lm5hbWUgPT09IFwic2V0QXBpQmFzZVwiKSB7XG5cdFx0Ly8gY29uc29sZS5sb2coXCIxMTExXCIpXG5cdFx0YWdlX2FwaVVybCA9IHJlcXVlc3QuYXBpQmFzZVN0cmluZztcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgcmVzcG9uc2U6IFwiQXBpIHVwZGF0ZWQgaW4gY29udGVudCBzY3JpcHQuIFtkYmktc2VuZC5qc11cIiwgbmV3QXBpU3RyaW5nOiBhZ2VfYXBpVXJsIH0pO1xuXG5cdH1cblxuXG5cdGlmIChyZXF1ZXN0Lm5hbWUgPT09IFwiZ2V0QXBpQmFzZVwiKSB7XG5cdFx0Ly8gY29uc29sZS5sb2coXCIyMjIyXCIpXG5cdFx0XG5cdFx0Ly8gUHJvbWlzZS5yZXNvbHZlIDogc3RhdGljIG1ldGhvZCB0aGF0IHJldHVybnMgYSByZXNvbHZlZCBQcm9taXNlIG9iamVjdCB3aXRoIHRoZSBnaXZlbiB2YWx1ZVxuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoeyBhcGlTdHJpbmc6IGFnZV9hcGlVcmwgfSk7XG5cblx0fVxuXG59KTtcblxuY2xhc3MgYWdlX2RiaXMge1xuXG5cdC8qIFxuXHRcdENPTlRFTlRcblx0Ki9cblxuXHRzdGF0aWMgYXN5bmMgQ29udGVudF9JbnNlcnRPblRhYmxlKFRhYmxlTmFtZSA6IHN0cmluZykge1xuXHRcdGNvbnN0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnQvQ29udGVudC1JbnNlcnRPblRhYmxlP1RhYmxlPSR7VGFibGVOYW1lfWA7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ1BPU1QnXG5cdFx0fTtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblx0c3RhdGljIGFzeW5jIENvbnRlbnRfU2VsZWN0T25VdWlkKFV1aWQgOiBzdHJpbmcgfCBudW1iZXIpIHtcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudC9Db250ZW50LVNlbGVjdE9uVXVpZD9VdWlkPSR7VXVpZH1gO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cdHN0YXRpYyBhc3luYyBDb250ZW50X1VwZGF0ZVdpdGhDb250ZW50T2JqZWN0KGNvbnRlbnRPYmplY3QgOiBhbnkpIHtcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudC9Db250ZW50LVVwZGF0ZVdpdGhDb250ZW50T2JqZWN0YDtcblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnUFVUJyxcblx0XHRcdGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsIH0sXG5cdFx0XHRib2R5OiBKU09OLnN0cmluZ2lmeShjb250ZW50T2JqZWN0KSxcblx0XHR9O1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiRmV0Y2ggcmV0dXJuZWQgXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIiBmcm9tIFwiICsgdXJsKTtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXHRzdGF0aWMgYXN5bmMgQ29udGVudF9Ecm9wRnVsbE9uVXVpZChVdWlkIDogc3RyaW5nIHwgbnVtYmVyKSB7XG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnQvQ29udGVudC1Ecm9wRnVsbE9uVXVpZD9VdWlkPSR7VXVpZH1gO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdERUxFVEUnLFxuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cdHN0YXRpYyBhc3luYyBDb250ZW50X1NlbGVjdE9uVGl0bGVMaWtlU3RyaW5nKHNlYXJjaFN0cmluZzogc3RyaW5nLCB0YWJsZUxpbWl0OiBzdHJpbmcsIGluY2x1ZGVUYWJsZTogc3RyaW5nLCBvcmRlckNvbHVtbjogc3RyaW5nLCBkZXNjOiBzdHJpbmcpIDogUHJvbWlzZTxhbnk+IHtcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudC9Db250ZW50LVNlbGVjdE9uVGl0bGVMaWtlU3RyaW5nP3NlYXJjaFN0cmluZz0ke3NlYXJjaFN0cmluZ30mdGFibGVMaW1pdD0ke3RhYmxlTGltaXR9JmluY2x1ZGVUYWJsZT0ke2luY2x1ZGVUYWJsZX0mb3JkZXJDb2x1bW49JHtvcmRlckNvbHVtbn0mZGVzYz0ke2Rlc2N9YDtcblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnR0VUJyxcblx0XHR9O1xuXG5cdFx0XG5cdFx0dHJ5IHtcblx0XHRcdGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXHRzdGF0aWMgYXN5bmMgUmV2aWV3X0luc2VydFNjaGVkdWxlT25VdWlkKFV1aWQgOiBzdHJpbmcgfCBudW1iZXIsIHNjaGVkdWxlVHlwZSA6IHN0cmluZ3wgbnVtYmVyKSB7XG5cdFx0Y29uc3QgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudC9SZXZpZXctSW5zZXJ0U2NoZWR1bGVPblV1aWQ/VXVpZD0ke1V1aWR9JnNjaGVkdWxlVHlwZT0ke3NjaGVkdWxlVHlwZX1gO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdQT1NUJ1xuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cdHN0YXRpYyBhc3luYyBSZXZpZXdfU2VsZWN0Q3VycmVudFJldmlldygpIHtcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudC9SZXZpZXctU2VsZWN0Q3VycmVudFJldmlld2A7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0fTtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxuXG5cblxuXG5cdC8qIFxuXHRcdFx0Q09OVEVOVCBFREdFXG5cdCovXG5cdHN0YXRpYyBhc3luYyBDb250ZW50RWRnZV9JbnNlcnRBZGphY2VudFRvVXVpZEludG9UYWJsZShVdWlkOiBzdHJpbmcgfCBudW1iZXIsIERpcmVjdGVkOiBzdHJpbmcgfCBudW1iZXIsIFRhYmxlOiBzdHJpbmcsIFR5cGU6IHN0cmluZywgT3JkZXI6IHN0cmluZyB8IG51bWJlciwgUGF0aDogc3RyaW5nKSB7XG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnRlZGdlL0NvbnRlbnRFZGdlLUluc2VydEFkamFjZW50VG9VdWlkSW50b1RhYmxlP1V1aWQ9JHtVdWlkfSZEaXJlY3RlZD0ke0RpcmVjdGVkfSZUYWJsZT0ke1RhYmxlfSZUeXBlPSR7VHlwZX0mT3JkZXI9JHtPcmRlcn0mUGF0aD0ke1BhdGh9YDtcblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0fTtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblx0c3RhdGljIGFzeW5jIENvbnRlbnRFZGdlX1NlbGVjdENoaWxkT2ZVdWlkKFV1aWQgOiBzdHJpbmcgfCBudW1iZXIpIHtcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudGVkZ2UvQ29udGVudEVkZ2UtU2VsZWN0Q2hpbGRPZlV1aWQ/VXVpZD0ke1V1aWR9YDtcblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnR0VUJyxcblx0XHR9O1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiRmV0Y2ggcmV0dXJuZWQgXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIiBmcm9tIFwiICsgdXJsKTtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGFzeW5jIENvbnRlbnRFZGdlX1NlbGVjdFBhcmVudE9mVXVpZChVdWlkIDogc3RyaW5nIHwgbnVtYmVyKSB7XG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnRlZGdlL0NvbnRlbnRFZGdlLVNlbGVjdFBhcmVudE9mVXVpZD9VdWlkPSR7VXVpZH1gO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cdHN0YXRpYyBhc3luYyBDb250ZW50RWRnZV9TZWxlY3RVbmRpcmVjdGVkT2ZVdWlkKFV1aWQgOiBzdHJpbmcgfCBudW1iZXIpIHtcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudGVkZ2UvQ29udGVudEVkZ2UtU2VsZWN0VW5kaXJlY3RlZE9mVXVpZD9VdWlkPSR7VXVpZH1gO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cdHN0YXRpYyBhc3luYyBDb250ZW50RWRnZV9TZWxlY3RBZGphY2VudE9mVXVpZChVdWlkIDogc3RyaW5nIHwgbnVtYmVyKSB7XG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnRlZGdlL0NvbnRlbnRFZGdlLVNlbGVjdEFkamFjZW50T2ZVdWlkP1V1aWQ9JHtVdWlkfWA7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0fTtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxuXG5cblxuXHQvKiBcblx0XHRcdFx0RklMRVNcblx0Ki9cblxuXHRzdGF0aWMgYXN5bmMgUG9zdF9GaWxlKFV1aWQ6IHN0cmluZyB8IG51bWJlciwgZmlsZTogRmlsZSwgcXVlcnlQYXJhbXM6IHN0cmluZywgbWltZVR5cGU6IHN0cmluZykge1xuXG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2ZpbGUvJHtVdWlkfT9gO1xuXHRcdC8vIGNvbnNvbGUubG9nKHVybClcblxuXG5cdFx0Zm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMocXVlcnlQYXJhbXMpKSB7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhgJHtrZXl9OiAke3ZhbHVlfWApO1xuXHRcdFx0dXJsICs9IGAke2tleX09JHt2YWx1ZX0mYDtcblx0XHRcdC8vIGJvZHlBcnJheS5wdXNoKHZhbHVlKTtcblx0XHR9XG5cdFx0dXJsID0gdXJsLnNsaWNlKDAsIC0xKTtcblxuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XCJDb250ZW50LVR5cGVcIjogbWltZVR5cGUsXG5cdFx0XHR9LFxuXHRcdFx0Ym9keTogZmlsZSxcblx0XHR9O1xuXHRcdC8vIGNvbnNvbGUubG9nKG9wdGlvbnMpXG5cdFx0Ly8gY29uc29sZS5sb2codXJsKVxuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdHJldHVybiBkYXRhO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignRkFJTEVEIFBPU1QgRlJPTTogUG9zdF9GaWxlIGluIGRiaXMnKVxuXHRcdFx0fVxuXHRcdFx0Ly8gY29uc29sZS50YWJsZShkYXRhKTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Ly8gY29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxuXG5cblx0c3RhdGljIGFzeW5jIEdldF9GaWxlKFV1aWQ6IHN0cmluZyB8IG51bWJlcik6IFByb21pc2U8RmlsZSB8IGFueVtdPiB7XG5cblx0XHRjb25zdCB1cmwgPSBhZ2VfYXBpVXJsICsgYC9maWxlL2AgKyBVdWlkO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7IG1ldGhvZDogJ0dFVCcgfTtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHQvLyBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gY29uc29sZS5sb2cocmVzcG9uc2UuYm9keSkgXG5cdFx0XHRsZXQgYmxvYiA9IGF3YWl0IHJlc3BvbnNlLmJsb2IoKVxuXHRcdFx0bGV0IGNvbnRlbnRUeXBlID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpO1xuXHRcdFx0bGV0IGV4dGVuc2lvbiA9IGNvbnRlbnRUeXBlLnNwbGl0KCcvJylbMV07XG5cdFx0XHQvLyBjb25zb2xlLmxvZygnRklMRUZJTEU6JywgcmVzcG9uc2UuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKVxuXHRcdFx0bGV0IGZpbGUgPSBhd2FpdCBuZXcgRmlsZShbYmxvYl0sIGAke1V1aWR9LiR7ZXh0ZW5zaW9ufWApXG5cdFx0XHRyZXR1cm4gZmlsZTtcblx0XHRcdC8vIC50aGVuKGJsb2IgPT4gbmV3IEZpbGUoW2Jsb2JdLCAndGVzdGZpbGVuYW1lLmZpbGUnKSlcblx0XHRcdC8vIC50aGVuKGZpbGUgPT4gZmlsZSlcblx0XHRcdC8vIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSlcblx0XHRcdC8vIC50aGVuKGZpbGUgPT4gVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKSlcblx0XHRcdC8vIC50aGVuKGZpbGUgPT4gVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKSlcblx0XHRcdC8vIC50aGVuKGZpbGVVcmwgPT4gd2luZG93Lm9wZW4oZmlsZVVybCwgJ19ibGFuaycpKVxuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXG5cblxuXG5cdHN0YXRpYyBhc3luYyBQdXRfRmlsZShVdWlkOiBzdHJpbmcgfCBudW1iZXIsIGZpbGU6IEZpbGUsIHF1ZXJ5UGFyYW1zOiBzdHJpbmcsIG1pbWVUeXBlOiBzdHJpbmcpIHtcblxuXHRcdGxldCB1cmwgPSBhZ2VfYXBpVXJsICsgYC9maWxlLyR7VXVpZH0/YDtcblx0XHQvLyBjb25zb2xlLmxvZyh1cmwpXG5cblxuXHRcdGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHF1ZXJ5UGFyYW1zKSkge1xuXHRcdFx0Ly8gY29uc29sZS5sb2coYCR7a2V5fTogJHt2YWx1ZX1gKTtcblx0XHRcdHVybCArPSBgJHtrZXl9PSR7dmFsdWV9JmA7XG5cdFx0XHQvLyBib2R5QXJyYXkucHVzaCh2YWx1ZSk7XG5cdFx0fVxuXHRcdHVybCA9IHVybC5zbGljZSgwLCAtMSk7XG5cblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFwiQ29udGVudC1UeXBlXCI6IG1pbWVUeXBlLFxuXHRcdFx0fSxcblx0XHRcdGJvZHk6IGZpbGUsXG5cdFx0fTtcblx0XHQvLyBjb25zb2xlLmxvZyhvcHRpb25zKVxuXHRcdC8vIGNvbnNvbGUubG9nKHVybClcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRpZiAocmVzcG9uc2Uub2spIHtcblx0XHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdGQUlMRUQgUFVUIEZST006IFB1dF9GaWxlIGluIGRiaXMnKVxuXHRcdFx0fVxuXHRcdFx0Ly8gY29uc29sZS50YWJsZShkYXRhKTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Ly8gY29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxuXG5cblx0c3RhdGljIGFzeW5jIERlbGV0ZV9GaWxlKFV1aWQgOiBzdHJpbmcgfCBudW1iZXIpIHtcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvZmlsZS8ke1V1aWR9YDtcblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnREVMRVRFJyxcblx0XHR9O1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiRmV0Y2ggcmV0dXJuZWQgXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIiBmcm9tIFwiICsgdXJsKTtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cblxuXG59O1xuXG5leHBvcnQge1xuXHRhZ2VfZGJpcyxcbn0iLCJcbi8vIGltcG9ydCB7IHRlc3QgfSBmcm9tIFwiLi9kYmktc2VuZFwiXG4vLyB0ZXN0KCk7XG5cblxuXG5jb25zdCBodG1sRm9sZGVyID0gJ2h0bWwvJztcbmNvbnN0IGNzc0ZvbGRlciA9ICdjc3MvJztcblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBmZXRjaEh0bWwoZmlsZW5hbWUgOiBzdHJpbmcpIDogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBcbiAgICAgICAgbGV0IHVybCA9IGJyb3dzZXIucnVudGltZS5nZXRVUkwoXG4gICAgICAgICAgICBodG1sRm9sZGVyICsgZmlsZW5hbWVcbiAgICAgICAgKTtcblxuICAgICAgICAvLyB0aGlzIGlzIHRoIGVwcm9taXNlIHRoYXQgd2UgcmV0dXJuIGFuZCBsZXR0aW5nIHRoZSBmZXRjaCBmdW5jdGlvbiBoYW5kbGUgcmVzb2x2aW5nIHRoZSBwcm9taXNlXG4gICAgICAgIHJldHVybiBmZXRjaCh1cmwpXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpXG4gICAgICAgICAgICAudGhlbih0ZXh0ID0+IHRleHQpXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gXCJFcnJvciBpbiAnZmV0Y2hIdG1sJy4gRmlsZTogIGZldGNoZXIudHMgXCIpXG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoQ3NzKGZpbGVuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuXG4gICAgbGV0IHVybCA9IGJyb3dzZXIucnVudGltZS5nZXRVUkwoXG4gICAgICAgIGNzc0ZvbGRlciArIGZpbGVuYW1lXG4gICAgKTtcblxuICAgIC8vIHRoaXMgaXMgdGggZXByb21pc2UgdGhhdCB3ZSByZXR1cm4gYW5kIGxldHRpbmcgdGhlIGZldGNoIGZ1bmN0aW9uIGhhbmRsZSByZXNvbHZpbmcgdGhlIHByb21pc2VcbiAgICByZXR1cm4gZmV0Y2godXJsKVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpXG4gICAgICAgIC50aGVuKHRleHQgPT4gdGV4dClcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IFwiRXJyb3IgaW4gJ2ZldGNoQ3NzJy4gRmlsZTogZmV0Y2hlci50c1wiKVxufVxuXG5cbnR5cGUgVGZldGNoZXIgPSB7XG4gICAgZmV0Y2hIdG1sIDogUHJvbWlzZTxzdHJpbmc+XG59XG5cbmV4cG9ydCB0eXBlIHtcbiAgICBUZmV0Y2hlclxufTtcblxuLy8gZXhwb3J0IHtcbi8vICAgICBmZXRjaEh0bWwgOiBcbi8vIH1cblxuIiwiaW1wb3J0ICogYXMgZmV0Y2hlciBmcm9tIFwiLi9mZXRjaGVyXCI7XG5pbXBvcnQgKiBhcyBwcm9qZWN0cyBmcm9tIFwiLi9wcm9qZWN0cy9wcm9qZWN0c1wiO1xuaW1wb3J0ICogYXMgc291cmNlIGZyb20gXCIuL3NvdXJjZS9zb3VyY2VcIjtcbmltcG9ydCAqIGFzIGNsaXBib2FyZCBmcm9tIFwiLi9jbGlwYm9hcmRcIjtcblxuaW1wb3J0IHsgSFRNTFByb2plY3RDaGlsZFJvdyB9IGZyb20gXCIuL3Byb2plY3RzL3Byb2plY3RfZG9tXCI7XG5cbi8vIGltcG9ydCB7IGFnZV9kYmlzIH0gZnJvbSBcIi4vZGJpLXNlbmRcIjtcblxubGV0IG92ZXJsYXlDb250YWluZXIgOiBFbGVtZW50O1xubGV0IG92ZXJsYXlDc3M6IEhUTUxFbGVtZW50O1xuXG5sZXQgdGFibGVDc3M6IEhUTUxFbGVtZW50O1xuXG4vLyBvdGhlciBjYWNoZWQgZWxlbWVudHNcbmxldCBjb250ZXh0T3ZlcmxheTogRWxlbWVudDtcblxubGV0IHNpZGVQYW5lbDogRWxlbWVudDtcblxuXG5mdW5jdGlvbiBpbml0T3ZlcmxheSgpIDogdm9pZHtcbiAgICBjb25zb2xlLmxvZygnT1ZFUkxBWSBUUyBJTklUJyk7IFxuXG4gICAgb3ZlcmxheUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG92ZXJsYXlDb250YWluZXIuaWQgPSBcImFnZV9vdmVybGF5Q29udGFpbmVyXCI7IFxuICAgIG92ZXJsYXlDb250YWluZXIuc2V0QXR0cmlidXRlKFwic3BlbGxjaGVja1wiLFwiZmFsc2VcIik7XG5cbiAgICBvdmVybGF5Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBleHRlbnNpb25DbGlja0hhbmRsZXIpO1xuICAgIG92ZXJsYXlDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzaW5cIiwgb3ZlcmxheUZvY3VzaW4pO1xuXG4gICAgLy8gUHJldmVudHMga2V5c3Ryb2tlcyBvbiBjZXJ0YWluIHdlYnNpdGVzIGZyb20gcmVnaXN0cmluZyB3aGVuIHdyaXRpbmcgaW4gdGhlIG92ZXJsYXkgLSB0ZXN0ZWQgb24geW91dHViZSBzaG9ydHMgLSBzcGFjZSBub3Qgd29ya2luZyBvbiByZWd1bGFyIHlvdXR1YmVcbiAgICAvLyBNYXliZSBhIGJpdCB0b28gbXVjaCB0byBoYXZlIGxpc3RlbmluZyBhdCBhbGwgdGltZXMhIEJVVCBJIHNpbXBseSBuZWVkIHRoaXMgdG8gd29yayBmb3Igbm93Li5cbiAgICBvdmVybGF5Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGNvbnRlbnRFZGl0YWJsZUtleURldGVjdGlvbiwgZmFsc2UpO1xuICAgIG92ZXJsYXlDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGNvbnRlbnRFZGl0YWJsZUtleURldGVjdGlvbiwgZmFsc2UpO1xuICAgIG92ZXJsYXlDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIGNvbnRlbnRFZGl0YWJsZUtleURldGVjdGlvbiwgZmFsc2UpO1xuICAgIGZ1bmN0aW9uIGNvbnRlbnRFZGl0YWJsZUtleURldGVjdGlvbihrZXlldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBsZXQgYWN0aXZlRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKGFjdGl2ZUVsZW1lbnQuaXNDb250ZW50RWRpdGFibGUpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gZW5hYmxlIG5ldyBsaW5lXG4gICAgICAgICAgICBpZiAoa2V5ZXZlbnQua2V5ID09PSBcIkVudGVyXCIgJiYga2V5ZXZlbnQuc2hpZnRLZXkpe1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBwcmV2ZW50IG5ldyBsaW5lIGFuZCBleGl0IGZpZWxkXG4gICAgICAgICAgICBlbHNlIGlmIChrZXlldmVudC5rZXkgPT09IFwiRW50ZXJcIiB8fCBrZXlldmVudC5rZXkgPT09IFwiRXNjYXBlXCIpe1xuICAgICAgICAgICAgICAgIGtleWV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgKGtleWV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkucGFyZW50RWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBrZXlldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy8gb3ZlcmxheUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgKVxuICAgIFxuXG4gICAgb3ZlcmxheUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibG9hZHNvdXJjZVwiLCAoZXZlbnQgOiBDdXN0b21FdmVudCkgPT4ge1xuICAgICAgICBzb3VyY2UubG9hZFdpdGhDb250ZW50T2JqZWN0KGV2ZW50LmRldGFpbC5jb250ZW50T2JqZWN0KTtcbiAgICB9KTtcbiAgICBvdmVybGF5Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJuZXdzb3VyY2VcIiwgKGV2ZW50OiBDdXN0b21FdmVudCkgPT4ge1xuICAgICAgICBzb3VyY2UubG9hZFdpdGhDb250ZW50T2JqZWN0KGV2ZW50LmRldGFpbC5jb250ZW50T2JqZWN0KTtcbiAgICAgICAgc291cmNlLnNob3dTb3VyY2VQcm9wZXJ0aWVzKCk7IC8vIE1ha2Ugc3VyZSB3ZSBnbyB0byB0aGUgcHJvcGVydGllcyB0YWIgd2hlbiBjcmF0aW5nIGEgbmV3IHNvdXJjZSFcbiAgICB9KTtcblxuICAgIG92ZXJsYXlDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm5ld3Byb2plY3RcIiwgKGV2ZW50OiBDdXN0b21FdmVudCkgPT4ge30pO1xuICAgIG92ZXJsYXlDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInJlZnJlc2hleHRlbnNpb25cIiwgKGV2ZW50OiBDdXN0b21FdmVudCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJlZnJlc2ggZXh0ZW5zaW9uXCIpO1xuICAgICAgICBwcm9qZWN0cy5yZWxvYWRDdXJyZW50UHJvamVjdCgpO1xuICAgIH0pO1xuXG5cbiAgICBmZXRjaGVyLmZldGNoSHRtbChcIm92ZXJsYXkuaHRtbFwiKVxuICAgICAgICAudGhlbihodG1sID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiSFRNTCA6IFwiLCBodG1sKVxuICAgICAgICAgICAgb3ZlcmxheUNvbnRhaW5lci5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgICAgICAgY29udGV4dE92ZXJsYXkgPSBvdmVybGF5Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX2NvbnRleHRPdmVybGF5XCIpO1xuICAgICAgICAgICAgLy8gY29udGV4dE92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhpZGVDb250ZXh0TWVudXMpO1xuICAgICAgICAgICAgc2lkZVBhbmVsID0gb3ZlcmxheUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiI2FnZV9vdmVybGF5UmlnaHRQYW5lbFwiKTtcblxuICAgICAgICAgICAgXG4gICAgICAgICAgICBwcm9qZWN0cy5pbml0UHJvamVjdHMoc2lkZVBhbmVsLCBjb250ZXh0T3ZlcmxheS5xdWVyeVNlbGVjdG9yKFwiI2FnZV9tb3JlUHJvamVjdE9wdGlvbnNDb250ZXh0TWVudVwiKSk7IC8vIFBhc3MgdGhlIGNvbnRleHQgbWVudSFcbiAgICAgICAgICAgIHNvdXJjZS5pbml0U291cmNlQ29udGFpbmVyKHNpZGVQYW5lbCwgY29udGV4dE92ZXJsYXkucXVlcnlTZWxlY3RvcihcIiNhZ2VfbW9yZVNvdXJjZU9wdGlvbnNDb250ZXh0TWVudVwiKSk7IC8vIFBhc3MgdGhlIGNvbnRleHQgbWVudSFcbiAgICAgICAgICAgIGNsaXBib2FyZC5pbml0Q2xpcGJvYXJkKHNpZGVQYW5lbCk7XG4gICAgICAgIH0pXG5cbiAgICBvdmVybGF5Q3NzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgIG92ZXJsYXlDc3MuaWQgPSBcImFnZV9vdmVybGF5U3R5bGVcIjtcbiAgICBmZXRjaGVyLmZldGNoQ3NzKFwib3ZlcmxheS5jc3NcIilcbiAgICAudGhlbihjc3MgPT4ge1xuICAgICAgICBvdmVybGF5Q3NzLmlubmVyVGV4dCA9IGNzcztcbiAgICB9KVxuXG4gICAgdGFibGVDc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gICAgdGFibGVDc3MuaWQgPSBcImFnZV90YWJsZVN0eWxlXCI7XG4gICAgZmV0Y2hlci5mZXRjaENzcyhcInRhYmxlcy5jc3NcIikgXG4gICAgICAgIC50aGVuKGNzcyA9PiB7XG4gICAgICAgICAgICB0YWJsZUNzcy5pbm5lclRleHQgPSBjc3M7XG4gICAgICAgIH0pXG5cbn1cblxuXG4vLyBtYWtlIHN1cmUgdGhhdCBlbXB0eSBlbGVtZW50IGFyZSBwb3B1bGF0ZWQgd2l0aCBkZWZhdWx0IGVkaXRhYmxlIGVsZW1lbnRzXG5mdW5jdGlvbiBvdmVybGF5Rm9jdXNpbihldmVudDogRm9jdXNFdmVudCk6IHZvaWQge1xuICAgIGxldCBldmVudFRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcblxuICAgIGlmIChldmVudFRhcmdldC5pc0NvbnRlbnRFZGl0YWJsZSAmJiBldmVudFRhcmdldC50ZXh0Q29udGVudCA9PSBcIlwiKSB7XG4gICAgICAgIC8vIGV2ZW50VGFyZ2V0LmlubmVySFRNTCA9IFwiPGRpdj48L2Rpdj48YnI+XCI7IC8vIG5vdCB3b3JraW5nLi4gTWF5YmUgaWYgSSBoYXZlIHRleHQgbm90IGNlbnRlcmVkIGluIGVsbWVlbnQuLlxuICAgIH1cbn1cblxuZnVuY3Rpb24gZXh0ZW5zaW9uQ2xpY2tIYW5kbGVyKGV2ZW50IDogTW91c2VFdmVudCl7XG5cbiAgICBsZXQgZXZlbnRUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgLy8gY29uc29sZS5sb2coJ19eX15fXl9eX15fXicsIGV2ZW50VGFyZ2V0LmlkKTtcbiAgICBcbiAgICAvKiBcbiAgICAgICAgTk9URTogVEhJUyBIQVMgQkVFTiBNT1ZFRCBUTyBJVFMgT1dOIEVWRU5UIVxuICAgICovXG4gICAgLy8gaWYgKGV2ZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWdlX3Byb2pjaGlsZFRhYmxlUm93XCIpKXtcbiAgICAvLyAgICAgbGV0IHByb2plY3RDaGlsZFJvdyA9IGV2ZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQgYXMgSFRNTFByb2plY3RDaGlsZFJvdztcbiAgICAvLyAgICAgLy8gY29uc29sZS5sb2coJ0NsaWNrZWQgb24gY2hpbGQgcm93IHdpdGggdXVpZCA9ICcsIHByb2plY3RDaGlsZFJvdy5Db250ZW50RWRnZU9iamVjdC5jb250ZW50LlV1aWQpO1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhcIlRPRE86IExPQUQgQ0xJQ0tFRCBTT1VSQ0VTISBcIiwgcHJvamVjdENoaWxkUm93LkNvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnQpO1xuICAgICAgICBcbiAgICAvLyB9XG59XG5cblxuZnVuY3Rpb24gc2hvd092ZXJsYXkoKSA6IHZvaWR7XG4gICAgZG9jdW1lbnQuYm9keS5sYXN0RWxlbWVudENoaWxkLmFmdGVyKG92ZXJsYXlDb250YWluZXIpO1xuXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmQob3ZlcmxheUNzcyk7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmQodGFibGVDc3MpO1xuICAgIHByb2plY3RzLmFwcGVuZENzcygpO1xuICAgIHNvdXJjZS5hcHBlbmRDc3MoKTtcbiAgICBjbGlwYm9hcmQuYXBwZW5kQ3NzKCk7XG4gICAgLy8gZmV0Y2hlci5mZXRjaEh0bWwoXCJvdmVybGF5Lmh0bWxcIilcbiAgICAvLyAgICAgLnRoZW4oaHRtbCA9PiBvdmVybGF5Q29udGFpbmVyLmlubmVySHRtbCA9IGh0bWwpXG59XG5cblxuZnVuY3Rpb24gaGlkZU92ZXJsYXkoKSA6IHZvaWQge1xuICAgIG92ZXJsYXlDb250YWluZXIucmVtb3ZlKCk7XG4gICAgb3ZlcmxheUNzcy5yZW1vdmUoKTtcblxuICAgIHRhYmxlQ3NzLnJlbW92ZSgpO1xuXG4gICAgcHJvamVjdHMucmVtb3ZlQ3NzKCk7XG4gICAgc291cmNlLnJlbW92ZUNzcygpO1xuICAgIGNsaXBib2FyZC5yZW1vdmVDc3MoKTtcbn1cblxuXG5cblxuZXhwb3J0IHtcbiAgICBpbml0T3ZlcmxheSxcbiAgICBzaG93T3ZlcmxheSxcbiAgICBoaWRlT3ZlcmxheSxcbn0iLCJcbmltcG9ydCB7IGFnZV9kYmlzIH0gZnJvbSBcIi4uL2RiaS1zZW5kXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSFRNTFByb2plY3RUYWJsZVJvdyBleHRlbmRzIEhUTUxUYWJsZVJvd0VsZW1lbnQge1xuICAgIG5vZGVPYmplY3Q6IGFueTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSFRNTFRhYmxlQ29udGVudE9iamVjdCBleHRlbmRzIEhUTUxUYWJsZUVsZW1lbnQge1xuICAgIGNvbnRlbnRPYmplY3Q6IGFueTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSFRNTFByb2plY3RDaGlsZFJvdyBleHRlbmRzIEhUTUxUYWJsZVJvd0VsZW1lbnQge1xuICAgIENvbnRlbnRFZGdlT2JqZWN0OiBhbnk7XG4gICAgaXNQcm9qZWN0Q2hpbGRSb3cgOiBib29sZWFuO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBwb3B1bGF0ZVByb3BlcnRpZXNUYWJsZShwcm9wZXJ0aWVzVGFibGU6IEhUTUxUYWJsZUNvbnRlbnRPYmplY3QsIHByb2plY3RDb250ZW50T2JqZWN0OiBhbnkpIHtcblxuICAgIGNvbnNvbGUubG9nKFwicHJvamVjdENvbnRlbnRPYmplY3QgPSBcIiwgcHJvamVjdENvbnRlbnRPYmplY3QpXG5cbiAgICAvLyBsZXQgcHJvamVjdE9iamVjdCA9IGV4dGVuc2lvblN0YXRlRnJvbnQuY3VycmVudF9wcm9qZWN0T2JqZWN0O1xuICAgIGxldCBwcm9qZWN0T2JqZWN0ID0gcHJvamVjdENvbnRlbnRPYmplY3Q7XG5cbiAgICBwcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdCA9IHByb2plY3RDb250ZW50T2JqZWN0O1xuICAgIC8vIHByb3BlcnRpZXNUYWJsZS5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgcHJvamVjdFByb3BlcnR5Rm9jdXNPdXQpXG5cbiAgICAvLyBleHRlbnNpb25TdGF0ZUZyb250LmN1cnJlbnRfcHJvamVjdFV1aWQgPSBwcm9qZWN0T2JqZWN0LlV1aWQ7XG5cbiAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWEtcHJvamVjdFRpdGxlJykudGV4dENvbnRlbnQgPSBwcm9qZWN0T2JqZWN0LlRpdGxlO1xuXG4gICAgLy8gbGV0IHRib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FnZV9wcm9qZWN0UHJvcGVydGllc1RhYmxlLXRib2R5Jyk7XG4gICAgbGV0IHRib2R5ID0gcHJvcGVydGllc1RhYmxlLnF1ZXJ5U2VsZWN0b3IoXCJ0Ym9keVwiKTtcbiAgICB0Ym9keS5pbm5lckhUTUwgPSAnJztcblxuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gcHJvamVjdE9iamVjdCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHtrZXl9OiAke3Byb2plY3RPYmplY3Rba2V5XX1gKTtcbiAgICAgICAgaWYgKGtleSA9PT0gJ1R5cGUnIHx8IGtleSA9PT0gJ1RpdGxlJyB8fCBrZXkgPT09ICdHb2FsJykge1xuXG4gICAgICAgICAgICB0Ym9keS5pbm5lckhUTUwgKz0gYFxuXHRcdFxuXHRcdFx0PHRyPlxuXHRcdFx0XHQ8dGQgaWQ9YWdlX3Byb2pQcm9wVGFibGUtJHtrZXl9LWtleSBjbGFzcz1cImFnZV9lbGVtZW50XCIgPiR7a2V5fTwvdGQ+XG5cdFx0XHRcdDx0ZCBpZD1hZ2VfcHJvalByb3BUYWJsZS0ke2tleX0tdmFsdWUgY2xhc3M9XCJhZ2VfZWxlbWVudFwiIGNvbnRlbnRlZGl0YWJsZT1cInRydWVcIiA+JHtwcm9qZWN0T2JqZWN0W2tleV19PC90ZD5cblx0XHRcdDwvdHI+XG5cdFx0XG5cdFx0YDtcblxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGJvZHkuaW5uZXJIVE1MICs9IGBcblx0XHRcblx0XHRcdDx0cj5cblx0XHRcdFx0PHRkIGlkPWFnZV9wcm9qUHJvcFRhYmxlLSR7a2V5fS1rZXkgY2xhc3M9XCJhZ2VfZWxlbWVudFwiID4ke2tleX08L3RkPlxuXHRcdFx0XHQ8dGQgaWQ9YWdlX3Byb2pQcm9wVGFibGUtJHtrZXl9LXZhbHVlIGNsYXNzPVwiYWdlX2VsZW1lbnRcIj4ke3Byb2plY3RPYmplY3Rba2V5XX08L3RkPlxuXHRcdFx0PC90cj5cblx0XHRcblx0XHRgO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBsZXQgY2hpbGRyZW4gPSB0Ym9keS5jaGlsZHJlbjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBjaGlsZCA9IGNoaWxkcmVuW2ldIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBjb25zb2xlLmxvZygnY2hpbGQgPSAnLCBjaGlsZCk7XG4gICAgICAgIGNoaWxkLnRhYkluZGV4ID0gMDtcbiAgICB9XG5cbiAgICAvLyBjb25zb2xlLmxvZyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjYWdlX3Byb2plY3RQcm9wZXJ0aWVzVGFibGUgdGJvZHkgdHInKSlcbiAgICAvLyBsZXQgZWRpdGFibGVQcm9qZWN0UHJvcGVydHlUZHM6IE5vZGVMaXN0T2Y8RWxlbWVudD4gPSB0Ym9keS5xdWVyeVNlbGVjdG9yQWxsKCcuYWdlX2VkaXRhYmxlUHJvamVjdFByb3BlcnR5Jyk7XG4gICAgLy8gY29uc29sZS5sb2coZWRpdGFibGVQcm9qZWN0UHJvcGVydHlUZClcblxuICAgIC8vIEFycmF5LmZyb20oZWRpdGFibGVQcm9qZWN0UHJvcGVydHlUZHMpLmZvckVhY2goKGVkaXRhYmxlUHJvcGVydHlFbGVtZW50KSA9PiB7XG4gICAgLy8gICAgIGVkaXRhYmxlUHJvcGVydHlFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgZWRpdGFibGVQcm9qZWN0UHJvcGVydHlGb2N1c091dClcbiAgICAvLyB9KVxuICAgIC8vIGZvciAobGV0IGVkaXRhYmxlUHJvamVjdFByb3BlcnR5VGQgb2YgZWRpdGFibGVQcm9qZWN0UHJvcGVydHlUZHMpIHtcbiAgICAvLyAgICAgLy8gY29uc29sZS5sb2coZWRpdGFibGVQcm9qZWN0UHJvcGVydHlUZC50ZXh0Q29udGVudCk7XG4gICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKHByb3BlcnR5Um93LnRleHRDb250ZW50Lmxlbmd0aClcblxuICAgIC8vICAgICAvLyBlZGl0YWJsZVByb2plY3RQcm9wZXJ0eVRkLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgcmVhZFByb2plY3RQcm9wZXJ0aWVzRnJvbURvbUFuZFdyaXRlUHV0KVxuICAgIC8vICAgICBlZGl0YWJsZVByb2plY3RQcm9wZXJ0eVRkLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgZWRpdGFibGVQcm9qZWN0UHJvcGVydHlGb2N1c091dClcbiAgICAvLyAgICAgLy8gZWRpdGFibGVQcm9qZWN0UHJvcGVydHlUZC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHBvc3RQcm9qZWN0UHJvcGVydGllcylcbiAgICAvLyB9XG5cbn1cblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBwb3B1bGF0ZUNoaWxkcmVuVGFibGUodGFibGUgOiBIVE1MVGFibGVFbGVtZW50LCBwcm9qZWN0Q2hpbGRDb250ZW50RWRnZXMgOiBhbnkpe1xuXG4gICAgLy8gbGV0IHByb2plY3RDaGlsZENvbnRlbnRFZGdlcyA9IGV4dGVuc2lvblN0YXRlRnJvbnQuY3VycmVudF9wcm9qZWN0Q2hpbGRDb250ZW50RWRnZXM7XG5cbiAgICAvLyBleHRlbnNpb25TdGF0ZUZyb250LmN1cnJlbnRfcHJvamVjdFV1aWQgPSBwcm9qZWN0T2JqZWN0LlV1aWQ7XG5cbiAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWEtcHJvamVjdFRpdGxlJykudGV4dENvbnRlbnQgPSBwcm9qZWN0T2JqZWN0LlRpdGxlO1xuXG5cbiAgICBsZXQgdGJvZHkgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKCd0Ym9keScpO1xuXG4gICAgdGJvZHkuaW5uZXJIVE1MID0gJyc7XG5cbiAgICBmb3IgKGNvbnN0IGNvbnRlbnRFZGdlIG9mIHByb2plY3RDaGlsZENvbnRlbnRFZGdlcykge1xuXG4gICAgICAgIGxldCBuZXdQcm9qZWN0Q2hpbGRSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpIGFzIEhUTUxQcm9qZWN0Q2hpbGRSb3c7XG5cbiAgICAgICAgbmV3UHJvamVjdENoaWxkUm93LmlzUHJvamVjdENoaWxkUm93ID0gdHJ1ZTtcbiAgICAgICAgbmV3UHJvamVjdENoaWxkUm93LnRhYkluZGV4ID0gMDtcblxuICAgICAgICAvLyBDdXN0b20gZXZlbnQgdG8gc3BlY2lmaWNhbGx5IGxvYWQgdGhlIHNvdXJjZSBmcm9tIHRoZSBvdmVybGF5LXRzIG1vZHVsZVxuICAgICAgICBuZXdQcm9qZWN0Q2hpbGRSb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCA6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICAvLyBodHRwczovL3d3dy5yZWRkaXQuY29tL3Ivd2ViZGV2L2NvbW1lbnRzL3JoZjJtdS9mcmllbmRseV9yZW1pbmRlcl91c2VfZXZlbnRjdXJyZW50dGFyZ2V0X25vdC9cbiAgICAgICAgICAgIGxldCBlbGVtZW50Q3VycmVudFRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQgYXMgSFRNTFByb2plY3RDaGlsZFJvdztcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZXZlbnQuY3VycmVudFRhcmdldCA9IFwiLCBlbGVtZW50Q3VycmVudFRhcmdldClcbiAgICAgICAgICAgIGxldCBsb2Fkc291cmNlRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoIFwibG9hZHNvdXJjZVwiLCB7IFxuICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7Y29udGVudE9iamVjdDogZWxlbWVudEN1cnJlbnRUYXJnZXQuQ29udGVudEVkZ2VPYmplY3QuY29udGVudH0sXG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBfdGhpcyA9IHRoaXMgYXMgSFRNTFByb2plY3RDaGlsZFJvdztcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX3RoaXMgPSBcIiwgX3RoaXMpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJldmVudC50YXJnZXQgPSBcIiwgZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZWxlbWVudEN1cnJlbnRUYXJnZXQuZGlzcGF0Y2hFdmVudChsb2Fkc291cmNlRXZlbnQpO1xuICAgICAgICAgICAgXG4gICAgICAgICB9KVxuXG4gICAgICAgIG5ld1Byb2plY3RDaGlsZFJvdy5pZCA9IGBhZ2VfcHJvamNoaWxkVGFibGVSb3ctJHtjb250ZW50RWRnZS5jb250ZW50LlV1aWR9YDtcbiAgICAgICAgbmV3UHJvamVjdENoaWxkUm93LmNsYXNzTGlzdC5hZGQoXCJhZ2VfcHJvamNoaWxkVGFibGVSb3dcIik7XG4gICAgICAgIG5ld1Byb2plY3RDaGlsZFJvdy5Db250ZW50RWRnZU9iamVjdCA9IGNvbnRlbnRFZGdlO1xuXG4gICAgICAgIG5ld1Byb2plY3RDaGlsZFJvdy5pbm5lckhUTUwgKz0gYFxuXHRcdFxuXHRcdFx0XHQ8dGQgaWQ9YWdlX3Byb2pjaGlsZFRhYmxlLVRhYmxlLSR7Y29udGVudEVkZ2UuY29udGVudC5VdWlkfSBjbGFzcz1cImFnZV9lbGVtZW50IGFnZV9wcm9qY2hpbGRUYWJsZSBUYWJsZVwiIGRhdGEtVXVpZD0ke2NvbnRlbnRFZGdlLmNvbnRlbnQuVXVpZH0+JHtjb250ZW50RWRnZS5jb250ZW50LlRhYmxlfTwvdGQ+XG5cdFx0XHRcdDx0ZCBpZD1hZ2VfcHJvamNoaWxkVGFibGUtVGl0bGUtJHtjb250ZW50RWRnZS5jb250ZW50LlV1aWR9IGNsYXNzPVwiYWdlX2VsZW1lbnQgYWdlX3Byb2pjaGlsZFRhYmxlIFRpdGxlXCIgZGF0YS1VdWlkPSR7Y29udGVudEVkZ2UuY29udGVudC5VdWlkfT4ke2NvbnRlbnRFZGdlLmNvbnRlbnQuVGl0bGV9PC90ZD5cblx0XHRcdFxuXHRcdGA7XG5cbiAgICAgICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGlkPWFnZV9wcm9qY2hpbGRUYWJsZVJvdy0ke25vZGVFZGdlLlV1aWR9YCk7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGlkPWFnZV9wcm9qY2hpbGRUYWJsZVJvdy0ke25vZGVFZGdlLlV1aWR9YCkpXG5cblxuICAgICAgICAvLyBuZXdQcm9qZWN0Q2hpbGRSb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcm9qZWN0Q2hpbGRSb3dDbGlja2VkKVxuXG4gICAgICAgIHRib2R5LmFwcGVuZENoaWxkKG5ld1Byb2plY3RDaGlsZFJvdylcblxuICAgIH1cblxufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9wdWxhdGVQcm9qZWN0U2VhcmNoVGFibGUocHJvamVjdFNlYXJjaFRhYmxlIDogYW55LCBwcm9qZWN0T2JqZWN0cyA6IGFueSk6IHZvaWQge1xuICAgIC8vIGNvbnNvbGUubG9nKCdQUk9KRUNUIFRCQUxFIFBPUCcpO1xuXG4gICAgLy8gY2hpbGRPYmplY3RzID0gZXh0ZW5zaW9uU3RhdGVGcm9udC5jdXJyZW50X3Byb2plY3RTZWFyY2hPYmplY3RzO1xuXG4gICAgLy8gbGV0IHByb2plY3RUYWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2VfcHJvamVjdFRhYmxlJyk7XG4gICAgLy8gY29uc29sZS5sb2coXCJTU1NTU1NTU1NTU1NTU1NTUyA9IFwiLCBwcm9qZWN0T2JqZWN0cy5sZW5ndGgpXG4gICAgbGV0IHRib2R5ID0gcHJvamVjdFNlYXJjaFRhYmxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0Ym9keScpWzBdXG4gICAgLy8gY29uc29sZS5sb2coXCJ0Ym9keSA9IFwiLCB0Ym9keSk7XG5cbiAgICB0Ym9keS5pbm5lckhUTUwgPSAnJztcblxuICAgIGZvciAobGV0IGNoaWxkT2JqZWN0IG9mIHByb2plY3RPYmplY3RzKSB7XG5cbiAgICAgICAgbGV0IHRhYmxlUm93SHRtbCA9IGBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8dGQgZGF0YS1VdWlkPVwiJHtjaGlsZE9iamVjdC5VdWlkfVwiIGNsYXNzPVwiYWdlX2VsZW1lbnQgYWdlX3Byb2plY3RSb3dTZWFyY2hEYXRhIFRhYmxlXCI+JHtjaGlsZE9iamVjdC5UYWJsZX08L3RoPlxuICAgICAgICAgICAgICAgIDx0ZCBkYXRhLVV1aWQ9XCIke2NoaWxkT2JqZWN0LlV1aWR9XCIgY2xhc3M9XCJhZ2VfZWxlbWVudCBhZ2VfcHJvamVjdFJvd1NlYXJjaERhdGEgVGl0bGVcIj4ke2NoaWxkT2JqZWN0LlRpdGxlfTwvdGQ+XG5cbiAgICAgICAgICAgIGA7XG4gICAgICAgIC8vIGxldCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gICAgICAgIGxldCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykgYXMgSFRNTFByb2plY3RUYWJsZVJvdztcbiAgICAgICAgdHIuaWQgPSAnYWdlX3Byb2plY3RTZWFyY2hSb3ctJyArIGNoaWxkT2JqZWN0LlV1aWQ7XG4gICAgICAgIHRyLmNsYXNzTGlzdC5hZGQoJ2FnZV9wcm9qZWN0U2VhcmNoUm93Jyk7XG4gICAgICAgIC8vIHRyLnNldEF0dHJpYnV0ZShcInRhYkluZGV4XCIpXG4gICAgICAgIHRyLnRhYkluZGV4ID0gMDtcbiAgICAgICAgdHIubm9kZU9iamVjdCA9IGNoaWxkT2JqZWN0O1xuICAgICAgICAvLyB0ci5kYXRhc2V0Lk5vZGUgPSAxO1xuICAgICAgICAvLyB0ci5kYXRhc2V0LlV1aWQgPSBjaGlsZE9iamVjdC5VdWlkO1xuICAgICAgICAvLyB0ci5zZXRBdHRyaWJ1dGUoJ2RhdGEtTm9kZScsICcxJyk7XG4gICAgICAgIHRyLnNldEF0dHJpYnV0ZSgnZGF0YS1VdWlkJywgY2hpbGRPYmplY3QuVXVpZCk7XG4gICAgICAgIC8vIHRyLnRhYkluZGV4ID0gMDtcbiAgICAgICAgdHIuaW5uZXJIVE1MID0gdGFibGVSb3dIdG1sO1xuICAgICAgICAvLyB0ci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrQ2FsbGJhY2spO1xuICAgICAgICAvLyB0ci5jb250ZW50RWRpdGFibGUgPSAnVHJ1ZSc7XG5cbiAgICAgICAgdGJvZHkuYXBwZW5kKHRyKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codHIpXG4gICAgfVxuXG59IiwiaW1wb3J0ICogYXMgZmV0Y2hlciBmcm9tIFwiLi4vZmV0Y2hlclwiO1xuaW1wb3J0ICogYXMgZG9tIGZyb20gXCIuL3Byb2plY3RfZG9tXCI7XG5pbXBvcnQgeyBIVE1MUHJvamVjdFRhYmxlUm93LCBIVE1MVGFibGVDb250ZW50T2JqZWN0IH0gZnJvbSBcIi4vcHJvamVjdF9kb21cIjtcbmltcG9ydCB7YWdlX2RiaXN9IGZyb20gXCIuLi9kYmktc2VuZFwiO1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tIFwiLi4vdXRpbFwiO1xuXG5sZXQgY3VycmVudFByb2plY3RPYmplY3QgOiBhbnkgPSBudWxsO1xuXG5sZXQgc2lkZVBhbmVsIDogRWxlbWVudDtcbmxldCBzaWRlUGFuZWxJc1JpZ2h0IDogYm9vbGVhbiA9IHRydWU7XG5cbmxldCBwcm9qZWN0TW9yZU9wdGlvbnNDb250ZXh0TWVudSA6IEhUTUxEaXZFbGVtZW50O1xuXG5sZXQgcHJvamVjdENvbnRhaW5lciA6IEVsZW1lbnQ7XG5sZXQgcHJvamVjdENzczogSFRNTEVsZW1lbnQ7XG5cbmxldCBwcm9qZWN0TW9yZU9wdGlvbnNCdXR0b24gOiBIVE1MRWxlbWVudDtcbmxldCBwcm9qZWN0TW9yZU9wdGlvbnNNZW51OiBIVE1MRWxlbWVudDtcblxubGV0IHByb2plY3RTZWFyY2hFbGVtZW50IDogSFRNTERpdkVsZW1lbnQ7XG5sZXQgc2VhcmNoU3RyaW5nRXhpc3RzIDogYm9vbGVhbiA9IGZhbHNlO1xuXG5sZXQgcHJvamVjdFNlYXJjaE9iamVjdHM6IGFueTtcbmxldCBwcm9qZWN0U2VhcmNoVGFibGU6IEhUTUxUYWJsZUVsZW1lbnQ7XG5cbmxldCBwcm9qZWN0Q29udGVudEVkZ2VDaGlsZHJlbiA6IGFueTtcbmxldCBwcm9qZWN0Q2hpbGRyZW5UYWJsZSA6IEhUTUxUYWJsZUVsZW1lbnQ7XG5cbmxldCBwcm9qZWN0UHJvcGVydGllc1RhYmxlOiBIVE1MVGFibGVDb250ZW50T2JqZWN0O1xuXG5sZXQgcHJvamVjdFRpdGxlRWxlbWVudCA6IEhUTUxFbGVtZW50O1xuXG5cbi8vIGludGVyZmFjZSBIVE1MVGFibGVSb3dFbGVtZW50IHtcbi8vICAgICBub2RlT2JqZWN0PzogYW55O1xuLy8gfVxuXG4vLyBpbnRlcmZhY2UgSFRNTFByb2plY3RUYWJsZVJvdyBleHRlbmRzIEhUTUxUYWJsZVJvd0VsZW1lbnQge1xuLy8gICAgIG5vZGVPYmplY3Q6IGFueTtcbi8vIH1cblxuXG5mdW5jdGlvbiBpbml0UHJvamVjdHMoX3NpZGVQYW5lbCA6IEVsZW1lbnQsIF9wcm9qZWN0TW9yZU9wdGlvbnNDb250ZXh0TWVudSA6IEhUTUxEaXZFbGVtZW50KSA6IHZvaWR7XG4gICAgY29uc29sZS5sb2coJ09WRVJMQVkgVFMgSU5JVCcpO1xuXG4gICAgc2lkZVBhbmVsID0gX3NpZGVQYW5lbDtcblxuICAgIC8vIE1PUkUgT1BUSU9OUyBDT05URVhUIE1FTlVcbiAgICBwcm9qZWN0TW9yZU9wdGlvbnNDb250ZXh0TWVudSA9IF9wcm9qZWN0TW9yZU9wdGlvbnNDb250ZXh0TWVudTtcbiAgICBwcm9qZWN0TW9yZU9wdGlvbnNDb250ZXh0TWVudS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xpY2tlZFByb2plY3RDb250ZXh0TWVudSlcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoaWRlUHJvamVjdENvbnRleHRNZW51LCB7Y2FwdHVyZTogZmFsc2V9KTtcblxuICAgIHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwcm9qZWN0Q29udGFpbmVyLmlkID0gXCJhZ2VfcHJvamVjdENvbnRhaW5lclwiO1xuICAgIHByb2plY3RDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImFnZV9wYW5lbENvbnRhaW5lclwiKTtcbiAgICBwcm9qZWN0Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwcm9qZWN0Q2xpY2spO1xuICAgIHByb2plY3RDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIHByb2plY3RQcm9wZXJ0eUZvY3VzT3V0KTtcblxuICAgIGZldGNoZXIuZmV0Y2hIdG1sKFwicHJvamVjdHMuaHRtbFwiKVxuICAgICAgICAudGhlbihodG1sID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiSFRNTCA6IFwiLCBodG1sKVxuICAgICAgICAgICAgcHJvamVjdENvbnRhaW5lci5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgICAgICAgcHJvamVjdFRpdGxlRWxlbWVudCA9IHByb2plY3RDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2VfcHJvamVjdFRpdGxlXCIpO1xuICAgICAgICAgICAgcHJvamVjdFNlYXJjaFRhYmxlID0gcHJvamVjdENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwidGFibGVcIik7XG4gICAgICAgICAgICBwcm9qZWN0Q2hpbGRyZW5UYWJsZSA9IHByb2plY3RDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2VfcHJvamVjdENoaWxkcmVuVGFibGVcIik7XG4gICAgICAgICAgICBwcm9qZWN0UHJvcGVydGllc1RhYmxlID0gcHJvamVjdENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiI2FnZV9wcm9qZWN0UHJvcGVydGllc1RhYmxlXCIpO1xuICAgICAgICAgICAgcHJvamVjdFNlYXJjaEVsZW1lbnQgPSBwcm9qZWN0Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX3Byb2plY3RTZWFyY2hJbnB1dFwiKTtcbiAgICAgICAgICAgIHByb2plY3RTZWFyY2hFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c2luXCIsIHNlYXJjaFByb2plY3RJbik7XG4gICAgICAgICAgICBwcm9qZWN0U2VhcmNoRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgc2VhcmNoUHJvamVjdE91dCk7XG5cbiAgICAgICAgICAgIC8vIFRPRE8gOiBncmFiIHRoZSBtb3JlIG9wdGlvbnMgY29udGV4dCBtZW51XG4gICAgICAgICAgICAvLyBwcm9qZWN0TW9yZU9wdGlvbnNNZW51ID0gXG4gICAgICAgICAgICBwcm9qZWN0TW9yZU9wdGlvbnNCdXR0b24gPSBwcm9qZWN0Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX3Byb2plY3RNb3JlT3B0aW9uc1wiKTtcbiAgICAgICAgICAgIGxldCBtb3JlT3B0aW9uc0JhY2tncm91bmRVcmwgPSBicm93c2VyLnJ1bnRpbWUuZ2V0VVJMKFxuICAgICAgICAgICAgICAgIFwicmVzb3VyY2VzL21vcmUtb3B0aW9ucy5wbmdcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGxldCBiYWNrZ3JvdW5kU3RyaW5nID0gYHVybCgke21vcmVPcHRpb25zQmFja2dyb3VuZFVybH0pYDtcbiAgICAgICAgICAgIHByb2plY3RNb3JlT3B0aW9uc0J1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBiYWNrZ3JvdW5kU3RyaW5nO1xuXG4gICAgICAgICAgICAvLyBTZWFyY2ggaWNvblxuICAgICAgICAgICAgbGV0IHNlYXJjaEJhY2tncm91bmRVcmwgPSBicm93c2VyLnJ1bnRpbWUuZ2V0VVJMKFxuICAgICAgICAgICAgICAgIFwicmVzb3VyY2VzL3NlYXJjaC1pY29uLnBuZ1wiXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbGV0IHNlYXJjaEJhY2tncm91bmRTdHJpbmcgPSBgdXJsKCR7c2VhcmNoQmFja2dyb3VuZFVybH0pYDtcbiAgICAgICAgICAgIHByb2plY3RTZWFyY2hFbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IHNlYXJjaEJhY2tncm91bmRTdHJpbmc7XG5cbiAgICAgICAgICAgIGZldGNoUHJvamVjdFNlYXJjaChcIlwiKSAvLyBwZXJmb3JtIHNlYXJjaCBvbmx5IGFmdGVyIGd1YXJhbnRlZWQgbG9hZFxuICAgICAgICAgICAgICAgIC50aGVuKChjb250ZW50T2JqZWN0QXJyYXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coY29udGVudE9iamVjdEFycmF5KVxuICAgICAgICAgICAgICAgICAgICBkb20ucG9wdWxhdGVQcm9qZWN0U2VhcmNoVGFibGUocHJvamVjdFNlYXJjaFRhYmxlLCBwcm9qZWN0U2VhcmNoT2JqZWN0cyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSkgXG4gIFxuICAgIHByb2plY3RDc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gICAgcHJvamVjdENzcy5pZCA9IFwiYWdlX3Byb2plY3RTdHlsZVwiO1xuICAgIGZldGNoZXIuZmV0Y2hDc3MoXCJwcm9qZWN0cy5jc3NcIilcbiAgICAudGhlbihjc3MgPT4ge1xuICAgICAgICBwcm9qZWN0Q3NzLmlubmVyVGV4dCA9IGNzcztcbiAgICB9KVxuXG4gICAgXG5cbiAgICBjb25zb2xlLmxvZyhcInNpZGVQYW5lbC5pZCA9IFwiLCBzaWRlUGFuZWwuaWQpXG4gICAgXG4gICAgc2lkZVBhbmVsLmFwcGVuZChwcm9qZWN0Q29udGFpbmVyKTtcblxuXG4gICAgXG4gICAgXG4gICAgXG59XG5cblxuXG5cbi8qKlxuICogQWRkIG5ldyBwcm9qZWN0IG9iamVjdCBhbmRcbiAqL1xuYXN5bmMgZnVuY3Rpb24gY3JlYXRlTmV3UHJvamVjdCgpIHtcbiAgICBsZXQgbmV3UHJvamVjdE9iamVjdCA9IGF3YWl0IGFnZV9kYmlzLkNvbnRlbnRfSW5zZXJ0T25UYWJsZShcIlByb2plY3RcIilcbiAgICBjdXJyZW50UHJvamVjdE9iamVjdCA9IG5ld1Byb2plY3RPYmplY3Q7XG4gICAgLy8gYXdhaXQgbG9hZFByb2plY3RXaXRoQ29udGVudE9iamVjdChuZXdQcm9qZWN0T2JqZWN0KTtcbiAgICByZWxvYWRDdXJyZW50UHJvamVjdCgpO1xufVxuXG4vKipcbiAqICAgUmVsb2FkIHVzaW5nIHRoZSBhbHJlYWR5IHNldCB2YWx1ZXMuXG4qL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbG9hZEN1cnJlbnRQcm9qZWN0KCkge1xuICAgIGF3YWl0IHJlbG9hZENoaWxkcmVuVGFibGUoKTtcbiAgICBhd2FpdCByZWxvYWRQcm9wZXJ0aWVzVGFibGUoKTtcbiAgICBhd2FpdCByZWZyZXNoUHJvamVjdFRpdGxlRWxlbWVudCgpO1xuICAgIHBlcmZvcm1TZWFyY2goKTtcbn1cblxuXG5mdW5jdGlvbiBsb2FkUHJvamVjdFdpdGhVdWlkKFV1aWQgOiBzdHJpbmcgfCBudW1iZXIpe1xuICAgIGFnZV9kYmlzLkNvbnRlbnRfU2VsZWN0T25VdWlkKFV1aWQpXG4gICAgICAgIC50aGVuKChjb250ZW50T2JqZWN0KSA9PiB7XG4gICAgICAgICAgICBsb2FkUHJvamVjdFdpdGhDb250ZW50T2JqZWN0KGNvbnRlbnRPYmplY3QpO1xuICAgICAgICB9KVxufVxuXG5hc3luYyBmdW5jdGlvbiByZWxvYWRDaGlsZHJlblRhYmxlKCl7XG4gICAgbGV0IGNvbnRlbnRFZGdlcyA9IGF3YWl0IGFnZV9kYmlzLkNvbnRlbnRFZGdlX1NlbGVjdENoaWxkT2ZVdWlkKGN1cnJlbnRQcm9qZWN0T2JqZWN0LlV1aWQpXG4gICAgZG9tLnBvcHVsYXRlQ2hpbGRyZW5UYWJsZShwcm9qZWN0Q2hpbGRyZW5UYWJsZSwgY29udGVudEVkZ2VzKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHJlbG9hZFByb3BlcnRpZXNUYWJsZSgpIHtcbiAgICBcbiAgICBhZ2VfZGJpcy5Db250ZW50X1NlbGVjdE9uVXVpZChjdXJyZW50UHJvamVjdE9iamVjdC5VdWlkKVxuICAgICAgICAudGhlbigoY29udGVudE9iamVjdCkgPT4ge1xuICAgICAgICAgICAgZG9tLnBvcHVsYXRlUHJvcGVydGllc1RhYmxlKHByb2plY3RQcm9wZXJ0aWVzVGFibGUsIGNvbnRlbnRPYmplY3QpO1xuICAgICAgICB9KSAgIFxufVxuZnVuY3Rpb24gcmVmcmVzaFByb2plY3RUaXRsZUVsZW1lbnQoKXtcbiAgICBwcm9qZWN0VGl0bGVFbGVtZW50LnRleHRDb250ZW50ID0gY3VycmVudFByb2plY3RPYmplY3QuVGl0bGU7XG59XG5cblxuZnVuY3Rpb24gcHJvamVjdFByb3BlcnR5Rm9jdXNPdXQoZXZlbnQ6IEZvY3VzRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnRk9DVVMgT1VUIFBST0pFQ1QgUFJPUEVSVFknKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcImV2ZW50LnRhcmdldCA9IFwiLCBldmVudC50YXJnZXQpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwidGhpcyA9IFwiLCB0aGlzKTtcblxuICAgIGxldCBkYXRhRWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAvLyBsZXQgcHJvamVjdFRhYmxlOiBIVE1MVGFibGVDb250ZW50T2JqZWN0ID0gdGhpcztcbiAgICBcblxuICAgIC8vIGNvbnNvbGUubG9nKCcnLCBldmVudC50YXJnZXQuKVxuICAgIHN3aXRjaCAoZGF0YUVsZW1lbnQuaWQpIHtcbiAgICAgICAgLy8gVFlQRVxuICAgICAgICBjYXNlIFwiYWdlX3Byb2pQcm9wVGFibGUtVHlwZS12YWx1ZVwiOlxuICAgICAgICAgICAgcHJvamVjdFByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0LlR5cGUgPSBkYXRhRWxlbWVudC50ZXh0Q29udGVudDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyBUSVRMRVxuICAgICAgICBjYXNlIFwiYWdlX3Byb2pQcm9wVGFibGUtVGl0bGUtdmFsdWVcIjpcbiAgICAgICAgICAgIHByb2plY3RQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdC5UaXRsZSA9IGRhdGFFbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIEdPQUxcbiAgICAgICAgY2FzZSBcImFnZV9wcm9qUHJvcFRhYmxlLUdvYWwtdmFsdWVcIjpcbiAgICAgICAgICAgIHByb2plY3RQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdC5Hb2FsID0gZGF0YUVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgLy8gUmV0dXJuISBFbHNlIGVsZW1lbnRzIHdpbGwgYmUgdXBkYXRlZCB3aXRoIGdhcmJhZ2UgdmFsdWUgd2hlbiBlLmcuIGV4aXRpbmcgc2VhcmNoIGlucHV0XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBhZ2VfZGJpcy5Db250ZW50X1VwZGF0ZVdpdGhDb250ZW50T2JqZWN0KHByb2plY3RQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdClcbiAgICAgICAgLnRoZW4odXBkYXRlZENvbnRlbnRPYmplY3QgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChkYXRhRWxlbWVudC5pZCkge1xuICAgICAgICAgICAgICAgIC8vIFRZUEVcbiAgICAgICAgICAgICAgICBjYXNlIFwiYWdlX3Byb2pQcm9wVGFibGUtVHlwZS12YWx1ZVwiOlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmFzc2VydCh1cGRhdGVkQ29udGVudE9iamVjdC5UeXBlID09IHByb2plY3RQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdC5UeXBlLCBcIidQVVQnIGNvbnRlbnQgT2JqZWN0IFR5cGUgZG9lcyBub3QgbWF0Y2ggdGhlIHByb2plY3QgdGFibGUgLmNvbnRlbnRPYmplY3QuVHlwZSAhXCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAvLyBUSVRMRVxuICAgICAgICAgICAgICAgIGNhc2UgXCJhZ2VfcHJvalByb3BUYWJsZS1UaXRsZS12YWx1ZVwiOlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmFzc2VydCh1cGRhdGVkQ29udGVudE9iamVjdC5UaXRsZSA9PSBwcm9qZWN0UHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QuVGl0bGUsIFwiJ1BVVCcgY29udGVudCBPYmplY3QgVGl0bGUgZG9lcyBub3QgbWF0Y2ggdGhlIHByb2plY3QgdGFibGUgLmNvbnRlbnRPYmplY3QuVGl0bGUgIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgdXRpbC5VdWlkQ2hlY2tBbmRVcGRhdGVUaXRsZXMoY3VycmVudFByb2plY3RPYmplY3QuVXVpZCwgdXBkYXRlZENvbnRlbnRPYmplY3QuVGl0bGUpOyAvLyBVcGRhdGUgdGl0bGVzIGluIGN1cnJlbnRseSBsb2FkZWQgZXh0ZW5zaW9uXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIC8vIEdPQUxcbiAgICAgICAgICAgICAgICBjYXNlIFwiYWdlX3Byb2pQcm9wVGFibGUtR29hbC12YWx1ZVwiOlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmFzc2VydCh1cGRhdGVkQ29udGVudE9iamVjdC5Hb2FsID09IHByb2plY3RQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdC5Hb2FsLCBcIidQVVQnIGNvbnRlbnQgT2JqZWN0IEdvYWwgZG9lcyBub3QgbWF0Y2ggdGhlIHByb2plY3QgdGFibGUgLmNvbnRlbnRPYmplY3QuR29hbCAhXCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfSlcbiAgICAvLyBsZXQgcHJvamVjdENvbnRlbnRPYmplY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0UHJvcGVydGllc1RhYmxlXCIpIGFzIEhUTUxUYWJsZUNvbnRlbnRPYmplY3Q7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhcInByb2plY3RDb250ZW50T2JqZWN0LmNvbnRlbnRPYmplY3QgPSBcIiwgcHJvamVjdFByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0KTtcbiAgICBjdXJyZW50UHJvamVjdE9iamVjdCA9IHByb2plY3RQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdDtcblxuICAgIHJlZnJlc2hQcm9qZWN0VGl0bGVFbGVtZW50KCk7XG5cbiAgICBcblxuICAgIC8vIFVwZGF0ZSBUaXRsZXMgaW4gdGhlIHNlYXJjaFxuICAgIC8vIGxldCBlbGVtZW50V2l0aFNhbWVVdWlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtdXVpZD0nJHtjdXJyZW50UHJvamVjdE9iamVjdC5VdWlkfSddYCk7XG4gICAgLy8gZWxlbWVudFdpdGhTYW1lVXVpZC5mb3JFYWNoKChfZWxlbWVudCkgPT4ge1xuICAgIC8vICAgICBpZiAoX2VsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWdlX2VsZW1lbnRcIikgJiYgX2VsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWdlX3Byb2plY3RTZWFyY2hSb3dcIikpe1xuICAgIC8vICAgICAgICAgLy8gX2VsZW1lbnQuY2hpbGRyZW5bMV0udGV4dENvbnRlbnQgPSBkYXRhRWxlbWVudC50ZXh0Q29udGVudDsgLy8gdXBkYXRlIHRoZSBzZWNvbmQgc2VhcmNoIGNvbHVtbjsgZWRpdDogZG9lc24ndCB3b3JrLi4uXG4gICAgLy8gICAgIH1cbiAgICAvLyB9KVxufVxuXG5hc3luYyBmdW5jdGlvbiBjbGlja2VkUHJvamVjdENvbnRleHRNZW51KGV2ZW50OiBNb3VzZUV2ZW50KXtcbiAgICBsZXQgZXZlbnRUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgc3dpdGNoIChldmVudFRhcmdldC5pZCkge1xuICAgICAgICBjYXNlIFwibmV3UHJvamVjdEJ0blwiOlxuICAgICAgICAgICAgYXdhaXQgY3JlYXRlTmV3UHJvamVjdCgpO1xuICAgICAgICAgICAgc2hvd1Byb2plY3RQcm9wZXJ0aWVzKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm5ld1NvdXJjZUJ0blwiOlxuICAgICAgICAgICAgaW5zZXJ0TmV3U291cmNlVG9BY3RpdmVQcm9qZWN0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInJlZnJlc2hFeHRlbnNpb25cIjpcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIidyZWZyZXNoRXh0ZW5zaW9uJyBOT1QgRlVMTFkgSU1QTEVNRU5URUQgISBPTkxZIFBST0pFQ1QgSVMgUkVGUkVTSEVEXCIpO1xuICAgICAgICAgICAgLy8gcmVsb2FkQ3VycmVudFByb2plY3QoKTtcbiAgICAgICAgICAgIGxldCBuZXdzb3VyY2VFdmVudCA9IG5ldyBDdXN0b21FdmVudChcInJlZnJlc2hleHRlbnNpb25cIiwge1xuICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHByb2plY3RDb250YWluZXIuZGlzcGF0Y2hFdmVudChuZXdzb3VyY2VFdmVudCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInByaW50Q3VycmVudFByb2plY3RcIjpcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRQcm9qZWN0T2JqZWN0KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGN1cnJlbnRQcm9qZWN0T2JqZWN0KSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm1vdmVFeHRlbnNpb25cIjpcbiAgICAgICAgICAgIHRvZ2dsZUV4dGVuc2lvbkxvY2F0aW9uKCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlRXh0ZW5zaW9uTG9jYXRpb24oKXtcbiAgICAvLyBTaGlmdCBiZXR3ZWVuIGxlZnQgYW5kIHJpZ2h0XG4gICAgaWYgKHNpZGVQYW5lbElzUmlnaHQpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2Vfb3ZlcmxheUNvbnRhaW5lclwiKS5zdHlsZS5qdXN0aWZ5Q29udGVudCA9IFwic3RhcnRcIjtcbiAgICAgICAgc2lkZVBhbmVsSXNSaWdodCA9IGZhbHNlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2Vfb3ZlcmxheUNvbnRhaW5lclwiKS5zdHlsZS5qdXN0aWZ5Q29udGVudCA9IFwiZW5kXCI7XG4gICAgICAgIHNpZGVQYW5lbElzUmlnaHQgPSB0cnVlO1xuICAgIH1cbn1cbiAgICBcbi8vIH1cbi8vIDxidXR0b24gaWQ9XCJyZWZyZXNoRXh0ZW5zaW9uXCIgPiBSZWZyZXNoIGZyb20gc2VydmVyIDwvYnV0dG9uPlxuLy8gICAgIDwgYnV0dG9uIGlkID0gXCJwcmludEN1cnJlbnRQcm9qZWN0XCIgPiBDb3B5IFByb2plY3QgUHJvcGVydGllcyA8L2J1dHRvbj5cbi8vICAgICAgICAgPCBidXR0b24gaWQgPSBcIm1vdmVFeHRlbnNpb25cIiA+IE1vdmUgRXh0ZW5zaW9uIDwvYnV0dG9uPlxuXG5cbi8qKlxuICogQWRkIG5ldyBjaGlsZC1zb3VyY2UsIGZpcmVzIG9mZiB0aGUgbG9hZHNvdXJjZSBDdXN0b21FdmVudCwgYW5kIHRoZW4gcmVsb2FkcyB0aGUgcHJvamVjdCBjaGlsZCB0YWJsZS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluc2VydE5ld1NvdXJjZVRvQWN0aXZlUHJvamVjdCgpe1xuXG4gICAgaWYgKGN1cnJlbnRQcm9qZWN0T2JqZWN0ID09PSB1bmRlZmluZWQgfHwgY3VycmVudFByb2plY3RPYmplY3QgPT09IG51bGwpe1xuICAgICAgICBjb25zb2xlLndhcm4oXCJObyBjdXJyZW50IFByb2plY3QuIENhbid0IGFkZCBuZXcgc291cmNlLlwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBjb250ZW50RWRnZU9iamVjdDogYW55ID0gYXdhaXQgYWdlX2RiaXMuQ29udGVudEVkZ2VfSW5zZXJ0QWRqYWNlbnRUb1V1aWRJbnRvVGFibGUoY3VycmVudFByb2plY3RPYmplY3QuVXVpZCwgMSwgJ1NvdXJjZScsICcnLCAnJywgJy8nKVxuXG4gICAgLy8gbWFrZSBzdXJlIHdlIHNldCBhIGRlZmF1bHQgdXJsIVxuICAgIGxldCBfbmV3U291cmNlT2JqZWN0ID0gY29udGVudEVkZ2VPYmplY3QuY29udGVudDtcbiAgICBfbmV3U291cmNlT2JqZWN0LlVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgIF9uZXdTb3VyY2VPYmplY3QuVGl0bGUgPSBkb2N1bWVudC50aXRsZTtcbiAgICBfbmV3U291cmNlT2JqZWN0ID0gYXdhaXQgYWdlX2RiaXMuQ29udGVudF9VcGRhdGVXaXRoQ29udGVudE9iamVjdChfbmV3U291cmNlT2JqZWN0KTtcblxuICAgIC8vIEluc2VydCBuZXcgU2NoZWR1bGVcbiAgICBhd2FpdCBhZ2VfZGJpcy5SZXZpZXdfSW5zZXJ0U2NoZWR1bGVPblV1aWQoX25ld1NvdXJjZU9iamVjdC5VdWlkLCBcIlwiKTtcblxuICAgIC8vIFNFTkQgTkVXIFNPVVJDRSBNRVNTQUdFXG4gICAgbGV0IG5ld3NvdXJjZUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwibmV3c291cmNlXCIsIHtcbiAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgZGV0YWlsOiB7IGNvbnRlbnRPYmplY3Q6IF9uZXdTb3VyY2VPYmplY3QgfSxcbiAgICB9KTtcbiAgICBwcm9qZWN0Q29udGFpbmVyLmRpc3BhdGNoRXZlbnQobmV3c291cmNlRXZlbnQpO1xuICAgIFxuICAgIC8vIHVwZGF0ZSBwcm9qZWN0IGNoaWxkcmVuIHRhYmxlXG4gICAgYWdlX2RiaXMuQ29udGVudEVkZ2VfU2VsZWN0Q2hpbGRPZlV1aWQoY3VycmVudFByb2plY3RPYmplY3QuVXVpZClcbiAgICAgICAgLnRoZW4oKGNvbnRlbnRFZGdlcykgPT4ge1xuICAgICAgICAgICAgZG9tLnBvcHVsYXRlQ2hpbGRyZW5UYWJsZShwcm9qZWN0Q2hpbGRyZW5UYWJsZSwgY29udGVudEVkZ2VzKTtcbiAgICAgICAgfSlcbiAgICBcbn1cblxuXG5mdW5jdGlvbiBoaWRlUHJvamVjdENvbnRleHRNZW51KGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgbGV0IGV2ZW50VGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgIC8vIGNvbnNvbGUubG9nKCdfXl9eX15fXl9eX14nLCBldmVudFRhcmdldC5pZCk7XG5cbiAgICBsZXQgaXNDb250ZXh0RWxlbWVudDogYm9vbGVhbiA9IGV2ZW50VGFyZ2V0LmlkID09PSBcImFnZV9tb3JlUHJvamVjdE9wdGlvbnNDb250ZXh0TWVudVwiIHx8IGV2ZW50VGFyZ2V0LmlkID09PSBcImFnZV9wcm9qZWN0TW9yZU9wdGlvbnNcIjtcbiAgICAvLyBjb25zb2xlLmxvZygnaXNDb250ZXh0RWxlbWVudCA9ICcsIGlzQ29udGV4dEVsZW1lbnQpO1xuXG4gICAgaWYgKCFpc0NvbnRleHRFbGVtZW50KSB7XG4gICAgICAgIGxldCBvcHRpb25zQ29udGV4dE1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9tb3JlUHJvamVjdE9wdGlvbnNDb250ZXh0TWVudVwiKTtcbiAgICAgICAgaWYgKG9wdGlvbnNDb250ZXh0TWVudSAhPT0gbnVsbClcbiAgICAgICAgICAgIG9wdGlvbnNDb250ZXh0TWVudS5jbGFzc0xpc3QuYWRkKFwiYWdlX2Rpc3BsYXlOb25lXCIpXG4gICAgfVxufVxuXG5cblxuLyoqXG4gKiAgTWFpbiBjbGljayBoYW5kbGVyIGluIHRoZSBwcm9qZWN0IGNvbnRhaW5lci5cbiAqIFxuICogQHBhcmFtIGV2ZW50IFxuICovXG5cbmZ1bmN0aW9uIHByb2plY3RDbGljayhldmVudDogRXZlbnQpe1xuXG4gICAgLy8gY29uc29sZS5sb2coXCJDbGljayBkZXRlY3RlZCBpbiBwcm9qZWN0IGNvbnRhaW5lci5cIik7XG4gICAgbGV0IGNsaWNrVGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuY29uc29sZS5sb2coXCJDTElDTENMSUNMS0NJQ0xDSUNMXCIpXG4gICAgXG4vLyBTRUFSQ0ggUk9XXG4gICAgaWYgKGNsaWNrVGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImFnZV9wcm9qZWN0Um93U2VhcmNoRGF0YVwiKSB8fCBjbGlja1RhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJhZ2VfcHJvamVjdFNlYXJjaFJvd1wiKSl7XG4gICAgICAgIC8vIGdyYWIgcGFyZW50IGJlY2F1c2Ugd2UgY2xpY2tlZCBvbiBkYXRhLWVsZW1lbnRcbiAgICAgICAgbGV0IHRhYmxlUm93VGFyZ2V0ID0gY2xpY2tUYXJnZXQucGFyZW50RWxlbWVudCBhcyBIVE1MUHJvamVjdFRhYmxlUm93O1xuICAgICAgICBsb2FkUHJvamVjdFdpdGhDb250ZW50T2JqZWN0KHRhYmxlUm93VGFyZ2V0Lm5vZGVPYmplY3QpO1xuICAgICAgICBzaG93UHJvamVjdENoaWxkcmVuKCk7XG4gICAgfVxuLy8gU0VBUkNIL0NISUxEUkVOL1BST1BFUlRJRVMgQlVUVE9OXG4gICAgZWxzZSBpZiAoXG4gICAgICAgICAgIGNsaWNrVGFyZ2V0LmlkID09IFwiYWdlX3Byb2plY3RTZWFyY2hCdXR0b25cIiBcbiAgICAgICAgfHwgY2xpY2tUYXJnZXQuaWQgPT0gXCJhZ2VfcHJvamVjdENoaWxkcmVuQnV0dG9uXCIgXG4gICAgICAgIHx8IGNsaWNrVGFyZ2V0LmlkID09IFwiYWdlX3Byb2plY3RQcm9wZXJ0aWVzQnV0dG9uXCJcbiAgICApe1xuICAgICAgICAvLyBwcm9qZWN0U2VhcmNoQnV0dG9uQ2xpY2tlZChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpO1xuICAgICAgICBzaG93UHJvamVjdFRhYmxlKGNsaWNrVGFyZ2V0LmlkKTtcbiAgICB9XG4vLyBNT1JFIE9QVElPTlMgQlVUVE9OXG4gICAgZWxzZSBpZiAoY2xpY2tUYXJnZXQuaWQgPT0gXCJhZ2VfcHJvamVjdE1vcmVPcHRpb25zXCIpIHtcbiAgICAgICAgLy8gcHJvamVjdE1vcmVPcHRpb25zQnV0dG9uQ2xpY2tlZChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpO1xuICAgICAgICB0b2dnbGVNb3JlT3B0aW9ucygpO1xuICAgIH1cbi8vIFRJVExFXG4gICAgZWxzZSBpZiAoY2xpY2tUYXJnZXQuaWQgPT0gXCJhZ2VfcHJvamVjdFRpdGxlXCIpIHtcbiAgICAgICAgLy8gVE9HR0xFIFByb2plY3Qvc291cmNlIGNvbnRhaW5lciBleHBhbnNpb25zL2NvbGxhcHNlXG4gICAgICAgIGxldCBwcm9qZWN0Q29udGFpbmVyRWxlbWVudCA6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdENvbnRhaW5lclwiKTtcbiAgICAgICAgcHJvamVjdENvbnRhaW5lckVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29sbGFwc2VkXCIpID8gcHJvamVjdENvbnRhaW5lckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImNvbGxhcHNlZFwiKSA6IHByb2plY3RDb250YWluZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjb2xsYXBzZWRcIik7XG4gICAgICAgIGxldCBzb3VyY2VDb250YWluZXJFbGVtZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3NvdXJjZUNvbnRhaW5lclwiKTtcbiAgICAgICAgc291cmNlQ29udGFpbmVyRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb2xsYXBzZWRcIikgPyBzb3VyY2VDb250YWluZXJFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xsYXBzZWRcIikgOiBzb3VyY2VDb250YWluZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjb2xsYXBzZWRcIik7XG5cbiAgICB9XG5cbiAgICBlbHNle1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnSWdub3JlZCBQcm9qZWN0IENsaWNrLicpO1xuICAgIH1cbn1cblxuLyoqXG4gKiAgbG9hZHMgYW4gZXhpc3RpbmcgcHJvamVjdC4gVXN1YWxseSBmcm9tIGNsaWNraW5nIG9uIGEgcHJvamVjdCBkdXJpbmcgc2VhcmNoIE9SIGNyZWF0aW5nIGEgbmV3IHByb2plY3Qgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBsb2FkUHJvamVjdFdpdGhDb250ZW50T2JqZWN0KF9jb250ZW50T2JqZWN0IDogYW55KXtcbiAgICAvLyBTZXQgbW9kdWxlIHZhcmlhYmxlXG4gICAgY3VycmVudFByb2plY3RPYmplY3QgPSBfY29udGVudE9iamVjdDtcblxuICAgIC8vIHNldCB0aXRsZVxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2VfcHJvamVjdFRpdGxlJykudGV4dENvbnRlbnQgPSBfY29udGVudE9iamVjdC5UaXRsZTtcblxuXG4gICAgZG9tLnBvcHVsYXRlUHJvcGVydGllc1RhYmxlKHByb2plY3RQcm9wZXJ0aWVzVGFibGUsIF9jb250ZW50T2JqZWN0KTtcbiAgICAvLyBwb3B1bGF0ZSBwcm9wZXJ0aWVzIHRhYmxlIFxuICAgIGZldGNoUHJvamVjdENoaWxkcmVuKF9jb250ZW50T2JqZWN0LlV1aWQpXG4gICAgICAgIC50aGVuKChjb250ZW50RWRnZU9iamVjdHMpID0+IHsgZG9tLnBvcHVsYXRlQ2hpbGRyZW5UYWJsZShwcm9qZWN0Q2hpbGRyZW5UYWJsZSwgcHJvamVjdENvbnRlbnRFZGdlQ2hpbGRyZW4pIH1cbiAgICApO1xuICAgIFxuICAgIC8vIHNob3dQcm9qZWN0Q2hpbGRyZW4oKTtcbn1cblxuZnVuY3Rpb24gc2hvd1Byb2plY3RDaGlsZHJlbigpe1xuICAgIC8vIG1vdmUgZm9jdXMgdG8gdGhlIGNoaWxkcmVuLXRhYlxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3Byb2plY3RDaGlsZHJlbkJ1dHRvblwiKS5jbGljaygpXG59XG5mdW5jdGlvbiBzaG93UHJvamVjdFByb3BlcnRpZXMoKSB7XG4gICAgLy8gbW92ZSBmb2N1cyB0byB0aGUgY2hpbGRyZW4tdGFiXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdFByb3BlcnRpZXNCdXR0b25cIikuY2xpY2soKVxufVxuXG5mdW5jdGlvbiB0b2dnbGVNb3JlT3B0aW9ucygpe1xuICAgIC8vIGNvbnNvbGUubG9nKFwiVE9HR0xFIE1PUkUgT1BUSU9OU1wiKVxuICAgIGxldCBidXR0b25Cb3VuZGluZ1JlY3QgPSBwcm9qZWN0TW9yZU9wdGlvbnNCdXR0b24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgbGV0IGJ0bkxlZnQgPSBidXR0b25Cb3VuZGluZ1JlY3QubGVmdDtcbiAgICBsZXQgYnRuUmlnaHQgPSBidXR0b25Cb3VuZGluZ1JlY3QucmlnaHQ7XG4gICAgbGV0IGJ0bkJvdHRvbSA9IGJ1dHRvbkJvdW5kaW5nUmVjdC5ib3R0b207XG4gICAgbGV0IGJ0blggPSBidXR0b25Cb3VuZGluZ1JlY3QueDtcblxuXG4gICAgcHJvamVjdE1vcmVPcHRpb25zQ29udGV4dE1lbnUuc3R5bGUudG9wID0gYnRuQm90dG9tICsgNSArIFwicHhcIjtcbiAgICBpZihzaWRlUGFuZWxJc1JpZ2h0KXtcbiAgICAgICAgXG4gICAgICAgIHByb2plY3RNb3JlT3B0aW9uc0NvbnRleHRNZW51LnN0eWxlLmxlZnQgPSBidG5MZWZ0IC0gMTcwICArIFwicHhcIjtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgcHJvamVjdE1vcmVPcHRpb25zQ29udGV4dE1lbnUuc3R5bGUubGVmdCA9IGJ0bkxlZnQgKyBcInB4XCI7XG4gICAgfVxuXG4gICAgcHJvamVjdE1vcmVPcHRpb25zQ29udGV4dE1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWdlX2Rpc3BsYXlOb25lXCIpID8gcHJvamVjdE1vcmVPcHRpb25zQ29udGV4dE1lbnUuY2xhc3NMaXN0LnJlbW92ZShcImFnZV9kaXNwbGF5Tm9uZVwiKSA6IHByb2plY3RNb3JlT3B0aW9uc0NvbnRleHRNZW51LmNsYXNzTGlzdC5hZGQoXCJhZ2VfZGlzcGxheU5vbmVcIik7XG59XG5cblxuXG5mdW5jdGlvbiBzZWFyY2hQcm9qZWN0SW4oKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJzZWFyY2hQcm9qZWN0SW4oKVwiKVxuICAgIC8vIGZvY3VzUHJvamVjdFNlYXJjaCA9IHRydWU7XG4gICAgLy8gZXh0ZW5zaW9uU3RhdGVGcm9udC5wcm9qZWN0U2VhcmNoQWN0aXZlID0gdHJ1ZTtcbiAgICAvL3dyaXRlU3RhdGVGcm9tRnJvbnQoKTtcbiAgICAvLyBjb25zb2xlLmxvZygncHJvamVjdFNlYXJjaEVsZW1lbnQudGV4dENvbnRlbnQgPSAnLCBwcm9qZWN0U2VhcmNoRWxlbWVudC50ZXh0Q29udGVudCk7XG4gICAgXG4gICAgLy8gRW1wdHkgc2VhcmNoIGNvbnRhaW5lciBpZiBubyBwcmV2aW91cyBzZWFyY2ggc3RyaW5nIGV4aXN0c1xuICAgIGlmICghc2VhcmNoU3RyaW5nRXhpc3RzKSB7XG4gICAgICAgIHByb2plY3RTZWFyY2hFbGVtZW50LmlubmVySFRNTCA9ICc8ZGl2Pjxicj48L2Rpdj4nOyAvLyBkZWZhdWx0IGNvbnRlbnQgb24gJ2NvbnRlbnRlZGl0YWJsZScgZWxlbWVudHMgXG4gICAgICAgIC8vIHNldEludGVydmFsKCgpID0+IHsgc2VhcmNoSW5wdXQuaW5uZXJIVE1MICs9ICc8YnI+JyB9LCA1MCk7XG4gICAgfVxuICAgIHNlYXJjaFN0cmluZ0V4aXN0cyA9IHRydWU7XG4gICAgLy8gY29uc29sZS5sb2coJ2ZvY3VzIHNlYXJjaCAnKVxuICAgIC8vIHByb2plY3RTZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGtleVByZXNzRHVyaW5nU2VhcmNoKVxuICAgIHByb2plY3RTZWFyY2hFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlEb3duRHVyaW5nU2VhcmNoKVxuICAgIC8vIGtleURvd25EdXJpbmdTZWFyY2goKTtcbn1cblxuXG5mdW5jdGlvbiBzZWFyY2hQcm9qZWN0T3V0KCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdzZWFyY2hQcm9qZWN0T3V0KCknKTtcbiAgICBcbiAgICBsZXQgc2VhcmNoU3RyaW5nTGVuZ3RoID0gcHJvamVjdFNlYXJjaEVsZW1lbnQudGV4dENvbnRlbnQubGVuZ3RoO1xuICAgIGlmKHNlYXJjaFN0cmluZ0xlbmd0aCA9PT0gMCl7XG4gICAgICAgIHNlYXJjaFN0cmluZ0V4aXN0cyA9IGZhbHNlO1xuICAgICAgICBwcm9qZWN0U2VhcmNoRWxlbWVudC5pbm5lckhUTUwgPSAnPGRpdj5RICA6ICBTZWFyY2ggLiAuIC48YnI+PC9kaXY+JztcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgc2VhcmNoU3RyaW5nRXhpc3RzID0gdHJ1ZTtcbiAgICB9XG4gICAgcHJvamVjdFNlYXJjaEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleURvd25EdXJpbmdTZWFyY2gpXG59XG5cblxuLy8gUGVyZm9ybSBzZWFyY2ggd2l0aCBzbGlnaHQgZGVsYXkgdG8gbWFrZSBzdXJlIG5ldyBpbnB1dCBpcyB3cml0dGVuIHRvIGNvbnRlbnRFZGl0YW5sZSBpbnB1dFxuYXN5bmMgZnVuY3Rpb24ga2V5RG93bkR1cmluZ1NlYXJjaChldmVudCA6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBcbiAgICAvLyBVc2VyIGp1c3QgZGVsZXRlZCB0aGUgbGFzdCBjaGFyYWN0ZXIgc28gd2UgcmVzZXQgdGhlIGRlZmF1bHQgY29udGVudGVkaXRhYmxlIGVsbWVudCBzdHJ1Y3R1cmVcbiAgICAvLyBpZiB3ZSBjb24ndCBkbyB0aGlzIHRoZSB1c2VyIHdpbGwgaW5hZHZlcnRpZWRseSByZW1vdmUgdGhlIGNvbnRhaW5pbmcgPGRpdj4sIGJyZWFraW5nIHRoZSB0eXBpbmctYmVoYXZpb3VyIVxuICAgIGlmIChldmVudC5rZXkgPT09IFwiQmFja3NwYWNlXCIgJiYgcHJvamVjdFNlYXJjaEVsZW1lbnQudGV4dENvbnRlbnQubGVuZ3RoID09PSAxKXtcbiAgICAgICAgY29uc29sZS5sb2coJ0xhc3QgY2hhcmFjdGVyIGRlbGV0aW9uIHByb3RlY3Rpb24hJyk7XG4gICAgICAgIHByb2plY3RTZWFyY2hFbGVtZW50LmlubmVySFRNTCA9ICc8ZGl2Pjxicj48L2Rpdj4nOyAvLyBkZWZhdWx0IGNvbnRlbnQgb24gJ2NvbnRlbnRlZGl0YWJsZScgZWxlbWVudHMgXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIFxuICAgIC8vIFRoaXMgZG9lcyBub3QgcHJldmVudCBhIHJlcXVlc3Qgb24gZWFjaCBrZXlzdHJva2VcbiAgICAvLyBCVVQgaXQgZW5hYmxlcyByZWFkaW5nIHRoZSBjaGFuZ2Ugb2YgZWFjaCBrZXlzdHJva2UuIFdoZW4gdGhpcyBtZXRob2QgaXMgY2FsbGVkIHRoZSB0ZXh0Q29udGVudCBvZiB0aGUgc2VyYWNoIGJveCBoYXMgbm90IGJlZW4gdXBkYXRlZCEhXG4gICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG5cbiAgICAgICAgcGVyZm9ybVNlYXJjaCgpO1xuXG4gICAgfSwgMTAwKTtcblxufVxuXG5mdW5jdGlvbiBwZXJmb3JtU2VhcmNoKCl7XG4gICAgbGV0IHNlYXJjaFN0cmluZyA6IHN0cmluZyA9IFwiXCI7XG4gICAgaWYoc2VhcmNoU3RyaW5nRXhpc3RzKVxuICAgICAgICBzZWFyY2hTdHJpbmcgPSBwcm9qZWN0U2VhcmNoRWxlbWVudC50ZXh0Q29udGVudDtcbiAgICBlbHNlXG4gICAgICAgIHNlYXJjaFN0cmluZyA9IFwiXCI7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIlNlYXJjaGluZyB3aXRoIHNlYXJjaHN0cmlnbiA9IFwiLCBzZWFyY2hTdHJpbmcpXG4gICAgZmV0Y2hQcm9qZWN0U2VhcmNoKHNlYXJjaFN0cmluZylcbiAgICAgICAgLnRoZW4oKGNvbnRlbnRPYmplY3RBcnJheSkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY29udGVudE9iamVjdEFycmF5KVxuICAgICAgICAgICAgZG9tLnBvcHVsYXRlUHJvamVjdFNlYXJjaFRhYmxlKHByb2plY3RTZWFyY2hUYWJsZSwgY29udGVudE9iamVjdEFycmF5KTtcbiAgICAgICAgfSlcbn1cblxuXG5mdW5jdGlvbiBzaG93UHJvamVjdFRhYmxlKGJ1dHRvbklkIDogc3RyaW5nKXtcbiAgICAvLyBhZ2VfcHJvamVjdEJ1dHRvbk9uXG5cbiAgICAvLyBTZWFyY2ggYm94IFxuICAgIGxldCBzZWFyY2hCb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0U2VhcmNoSW5wdXRcIik7XG4gICAgc2VhcmNoQm94LmNsYXNzTGlzdC5hZGQoXCJhZ2VfZGlzcGxheU5vbmVcIik7XG5cbiAgICAvLyBSZXNldCB0aGUgYnV0dG9uc1xuICAgIGxldCBzZWFyY2hCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0U2VhcmNoQnV0dG9uXCIpXG4gICAgbGV0IGNoaWxkcmVuQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdENoaWxkcmVuQnV0dG9uXCIpXG4gICAgbGV0IHByb3BlcnRpZXNCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0UHJvcGVydGllc0J1dHRvblwiKVxuICAgIHNlYXJjaEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWdlX3Byb2plY3RCdXR0b25PblwiKTtcbiAgICBjaGlsZHJlbkJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWdlX3Byb2plY3RCdXR0b25PblwiKTtcbiAgICBwcm9wZXJ0aWVzQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhZ2VfcHJvamVjdEJ1dHRvbk9uXCIpO1xuXG4gICAgLy8gUmVzZXQgdGhlIFRhYmxlc1xuICAgIGxldCBzZWFyY2hUYWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3Byb2plY3RTZWFyY2hUYWJsZVwiKTtcbiAgICBsZXQgY2hpbGRyZW5UYWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3Byb2plY3RDaGlsZHJlblRhYmxlXCIpO1xuICAgIGxldCBwcm9wZXJ0aWVzVGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0UHJvcGVydGllc1RhYmxlXCIpO1xuICAgIHNlYXJjaFRhYmxlLmNsYXNzTGlzdC5hZGQoXCJhZ2VfZGlzcGxheU5vbmVcIik7XG4gICAgY2hpbGRyZW5UYWJsZS5jbGFzc0xpc3QuYWRkKFwiYWdlX2Rpc3BsYXlOb25lXCIpO1xuICAgIHByb3BlcnRpZXNUYWJsZS5jbGFzc0xpc3QuYWRkKFwiYWdlX2Rpc3BsYXlOb25lXCIpO1xuXG4gICAgLy8gQWN0aXZlIHRoZSBjb3JyZWN0IG9uZVxuICAgIGlmIChidXR0b25JZCA9PT0gXCJhZ2VfcHJvamVjdFNlYXJjaEJ1dHRvblwiKXtcbiAgICAgICAgc2VhcmNoVGFibGUuY2xhc3NMaXN0LnJlbW92ZShcImFnZV9kaXNwbGF5Tm9uZVwiKTtcbiAgICAgICAgc2VhcmNoQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJhZ2VfcHJvamVjdEJ1dHRvbk9uXCIpO1xuICAgICAgICBzZWFyY2hCb3guY2xhc3NMaXN0LnJlbW92ZShcImFnZV9kaXNwbGF5Tm9uZVwiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYnV0dG9uSWQgPT09IFwiYWdlX3Byb2plY3RDaGlsZHJlbkJ1dHRvblwiKXtcbiAgICAgICAgY2hpbGRyZW5UYWJsZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWdlX2Rpc3BsYXlOb25lXCIpO1xuICAgICAgICBjaGlsZHJlbkJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWdlX3Byb2plY3RCdXR0b25PblwiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYnV0dG9uSWQgPT09IFwiYWdlX3Byb2plY3RQcm9wZXJ0aWVzQnV0dG9uXCIpe1xuICAgICAgICBwcm9wZXJ0aWVzVGFibGUuY2xhc3NMaXN0LnJlbW92ZShcImFnZV9kaXNwbGF5Tm9uZVwiKTtcbiAgICAgICAgcHJvcGVydGllc0J1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWdlX3Byb2plY3RCdXR0b25PblwiKTtcbiAgICB9XG4gICAgXG59XG5cbi8vIGZ1bmN0aW9uIHByb2plY3RUaXRsZUNsaWNrZWQodGFibGVSb3c6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4vLyAgICAgY29uc29sZS5sb2coXCJQcm9qZWN0IHRpdGxlIGNsaWNrZWQ6IFwiLCB0YWJsZVJvdylcbi8vIH1cbi8vIGZ1bmN0aW9uIHByb2plY3RTZWFyY2hCdXR0b25DbGlja2VkKHRhYmxlUm93OiBIVE1MRWxlbWVudCkgOiB2b2lkIHtcbi8vICAgICBjb25zb2xlLmxvZyhcIlByb2plY3Qgc2VhcmNoIGNsaWNrZWQ6IFwiLCB0YWJsZVJvdylcbi8vIH1cbi8vIGZ1bmN0aW9uIHByb2plY3RDaGlsZHJlbkJ1dHRvbkNsaWNrZWQodGFibGVSb3c6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4vLyAgICAgY29uc29sZS5sb2coXCJQcm9qZWN0IGNoaWxkcmVuIGNsaWNrZWQ6IFwiLCB0YWJsZVJvdylcbi8vIH1cbi8vIGZ1bmN0aW9uIHByb2plY3RQcm9wZXJ0aWVzQnV0dG9uQ2xpY2tlZCh0YWJsZVJvdzogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbi8vICAgICBjb25zb2xlLmxvZyhcIlByb2plY3QgcHJvcGVydGllcyBjbGlja2VkOiBcIiwgdGFibGVSb3cpXG4vLyB9XG4vLyBmdW5jdGlvbiBwcm9qZWN0TW9yZU9wdGlvbnNCdXR0b25DbGlja2VkKHRhYmxlUm93OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuLy8gICAgIGNvbnNvbGUubG9nKFwiUHJvamVjdCBvcHRpb25zIGNsaWNrZWQ6IFwiLCB0YWJsZVJvdylcbi8vIH1cbi8vIGZ1bmN0aW9uIHByb2plY3RTZWFyY2hSb3dDbGlja2VkKHRhYmxlUm93OiBIVE1MUHJvamVjdFRhYmxlUm93KTogdm9pZCB7XG4vLyAgICAgY29uc29sZS5sb2coXCJUYWJsZSByb3cgY2xpY2tlZDogXCIsIHRhYmxlUm93KVxuLy8gfVxuXG5cbmZ1bmN0aW9uIGZldGNoUHJvamVjdFNlYXJjaChzZWFyY2hTdHJpbmcgOiBzdHJpbmcpIDogUHJvbWlzZTxhbnk+e1xuICAgIHJldHVybiBhZ2VfZGJpcy5Db250ZW50X1NlbGVjdE9uVGl0bGVMaWtlU3RyaW5nKHNlYXJjaFN0cmluZywgXCI1MFwiLCBcIlByb2plY3RcIiwgXCJcIiwgXCJcIilcbiAgICAgICAgLnRoZW4oKGNvbnRlbnRPYmplY3RBcnJheTogYW55KSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjb250ZW50T2JqZWN0QXJyYXkpO1xuICAgICAgICAgICAgcHJvamVjdFNlYXJjaE9iamVjdHMgPSBjb250ZW50T2JqZWN0QXJyYXk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNvbnRlbnRPYmplY3RBcnJheSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IgOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XG4gICAgICAgIH0pXG59XG5cbmZ1bmN0aW9uIGZldGNoUHJvamVjdENoaWxkcmVuKFV1aWQgOiBzdHJpbmcgfCBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBhZ2VfZGJpcy5Db250ZW50RWRnZV9TZWxlY3RDaGlsZE9mVXVpZChVdWlkKVxuICAgICAgICAudGhlbigoY29udGVudEVkZ2VPYmplY3RBcnJheTogYW55KSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjb250ZW50T2JqZWN0QXJyYXkpO1xuICAgICAgICAgICAgcHJvamVjdENvbnRlbnRFZGdlQ2hpbGRyZW4gPSBjb250ZW50RWRnZU9iamVjdEFycmF5O1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Byb2plY3RDb250ZW50RWRnZUNoaWxkcmVuID0gJywgcHJvamVjdENvbnRlbnRFZGdlQ2hpbGRyZW4pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHByb2plY3RDb250ZW50RWRnZUNoaWxkcmVuKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xuICAgICAgICB9KVxufVxuXG5mdW5jdGlvbiBhcHBlbmRDc3MoKSA6IHZvaWR7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmQocHJvamVjdENzcyk7XG59XG5cblxuZnVuY3Rpb24gcmVtb3ZlQ3NzKCkgOiB2b2lkIHtcbiAgICBwcm9qZWN0Q3NzLnJlbW92ZSgpO1xufVxuXG5cblxuXG5leHBvcnQge1xuICAgIGluaXRQcm9qZWN0cyxcbiAgICBhcHBlbmRDc3MsXG4gICAgcmVtb3ZlQ3NzLFxufSIsIi8vIGltcG9ydCAqIGFzIHNkb20gZnJvbSBcIi4vc291cmNlX2RvbVwiO1xuXG5pbXBvcnQgKiBhcyBmZXRjaGVyIGZyb20gXCIuLi9mZXRjaGVyXCI7XG5pbXBvcnQgeyBhZ2VfZGJpcyB9IGZyb20gXCIuLi9kYmktc2VuZFwiO1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tIFwiLi4vdXRpbFwiO1xuXG5cbmxldCBzaWRlUGFuZWw6IEVsZW1lbnQ7XG5cbmxldCBzb3VyY2VUaXRsZUVsZW1lbnQgOiBIVE1MRWxlbWVudDtcblxubGV0IHNvdXJjZUNoaWxkcmVuQnV0dG9uIDogSFRNTEVsZW1lbnQ7XG5sZXQgc291cmNlUHJvcGVydGllc0J1dHRvbiA6IEhUTUxFbGVtZW50O1xuXG5sZXQgc291cmNlQ29udGFpbmVyOiBFbGVtZW50O1xubGV0IHNvdXJjZUNzczogSFRNTEVsZW1lbnQ7XG5cbmxldCBzb3VyY2VDaGlsZHJlblRhYmxlOiBIVE1MVGFibGVFbGVtZW50OyBcbmxldCBwcm9qZWN0Q29udGVudEVkZ2VDaGlsZHJlbjogYW55O1xuXG5sZXQgc291cmNlUHJvcGVydGllc1RhYmxlOiBDb250ZW50T2JqZWN0SFRNTDtcblxuIFxubGV0IGN1cnJlbnRTb3VyY2VPYmplY3Q6IGFueTtcbmxldCBjdXJyZW50U291cmNlVXVpZDogYW55OyBcbmV4cG9ydCBmdW5jdGlvbiBnZXRDdXJyZW50U291cmNlT2JqZWN0KCk6IGFueSB7IHJldHVybiBzb3VyY2VQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdH07XG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFNvdXJjZVV1aWQoKTogYW55IHsgcmV0dXJuIGN1cnJlbnRTb3VyY2VVdWlkIH07XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRTb3VyY2VDb250YWluZXIoX3NpZGVQYW5lbDogRWxlbWVudCwgX3NvdXJjZU1vcmVPcHRpb25zQ29udGV4dE1lbnU6IEhUTUxEaXZFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ2luaXRTb3VyY2VDb250YWluZXIoLi4uKScpO1xuXG4gICAgc2lkZVBhbmVsID0gX3NpZGVQYW5lbDtcblxuICAgIHNvdXJjZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHNvdXJjZUNvbnRhaW5lci5pZCA9IFwiYWdlX3NvdXJjZUNvbnRhaW5lclwiO1xuICAgIHNvdXJjZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYWdlX3BhbmVsQ29udGFpbmVyXCIsIFwiY29sbGFwc2VkXCIpO1xuICAgIHNvdXJjZUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xpY2tlZFNvdXJjZUNvbnRhaW5lcik7XG4gICAgLy8gc291cmNlQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCBzb3VyY2VQcm9wZXJ0eUZvY3VzZWRPdXQpO1xuICAgIHNvdXJjZUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgZm9jdXNvdXRTb3VyY2VDb250ZW50RWRpdGFibGUpO1xuICAgIFxuXG4gICAgZmV0Y2hlci5mZXRjaEh0bWwoXCJzb3VyY2UuaHRtbFwiKVxuICAgICAgICAudGhlbihodG1sID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiSFRNTCA6IFwiLCBodG1sKVxuICAgICAgICAgICAgc291cmNlQ29udGFpbmVyLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgICAgICBzb3VyY2VUaXRsZUVsZW1lbnQgPSBzb3VyY2VDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2Vfc291cmNlVGl0bGVcIik7XG4gICAgICAgICAgICBzb3VyY2VDaGlsZHJlblRhYmxlID0gc291cmNlQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX3NvdXJjZUNoaWxkVGFibGVcIik7XG4gICAgICAgICAgICBzb3VyY2VQcm9wZXJ0aWVzVGFibGUgPSBzb3VyY2VDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2Vfc291cmNlUHJvcGVydGllc1RhYmxlXCIpO1xuXG4gICAgICAgICAgICBzb3VyY2VDaGlsZHJlbkJ1dHRvbiA9IHNvdXJjZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiI2FnZV9zb3VyY2VTZWFyY2hCdXR0b25cIik7XG4gICAgICAgICAgICBzb3VyY2VQcm9wZXJ0aWVzQnV0dG9uID0gc291cmNlQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX3NvdXJjZVByb3BlcnRpZXNCdXR0b25cIik7XG4gICAgICAgIH0pXG5cbiAgICBzb3VyY2VDc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gICAgc291cmNlQ3NzLmlkID0gXCJhZ2Vfc291cmNlU3R5bGVcIjtcbiAgICBmZXRjaGVyLmZldGNoQ3NzKFwic291cmNlLmNzc1wiKVxuICAgICAgICAudGhlbihjc3MgPT4ge1xuICAgICAgICAgICAgc291cmNlQ3NzLmlubmVyVGV4dCA9IGNzcztcbiAgICAgICAgfSlcblxuXG4gICAgc2lkZVBhbmVsLmFwcGVuZChzb3VyY2VDb250YWluZXIpO1xuXG59XG5cbi8qKiBHZW5lcmljIGZvY3Vzb3V0LWV2ZW50cyBmcm9tIGNvbnRlbnQtZWRpdGFibGUgZmllbGRzIHRoYXQgYXJlIGNhcHR1cmVkIGJ5IHRoZSBzb3VyY2UgY29udGFpbmVyLlxuICogIFJlZGlyZWN0cyB0byBzcGVjaWZpYyBmdW5jdGlvbiBkZXBlbmRpbmcgb24gaWYgaXRzIGEgc291cmNlLXNoYXJkIG9yIGEgcHJvcGVydHkgdmFsdWVcbiAqL1xuZnVuY3Rpb24gZm9jdXNvdXRTb3VyY2VDb250ZW50RWRpdGFibGUoZXZlbnQgOiBGb2N1c0V2ZW50KXtcbiAgICBsZXQgZm9jdXNvdXRUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgaWYgKGZvY3Vzb3V0VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIlRpdGxlXCIpKXtcbiAgICAgICAgZm9jdXNvdXRTb3VyY2VDaGlsZFRpdGxlKGZvY3Vzb3V0VGFyZ2V0KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZm9jdXNvdXRUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWdlX3NvdXJjZVByb3BWYWx1ZVwiKSl7XG4gICAgICAgIGZvY3Vzb3V0U291cmNlUHJvcGVydHkoZm9jdXNvdXRUYXJnZXQpO1xuICAgIH1cblxufVxuXG4vKiogR3JhYnMgdGhlIHRleHRDb250ZW50IG9mIHRhcmdldGVkIGVsZW1lbnQgYW5kIHVwZGF0ZXMgdGhlIGFzc29jaWF0ZWQgY29udGVudE9iamVjdCB1c2luZyBBUEkgKi9cbmZ1bmN0aW9uIGZvY3Vzb3V0U291cmNlQ2hpbGRUaXRsZShkYXRhRWxlbWVudCA6IEhUTUxFbGVtZW50KSB7XG4gICAgbGV0IHNvdXJjZUNoaWxkUm93ID0gZGF0YUVsZW1lbnQucGFyZW50RWxlbWVudCBhcyBDb250ZW50T2JqZWN0SFRNTDtcbiAgICBcbiAgICBzb3VyY2VDaGlsZFJvdy5jb250ZW50T2JqZWN0LmNvbnRlbnQuVGl0bGUgPSBkYXRhRWxlbWVudC50ZXh0Q29udGVudDtcblxuICAgIHV0aWwuVXVpZENoZWNrQW5kVXBkYXRlVGl0bGVzKHNvdXJjZUNoaWxkUm93LmNvbnRlbnRPYmplY3QuY29udGVudC5VdWlkLCBkYXRhRWxlbWVudC50ZXh0Q29udGVudCk7IC8vIFVwZGF0ZSB0aXRsZXMgaW4gY3VycmVudGx5IGxvYWRlZCBleHRlbnNpb25cblxuICAgIGFnZV9kYmlzLkNvbnRlbnRfVXBkYXRlV2l0aENvbnRlbnRPYmplY3Qoc291cmNlQ2hpbGRSb3cuY29udGVudE9iamVjdC5jb250ZW50KVxuICAgICAgICAudGhlbih1cGRhdGVkQ29udGVudE9iamVjdCA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlVwZGF0ZWQgc291cmNlIGNoaWxkLXJvdyA6IFwiLCB1cGRhdGVkQ29udGVudE9iamVjdClcbiAgICAgICAgfSlcblxufVxuXG4vKiogVXBkYXRlcyB0aGUgY29yZXNwb25kaW5nIGNvbnRlbnRPYmplY3QsIHNlbmRzIGl0IHRvIGRhdGFiYXNlLCBhbmQgYXNzZXJ0cyB0aGUgcmV0dXJuZWQgY29udGVudCBvYmplY3RzICovXG5mdW5jdGlvbiBmb2N1c291dFNvdXJjZVByb3BlcnR5KGZvY3Vzb3V0RWxlbWVudDogSFRNTEVsZW1lbnQpe1xuXG4gICAgLy8gY29uc29sZS5sb2coJycsIGV2ZW50LnRhcmdldC4pXG4gICAgc3dpdGNoIChmb2N1c291dEVsZW1lbnQuaWQpIHtcbiAgICAgICAgLy8gVFlQRVxuICAgICAgICBjYXNlIFwiYWdlX3NvdXJjZVByb3BUYWJsZS1UeXBlLXZhbHVlXCI6XG4gICAgICAgICAgICBzb3VyY2VQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdC5UeXBlID0gZm9jdXNvdXRFbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIFRJVExFXG4gICAgICAgIGNhc2UgXCJhZ2Vfc291cmNlUHJvcFRhYmxlLVRpdGxlLXZhbHVlXCI6XG4gICAgICAgICAgICBzb3VyY2VQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdC5UaXRsZSA9IGZvY3Vzb3V0RWxlbWVudC50ZXh0Q29udGVudDtcbiAgICAgICAgICAgIHNvdXJjZVRpdGxlRWxlbWVudC50ZXh0Q29udGVudCA9IGZvY3Vzb3V0RWxlbWVudC50ZXh0Q29udGVudDtcbiAgICAgICAgICAgIHV0aWwuVXVpZENoZWNrQW5kVXBkYXRlVGl0bGVzKGN1cnJlbnRTb3VyY2VPYmplY3QuVXVpZCwgZm9jdXNvdXRFbGVtZW50LnRleHRDb250ZW50KTsgLy8gVXBkYXRlIHRpdGxlcyBpbiBjdXJyZW50bHkgbG9hZGVkIGV4dGVuc2lvblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIEdPQUxcbiAgICAgICAgY2FzZSBcImFnZV9zb3VyY2VQcm9wVGFibGUtVXJsLXZhbHVlXCI6XG4gICAgICAgICAgICBzb3VyY2VQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdC5VcmwgPSBmb2N1c291dEVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgYWdlX2RiaXMuQ29udGVudF9VcGRhdGVXaXRoQ29udGVudE9iamVjdChzb3VyY2VQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdClcbiAgICAgICAgLnRoZW4odXBkYXRlZENvbnRlbnRPYmplY3QgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChmb2N1c291dEVsZW1lbnQuaWQpIHtcbiAgICAgICAgICAgICAgICAvLyBUWVBFXG4gICAgICAgICAgICAgICAgY2FzZSBcImFnZV9zb3VyY2VQcm9wVGFibGUtVHlwZS12YWx1ZVwiOlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmFzc2VydCh1cGRhdGVkQ29udGVudE9iamVjdC5UeXBlID09IHNvdXJjZVByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0LlR5cGUsIFwiJ1BVVCcgY29udGVudCBPYmplY3QgVHlwZSBkb2VzIG5vdCBtYXRjaCB0aGUgcHJvamVjdCB0YWJsZSAuY29udGVudE9iamVjdC5UeXBlICFcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIC8vIFRJVExFXG4gICAgICAgICAgICAgICAgY2FzZSBcImFnZV9zb3VyY2VQcm9wVGFibGUtVGl0bGUtdmFsdWVcIjpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5hc3NlcnQodXBkYXRlZENvbnRlbnRPYmplY3QuVGl0bGUgPT0gc291cmNlUHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QuVGl0bGUsIFwiJ1BVVCcgY29udGVudCBPYmplY3QgVGl0bGUgZG9lcyBub3QgbWF0Y2ggdGhlIHByb2plY3QgdGFibGUgLmNvbnRlbnRPYmplY3QuVGl0bGUgIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgLy8gR09BTFxuICAgICAgICAgICAgICAgIGNhc2UgXCJhZ2Vfc291cmNlUHJvcFRhYmxlLVVybC12YWx1ZVwiOlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmFzc2VydCh1cGRhdGVkQ29udGVudE9iamVjdC5VcmwgPT0gc291cmNlUHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QuVXJsLCBcIidQVVQnIGNvbnRlbnQgT2JqZWN0IEdvYWwgZG9lcyBub3QgbWF0Y2ggdGhlIHByb2plY3QgdGFibGUgLmNvbnRlbnRPYmplY3QuR29hbCAhXCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfSlcbiAgICAvLyBsZXQgcHJvamVjdENvbnRlbnRPYmplY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0UHJvcGVydGllc1RhYmxlXCIpIGFzIEhUTUxUYWJsZUNvbnRlbnRPYmplY3Q7XG5cbiAgICBjdXJyZW50U291cmNlT2JqZWN0ID0gc291cmNlUHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3Q7XG5cblxuICAgIFxufVxuXG4vKiogQ2FwdHVyZXMgdGhlIGNvbnRhaW5lci1jbGlja3MuIEN1cnJlbnQgcmVzcG9uc2FiaWxpdGllczpcbiAqICAxLiBUb2dnbGUgYmV0d2VlbiB0aGUgdHdvIHNvdXJjZSB0YWJsZXMuXG4gKi9cbmZ1bmN0aW9uIGNsaWNrZWRTb3VyY2VDb250YWluZXIoZXZlbnQgOiBNb3VzZUV2ZW50KXtcbiAgICBsZXQgZXZlbnRUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICBpZiAoZXZlbnRUYXJnZXQuaWQgPT09IFwiYWdlX3NvdXJjZVNlYXJjaEJ1dHRvblwiIHx8IGV2ZW50VGFyZ2V0LmlkID09PSBcImFnZV9zb3VyY2VQcm9wZXJ0aWVzQnV0dG9uXCIpe1xuICAgICAgICBkaXNwbGF5U291cmNlVGFibGUoZXZlbnRUYXJnZXQuaWQpO1xuICAgIH1cblxuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93U291cmNlQ2hpbGRyZW4oKSB7XG4gICAgc291cmNlQ2hpbGRyZW5CdXR0b24uY2xpY2soKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzaG93U291cmNlUHJvcGVydGllcygpe1xuICAgIHNvdXJjZVByb3BlcnRpZXNCdXR0b24uY2xpY2soKTtcbn1cblxuLyoqIFdpbGwgbG9hZCB0aGUgdGFibGUgYW5kIHVwZGF0ZSB0aGUgYnV0dG9uIGZvciB0aGUgY29ycmVzcG9uZGluZyBidXR0b24taWQgcHJvdmlkZWQgKi9cbmZ1bmN0aW9uIGRpc3BsYXlTb3VyY2VUYWJsZShidXR0b25JRCA6IHN0cmluZyl7XG4gICAgbGV0IGNoaWxkcmVuQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2Vfc291cmNlU2VhcmNoQnV0dG9uXCIpO1xuICAgIGxldCBwcm9wZXJ0aWVzQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2Vfc291cmNlUHJvcGVydGllc0J1dHRvblwiKTtcblxuICAgIHNvdXJjZUNoaWxkcmVuVGFibGUuY2xhc3NMaXN0LmFkZChcImFnZV9kaXNwbGF5Tm9uZVwiKTtcbiAgICBzb3VyY2VQcm9wZXJ0aWVzVGFibGUuY2xhc3NMaXN0LmFkZChcImFnZV9kaXNwbGF5Tm9uZVwiKTtcbiAgICBjaGlsZHJlbkJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWdlX3NvdXJjZUJ1dHRvbk9uXCIpO1xuICAgIHByb3BlcnRpZXNCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFnZV9zb3VyY2VCdXR0b25PblwiKTtcbiAgICBcbiAgICBpZiAoYnV0dG9uSUQgPT0gXCJhZ2Vfc291cmNlU2VhcmNoQnV0dG9uXCIpe1xuICAgICAgICBzb3VyY2VDaGlsZHJlblRhYmxlLmNsYXNzTGlzdC5yZW1vdmUoXCJhZ2VfZGlzcGxheU5vbmVcIik7XG4gICAgICAgIGNoaWxkcmVuQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJhZ2Vfc291cmNlQnV0dG9uT25cIik7XG4gICAgfVxuICAgIGVsc2UgaWYgKGJ1dHRvbklEID09IFwiYWdlX3NvdXJjZVByb3BlcnRpZXNCdXR0b25cIikge1xuICAgICAgICBzb3VyY2VQcm9wZXJ0aWVzVGFibGUuY2xhc3NMaXN0LnJlbW92ZShcImFnZV9kaXNwbGF5Tm9uZVwiKTtcbiAgICAgICAgcHJvcGVydGllc0J1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWdlX3NvdXJjZUJ1dHRvbk9uXCIpO1xuICAgIH1cblxufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkV2l0aENvbnRlbnRPYmplY3QoX2NvbnRlbnRPYmplY3QgOiBhbnkpe1xuICAgIGNvbnNvbGUubG9nKCdsb2FkaW5nIFNvdXJjZSBwYW5lbCB3aXRoICcsIF9jb250ZW50T2JqZWN0KTtcblxuICAgIGN1cnJlbnRTb3VyY2VPYmplY3QgPSBfY29udGVudE9iamVjdDtcblxuICAgIC8vIGxldCBzb3VyY2VPYmplY3QgPSBleHRlbnNpb25TdGF0ZUZyb250LmN1cnJlbnRfc291cmNlT2JqZWN0O1xuICAgIC8vIGV4dGVuc2lvblN0YXRlRnJvbnQuY3VycmVudF9zb3VyY2VVdWlkID0gc291cmNlT2JqZWN0LlV1aWQ7XG4gICAgc291cmNlUHJvcGVydGllc1RhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCBzb3VyY2VQcm9wZXJ0eUZvY3VzT3V0KVxuICAgIHNvdXJjZVByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0ID0gX2NvbnRlbnRPYmplY3Q7XG4gXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FnZV9zb3VyY2VUaXRsZScpLnRleHRDb250ZW50ID0gX2NvbnRlbnRPYmplY3QuVGl0bGU7XG5cbiAgICBsZXQgdGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdlX3NvdXJjZVByb3BlcnRpZXNUYWJsZS10Ym9keScpO1xuICAgIHRib2R5LmlubmVySFRNTCA9ICcnO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gX2NvbnRlbnRPYmplY3QpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYCR7a2V5fTogJHtzb3VyY2VPYmplY3Rba2V5XX1gKTtcbiAgICAgICAgaWYgKGtleSA9PT0gJ1R5cGUnIHx8IGtleSA9PT0gJ1RpdGxlJyB8fCBrZXkgPT09ICdVcmwnIHx8IGtleSA9PT0gJ0lBbVNvdXJjZScpIHtcblxuICAgICAgICAgICAgdGJvZHkuaW5uZXJIVE1MICs9IGBcblx0XHRcblx0XHRcdDx0cj5cblx0XHRcdFx0PHRkIGlkPWFnZV9zb3VyY2VQcm9wVGFibGUtJHtrZXl9LWtleSBjbGFzcz1cImFnZV9lbGVtZW50XCIgPiR7a2V5fTwvdGQ+XG5cdFx0XHRcdDx0ZCBpZD1hZ2Vfc291cmNlUHJvcFRhYmxlLSR7a2V5fS12YWx1ZSBjbGFzcz1cImFnZV9zb3VyY2VQcm9wVmFsdWUgYWdlX2VsZW1lbnRcIiBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCIgPiR7X2NvbnRlbnRPYmplY3Rba2V5XX08L3RkPlxuXHRcdFx0PC90cj5cblx0XHRcblx0XHRgO1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0Ym9keS5pbm5lckhUTUwgKz0gYFxuXHRcdFxuXHRcdFx0PHRyPlxuXHRcdFx0XHQ8dGQgaWQ9YWdlX3NvdXJjZVByb3BUYWJsZS0ke2tleX0ta2V5IGNsYXNzPVwiYWdlX2VsZW1lbnRcIiA+JHtrZXl9PC90ZD5cblx0XHRcdFx0PHRkIGlkPWFnZV9zb3VyY2VQcm9wVGFibGUtJHtrZXl9LXZhbHVlIGNsYXNzPVwiYWdlX3NvdXJjZVByb3BWYWx1ZSBhZ2VfZWxlbWVudFwiPiR7X2NvbnRlbnRPYmplY3Rba2V5XX08L3RkPlxuXHRcdFx0PC90cj5cblx0XHRcblx0XHRgO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvLyAvLyBjb25zb2xlLmxvZyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjYWdlX3NvdXJjZVByb3BlcnRpZXNUYWJsZSB0Ym9keSB0cicpKVxuICAgIC8vIGxldCBlZGl0YWJsZVNvdXJjZVByb3BlcnR5VGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFnZV9lZGl0YWJsZVNvdXJjZVByb3BlcnR5Jyk7XG4gICAgLy8gLy8gLy8gY29uc29sZS5sb2coZWRpdGFibGVTb3VyY2VQcm9wZXJ0eVRkKVxuICAgIC8vIGZvciAobGV0IGVkaXRhYmxlU291cmNlUHJvcGVydHlUZCBvZiBlZGl0YWJsZVNvdXJjZVByb3BlcnR5VGRzKSB7XG4gICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKGVkaXRhYmxlU291cmNlUHJvcGVydHlUZC50ZXh0Q29udGVudCk7XG4gICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKHByb3BlcnR5Um93LnRleHRDb250ZW50Lmxlbmd0aClcbiAgICAvLyAgICAgLy8gZWRpdGFibGVTb3VyY2VQcm9wZXJ0eVRkLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgcmVhZFNvdXJjZVByb3BlcnRpZXNGcm9tRG9tQW5kV3JpdGVQdXQpXG4gICAgLy8gICAgIGVkaXRhYmxlU291cmNlUHJvcGVydHlUZC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIGVkaXRhYmxlU291cmNlUHJvcGVydHlGb2N1c091dClcblxuICAgIC8vIH1cblxuICAgIGF3YWl0IGxvYWRTb3VyY2VDaGlsZHJlbihfY29udGVudE9iamVjdCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxvYWRTb3VyY2VDaGlsZHJlbihfY29udGVudE9iamVjdCA6IGFueSl7XG5cbiAgICBsZXQgY2hpbGRDb250ZW50RWRnZU9iamVjdHMgPSBhd2FpdCBhZ2VfZGJpcy5Db250ZW50RWRnZV9TZWxlY3RDaGlsZE9mVXVpZChfY29udGVudE9iamVjdC5VdWlkKTtcblxuXG5cbiAgICBsZXQgdGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdlX3NvdXJjZUNoaWxkVGFibGUtdGJvZHknKTtcbiAgICB0Ym9keS5pbm5lckhUTUwgPSAnJztcblxuICAgIGZvciAobGV0IGNoaWxkQ29udGVudEVkZ2VPYmplY3Qgb2YgY2hpbGRDb250ZW50RWRnZU9iamVjdHMpIHtcbiAgICAgICAgbGV0IHRhYmxlUm93SHRtbCA9IGBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJhZ2VfZWxlbWVudCBhZ2Vfc291cmNlQ2hpbGRUYWJsZSBUYWJsZVwiIGRhdGEtVXVpZD1cIiR7Y2hpbGRDb250ZW50RWRnZU9iamVjdC5jb250ZW50LlV1aWR9XCI+JHtjaGlsZENvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnQuVGFibGV9PC90ZD5cblx0XHRcdFx0PHRkIGNsYXNzPVwiYWdlX2VsZW1lbnQgYWdlX3NvdXJjZUNoaWxkVGFibGUgVHlwZVwiIGRhdGEtVXVpZD1cIiR7Y2hpbGRDb250ZW50RWRnZU9iamVjdC5jb250ZW50LlV1aWR9XCI+JHtjaGlsZENvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnQuVHlwZX08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImFnZV9lbGVtZW50IGFnZV9zb3VyY2VDaGlsZFRhYmxlIFRpdGxlXCIgZGF0YS1VdWlkPVwiJHtjaGlsZENvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnQuVXVpZH1cIiBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCI+JHtjaGlsZENvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnQuVGl0bGV9PC90ZD5cblxuICAgICAgICAgICAgYDtcbiAgICAgICAgXG4gICAgICAgIC8vIEJlZW4gdW5hYmxlIHRvIHR1cm4gdGhpcyBpbnRvIGEgZ29vZCBjb250ZW50IG9iZWpjdCBzbyBmYXIuIEkgbmVlZCB0byBleHRlbmQgQUxMIHBvc3NpYmxlIGh0bWwtZWxlbWVudHMgdG8gbWFrZSBnZW5lcmljIGludGVyZmFjZS4uLlxuICAgICAgICAvLyBwb3RlbnRpYWwgc29sdXRpb24gaXMgdGhlbiBIVE1MVGFibGVSb3dFbGVtZW50ICYgY29udGVudG9iamVjdCA6IGFueVxuICAgICAgICBsZXQgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpIGFzIEhUTUxUYWJsZVJvd0VsZW1lbnQ7IFxuICAgICAgICB0ci5pZCA9ICdhZ2Vfc291cmNlU2VhcmNoTm9kZS0nICsgY2hpbGRDb250ZW50RWRnZU9iamVjdC5jb250ZW50LlV1aWQ7XG4gICAgICAgIHRyLmNvbnRlbnRPYmplY3QgPSBjaGlsZENvbnRlbnRFZGdlT2JqZWN0O1xuICAgICAgICAvLyB0ci5hYWEgPSBcImFzZFwiO1xuICAgICAgICB0ci5zZXRBdHRyaWJ1dGUoJ2RhdGEtZnVjaycsICdmKmNrJyk7XG4gICAgICAgIC8vIHRyLmRhdGFzZXQuTm9kZSA9IDE7XG4gICAgICAgIC8vIHRyLmRhdGFzZXQuVXVpZCA9IGNoaWxkT2JqZWN0LlV1aWQ7XG4gICAgICAgIHRyLnNldEF0dHJpYnV0ZSgnZGF0YS1Ob2RlJywgJzEnKTtcbiAgICAgICAgdHIuc2V0QXR0cmlidXRlKCdkYXRhLVV1aWQnLCBjaGlsZENvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnQuVXVpZCk7XG4gICAgICAgIC8vIHRyLnRhYkluZGV4ID0gMTtcbiAgICAgICAgdHIuaW5uZXJIVE1MID0gdGFibGVSb3dIdG1sO1xuICAgICAgICAvLyB0ci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrU291cmNlQ2hpbGRSb3cpO1xuICAgICAgICAvLyB0ci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4geyBjb25zb2xlLmxvZyhldmVudC50YXJnZXQucGFyZW50Tm9kZS5ub2RlT2JqZWN0KSB9KTtcbiAgICAgICAgLy8gVGFyZ2V0cyBvbmx5IHRoZSBsYXN0IChpLmUuIFRpdGxlKSBjb2x1bW5cbiAgICAgICAgLy8gdHIubGFzdEVsZW1lbnRDaGlsZC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgYXN5bmMgKGV2ZW50KSA9PiB7XG5cbiAgICAgICAgLy8gICAgIGxldCB1dWlkID0gZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQubm9kZU9iamVjdC5jb250ZW50LlV1aWQ7XG4gICAgICAgIC8vICAgICBsZXQgY29udGVudE9iamVjdCA9IGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50Lm5vZGVPYmplY3QuY29udGVudDtcbiAgICAgICAgLy8gICAgIGNvbnRlbnRPYmplY3QuVGl0bGUgPSBldmVudC50YXJnZXQudGV4dENvbnRlbnQ7XG4gICAgICAgIC8vICAgICAvLyBjb25zb2xlLmxvZyhcIkNDQ0NDQ0NDQ0NcIiwgY29udGVudE9iamVjdClcbiAgICAgICAgLy8gICAgIGxldCBwdXRDb250ZW50T2JqZWN0ID0gYXdhaXQgZGJpcy5Db250ZW50X1VwZGF0ZVdpdGhDb250ZW50T2JqZWN0KGNvbnRlbnRPYmplY3QpO1xuXG4gICAgICAgIC8vICAgICBsZXQgZmV0Y2hlZENvbnRlbnRPYmplY3QgPSBhd2FpdCBkYmlzLkNvbnRlbnRfU2VsZWN0T25VdWlkKHV1aWQpO1xuXG4gICAgICAgIC8vICAgICBhd2FpdCBmZXRjaEN1cnJlbnRTb3VyY2VDaGlsZHJlblRoZW5Xcml0ZVRvU3RhdGVzKCk7XG4gICAgICAgIC8vICAgICBwb3B1bGF0ZVNvdXJjZUNoaWxkVGFibGVGcm9tU3RhdGUoKTtcblxuICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coXCJEREREREREREREXCIsIGZldGNoZWRDb250ZW50T2JqZWN0KVxuICAgICAgICAvLyAgICAgLy8gY29weVNvdXJjZUNoaWxkVGFibGVGcm9tRG9tKCk7XG5cbiAgICAgICAgLy8gICAgIC8vIHB1dEN1cnJlbnRTb3VyY2VPYmplY3QoKTtcbiAgICAgICAgLy8gICAgIC8vIGZldGNoQ3VycmVudFNvdXJjZUNoaWxkcmVuVGhlbldyaXRlVG9TdGF0ZXMoKTtcbiAgICAgICAgLy8gICAgIC8vIHBvcHVsYXRlU291cmNlQ2hpbGRUYWJsZUZyb21TdGF0ZSgpO1xuICAgICAgICAvLyB9KTtcbiAgICAgICAgLy8gdHIuY29udGVudEVkaXRhYmxlID0gJ1RydWUnO1xuXG4gICAgICAgIHRib2R5LmFwcGVuZCh0cik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRyKVxuICAgIH1cbiAgICAvLyBjb25zb2xlLnRhYmxlKGNoaWxkT2JqZWN0cylcblxufVxuXG5mdW5jdGlvbiBzb3VyY2VQcm9wZXJ0eUZvY3VzT3V0KGV2ZW50IDogRm9jdXNFdmVudCl7XG4gICAgY29uc29sZS5sb2coJ0ZPQ1VTIE9VVCBGUk9NIFNPVVJDRSBQUk9QRVJUWScpO1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb2N1c09uTGFzdENoaWxkUm93VGl0bGUoKXtcbiAgICBsZXQgdGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9zb3VyY2VDaGlsZFRhYmxlLXRib2R5XCIpIGFzIEhUTUxUYWJsZVNlY3Rpb25FbGVtZW50O1xuICAgIC8vIGNvbnNvbGUubG9nKFwidGJvZHkgPSBcIiwgdGJvZHkpXG4gICAgbGV0IGxhc3RSb3cgPSB0Ym9keS5sYXN0RWxlbWVudENoaWxkLmxhc3RFbGVtZW50Q2hpbGQgYXMgSFRNTFRhYmxlQ2VsbEVsZW1lbnQ7XG4gICAgLy8gY29uc29sZS5sb2coXCJsYXN0Um93ID0gXCIsIGxhc3RSb3cpXG5cbiAgICBpZihsYXN0Um93LnRleHRDb250ZW50Lmxlbmd0aCA9PSAwKXtcbiAgICAgICAgbGFzdFJvdy5pbm5lckhUTUwgPSBcIjxkaXY+PGJyPjwvZGl2PlwiXG4gICAgICAgIGxhc3RSb3cuZm9jdXMoKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgbGFzdFJvdy5mb2N1cygpO1xuICAgICAgICAgICAgLy8gdGhpcy5zZWxlY3Rpb25TdGFydCA9IHRoaXMuc2VsZWN0aW9uRW5kID0gdGhpcy52YWx1ZS5sZW5ndGg7XG4gICAgICAgICBcbiAgICAgICAgICAgIHZhciByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKClcbiAgICAgICAgICAgIHZhciBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKClcbiAgICAgICAgXG4gICAgICAgICAgICByYW5nZS5zZXRTdGFydChsYXN0Um93LmNoaWxkTm9kZXNbMF0sIGxhc3RSb3cuY2hpbGROb2Rlc1swXS50ZXh0Q29udGVudC5sZW5ndGgpXG4gICAgICAgICAgICByYW5nZS5jb2xsYXBzZSh0cnVlKVxuICAgICAgICBcbiAgICAgICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKVxuXG4gICAgfVxufVxuXG5cblxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ3NzKCk6IHZvaWQge1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kKHNvdXJjZUNzcyk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNzcygpOiB2b2lkIHtcbiAgICBzb3VyY2VDc3MucmVtb3ZlKCk7XG59IiwiXG5cbmV4cG9ydCBjbGFzcyBBZ2VDb250ZW50T2JqZWN0IHtcbiAgICBvYmplY3QgOiBhbnk7XG5cbiAgICBjb250ZW50RWRnZU9iamVjdDogYW55O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKF9jb250ZW50T2JqZWN0OiBhbnkpe1xuICAgICAgICB0aGlzLm9iamVjdCA9IF9jb250ZW50T2JqZWN0O1xuICAgIH1cblxuICAgIGdldFRhYmxlKCl7XG4gICAgICAgIHJldHVybiB0aGlzLm9iamVjdC5UYWJsZTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgQWdlQ29udGVudEVkZ2VPYmplY3Qge1xuICAgIGNvbnRlbnQ6IGFueTtcbiAgICBlZGdlOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihfY29udGVudEVkZ2VPYmplY3Q6IGFueSkge1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSBfY29udGVudEVkZ2VPYmplY3QuY29udGVudDtcbiAgICAgICAgdGhpcy5lZGdlID0gX2NvbnRlbnRFZGdlT2JqZWN0LmVkZ2U7XG4gICAgfVxuXG59XG5cbi8qKiBVcGRhdGVzIGFsbCBlbGVtZW50cyB0aGF0IGNvbnRhaW5zIHRoZSB0aXRsZSBvZiB0aGUgcGFzc2VkIHV1aWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBVdWlkQ2hlY2tBbmRVcGRhdGVUaXRsZXMoX3V1aWQgOiBzdHJpbmd8bnVtYmVyLCBfdGl0bGUgOiBzdHJpbmcpe1xuICAgIGxldCB1dWlkRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS11dWlkPScke191dWlkfSddYCk7XG5cbiAgICB1dWlkRWxlbWVudHMuZm9yRWFjaCgoX2VsZW1lbnQgOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcImVsZW1lbnQgPSBcIiwgX2VsZW1lbnQpXG4gICAgICAgIGlmIChfZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJUaXRsZVwiKSlcbiAgICAgICAgICAgIF9lbGVtZW50LnRleHRDb250ZW50ID0gX3RpdGxlO1xuICAgIH0pXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBvdmVybGF5IGZyb20gXCIuL292ZXJsYXlcIjtcblxuXG5sZXQgZXh0ZW5zaW9uU3RhdGVGcm9udCA9e1xuICAgIGFjdGl2ZTogZmFsc2UsXG59O1xuXG5cbi8vIFNldCB1cCBtb2R1bGVzIGFuZCBmZXRjaCBkYXRhLCBidXQgZG9lcyBub3QgcmVuZGVyIGFueXRoaW5nXG4oZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAvLyBERVYgREVWXG4gICAgLy8gTWFrZSBzdXJlIGFueSBleGlzdGluZyBvdmVybGF5cyBhcmUgcmVtb3ZlZFxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9vdmVybGF5Q29udGFpbmVyXCIpICE9PSBudWxsKVxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7IFxuICAgIFxuICAgIG92ZXJsYXkuaW5pdE92ZXJsYXkoKTsgIFxufSkoKTtcbiBcblxuXG4vKiBcbiAgICBUT0dHTEVTIFRIRSBFWFRFTlNJT04gRlJPTlRFTkQgVUlcbiovXG5icm93c2VyLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtZXNzYWdlKSA9PiB7XG4gICAgXG4gICAgaWYgKG1lc3NhZ2UubmFtZSA9PT0gJ3RvZ2dsZUV4dGVuc2lvbicpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJUb2dnbGUgRXhpdGVuc2lvbiBNZXNzYWdlIHJlY2lldmVkIVwiKVxuXG4gICAgICAgIGlmIChleHRlbnNpb25TdGF0ZUZyb250LmFjdGl2ZSl7XG4gICAgICAgICAgICBleHRlbnNpb25TdGF0ZUZyb250LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgb3ZlcmxheS5oaWRlT3ZlcmxheSgpO1xuXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXh0ZW5zaW9uU3RhdGVGcm9udC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgb3ZlcmxheS5zaG93T3ZlcmxheSgpO1xuICAgICAgICB9XG4gICAgfVxuXG59KTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9