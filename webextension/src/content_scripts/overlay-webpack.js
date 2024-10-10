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
    overlayContainer.addEventListener("keydown", contentEditableStopPropagation, false);
    overlayContainer.addEventListener("keyup", contentEditableStopPropagation, false);
    overlayContainer.addEventListener("keypress", contentEditableStopPropagation, false);
    function contentEditableStopPropagation(keyevent) {
        let activeElement = document.activeElement;
        if (activeElement.isContentEditable) {
            keyevent.stopPropagation();
        }
    }
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
		
				<td id=age_projchildTable-Table-${contentEdge.content.Uuid} class="age_element" data-Uuid=${contentEdge.content.Uuid}>${contentEdge.content.Table}</td>
				<td id=age_projchildTable-Title-${contentEdge.content.Uuid} class="age_element" data-Uuid=${contentEdge.content.Uuid}>${contentEdge.content.Title}</td>
			
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
                
                <td data-Uuid="${childObject.Uuid}" class="age_element age_projectRowSearchData">${childObject.Table}</th>
                <td data-Uuid="${childObject.Uuid}" class="age_element age_projectRowSearchData">${childObject.Title}</td>

            `;
        // let tr = document.createElement('tr');
        let tr = document.createElement('tr');
        tr.id = 'age_projectSearchRow-' + childObject.Uuid;
        tr.classList.add('age_projectSearchRow');
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
    let elementWithSameUuid = document.querySelectorAll(`[data-uuid='${currentProjectObject.Uuid}']`);
    elementWithSameUuid.forEach((_element) => {
        if (_element.classList.contains("age_element") && _element.classList.contains("age_projectSearchRow")) {
            // _element.children[1].textContent = dataElement.textContent; // update the second search column; edit: doesn't work...
        }
    });
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
    // SEARCH ROW
    if (clickTarget.classList.contains("age_projectRowSearchData")) {
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
    sourceContainer.addEventListener("focusout", sourceFocusOut);
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
function sourceFocusOut(event) {
    let focusoutTarget = event.target;
    if (focusoutTarget.classList.contains("age_sourceChildTable-Title")) {
        sourceChildTitleFocusedOut(focusoutTarget);
    }
    else if (focusoutTarget.classList.contains("age_sourcePropValue")) {
        sourcePropertyFocusedOut(focusoutTarget);
    }
    // switch (focusoutTarget.id) {
    //     case "ae-sourceChildTable-Title":
    //         sourceChildTitleFocusedOut(focusoutTarget);
    //         break;
    //     // age_sourcePropTable
    //     case "age_sourcePropTable-Title-value":
    //     case "age_sourcePropTable-Type-value":
    //     case "age_sourcePropTable-Uuid-value":
    //     case "age_sourcePropTable-IAmSource-value":
    //         sourcePropertyFocusedOut(focusoutTarget);
    //         break;
    //     default:
    //         break;
    // }
}
function sourceChildTitleFocusedOut(dataElement) {
    let sourceChildRow = dataElement.parentElement;
    // console.log('FOCUS OUT SOURCE CHILD');
    // console.log("event.target = ", event.target);
    // console.log("this = ", this);
    // console.log('dataElement.textContent = ', dataElement.textContent);
    // console.log('sourceChildRow.nodeObject.content.Title = ', sourceChildRow.nodeObject.content.Title);
    sourceChildRow.nodeObject.content.Title = dataElement.textContent;
    _dbi_send__WEBPACK_IMPORTED_MODULE_1__.age_dbis.Content_UpdateWithContentObject(sourceChildRow.nodeObject.content)
        .then(updatedContentObject => {
        // console.log("Updated source child-row : ", updatedContentObject)
    });
    // // let projectContentObject = document.getElementById("age_projectPropertiesTable") as HTMLTableContentObject;
    // console.log("sourceContentObject.contentObject = ", sourcePropertiesTable.contentObject);
}
function sourcePropertyFocusedOut(focusoutElement) {
    // console.log('FOCUS OUT PROJECT PROPERTY');
    // console.log("event.target = ", event.target);
    // console.log("this = ", this);
    // let dataElement = event.target as HTMLElement;
    // console.log('dataElement.textContent = ', focusoutElement.textContent);
    // let projectTable: HTMLTableContentObject = this;
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
    // Update Titles in the dom
    let elementWithSameUuid = document.querySelectorAll(`[data-uuid='${currentSourceObject.Uuid}']`);
    elementWithSameUuid.forEach((_element) => {
        if (_element.classList.contains("age_element") && _element.id.includes("Title"))
            _element.textContent = focusoutElement.textContent;
        // console.log('elementWithSameUuid = ', _element);
    });
}
function clickedSourceContainer(event) {
    let eventTarget = event.target;
    switch (eventTarget.id) {
        case "age_sourceSearchButton":
        case "age_sourcePropertiesButton":
            toggleSourceTables(eventTarget.id);
            break;
        case "age_sourceNewButton":
            console.log('New source button clicked');
            break;
        default:
            break;
    }
}
function showSourceChildren() {
    sourceChildrenButton.click();
}
function showSourceProperties() {
    sourcePropertiesButton.click();
}
function toggleSourceTables(buttonID) {
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
                
                <td class="age_element age_sourceChildTable-Table" data-Uuid="${childContentEdgeObject.content.Uuid}">${childContentEdgeObject.content.Table}</td>
				<td class="age_element age_sourceChildTable-Type" data-Uuid="${childContentEdgeObject.content.Uuid}">${childContentEdgeObject.content.Type}</td>
                <td class="age_element age_sourceChildTable-Title" data-Uuid="${childContentEdgeObject.content.Uuid}" contenteditable="true">${childContentEdgeObject.content.Title}</td>

            `;
            let tr = document.createElement('tr');
            tr.id = 'age_sourceSearchNode-' + childContentEdgeObject.content.Uuid;
            tr.nodeObject = childContentEdgeObject;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFTLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7SUFFOUMsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLGlCQUFpQixFQUFFLENBQUM7UUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsQ0FBQztRQUVsRCxJQUFJLG1CQUFtQixDQUFDLE1BQU0sRUFBQyxDQUFDO1lBQzVCLG1CQUFtQixDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDbkMsaURBQW1CLEVBQUUsQ0FBQztRQUcxQixDQUFDO2FBQ0csQ0FBQztZQUNELG1CQUFtQixDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbEMsaURBQW1CLEVBQUUsQ0FBQztRQUMxQixDQUFDO0lBQ0wsQ0FBQztBQUVMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc291cmNlcy8uL3dlYmV4dGVuc2lvbi93cC1kZXYvY2xpcGJvYXJkLnRzIiwid2VicGFjazovL3NvdXJjZXMvLi93ZWJleHRlbnNpb24vd3AtZGV2L2RiaS1zZW5kLnRzIiwid2VicGFjazovL3NvdXJjZXMvLi93ZWJleHRlbnNpb24vd3AtZGV2L2ZldGNoZXIudHMiLCJ3ZWJwYWNrOi8vc291cmNlcy8uL3dlYmV4dGVuc2lvbi93cC1kZXYvb3ZlcmxheS50cyIsIndlYnBhY2s6Ly9zb3VyY2VzLy4vd2ViZXh0ZW5zaW9uL3dwLWRldi9wcm9qZWN0cy9wcm9qZWN0X2RvbS50cyIsIndlYnBhY2s6Ly9zb3VyY2VzLy4vd2ViZXh0ZW5zaW9uL3dwLWRldi9wcm9qZWN0cy9wcm9qZWN0cy50cyIsIndlYnBhY2s6Ly9zb3VyY2VzLy4vd2ViZXh0ZW5zaW9uL3dwLWRldi9zb3VyY2Uvc291cmNlLnRzIiwid2VicGFjazovL3NvdXJjZXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc291cmNlcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc291cmNlcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NvdXJjZXMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zb3VyY2VzLy4vd2ViZXh0ZW5zaW9uL3dwLWRldi9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmZXRjaGVyIGZyb20gXCIuL2ZldGNoZXJcIjtcclxuaW1wb3J0ICogYXMgc291cmNlIGZyb20gXCIuL3NvdXJjZS9zb3VyY2VcIjtcclxuaW1wb3J0ICogYXMgcHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0cy9wcm9qZWN0c1wiO1xyXG5pbXBvcnQgeyBhZ2VfZGJpcyB9IGZyb20gXCIuL2RiaS1zZW5kXCI7XHJcblxyXG5sZXQgc2lkZVBhbmVsOiBFbGVtZW50O1xyXG5cclxuXHJcbmxldCBjbGlwYm9hcmRDb250YWluZXI6IEVsZW1lbnQ7XHJcbmxldCBjbGlwYm9hcmRDc3M6IEhUTUxFbGVtZW50O1xyXG5cclxuXHJcbi8vIFZBUlNcclxubGV0IHdhaXRpbmdTZWNvbmRTaGlmdCA9IDA7XHJcbmxldCB3YWl0aW5nU2Vjb25kQ3RybFNoaWZ0ID0gMDtcclxuXHJcblxyXG5sZXQgY2xpcGJvYXJkSW5uZXIgOiBIVE1MRWxlbWVudDtcclxubGV0IGNsaXBib2FyZENvZGVDaGVja2JveCA6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbmxldCBjbGlwYm9hcmRUZXh0VHlwZUlucHV0IDogSFRNTElucHV0RWxlbWVudDtcclxuXHJcbmxldCBjbGlwYm9hcmRDb25jYXRDb250ZW50cyA6IEhUTUxFbGVtZW50O1xyXG5sZXQgdGV4dENvbmNhdGVuYXRpb25DYXB0dXJpbmcgOiBib29sZWFuID0gZmFsc2U7XHJcbmxldCB0ZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnQgOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRDbGlwYm9hcmQoX3NpZGVQYW5lbDogRWxlbWVudCkge1xyXG5cdC8vIGNsaXBib2FyZENvZGVDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0b2dnbGVTZWxlY3RDb2RlKTtcclxuXHJcblx0Ly8gd3JpdGVUZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnRUb0RvbSgpO1xyXG5cclxuXHQvLyBpZiAoZXh0ZW5zaW9uU3RhdGVGcm9udC50ZXh0Q29uY2F0ZW5hdGlvbkNhcHR1cmluZykge1xyXG5cdC8vIFx0Y2xpcGJvYXJkSW5uZXIuY2xhc3NMaXN0LmFkZCgnYWdlX2FjdGl2ZUNsaXBib2FyZCcpO1xyXG5cdC8vIH1cclxuXHQvLyBlbHNlIHtcclxuXHQvLyBcdGNsaXBib2FyZElubmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FnZV9hY3RpdmVDbGlwYm9hcmQnKTtcclxuXHQvLyB9XHJcblxyXG5cdC8qIFxyXG5cdFxyXG5cdFx0XHRORVcgTkVXIE5FVyAtIDIwMjQtMTAtMDJcclxuXHRcclxuXHQqL1xyXG5cclxuXHRzaWRlUGFuZWwgPSBfc2lkZVBhbmVsO1xyXG5cclxuXHRjbGlwYm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRjbGlwYm9hcmRDb250YWluZXIuaWQgPSBcImFnZV9jbGlwYm9hcmRDb250YWluZXJcIjtcclxuXHRjbGlwYm9hcmRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImFnZV9wYW5lbENvbnRhaW5lclwiLCBcImNvbGxhcHNlZFwiKTtcclxuXHJcblxyXG5cclxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjb3B5JywgY29weUV2ZW50KVxyXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2N1dCcsIGN1dEV2ZW50KVxyXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Bhc3RlJywgcGFzdGVFdmVudClcclxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5ZG93bkFjdGl2ZUV4dGVuc2lvbilcclxuXHJcblxyXG5cdGZldGNoZXIuZmV0Y2hIdG1sKFwiY2xpcGJvYXJkLmh0bWxcIilcclxuXHRcdC50aGVuKGh0bWwgPT4ge1xyXG5cdFx0XHRjbGlwYm9hcmRDb250YWluZXIuaW5uZXJIVE1MID0gaHRtbDtcclxuXHJcblxyXG5cdFx0XHRjbGlwYm9hcmRJbm5lciA9IGNsaXBib2FyZENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiI2FnZV9jbGlwYm9hcmRJbm5lclwiKTtcclxuXHRcdFx0Y2xpcGJvYXJkQ29kZUNoZWNrYm94ID0gY2xpcGJvYXJkQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX2NsaXBib2FyZENvZGVDaGVja2JveFwiKTtcclxuXHRcdFx0Y2xpcGJvYXJkVGV4dFR5cGVJbnB1dCA9IGNsaXBib2FyZENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiI2FnZV9jbGlwYm9hcmRUZXh0VHlwZUlucHV0XCIpO1xyXG5cdFx0XHRjbGlwYm9hcmRDb25jYXRDb250ZW50cyA9IGNsaXBib2FyZENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiI2FnZV9jbGlwYm9hcmRDb25jYXRDb250ZW50XCIpO1xyXG5cdFx0fSlcclxuXHJcblx0Y2xpcGJvYXJkQ3NzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdGNsaXBib2FyZENzcy5pZCA9IFwiYWdlX2NsaXBib2FyZFN0eWxlXCI7XHJcblx0ZmV0Y2hlci5mZXRjaENzcyhcImNsaXBib2FyZC5jc3NcIilcclxuXHRcdC50aGVuKGNzcyA9PiB7XHJcblx0XHRcdGNsaXBib2FyZENzcy5pbm5lclRleHQgPSBjc3M7XHJcblx0XHR9KVxyXG5cclxuXHQvLyBjb25zb2xlLmxvZyhcInNpZGVQYW5lbC5pZCA9IFwiLCBzaWRlUGFuZWwuaWQpXHJcblxyXG5cdHNpZGVQYW5lbC5hcHBlbmQoY2xpcGJvYXJkQ29udGFpbmVyKTtcclxuXHJcbiBcclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcbi8qIFxyXG5cclxuXHRDTElQQk9BUkQgRlVOQ1RJT05TXHJcblxyXG4qL1xyXG5cclxuXHJcbmZ1bmN0aW9uIHdyaXRlVGV4dENvbmNhdGVuYXRpb25Db250ZW50VG9Eb20oKSB7XHJcblxyXG5cdGxldCBjbGlwYm9hcmRTdHJpbmcgPSB0ZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnQ7XHJcblx0bGV0IGNsaXBib2FyZElubmVySHRtbCA9ICc8ZGl2PicgKyBjbGlwYm9hcmRTdHJpbmcucmVwbGFjZSgvXFxuL2csICc8YnI+JykgKyAnPC9kaXY+JztcclxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdlX2NsaXBib2FyZENvbmNhdENvbnRlbnQnKS5pbm5lckhUTUwgPSBjbGlwYm9hcmRJbm5lckh0bWw7XHJcblxyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIHN0YXJ0Q2xpcGJvYXJkVGV4dENvbmNhdGVuYXRpb24oKSB7XHJcblxyXG5cdHRleHRDb25jYXRlbmF0aW9uQ2FwdHVyaW5nID0gdHJ1ZTtcclxuXHQvLyBleHRlbnNpb25TdGF0ZUZyb250LnRleHRDb25jYXRlbmF0aW9uQ29udGVudCA9ICcnO1xyXG5cdC8vIHdyaXRlVGV4dENvbmNhdGVuYXRpb25Db250ZW50VG9Eb20oKTtcclxuXHQvL3dyaXRlU3RhdGVGcm9tRnJvbnQoKTtcclxuXHQvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdlX2NsaXBib2FyZENvbnRhaW5lcicpLmNsYXNzTGlzdC5yZW1vdmUoJ2FnZV9kaXNwbGF5Tm9uZScpO1xyXG5cdGNsaXBib2FyZElubmVyLmNsYXNzTGlzdC5hZGQoJ2FnZV9hY3RpdmVDbGlwYm9hcmQnKTtcclxuXHRjb25zb2xlLmxvZygnc3RhcnQgdGV4dCBjb25jYXRlbnRhdGlvbiBjYXB0dXJlJyk7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTcGFjZUNoYXJhY3RlclRvQ2FwdHVyZUNvbmNhdGVuYXRpb25Db250ZW50cygpIHtcclxuXHRjb25zb2xlLmxvZygnYWRkZWQgbmV3IHNwYWNlJylcclxuXHRpZiAodGV4dENvbmNhdGVuYXRpb25DYXB0dXJpbmcpIHtcclxuXHRcdHRleHRDb25jYXRlbmF0aW9uQ29udGVudCArPSAnICc7XHJcblx0XHQvL3dyaXRlU3RhdGVGcm9tRnJvbnQoKTtcclxuXHR9XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGROZXdMaW5lVG9DYXB0dXJlQ29uY2F0ZW5hdGlvbkNvbnRlbnRzKCkge1xyXG5cdGNvbnNvbGUubG9nKCdhZGRlZCBuZXcgbGluZScpXHJcblx0aWYgKHRleHRDb25jYXRlbmF0aW9uQ2FwdHVyaW5nKSB7XHJcblx0XHR0ZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnQgKz0gJ1xcbic7XHJcblx0XHQvL3dyaXRlU3RhdGVGcm9tRnJvbnQoKTtcclxuXHR9XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBzdG9wQ2xpcGJvYXJkVGV4dENvbmNhdGVuYXRpb24oKSB7XHJcblxyXG5cclxuXHJcblx0dGV4dENvbmNhdGVuYXRpb25DYXB0dXJpbmcgPSBmYWxzZTtcclxuXHR0ZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnQgPSAnJztcclxuXHR3cml0ZVRleHRDb25jYXRlbmF0aW9uQ29udGVudFRvRG9tKCk7XHJcblx0Y2xpcGJvYXJkSW5uZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWdlX2FjdGl2ZUNsaXBib2FyZCcpO1xyXG5cdC8vd3JpdGVTdGF0ZUZyb21Gcm9udCgpO1xyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4vKiBcclxuXHJcblx0Q0xJUEJPQVJEIEVWRU5UU1xyXG5cclxuKi9cclxuXHJcbi8vIGZ1bmN0aW9uIHRvZ2dsZVNlbGVjdENvZGUoKSB7XHJcbi8vIFx0aWYgKGNsaXBib2FyZENvZGVDaGVja2JveC5jaGVja2VkKSB7XHJcbi8vIFx0XHRjbGlwYm9hcmRUZXh0VHlwZUlucHV0LmRpc2FibGVkID0gZmFsc2U7XHJcbi8vIFx0fVxyXG4vLyBcdGVsc2Uge1xyXG4vLyBcdFx0Y2xpcGJvYXJkVGV4dFR5cGVJbnB1dC5kaXNhYmxlZCA9IHRydWU7XHJcbi8vIFx0fVxyXG5cclxuLy8gfVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gcGFzdGVFdmVudChldmVudCA6IENsaXBib2FyZEV2ZW50KSB7XHJcblx0Ly8gY29uc29sZS5sb2coJ3Bhc3RlcGFzdGUnKVxyXG5cdGNvbnNvbGUubG9nKCdQQVNURSBFVkVOVCcpXHJcblx0Ly8gY29uc29sZS5sb2coZXZlbnQuY2xpcGJvYXJkRGF0YS5maWxlc1swXSlcclxuXHJcblxyXG5cdGxldCBhY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcclxuXHRpZiAoYWN0aXZlRWxlbWVudC5pc0NvbnRlbnRFZGl0YWJsZSkge1xyXG5cdFx0Ly8gY29uc29sZS5sb2coXCJDb250ZW50RWRpdGFibGUuIE5vIG5ldyBzaGFyZCFcIilcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cclxuXHRsZXQgY2xpcGJvYXJkQ29udGVudFR5cGUgPSBkZXRlcm1pbmVDbGlwYm9hcmRDb250ZW50VHlwZShldmVudC5jbGlwYm9hcmREYXRhKTtcclxuXHJcblxyXG5cdGlmIChjbGlwYm9hcmRDb250ZW50VHlwZSA9PT0gJ3RleHQnKSB7XHJcblx0XHRjb25zb2xlLmxvZygnZGVhbCB3aXRoIHRleHQnKTsgXHJcblxyXG5cdFx0bGV0IGNsaXBib2FyZFRleHQgPSAoZXZlbnQuY2xpcGJvYXJkRGF0YSAvKiB8fCB3aW5kb3cuY2xpcGJvYXJkRGF0YSAqLykuZ2V0RGF0YShcInRleHRcIik7XHJcblx0XHRjb25zb2xlLmxvZygnY2xpcGJvYXJkVGV4dCA9ICcsIGNsaXBib2FyZFRleHQpO1xyXG5cdFx0XHJcblxyXG5cdFx0aWYgKHRleHRDb25jYXRlbmF0aW9uQ2FwdHVyaW5nKSB7XHJcblxyXG5cdFx0XHR0ZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnQgKz0gY2xpcGJvYXJkVGV4dDtcclxuXHJcblx0XHRcdHdyaXRlVGV4dENvbmNhdGVuYXRpb25Db250ZW50VG9Eb20oKVxyXG5cclxuXHRcdFx0Ly93cml0ZVN0YXRlRnJvbUZyb250KCk7XHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKGV4dGVuc2lvblN0YXRlRnJvbnQudGV4dENvbmNhdGVuYXRpb25Db250ZW50KTtcclxuXHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Y29uc29sZS5sb2coJ1BBU1RFIFRPIE5FVyBTSEFSRCcpXHJcblxyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhjbGlwYm9hcmRDb2RlQ2hlY2tib3guY2hlY2tlZClcclxuXHJcblx0XHRcdGlmIChjbGlwYm9hcmRDb2RlQ2hlY2tib3guY2hlY2tlZCkge1xyXG5cdFx0XHRcdHBvc3ROZXdDb2RlT2JqZWN0VG9DdXJyZW50U291cmNlQW5kRnVsbFJlbG9hZE9mU291cmNlQ2hpbGRyZW4oY2xpcGJvYXJkVGV4dFR5cGVJbnB1dC52YWx1ZSwgY2xpcGJvYXJkVGV4dClcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRwb3N0TmV3VGV4dE5vZGVUb0N1cnJlbnRTb3VyY2VBbmRGdWxsUmVsb2FkT2ZTb3VyY2VDaGlsZHJlbihjbGlwYm9hcmRUZXh0VHlwZUlucHV0LnZhbHVlLCBjbGlwYm9hcmRUZXh0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvLyBpZiAoc2hhcmRjYXJkLmNvbnRlbnRFZGl0YWJsZSA9PT0gJ3RydWUnKSB7XHJcblx0XHQvLyBcdGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiaW5zZXJ0SFRNTFwiLCBmYWxzZSwgY2xpcGJvYXJkVGV4dCk7XHJcblx0XHQvLyBcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHQvLyB9XHJcblx0XHQvLyBlbHNlIGlmIChzaGFyZE9iamVjdC50ZXh0Q29udGVudCA9PSAnJyAmJiBzaGFyZE9iamVjdC5maWxlTmFtZSA9PSAnJykge1xyXG5cdFx0Ly8gXHRpbnNlcnRTaGFyZGNhcmRUZXh0Q29udGVudChzaGFyZGNhcmQsIGNsaXBib2FyZFRleHQpO1xyXG5cdFx0Ly8gXHQvL3NoYXJkY2FyZC5zaGFyZC5lbGVtZW50VHlwZSA9ICd0ZXh0JztcclxuXHRcdC8vIFx0dXBkYXRlU2hhcmRjYXJkVGV4dENvbnRlbnQoc2hhcmRjYXJkKTtcclxuXHRcdC8vIH1cclxuXHRcdC8vIGVsc2Uge1xyXG5cdFx0Ly8gXHRjb25zb2xlLmxvZygnVGhpcyBzb3VyY2UgYWxyZWFkeSBoYXMgY29udGVudC4gUmV0dXJuaW5nLicpO1xyXG5cclxuXHRcdC8vIH1cclxuXHJcblxyXG5cclxuXHR9XHJcblx0ZWxzZSBpZiAoY2xpcGJvYXJkQ29udGVudFR5cGUgPT09ICdmaWxlJykge1xyXG5cdFx0Y29uc29sZS5sb2coJ2RlYWwgd2l0aCBmaWxlJylcclxuXHJcblx0XHRsZXQgbmV3RmlsZSA9IGV2ZW50LmNsaXBib2FyZERhdGEuZmlsZXNbMF07XHJcblxyXG5cdFx0bGV0IGZpbGVDYXRlZ29yeU9iamVjdCA9IGRldGVybWluZUZpbGVDYXRlZ29yaWVzKG5ld0ZpbGUpO1xyXG5cdFx0Y29uc29sZS5sb2coJ2ZpbGVDYXRlZ29yeU9iamVjdDogJywgZmlsZUNhdGVnb3J5T2JqZWN0KVxyXG5cclxuXHRcdGlmIChmaWxlQ2F0ZWdvcnlPYmplY3QuZmlsZVR5cGUgPT09ICd0eXBldHlwZScpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcignRklMRSBFWFRFTlNJT04gSEFEIE5PIE1BVENISU5HIENPTlRFTlQgVFlQRScpXHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcG9zdEZpbGVRdWVyeVBhcmFtZXRlcnMgPSB7XHJcblx0XHRcdFR5cGU6IGZpbGVDYXRlZ29yeU9iamVjdC5maWxlVHlwZSxcclxuXHRcdFx0VGl0bGU6IFwiXCIsXHJcblx0XHRcdEV4dGVuc2lvbjogZmlsZUNhdGVnb3J5T2JqZWN0LmZpbGVFeHRlbnNpb24sXHJcblx0XHRcdElBbUF1dGhvcjogMCxcclxuXHRcdH1cclxuXHJcblx0XHRwb3N0TmV3RmlsZVRvQ3VycmVudFNvdXJjZUFuZEZ1bGxSZWxvYWRPZlNvdXJjZUNoaWxkcmVuKG5ld0ZpbGUsIHBvc3RGaWxlUXVlcnlQYXJhbWV0ZXJzLCBmaWxlQ2F0ZWdvcnlPYmplY3QubWltZVR5cGUpO1xyXG5cclxuXHRcdC8vIGNvbnNvbGUubG9nKG5ld0ZpbGUpXHJcblxyXG5cdFx0Ly8gY29uc29sZS5sb2coYXdhaXQgYWdlX2RiaXNXZS5maWxlR2V0KDEyMTYyNzI3OTM2MCkpO1xyXG5cclxuXHRcdC8vIGxldCBzb3VyY2VpZCA9IGV4dHJhY3RDdXJyZW50U291cmNlSWQoKTtcclxuXHJcblx0XHQvLyBpZiAoc2hhcmRPYmplY3QuZmlsZU5hbWUgPT0gJycgJiYgc2hhcmRPYmplY3QudGV4dENvbnRlbnQgPT0gJycpIHtcclxuXHRcdC8vIFx0cG9zdEZpbGUoZXZlbnQuY2xpcGJvYXJkRGF0YS5maWxlc1swXSwgc291cmNlaWQsIHNoYXJkaWQpO1xyXG5cdFx0Ly8gXHRjb25zb2xlLmxvZygnbm9ub25vJylcclxuXHRcdC8vIH1cclxuXHRcdC8vIGVsc2Uge1xyXG5cdFx0Ly8gXHRjb25zb2xlLmxvZygnVGhpcyBzb3VyY2UgYWxyZWFkeSBoYXMgY29udGVudC4gUmV0dXJuaW5nLicpO1xyXG5cdFx0Ly8gfVxyXG5cclxuXHJcblxyXG5cdH1cclxuXHJcblxyXG5cclxufVxyXG4vLyBjb25zdCBwYXNwYXMgPSBuZXcgQ2xpcGJvYXJkRXZlbnQoJ3Bhc3RlJyk7XHJcbi8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQocGFzcGFzKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBjb3B5RXZlbnQoZXZlbnQgOiBDbGlwYm9hcmRFdmVudCkge1xyXG5cclxuXHQvLyBjb25zb2xlLmxvZygnY29wY29wJylcclxuXHQvLyBjb25zb2xlLmxvZyhldmVudC5jbGlwYm9hcmREYXRhIClcclxuXHQvLyBsZXQgY2JkID0gZXZlbnQuY2xpcGJvYXJkRGF0YSB8fCB3aW5kb3cuY2xpcGJvYXJkRGF0YVxyXG5cdC8vIGxldCBjb3BpZWREYXRhID0gY2JkLmdldERhdGEoJ1RleHQnKTtcclxuXHQvLyBjb25zb2xlLmxvZygnY29waWVkRGF0YScsIGNvcGllZERhdGEpXHJcblxyXG5cdC8vIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSgge1xyXG5cdC8vIFx0Y29tbWFuZDogXCJjb3B5Y29weVwiXHJcblx0Ly8gfSk7XHJcblxyXG5cdGNvbnNvbGUubG9nKCdDT1BZRVZFTlQnKVxyXG5cclxuXHJcblx0Ly8gbmF2aWdhdG9yLmNsaXBib2FyZFxyXG5cdC8vIFx0LnJlYWQoKVxyXG5cdC8vIFx0LnRoZW4oXHJcblx0Ly8gXHRcdChjbGlwVGV4dCkgPT4gKGNvbnNvbGUubG9nKGNsaXBUZXh0KSksXHJcblx0Ly8gXHQpO1xyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gY3V0RXZlbnQoZXZlbnQgOiBLZXlib2FyZEV2ZW50KSB7XHJcblx0Y29uc29sZS5sb2coJ0NVVCBFVkVOVCcpXHJcbn1cclxuXHJcblxyXG5cclxuLyogXHJcblxyXG5cdEhFTFBFUiBGVU5DVElPTlNcclxuXHJcbiovXHJcblxyXG5cclxuXHJcblxyXG5sZXQgZGV0ZXJtaW5lQ2xpcGJvYXJkQ29udGVudFR5cGUgPSBmdW5jdGlvbiAoZXZlbnRDbGlwYm9hcmREYXRhIDogYW55KSB7XHJcblxyXG5cdGlmICh0eXBlb2YgZXZlbnRDbGlwYm9hcmREYXRhLmZpbGVzWzBdICE9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0Ly8gcG9zdEZpbGUoZGF0YUNsaXBib2FyZEV2ZW50LmZpbGVzWzBdLCBzb3VyY2VpZCwgc2hhcmRpZCk7XHJcblx0XHRyZXR1cm4gJ2ZpbGUnO1xyXG5cdH1cclxuXHRlbHNlIGlmICgoZXZlbnRDbGlwYm9hcmREYXRhIC8qIHx8IHdpbmRvdy5jbGlwYm9hcmREYXRhICovKS5nZXREYXRhKFwidGV4dFwiKSAhPT0gJycpIHtcclxuXHRcdC8vY29uc29sZS5sb2coKGV2ZW50LmNsaXBib2FyZERhdGEgfHwgd2luZG93LmNsaXBib2FyZERhdGEpLmdldERhdGEoXCJ0ZXh0XCIpKTtcclxuXHJcblx0XHRsZXQgY2xpcGJvYXJkVGV4dCA9IChldmVudENsaXBib2FyZERhdGEgLyogfHwgd2luZG93LmNsaXBib2FyZERhdGEgKi8pLmdldERhdGEoXCJ0ZXh0XCIpO1xyXG5cdFx0bGV0IGJsb2IgPSBuZXcgQmxvYihbY2xpcGJvYXJkVGV4dF0sIHsgdHlwZTogJ3RleHQvcGxhaW4nIH0pO1xyXG5cdFx0bGV0IGZpbGUgPSBuZXcgRmlsZShbYmxvYl0sIFwiY2xpcGJvYXJkLnR4dFwiLCB7IHR5cGU6IFwidGV4dC9wbGFpblwiIH0pO1xyXG5cclxuXHRcdC8vcG9zdEZpbGUoZmlsZSwgc291cmNlaWQsIHNoYXJkaWQpO1xyXG5cdFx0cmV0dXJuICd0ZXh0JztcclxuXHR9XHJcblx0ZWxzZSB7XHJcblx0XHRjb25zb2xlLmxvZygnTm8gZmlsZSBub3IgdGV4dCBkZXRlY3RlZC4nKTtcclxuXHRcdHJldHVybiAnZW1wdHknO1xyXG5cdH1cclxuXHJcblx0Ly9yZXR1cm4gJ2NsaXBib2FyZENvbnRlbnRUeXBlJztcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbmxldCBleHRlbnNpb25PYmplY3QgOiBhbnkgPSB7XHJcblx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvTWVkaWEvRm9ybWF0cy9JbWFnZV90eXBlc1xyXG5cdGltYWdlOiBbJ2FwbmcnLCAnYXZpZicsICdnaWYnLCAnYm1wJywgJ2pwZycsICdqcGVnJywgJ2pmaWYnLCAncGpwZWcnLCAncGpwJywgJ3BuZycsICdzdmcnLCAnd2VicCddLFxyXG5cdC8vIGh0dHBzOi8vd3d3LmNhbnRvLmNvbS9ibG9nL2F1ZGlvLWZpbGUtdHlwZXMvXHJcblx0YXVkaW86IFsnbTRhJywgJ2ZsYWMnLCAnbXAzJywgJ3dhdicsICd3bWEnLCAnYWFjJ10sXHJcblx0Ly8gaHR0cHM6Ly93d3cuYWRvYmUuY29tL2NyZWF0aXZlY2xvdWQvdmlkZW8vZGlzY292ZXIvYmVzdC12aWRlby1mb3JtYXQuaHRtbFxyXG5cdHZpZGVvOiBbJ21wNCcsICdtb3YnLCAnd212JywgJ2F2aScsICdBVkNIRCcsICdmbHYnLCAnZjR2JywgJ3N3ZicsICdta3YnLCAnd2VibScsICdtcGcnXSxcclxuXHRwZGY6IFsncGRmJ10sXHJcblx0ZGF0YTogWydqc29uJywgJ2NzdicsICd0c3YnLCAnZGInLCAneGxzeCcsICdvZHMnLCAnb2RiJ10sXHJcblx0Ly8gVGV4dGFyZWEgZXh0ZW5zaW9uXHJcblx0dGV4dDogWyd0eHQnLCAnbWQnXSxcclxuXHRjb2RlOiBbJ2pzJywgJ3RzJywgJ2NzcycsICdodG1sJywgJ2NzJ10sXHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gZGV0ZXJtaW5lRmlsZUNhdGVnb3JpZXMoc2VsZWN0ZWRGaWxlIDogYW55KSA6IGFueSB7XHJcblxyXG5cdGxldCBzZWxlY3RlZEZpbGVUeXBlOiBzdHJpbmcgPSBzZWxlY3RlZEZpbGUudHlwZTtcclxuXHRsZXQgZmlsZUNhdGVnb3JpZXMgPSB7XHJcblx0XHRtaW1lVHlwZTogc2VsZWN0ZWRGaWxlVHlwZSxcclxuXHRcdGJhc2VGaWxlTmFtZTogJ2Jhc2VuYW1lJyxcclxuXHRcdGZpbGVFeHRlbnNpb246ICdleHRleHQnLFxyXG5cdFx0ZmlsZVR5cGU6ICd0eXBldHlwZSdcclxuXHR9XHJcblxyXG5cclxuXHJcblx0ZmlsZUNhdGVnb3JpZXMuZmlsZUV4dGVuc2lvbiA9IGRldGVybWluZUZpbGVFeHRlbnNpb24oc2VsZWN0ZWRGaWxlKTtcclxuXHRmaWxlQ2F0ZWdvcmllcy5iYXNlRmlsZU5hbWUgPSBkZXRlcm1pbmVCYXNlRmlsZU5hbWUoc2VsZWN0ZWRGaWxlKTtcclxuXHJcblx0Ly8gZmlsZUNhdGVnb3JpZXMuZmlsZVR5cGUgPSBkZXRlcm1pbmVGaWxlVHlwZShmaWxlQ2F0ZWdvcmllcy5taW1lVHlwZSwgZmlsZUNhdGVnb3JpZXMuZmlsZUVuZGluZyk7XHJcblxyXG5cdC8vIGZpbGVDYXRlZ29yaWVzLmZpbGVUeXBlID0gT2JqZWN0LmVudHJpZXMoZXh0ZW5zaW9uT2JqZWN0KS5mb3JFYWNoKHR5cGVBcnJheSA9PiB0eXBlQXJyYXkuZmlsdGVyKGV4dGVuc2lvbiA9PiBleHRlbnNpb24gPT09IGZpbGVDYXRlZ29yaWVzLmZpbGVFeHRlbnNpb24pKVxyXG5cdGZpbGVDYXRlZ29yaWVzLmZpbGVUeXBlID0gT2JqZWN0LmtleXMoZXh0ZW5zaW9uT2JqZWN0KS5maW5kKHR5cGUgPT4gZXh0ZW5zaW9uT2JqZWN0W3R5cGVdLmluY2x1ZGVzKGZpbGVDYXRlZ29yaWVzLmZpbGVFeHRlbnNpb24pKTtcclxuXHQvLyBjb25zb2xlLmxvZyhmaWxlQ2F0ZWdvcmllcy5maWxlVHlwZSlcclxuXHQvL2NvbnNvbGUubG9nKCdmaWxlIHR5cGUgZGV0ZXJtaW5lZCBoZXJlIScpO1xyXG5cdC8vIGlmIChmaWxlQ2F0ZWdvcmllcy5maWxlRXh0ZW5zaW9uID09PSAnZGInKSB7XHJcblx0Ly8gXHQvLyBodHRwOi8vZmlsZWZvcm1hdHMuYXJjaGl2ZXRlYW0ub3JnL3dpa2kvREJfKFNRTGl0ZSlcclxuXHQvLyBcdGZpbGVDYXRlZ29yaWVzLm1pbWVUeXBlID0gJ2FwcGxpY2F0aW9uL3ZuZC5zcWxpdGUzJztcclxuXHQvLyB9XHJcblx0Y29uc29sZS5sb2coZmlsZUNhdGVnb3JpZXMubWltZVR5cGUpXHJcblx0aWYgKGZpbGVDYXRlZ29yaWVzLm1pbWVUeXBlID09ICcnKSB7XHJcblx0XHQvLyBmaWxlQ2F0ZWdvcmllcy5taW1lVHlwZSA9PSAnYXBwbGljYXRpb24vc3RyZWFtJztcclxuXHRcdGZpbGVDYXRlZ29yaWVzLm1pbWVUeXBlID0gJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSc7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gZmlsZUNhdGVnb3JpZXM7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGRldGVybWluZUZpbGVFeHRlbnNpb24oc2VsZWN0ZWRGaWxlIDogRmlsZSkge1xyXG5cclxuXHRyZXR1cm4gc2VsZWN0ZWRGaWxlLm5hbWUubWF0Y2goL1xcdyskL2cpWzBdO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gZGV0ZXJtaW5lQmFzZUZpbGVOYW1lKHNlbGVjdGVkRmlsZTogRmlsZSkge1xyXG5cclxuXHRyZXR1cm4gc2VsZWN0ZWRGaWxlLm5hbWUubWF0Y2goL14uKig/PVxcLlteLl0rJCkvKVswXTtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qIFxyXG5cclxuXHRDTElQQk9BUkQgRkVUQ0hcclxuXHJcbiovXHJcblxyXG5cclxuYXN5bmMgZnVuY3Rpb24gcG9zdE5ld1RleHROb2RlVG9DdXJyZW50U291cmNlQW5kRnVsbFJlbG9hZE9mU291cmNlQ2hpbGRyZW4odGV4dFR5cGUgOiBzdHJpbmcsIFRleHRDb250ZW50IDogc3RyaW5nKSB7XHJcblxyXG5cdGxldCBzb3VyY2VPYmplY3Q6IGFueSA9IHNvdXJjZS5nZXRDdXJyZW50U291cmNlT2JqZWN0KCk7XHJcblx0aWYoc291cmNlT2JqZWN0ID09IHVuZGVmaW5lZCl7XHJcblx0XHRjb25zb2xlLndhcm4oXCJVbmFibGUgdG8gcG9zdCBuZXcgdGV4dCBvYmplY3QuIE5vIHNlbGVjdGVkIHNvdXJjZU9iamVjdC5cIilcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0XHJcblx0Ly8gbGV0IHNvdXJjZVV1aWQgPSBzb3VyY2VPYmplY3QuVXVpZDtcclxuXHQvLyBsZXQgc291cmNlVXVpZCA9IHNvdXJjZS5nZXRDdXJyZW50U291cmNlVXVpZCgpO1xyXG5cclxuXHQvLyBsZXQgc291cmNlT2JqZWN0OiBhbnkgPSBzb3VyY2UuY3VycmVudFNvdXJjZU9iamVjdDtcclxuXHRsZXQgc291cmNlVXVpZCA9IHNvdXJjZU9iamVjdC5VdWlkO1xyXG5cclxuXHQvLyBjb25zb2xlLmxvZygncG9zdE5ld1RleHROb2RlVG9DdXJyZW50U291cmNlQW5kRnVsbFJlbG9hZE9mU291cmNlQ2hpbGRyZW4oKScpO1xyXG5cdC8vIGNvbnNvbGUubG9nKCdzb3VyY2VVdWlkID0gJywgc291cmNlVXVpZCk7XHJcblx0XHJcblx0XHJcblxyXG5cdC8vIENvbnRlbnRfSW5zZXJ0Q2hpbGRVdWlkVGFibGUoVXVpZCwgY2hpbGRUYWJsZSlcclxuXHRpZiAoc291cmNlVXVpZCAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG5cdFx0Ly8gbGV0IG5ld1RleHRPYmplY3QgPSAoYXdhaXQgYWdlX2RiaXNXZS5Db250ZW50X0luc2VydENoaWxkVXVpZFRhYmxlKGV4dGVuc2lvblN0YXRlRnJvbnQuY3VycmVudF9zb3VyY2VPYmplY3QuVXVpZCwgJ1RleHQnKSkuQ29udGVudDtcclxuXHRcdGxldCBuZXdUZXh0Q29udGVudE9iamVjdCA9IChhd2FpdCBhZ2VfZGJpcy5Db250ZW50RWRnZV9JbnNlcnRBZGphY2VudFRvVXVpZEludG9UYWJsZShzb3VyY2VVdWlkLCAxLCAnVGV4dCcsICcnLCAnJywgJy8nKSkuY29udGVudDtcclxuXHJcblx0XHQvLyBjb25zb2xlLmxvZyhuZXdUZXh0T2JqZWN0KVxyXG5cclxuXHRcdG5ld1RleHRDb250ZW50T2JqZWN0LlRpdGxlID0gVGV4dENvbnRlbnQuc3Vic3RyaW5nKDAsIDI1KTtcclxuXHRcdG5ld1RleHRDb250ZW50T2JqZWN0LlRleHRDb250ZW50ID0gVGV4dENvbnRlbnQ7XHJcblx0XHRuZXdUZXh0Q29udGVudE9iamVjdC5UeXBlID0gdGV4dFR5cGU7XHJcblxyXG5cclxuXHRcdGF3YWl0IGFnZV9kYmlzLkNvbnRlbnRfVXBkYXRlV2l0aENvbnRlbnRPYmplY3QobmV3VGV4dENvbnRlbnRPYmplY3QpO1xyXG5cdFx0XHJcblx0XHQvLyBUT0RPIFxyXG5cdFx0Ly8gVVBEQVRFIFNPVVJDRSBQQU5FTCB4MyBcclxuXHRcdC8vIGF3YWl0IGZldGNoQ3VycmVudFNvdXJjZUNoaWxkcmVuVGhlbldyaXRlVG9TdGF0ZXMoKTtcclxuXHRcdC8vIHBvcHVsYXRlU291cmNlQ2hpbGRUYWJsZUZyb21TdGF0ZSgpO1xyXG5cdFx0YXdhaXQgc291cmNlLmxvYWRXaXRoQ29udGVudE9iamVjdChzb3VyY2VPYmplY3QpO1xyXG5cdFx0c291cmNlLmZvY3VzT25MYXN0Q2hpbGRSb3dUaXRsZSgpO1xyXG5cclxuXHRcdC8vIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0Ly8gfSwgMTAwKTtcclxuXHJcblx0fVxyXG5cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gcG9zdE5ld0NvZGVPYmplY3RUb0N1cnJlbnRTb3VyY2VBbmRGdWxsUmVsb2FkT2ZTb3VyY2VDaGlsZHJlbihUeXBlOiBzdHJpbmcsIENvZGVDb250ZW50OiBzdHJpbmcpIHtcclxuXHJcblx0bGV0IHNvdXJjZU9iamVjdDogYW55ID0gc291cmNlLmdldEN1cnJlbnRTb3VyY2VPYmplY3QoKTtcclxuXHRsZXQgc291cmNlVXVpZCA9IHNvdXJjZU9iamVjdC5VdWlkO1xyXG5cclxuXHRpZiAoc291cmNlT2JqZWN0ID09IHVuZGVmaW5lZCkge1xyXG5cdFx0Y29uc29sZS53YXJuKFwiVW5hYmxlIHRvIHBvc3QgbmV3IGNvZGUgb2JqZWN0LiBObyBzZWxlY3RlZCBzb3VyY2VPYmplY3QuXCIpXHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHQvLyBDb250ZW50X0luc2VydENoaWxkVXVpZFRhYmxlKFV1aWQsIGNoaWxkVGFibGUpXHJcblx0aWYgKHNvdXJjZVV1aWQgIT09IHVuZGVmaW5lZCkge1xyXG5cclxuXHRcdC8vIGxldCBuZXdDb2RlT2JqZWN0ID0gKGF3YWl0IGFnZV9kYmlzV2UuQ29udGVudF9JbnNlcnRDaGlsZFV1aWRUYWJsZShleHRlbnNpb25TdGF0ZUZyb250LmN1cnJlbnRfc291cmNlT2JqZWN0LlV1aWQsICdDb2RlJykpLkNvbnRlbnQ7XHJcblx0XHRsZXQgbmV3Q29kZUNvbnRlbnRPYmplY3QgPSAoYXdhaXQgYWdlX2RiaXMuQ29udGVudEVkZ2VfSW5zZXJ0QWRqYWNlbnRUb1V1aWRJbnRvVGFibGUoc291cmNlVXVpZCwgMSwgJ0NvZGUnLCAnJywgJycsICcvJykpLmNvbnRlbnQ7XHJcblxyXG5cdFx0Ly8gY29uc29sZS5sb2cobmV3VGV4dE9iamVjdClcclxuXHJcblx0XHRuZXdDb2RlQ29udGVudE9iamVjdC5UaXRsZSA9IENvZGVDb250ZW50LnN1YnN0cmluZygwLCAyNSk7XHJcblx0XHRuZXdDb2RlQ29udGVudE9iamVjdC5UeXBlID0gVHlwZTtcclxuXHRcdG5ld0NvZGVDb250ZW50T2JqZWN0LkNvZGVDb250ZW50ID0gQ29kZUNvbnRlbnQ7XHJcblxyXG5cclxuXHRcdGF3YWl0IGFnZV9kYmlzLkNvbnRlbnRfVXBkYXRlV2l0aENvbnRlbnRPYmplY3QobmV3Q29kZUNvbnRlbnRPYmplY3QpO1xyXG5cclxuXHJcblx0XHRhd2FpdCBzb3VyY2UubG9hZFdpdGhDb250ZW50T2JqZWN0KHNvdXJjZU9iamVjdCk7XHJcblx0XHRzb3VyY2UuZm9jdXNPbkxhc3RDaGlsZFJvd1RpdGxlKCk7XHJcblx0fVxyXG5cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gcG9zdE5ld0ZpbGVUb0N1cnJlbnRTb3VyY2VBbmRGdWxsUmVsb2FkT2ZTb3VyY2VDaGlsZHJlbihmaWxlIDogRmlsZSAsIHF1ZXJ5UGFyYW1zIDogYW55ICwgbWltZVR5cGUgOiBzdHJpbmcpIHtcclxuXHJcblx0bGV0IHNvdXJjZU9iamVjdDogYW55ID0gc291cmNlLmdldEN1cnJlbnRTb3VyY2VPYmplY3QoKTtcclxuXHRsZXQgc291cmNlVXVpZCA9IHNvdXJjZU9iamVjdC5VdWlkO1xyXG5cclxuXHRpZiAoc291cmNlT2JqZWN0ID09IHVuZGVmaW5lZCkge1xyXG5cdFx0Y29uc29sZS53YXJuKFwiVW5hYmxlIHRvIHBvc3QgbmV3IGZpbGUuIE5vIHNlbGVjdGVkIHNvdXJjZU9iamVjdC5cIilcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdC8vIGNvbnNvbGUubG9nKHNvdXJjZVV1aWQpXHJcblxyXG5cdC8vIENvbnRlbnRfSW5zZXJ0Q2hpbGRVdWlkVGFibGUoVXVpZCwgY2hpbGRUYWJsZSlcclxuXHRpZiAoc291cmNlVXVpZCAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG5cdFx0Ly8gbGV0IG5ld0ZpbGVPYmplY3QgPSAoYXdhaXQgYWdlX2RiaXNXZS5Db250ZW50X0luc2VydENoaWxkVXVpZFRhYmxlKHNvdXJjZVV1aWQsICdGaWxlJykpLkNvbnRlbnQ7XHJcblx0XHRsZXQgbmV3RmlsZUNvbnRlbnRPYmplY3QgPSAoYXdhaXQgYWdlX2RiaXMuQ29udGVudEVkZ2VfSW5zZXJ0QWRqYWNlbnRUb1V1aWRJbnRvVGFibGUoc291cmNlVXVpZCwgMSwgJ0ZpbGUnLCAnJywgJycsICcvJykpLmNvbnRlbnQ7XHJcblxyXG5cdFx0Ly8gY29uc29sZS5sb2cobmV3VGV4dE9iamVjdClcclxuXHJcblx0XHQvLyBuZXdGaWxlT2JqZWN0LlRpdGxlID0gQ29kZUNvbnRlbnQuc3Vic3RyaW5nKDAsIDI1KTtcclxuXHRcdC8vIG5ld0ZpbGVPYmplY3QuVHlwZSA9IFR5cGU7XHJcblx0XHQvLyBuZXdGaWxlT2JqZWN0LkNvZGVDb250ZW50ID0gQ29kZUNvbnRlbnQ7XHJcblxyXG5cclxuXHRcdC8vIGF3YWl0IGFnZV9kYmlzV2UuQ29udGVudF9VcGRhdGVPbkNvbnRlbnRPYmplY3QobmV3RmlsZU9iamVjdCk7XHJcblx0XHQvLyBhd2FpdCBhZ2VfZGJpc1dlLmZpbGVQb3N0KG5ld0ZpbGVDb250ZW50T2JqZWN0LlV1aWQsIGZpbGUsIHF1ZXJ5UGFyYW1zLCBtaW1lVHlwZSk7XHJcblx0XHRhd2FpdCBhZ2VfZGJpcy5Qb3N0X0ZpbGUobmV3RmlsZUNvbnRlbnRPYmplY3QuVXVpZCwgZmlsZSwgcXVlcnlQYXJhbXMsIG1pbWVUeXBlKTtcclxuXHJcblxyXG5cdFx0Ly8gVE9ETyBVUERBVEUgVVNJTkcgTkVXIFNUUlVDVFVSRVxyXG5cdFx0Ly8gYXdhaXQgZmV0Y2hDdXJyZW50U291cmNlQ2hpbGRyZW5UaGVuV3JpdGVUb1N0YXRlcygpO1xyXG5cdFx0Ly8gcG9wdWxhdGVTb3VyY2VDaGlsZFRhYmxlRnJvbVN0YXRlKCk7XHJcblx0XHRhd2FpdCBzb3VyY2UubG9hZFdpdGhDb250ZW50T2JqZWN0KHNvdXJjZU9iamVjdCk7XHJcblx0XHRzb3VyY2UuZm9jdXNPbkxhc3RDaGlsZFJvd1RpdGxlKCk7XHJcblxyXG5cdFx0Ly8gRm9jdXMgbGFzdCByb3cgdGl0bGUgZm9yIGVhc3kgZWRpdGluZyFcclxuXHRcdC8vIGxldCBfdGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdlX3NvdXJjZUNoaWxkVGFibGUtdGJvZHknKTtcclxuXHRcdC8qIF90Ym9keS5sYXN0RWxlbWVudENoaWxkLmxhc3RFbGVtZW50Q2hpbGQuZm9jdXMoKTsgKi9cclxuXHJcblx0fVxyXG5cdGVsc2Uge1xyXG5cdFx0Y29uc29sZS5sb2coJ05vIHNsZWN0ZWQgc291cmNlLiBDb3VsZG5cInQgUE9TVCBmaWxlLicpXHJcblx0fVxyXG5cclxufVxyXG5cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGtleWRvd25BY3RpdmVFeHRlbnNpb24oa2V5RXZlbnQgOiBLZXlib2FyZEV2ZW50KSB7XHJcblxyXG5cdGxldCBhY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcclxuXHJcblx0aWYgKGFjdGl2ZUVsZW1lbnQuaXNDb250ZW50RWRpdGFibGUpIHtcclxuXHRcdC8vIGNvbnNvbGUubG9nKCdFRElUQUJMRScpXHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHRpZiAoa2V5RXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xyXG5cdFx0c3RvcENsaXBib2FyZFRleHRDb25jYXRlbmF0aW9uKCk7XHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9jbGlwYm9hcmRDb250YWluZXJcIikuY2xhc3NMaXN0LmFkZChcImNvbGxhcHNlZFwiKTtcclxuXHR9XHJcblxyXG5cclxuXHQvLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZlbnQpID0+IHsgY29uc29sZS5sb2coZXZlbnQuY29kZSkgfSkgXHJcblx0aWYgKGtleUV2ZW50LmFsdEtleSkge1xyXG5cclxuXHRcdC8vIFN3aXRjaGVkIHRvIC5jb2RlIHRvIGVuYWJsZSBleHRlbnNpb24gb24gc3dlZGlzaCBrZXlib2FyZFxyXG5cdFx0c3dpdGNoIChrZXlFdmVudC5jb2RlKSB7XHJcblx0XHRcdGNhc2UgXCJLZXlQXCI6IC8vICdwJyA9IHByaW50cyB0aGUgY3VycmVudCBwcm9qZWN0IG9iamVjdFxyXG5cdFx0XHRcdC8vIE5PVCBXT1JLSU5HIFlFVCEgVU5BQkxFIFRPIEdFVCBUSEUgVFlQSU5HIENPUlJFQ1RcclxuXHJcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coXCJ0ZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnQgPSBcIiwgdGV4dENvbmNhdGVuYXRpb25Db250ZW50KTtcclxuXHRcdFx0XHQvLyBsZXQgcHJvamVjdE9iamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3Byb2plY3RQcm9wZXJ0aWVzVGFibGVcIik7XHJcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coJ3Byb2plY3RPYmplY3QgPSAnLCBwcm9qZWN0T2JqZWN0KTtcclxuXHJcblx0XHRcdFx0XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwiS2V5UlwiOiAvLyAncicgPSByZWZyZXNoIHByb2plY3QgZGF0YVxyXG5cdFx0XHRcdHByb2plY3QucmVsb2FkQ3VycmVudFByb2plY3QoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJLZXlOXCI6IC8vICduJyA9IG5ldyBzb3VyY2VcclxuXHRcdFx0XHRwcm9qZWN0Lmluc2VydE5ld1NvdXJjZVRvQWN0aXZlUHJvamVjdCgpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcIktleU1cIjogLy8gJ20nID0gbW92ZVxyXG5cdFx0XHRcdHByb2plY3QudG9nZ2xlRXh0ZW5zaW9uTG9jYXRpb24oKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJTbGFzaFwiOiAvLyAnLycgPSBnbyB0byBzZWFyY2hcclxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0U2VhcmNoQnV0dG9uXCIpLmNsaWNrKClcclxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0U2VhcmNoSW5wdXRcIikuZm9jdXMoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJLZXlYXCI6IC8vICd4JyA9IHRvZ2dsZSB0ZXh0L2NvZGVcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZygnQWx0ICsgeCcpXHJcblx0XHRcdFx0bGV0IGNoZWNrZWQgPSBjbGlwYm9hcmRDb2RlQ2hlY2tib3guY2hlY2tlZDtcclxuXHRcdFx0XHRpZiAoY2hlY2tlZCkge1xyXG5cdFx0XHRcdFx0Y2xpcGJvYXJkQ29kZUNoZWNrYm94LmNoZWNrZWQgPSBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRjbGlwYm9hcmRDb2RlQ2hlY2tib3guY2hlY2tlZCA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRvZ2dsZVNlbGVjdENvZGUoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJCcmFja2V0TGVmdFwiOiAvLyAnWycgPSBzdGFydCB0ZXh0IGNhcHR1cmluZ1xyXG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKCdBbHQgKyBbJylcclxuXHRcdFx0XHRzdGFydENsaXBib2FyZFRleHRDb25jYXRlbmF0aW9uKCk7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfY2xpcGJvYXJkQ29udGFpbmVyXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xsYXBzZWRcIik7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiBcclxuXHRcdFx0Y2FzZSBcIkVudGVyXCI6IC8vICdFbnRlcicgPSBhZGQgbmV3IGxpbmVcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZygnQWx0ICsgRW50ZXInKVxyXG5cdFx0XHRcdGFkZE5ld0xpbmVUb0NhcHR1cmVDb25jYXRlbmF0aW9uQ29udGVudHMoKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcIk1pbnVzXCI6IC8vICctJyA9IGFkZCBuZXcgc3BhY2VcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZygnQWx0ICsgRW50ZXInKVxyXG5cdFx0XHRcdGFkZFNwYWNlQ2hhcmFjdGVyVG9DYXB0dXJlQ29uY2F0ZW5hdGlvbkNvbnRlbnRzKCk7IFxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcIkJyYWNrZXRSaWdodFwiOiAvLyAnXScgPSBzdG9wIGNvbmFjdGVuYXRpbmcgYW5kIHNlbmQgdG8gYmFja2VuZFxyXG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKCdBbHQgKyBdJylcclxuXHJcblx0XHRcdFx0aWYgKGNsaXBib2FyZENvZGVDaGVja2JveC5jaGVja2VkKSB7XHJcblx0XHRcdFx0XHRhd2FpdCBwb3N0TmV3Q29kZU9iamVjdFRvQ3VycmVudFNvdXJjZUFuZEZ1bGxSZWxvYWRPZlNvdXJjZUNoaWxkcmVuKGNsaXBib2FyZFRleHRUeXBlSW5wdXQudmFsdWUsIHRleHRDb25jYXRlbmF0aW9uQ29udGVudClcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRhd2FpdCBwb3N0TmV3VGV4dE5vZGVUb0N1cnJlbnRTb3VyY2VBbmRGdWxsUmVsb2FkT2ZTb3VyY2VDaGlsZHJlbihjbGlwYm9hcmRUZXh0VHlwZUlucHV0LnZhbHVlLCB0ZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnQpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfY2xpcGJvYXJkQ29udGFpbmVyXCIpLmNsYXNzTGlzdC5hZGQoXCJjb2xsYXBzZWRcIik7IFxyXG5cdFx0XHRcdHN0b3BDbGlwYm9hcmRUZXh0Q29uY2F0ZW5hdGlvbigpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblx0aWYgKGtleUV2ZW50LmN0cmxLZXkpIHtcclxuXHJcblx0XHRzd2l0Y2ggKGtleUV2ZW50LmtleSkge1xyXG5cdFx0XHRjYXNlICdgJzpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnQ3RybCArIGAnKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICcvJzpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnQ3RybCArIC8nKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICcuJzpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnQ3RybCArIC4nKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICcsJzpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnQ3RybCArICwnKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdcXFxcJzpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnQ3RybCArIFxcXFwnKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdcXCcnOlxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdDdHJsICsgXFwnJylcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgJzsnOlxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdDdHJsICsgOycpXHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlICdbJzpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnQ3RybCArIFsnKVxyXG5cclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgJ10nOlxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdDdHJsICsgXScpXHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlU2VsZWN0Q29kZSgpIHtcclxuXHRpZiAoY2xpcGJvYXJkQ29kZUNoZWNrYm94LmNoZWNrZWQpIHtcclxuXHRcdGNsaXBib2FyZFRleHRUeXBlSW5wdXQuZGlzYWJsZWQgPSBmYWxzZTtcclxuXHR9XHJcblx0ZWxzZSB7XHJcblx0XHRjbGlwYm9hcmRUZXh0VHlwZUlucHV0LmRpc2FibGVkID0gdHJ1ZTtcclxuXHR9XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi8vIFRoZSBBbm51bmNpYXRpb24gaXMgYW4gb2lsIHBhaW50aW5nIGJ5IHRoZSBFYXJseSBOZXRoZXJsYW5kaXNoIHBhaW50ZXIgSGFucyBNZW1saW5nLkl0IGRlcGljdHMgdGhlIEFubnVuY2lhdGlvbiwgdGhlIGFyY2hhbmdlbCBHYWJyaWVsJ3MgYW5ub3VuY2VtZW50IHRvIHRoZSBWaXJnaW4gTWFyeSB0aGF0IHNoZSB3b3VsZCBjb25jZWl2ZSBhbmQgYmVjb21lIHRoZSBtb3RoZXIgb2YgSmVzdXMsIGRlc2NyaWJlZCBpbiB0aGUgR29zcGVsIG9mIEx1a2UuIFxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ3NzKCk6IHZvaWQge1xyXG5cdGRvY3VtZW50LmhlYWQuYXBwZW5kKGNsaXBib2FyZENzcyk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQ3NzKCk6IHZvaWQge1xyXG5cdGNsaXBib2FyZENzcy5yZW1vdmUoKTtcclxufSIsIlxuXG4vLyBsZXQgYWdlX2FwaVVybCA9ICdodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL3YwMic7XG5sZXQgYWdlX2FwaVVybCA9IFwiXCI7XG5cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIHRlc3QoKSA6IHZvaWQge1xuXG4vLyBcdGNvbnNvbGUubG9nKFwiTG9hZGVkIGRiaS1zZW5kLnRzXCIpXG5cdFxuLy8gfVxuXG4vLyBBTFdBWVMgU1RBUlQgT1VUIEJZIEdSQUJCSU5HIFRIRSBBUEkgQkFTRSBVUkxcbigoKT0+e1xuXHRcblx0c2V0QXBpVXJsKCkudGhlbigoKSA9PiB7XG5cdFx0Y29uc29sZS5sb2coJ0xvYWRlZCBkYmktc2VuZC50cycpO1xuXHR9KTtcblx0XG59KSgpO1xuXG4vKipcbiAqIFx0R3JhYnMgdGhlIGJhc2UgdXJsIHN0cmluZyBmcm9tIHRoZSBsb2NhbCB3ZWJleHRlbnNpb24gc3RvcmFnZS4gXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRBcGlVcmwoKXtcblx0YnJvd3Nlci5zdG9yYWdlLmxvY2FsLmdldChcImFwaUJhc2VTdHJpbmdcIikudGhlbigob2JqZWN0KSA9PiB7XG5cdFx0YWdlX2FwaVVybCA9IG9iamVjdC5hcGlCYXNlU3RyaW5nO1xuXHRcdGNvbnNvbGUubG9nKFwiTG9hZGVkIEFQSSBCQVNFIFNUUklOR1wiKVxuXHRcdGNvbnNvbGUubG9nKFwib2JqZWN0LmFwaUJhc2VTdHJpbmcgPSBcIiwgb2JqZWN0LmFwaUJhc2VTdHJpbmcpO1xuXHR9LCBvbkxvY2FsU3RvcmFnZUVycm9yKTtcbn1cbmZ1bmN0aW9uIG9uTG9jYWxTdG9yYWdlRXJyb3IoZXJyb3I6IEVycm9yKSB7XG5cdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xufVxuXG5cblxuYnJvd3Nlci5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigocmVxdWVzdCkgOiBQcm9taXNlPGFueT4gPT4ge1xuXHRjb25zb2xlLmxvZyhcIk1lc3NhZ2UgcmVjaWV2ZWQgaW4gZGJpLXNlbmQudHMhXCIpO1xuXG5cdGlmIChyZXF1ZXN0Lm5hbWUgPT09IFwic2V0QXBpQmFzZVwiKSB7XG5cdFx0Ly8gY29uc29sZS5sb2coXCIxMTExXCIpXG5cdFx0YWdlX2FwaVVybCA9IHJlcXVlc3QuYXBpQmFzZVN0cmluZztcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgcmVzcG9uc2U6IFwiQXBpIHVwZGF0ZWQgaW4gY29udGVudCBzY3JpcHQuIFtkYmktc2VuZC5qc11cIiwgbmV3QXBpU3RyaW5nOiBhZ2VfYXBpVXJsIH0pO1xuXG5cdH1cblxuXG5cdGlmIChyZXF1ZXN0Lm5hbWUgPT09IFwiZ2V0QXBpQmFzZVwiKSB7XG5cdFx0Ly8gY29uc29sZS5sb2coXCIyMjIyXCIpXG5cdFx0XG5cdFx0Ly8gUHJvbWlzZS5yZXNvbHZlIDogc3RhdGljIG1ldGhvZCB0aGF0IHJldHVybnMgYSByZXNvbHZlZCBQcm9taXNlIG9iamVjdCB3aXRoIHRoZSBnaXZlbiB2YWx1ZVxuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoeyBhcGlTdHJpbmc6IGFnZV9hcGlVcmwgfSk7XG5cblx0fVxuXG59KTtcblxuY2xhc3MgYWdlX2RiaXMge1xuXG5cdC8qIFxuXHRcdENPTlRFTlRcblx0Ki9cblxuXHRzdGF0aWMgYXN5bmMgQ29udGVudF9JbnNlcnRPblRhYmxlKFRhYmxlTmFtZSA6IHN0cmluZykge1xuXHRcdGNvbnN0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnQvQ29udGVudC1JbnNlcnRPblRhYmxlP1RhYmxlPSR7VGFibGVOYW1lfWA7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ1BPU1QnXG5cdFx0fTtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblx0c3RhdGljIGFzeW5jIENvbnRlbnRfU2VsZWN0T25VdWlkKFV1aWQgOiBzdHJpbmcgfCBudW1iZXIpIHtcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudC9Db250ZW50LVNlbGVjdE9uVXVpZD9VdWlkPSR7VXVpZH1gO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cdHN0YXRpYyBhc3luYyBDb250ZW50X1VwZGF0ZVdpdGhDb250ZW50T2JqZWN0KGNvbnRlbnRPYmplY3QgOiBhbnkpIHtcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudC9Db250ZW50LVVwZGF0ZVdpdGhDb250ZW50T2JqZWN0YDtcblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnUFVUJyxcblx0XHRcdGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsIH0sXG5cdFx0XHRib2R5OiBKU09OLnN0cmluZ2lmeShjb250ZW50T2JqZWN0KSxcblx0XHR9O1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiRmV0Y2ggcmV0dXJuZWQgXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIiBmcm9tIFwiICsgdXJsKTtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXHRzdGF0aWMgYXN5bmMgQ29udGVudF9Ecm9wRnVsbE9uVXVpZChVdWlkIDogc3RyaW5nIHwgbnVtYmVyKSB7XG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnQvQ29udGVudC1Ecm9wRnVsbE9uVXVpZD9VdWlkPSR7VXVpZH1gO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdERUxFVEUnLFxuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cdHN0YXRpYyBhc3luYyBDb250ZW50X1NlbGVjdE9uVGl0bGVMaWtlU3RyaW5nKHNlYXJjaFN0cmluZzogc3RyaW5nLCB0YWJsZUxpbWl0OiBzdHJpbmcsIGluY2x1ZGVUYWJsZTogc3RyaW5nLCBvcmRlckNvbHVtbjogc3RyaW5nLCBkZXNjOiBzdHJpbmcpIDogUHJvbWlzZTxhbnk+IHtcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudC9Db250ZW50LVNlbGVjdE9uVGl0bGVMaWtlU3RyaW5nP3NlYXJjaFN0cmluZz0ke3NlYXJjaFN0cmluZ30mdGFibGVMaW1pdD0ke3RhYmxlTGltaXR9JmluY2x1ZGVUYWJsZT0ke2luY2x1ZGVUYWJsZX0mb3JkZXJDb2x1bW49JHtvcmRlckNvbHVtbn0mZGVzYz0ke2Rlc2N9YDtcblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnR0VUJyxcblx0XHR9O1xuXG5cdFx0XG5cdFx0dHJ5IHtcblx0XHRcdGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXHRzdGF0aWMgYXN5bmMgUmV2aWV3X0luc2VydFNjaGVkdWxlT25VdWlkKFV1aWQgOiBzdHJpbmcgfCBudW1iZXIsIHNjaGVkdWxlVHlwZSA6IHN0cmluZ3wgbnVtYmVyKSB7XG5cdFx0Y29uc3QgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudC9SZXZpZXctSW5zZXJ0U2NoZWR1bGVPblV1aWQ/VXVpZD0ke1V1aWR9JnNjaGVkdWxlVHlwZT0ke3NjaGVkdWxlVHlwZX1gO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdQT1NUJ1xuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cdHN0YXRpYyBhc3luYyBSZXZpZXdfU2VsZWN0Q3VycmVudFJldmlldygpIHtcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudC9SZXZpZXctU2VsZWN0Q3VycmVudFJldmlld2A7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0fTtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxuXG5cblxuXG5cdC8qIFxuXHRcdFx0Q09OVEVOVCBFREdFXG5cdCovXG5cdHN0YXRpYyBhc3luYyBDb250ZW50RWRnZV9JbnNlcnRBZGphY2VudFRvVXVpZEludG9UYWJsZShVdWlkOiBzdHJpbmcgfCBudW1iZXIsIERpcmVjdGVkOiBzdHJpbmcgfCBudW1iZXIsIFRhYmxlOiBzdHJpbmcsIFR5cGU6IHN0cmluZywgT3JkZXI6IHN0cmluZyB8IG51bWJlciwgUGF0aDogc3RyaW5nKSB7XG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnRlZGdlL0NvbnRlbnRFZGdlLUluc2VydEFkamFjZW50VG9VdWlkSW50b1RhYmxlP1V1aWQ9JHtVdWlkfSZEaXJlY3RlZD0ke0RpcmVjdGVkfSZUYWJsZT0ke1RhYmxlfSZUeXBlPSR7VHlwZX0mT3JkZXI9JHtPcmRlcn0mUGF0aD0ke1BhdGh9YDtcblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0fTtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblx0c3RhdGljIGFzeW5jIENvbnRlbnRFZGdlX1NlbGVjdENoaWxkT2ZVdWlkKFV1aWQgOiBzdHJpbmcgfCBudW1iZXIpIHtcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudGVkZ2UvQ29udGVudEVkZ2UtU2VsZWN0Q2hpbGRPZlV1aWQ/VXVpZD0ke1V1aWR9YDtcblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnR0VUJyxcblx0XHR9O1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiRmV0Y2ggcmV0dXJuZWQgXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIiBmcm9tIFwiICsgdXJsKTtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGFzeW5jIENvbnRlbnRFZGdlX1NlbGVjdFBhcmVudE9mVXVpZChVdWlkIDogc3RyaW5nIHwgbnVtYmVyKSB7XG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnRlZGdlL0NvbnRlbnRFZGdlLVNlbGVjdFBhcmVudE9mVXVpZD9VdWlkPSR7VXVpZH1gO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cdHN0YXRpYyBhc3luYyBDb250ZW50RWRnZV9TZWxlY3RVbmRpcmVjdGVkT2ZVdWlkKFV1aWQgOiBzdHJpbmcgfCBudW1iZXIpIHtcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudGVkZ2UvQ29udGVudEVkZ2UtU2VsZWN0VW5kaXJlY3RlZE9mVXVpZD9VdWlkPSR7VXVpZH1gO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cdHN0YXRpYyBhc3luYyBDb250ZW50RWRnZV9TZWxlY3RBZGphY2VudE9mVXVpZChVdWlkIDogc3RyaW5nIHwgbnVtYmVyKSB7XG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnRlZGdlL0NvbnRlbnRFZGdlLVNlbGVjdEFkamFjZW50T2ZVdWlkP1V1aWQ9JHtVdWlkfWA7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0fTtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxuXG5cblxuXHQvKiBcblx0XHRcdFx0RklMRVNcblx0Ki9cblxuXHRzdGF0aWMgYXN5bmMgUG9zdF9GaWxlKFV1aWQ6IHN0cmluZyB8IG51bWJlciwgZmlsZTogRmlsZSwgcXVlcnlQYXJhbXM6IHN0cmluZywgbWltZVR5cGU6IHN0cmluZykge1xuXG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2ZpbGUvJHtVdWlkfT9gO1xuXHRcdC8vIGNvbnNvbGUubG9nKHVybClcblxuXG5cdFx0Zm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMocXVlcnlQYXJhbXMpKSB7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhgJHtrZXl9OiAke3ZhbHVlfWApO1xuXHRcdFx0dXJsICs9IGAke2tleX09JHt2YWx1ZX0mYDtcblx0XHRcdC8vIGJvZHlBcnJheS5wdXNoKHZhbHVlKTtcblx0XHR9XG5cdFx0dXJsID0gdXJsLnNsaWNlKDAsIC0xKTtcblxuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XCJDb250ZW50LVR5cGVcIjogbWltZVR5cGUsXG5cdFx0XHR9LFxuXHRcdFx0Ym9keTogZmlsZSxcblx0XHR9O1xuXHRcdC8vIGNvbnNvbGUubG9nKG9wdGlvbnMpXG5cdFx0Ly8gY29uc29sZS5sb2codXJsKVxuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdHJldHVybiBkYXRhO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignRkFJTEVEIFBPU1QgRlJPTTogUG9zdF9GaWxlIGluIGRiaXMnKVxuXHRcdFx0fVxuXHRcdFx0Ly8gY29uc29sZS50YWJsZShkYXRhKTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Ly8gY29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxuXG5cblx0c3RhdGljIGFzeW5jIEdldF9GaWxlKFV1aWQ6IHN0cmluZyB8IG51bWJlcik6IFByb21pc2U8RmlsZSB8IGFueVtdPiB7XG5cblx0XHRjb25zdCB1cmwgPSBhZ2VfYXBpVXJsICsgYC9maWxlL2AgKyBVdWlkO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7IG1ldGhvZDogJ0dFVCcgfTtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHQvLyBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gY29uc29sZS5sb2cocmVzcG9uc2UuYm9keSkgXG5cdFx0XHRsZXQgYmxvYiA9IGF3YWl0IHJlc3BvbnNlLmJsb2IoKVxuXHRcdFx0bGV0IGNvbnRlbnRUeXBlID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpO1xuXHRcdFx0bGV0IGV4dGVuc2lvbiA9IGNvbnRlbnRUeXBlLnNwbGl0KCcvJylbMV07XG5cdFx0XHQvLyBjb25zb2xlLmxvZygnRklMRUZJTEU6JywgcmVzcG9uc2UuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKVxuXHRcdFx0bGV0IGZpbGUgPSBhd2FpdCBuZXcgRmlsZShbYmxvYl0sIGAke1V1aWR9LiR7ZXh0ZW5zaW9ufWApXG5cdFx0XHRyZXR1cm4gZmlsZTtcblx0XHRcdC8vIC50aGVuKGJsb2IgPT4gbmV3IEZpbGUoW2Jsb2JdLCAndGVzdGZpbGVuYW1lLmZpbGUnKSlcblx0XHRcdC8vIC50aGVuKGZpbGUgPT4gZmlsZSlcblx0XHRcdC8vIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSlcblx0XHRcdC8vIC50aGVuKGZpbGUgPT4gVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKSlcblx0XHRcdC8vIC50aGVuKGZpbGUgPT4gVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKSlcblx0XHRcdC8vIC50aGVuKGZpbGVVcmwgPT4gd2luZG93Lm9wZW4oZmlsZVVybCwgJ19ibGFuaycpKVxuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXG5cblxuXG5cdHN0YXRpYyBhc3luYyBQdXRfRmlsZShVdWlkOiBzdHJpbmcgfCBudW1iZXIsIGZpbGU6IEZpbGUsIHF1ZXJ5UGFyYW1zOiBzdHJpbmcsIG1pbWVUeXBlOiBzdHJpbmcpIHtcblxuXHRcdGxldCB1cmwgPSBhZ2VfYXBpVXJsICsgYC9maWxlLyR7VXVpZH0/YDtcblx0XHQvLyBjb25zb2xlLmxvZyh1cmwpXG5cblxuXHRcdGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHF1ZXJ5UGFyYW1zKSkge1xuXHRcdFx0Ly8gY29uc29sZS5sb2coYCR7a2V5fTogJHt2YWx1ZX1gKTtcblx0XHRcdHVybCArPSBgJHtrZXl9PSR7dmFsdWV9JmA7XG5cdFx0XHQvLyBib2R5QXJyYXkucHVzaCh2YWx1ZSk7XG5cdFx0fVxuXHRcdHVybCA9IHVybC5zbGljZSgwLCAtMSk7XG5cblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFwiQ29udGVudC1UeXBlXCI6IG1pbWVUeXBlLFxuXHRcdFx0fSxcblx0XHRcdGJvZHk6IGZpbGUsXG5cdFx0fTtcblx0XHQvLyBjb25zb2xlLmxvZyhvcHRpb25zKVxuXHRcdC8vIGNvbnNvbGUubG9nKHVybClcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRpZiAocmVzcG9uc2Uub2spIHtcblx0XHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdGQUlMRUQgUFVUIEZST006IFB1dF9GaWxlIGluIGRiaXMnKVxuXHRcdFx0fVxuXHRcdFx0Ly8gY29uc29sZS50YWJsZShkYXRhKTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Ly8gY29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxuXG5cblx0c3RhdGljIGFzeW5jIERlbGV0ZV9GaWxlKFV1aWQgOiBzdHJpbmcgfCBudW1iZXIpIHtcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvZmlsZS8ke1V1aWR9YDtcblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnREVMRVRFJyxcblx0XHR9O1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiRmV0Y2ggcmV0dXJuZWQgXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIiBmcm9tIFwiICsgdXJsKTtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cblxuXG59O1xuXG5leHBvcnQge1xuXHRhZ2VfZGJpcyxcbn0iLCJcbi8vIGltcG9ydCB7IHRlc3QgfSBmcm9tIFwiLi9kYmktc2VuZFwiXG4vLyB0ZXN0KCk7XG5cblxuXG5jb25zdCBodG1sRm9sZGVyID0gJ2h0bWwvJztcbmNvbnN0IGNzc0ZvbGRlciA9ICdjc3MvJztcblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBmZXRjaEh0bWwoZmlsZW5hbWUgOiBzdHJpbmcpIDogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBcbiAgICAgICAgbGV0IHVybCA9IGJyb3dzZXIucnVudGltZS5nZXRVUkwoXG4gICAgICAgICAgICBodG1sRm9sZGVyICsgZmlsZW5hbWVcbiAgICAgICAgKTtcblxuICAgICAgICAvLyB0aGlzIGlzIHRoIGVwcm9taXNlIHRoYXQgd2UgcmV0dXJuIGFuZCBsZXR0aW5nIHRoZSBmZXRjaCBmdW5jdGlvbiBoYW5kbGUgcmVzb2x2aW5nIHRoZSBwcm9taXNlXG4gICAgICAgIHJldHVybiBmZXRjaCh1cmwpXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpXG4gICAgICAgICAgICAudGhlbih0ZXh0ID0+IHRleHQpXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gXCJFcnJvciBpbiAnZmV0Y2hIdG1sJy4gRmlsZTogIGZldGNoZXIudHMgXCIpXG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoQ3NzKGZpbGVuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuXG4gICAgbGV0IHVybCA9IGJyb3dzZXIucnVudGltZS5nZXRVUkwoXG4gICAgICAgIGNzc0ZvbGRlciArIGZpbGVuYW1lXG4gICAgKTtcblxuICAgIC8vIHRoaXMgaXMgdGggZXByb21pc2UgdGhhdCB3ZSByZXR1cm4gYW5kIGxldHRpbmcgdGhlIGZldGNoIGZ1bmN0aW9uIGhhbmRsZSByZXNvbHZpbmcgdGhlIHByb21pc2VcbiAgICByZXR1cm4gZmV0Y2godXJsKVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpXG4gICAgICAgIC50aGVuKHRleHQgPT4gdGV4dClcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IFwiRXJyb3IgaW4gJ2ZldGNoQ3NzJy4gRmlsZTogZmV0Y2hlci50c1wiKVxufVxuXG5cbnR5cGUgVGZldGNoZXIgPSB7XG4gICAgZmV0Y2hIdG1sIDogUHJvbWlzZTxzdHJpbmc+XG59XG5cbmV4cG9ydCB0eXBlIHtcbiAgICBUZmV0Y2hlclxufTtcblxuLy8gZXhwb3J0IHtcbi8vICAgICBmZXRjaEh0bWwgOiBcbi8vIH1cblxuIiwiaW1wb3J0ICogYXMgZmV0Y2hlciBmcm9tIFwiLi9mZXRjaGVyXCI7XG5pbXBvcnQgKiBhcyBwcm9qZWN0cyBmcm9tIFwiLi9wcm9qZWN0cy9wcm9qZWN0c1wiO1xuaW1wb3J0ICogYXMgc291cmNlIGZyb20gXCIuL3NvdXJjZS9zb3VyY2VcIjtcbmltcG9ydCAqIGFzIGNsaXBib2FyZCBmcm9tIFwiLi9jbGlwYm9hcmRcIjtcblxuaW1wb3J0IHsgSFRNTFByb2plY3RDaGlsZFJvdyB9IGZyb20gXCIuL3Byb2plY3RzL3Byb2plY3RfZG9tXCI7XG5cbi8vIGltcG9ydCB7IGFnZV9kYmlzIH0gZnJvbSBcIi4vZGJpLXNlbmRcIjtcblxubGV0IG92ZXJsYXlDb250YWluZXIgOiBFbGVtZW50O1xubGV0IG92ZXJsYXlDc3M6IEhUTUxFbGVtZW50O1xuXG5sZXQgdGFibGVDc3M6IEhUTUxFbGVtZW50O1xuXG4vLyBvdGhlciBjYWNoZWQgZWxlbWVudHNcbmxldCBjb250ZXh0T3ZlcmxheTogRWxlbWVudDtcblxubGV0IHNpZGVQYW5lbDogRWxlbWVudDtcblxuXG5mdW5jdGlvbiBpbml0T3ZlcmxheSgpIDogdm9pZHtcbiAgICBjb25zb2xlLmxvZygnT1ZFUkxBWSBUUyBJTklUJyk7IFxuXG4gICAgb3ZlcmxheUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG92ZXJsYXlDb250YWluZXIuaWQgPSBcImFnZV9vdmVybGF5Q29udGFpbmVyXCI7IFxuICAgIG92ZXJsYXlDb250YWluZXIuc2V0QXR0cmlidXRlKFwic3BlbGxjaGVja1wiLFwiZmFsc2VcIik7XG5cbiAgICBvdmVybGF5Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBleHRlbnNpb25DbGlja0hhbmRsZXIpO1xuICAgIG92ZXJsYXlDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzaW5cIiwgb3ZlcmxheUZvY3VzaW4pO1xuXG4gICAgLy8gUHJldmVudHMga2V5c3Ryb2tlcyBvbiBjZXJ0YWluIHdlYnNpdGVzIGZyb20gcmVnaXN0cmluZyB3aGVuIHdyaXRpbmcgaW4gdGhlIG92ZXJsYXkgLSB0ZXN0ZWQgb24geW91dHViZSBzaG9ydHMgLSBzcGFjZSBub3Qgd29ya2luZyBvbiByZWd1bGFyIHlvdXR1YmVcbiAgICAvLyBNYXliZSBhIGJpdCB0b28gbXVjaCB0byBoYXZlIGxpc3RlbmluZyBhdCBhbGwgdGltZXMhIEJVVCBJIHNpbXBseSBuZWVkIHRoaXMgdG8gd29yayBmb3Igbm93Li5cbiAgICBvdmVybGF5Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGNvbnRlbnRFZGl0YWJsZVN0b3BQcm9wYWdhdGlvbiwgZmFsc2UpO1xuICAgIG92ZXJsYXlDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGNvbnRlbnRFZGl0YWJsZVN0b3BQcm9wYWdhdGlvbiwgZmFsc2UpO1xuICAgIG92ZXJsYXlDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIGNvbnRlbnRFZGl0YWJsZVN0b3BQcm9wYWdhdGlvbiwgZmFsc2UpO1xuICAgIGZ1bmN0aW9uIGNvbnRlbnRFZGl0YWJsZVN0b3BQcm9wYWdhdGlvbihrZXlldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBsZXQgYWN0aXZlRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGlmIChhY3RpdmVFbGVtZW50LmlzQ29udGVudEVkaXRhYmxlKSB7XG4gICAgICAgICAgICBrZXlldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcblxuICAgIG92ZXJsYXlDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRzb3VyY2VcIiwgKGV2ZW50IDogQ3VzdG9tRXZlbnQpID0+IHtcbiAgICAgICAgc291cmNlLmxvYWRXaXRoQ29udGVudE9iamVjdChldmVudC5kZXRhaWwuY29udGVudE9iamVjdCk7XG4gICAgfSk7XG4gICAgb3ZlcmxheUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibmV3c291cmNlXCIsIChldmVudDogQ3VzdG9tRXZlbnQpID0+IHtcbiAgICAgICAgc291cmNlLmxvYWRXaXRoQ29udGVudE9iamVjdChldmVudC5kZXRhaWwuY29udGVudE9iamVjdCk7XG4gICAgICAgIHNvdXJjZS5zaG93U291cmNlUHJvcGVydGllcygpOyAvLyBNYWtlIHN1cmUgd2UgZ28gdG8gdGhlIHByb3BlcnRpZXMgdGFiIHdoZW4gY3JhdGluZyBhIG5ldyBzb3VyY2UhXG4gICAgfSk7XG5cbiAgICBvdmVybGF5Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJuZXdwcm9qZWN0XCIsIChldmVudDogQ3VzdG9tRXZlbnQpID0+IHt9KTtcbiAgICBvdmVybGF5Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJyZWZyZXNoZXh0ZW5zaW9uXCIsIChldmVudDogQ3VzdG9tRXZlbnQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJSZWZyZXNoIGV4dGVuc2lvblwiKTtcbiAgICAgICAgcHJvamVjdHMucmVsb2FkQ3VycmVudFByb2plY3QoKTtcbiAgICB9KTtcblxuXG4gICAgZmV0Y2hlci5mZXRjaEh0bWwoXCJvdmVybGF5Lmh0bWxcIilcbiAgICAgICAgLnRoZW4oaHRtbCA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkhUTUwgOiBcIiwgaHRtbClcbiAgICAgICAgICAgIG92ZXJsYXlDb250YWluZXIuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgICAgIGNvbnRleHRPdmVybGF5ID0gb3ZlcmxheUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiI2FnZV9jb250ZXh0T3ZlcmxheVwiKTtcbiAgICAgICAgICAgIC8vIGNvbnRleHRPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoaWRlQ29udGV4dE1lbnVzKTtcbiAgICAgICAgICAgIHNpZGVQYW5lbCA9IG92ZXJsYXlDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2Vfb3ZlcmxheVJpZ2h0UGFuZWxcIik7XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcHJvamVjdHMuaW5pdFByb2plY3RzKHNpZGVQYW5lbCwgY29udGV4dE92ZXJsYXkucXVlcnlTZWxlY3RvcihcIiNhZ2VfbW9yZVByb2plY3RPcHRpb25zQ29udGV4dE1lbnVcIikpOyAvLyBQYXNzIHRoZSBjb250ZXh0IG1lbnUhXG4gICAgICAgICAgICBzb3VyY2UuaW5pdFNvdXJjZUNvbnRhaW5lcihzaWRlUGFuZWwsIGNvbnRleHRPdmVybGF5LnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX21vcmVTb3VyY2VPcHRpb25zQ29udGV4dE1lbnVcIikpOyAvLyBQYXNzIHRoZSBjb250ZXh0IG1lbnUhXG4gICAgICAgICAgICBjbGlwYm9hcmQuaW5pdENsaXBib2FyZChzaWRlUGFuZWwpO1xuICAgICAgICB9KVxuXG4gICAgb3ZlcmxheUNzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgICBvdmVybGF5Q3NzLmlkID0gXCJhZ2Vfb3ZlcmxheVN0eWxlXCI7XG4gICAgZmV0Y2hlci5mZXRjaENzcyhcIm92ZXJsYXkuY3NzXCIpXG4gICAgLnRoZW4oY3NzID0+IHtcbiAgICAgICAgb3ZlcmxheUNzcy5pbm5lclRleHQgPSBjc3M7XG4gICAgfSlcblxuICAgIHRhYmxlQ3NzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgIHRhYmxlQ3NzLmlkID0gXCJhZ2VfdGFibGVTdHlsZVwiO1xuICAgIGZldGNoZXIuZmV0Y2hDc3MoXCJ0YWJsZXMuY3NzXCIpIFxuICAgICAgICAudGhlbihjc3MgPT4ge1xuICAgICAgICAgICAgdGFibGVDc3MuaW5uZXJUZXh0ID0gY3NzO1xuICAgICAgICB9KVxuXG59XG5cblxuLy8gbWFrZSBzdXJlIHRoYXQgZW1wdHkgZWxlbWVudCBhcmUgcG9wdWxhdGVkIHdpdGggZGVmYXVsdCBlZGl0YWJsZSBlbGVtZW50c1xuZnVuY3Rpb24gb3ZlcmxheUZvY3VzaW4oZXZlbnQ6IEZvY3VzRXZlbnQpOiB2b2lkIHtcbiAgICBsZXQgZXZlbnRUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICBpZiAoZXZlbnRUYXJnZXQuaXNDb250ZW50RWRpdGFibGUgJiYgZXZlbnRUYXJnZXQudGV4dENvbnRlbnQgPT0gXCJcIikge1xuICAgICAgICAvLyBldmVudFRhcmdldC5pbm5lckhUTUwgPSBcIjxkaXY+PC9kaXY+PGJyPlwiOyAvLyBub3Qgd29ya2luZy4uIE1heWJlIGlmIEkgaGF2ZSB0ZXh0IG5vdCBjZW50ZXJlZCBpbiBlbG1lZW50Li5cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGV4dGVuc2lvbkNsaWNrSGFuZGxlcihldmVudCA6IE1vdXNlRXZlbnQpe1xuXG4gICAgbGV0IGV2ZW50VGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgIC8vIGNvbnNvbGUubG9nKCdfXl9eX15fXl9eX14nLCBldmVudFRhcmdldC5pZCk7XG4gICAgXG4gICAgLyogXG4gICAgICAgIE5PVEU6IFRISVMgSEFTIEJFRU4gTU9WRUQgVE8gSVRTIE9XTiBFVkVOVCFcbiAgICAqL1xuICAgIC8vIGlmIChldmVudFRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImFnZV9wcm9qY2hpbGRUYWJsZVJvd1wiKSl7XG4gICAgLy8gICAgIGxldCBwcm9qZWN0Q2hpbGRSb3cgPSBldmVudFRhcmdldC5wYXJlbnRFbGVtZW50IGFzIEhUTUxQcm9qZWN0Q2hpbGRSb3c7XG4gICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKCdDbGlja2VkIG9uIGNoaWxkIHJvdyB3aXRoIHV1aWQgPSAnLCBwcm9qZWN0Q2hpbGRSb3cuQ29udGVudEVkZ2VPYmplY3QuY29udGVudC5VdWlkKTtcbiAgICAvLyAgICAgY29uc29sZS5sb2coXCJUT0RPOiBMT0FEIENMSUNLRUQgU09VUkNFUyEgXCIsIHByb2plY3RDaGlsZFJvdy5Db250ZW50RWRnZU9iamVjdC5jb250ZW50KTtcbiAgICAgICAgXG4gICAgLy8gfVxufVxuXG5cbmZ1bmN0aW9uIHNob3dPdmVybGF5KCkgOiB2b2lke1xuICAgIGRvY3VtZW50LmJvZHkubGFzdEVsZW1lbnRDaGlsZC5hZnRlcihvdmVybGF5Q29udGFpbmVyKTtcblxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kKG92ZXJsYXlDc3MpO1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kKHRhYmxlQ3NzKTtcbiAgICBwcm9qZWN0cy5hcHBlbmRDc3MoKTtcbiAgICBzb3VyY2UuYXBwZW5kQ3NzKCk7XG4gICAgY2xpcGJvYXJkLmFwcGVuZENzcygpO1xuICAgIC8vIGZldGNoZXIuZmV0Y2hIdG1sKFwib3ZlcmxheS5odG1sXCIpXG4gICAgLy8gICAgIC50aGVuKGh0bWwgPT4gb3ZlcmxheUNvbnRhaW5lci5pbm5lckh0bWwgPSBodG1sKVxufVxuXG5cbmZ1bmN0aW9uIGhpZGVPdmVybGF5KCkgOiB2b2lkIHtcbiAgICBvdmVybGF5Q29udGFpbmVyLnJlbW92ZSgpO1xuICAgIG92ZXJsYXlDc3MucmVtb3ZlKCk7XG5cbiAgICB0YWJsZUNzcy5yZW1vdmUoKTtcblxuICAgIHByb2plY3RzLnJlbW92ZUNzcygpO1xuICAgIHNvdXJjZS5yZW1vdmVDc3MoKTtcbiAgICBjbGlwYm9hcmQucmVtb3ZlQ3NzKCk7XG59XG5cblxuXG5cbmV4cG9ydCB7XG4gICAgaW5pdE92ZXJsYXksXG4gICAgc2hvd092ZXJsYXksXG4gICAgaGlkZU92ZXJsYXksXG59IiwiXG5pbXBvcnQgeyBhZ2VfZGJpcyB9IGZyb20gXCIuLi9kYmktc2VuZFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEhUTUxQcm9qZWN0VGFibGVSb3cgZXh0ZW5kcyBIVE1MVGFibGVSb3dFbGVtZW50IHtcbiAgICBub2RlT2JqZWN0OiBhbnk7XG59XG5leHBvcnQgaW50ZXJmYWNlIEhUTUxUYWJsZUNvbnRlbnRPYmplY3QgZXh0ZW5kcyBIVE1MVGFibGVFbGVtZW50IHtcbiAgICBjb250ZW50T2JqZWN0OiBhbnk7XG59XG5leHBvcnQgaW50ZXJmYWNlIEhUTUxQcm9qZWN0Q2hpbGRSb3cgZXh0ZW5kcyBIVE1MVGFibGVSb3dFbGVtZW50IHtcbiAgICBDb250ZW50RWRnZU9iamVjdDogYW55O1xuICAgIGlzUHJvamVjdENoaWxkUm93IDogYm9vbGVhbjtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gcG9wdWxhdGVQcm9wZXJ0aWVzVGFibGUocHJvcGVydGllc1RhYmxlOiBIVE1MVGFibGVDb250ZW50T2JqZWN0LCBwcm9qZWN0Q29udGVudE9iamVjdDogYW55KSB7XG5cbiAgICBjb25zb2xlLmxvZyhcInByb2plY3RDb250ZW50T2JqZWN0ID0gXCIsIHByb2plY3RDb250ZW50T2JqZWN0KVxuXG4gICAgLy8gbGV0IHByb2plY3RPYmplY3QgPSBleHRlbnNpb25TdGF0ZUZyb250LmN1cnJlbnRfcHJvamVjdE9iamVjdDtcbiAgICBsZXQgcHJvamVjdE9iamVjdCA9IHByb2plY3RDb250ZW50T2JqZWN0O1xuXG4gICAgcHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QgPSBwcm9qZWN0Q29udGVudE9iamVjdDtcbiAgICAvLyBwcm9wZXJ0aWVzVGFibGUuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIHByb2plY3RQcm9wZXJ0eUZvY3VzT3V0KVxuXG4gICAgLy8gZXh0ZW5zaW9uU3RhdGVGcm9udC5jdXJyZW50X3Byb2plY3RVdWlkID0gcHJvamVjdE9iamVjdC5VdWlkO1xuXG4gICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FhLXByb2plY3RUaXRsZScpLnRleHRDb250ZW50ID0gcHJvamVjdE9iamVjdC5UaXRsZTtcblxuICAgIC8vIGxldCB0Ym9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2VfcHJvamVjdFByb3BlcnRpZXNUYWJsZS10Ym9keScpO1xuICAgIGxldCB0Ym9keSA9IHByb3BlcnRpZXNUYWJsZS5xdWVyeVNlbGVjdG9yKFwidGJvZHlcIik7XG4gICAgdGJvZHkuaW5uZXJIVE1MID0gJyc7XG5cblxuICAgIGZvciAoY29uc3Qga2V5IGluIHByb2plY3RPYmplY3QpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYCR7a2V5fTogJHtwcm9qZWN0T2JqZWN0W2tleV19YCk7XG4gICAgICAgIGlmIChrZXkgPT09ICdUeXBlJyB8fCBrZXkgPT09ICdUaXRsZScgfHwga2V5ID09PSAnR29hbCcpIHtcblxuICAgICAgICAgICAgdGJvZHkuaW5uZXJIVE1MICs9IGBcblx0XHRcblx0XHRcdDx0cj5cblx0XHRcdFx0PHRkIGlkPWFnZV9wcm9qUHJvcFRhYmxlLSR7a2V5fS1rZXkgY2xhc3M9XCJhZ2VfZWxlbWVudFwiID4ke2tleX08L3RkPlxuXHRcdFx0XHQ8dGQgaWQ9YWdlX3Byb2pQcm9wVGFibGUtJHtrZXl9LXZhbHVlIGNsYXNzPVwiYWdlX2VsZW1lbnRcIiBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCIgPiR7cHJvamVjdE9iamVjdFtrZXldfTwvdGQ+XG5cdFx0XHQ8L3RyPlxuXHRcdFxuXHRcdGA7XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRib2R5LmlubmVySFRNTCArPSBgXG5cdFx0XG5cdFx0XHQ8dHI+XG5cdFx0XHRcdDx0ZCBpZD1hZ2VfcHJvalByb3BUYWJsZS0ke2tleX0ta2V5IGNsYXNzPVwiYWdlX2VsZW1lbnRcIiA+JHtrZXl9PC90ZD5cblx0XHRcdFx0PHRkIGlkPWFnZV9wcm9qUHJvcFRhYmxlLSR7a2V5fS12YWx1ZSBjbGFzcz1cImFnZV9lbGVtZW50XCI+JHtwcm9qZWN0T2JqZWN0W2tleV19PC90ZD5cblx0XHRcdDwvdHI+XG5cdFx0XG5cdFx0YDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy8gY29uc29sZS5sb2coZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2FnZV9wcm9qZWN0UHJvcGVydGllc1RhYmxlIHRib2R5IHRyJykpXG4gICAgLy8gbGV0IGVkaXRhYmxlUHJvamVjdFByb3BlcnR5VGRzOiBOb2RlTGlzdE9mPEVsZW1lbnQ+ID0gdGJvZHkucXVlcnlTZWxlY3RvckFsbCgnLmFnZV9lZGl0YWJsZVByb2plY3RQcm9wZXJ0eScpO1xuICAgIC8vIGNvbnNvbGUubG9nKGVkaXRhYmxlUHJvamVjdFByb3BlcnR5VGQpXG5cbiAgICAvLyBBcnJheS5mcm9tKGVkaXRhYmxlUHJvamVjdFByb3BlcnR5VGRzKS5mb3JFYWNoKChlZGl0YWJsZVByb3BlcnR5RWxlbWVudCkgPT4ge1xuICAgIC8vICAgICBlZGl0YWJsZVByb3BlcnR5RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIGVkaXRhYmxlUHJvamVjdFByb3BlcnR5Rm9jdXNPdXQpXG4gICAgLy8gfSlcbiAgICAvLyBmb3IgKGxldCBlZGl0YWJsZVByb2plY3RQcm9wZXJ0eVRkIG9mIGVkaXRhYmxlUHJvamVjdFByb3BlcnR5VGRzKSB7XG4gICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKGVkaXRhYmxlUHJvamVjdFByb3BlcnR5VGQudGV4dENvbnRlbnQpO1xuICAgIC8vICAgICAvLyBjb25zb2xlLmxvZyhwcm9wZXJ0eVJvdy50ZXh0Q29udGVudC5sZW5ndGgpXG5cbiAgICAvLyAgICAgLy8gZWRpdGFibGVQcm9qZWN0UHJvcGVydHlUZC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHJlYWRQcm9qZWN0UHJvcGVydGllc0Zyb21Eb21BbmRXcml0ZVB1dClcbiAgICAvLyAgICAgZWRpdGFibGVQcm9qZWN0UHJvcGVydHlUZC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIGVkaXRhYmxlUHJvamVjdFByb3BlcnR5Rm9jdXNPdXQpXG4gICAgLy8gICAgIC8vIGVkaXRhYmxlUHJvamVjdFByb3BlcnR5VGQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCBwb3N0UHJvamVjdFByb3BlcnRpZXMpXG4gICAgLy8gfVxuXG59XG5cblxuXG5leHBvcnQgZnVuY3Rpb24gcG9wdWxhdGVDaGlsZHJlblRhYmxlKHRhYmxlIDogSFRNTFRhYmxlRWxlbWVudCwgcHJvamVjdENoaWxkQ29udGVudEVkZ2VzIDogYW55KXtcblxuICAgIC8vIGxldCBwcm9qZWN0Q2hpbGRDb250ZW50RWRnZXMgPSBleHRlbnNpb25TdGF0ZUZyb250LmN1cnJlbnRfcHJvamVjdENoaWxkQ29udGVudEVkZ2VzO1xuXG4gICAgLy8gZXh0ZW5zaW9uU3RhdGVGcm9udC5jdXJyZW50X3Byb2plY3RVdWlkID0gcHJvamVjdE9iamVjdC5VdWlkO1xuXG4gICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FhLXByb2plY3RUaXRsZScpLnRleHRDb250ZW50ID0gcHJvamVjdE9iamVjdC5UaXRsZTtcblxuXG4gICAgbGV0IHRib2R5ID0gdGFibGUucXVlcnlTZWxlY3RvcigndGJvZHknKTtcblxuICAgIHRib2R5LmlubmVySFRNTCA9ICcnO1xuXG4gICAgZm9yIChjb25zdCBjb250ZW50RWRnZSBvZiBwcm9qZWN0Q2hpbGRDb250ZW50RWRnZXMpIHtcblxuICAgICAgICBsZXQgbmV3UHJvamVjdENoaWxkUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSBhcyBIVE1MUHJvamVjdENoaWxkUm93O1xuXG4gICAgICAgIG5ld1Byb2plY3RDaGlsZFJvdy5pc1Byb2plY3RDaGlsZFJvdyA9IHRydWU7XG5cbiAgICAgICAgLy8gQ3VzdG9tIGV2ZW50IHRvIHNwZWNpZmljYWxseSBsb2FkIHRoZSBzb3VyY2UgZnJvbSB0aGUgb3ZlcmxheS10cyBtb2R1bGVcbiAgICAgICAgbmV3UHJvamVjdENoaWxkUm93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQgOiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgLy8gaHR0cHM6Ly93d3cucmVkZGl0LmNvbS9yL3dlYmRldi9jb21tZW50cy9yaGYybXUvZnJpZW5kbHlfcmVtaW5kZXJfdXNlX2V2ZW50Y3VycmVudHRhcmdldF9ub3QvXG4gICAgICAgICAgICBsZXQgZWxlbWVudEN1cnJlbnRUYXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0IGFzIEhUTUxQcm9qZWN0Q2hpbGRSb3c7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImV2ZW50LmN1cnJlbnRUYXJnZXQgPSBcIiwgZWxlbWVudEN1cnJlbnRUYXJnZXQpXG4gICAgICAgICAgICBsZXQgbG9hZHNvdXJjZUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCBcImxvYWRzb3VyY2VcIiwgeyBcbiAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRldGFpbDoge2NvbnRlbnRPYmplY3Q6IGVsZW1lbnRDdXJyZW50VGFyZ2V0LkNvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnR9LFxuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgX3RoaXMgPSB0aGlzIGFzIEhUTUxQcm9qZWN0Q2hpbGRSb3c7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIl90aGlzID0gXCIsIF90aGlzKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZXZlbnQudGFyZ2V0ID0gXCIsIGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGVsZW1lbnRDdXJyZW50VGFyZ2V0LmRpc3BhdGNoRXZlbnQobG9hZHNvdXJjZUV2ZW50KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgfSlcblxuICAgICAgICBuZXdQcm9qZWN0Q2hpbGRSb3cuaWQgPSBgYWdlX3Byb2pjaGlsZFRhYmxlUm93LSR7Y29udGVudEVkZ2UuY29udGVudC5VdWlkfWA7XG4gICAgICAgIG5ld1Byb2plY3RDaGlsZFJvdy5jbGFzc0xpc3QuYWRkKFwiYWdlX3Byb2pjaGlsZFRhYmxlUm93XCIpO1xuICAgICAgICBuZXdQcm9qZWN0Q2hpbGRSb3cuQ29udGVudEVkZ2VPYmplY3QgPSBjb250ZW50RWRnZTtcblxuICAgICAgICBuZXdQcm9qZWN0Q2hpbGRSb3cuaW5uZXJIVE1MICs9IGBcblx0XHRcblx0XHRcdFx0PHRkIGlkPWFnZV9wcm9qY2hpbGRUYWJsZS1UYWJsZS0ke2NvbnRlbnRFZGdlLmNvbnRlbnQuVXVpZH0gY2xhc3M9XCJhZ2VfZWxlbWVudFwiIGRhdGEtVXVpZD0ke2NvbnRlbnRFZGdlLmNvbnRlbnQuVXVpZH0+JHtjb250ZW50RWRnZS5jb250ZW50LlRhYmxlfTwvdGQ+XG5cdFx0XHRcdDx0ZCBpZD1hZ2VfcHJvamNoaWxkVGFibGUtVGl0bGUtJHtjb250ZW50RWRnZS5jb250ZW50LlV1aWR9IGNsYXNzPVwiYWdlX2VsZW1lbnRcIiBkYXRhLVV1aWQ9JHtjb250ZW50RWRnZS5jb250ZW50LlV1aWR9PiR7Y29udGVudEVkZ2UuY29udGVudC5UaXRsZX08L3RkPlxuXHRcdFx0XG5cdFx0YDtcblxuICAgICAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgaWQ9YWdlX3Byb2pjaGlsZFRhYmxlUm93LSR7bm9kZUVkZ2UuVXVpZH1gKTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgaWQ9YWdlX3Byb2pjaGlsZFRhYmxlUm93LSR7bm9kZUVkZ2UuVXVpZH1gKSlcblxuXG4gICAgICAgIC8vIG5ld1Byb2plY3RDaGlsZFJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHByb2plY3RDaGlsZFJvd0NsaWNrZWQpXG5cbiAgICAgICAgdGJvZHkuYXBwZW5kQ2hpbGQobmV3UHJvamVjdENoaWxkUm93KVxuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwb3B1bGF0ZVByb2plY3RTZWFyY2hUYWJsZShwcm9qZWN0U2VhcmNoVGFibGUgOiBhbnksIHByb2plY3RPYmplY3RzIDogYW55KTogdm9pZCB7XG4gICAgLy8gY29uc29sZS5sb2coJ1BST0pFQ1QgVEJBTEUgUE9QJyk7XG5cbiAgICAvLyBjaGlsZE9iamVjdHMgPSBleHRlbnNpb25TdGF0ZUZyb250LmN1cnJlbnRfcHJvamVjdFNlYXJjaE9iamVjdHM7XG5cbiAgICAvLyBsZXQgcHJvamVjdFRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FnZV9wcm9qZWN0VGFibGUnKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIlNTU1NTU1NTU1NTU1NTU1NTID0gXCIsIHByb2plY3RPYmplY3RzLmxlbmd0aClcbiAgICBsZXQgdGJvZHkgPSBwcm9qZWN0U2VhcmNoVGFibGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3Rib2R5JylbMF1cbiAgICAvLyBjb25zb2xlLmxvZyhcInRib2R5ID0gXCIsIHRib2R5KTtcblxuICAgIHRib2R5LmlubmVySFRNTCA9ICcnO1xuXG4gICAgZm9yIChsZXQgY2hpbGRPYmplY3Qgb2YgcHJvamVjdE9iamVjdHMpIHtcblxuICAgICAgICBsZXQgdGFibGVSb3dIdG1sID0gYFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDx0ZCBkYXRhLVV1aWQ9XCIke2NoaWxkT2JqZWN0LlV1aWR9XCIgY2xhc3M9XCJhZ2VfZWxlbWVudCBhZ2VfcHJvamVjdFJvd1NlYXJjaERhdGFcIj4ke2NoaWxkT2JqZWN0LlRhYmxlfTwvdGg+XG4gICAgICAgICAgICAgICAgPHRkIGRhdGEtVXVpZD1cIiR7Y2hpbGRPYmplY3QuVXVpZH1cIiBjbGFzcz1cImFnZV9lbGVtZW50IGFnZV9wcm9qZWN0Um93U2VhcmNoRGF0YVwiPiR7Y2hpbGRPYmplY3QuVGl0bGV9PC90ZD5cblxuICAgICAgICAgICAgYDtcbiAgICAgICAgLy8gbGV0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICAgICAgbGV0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSBhcyBIVE1MUHJvamVjdFRhYmxlUm93O1xuICAgICAgICB0ci5pZCA9ICdhZ2VfcHJvamVjdFNlYXJjaFJvdy0nICsgY2hpbGRPYmplY3QuVXVpZDtcbiAgICAgICAgdHIuY2xhc3NMaXN0LmFkZCgnYWdlX3Byb2plY3RTZWFyY2hSb3cnKTtcbiAgICAgICAgdHIubm9kZU9iamVjdCA9IGNoaWxkT2JqZWN0O1xuICAgICAgICAvLyB0ci5kYXRhc2V0Lk5vZGUgPSAxO1xuICAgICAgICAvLyB0ci5kYXRhc2V0LlV1aWQgPSBjaGlsZE9iamVjdC5VdWlkO1xuICAgICAgICAvLyB0ci5zZXRBdHRyaWJ1dGUoJ2RhdGEtTm9kZScsICcxJyk7XG4gICAgICAgIHRyLnNldEF0dHJpYnV0ZSgnZGF0YS1VdWlkJywgY2hpbGRPYmplY3QuVXVpZCk7XG4gICAgICAgIC8vIHRyLnRhYkluZGV4ID0gMDtcbiAgICAgICAgdHIuaW5uZXJIVE1MID0gdGFibGVSb3dIdG1sO1xuICAgICAgICAvLyB0ci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrQ2FsbGJhY2spO1xuICAgICAgICAvLyB0ci5jb250ZW50RWRpdGFibGUgPSAnVHJ1ZSc7XG5cbiAgICAgICAgdGJvZHkuYXBwZW5kKHRyKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codHIpXG4gICAgfVxuXG59IiwiaW1wb3J0ICogYXMgZmV0Y2hlciBmcm9tIFwiLi4vZmV0Y2hlclwiO1xuaW1wb3J0ICogYXMgZG9tIGZyb20gXCIuL3Byb2plY3RfZG9tXCI7XG5pbXBvcnQgeyBIVE1MUHJvamVjdFRhYmxlUm93LCBIVE1MVGFibGVDb250ZW50T2JqZWN0IH0gZnJvbSBcIi4vcHJvamVjdF9kb21cIjtcbmltcG9ydCB7YWdlX2RiaXN9IGZyb20gXCIuLi9kYmktc2VuZFwiO1xuXG5cbmxldCBjdXJyZW50UHJvamVjdE9iamVjdCA6IGFueSA9IG51bGw7XG5cbmxldCBzaWRlUGFuZWwgOiBFbGVtZW50O1xubGV0IHNpZGVQYW5lbElzUmlnaHQgOiBib29sZWFuID0gdHJ1ZTtcblxubGV0IHByb2plY3RNb3JlT3B0aW9uc0NvbnRleHRNZW51IDogSFRNTERpdkVsZW1lbnQ7XG5cbmxldCBwcm9qZWN0Q29udGFpbmVyIDogRWxlbWVudDtcbmxldCBwcm9qZWN0Q3NzOiBIVE1MRWxlbWVudDtcblxubGV0IHByb2plY3RNb3JlT3B0aW9uc0J1dHRvbiA6IEhUTUxFbGVtZW50O1xubGV0IHByb2plY3RNb3JlT3B0aW9uc01lbnU6IEhUTUxFbGVtZW50O1xuXG5sZXQgcHJvamVjdFNlYXJjaEVsZW1lbnQgOiBIVE1MRGl2RWxlbWVudDtcbmxldCBzZWFyY2hTdHJpbmdFeGlzdHMgOiBib29sZWFuID0gZmFsc2U7XG5cbmxldCBwcm9qZWN0U2VhcmNoT2JqZWN0czogYW55O1xubGV0IHByb2plY3RTZWFyY2hUYWJsZTogSFRNTFRhYmxlRWxlbWVudDtcblxubGV0IHByb2plY3RDb250ZW50RWRnZUNoaWxkcmVuIDogYW55O1xubGV0IHByb2plY3RDaGlsZHJlblRhYmxlIDogSFRNTFRhYmxlRWxlbWVudDtcblxubGV0IHByb2plY3RQcm9wZXJ0aWVzVGFibGU6IEhUTUxUYWJsZUNvbnRlbnRPYmplY3Q7XG5cbmxldCBwcm9qZWN0VGl0bGVFbGVtZW50IDogSFRNTEVsZW1lbnQ7XG5cblxuLy8gaW50ZXJmYWNlIEhUTUxUYWJsZVJvd0VsZW1lbnQge1xuLy8gICAgIG5vZGVPYmplY3Q/OiBhbnk7XG4vLyB9XG5cbi8vIGludGVyZmFjZSBIVE1MUHJvamVjdFRhYmxlUm93IGV4dGVuZHMgSFRNTFRhYmxlUm93RWxlbWVudCB7XG4vLyAgICAgbm9kZU9iamVjdDogYW55O1xuLy8gfVxuXG5cbmZ1bmN0aW9uIGluaXRQcm9qZWN0cyhfc2lkZVBhbmVsIDogRWxlbWVudCwgX3Byb2plY3RNb3JlT3B0aW9uc0NvbnRleHRNZW51IDogSFRNTERpdkVsZW1lbnQpIDogdm9pZHtcbiAgICBjb25zb2xlLmxvZygnT1ZFUkxBWSBUUyBJTklUJyk7XG5cbiAgICBzaWRlUGFuZWwgPSBfc2lkZVBhbmVsO1xuXG4gICAgLy8gTU9SRSBPUFRJT05TIENPTlRFWFQgTUVOVVxuICAgIHByb2plY3RNb3JlT3B0aW9uc0NvbnRleHRNZW51ID0gX3Byb2plY3RNb3JlT3B0aW9uc0NvbnRleHRNZW51O1xuICAgIHByb2plY3RNb3JlT3B0aW9uc0NvbnRleHRNZW51LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja2VkUHJvamVjdENvbnRleHRNZW51KVxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhpZGVQcm9qZWN0Q29udGV4dE1lbnUsIHtjYXB0dXJlOiBmYWxzZX0pO1xuXG4gICAgcHJvamVjdENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHByb2plY3RDb250YWluZXIuaWQgPSBcImFnZV9wcm9qZWN0Q29udGFpbmVyXCI7XG4gICAgcHJvamVjdENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYWdlX3BhbmVsQ29udGFpbmVyXCIpO1xuICAgIHByb2plY3RDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2plY3RDbGljayk7XG4gICAgcHJvamVjdENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgcHJvamVjdFByb3BlcnR5Rm9jdXNPdXQpO1xuXG4gICAgZmV0Y2hlci5mZXRjaEh0bWwoXCJwcm9qZWN0cy5odG1sXCIpXG4gICAgICAgIC50aGVuKGh0bWwgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJIVE1MIDogXCIsIGh0bWwpXG4gICAgICAgICAgICBwcm9qZWN0Q29udGFpbmVyLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgICAgICBwcm9qZWN0VGl0bGVFbGVtZW50ID0gcHJvamVjdENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiI2FnZV9wcm9qZWN0VGl0bGVcIik7XG4gICAgICAgICAgICBwcm9qZWN0U2VhcmNoVGFibGUgPSBwcm9qZWN0Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCJ0YWJsZVwiKTtcbiAgICAgICAgICAgIHByb2plY3RDaGlsZHJlblRhYmxlID0gcHJvamVjdENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiI2FnZV9wcm9qZWN0Q2hpbGRyZW5UYWJsZVwiKTtcbiAgICAgICAgICAgIHByb2plY3RQcm9wZXJ0aWVzVGFibGUgPSBwcm9qZWN0Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX3Byb2plY3RQcm9wZXJ0aWVzVGFibGVcIik7XG4gICAgICAgICAgICBwcm9qZWN0U2VhcmNoRWxlbWVudCA9IHByb2plY3RDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2VfcHJvamVjdFNlYXJjaElucHV0XCIpO1xuICAgICAgICAgICAgcHJvamVjdFNlYXJjaEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzaW5cIiwgc2VhcmNoUHJvamVjdEluKTtcbiAgICAgICAgICAgIHByb2plY3RTZWFyY2hFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCBzZWFyY2hQcm9qZWN0T3V0KTtcblxuICAgICAgICAgICAgLy8gVE9ETyA6IGdyYWIgdGhlIG1vcmUgb3B0aW9ucyBjb250ZXh0IG1lbnVcbiAgICAgICAgICAgIC8vIHByb2plY3RNb3JlT3B0aW9uc01lbnUgPSBcbiAgICAgICAgICAgIHByb2plY3RNb3JlT3B0aW9uc0J1dHRvbiA9IHByb2plY3RDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2VfcHJvamVjdE1vcmVPcHRpb25zXCIpO1xuICAgICAgICAgICAgbGV0IG1vcmVPcHRpb25zQmFja2dyb3VuZFVybCA9IGJyb3dzZXIucnVudGltZS5nZXRVUkwoXG4gICAgICAgICAgICAgICAgXCJyZXNvdXJjZXMvbW9yZS1vcHRpb25zLnBuZ1wiXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbGV0IGJhY2tncm91bmRTdHJpbmcgPSBgdXJsKCR7bW9yZU9wdGlvbnNCYWNrZ3JvdW5kVXJsfSlgO1xuICAgICAgICAgICAgcHJvamVjdE1vcmVPcHRpb25zQnV0dG9uLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGJhY2tncm91bmRTdHJpbmc7XG5cbiAgICAgICAgICAgIC8vIFNlYXJjaCBpY29uXG4gICAgICAgICAgICBsZXQgc2VhcmNoQmFja2dyb3VuZFVybCA9IGJyb3dzZXIucnVudGltZS5nZXRVUkwoXG4gICAgICAgICAgICAgICAgXCJyZXNvdXJjZXMvc2VhcmNoLWljb24ucG5nXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBsZXQgc2VhcmNoQmFja2dyb3VuZFN0cmluZyA9IGB1cmwoJHtzZWFyY2hCYWNrZ3JvdW5kVXJsfSlgO1xuICAgICAgICAgICAgcHJvamVjdFNlYXJjaEVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gc2VhcmNoQmFja2dyb3VuZFN0cmluZztcblxuICAgICAgICAgICAgZmV0Y2hQcm9qZWN0U2VhcmNoKFwiXCIpIC8vIHBlcmZvcm0gc2VhcmNoIG9ubHkgYWZ0ZXIgZ3VhcmFudGVlZCBsb2FkXG4gICAgICAgICAgICAgICAgLnRoZW4oKGNvbnRlbnRPYmplY3RBcnJheSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjb250ZW50T2JqZWN0QXJyYXkpXG4gICAgICAgICAgICAgICAgICAgIGRvbS5wb3B1bGF0ZVByb2plY3RTZWFyY2hUYWJsZShwcm9qZWN0U2VhcmNoVGFibGUsIHByb2plY3RTZWFyY2hPYmplY3RzKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9KSBcbiAgXG4gICAgcHJvamVjdENzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgICBwcm9qZWN0Q3NzLmlkID0gXCJhZ2VfcHJvamVjdFN0eWxlXCI7XG4gICAgZmV0Y2hlci5mZXRjaENzcyhcInByb2plY3RzLmNzc1wiKVxuICAgIC50aGVuKGNzcyA9PiB7XG4gICAgICAgIHByb2plY3RDc3MuaW5uZXJUZXh0ID0gY3NzO1xuICAgIH0pXG5cbiAgICBcblxuICAgIGNvbnNvbGUubG9nKFwic2lkZVBhbmVsLmlkID0gXCIsIHNpZGVQYW5lbC5pZClcbiAgICBcbiAgICBzaWRlUGFuZWwuYXBwZW5kKHByb2plY3RDb250YWluZXIpO1xuXG5cbiAgICBcbiAgICBcbiAgICBcbn1cblxuXG5cblxuLyoqXG4gKiBBZGQgbmV3IHByb2plY3Qgb2JqZWN0IGFuZFxuICovXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVOZXdQcm9qZWN0KCkge1xuICAgIGxldCBuZXdQcm9qZWN0T2JqZWN0ID0gYXdhaXQgYWdlX2RiaXMuQ29udGVudF9JbnNlcnRPblRhYmxlKFwiUHJvamVjdFwiKVxuICAgIGN1cnJlbnRQcm9qZWN0T2JqZWN0ID0gbmV3UHJvamVjdE9iamVjdDtcbiAgICAvLyBhd2FpdCBsb2FkUHJvamVjdFdpdGhDb250ZW50T2JqZWN0KG5ld1Byb2plY3RPYmplY3QpO1xuICAgIHJlbG9hZEN1cnJlbnRQcm9qZWN0KCk7XG59XG5cbi8qKlxuICogICBSZWxvYWQgdXNpbmcgdGhlIGFscmVhZHkgc2V0IHZhbHVlcy5cbiovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVsb2FkQ3VycmVudFByb2plY3QoKSB7XG4gICAgYXdhaXQgcmVsb2FkQ2hpbGRyZW5UYWJsZSgpO1xuICAgIGF3YWl0IHJlbG9hZFByb3BlcnRpZXNUYWJsZSgpO1xuICAgIGF3YWl0IHJlZnJlc2hQcm9qZWN0VGl0bGVFbGVtZW50KCk7XG4gICAgcGVyZm9ybVNlYXJjaCgpO1xufVxuXG5cbmZ1bmN0aW9uIGxvYWRQcm9qZWN0V2l0aFV1aWQoVXVpZCA6IHN0cmluZyB8IG51bWJlcil7XG4gICAgYWdlX2RiaXMuQ29udGVudF9TZWxlY3RPblV1aWQoVXVpZClcbiAgICAgICAgLnRoZW4oKGNvbnRlbnRPYmplY3QpID0+IHtcbiAgICAgICAgICAgIGxvYWRQcm9qZWN0V2l0aENvbnRlbnRPYmplY3QoY29udGVudE9iamVjdCk7XG4gICAgICAgIH0pXG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlbG9hZENoaWxkcmVuVGFibGUoKXtcbiAgICBsZXQgY29udGVudEVkZ2VzID0gYXdhaXQgYWdlX2RiaXMuQ29udGVudEVkZ2VfU2VsZWN0Q2hpbGRPZlV1aWQoY3VycmVudFByb2plY3RPYmplY3QuVXVpZClcbiAgICBkb20ucG9wdWxhdGVDaGlsZHJlblRhYmxlKHByb2plY3RDaGlsZHJlblRhYmxlLCBjb250ZW50RWRnZXMpO1xufVxuYXN5bmMgZnVuY3Rpb24gcmVsb2FkUHJvcGVydGllc1RhYmxlKCkge1xuICAgIFxuICAgIGFnZV9kYmlzLkNvbnRlbnRfU2VsZWN0T25VdWlkKGN1cnJlbnRQcm9qZWN0T2JqZWN0LlV1aWQpXG4gICAgICAgIC50aGVuKChjb250ZW50T2JqZWN0KSA9PiB7XG4gICAgICAgICAgICBkb20ucG9wdWxhdGVQcm9wZXJ0aWVzVGFibGUocHJvamVjdFByb3BlcnRpZXNUYWJsZSwgY29udGVudE9iamVjdCk7XG4gICAgICAgIH0pICAgXG59XG5mdW5jdGlvbiByZWZyZXNoUHJvamVjdFRpdGxlRWxlbWVudCgpe1xuICAgIHByb2plY3RUaXRsZUVsZW1lbnQudGV4dENvbnRlbnQgPSBjdXJyZW50UHJvamVjdE9iamVjdC5UaXRsZTtcbn1cblxuXG5mdW5jdGlvbiBwcm9qZWN0UHJvcGVydHlGb2N1c091dChldmVudDogRm9jdXNFdmVudCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdGT0NVUyBPVVQgUFJPSkVDVCBQUk9QRVJUWScpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiZXZlbnQudGFyZ2V0ID0gXCIsIGV2ZW50LnRhcmdldCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJ0aGlzID0gXCIsIHRoaXMpO1xuXG4gICAgbGV0IGRhdGFFbGVtZW50ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgIC8vIGxldCBwcm9qZWN0VGFibGU6IEhUTUxUYWJsZUNvbnRlbnRPYmplY3QgPSB0aGlzO1xuICAgIFxuXG4gICAgLy8gY29uc29sZS5sb2coJycsIGV2ZW50LnRhcmdldC4pXG4gICAgc3dpdGNoIChkYXRhRWxlbWVudC5pZCkge1xuICAgICAgICAvLyBUWVBFXG4gICAgICAgIGNhc2UgXCJhZ2VfcHJvalByb3BUYWJsZS1UeXBlLXZhbHVlXCI6XG4gICAgICAgICAgICBwcm9qZWN0UHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QuVHlwZSA9IGRhdGFFbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIFRJVExFXG4gICAgICAgIGNhc2UgXCJhZ2VfcHJvalByb3BUYWJsZS1UaXRsZS12YWx1ZVwiOlxuICAgICAgICAgICAgcHJvamVjdFByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0LlRpdGxlID0gZGF0YUVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgLy8gR09BTFxuICAgICAgICBjYXNlIFwiYWdlX3Byb2pQcm9wVGFibGUtR29hbC12YWx1ZVwiOlxuICAgICAgICAgICAgcHJvamVjdFByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0LkdvYWwgPSBkYXRhRWxlbWVudC50ZXh0Q29udGVudDtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAvLyBSZXR1cm4hIEVsc2UgZWxlbWVudHMgd2lsbCBiZSB1cGRhdGVkIHdpdGggZ2FyYmFnZSB2YWx1ZSB3aGVuIGUuZy4gZXhpdGluZyBzZWFyY2ggaW5wdXRcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGFnZV9kYmlzLkNvbnRlbnRfVXBkYXRlV2l0aENvbnRlbnRPYmplY3QocHJvamVjdFByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0KVxuICAgICAgICAudGhlbih1cGRhdGVkQ29udGVudE9iamVjdCA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGRhdGFFbGVtZW50LmlkKSB7XG4gICAgICAgICAgICAgICAgLy8gVFlQRVxuICAgICAgICAgICAgICAgIGNhc2UgXCJhZ2VfcHJvalByb3BUYWJsZS1UeXBlLXZhbHVlXCI6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuYXNzZXJ0KHVwZGF0ZWRDb250ZW50T2JqZWN0LlR5cGUgPT0gcHJvamVjdFByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0LlR5cGUsIFwiJ1BVVCcgY29udGVudCBPYmplY3QgVHlwZSBkb2VzIG5vdCBtYXRjaCB0aGUgcHJvamVjdCB0YWJsZSAuY29udGVudE9iamVjdC5UeXBlICFcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIC8vIFRJVExFXG4gICAgICAgICAgICAgICAgY2FzZSBcImFnZV9wcm9qUHJvcFRhYmxlLVRpdGxlLXZhbHVlXCI6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuYXNzZXJ0KHVwZGF0ZWRDb250ZW50T2JqZWN0LlRpdGxlID09IHByb2plY3RQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdC5UaXRsZSwgXCInUFVUJyBjb250ZW50IE9iamVjdCBUaXRsZSBkb2VzIG5vdCBtYXRjaCB0aGUgcHJvamVjdCB0YWJsZSAuY29udGVudE9iamVjdC5UaXRsZSAhXCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAvLyBHT0FMXG4gICAgICAgICAgICAgICAgY2FzZSBcImFnZV9wcm9qUHJvcFRhYmxlLUdvYWwtdmFsdWVcIjpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5hc3NlcnQodXBkYXRlZENvbnRlbnRPYmplY3QuR29hbCA9PSBwcm9qZWN0UHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QuR29hbCwgXCInUFVUJyBjb250ZW50IE9iamVjdCBHb2FsIGRvZXMgbm90IG1hdGNoIHRoZSBwcm9qZWN0IHRhYmxlIC5jb250ZW50T2JqZWN0LkdvYWwgIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH0pXG4gICAgLy8gbGV0IHByb2plY3RDb250ZW50T2JqZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdFByb3BlcnRpZXNUYWJsZVwiKSBhcyBIVE1MVGFibGVDb250ZW50T2JqZWN0O1xuXG4gICAgLy8gY29uc29sZS5sb2coXCJwcm9qZWN0Q29udGVudE9iamVjdC5jb250ZW50T2JqZWN0ID0gXCIsIHByb2plY3RQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdCk7XG4gICAgY3VycmVudFByb2plY3RPYmplY3QgPSBwcm9qZWN0UHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3Q7XG5cbiAgICByZWZyZXNoUHJvamVjdFRpdGxlRWxlbWVudCgpO1xuXG5cbiAgICAvLyBVcGRhdGUgVGl0bGVzIGluIHRoZSBzZWFyY2hcbiAgICBsZXQgZWxlbWVudFdpdGhTYW1lVXVpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLXV1aWQ9JyR7Y3VycmVudFByb2plY3RPYmplY3QuVXVpZH0nXWApO1xuICAgIGVsZW1lbnRXaXRoU2FtZVV1aWQuZm9yRWFjaCgoX2VsZW1lbnQpID0+IHtcbiAgICAgICAgaWYgKF9lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImFnZV9lbGVtZW50XCIpICYmIF9lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImFnZV9wcm9qZWN0U2VhcmNoUm93XCIpKXtcbiAgICAgICAgICAgIC8vIF9lbGVtZW50LmNoaWxkcmVuWzFdLnRleHRDb250ZW50ID0gZGF0YUVsZW1lbnQudGV4dENvbnRlbnQ7IC8vIHVwZGF0ZSB0aGUgc2Vjb25kIHNlYXJjaCBjb2x1bW47IGVkaXQ6IGRvZXNuJ3Qgd29yay4uLlxuICAgICAgICB9XG4gICAgfSlcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2xpY2tlZFByb2plY3RDb250ZXh0TWVudShldmVudDogTW91c2VFdmVudCl7XG4gICAgbGV0IGV2ZW50VGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgIHN3aXRjaCAoZXZlbnRUYXJnZXQuaWQpIHtcbiAgICAgICAgY2FzZSBcIm5ld1Byb2plY3RCdG5cIjpcbiAgICAgICAgICAgIGF3YWl0IGNyZWF0ZU5ld1Byb2plY3QoKTtcbiAgICAgICAgICAgIHNob3dQcm9qZWN0UHJvcGVydGllcygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJuZXdTb3VyY2VCdG5cIjpcbiAgICAgICAgICAgIGluc2VydE5ld1NvdXJjZVRvQWN0aXZlUHJvamVjdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyZWZyZXNoRXh0ZW5zaW9uXCI6XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCIncmVmcmVzaEV4dGVuc2lvbicgTk9UIEZVTExZIElNUExFTUVOVEVEICEgT05MWSBQUk9KRUNUIElTIFJFRlJFU0hFRFwiKTtcbiAgICAgICAgICAgIC8vIHJlbG9hZEN1cnJlbnRQcm9qZWN0KCk7XG4gICAgICAgICAgICBsZXQgbmV3c291cmNlRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXCJyZWZyZXNoZXh0ZW5zaW9uXCIsIHtcbiAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwcm9qZWN0Q29udGFpbmVyLmRpc3BhdGNoRXZlbnQobmV3c291cmNlRXZlbnQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJwcmludEN1cnJlbnRQcm9qZWN0XCI6XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50UHJvamVjdE9iamVjdCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShjdXJyZW50UHJvamVjdE9iamVjdCkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtb3ZlRXh0ZW5zaW9uXCI6XG4gICAgICAgICAgICB0b2dnbGVFeHRlbnNpb25Mb2NhdGlvbigpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUV4dGVuc2lvbkxvY2F0aW9uKCl7XG4gICAgLy8gU2hpZnQgYmV0d2VlbiBsZWZ0IGFuZCByaWdodFxuICAgIGlmIChzaWRlUGFuZWxJc1JpZ2h0KSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX292ZXJsYXlDb250YWluZXJcIikuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBcInN0YXJ0XCI7XG4gICAgICAgIHNpZGVQYW5lbElzUmlnaHQgPSBmYWxzZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX292ZXJsYXlDb250YWluZXJcIikuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBcImVuZFwiO1xuICAgICAgICBzaWRlUGFuZWxJc1JpZ2h0ID0gdHJ1ZTtcbiAgICB9XG59XG4gICAgXG4vLyB9XG4vLyA8YnV0dG9uIGlkPVwicmVmcmVzaEV4dGVuc2lvblwiID4gUmVmcmVzaCBmcm9tIHNlcnZlciA8L2J1dHRvbj5cbi8vICAgICA8IGJ1dHRvbiBpZCA9IFwicHJpbnRDdXJyZW50UHJvamVjdFwiID4gQ29weSBQcm9qZWN0IFByb3BlcnRpZXMgPC9idXR0b24+XG4vLyAgICAgICAgIDwgYnV0dG9uIGlkID0gXCJtb3ZlRXh0ZW5zaW9uXCIgPiBNb3ZlIEV4dGVuc2lvbiA8L2J1dHRvbj5cblxuXG4vKipcbiAqIEFkZCBuZXcgY2hpbGQtc291cmNlLCBmaXJlcyBvZmYgdGhlIGxvYWRzb3VyY2UgQ3VzdG9tRXZlbnQsIGFuZCB0aGVuIHJlbG9hZHMgdGhlIHByb2plY3QgY2hpbGQgdGFibGUuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbnNlcnROZXdTb3VyY2VUb0FjdGl2ZVByb2plY3QoKXtcblxuICAgIGlmIChjdXJyZW50UHJvamVjdE9iamVjdCA9PT0gdW5kZWZpbmVkIHx8IGN1cnJlbnRQcm9qZWN0T2JqZWN0ID09PSBudWxsKXtcbiAgICAgICAgY29uc29sZS53YXJuKFwiTm8gY3VycmVudCBQcm9qZWN0LiBDYW4ndCBhZGQgbmV3IHNvdXJjZS5cIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgY29udGVudEVkZ2VPYmplY3Q6IGFueSA9IGF3YWl0IGFnZV9kYmlzLkNvbnRlbnRFZGdlX0luc2VydEFkamFjZW50VG9VdWlkSW50b1RhYmxlKGN1cnJlbnRQcm9qZWN0T2JqZWN0LlV1aWQsIDEsICdTb3VyY2UnLCAnJywgJycsICcvJylcblxuICAgIC8vIG1ha2Ugc3VyZSB3ZSBzZXQgYSBkZWZhdWx0IHVybCFcbiAgICBsZXQgX25ld1NvdXJjZU9iamVjdCA9IGNvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnQ7XG4gICAgX25ld1NvdXJjZU9iamVjdC5VcmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICBfbmV3U291cmNlT2JqZWN0LlRpdGxlID0gZG9jdW1lbnQudGl0bGU7XG4gICAgX25ld1NvdXJjZU9iamVjdCA9IGF3YWl0IGFnZV9kYmlzLkNvbnRlbnRfVXBkYXRlV2l0aENvbnRlbnRPYmplY3QoX25ld1NvdXJjZU9iamVjdCk7XG5cbiAgICAvLyBJbnNlcnQgbmV3IFNjaGVkdWxlXG4gICAgYXdhaXQgYWdlX2RiaXMuUmV2aWV3X0luc2VydFNjaGVkdWxlT25VdWlkKF9uZXdTb3VyY2VPYmplY3QuVXVpZCwgXCJcIik7XG5cbiAgICAvLyBTRU5EIE5FVyBTT1VSQ0UgTUVTU0FHRVxuICAgIGxldCBuZXdzb3VyY2VFdmVudCA9IG5ldyBDdXN0b21FdmVudChcIm5ld3NvdXJjZVwiLCB7XG4gICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgIGRldGFpbDogeyBjb250ZW50T2JqZWN0OiBfbmV3U291cmNlT2JqZWN0IH0sXG4gICAgfSk7XG4gICAgcHJvamVjdENvbnRhaW5lci5kaXNwYXRjaEV2ZW50KG5ld3NvdXJjZUV2ZW50KTtcbiAgICBcbiAgICAvLyB1cGRhdGUgcHJvamVjdCBjaGlsZHJlbiB0YWJsZVxuICAgIGFnZV9kYmlzLkNvbnRlbnRFZGdlX1NlbGVjdENoaWxkT2ZVdWlkKGN1cnJlbnRQcm9qZWN0T2JqZWN0LlV1aWQpXG4gICAgICAgIC50aGVuKChjb250ZW50RWRnZXMpID0+IHtcbiAgICAgICAgICAgIGRvbS5wb3B1bGF0ZUNoaWxkcmVuVGFibGUocHJvamVjdENoaWxkcmVuVGFibGUsIGNvbnRlbnRFZGdlcyk7XG4gICAgICAgIH0pXG4gICAgXG59XG5cblxuZnVuY3Rpb24gaGlkZVByb2plY3RDb250ZXh0TWVudShldmVudDogTW91c2VFdmVudCkge1xuICAgIGxldCBldmVudFRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAvLyBjb25zb2xlLmxvZygnX15fXl9eX15fXl9eJywgZXZlbnRUYXJnZXQuaWQpO1xuXG4gICAgbGV0IGlzQ29udGV4dEVsZW1lbnQ6IGJvb2xlYW4gPSBldmVudFRhcmdldC5pZCA9PT0gXCJhZ2VfbW9yZVByb2plY3RPcHRpb25zQ29udGV4dE1lbnVcIiB8fCBldmVudFRhcmdldC5pZCA9PT0gXCJhZ2VfcHJvamVjdE1vcmVPcHRpb25zXCI7XG4gICAgLy8gY29uc29sZS5sb2coJ2lzQ29udGV4dEVsZW1lbnQgPSAnLCBpc0NvbnRleHRFbGVtZW50KTtcblxuICAgIGlmICghaXNDb250ZXh0RWxlbWVudCkge1xuICAgICAgICBsZXQgb3B0aW9uc0NvbnRleHRNZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfbW9yZVByb2plY3RPcHRpb25zQ29udGV4dE1lbnVcIik7XG4gICAgICAgIGlmIChvcHRpb25zQ29udGV4dE1lbnUgIT09IG51bGwpXG4gICAgICAgICAgICBvcHRpb25zQ29udGV4dE1lbnUuY2xhc3NMaXN0LmFkZChcImFnZV9kaXNwbGF5Tm9uZVwiKVxuICAgIH1cbn1cblxuXG5cbi8qKlxuICogIE1haW4gY2xpY2sgaGFuZGxlciBpbiB0aGUgcHJvamVjdCBjb250YWluZXIuXG4gKiBcbiAqIEBwYXJhbSBldmVudCBcbiAqL1xuXG5mdW5jdGlvbiBwcm9qZWN0Q2xpY2soZXZlbnQ6IEV2ZW50KXtcblxuICAgIC8vIGNvbnNvbGUubG9nKFwiQ2xpY2sgZGV0ZWN0ZWQgaW4gcHJvamVjdCBjb250YWluZXIuXCIpO1xuICAgIGxldCBjbGlja1RhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcblxuICAgIFxuLy8gU0VBUkNIIFJPV1xuICAgIGlmIChjbGlja1RhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJhZ2VfcHJvamVjdFJvd1NlYXJjaERhdGFcIikpe1xuICAgICAgICAvLyBncmFiIHBhcmVudCBiZWNhdXNlIHdlIGNsaWNrZWQgb24gZGF0YS1lbGVtZW50XG4gICAgICAgIGxldCB0YWJsZVJvd1RhcmdldCA9IGNsaWNrVGFyZ2V0LnBhcmVudEVsZW1lbnQgYXMgSFRNTFByb2plY3RUYWJsZVJvdztcbiAgICAgICAgbG9hZFByb2plY3RXaXRoQ29udGVudE9iamVjdCh0YWJsZVJvd1RhcmdldC5ub2RlT2JqZWN0KTtcbiAgICAgICAgc2hvd1Byb2plY3RDaGlsZHJlbigpO1xuICAgIH1cbi8vIFNFQVJDSC9DSElMRFJFTi9QUk9QRVJUSUVTIEJVVFRPTlxuICAgIGVsc2UgaWYgKFxuICAgICAgICAgICBjbGlja1RhcmdldC5pZCA9PSBcImFnZV9wcm9qZWN0U2VhcmNoQnV0dG9uXCIgXG4gICAgICAgIHx8IGNsaWNrVGFyZ2V0LmlkID09IFwiYWdlX3Byb2plY3RDaGlsZHJlbkJ1dHRvblwiIFxuICAgICAgICB8fCBjbGlja1RhcmdldC5pZCA9PSBcImFnZV9wcm9qZWN0UHJvcGVydGllc0J1dHRvblwiXG4gICAgKXtcbiAgICAgICAgLy8gcHJvamVjdFNlYXJjaEJ1dHRvbkNsaWNrZWQoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KTtcbiAgICAgICAgc2hvd1Byb2plY3RUYWJsZShjbGlja1RhcmdldC5pZCk7XG4gICAgfVxuLy8gTU9SRSBPUFRJT05TIEJVVFRPTlxuICAgIGVsc2UgaWYgKGNsaWNrVGFyZ2V0LmlkID09IFwiYWdlX3Byb2plY3RNb3JlT3B0aW9uc1wiKSB7XG4gICAgICAgIC8vIHByb2plY3RNb3JlT3B0aW9uc0J1dHRvbkNsaWNrZWQoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KTtcbiAgICAgICAgdG9nZ2xlTW9yZU9wdGlvbnMoKTtcbiAgICB9XG4vLyBUSVRMRVxuICAgIGVsc2UgaWYgKGNsaWNrVGFyZ2V0LmlkID09IFwiYWdlX3Byb2plY3RUaXRsZVwiKSB7XG4gICAgICAgIC8vIFRPR0dMRSBQcm9qZWN0L3NvdXJjZSBjb250YWluZXIgZXhwYW5zaW9ucy9jb2xsYXBzZVxuICAgICAgICBsZXQgcHJvamVjdENvbnRhaW5lckVsZW1lbnQgOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3Byb2plY3RDb250YWluZXJcIik7XG4gICAgICAgIHByb2plY3RDb250YWluZXJFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImNvbGxhcHNlZFwiKSA/IHByb2plY3RDb250YWluZXJFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xsYXBzZWRcIikgOiBwcm9qZWN0Q29udGFpbmVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiY29sbGFwc2VkXCIpO1xuICAgICAgICBsZXQgc291cmNlQ29udGFpbmVyRWxlbWVudDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9zb3VyY2VDb250YWluZXJcIik7XG4gICAgICAgIHNvdXJjZUNvbnRhaW5lckVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29sbGFwc2VkXCIpID8gc291cmNlQ29udGFpbmVyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiY29sbGFwc2VkXCIpIDogc291cmNlQ29udGFpbmVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiY29sbGFwc2VkXCIpO1xuXG4gICAgfVxuXG4gICAgZWxzZXtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0lnbm9yZWQgUHJvamVjdCBDbGljay4nKTtcbiAgICB9XG59XG5cbi8qKlxuICogIGxvYWRzIGFuIGV4aXN0aW5nIHByb2plY3QuIFVzdWFsbHkgZnJvbSBjbGlja2luZyBvbiBhIHByb2plY3QgZHVyaW5nIHNlYXJjaCBPUiBjcmVhdGluZyBhIG5ldyBwcm9qZWN0IG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gbG9hZFByb2plY3RXaXRoQ29udGVudE9iamVjdChfY29udGVudE9iamVjdCA6IGFueSl7XG4gICAgLy8gU2V0IG1vZHVsZSB2YXJpYWJsZVxuICAgIGN1cnJlbnRQcm9qZWN0T2JqZWN0ID0gX2NvbnRlbnRPYmplY3Q7XG5cbiAgICAvLyBzZXQgdGl0bGVcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdlX3Byb2plY3RUaXRsZScpLnRleHRDb250ZW50ID0gX2NvbnRlbnRPYmplY3QuVGl0bGU7XG5cblxuICAgIGRvbS5wb3B1bGF0ZVByb3BlcnRpZXNUYWJsZShwcm9qZWN0UHJvcGVydGllc1RhYmxlLCBfY29udGVudE9iamVjdCk7XG4gICAgLy8gcG9wdWxhdGUgcHJvcGVydGllcyB0YWJsZSBcbiAgICBmZXRjaFByb2plY3RDaGlsZHJlbihfY29udGVudE9iamVjdC5VdWlkKVxuICAgICAgICAudGhlbigoY29udGVudEVkZ2VPYmplY3RzKSA9PiB7IGRvbS5wb3B1bGF0ZUNoaWxkcmVuVGFibGUocHJvamVjdENoaWxkcmVuVGFibGUsIHByb2plY3RDb250ZW50RWRnZUNoaWxkcmVuKSB9XG4gICAgKTtcbiAgICBcbiAgICAvLyBzaG93UHJvamVjdENoaWxkcmVuKCk7XG59XG5cbmZ1bmN0aW9uIHNob3dQcm9qZWN0Q2hpbGRyZW4oKXtcbiAgICAvLyBtb3ZlIGZvY3VzIHRvIHRoZSBjaGlsZHJlbi10YWJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0Q2hpbGRyZW5CdXR0b25cIikuY2xpY2soKVxufVxuZnVuY3Rpb24gc2hvd1Byb2plY3RQcm9wZXJ0aWVzKCkge1xuICAgIC8vIG1vdmUgZm9jdXMgdG8gdGhlIGNoaWxkcmVuLXRhYlxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3Byb2plY3RQcm9wZXJ0aWVzQnV0dG9uXCIpLmNsaWNrKClcbn1cblxuZnVuY3Rpb24gdG9nZ2xlTW9yZU9wdGlvbnMoKXtcbiAgICAvLyBjb25zb2xlLmxvZyhcIlRPR0dMRSBNT1JFIE9QVElPTlNcIilcbiAgICBsZXQgYnV0dG9uQm91bmRpbmdSZWN0ID0gcHJvamVjdE1vcmVPcHRpb25zQnV0dG9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCBidG5MZWZ0ID0gYnV0dG9uQm91bmRpbmdSZWN0LmxlZnQ7XG4gICAgbGV0IGJ0blJpZ2h0ID0gYnV0dG9uQm91bmRpbmdSZWN0LnJpZ2h0O1xuICAgIGxldCBidG5Cb3R0b20gPSBidXR0b25Cb3VuZGluZ1JlY3QuYm90dG9tO1xuICAgIGxldCBidG5YID0gYnV0dG9uQm91bmRpbmdSZWN0Lng7XG5cblxuICAgIHByb2plY3RNb3JlT3B0aW9uc0NvbnRleHRNZW51LnN0eWxlLnRvcCA9IGJ0bkJvdHRvbSArIDUgKyBcInB4XCI7XG4gICAgaWYoc2lkZVBhbmVsSXNSaWdodCl7XG4gICAgICAgIFxuICAgICAgICBwcm9qZWN0TW9yZU9wdGlvbnNDb250ZXh0TWVudS5zdHlsZS5sZWZ0ID0gYnRuTGVmdCAtIDE3MCAgKyBcInB4XCI7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHByb2plY3RNb3JlT3B0aW9uc0NvbnRleHRNZW51LnN0eWxlLmxlZnQgPSBidG5MZWZ0ICsgXCJweFwiO1xuICAgIH1cblxuICAgIHByb2plY3RNb3JlT3B0aW9uc0NvbnRleHRNZW51LmNsYXNzTGlzdC5jb250YWlucyhcImFnZV9kaXNwbGF5Tm9uZVwiKSA/IHByb2plY3RNb3JlT3B0aW9uc0NvbnRleHRNZW51LmNsYXNzTGlzdC5yZW1vdmUoXCJhZ2VfZGlzcGxheU5vbmVcIikgOiBwcm9qZWN0TW9yZU9wdGlvbnNDb250ZXh0TWVudS5jbGFzc0xpc3QuYWRkKFwiYWdlX2Rpc3BsYXlOb25lXCIpO1xufVxuXG5cblxuZnVuY3Rpb24gc2VhcmNoUHJvamVjdEluKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwic2VhcmNoUHJvamVjdEluKClcIilcbiAgICAvLyBmb2N1c1Byb2plY3RTZWFyY2ggPSB0cnVlO1xuICAgIC8vIGV4dGVuc2lvblN0YXRlRnJvbnQucHJvamVjdFNlYXJjaEFjdGl2ZSA9IHRydWU7XG4gICAgLy93cml0ZVN0YXRlRnJvbUZyb250KCk7XG4gICAgLy8gY29uc29sZS5sb2coJ3Byb2plY3RTZWFyY2hFbGVtZW50LnRleHRDb250ZW50ID0gJywgcHJvamVjdFNlYXJjaEVsZW1lbnQudGV4dENvbnRlbnQpO1xuICAgIFxuICAgIC8vIEVtcHR5IHNlYXJjaCBjb250YWluZXIgaWYgbm8gcHJldmlvdXMgc2VhcmNoIHN0cmluZyBleGlzdHNcbiAgICBpZiAoIXNlYXJjaFN0cmluZ0V4aXN0cykge1xuICAgICAgICBwcm9qZWN0U2VhcmNoRWxlbWVudC5pbm5lckhUTUwgPSAnPGRpdj48YnI+PC9kaXY+JzsgLy8gZGVmYXVsdCBjb250ZW50IG9uICdjb250ZW50ZWRpdGFibGUnIGVsZW1lbnRzIFxuICAgICAgICAvLyBzZXRJbnRlcnZhbCgoKSA9PiB7IHNlYXJjaElucHV0LmlubmVySFRNTCArPSAnPGJyPicgfSwgNTApO1xuICAgIH1cbiAgICBzZWFyY2hTdHJpbmdFeGlzdHMgPSB0cnVlO1xuICAgIC8vIGNvbnNvbGUubG9nKCdmb2N1cyBzZWFyY2ggJylcbiAgICAvLyBwcm9qZWN0U2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCBrZXlQcmVzc0R1cmluZ1NlYXJjaClcbiAgICBwcm9qZWN0U2VhcmNoRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5RG93bkR1cmluZ1NlYXJjaClcbiAgICAvLyBrZXlEb3duRHVyaW5nU2VhcmNoKCk7XG59XG5cblxuZnVuY3Rpb24gc2VhcmNoUHJvamVjdE91dCgpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnc2VhcmNoUHJvamVjdE91dCgpJyk7XG4gICAgXG4gICAgbGV0IHNlYXJjaFN0cmluZ0xlbmd0aCA9IHByb2plY3RTZWFyY2hFbGVtZW50LnRleHRDb250ZW50Lmxlbmd0aDtcbiAgICBpZihzZWFyY2hTdHJpbmdMZW5ndGggPT09IDApe1xuICAgICAgICBzZWFyY2hTdHJpbmdFeGlzdHMgPSBmYWxzZTtcbiAgICAgICAgcHJvamVjdFNlYXJjaEVsZW1lbnQuaW5uZXJIVE1MID0gJzxkaXY+USAgOiAgU2VhcmNoIC4gLiAuPGJyPjwvZGl2Pic7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHNlYXJjaFN0cmluZ0V4aXN0cyA9IHRydWU7XG4gICAgfVxuICAgIHByb2plY3RTZWFyY2hFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlEb3duRHVyaW5nU2VhcmNoKVxufVxuXG5cbi8vIFBlcmZvcm0gc2VhcmNoIHdpdGggc2xpZ2h0IGRlbGF5IHRvIG1ha2Ugc3VyZSBuZXcgaW5wdXQgaXMgd3JpdHRlbiB0byBjb250ZW50RWRpdGFubGUgaW5wdXRcbmFzeW5jIGZ1bmN0aW9uIGtleURvd25EdXJpbmdTZWFyY2goZXZlbnQgOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgXG4gICAgLy8gVXNlciBqdXN0IGRlbGV0ZWQgdGhlIGxhc3QgY2hhcmFjdGVyIHNvIHdlIHJlc2V0IHRoZSBkZWZhdWx0IGNvbnRlbnRlZGl0YWJsZSBlbG1lbnQgc3RydWN0dXJlXG4gICAgLy8gaWYgd2UgY29uJ3QgZG8gdGhpcyB0aGUgdXNlciB3aWxsIGluYWR2ZXJ0aWVkbHkgcmVtb3ZlIHRoZSBjb250YWluaW5nIDxkaXY+LCBicmVha2luZyB0aGUgdHlwaW5nLWJlaGF2aW91ciFcbiAgICBpZiAoZXZlbnQua2V5ID09PSBcIkJhY2tzcGFjZVwiICYmIHByb2plY3RTZWFyY2hFbGVtZW50LnRleHRDb250ZW50Lmxlbmd0aCA9PT0gMSl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdMYXN0IGNoYXJhY3RlciBkZWxldGlvbiBwcm90ZWN0aW9uIScpO1xuICAgICAgICBwcm9qZWN0U2VhcmNoRWxlbWVudC5pbm5lckhUTUwgPSAnPGRpdj48YnI+PC9kaXY+JzsgLy8gZGVmYXVsdCBjb250ZW50IG9uICdjb250ZW50ZWRpdGFibGUnIGVsZW1lbnRzIFxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBcbiAgICAvLyBUaGlzIGRvZXMgbm90IHByZXZlbnQgYSByZXF1ZXN0IG9uIGVhY2gga2V5c3Ryb2tlXG4gICAgLy8gQlVUIGl0IGVuYWJsZXMgcmVhZGluZyB0aGUgY2hhbmdlIG9mIGVhY2gga2V5c3Ryb2tlLiBXaGVuIHRoaXMgbWV0aG9kIGlzIGNhbGxlZCB0aGUgdGV4dENvbnRlbnQgb2YgdGhlIHNlcmFjaCBib3ggaGFzIG5vdCBiZWVuIHVwZGF0ZWQhIVxuICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuXG4gICAgICAgIHBlcmZvcm1TZWFyY2goKTtcblxuICAgIH0sIDEwMCk7XG5cbn1cblxuZnVuY3Rpb24gcGVyZm9ybVNlYXJjaCgpe1xuICAgIGxldCBzZWFyY2hTdHJpbmcgOiBzdHJpbmcgPSBcIlwiO1xuICAgIGlmKHNlYXJjaFN0cmluZ0V4aXN0cylcbiAgICAgICAgc2VhcmNoU3RyaW5nID0gcHJvamVjdFNlYXJjaEVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgZWxzZVxuICAgICAgICBzZWFyY2hTdHJpbmcgPSBcIlwiO1xuXG4gICAgLy8gY29uc29sZS5sb2coXCJTZWFyY2hpbmcgd2l0aCBzZWFyY2hzdHJpZ24gPSBcIiwgc2VhcmNoU3RyaW5nKVxuICAgIGZldGNoUHJvamVjdFNlYXJjaChzZWFyY2hTdHJpbmcpXG4gICAgICAgIC50aGVuKChjb250ZW50T2JqZWN0QXJyYXkpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNvbnRlbnRPYmplY3RBcnJheSlcbiAgICAgICAgICAgIGRvbS5wb3B1bGF0ZVByb2plY3RTZWFyY2hUYWJsZShwcm9qZWN0U2VhcmNoVGFibGUsIGNvbnRlbnRPYmplY3RBcnJheSk7XG4gICAgICAgIH0pXG59XG5cblxuZnVuY3Rpb24gc2hvd1Byb2plY3RUYWJsZShidXR0b25JZCA6IHN0cmluZyl7XG4gICAgLy8gYWdlX3Byb2plY3RCdXR0b25PblxuXG4gICAgLy8gU2VhcmNoIGJveCBcbiAgICBsZXQgc2VhcmNoQm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdFNlYXJjaElucHV0XCIpO1xuICAgIHNlYXJjaEJveC5jbGFzc0xpc3QuYWRkKFwiYWdlX2Rpc3BsYXlOb25lXCIpO1xuXG4gICAgLy8gUmVzZXQgdGhlIGJ1dHRvbnNcbiAgICBsZXQgc2VhcmNoQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdFNlYXJjaEJ1dHRvblwiKVxuICAgIGxldCBjaGlsZHJlbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3Byb2plY3RDaGlsZHJlbkJ1dHRvblwiKVxuICAgIGxldCBwcm9wZXJ0aWVzQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdFByb3BlcnRpZXNCdXR0b25cIilcbiAgICBzZWFyY2hCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFnZV9wcm9qZWN0QnV0dG9uT25cIik7XG4gICAgY2hpbGRyZW5CdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFnZV9wcm9qZWN0QnV0dG9uT25cIik7XG4gICAgcHJvcGVydGllc0J1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWdlX3Byb2plY3RCdXR0b25PblwiKTtcblxuICAgIC8vIFJlc2V0IHRoZSBUYWJsZXNcbiAgICBsZXQgc2VhcmNoVGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0U2VhcmNoVGFibGVcIik7XG4gICAgbGV0IGNoaWxkcmVuVGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0Q2hpbGRyZW5UYWJsZVwiKTtcbiAgICBsZXQgcHJvcGVydGllc1RhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdFByb3BlcnRpZXNUYWJsZVwiKTtcbiAgICBzZWFyY2hUYWJsZS5jbGFzc0xpc3QuYWRkKFwiYWdlX2Rpc3BsYXlOb25lXCIpO1xuICAgIGNoaWxkcmVuVGFibGUuY2xhc3NMaXN0LmFkZChcImFnZV9kaXNwbGF5Tm9uZVwiKTtcbiAgICBwcm9wZXJ0aWVzVGFibGUuY2xhc3NMaXN0LmFkZChcImFnZV9kaXNwbGF5Tm9uZVwiKTtcblxuICAgIC8vIEFjdGl2ZSB0aGUgY29ycmVjdCBvbmVcbiAgICBpZiAoYnV0dG9uSWQgPT09IFwiYWdlX3Byb2plY3RTZWFyY2hCdXR0b25cIil7XG4gICAgICAgIHNlYXJjaFRhYmxlLmNsYXNzTGlzdC5yZW1vdmUoXCJhZ2VfZGlzcGxheU5vbmVcIik7XG4gICAgICAgIHNlYXJjaEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWdlX3Byb2plY3RCdXR0b25PblwiKTtcbiAgICAgICAgc2VhcmNoQm94LmNsYXNzTGlzdC5yZW1vdmUoXCJhZ2VfZGlzcGxheU5vbmVcIik7XG4gICAgfVxuICAgIGVsc2UgaWYgKGJ1dHRvbklkID09PSBcImFnZV9wcm9qZWN0Q2hpbGRyZW5CdXR0b25cIil7XG4gICAgICAgIGNoaWxkcmVuVGFibGUuY2xhc3NMaXN0LnJlbW92ZShcImFnZV9kaXNwbGF5Tm9uZVwiKTtcbiAgICAgICAgY2hpbGRyZW5CdXR0b24uY2xhc3NMaXN0LmFkZChcImFnZV9wcm9qZWN0QnV0dG9uT25cIik7XG4gICAgfVxuICAgIGVsc2UgaWYgKGJ1dHRvbklkID09PSBcImFnZV9wcm9qZWN0UHJvcGVydGllc0J1dHRvblwiKXtcbiAgICAgICAgcHJvcGVydGllc1RhYmxlLmNsYXNzTGlzdC5yZW1vdmUoXCJhZ2VfZGlzcGxheU5vbmVcIik7XG4gICAgICAgIHByb3BlcnRpZXNCdXR0b24uY2xhc3NMaXN0LmFkZChcImFnZV9wcm9qZWN0QnV0dG9uT25cIik7XG4gICAgfVxuICAgIFxufVxuXG4vLyBmdW5jdGlvbiBwcm9qZWN0VGl0bGVDbGlja2VkKHRhYmxlUm93OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuLy8gICAgIGNvbnNvbGUubG9nKFwiUHJvamVjdCB0aXRsZSBjbGlja2VkOiBcIiwgdGFibGVSb3cpXG4vLyB9XG4vLyBmdW5jdGlvbiBwcm9qZWN0U2VhcmNoQnV0dG9uQ2xpY2tlZCh0YWJsZVJvdzogSFRNTEVsZW1lbnQpIDogdm9pZCB7XG4vLyAgICAgY29uc29sZS5sb2coXCJQcm9qZWN0IHNlYXJjaCBjbGlja2VkOiBcIiwgdGFibGVSb3cpXG4vLyB9XG4vLyBmdW5jdGlvbiBwcm9qZWN0Q2hpbGRyZW5CdXR0b25DbGlja2VkKHRhYmxlUm93OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuLy8gICAgIGNvbnNvbGUubG9nKFwiUHJvamVjdCBjaGlsZHJlbiBjbGlja2VkOiBcIiwgdGFibGVSb3cpXG4vLyB9XG4vLyBmdW5jdGlvbiBwcm9qZWN0UHJvcGVydGllc0J1dHRvbkNsaWNrZWQodGFibGVSb3c6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4vLyAgICAgY29uc29sZS5sb2coXCJQcm9qZWN0IHByb3BlcnRpZXMgY2xpY2tlZDogXCIsIHRhYmxlUm93KVxuLy8gfVxuLy8gZnVuY3Rpb24gcHJvamVjdE1vcmVPcHRpb25zQnV0dG9uQ2xpY2tlZCh0YWJsZVJvdzogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbi8vICAgICBjb25zb2xlLmxvZyhcIlByb2plY3Qgb3B0aW9ucyBjbGlja2VkOiBcIiwgdGFibGVSb3cpXG4vLyB9XG4vLyBmdW5jdGlvbiBwcm9qZWN0U2VhcmNoUm93Q2xpY2tlZCh0YWJsZVJvdzogSFRNTFByb2plY3RUYWJsZVJvdyk6IHZvaWQge1xuLy8gICAgIGNvbnNvbGUubG9nKFwiVGFibGUgcm93IGNsaWNrZWQ6IFwiLCB0YWJsZVJvdylcbi8vIH1cblxuXG5mdW5jdGlvbiBmZXRjaFByb2plY3RTZWFyY2goc2VhcmNoU3RyaW5nIDogc3RyaW5nKSA6IFByb21pc2U8YW55PntcbiAgICByZXR1cm4gYWdlX2RiaXMuQ29udGVudF9TZWxlY3RPblRpdGxlTGlrZVN0cmluZyhzZWFyY2hTdHJpbmcsIFwiNTBcIiwgXCJQcm9qZWN0XCIsIFwiXCIsIFwiXCIpXG4gICAgICAgIC50aGVuKChjb250ZW50T2JqZWN0QXJyYXk6IGFueSkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY29udGVudE9iamVjdEFycmF5KTtcbiAgICAgICAgICAgIHByb2plY3RTZWFyY2hPYmplY3RzID0gY29udGVudE9iamVjdEFycmF5O1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjb250ZW50T2JqZWN0QXJyYXkpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yIDogRXJyb3IpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xuICAgICAgICB9KVxufVxuXG5mdW5jdGlvbiBmZXRjaFByb2plY3RDaGlsZHJlbihVdWlkIDogc3RyaW5nIHwgbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gYWdlX2RiaXMuQ29udGVudEVkZ2VfU2VsZWN0Q2hpbGRPZlV1aWQoVXVpZClcbiAgICAgICAgLnRoZW4oKGNvbnRlbnRFZGdlT2JqZWN0QXJyYXk6IGFueSkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY29udGVudE9iamVjdEFycmF5KTtcbiAgICAgICAgICAgIHByb2plY3RDb250ZW50RWRnZUNoaWxkcmVuID0gY29udGVudEVkZ2VPYmplY3RBcnJheTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwcm9qZWN0Q29udGVudEVkZ2VDaGlsZHJlbiA9ICcsIHByb2plY3RDb250ZW50RWRnZUNoaWxkcmVuKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwcm9qZWN0Q29udGVudEVkZ2VDaGlsZHJlbik7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3I6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtcbiAgICAgICAgfSlcbn1cblxuZnVuY3Rpb24gYXBwZW5kQ3NzKCkgOiB2b2lke1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kKHByb2plY3RDc3MpO1xufVxuXG5cbmZ1bmN0aW9uIHJlbW92ZUNzcygpIDogdm9pZCB7XG4gICAgcHJvamVjdENzcy5yZW1vdmUoKTtcbn1cblxuXG5cblxuZXhwb3J0IHtcbiAgICBpbml0UHJvamVjdHMsXG4gICAgYXBwZW5kQ3NzLFxuICAgIHJlbW92ZUNzcyxcbn0iLCJpbXBvcnQgKiBhcyBmZXRjaGVyIGZyb20gXCIuLi9mZXRjaGVyXCI7XG5pbXBvcnQgeyBIVE1MUHJvamVjdFRhYmxlUm93LCBIVE1MVGFibGVDb250ZW50T2JqZWN0IH0gZnJvbSBcIi4vc291cmNlX2RvbVwiO1xuaW1wb3J0IHsgYWdlX2RiaXMgfSBmcm9tIFwiLi4vZGJpLXNlbmRcIjtcblxuXG5cbmxldCBzaWRlUGFuZWw6IEVsZW1lbnQ7XG5cbmxldCBzb3VyY2VUaXRsZUVsZW1lbnQgOiBIVE1MRWxlbWVudDtcblxubGV0IHNvdXJjZUNoaWxkcmVuQnV0dG9uIDogSFRNTEVsZW1lbnQ7XG5sZXQgc291cmNlUHJvcGVydGllc0J1dHRvbiA6IEhUTUxFbGVtZW50O1xuXG5sZXQgc291cmNlQ29udGFpbmVyOiBFbGVtZW50O1xubGV0IHNvdXJjZUNzczogSFRNTEVsZW1lbnQ7XG5cbmxldCBzb3VyY2VDaGlsZHJlblRhYmxlOiBIVE1MVGFibGVFbGVtZW50OyBcbmxldCBwcm9qZWN0Q29udGVudEVkZ2VDaGlsZHJlbjogYW55O1xuXG5sZXQgc291cmNlUHJvcGVydGllc1RhYmxlOiBIVE1MVGFibGVDb250ZW50T2JqZWN0O1xuXG4gXG5sZXQgY3VycmVudFNvdXJjZU9iamVjdDogYW55O1xubGV0IGN1cnJlbnRTb3VyY2VVdWlkOiBhbnk7IFxuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRTb3VyY2VPYmplY3QoKTogYW55IHsgcmV0dXJuIHNvdXJjZVByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0fTtcbmV4cG9ydCBmdW5jdGlvbiBnZXRDdXJyZW50U291cmNlVXVpZCgpOiBhbnkgeyByZXR1cm4gY3VycmVudFNvdXJjZVV1aWQgfTtcblxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdFNvdXJjZUNvbnRhaW5lcihfc2lkZVBhbmVsOiBFbGVtZW50LCBfc291cmNlTW9yZU9wdGlvbnNDb250ZXh0TWVudTogSFRNTERpdkVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnaW5pdFNvdXJjZUNvbnRhaW5lciguLi4pJyk7XG5cbiAgICBzaWRlUGFuZWwgPSBfc2lkZVBhbmVsO1xuXG4gICAgc291cmNlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc291cmNlQ29udGFpbmVyLmlkID0gXCJhZ2Vfc291cmNlQ29udGFpbmVyXCI7XG4gICAgc291cmNlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJhZ2VfcGFuZWxDb250YWluZXJcIiwgXCJjb2xsYXBzZWRcIik7XG4gICAgc291cmNlQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja2VkU291cmNlQ29udGFpbmVyKTtcbiAgICAvLyBzb3VyY2VDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIHNvdXJjZVByb3BlcnR5Rm9jdXNlZE91dCk7XG4gICAgc291cmNlQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCBzb3VyY2VGb2N1c091dCk7XG4gICAgXG5cbiAgICBmZXRjaGVyLmZldGNoSHRtbChcInNvdXJjZS5odG1sXCIpXG4gICAgICAgIC50aGVuKGh0bWwgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJIVE1MIDogXCIsIGh0bWwpXG4gICAgICAgICAgICBzb3VyY2VDb250YWluZXIuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgICAgIHNvdXJjZVRpdGxlRWxlbWVudCA9IHNvdXJjZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiI2FnZV9zb3VyY2VUaXRsZVwiKTtcbiAgICAgICAgICAgIHNvdXJjZUNoaWxkcmVuVGFibGUgPSBzb3VyY2VDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2Vfc291cmNlQ2hpbGRUYWJsZVwiKTtcbiAgICAgICAgICAgIHNvdXJjZVByb3BlcnRpZXNUYWJsZSA9IHNvdXJjZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiI2FnZV9zb3VyY2VQcm9wZXJ0aWVzVGFibGVcIik7XG5cbiAgICAgICAgICAgIHNvdXJjZUNoaWxkcmVuQnV0dG9uID0gc291cmNlQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX3NvdXJjZVNlYXJjaEJ1dHRvblwiKTtcbiAgICAgICAgICAgIHNvdXJjZVByb3BlcnRpZXNCdXR0b24gPSBzb3VyY2VDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2Vfc291cmNlUHJvcGVydGllc0J1dHRvblwiKTtcbiAgICAgICAgfSlcblxuICAgIHNvdXJjZUNzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgICBzb3VyY2VDc3MuaWQgPSBcImFnZV9zb3VyY2VTdHlsZVwiO1xuICAgIGZldGNoZXIuZmV0Y2hDc3MoXCJzb3VyY2UuY3NzXCIpXG4gICAgICAgIC50aGVuKGNzcyA9PiB7XG4gICAgICAgICAgICBzb3VyY2VDc3MuaW5uZXJUZXh0ID0gY3NzO1xuICAgICAgICB9KVxuXG5cbiAgICBzaWRlUGFuZWwuYXBwZW5kKHNvdXJjZUNvbnRhaW5lcik7XG5cbn1cblxuZnVuY3Rpb24gc291cmNlRm9jdXNPdXQoZXZlbnQgOiBGb2N1c0V2ZW50KXtcbiAgICBsZXQgZm9jdXNvdXRUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgaWYgKGZvY3Vzb3V0VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImFnZV9zb3VyY2VDaGlsZFRhYmxlLVRpdGxlXCIpKXtcbiAgICAgICAgc291cmNlQ2hpbGRUaXRsZUZvY3VzZWRPdXQoZm9jdXNvdXRUYXJnZXQpO1xuICAgIH1cbiAgICBlbHNlIGlmIChmb2N1c291dFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJhZ2Vfc291cmNlUHJvcFZhbHVlXCIpKXtcbiAgICAgICAgc291cmNlUHJvcGVydHlGb2N1c2VkT3V0KGZvY3Vzb3V0VGFyZ2V0KTtcbiAgICB9XG5cbiAgICAvLyBzd2l0Y2ggKGZvY3Vzb3V0VGFyZ2V0LmlkKSB7XG4gICAgLy8gICAgIGNhc2UgXCJhZS1zb3VyY2VDaGlsZFRhYmxlLVRpdGxlXCI6XG4gICAgLy8gICAgICAgICBzb3VyY2VDaGlsZFRpdGxlRm9jdXNlZE91dChmb2N1c291dFRhcmdldCk7XG4gICAgLy8gICAgICAgICBicmVhaztcbiAgICAvLyAgICAgLy8gYWdlX3NvdXJjZVByb3BUYWJsZVxuICAgIC8vICAgICBjYXNlIFwiYWdlX3NvdXJjZVByb3BUYWJsZS1UaXRsZS12YWx1ZVwiOlxuICAgIC8vICAgICBjYXNlIFwiYWdlX3NvdXJjZVByb3BUYWJsZS1UeXBlLXZhbHVlXCI6XG4gICAgLy8gICAgIGNhc2UgXCJhZ2Vfc291cmNlUHJvcFRhYmxlLVV1aWQtdmFsdWVcIjpcbiAgICAvLyAgICAgY2FzZSBcImFnZV9zb3VyY2VQcm9wVGFibGUtSUFtU291cmNlLXZhbHVlXCI6XG4gICAgLy8gICAgICAgICBzb3VyY2VQcm9wZXJ0eUZvY3VzZWRPdXQoZm9jdXNvdXRUYXJnZXQpO1xuICAgIC8vICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgIGRlZmF1bHQ6XG4gICAgLy8gICAgICAgICBicmVhaztcbiAgICAvLyB9XG59XG5cbmZ1bmN0aW9uIHNvdXJjZUNoaWxkVGl0bGVGb2N1c2VkT3V0KGRhdGFFbGVtZW50IDogSFRNTEVsZW1lbnQpIHtcbiAgICBsZXQgc291cmNlQ2hpbGRSb3cgPSBkYXRhRWxlbWVudC5wYXJlbnRFbGVtZW50IGFzIEhUTUxQcm9qZWN0VGFibGVSb3c7XG4gICAgLy8gY29uc29sZS5sb2coJ0ZPQ1VTIE9VVCBTT1VSQ0UgQ0hJTEQnKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcImV2ZW50LnRhcmdldCA9IFwiLCBldmVudC50YXJnZXQpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwidGhpcyA9IFwiLCB0aGlzKTtcblxuICAgIC8vIGNvbnNvbGUubG9nKCdkYXRhRWxlbWVudC50ZXh0Q29udGVudCA9ICcsIGRhdGFFbGVtZW50LnRleHRDb250ZW50KTtcbiAgICAvLyBjb25zb2xlLmxvZygnc291cmNlQ2hpbGRSb3cubm9kZU9iamVjdC5jb250ZW50LlRpdGxlID0gJywgc291cmNlQ2hpbGRSb3cubm9kZU9iamVjdC5jb250ZW50LlRpdGxlKTtcbiAgICBcbiAgICBzb3VyY2VDaGlsZFJvdy5ub2RlT2JqZWN0LmNvbnRlbnQuVGl0bGUgPSBkYXRhRWxlbWVudC50ZXh0Q29udGVudDtcblxuICAgIGFnZV9kYmlzLkNvbnRlbnRfVXBkYXRlV2l0aENvbnRlbnRPYmplY3Qoc291cmNlQ2hpbGRSb3cubm9kZU9iamVjdC5jb250ZW50KVxuICAgICAgICAudGhlbih1cGRhdGVkQ29udGVudE9iamVjdCA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlVwZGF0ZWQgc291cmNlIGNoaWxkLXJvdyA6IFwiLCB1cGRhdGVkQ29udGVudE9iamVjdClcbiAgICAgICAgfSlcbiAgICAvLyAvLyBsZXQgcHJvamVjdENvbnRlbnRPYmplY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0UHJvcGVydGllc1RhYmxlXCIpIGFzIEhUTUxUYWJsZUNvbnRlbnRPYmplY3Q7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhcInNvdXJjZUNvbnRlbnRPYmplY3QuY29udGVudE9iamVjdCA9IFwiLCBzb3VyY2VQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdCk7XG5cbn1cblxuXG5mdW5jdGlvbiBzb3VyY2VQcm9wZXJ0eUZvY3VzZWRPdXQoZm9jdXNvdXRFbGVtZW50OiBIVE1MRWxlbWVudCl7XG4gICAgLy8gY29uc29sZS5sb2coJ0ZPQ1VTIE9VVCBQUk9KRUNUIFBST1BFUlRZJyk7XG4gICAgLy8gY29uc29sZS5sb2coXCJldmVudC50YXJnZXQgPSBcIiwgZXZlbnQudGFyZ2V0KTtcbiAgICAvLyBjb25zb2xlLmxvZyhcInRoaXMgPSBcIiwgdGhpcyk7XG5cbiAgICAvLyBsZXQgZGF0YUVsZW1lbnQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgLy8gY29uc29sZS5sb2coJ2RhdGFFbGVtZW50LnRleHRDb250ZW50ID0gJywgZm9jdXNvdXRFbGVtZW50LnRleHRDb250ZW50KTtcbiAgICBcbiAgICAvLyBsZXQgcHJvamVjdFRhYmxlOiBIVE1MVGFibGVDb250ZW50T2JqZWN0ID0gdGhpcztcblxuXG4gICAgLy8gY29uc29sZS5sb2coJycsIGV2ZW50LnRhcmdldC4pXG4gICAgc3dpdGNoIChmb2N1c291dEVsZW1lbnQuaWQpIHtcbiAgICAgICAgLy8gVFlQRVxuICAgICAgICBjYXNlIFwiYWdlX3NvdXJjZVByb3BUYWJsZS1UeXBlLXZhbHVlXCI6XG4gICAgICAgICAgICBzb3VyY2VQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdC5UeXBlID0gZm9jdXNvdXRFbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIFRJVExFXG4gICAgICAgIGNhc2UgXCJhZ2Vfc291cmNlUHJvcFRhYmxlLVRpdGxlLXZhbHVlXCI6XG4gICAgICAgICAgICBzb3VyY2VQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdC5UaXRsZSA9IGZvY3Vzb3V0RWxlbWVudC50ZXh0Q29udGVudDtcbiAgICAgICAgICAgIHNvdXJjZVRpdGxlRWxlbWVudC50ZXh0Q29udGVudCA9IGZvY3Vzb3V0RWxlbWVudC50ZXh0Q29udGVudDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyBHT0FMXG4gICAgICAgIGNhc2UgXCJhZ2Vfc291cmNlUHJvcFRhYmxlLVVybC12YWx1ZVwiOlxuICAgICAgICAgICAgc291cmNlUHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QuVXJsID0gZm9jdXNvdXRFbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGFnZV9kYmlzLkNvbnRlbnRfVXBkYXRlV2l0aENvbnRlbnRPYmplY3Qoc291cmNlUHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QpXG4gICAgICAgIC50aGVuKHVwZGF0ZWRDb250ZW50T2JqZWN0ID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoZm9jdXNvdXRFbGVtZW50LmlkKSB7XG4gICAgICAgICAgICAgICAgLy8gVFlQRVxuICAgICAgICAgICAgICAgIGNhc2UgXCJhZ2Vfc291cmNlUHJvcFRhYmxlLVR5cGUtdmFsdWVcIjpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5hc3NlcnQodXBkYXRlZENvbnRlbnRPYmplY3QuVHlwZSA9PSBzb3VyY2VQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdC5UeXBlLCBcIidQVVQnIGNvbnRlbnQgT2JqZWN0IFR5cGUgZG9lcyBub3QgbWF0Y2ggdGhlIHByb2plY3QgdGFibGUgLmNvbnRlbnRPYmplY3QuVHlwZSAhXCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAvLyBUSVRMRVxuICAgICAgICAgICAgICAgIGNhc2UgXCJhZ2Vfc291cmNlUHJvcFRhYmxlLVRpdGxlLXZhbHVlXCI6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuYXNzZXJ0KHVwZGF0ZWRDb250ZW50T2JqZWN0LlRpdGxlID09IHNvdXJjZVByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0LlRpdGxlLCBcIidQVVQnIGNvbnRlbnQgT2JqZWN0IFRpdGxlIGRvZXMgbm90IG1hdGNoIHRoZSBwcm9qZWN0IHRhYmxlIC5jb250ZW50T2JqZWN0LlRpdGxlICFcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIC8vIEdPQUxcbiAgICAgICAgICAgICAgICBjYXNlIFwiYWdlX3NvdXJjZVByb3BUYWJsZS1VcmwtdmFsdWVcIjpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5hc3NlcnQodXBkYXRlZENvbnRlbnRPYmplY3QuVXJsID09IHNvdXJjZVByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0LlVybCwgXCInUFVUJyBjb250ZW50IE9iamVjdCBHb2FsIGRvZXMgbm90IG1hdGNoIHRoZSBwcm9qZWN0IHRhYmxlIC5jb250ZW50T2JqZWN0LkdvYWwgIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH0pXG4gICAgLy8gbGV0IHByb2plY3RDb250ZW50T2JqZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdFByb3BlcnRpZXNUYWJsZVwiKSBhcyBIVE1MVGFibGVDb250ZW50T2JqZWN0O1xuXG4gICAgY3VycmVudFNvdXJjZU9iamVjdCA9IHNvdXJjZVByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0O1xuXG4gICAgLy8gVXBkYXRlIFRpdGxlcyBpbiB0aGUgZG9tXG4gICAgbGV0IGVsZW1lbnRXaXRoU2FtZVV1aWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS11dWlkPScke2N1cnJlbnRTb3VyY2VPYmplY3QuVXVpZH0nXWApO1xuICAgIGVsZW1lbnRXaXRoU2FtZVV1aWQuZm9yRWFjaCgoX2VsZW1lbnQpID0+IHtcbiAgICAgICAgaWYoX2VsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWdlX2VsZW1lbnRcIikgJiYgX2VsZW1lbnQuaWQuaW5jbHVkZXMoXCJUaXRsZVwiKSlcbiAgICAgICAgICAgIF9lbGVtZW50LnRleHRDb250ZW50ID0gZm9jdXNvdXRFbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnZWxlbWVudFdpdGhTYW1lVXVpZCA9ICcsIF9lbGVtZW50KTtcbiAgICB9KVxuICAgIFxufVxuXG5mdW5jdGlvbiBjbGlja2VkU291cmNlQ29udGFpbmVyKGV2ZW50IDogTW91c2VFdmVudCl7XG4gICAgbGV0IGV2ZW50VGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuXG4gICAgc3dpdGNoIChldmVudFRhcmdldC5pZCkge1xuICAgICAgICBjYXNlIFwiYWdlX3NvdXJjZVNlYXJjaEJ1dHRvblwiOlxuICAgICAgICBjYXNlIFwiYWdlX3NvdXJjZVByb3BlcnRpZXNCdXR0b25cIjpcbiAgICAgICAgICAgIHRvZ2dsZVNvdXJjZVRhYmxlcyhldmVudFRhcmdldC5pZCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwiYWdlX3NvdXJjZU5ld0J1dHRvblwiOlxuICAgICAgICAgICAgY29uc29sZS5sb2coJ05ldyBzb3VyY2UgYnV0dG9uIGNsaWNrZWQnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYnJlYWs7XG4gICAgXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dTb3VyY2VDaGlsZHJlbigpIHtcbiAgICBzb3VyY2VDaGlsZHJlbkJ1dHRvbi5jbGljaygpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNob3dTb3VyY2VQcm9wZXJ0aWVzKCl7XG4gICAgc291cmNlUHJvcGVydGllc0J1dHRvbi5jbGljaygpO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVTb3VyY2VUYWJsZXMoYnV0dG9uSUQgOiBzdHJpbmcpe1xuICAgIGxldCBjaGlsZHJlbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3NvdXJjZVNlYXJjaEJ1dHRvblwiKTtcbiAgICBsZXQgcHJvcGVydGllc0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3NvdXJjZVByb3BlcnRpZXNCdXR0b25cIik7XG5cbiAgICBzb3VyY2VDaGlsZHJlblRhYmxlLmNsYXNzTGlzdC5hZGQoXCJhZ2VfZGlzcGxheU5vbmVcIik7XG4gICAgc291cmNlUHJvcGVydGllc1RhYmxlLmNsYXNzTGlzdC5hZGQoXCJhZ2VfZGlzcGxheU5vbmVcIik7XG4gICAgY2hpbGRyZW5CdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFnZV9zb3VyY2VCdXR0b25PblwiKTtcbiAgICBwcm9wZXJ0aWVzQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhZ2Vfc291cmNlQnV0dG9uT25cIik7XG4gICAgXG4gICAgaWYgKGJ1dHRvbklEID09IFwiYWdlX3NvdXJjZVNlYXJjaEJ1dHRvblwiKXtcbiAgICAgICAgc291cmNlQ2hpbGRyZW5UYWJsZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWdlX2Rpc3BsYXlOb25lXCIpO1xuICAgICAgICBjaGlsZHJlbkJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWdlX3NvdXJjZUJ1dHRvbk9uXCIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChidXR0b25JRCA9PSBcImFnZV9zb3VyY2VQcm9wZXJ0aWVzQnV0dG9uXCIpIHtcbiAgICAgICAgc291cmNlUHJvcGVydGllc1RhYmxlLmNsYXNzTGlzdC5yZW1vdmUoXCJhZ2VfZGlzcGxheU5vbmVcIik7XG4gICAgICAgIHByb3BlcnRpZXNCdXR0b24uY2xhc3NMaXN0LmFkZChcImFnZV9zb3VyY2VCdXR0b25PblwiKTtcbiAgICB9XG5cbn1cblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZFdpdGhDb250ZW50T2JqZWN0KF9jb250ZW50T2JqZWN0IDogYW55KXtcbiAgICBjb25zb2xlLmxvZygnbG9hZGluZyBTb3VyY2UgcGFuZWwgd2l0aCAnLCBfY29udGVudE9iamVjdCk7XG5cbiAgICBjdXJyZW50U291cmNlT2JqZWN0ID0gX2NvbnRlbnRPYmplY3Q7XG5cbiAgICAvLyBsZXQgc291cmNlT2JqZWN0ID0gZXh0ZW5zaW9uU3RhdGVGcm9udC5jdXJyZW50X3NvdXJjZU9iamVjdDtcbiAgICAvLyBleHRlbnNpb25TdGF0ZUZyb250LmN1cnJlbnRfc291cmNlVXVpZCA9IHNvdXJjZU9iamVjdC5VdWlkO1xuICAgIHNvdXJjZVByb3BlcnRpZXNUYWJsZS5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgc291cmNlUHJvcGVydHlGb2N1c091dClcbiAgICBzb3VyY2VQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdCA9IF9jb250ZW50T2JqZWN0O1xuIFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2Vfc291cmNlVGl0bGUnKS50ZXh0Q29udGVudCA9IF9jb250ZW50T2JqZWN0LlRpdGxlO1xuXG4gICAgbGV0IHRib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FnZV9zb3VyY2VQcm9wZXJ0aWVzVGFibGUtdGJvZHknKTtcbiAgICB0Ym9keS5pbm5lckhUTUwgPSAnJztcblxuICAgIGZvciAoY29uc3Qga2V5IGluIF9jb250ZW50T2JqZWN0KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGAke2tleX06ICR7c291cmNlT2JqZWN0W2tleV19YCk7XG4gICAgICAgIGlmIChrZXkgPT09ICdUeXBlJyB8fCBrZXkgPT09ICdUaXRsZScgfHwga2V5ID09PSAnVXJsJyB8fCBrZXkgPT09ICdJQW1Tb3VyY2UnKSB7XG5cbiAgICAgICAgICAgIHRib2R5LmlubmVySFRNTCArPSBgXG5cdFx0XG5cdFx0XHQ8dHI+XG5cdFx0XHRcdDx0ZCBpZD1hZ2Vfc291cmNlUHJvcFRhYmxlLSR7a2V5fS1rZXkgY2xhc3M9XCJhZ2VfZWxlbWVudFwiID4ke2tleX08L3RkPlxuXHRcdFx0XHQ8dGQgaWQ9YWdlX3NvdXJjZVByb3BUYWJsZS0ke2tleX0tdmFsdWUgY2xhc3M9XCJhZ2Vfc291cmNlUHJvcFZhbHVlIGFnZV9lbGVtZW50XCIgY29udGVudGVkaXRhYmxlPVwidHJ1ZVwiID4ke19jb250ZW50T2JqZWN0W2tleV19PC90ZD5cblx0XHRcdDwvdHI+XG5cdFx0XG5cdFx0YDtcblxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGJvZHkuaW5uZXJIVE1MICs9IGBcblx0XHRcblx0XHRcdDx0cj5cblx0XHRcdFx0PHRkIGlkPWFnZV9zb3VyY2VQcm9wVGFibGUtJHtrZXl9LWtleSBjbGFzcz1cImFnZV9lbGVtZW50XCIgPiR7a2V5fTwvdGQ+XG5cdFx0XHRcdDx0ZCBpZD1hZ2Vfc291cmNlUHJvcFRhYmxlLSR7a2V5fS12YWx1ZSBjbGFzcz1cImFnZV9zb3VyY2VQcm9wVmFsdWUgYWdlX2VsZW1lbnRcIj4ke19jb250ZW50T2JqZWN0W2tleV19PC90ZD5cblx0XHRcdDwvdHI+XG5cdFx0XG5cdFx0YDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy8gLy8gY29uc29sZS5sb2coZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2FnZV9zb3VyY2VQcm9wZXJ0aWVzVGFibGUgdGJvZHkgdHInKSlcbiAgICAvLyBsZXQgZWRpdGFibGVTb3VyY2VQcm9wZXJ0eVRkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hZ2VfZWRpdGFibGVTb3VyY2VQcm9wZXJ0eScpO1xuICAgIC8vIC8vIC8vIGNvbnNvbGUubG9nKGVkaXRhYmxlU291cmNlUHJvcGVydHlUZClcbiAgICAvLyBmb3IgKGxldCBlZGl0YWJsZVNvdXJjZVByb3BlcnR5VGQgb2YgZWRpdGFibGVTb3VyY2VQcm9wZXJ0eVRkcykge1xuICAgIC8vICAgICAvLyBjb25zb2xlLmxvZyhlZGl0YWJsZVNvdXJjZVByb3BlcnR5VGQudGV4dENvbnRlbnQpO1xuICAgIC8vICAgICAvLyBjb25zb2xlLmxvZyhwcm9wZXJ0eVJvdy50ZXh0Q29udGVudC5sZW5ndGgpXG4gICAgLy8gICAgIC8vIGVkaXRhYmxlU291cmNlUHJvcGVydHlUZC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHJlYWRTb3VyY2VQcm9wZXJ0aWVzRnJvbURvbUFuZFdyaXRlUHV0KVxuICAgIC8vICAgICBlZGl0YWJsZVNvdXJjZVByb3BlcnR5VGQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCBlZGl0YWJsZVNvdXJjZVByb3BlcnR5Rm9jdXNPdXQpXG5cbiAgICAvLyB9XG5cbiAgICBhd2FpdCBsb2FkU291cmNlQ2hpbGRyZW4oX2NvbnRlbnRPYmplY3QpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBsb2FkU291cmNlQ2hpbGRyZW4oX2NvbnRlbnRPYmplY3QgOiBhbnkpe1xuXG4gICAgbGV0IGNoaWxkQ29udGVudEVkZ2VPYmplY3RzID0gYXdhaXQgYWdlX2RiaXMuQ29udGVudEVkZ2VfU2VsZWN0Q2hpbGRPZlV1aWQoX2NvbnRlbnRPYmplY3QuVXVpZCk7XG5cblxuXG4gICAgbGV0IHRib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FnZV9zb3VyY2VDaGlsZFRhYmxlLXRib2R5Jyk7XG4gICAgdGJvZHkuaW5uZXJIVE1MID0gJyc7XG5cbiAgICBmb3IgKGxldCBjaGlsZENvbnRlbnRFZGdlT2JqZWN0IG9mIGNoaWxkQ29udGVudEVkZ2VPYmplY3RzKSB7XG4gICAgICAgIGxldCB0YWJsZVJvd0h0bWwgPSBgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiYWdlX2VsZW1lbnQgYWdlX3NvdXJjZUNoaWxkVGFibGUtVGFibGVcIiBkYXRhLVV1aWQ9XCIke2NoaWxkQ29udGVudEVkZ2VPYmplY3QuY29udGVudC5VdWlkfVwiPiR7Y2hpbGRDb250ZW50RWRnZU9iamVjdC5jb250ZW50LlRhYmxlfTwvdGQ+XG5cdFx0XHRcdDx0ZCBjbGFzcz1cImFnZV9lbGVtZW50IGFnZV9zb3VyY2VDaGlsZFRhYmxlLVR5cGVcIiBkYXRhLVV1aWQ9XCIke2NoaWxkQ29udGVudEVkZ2VPYmplY3QuY29udGVudC5VdWlkfVwiPiR7Y2hpbGRDb250ZW50RWRnZU9iamVjdC5jb250ZW50LlR5cGV9PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJhZ2VfZWxlbWVudCBhZ2Vfc291cmNlQ2hpbGRUYWJsZS1UaXRsZVwiIGRhdGEtVXVpZD1cIiR7Y2hpbGRDb250ZW50RWRnZU9iamVjdC5jb250ZW50LlV1aWR9XCIgY29udGVudGVkaXRhYmxlPVwidHJ1ZVwiPiR7Y2hpbGRDb250ZW50RWRnZU9iamVjdC5jb250ZW50LlRpdGxlfTwvdGQ+XG5cbiAgICAgICAgICAgIGA7XG4gICAgICAgIGxldCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykgYXMgSFRNTFByb2plY3RUYWJsZVJvdztcbiAgICAgICAgdHIuaWQgPSAnYWdlX3NvdXJjZVNlYXJjaE5vZGUtJyArIGNoaWxkQ29udGVudEVkZ2VPYmplY3QuY29udGVudC5VdWlkO1xuICAgICAgICB0ci5ub2RlT2JqZWN0ID0gY2hpbGRDb250ZW50RWRnZU9iamVjdDtcbiAgICAgICAgLy8gdHIuYWFhID0gXCJhc2RcIjtcbiAgICAgICAgdHIuc2V0QXR0cmlidXRlKCdkYXRhLWZ1Y2snLCAnZipjaycpO1xuICAgICAgICAvLyB0ci5kYXRhc2V0Lk5vZGUgPSAxO1xuICAgICAgICAvLyB0ci5kYXRhc2V0LlV1aWQgPSBjaGlsZE9iamVjdC5VdWlkO1xuICAgICAgICB0ci5zZXRBdHRyaWJ1dGUoJ2RhdGEtTm9kZScsICcxJyk7XG4gICAgICAgIHRyLnNldEF0dHJpYnV0ZSgnZGF0YS1VdWlkJywgY2hpbGRDb250ZW50RWRnZU9iamVjdC5jb250ZW50LlV1aWQpO1xuICAgICAgICAvLyB0ci50YWJJbmRleCA9IDE7XG4gICAgICAgIHRyLmlubmVySFRNTCA9IHRhYmxlUm93SHRtbDtcbiAgICAgICAgLy8gdHIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja1NvdXJjZUNoaWxkUm93KTtcbiAgICAgICAgLy8gdHIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHsgY29uc29sZS5sb2coZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUubm9kZU9iamVjdCkgfSk7XG4gICAgICAgIC8vIFRhcmdldHMgb25seSB0aGUgbGFzdCAoaS5lLiBUaXRsZSkgY29sdW1uXG4gICAgICAgIC8vIHRyLmxhc3RFbGVtZW50Q2hpbGQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIGFzeW5jIChldmVudCkgPT4ge1xuXG4gICAgICAgIC8vICAgICBsZXQgdXVpZCA9IGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50Lm5vZGVPYmplY3QuY29udGVudC5VdWlkO1xuICAgICAgICAvLyAgICAgbGV0IGNvbnRlbnRPYmplY3QgPSBldmVudC50YXJnZXQucGFyZW50RWxlbWVudC5ub2RlT2JqZWN0LmNvbnRlbnQ7XG4gICAgICAgIC8vICAgICBjb250ZW50T2JqZWN0LlRpdGxlID0gZXZlbnQudGFyZ2V0LnRleHRDb250ZW50O1xuICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coXCJDQ0NDQ0NDQ0NDXCIsIGNvbnRlbnRPYmplY3QpXG4gICAgICAgIC8vICAgICBsZXQgcHV0Q29udGVudE9iamVjdCA9IGF3YWl0IGRiaXMuQ29udGVudF9VcGRhdGVXaXRoQ29udGVudE9iamVjdChjb250ZW50T2JqZWN0KTtcblxuICAgICAgICAvLyAgICAgbGV0IGZldGNoZWRDb250ZW50T2JqZWN0ID0gYXdhaXQgZGJpcy5Db250ZW50X1NlbGVjdE9uVXVpZCh1dWlkKTtcblxuICAgICAgICAvLyAgICAgYXdhaXQgZmV0Y2hDdXJyZW50U291cmNlQ2hpbGRyZW5UaGVuV3JpdGVUb1N0YXRlcygpO1xuICAgICAgICAvLyAgICAgcG9wdWxhdGVTb3VyY2VDaGlsZFRhYmxlRnJvbVN0YXRlKCk7XG5cbiAgICAgICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKFwiRERERERERERERFwiLCBmZXRjaGVkQ29udGVudE9iamVjdClcbiAgICAgICAgLy8gICAgIC8vIGNvcHlTb3VyY2VDaGlsZFRhYmxlRnJvbURvbSgpO1xuXG4gICAgICAgIC8vICAgICAvLyBwdXRDdXJyZW50U291cmNlT2JqZWN0KCk7XG4gICAgICAgIC8vICAgICAvLyBmZXRjaEN1cnJlbnRTb3VyY2VDaGlsZHJlblRoZW5Xcml0ZVRvU3RhdGVzKCk7XG4gICAgICAgIC8vICAgICAvLyBwb3B1bGF0ZVNvdXJjZUNoaWxkVGFibGVGcm9tU3RhdGUoKTtcbiAgICAgICAgLy8gfSk7XG4gICAgICAgIC8vIHRyLmNvbnRlbnRFZGl0YWJsZSA9ICdUcnVlJztcblxuICAgICAgICB0Ym9keS5hcHBlbmQodHIpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0cilcbiAgICB9XG4gICAgLy8gY29uc29sZS50YWJsZShjaGlsZE9iamVjdHMpXG5cbn1cblxuZnVuY3Rpb24gc291cmNlUHJvcGVydHlGb2N1c091dChldmVudCA6IEZvY3VzRXZlbnQpe1xuICAgIGNvbnNvbGUubG9nKCdGT0NVUyBPVVQgRlJPTSBTT1VSQ0UgUFJPUEVSVFknKTtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9jdXNPbkxhc3RDaGlsZFJvd1RpdGxlKCl7XG4gICAgbGV0IHRib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2Vfc291cmNlQ2hpbGRUYWJsZS10Ym9keVwiKSBhcyBIVE1MVGFibGVTZWN0aW9uRWxlbWVudDtcbiAgICAvLyBjb25zb2xlLmxvZyhcInRib2R5ID0gXCIsIHRib2R5KVxuICAgIGxldCBsYXN0Um93ID0gdGJvZHkubGFzdEVsZW1lbnRDaGlsZC5sYXN0RWxlbWVudENoaWxkIGFzIEhUTUxUYWJsZUNlbGxFbGVtZW50O1xuICAgIC8vIGNvbnNvbGUubG9nKFwibGFzdFJvdyA9IFwiLCBsYXN0Um93KVxuXG4gICAgaWYobGFzdFJvdy50ZXh0Q29udGVudC5sZW5ndGggPT0gMCl7XG4gICAgICAgIGxhc3RSb3cuaW5uZXJIVE1MID0gXCI8ZGl2Pjxicj48L2Rpdj5cIlxuICAgICAgICBsYXN0Um93LmZvY3VzKCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGxhc3RSb3cuZm9jdXMoKTtcbiAgICAgICAgICAgIC8vIHRoaXMuc2VsZWN0aW9uU3RhcnQgPSB0aGlzLnNlbGVjdGlvbkVuZCA9IHRoaXMudmFsdWUubGVuZ3RoO1xuICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpXG4gICAgICAgICAgICB2YXIgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpXG4gICAgICAgIFxuICAgICAgICAgICAgcmFuZ2Uuc2V0U3RhcnQobGFzdFJvdy5jaGlsZE5vZGVzWzBdLCBsYXN0Um93LmNoaWxkTm9kZXNbMF0udGV4dENvbnRlbnQubGVuZ3RoKVxuICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSlcbiAgICAgICAgXG4gICAgICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKClcbiAgICAgICAgICAgIHNlbC5hZGRSYW5nZShyYW5nZSlcblxuICAgIH1cbn1cblxuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGVuZENzcygpOiB2b2lkIHtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZChzb3VyY2VDc3MpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVDc3MoKTogdm9pZCB7XG4gICAgc291cmNlQ3NzLnJlbW92ZSgpO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMgb3ZlcmxheSBmcm9tIFwiLi9vdmVybGF5XCI7XG5cblxubGV0IGV4dGVuc2lvblN0YXRlRnJvbnQgPXtcbiAgICBhY3RpdmU6IGZhbHNlLFxufTtcblxuXG4vLyBTZXQgdXAgbW9kdWxlcyBhbmQgZmV0Y2ggZGF0YSwgYnV0IGRvZXMgbm90IHJlbmRlciBhbnl0aGluZ1xuKGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgLy8gREVWIERFVlxuICAgIC8vIE1ha2Ugc3VyZSBhbnkgZXhpc3Rpbmcgb3ZlcmxheXMgYXJlIHJlbW92ZWRcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2Vfb3ZlcmxheUNvbnRhaW5lclwiKSAhPT0gbnVsbClcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpOyBcbiAgICBcbiAgICBvdmVybGF5LmluaXRPdmVybGF5KCk7ICBcbn0pKCk7XG4gXG5cblxuLyogXG4gICAgVE9HR0xFUyBUSEUgRVhURU5TSU9OIEZST05URU5EIFVJXG4qL1xuYnJvd3Nlci5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobWVzc2FnZSkgPT4ge1xuICAgIFxuICAgIGlmIChtZXNzYWdlLm5hbWUgPT09ICd0b2dnbGVFeHRlbnNpb24nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVG9nZ2xlIEV4aXRlbnNpb24gTWVzc2FnZSByZWNpZXZlZCFcIilcblxuICAgICAgICBpZiAoZXh0ZW5zaW9uU3RhdGVGcm9udC5hY3RpdmUpe1xuICAgICAgICAgICAgZXh0ZW5zaW9uU3RhdGVGcm9udC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIG92ZXJsYXkuaGlkZU92ZXJsYXkoKTtcblxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4dGVuc2lvblN0YXRlRnJvbnQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIG92ZXJsYXkuc2hvd092ZXJsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cblxufSk7XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==