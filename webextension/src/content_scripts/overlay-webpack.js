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
/* harmony export */   removeCss: () => (/* binding */ removeCss),
/* harmony export */   textConcatenationCapturing: () => (/* binding */ textConcatenationCapturing)
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
        // Manual typing during text capturing
        // Ignore input if alt/ctrl shortcuts are used! 
        if (textConcatenationCapturing && !keyEvent.ctrlKey && !keyEvent.altKey) {
            console.log('KeyEvent.key = ', keyEvent.key);
            if (keyEvent.key === "Backspace") {
                textConcatenationContent = textConcatenationContent.substring(0, textConcatenationContent.length - 1);
            }
            else if (keyEvent.key === "Enter") {
                textConcatenationContent += "\n";
            }
            else if (keyEvent.key === "Shift") {
                // We want the native capitalization, but no additional behavior!
            }
            else {
                textConcatenationContent += keyEvent.key;
            }
            writeTextConcatenationContentToDom();
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
/* harmony export */   setApiUrl: () => (/* binding */ setApiUrl),
/* harmony export */   waitForLoadedApiPath: () => (/* binding */ waitForLoadedApiPath)
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
const defaultApiString = "http://localhost:3000/api/v02";
let age_apiUrl = "";
// ALWAYS START OUT BY GRABBING THE API BASE URL
(() => {
    setApiUrl().then(() => {
        console.log('Loaded dbi-send.ts');
        // notifyDbisUsers();
        apiPathLoaded = true;
    });
})();
let apiPathLoaded = false;
const maxApiPathLoadedChecks = 100;
/**
 * Notifies users of the dbis module that the api path is loaded from file and ready to for use.
 */
function waitForLoadedApiPath(callbackFn) {
    let apiPathCheckCount = 0; // a counter for each caller
    let interval = setInterval(() => {
        if (apiPathCheckCount < maxApiPathLoadedChecks) {
            if (apiPathLoaded) {
                clearInterval(interval);
                callbackFn();
                // return;
            }
            apiPathCheckCount++;
        }
    }, 10);
}
/**
 * Try setting the api-path using the local webextension storage.
 * If the local value is undefined we use the default API path.
 */
function setApiUrl() {
    return __awaiter(this, void 0, void 0, function* () {
        browser.storage.local.get("apiBaseString").then((object) => {
            if (object.apiBaseString === undefined) {
                age_apiUrl = defaultApiString;
            }
            else {
                age_apiUrl = object.apiBaseString;
            }
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
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




// import { age_dbis } from "./dbi-send";
let overlayContainer;
let overlayCss;
let tableCss;
// other cached elements
let contextOverlay;
let sidePanel;
/**
 *  Initializing the extension overlay HTML, CSS, Events, and its sub-modules.
 *
 */
function initOverlay() {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log('OVERLAY TS INIT'); 
        overlayContainer = document.createElement('div');
        overlayContainer.id = "age_overlayContainer";
        overlayContainer.setAttribute("spellcheck", "false");
        // Extension-wide events!
        overlayContainer.addEventListener("click", extensionClickHandler);
        overlayContainer.addEventListener("focusin", overlayFocusin);
        // Prevents keystrokes on certain websites from registring when writing in the overlay - tested on youtube shorts - space not working on regular youtube
        // Maybe a bit too much to have listening at all times! BUT I simply need this to work for now..
        overlayContainer.addEventListener("keydown", contentEditableKeyDetection, false);
        overlayContainer.addEventListener("keyup", contentEditableKeyDetection, false);
        overlayContainer.addEventListener("keypress", contentEditableKeyDetection, false);
        // Custom Events for specific extension-actions
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
        // Overlay HTML
        let overlayHtml = yield _fetcher__WEBPACK_IMPORTED_MODULE_0__.fetchHtml("overlay.html");
        overlayContainer.innerHTML = overlayHtml;
        contextOverlay = overlayContainer.querySelector("#age_contextOverlay");
        sidePanel = overlayContainer.querySelector("#age_overlayRightPanel");
        // CSS
        overlayCss = document.createElement("style");
        overlayCss.id = "age_overlayStyle";
        overlayCss.innerText = yield _fetcher__WEBPACK_IMPORTED_MODULE_0__.fetchCss("overlay.css");
        tableCss = document.createElement("style");
        tableCss.id = "age_tableStyle";
        tableCss.innerText = yield _fetcher__WEBPACK_IMPORTED_MODULE_0__.fetchCss("tables.css");
        // Load Extension Modules
        _projects_projects__WEBPACK_IMPORTED_MODULE_1__.initProjects(sidePanel, contextOverlay.querySelector("#age_moreProjectOptionsContextMenu")); // Pass the context menu!
        _source_source__WEBPACK_IMPORTED_MODULE_2__.initSourceContainer(sidePanel, contextOverlay.querySelector("#age_moreSourceOptionsContextMenu")); // Pass the context menu!
        _clipboard__WEBPACK_IMPORTED_MODULE_3__.initClipboard(sidePanel);
    });
}
/**
 * Prevents the default behavior and stops propagation of global key-events for:
 * 1) content-editable elements
 * 2) When capturing to the text-clipboard
 *
 * Also implements the focusing of parent when pressing enter/escape.
 *
 * @param keyevent
 */
function contentEditableKeyDetection(keyevent) {
    let activeElement = document.activeElement;
    if (activeElement.isContentEditable) {
        // enable new line using enter+shift
        if (keyevent.key === "Enter" && keyevent.shiftKey) {
        }
        // prevent new line and exit field
        else if (keyevent.key === "Enter" || keyevent.key === "Escape") {
            keyevent.preventDefault();
            keyevent.target.parentElement.focus();
        }
        keyevent.stopPropagation();
    }
    if (_clipboard__WEBPACK_IMPORTED_MODULE_3__.textConcatenationCapturing) {
        keyevent.preventDefault();
        keyevent.stopPropagation();
    }
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
    // Set property rows to be tabbable
    let propertyRows = tbody.children;
    for (let i = 0; i < propertyRows.length; i++) {
        let propertyRow = propertyRows[i];
        // console.log('child = ', propertyRow);
        propertyRow.tabIndex = 0;
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
/* harmony export */   performSearch: () => (/* binding */ performSearch),
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
    // console.log('OVERLAY TS INIT');
    sidePanel = _sidePanel;
    // MORE OPTIONS CONTEXT MENU
    projectMoreOptionsContextMenu = _projectMoreOptionsContextMenu;
    projectMoreOptionsContextMenu.addEventListener("click", clickedProjectContextMenu);
    // Detects any click in the whole document!
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
        // perform search only after guaranteed load of above html/css AND the api path from file.
        // fetchProjectSearch("") 
        //     .then((contentObjectArray) => {
        //         console.log(contentObjectArray)
        //         dom.populateProjectSearchTable(projectSearchTable, contentObjectArray);
        //     })
        // performSearch();
        (0,_dbi_send__WEBPACK_IMPORTED_MODULE_2__.waitForLoadedApiPath)(dbisLoadedCallback);
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
/**  */
function dbisLoadedCallback() {
    performSearch();
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
/**  */
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
/** Callback when entering the content-editable project search input */
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
/** Callback when leaving the content-editable project search input */
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
/**
 * Performs project search with delay to guarante that search field is updated during actual search.
 */
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
/**
 * Perform an API fetch using the current search string.
 * If the 'searchStringExists'-bool is false, an empty string is used.
 */
function performSearch() {
    let searchString = "";
    if (searchStringExists)
        searchString = projectSearchElement.textContent;
    else
        searchString = "";
    // Fetch and populate
    fetchProjectSearch(searchString)
        .then((contentObjectArray) => {
        _project_dom__WEBPACK_IMPORTED_MODULE_1__.populateProjectSearchTable(projectSearchTable, contentObjectArray);
    });
}
/**
 *  Pass the id of one of the regular project buttons.
 *  The panel-table of the corresponding will be displayd and the other will be hidden.
 */
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
/** Selects first 50 projects from API. Returns array of project objects. */
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
/** Returns array of children fetched from the API. */
function fetchProjectChildren(Uuid) {
    return _dbi_send__WEBPACK_IMPORTED_MODULE_2__.age_dbis.ContentEdge_SelectChildOfUuid(Uuid)
        .then((contentEdgeObjectArray) => {
        // console.log(contentObjectArray);
        projectContentEdgeChildren = contentEdgeObjectArray;
        // console.log('projectContentEdgeChildren = ', projectContentEdgeChildren);
        return Promise.resolve(projectContentEdgeChildren);
    })
        .catch((error) => {
        return Promise.reject();
    });
}
/** Append the project style elments to the head of page */
function appendCss() {
    document.head.append(projectCss);
}
/** Remove the project style elments to the head of page */
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
        // Set property rows to be tabbable
        let propertyRows = tbody.children;
        for (let i = 0; i < propertyRows.length; i++) {
            let propertyRow = propertyRows[i];
            propertyRow.tabIndex = 0;
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
        // Set Shard rows to be tabbable
        let shardRows = tbody.children;
        for (let i = 0; i < shardRows.length; i++) {
            let shardRow = shardRows[i];
            shardRow.tabIndex = 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7QUNOcUM7QUFHckMsSUFBSSxtQkFBbUIsR0FBRTtJQUNyQixNQUFNLEVBQUUsS0FBSztDQUNoQixDQUFDO0FBR0YsOERBQThEO0FBQzlELENBQUMsU0FBUyxJQUFJO0lBQ1YsVUFBVTtJQUNWLDhDQUE4QztJQUM5QyxJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsc0JBQXNCLENBQUMsS0FBSyxJQUFJO1FBQ3hELE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7SUFFN0IsaURBQW1CLEVBQUUsQ0FBQztBQUMxQixDQUFDLENBQUMsRUFBRSxDQUFDO0FBSUw7O0VBRUU7QUFDRixPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtJQUU5QyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssaUJBQWlCLEVBQUUsQ0FBQztRQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxDQUFDO1FBRWxELElBQUksbUJBQW1CLENBQUMsTUFBTSxFQUFDLENBQUM7WUFDNUIsbUJBQW1CLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNuQyxpREFBbUIsRUFBRSxDQUFDO1FBRzFCLENBQUM7YUFDRyxDQUFDO1lBQ0QsbUJBQW1CLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNsQyxpREFBbUIsRUFBRSxDQUFDO1FBQzFCLENBQUM7SUFDTCxDQUFDO0FBRUwsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zb3VyY2VzLy4vd2ViZXh0ZW5zaW9uL3dwLWRldi9jbGlwYm9hcmQudHMiLCJ3ZWJwYWNrOi8vc291cmNlcy8uL3dlYmV4dGVuc2lvbi93cC1kZXYvZGJpLXNlbmQudHMiLCJ3ZWJwYWNrOi8vc291cmNlcy8uL3dlYmV4dGVuc2lvbi93cC1kZXYvZmV0Y2hlci50cyIsIndlYnBhY2s6Ly9zb3VyY2VzLy4vd2ViZXh0ZW5zaW9uL3dwLWRldi9vdmVybGF5LnRzIiwid2VicGFjazovL3NvdXJjZXMvLi93ZWJleHRlbnNpb24vd3AtZGV2L3Byb2plY3RzL3Byb2plY3RfZG9tLnRzIiwid2VicGFjazovL3NvdXJjZXMvLi93ZWJleHRlbnNpb24vd3AtZGV2L3Byb2plY3RzL3Byb2plY3RzLnRzIiwid2VicGFjazovL3NvdXJjZXMvLi93ZWJleHRlbnNpb24vd3AtZGV2L3NvdXJjZS9zb3VyY2UudHMiLCJ3ZWJwYWNrOi8vc291cmNlcy8uL3dlYmV4dGVuc2lvbi93cC1kZXYvdXRpbC50cyIsIndlYnBhY2s6Ly9zb3VyY2VzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NvdXJjZXMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NvdXJjZXMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zb3VyY2VzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc291cmNlcy8uL3dlYmV4dGVuc2lvbi93cC1kZXYvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZmV0Y2hlciBmcm9tIFwiLi9mZXRjaGVyXCI7XHJcbmltcG9ydCAqIGFzIHNvdXJjZSBmcm9tIFwiLi9zb3VyY2Uvc291cmNlXCI7XHJcbmltcG9ydCAqIGFzIHByb2plY3QgZnJvbSBcIi4vcHJvamVjdHMvcHJvamVjdHNcIjtcclxuaW1wb3J0IHsgYWdlX2RiaXMgfSBmcm9tIFwiLi9kYmktc2VuZFwiO1xyXG5cclxubGV0IHNpZGVQYW5lbDogRWxlbWVudDtcclxuXHJcblxyXG5sZXQgY2xpcGJvYXJkQ29udGFpbmVyOiBFbGVtZW50O1xyXG5sZXQgY2xpcGJvYXJkQ3NzOiBIVE1MRWxlbWVudDtcclxuXHJcblxyXG4vLyBWQVJTXHJcbmxldCB3YWl0aW5nU2Vjb25kU2hpZnQgPSAwO1xyXG5sZXQgd2FpdGluZ1NlY29uZEN0cmxTaGlmdCA9IDA7XHJcblxyXG5cclxubGV0IGNsaXBib2FyZElubmVyIDogSFRNTEVsZW1lbnQ7XHJcbmxldCBjbGlwYm9hcmRDb2RlQ2hlY2tib3ggOiBIVE1MSW5wdXRFbGVtZW50O1xyXG5sZXQgY2xpcGJvYXJkVGV4dFR5cGVJbnB1dCA6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG5sZXQgY2xpcGJvYXJkQ29uY2F0Q29udGVudHMgOiBIVE1MRWxlbWVudDtcclxuZXhwb3J0IGxldCB0ZXh0Q29uY2F0ZW5hdGlvbkNhcHR1cmluZyA6IGJvb2xlYW4gPSBmYWxzZTtcclxubGV0IHRleHRDb25jYXRlbmF0aW9uQ29udGVudCA6IHN0cmluZyA9IFwiXCI7XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdENsaXBib2FyZChfc2lkZVBhbmVsOiBFbGVtZW50KSB7XHJcblx0Ly8gY2xpcGJvYXJkQ29kZUNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRvZ2dsZVNlbGVjdENvZGUpO1xyXG5cclxuXHQvLyB3cml0ZVRleHRDb25jYXRlbmF0aW9uQ29udGVudFRvRG9tKCk7XHJcblxyXG5cdC8vIGlmIChleHRlbnNpb25TdGF0ZUZyb250LnRleHRDb25jYXRlbmF0aW9uQ2FwdHVyaW5nKSB7XHJcblx0Ly8gXHRjbGlwYm9hcmRJbm5lci5jbGFzc0xpc3QuYWRkKCdhZ2VfYWN0aXZlQ2xpcGJvYXJkJyk7XHJcblx0Ly8gfVxyXG5cdC8vIGVsc2Uge1xyXG5cdC8vIFx0Y2xpcGJvYXJkSW5uZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWdlX2FjdGl2ZUNsaXBib2FyZCcpO1xyXG5cdC8vIH1cclxuXHJcblx0LyogXHJcblx0XHJcblx0XHRcdE5FVyBORVcgTkVXIC0gMjAyNC0xMC0wMlxyXG5cdFxyXG5cdCovXHJcblxyXG5cdHNpZGVQYW5lbCA9IF9zaWRlUGFuZWw7XHJcblxyXG5cdGNsaXBib2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdGNsaXBib2FyZENvbnRhaW5lci5pZCA9IFwiYWdlX2NsaXBib2FyZENvbnRhaW5lclwiO1xyXG5cdGNsaXBib2FyZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYWdlX3BhbmVsQ29udGFpbmVyXCIsIFwiY29sbGFwc2VkXCIpO1xyXG5cclxuXHJcblxyXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NvcHknLCBjb3B5RXZlbnQpXHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY3V0JywgY3V0RXZlbnQpXHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncGFzdGUnLCBwYXN0ZUV2ZW50KVxyXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlkb3duQWN0aXZlRXh0ZW5zaW9uKVxyXG5cclxuXHJcblx0ZmV0Y2hlci5mZXRjaEh0bWwoXCJjbGlwYm9hcmQuaHRtbFwiKVxyXG5cdFx0LnRoZW4oaHRtbCA9PiB7XHJcblx0XHRcdGNsaXBib2FyZENvbnRhaW5lci5pbm5lckhUTUwgPSBodG1sO1xyXG5cclxuXHJcblx0XHRcdGNsaXBib2FyZElubmVyID0gY2xpcGJvYXJkQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX2NsaXBib2FyZElubmVyXCIpO1xyXG5cdFx0XHRjbGlwYm9hcmRDb2RlQ2hlY2tib3ggPSBjbGlwYm9hcmRDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2VfY2xpcGJvYXJkQ29kZUNoZWNrYm94XCIpO1xyXG5cdFx0XHRjbGlwYm9hcmRUZXh0VHlwZUlucHV0ID0gY2xpcGJvYXJkQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX2NsaXBib2FyZFRleHRUeXBlSW5wdXRcIik7XHJcblx0XHRcdGNsaXBib2FyZENvbmNhdENvbnRlbnRzID0gY2xpcGJvYXJkQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX2NsaXBib2FyZENvbmNhdENvbnRlbnRcIik7XHJcblx0XHR9KVxyXG5cclxuXHRjbGlwYm9hcmRDc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0Y2xpcGJvYXJkQ3NzLmlkID0gXCJhZ2VfY2xpcGJvYXJkU3R5bGVcIjtcclxuXHRmZXRjaGVyLmZldGNoQ3NzKFwiY2xpcGJvYXJkLmNzc1wiKVxyXG5cdFx0LnRoZW4oY3NzID0+IHtcclxuXHRcdFx0Y2xpcGJvYXJkQ3NzLmlubmVyVGV4dCA9IGNzcztcclxuXHRcdH0pXHJcblxyXG5cdC8vIGNvbnNvbGUubG9nKFwic2lkZVBhbmVsLmlkID0gXCIsIHNpZGVQYW5lbC5pZClcclxuXHJcblx0c2lkZVBhbmVsLmFwcGVuZChjbGlwYm9hcmRDb250YWluZXIpO1xyXG5cclxuIFxyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuLyogXHJcblxyXG5cdENMSVBCT0FSRCBGVU5DVElPTlNcclxuXHJcbiovXHJcblxyXG5cclxuZnVuY3Rpb24gd3JpdGVUZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnRUb0RvbSgpIHtcclxuXHJcblx0bGV0IGNsaXBib2FyZFN0cmluZyA9IHRleHRDb25jYXRlbmF0aW9uQ29udGVudDtcclxuXHRsZXQgY2xpcGJvYXJkSW5uZXJIdG1sID0gJzxkaXY+JyArIGNsaXBib2FyZFN0cmluZy5yZXBsYWNlKC9cXG4vZywgJzxicj4nKSArICc8L2Rpdj4nO1xyXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2VfY2xpcGJvYXJkQ29uY2F0Q29udGVudCcpLmlubmVySFRNTCA9IGNsaXBib2FyZElubmVySHRtbDtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gc3RhcnRDbGlwYm9hcmRUZXh0Q29uY2F0ZW5hdGlvbigpIHtcclxuXHJcblx0dGV4dENvbmNhdGVuYXRpb25DYXB0dXJpbmcgPSB0cnVlO1xyXG5cdC8vIGV4dGVuc2lvblN0YXRlRnJvbnQudGV4dENvbmNhdGVuYXRpb25Db250ZW50ID0gJyc7XHJcblx0Ly8gd3JpdGVUZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnRUb0RvbSgpO1xyXG5cdC8vd3JpdGVTdGF0ZUZyb21Gcm9udCgpO1xyXG5cdC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2VfY2xpcGJvYXJkQ29udGFpbmVyJykuY2xhc3NMaXN0LnJlbW92ZSgnYWdlX2Rpc3BsYXlOb25lJyk7XHJcblx0Y2xpcGJvYXJkSW5uZXIuY2xhc3NMaXN0LmFkZCgnYWdlX2FjdGl2ZUNsaXBib2FyZCcpO1xyXG5cdGNvbnNvbGUubG9nKCdzdGFydCB0ZXh0IGNvbmNhdGVudGF0aW9uIGNhcHR1cmUnKTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFNwYWNlQ2hhcmFjdGVyVG9DYXB0dXJlQ29uY2F0ZW5hdGlvbkNvbnRlbnRzKCkge1xyXG5cdGNvbnNvbGUubG9nKCdhZGRlZCBuZXcgc3BhY2UnKVxyXG5cdGlmICh0ZXh0Q29uY2F0ZW5hdGlvbkNhcHR1cmluZykge1xyXG5cdFx0dGV4dENvbmNhdGVuYXRpb25Db250ZW50ICs9ICcgJztcclxuXHRcdC8vd3JpdGVTdGF0ZUZyb21Gcm9udCgpO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZE5ld0xpbmVUb0NhcHR1cmVDb25jYXRlbmF0aW9uQ29udGVudHMoKSB7XHJcblx0Y29uc29sZS5sb2coJ2FkZGVkIG5ldyBsaW5lJylcclxuXHRpZiAodGV4dENvbmNhdGVuYXRpb25DYXB0dXJpbmcpIHtcclxuXHRcdHRleHRDb25jYXRlbmF0aW9uQ29udGVudCArPSAnXFxuJztcclxuXHRcdC8vd3JpdGVTdGF0ZUZyb21Gcm9udCgpO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0b3BDbGlwYm9hcmRUZXh0Q29uY2F0ZW5hdGlvbigpIHtcclxuXHJcblxyXG5cclxuXHR0ZXh0Q29uY2F0ZW5hdGlvbkNhcHR1cmluZyA9IGZhbHNlO1xyXG5cdHRleHRDb25jYXRlbmF0aW9uQ29udGVudCA9ICcnO1xyXG5cdHdyaXRlVGV4dENvbmNhdGVuYXRpb25Db250ZW50VG9Eb20oKTtcclxuXHRjbGlwYm9hcmRJbm5lci5jbGFzc0xpc3QucmVtb3ZlKCdhZ2VfYWN0aXZlQ2xpcGJvYXJkJyk7XHJcblx0Ly93cml0ZVN0YXRlRnJvbUZyb250KCk7XHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qIFxyXG5cclxuXHRDTElQQk9BUkQgRVZFTlRTXHJcblxyXG4qL1xyXG5cclxuLy8gZnVuY3Rpb24gdG9nZ2xlU2VsZWN0Q29kZSgpIHtcclxuLy8gXHRpZiAoY2xpcGJvYXJkQ29kZUNoZWNrYm94LmNoZWNrZWQpIHtcclxuLy8gXHRcdGNsaXBib2FyZFRleHRUeXBlSW5wdXQuZGlzYWJsZWQgPSBmYWxzZTtcclxuLy8gXHR9XHJcbi8vIFx0ZWxzZSB7XHJcbi8vIFx0XHRjbGlwYm9hcmRUZXh0VHlwZUlucHV0LmRpc2FibGVkID0gdHJ1ZTtcclxuLy8gXHR9XHJcblxyXG4vLyB9XHJcblxyXG5hc3luYyBmdW5jdGlvbiBwYXN0ZUV2ZW50KGV2ZW50IDogQ2xpcGJvYXJkRXZlbnQpIHtcclxuXHQvLyBjb25zb2xlLmxvZygncGFzdGVwYXN0ZScpXHJcblx0Y29uc29sZS5sb2coJ1BBU1RFIEVWRU5UJylcclxuXHQvLyBjb25zb2xlLmxvZyhldmVudC5jbGlwYm9hcmREYXRhLmZpbGVzWzBdKVxyXG5cclxuXHJcblx0bGV0IGFjdGl2ZUVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xyXG5cdGlmIChhY3RpdmVFbGVtZW50LmlzQ29udGVudEVkaXRhYmxlKSB7XHJcblx0XHQvLyBjb25zb2xlLmxvZyhcIkNvbnRlbnRFZGl0YWJsZS4gTm8gbmV3IHNoYXJkIVwiKVxyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblxyXG5cdGxldCBjbGlwYm9hcmRDb250ZW50VHlwZSA9IGRldGVybWluZUNsaXBib2FyZENvbnRlbnRUeXBlKGV2ZW50LmNsaXBib2FyZERhdGEpO1xyXG5cclxuXHJcblx0aWYgKGNsaXBib2FyZENvbnRlbnRUeXBlID09PSAndGV4dCcpIHtcclxuXHRcdGNvbnNvbGUubG9nKCdkZWFsIHdpdGggdGV4dCcpOyBcclxuXHJcblx0XHRsZXQgY2xpcGJvYXJkVGV4dCA9IChldmVudC5jbGlwYm9hcmREYXRhIC8qIHx8IHdpbmRvdy5jbGlwYm9hcmREYXRhICovKS5nZXREYXRhKFwidGV4dFwiKTtcclxuXHRcdGNvbnNvbGUubG9nKCdjbGlwYm9hcmRUZXh0ID0gJywgY2xpcGJvYXJkVGV4dCk7XHJcblx0XHRcclxuXHJcblx0XHRpZiAodGV4dENvbmNhdGVuYXRpb25DYXB0dXJpbmcpIHtcclxuXHJcblx0XHRcdHRleHRDb25jYXRlbmF0aW9uQ29udGVudCArPSBjbGlwYm9hcmRUZXh0O1xyXG5cclxuXHRcdFx0d3JpdGVUZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnRUb0RvbSgpXHJcblxyXG5cdFx0XHQvL3dyaXRlU3RhdGVGcm9tRnJvbnQoKTtcclxuXHRcdFx0Ly8gY29uc29sZS5sb2coZXh0ZW5zaW9uU3RhdGVGcm9udC50ZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnQpO1xyXG5cclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRjb25zb2xlLmxvZygnUEFTVEUgVE8gTkVXIFNIQVJEJylcclxuXHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKGNsaXBib2FyZENvZGVDaGVja2JveC5jaGVja2VkKVxyXG5cclxuXHRcdFx0aWYgKGNsaXBib2FyZENvZGVDaGVja2JveC5jaGVja2VkKSB7XHJcblx0XHRcdFx0cG9zdE5ld0NvZGVPYmplY3RUb0N1cnJlbnRTb3VyY2VBbmRGdWxsUmVsb2FkT2ZTb3VyY2VDaGlsZHJlbihjbGlwYm9hcmRUZXh0VHlwZUlucHV0LnZhbHVlLCBjbGlwYm9hcmRUZXh0KVxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHBvc3ROZXdUZXh0Tm9kZVRvQ3VycmVudFNvdXJjZUFuZEZ1bGxSZWxvYWRPZlNvdXJjZUNoaWxkcmVuKGNsaXBib2FyZFRleHRUeXBlSW5wdXQudmFsdWUsIGNsaXBib2FyZFRleHQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGlmIChzaGFyZGNhcmQuY29udGVudEVkaXRhYmxlID09PSAndHJ1ZScpIHtcclxuXHRcdC8vIFx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJpbnNlcnRIVE1MXCIsIGZhbHNlLCBjbGlwYm9hcmRUZXh0KTtcclxuXHRcdC8vIFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdC8vIH1cclxuXHRcdC8vIGVsc2UgaWYgKHNoYXJkT2JqZWN0LnRleHRDb250ZW50ID09ICcnICYmIHNoYXJkT2JqZWN0LmZpbGVOYW1lID09ICcnKSB7XHJcblx0XHQvLyBcdGluc2VydFNoYXJkY2FyZFRleHRDb250ZW50KHNoYXJkY2FyZCwgY2xpcGJvYXJkVGV4dCk7XHJcblx0XHQvLyBcdC8vc2hhcmRjYXJkLnNoYXJkLmVsZW1lbnRUeXBlID0gJ3RleHQnO1xyXG5cdFx0Ly8gXHR1cGRhdGVTaGFyZGNhcmRUZXh0Q29udGVudChzaGFyZGNhcmQpO1xyXG5cdFx0Ly8gfVxyXG5cdFx0Ly8gZWxzZSB7XHJcblx0XHQvLyBcdGNvbnNvbGUubG9nKCdUaGlzIHNvdXJjZSBhbHJlYWR5IGhhcyBjb250ZW50LiBSZXR1cm5pbmcuJyk7XHJcblxyXG5cdFx0Ly8gfVxyXG5cclxuXHJcblxyXG5cdH1cclxuXHRlbHNlIGlmIChjbGlwYm9hcmRDb250ZW50VHlwZSA9PT0gJ2ZpbGUnKSB7XHJcblx0XHRjb25zb2xlLmxvZygnZGVhbCB3aXRoIGZpbGUnKVxyXG5cclxuXHRcdGxldCBuZXdGaWxlID0gZXZlbnQuY2xpcGJvYXJkRGF0YS5maWxlc1swXTtcclxuXHJcblx0XHRsZXQgZmlsZUNhdGVnb3J5T2JqZWN0ID0gZGV0ZXJtaW5lRmlsZUNhdGVnb3JpZXMobmV3RmlsZSk7XHJcblx0XHRjb25zb2xlLmxvZygnZmlsZUNhdGVnb3J5T2JqZWN0OiAnLCBmaWxlQ2F0ZWdvcnlPYmplY3QpXHJcblxyXG5cdFx0aWYgKGZpbGVDYXRlZ29yeU9iamVjdC5maWxlVHlwZSA9PT0gJ3R5cGV0eXBlJykge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdGSUxFIEVYVEVOU0lPTiBIQUQgTk8gTUFUQ0hJTkcgQ09OVEVOVCBUWVBFJylcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBwb3N0RmlsZVF1ZXJ5UGFyYW1ldGVycyA9IHtcclxuXHRcdFx0VHlwZTogZmlsZUNhdGVnb3J5T2JqZWN0LmZpbGVUeXBlLFxyXG5cdFx0XHRUaXRsZTogXCJcIixcclxuXHRcdFx0RXh0ZW5zaW9uOiBmaWxlQ2F0ZWdvcnlPYmplY3QuZmlsZUV4dGVuc2lvbixcclxuXHRcdFx0SUFtQXV0aG9yOiAwLFxyXG5cdFx0fVxyXG5cclxuXHRcdHBvc3ROZXdGaWxlVG9DdXJyZW50U291cmNlQW5kRnVsbFJlbG9hZE9mU291cmNlQ2hpbGRyZW4obmV3RmlsZSwgcG9zdEZpbGVRdWVyeVBhcmFtZXRlcnMsIGZpbGVDYXRlZ29yeU9iamVjdC5taW1lVHlwZSk7XHJcblxyXG5cdFx0Ly8gY29uc29sZS5sb2cobmV3RmlsZSlcclxuXHJcblx0XHQvLyBjb25zb2xlLmxvZyhhd2FpdCBhZ2VfZGJpc1dlLmZpbGVHZXQoMTIxNjI3Mjc5MzYwKSk7XHJcblxyXG5cdFx0Ly8gbGV0IHNvdXJjZWlkID0gZXh0cmFjdEN1cnJlbnRTb3VyY2VJZCgpO1xyXG5cclxuXHRcdC8vIGlmIChzaGFyZE9iamVjdC5maWxlTmFtZSA9PSAnJyAmJiBzaGFyZE9iamVjdC50ZXh0Q29udGVudCA9PSAnJykge1xyXG5cdFx0Ly8gXHRwb3N0RmlsZShldmVudC5jbGlwYm9hcmREYXRhLmZpbGVzWzBdLCBzb3VyY2VpZCwgc2hhcmRpZCk7XHJcblx0XHQvLyBcdGNvbnNvbGUubG9nKCdub25vbm8nKVxyXG5cdFx0Ly8gfVxyXG5cdFx0Ly8gZWxzZSB7XHJcblx0XHQvLyBcdGNvbnNvbGUubG9nKCdUaGlzIHNvdXJjZSBhbHJlYWR5IGhhcyBjb250ZW50LiBSZXR1cm5pbmcuJyk7XHJcblx0XHQvLyB9XHJcblxyXG5cclxuXHJcblx0fVxyXG5cclxuXHJcblxyXG59XHJcbi8vIGNvbnN0IHBhc3BhcyA9IG5ldyBDbGlwYm9hcmRFdmVudCgncGFzdGUnKTtcclxuLy8gZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChwYXNwYXMpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGNvcHlFdmVudChldmVudCA6IENsaXBib2FyZEV2ZW50KSB7XHJcblxyXG5cdC8vIGNvbnNvbGUubG9nKCdjb3Bjb3AnKVxyXG5cdC8vIGNvbnNvbGUubG9nKGV2ZW50LmNsaXBib2FyZERhdGEgKVxyXG5cdC8vIGxldCBjYmQgPSBldmVudC5jbGlwYm9hcmREYXRhIHx8IHdpbmRvdy5jbGlwYm9hcmREYXRhXHJcblx0Ly8gbGV0IGNvcGllZERhdGEgPSBjYmQuZ2V0RGF0YSgnVGV4dCcpO1xyXG5cdC8vIGNvbnNvbGUubG9nKCdjb3BpZWREYXRhJywgY29waWVkRGF0YSlcclxuXHJcblx0Ly8gYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKCB7XHJcblx0Ly8gXHRjb21tYW5kOiBcImNvcHljb3B5XCJcclxuXHQvLyB9KTtcclxuXHJcblx0Y29uc29sZS5sb2coJ0NPUFlFVkVOVCcpXHJcblxyXG5cclxuXHQvLyBuYXZpZ2F0b3IuY2xpcGJvYXJkXHJcblx0Ly8gXHQucmVhZCgpXHJcblx0Ly8gXHQudGhlbihcclxuXHQvLyBcdFx0KGNsaXBUZXh0KSA9PiAoY29uc29sZS5sb2coY2xpcFRleHQpKSxcclxuXHQvLyBcdCk7XHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBjdXRFdmVudChldmVudCA6IEtleWJvYXJkRXZlbnQpIHtcclxuXHRjb25zb2xlLmxvZygnQ1VUIEVWRU5UJylcclxufVxyXG5cclxuXHJcblxyXG4vKiBcclxuXHJcblx0SEVMUEVSIEZVTkNUSU9OU1xyXG5cclxuKi9cclxuXHJcblxyXG5cclxuXHJcbmxldCBkZXRlcm1pbmVDbGlwYm9hcmRDb250ZW50VHlwZSA9IGZ1bmN0aW9uIChldmVudENsaXBib2FyZERhdGEgOiBhbnkpIHtcclxuXHJcblx0aWYgKHR5cGVvZiBldmVudENsaXBib2FyZERhdGEuZmlsZXNbMF0gIT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHQvLyBwb3N0RmlsZShkYXRhQ2xpcGJvYXJkRXZlbnQuZmlsZXNbMF0sIHNvdXJjZWlkLCBzaGFyZGlkKTtcclxuXHRcdHJldHVybiAnZmlsZSc7XHJcblx0fVxyXG5cdGVsc2UgaWYgKChldmVudENsaXBib2FyZERhdGEgLyogfHwgd2luZG93LmNsaXBib2FyZERhdGEgKi8pLmdldERhdGEoXCJ0ZXh0XCIpICE9PSAnJykge1xyXG5cdFx0Ly9jb25zb2xlLmxvZygoZXZlbnQuY2xpcGJvYXJkRGF0YSB8fCB3aW5kb3cuY2xpcGJvYXJkRGF0YSkuZ2V0RGF0YShcInRleHRcIikpO1xyXG5cclxuXHRcdGxldCBjbGlwYm9hcmRUZXh0ID0gKGV2ZW50Q2xpcGJvYXJkRGF0YSAvKiB8fCB3aW5kb3cuY2xpcGJvYXJkRGF0YSAqLykuZ2V0RGF0YShcInRleHRcIik7XHJcblx0XHRsZXQgYmxvYiA9IG5ldyBCbG9iKFtjbGlwYm9hcmRUZXh0XSwgeyB0eXBlOiAndGV4dC9wbGFpbicgfSk7XHJcblx0XHRsZXQgZmlsZSA9IG5ldyBGaWxlKFtibG9iXSwgXCJjbGlwYm9hcmQudHh0XCIsIHsgdHlwZTogXCJ0ZXh0L3BsYWluXCIgfSk7XHJcblxyXG5cdFx0Ly9wb3N0RmlsZShmaWxlLCBzb3VyY2VpZCwgc2hhcmRpZCk7XHJcblx0XHRyZXR1cm4gJ3RleHQnO1xyXG5cdH1cclxuXHRlbHNlIHtcclxuXHRcdGNvbnNvbGUubG9nKCdObyBmaWxlIG5vciB0ZXh0IGRldGVjdGVkLicpO1xyXG5cdFx0cmV0dXJuICdlbXB0eSc7XHJcblx0fVxyXG5cclxuXHQvL3JldHVybiAnY2xpcGJvYXJkQ29udGVudFR5cGUnO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxubGV0IGV4dGVuc2lvbk9iamVjdCA6IGFueSA9IHtcclxuXHQvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9NZWRpYS9Gb3JtYXRzL0ltYWdlX3R5cGVzXHJcblx0aW1hZ2U6IFsnYXBuZycsICdhdmlmJywgJ2dpZicsICdibXAnLCAnanBnJywgJ2pwZWcnLCAnamZpZicsICdwanBlZycsICdwanAnLCAncG5nJywgJ3N2ZycsICd3ZWJwJ10sXHJcblx0Ly8gaHR0cHM6Ly93d3cuY2FudG8uY29tL2Jsb2cvYXVkaW8tZmlsZS10eXBlcy9cclxuXHRhdWRpbzogWydtNGEnLCAnZmxhYycsICdtcDMnLCAnd2F2JywgJ3dtYScsICdhYWMnXSxcclxuXHQvLyBodHRwczovL3d3dy5hZG9iZS5jb20vY3JlYXRpdmVjbG91ZC92aWRlby9kaXNjb3Zlci9iZXN0LXZpZGVvLWZvcm1hdC5odG1sXHJcblx0dmlkZW86IFsnbXA0JywgJ21vdicsICd3bXYnLCAnYXZpJywgJ0FWQ0hEJywgJ2ZsdicsICdmNHYnLCAnc3dmJywgJ21rdicsICd3ZWJtJywgJ21wZyddLFxyXG5cdHBkZjogWydwZGYnXSxcclxuXHRkYXRhOiBbJ2pzb24nLCAnY3N2JywgJ3RzdicsICdkYicsICd4bHN4JywgJ29kcycsICdvZGInXSxcclxuXHQvLyBUZXh0YXJlYSBleHRlbnNpb25cclxuXHR0ZXh0OiBbJ3R4dCcsICdtZCddLFxyXG5cdGNvZGU6IFsnanMnLCAndHMnLCAnY3NzJywgJ2h0bWwnLCAnY3MnXSxcclxufVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBkZXRlcm1pbmVGaWxlQ2F0ZWdvcmllcyhzZWxlY3RlZEZpbGUgOiBhbnkpIDogYW55IHtcclxuXHJcblx0bGV0IHNlbGVjdGVkRmlsZVR5cGU6IHN0cmluZyA9IHNlbGVjdGVkRmlsZS50eXBlO1xyXG5cdGxldCBmaWxlQ2F0ZWdvcmllcyA9IHtcclxuXHRcdG1pbWVUeXBlOiBzZWxlY3RlZEZpbGVUeXBlLFxyXG5cdFx0YmFzZUZpbGVOYW1lOiAnYmFzZW5hbWUnLFxyXG5cdFx0ZmlsZUV4dGVuc2lvbjogJ2V4dGV4dCcsXHJcblx0XHRmaWxlVHlwZTogJ3R5cGV0eXBlJ1xyXG5cdH1cclxuXHJcblxyXG5cclxuXHRmaWxlQ2F0ZWdvcmllcy5maWxlRXh0ZW5zaW9uID0gZGV0ZXJtaW5lRmlsZUV4dGVuc2lvbihzZWxlY3RlZEZpbGUpO1xyXG5cdGZpbGVDYXRlZ29yaWVzLmJhc2VGaWxlTmFtZSA9IGRldGVybWluZUJhc2VGaWxlTmFtZShzZWxlY3RlZEZpbGUpO1xyXG5cclxuXHQvLyBmaWxlQ2F0ZWdvcmllcy5maWxlVHlwZSA9IGRldGVybWluZUZpbGVUeXBlKGZpbGVDYXRlZ29yaWVzLm1pbWVUeXBlLCBmaWxlQ2F0ZWdvcmllcy5maWxlRW5kaW5nKTtcclxuXHJcblx0Ly8gZmlsZUNhdGVnb3JpZXMuZmlsZVR5cGUgPSBPYmplY3QuZW50cmllcyhleHRlbnNpb25PYmplY3QpLmZvckVhY2godHlwZUFycmF5ID0+IHR5cGVBcnJheS5maWx0ZXIoZXh0ZW5zaW9uID0+IGV4dGVuc2lvbiA9PT0gZmlsZUNhdGVnb3JpZXMuZmlsZUV4dGVuc2lvbikpXHJcblx0ZmlsZUNhdGVnb3JpZXMuZmlsZVR5cGUgPSBPYmplY3Qua2V5cyhleHRlbnNpb25PYmplY3QpLmZpbmQodHlwZSA9PiBleHRlbnNpb25PYmplY3RbdHlwZV0uaW5jbHVkZXMoZmlsZUNhdGVnb3JpZXMuZmlsZUV4dGVuc2lvbikpO1xyXG5cdC8vIGNvbnNvbGUubG9nKGZpbGVDYXRlZ29yaWVzLmZpbGVUeXBlKVxyXG5cdC8vY29uc29sZS5sb2coJ2ZpbGUgdHlwZSBkZXRlcm1pbmVkIGhlcmUhJyk7XHJcblx0Ly8gaWYgKGZpbGVDYXRlZ29yaWVzLmZpbGVFeHRlbnNpb24gPT09ICdkYicpIHtcclxuXHQvLyBcdC8vIGh0dHA6Ly9maWxlZm9ybWF0cy5hcmNoaXZldGVhbS5vcmcvd2lraS9EQl8oU1FMaXRlKVxyXG5cdC8vIFx0ZmlsZUNhdGVnb3JpZXMubWltZVR5cGUgPSAnYXBwbGljYXRpb24vdm5kLnNxbGl0ZTMnO1xyXG5cdC8vIH1cclxuXHRjb25zb2xlLmxvZyhmaWxlQ2F0ZWdvcmllcy5taW1lVHlwZSlcclxuXHRpZiAoZmlsZUNhdGVnb3JpZXMubWltZVR5cGUgPT0gJycpIHtcclxuXHRcdC8vIGZpbGVDYXRlZ29yaWVzLm1pbWVUeXBlID09ICdhcHBsaWNhdGlvbi9zdHJlYW0nO1xyXG5cdFx0ZmlsZUNhdGVnb3JpZXMubWltZVR5cGUgPSAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJztcclxuXHR9XHJcblxyXG5cdHJldHVybiBmaWxlQ2F0ZWdvcmllcztcclxufVxyXG5cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gZGV0ZXJtaW5lRmlsZUV4dGVuc2lvbihzZWxlY3RlZEZpbGUgOiBGaWxlKSB7XHJcblxyXG5cdHJldHVybiBzZWxlY3RlZEZpbGUubmFtZS5tYXRjaCgvXFx3KyQvZylbMF07XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBkZXRlcm1pbmVCYXNlRmlsZU5hbWUoc2VsZWN0ZWRGaWxlOiBGaWxlKSB7XHJcblxyXG5cdHJldHVybiBzZWxlY3RlZEZpbGUubmFtZS5tYXRjaCgvXi4qKD89XFwuW14uXSskKS8pWzBdO1xyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuLyogXHJcblxyXG5cdENMSVBCT0FSRCBGRVRDSFxyXG5cclxuKi9cclxuXHJcblxyXG5hc3luYyBmdW5jdGlvbiBwb3N0TmV3VGV4dE5vZGVUb0N1cnJlbnRTb3VyY2VBbmRGdWxsUmVsb2FkT2ZTb3VyY2VDaGlsZHJlbih0ZXh0VHlwZSA6IHN0cmluZywgVGV4dENvbnRlbnQgOiBzdHJpbmcpIHtcclxuXHJcblx0bGV0IHNvdXJjZU9iamVjdDogYW55ID0gc291cmNlLmdldEN1cnJlbnRTb3VyY2VPYmplY3QoKTtcclxuXHRpZihzb3VyY2VPYmplY3QgPT0gdW5kZWZpbmVkKXtcclxuXHRcdGNvbnNvbGUud2FybihcIlVuYWJsZSB0byBwb3N0IG5ldyB0ZXh0IG9iamVjdC4gTm8gc2VsZWN0ZWQgc291cmNlT2JqZWN0LlwiKVxyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHRcclxuXHQvLyBsZXQgc291cmNlVXVpZCA9IHNvdXJjZU9iamVjdC5VdWlkO1xyXG5cdC8vIGxldCBzb3VyY2VVdWlkID0gc291cmNlLmdldEN1cnJlbnRTb3VyY2VVdWlkKCk7XHJcblxyXG5cdC8vIGxldCBzb3VyY2VPYmplY3Q6IGFueSA9IHNvdXJjZS5jdXJyZW50U291cmNlT2JqZWN0O1xyXG5cdGxldCBzb3VyY2VVdWlkID0gc291cmNlT2JqZWN0LlV1aWQ7XHJcblxyXG5cdC8vIGNvbnNvbGUubG9nKCdwb3N0TmV3VGV4dE5vZGVUb0N1cnJlbnRTb3VyY2VBbmRGdWxsUmVsb2FkT2ZTb3VyY2VDaGlsZHJlbigpJyk7XHJcblx0Ly8gY29uc29sZS5sb2coJ3NvdXJjZVV1aWQgPSAnLCBzb3VyY2VVdWlkKTtcclxuXHRcclxuXHRcclxuXHJcblx0Ly8gQ29udGVudF9JbnNlcnRDaGlsZFV1aWRUYWJsZShVdWlkLCBjaGlsZFRhYmxlKVxyXG5cdGlmIChzb3VyY2VVdWlkICE9PSB1bmRlZmluZWQpIHtcclxuXHJcblx0XHQvLyBsZXQgbmV3VGV4dE9iamVjdCA9IChhd2FpdCBhZ2VfZGJpc1dlLkNvbnRlbnRfSW5zZXJ0Q2hpbGRVdWlkVGFibGUoZXh0ZW5zaW9uU3RhdGVGcm9udC5jdXJyZW50X3NvdXJjZU9iamVjdC5VdWlkLCAnVGV4dCcpKS5Db250ZW50O1xyXG5cdFx0bGV0IG5ld1RleHRDb250ZW50T2JqZWN0ID0gKGF3YWl0IGFnZV9kYmlzLkNvbnRlbnRFZGdlX0luc2VydEFkamFjZW50VG9VdWlkSW50b1RhYmxlKHNvdXJjZVV1aWQsIDEsICdUZXh0JywgJycsICcnLCAnLycpKS5jb250ZW50O1xyXG5cclxuXHRcdC8vIGNvbnNvbGUubG9nKG5ld1RleHRPYmplY3QpXHJcblxyXG5cdFx0bmV3VGV4dENvbnRlbnRPYmplY3QuVGl0bGUgPSBUZXh0Q29udGVudC5zdWJzdHJpbmcoMCwgMjUpO1xyXG5cdFx0bmV3VGV4dENvbnRlbnRPYmplY3QuVGV4dENvbnRlbnQgPSBUZXh0Q29udGVudDtcclxuXHRcdG5ld1RleHRDb250ZW50T2JqZWN0LlR5cGUgPSB0ZXh0VHlwZTtcclxuXHJcblxyXG5cdFx0YXdhaXQgYWdlX2RiaXMuQ29udGVudF9VcGRhdGVXaXRoQ29udGVudE9iamVjdChuZXdUZXh0Q29udGVudE9iamVjdCk7XHJcblx0XHRcclxuXHRcdC8vIFRPRE8gXHJcblx0XHQvLyBVUERBVEUgU09VUkNFIFBBTkVMIHgzIFxyXG5cdFx0Ly8gYXdhaXQgZmV0Y2hDdXJyZW50U291cmNlQ2hpbGRyZW5UaGVuV3JpdGVUb1N0YXRlcygpO1xyXG5cdFx0Ly8gcG9wdWxhdGVTb3VyY2VDaGlsZFRhYmxlRnJvbVN0YXRlKCk7XHJcblx0XHRhd2FpdCBzb3VyY2UubG9hZFdpdGhDb250ZW50T2JqZWN0KHNvdXJjZU9iamVjdCk7XHJcblx0XHRzb3VyY2UuZm9jdXNPbkxhc3RDaGlsZFJvd1RpdGxlKCk7XHJcblxyXG5cdFx0Ly8gc2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHQvLyB9LCAxMDApO1xyXG5cclxuXHR9XHJcblxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBwb3N0TmV3Q29kZU9iamVjdFRvQ3VycmVudFNvdXJjZUFuZEZ1bGxSZWxvYWRPZlNvdXJjZUNoaWxkcmVuKFR5cGU6IHN0cmluZywgQ29kZUNvbnRlbnQ6IHN0cmluZykge1xyXG5cclxuXHRsZXQgc291cmNlT2JqZWN0OiBhbnkgPSBzb3VyY2UuZ2V0Q3VycmVudFNvdXJjZU9iamVjdCgpO1xyXG5cdGxldCBzb3VyY2VVdWlkID0gc291cmNlT2JqZWN0LlV1aWQ7XHJcblxyXG5cdGlmIChzb3VyY2VPYmplY3QgPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRjb25zb2xlLndhcm4oXCJVbmFibGUgdG8gcG9zdCBuZXcgY29kZSBvYmplY3QuIE5vIHNlbGVjdGVkIHNvdXJjZU9iamVjdC5cIilcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdC8vIENvbnRlbnRfSW5zZXJ0Q2hpbGRVdWlkVGFibGUoVXVpZCwgY2hpbGRUYWJsZSlcclxuXHRpZiAoc291cmNlVXVpZCAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG5cdFx0Ly8gbGV0IG5ld0NvZGVPYmplY3QgPSAoYXdhaXQgYWdlX2RiaXNXZS5Db250ZW50X0luc2VydENoaWxkVXVpZFRhYmxlKGV4dGVuc2lvblN0YXRlRnJvbnQuY3VycmVudF9zb3VyY2VPYmplY3QuVXVpZCwgJ0NvZGUnKSkuQ29udGVudDtcclxuXHRcdGxldCBuZXdDb2RlQ29udGVudE9iamVjdCA9IChhd2FpdCBhZ2VfZGJpcy5Db250ZW50RWRnZV9JbnNlcnRBZGphY2VudFRvVXVpZEludG9UYWJsZShzb3VyY2VVdWlkLCAxLCAnQ29kZScsICcnLCAnJywgJy8nKSkuY29udGVudDtcclxuXHJcblx0XHQvLyBjb25zb2xlLmxvZyhuZXdUZXh0T2JqZWN0KVxyXG5cclxuXHRcdG5ld0NvZGVDb250ZW50T2JqZWN0LlRpdGxlID0gQ29kZUNvbnRlbnQuc3Vic3RyaW5nKDAsIDI1KTtcclxuXHRcdG5ld0NvZGVDb250ZW50T2JqZWN0LlR5cGUgPSBUeXBlO1xyXG5cdFx0bmV3Q29kZUNvbnRlbnRPYmplY3QuQ29kZUNvbnRlbnQgPSBDb2RlQ29udGVudDtcclxuXHJcblxyXG5cdFx0YXdhaXQgYWdlX2RiaXMuQ29udGVudF9VcGRhdGVXaXRoQ29udGVudE9iamVjdChuZXdDb2RlQ29udGVudE9iamVjdCk7XHJcblxyXG5cclxuXHRcdGF3YWl0IHNvdXJjZS5sb2FkV2l0aENvbnRlbnRPYmplY3Qoc291cmNlT2JqZWN0KTtcclxuXHRcdHNvdXJjZS5mb2N1c09uTGFzdENoaWxkUm93VGl0bGUoKTtcclxuXHR9XHJcblxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBwb3N0TmV3RmlsZVRvQ3VycmVudFNvdXJjZUFuZEZ1bGxSZWxvYWRPZlNvdXJjZUNoaWxkcmVuKGZpbGUgOiBGaWxlICwgcXVlcnlQYXJhbXMgOiBhbnkgLCBtaW1lVHlwZSA6IHN0cmluZykge1xyXG5cclxuXHRsZXQgc291cmNlT2JqZWN0OiBhbnkgPSBzb3VyY2UuZ2V0Q3VycmVudFNvdXJjZU9iamVjdCgpO1xyXG5cdGxldCBzb3VyY2VVdWlkID0gc291cmNlT2JqZWN0LlV1aWQ7XHJcblxyXG5cdGlmIChzb3VyY2VPYmplY3QgPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRjb25zb2xlLndhcm4oXCJVbmFibGUgdG8gcG9zdCBuZXcgZmlsZS4gTm8gc2VsZWN0ZWQgc291cmNlT2JqZWN0LlwiKVxyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0Ly8gY29uc29sZS5sb2coc291cmNlVXVpZClcclxuXHJcblx0Ly8gQ29udGVudF9JbnNlcnRDaGlsZFV1aWRUYWJsZShVdWlkLCBjaGlsZFRhYmxlKVxyXG5cdGlmIChzb3VyY2VVdWlkICE9PSB1bmRlZmluZWQpIHtcclxuXHJcblx0XHQvLyBsZXQgbmV3RmlsZU9iamVjdCA9IChhd2FpdCBhZ2VfZGJpc1dlLkNvbnRlbnRfSW5zZXJ0Q2hpbGRVdWlkVGFibGUoc291cmNlVXVpZCwgJ0ZpbGUnKSkuQ29udGVudDtcclxuXHRcdGxldCBuZXdGaWxlQ29udGVudE9iamVjdCA9IChhd2FpdCBhZ2VfZGJpcy5Db250ZW50RWRnZV9JbnNlcnRBZGphY2VudFRvVXVpZEludG9UYWJsZShzb3VyY2VVdWlkLCAxLCAnRmlsZScsICcnLCAnJywgJy8nKSkuY29udGVudDtcclxuXHJcblx0XHQvLyBjb25zb2xlLmxvZyhuZXdUZXh0T2JqZWN0KVxyXG5cclxuXHRcdC8vIG5ld0ZpbGVPYmplY3QuVGl0bGUgPSBDb2RlQ29udGVudC5zdWJzdHJpbmcoMCwgMjUpO1xyXG5cdFx0Ly8gbmV3RmlsZU9iamVjdC5UeXBlID0gVHlwZTtcclxuXHRcdC8vIG5ld0ZpbGVPYmplY3QuQ29kZUNvbnRlbnQgPSBDb2RlQ29udGVudDtcclxuXHJcblxyXG5cdFx0Ly8gYXdhaXQgYWdlX2RiaXNXZS5Db250ZW50X1VwZGF0ZU9uQ29udGVudE9iamVjdChuZXdGaWxlT2JqZWN0KTtcclxuXHRcdC8vIGF3YWl0IGFnZV9kYmlzV2UuZmlsZVBvc3QobmV3RmlsZUNvbnRlbnRPYmplY3QuVXVpZCwgZmlsZSwgcXVlcnlQYXJhbXMsIG1pbWVUeXBlKTtcclxuXHRcdGF3YWl0IGFnZV9kYmlzLlBvc3RfRmlsZShuZXdGaWxlQ29udGVudE9iamVjdC5VdWlkLCBmaWxlLCBxdWVyeVBhcmFtcywgbWltZVR5cGUpO1xyXG5cclxuXHJcblx0XHQvLyBUT0RPIFVQREFURSBVU0lORyBORVcgU1RSVUNUVVJFXHJcblx0XHQvLyBhd2FpdCBmZXRjaEN1cnJlbnRTb3VyY2VDaGlsZHJlblRoZW5Xcml0ZVRvU3RhdGVzKCk7XHJcblx0XHQvLyBwb3B1bGF0ZVNvdXJjZUNoaWxkVGFibGVGcm9tU3RhdGUoKTtcclxuXHRcdGF3YWl0IHNvdXJjZS5sb2FkV2l0aENvbnRlbnRPYmplY3Qoc291cmNlT2JqZWN0KTtcclxuXHRcdHNvdXJjZS5mb2N1c09uTGFzdENoaWxkUm93VGl0bGUoKTtcclxuXHJcblx0XHQvLyBGb2N1cyBsYXN0IHJvdyB0aXRsZSBmb3IgZWFzeSBlZGl0aW5nIVxyXG5cdFx0Ly8gbGV0IF90Ym9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2Vfc291cmNlQ2hpbGRUYWJsZS10Ym9keScpO1xyXG5cdFx0LyogX3Rib2R5Lmxhc3RFbGVtZW50Q2hpbGQubGFzdEVsZW1lbnRDaGlsZC5mb2N1cygpOyAqL1xyXG5cclxuXHR9XHJcblx0ZWxzZSB7XHJcblx0XHRjb25zb2xlLmxvZygnTm8gc2xlY3RlZCBzb3VyY2UuIENvdWxkblwidCBQT1NUIGZpbGUuJylcclxuXHR9XHJcblxyXG59XHJcblxyXG5cclxuYXN5bmMgZnVuY3Rpb24ga2V5ZG93bkFjdGl2ZUV4dGVuc2lvbihrZXlFdmVudCA6IEtleWJvYXJkRXZlbnQpIHtcclxuXHJcblx0bGV0IGFjdGl2ZUVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xyXG5cclxuXHRpZiAoYWN0aXZlRWxlbWVudC5pc0NvbnRlbnRFZGl0YWJsZSkge1xyXG5cdFx0Ly8gY29uc29sZS5sb2coJ0VESVRBQkxFJylcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdGlmIChrZXlFdmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XHJcblx0XHRzdG9wQ2xpcGJvYXJkVGV4dENvbmNhdGVuYXRpb24oKTtcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX2NsaXBib2FyZENvbnRhaW5lclwiKS5jbGFzc0xpc3QuYWRkKFwiY29sbGFwc2VkXCIpO1xyXG5cdH1cclxuXHJcblxyXG5cclxuXHQvLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZlbnQpID0+IHsgY29uc29sZS5sb2coZXZlbnQuY29kZSkgfSkgXHJcblx0aWYgKGtleUV2ZW50LmFsdEtleSkge1xyXG5cclxuXHRcdC8vIFN3aXRjaGVkIHRvIC5jb2RlIHRvIGVuYWJsZSBleHRlbnNpb24gb24gc3dlZGlzaCBrZXlib2FyZFxyXG5cdFx0c3dpdGNoIChrZXlFdmVudC5jb2RlKSB7XHJcblx0XHRcdGNhc2UgXCJLZXlQXCI6IC8vICdwJyA9IHByaW50cyB0aGUgY3VycmVudCBwcm9qZWN0IG9iamVjdFxyXG5cdFx0XHRcdC8vIE5PVCBXT1JLSU5HIFlFVCEgVU5BQkxFIFRPIEdFVCBUSEUgVFlQSU5HIENPUlJFQ1RcclxuXHJcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coXCJ0ZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnQgPSBcIiwgdGV4dENvbmNhdGVuYXRpb25Db250ZW50KTtcclxuXHRcdFx0XHQvLyBsZXQgcHJvamVjdE9iamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3Byb2plY3RQcm9wZXJ0aWVzVGFibGVcIik7XHJcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coJ3Byb2plY3RPYmplY3QgPSAnLCBwcm9qZWN0T2JqZWN0KTtcclxuXHJcblx0XHRcdFx0XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIFwiS2V5UlwiOiAvLyAncicgPSByZWZyZXNoIHByb2plY3QgZGF0YVxyXG5cdFx0XHRcdHByb2plY3QucmVsb2FkQ3VycmVudFByb2plY3QoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJLZXlOXCI6IC8vICduJyA9IG5ldyBzb3VyY2VcclxuXHRcdFx0XHRwcm9qZWN0Lmluc2VydE5ld1NvdXJjZVRvQWN0aXZlUHJvamVjdCgpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcIktleU1cIjogLy8gJ20nID0gbW92ZVxyXG5cdFx0XHRcdHByb2plY3QudG9nZ2xlRXh0ZW5zaW9uTG9jYXRpb24oKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJTbGFzaFwiOiAvLyAnLycgPSBnbyB0byBzZWFyY2hcclxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0U2VhcmNoQnV0dG9uXCIpLmNsaWNrKClcclxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0U2VhcmNoSW5wdXRcIikuZm9jdXMoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJLZXlYXCI6IC8vICd4JyA9IHRvZ2dsZSB0ZXh0L2NvZGVcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZygnQWx0ICsgeCcpXHJcblx0XHRcdFx0bGV0IGNoZWNrZWQgPSBjbGlwYm9hcmRDb2RlQ2hlY2tib3guY2hlY2tlZDtcclxuXHRcdFx0XHRpZiAoY2hlY2tlZCkge1xyXG5cdFx0XHRcdFx0Y2xpcGJvYXJkQ29kZUNoZWNrYm94LmNoZWNrZWQgPSBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRjbGlwYm9hcmRDb2RlQ2hlY2tib3guY2hlY2tlZCA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRvZ2dsZVNlbGVjdENvZGUoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgXCJCcmFja2V0TGVmdFwiOiAvLyAnWycgPSBzdGFydCB0ZXh0IGNhcHR1cmluZ1xyXG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKCdBbHQgKyBbJylcclxuXHRcdFx0XHRzdGFydENsaXBib2FyZFRleHRDb25jYXRlbmF0aW9uKCk7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfY2xpcGJvYXJkQ29udGFpbmVyXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xsYXBzZWRcIik7XHJcblx0XHRcdFx0YnJlYWs7XHJcbiBcclxuXHRcdFx0Y2FzZSBcIkVudGVyXCI6IC8vICdFbnRlcicgPSBhZGQgbmV3IGxpbmVcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZygnQWx0ICsgRW50ZXInKVxyXG5cdFx0XHRcdGFkZE5ld0xpbmVUb0NhcHR1cmVDb25jYXRlbmF0aW9uQ29udGVudHMoKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcIk1pbnVzXCI6IC8vICctJyA9IGFkZCBuZXcgc3BhY2VcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZygnQWx0ICsgRW50ZXInKVxyXG5cdFx0XHRcdGFkZFNwYWNlQ2hhcmFjdGVyVG9DYXB0dXJlQ29uY2F0ZW5hdGlvbkNvbnRlbnRzKCk7IFxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSBcIkJyYWNrZXRSaWdodFwiOiAvLyAnXScgPSBzdG9wIGNvbmFjdGVuYXRpbmcgYW5kIHNlbmQgdG8gYmFja2VuZFxyXG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKCdBbHQgKyBdJylcclxuXHJcblx0XHRcdFx0aWYgKGNsaXBib2FyZENvZGVDaGVja2JveC5jaGVja2VkKSB7XHJcblx0XHRcdFx0XHRhd2FpdCBwb3N0TmV3Q29kZU9iamVjdFRvQ3VycmVudFNvdXJjZUFuZEZ1bGxSZWxvYWRPZlNvdXJjZUNoaWxkcmVuKGNsaXBib2FyZFRleHRUeXBlSW5wdXQudmFsdWUsIHRleHRDb25jYXRlbmF0aW9uQ29udGVudClcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRhd2FpdCBwb3N0TmV3VGV4dE5vZGVUb0N1cnJlbnRTb3VyY2VBbmRGdWxsUmVsb2FkT2ZTb3VyY2VDaGlsZHJlbihjbGlwYm9hcmRUZXh0VHlwZUlucHV0LnZhbHVlLCB0ZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnQpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfY2xpcGJvYXJkQ29udGFpbmVyXCIpLmNsYXNzTGlzdC5hZGQoXCJjb2xsYXBzZWRcIik7IFxyXG5cdFx0XHRcdHN0b3BDbGlwYm9hcmRUZXh0Q29uY2F0ZW5hdGlvbigpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblx0aWYgKGtleUV2ZW50LmN0cmxLZXkpIHtcclxuXHJcblx0XHRzd2l0Y2ggKGtleUV2ZW50LmtleSkge1xyXG5cdFx0XHRjYXNlICdgJzpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnQ3RybCArIGAnKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICcvJzpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnQ3RybCArIC8nKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICcuJzpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnQ3RybCArIC4nKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICcsJzpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnQ3RybCArICwnKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdcXFxcJzpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnQ3RybCArIFxcXFwnKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdcXCcnOlxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdDdHJsICsgXFwnJylcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgJzsnOlxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdDdHJsICsgOycpXHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlICdbJzpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnQ3RybCArIFsnKVxyXG5cclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgJ10nOlxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdDdHJsICsgXScpXHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblxyXG5cclxuXHJcblx0Ly8gTWFudWFsIHR5cGluZyBkdXJpbmcgdGV4dCBjYXB0dXJpbmdcclxuXHQvLyBJZ25vcmUgaW5wdXQgaWYgYWx0L2N0cmwgc2hvcnRjdXRzIGFyZSB1c2VkISBcclxuXHRpZih0ZXh0Q29uY2F0ZW5hdGlvbkNhcHR1cmluZyAmJiAha2V5RXZlbnQuY3RybEtleSAmJiAha2V5RXZlbnQuYWx0S2V5KXtcclxuXHRcdGNvbnNvbGUubG9nKCdLZXlFdmVudC5rZXkgPSAnLCBrZXlFdmVudC5rZXkpO1xyXG5cclxuXHRcdGlmKGtleUV2ZW50LmtleSA9PT0gXCJCYWNrc3BhY2VcIil7XHJcblx0XHRcdHRleHRDb25jYXRlbmF0aW9uQ29udGVudCA9IHRleHRDb25jYXRlbmF0aW9uQ29udGVudC5zdWJzdHJpbmcoMCwgdGV4dENvbmNhdGVuYXRpb25Db250ZW50Lmxlbmd0aC0xKVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZihrZXlFdmVudC5rZXkgPT09IFwiRW50ZXJcIil7XHJcblx0XHRcdHRleHRDb25jYXRlbmF0aW9uQ29udGVudCArPSBcIlxcblwiO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZihrZXlFdmVudC5rZXkgPT09IFwiU2hpZnRcIil7XHJcblx0XHRcdC8vIFdlIHdhbnQgdGhlIG5hdGl2ZSBjYXBpdGFsaXphdGlvbiwgYnV0IG5vIGFkZGl0aW9uYWwgYmVoYXZpb3IhXHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGV4dENvbmNhdGVuYXRpb25Db250ZW50ICs9IGtleUV2ZW50LmtleTtcclxuXHRcdH1cclxuXHJcblx0XHRcclxuXHRcdHdyaXRlVGV4dENvbmNhdGVuYXRpb25Db250ZW50VG9Eb20oKVxyXG5cclxuXHR9XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVTZWxlY3RDb2RlKCkge1xyXG5cdGlmIChjbGlwYm9hcmRDb2RlQ2hlY2tib3guY2hlY2tlZCkge1xyXG5cdFx0Y2xpcGJvYXJkVGV4dFR5cGVJbnB1dC5kaXNhYmxlZCA9IGZhbHNlO1xyXG5cdH1cclxuXHRlbHNlIHtcclxuXHRcdGNsaXBib2FyZFRleHRUeXBlSW5wdXQuZGlzYWJsZWQgPSB0cnVlO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcblxyXG5cclxuLy8gVGhlIEFubnVuY2lhdGlvbiBpcyBhbiBvaWwgcGFpbnRpbmcgYnkgdGhlIEVhcmx5IE5ldGhlcmxhbmRpc2ggcGFpbnRlciBIYW5zIE1lbWxpbmcuSXQgZGVwaWN0cyB0aGUgQW5udW5jaWF0aW9uLCB0aGUgYXJjaGFuZ2VsIEdhYnJpZWwncyBhbm5vdW5jZW1lbnQgdG8gdGhlIFZpcmdpbiBNYXJ5IHRoYXQgc2hlIHdvdWxkIGNvbmNlaXZlIGFuZCBiZWNvbWUgdGhlIG1vdGhlciBvZiBKZXN1cywgZGVzY3JpYmVkIGluIHRoZSBHb3NwZWwgb2YgTHVrZS4gXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRDc3MoKTogdm9pZCB7XHJcblx0ZG9jdW1lbnQuaGVhZC5hcHBlbmQoY2xpcGJvYXJkQ3NzKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVDc3MoKTogdm9pZCB7XHJcblx0Y2xpcGJvYXJkQ3NzLnJlbW92ZSgpO1xyXG59IiwiXHJcblxyXG4vLyBsZXQgYWdlX2FwaVVybCA9ICdodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL3YwMic7XHJcbmNvbnN0IGRlZmF1bHRBcGlTdHJpbmcgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGkvdjAyXCI7XHJcbmxldCBhZ2VfYXBpVXJsID0gXCJcIjtcclxuXHJcblxyXG5cclxuLy8gQUxXQVlTIFNUQVJUIE9VVCBCWSBHUkFCQklORyBUSEUgQVBJIEJBU0UgVVJMXHJcbigoKT0+e1xyXG5cdFxyXG5cdHNldEFwaVVybCgpLnRoZW4oKCkgPT4ge1xyXG5cdFx0Y29uc29sZS5sb2coJ0xvYWRlZCBkYmktc2VuZC50cycpO1xyXG5cclxuXHRcdC8vIG5vdGlmeURiaXNVc2VycygpO1xyXG5cdFx0YXBpUGF0aExvYWRlZCA9IHRydWU7XHJcblx0fSk7XHJcblx0XHJcbn0pKCk7XHJcblxyXG5cclxuXHJcbmxldCBhcGlQYXRoTG9hZGVkID0gZmFsc2U7XHJcbmNvbnN0IG1heEFwaVBhdGhMb2FkZWRDaGVja3MgPSAxMDA7XHJcbi8qKiBcclxuICogTm90aWZpZXMgdXNlcnMgb2YgdGhlIGRiaXMgbW9kdWxlIHRoYXQgdGhlIGFwaSBwYXRoIGlzIGxvYWRlZCBmcm9tIGZpbGUgYW5kIHJlYWR5IHRvIGZvciB1c2UuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gd2FpdEZvckxvYWRlZEFwaVBhdGgoY2FsbGJhY2tGbiA6IEZ1bmN0aW9uKSA6IHZvaWQge1xyXG5cclxuXHRcdGxldCBhcGlQYXRoQ2hlY2tDb3VudCA9IDA7IC8vIGEgY291bnRlciBmb3IgZWFjaCBjYWxsZXJcclxuXHJcblx0XHRsZXQgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcblx0XHRcdGlmKGFwaVBhdGhDaGVja0NvdW50IDwgbWF4QXBpUGF0aExvYWRlZENoZWNrcyl7XHJcblxyXG5cdFx0XHRcdGlmKGFwaVBhdGhMb2FkZWQpe1xyXG5cdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XHJcblx0XHRcdFx0XHRjYWxsYmFja0ZuKCk7XHJcblx0XHRcdFx0XHQvLyByZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGFwaVBhdGhDaGVja0NvdW50Kys7XHJcblx0XHRcdH1cclxuXHRcdH0sIDEwKTtcclxuXHRcdFxyXG59XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBUcnkgc2V0dGluZyB0aGUgYXBpLXBhdGggdXNpbmcgdGhlIGxvY2FsIHdlYmV4dGVuc2lvbiBzdG9yYWdlLiBcclxuICogSWYgdGhlIGxvY2FsIHZhbHVlIGlzIHVuZGVmaW5lZCB3ZSB1c2UgdGhlIGRlZmF1bHQgQVBJIHBhdGguXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2V0QXBpVXJsKCl7XHJcblx0YnJvd3Nlci5zdG9yYWdlLmxvY2FsLmdldChcImFwaUJhc2VTdHJpbmdcIikudGhlbigob2JqZWN0KSA9PiB7XHJcblxyXG5cdFx0aWYob2JqZWN0LmFwaUJhc2VTdHJpbmcgPT09IHVuZGVmaW5lZCl7XHJcblx0XHRcdGFnZV9hcGlVcmwgPSBkZWZhdWx0QXBpU3RyaW5nO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZXtcclxuXHRcdFx0YWdlX2FwaVVybCA9IG9iamVjdC5hcGlCYXNlU3RyaW5nO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnNvbGUubG9nKFwiTG9hZGVkIEFQSSBCQVNFIFNUUklOR1wiKVxyXG5cdFx0Y29uc29sZS5sb2coXCJvYmplY3QuYXBpQmFzZVN0cmluZyA9IFwiLCBvYmplY3QuYXBpQmFzZVN0cmluZyk7XHJcblx0fSwgb25Mb2NhbFN0b3JhZ2VFcnJvcik7XHJcbn1cclxuZnVuY3Rpb24gb25Mb2NhbFN0b3JhZ2VFcnJvcihlcnJvcjogRXJyb3IpIHtcclxuXHRjb25zb2xlLmVycm9yKGVycm9yKTtcclxufVxyXG5cclxuXHJcblxyXG5icm93c2VyLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChyZXF1ZXN0KSA6IFByb21pc2U8YW55PiA9PiB7XHJcblx0Y29uc29sZS5sb2coXCJNZXNzYWdlIHJlY2lldmVkIGluIGRiaS1zZW5kLnRzIVwiKTtcclxuXHJcblx0aWYgKHJlcXVlc3QubmFtZSA9PT0gXCJzZXRBcGlCYXNlXCIpIHtcclxuXHRcdC8vIGNvbnNvbGUubG9nKFwiMTExMVwiKVxyXG5cdFx0YWdlX2FwaVVybCA9IHJlcXVlc3QuYXBpQmFzZVN0cmluZztcclxuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoeyByZXNwb25zZTogXCJBcGkgdXBkYXRlZCBpbiBjb250ZW50IHNjcmlwdC4gW2RiaS1zZW5kLmpzXVwiLCBuZXdBcGlTdHJpbmc6IGFnZV9hcGlVcmwgfSk7XHJcblxyXG5cdH1cclxuXHJcblxyXG5cdGlmIChyZXF1ZXN0Lm5hbWUgPT09IFwiZ2V0QXBpQmFzZVwiKSB7XHJcblx0XHQvLyBjb25zb2xlLmxvZyhcIjIyMjJcIilcclxuXHRcdFxyXG5cdFx0Ly8gUHJvbWlzZS5yZXNvbHZlIDogc3RhdGljIG1ldGhvZCB0aGF0IHJldHVybnMgYSByZXNvbHZlZCBQcm9taXNlIG9iamVjdCB3aXRoIHRoZSBnaXZlbiB2YWx1ZVxyXG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IGFwaVN0cmluZzogYWdlX2FwaVVybCB9KTtcclxuXHJcblx0fVxyXG5cclxufSk7XHJcblxyXG5jbGFzcyBhZ2VfZGJpcyB7XHJcblxyXG5cdC8qIFxyXG5cdFx0Q09OVEVOVFxyXG5cdCovXHJcblxyXG5cdHN0YXRpYyBhc3luYyBDb250ZW50X0luc2VydE9uVGFibGUoVGFibGVOYW1lIDogc3RyaW5nKSB7XHJcblx0XHRjb25zdCB1cmwgPSBhZ2VfYXBpVXJsICsgYC9jb250ZW50L0NvbnRlbnQtSW5zZXJ0T25UYWJsZT9UYWJsZT0ke1RhYmxlTmFtZX1gO1xyXG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcclxuXHRcdFx0bWV0aG9kOiAnUE9TVCdcclxuXHRcdH07XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xyXG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XHJcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiRmV0Y2ggcmV0dXJuZWQgXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIiBmcm9tIFwiICsgdXJsKTtcclxuXHRcdFx0XHRyZXR1cm4gW107XHJcblx0XHRcdH1cclxuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXHJcblx0XHRcdHJldHVybiBkYXRhO1xyXG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XHJcblx0XHR9XHJcblx0fVxyXG5cdHN0YXRpYyBhc3luYyBDb250ZW50X1NlbGVjdE9uVXVpZChVdWlkIDogc3RyaW5nIHwgbnVtYmVyKSB7XHJcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudC9Db250ZW50LVNlbGVjdE9uVXVpZD9VdWlkPSR7VXVpZH1gO1xyXG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcclxuXHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHRcdH07XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xyXG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XHJcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiRmV0Y2ggcmV0dXJuZWQgXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIiBmcm9tIFwiICsgdXJsKTtcclxuXHRcdFx0XHRyZXR1cm4gW107XHJcblx0XHRcdH1cclxuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXHJcblx0XHRcdHJldHVybiBkYXRhO1xyXG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XHJcblx0XHR9XHJcblx0fVxyXG5cdHN0YXRpYyBhc3luYyBDb250ZW50X1VwZGF0ZVdpdGhDb250ZW50T2JqZWN0KGNvbnRlbnRPYmplY3QgOiBhbnkpIHtcclxuXHRcdGxldCB1cmwgPSBhZ2VfYXBpVXJsICsgYC9jb250ZW50L0NvbnRlbnQtVXBkYXRlV2l0aENvbnRlbnRPYmplY3RgO1xyXG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcclxuXHRcdFx0bWV0aG9kOiAnUFVUJyxcclxuXHRcdFx0aGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiwgfSxcclxuXHRcdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkoY29udGVudE9iamVjdCksXHJcblx0XHR9O1xyXG5cclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcclxuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xyXG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XHJcblx0XHRcdFx0cmV0dXJuIFtdO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxyXG5cdFx0XHRyZXR1cm4gZGF0YTtcclxuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRzdGF0aWMgYXN5bmMgQ29udGVudF9Ecm9wRnVsbE9uVXVpZChVdWlkIDogc3RyaW5nIHwgbnVtYmVyKSB7XHJcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudC9Db250ZW50LURyb3BGdWxsT25VdWlkP1V1aWQ9JHtVdWlkfWA7XHJcblx0XHRjb25zdCBvcHRpb25zID0ge1xyXG5cdFx0XHRtZXRob2Q6ICdERUxFVEUnLFxyXG5cdFx0fTtcclxuXHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XHJcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcclxuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xyXG5cdFx0XHRcdHJldHVybiBbXTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcclxuXHRcdFx0cmV0dXJuIGRhdGE7XHJcblx0XHR9IGNhdGNoIChlcnJvcikge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcclxuXHRcdH1cclxuXHR9XHJcblx0c3RhdGljIGFzeW5jIENvbnRlbnRfU2VsZWN0T25UaXRsZUxpa2VTdHJpbmcoc2VhcmNoU3RyaW5nOiBzdHJpbmcsIHRhYmxlTGltaXQ6IHN0cmluZywgaW5jbHVkZVRhYmxlOiBzdHJpbmcsIG9yZGVyQ29sdW1uOiBzdHJpbmcsIGRlc2M6IHN0cmluZykgOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnQvQ29udGVudC1TZWxlY3RPblRpdGxlTGlrZVN0cmluZz9zZWFyY2hTdHJpbmc9JHtzZWFyY2hTdHJpbmd9JnRhYmxlTGltaXQ9JHt0YWJsZUxpbWl0fSZpbmNsdWRlVGFibGU9JHtpbmNsdWRlVGFibGV9Jm9yZGVyQ29sdW1uPSR7b3JkZXJDb2x1bW59JmRlc2M9JHtkZXNjfWA7XHJcblx0XHRjb25zdCBvcHRpb25zID0ge1xyXG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdFx0fTtcclxuXHJcblx0XHRcclxuXHRcdHRyeSB7XHJcblx0XHRcdGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XHJcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcclxuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xyXG5cdFx0XHRcdHJldHVybiBbXTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcclxuXHRcdFx0cmV0dXJuIGRhdGE7XHJcblx0XHR9IGNhdGNoIChlcnJvcikge1xyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XHJcblx0XHR9XHJcblx0fVxyXG5cdHN0YXRpYyBhc3luYyBSZXZpZXdfSW5zZXJ0U2NoZWR1bGVPblV1aWQoVXVpZCA6IHN0cmluZyB8IG51bWJlciwgc2NoZWR1bGVUeXBlIDogc3RyaW5nfCBudW1iZXIpIHtcclxuXHRcdGNvbnN0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnQvUmV2aWV3LUluc2VydFNjaGVkdWxlT25VdWlkP1V1aWQ9JHtVdWlkfSZzY2hlZHVsZVR5cGU9JHtzY2hlZHVsZVR5cGV9YDtcclxuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XHJcblx0XHRcdG1ldGhvZDogJ1BPU1QnXHJcblx0XHR9O1xyXG5cclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcclxuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xyXG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XHJcblx0XHRcdFx0cmV0dXJuIFtdO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxyXG5cdFx0XHRyZXR1cm4gZGF0YTtcclxuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRzdGF0aWMgYXN5bmMgUmV2aWV3X1NlbGVjdEN1cnJlbnRSZXZpZXcoKSB7XHJcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudC9SZXZpZXctU2VsZWN0Q3VycmVudFJldmlld2A7XHJcblx0XHRjb25zdCBvcHRpb25zID0ge1xyXG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdFx0fTtcclxuXHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XHJcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcclxuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xyXG5cdFx0XHRcdHJldHVybiBbXTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcclxuXHRcdFx0cmV0dXJuIGRhdGE7XHJcblx0XHR9IGNhdGNoIChlcnJvcikge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHQvKiBcclxuXHRcdFx0Q09OVEVOVCBFREdFXHJcblx0Ki9cclxuXHRzdGF0aWMgYXN5bmMgQ29udGVudEVkZ2VfSW5zZXJ0QWRqYWNlbnRUb1V1aWRJbnRvVGFibGUoVXVpZDogc3RyaW5nIHwgbnVtYmVyLCBEaXJlY3RlZDogc3RyaW5nIHwgbnVtYmVyLCBUYWJsZTogc3RyaW5nLCBUeXBlOiBzdHJpbmcsIE9yZGVyOiBzdHJpbmcgfCBudW1iZXIsIFBhdGg6IHN0cmluZykge1xyXG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnRlZGdlL0NvbnRlbnRFZGdlLUluc2VydEFkamFjZW50VG9VdWlkSW50b1RhYmxlP1V1aWQ9JHtVdWlkfSZEaXJlY3RlZD0ke0RpcmVjdGVkfSZUYWJsZT0ke1RhYmxlfSZUeXBlPSR7VHlwZX0mT3JkZXI9JHtPcmRlcn0mUGF0aD0ke1BhdGh9YDtcclxuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XHJcblx0XHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdFx0fTtcclxuXHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XHJcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcclxuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xyXG5cdFx0XHRcdHJldHVybiBbXTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcclxuXHRcdFx0cmV0dXJuIGRhdGE7XHJcblx0XHR9IGNhdGNoIChlcnJvcikge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcclxuXHRcdH1cclxuXHR9XHJcblx0c3RhdGljIGFzeW5jIENvbnRlbnRFZGdlX1NlbGVjdENoaWxkT2ZVdWlkKFV1aWQgOiBzdHJpbmcgfCBudW1iZXIpIHtcclxuXHRcdGxldCB1cmwgPSBhZ2VfYXBpVXJsICsgYC9jb250ZW50ZWRnZS9Db250ZW50RWRnZS1TZWxlY3RDaGlsZE9mVXVpZD9VdWlkPSR7VXVpZH1gO1xyXG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcclxuXHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHRcdH07XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xyXG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XHJcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiRmV0Y2ggcmV0dXJuZWQgXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIiBmcm9tIFwiICsgdXJsKTtcclxuXHRcdFx0XHRyZXR1cm4gW107XHJcblx0XHRcdH1cclxuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXHJcblx0XHRcdHJldHVybiBkYXRhO1xyXG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcclxuXHRcdFx0Ly8gY29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIENvbnRlbnRFZGdlX1NlbGVjdFBhcmVudE9mVXVpZChVdWlkIDogc3RyaW5nIHwgbnVtYmVyKSB7XHJcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudGVkZ2UvQ29udGVudEVkZ2UtU2VsZWN0UGFyZW50T2ZVdWlkP1V1aWQ9JHtVdWlkfWA7XHJcblx0XHRjb25zdCBvcHRpb25zID0ge1xyXG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdFx0fTtcclxuXHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XHJcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcclxuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xyXG5cdFx0XHRcdHJldHVybiBbXTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcclxuXHRcdFx0cmV0dXJuIGRhdGE7XHJcblx0XHR9IGNhdGNoIChlcnJvcikge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcclxuXHRcdH1cclxuXHR9XHJcblx0c3RhdGljIGFzeW5jIENvbnRlbnRFZGdlX1NlbGVjdFVuZGlyZWN0ZWRPZlV1aWQoVXVpZCA6IHN0cmluZyB8IG51bWJlcikge1xyXG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnRlZGdlL0NvbnRlbnRFZGdlLVNlbGVjdFVuZGlyZWN0ZWRPZlV1aWQ/VXVpZD0ke1V1aWR9YDtcclxuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XHJcblx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0XHR9O1xyXG5cclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcclxuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xyXG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XHJcblx0XHRcdFx0cmV0dXJuIFtdO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxyXG5cdFx0XHRyZXR1cm4gZGF0YTtcclxuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRzdGF0aWMgYXN5bmMgQ29udGVudEVkZ2VfU2VsZWN0QWRqYWNlbnRPZlV1aWQoVXVpZCA6IHN0cmluZyB8IG51bWJlcikge1xyXG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnRlZGdlL0NvbnRlbnRFZGdlLVNlbGVjdEFkamFjZW50T2ZVdWlkP1V1aWQ9JHtVdWlkfWA7XHJcblx0XHRjb25zdCBvcHRpb25zID0ge1xyXG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdFx0fTtcclxuXHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XHJcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcclxuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xyXG5cdFx0XHRcdHJldHVybiBbXTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcclxuXHRcdFx0cmV0dXJuIGRhdGE7XHJcblx0XHR9IGNhdGNoIChlcnJvcikge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHJcblxyXG5cdC8qIFxyXG5cdFx0XHRcdEZJTEVTXHJcblx0Ki9cclxuXHJcblx0c3RhdGljIGFzeW5jIFBvc3RfRmlsZShVdWlkOiBzdHJpbmcgfCBudW1iZXIsIGZpbGU6IEZpbGUsIHF1ZXJ5UGFyYW1zOiBzdHJpbmcsIG1pbWVUeXBlOiBzdHJpbmcpIHtcclxuXHJcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvZmlsZS8ke1V1aWR9P2A7XHJcblx0XHQvLyBjb25zb2xlLmxvZyh1cmwpXHJcblxyXG5cclxuXHRcdGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHF1ZXJ5UGFyYW1zKSkge1xyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhgJHtrZXl9OiAke3ZhbHVlfWApO1xyXG5cdFx0XHR1cmwgKz0gYCR7a2V5fT0ke3ZhbHVlfSZgO1xyXG5cdFx0XHQvLyBib2R5QXJyYXkucHVzaCh2YWx1ZSk7XHJcblx0XHR9XHJcblx0XHR1cmwgPSB1cmwuc2xpY2UoMCwgLTEpO1xyXG5cclxuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XHJcblx0XHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0XCJDb250ZW50LVR5cGVcIjogbWltZVR5cGUsXHJcblx0XHRcdH0sXHJcblx0XHRcdGJvZHk6IGZpbGUsXHJcblx0XHR9O1xyXG5cdFx0Ly8gY29uc29sZS5sb2cob3B0aW9ucylcclxuXHRcdC8vIGNvbnNvbGUubG9nKHVybClcclxuXHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XHJcblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxyXG5cdFx0XHRpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xyXG5cdFx0XHRcdHJldHVybiBkYXRhO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignRkFJTEVEIFBPU1QgRlJPTTogUG9zdF9GaWxlIGluIGRiaXMnKVxyXG5cdFx0XHR9XHJcblx0XHRcdC8vIGNvbnNvbGUudGFibGUoZGF0YSk7XHJcblx0XHR9IGNhdGNoIChlcnJvcikge1xyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcblxyXG5cdHN0YXRpYyBhc3luYyBHZXRfRmlsZShVdWlkOiBzdHJpbmcgfCBudW1iZXIpOiBQcm9taXNlPEZpbGUgfCBhbnlbXT4ge1xyXG5cclxuXHRcdGNvbnN0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2ZpbGUvYCArIFV1aWQ7XHJcblx0XHRjb25zdCBvcHRpb25zID0geyBtZXRob2Q6ICdHRVQnIH07XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xyXG5cdFx0XHQvLyBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcclxuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xyXG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XHJcblx0XHRcdFx0cmV0dXJuIFtdO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5ib2R5KSBcclxuXHRcdFx0bGV0IGJsb2IgPSBhd2FpdCByZXNwb25zZS5ibG9iKClcclxuXHRcdFx0bGV0IGNvbnRlbnRUeXBlID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpO1xyXG5cdFx0XHRsZXQgZXh0ZW5zaW9uID0gY29udGVudFR5cGUuc3BsaXQoJy8nKVsxXTtcclxuXHRcdFx0Ly8gY29uc29sZS5sb2coJ0ZJTEVGSUxFOicsIHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSlcclxuXHRcdFx0bGV0IGZpbGUgPSBhd2FpdCBuZXcgRmlsZShbYmxvYl0sIGAke1V1aWR9LiR7ZXh0ZW5zaW9ufWApXHJcblx0XHRcdHJldHVybiBmaWxlO1xyXG5cdFx0XHQvLyAudGhlbihibG9iID0+IG5ldyBGaWxlKFtibG9iXSwgJ3Rlc3RmaWxlbmFtZS5maWxlJykpXHJcblx0XHRcdC8vIC50aGVuKGZpbGUgPT4gZmlsZSlcclxuXHRcdFx0Ly8gLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKVxyXG5cdFx0XHQvLyAudGhlbihmaWxlID0+IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSkpXHJcblx0XHRcdC8vIC50aGVuKGZpbGUgPT4gVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKSlcclxuXHRcdFx0Ly8gLnRoZW4oZmlsZVVybCA9PiB3aW5kb3cub3BlbihmaWxlVXJsLCAnX2JsYW5rJykpXHJcblx0XHR9IGNhdGNoIChlcnJvcikge1xyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcblxyXG5cclxuXHRzdGF0aWMgYXN5bmMgUHV0X0ZpbGUoVXVpZDogc3RyaW5nIHwgbnVtYmVyLCBmaWxlOiBGaWxlLCBxdWVyeVBhcmFtczogc3RyaW5nLCBtaW1lVHlwZTogc3RyaW5nKSB7XHJcblxyXG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2ZpbGUvJHtVdWlkfT9gO1xyXG5cdFx0Ly8gY29uc29sZS5sb2codXJsKVxyXG5cclxuXHJcblx0XHRmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhxdWVyeVBhcmFtcykpIHtcclxuXHRcdFx0Ly8gY29uc29sZS5sb2coYCR7a2V5fTogJHt2YWx1ZX1gKTtcclxuXHRcdFx0dXJsICs9IGAke2tleX09JHt2YWx1ZX0mYDtcclxuXHRcdFx0Ly8gYm9keUFycmF5LnB1c2godmFsdWUpO1xyXG5cdFx0fVxyXG5cdFx0dXJsID0gdXJsLnNsaWNlKDAsIC0xKTtcclxuXHJcblx0XHRjb25zdCBvcHRpb25zID0ge1xyXG5cdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHRcdFx0aGVhZGVyczoge1xyXG5cdFx0XHRcdFwiQ29udGVudC1UeXBlXCI6IG1pbWVUeXBlLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRib2R5OiBmaWxlLFxyXG5cdFx0fTtcclxuXHRcdC8vIGNvbnNvbGUubG9nKG9wdGlvbnMpXHJcblx0XHQvLyBjb25zb2xlLmxvZyh1cmwpXHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xyXG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcclxuXHRcdFx0aWYgKHJlc3BvbnNlLm9rKSB7XHJcblx0XHRcdFx0cmV0dXJuIGRhdGE7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdGQUlMRUQgUFVUIEZST006IFB1dF9GaWxlIGluIGRiaXMnKVxyXG5cdFx0XHR9XHJcblx0XHRcdC8vIGNvbnNvbGUudGFibGUoZGF0YSk7XHJcblx0XHR9IGNhdGNoIChlcnJvcikge1xyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcblxyXG5cdHN0YXRpYyBhc3luYyBEZWxldGVfRmlsZShVdWlkIDogc3RyaW5nIHwgbnVtYmVyKSB7XHJcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvZmlsZS8ke1V1aWR9YDtcclxuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XHJcblx0XHRcdG1ldGhvZDogJ0RFTEVURScsXHJcblx0XHR9O1xyXG5cclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcclxuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xyXG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XHJcblx0XHRcdFx0cmV0dXJuIFtdO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxyXG5cdFx0XHRyZXR1cm4gZGF0YTtcclxuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxyXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHJcbn07XHJcblxyXG5leHBvcnQge1xyXG5cdGFnZV9kYmlzLFxyXG59IiwiXHJcbi8vIGltcG9ydCB7IHRlc3QgfSBmcm9tIFwiLi9kYmktc2VuZFwiXHJcbi8vIHRlc3QoKTtcclxuXHJcblxyXG5cclxuY29uc3QgaHRtbEZvbGRlciA9ICdodG1sLyc7XHJcbmNvbnN0IGNzc0ZvbGRlciA9ICdjc3MvJztcclxuXHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoSHRtbChmaWxlbmFtZSA6IHN0cmluZykgOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgXHJcbiAgICAgICAgbGV0IHVybCA9IGJyb3dzZXIucnVudGltZS5nZXRVUkwoXHJcbiAgICAgICAgICAgIGh0bWxGb2xkZXIgKyBmaWxlbmFtZVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMgaXMgdGggZXByb21pc2UgdGhhdCB3ZSByZXR1cm4gYW5kIGxldHRpbmcgdGhlIGZldGNoIGZ1bmN0aW9uIGhhbmRsZSByZXNvbHZpbmcgdGhlIHByb21pc2VcclxuICAgICAgICByZXR1cm4gZmV0Y2godXJsKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpXHJcbiAgICAgICAgICAgIC50aGVuKHRleHQgPT4gdGV4dClcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IFwiRXJyb3IgaW4gJ2ZldGNoSHRtbCcuIEZpbGU6ICBmZXRjaGVyLnRzIFwiKVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoQ3NzKGZpbGVuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG5cclxuICAgIGxldCB1cmwgPSBicm93c2VyLnJ1bnRpbWUuZ2V0VVJMKFxyXG4gICAgICAgIGNzc0ZvbGRlciArIGZpbGVuYW1lXHJcbiAgICApO1xyXG5cclxuICAgIC8vIHRoaXMgaXMgdGggZXByb21pc2UgdGhhdCB3ZSByZXR1cm4gYW5kIGxldHRpbmcgdGhlIGZldGNoIGZ1bmN0aW9uIGhhbmRsZSByZXNvbHZpbmcgdGhlIHByb21pc2VcclxuICAgIHJldHVybiBmZXRjaCh1cmwpXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UudGV4dCgpKVxyXG4gICAgICAgIC50aGVuKHRleHQgPT4gdGV4dClcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gXCJFcnJvciBpbiAnZmV0Y2hDc3MnLiBGaWxlOiBmZXRjaGVyLnRzXCIpXHJcbn1cclxuXHJcblxyXG50eXBlIFRmZXRjaGVyID0ge1xyXG4gICAgZmV0Y2hIdG1sIDogUHJvbWlzZTxzdHJpbmc+XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIHtcclxuICAgIFRmZXRjaGVyXHJcbn07XHJcblxyXG4vLyBleHBvcnQge1xyXG4vLyAgICAgZmV0Y2hIdG1sIDogXHJcbi8vIH1cclxuXHJcbiIsImltcG9ydCAqIGFzIGZldGNoZXIgZnJvbSBcIi4vZmV0Y2hlclwiO1xyXG5pbXBvcnQgKiBhcyBwcm9qZWN0cyBmcm9tIFwiLi9wcm9qZWN0cy9wcm9qZWN0c1wiO1xyXG5pbXBvcnQgKiBhcyBzb3VyY2UgZnJvbSBcIi4vc291cmNlL3NvdXJjZVwiO1xyXG5pbXBvcnQgKiBhcyBjbGlwYm9hcmQgZnJvbSBcIi4vY2xpcGJvYXJkXCI7XHJcblxyXG5pbXBvcnQgeyBIVE1MUHJvamVjdENoaWxkUm93IH0gZnJvbSBcIi4vcHJvamVjdHMvcHJvamVjdF9kb21cIjtcclxuXHJcbi8vIGltcG9ydCB7IGFnZV9kYmlzIH0gZnJvbSBcIi4vZGJpLXNlbmRcIjtcclxuXHJcbmxldCBvdmVybGF5Q29udGFpbmVyIDogRWxlbWVudDtcclxubGV0IG92ZXJsYXlDc3M6IEhUTUxFbGVtZW50O1xyXG5cclxubGV0IHRhYmxlQ3NzOiBIVE1MRWxlbWVudDtcclxuXHJcbi8vIG90aGVyIGNhY2hlZCBlbGVtZW50c1xyXG5sZXQgY29udGV4dE92ZXJsYXk6IEVsZW1lbnQ7XHJcblxyXG5sZXQgc2lkZVBhbmVsOiBFbGVtZW50O1xyXG5cclxuLyoqXHJcbiAqICBJbml0aWFsaXppbmcgdGhlIGV4dGVuc2lvbiBvdmVybGF5IEhUTUwsIENTUywgRXZlbnRzLCBhbmQgaXRzIHN1Yi1tb2R1bGVzLlxyXG4gKiBcclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIGluaXRPdmVybGF5KCkgOiBQcm9taXNlPHZvaWQ+e1xyXG4gICAgLy8gY29uc29sZS5sb2coJ09WRVJMQVkgVFMgSU5JVCcpOyBcclxuXHJcbiAgICBvdmVybGF5Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBvdmVybGF5Q29udGFpbmVyLmlkID0gXCJhZ2Vfb3ZlcmxheUNvbnRhaW5lclwiOyBcclxuICAgIG92ZXJsYXlDb250YWluZXIuc2V0QXR0cmlidXRlKFwic3BlbGxjaGVja1wiLFwiZmFsc2VcIik7XHJcblxyXG5cclxuICAgIC8vIEV4dGVuc2lvbi13aWRlIGV2ZW50cyFcclxuICAgIG92ZXJsYXlDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV4dGVuc2lvbkNsaWNrSGFuZGxlcik7XHJcbiAgICBvdmVybGF5Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c2luXCIsIG92ZXJsYXlGb2N1c2luKTtcclxuXHJcblxyXG4gICAgLy8gUHJldmVudHMga2V5c3Ryb2tlcyBvbiBjZXJ0YWluIHdlYnNpdGVzIGZyb20gcmVnaXN0cmluZyB3aGVuIHdyaXRpbmcgaW4gdGhlIG92ZXJsYXkgLSB0ZXN0ZWQgb24geW91dHViZSBzaG9ydHMgLSBzcGFjZSBub3Qgd29ya2luZyBvbiByZWd1bGFyIHlvdXR1YmVcclxuICAgIC8vIE1heWJlIGEgYml0IHRvbyBtdWNoIHRvIGhhdmUgbGlzdGVuaW5nIGF0IGFsbCB0aW1lcyEgQlVUIEkgc2ltcGx5IG5lZWQgdGhpcyB0byB3b3JrIGZvciBub3cuLlxyXG4gICAgb3ZlcmxheUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBjb250ZW50RWRpdGFibGVLZXlEZXRlY3Rpb24sIGZhbHNlKTtcclxuICAgIG92ZXJsYXlDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGNvbnRlbnRFZGl0YWJsZUtleURldGVjdGlvbiwgZmFsc2UpO1xyXG4gICAgb3ZlcmxheUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgY29udGVudEVkaXRhYmxlS2V5RGV0ZWN0aW9uLCBmYWxzZSk7XHJcbiAgICBcclxuICAgIFxyXG4gICAgLy8gQ3VzdG9tIEV2ZW50cyBmb3Igc3BlY2lmaWMgZXh0ZW5zaW9uLWFjdGlvbnNcclxuICAgIG92ZXJsYXlDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRzb3VyY2VcIiwgKGV2ZW50IDogQ3VzdG9tRXZlbnQpID0+IHtcclxuICAgICAgICBzb3VyY2UubG9hZFdpdGhDb250ZW50T2JqZWN0KGV2ZW50LmRldGFpbC5jb250ZW50T2JqZWN0KTtcclxuICAgIH0pO1xyXG4gICAgb3ZlcmxheUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibmV3c291cmNlXCIsIChldmVudDogQ3VzdG9tRXZlbnQpID0+IHtcclxuICAgICAgICBzb3VyY2UubG9hZFdpdGhDb250ZW50T2JqZWN0KGV2ZW50LmRldGFpbC5jb250ZW50T2JqZWN0KTtcclxuICAgICAgICBzb3VyY2Uuc2hvd1NvdXJjZVByb3BlcnRpZXMoKTsgLy8gTWFrZSBzdXJlIHdlIGdvIHRvIHRoZSBwcm9wZXJ0aWVzIHRhYiB3aGVuIGNyYXRpbmcgYSBuZXcgc291cmNlIVxyXG4gICAgfSk7XHJcbiAgICBvdmVybGF5Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJuZXdwcm9qZWN0XCIsIChldmVudDogQ3VzdG9tRXZlbnQpID0+IHt9KTtcclxuICAgIG92ZXJsYXlDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInJlZnJlc2hleHRlbnNpb25cIiwgKGV2ZW50OiBDdXN0b21FdmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVmcmVzaCBleHRlbnNpb25cIik7XHJcbiAgICAgICAgcHJvamVjdHMucmVsb2FkQ3VycmVudFByb2plY3QoKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvLyBPdmVybGF5IEhUTUxcclxuICAgIGxldCBvdmVybGF5SHRtbCA9IGF3YWl0IGZldGNoZXIuZmV0Y2hIdG1sKFwib3ZlcmxheS5odG1sXCIpO1xyXG4gICAgb3ZlcmxheUNvbnRhaW5lci5pbm5lckhUTUwgPSBvdmVybGF5SHRtbDtcclxuICAgIGNvbnRleHRPdmVybGF5ID0gb3ZlcmxheUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiI2FnZV9jb250ZXh0T3ZlcmxheVwiKTtcclxuICAgIHNpZGVQYW5lbCA9IG92ZXJsYXlDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2Vfb3ZlcmxheVJpZ2h0UGFuZWxcIik7ICAgXHJcblxyXG4gICAgLy8gQ1NTXHJcbiAgICBvdmVybGF5Q3NzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG4gICAgb3ZlcmxheUNzcy5pZCA9IFwiYWdlX292ZXJsYXlTdHlsZVwiO1xyXG4gICAgb3ZlcmxheUNzcy5pbm5lclRleHQgPSBhd2FpdCBmZXRjaGVyLmZldGNoQ3NzKFwib3ZlcmxheS5jc3NcIik7XHJcblxyXG4gICAgdGFibGVDc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcbiAgICB0YWJsZUNzcy5pZCA9IFwiYWdlX3RhYmxlU3R5bGVcIjtcclxuICAgIHRhYmxlQ3NzLmlubmVyVGV4dCA9IGF3YWl0IGZldGNoZXIuZmV0Y2hDc3MoXCJ0YWJsZXMuY3NzXCIpO1xyXG5cclxuICAgIC8vIExvYWQgRXh0ZW5zaW9uIE1vZHVsZXNcclxuICAgIHByb2plY3RzLmluaXRQcm9qZWN0cyhzaWRlUGFuZWwsIGNvbnRleHRPdmVybGF5LnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX21vcmVQcm9qZWN0T3B0aW9uc0NvbnRleHRNZW51XCIpKTsgLy8gUGFzcyB0aGUgY29udGV4dCBtZW51IVxyXG4gICAgc291cmNlLmluaXRTb3VyY2VDb250YWluZXIoc2lkZVBhbmVsLCBjb250ZXh0T3ZlcmxheS5xdWVyeVNlbGVjdG9yKFwiI2FnZV9tb3JlU291cmNlT3B0aW9uc0NvbnRleHRNZW51XCIpKTsgLy8gUGFzcyB0aGUgY29udGV4dCBtZW51IVxyXG4gICAgY2xpcGJvYXJkLmluaXRDbGlwYm9hcmQoc2lkZVBhbmVsKTtcclxuXHJcblxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFByZXZlbnRzIHRoZSBkZWZhdWx0IGJlaGF2aW9yIGFuZCBzdG9wcyBwcm9wYWdhdGlvbiBvZiBnbG9iYWwga2V5LWV2ZW50cyBmb3I6XHJcbiAqIDEpIGNvbnRlbnQtZWRpdGFibGUgZWxlbWVudHNcclxuICogMikgV2hlbiBjYXB0dXJpbmcgdG8gdGhlIHRleHQtY2xpcGJvYXJkXHJcbiAqIFxyXG4gKiBBbHNvIGltcGxlbWVudHMgdGhlIGZvY3VzaW5nIG9mIHBhcmVudCB3aGVuIHByZXNzaW5nIGVudGVyL2VzY2FwZS5cclxuICogXHJcbiAqIEBwYXJhbSBrZXlldmVudCBcclxuICovXHJcbmZ1bmN0aW9uIGNvbnRlbnRFZGl0YWJsZUtleURldGVjdGlvbihrZXlldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgbGV0IGFjdGl2ZUVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xyXG5cclxuICAgIGlmIChhY3RpdmVFbGVtZW50LmlzQ29udGVudEVkaXRhYmxlKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZW5hYmxlIG5ldyBsaW5lIHVzaW5nIGVudGVyK3NoaWZ0XHJcbiAgICAgICAgaWYgKGtleWV2ZW50LmtleSA9PT0gXCJFbnRlclwiICYmIGtleWV2ZW50LnNoaWZ0S2V5KXtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHByZXZlbnQgbmV3IGxpbmUgYW5kIGV4aXQgZmllbGRcclxuICAgICAgICBlbHNlIGlmIChrZXlldmVudC5rZXkgPT09IFwiRW50ZXJcIiB8fCBrZXlldmVudC5rZXkgPT09IFwiRXNjYXBlXCIpe1xyXG4gICAgICAgICAgICBrZXlldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAoa2V5ZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5wYXJlbnRFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBrZXlldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBpZihjbGlwYm9hcmQudGV4dENvbmNhdGVuYXRpb25DYXB0dXJpbmcpe1xyXG4gICAgICAgIGtleWV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAga2V5ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuLy8gbWFrZSBzdXJlIHRoYXQgZW1wdHkgZWxlbWVudCBhcmUgcG9wdWxhdGVkIHdpdGggZGVmYXVsdCBlZGl0YWJsZSBlbGVtZW50c1xyXG5mdW5jdGlvbiBvdmVybGF5Rm9jdXNpbihldmVudDogRm9jdXNFdmVudCk6IHZvaWQge1xyXG4gICAgbGV0IGV2ZW50VGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG5cclxuICAgIGlmIChldmVudFRhcmdldC5pc0NvbnRlbnRFZGl0YWJsZSAmJiBldmVudFRhcmdldC50ZXh0Q29udGVudCA9PSBcIlwiKSB7XHJcbiAgICAgICAgLy8gZXZlbnRUYXJnZXQuaW5uZXJIVE1MID0gXCI8ZGl2PjwvZGl2Pjxicj5cIjsgLy8gbm90IHdvcmtpbmcuLiBNYXliZSBpZiBJIGhhdmUgdGV4dCBub3QgY2VudGVyZWQgaW4gZWxtZWVudC4uXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGV4dGVuc2lvbkNsaWNrSGFuZGxlcihldmVudCA6IE1vdXNlRXZlbnQpe1xyXG5cclxuICAgIGxldCBldmVudFRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdfXl9eX15fXl9eX14nLCBldmVudFRhcmdldC5pZCk7XHJcbiAgICBcclxuICAgIC8qIFxyXG4gICAgICAgIE5PVEU6IFRISVMgSEFTIEJFRU4gTU9WRUQgVE8gSVRTIE9XTiBFVkVOVCFcclxuICAgICovXHJcbiAgICAvLyBpZiAoZXZlbnRUYXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJhZ2VfcHJvamNoaWxkVGFibGVSb3dcIikpe1xyXG4gICAgLy8gICAgIGxldCBwcm9qZWN0Q2hpbGRSb3cgPSBldmVudFRhcmdldC5wYXJlbnRFbGVtZW50IGFzIEhUTUxQcm9qZWN0Q2hpbGRSb3c7XHJcbiAgICAvLyAgICAgLy8gY29uc29sZS5sb2coJ0NsaWNrZWQgb24gY2hpbGQgcm93IHdpdGggdXVpZCA9ICcsIHByb2plY3RDaGlsZFJvdy5Db250ZW50RWRnZU9iamVjdC5jb250ZW50LlV1aWQpO1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKFwiVE9ETzogTE9BRCBDTElDS0VEIFNPVVJDRVMhIFwiLCBwcm9qZWN0Q2hpbGRSb3cuQ29udGVudEVkZ2VPYmplY3QuY29udGVudCk7XHJcbiAgICAgICAgXHJcbiAgICAvLyB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBzaG93T3ZlcmxheSgpIDogdm9pZHtcclxuICAgIGRvY3VtZW50LmJvZHkubGFzdEVsZW1lbnRDaGlsZC5hZnRlcihvdmVybGF5Q29udGFpbmVyKTtcclxuXHJcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZChvdmVybGF5Q3NzKTtcclxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kKHRhYmxlQ3NzKTtcclxuICAgIHByb2plY3RzLmFwcGVuZENzcygpO1xyXG4gICAgc291cmNlLmFwcGVuZENzcygpO1xyXG4gICAgY2xpcGJvYXJkLmFwcGVuZENzcygpO1xyXG4gICAgLy8gZmV0Y2hlci5mZXRjaEh0bWwoXCJvdmVybGF5Lmh0bWxcIilcclxuICAgIC8vICAgICAudGhlbihodG1sID0+IG92ZXJsYXlDb250YWluZXIuaW5uZXJIdG1sID0gaHRtbClcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGhpZGVPdmVybGF5KCkgOiB2b2lkIHtcclxuICAgIG92ZXJsYXlDb250YWluZXIucmVtb3ZlKCk7XHJcbiAgICBvdmVybGF5Q3NzLnJlbW92ZSgpO1xyXG5cclxuICAgIHRhYmxlQ3NzLnJlbW92ZSgpO1xyXG5cclxuICAgIHByb2plY3RzLnJlbW92ZUNzcygpO1xyXG4gICAgc291cmNlLnJlbW92ZUNzcygpO1xyXG4gICAgY2xpcGJvYXJkLnJlbW92ZUNzcygpO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQge1xyXG4gICAgaW5pdE92ZXJsYXksXHJcbiAgICBzaG93T3ZlcmxheSxcclxuICAgIGhpZGVPdmVybGF5LFxyXG59IiwiXHJcbmltcG9ydCB7IGFnZV9kYmlzIH0gZnJvbSBcIi4uL2RiaS1zZW5kXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEhUTUxQcm9qZWN0VGFibGVSb3cgZXh0ZW5kcyBIVE1MVGFibGVSb3dFbGVtZW50IHtcclxuICAgIG5vZGVPYmplY3Q6IGFueTtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIEhUTUxUYWJsZUNvbnRlbnRPYmplY3QgZXh0ZW5kcyBIVE1MVGFibGVFbGVtZW50IHtcclxuICAgIGNvbnRlbnRPYmplY3Q6IGFueTtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIEhUTUxQcm9qZWN0Q2hpbGRSb3cgZXh0ZW5kcyBIVE1MVGFibGVSb3dFbGVtZW50IHtcclxuICAgIENvbnRlbnRFZGdlT2JqZWN0OiBhbnk7XHJcbiAgICBpc1Byb2plY3RDaGlsZFJvdyA6IGJvb2xlYW47XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcG9wdWxhdGVQcm9wZXJ0aWVzVGFibGUocHJvcGVydGllc1RhYmxlOiBIVE1MVGFibGVDb250ZW50T2JqZWN0LCBwcm9qZWN0Q29udGVudE9iamVjdDogYW55KSB7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJwcm9qZWN0Q29udGVudE9iamVjdCA9IFwiLCBwcm9qZWN0Q29udGVudE9iamVjdClcclxuXHJcbiAgICAvLyBsZXQgcHJvamVjdE9iamVjdCA9IGV4dGVuc2lvblN0YXRlRnJvbnQuY3VycmVudF9wcm9qZWN0T2JqZWN0O1xyXG4gICAgbGV0IHByb2plY3RPYmplY3QgPSBwcm9qZWN0Q29udGVudE9iamVjdDtcclxuXHJcbiAgICBwcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdCA9IHByb2plY3RDb250ZW50T2JqZWN0O1xyXG4gICAgLy8gcHJvcGVydGllc1RhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCBwcm9qZWN0UHJvcGVydHlGb2N1c091dClcclxuXHJcbiAgICAvLyBleHRlbnNpb25TdGF0ZUZyb250LmN1cnJlbnRfcHJvamVjdFV1aWQgPSBwcm9qZWN0T2JqZWN0LlV1aWQ7XHJcblxyXG4gICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FhLXByb2plY3RUaXRsZScpLnRleHRDb250ZW50ID0gcHJvamVjdE9iamVjdC5UaXRsZTtcclxuXHJcbiAgICAvLyBsZXQgdGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdlX3Byb2plY3RQcm9wZXJ0aWVzVGFibGUtdGJvZHknKTtcclxuICAgIGxldCB0Ym9keSA9IHByb3BlcnRpZXNUYWJsZS5xdWVyeVNlbGVjdG9yKFwidGJvZHlcIik7XHJcbiAgICB0Ym9keS5pbm5lckhUTUwgPSAnJztcclxuXHJcblxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gcHJvamVjdE9iamVjdCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGAke2tleX06ICR7cHJvamVjdE9iamVjdFtrZXldfWApO1xyXG4gICAgICAgIGlmIChrZXkgPT09ICdUeXBlJyB8fCBrZXkgPT09ICdUaXRsZScgfHwga2V5ID09PSAnR29hbCcpIHtcclxuXHJcbiAgICAgICAgICAgIHRib2R5LmlubmVySFRNTCArPSBgXHJcblx0XHRcclxuXHRcdFx0PHRyPlxyXG5cdFx0XHRcdDx0ZCBpZD1hZ2VfcHJvalByb3BUYWJsZS0ke2tleX0ta2V5IGNsYXNzPVwiYWdlX2VsZW1lbnRcIiA+JHtrZXl9PC90ZD5cclxuXHRcdFx0XHQ8dGQgaWQ9YWdlX3Byb2pQcm9wVGFibGUtJHtrZXl9LXZhbHVlIGNsYXNzPVwiYWdlX2VsZW1lbnRcIiBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCIgPiR7cHJvamVjdE9iamVjdFtrZXldfTwvdGQ+XHJcblx0XHRcdDwvdHI+XHJcblx0XHRcclxuXHRcdGA7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGJvZHkuaW5uZXJIVE1MICs9IGBcclxuXHRcdFxyXG5cdFx0XHQ8dHI+XHJcblx0XHRcdFx0PHRkIGlkPWFnZV9wcm9qUHJvcFRhYmxlLSR7a2V5fS1rZXkgY2xhc3M9XCJhZ2VfZWxlbWVudFwiID4ke2tleX08L3RkPlxyXG5cdFx0XHRcdDx0ZCBpZD1hZ2VfcHJvalByb3BUYWJsZS0ke2tleX0tdmFsdWUgY2xhc3M9XCJhZ2VfZWxlbWVudFwiPiR7cHJvamVjdE9iamVjdFtrZXldfTwvdGQ+XHJcblx0XHRcdDwvdHI+XHJcblx0XHRcclxuXHRcdGA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyBTZXQgcHJvcGVydHkgcm93cyB0byBiZSB0YWJiYWJsZVxyXG4gICAgbGV0IHByb3BlcnR5Um93cyA9IHRib2R5LmNoaWxkcmVuO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0eVJvd3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgcHJvcGVydHlSb3cgPSBwcm9wZXJ0eVJvd3NbaV0gYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2NoaWxkID0gJywgcHJvcGVydHlSb3cpO1xyXG4gICAgICAgIHByb3BlcnR5Um93LnRhYkluZGV4ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjYWdlX3Byb2plY3RQcm9wZXJ0aWVzVGFibGUgdGJvZHkgdHInKSlcclxuICAgIC8vIGxldCBlZGl0YWJsZVByb2plY3RQcm9wZXJ0eVRkczogTm9kZUxpc3RPZjxFbGVtZW50PiA9IHRib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hZ2VfZWRpdGFibGVQcm9qZWN0UHJvcGVydHknKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKGVkaXRhYmxlUHJvamVjdFByb3BlcnR5VGQpXHJcblxyXG4gICAgLy8gQXJyYXkuZnJvbShlZGl0YWJsZVByb2plY3RQcm9wZXJ0eVRkcykuZm9yRWFjaCgoZWRpdGFibGVQcm9wZXJ0eUVsZW1lbnQpID0+IHtcclxuICAgIC8vICAgICBlZGl0YWJsZVByb3BlcnR5RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIGVkaXRhYmxlUHJvamVjdFByb3BlcnR5Rm9jdXNPdXQpXHJcbiAgICAvLyB9KVxyXG4gICAgLy8gZm9yIChsZXQgZWRpdGFibGVQcm9qZWN0UHJvcGVydHlUZCBvZiBlZGl0YWJsZVByb2plY3RQcm9wZXJ0eVRkcykge1xyXG4gICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKGVkaXRhYmxlUHJvamVjdFByb3BlcnR5VGQudGV4dENvbnRlbnQpO1xyXG4gICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKHByb3BlcnR5Um93LnRleHRDb250ZW50Lmxlbmd0aClcclxuXHJcbiAgICAvLyAgICAgLy8gZWRpdGFibGVQcm9qZWN0UHJvcGVydHlUZC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHJlYWRQcm9qZWN0UHJvcGVydGllc0Zyb21Eb21BbmRXcml0ZVB1dClcclxuICAgIC8vICAgICBlZGl0YWJsZVByb2plY3RQcm9wZXJ0eVRkLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgZWRpdGFibGVQcm9qZWN0UHJvcGVydHlGb2N1c091dClcclxuICAgIC8vICAgICAvLyBlZGl0YWJsZVByb2plY3RQcm9wZXJ0eVRkLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgcG9zdFByb2plY3RQcm9wZXJ0aWVzKVxyXG4gICAgLy8gfVxyXG5cclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcG9wdWxhdGVDaGlsZHJlblRhYmxlKHRhYmxlIDogSFRNTFRhYmxlRWxlbWVudCwgcHJvamVjdENoaWxkQ29udGVudEVkZ2VzIDogYW55KXtcclxuXHJcbiAgICAvLyBsZXQgcHJvamVjdENoaWxkQ29udGVudEVkZ2VzID0gZXh0ZW5zaW9uU3RhdGVGcm9udC5jdXJyZW50X3Byb2plY3RDaGlsZENvbnRlbnRFZGdlcztcclxuXHJcbiAgICAvLyBleHRlbnNpb25TdGF0ZUZyb250LmN1cnJlbnRfcHJvamVjdFV1aWQgPSBwcm9qZWN0T2JqZWN0LlV1aWQ7XHJcblxyXG4gICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FhLXByb2plY3RUaXRsZScpLnRleHRDb250ZW50ID0gcHJvamVjdE9iamVjdC5UaXRsZTtcclxuXHJcblxyXG4gICAgbGV0IHRib2R5ID0gdGFibGUucXVlcnlTZWxlY3RvcigndGJvZHknKTtcclxuXHJcbiAgICB0Ym9keS5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgICBmb3IgKGNvbnN0IGNvbnRlbnRFZGdlIG9mIHByb2plY3RDaGlsZENvbnRlbnRFZGdlcykge1xyXG5cclxuICAgICAgICBsZXQgbmV3UHJvamVjdENoaWxkUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSBhcyBIVE1MUHJvamVjdENoaWxkUm93O1xyXG5cclxuICAgICAgICBuZXdQcm9qZWN0Q2hpbGRSb3cuaXNQcm9qZWN0Q2hpbGRSb3cgPSB0cnVlO1xyXG4gICAgICAgIG5ld1Byb2plY3RDaGlsZFJvdy50YWJJbmRleCA9IDA7XHJcblxyXG4gICAgICAgIC8vIEN1c3RvbSBldmVudCB0byBzcGVjaWZpY2FsbHkgbG9hZCB0aGUgc291cmNlIGZyb20gdGhlIG92ZXJsYXktdHMgbW9kdWxlXHJcbiAgICAgICAgbmV3UHJvamVjdENoaWxkUm93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQgOiBFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBodHRwczovL3d3dy5yZWRkaXQuY29tL3Ivd2ViZGV2L2NvbW1lbnRzL3JoZjJtdS9mcmllbmRseV9yZW1pbmRlcl91c2VfZXZlbnRjdXJyZW50dGFyZ2V0X25vdC9cclxuICAgICAgICAgICAgbGV0IGVsZW1lbnRDdXJyZW50VGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldCBhcyBIVE1MUHJvamVjdENoaWxkUm93O1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImV2ZW50LmN1cnJlbnRUYXJnZXQgPSBcIiwgZWxlbWVudEN1cnJlbnRUYXJnZXQpXHJcbiAgICAgICAgICAgIGxldCBsb2Fkc291cmNlRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoIFwibG9hZHNvdXJjZVwiLCB7IFxyXG4gICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRldGFpbDoge2NvbnRlbnRPYmplY3Q6IGVsZW1lbnRDdXJyZW50VGFyZ2V0LkNvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnR9LFxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgX3RoaXMgPSB0aGlzIGFzIEhUTUxQcm9qZWN0Q2hpbGRSb3c7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX3RoaXMgPSBcIiwgX3RoaXMpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImV2ZW50LnRhcmdldCA9IFwiLCBldmVudC50YXJnZXQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZWxlbWVudEN1cnJlbnRUYXJnZXQuZGlzcGF0Y2hFdmVudChsb2Fkc291cmNlRXZlbnQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgbmV3UHJvamVjdENoaWxkUm93LmlkID0gYGFnZV9wcm9qY2hpbGRUYWJsZVJvdy0ke2NvbnRlbnRFZGdlLmNvbnRlbnQuVXVpZH1gO1xyXG4gICAgICAgIG5ld1Byb2plY3RDaGlsZFJvdy5jbGFzc0xpc3QuYWRkKFwiYWdlX3Byb2pjaGlsZFRhYmxlUm93XCIpO1xyXG4gICAgICAgIG5ld1Byb2plY3RDaGlsZFJvdy5Db250ZW50RWRnZU9iamVjdCA9IGNvbnRlbnRFZGdlO1xyXG5cclxuICAgICAgICBuZXdQcm9qZWN0Q2hpbGRSb3cuaW5uZXJIVE1MICs9IGBcclxuXHRcdFxyXG5cdFx0XHRcdDx0ZCBpZD1hZ2VfcHJvamNoaWxkVGFibGUtVGFibGUtJHtjb250ZW50RWRnZS5jb250ZW50LlV1aWR9IGNsYXNzPVwiYWdlX2VsZW1lbnQgYWdlX3Byb2pjaGlsZFRhYmxlIFRhYmxlXCIgZGF0YS1VdWlkPSR7Y29udGVudEVkZ2UuY29udGVudC5VdWlkfT4ke2NvbnRlbnRFZGdlLmNvbnRlbnQuVGFibGV9PC90ZD5cclxuXHRcdFx0XHQ8dGQgaWQ9YWdlX3Byb2pjaGlsZFRhYmxlLVRpdGxlLSR7Y29udGVudEVkZ2UuY29udGVudC5VdWlkfSBjbGFzcz1cImFnZV9lbGVtZW50IGFnZV9wcm9qY2hpbGRUYWJsZSBUaXRsZVwiIGRhdGEtVXVpZD0ke2NvbnRlbnRFZGdlLmNvbnRlbnQuVXVpZH0+JHtjb250ZW50RWRnZS5jb250ZW50LlRpdGxlfTwvdGQ+XHJcblx0XHRcdFxyXG5cdFx0YDtcclxuXHJcbiAgICAgICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGlkPWFnZV9wcm9qY2hpbGRUYWJsZVJvdy0ke25vZGVFZGdlLlV1aWR9YCk7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBpZD1hZ2VfcHJvamNoaWxkVGFibGVSb3ctJHtub2RlRWRnZS5VdWlkfWApKVxyXG5cclxuXHJcbiAgICAgICAgLy8gbmV3UHJvamVjdENoaWxkUm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJvamVjdENoaWxkUm93Q2xpY2tlZClcclxuXHJcbiAgICAgICAgdGJvZHkuYXBwZW5kQ2hpbGQobmV3UHJvamVjdENoaWxkUm93KVxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwb3B1bGF0ZVByb2plY3RTZWFyY2hUYWJsZShwcm9qZWN0U2VhcmNoVGFibGUgOiBhbnksIHByb2plY3RPYmplY3RzIDogYW55KTogdm9pZCB7XHJcbiAgICAvLyBjb25zb2xlLmxvZygnUFJPSkVDVCBUQkFMRSBQT1AnKTtcclxuXHJcbiAgICAvLyBjaGlsZE9iamVjdHMgPSBleHRlbnNpb25TdGF0ZUZyb250LmN1cnJlbnRfcHJvamVjdFNlYXJjaE9iamVjdHM7XHJcblxyXG4gICAgLy8gbGV0IHByb2plY3RUYWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2VfcHJvamVjdFRhYmxlJyk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcIlNTU1NTU1NTU1NTU1NTU1NTID0gXCIsIHByb2plY3RPYmplY3RzLmxlbmd0aClcclxuICAgIGxldCB0Ym9keSA9IHByb2plY3RTZWFyY2hUYWJsZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGJvZHknKVswXVxyXG4gICAgLy8gY29uc29sZS5sb2coXCJ0Ym9keSA9IFwiLCB0Ym9keSk7XHJcblxyXG4gICAgdGJvZHkuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgZm9yIChsZXQgY2hpbGRPYmplY3Qgb2YgcHJvamVjdE9iamVjdHMpIHtcclxuXHJcbiAgICAgICAgbGV0IHRhYmxlUm93SHRtbCA9IGBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgPHRkIGRhdGEtVXVpZD1cIiR7Y2hpbGRPYmplY3QuVXVpZH1cIiBjbGFzcz1cImFnZV9lbGVtZW50IGFnZV9wcm9qZWN0Um93U2VhcmNoRGF0YSBUYWJsZVwiPiR7Y2hpbGRPYmplY3QuVGFibGV9PC90aD5cclxuICAgICAgICAgICAgICAgIDx0ZCBkYXRhLVV1aWQ9XCIke2NoaWxkT2JqZWN0LlV1aWR9XCIgY2xhc3M9XCJhZ2VfZWxlbWVudCBhZ2VfcHJvamVjdFJvd1NlYXJjaERhdGEgVGl0bGVcIj4ke2NoaWxkT2JqZWN0LlRpdGxlfTwvdGQ+XHJcblxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIC8vIGxldCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XHJcbiAgICAgICAgbGV0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSBhcyBIVE1MUHJvamVjdFRhYmxlUm93O1xyXG4gICAgICAgIHRyLmlkID0gJ2FnZV9wcm9qZWN0U2VhcmNoUm93LScgKyBjaGlsZE9iamVjdC5VdWlkO1xyXG4gICAgICAgIHRyLmNsYXNzTGlzdC5hZGQoJ2FnZV9wcm9qZWN0U2VhcmNoUm93Jyk7XHJcbiAgICAgICAgLy8gdHIuc2V0QXR0cmlidXRlKFwidGFiSW5kZXhcIilcclxuICAgICAgICB0ci50YWJJbmRleCA9IDA7XHJcbiAgICAgICAgdHIubm9kZU9iamVjdCA9IGNoaWxkT2JqZWN0O1xyXG4gICAgICAgIC8vIHRyLmRhdGFzZXQuTm9kZSA9IDE7XHJcbiAgICAgICAgLy8gdHIuZGF0YXNldC5VdWlkID0gY2hpbGRPYmplY3QuVXVpZDtcclxuICAgICAgICAvLyB0ci5zZXRBdHRyaWJ1dGUoJ2RhdGEtTm9kZScsICcxJyk7XHJcbiAgICAgICAgdHIuc2V0QXR0cmlidXRlKCdkYXRhLVV1aWQnLCBjaGlsZE9iamVjdC5VdWlkKTtcclxuICAgICAgICAvLyB0ci50YWJJbmRleCA9IDA7XHJcbiAgICAgICAgdHIuaW5uZXJIVE1MID0gdGFibGVSb3dIdG1sO1xyXG4gICAgICAgIC8vIHRyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tDYWxsYmFjayk7XHJcbiAgICAgICAgLy8gdHIuY29udGVudEVkaXRhYmxlID0gJ1RydWUnO1xyXG5cclxuICAgICAgICB0Ym9keS5hcHBlbmQodHIpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRyKVxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCAqIGFzIGZldGNoZXIgZnJvbSBcIi4uL2ZldGNoZXJcIjtcclxuaW1wb3J0ICogYXMgZG9tIGZyb20gXCIuL3Byb2plY3RfZG9tXCI7XHJcbmltcG9ydCB7IEhUTUxQcm9qZWN0VGFibGVSb3csIEhUTUxUYWJsZUNvbnRlbnRPYmplY3QgfSBmcm9tIFwiLi9wcm9qZWN0X2RvbVwiO1xyXG5pbXBvcnQge2FnZV9kYmlzLCB3YWl0Rm9yTG9hZGVkQXBpUGF0aH0gZnJvbSBcIi4uL2RiaS1zZW5kXCI7XHJcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSBcIi4uL3V0aWxcIjtcclxuXHJcbmxldCBjdXJyZW50UHJvamVjdE9iamVjdCA6IGFueSA9IG51bGw7XHJcblxyXG5sZXQgc2lkZVBhbmVsIDogRWxlbWVudDtcclxubGV0IHNpZGVQYW5lbElzUmlnaHQgOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbmxldCBwcm9qZWN0TW9yZU9wdGlvbnNDb250ZXh0TWVudSA6IEhUTUxEaXZFbGVtZW50O1xyXG5cclxubGV0IHByb2plY3RDb250YWluZXIgOiBFbGVtZW50O1xyXG5sZXQgcHJvamVjdENzczogSFRNTEVsZW1lbnQ7XHJcblxyXG5sZXQgcHJvamVjdE1vcmVPcHRpb25zQnV0dG9uIDogSFRNTEVsZW1lbnQ7XHJcbmxldCBwcm9qZWN0TW9yZU9wdGlvbnNNZW51OiBIVE1MRWxlbWVudDtcclxuXHJcbmxldCBwcm9qZWN0U2VhcmNoRWxlbWVudCA6IEhUTUxEaXZFbGVtZW50O1xyXG5sZXQgc2VhcmNoU3RyaW5nRXhpc3RzIDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxubGV0IHByb2plY3RTZWFyY2hPYmplY3RzOiBhbnk7XHJcbmxldCBwcm9qZWN0U2VhcmNoVGFibGU6IEhUTUxUYWJsZUVsZW1lbnQ7XHJcblxyXG5sZXQgcHJvamVjdENvbnRlbnRFZGdlQ2hpbGRyZW4gOiBhbnk7XHJcbmxldCBwcm9qZWN0Q2hpbGRyZW5UYWJsZSA6IEhUTUxUYWJsZUVsZW1lbnQ7XHJcblxyXG5sZXQgcHJvamVjdFByb3BlcnRpZXNUYWJsZTogSFRNTFRhYmxlQ29udGVudE9iamVjdDtcclxuXHJcbmxldCBwcm9qZWN0VGl0bGVFbGVtZW50IDogSFRNTEVsZW1lbnQ7XHJcblxyXG5cclxuLy8gaW50ZXJmYWNlIEhUTUxUYWJsZVJvd0VsZW1lbnQge1xyXG4vLyAgICAgbm9kZU9iamVjdD86IGFueTtcclxuLy8gfVxyXG5cclxuLy8gaW50ZXJmYWNlIEhUTUxQcm9qZWN0VGFibGVSb3cgZXh0ZW5kcyBIVE1MVGFibGVSb3dFbGVtZW50IHtcclxuLy8gICAgIG5vZGVPYmplY3Q6IGFueTtcclxuLy8gfVxyXG5cclxuXHJcbmZ1bmN0aW9uIGluaXRQcm9qZWN0cyhfc2lkZVBhbmVsIDogRWxlbWVudCwgX3Byb2plY3RNb3JlT3B0aW9uc0NvbnRleHRNZW51IDogSFRNTERpdkVsZW1lbnQpIDogdm9pZHtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdPVkVSTEFZIFRTIElOSVQnKTtcclxuXHJcbiAgICBzaWRlUGFuZWwgPSBfc2lkZVBhbmVsO1xyXG5cclxuICAgIC8vIE1PUkUgT1BUSU9OUyBDT05URVhUIE1FTlVcclxuICAgIHByb2plY3RNb3JlT3B0aW9uc0NvbnRleHRNZW51ID0gX3Byb2plY3RNb3JlT3B0aW9uc0NvbnRleHRNZW51O1xyXG4gICAgcHJvamVjdE1vcmVPcHRpb25zQ29udGV4dE1lbnUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrZWRQcm9qZWN0Q29udGV4dE1lbnUpXHJcbiAgICAvLyBEZXRlY3RzIGFueSBjbGljayBpbiB0aGUgd2hvbGUgZG9jdW1lbnQhXHJcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoaWRlUHJvamVjdENvbnRleHRNZW51LCB7Y2FwdHVyZTogZmFsc2V9KTtcclxuXHJcbiAgICBwcm9qZWN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBwcm9qZWN0Q29udGFpbmVyLmlkID0gXCJhZ2VfcHJvamVjdENvbnRhaW5lclwiO1xyXG4gICAgcHJvamVjdENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYWdlX3BhbmVsQ29udGFpbmVyXCIpO1xyXG4gICAgcHJvamVjdENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdENsaWNrKTtcclxuICAgIHByb2plY3RDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIHByb2plY3RQcm9wZXJ0eUZvY3VzT3V0KTtcclxuXHJcbiAgICBmZXRjaGVyLmZldGNoSHRtbChcInByb2plY3RzLmh0bWxcIilcclxuICAgICAgICAudGhlbihodG1sID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJIVE1MIDogXCIsIGh0bWwpXHJcbiAgICAgICAgICAgIHByb2plY3RDb250YWluZXIuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgICAgICAgICAgcHJvamVjdFRpdGxlRWxlbWVudCA9IHByb2plY3RDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2VfcHJvamVjdFRpdGxlXCIpO1xyXG4gICAgICAgICAgICBwcm9qZWN0U2VhcmNoVGFibGUgPSBwcm9qZWN0Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCJ0YWJsZVwiKTtcclxuICAgICAgICAgICAgcHJvamVjdENoaWxkcmVuVGFibGUgPSBwcm9qZWN0Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX3Byb2plY3RDaGlsZHJlblRhYmxlXCIpO1xyXG4gICAgICAgICAgICBwcm9qZWN0UHJvcGVydGllc1RhYmxlID0gcHJvamVjdENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiI2FnZV9wcm9qZWN0UHJvcGVydGllc1RhYmxlXCIpO1xyXG4gICAgICAgICAgICBwcm9qZWN0U2VhcmNoRWxlbWVudCA9IHByb2plY3RDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2VfcHJvamVjdFNlYXJjaElucHV0XCIpO1xyXG4gICAgICAgICAgICBwcm9qZWN0U2VhcmNoRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNpblwiLCBzZWFyY2hQcm9qZWN0SW4pO1xyXG4gICAgICAgICAgICBwcm9qZWN0U2VhcmNoRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgc2VhcmNoUHJvamVjdE91dCk7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPIDogZ3JhYiB0aGUgbW9yZSBvcHRpb25zIGNvbnRleHQgbWVudVxyXG4gICAgICAgICAgICAvLyBwcm9qZWN0TW9yZU9wdGlvbnNNZW51ID0gXHJcbiAgICAgICAgICAgIHByb2plY3RNb3JlT3B0aW9uc0J1dHRvbiA9IHByb2plY3RDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2VfcHJvamVjdE1vcmVPcHRpb25zXCIpO1xyXG4gICAgICAgICAgICBsZXQgbW9yZU9wdGlvbnNCYWNrZ3JvdW5kVXJsID0gYnJvd3Nlci5ydW50aW1lLmdldFVSTChcclxuICAgICAgICAgICAgICAgIFwicmVzb3VyY2VzL21vcmUtb3B0aW9ucy5wbmdcIlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBsZXQgYmFja2dyb3VuZFN0cmluZyA9IGB1cmwoJHttb3JlT3B0aW9uc0JhY2tncm91bmRVcmx9KWA7XHJcbiAgICAgICAgICAgIHByb2plY3RNb3JlT3B0aW9uc0J1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBiYWNrZ3JvdW5kU3RyaW5nO1xyXG5cclxuICAgICAgICAgICAgLy8gU2VhcmNoIGljb25cclxuICAgICAgICAgICAgbGV0IHNlYXJjaEJhY2tncm91bmRVcmwgPSBicm93c2VyLnJ1bnRpbWUuZ2V0VVJMKFxyXG4gICAgICAgICAgICAgICAgXCJyZXNvdXJjZXMvc2VhcmNoLWljb24ucG5nXCJcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgbGV0IHNlYXJjaEJhY2tncm91bmRTdHJpbmcgPSBgdXJsKCR7c2VhcmNoQmFja2dyb3VuZFVybH0pYDtcclxuICAgICAgICAgICAgcHJvamVjdFNlYXJjaEVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gc2VhcmNoQmFja2dyb3VuZFN0cmluZztcclxuXHJcbiAgICAgICAgICAgIC8vIHBlcmZvcm0gc2VhcmNoIG9ubHkgYWZ0ZXIgZ3VhcmFudGVlZCBsb2FkIG9mIGFib3ZlIGh0bWwvY3NzIEFORCB0aGUgYXBpIHBhdGggZnJvbSBmaWxlLlxyXG4gICAgICAgICAgICAvLyBmZXRjaFByb2plY3RTZWFyY2goXCJcIikgXHJcbiAgICAgICAgICAgIC8vICAgICAudGhlbigoY29udGVudE9iamVjdEFycmF5KSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coY29udGVudE9iamVjdEFycmF5KVxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGRvbS5wb3B1bGF0ZVByb2plY3RTZWFyY2hUYWJsZShwcm9qZWN0U2VhcmNoVGFibGUsIGNvbnRlbnRPYmplY3RBcnJheSk7XHJcbiAgICAgICAgICAgIC8vICAgICB9KVxyXG4gICAgICAgICAgICAvLyBwZXJmb3JtU2VhcmNoKCk7XHJcbiAgICAgICAgICAgIHdhaXRGb3JMb2FkZWRBcGlQYXRoKGRiaXNMb2FkZWRDYWxsYmFjayk7XHJcbiAgICAgICAgfSkgXHJcbiAgXHJcbiAgICBwcm9qZWN0Q3NzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG4gICAgcHJvamVjdENzcy5pZCA9IFwiYWdlX3Byb2plY3RTdHlsZVwiO1xyXG4gICAgZmV0Y2hlci5mZXRjaENzcyhcInByb2plY3RzLmNzc1wiKVxyXG4gICAgLnRoZW4oY3NzID0+IHtcclxuICAgICAgICBwcm9qZWN0Q3NzLmlubmVyVGV4dCA9IGNzcztcclxuICAgIH0pXHJcblxyXG4gICAgXHJcblxyXG4gICAgY29uc29sZS5sb2coXCJzaWRlUGFuZWwuaWQgPSBcIiwgc2lkZVBhbmVsLmlkKVxyXG4gICAgXHJcbiAgICBzaWRlUGFuZWwuYXBwZW5kKHByb2plY3RDb250YWluZXIpO1xyXG5cclxuXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbn1cclxuXHJcblxyXG4vKiogICovXHJcbmZ1bmN0aW9uIGRiaXNMb2FkZWRDYWxsYmFjaygpe1xyXG4gICAgcGVyZm9ybVNlYXJjaCgpO1xyXG59XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBBZGQgbmV3IHByb2plY3Qgb2JqZWN0IGFuZFxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlTmV3UHJvamVjdCgpIHtcclxuICAgIGxldCBuZXdQcm9qZWN0T2JqZWN0ID0gYXdhaXQgYWdlX2RiaXMuQ29udGVudF9JbnNlcnRPblRhYmxlKFwiUHJvamVjdFwiKVxyXG4gICAgY3VycmVudFByb2plY3RPYmplY3QgPSBuZXdQcm9qZWN0T2JqZWN0O1xyXG4gICAgLy8gYXdhaXQgbG9hZFByb2plY3RXaXRoQ29udGVudE9iamVjdChuZXdQcm9qZWN0T2JqZWN0KTtcclxuICAgIHJlbG9hZEN1cnJlbnRQcm9qZWN0KCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiAgIFJlbG9hZCB1c2luZyB0aGUgYWxyZWFkeSBzZXQgdmFsdWVzLlxyXG4qL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVsb2FkQ3VycmVudFByb2plY3QoKSB7XHJcbiAgICBhd2FpdCByZWxvYWRDaGlsZHJlblRhYmxlKCk7XHJcbiAgICBhd2FpdCByZWxvYWRQcm9wZXJ0aWVzVGFibGUoKTtcclxuICAgIGF3YWl0IHJlZnJlc2hQcm9qZWN0VGl0bGVFbGVtZW50KCk7XHJcbiAgICBwZXJmb3JtU2VhcmNoKCk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBsb2FkUHJvamVjdFdpdGhVdWlkKFV1aWQgOiBzdHJpbmcgfCBudW1iZXIpe1xyXG4gICAgYWdlX2RiaXMuQ29udGVudF9TZWxlY3RPblV1aWQoVXVpZClcclxuICAgICAgICAudGhlbigoY29udGVudE9iamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsb2FkUHJvamVjdFdpdGhDb250ZW50T2JqZWN0KGNvbnRlbnRPYmplY3QpO1xyXG4gICAgICAgIH0pXHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHJlbG9hZENoaWxkcmVuVGFibGUoKXtcclxuICAgIGxldCBjb250ZW50RWRnZXMgPSBhd2FpdCBhZ2VfZGJpcy5Db250ZW50RWRnZV9TZWxlY3RDaGlsZE9mVXVpZChjdXJyZW50UHJvamVjdE9iamVjdC5VdWlkKVxyXG4gICAgZG9tLnBvcHVsYXRlQ2hpbGRyZW5UYWJsZShwcm9qZWN0Q2hpbGRyZW5UYWJsZSwgY29udGVudEVkZ2VzKTtcclxufVxyXG5hc3luYyBmdW5jdGlvbiByZWxvYWRQcm9wZXJ0aWVzVGFibGUoKSB7XHJcbiAgICBcclxuICAgIGFnZV9kYmlzLkNvbnRlbnRfU2VsZWN0T25VdWlkKGN1cnJlbnRQcm9qZWN0T2JqZWN0LlV1aWQpXHJcbiAgICAgICAgLnRoZW4oKGNvbnRlbnRPYmplY3QpID0+IHtcclxuICAgICAgICAgICAgZG9tLnBvcHVsYXRlUHJvcGVydGllc1RhYmxlKHByb2plY3RQcm9wZXJ0aWVzVGFibGUsIGNvbnRlbnRPYmplY3QpO1xyXG4gICAgICAgIH0pICAgXHJcbn1cclxuZnVuY3Rpb24gcmVmcmVzaFByb2plY3RUaXRsZUVsZW1lbnQoKXtcclxuICAgIHByb2plY3RUaXRsZUVsZW1lbnQudGV4dENvbnRlbnQgPSBjdXJyZW50UHJvamVjdE9iamVjdC5UaXRsZTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHByb2plY3RQcm9wZXJ0eUZvY3VzT3V0KGV2ZW50OiBGb2N1c0V2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZygnRk9DVVMgT1VUIFBST0pFQ1QgUFJPUEVSVFknKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiZXZlbnQudGFyZ2V0ID0gXCIsIGV2ZW50LnRhcmdldCk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcInRoaXMgPSBcIiwgdGhpcyk7XHJcblxyXG4gICAgbGV0IGRhdGFFbGVtZW50ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgLy8gbGV0IHByb2plY3RUYWJsZTogSFRNTFRhYmxlQ29udGVudE9iamVjdCA9IHRoaXM7XHJcbiAgICBcclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZygnJywgZXZlbnQudGFyZ2V0LilcclxuICAgIHN3aXRjaCAoZGF0YUVsZW1lbnQuaWQpIHtcclxuICAgICAgICAvLyBUWVBFXHJcbiAgICAgICAgY2FzZSBcImFnZV9wcm9qUHJvcFRhYmxlLVR5cGUtdmFsdWVcIjpcclxuICAgICAgICAgICAgcHJvamVjdFByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0LlR5cGUgPSBkYXRhRWxlbWVudC50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLy8gVElUTEVcclxuICAgICAgICBjYXNlIFwiYWdlX3Byb2pQcm9wVGFibGUtVGl0bGUtdmFsdWVcIjpcclxuICAgICAgICAgICAgcHJvamVjdFByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0LlRpdGxlID0gZGF0YUVsZW1lbnQudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vIEdPQUxcclxuICAgICAgICBjYXNlIFwiYWdlX3Byb2pQcm9wVGFibGUtR29hbC12YWx1ZVwiOlxyXG4gICAgICAgICAgICBwcm9qZWN0UHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QuR29hbCA9IGRhdGFFbGVtZW50LnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgLy8gUmV0dXJuISBFbHNlIGVsZW1lbnRzIHdpbGwgYmUgdXBkYXRlZCB3aXRoIGdhcmJhZ2UgdmFsdWUgd2hlbiBlLmcuIGV4aXRpbmcgc2VhcmNoIGlucHV0XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgYWdlX2RiaXMuQ29udGVudF9VcGRhdGVXaXRoQ29udGVudE9iamVjdChwcm9qZWN0UHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QpXHJcbiAgICAgICAgLnRoZW4odXBkYXRlZENvbnRlbnRPYmplY3QgPT4ge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGRhdGFFbGVtZW50LmlkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUWVBFXHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiYWdlX3Byb2pQcm9wVGFibGUtVHlwZS12YWx1ZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuYXNzZXJ0KHVwZGF0ZWRDb250ZW50T2JqZWN0LlR5cGUgPT0gcHJvamVjdFByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0LlR5cGUsIFwiJ1BVVCcgY29udGVudCBPYmplY3QgVHlwZSBkb2VzIG5vdCBtYXRjaCB0aGUgcHJvamVjdCB0YWJsZSAuY29udGVudE9iamVjdC5UeXBlICFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAvLyBUSVRMRVxyXG4gICAgICAgICAgICAgICAgY2FzZSBcImFnZV9wcm9qUHJvcFRhYmxlLVRpdGxlLXZhbHVlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5hc3NlcnQodXBkYXRlZENvbnRlbnRPYmplY3QuVGl0bGUgPT0gcHJvamVjdFByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0LlRpdGxlLCBcIidQVVQnIGNvbnRlbnQgT2JqZWN0IFRpdGxlIGRvZXMgbm90IG1hdGNoIHRoZSBwcm9qZWN0IHRhYmxlIC5jb250ZW50T2JqZWN0LlRpdGxlICFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbC5VdWlkQ2hlY2tBbmRVcGRhdGVUaXRsZXMoY3VycmVudFByb2plY3RPYmplY3QuVXVpZCwgdXBkYXRlZENvbnRlbnRPYmplY3QuVGl0bGUpOyAvLyBVcGRhdGUgdGl0bGVzIGluIGN1cnJlbnRseSBsb2FkZWQgZXh0ZW5zaW9uXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAvLyBHT0FMXHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiYWdlX3Byb2pQcm9wVGFibGUtR29hbC12YWx1ZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuYXNzZXJ0KHVwZGF0ZWRDb250ZW50T2JqZWN0LkdvYWwgPT0gcHJvamVjdFByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0LkdvYWwsIFwiJ1BVVCcgY29udGVudCBPYmplY3QgR29hbCBkb2VzIG5vdCBtYXRjaCB0aGUgcHJvamVjdCB0YWJsZSAuY29udGVudE9iamVjdC5Hb2FsICFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfSlcclxuICAgIC8vIGxldCBwcm9qZWN0Q29udGVudE9iamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3Byb2plY3RQcm9wZXJ0aWVzVGFibGVcIikgYXMgSFRNTFRhYmxlQ29udGVudE9iamVjdDtcclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZyhcInByb2plY3RDb250ZW50T2JqZWN0LmNvbnRlbnRPYmplY3QgPSBcIiwgcHJvamVjdFByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0KTtcclxuICAgIGN1cnJlbnRQcm9qZWN0T2JqZWN0ID0gcHJvamVjdFByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0O1xyXG5cclxuICAgIHJlZnJlc2hQcm9qZWN0VGl0bGVFbGVtZW50KCk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy8gVXBkYXRlIFRpdGxlcyBpbiB0aGUgc2VhcmNoXHJcbiAgICAvLyBsZXQgZWxlbWVudFdpdGhTYW1lVXVpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLXV1aWQ9JyR7Y3VycmVudFByb2plY3RPYmplY3QuVXVpZH0nXWApO1xyXG4gICAgLy8gZWxlbWVudFdpdGhTYW1lVXVpZC5mb3JFYWNoKChfZWxlbWVudCkgPT4ge1xyXG4gICAgLy8gICAgIGlmIChfZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJhZ2VfZWxlbWVudFwiKSAmJiBfZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJhZ2VfcHJvamVjdFNlYXJjaFJvd1wiKSl7XHJcbiAgICAvLyAgICAgICAgIC8vIF9lbGVtZW50LmNoaWxkcmVuWzFdLnRleHRDb250ZW50ID0gZGF0YUVsZW1lbnQudGV4dENvbnRlbnQ7IC8vIHVwZGF0ZSB0aGUgc2Vjb25kIHNlYXJjaCBjb2x1bW47IGVkaXQ6IGRvZXNuJ3Qgd29yay4uLlxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH0pXHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGNsaWNrZWRQcm9qZWN0Q29udGV4dE1lbnUoZXZlbnQ6IE1vdXNlRXZlbnQpe1xyXG4gICAgbGV0IGV2ZW50VGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgc3dpdGNoIChldmVudFRhcmdldC5pZCkge1xyXG4gICAgICAgIGNhc2UgXCJuZXdQcm9qZWN0QnRuXCI6XHJcbiAgICAgICAgICAgIGF3YWl0IGNyZWF0ZU5ld1Byb2plY3QoKTtcclxuICAgICAgICAgICAgc2hvd1Byb2plY3RQcm9wZXJ0aWVzKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJuZXdTb3VyY2VCdG5cIjpcclxuICAgICAgICAgICAgaW5zZXJ0TmV3U291cmNlVG9BY3RpdmVQcm9qZWN0KCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJyZWZyZXNoRXh0ZW5zaW9uXCI6XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIidyZWZyZXNoRXh0ZW5zaW9uJyBOT1QgRlVMTFkgSU1QTEVNRU5URUQgISBPTkxZIFBST0pFQ1QgSVMgUkVGUkVTSEVEXCIpO1xyXG4gICAgICAgICAgICAvLyByZWxvYWRDdXJyZW50UHJvamVjdCgpO1xyXG4gICAgICAgICAgICBsZXQgbmV3c291cmNlRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXCJyZWZyZXNoZXh0ZW5zaW9uXCIsIHtcclxuICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBwcm9qZWN0Q29udGFpbmVyLmRpc3BhdGNoRXZlbnQobmV3c291cmNlRXZlbnQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwicHJpbnRDdXJyZW50UHJvamVjdFwiOlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50UHJvamVjdE9iamVjdCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGN1cnJlbnRQcm9qZWN0T2JqZWN0KSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJtb3ZlRXh0ZW5zaW9uXCI6XHJcbiAgICAgICAgICAgIHRvZ2dsZUV4dGVuc2lvbkxvY2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUV4dGVuc2lvbkxvY2F0aW9uKCl7XHJcbiAgICAvLyBTaGlmdCBiZXR3ZWVuIGxlZnQgYW5kIHJpZ2h0XHJcbiAgICBpZiAoc2lkZVBhbmVsSXNSaWdodCkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX292ZXJsYXlDb250YWluZXJcIikuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBcInN0YXJ0XCI7XHJcbiAgICAgICAgc2lkZVBhbmVsSXNSaWdodCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2Vfb3ZlcmxheUNvbnRhaW5lclwiKS5zdHlsZS5qdXN0aWZ5Q29udGVudCA9IFwiZW5kXCI7XHJcbiAgICAgICAgc2lkZVBhbmVsSXNSaWdodCA9IHRydWU7XHJcbiAgICB9XHJcbn1cclxuICAgIFxyXG4vLyB9XHJcbi8vIDxidXR0b24gaWQ9XCJyZWZyZXNoRXh0ZW5zaW9uXCIgPiBSZWZyZXNoIGZyb20gc2VydmVyIDwvYnV0dG9uPlxyXG4vLyAgICAgPCBidXR0b24gaWQgPSBcInByaW50Q3VycmVudFByb2plY3RcIiA+IENvcHkgUHJvamVjdCBQcm9wZXJ0aWVzIDwvYnV0dG9uPlxyXG4vLyAgICAgICAgIDwgYnV0dG9uIGlkID0gXCJtb3ZlRXh0ZW5zaW9uXCIgPiBNb3ZlIEV4dGVuc2lvbiA8L2J1dHRvbj5cclxuXHJcblxyXG4vKipcclxuICogQWRkIG5ldyBjaGlsZC1zb3VyY2UsIGZpcmVzIG9mZiB0aGUgbG9hZHNvdXJjZSBDdXN0b21FdmVudCwgYW5kIHRoZW4gcmVsb2FkcyB0aGUgcHJvamVjdCBjaGlsZCB0YWJsZS5cclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbnNlcnROZXdTb3VyY2VUb0FjdGl2ZVByb2plY3QoKXtcclxuXHJcbiAgICBpZiAoY3VycmVudFByb2plY3RPYmplY3QgPT09IHVuZGVmaW5lZCB8fCBjdXJyZW50UHJvamVjdE9iamVjdCA9PT0gbnVsbCl7XHJcbiAgICAgICAgY29uc29sZS53YXJuKFwiTm8gY3VycmVudCBQcm9qZWN0LiBDYW4ndCBhZGQgbmV3IHNvdXJjZS5cIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjb250ZW50RWRnZU9iamVjdDogYW55ID0gYXdhaXQgYWdlX2RiaXMuQ29udGVudEVkZ2VfSW5zZXJ0QWRqYWNlbnRUb1V1aWRJbnRvVGFibGUoY3VycmVudFByb2plY3RPYmplY3QuVXVpZCwgMSwgJ1NvdXJjZScsICcnLCAnJywgJy8nKVxyXG5cclxuICAgIC8vIG1ha2Ugc3VyZSB3ZSBzZXQgYSBkZWZhdWx0IHVybCFcclxuICAgIGxldCBfbmV3U291cmNlT2JqZWN0ID0gY29udGVudEVkZ2VPYmplY3QuY29udGVudDtcclxuICAgIF9uZXdTb3VyY2VPYmplY3QuVXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcbiAgICBfbmV3U291cmNlT2JqZWN0LlRpdGxlID0gZG9jdW1lbnQudGl0bGU7XHJcbiAgICBfbmV3U291cmNlT2JqZWN0ID0gYXdhaXQgYWdlX2RiaXMuQ29udGVudF9VcGRhdGVXaXRoQ29udGVudE9iamVjdChfbmV3U291cmNlT2JqZWN0KTtcclxuXHJcbiAgICAvLyBJbnNlcnQgbmV3IFNjaGVkdWxlXHJcbiAgICBhd2FpdCBhZ2VfZGJpcy5SZXZpZXdfSW5zZXJ0U2NoZWR1bGVPblV1aWQoX25ld1NvdXJjZU9iamVjdC5VdWlkLCBcIlwiKTtcclxuXHJcbiAgICAvLyBTRU5EIE5FVyBTT1VSQ0UgTUVTU0FHRVxyXG4gICAgbGV0IG5ld3NvdXJjZUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwibmV3c291cmNlXCIsIHtcclxuICAgICAgICBidWJibGVzOiB0cnVlLFxyXG4gICAgICAgIGRldGFpbDogeyBjb250ZW50T2JqZWN0OiBfbmV3U291cmNlT2JqZWN0IH0sXHJcbiAgICB9KTtcclxuICAgIHByb2plY3RDb250YWluZXIuZGlzcGF0Y2hFdmVudChuZXdzb3VyY2VFdmVudCk7XHJcbiAgICBcclxuICAgIC8vIHVwZGF0ZSBwcm9qZWN0IGNoaWxkcmVuIHRhYmxlXHJcbiAgICBhZ2VfZGJpcy5Db250ZW50RWRnZV9TZWxlY3RDaGlsZE9mVXVpZChjdXJyZW50UHJvamVjdE9iamVjdC5VdWlkKVxyXG4gICAgICAgIC50aGVuKChjb250ZW50RWRnZXMpID0+IHtcclxuICAgICAgICAgICAgZG9tLnBvcHVsYXRlQ2hpbGRyZW5UYWJsZShwcm9qZWN0Q2hpbGRyZW5UYWJsZSwgY29udGVudEVkZ2VzKTtcclxuICAgICAgICB9KVxyXG4gICAgXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBoaWRlUHJvamVjdENvbnRleHRNZW51KGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBsZXQgZXZlbnRUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAvLyBjb25zb2xlLmxvZygnX15fXl9eX15fXl9eJywgZXZlbnRUYXJnZXQuaWQpO1xyXG5cclxuICAgIGxldCBpc0NvbnRleHRFbGVtZW50OiBib29sZWFuID0gZXZlbnRUYXJnZXQuaWQgPT09IFwiYWdlX21vcmVQcm9qZWN0T3B0aW9uc0NvbnRleHRNZW51XCIgfHwgZXZlbnRUYXJnZXQuaWQgPT09IFwiYWdlX3Byb2plY3RNb3JlT3B0aW9uc1wiO1xyXG4gICAgLy8gY29uc29sZS5sb2coJ2lzQ29udGV4dEVsZW1lbnQgPSAnLCBpc0NvbnRleHRFbGVtZW50KTtcclxuXHJcbiAgICBpZiAoIWlzQ29udGV4dEVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgb3B0aW9uc0NvbnRleHRNZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfbW9yZVByb2plY3RPcHRpb25zQ29udGV4dE1lbnVcIik7XHJcbiAgICAgICAgaWYgKG9wdGlvbnNDb250ZXh0TWVudSAhPT0gbnVsbClcclxuICAgICAgICAgICAgb3B0aW9uc0NvbnRleHRNZW51LmNsYXNzTGlzdC5hZGQoXCJhZ2VfZGlzcGxheU5vbmVcIilcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICogIE1haW4gY2xpY2sgaGFuZGxlciBpbiB0aGUgcHJvamVjdCBjb250YWluZXIuXHJcbiAqIFxyXG4gKiBAcGFyYW0gZXZlbnQgXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gcHJvamVjdENsaWNrKGV2ZW50OiBFdmVudCl7XHJcblxyXG4gICAgLy8gY29uc29sZS5sb2coXCJDbGljayBkZXRlY3RlZCBpbiBwcm9qZWN0IGNvbnRhaW5lci5cIik7XHJcbiAgICBsZXQgY2xpY2tUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XHJcbmNvbnNvbGUubG9nKFwiQ0xJQ0xDTElDTEtDSUNMQ0lDTFwiKVxyXG4gICAgXHJcbi8vIFNFQVJDSCBST1dcclxuICAgIGlmIChjbGlja1RhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJhZ2VfcHJvamVjdFJvd1NlYXJjaERhdGFcIikgfHwgY2xpY2tUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWdlX3Byb2plY3RTZWFyY2hSb3dcIikpe1xyXG4gICAgICAgIC8vIGdyYWIgcGFyZW50IGJlY2F1c2Ugd2UgY2xpY2tlZCBvbiBkYXRhLWVsZW1lbnRcclxuICAgICAgICBsZXQgdGFibGVSb3dUYXJnZXQgPSBjbGlja1RhcmdldC5wYXJlbnRFbGVtZW50IGFzIEhUTUxQcm9qZWN0VGFibGVSb3c7XHJcbiAgICAgICAgbG9hZFByb2plY3RXaXRoQ29udGVudE9iamVjdCh0YWJsZVJvd1RhcmdldC5ub2RlT2JqZWN0KTtcclxuICAgICAgICBzaG93UHJvamVjdENoaWxkcmVuKCk7XHJcbiAgICB9XHJcbi8vIFNFQVJDSC9DSElMRFJFTi9QUk9QRVJUSUVTIEJVVFRPTlxyXG4gICAgZWxzZSBpZiAoXHJcbiAgICAgICAgICAgY2xpY2tUYXJnZXQuaWQgPT0gXCJhZ2VfcHJvamVjdFNlYXJjaEJ1dHRvblwiIFxyXG4gICAgICAgIHx8IGNsaWNrVGFyZ2V0LmlkID09IFwiYWdlX3Byb2plY3RDaGlsZHJlbkJ1dHRvblwiIFxyXG4gICAgICAgIHx8IGNsaWNrVGFyZ2V0LmlkID09IFwiYWdlX3Byb2plY3RQcm9wZXJ0aWVzQnV0dG9uXCJcclxuICAgICl7XHJcbiAgICAgICAgLy8gcHJvamVjdFNlYXJjaEJ1dHRvbkNsaWNrZWQoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KTtcclxuICAgICAgICBzaG93UHJvamVjdFRhYmxlKGNsaWNrVGFyZ2V0LmlkKTtcclxuICAgIH1cclxuLy8gTU9SRSBPUFRJT05TIEJVVFRPTlxyXG4gICAgZWxzZSBpZiAoY2xpY2tUYXJnZXQuaWQgPT0gXCJhZ2VfcHJvamVjdE1vcmVPcHRpb25zXCIpIHtcclxuICAgICAgICAvLyBwcm9qZWN0TW9yZU9wdGlvbnNCdXR0b25DbGlja2VkKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCk7XHJcbiAgICAgICAgdG9nZ2xlTW9yZU9wdGlvbnMoKTtcclxuICAgIH1cclxuLy8gVElUTEVcclxuICAgIGVsc2UgaWYgKGNsaWNrVGFyZ2V0LmlkID09IFwiYWdlX3Byb2plY3RUaXRsZVwiKSB7XHJcbiAgICAgICAgLy8gVE9HR0xFIFByb2plY3Qvc291cmNlIGNvbnRhaW5lciBleHBhbnNpb25zL2NvbGxhcHNlXHJcbiAgICAgICAgbGV0IHByb2plY3RDb250YWluZXJFbGVtZW50IDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0Q29udGFpbmVyXCIpO1xyXG4gICAgICAgIHByb2plY3RDb250YWluZXJFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImNvbGxhcHNlZFwiKSA/IHByb2plY3RDb250YWluZXJFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xsYXBzZWRcIikgOiBwcm9qZWN0Q29udGFpbmVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiY29sbGFwc2VkXCIpO1xyXG4gICAgICAgIGxldCBzb3VyY2VDb250YWluZXJFbGVtZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3NvdXJjZUNvbnRhaW5lclwiKTtcclxuICAgICAgICBzb3VyY2VDb250YWluZXJFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImNvbGxhcHNlZFwiKSA/IHNvdXJjZUNvbnRhaW5lckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImNvbGxhcHNlZFwiKSA6IHNvdXJjZUNvbnRhaW5lckVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImNvbGxhcHNlZFwiKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZWxzZXtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnSWdub3JlZCBQcm9qZWN0IENsaWNrLicpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogIGxvYWRzIGFuIGV4aXN0aW5nIHByb2plY3QuIFVzdWFsbHkgZnJvbSBjbGlja2luZyBvbiBhIHByb2plY3QgZHVyaW5nIHNlYXJjaCBPUiBjcmVhdGluZyBhIG5ldyBwcm9qZWN0IG9iamVjdC5cclxuICovXHJcbmZ1bmN0aW9uIGxvYWRQcm9qZWN0V2l0aENvbnRlbnRPYmplY3QoX2NvbnRlbnRPYmplY3QgOiBhbnkpe1xyXG4gICAgLy8gU2V0IG1vZHVsZSB2YXJpYWJsZVxyXG4gICAgY3VycmVudFByb2plY3RPYmplY3QgPSBfY29udGVudE9iamVjdDtcclxuXHJcbiAgICAvLyBzZXQgdGl0bGVcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2VfcHJvamVjdFRpdGxlJykudGV4dENvbnRlbnQgPSBfY29udGVudE9iamVjdC5UaXRsZTtcclxuXHJcblxyXG4gICAgZG9tLnBvcHVsYXRlUHJvcGVydGllc1RhYmxlKHByb2plY3RQcm9wZXJ0aWVzVGFibGUsIF9jb250ZW50T2JqZWN0KTtcclxuICAgIC8vIHBvcHVsYXRlIHByb3BlcnRpZXMgdGFibGUgXHJcbiAgICBmZXRjaFByb2plY3RDaGlsZHJlbihfY29udGVudE9iamVjdC5VdWlkKVxyXG4gICAgICAgIC50aGVuKChjb250ZW50RWRnZU9iamVjdHMpID0+IHsgZG9tLnBvcHVsYXRlQ2hpbGRyZW5UYWJsZShwcm9qZWN0Q2hpbGRyZW5UYWJsZSwgcHJvamVjdENvbnRlbnRFZGdlQ2hpbGRyZW4pIH1cclxuICAgICk7XHJcbiAgICBcclxuICAgIC8vIHNob3dQcm9qZWN0Q2hpbGRyZW4oKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1Byb2plY3RDaGlsZHJlbigpe1xyXG4gICAgLy8gbW92ZSBmb2N1cyB0byB0aGUgY2hpbGRyZW4tdGFiXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0Q2hpbGRyZW5CdXR0b25cIikuY2xpY2soKVxyXG59XHJcbmZ1bmN0aW9uIHNob3dQcm9qZWN0UHJvcGVydGllcygpIHtcclxuICAgIC8vIG1vdmUgZm9jdXMgdG8gdGhlIGNoaWxkcmVuLXRhYlxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdFByb3BlcnRpZXNCdXR0b25cIikuY2xpY2soKVxyXG59XHJcblxyXG4vKiogICovXHJcbmZ1bmN0aW9uIHRvZ2dsZU1vcmVPcHRpb25zKCl7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcIlRPR0dMRSBNT1JFIE9QVElPTlNcIilcclxuICAgIGxldCBidXR0b25Cb3VuZGluZ1JlY3QgPSBwcm9qZWN0TW9yZU9wdGlvbnNCdXR0b24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBsZXQgYnRuTGVmdCA9IGJ1dHRvbkJvdW5kaW5nUmVjdC5sZWZ0O1xyXG4gICAgbGV0IGJ0blJpZ2h0ID0gYnV0dG9uQm91bmRpbmdSZWN0LnJpZ2h0O1xyXG4gICAgbGV0IGJ0bkJvdHRvbSA9IGJ1dHRvbkJvdW5kaW5nUmVjdC5ib3R0b207XHJcbiAgICBsZXQgYnRuWCA9IGJ1dHRvbkJvdW5kaW5nUmVjdC54O1xyXG5cclxuXHJcbiAgICBwcm9qZWN0TW9yZU9wdGlvbnNDb250ZXh0TWVudS5zdHlsZS50b3AgPSBidG5Cb3R0b20gKyA1ICsgXCJweFwiO1xyXG4gICAgaWYoc2lkZVBhbmVsSXNSaWdodCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJvamVjdE1vcmVPcHRpb25zQ29udGV4dE1lbnUuc3R5bGUubGVmdCA9IGJ0bkxlZnQgLSAxNzAgICsgXCJweFwiO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICBwcm9qZWN0TW9yZU9wdGlvbnNDb250ZXh0TWVudS5zdHlsZS5sZWZ0ID0gYnRuTGVmdCArIFwicHhcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcm9qZWN0TW9yZU9wdGlvbnNDb250ZXh0TWVudS5jbGFzc0xpc3QuY29udGFpbnMoXCJhZ2VfZGlzcGxheU5vbmVcIikgPyBwcm9qZWN0TW9yZU9wdGlvbnNDb250ZXh0TWVudS5jbGFzc0xpc3QucmVtb3ZlKFwiYWdlX2Rpc3BsYXlOb25lXCIpIDogcHJvamVjdE1vcmVPcHRpb25zQ29udGV4dE1lbnUuY2xhc3NMaXN0LmFkZChcImFnZV9kaXNwbGF5Tm9uZVwiKTtcclxufVxyXG5cclxuXHJcbi8qKiBDYWxsYmFjayB3aGVuIGVudGVyaW5nIHRoZSBjb250ZW50LWVkaXRhYmxlIHByb2plY3Qgc2VhcmNoIGlucHV0ICovXHJcbmZ1bmN0aW9uIHNlYXJjaFByb2plY3RJbigpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwic2VhcmNoUHJvamVjdEluKClcIilcclxuICAgIC8vIGZvY3VzUHJvamVjdFNlYXJjaCA9IHRydWU7XHJcbiAgICAvLyBleHRlbnNpb25TdGF0ZUZyb250LnByb2plY3RTZWFyY2hBY3RpdmUgPSB0cnVlO1xyXG4gICAgLy93cml0ZVN0YXRlRnJvbUZyb250KCk7XHJcbiAgICAvLyBjb25zb2xlLmxvZygncHJvamVjdFNlYXJjaEVsZW1lbnQudGV4dENvbnRlbnQgPSAnLCBwcm9qZWN0U2VhcmNoRWxlbWVudC50ZXh0Q29udGVudCk7XHJcbiAgICBcclxuICAgIC8vIEVtcHR5IHNlYXJjaCBjb250YWluZXIgaWYgbm8gcHJldmlvdXMgc2VhcmNoIHN0cmluZyBleGlzdHNcclxuICAgIGlmICghc2VhcmNoU3RyaW5nRXhpc3RzKSB7XHJcbiAgICAgICAgcHJvamVjdFNlYXJjaEVsZW1lbnQuaW5uZXJIVE1MID0gJzxkaXY+PGJyPjwvZGl2Pic7IC8vIGRlZmF1bHQgY29udGVudCBvbiAnY29udGVudGVkaXRhYmxlJyBlbGVtZW50cyBcclxuICAgICAgICAvLyBzZXRJbnRlcnZhbCgoKSA9PiB7IHNlYXJjaElucHV0LmlubmVySFRNTCArPSAnPGJyPicgfSwgNTApO1xyXG4gICAgfVxyXG4gICAgc2VhcmNoU3RyaW5nRXhpc3RzID0gdHJ1ZTtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdmb2N1cyBzZWFyY2ggJylcclxuICAgIC8vIHByb2plY3RTZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGtleVByZXNzRHVyaW5nU2VhcmNoKVxyXG4gICAgcHJvamVjdFNlYXJjaEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleURvd25EdXJpbmdTZWFyY2gpXHJcbiAgICAvLyBrZXlEb3duRHVyaW5nU2VhcmNoKCk7XHJcbn1cclxuXHJcblxyXG4vKiogQ2FsbGJhY2sgd2hlbiBsZWF2aW5nIHRoZSBjb250ZW50LWVkaXRhYmxlIHByb2plY3Qgc2VhcmNoIGlucHV0ICovXHJcbmZ1bmN0aW9uIHNlYXJjaFByb2plY3RPdXQoKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZygnc2VhcmNoUHJvamVjdE91dCgpJyk7XHJcbiAgICBcclxuICAgIGxldCBzZWFyY2hTdHJpbmdMZW5ndGggPSBwcm9qZWN0U2VhcmNoRWxlbWVudC50ZXh0Q29udGVudC5sZW5ndGg7XHJcbiAgICBpZihzZWFyY2hTdHJpbmdMZW5ndGggPT09IDApe1xyXG4gICAgICAgIHNlYXJjaFN0cmluZ0V4aXN0cyA9IGZhbHNlO1xyXG4gICAgICAgIHByb2plY3RTZWFyY2hFbGVtZW50LmlubmVySFRNTCA9ICc8ZGl2PlEgIDogIFNlYXJjaCAuIC4gLjxicj48L2Rpdj4nO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICBzZWFyY2hTdHJpbmdFeGlzdHMgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgcHJvamVjdFNlYXJjaEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleURvd25EdXJpbmdTZWFyY2gpXHJcbn1cclxuXHJcblxyXG4vKiogXHJcbiAqIFBlcmZvcm1zIHByb2plY3Qgc2VhcmNoIHdpdGggZGVsYXkgdG8gZ3VhcmFudGUgdGhhdCBzZWFyY2ggZmllbGQgaXMgdXBkYXRlZCBkdXJpbmcgYWN0dWFsIHNlYXJjaC5cclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIGtleURvd25EdXJpbmdTZWFyY2goZXZlbnQgOiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICBcclxuICAgIC8vIFVzZXIganVzdCBkZWxldGVkIHRoZSBsYXN0IGNoYXJhY3RlciBzbyB3ZSByZXNldCB0aGUgZGVmYXVsdCBjb250ZW50ZWRpdGFibGUgZWxtZW50IHN0cnVjdHVyZVxyXG4gICAgLy8gaWYgd2UgY29uJ3QgZG8gdGhpcyB0aGUgdXNlciB3aWxsIGluYWR2ZXJ0aWVkbHkgcmVtb3ZlIHRoZSBjb250YWluaW5nIDxkaXY+LCBicmVha2luZyB0aGUgdHlwaW5nLWJlaGF2aW91ciFcclxuICAgIGlmIChldmVudC5rZXkgPT09IFwiQmFja3NwYWNlXCIgJiYgcHJvamVjdFNlYXJjaEVsZW1lbnQudGV4dENvbnRlbnQubGVuZ3RoID09PSAxKXtcclxuICAgICAgICBjb25zb2xlLmxvZygnTGFzdCBjaGFyYWN0ZXIgZGVsZXRpb24gcHJvdGVjdGlvbiEnKTtcclxuICAgICAgICBwcm9qZWN0U2VhcmNoRWxlbWVudC5pbm5lckhUTUwgPSAnPGRpdj48YnI+PC9kaXY+JzsgLy8gZGVmYXVsdCBjb250ZW50IG9uICdjb250ZW50ZWRpdGFibGUnIGVsZW1lbnRzIFxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIFRoaXMgZG9lcyBub3QgcHJldmVudCBhIHJlcXVlc3Qgb24gZWFjaCBrZXlzdHJva2VcclxuICAgIC8vIEJVVCBpdCBlbmFibGVzIHJlYWRpbmcgdGhlIGNoYW5nZSBvZiBlYWNoIGtleXN0cm9rZS4gV2hlbiB0aGlzIG1ldGhvZCBpcyBjYWxsZWQgdGhlIHRleHRDb250ZW50IG9mIHRoZSBzZXJhY2ggYm94IGhhcyBub3QgYmVlbiB1cGRhdGVkISFcclxuICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xyXG5cclxuICAgICAgICBwZXJmb3JtU2VhcmNoKCk7XHJcblxyXG4gICAgfSwgMTAwKTtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuLyoqIFxyXG4gKiBQZXJmb3JtIGFuIEFQSSBmZXRjaCB1c2luZyB0aGUgY3VycmVudCBzZWFyY2ggc3RyaW5nLlxyXG4gKiBJZiB0aGUgJ3NlYXJjaFN0cmluZ0V4aXN0cyctYm9vbCBpcyBmYWxzZSwgYW4gZW1wdHkgc3RyaW5nIGlzIHVzZWQuXHJcbiAqL1xyXG5mdW5jdGlvbiBwZXJmb3JtU2VhcmNoKCl7XHJcbiAgICBsZXQgc2VhcmNoU3RyaW5nIDogc3RyaW5nID0gXCJcIjtcclxuICAgIGlmKHNlYXJjaFN0cmluZ0V4aXN0cylcclxuICAgICAgICBzZWFyY2hTdHJpbmcgPSBwcm9qZWN0U2VhcmNoRWxlbWVudC50ZXh0Q29udGVudDtcclxuICAgIGVsc2VcclxuICAgICAgICBzZWFyY2hTdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIC8vIEZldGNoIGFuZCBwb3B1bGF0ZVxyXG4gICAgZmV0Y2hQcm9qZWN0U2VhcmNoKHNlYXJjaFN0cmluZylcclxuICAgICAgICAudGhlbigoY29udGVudE9iamVjdEFycmF5KSA9PiB7XHJcbiAgICAgICAgICAgIGRvbS5wb3B1bGF0ZVByb2plY3RTZWFyY2hUYWJsZShwcm9qZWN0U2VhcmNoVGFibGUsIGNvbnRlbnRPYmplY3RBcnJheSk7XHJcbiAgICAgICAgfSlcclxufVxyXG5cclxuXHJcblxyXG4vKiogXHJcbiAqICBQYXNzIHRoZSBpZCBvZiBvbmUgb2YgdGhlIHJlZ3VsYXIgcHJvamVjdCBidXR0b25zLlxyXG4gKiAgVGhlIHBhbmVsLXRhYmxlIG9mIHRoZSBjb3JyZXNwb25kaW5nIHdpbGwgYmUgZGlzcGxheWQgYW5kIHRoZSBvdGhlciB3aWxsIGJlIGhpZGRlbi5cclxuICovXHJcbmZ1bmN0aW9uIHNob3dQcm9qZWN0VGFibGUoYnV0dG9uSWQgOiBzdHJpbmcpe1xyXG4gICAgLy8gYWdlX3Byb2plY3RCdXR0b25PblxyXG5cclxuICAgIC8vIFNlYXJjaCBib3ggXHJcbiAgICBsZXQgc2VhcmNoQm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdFNlYXJjaElucHV0XCIpO1xyXG4gICAgc2VhcmNoQm94LmNsYXNzTGlzdC5hZGQoXCJhZ2VfZGlzcGxheU5vbmVcIik7XHJcblxyXG4gICAgLy8gUmVzZXQgdGhlIGJ1dHRvbnNcclxuICAgIGxldCBzZWFyY2hCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0U2VhcmNoQnV0dG9uXCIpXHJcbiAgICBsZXQgY2hpbGRyZW5CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0Q2hpbGRyZW5CdXR0b25cIilcclxuICAgIGxldCBwcm9wZXJ0aWVzQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdFByb3BlcnRpZXNCdXR0b25cIilcclxuICAgIHNlYXJjaEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWdlX3Byb2plY3RCdXR0b25PblwiKTtcclxuICAgIGNoaWxkcmVuQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhZ2VfcHJvamVjdEJ1dHRvbk9uXCIpO1xyXG4gICAgcHJvcGVydGllc0J1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWdlX3Byb2plY3RCdXR0b25PblwiKTtcclxuXHJcbiAgICAvLyBSZXNldCB0aGUgVGFibGVzXHJcbiAgICBsZXQgc2VhcmNoVGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0U2VhcmNoVGFibGVcIik7XHJcbiAgICBsZXQgY2hpbGRyZW5UYWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3Byb2plY3RDaGlsZHJlblRhYmxlXCIpO1xyXG4gICAgbGV0IHByb3BlcnRpZXNUYWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3Byb2plY3RQcm9wZXJ0aWVzVGFibGVcIik7XHJcbiAgICBzZWFyY2hUYWJsZS5jbGFzc0xpc3QuYWRkKFwiYWdlX2Rpc3BsYXlOb25lXCIpO1xyXG4gICAgY2hpbGRyZW5UYWJsZS5jbGFzc0xpc3QuYWRkKFwiYWdlX2Rpc3BsYXlOb25lXCIpO1xyXG4gICAgcHJvcGVydGllc1RhYmxlLmNsYXNzTGlzdC5hZGQoXCJhZ2VfZGlzcGxheU5vbmVcIik7XHJcblxyXG4gICAgLy8gQWN0aXZlIHRoZSBjb3JyZWN0IG9uZVxyXG4gICAgaWYgKGJ1dHRvbklkID09PSBcImFnZV9wcm9qZWN0U2VhcmNoQnV0dG9uXCIpe1xyXG4gICAgICAgIHNlYXJjaFRhYmxlLmNsYXNzTGlzdC5yZW1vdmUoXCJhZ2VfZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgc2VhcmNoQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJhZ2VfcHJvamVjdEJ1dHRvbk9uXCIpO1xyXG4gICAgICAgIHNlYXJjaEJveC5jbGFzc0xpc3QucmVtb3ZlKFwiYWdlX2Rpc3BsYXlOb25lXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoYnV0dG9uSWQgPT09IFwiYWdlX3Byb2plY3RDaGlsZHJlbkJ1dHRvblwiKXtcclxuICAgICAgICBjaGlsZHJlblRhYmxlLmNsYXNzTGlzdC5yZW1vdmUoXCJhZ2VfZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgY2hpbGRyZW5CdXR0b24uY2xhc3NMaXN0LmFkZChcImFnZV9wcm9qZWN0QnV0dG9uT25cIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChidXR0b25JZCA9PT0gXCJhZ2VfcHJvamVjdFByb3BlcnRpZXNCdXR0b25cIil7XHJcbiAgICAgICAgcHJvcGVydGllc1RhYmxlLmNsYXNzTGlzdC5yZW1vdmUoXCJhZ2VfZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgcHJvcGVydGllc0J1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWdlX3Byb2plY3RCdXR0b25PblwiKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcblxyXG5cclxuXHJcbi8qKiBTZWxlY3RzIGZpcnN0IDUwIHByb2plY3RzIGZyb20gQVBJLiBSZXR1cm5zIGFycmF5IG9mIHByb2plY3Qgb2JqZWN0cy4gKi9cclxuZnVuY3Rpb24gZmV0Y2hQcm9qZWN0U2VhcmNoKHNlYXJjaFN0cmluZyA6IHN0cmluZykgOiBQcm9taXNlPGFueT57XHJcbiAgICByZXR1cm4gYWdlX2RiaXMuQ29udGVudF9TZWxlY3RPblRpdGxlTGlrZVN0cmluZyhzZWFyY2hTdHJpbmcsIFwiNTBcIiwgXCJQcm9qZWN0XCIsIFwiXCIsIFwiXCIpXHJcbiAgICAgICAgLnRoZW4oKGNvbnRlbnRPYmplY3RBcnJheTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNvbnRlbnRPYmplY3RBcnJheSk7XHJcbiAgICAgICAgICAgIHByb2plY3RTZWFyY2hPYmplY3RzID0gY29udGVudE9iamVjdEFycmF5O1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNvbnRlbnRPYmplY3RBcnJheSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGVycm9yIDogRXJyb3IpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XHJcbiAgICAgICAgfSlcclxufVxyXG5cclxuLyoqIFJldHVybnMgYXJyYXkgb2YgY2hpbGRyZW4gZmV0Y2hlZCBmcm9tIHRoZSBBUEkuICovXHJcbmZ1bmN0aW9uIGZldGNoUHJvamVjdENoaWxkcmVuKFV1aWQgOiBzdHJpbmcgfCBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgcmV0dXJuIGFnZV9kYmlzLkNvbnRlbnRFZGdlX1NlbGVjdENoaWxkT2ZVdWlkKFV1aWQpXHJcbiAgICAgICAgLnRoZW4oKGNvbnRlbnRFZGdlT2JqZWN0QXJyYXk6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjb250ZW50T2JqZWN0QXJyYXkpO1xyXG4gICAgICAgICAgICBwcm9qZWN0Q29udGVudEVkZ2VDaGlsZHJlbiA9IGNvbnRlbnRFZGdlT2JqZWN0QXJyYXk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdwcm9qZWN0Q29udGVudEVkZ2VDaGlsZHJlbiA9ICcsIHByb2plY3RDb250ZW50RWRnZUNoaWxkcmVuKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocHJvamVjdENvbnRlbnRFZGdlQ2hpbGRyZW4pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcjogRXJyb3IpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XHJcbiAgICAgICAgfSlcclxufVxyXG5cclxuLyoqIEFwcGVuZCB0aGUgcHJvamVjdCBzdHlsZSBlbG1lbnRzIHRvIHRoZSBoZWFkIG9mIHBhZ2UgKi9cclxuZnVuY3Rpb24gYXBwZW5kQ3NzKCkgOiB2b2lke1xyXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmQocHJvamVjdENzcyk7XHJcbn1cclxuXHJcbi8qKiBSZW1vdmUgdGhlIHByb2plY3Qgc3R5bGUgZWxtZW50cyB0byB0aGUgaGVhZCBvZiBwYWdlICovXHJcbmZ1bmN0aW9uIHJlbW92ZUNzcygpIDogdm9pZCB7XHJcbiAgICBwcm9qZWN0Q3NzLnJlbW92ZSgpO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQge1xyXG4gICAgaW5pdFByb2plY3RzLFxyXG4gICAgYXBwZW5kQ3NzLFxyXG4gICAgcmVtb3ZlQ3NzLFxyXG4gICAgcGVyZm9ybVNlYXJjaCxcclxufSIsIi8vIGltcG9ydCAqIGFzIHNkb20gZnJvbSBcIi4vc291cmNlX2RvbVwiO1xyXG5cclxuaW1wb3J0ICogYXMgZmV0Y2hlciBmcm9tIFwiLi4vZmV0Y2hlclwiO1xyXG5pbXBvcnQgeyBhZ2VfZGJpcyB9IGZyb20gXCIuLi9kYmktc2VuZFwiO1xyXG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gXCIuLi91dGlsXCI7XHJcblxyXG5cclxubGV0IHNpZGVQYW5lbDogRWxlbWVudDtcclxuXHJcbmxldCBzb3VyY2VUaXRsZUVsZW1lbnQgOiBIVE1MRWxlbWVudDtcclxuXHJcbmxldCBzb3VyY2VDaGlsZHJlbkJ1dHRvbiA6IEhUTUxFbGVtZW50O1xyXG5sZXQgc291cmNlUHJvcGVydGllc0J1dHRvbiA6IEhUTUxFbGVtZW50O1xyXG5cclxubGV0IHNvdXJjZUNvbnRhaW5lcjogRWxlbWVudDtcclxubGV0IHNvdXJjZUNzczogSFRNTEVsZW1lbnQ7XHJcblxyXG5sZXQgc291cmNlQ2hpbGRyZW5UYWJsZTogSFRNTFRhYmxlRWxlbWVudDsgXHJcbmxldCBwcm9qZWN0Q29udGVudEVkZ2VDaGlsZHJlbjogYW55O1xyXG5cclxubGV0IHNvdXJjZVByb3BlcnRpZXNUYWJsZTogQ29udGVudE9iamVjdEhUTUw7XHJcblxyXG4gXHJcbmxldCBjdXJyZW50U291cmNlT2JqZWN0OiBhbnk7XHJcbmxldCBjdXJyZW50U291cmNlVXVpZDogYW55OyBcclxuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRTb3VyY2VPYmplY3QoKTogYW55IHsgcmV0dXJuIHNvdXJjZVByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0fTtcclxuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRTb3VyY2VVdWlkKCk6IGFueSB7IHJldHVybiBjdXJyZW50U291cmNlVXVpZCB9O1xyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0U291cmNlQ29udGFpbmVyKF9zaWRlUGFuZWw6IEVsZW1lbnQsIF9zb3VyY2VNb3JlT3B0aW9uc0NvbnRleHRNZW51OiBIVE1MRGl2RWxlbWVudCk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2coJ2luaXRTb3VyY2VDb250YWluZXIoLi4uKScpO1xyXG5cclxuICAgIHNpZGVQYW5lbCA9IF9zaWRlUGFuZWw7XHJcblxyXG4gICAgc291cmNlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBzb3VyY2VDb250YWluZXIuaWQgPSBcImFnZV9zb3VyY2VDb250YWluZXJcIjtcclxuICAgIHNvdXJjZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYWdlX3BhbmVsQ29udGFpbmVyXCIsIFwiY29sbGFwc2VkXCIpO1xyXG4gICAgc291cmNlQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja2VkU291cmNlQ29udGFpbmVyKTtcclxuICAgIC8vIHNvdXJjZUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgc291cmNlUHJvcGVydHlGb2N1c2VkT3V0KTtcclxuICAgIHNvdXJjZUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgZm9jdXNvdXRTb3VyY2VDb250ZW50RWRpdGFibGUpO1xyXG4gICAgXHJcblxyXG4gICAgZmV0Y2hlci5mZXRjaEh0bWwoXCJzb3VyY2UuaHRtbFwiKVxyXG4gICAgICAgIC50aGVuKGh0bWwgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkhUTUwgOiBcIiwgaHRtbClcclxuICAgICAgICAgICAgc291cmNlQ29udGFpbmVyLmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICAgICAgICAgIHNvdXJjZVRpdGxlRWxlbWVudCA9IHNvdXJjZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiI2FnZV9zb3VyY2VUaXRsZVwiKTtcclxuICAgICAgICAgICAgc291cmNlQ2hpbGRyZW5UYWJsZSA9IHNvdXJjZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiI2FnZV9zb3VyY2VDaGlsZFRhYmxlXCIpO1xyXG4gICAgICAgICAgICBzb3VyY2VQcm9wZXJ0aWVzVGFibGUgPSBzb3VyY2VDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2Vfc291cmNlUHJvcGVydGllc1RhYmxlXCIpO1xyXG5cclxuICAgICAgICAgICAgc291cmNlQ2hpbGRyZW5CdXR0b24gPSBzb3VyY2VDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2Vfc291cmNlU2VhcmNoQnV0dG9uXCIpO1xyXG4gICAgICAgICAgICBzb3VyY2VQcm9wZXJ0aWVzQnV0dG9uID0gc291cmNlQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX3NvdXJjZVByb3BlcnRpZXNCdXR0b25cIik7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICBzb3VyY2VDc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcbiAgICBzb3VyY2VDc3MuaWQgPSBcImFnZV9zb3VyY2VTdHlsZVwiO1xyXG4gICAgZmV0Y2hlci5mZXRjaENzcyhcInNvdXJjZS5jc3NcIilcclxuICAgICAgICAudGhlbihjc3MgPT4ge1xyXG4gICAgICAgICAgICBzb3VyY2VDc3MuaW5uZXJUZXh0ID0gY3NzO1xyXG4gICAgICAgIH0pXHJcblxyXG5cclxuICAgIHNpZGVQYW5lbC5hcHBlbmQoc291cmNlQ29udGFpbmVyKTtcclxuXHJcbn1cclxuXHJcbi8qKiBHZW5lcmljIGZvY3Vzb3V0LWV2ZW50cyBmcm9tIGNvbnRlbnQtZWRpdGFibGUgZmllbGRzIHRoYXQgYXJlIGNhcHR1cmVkIGJ5IHRoZSBzb3VyY2UgY29udGFpbmVyLlxyXG4gKiAgUmVkaXJlY3RzIHRvIHNwZWNpZmljIGZ1bmN0aW9uIGRlcGVuZGluZyBvbiBpZiBpdHMgYSBzb3VyY2Utc2hhcmQgb3IgYSBwcm9wZXJ0eSB2YWx1ZVxyXG4gKi9cclxuZnVuY3Rpb24gZm9jdXNvdXRTb3VyY2VDb250ZW50RWRpdGFibGUoZXZlbnQgOiBGb2N1c0V2ZW50KXtcclxuICAgIGxldCBmb2N1c291dFRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuICAgIGlmIChmb2N1c291dFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJUaXRsZVwiKSl7XHJcbiAgICAgICAgZm9jdXNvdXRTb3VyY2VDaGlsZFRpdGxlKGZvY3Vzb3V0VGFyZ2V0KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGZvY3Vzb3V0VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImFnZV9zb3VyY2VQcm9wVmFsdWVcIikpe1xyXG4gICAgICAgIGZvY3Vzb3V0U291cmNlUHJvcGVydHkoZm9jdXNvdXRUYXJnZXQpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLyoqIEdyYWJzIHRoZSB0ZXh0Q29udGVudCBvZiB0YXJnZXRlZCBlbGVtZW50IGFuZCB1cGRhdGVzIHRoZSBhc3NvY2lhdGVkIGNvbnRlbnRPYmplY3QgdXNpbmcgQVBJICovXHJcbmZ1bmN0aW9uIGZvY3Vzb3V0U291cmNlQ2hpbGRUaXRsZShkYXRhRWxlbWVudCA6IEhUTUxFbGVtZW50KSB7XHJcbiAgICBsZXQgc291cmNlQ2hpbGRSb3cgPSBkYXRhRWxlbWVudC5wYXJlbnRFbGVtZW50IGFzIENvbnRlbnRPYmplY3RIVE1MO1xyXG4gICAgXHJcbiAgICBzb3VyY2VDaGlsZFJvdy5jb250ZW50T2JqZWN0LmNvbnRlbnQuVGl0bGUgPSBkYXRhRWxlbWVudC50ZXh0Q29udGVudDtcclxuXHJcbiAgICB1dGlsLlV1aWRDaGVja0FuZFVwZGF0ZVRpdGxlcyhzb3VyY2VDaGlsZFJvdy5jb250ZW50T2JqZWN0LmNvbnRlbnQuVXVpZCwgZGF0YUVsZW1lbnQudGV4dENvbnRlbnQpOyAvLyBVcGRhdGUgdGl0bGVzIGluIGN1cnJlbnRseSBsb2FkZWQgZXh0ZW5zaW9uXHJcblxyXG4gICAgYWdlX2RiaXMuQ29udGVudF9VcGRhdGVXaXRoQ29udGVudE9iamVjdChzb3VyY2VDaGlsZFJvdy5jb250ZW50T2JqZWN0LmNvbnRlbnQpXHJcbiAgICAgICAgLnRoZW4odXBkYXRlZENvbnRlbnRPYmplY3QgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlVwZGF0ZWQgc291cmNlIGNoaWxkLXJvdyA6IFwiLCB1cGRhdGVkQ29udGVudE9iamVjdClcclxuICAgICAgICB9KVxyXG5cclxufVxyXG5cclxuLyoqIFVwZGF0ZXMgdGhlIGNvcmVzcG9uZGluZyBjb250ZW50T2JqZWN0LCBzZW5kcyBpdCB0byBkYXRhYmFzZSwgYW5kIGFzc2VydHMgdGhlIHJldHVybmVkIGNvbnRlbnQgb2JqZWN0cyAqL1xyXG5mdW5jdGlvbiBmb2N1c291dFNvdXJjZVByb3BlcnR5KGZvY3Vzb3V0RWxlbWVudDogSFRNTEVsZW1lbnQpe1xyXG5cclxuICAgIC8vIGNvbnNvbGUubG9nKCcnLCBldmVudC50YXJnZXQuKVxyXG4gICAgc3dpdGNoIChmb2N1c291dEVsZW1lbnQuaWQpIHtcclxuICAgICAgICAvLyBUWVBFXHJcbiAgICAgICAgY2FzZSBcImFnZV9zb3VyY2VQcm9wVGFibGUtVHlwZS12YWx1ZVwiOlxyXG4gICAgICAgICAgICBzb3VyY2VQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdC5UeXBlID0gZm9jdXNvdXRFbGVtZW50LnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAvLyBUSVRMRVxyXG4gICAgICAgIGNhc2UgXCJhZ2Vfc291cmNlUHJvcFRhYmxlLVRpdGxlLXZhbHVlXCI6XHJcbiAgICAgICAgICAgIHNvdXJjZVByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0LlRpdGxlID0gZm9jdXNvdXRFbGVtZW50LnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICBzb3VyY2VUaXRsZUVsZW1lbnQudGV4dENvbnRlbnQgPSBmb2N1c291dEVsZW1lbnQudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgIHV0aWwuVXVpZENoZWNrQW5kVXBkYXRlVGl0bGVzKGN1cnJlbnRTb3VyY2VPYmplY3QuVXVpZCwgZm9jdXNvdXRFbGVtZW50LnRleHRDb250ZW50KTsgLy8gVXBkYXRlIHRpdGxlcyBpbiBjdXJyZW50bHkgbG9hZGVkIGV4dGVuc2lvblxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAvLyBHT0FMXHJcbiAgICAgICAgY2FzZSBcImFnZV9zb3VyY2VQcm9wVGFibGUtVXJsLXZhbHVlXCI6XHJcbiAgICAgICAgICAgIHNvdXJjZVByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0LlVybCA9IGZvY3Vzb3V0RWxlbWVudC50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGFnZV9kYmlzLkNvbnRlbnRfVXBkYXRlV2l0aENvbnRlbnRPYmplY3Qoc291cmNlUHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QpXHJcbiAgICAgICAgLnRoZW4odXBkYXRlZENvbnRlbnRPYmplY3QgPT4ge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGZvY3Vzb3V0RWxlbWVudC5pZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gVFlQRVxyXG4gICAgICAgICAgICAgICAgY2FzZSBcImFnZV9zb3VyY2VQcm9wVGFibGUtVHlwZS12YWx1ZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuYXNzZXJ0KHVwZGF0ZWRDb250ZW50T2JqZWN0LlR5cGUgPT0gc291cmNlUHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QuVHlwZSwgXCInUFVUJyBjb250ZW50IE9iamVjdCBUeXBlIGRvZXMgbm90IG1hdGNoIHRoZSBwcm9qZWN0IHRhYmxlIC5jb250ZW50T2JqZWN0LlR5cGUgIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIC8vIFRJVExFXHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiYWdlX3NvdXJjZVByb3BUYWJsZS1UaXRsZS12YWx1ZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuYXNzZXJ0KHVwZGF0ZWRDb250ZW50T2JqZWN0LlRpdGxlID09IHNvdXJjZVByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0LlRpdGxlLCBcIidQVVQnIGNvbnRlbnQgT2JqZWN0IFRpdGxlIGRvZXMgbm90IG1hdGNoIHRoZSBwcm9qZWN0IHRhYmxlIC5jb250ZW50T2JqZWN0LlRpdGxlICFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAvLyBHT0FMXHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiYWdlX3NvdXJjZVByb3BUYWJsZS1VcmwtdmFsdWVcIjpcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmFzc2VydCh1cGRhdGVkQ29udGVudE9iamVjdC5VcmwgPT0gc291cmNlUHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QuVXJsLCBcIidQVVQnIGNvbnRlbnQgT2JqZWN0IEdvYWwgZG9lcyBub3QgbWF0Y2ggdGhlIHByb2plY3QgdGFibGUgLmNvbnRlbnRPYmplY3QuR29hbCAhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAvLyBsZXQgcHJvamVjdENvbnRlbnRPYmplY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0UHJvcGVydGllc1RhYmxlXCIpIGFzIEhUTUxUYWJsZUNvbnRlbnRPYmplY3Q7XHJcblxyXG4gICAgY3VycmVudFNvdXJjZU9iamVjdCA9IHNvdXJjZVByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0O1xyXG5cclxuXHJcbiAgICBcclxufVxyXG5cclxuLyoqIENhcHR1cmVzIHRoZSBjb250YWluZXItY2xpY2tzLiBDdXJyZW50IHJlc3BvbnNhYmlsaXRpZXM6XHJcbiAqICAxLiBUb2dnbGUgYmV0d2VlbiB0aGUgdHdvIHNvdXJjZSB0YWJsZXMuXHJcbiAqL1xyXG5mdW5jdGlvbiBjbGlja2VkU291cmNlQ29udGFpbmVyKGV2ZW50IDogTW91c2VFdmVudCl7XHJcbiAgICBsZXQgZXZlbnRUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgaWYgKGV2ZW50VGFyZ2V0LmlkID09PSBcImFnZV9zb3VyY2VTZWFyY2hCdXR0b25cIiB8fCBldmVudFRhcmdldC5pZCA9PT0gXCJhZ2Vfc291cmNlUHJvcGVydGllc0J1dHRvblwiKXtcclxuICAgICAgICBkaXNwbGF5U291cmNlVGFibGUoZXZlbnRUYXJnZXQuaWQpO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzaG93U291cmNlQ2hpbGRyZW4oKSB7XHJcbiAgICBzb3VyY2VDaGlsZHJlbkJ1dHRvbi5jbGljaygpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzaG93U291cmNlUHJvcGVydGllcygpe1xyXG4gICAgc291cmNlUHJvcGVydGllc0J1dHRvbi5jbGljaygpO1xyXG59XHJcblxyXG4vKiogV2lsbCBsb2FkIHRoZSB0YWJsZSBhbmQgdXBkYXRlIHRoZSBidXR0b24gZm9yIHRoZSBjb3JyZXNwb25kaW5nIGJ1dHRvbi1pZCBwcm92aWRlZCAqL1xyXG5mdW5jdGlvbiBkaXNwbGF5U291cmNlVGFibGUoYnV0dG9uSUQgOiBzdHJpbmcpe1xyXG4gICAgbGV0IGNoaWxkcmVuQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2Vfc291cmNlU2VhcmNoQnV0dG9uXCIpO1xyXG4gICAgbGV0IHByb3BlcnRpZXNCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9zb3VyY2VQcm9wZXJ0aWVzQnV0dG9uXCIpO1xyXG5cclxuICAgIHNvdXJjZUNoaWxkcmVuVGFibGUuY2xhc3NMaXN0LmFkZChcImFnZV9kaXNwbGF5Tm9uZVwiKTtcclxuICAgIHNvdXJjZVByb3BlcnRpZXNUYWJsZS5jbGFzc0xpc3QuYWRkKFwiYWdlX2Rpc3BsYXlOb25lXCIpO1xyXG4gICAgY2hpbGRyZW5CdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFnZV9zb3VyY2VCdXR0b25PblwiKTtcclxuICAgIHByb3BlcnRpZXNCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFnZV9zb3VyY2VCdXR0b25PblwiKTtcclxuICAgIFxyXG4gICAgaWYgKGJ1dHRvbklEID09IFwiYWdlX3NvdXJjZVNlYXJjaEJ1dHRvblwiKXtcclxuICAgICAgICBzb3VyY2VDaGlsZHJlblRhYmxlLmNsYXNzTGlzdC5yZW1vdmUoXCJhZ2VfZGlzcGxheU5vbmVcIik7XHJcbiAgICAgICAgY2hpbGRyZW5CdXR0b24uY2xhc3NMaXN0LmFkZChcImFnZV9zb3VyY2VCdXR0b25PblwiKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGJ1dHRvbklEID09IFwiYWdlX3NvdXJjZVByb3BlcnRpZXNCdXR0b25cIikge1xyXG4gICAgICAgIHNvdXJjZVByb3BlcnRpZXNUYWJsZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWdlX2Rpc3BsYXlOb25lXCIpO1xyXG4gICAgICAgIHByb3BlcnRpZXNCdXR0b24uY2xhc3NMaXN0LmFkZChcImFnZV9zb3VyY2VCdXR0b25PblwiKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZFdpdGhDb250ZW50T2JqZWN0KF9jb250ZW50T2JqZWN0IDogYW55KXtcclxuICAgIGNvbnNvbGUubG9nKCdsb2FkaW5nIFNvdXJjZSBwYW5lbCB3aXRoICcsIF9jb250ZW50T2JqZWN0KTtcclxuXHJcbiAgICBjdXJyZW50U291cmNlT2JqZWN0ID0gX2NvbnRlbnRPYmplY3Q7XHJcblxyXG4gICAgLy8gbGV0IHNvdXJjZU9iamVjdCA9IGV4dGVuc2lvblN0YXRlRnJvbnQuY3VycmVudF9zb3VyY2VPYmplY3Q7XHJcbiAgICAvLyBleHRlbnNpb25TdGF0ZUZyb250LmN1cnJlbnRfc291cmNlVXVpZCA9IHNvdXJjZU9iamVjdC5VdWlkO1xyXG4gICAgc291cmNlUHJvcGVydGllc1RhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCBzb3VyY2VQcm9wZXJ0eUZvY3VzT3V0KVxyXG4gICAgc291cmNlUHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QgPSBfY29udGVudE9iamVjdDtcclxuIFxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FnZV9zb3VyY2VUaXRsZScpLnRleHRDb250ZW50ID0gX2NvbnRlbnRPYmplY3QuVGl0bGU7XHJcblxyXG4gICAgbGV0IHRib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FnZV9zb3VyY2VQcm9wZXJ0aWVzVGFibGUtdGJvZHknKTtcclxuICAgIHRib2R5LmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgIGZvciAoY29uc3Qga2V5IGluIF9jb250ZW50T2JqZWN0KSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYCR7a2V5fTogJHtzb3VyY2VPYmplY3Rba2V5XX1gKTtcclxuICAgICAgICBpZiAoa2V5ID09PSAnVHlwZScgfHwga2V5ID09PSAnVGl0bGUnIHx8IGtleSA9PT0gJ1VybCcgfHwga2V5ID09PSAnSUFtU291cmNlJykge1xyXG5cclxuICAgICAgICAgICAgdGJvZHkuaW5uZXJIVE1MICs9IGBcclxuXHRcdFxyXG5cdFx0XHQ8dHI+XHJcblx0XHRcdFx0PHRkIGlkPWFnZV9zb3VyY2VQcm9wVGFibGUtJHtrZXl9LWtleSBjbGFzcz1cImFnZV9lbGVtZW50XCIgPiR7a2V5fTwvdGQ+XHJcblx0XHRcdFx0PHRkIGlkPWFnZV9zb3VyY2VQcm9wVGFibGUtJHtrZXl9LXZhbHVlIGNsYXNzPVwiYWdlX3NvdXJjZVByb3BWYWx1ZSBhZ2VfZWxlbWVudFwiIGNvbnRlbnRlZGl0YWJsZT1cInRydWVcIiA+JHtfY29udGVudE9iamVjdFtrZXldfTwvdGQ+XHJcblx0XHRcdDwvdHI+XHJcblx0XHRcclxuXHRcdGA7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGJvZHkuaW5uZXJIVE1MICs9IGBcclxuXHRcdFxyXG5cdFx0XHQ8dHI+XHJcblx0XHRcdFx0PHRkIGlkPWFnZV9zb3VyY2VQcm9wVGFibGUtJHtrZXl9LWtleSBjbGFzcz1cImFnZV9lbGVtZW50XCIgPiR7a2V5fTwvdGQ+XHJcblx0XHRcdFx0PHRkIGlkPWFnZV9zb3VyY2VQcm9wVGFibGUtJHtrZXl9LXZhbHVlIGNsYXNzPVwiYWdlX3NvdXJjZVByb3BWYWx1ZSBhZ2VfZWxlbWVudFwiPiR7X2NvbnRlbnRPYmplY3Rba2V5XX08L3RkPlxyXG5cdFx0XHQ8L3RyPlxyXG5cdFx0XHJcblx0XHRgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIFNldCBwcm9wZXJ0eSByb3dzIHRvIGJlIHRhYmJhYmxlXHJcbiAgICBsZXQgcHJvcGVydHlSb3dzID0gdGJvZHkuY2hpbGRyZW47XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnR5Um93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBwcm9wZXJ0eVJvdyA9IHByb3BlcnR5Um93c1tpXSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBwcm9wZXJ0eVJvdy50YWJJbmRleCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLy8gY29uc29sZS5sb2coZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2FnZV9zb3VyY2VQcm9wZXJ0aWVzVGFibGUgdGJvZHkgdHInKSlcclxuICAgIC8vIGxldCBlZGl0YWJsZVNvdXJjZVByb3BlcnR5VGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFnZV9lZGl0YWJsZVNvdXJjZVByb3BlcnR5Jyk7XHJcbiAgICAvLyAvLyAvLyBjb25zb2xlLmxvZyhlZGl0YWJsZVNvdXJjZVByb3BlcnR5VGQpXHJcbiAgICAvLyBmb3IgKGxldCBlZGl0YWJsZVNvdXJjZVByb3BlcnR5VGQgb2YgZWRpdGFibGVTb3VyY2VQcm9wZXJ0eVRkcykge1xyXG4gICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKGVkaXRhYmxlU291cmNlUHJvcGVydHlUZC50ZXh0Q29udGVudCk7XHJcbiAgICAvLyAgICAgLy8gY29uc29sZS5sb2cocHJvcGVydHlSb3cudGV4dENvbnRlbnQubGVuZ3RoKVxyXG4gICAgLy8gICAgIC8vIGVkaXRhYmxlU291cmNlUHJvcGVydHlUZC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHJlYWRTb3VyY2VQcm9wZXJ0aWVzRnJvbURvbUFuZFdyaXRlUHV0KVxyXG4gICAgLy8gICAgIGVkaXRhYmxlU291cmNlUHJvcGVydHlUZC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIGVkaXRhYmxlU291cmNlUHJvcGVydHlGb2N1c091dClcclxuXHJcbiAgICAvLyB9XHJcblxyXG4gICAgYXdhaXQgbG9hZFNvdXJjZUNoaWxkcmVuKF9jb250ZW50T2JqZWN0KTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbG9hZFNvdXJjZUNoaWxkcmVuKF9jb250ZW50T2JqZWN0IDogYW55KXtcclxuXHJcbiAgICBsZXQgY2hpbGRDb250ZW50RWRnZU9iamVjdHMgPSBhd2FpdCBhZ2VfZGJpcy5Db250ZW50RWRnZV9TZWxlY3RDaGlsZE9mVXVpZChfY29udGVudE9iamVjdC5VdWlkKTtcclxuXHJcblxyXG5cclxuICAgIGxldCB0Ym9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2Vfc291cmNlQ2hpbGRUYWJsZS10Ym9keScpO1xyXG4gICAgdGJvZHkuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgZm9yIChsZXQgY2hpbGRDb250ZW50RWRnZU9iamVjdCBvZiBjaGlsZENvbnRlbnRFZGdlT2JqZWN0cykge1xyXG4gICAgICAgIGxldCB0YWJsZVJvd0h0bWwgPSBgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImFnZV9lbGVtZW50IGFnZV9zb3VyY2VDaGlsZFRhYmxlIFRhYmxlXCIgZGF0YS1VdWlkPVwiJHtjaGlsZENvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnQuVXVpZH1cIj4ke2NoaWxkQ29udGVudEVkZ2VPYmplY3QuY29udGVudC5UYWJsZX08L3RkPlxyXG5cdFx0XHRcdDx0ZCBjbGFzcz1cImFnZV9lbGVtZW50IGFnZV9zb3VyY2VDaGlsZFRhYmxlIFR5cGVcIiBkYXRhLVV1aWQ9XCIke2NoaWxkQ29udGVudEVkZ2VPYmplY3QuY29udGVudC5VdWlkfVwiPiR7Y2hpbGRDb250ZW50RWRnZU9iamVjdC5jb250ZW50LlR5cGV9PC90ZD5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImFnZV9lbGVtZW50IGFnZV9zb3VyY2VDaGlsZFRhYmxlIFRpdGxlXCIgZGF0YS1VdWlkPVwiJHtjaGlsZENvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnQuVXVpZH1cIiBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCI+JHtjaGlsZENvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnQuVGl0bGV9PC90ZD5cclxuXHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQmVlbiB1bmFibGUgdG8gdHVybiB0aGlzIGludG8gYSBnb29kIGNvbnRlbnQgb2JlamN0IHNvIGZhci4gSSBuZWVkIHRvIGV4dGVuZCBBTEwgcG9zc2libGUgaHRtbC1lbGVtZW50cyB0byBtYWtlIGdlbmVyaWMgaW50ZXJmYWNlLi4uXHJcbiAgICAgICAgLy8gcG90ZW50aWFsIHNvbHV0aW9uIGlzIHRoZW4gSFRNTFRhYmxlUm93RWxlbWVudCAmIGNvbnRlbnRvYmplY3QgOiBhbnlcclxuICAgICAgICBsZXQgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpIGFzIEhUTUxUYWJsZVJvd0VsZW1lbnQ7IFxyXG4gICAgICAgIHRyLmlkID0gJ2FnZV9zb3VyY2VTZWFyY2hOb2RlLScgKyBjaGlsZENvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnQuVXVpZDtcclxuICAgICAgICB0ci5jb250ZW50T2JqZWN0ID0gY2hpbGRDb250ZW50RWRnZU9iamVjdDtcclxuICAgICAgICAvLyB0ci5hYWEgPSBcImFzZFwiO1xyXG4gICAgICAgIHRyLnNldEF0dHJpYnV0ZSgnZGF0YS1mdWNrJywgJ2YqY2snKTtcclxuICAgICAgICAvLyB0ci5kYXRhc2V0Lk5vZGUgPSAxO1xyXG4gICAgICAgIC8vIHRyLmRhdGFzZXQuVXVpZCA9IGNoaWxkT2JqZWN0LlV1aWQ7XHJcbiAgICAgICAgdHIuc2V0QXR0cmlidXRlKCdkYXRhLU5vZGUnLCAnMScpO1xyXG4gICAgICAgIHRyLnNldEF0dHJpYnV0ZSgnZGF0YS1VdWlkJywgY2hpbGRDb250ZW50RWRnZU9iamVjdC5jb250ZW50LlV1aWQpO1xyXG4gICAgICAgIC8vIHRyLnRhYkluZGV4ID0gMTtcclxuICAgICAgICB0ci5pbm5lckhUTUwgPSB0YWJsZVJvd0h0bWw7XHJcbiAgICAgICAgLy8gdHIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja1NvdXJjZUNoaWxkUm93KTtcclxuICAgICAgICAvLyB0ci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4geyBjb25zb2xlLmxvZyhldmVudC50YXJnZXQucGFyZW50Tm9kZS5ub2RlT2JqZWN0KSB9KTtcclxuICAgICAgICAvLyBUYXJnZXRzIG9ubHkgdGhlIGxhc3QgKGkuZS4gVGl0bGUpIGNvbHVtblxyXG4gICAgICAgIC8vIHRyLmxhc3RFbGVtZW50Q2hpbGQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIGFzeW5jIChldmVudCkgPT4ge1xyXG5cclxuICAgICAgICAvLyAgICAgbGV0IHV1aWQgPSBldmVudC50YXJnZXQucGFyZW50RWxlbWVudC5ub2RlT2JqZWN0LmNvbnRlbnQuVXVpZDtcclxuICAgICAgICAvLyAgICAgbGV0IGNvbnRlbnRPYmplY3QgPSBldmVudC50YXJnZXQucGFyZW50RWxlbWVudC5ub2RlT2JqZWN0LmNvbnRlbnQ7XHJcbiAgICAgICAgLy8gICAgIGNvbnRlbnRPYmplY3QuVGl0bGUgPSBldmVudC50YXJnZXQudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKFwiQ0NDQ0NDQ0NDQ1wiLCBjb250ZW50T2JqZWN0KVxyXG4gICAgICAgIC8vICAgICBsZXQgcHV0Q29udGVudE9iamVjdCA9IGF3YWl0IGRiaXMuQ29udGVudF9VcGRhdGVXaXRoQ29udGVudE9iamVjdChjb250ZW50T2JqZWN0KTtcclxuXHJcbiAgICAgICAgLy8gICAgIGxldCBmZXRjaGVkQ29udGVudE9iamVjdCA9IGF3YWl0IGRiaXMuQ29udGVudF9TZWxlY3RPblV1aWQodXVpZCk7XHJcblxyXG4gICAgICAgIC8vICAgICBhd2FpdCBmZXRjaEN1cnJlbnRTb3VyY2VDaGlsZHJlblRoZW5Xcml0ZVRvU3RhdGVzKCk7XHJcbiAgICAgICAgLy8gICAgIHBvcHVsYXRlU291cmNlQ2hpbGRUYWJsZUZyb21TdGF0ZSgpO1xyXG5cclxuICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coXCJEREREREREREREXCIsIGZldGNoZWRDb250ZW50T2JqZWN0KVxyXG4gICAgICAgIC8vICAgICAvLyBjb3B5U291cmNlQ2hpbGRUYWJsZUZyb21Eb20oKTtcclxuXHJcbiAgICAgICAgLy8gICAgIC8vIHB1dEN1cnJlbnRTb3VyY2VPYmplY3QoKTtcclxuICAgICAgICAvLyAgICAgLy8gZmV0Y2hDdXJyZW50U291cmNlQ2hpbGRyZW5UaGVuV3JpdGVUb1N0YXRlcygpO1xyXG4gICAgICAgIC8vICAgICAvLyBwb3B1bGF0ZVNvdXJjZUNoaWxkVGFibGVGcm9tU3RhdGUoKTtcclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICAvLyB0ci5jb250ZW50RWRpdGFibGUgPSAnVHJ1ZSc7XHJcblxyXG4gICAgICAgIHRib2R5LmFwcGVuZCh0cik7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codHIpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2V0IFNoYXJkIHJvd3MgdG8gYmUgdGFiYmFibGVcclxuICAgIGxldCBzaGFyZFJvd3MgPSB0Ym9keS5jaGlsZHJlbjtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hhcmRSb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHNoYXJkUm93ID0gc2hhcmRSb3dzW2ldIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIHNoYXJkUm93LnRhYkluZGV4ID0gMDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gY29uc29sZS50YWJsZShjaGlsZE9iamVjdHMpXHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBzb3VyY2VQcm9wZXJ0eUZvY3VzT3V0KGV2ZW50IDogRm9jdXNFdmVudCl7XHJcbiAgICBjb25zb2xlLmxvZygnRk9DVVMgT1VUIEZST00gU09VUkNFIFBST1BFUlRZJyk7XHJcblxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZm9jdXNPbkxhc3RDaGlsZFJvd1RpdGxlKCl7XHJcbiAgICBsZXQgdGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9zb3VyY2VDaGlsZFRhYmxlLXRib2R5XCIpIGFzIEhUTUxUYWJsZVNlY3Rpb25FbGVtZW50O1xyXG4gICAgLy8gY29uc29sZS5sb2coXCJ0Ym9keSA9IFwiLCB0Ym9keSlcclxuICAgIGxldCBsYXN0Um93ID0gdGJvZHkubGFzdEVsZW1lbnRDaGlsZC5sYXN0RWxlbWVudENoaWxkIGFzIEhUTUxUYWJsZUNlbGxFbGVtZW50O1xyXG4gICAgLy8gY29uc29sZS5sb2coXCJsYXN0Um93ID0gXCIsIGxhc3RSb3cpXHJcblxyXG4gICAgaWYobGFzdFJvdy50ZXh0Q29udGVudC5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgbGFzdFJvdy5pbm5lckhUTUwgPSBcIjxkaXY+PGJyPjwvZGl2PlwiXHJcbiAgICAgICAgbGFzdFJvdy5mb2N1cygpO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICBsYXN0Um93LmZvY3VzKCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2VsZWN0aW9uU3RhcnQgPSB0aGlzLnNlbGVjdGlvbkVuZCA9IHRoaXMudmFsdWUubGVuZ3RoO1xyXG4gICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKVxyXG4gICAgICAgICAgICB2YXIgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIHJhbmdlLnNldFN0YXJ0KGxhc3RSb3cuY2hpbGROb2Rlc1swXSwgbGFzdFJvdy5jaGlsZE5vZGVzWzBdLnRleHRDb250ZW50Lmxlbmd0aClcclxuICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSlcclxuICAgICAgICBcclxuICAgICAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpXHJcbiAgICAgICAgICAgIHNlbC5hZGRSYW5nZShyYW5nZSlcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRDc3MoKTogdm9pZCB7XHJcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZChzb3VyY2VDc3MpO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNzcygpOiB2b2lkIHtcclxuICAgIHNvdXJjZUNzcy5yZW1vdmUoKTtcclxufSIsIlxyXG5cclxuZXhwb3J0IGNsYXNzIEFnZUNvbnRlbnRPYmplY3Qge1xyXG4gICAgb2JqZWN0IDogYW55O1xyXG5cclxuICAgIGNvbnRlbnRFZGdlT2JqZWN0OiBhbnk7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKF9jb250ZW50T2JqZWN0OiBhbnkpe1xyXG4gICAgICAgIHRoaXMub2JqZWN0ID0gX2NvbnRlbnRPYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGFibGUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5vYmplY3QuVGFibGU7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIEFnZUNvbnRlbnRFZGdlT2JqZWN0IHtcclxuICAgIGNvbnRlbnQ6IGFueTtcclxuICAgIGVkZ2U6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihfY29udGVudEVkZ2VPYmplY3Q6IGFueSkge1xyXG4gICAgICAgIHRoaXMuY29udGVudCA9IF9jb250ZW50RWRnZU9iamVjdC5jb250ZW50O1xyXG4gICAgICAgIHRoaXMuZWRnZSA9IF9jb250ZW50RWRnZU9iamVjdC5lZGdlO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLyoqIFVwZGF0ZXMgYWxsIGVsZW1lbnRzIHRoYXQgY29udGFpbnMgdGhlIHRpdGxlIG9mIHRoZSBwYXNzZWQgdXVpZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gVXVpZENoZWNrQW5kVXBkYXRlVGl0bGVzKF91dWlkIDogc3RyaW5nfG51bWJlciwgX3RpdGxlIDogc3RyaW5nKXtcclxuICAgIGxldCB1dWlkRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS11dWlkPScke191dWlkfSddYCk7XHJcblxyXG4gICAgdXVpZEVsZW1lbnRzLmZvckVhY2goKF9lbGVtZW50IDogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImVsZW1lbnQgPSBcIiwgX2VsZW1lbnQpXHJcbiAgICAgICAgaWYgKF9lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcIlRpdGxlXCIpKVxyXG4gICAgICAgICAgICBfZWxlbWVudC50ZXh0Q29udGVudCA9IF90aXRsZTtcclxuICAgIH0pXHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIG92ZXJsYXkgZnJvbSBcIi4vb3ZlcmxheVwiO1xyXG5cclxuXHJcbmxldCBleHRlbnNpb25TdGF0ZUZyb250ID17XHJcbiAgICBhY3RpdmU6IGZhbHNlLFxyXG59O1xyXG5cclxuXHJcbi8vIFNldCB1cCBtb2R1bGVzIGFuZCBmZXRjaCBkYXRhLCBidXQgZG9lcyBub3QgcmVuZGVyIGFueXRoaW5nXHJcbihmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgLy8gREVWIERFVlxyXG4gICAgLy8gTWFrZSBzdXJlIGFueSBleGlzdGluZyBvdmVybGF5cyBhcmUgcmVtb3ZlZFxyXG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX292ZXJsYXlDb250YWluZXJcIikgIT09IG51bGwpXHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpOyBcclxuICAgIFxyXG4gICAgb3ZlcmxheS5pbml0T3ZlcmxheSgpOyAgXHJcbn0pKCk7XHJcbiBcclxuXHJcblxyXG4vKiBcclxuICAgIFRPR0dMRVMgVEhFIEVYVEVOU0lPTiBGUk9OVEVORCBVSVxyXG4qL1xyXG5icm93c2VyLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtZXNzYWdlKSA9PiB7XHJcbiAgICBcclxuICAgIGlmIChtZXNzYWdlLm5hbWUgPT09ICd0b2dnbGVFeHRlbnNpb24nKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUb2dnbGUgRXhpdGVuc2lvbiBNZXNzYWdlIHJlY2lldmVkIVwiKVxyXG5cclxuICAgICAgICBpZiAoZXh0ZW5zaW9uU3RhdGVGcm9udC5hY3RpdmUpe1xyXG4gICAgICAgICAgICBleHRlbnNpb25TdGF0ZUZyb250LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBvdmVybGF5LmhpZGVPdmVybGF5KCk7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgZXh0ZW5zaW9uU3RhdGVGcm9udC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBvdmVybGF5LnNob3dPdmVybGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=