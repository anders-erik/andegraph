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
        if (keyEvent.altKey) {
            switch (keyEvent.key) {
                case 'p': // prints the current rpojject object
                    console.log("textConcatenationContent = ", textConcatenationContent);
                    break;
                case 'r': // refresh project data
                    _projects_projects__WEBPACK_IMPORTED_MODULE_2__.reloadCurrentProject();
                    break;
                case 'n': // new source
                    _projects_projects__WEBPACK_IMPORTED_MODULE_2__.insertNewSourceToActiveProject();
                    break;
                case 'm': // move
                    _projects_projects__WEBPACK_IMPORTED_MODULE_2__.toggleExtensionLocation();
                    break;
                case '/': // go to search
                    document.getElementById("age_projectSearchInput").focus();
                    break;
                case 'x':
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
                case '[':
                    // console.log('Alt + [')
                    startClipboardTextConcatenation();
                    document.getElementById("age_clipboardContainer").classList.remove("collapsed");
                    break;
                case 'Enter':
                    // console.log('Alt + Enter')
                    addNewLineToCaptureConcatenationContents();
                    break;
                case '-':
                    // console.log('Alt + Enter')
                    addSpaceCharacterToCaptureConcatenationContents();
                    break;
                case ']':
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
    overlayContainer.addEventListener("loadsource", (event) => {
        _source_source__WEBPACK_IMPORTED_MODULE_2__.loadWithContentObject(event.detail.contentObject);
    });
    overlayContainer.addEventListener("newsource", (event) => {
        _source_source__WEBPACK_IMPORTED_MODULE_2__.loadWithContentObject(event.detail.contentObject);
        _source_source__WEBPACK_IMPORTED_MODULE_2__.showSourceProperties(); // Make sure we go to the properties tab when crating a new source!
    });
    overlayContainer.addEventListener("newproject", (event) => { });
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
                reloadCurrentProject();
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
 * Add new child-source, fires off the loadsource CutomEvent, and then reloads the project child table.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bUJBQW1CLENBQUMsTUFBTSxFQUFDLENBQUM7WUFDNUIsbUJBQW1CLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNuQyxpREFBbUIsRUFBRSxDQUFDO1FBRzFCLENBQUM7YUFDRyxDQUFDO1lBQ0QsbUJBQW1CLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNsQyxpREFBbUIsRUFBRSxDQUFDO1FBQzFCLENBQUM7SUFDTCxDQUFDO0FBRUwsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zb3VyY2VzLy4vd2ViZXh0ZW5zaW9uL3dwLWRldi9jbGlwYm9hcmQudHMiLCJ3ZWJwYWNrOi8vc291cmNlcy8uL3dlYmV4dGVuc2lvbi93cC1kZXYvZGJpLXNlbmQudHMiLCJ3ZWJwYWNrOi8vc291cmNlcy8uL3dlYmV4dGVuc2lvbi93cC1kZXYvZmV0Y2hlci50cyIsIndlYnBhY2s6Ly9zb3VyY2VzLy4vd2ViZXh0ZW5zaW9uL3dwLWRldi9vdmVybGF5LnRzIiwid2VicGFjazovL3NvdXJjZXMvLi93ZWJleHRlbnNpb24vd3AtZGV2L3Byb2plY3RzL3Byb2plY3RfZG9tLnRzIiwid2VicGFjazovL3NvdXJjZXMvLi93ZWJleHRlbnNpb24vd3AtZGV2L3Byb2plY3RzL3Byb2plY3RzLnRzIiwid2VicGFjazovL3NvdXJjZXMvLi93ZWJleHRlbnNpb24vd3AtZGV2L3NvdXJjZS9zb3VyY2UudHMiLCJ3ZWJwYWNrOi8vc291cmNlcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zb3VyY2VzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zb3VyY2VzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc291cmNlcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NvdXJjZXMvLi93ZWJleHRlbnNpb24vd3AtZGV2L2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZldGNoZXIgZnJvbSBcIi4vZmV0Y2hlclwiO1xyXG5pbXBvcnQgKiBhcyBzb3VyY2UgZnJvbSBcIi4vc291cmNlL3NvdXJjZVwiO1xyXG5pbXBvcnQgKiBhcyBwcm9qZWN0IGZyb20gXCIuL3Byb2plY3RzL3Byb2plY3RzXCI7XHJcbmltcG9ydCB7IGFnZV9kYmlzIH0gZnJvbSBcIi4vZGJpLXNlbmRcIjtcclxuXHJcbmxldCBzaWRlUGFuZWw6IEVsZW1lbnQ7XHJcblxyXG5cclxubGV0IGNsaXBib2FyZENvbnRhaW5lcjogRWxlbWVudDtcclxubGV0IGNsaXBib2FyZENzczogSFRNTEVsZW1lbnQ7XHJcblxyXG5cclxuLy8gVkFSU1xyXG5sZXQgd2FpdGluZ1NlY29uZFNoaWZ0ID0gMDtcclxubGV0IHdhaXRpbmdTZWNvbmRDdHJsU2hpZnQgPSAwO1xyXG5cclxuXHJcbmxldCBjbGlwYm9hcmRJbm5lciA6IEhUTUxFbGVtZW50O1xyXG5sZXQgY2xpcGJvYXJkQ29kZUNoZWNrYm94IDogSFRNTElucHV0RWxlbWVudDtcclxubGV0IGNsaXBib2FyZFRleHRUeXBlSW5wdXQgOiBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxubGV0IGNsaXBib2FyZENvbmNhdENvbnRlbnRzIDogSFRNTEVsZW1lbnQ7XHJcbmxldCB0ZXh0Q29uY2F0ZW5hdGlvbkNhcHR1cmluZyA6IGJvb2xlYW4gPSBmYWxzZTtcclxubGV0IHRleHRDb25jYXRlbmF0aW9uQ29udGVudCA6IHN0cmluZyA9IFwiXCI7XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdENsaXBib2FyZChfc2lkZVBhbmVsOiBFbGVtZW50KSB7XHJcblx0Ly8gY2xpcGJvYXJkQ29kZUNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRvZ2dsZVNlbGVjdENvZGUpO1xyXG5cclxuXHQvLyB3cml0ZVRleHRDb25jYXRlbmF0aW9uQ29udGVudFRvRG9tKCk7XHJcblxyXG5cdC8vIGlmIChleHRlbnNpb25TdGF0ZUZyb250LnRleHRDb25jYXRlbmF0aW9uQ2FwdHVyaW5nKSB7XHJcblx0Ly8gXHRjbGlwYm9hcmRJbm5lci5jbGFzc0xpc3QuYWRkKCdhZ2VfYWN0aXZlQ2xpcGJvYXJkJyk7XHJcblx0Ly8gfVxyXG5cdC8vIGVsc2Uge1xyXG5cdC8vIFx0Y2xpcGJvYXJkSW5uZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWdlX2FjdGl2ZUNsaXBib2FyZCcpO1xyXG5cdC8vIH1cclxuXHJcblx0LyogXHJcblx0XHJcblx0XHRcdE5FVyBORVcgTkVXIC0gMjAyNC0xMC0wMlxyXG5cdFxyXG5cdCovXHJcblxyXG5cdHNpZGVQYW5lbCA9IF9zaWRlUGFuZWw7XHJcblxyXG5cdGNsaXBib2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdGNsaXBib2FyZENvbnRhaW5lci5pZCA9IFwiYWdlX2NsaXBib2FyZENvbnRhaW5lclwiO1xyXG5cdGNsaXBib2FyZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYWdlX3BhbmVsQ29udGFpbmVyXCIsIFwiY29sbGFwc2VkXCIpO1xyXG5cclxuXHJcblxyXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NvcHknLCBjb3B5RXZlbnQpXHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY3V0JywgY3V0RXZlbnQpXHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncGFzdGUnLCBwYXN0ZUV2ZW50KVxyXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlkb3duQWN0aXZlRXh0ZW5zaW9uKVxyXG5cclxuXHJcblx0ZmV0Y2hlci5mZXRjaEh0bWwoXCJjbGlwYm9hcmQuaHRtbFwiKVxyXG5cdFx0LnRoZW4oaHRtbCA9PiB7XHJcblx0XHRcdGNsaXBib2FyZENvbnRhaW5lci5pbm5lckhUTUwgPSBodG1sO1xyXG5cclxuXHJcblx0XHRcdGNsaXBib2FyZElubmVyID0gY2xpcGJvYXJkQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX2NsaXBib2FyZElubmVyXCIpO1xyXG5cdFx0XHRjbGlwYm9hcmRDb2RlQ2hlY2tib3ggPSBjbGlwYm9hcmRDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2VfY2xpcGJvYXJkQ29kZUNoZWNrYm94XCIpO1xyXG5cdFx0XHRjbGlwYm9hcmRUZXh0VHlwZUlucHV0ID0gY2xpcGJvYXJkQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX2NsaXBib2FyZFRleHRUeXBlSW5wdXRcIik7XHJcblx0XHRcdGNsaXBib2FyZENvbmNhdENvbnRlbnRzID0gY2xpcGJvYXJkQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX2NsaXBib2FyZENvbmNhdENvbnRlbnRcIik7XHJcblx0XHR9KVxyXG5cclxuXHRjbGlwYm9hcmRDc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0Y2xpcGJvYXJkQ3NzLmlkID0gXCJhZ2VfY2xpcGJvYXJkU3R5bGVcIjtcclxuXHRmZXRjaGVyLmZldGNoQ3NzKFwiY2xpcGJvYXJkLmNzc1wiKVxyXG5cdFx0LnRoZW4oY3NzID0+IHtcclxuXHRcdFx0Y2xpcGJvYXJkQ3NzLmlubmVyVGV4dCA9IGNzcztcclxuXHRcdH0pXHJcblxyXG5cdC8vIGNvbnNvbGUubG9nKFwic2lkZVBhbmVsLmlkID0gXCIsIHNpZGVQYW5lbC5pZClcclxuXHJcblx0c2lkZVBhbmVsLmFwcGVuZChjbGlwYm9hcmRDb250YWluZXIpO1xyXG5cclxuIFxyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuLyogXHJcblxyXG5cdENMSVBCT0FSRCBGVU5DVElPTlNcclxuXHJcbiovXHJcblxyXG5cclxuZnVuY3Rpb24gd3JpdGVUZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnRUb0RvbSgpIHtcclxuXHJcblx0bGV0IGNsaXBib2FyZFN0cmluZyA9IHRleHRDb25jYXRlbmF0aW9uQ29udGVudDtcclxuXHRsZXQgY2xpcGJvYXJkSW5uZXJIdG1sID0gJzxkaXY+JyArIGNsaXBib2FyZFN0cmluZy5yZXBsYWNlKC9cXG4vZywgJzxicj4nKSArICc8L2Rpdj4nO1xyXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2VfY2xpcGJvYXJkQ29uY2F0Q29udGVudCcpLmlubmVySFRNTCA9IGNsaXBib2FyZElubmVySHRtbDtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gc3RhcnRDbGlwYm9hcmRUZXh0Q29uY2F0ZW5hdGlvbigpIHtcclxuXHJcblx0dGV4dENvbmNhdGVuYXRpb25DYXB0dXJpbmcgPSB0cnVlO1xyXG5cdC8vIGV4dGVuc2lvblN0YXRlRnJvbnQudGV4dENvbmNhdGVuYXRpb25Db250ZW50ID0gJyc7XHJcblx0Ly8gd3JpdGVUZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnRUb0RvbSgpO1xyXG5cdC8vd3JpdGVTdGF0ZUZyb21Gcm9udCgpO1xyXG5cdC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2VfY2xpcGJvYXJkQ29udGFpbmVyJykuY2xhc3NMaXN0LnJlbW92ZSgnYWdlX2Rpc3BsYXlOb25lJyk7XHJcblx0Y2xpcGJvYXJkSW5uZXIuY2xhc3NMaXN0LmFkZCgnYWdlX2FjdGl2ZUNsaXBib2FyZCcpO1xyXG5cdGNvbnNvbGUubG9nKCdzdGFydCB0ZXh0IGNvbmNhdGVudGF0aW9uIGNhcHR1cmUnKTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFNwYWNlQ2hhcmFjdGVyVG9DYXB0dXJlQ29uY2F0ZW5hdGlvbkNvbnRlbnRzKCkge1xyXG5cdGNvbnNvbGUubG9nKCdhZGRlZCBuZXcgc3BhY2UnKVxyXG5cdGlmICh0ZXh0Q29uY2F0ZW5hdGlvbkNhcHR1cmluZykge1xyXG5cdFx0dGV4dENvbmNhdGVuYXRpb25Db250ZW50ICs9ICcgJztcclxuXHRcdC8vd3JpdGVTdGF0ZUZyb21Gcm9udCgpO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZE5ld0xpbmVUb0NhcHR1cmVDb25jYXRlbmF0aW9uQ29udGVudHMoKSB7XHJcblx0Y29uc29sZS5sb2coJ2FkZGVkIG5ldyBsaW5lJylcclxuXHRpZiAodGV4dENvbmNhdGVuYXRpb25DYXB0dXJpbmcpIHtcclxuXHRcdHRleHRDb25jYXRlbmF0aW9uQ29udGVudCArPSAnXFxuJztcclxuXHRcdC8vd3JpdGVTdGF0ZUZyb21Gcm9udCgpO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0b3BDbGlwYm9hcmRUZXh0Q29uY2F0ZW5hdGlvbigpIHtcclxuXHJcblxyXG5cclxuXHR0ZXh0Q29uY2F0ZW5hdGlvbkNhcHR1cmluZyA9IGZhbHNlO1xyXG5cdHRleHRDb25jYXRlbmF0aW9uQ29udGVudCA9ICcnO1xyXG5cdHdyaXRlVGV4dENvbmNhdGVuYXRpb25Db250ZW50VG9Eb20oKTtcclxuXHRjbGlwYm9hcmRJbm5lci5jbGFzc0xpc3QucmVtb3ZlKCdhZ2VfYWN0aXZlQ2xpcGJvYXJkJyk7XHJcblx0Ly93cml0ZVN0YXRlRnJvbUZyb250KCk7XHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qIFxyXG5cclxuXHRDTElQQk9BUkQgRVZFTlRTXHJcblxyXG4qL1xyXG5cclxuLy8gZnVuY3Rpb24gdG9nZ2xlU2VsZWN0Q29kZSgpIHtcclxuLy8gXHRpZiAoY2xpcGJvYXJkQ29kZUNoZWNrYm94LmNoZWNrZWQpIHtcclxuLy8gXHRcdGNsaXBib2FyZFRleHRUeXBlSW5wdXQuZGlzYWJsZWQgPSBmYWxzZTtcclxuLy8gXHR9XHJcbi8vIFx0ZWxzZSB7XHJcbi8vIFx0XHRjbGlwYm9hcmRUZXh0VHlwZUlucHV0LmRpc2FibGVkID0gdHJ1ZTtcclxuLy8gXHR9XHJcblxyXG4vLyB9XHJcblxyXG5hc3luYyBmdW5jdGlvbiBwYXN0ZUV2ZW50KGV2ZW50IDogQ2xpcGJvYXJkRXZlbnQpIHtcclxuXHQvLyBjb25zb2xlLmxvZygncGFzdGVwYXN0ZScpXHJcblx0Y29uc29sZS5sb2coJ1BBU1RFIEVWRU5UJylcclxuXHQvLyBjb25zb2xlLmxvZyhldmVudC5jbGlwYm9hcmREYXRhLmZpbGVzWzBdKVxyXG5cclxuXHJcblx0XHJcblxyXG5cclxuXHRsZXQgY2xpcGJvYXJkQ29udGVudFR5cGUgPSBkZXRlcm1pbmVDbGlwYm9hcmRDb250ZW50VHlwZShldmVudC5jbGlwYm9hcmREYXRhKTtcclxuXHJcblxyXG5cdGlmIChjbGlwYm9hcmRDb250ZW50VHlwZSA9PT0gJ3RleHQnKSB7XHJcblx0XHRjb25zb2xlLmxvZygnZGVhbCB3aXRoIHRleHQnKTsgXHJcblxyXG5cdFx0bGV0IGNsaXBib2FyZFRleHQgPSAoZXZlbnQuY2xpcGJvYXJkRGF0YSAvKiB8fCB3aW5kb3cuY2xpcGJvYXJkRGF0YSAqLykuZ2V0RGF0YShcInRleHRcIik7XHJcblx0XHRjb25zb2xlLmxvZygnY2xpcGJvYXJkVGV4dCA9ICcsIGNsaXBib2FyZFRleHQpO1xyXG5cdFx0XHJcblxyXG5cdFx0aWYgKHRleHRDb25jYXRlbmF0aW9uQ2FwdHVyaW5nKSB7XHJcblxyXG5cdFx0XHR0ZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnQgKz0gY2xpcGJvYXJkVGV4dDtcclxuXHJcblx0XHRcdHdyaXRlVGV4dENvbmNhdGVuYXRpb25Db250ZW50VG9Eb20oKVxyXG5cclxuXHRcdFx0Ly93cml0ZVN0YXRlRnJvbUZyb250KCk7XHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKGV4dGVuc2lvblN0YXRlRnJvbnQudGV4dENvbmNhdGVuYXRpb25Db250ZW50KTtcclxuXHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Y29uc29sZS5sb2coJ1BBU1RFIFRPIE5FVyBTSEFSRCcpXHJcblxyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhjbGlwYm9hcmRDb2RlQ2hlY2tib3guY2hlY2tlZClcclxuXHJcblx0XHRcdGlmIChjbGlwYm9hcmRDb2RlQ2hlY2tib3guY2hlY2tlZCkge1xyXG5cdFx0XHRcdHBvc3ROZXdDb2RlT2JqZWN0VG9DdXJyZW50U291cmNlQW5kRnVsbFJlbG9hZE9mU291cmNlQ2hpbGRyZW4oY2xpcGJvYXJkVGV4dFR5cGVJbnB1dC52YWx1ZSwgY2xpcGJvYXJkVGV4dClcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRwb3N0TmV3VGV4dE5vZGVUb0N1cnJlbnRTb3VyY2VBbmRGdWxsUmVsb2FkT2ZTb3VyY2VDaGlsZHJlbihjbGlwYm9hcmRUZXh0VHlwZUlucHV0LnZhbHVlLCBjbGlwYm9hcmRUZXh0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvLyBpZiAoc2hhcmRjYXJkLmNvbnRlbnRFZGl0YWJsZSA9PT0gJ3RydWUnKSB7XHJcblx0XHQvLyBcdGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiaW5zZXJ0SFRNTFwiLCBmYWxzZSwgY2xpcGJvYXJkVGV4dCk7XHJcblx0XHQvLyBcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHQvLyB9XHJcblx0XHQvLyBlbHNlIGlmIChzaGFyZE9iamVjdC50ZXh0Q29udGVudCA9PSAnJyAmJiBzaGFyZE9iamVjdC5maWxlTmFtZSA9PSAnJykge1xyXG5cdFx0Ly8gXHRpbnNlcnRTaGFyZGNhcmRUZXh0Q29udGVudChzaGFyZGNhcmQsIGNsaXBib2FyZFRleHQpO1xyXG5cdFx0Ly8gXHQvL3NoYXJkY2FyZC5zaGFyZC5lbGVtZW50VHlwZSA9ICd0ZXh0JztcclxuXHRcdC8vIFx0dXBkYXRlU2hhcmRjYXJkVGV4dENvbnRlbnQoc2hhcmRjYXJkKTtcclxuXHRcdC8vIH1cclxuXHRcdC8vIGVsc2Uge1xyXG5cdFx0Ly8gXHRjb25zb2xlLmxvZygnVGhpcyBzb3VyY2UgYWxyZWFkeSBoYXMgY29udGVudC4gUmV0dXJuaW5nLicpO1xyXG5cclxuXHRcdC8vIH1cclxuXHJcblxyXG5cclxuXHR9XHJcblx0ZWxzZSBpZiAoY2xpcGJvYXJkQ29udGVudFR5cGUgPT09ICdmaWxlJykge1xyXG5cdFx0Y29uc29sZS5sb2coJ2RlYWwgd2l0aCBmaWxlJylcclxuXHJcblx0XHRsZXQgbmV3RmlsZSA9IGV2ZW50LmNsaXBib2FyZERhdGEuZmlsZXNbMF07XHJcblxyXG5cdFx0bGV0IGZpbGVDYXRlZ29yeU9iamVjdCA9IGRldGVybWluZUZpbGVDYXRlZ29yaWVzKG5ld0ZpbGUpO1xyXG5cdFx0Y29uc29sZS5sb2coJ2ZpbGVDYXRlZ29yeU9iamVjdDogJywgZmlsZUNhdGVnb3J5T2JqZWN0KVxyXG5cclxuXHRcdGlmIChmaWxlQ2F0ZWdvcnlPYmplY3QuZmlsZVR5cGUgPT09ICd0eXBldHlwZScpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcignRklMRSBFWFRFTlNJT04gSEFEIE5PIE1BVENISU5HIENPTlRFTlQgVFlQRScpXHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcG9zdEZpbGVRdWVyeVBhcmFtZXRlcnMgPSB7XHJcblx0XHRcdFR5cGU6IGZpbGVDYXRlZ29yeU9iamVjdC5maWxlVHlwZSxcclxuXHRcdFx0VGl0bGU6IFwiXCIsXHJcblx0XHRcdEV4dGVuc2lvbjogZmlsZUNhdGVnb3J5T2JqZWN0LmZpbGVFeHRlbnNpb24sXHJcblx0XHRcdElBbUF1dGhvcjogMCxcclxuXHRcdH1cclxuXHJcblx0XHRwb3N0TmV3RmlsZVRvQ3VycmVudFNvdXJjZUFuZEZ1bGxSZWxvYWRPZlNvdXJjZUNoaWxkcmVuKG5ld0ZpbGUsIHBvc3RGaWxlUXVlcnlQYXJhbWV0ZXJzLCBmaWxlQ2F0ZWdvcnlPYmplY3QubWltZVR5cGUpO1xyXG5cclxuXHRcdC8vIGNvbnNvbGUubG9nKG5ld0ZpbGUpXHJcblxyXG5cdFx0Ly8gY29uc29sZS5sb2coYXdhaXQgYWdlX2RiaXNXZS5maWxlR2V0KDEyMTYyNzI3OTM2MCkpO1xyXG5cclxuXHRcdC8vIGxldCBzb3VyY2VpZCA9IGV4dHJhY3RDdXJyZW50U291cmNlSWQoKTtcclxuXHJcblx0XHQvLyBpZiAoc2hhcmRPYmplY3QuZmlsZU5hbWUgPT0gJycgJiYgc2hhcmRPYmplY3QudGV4dENvbnRlbnQgPT0gJycpIHtcclxuXHRcdC8vIFx0cG9zdEZpbGUoZXZlbnQuY2xpcGJvYXJkRGF0YS5maWxlc1swXSwgc291cmNlaWQsIHNoYXJkaWQpO1xyXG5cdFx0Ly8gXHRjb25zb2xlLmxvZygnbm9ub25vJylcclxuXHRcdC8vIH1cclxuXHRcdC8vIGVsc2Uge1xyXG5cdFx0Ly8gXHRjb25zb2xlLmxvZygnVGhpcyBzb3VyY2UgYWxyZWFkeSBoYXMgY29udGVudC4gUmV0dXJuaW5nLicpO1xyXG5cdFx0Ly8gfVxyXG5cclxuXHJcblxyXG5cdH1cclxuXHJcblxyXG5cclxufVxyXG4vLyBjb25zdCBwYXNwYXMgPSBuZXcgQ2xpcGJvYXJkRXZlbnQoJ3Bhc3RlJyk7XHJcbi8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQocGFzcGFzKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBjb3B5RXZlbnQoZXZlbnQgOiBDbGlwYm9hcmRFdmVudCkge1xyXG5cclxuXHQvLyBjb25zb2xlLmxvZygnY29wY29wJylcclxuXHQvLyBjb25zb2xlLmxvZyhldmVudC5jbGlwYm9hcmREYXRhIClcclxuXHQvLyBsZXQgY2JkID0gZXZlbnQuY2xpcGJvYXJkRGF0YSB8fCB3aW5kb3cuY2xpcGJvYXJkRGF0YVxyXG5cdC8vIGxldCBjb3BpZWREYXRhID0gY2JkLmdldERhdGEoJ1RleHQnKTtcclxuXHQvLyBjb25zb2xlLmxvZygnY29waWVkRGF0YScsIGNvcGllZERhdGEpXHJcblxyXG5cdC8vIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSgge1xyXG5cdC8vIFx0Y29tbWFuZDogXCJjb3B5Y29weVwiXHJcblx0Ly8gfSk7XHJcblxyXG5cdGNvbnNvbGUubG9nKCdDT1BZRVZFTlQnKVxyXG5cclxuXHJcblx0Ly8gbmF2aWdhdG9yLmNsaXBib2FyZFxyXG5cdC8vIFx0LnJlYWQoKVxyXG5cdC8vIFx0LnRoZW4oXHJcblx0Ly8gXHRcdChjbGlwVGV4dCkgPT4gKGNvbnNvbGUubG9nKGNsaXBUZXh0KSksXHJcblx0Ly8gXHQpO1xyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gY3V0RXZlbnQoZXZlbnQgOiBLZXlib2FyZEV2ZW50KSB7XHJcblx0Y29uc29sZS5sb2coJ0NVVCBFVkVOVCcpXHJcbn1cclxuXHJcblxyXG5cclxuLyogXHJcblxyXG5cdEhFTFBFUiBGVU5DVElPTlNcclxuXHJcbiovXHJcblxyXG5cclxuXHJcblxyXG5sZXQgZGV0ZXJtaW5lQ2xpcGJvYXJkQ29udGVudFR5cGUgPSBmdW5jdGlvbiAoZXZlbnRDbGlwYm9hcmREYXRhIDogYW55KSB7XHJcblxyXG5cdGlmICh0eXBlb2YgZXZlbnRDbGlwYm9hcmREYXRhLmZpbGVzWzBdICE9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0Ly8gcG9zdEZpbGUoZGF0YUNsaXBib2FyZEV2ZW50LmZpbGVzWzBdLCBzb3VyY2VpZCwgc2hhcmRpZCk7XHJcblx0XHRyZXR1cm4gJ2ZpbGUnO1xyXG5cdH1cclxuXHRlbHNlIGlmICgoZXZlbnRDbGlwYm9hcmREYXRhIC8qIHx8IHdpbmRvdy5jbGlwYm9hcmREYXRhICovKS5nZXREYXRhKFwidGV4dFwiKSAhPT0gJycpIHtcclxuXHRcdC8vY29uc29sZS5sb2coKGV2ZW50LmNsaXBib2FyZERhdGEgfHwgd2luZG93LmNsaXBib2FyZERhdGEpLmdldERhdGEoXCJ0ZXh0XCIpKTtcclxuXHJcblx0XHRsZXQgY2xpcGJvYXJkVGV4dCA9IChldmVudENsaXBib2FyZERhdGEgLyogfHwgd2luZG93LmNsaXBib2FyZERhdGEgKi8pLmdldERhdGEoXCJ0ZXh0XCIpO1xyXG5cdFx0bGV0IGJsb2IgPSBuZXcgQmxvYihbY2xpcGJvYXJkVGV4dF0sIHsgdHlwZTogJ3RleHQvcGxhaW4nIH0pO1xyXG5cdFx0bGV0IGZpbGUgPSBuZXcgRmlsZShbYmxvYl0sIFwiY2xpcGJvYXJkLnR4dFwiLCB7IHR5cGU6IFwidGV4dC9wbGFpblwiIH0pO1xyXG5cclxuXHRcdC8vcG9zdEZpbGUoZmlsZSwgc291cmNlaWQsIHNoYXJkaWQpO1xyXG5cdFx0cmV0dXJuICd0ZXh0JztcclxuXHR9XHJcblx0ZWxzZSB7XHJcblx0XHRjb25zb2xlLmxvZygnTm8gZmlsZSBub3IgdGV4dCBkZXRlY3RlZC4nKTtcclxuXHRcdHJldHVybiAnZW1wdHknO1xyXG5cdH1cclxuXHJcblx0Ly9yZXR1cm4gJ2NsaXBib2FyZENvbnRlbnRUeXBlJztcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbmxldCBleHRlbnNpb25PYmplY3QgOiBhbnkgPSB7XHJcblx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvTWVkaWEvRm9ybWF0cy9JbWFnZV90eXBlc1xyXG5cdGltYWdlOiBbJ2FwbmcnLCAnYXZpZicsICdnaWYnLCAnYm1wJywgJ2pwZycsICdqcGVnJywgJ2pmaWYnLCAncGpwZWcnLCAncGpwJywgJ3BuZycsICdzdmcnLCAnd2VicCddLFxyXG5cdC8vIGh0dHBzOi8vd3d3LmNhbnRvLmNvbS9ibG9nL2F1ZGlvLWZpbGUtdHlwZXMvXHJcblx0YXVkaW86IFsnbTRhJywgJ2ZsYWMnLCAnbXAzJywgJ3dhdicsICd3bWEnLCAnYWFjJ10sXHJcblx0Ly8gaHR0cHM6Ly93d3cuYWRvYmUuY29tL2NyZWF0aXZlY2xvdWQvdmlkZW8vZGlzY292ZXIvYmVzdC12aWRlby1mb3JtYXQuaHRtbFxyXG5cdHZpZGVvOiBbJ21wNCcsICdtb3YnLCAnd212JywgJ2F2aScsICdBVkNIRCcsICdmbHYnLCAnZjR2JywgJ3N3ZicsICdta3YnLCAnd2VibScsICdtcGcnXSxcclxuXHRwZGY6IFsncGRmJ10sXHJcblx0ZGF0YTogWydqc29uJywgJ2NzdicsICd0c3YnLCAnZGInLCAneGxzeCcsICdvZHMnLCAnb2RiJ10sXHJcblx0Ly8gVGV4dGFyZWEgZXh0ZW5zaW9uXHJcblx0dGV4dDogWyd0eHQnLCAnbWQnXSxcclxuXHRjb2RlOiBbJ2pzJywgJ3RzJywgJ2NzcycsICdodG1sJywgJ2NzJ10sXHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gZGV0ZXJtaW5lRmlsZUNhdGVnb3JpZXMoc2VsZWN0ZWRGaWxlIDogYW55KSA6IGFueSB7XHJcblxyXG5cdGxldCBzZWxlY3RlZEZpbGVUeXBlOiBzdHJpbmcgPSBzZWxlY3RlZEZpbGUudHlwZTtcclxuXHRsZXQgZmlsZUNhdGVnb3JpZXMgPSB7XHJcblx0XHRtaW1lVHlwZTogc2VsZWN0ZWRGaWxlVHlwZSxcclxuXHRcdGJhc2VGaWxlTmFtZTogJ2Jhc2VuYW1lJyxcclxuXHRcdGZpbGVFeHRlbnNpb246ICdleHRleHQnLFxyXG5cdFx0ZmlsZVR5cGU6ICd0eXBldHlwZSdcclxuXHR9XHJcblxyXG5cclxuXHJcblx0ZmlsZUNhdGVnb3JpZXMuZmlsZUV4dGVuc2lvbiA9IGRldGVybWluZUZpbGVFeHRlbnNpb24oc2VsZWN0ZWRGaWxlKTtcclxuXHRmaWxlQ2F0ZWdvcmllcy5iYXNlRmlsZU5hbWUgPSBkZXRlcm1pbmVCYXNlRmlsZU5hbWUoc2VsZWN0ZWRGaWxlKTtcclxuXHJcblx0Ly8gZmlsZUNhdGVnb3JpZXMuZmlsZVR5cGUgPSBkZXRlcm1pbmVGaWxlVHlwZShmaWxlQ2F0ZWdvcmllcy5taW1lVHlwZSwgZmlsZUNhdGVnb3JpZXMuZmlsZUVuZGluZyk7XHJcblxyXG5cdC8vIGZpbGVDYXRlZ29yaWVzLmZpbGVUeXBlID0gT2JqZWN0LmVudHJpZXMoZXh0ZW5zaW9uT2JqZWN0KS5mb3JFYWNoKHR5cGVBcnJheSA9PiB0eXBlQXJyYXkuZmlsdGVyKGV4dGVuc2lvbiA9PiBleHRlbnNpb24gPT09IGZpbGVDYXRlZ29yaWVzLmZpbGVFeHRlbnNpb24pKVxyXG5cdGZpbGVDYXRlZ29yaWVzLmZpbGVUeXBlID0gT2JqZWN0LmtleXMoZXh0ZW5zaW9uT2JqZWN0KS5maW5kKHR5cGUgPT4gZXh0ZW5zaW9uT2JqZWN0W3R5cGVdLmluY2x1ZGVzKGZpbGVDYXRlZ29yaWVzLmZpbGVFeHRlbnNpb24pKTtcclxuXHQvLyBjb25zb2xlLmxvZyhmaWxlQ2F0ZWdvcmllcy5maWxlVHlwZSlcclxuXHQvL2NvbnNvbGUubG9nKCdmaWxlIHR5cGUgZGV0ZXJtaW5lZCBoZXJlIScpO1xyXG5cdC8vIGlmIChmaWxlQ2F0ZWdvcmllcy5maWxlRXh0ZW5zaW9uID09PSAnZGInKSB7XHJcblx0Ly8gXHQvLyBodHRwOi8vZmlsZWZvcm1hdHMuYXJjaGl2ZXRlYW0ub3JnL3dpa2kvREJfKFNRTGl0ZSlcclxuXHQvLyBcdGZpbGVDYXRlZ29yaWVzLm1pbWVUeXBlID0gJ2FwcGxpY2F0aW9uL3ZuZC5zcWxpdGUzJztcclxuXHQvLyB9XHJcblx0Y29uc29sZS5sb2coZmlsZUNhdGVnb3JpZXMubWltZVR5cGUpXHJcblx0aWYgKGZpbGVDYXRlZ29yaWVzLm1pbWVUeXBlID09ICcnKSB7XHJcblx0XHQvLyBmaWxlQ2F0ZWdvcmllcy5taW1lVHlwZSA9PSAnYXBwbGljYXRpb24vc3RyZWFtJztcclxuXHRcdGZpbGVDYXRlZ29yaWVzLm1pbWVUeXBlID0gJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSc7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gZmlsZUNhdGVnb3JpZXM7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGRldGVybWluZUZpbGVFeHRlbnNpb24oc2VsZWN0ZWRGaWxlIDogRmlsZSkge1xyXG5cclxuXHRyZXR1cm4gc2VsZWN0ZWRGaWxlLm5hbWUubWF0Y2goL1xcdyskL2cpWzBdO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gZGV0ZXJtaW5lQmFzZUZpbGVOYW1lKHNlbGVjdGVkRmlsZTogRmlsZSkge1xyXG5cclxuXHRyZXR1cm4gc2VsZWN0ZWRGaWxlLm5hbWUubWF0Y2goL14uKig/PVxcLlteLl0rJCkvKVswXTtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qIFxyXG5cclxuXHRDTElQQk9BUkQgRkVUQ0hcclxuXHJcbiovXHJcblxyXG5cclxuYXN5bmMgZnVuY3Rpb24gcG9zdE5ld1RleHROb2RlVG9DdXJyZW50U291cmNlQW5kRnVsbFJlbG9hZE9mU291cmNlQ2hpbGRyZW4odGV4dFR5cGUgOiBzdHJpbmcsIFRleHRDb250ZW50IDogc3RyaW5nKSB7XHJcblxyXG5cdGxldCBzb3VyY2VPYmplY3Q6IGFueSA9IHNvdXJjZS5nZXRDdXJyZW50U291cmNlT2JqZWN0KCk7XHJcblx0aWYoc291cmNlT2JqZWN0ID09IHVuZGVmaW5lZCl7XHJcblx0XHRjb25zb2xlLndhcm4oXCJVbmFibGUgdG8gcG9zdCBuZXcgdGV4dCBvYmplY3QuIE5vIHNlbGVjdGVkIHNvdXJjZU9iamVjdC5cIilcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0XHJcblx0Ly8gbGV0IHNvdXJjZVV1aWQgPSBzb3VyY2VPYmplY3QuVXVpZDtcclxuXHQvLyBsZXQgc291cmNlVXVpZCA9IHNvdXJjZS5nZXRDdXJyZW50U291cmNlVXVpZCgpO1xyXG5cclxuXHQvLyBsZXQgc291cmNlT2JqZWN0OiBhbnkgPSBzb3VyY2UuY3VycmVudFNvdXJjZU9iamVjdDtcclxuXHRsZXQgc291cmNlVXVpZCA9IHNvdXJjZU9iamVjdC5VdWlkO1xyXG5cclxuXHQvLyBjb25zb2xlLmxvZygncG9zdE5ld1RleHROb2RlVG9DdXJyZW50U291cmNlQW5kRnVsbFJlbG9hZE9mU291cmNlQ2hpbGRyZW4oKScpO1xyXG5cdC8vIGNvbnNvbGUubG9nKCdzb3VyY2VVdWlkID0gJywgc291cmNlVXVpZCk7XHJcblx0XHJcblx0XHJcblxyXG5cdC8vIENvbnRlbnRfSW5zZXJ0Q2hpbGRVdWlkVGFibGUoVXVpZCwgY2hpbGRUYWJsZSlcclxuXHRpZiAoc291cmNlVXVpZCAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG5cdFx0Ly8gbGV0IG5ld1RleHRPYmplY3QgPSAoYXdhaXQgYWdlX2RiaXNXZS5Db250ZW50X0luc2VydENoaWxkVXVpZFRhYmxlKGV4dGVuc2lvblN0YXRlRnJvbnQuY3VycmVudF9zb3VyY2VPYmplY3QuVXVpZCwgJ1RleHQnKSkuQ29udGVudDtcclxuXHRcdGxldCBuZXdUZXh0Q29udGVudE9iamVjdCA9IChhd2FpdCBhZ2VfZGJpcy5Db250ZW50RWRnZV9JbnNlcnRBZGphY2VudFRvVXVpZEludG9UYWJsZShzb3VyY2VVdWlkLCAxLCAnVGV4dCcsICcnLCAnJywgJy8nKSkuY29udGVudDtcclxuXHJcblx0XHQvLyBjb25zb2xlLmxvZyhuZXdUZXh0T2JqZWN0KVxyXG5cclxuXHRcdG5ld1RleHRDb250ZW50T2JqZWN0LlRpdGxlID0gVGV4dENvbnRlbnQuc3Vic3RyaW5nKDAsIDI1KTtcclxuXHRcdG5ld1RleHRDb250ZW50T2JqZWN0LlRleHRDb250ZW50ID0gVGV4dENvbnRlbnQ7XHJcblx0XHRuZXdUZXh0Q29udGVudE9iamVjdC5UeXBlID0gdGV4dFR5cGU7XHJcblxyXG5cclxuXHRcdGF3YWl0IGFnZV9kYmlzLkNvbnRlbnRfVXBkYXRlV2l0aENvbnRlbnRPYmplY3QobmV3VGV4dENvbnRlbnRPYmplY3QpO1xyXG5cdFx0XHJcblx0XHQvLyBUT0RPIFxyXG5cdFx0Ly8gVVBEQVRFIFNPVVJDRSBQQU5FTCB4MyBcclxuXHRcdC8vIGF3YWl0IGZldGNoQ3VycmVudFNvdXJjZUNoaWxkcmVuVGhlbldyaXRlVG9TdGF0ZXMoKTtcclxuXHRcdC8vIHBvcHVsYXRlU291cmNlQ2hpbGRUYWJsZUZyb21TdGF0ZSgpO1xyXG5cdFx0YXdhaXQgc291cmNlLmxvYWRXaXRoQ29udGVudE9iamVjdChzb3VyY2VPYmplY3QpO1xyXG5cdFx0c291cmNlLmZvY3VzT25MYXN0Q2hpbGRSb3dUaXRsZSgpO1xyXG5cclxuXHRcdC8vIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0Ly8gfSwgMTAwKTtcclxuXHJcblx0fVxyXG5cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gcG9zdE5ld0NvZGVPYmplY3RUb0N1cnJlbnRTb3VyY2VBbmRGdWxsUmVsb2FkT2ZTb3VyY2VDaGlsZHJlbihUeXBlOiBzdHJpbmcsIENvZGVDb250ZW50OiBzdHJpbmcpIHtcclxuXHJcblx0bGV0IHNvdXJjZU9iamVjdDogYW55ID0gc291cmNlLmdldEN1cnJlbnRTb3VyY2VPYmplY3QoKTtcclxuXHRsZXQgc291cmNlVXVpZCA9IHNvdXJjZU9iamVjdC5VdWlkO1xyXG5cclxuXHRpZiAoc291cmNlT2JqZWN0ID09IHVuZGVmaW5lZCkge1xyXG5cdFx0Y29uc29sZS53YXJuKFwiVW5hYmxlIHRvIHBvc3QgbmV3IGNvZGUgb2JqZWN0LiBObyBzZWxlY3RlZCBzb3VyY2VPYmplY3QuXCIpXHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHQvLyBDb250ZW50X0luc2VydENoaWxkVXVpZFRhYmxlKFV1aWQsIGNoaWxkVGFibGUpXHJcblx0aWYgKHNvdXJjZVV1aWQgIT09IHVuZGVmaW5lZCkge1xyXG5cclxuXHRcdC8vIGxldCBuZXdDb2RlT2JqZWN0ID0gKGF3YWl0IGFnZV9kYmlzV2UuQ29udGVudF9JbnNlcnRDaGlsZFV1aWRUYWJsZShleHRlbnNpb25TdGF0ZUZyb250LmN1cnJlbnRfc291cmNlT2JqZWN0LlV1aWQsICdDb2RlJykpLkNvbnRlbnQ7XHJcblx0XHRsZXQgbmV3Q29kZUNvbnRlbnRPYmplY3QgPSAoYXdhaXQgYWdlX2RiaXMuQ29udGVudEVkZ2VfSW5zZXJ0QWRqYWNlbnRUb1V1aWRJbnRvVGFibGUoc291cmNlVXVpZCwgMSwgJ0NvZGUnLCAnJywgJycsICcvJykpLmNvbnRlbnQ7XHJcblxyXG5cdFx0Ly8gY29uc29sZS5sb2cobmV3VGV4dE9iamVjdClcclxuXHJcblx0XHRuZXdDb2RlQ29udGVudE9iamVjdC5UaXRsZSA9IENvZGVDb250ZW50LnN1YnN0cmluZygwLCAyNSk7XHJcblx0XHRuZXdDb2RlQ29udGVudE9iamVjdC5UeXBlID0gVHlwZTtcclxuXHRcdG5ld0NvZGVDb250ZW50T2JqZWN0LkNvZGVDb250ZW50ID0gQ29kZUNvbnRlbnQ7XHJcblxyXG5cclxuXHRcdGF3YWl0IGFnZV9kYmlzLkNvbnRlbnRfVXBkYXRlV2l0aENvbnRlbnRPYmplY3QobmV3Q29kZUNvbnRlbnRPYmplY3QpO1xyXG5cclxuXHJcblx0XHRhd2FpdCBzb3VyY2UubG9hZFdpdGhDb250ZW50T2JqZWN0KHNvdXJjZU9iamVjdCk7XHJcblx0XHRzb3VyY2UuZm9jdXNPbkxhc3RDaGlsZFJvd1RpdGxlKCk7XHJcblx0fVxyXG5cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gcG9zdE5ld0ZpbGVUb0N1cnJlbnRTb3VyY2VBbmRGdWxsUmVsb2FkT2ZTb3VyY2VDaGlsZHJlbihmaWxlIDogRmlsZSAsIHF1ZXJ5UGFyYW1zIDogYW55ICwgbWltZVR5cGUgOiBzdHJpbmcpIHtcclxuXHJcblx0bGV0IHNvdXJjZU9iamVjdDogYW55ID0gc291cmNlLmdldEN1cnJlbnRTb3VyY2VPYmplY3QoKTtcclxuXHRsZXQgc291cmNlVXVpZCA9IHNvdXJjZU9iamVjdC5VdWlkO1xyXG5cclxuXHRpZiAoc291cmNlT2JqZWN0ID09IHVuZGVmaW5lZCkge1xyXG5cdFx0Y29uc29sZS53YXJuKFwiVW5hYmxlIHRvIHBvc3QgbmV3IGZpbGUuIE5vIHNlbGVjdGVkIHNvdXJjZU9iamVjdC5cIilcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdC8vIGNvbnNvbGUubG9nKHNvdXJjZVV1aWQpXHJcblxyXG5cdC8vIENvbnRlbnRfSW5zZXJ0Q2hpbGRVdWlkVGFibGUoVXVpZCwgY2hpbGRUYWJsZSlcclxuXHRpZiAoc291cmNlVXVpZCAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG5cdFx0Ly8gbGV0IG5ld0ZpbGVPYmplY3QgPSAoYXdhaXQgYWdlX2RiaXNXZS5Db250ZW50X0luc2VydENoaWxkVXVpZFRhYmxlKHNvdXJjZVV1aWQsICdGaWxlJykpLkNvbnRlbnQ7XHJcblx0XHRsZXQgbmV3RmlsZUNvbnRlbnRPYmplY3QgPSAoYXdhaXQgYWdlX2RiaXMuQ29udGVudEVkZ2VfSW5zZXJ0QWRqYWNlbnRUb1V1aWRJbnRvVGFibGUoc291cmNlVXVpZCwgMSwgJ0ZpbGUnLCAnJywgJycsICcvJykpLmNvbnRlbnQ7XHJcblxyXG5cdFx0Ly8gY29uc29sZS5sb2cobmV3VGV4dE9iamVjdClcclxuXHJcblx0XHQvLyBuZXdGaWxlT2JqZWN0LlRpdGxlID0gQ29kZUNvbnRlbnQuc3Vic3RyaW5nKDAsIDI1KTtcclxuXHRcdC8vIG5ld0ZpbGVPYmplY3QuVHlwZSA9IFR5cGU7XHJcblx0XHQvLyBuZXdGaWxlT2JqZWN0LkNvZGVDb250ZW50ID0gQ29kZUNvbnRlbnQ7XHJcblxyXG5cclxuXHRcdC8vIGF3YWl0IGFnZV9kYmlzV2UuQ29udGVudF9VcGRhdGVPbkNvbnRlbnRPYmplY3QobmV3RmlsZU9iamVjdCk7XHJcblx0XHQvLyBhd2FpdCBhZ2VfZGJpc1dlLmZpbGVQb3N0KG5ld0ZpbGVDb250ZW50T2JqZWN0LlV1aWQsIGZpbGUsIHF1ZXJ5UGFyYW1zLCBtaW1lVHlwZSk7XHJcblx0XHRhd2FpdCBhZ2VfZGJpcy5Qb3N0X0ZpbGUobmV3RmlsZUNvbnRlbnRPYmplY3QuVXVpZCwgZmlsZSwgcXVlcnlQYXJhbXMsIG1pbWVUeXBlKTtcclxuXHJcblxyXG5cdFx0Ly8gVE9ETyBVUERBVEUgVVNJTkcgTkVXIFNUUlVDVFVSRVxyXG5cdFx0Ly8gYXdhaXQgZmV0Y2hDdXJyZW50U291cmNlQ2hpbGRyZW5UaGVuV3JpdGVUb1N0YXRlcygpO1xyXG5cdFx0Ly8gcG9wdWxhdGVTb3VyY2VDaGlsZFRhYmxlRnJvbVN0YXRlKCk7XHJcblx0XHRhd2FpdCBzb3VyY2UubG9hZFdpdGhDb250ZW50T2JqZWN0KHNvdXJjZU9iamVjdCk7XHJcblx0XHRzb3VyY2UuZm9jdXNPbkxhc3RDaGlsZFJvd1RpdGxlKCk7XHJcblxyXG5cdFx0Ly8gRm9jdXMgbGFzdCByb3cgdGl0bGUgZm9yIGVhc3kgZWRpdGluZyFcclxuXHRcdC8vIGxldCBfdGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdlX3NvdXJjZUNoaWxkVGFibGUtdGJvZHknKTtcclxuXHRcdC8qIF90Ym9keS5sYXN0RWxlbWVudENoaWxkLmxhc3RFbGVtZW50Q2hpbGQuZm9jdXMoKTsgKi9cclxuXHJcblx0fVxyXG5cdGVsc2Uge1xyXG5cdFx0Y29uc29sZS5sb2coJ05vIHNsZWN0ZWQgc291cmNlLiBDb3VsZG5cInQgUE9TVCBmaWxlLicpXHJcblx0fVxyXG5cclxufVxyXG5cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGtleWRvd25BY3RpdmVFeHRlbnNpb24oa2V5RXZlbnQgOiBLZXlib2FyZEV2ZW50KSB7XHJcblxyXG5cdGxldCBhY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcclxuXHJcblx0aWYgKGFjdGl2ZUVsZW1lbnQuaXNDb250ZW50RWRpdGFibGUpIHtcclxuXHRcdC8vIGNvbnNvbGUubG9nKCdFRElUQUJMRScpXHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHRpZiAoa2V5RXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xyXG5cdFx0c3RvcENsaXBib2FyZFRleHRDb25jYXRlbmF0aW9uKCk7XHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9jbGlwYm9hcmRDb250YWluZXJcIikuY2xhc3NMaXN0LmFkZChcImNvbGxhcHNlZFwiKTtcclxuXHR9XHJcblxyXG5cclxuXHJcblx0aWYgKGtleUV2ZW50LmFsdEtleSkge1xyXG5cclxuXHRcdHN3aXRjaCAoa2V5RXZlbnQua2V5KSB7XHJcblx0XHRcdGNhc2UgJ3AnOiAvLyBwcmludHMgdGhlIGN1cnJlbnQgcnBvamplY3Qgb2JqZWN0XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJ0ZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnQgPSBcIiwgdGV4dENvbmNhdGVuYXRpb25Db250ZW50KTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgJ3InOiAvLyByZWZyZXNoIHByb2plY3QgZGF0YVxyXG5cdFx0XHRcdHByb2plY3QucmVsb2FkQ3VycmVudFByb2plY3QoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgJ24nOiAvLyBuZXcgc291cmNlXHJcblx0XHRcdFx0cHJvamVjdC5pbnNlcnROZXdTb3VyY2VUb0FjdGl2ZVByb2plY3QoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgJ20nOiAvLyBtb3ZlXHJcblx0XHRcdFx0cHJvamVjdC50b2dnbGVFeHRlbnNpb25Mb2NhdGlvbigpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSAnLyc6IC8vIGdvIHRvIHNlYXJjaFxyXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3Byb2plY3RTZWFyY2hJbnB1dFwiKS5mb2N1cygpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSAneCc6XHJcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coJ0FsdCArIHgnKVxyXG5cdFx0XHRcdGxldCBjaGVja2VkID0gY2xpcGJvYXJkQ29kZUNoZWNrYm94LmNoZWNrZWQ7XHJcblx0XHRcdFx0aWYgKGNoZWNrZWQpIHtcclxuXHRcdFx0XHRcdGNsaXBib2FyZENvZGVDaGVja2JveC5jaGVja2VkID0gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0Y2xpcGJvYXJkQ29kZUNoZWNrYm94LmNoZWNrZWQgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0b2dnbGVTZWxlY3RDb2RlKCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlICdbJzpcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZygnQWx0ICsgWycpXHJcblx0XHRcdFx0c3RhcnRDbGlwYm9hcmRUZXh0Q29uY2F0ZW5hdGlvbigpO1xyXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX2NsaXBib2FyZENvbnRhaW5lclwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiY29sbGFwc2VkXCIpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG4gXHJcblx0XHRcdGNhc2UgJ0VudGVyJzpcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZygnQWx0ICsgRW50ZXInKVxyXG5cdFx0XHRcdGFkZE5ld0xpbmVUb0NhcHR1cmVDb25jYXRlbmF0aW9uQ29udGVudHMoKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSAnLSc6XHJcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coJ0FsdCArIEVudGVyJylcclxuXHRcdFx0XHRhZGRTcGFjZUNoYXJhY3RlclRvQ2FwdHVyZUNvbmNhdGVuYXRpb25Db250ZW50cygpOyBcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgJ10nOiBcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZygnQWx0ICsgXScpXHJcblxyXG5cdFx0XHRcdGlmIChjbGlwYm9hcmRDb2RlQ2hlY2tib3guY2hlY2tlZCkge1xyXG5cdFx0XHRcdFx0YXdhaXQgcG9zdE5ld0NvZGVPYmplY3RUb0N1cnJlbnRTb3VyY2VBbmRGdWxsUmVsb2FkT2ZTb3VyY2VDaGlsZHJlbihjbGlwYm9hcmRUZXh0VHlwZUlucHV0LnZhbHVlLCB0ZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnQpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0YXdhaXQgcG9zdE5ld1RleHROb2RlVG9DdXJyZW50U291cmNlQW5kRnVsbFJlbG9hZE9mU291cmNlQ2hpbGRyZW4oY2xpcGJvYXJkVGV4dFR5cGVJbnB1dC52YWx1ZSwgdGV4dENvbmNhdGVuYXRpb25Db250ZW50KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX2NsaXBib2FyZENvbnRhaW5lclwiKS5jbGFzc0xpc3QuYWRkKFwiY29sbGFwc2VkXCIpOyBcclxuXHRcdFx0XHRzdG9wQ2xpcGJvYXJkVGV4dENvbmNhdGVuYXRpb24oKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cdGlmIChrZXlFdmVudC5jdHJsS2V5KSB7XHJcblxyXG5cdFx0c3dpdGNoIChrZXlFdmVudC5rZXkpIHtcclxuXHRcdFx0Y2FzZSAnYCc6XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ0N0cmwgKyBgJylcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnLyc6XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ0N0cmwgKyAvJylcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnLic6XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ0N0cmwgKyAuJylcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnLCc6XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ0N0cmwgKyAsJylcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnXFxcXCc6XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ0N0cmwgKyBcXFxcJylcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnXFwnJzpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnQ3RybCArIFxcJycpXHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlICc7JzpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnQ3RybCArIDsnKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSAnWyc6XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ0N0cmwgKyBbJylcclxuXHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlICddJzpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnQ3RybCArIF0nKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZVNlbGVjdENvZGUoKSB7XHJcblx0aWYgKGNsaXBib2FyZENvZGVDaGVja2JveC5jaGVja2VkKSB7XHJcblx0XHRjbGlwYm9hcmRUZXh0VHlwZUlucHV0LmRpc2FibGVkID0gZmFsc2U7XHJcblx0fVxyXG5cdGVsc2Uge1xyXG5cdFx0Y2xpcGJvYXJkVGV4dFR5cGVJbnB1dC5kaXNhYmxlZCA9IHRydWU7XHJcblx0fVxyXG5cclxufVxyXG5cclxuXHJcblxyXG4vLyBUaGUgQW5udW5jaWF0aW9uIGlzIGFuIG9pbCBwYWludGluZyBieSB0aGUgRWFybHkgTmV0aGVybGFuZGlzaCBwYWludGVyIEhhbnMgTWVtbGluZy5JdCBkZXBpY3RzIHRoZSBBbm51bmNpYXRpb24sIHRoZSBhcmNoYW5nZWwgR2FicmllbCdzIGFubm91bmNlbWVudCB0byB0aGUgVmlyZ2luIE1hcnkgdGhhdCBzaGUgd291bGQgY29uY2VpdmUgYW5kIGJlY29tZSB0aGUgbW90aGVyIG9mIEplc3VzLCBkZXNjcmliZWQgaW4gdGhlIEdvc3BlbCBvZiBMdWtlLiBcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFwcGVuZENzcygpOiB2b2lkIHtcclxuXHRkb2N1bWVudC5oZWFkLmFwcGVuZChjbGlwYm9hcmRDc3MpO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNzcygpOiB2b2lkIHtcclxuXHRjbGlwYm9hcmRDc3MucmVtb3ZlKCk7XHJcbn0iLCJcblxuLy8gbGV0IGFnZV9hcGlVcmwgPSAnaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS92MDInO1xubGV0IGFnZV9hcGlVcmwgPSBcIlwiO1xuXG5cbi8vIGV4cG9ydCBmdW5jdGlvbiB0ZXN0KCkgOiB2b2lkIHtcblxuLy8gXHRjb25zb2xlLmxvZyhcIkxvYWRlZCBkYmktc2VuZC50c1wiKVxuXHRcbi8vIH1cblxuLy8gQUxXQVlTIFNUQVJUIE9VVCBCWSBHUkFCQklORyBUSEUgQVBJIEJBU0UgVVJMXG4oKCk9Pntcblx0XG5cdHNldEFwaVVybCgpLnRoZW4oKCkgPT4ge1xuXHRcdGNvbnNvbGUubG9nKCdMb2FkZWQgZGJpLXNlbmQudHMnKTtcblx0fSk7XG5cdFxufSkoKTtcblxuLyoqXG4gKiBcdEdyYWJzIHRoZSBiYXNlIHVybCBzdHJpbmcgZnJvbSB0aGUgbG9jYWwgd2ViZXh0ZW5zaW9uIHN0b3JhZ2UuIFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2V0QXBpVXJsKCl7XG5cdGJyb3dzZXIuc3RvcmFnZS5sb2NhbC5nZXQoXCJhcGlCYXNlU3RyaW5nXCIpLnRoZW4oKG9iamVjdCkgPT4ge1xuXHRcdGFnZV9hcGlVcmwgPSBvYmplY3QuYXBpQmFzZVN0cmluZztcblx0XHRjb25zb2xlLmxvZyhcIkxvYWRlZCBBUEkgQkFTRSBTVFJJTkdcIilcblx0XHRjb25zb2xlLmxvZyhcIm9iamVjdC5hcGlCYXNlU3RyaW5nID0gXCIsIG9iamVjdC5hcGlCYXNlU3RyaW5nKTtcblx0fSwgb25Mb2NhbFN0b3JhZ2VFcnJvcik7XG59XG5mdW5jdGlvbiBvbkxvY2FsU3RvcmFnZUVycm9yKGVycm9yOiBFcnJvcikge1xuXHRjb25zb2xlLmVycm9yKGVycm9yKTtcbn1cblxuXG5cbmJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKHJlcXVlc3QpIDogUHJvbWlzZTxhbnk+ID0+IHtcblx0Y29uc29sZS5sb2coXCJNZXNzYWdlIHJlY2lldmVkIGluIGRiaS1zZW5kLnRzIVwiKTtcblxuXHRpZiAocmVxdWVzdC5uYW1lID09PSBcInNldEFwaUJhc2VcIikge1xuXHRcdC8vIGNvbnNvbGUubG9nKFwiMTExMVwiKVxuXHRcdGFnZV9hcGlVcmwgPSByZXF1ZXN0LmFwaUJhc2VTdHJpbmc7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IHJlc3BvbnNlOiBcIkFwaSB1cGRhdGVkIGluIGNvbnRlbnQgc2NyaXB0LiBbZGJpLXNlbmQuanNdXCIsIG5ld0FwaVN0cmluZzogYWdlX2FwaVVybCB9KTtcblxuXHR9XG5cblxuXHRpZiAocmVxdWVzdC5uYW1lID09PSBcImdldEFwaUJhc2VcIikge1xuXHRcdC8vIGNvbnNvbGUubG9nKFwiMjIyMlwiKVxuXHRcdFxuXHRcdC8vIFByb21pc2UucmVzb2x2ZSA6IHN0YXRpYyBtZXRob2QgdGhhdCByZXR1cm5zIGEgcmVzb2x2ZWQgUHJvbWlzZSBvYmplY3Qgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgYXBpU3RyaW5nOiBhZ2VfYXBpVXJsIH0pO1xuXG5cdH1cblxufSk7XG5cbmNsYXNzIGFnZV9kYmlzIHtcblxuXHQvKiBcblx0XHRDT05URU5UXG5cdCovXG5cblx0c3RhdGljIGFzeW5jIENvbnRlbnRfSW5zZXJ0T25UYWJsZShUYWJsZU5hbWUgOiBzdHJpbmcpIHtcblx0XHRjb25zdCB1cmwgPSBhZ2VfYXBpVXJsICsgYC9jb250ZW50L0NvbnRlbnQtSW5zZXJ0T25UYWJsZT9UYWJsZT0ke1RhYmxlTmFtZX1gO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdQT1NUJ1xuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cdHN0YXRpYyBhc3luYyBDb250ZW50X1NlbGVjdE9uVXVpZChVdWlkIDogc3RyaW5nIHwgbnVtYmVyKSB7XG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnQvQ29udGVudC1TZWxlY3RPblV1aWQ/VXVpZD0ke1V1aWR9YDtcblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnR0VUJyxcblx0XHR9O1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiRmV0Y2ggcmV0dXJuZWQgXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIiBmcm9tIFwiICsgdXJsKTtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXHRzdGF0aWMgYXN5bmMgQ29udGVudF9VcGRhdGVXaXRoQ29udGVudE9iamVjdChjb250ZW50T2JqZWN0IDogYW55KSB7XG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnQvQ29udGVudC1VcGRhdGVXaXRoQ29udGVudE9iamVjdGA7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ1BVVCcsXG5cdFx0XHRoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLCB9LFxuXHRcdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkoY29udGVudE9iamVjdCksXG5cdFx0fTtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblx0c3RhdGljIGFzeW5jIENvbnRlbnRfRHJvcEZ1bGxPblV1aWQoVXVpZCA6IHN0cmluZyB8IG51bWJlcikge1xuXHRcdGxldCB1cmwgPSBhZ2VfYXBpVXJsICsgYC9jb250ZW50L0NvbnRlbnQtRHJvcEZ1bGxPblV1aWQ/VXVpZD0ke1V1aWR9YDtcblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnREVMRVRFJyxcblx0XHR9O1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiRmV0Y2ggcmV0dXJuZWQgXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIiBmcm9tIFwiICsgdXJsKTtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXHRzdGF0aWMgYXN5bmMgQ29udGVudF9TZWxlY3RPblRpdGxlTGlrZVN0cmluZyhzZWFyY2hTdHJpbmc6IHN0cmluZywgdGFibGVMaW1pdDogc3RyaW5nLCBpbmNsdWRlVGFibGU6IHN0cmluZywgb3JkZXJDb2x1bW46IHN0cmluZywgZGVzYzogc3RyaW5nKSA6IFByb21pc2U8YW55PiB7XG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnQvQ29udGVudC1TZWxlY3RPblRpdGxlTGlrZVN0cmluZz9zZWFyY2hTdHJpbmc9JHtzZWFyY2hTdHJpbmd9JnRhYmxlTGltaXQ9JHt0YWJsZUxpbWl0fSZpbmNsdWRlVGFibGU9JHtpbmNsdWRlVGFibGV9Jm9yZGVyQ29sdW1uPSR7b3JkZXJDb2x1bW59JmRlc2M9JHtkZXNjfWA7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0fTtcblxuXHRcdFxuXHRcdHRyeSB7XG5cdFx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Ly8gY29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblx0c3RhdGljIGFzeW5jIFJldmlld19JbnNlcnRTY2hlZHVsZU9uVXVpZChVdWlkIDogc3RyaW5nIHwgbnVtYmVyLCBzY2hlZHVsZVR5cGUgOiBzdHJpbmd8IG51bWJlcikge1xuXHRcdGNvbnN0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnQvUmV2aWV3LUluc2VydFNjaGVkdWxlT25VdWlkP1V1aWQ9JHtVdWlkfSZzY2hlZHVsZVR5cGU9JHtzY2hlZHVsZVR5cGV9YDtcblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnUE9TVCdcblx0XHR9O1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiRmV0Y2ggcmV0dXJuZWQgXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIiBmcm9tIFwiICsgdXJsKTtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXHRzdGF0aWMgYXN5bmMgUmV2aWV3X1NlbGVjdEN1cnJlbnRSZXZpZXcoKSB7XG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnQvUmV2aWV3LVNlbGVjdEN1cnJlbnRSZXZpZXdgO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cblxuXG5cblxuXHQvKiBcblx0XHRcdENPTlRFTlQgRURHRVxuXHQqL1xuXHRzdGF0aWMgYXN5bmMgQ29udGVudEVkZ2VfSW5zZXJ0QWRqYWNlbnRUb1V1aWRJbnRvVGFibGUoVXVpZDogc3RyaW5nIHwgbnVtYmVyLCBEaXJlY3RlZDogc3RyaW5nIHwgbnVtYmVyLCBUYWJsZTogc3RyaW5nLCBUeXBlOiBzdHJpbmcsIE9yZGVyOiBzdHJpbmcgfCBudW1iZXIsIFBhdGg6IHN0cmluZykge1xuXHRcdGxldCB1cmwgPSBhZ2VfYXBpVXJsICsgYC9jb250ZW50ZWRnZS9Db250ZW50RWRnZS1JbnNlcnRBZGphY2VudFRvVXVpZEludG9UYWJsZT9VdWlkPSR7VXVpZH0mRGlyZWN0ZWQ9JHtEaXJlY3RlZH0mVGFibGU9JHtUYWJsZX0mVHlwZT0ke1R5cGV9Jk9yZGVyPSR7T3JkZXJ9JlBhdGg9JHtQYXRofWA7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cdHN0YXRpYyBhc3luYyBDb250ZW50RWRnZV9TZWxlY3RDaGlsZE9mVXVpZChVdWlkIDogc3RyaW5nIHwgbnVtYmVyKSB7XG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnRlZGdlL0NvbnRlbnRFZGdlLVNlbGVjdENoaWxkT2ZVdWlkP1V1aWQ9JHtVdWlkfWA7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0fTtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBhc3luYyBDb250ZW50RWRnZV9TZWxlY3RQYXJlbnRPZlV1aWQoVXVpZCA6IHN0cmluZyB8IG51bWJlcikge1xuXHRcdGxldCB1cmwgPSBhZ2VfYXBpVXJsICsgYC9jb250ZW50ZWRnZS9Db250ZW50RWRnZS1TZWxlY3RQYXJlbnRPZlV1aWQ/VXVpZD0ke1V1aWR9YDtcblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnR0VUJyxcblx0XHR9O1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiRmV0Y2ggcmV0dXJuZWQgXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIiBmcm9tIFwiICsgdXJsKTtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXHRzdGF0aWMgYXN5bmMgQ29udGVudEVkZ2VfU2VsZWN0VW5kaXJlY3RlZE9mVXVpZChVdWlkIDogc3RyaW5nIHwgbnVtYmVyKSB7XG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnRlZGdlL0NvbnRlbnRFZGdlLVNlbGVjdFVuZGlyZWN0ZWRPZlV1aWQ/VXVpZD0ke1V1aWR9YDtcblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnR0VUJyxcblx0XHR9O1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiRmV0Y2ggcmV0dXJuZWQgXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIiBmcm9tIFwiICsgdXJsKTtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXHRzdGF0aWMgYXN5bmMgQ29udGVudEVkZ2VfU2VsZWN0QWRqYWNlbnRPZlV1aWQoVXVpZCA6IHN0cmluZyB8IG51bWJlcikge1xuXHRcdGxldCB1cmwgPSBhZ2VfYXBpVXJsICsgYC9jb250ZW50ZWRnZS9Db250ZW50RWRnZS1TZWxlY3RBZGphY2VudE9mVXVpZD9VdWlkPSR7VXVpZH1gO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cblxuXG5cblx0LyogXG5cdFx0XHRcdEZJTEVTXG5cdCovXG5cblx0c3RhdGljIGFzeW5jIFBvc3RfRmlsZShVdWlkOiBzdHJpbmcgfCBudW1iZXIsIGZpbGU6IEZpbGUsIHF1ZXJ5UGFyYW1zOiBzdHJpbmcsIG1pbWVUeXBlOiBzdHJpbmcpIHtcblxuXHRcdGxldCB1cmwgPSBhZ2VfYXBpVXJsICsgYC9maWxlLyR7VXVpZH0/YDtcblx0XHQvLyBjb25zb2xlLmxvZyh1cmwpXG5cblxuXHRcdGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHF1ZXJ5UGFyYW1zKSkge1xuXHRcdFx0Ly8gY29uc29sZS5sb2coYCR7a2V5fTogJHt2YWx1ZX1gKTtcblx0XHRcdHVybCArPSBgJHtrZXl9PSR7dmFsdWV9JmA7XG5cdFx0XHQvLyBib2R5QXJyYXkucHVzaCh2YWx1ZSk7XG5cdFx0fVxuXHRcdHVybCA9IHVybC5zbGljZSgwLCAtMSk7XG5cblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFwiQ29udGVudC1UeXBlXCI6IG1pbWVUeXBlLFxuXHRcdFx0fSxcblx0XHRcdGJvZHk6IGZpbGUsXG5cdFx0fTtcblx0XHQvLyBjb25zb2xlLmxvZyhvcHRpb25zKVxuXHRcdC8vIGNvbnNvbGUubG9nKHVybClcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRyZXR1cm4gZGF0YTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ZBSUxFRCBQT1NUIEZST006IFBvc3RfRmlsZSBpbiBkYmlzJylcblx0XHRcdH1cblx0XHRcdC8vIGNvbnNvbGUudGFibGUoZGF0YSk7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cblxuXG5cdHN0YXRpYyBhc3luYyBHZXRfRmlsZShVdWlkOiBzdHJpbmcgfCBudW1iZXIpOiBQcm9taXNlPEZpbGUgfCBhbnlbXT4ge1xuXG5cdFx0Y29uc3QgdXJsID0gYWdlX2FwaVVybCArIGAvZmlsZS9gICsgVXVpZDtcblx0XHRjb25zdCBvcHRpb25zID0geyBtZXRob2Q6ICdHRVQnIH07XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0Ly8gY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cblx0XHRcdC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlLmJvZHkpIFxuXHRcdFx0bGV0IGJsb2IgPSBhd2FpdCByZXNwb25zZS5ibG9iKClcblx0XHRcdGxldCBjb250ZW50VHlwZSA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKTtcblx0XHRcdGxldCBleHRlbnNpb24gPSBjb250ZW50VHlwZS5zcGxpdCgnLycpWzFdO1xuXHRcdFx0Ly8gY29uc29sZS5sb2coJ0ZJTEVGSUxFOicsIHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSlcblx0XHRcdGxldCBmaWxlID0gYXdhaXQgbmV3IEZpbGUoW2Jsb2JdLCBgJHtVdWlkfS4ke2V4dGVuc2lvbn1gKVxuXHRcdFx0cmV0dXJuIGZpbGU7XG5cdFx0XHQvLyAudGhlbihibG9iID0+IG5ldyBGaWxlKFtibG9iXSwgJ3Rlc3RmaWxlbmFtZS5maWxlJykpXG5cdFx0XHQvLyAudGhlbihmaWxlID0+IGZpbGUpXG5cdFx0XHQvLyAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpXG5cdFx0XHQvLyAudGhlbihmaWxlID0+IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSkpXG5cdFx0XHQvLyAudGhlbihmaWxlID0+IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSkpXG5cdFx0XHQvLyAudGhlbihmaWxlVXJsID0+IHdpbmRvdy5vcGVuKGZpbGVVcmwsICdfYmxhbmsnKSlcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Ly8gY29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxuXG5cblxuXHRzdGF0aWMgYXN5bmMgUHV0X0ZpbGUoVXVpZDogc3RyaW5nIHwgbnVtYmVyLCBmaWxlOiBGaWxlLCBxdWVyeVBhcmFtczogc3RyaW5nLCBtaW1lVHlwZTogc3RyaW5nKSB7XG5cblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvZmlsZS8ke1V1aWR9P2A7XG5cdFx0Ly8gY29uc29sZS5sb2codXJsKVxuXG5cblx0XHRmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhxdWVyeVBhcmFtcykpIHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKGAke2tleX06ICR7dmFsdWV9YCk7XG5cdFx0XHR1cmwgKz0gYCR7a2V5fT0ke3ZhbHVlfSZgO1xuXHRcdFx0Ly8gYm9keUFycmF5LnB1c2godmFsdWUpO1xuXHRcdH1cblx0XHR1cmwgPSB1cmwuc2xpY2UoMCwgLTEpO1xuXG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcIkNvbnRlbnQtVHlwZVwiOiBtaW1lVHlwZSxcblx0XHRcdH0sXG5cdFx0XHRib2R5OiBmaWxlLFxuXHRcdH07XG5cdFx0Ly8gY29uc29sZS5sb2cob3B0aW9ucylcblx0XHQvLyBjb25zb2xlLmxvZyh1cmwpXG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0aWYgKHJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdHJldHVybiBkYXRhO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignRkFJTEVEIFBVVCBGUk9NOiBQdXRfRmlsZSBpbiBkYmlzJylcblx0XHRcdH1cblx0XHRcdC8vIGNvbnNvbGUudGFibGUoZGF0YSk7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cblxuXG5cdHN0YXRpYyBhc3luYyBEZWxldGVfRmlsZShVdWlkIDogc3RyaW5nIHwgbnVtYmVyKSB7XG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2ZpbGUvJHtVdWlkfWA7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ0RFTEVURScsXG5cdFx0fTtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXG5cblxufTtcblxuZXhwb3J0IHtcblx0YWdlX2RiaXMsXG59IiwiXG4vLyBpbXBvcnQgeyB0ZXN0IH0gZnJvbSBcIi4vZGJpLXNlbmRcIlxuLy8gdGVzdCgpO1xuXG5cblxuY29uc3QgaHRtbEZvbGRlciA9ICdodG1sLyc7XG5jb25zdCBjc3NGb2xkZXIgPSAnY3NzLyc7XG5cblxuXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hIdG1sKGZpbGVuYW1lIDogc3RyaW5nKSA6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgXG4gICAgICAgIGxldCB1cmwgPSBicm93c2VyLnJ1bnRpbWUuZ2V0VVJMKFxuICAgICAgICAgICAgaHRtbEZvbGRlciArIGZpbGVuYW1lXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gdGhpcyBpcyB0aCBlcHJvbWlzZSB0aGF0IHdlIHJldHVybiBhbmQgbGV0dGluZyB0aGUgZmV0Y2ggZnVuY3Rpb24gaGFuZGxlIHJlc29sdmluZyB0aGUgcHJvbWlzZVxuICAgICAgICByZXR1cm4gZmV0Y2godXJsKVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UudGV4dCgpKVxuICAgICAgICAgICAgLnRoZW4odGV4dCA9PiB0ZXh0KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IFwiRXJyb3IgaW4gJ2ZldGNoSHRtbCcuIEZpbGU6ICBmZXRjaGVyLnRzIFwiKVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBmZXRjaENzcyhmaWxlbmFtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcblxuICAgIGxldCB1cmwgPSBicm93c2VyLnJ1bnRpbWUuZ2V0VVJMKFxuICAgICAgICBjc3NGb2xkZXIgKyBmaWxlbmFtZVxuICAgICk7XG5cbiAgICAvLyB0aGlzIGlzIHRoIGVwcm9taXNlIHRoYXQgd2UgcmV0dXJuIGFuZCBsZXR0aW5nIHRoZSBmZXRjaCBmdW5jdGlvbiBoYW5kbGUgcmVzb2x2aW5nIHRoZSBwcm9taXNlXG4gICAgcmV0dXJuIGZldGNoKHVybClcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UudGV4dCgpKVxuICAgICAgICAudGhlbih0ZXh0ID0+IHRleHQpXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBcIkVycm9yIGluICdmZXRjaENzcycuIEZpbGU6IGZldGNoZXIudHNcIilcbn1cblxuXG50eXBlIFRmZXRjaGVyID0ge1xuICAgIGZldGNoSHRtbCA6IFByb21pc2U8c3RyaW5nPlxufVxuXG5leHBvcnQgdHlwZSB7XG4gICAgVGZldGNoZXJcbn07XG5cbi8vIGV4cG9ydCB7XG4vLyAgICAgZmV0Y2hIdG1sIDogXG4vLyB9XG5cbiIsImltcG9ydCAqIGFzIGZldGNoZXIgZnJvbSBcIi4vZmV0Y2hlclwiO1xuaW1wb3J0ICogYXMgcHJvamVjdHMgZnJvbSBcIi4vcHJvamVjdHMvcHJvamVjdHNcIjtcbmltcG9ydCAqIGFzIHNvdXJjZSBmcm9tIFwiLi9zb3VyY2Uvc291cmNlXCI7XG5pbXBvcnQgKiBhcyBjbGlwYm9hcmQgZnJvbSBcIi4vY2xpcGJvYXJkXCI7XG5cbmltcG9ydCB7IEhUTUxQcm9qZWN0Q2hpbGRSb3cgfSBmcm9tIFwiLi9wcm9qZWN0cy9wcm9qZWN0X2RvbVwiO1xuXG4vLyBpbXBvcnQgeyBhZ2VfZGJpcyB9IGZyb20gXCIuL2RiaS1zZW5kXCI7XG5cbmxldCBvdmVybGF5Q29udGFpbmVyIDogRWxlbWVudDtcbmxldCBvdmVybGF5Q3NzOiBIVE1MRWxlbWVudDtcblxubGV0IHRhYmxlQ3NzOiBIVE1MRWxlbWVudDtcblxuLy8gb3RoZXIgY2FjaGVkIGVsZW1lbnRzXG5sZXQgY29udGV4dE92ZXJsYXk6IEVsZW1lbnQ7XG5cbmxldCBzaWRlUGFuZWw6IEVsZW1lbnQ7XG5cblxuZnVuY3Rpb24gaW5pdE92ZXJsYXkoKSA6IHZvaWR7XG4gICAgY29uc29sZS5sb2coJ09WRVJMQVkgVFMgSU5JVCcpO1xuXG4gICAgb3ZlcmxheUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG92ZXJsYXlDb250YWluZXIuaWQgPSBcImFnZV9vdmVybGF5Q29udGFpbmVyXCI7IFxuICAgIG92ZXJsYXlDb250YWluZXIuc2V0QXR0cmlidXRlKFwic3BlbGxjaGVja1wiLFwiZmFsc2VcIik7XG4gICAgb3ZlcmxheUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXh0ZW5zaW9uQ2xpY2tIYW5kbGVyKTtcbiAgICBvdmVybGF5Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c2luXCIsIG92ZXJsYXlGb2N1c2luKTtcblxuICAgIG92ZXJsYXlDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRzb3VyY2VcIiwgKGV2ZW50IDogQ3VzdG9tRXZlbnQpID0+IHtcbiAgICAgICAgc291cmNlLmxvYWRXaXRoQ29udGVudE9iamVjdChldmVudC5kZXRhaWwuY29udGVudE9iamVjdCk7XG4gICAgfSk7XG4gICAgb3ZlcmxheUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibmV3c291cmNlXCIsIChldmVudDogQ3VzdG9tRXZlbnQpID0+IHtcbiAgICAgICAgc291cmNlLmxvYWRXaXRoQ29udGVudE9iamVjdChldmVudC5kZXRhaWwuY29udGVudE9iamVjdCk7XG4gICAgICAgIHNvdXJjZS5zaG93U291cmNlUHJvcGVydGllcygpOyAvLyBNYWtlIHN1cmUgd2UgZ28gdG8gdGhlIHByb3BlcnRpZXMgdGFiIHdoZW4gY3JhdGluZyBhIG5ldyBzb3VyY2UhXG4gICAgfSk7XG4gICAgb3ZlcmxheUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibmV3cHJvamVjdFwiLCAoZXZlbnQ6IEN1c3RvbUV2ZW50KSA9PiB7fSk7XG5cblxuICAgIGZldGNoZXIuZmV0Y2hIdG1sKFwib3ZlcmxheS5odG1sXCIpXG4gICAgICAgIC50aGVuKGh0bWwgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJIVE1MIDogXCIsIGh0bWwpXG4gICAgICAgICAgICBvdmVybGF5Q29udGFpbmVyLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgICAgICBjb250ZXh0T3ZlcmxheSA9IG92ZXJsYXlDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2VfY29udGV4dE92ZXJsYXlcIik7XG4gICAgICAgICAgICAvLyBjb250ZXh0T3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGlkZUNvbnRleHRNZW51cyk7XG4gICAgICAgICAgICBzaWRlUGFuZWwgPSBvdmVybGF5Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX292ZXJsYXlSaWdodFBhbmVsXCIpO1xuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHByb2plY3RzLmluaXRQcm9qZWN0cyhzaWRlUGFuZWwsIGNvbnRleHRPdmVybGF5LnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX21vcmVQcm9qZWN0T3B0aW9uc0NvbnRleHRNZW51XCIpKTsgLy8gUGFzcyB0aGUgY29udGV4dCBtZW51IVxuICAgICAgICAgICAgc291cmNlLmluaXRTb3VyY2VDb250YWluZXIoc2lkZVBhbmVsLCBjb250ZXh0T3ZlcmxheS5xdWVyeVNlbGVjdG9yKFwiI2FnZV9tb3JlU291cmNlT3B0aW9uc0NvbnRleHRNZW51XCIpKTsgLy8gUGFzcyB0aGUgY29udGV4dCBtZW51IVxuICAgICAgICAgICAgY2xpcGJvYXJkLmluaXRDbGlwYm9hcmQoc2lkZVBhbmVsKTtcbiAgICAgICAgfSlcblxuICAgIG92ZXJsYXlDc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gICAgb3ZlcmxheUNzcy5pZCA9IFwiYWdlX292ZXJsYXlTdHlsZVwiO1xuICAgIGZldGNoZXIuZmV0Y2hDc3MoXCJvdmVybGF5LmNzc1wiKVxuICAgIC50aGVuKGNzcyA9PiB7XG4gICAgICAgIG92ZXJsYXlDc3MuaW5uZXJUZXh0ID0gY3NzO1xuICAgIH0pXG5cbiAgICB0YWJsZUNzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgICB0YWJsZUNzcy5pZCA9IFwiYWdlX3RhYmxlU3R5bGVcIjtcbiAgICBmZXRjaGVyLmZldGNoQ3NzKFwidGFibGVzLmNzc1wiKSBcbiAgICAgICAgLnRoZW4oY3NzID0+IHtcbiAgICAgICAgICAgIHRhYmxlQ3NzLmlubmVyVGV4dCA9IGNzcztcbiAgICAgICAgfSlcblxufVxuXG5cbi8vIG1ha2Ugc3VyZSB0aGF0IGVtcHR5IGVsZW1lbnQgYXJlIHBvcHVsYXRlZCB3aXRoIGRlZmF1bHQgZWRpdGFibGUgZWxlbWVudHNcbmZ1bmN0aW9uIG92ZXJsYXlGb2N1c2luKGV2ZW50OiBGb2N1c0V2ZW50KTogdm9pZCB7XG4gICAgbGV0IGV2ZW50VGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuXG4gICAgaWYgKGV2ZW50VGFyZ2V0LmlzQ29udGVudEVkaXRhYmxlICYmIGV2ZW50VGFyZ2V0LnRleHRDb250ZW50ID09IFwiXCIpIHtcbiAgICAgICAgLy8gZXZlbnRUYXJnZXQuaW5uZXJIVE1MID0gXCI8ZGl2PjwvZGl2Pjxicj5cIjsgLy8gbm90IHdvcmtpbmcuLiBNYXliZSBpZiBJIGhhdmUgdGV4dCBub3QgY2VudGVyZWQgaW4gZWxtZWVudC4uXG4gICAgfVxufVxuXG5mdW5jdGlvbiBleHRlbnNpb25DbGlja0hhbmRsZXIoZXZlbnQgOiBNb3VzZUV2ZW50KXtcblxuICAgIGxldCBldmVudFRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAvLyBjb25zb2xlLmxvZygnX15fXl9eX15fXl9eJywgZXZlbnRUYXJnZXQuaWQpO1xuICAgIFxuICAgIC8qIFxuICAgICAgICBOT1RFOiBUSElTIEhBUyBCRUVOIE1PVkVEIFRPIElUUyBPV04gRVZFTlQhXG4gICAgKi9cbiAgICAvLyBpZiAoZXZlbnRUYXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJhZ2VfcHJvamNoaWxkVGFibGVSb3dcIikpe1xuICAgIC8vICAgICBsZXQgcHJvamVjdENoaWxkUm93ID0gZXZlbnRUYXJnZXQucGFyZW50RWxlbWVudCBhcyBIVE1MUHJvamVjdENoaWxkUm93O1xuICAgIC8vICAgICAvLyBjb25zb2xlLmxvZygnQ2xpY2tlZCBvbiBjaGlsZCByb3cgd2l0aCB1dWlkID0gJywgcHJvamVjdENoaWxkUm93LkNvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnQuVXVpZCk7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKFwiVE9ETzogTE9BRCBDTElDS0VEIFNPVVJDRVMhIFwiLCBwcm9qZWN0Q2hpbGRSb3cuQ29udGVudEVkZ2VPYmplY3QuY29udGVudCk7XG4gICAgICAgIFxuICAgIC8vIH1cbn1cblxuXG5mdW5jdGlvbiBzaG93T3ZlcmxheSgpIDogdm9pZHtcbiAgICBkb2N1bWVudC5ib2R5Lmxhc3RFbGVtZW50Q2hpbGQuYWZ0ZXIob3ZlcmxheUNvbnRhaW5lcik7XG5cbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZChvdmVybGF5Q3NzKTtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZCh0YWJsZUNzcyk7XG4gICAgcHJvamVjdHMuYXBwZW5kQ3NzKCk7XG4gICAgc291cmNlLmFwcGVuZENzcygpO1xuICAgIGNsaXBib2FyZC5hcHBlbmRDc3MoKTtcbiAgICAvLyBmZXRjaGVyLmZldGNoSHRtbChcIm92ZXJsYXkuaHRtbFwiKVxuICAgIC8vICAgICAudGhlbihodG1sID0+IG92ZXJsYXlDb250YWluZXIuaW5uZXJIdG1sID0gaHRtbClcbn1cblxuXG5mdW5jdGlvbiBoaWRlT3ZlcmxheSgpIDogdm9pZCB7XG4gICAgb3ZlcmxheUNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICBvdmVybGF5Q3NzLnJlbW92ZSgpO1xuXG4gICAgdGFibGVDc3MucmVtb3ZlKCk7XG5cbiAgICBwcm9qZWN0cy5yZW1vdmVDc3MoKTtcbiAgICBzb3VyY2UucmVtb3ZlQ3NzKCk7XG4gICAgY2xpcGJvYXJkLnJlbW92ZUNzcygpO1xufVxuXG5cblxuXG5leHBvcnQge1xuICAgIGluaXRPdmVybGF5LFxuICAgIHNob3dPdmVybGF5LFxuICAgIGhpZGVPdmVybGF5LFxufSIsIlxuaW1wb3J0IHsgYWdlX2RiaXMgfSBmcm9tIFwiLi4vZGJpLXNlbmRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBIVE1MUHJvamVjdFRhYmxlUm93IGV4dGVuZHMgSFRNTFRhYmxlUm93RWxlbWVudCB7XG4gICAgbm9kZU9iamVjdDogYW55O1xufVxuZXhwb3J0IGludGVyZmFjZSBIVE1MVGFibGVDb250ZW50T2JqZWN0IGV4dGVuZHMgSFRNTFRhYmxlRWxlbWVudCB7XG4gICAgY29udGVudE9iamVjdDogYW55O1xufVxuZXhwb3J0IGludGVyZmFjZSBIVE1MUHJvamVjdENoaWxkUm93IGV4dGVuZHMgSFRNTFRhYmxlUm93RWxlbWVudCB7XG4gICAgQ29udGVudEVkZ2VPYmplY3Q6IGFueTtcbiAgICBpc1Byb2plY3RDaGlsZFJvdyA6IGJvb2xlYW47XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHBvcHVsYXRlUHJvcGVydGllc1RhYmxlKHByb3BlcnRpZXNUYWJsZTogSFRNTFRhYmxlQ29udGVudE9iamVjdCwgcHJvamVjdENvbnRlbnRPYmplY3Q6IGFueSkge1xuXG4gICAgY29uc29sZS5sb2coXCJwcm9qZWN0Q29udGVudE9iamVjdCA9IFwiLCBwcm9qZWN0Q29udGVudE9iamVjdClcblxuICAgIC8vIGxldCBwcm9qZWN0T2JqZWN0ID0gZXh0ZW5zaW9uU3RhdGVGcm9udC5jdXJyZW50X3Byb2plY3RPYmplY3Q7XG4gICAgbGV0IHByb2plY3RPYmplY3QgPSBwcm9qZWN0Q29udGVudE9iamVjdDtcblxuICAgIHByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0ID0gcHJvamVjdENvbnRlbnRPYmplY3Q7XG4gICAgLy8gcHJvcGVydGllc1RhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCBwcm9qZWN0UHJvcGVydHlGb2N1c091dClcblxuICAgIC8vIGV4dGVuc2lvblN0YXRlRnJvbnQuY3VycmVudF9wcm9qZWN0VXVpZCA9IHByb2plY3RPYmplY3QuVXVpZDtcblxuICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhYS1wcm9qZWN0VGl0bGUnKS50ZXh0Q29udGVudCA9IHByb2plY3RPYmplY3QuVGl0bGU7XG5cbiAgICAvLyBsZXQgdGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdlX3Byb2plY3RQcm9wZXJ0aWVzVGFibGUtdGJvZHknKTtcbiAgICBsZXQgdGJvZHkgPSBwcm9wZXJ0aWVzVGFibGUucXVlcnlTZWxlY3RvcihcInRib2R5XCIpO1xuICAgIHRib2R5LmlubmVySFRNTCA9ICcnO1xuXG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBwcm9qZWN0T2JqZWN0KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGAke2tleX06ICR7cHJvamVjdE9iamVjdFtrZXldfWApO1xuICAgICAgICBpZiAoa2V5ID09PSAnVHlwZScgfHwga2V5ID09PSAnVGl0bGUnIHx8IGtleSA9PT0gJ0dvYWwnKSB7XG5cbiAgICAgICAgICAgIHRib2R5LmlubmVySFRNTCArPSBgXG5cdFx0XG5cdFx0XHQ8dHI+XG5cdFx0XHRcdDx0ZCBpZD1hZ2VfcHJvalByb3BUYWJsZS0ke2tleX0ta2V5IGNsYXNzPVwiYWdlX2VsZW1lbnRcIiA+JHtrZXl9PC90ZD5cblx0XHRcdFx0PHRkIGlkPWFnZV9wcm9qUHJvcFRhYmxlLSR7a2V5fS12YWx1ZSBjbGFzcz1cImFnZV9lbGVtZW50XCIgY29udGVudGVkaXRhYmxlPVwidHJ1ZVwiID4ke3Byb2plY3RPYmplY3Rba2V5XX08L3RkPlxuXHRcdFx0PC90cj5cblx0XHRcblx0XHRgO1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0Ym9keS5pbm5lckhUTUwgKz0gYFxuXHRcdFxuXHRcdFx0PHRyPlxuXHRcdFx0XHQ8dGQgaWQ9YWdlX3Byb2pQcm9wVGFibGUtJHtrZXl9LWtleSBjbGFzcz1cImFnZV9lbGVtZW50XCIgPiR7a2V5fTwvdGQ+XG5cdFx0XHRcdDx0ZCBpZD1hZ2VfcHJvalByb3BUYWJsZS0ke2tleX0tdmFsdWUgY2xhc3M9XCJhZ2VfZWxlbWVudFwiPiR7cHJvamVjdE9iamVjdFtrZXldfTwvdGQ+XG5cdFx0XHQ8L3RyPlxuXHRcdFxuXHRcdGA7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8vIGNvbnNvbGUubG9nKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNhZ2VfcHJvamVjdFByb3BlcnRpZXNUYWJsZSB0Ym9keSB0cicpKVxuICAgIC8vIGxldCBlZGl0YWJsZVByb2plY3RQcm9wZXJ0eVRkczogTm9kZUxpc3RPZjxFbGVtZW50PiA9IHRib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hZ2VfZWRpdGFibGVQcm9qZWN0UHJvcGVydHknKTtcbiAgICAvLyBjb25zb2xlLmxvZyhlZGl0YWJsZVByb2plY3RQcm9wZXJ0eVRkKVxuXG4gICAgLy8gQXJyYXkuZnJvbShlZGl0YWJsZVByb2plY3RQcm9wZXJ0eVRkcykuZm9yRWFjaCgoZWRpdGFibGVQcm9wZXJ0eUVsZW1lbnQpID0+IHtcbiAgICAvLyAgICAgZWRpdGFibGVQcm9wZXJ0eUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCBlZGl0YWJsZVByb2plY3RQcm9wZXJ0eUZvY3VzT3V0KVxuICAgIC8vIH0pXG4gICAgLy8gZm9yIChsZXQgZWRpdGFibGVQcm9qZWN0UHJvcGVydHlUZCBvZiBlZGl0YWJsZVByb2plY3RQcm9wZXJ0eVRkcykge1xuICAgIC8vICAgICAvLyBjb25zb2xlLmxvZyhlZGl0YWJsZVByb2plY3RQcm9wZXJ0eVRkLnRleHRDb250ZW50KTtcbiAgICAvLyAgICAgLy8gY29uc29sZS5sb2cocHJvcGVydHlSb3cudGV4dENvbnRlbnQubGVuZ3RoKVxuXG4gICAgLy8gICAgIC8vIGVkaXRhYmxlUHJvamVjdFByb3BlcnR5VGQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCByZWFkUHJvamVjdFByb3BlcnRpZXNGcm9tRG9tQW5kV3JpdGVQdXQpXG4gICAgLy8gICAgIGVkaXRhYmxlUHJvamVjdFByb3BlcnR5VGQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCBlZGl0YWJsZVByb2plY3RQcm9wZXJ0eUZvY3VzT3V0KVxuICAgIC8vICAgICAvLyBlZGl0YWJsZVByb2plY3RQcm9wZXJ0eVRkLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgcG9zdFByb2plY3RQcm9wZXJ0aWVzKVxuICAgIC8vIH1cblxufVxuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIHBvcHVsYXRlQ2hpbGRyZW5UYWJsZSh0YWJsZSA6IEhUTUxUYWJsZUVsZW1lbnQsIHByb2plY3RDaGlsZENvbnRlbnRFZGdlcyA6IGFueSl7XG5cbiAgICAvLyBsZXQgcHJvamVjdENoaWxkQ29udGVudEVkZ2VzID0gZXh0ZW5zaW9uU3RhdGVGcm9udC5jdXJyZW50X3Byb2plY3RDaGlsZENvbnRlbnRFZGdlcztcblxuICAgIC8vIGV4dGVuc2lvblN0YXRlRnJvbnQuY3VycmVudF9wcm9qZWN0VXVpZCA9IHByb2plY3RPYmplY3QuVXVpZDtcblxuICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhYS1wcm9qZWN0VGl0bGUnKS50ZXh0Q29udGVudCA9IHByb2plY3RPYmplY3QuVGl0bGU7XG5cblxuICAgIGxldCB0Ym9keSA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoJ3Rib2R5Jyk7XG5cbiAgICB0Ym9keS5pbm5lckhUTUwgPSAnJztcblxuICAgIGZvciAoY29uc3QgY29udGVudEVkZ2Ugb2YgcHJvamVjdENoaWxkQ29udGVudEVkZ2VzKSB7XG5cbiAgICAgICAgbGV0IG5ld1Byb2plY3RDaGlsZFJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykgYXMgSFRNTFByb2plY3RDaGlsZFJvdztcblxuICAgICAgICBuZXdQcm9qZWN0Q2hpbGRSb3cuaXNQcm9qZWN0Q2hpbGRSb3cgPSB0cnVlO1xuXG4gICAgICAgIC8vIEN1c3RvbSBldmVudCB0byBzcGVjaWZpY2FsbHkgbG9hZCB0aGUgc291cmNlIGZyb20gdGhlIG92ZXJsYXktdHMgbW9kdWxlXG4gICAgICAgIG5ld1Byb2plY3RDaGlsZFJvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50IDogRXZlbnQpID0+IHtcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vd3d3LnJlZGRpdC5jb20vci93ZWJkZXYvY29tbWVudHMvcmhmMm11L2ZyaWVuZGx5X3JlbWluZGVyX3VzZV9ldmVudGN1cnJlbnR0YXJnZXRfbm90L1xuICAgICAgICAgICAgbGV0IGVsZW1lbnRDdXJyZW50VGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldCBhcyBIVE1MUHJvamVjdENoaWxkUm93O1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJldmVudC5jdXJyZW50VGFyZ2V0ID0gXCIsIGVsZW1lbnRDdXJyZW50VGFyZ2V0KVxuICAgICAgICAgICAgbGV0IGxvYWRzb3VyY2VFdmVudCA9IG5ldyBDdXN0b21FdmVudCggXCJsb2Fkc291cmNlXCIsIHsgXG4gICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkZXRhaWw6IHtjb250ZW50T2JqZWN0OiBlbGVtZW50Q3VycmVudFRhcmdldC5Db250ZW50RWRnZU9iamVjdC5jb250ZW50fSxcblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGV0IF90aGlzID0gdGhpcyBhcyBIVE1MUHJvamVjdENoaWxkUm93O1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJfdGhpcyA9IFwiLCBfdGhpcyk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImV2ZW50LnRhcmdldCA9IFwiLCBldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBlbGVtZW50Q3VycmVudFRhcmdldC5kaXNwYXRjaEV2ZW50KGxvYWRzb3VyY2VFdmVudCk7XG4gICAgICAgICAgICBcbiAgICAgICAgIH0pXG5cbiAgICAgICAgbmV3UHJvamVjdENoaWxkUm93LmlkID0gYGFnZV9wcm9qY2hpbGRUYWJsZVJvdy0ke2NvbnRlbnRFZGdlLmNvbnRlbnQuVXVpZH1gO1xuICAgICAgICBuZXdQcm9qZWN0Q2hpbGRSb3cuY2xhc3NMaXN0LmFkZChcImFnZV9wcm9qY2hpbGRUYWJsZVJvd1wiKTtcbiAgICAgICAgbmV3UHJvamVjdENoaWxkUm93LkNvbnRlbnRFZGdlT2JqZWN0ID0gY29udGVudEVkZ2U7XG5cbiAgICAgICAgbmV3UHJvamVjdENoaWxkUm93LmlubmVySFRNTCArPSBgXG5cdFx0XG5cdFx0XHRcdDx0ZCBpZD1hZ2VfcHJvamNoaWxkVGFibGUtVGFibGUtJHtjb250ZW50RWRnZS5jb250ZW50LlV1aWR9IGNsYXNzPVwiYWdlX2VsZW1lbnRcIiBkYXRhLVV1aWQ9JHtjb250ZW50RWRnZS5jb250ZW50LlV1aWR9PiR7Y29udGVudEVkZ2UuY29udGVudC5UYWJsZX08L3RkPlxuXHRcdFx0XHQ8dGQgaWQ9YWdlX3Byb2pjaGlsZFRhYmxlLVRpdGxlLSR7Y29udGVudEVkZ2UuY29udGVudC5VdWlkfSBjbGFzcz1cImFnZV9lbGVtZW50XCIgZGF0YS1VdWlkPSR7Y29udGVudEVkZ2UuY29udGVudC5VdWlkfT4ke2NvbnRlbnRFZGdlLmNvbnRlbnQuVGl0bGV9PC90ZD5cblx0XHRcdFxuXHRcdGA7XG5cbiAgICAgICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGlkPWFnZV9wcm9qY2hpbGRUYWJsZVJvdy0ke25vZGVFZGdlLlV1aWR9YCk7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGlkPWFnZV9wcm9qY2hpbGRUYWJsZVJvdy0ke25vZGVFZGdlLlV1aWR9YCkpXG5cblxuICAgICAgICAvLyBuZXdQcm9qZWN0Q2hpbGRSb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcm9qZWN0Q2hpbGRSb3dDbGlja2VkKVxuXG4gICAgICAgIHRib2R5LmFwcGVuZENoaWxkKG5ld1Byb2plY3RDaGlsZFJvdylcblxuICAgIH1cblxufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9wdWxhdGVQcm9qZWN0U2VhcmNoVGFibGUocHJvamVjdFNlYXJjaFRhYmxlIDogYW55LCBwcm9qZWN0T2JqZWN0cyA6IGFueSk6IHZvaWQge1xuICAgIC8vIGNvbnNvbGUubG9nKCdQUk9KRUNUIFRCQUxFIFBPUCcpO1xuXG4gICAgLy8gY2hpbGRPYmplY3RzID0gZXh0ZW5zaW9uU3RhdGVGcm9udC5jdXJyZW50X3Byb2plY3RTZWFyY2hPYmplY3RzO1xuXG4gICAgLy8gbGV0IHByb2plY3RUYWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2VfcHJvamVjdFRhYmxlJyk7XG4gICAgLy8gY29uc29sZS5sb2coXCJTU1NTU1NTU1NTU1NTU1NTUyA9IFwiLCBwcm9qZWN0T2JqZWN0cy5sZW5ndGgpXG4gICAgbGV0IHRib2R5ID0gcHJvamVjdFNlYXJjaFRhYmxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0Ym9keScpWzBdXG4gICAgLy8gY29uc29sZS5sb2coXCJ0Ym9keSA9IFwiLCB0Ym9keSk7XG5cbiAgICB0Ym9keS5pbm5lckhUTUwgPSAnJztcblxuICAgIGZvciAobGV0IGNoaWxkT2JqZWN0IG9mIHByb2plY3RPYmplY3RzKSB7XG5cbiAgICAgICAgbGV0IHRhYmxlUm93SHRtbCA9IGBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8dGQgZGF0YS1VdWlkPVwiJHtjaGlsZE9iamVjdC5VdWlkfVwiIGNsYXNzPVwiYWdlX2VsZW1lbnQgYWdlX3Byb2plY3RSb3dTZWFyY2hEYXRhXCI+JHtjaGlsZE9iamVjdC5UYWJsZX08L3RoPlxuICAgICAgICAgICAgICAgIDx0ZCBkYXRhLVV1aWQ9XCIke2NoaWxkT2JqZWN0LlV1aWR9XCIgY2xhc3M9XCJhZ2VfZWxlbWVudCBhZ2VfcHJvamVjdFJvd1NlYXJjaERhdGFcIj4ke2NoaWxkT2JqZWN0LlRpdGxlfTwvdGQ+XG5cbiAgICAgICAgICAgIGA7XG4gICAgICAgIC8vIGxldCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gICAgICAgIGxldCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykgYXMgSFRNTFByb2plY3RUYWJsZVJvdztcbiAgICAgICAgdHIuaWQgPSAnYWdlX3Byb2plY3RTZWFyY2hSb3ctJyArIGNoaWxkT2JqZWN0LlV1aWQ7XG4gICAgICAgIHRyLmNsYXNzTGlzdC5hZGQoJ2FnZV9wcm9qZWN0U2VhcmNoUm93Jyk7XG4gICAgICAgIHRyLm5vZGVPYmplY3QgPSBjaGlsZE9iamVjdDtcbiAgICAgICAgLy8gdHIuZGF0YXNldC5Ob2RlID0gMTtcbiAgICAgICAgLy8gdHIuZGF0YXNldC5VdWlkID0gY2hpbGRPYmplY3QuVXVpZDtcbiAgICAgICAgLy8gdHIuc2V0QXR0cmlidXRlKCdkYXRhLU5vZGUnLCAnMScpO1xuICAgICAgICB0ci5zZXRBdHRyaWJ1dGUoJ2RhdGEtVXVpZCcsIGNoaWxkT2JqZWN0LlV1aWQpO1xuICAgICAgICAvLyB0ci50YWJJbmRleCA9IDA7XG4gICAgICAgIHRyLmlubmVySFRNTCA9IHRhYmxlUm93SHRtbDtcbiAgICAgICAgLy8gdHIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja0NhbGxiYWNrKTtcbiAgICAgICAgLy8gdHIuY29udGVudEVkaXRhYmxlID0gJ1RydWUnO1xuXG4gICAgICAgIHRib2R5LmFwcGVuZCh0cik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRyKVxuICAgIH1cblxufSIsImltcG9ydCAqIGFzIGZldGNoZXIgZnJvbSBcIi4uL2ZldGNoZXJcIjtcbmltcG9ydCAqIGFzIGRvbSBmcm9tIFwiLi9wcm9qZWN0X2RvbVwiO1xuaW1wb3J0IHsgSFRNTFByb2plY3RUYWJsZVJvdywgSFRNTFRhYmxlQ29udGVudE9iamVjdCB9IGZyb20gXCIuL3Byb2plY3RfZG9tXCI7XG5pbXBvcnQge2FnZV9kYmlzfSBmcm9tIFwiLi4vZGJpLXNlbmRcIjtcblxuXG5sZXQgY3VycmVudFByb2plY3RPYmplY3QgOiBhbnkgPSBudWxsO1xuXG5sZXQgc2lkZVBhbmVsIDogRWxlbWVudDtcbmxldCBzaWRlUGFuZWxJc1JpZ2h0IDogYm9vbGVhbiA9IHRydWU7XG5cbmxldCBwcm9qZWN0TW9yZU9wdGlvbnNDb250ZXh0TWVudSA6IEhUTUxEaXZFbGVtZW50O1xuXG5sZXQgcHJvamVjdENvbnRhaW5lciA6IEVsZW1lbnQ7XG5sZXQgcHJvamVjdENzczogSFRNTEVsZW1lbnQ7XG5cbmxldCBwcm9qZWN0TW9yZU9wdGlvbnNCdXR0b24gOiBIVE1MRWxlbWVudDtcbmxldCBwcm9qZWN0TW9yZU9wdGlvbnNNZW51OiBIVE1MRWxlbWVudDtcblxubGV0IHByb2plY3RTZWFyY2hFbGVtZW50IDogSFRNTERpdkVsZW1lbnQ7XG5sZXQgc2VhcmNoU3RyaW5nRXhpc3RzIDogYm9vbGVhbiA9IGZhbHNlO1xuXG5sZXQgcHJvamVjdFNlYXJjaE9iamVjdHM6IGFueTtcbmxldCBwcm9qZWN0U2VhcmNoVGFibGU6IEhUTUxUYWJsZUVsZW1lbnQ7XG5cbmxldCBwcm9qZWN0Q29udGVudEVkZ2VDaGlsZHJlbiA6IGFueTtcbmxldCBwcm9qZWN0Q2hpbGRyZW5UYWJsZSA6IEhUTUxUYWJsZUVsZW1lbnQ7XG5cbmxldCBwcm9qZWN0UHJvcGVydGllc1RhYmxlOiBIVE1MVGFibGVDb250ZW50T2JqZWN0O1xuXG5sZXQgcHJvamVjdFRpdGxlRWxlbWVudCA6IEhUTUxFbGVtZW50O1xuXG5cbi8vIGludGVyZmFjZSBIVE1MVGFibGVSb3dFbGVtZW50IHtcbi8vICAgICBub2RlT2JqZWN0PzogYW55O1xuLy8gfVxuXG4vLyBpbnRlcmZhY2UgSFRNTFByb2plY3RUYWJsZVJvdyBleHRlbmRzIEhUTUxUYWJsZVJvd0VsZW1lbnQge1xuLy8gICAgIG5vZGVPYmplY3Q6IGFueTtcbi8vIH1cblxuXG5mdW5jdGlvbiBpbml0UHJvamVjdHMoX3NpZGVQYW5lbCA6IEVsZW1lbnQsIF9wcm9qZWN0TW9yZU9wdGlvbnNDb250ZXh0TWVudSA6IEhUTUxEaXZFbGVtZW50KSA6IHZvaWR7XG4gICAgY29uc29sZS5sb2coJ09WRVJMQVkgVFMgSU5JVCcpO1xuXG4gICAgc2lkZVBhbmVsID0gX3NpZGVQYW5lbDtcblxuICAgIC8vIE1PUkUgT1BUSU9OUyBDT05URVhUIE1FTlVcbiAgICBwcm9qZWN0TW9yZU9wdGlvbnNDb250ZXh0TWVudSA9IF9wcm9qZWN0TW9yZU9wdGlvbnNDb250ZXh0TWVudTtcbiAgICBwcm9qZWN0TW9yZU9wdGlvbnNDb250ZXh0TWVudS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xpY2tlZFByb2plY3RDb250ZXh0TWVudSlcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoaWRlUHJvamVjdENvbnRleHRNZW51LCB7Y2FwdHVyZTogZmFsc2V9KTtcblxuICAgIHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwcm9qZWN0Q29udGFpbmVyLmlkID0gXCJhZ2VfcHJvamVjdENvbnRhaW5lclwiO1xuICAgIHByb2plY3RDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImFnZV9wYW5lbENvbnRhaW5lclwiKTtcbiAgICBwcm9qZWN0Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwcm9qZWN0Q2xpY2spO1xuICAgIHByb2plY3RDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIHByb2plY3RQcm9wZXJ0eUZvY3VzT3V0KTtcblxuICAgIGZldGNoZXIuZmV0Y2hIdG1sKFwicHJvamVjdHMuaHRtbFwiKVxuICAgICAgICAudGhlbihodG1sID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiSFRNTCA6IFwiLCBodG1sKVxuICAgICAgICAgICAgcHJvamVjdENvbnRhaW5lci5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgICAgICAgcHJvamVjdFRpdGxlRWxlbWVudCA9IHByb2plY3RDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2VfcHJvamVjdFRpdGxlXCIpO1xuICAgICAgICAgICAgcHJvamVjdFNlYXJjaFRhYmxlID0gcHJvamVjdENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwidGFibGVcIik7XG4gICAgICAgICAgICBwcm9qZWN0Q2hpbGRyZW5UYWJsZSA9IHByb2plY3RDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2VfcHJvamVjdENoaWxkcmVuVGFibGVcIik7XG4gICAgICAgICAgICBwcm9qZWN0UHJvcGVydGllc1RhYmxlID0gcHJvamVjdENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiI2FnZV9wcm9qZWN0UHJvcGVydGllc1RhYmxlXCIpO1xuICAgICAgICAgICAgcHJvamVjdFNlYXJjaEVsZW1lbnQgPSBwcm9qZWN0Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX3Byb2plY3RTZWFyY2hJbnB1dFwiKTtcbiAgICAgICAgICAgIHByb2plY3RTZWFyY2hFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c2luXCIsIHNlYXJjaFByb2plY3RJbik7XG4gICAgICAgICAgICBwcm9qZWN0U2VhcmNoRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgc2VhcmNoUHJvamVjdE91dCk7XG5cbiAgICAgICAgICAgIC8vIFRPRE8gOiBncmFiIHRoZSBtb3JlIG9wdGlvbnMgY29udGV4dCBtZW51XG4gICAgICAgICAgICAvLyBwcm9qZWN0TW9yZU9wdGlvbnNNZW51ID0gXG4gICAgICAgICAgICBwcm9qZWN0TW9yZU9wdGlvbnNCdXR0b24gPSBwcm9qZWN0Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX3Byb2plY3RNb3JlT3B0aW9uc1wiKTtcbiAgICAgICAgICAgIGxldCBtb3JlT3B0aW9uc0JhY2tncm91bmRVcmwgPSBicm93c2VyLnJ1bnRpbWUuZ2V0VVJMKFxuICAgICAgICAgICAgICAgIFwicmVzb3VyY2VzL21vcmUtb3B0aW9ucy5wbmdcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGxldCBiYWNrZ3JvdW5kU3RyaW5nID0gYHVybCgke21vcmVPcHRpb25zQmFja2dyb3VuZFVybH0pYDtcbiAgICAgICAgICAgIHByb2plY3RNb3JlT3B0aW9uc0J1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBiYWNrZ3JvdW5kU3RyaW5nO1xuXG4gICAgICAgICAgICAvLyBTZWFyY2ggaWNvblxuICAgICAgICAgICAgbGV0IHNlYXJjaEJhY2tncm91bmRVcmwgPSBicm93c2VyLnJ1bnRpbWUuZ2V0VVJMKFxuICAgICAgICAgICAgICAgIFwicmVzb3VyY2VzL3NlYXJjaC1pY29uLnBuZ1wiXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbGV0IHNlYXJjaEJhY2tncm91bmRTdHJpbmcgPSBgdXJsKCR7c2VhcmNoQmFja2dyb3VuZFVybH0pYDtcbiAgICAgICAgICAgIHByb2plY3RTZWFyY2hFbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IHNlYXJjaEJhY2tncm91bmRTdHJpbmc7XG5cbiAgICAgICAgICAgIGZldGNoUHJvamVjdFNlYXJjaChcIlwiKSAvLyBwZXJmb3JtIHNlYXJjaCBvbmx5IGFmdGVyIGd1YXJhbnRlZWQgbG9hZFxuICAgICAgICAgICAgICAgIC50aGVuKChjb250ZW50T2JqZWN0QXJyYXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coY29udGVudE9iamVjdEFycmF5KVxuICAgICAgICAgICAgICAgICAgICBkb20ucG9wdWxhdGVQcm9qZWN0U2VhcmNoVGFibGUocHJvamVjdFNlYXJjaFRhYmxlLCBwcm9qZWN0U2VhcmNoT2JqZWN0cyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSkgXG4gIFxuICAgIHByb2plY3RDc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gICAgcHJvamVjdENzcy5pZCA9IFwiYWdlX3Byb2plY3RTdHlsZVwiO1xuICAgIGZldGNoZXIuZmV0Y2hDc3MoXCJwcm9qZWN0cy5jc3NcIilcbiAgICAudGhlbihjc3MgPT4ge1xuICAgICAgICBwcm9qZWN0Q3NzLmlubmVyVGV4dCA9IGNzcztcbiAgICB9KVxuXG4gICAgXG5cbiAgICBjb25zb2xlLmxvZyhcInNpZGVQYW5lbC5pZCA9IFwiLCBzaWRlUGFuZWwuaWQpXG4gICAgXG4gICAgc2lkZVBhbmVsLmFwcGVuZChwcm9qZWN0Q29udGFpbmVyKTtcblxuXG4gICAgXG4gICAgXG4gICAgXG59XG5cblxuXG5cbi8qKlxuICogQWRkIG5ldyBwcm9qZWN0IG9iamVjdCBhbmRcbiAqL1xuYXN5bmMgZnVuY3Rpb24gY3JlYXRlTmV3UHJvamVjdCgpIHtcbiAgICBsZXQgbmV3UHJvamVjdE9iamVjdCA9IGF3YWl0IGFnZV9kYmlzLkNvbnRlbnRfSW5zZXJ0T25UYWJsZShcIlByb2plY3RcIilcbiAgICBjdXJyZW50UHJvamVjdE9iamVjdCA9IG5ld1Byb2plY3RPYmplY3Q7XG4gICAgLy8gYXdhaXQgbG9hZFByb2plY3RXaXRoQ29udGVudE9iamVjdChuZXdQcm9qZWN0T2JqZWN0KTtcbiAgICByZWxvYWRDdXJyZW50UHJvamVjdCgpO1xufVxuXG4vKipcbiAqICAgUmVsb2FkIHVzaW5nIHRoZSBhbHJlYWR5IHNldCB2YWx1ZXMuXG4qL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbG9hZEN1cnJlbnRQcm9qZWN0KCkge1xuICAgIGF3YWl0IHJlbG9hZENoaWxkcmVuVGFibGUoKTtcbiAgICBhd2FpdCByZWxvYWRQcm9wZXJ0aWVzVGFibGUoKTtcbiAgICBhd2FpdCByZWZyZXNoUHJvamVjdFRpdGxlRWxlbWVudCgpO1xuICAgIHBlcmZvcm1TZWFyY2goKTtcbn1cblxuXG5mdW5jdGlvbiBsb2FkUHJvamVjdFdpdGhVdWlkKFV1aWQgOiBzdHJpbmcgfCBudW1iZXIpe1xuICAgIGFnZV9kYmlzLkNvbnRlbnRfU2VsZWN0T25VdWlkKFV1aWQpXG4gICAgICAgIC50aGVuKChjb250ZW50T2JqZWN0KSA9PiB7XG4gICAgICAgICAgICBsb2FkUHJvamVjdFdpdGhDb250ZW50T2JqZWN0KGNvbnRlbnRPYmplY3QpO1xuICAgICAgICB9KVxufVxuXG5hc3luYyBmdW5jdGlvbiByZWxvYWRDaGlsZHJlblRhYmxlKCl7XG4gICAgbGV0IGNvbnRlbnRFZGdlcyA9IGF3YWl0IGFnZV9kYmlzLkNvbnRlbnRFZGdlX1NlbGVjdENoaWxkT2ZVdWlkKGN1cnJlbnRQcm9qZWN0T2JqZWN0LlV1aWQpXG4gICAgZG9tLnBvcHVsYXRlQ2hpbGRyZW5UYWJsZShwcm9qZWN0Q2hpbGRyZW5UYWJsZSwgY29udGVudEVkZ2VzKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHJlbG9hZFByb3BlcnRpZXNUYWJsZSgpIHtcbiAgICBcbiAgICBhZ2VfZGJpcy5Db250ZW50X1NlbGVjdE9uVXVpZChjdXJyZW50UHJvamVjdE9iamVjdC5VdWlkKVxuICAgICAgICAudGhlbigoY29udGVudE9iamVjdCkgPT4ge1xuICAgICAgICAgICAgZG9tLnBvcHVsYXRlUHJvcGVydGllc1RhYmxlKHByb2plY3RQcm9wZXJ0aWVzVGFibGUsIGNvbnRlbnRPYmplY3QpO1xuICAgICAgICB9KSAgIFxufVxuZnVuY3Rpb24gcmVmcmVzaFByb2plY3RUaXRsZUVsZW1lbnQoKXtcbiAgICBwcm9qZWN0VGl0bGVFbGVtZW50LnRleHRDb250ZW50ID0gY3VycmVudFByb2plY3RPYmplY3QuVGl0bGU7XG59XG5cblxuZnVuY3Rpb24gcHJvamVjdFByb3BlcnR5Rm9jdXNPdXQoZXZlbnQ6IEZvY3VzRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnRk9DVVMgT1VUIFBST0pFQ1QgUFJPUEVSVFknKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcImV2ZW50LnRhcmdldCA9IFwiLCBldmVudC50YXJnZXQpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwidGhpcyA9IFwiLCB0aGlzKTtcblxuICAgIGxldCBkYXRhRWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAvLyBsZXQgcHJvamVjdFRhYmxlOiBIVE1MVGFibGVDb250ZW50T2JqZWN0ID0gdGhpcztcbiAgICBcblxuICAgIC8vIGNvbnNvbGUubG9nKCcnLCBldmVudC50YXJnZXQuKVxuICAgIHN3aXRjaCAoZGF0YUVsZW1lbnQuaWQpIHtcbiAgICAgICAgLy8gVFlQRVxuICAgICAgICBjYXNlIFwiYWdlX3Byb2pQcm9wVGFibGUtVHlwZS12YWx1ZVwiOlxuICAgICAgICAgICAgcHJvamVjdFByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0LlR5cGUgPSBkYXRhRWxlbWVudC50ZXh0Q29udGVudDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyBUSVRMRVxuICAgICAgICBjYXNlIFwiYWdlX3Byb2pQcm9wVGFibGUtVGl0bGUtdmFsdWVcIjpcbiAgICAgICAgICAgIHByb2plY3RQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdC5UaXRsZSA9IGRhdGFFbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIEdPQUxcbiAgICAgICAgY2FzZSBcImFnZV9wcm9qUHJvcFRhYmxlLUdvYWwtdmFsdWVcIjpcbiAgICAgICAgICAgIHByb2plY3RQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdC5Hb2FsID0gZGF0YUVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgLy8gUmV0dXJuISBFbHNlIGVsZW1lbnRzIHdpbGwgYmUgdXBkYXRlZCB3aXRoIGdhcmJhZ2UgdmFsdWUgd2hlbiBlLmcuIGV4aXRpbmcgc2VhcmNoIGlucHV0XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBhZ2VfZGJpcy5Db250ZW50X1VwZGF0ZVdpdGhDb250ZW50T2JqZWN0KHByb2plY3RQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdClcbiAgICAgICAgLnRoZW4odXBkYXRlZENvbnRlbnRPYmplY3QgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChkYXRhRWxlbWVudC5pZCkge1xuICAgICAgICAgICAgICAgIC8vIFRZUEVcbiAgICAgICAgICAgICAgICBjYXNlIFwiYWdlX3Byb2pQcm9wVGFibGUtVHlwZS12YWx1ZVwiOlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmFzc2VydCh1cGRhdGVkQ29udGVudE9iamVjdC5UeXBlID09IHByb2plY3RQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdC5UeXBlLCBcIidQVVQnIGNvbnRlbnQgT2JqZWN0IFR5cGUgZG9lcyBub3QgbWF0Y2ggdGhlIHByb2plY3QgdGFibGUgLmNvbnRlbnRPYmplY3QuVHlwZSAhXCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAvLyBUSVRMRVxuICAgICAgICAgICAgICAgIGNhc2UgXCJhZ2VfcHJvalByb3BUYWJsZS1UaXRsZS12YWx1ZVwiOlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmFzc2VydCh1cGRhdGVkQ29udGVudE9iamVjdC5UaXRsZSA9PSBwcm9qZWN0UHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QuVGl0bGUsIFwiJ1BVVCcgY29udGVudCBPYmplY3QgVGl0bGUgZG9lcyBub3QgbWF0Y2ggdGhlIHByb2plY3QgdGFibGUgLmNvbnRlbnRPYmplY3QuVGl0bGUgIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgLy8gR09BTFxuICAgICAgICAgICAgICAgIGNhc2UgXCJhZ2VfcHJvalByb3BUYWJsZS1Hb2FsLXZhbHVlXCI6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuYXNzZXJ0KHVwZGF0ZWRDb250ZW50T2JqZWN0LkdvYWwgPT0gcHJvamVjdFByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0LkdvYWwsIFwiJ1BVVCcgY29udGVudCBPYmplY3QgR29hbCBkb2VzIG5vdCBtYXRjaCB0aGUgcHJvamVjdCB0YWJsZSAuY29udGVudE9iamVjdC5Hb2FsICFcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9KVxuICAgIC8vIGxldCBwcm9qZWN0Q29udGVudE9iamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3Byb2plY3RQcm9wZXJ0aWVzVGFibGVcIikgYXMgSFRNTFRhYmxlQ29udGVudE9iamVjdDtcblxuICAgIC8vIGNvbnNvbGUubG9nKFwicHJvamVjdENvbnRlbnRPYmplY3QuY29udGVudE9iamVjdCA9IFwiLCBwcm9qZWN0UHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QpO1xuICAgIGN1cnJlbnRQcm9qZWN0T2JqZWN0ID0gcHJvamVjdFByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0O1xuXG4gICAgcmVmcmVzaFByb2plY3RUaXRsZUVsZW1lbnQoKTtcblxuXG4gICAgLy8gVXBkYXRlIFRpdGxlcyBpbiB0aGUgc2VhcmNoXG4gICAgbGV0IGVsZW1lbnRXaXRoU2FtZVV1aWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS11dWlkPScke2N1cnJlbnRQcm9qZWN0T2JqZWN0LlV1aWR9J11gKTtcbiAgICBlbGVtZW50V2l0aFNhbWVVdWlkLmZvckVhY2goKF9lbGVtZW50KSA9PiB7XG4gICAgICAgIGlmIChfZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJhZ2VfZWxlbWVudFwiKSAmJiBfZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJhZ2VfcHJvamVjdFNlYXJjaFJvd1wiKSl7XG4gICAgICAgICAgICAvLyBfZWxlbWVudC5jaGlsZHJlblsxXS50ZXh0Q29udGVudCA9IGRhdGFFbGVtZW50LnRleHRDb250ZW50OyAvLyB1cGRhdGUgdGhlIHNlY29uZCBzZWFyY2ggY29sdW1uOyBlZGl0OiBkb2Vzbid0IHdvcmsuLi5cbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNsaWNrZWRQcm9qZWN0Q29udGV4dE1lbnUoZXZlbnQ6IE1vdXNlRXZlbnQpe1xuICAgIGxldCBldmVudFRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICBzd2l0Y2ggKGV2ZW50VGFyZ2V0LmlkKSB7XG4gICAgICAgIGNhc2UgXCJuZXdQcm9qZWN0QnRuXCI6XG4gICAgICAgICAgICBhd2FpdCBjcmVhdGVOZXdQcm9qZWN0KCk7XG4gICAgICAgICAgICBzaG93UHJvamVjdFByb3BlcnRpZXMoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibmV3U291cmNlQnRuXCI6XG4gICAgICAgICAgICBpbnNlcnROZXdTb3VyY2VUb0FjdGl2ZVByb2plY3QoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicmVmcmVzaEV4dGVuc2lvblwiOlxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiJ3JlZnJlc2hFeHRlbnNpb24nIE5PVCBGVUxMWSBJTVBMRU1FTlRFRCAhIE9OTFkgUFJPSkVDVCBJUyBSRUZSRVNIRURcIik7XG4gICAgICAgICAgICByZWxvYWRDdXJyZW50UHJvamVjdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJwcmludEN1cnJlbnRQcm9qZWN0XCI6XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50UHJvamVjdE9iamVjdCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShjdXJyZW50UHJvamVjdE9iamVjdCkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtb3ZlRXh0ZW5zaW9uXCI6XG4gICAgICAgICAgICB0b2dnbGVFeHRlbnNpb25Mb2NhdGlvbigpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUV4dGVuc2lvbkxvY2F0aW9uKCl7XG4gICAgLy8gU2hpZnQgYmV0d2VlbiBsZWZ0IGFuZCByaWdodFxuICAgIGlmIChzaWRlUGFuZWxJc1JpZ2h0KSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX292ZXJsYXlDb250YWluZXJcIikuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBcInN0YXJ0XCI7XG4gICAgICAgIHNpZGVQYW5lbElzUmlnaHQgPSBmYWxzZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX292ZXJsYXlDb250YWluZXJcIikuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBcImVuZFwiO1xuICAgICAgICBzaWRlUGFuZWxJc1JpZ2h0ID0gdHJ1ZTtcbiAgICB9XG59XG4gICAgXG4vLyB9XG4vLyA8YnV0dG9uIGlkPVwicmVmcmVzaEV4dGVuc2lvblwiID4gUmVmcmVzaCBmcm9tIHNlcnZlciA8L2J1dHRvbj5cbi8vICAgICA8IGJ1dHRvbiBpZCA9IFwicHJpbnRDdXJyZW50UHJvamVjdFwiID4gQ29weSBQcm9qZWN0IFByb3BlcnRpZXMgPC9idXR0b24+XG4vLyAgICAgICAgIDwgYnV0dG9uIGlkID0gXCJtb3ZlRXh0ZW5zaW9uXCIgPiBNb3ZlIEV4dGVuc2lvbiA8L2J1dHRvbj5cblxuXG4vKipcbiAqIEFkZCBuZXcgY2hpbGQtc291cmNlLCBmaXJlcyBvZmYgdGhlIGxvYWRzb3VyY2UgQ3V0b21FdmVudCwgYW5kIHRoZW4gcmVsb2FkcyB0aGUgcHJvamVjdCBjaGlsZCB0YWJsZS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluc2VydE5ld1NvdXJjZVRvQWN0aXZlUHJvamVjdCgpe1xuXG4gICAgaWYgKGN1cnJlbnRQcm9qZWN0T2JqZWN0ID09PSB1bmRlZmluZWQgfHwgY3VycmVudFByb2plY3RPYmplY3QgPT09IG51bGwpe1xuICAgICAgICBjb25zb2xlLndhcm4oXCJObyBjdXJyZW50IFByb2plY3QuIENhbid0IGFkZCBuZXcgc291cmNlLlwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBjb250ZW50RWRnZU9iamVjdDogYW55ID0gYXdhaXQgYWdlX2RiaXMuQ29udGVudEVkZ2VfSW5zZXJ0QWRqYWNlbnRUb1V1aWRJbnRvVGFibGUoY3VycmVudFByb2plY3RPYmplY3QuVXVpZCwgMSwgJ1NvdXJjZScsICcnLCAnJywgJy8nKVxuXG4gICAgLy8gbWFrZSBzdXJlIHdlIHNldCBhIGRlZmF1bHQgdXJsIVxuICAgIGxldCBfbmV3U291cmNlT2JqZWN0ID0gY29udGVudEVkZ2VPYmplY3QuY29udGVudDtcbiAgICBfbmV3U291cmNlT2JqZWN0LlVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgIF9uZXdTb3VyY2VPYmplY3QuVGl0bGUgPSBkb2N1bWVudC50aXRsZTtcbiAgICBfbmV3U291cmNlT2JqZWN0ID0gYXdhaXQgYWdlX2RiaXMuQ29udGVudF9VcGRhdGVXaXRoQ29udGVudE9iamVjdChfbmV3U291cmNlT2JqZWN0KTtcblxuICAgIC8vIEluc2VydCBuZXcgU2NoZWR1bGVcbiAgICBhd2FpdCBhZ2VfZGJpcy5SZXZpZXdfSW5zZXJ0U2NoZWR1bGVPblV1aWQoX25ld1NvdXJjZU9iamVjdC5VdWlkLCBcIlwiKTtcblxuICAgIC8vIFNFTkQgTkVXIFNPVVJDRSBNRVNTQUdFXG4gICAgbGV0IG5ld3NvdXJjZUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwibmV3c291cmNlXCIsIHtcbiAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgZGV0YWlsOiB7IGNvbnRlbnRPYmplY3Q6IF9uZXdTb3VyY2VPYmplY3QgfSxcbiAgICB9KTtcbiAgICBwcm9qZWN0Q29udGFpbmVyLmRpc3BhdGNoRXZlbnQobmV3c291cmNlRXZlbnQpO1xuICAgIFxuICAgIC8vIHVwZGF0ZSBwcm9qZWN0IGNoaWxkcmVuIHRhYmxlXG4gICAgYWdlX2RiaXMuQ29udGVudEVkZ2VfU2VsZWN0Q2hpbGRPZlV1aWQoY3VycmVudFByb2plY3RPYmplY3QuVXVpZClcbiAgICAgICAgLnRoZW4oKGNvbnRlbnRFZGdlcykgPT4ge1xuICAgICAgICAgICAgZG9tLnBvcHVsYXRlQ2hpbGRyZW5UYWJsZShwcm9qZWN0Q2hpbGRyZW5UYWJsZSwgY29udGVudEVkZ2VzKTtcbiAgICAgICAgfSlcbiAgICBcbn1cblxuXG5mdW5jdGlvbiBoaWRlUHJvamVjdENvbnRleHRNZW51KGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgbGV0IGV2ZW50VGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgIC8vIGNvbnNvbGUubG9nKCdfXl9eX15fXl9eX14nLCBldmVudFRhcmdldC5pZCk7XG5cbiAgICBsZXQgaXNDb250ZXh0RWxlbWVudDogYm9vbGVhbiA9IGV2ZW50VGFyZ2V0LmlkID09PSBcImFnZV9tb3JlUHJvamVjdE9wdGlvbnNDb250ZXh0TWVudVwiIHx8IGV2ZW50VGFyZ2V0LmlkID09PSBcImFnZV9wcm9qZWN0TW9yZU9wdGlvbnNcIjtcbiAgICAvLyBjb25zb2xlLmxvZygnaXNDb250ZXh0RWxlbWVudCA9ICcsIGlzQ29udGV4dEVsZW1lbnQpO1xuXG4gICAgaWYgKCFpc0NvbnRleHRFbGVtZW50KSB7XG4gICAgICAgIGxldCBvcHRpb25zQ29udGV4dE1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9tb3JlUHJvamVjdE9wdGlvbnNDb250ZXh0TWVudVwiKTtcbiAgICAgICAgaWYgKG9wdGlvbnNDb250ZXh0TWVudSAhPT0gbnVsbClcbiAgICAgICAgICAgIG9wdGlvbnNDb250ZXh0TWVudS5jbGFzc0xpc3QuYWRkKFwiYWdlX2Rpc3BsYXlOb25lXCIpXG4gICAgfVxufVxuXG5cblxuLyoqXG4gKiAgTWFpbiBjbGljayBoYW5kbGVyIGluIHRoZSBwcm9qZWN0IGNvbnRhaW5lci5cbiAqIFxuICogQHBhcmFtIGV2ZW50IFxuICovXG5cbmZ1bmN0aW9uIHByb2plY3RDbGljayhldmVudDogRXZlbnQpe1xuXG4gICAgLy8gY29uc29sZS5sb2coXCJDbGljayBkZXRlY3RlZCBpbiBwcm9qZWN0IGNvbnRhaW5lci5cIik7XG4gICAgbGV0IGNsaWNrVGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuXG4gICAgXG4vLyBTRUFSQ0ggUk9XXG4gICAgaWYgKGNsaWNrVGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImFnZV9wcm9qZWN0Um93U2VhcmNoRGF0YVwiKSl7XG4gICAgICAgIC8vIGdyYWIgcGFyZW50IGJlY2F1c2Ugd2UgY2xpY2tlZCBvbiBkYXRhLWVsZW1lbnRcbiAgICAgICAgbGV0IHRhYmxlUm93VGFyZ2V0ID0gY2xpY2tUYXJnZXQucGFyZW50RWxlbWVudCBhcyBIVE1MUHJvamVjdFRhYmxlUm93O1xuICAgICAgICBsb2FkUHJvamVjdFdpdGhDb250ZW50T2JqZWN0KHRhYmxlUm93VGFyZ2V0Lm5vZGVPYmplY3QpO1xuICAgICAgICBzaG93UHJvamVjdENoaWxkcmVuKCk7XG4gICAgfVxuLy8gU0VBUkNIL0NISUxEUkVOL1BST1BFUlRJRVMgQlVUVE9OXG4gICAgZWxzZSBpZiAoXG4gICAgICAgICAgIGNsaWNrVGFyZ2V0LmlkID09IFwiYWdlX3Byb2plY3RTZWFyY2hCdXR0b25cIiBcbiAgICAgICAgfHwgY2xpY2tUYXJnZXQuaWQgPT0gXCJhZ2VfcHJvamVjdENoaWxkcmVuQnV0dG9uXCIgXG4gICAgICAgIHx8IGNsaWNrVGFyZ2V0LmlkID09IFwiYWdlX3Byb2plY3RQcm9wZXJ0aWVzQnV0dG9uXCJcbiAgICApe1xuICAgICAgICAvLyBwcm9qZWN0U2VhcmNoQnV0dG9uQ2xpY2tlZChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpO1xuICAgICAgICBzaG93UHJvamVjdFRhYmxlKGNsaWNrVGFyZ2V0LmlkKTtcbiAgICB9XG4vLyBNT1JFIE9QVElPTlMgQlVUVE9OXG4gICAgZWxzZSBpZiAoY2xpY2tUYXJnZXQuaWQgPT0gXCJhZ2VfcHJvamVjdE1vcmVPcHRpb25zXCIpIHtcbiAgICAgICAgLy8gcHJvamVjdE1vcmVPcHRpb25zQnV0dG9uQ2xpY2tlZChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpO1xuICAgICAgICB0b2dnbGVNb3JlT3B0aW9ucygpO1xuICAgIH1cbi8vIFRJVExFXG4gICAgZWxzZSBpZiAoY2xpY2tUYXJnZXQuaWQgPT0gXCJhZ2VfcHJvamVjdFRpdGxlXCIpIHtcbiAgICAgICAgLy8gVE9HR0xFIFByb2plY3Qvc291cmNlIGNvbnRhaW5lciBleHBhbnNpb25zL2NvbGxhcHNlXG4gICAgICAgIGxldCBwcm9qZWN0Q29udGFpbmVyRWxlbWVudCA6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdENvbnRhaW5lclwiKTtcbiAgICAgICAgcHJvamVjdENvbnRhaW5lckVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29sbGFwc2VkXCIpID8gcHJvamVjdENvbnRhaW5lckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImNvbGxhcHNlZFwiKSA6IHByb2plY3RDb250YWluZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjb2xsYXBzZWRcIik7XG4gICAgICAgIGxldCBzb3VyY2VDb250YWluZXJFbGVtZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3NvdXJjZUNvbnRhaW5lclwiKTtcbiAgICAgICAgc291cmNlQ29udGFpbmVyRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb2xsYXBzZWRcIikgPyBzb3VyY2VDb250YWluZXJFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xsYXBzZWRcIikgOiBzb3VyY2VDb250YWluZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjb2xsYXBzZWRcIik7XG5cbiAgICB9XG5cbiAgICBlbHNle1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnSWdub3JlZCBQcm9qZWN0IENsaWNrLicpO1xuICAgIH1cbn1cblxuLyoqXG4gKiAgbG9hZHMgYW4gZXhpc3RpbmcgcHJvamVjdC4gVXN1YWxseSBmcm9tIGNsaWNraW5nIG9uIGEgcHJvamVjdCBkdXJpbmcgc2VhcmNoIE9SIGNyZWF0aW5nIGEgbmV3IHByb2plY3Qgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBsb2FkUHJvamVjdFdpdGhDb250ZW50T2JqZWN0KF9jb250ZW50T2JqZWN0IDogYW55KXtcbiAgICAvLyBTZXQgbW9kdWxlIHZhcmlhYmxlXG4gICAgY3VycmVudFByb2plY3RPYmplY3QgPSBfY29udGVudE9iamVjdDtcblxuICAgIC8vIHNldCB0aXRsZVxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2VfcHJvamVjdFRpdGxlJykudGV4dENvbnRlbnQgPSBfY29udGVudE9iamVjdC5UaXRsZTtcblxuXG4gICAgZG9tLnBvcHVsYXRlUHJvcGVydGllc1RhYmxlKHByb2plY3RQcm9wZXJ0aWVzVGFibGUsIF9jb250ZW50T2JqZWN0KTtcbiAgICAvLyBwb3B1bGF0ZSBwcm9wZXJ0aWVzIHRhYmxlIFxuICAgIGZldGNoUHJvamVjdENoaWxkcmVuKF9jb250ZW50T2JqZWN0LlV1aWQpXG4gICAgICAgIC50aGVuKChjb250ZW50RWRnZU9iamVjdHMpID0+IHsgZG9tLnBvcHVsYXRlQ2hpbGRyZW5UYWJsZShwcm9qZWN0Q2hpbGRyZW5UYWJsZSwgcHJvamVjdENvbnRlbnRFZGdlQ2hpbGRyZW4pIH1cbiAgICApO1xuICAgIFxuICAgIC8vIHNob3dQcm9qZWN0Q2hpbGRyZW4oKTtcbn1cblxuZnVuY3Rpb24gc2hvd1Byb2plY3RDaGlsZHJlbigpe1xuICAgIC8vIG1vdmUgZm9jdXMgdG8gdGhlIGNoaWxkcmVuLXRhYlxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3Byb2plY3RDaGlsZHJlbkJ1dHRvblwiKS5jbGljaygpXG59XG5mdW5jdGlvbiBzaG93UHJvamVjdFByb3BlcnRpZXMoKSB7XG4gICAgLy8gbW92ZSBmb2N1cyB0byB0aGUgY2hpbGRyZW4tdGFiXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdFByb3BlcnRpZXNCdXR0b25cIikuY2xpY2soKVxufVxuXG5mdW5jdGlvbiB0b2dnbGVNb3JlT3B0aW9ucygpe1xuICAgIC8vIGNvbnNvbGUubG9nKFwiVE9HR0xFIE1PUkUgT1BUSU9OU1wiKVxuICAgIGxldCBidXR0b25Cb3VuZGluZ1JlY3QgPSBwcm9qZWN0TW9yZU9wdGlvbnNCdXR0b24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgbGV0IGJ0bkxlZnQgPSBidXR0b25Cb3VuZGluZ1JlY3QubGVmdDtcbiAgICBsZXQgYnRuUmlnaHQgPSBidXR0b25Cb3VuZGluZ1JlY3QucmlnaHQ7XG4gICAgbGV0IGJ0bkJvdHRvbSA9IGJ1dHRvbkJvdW5kaW5nUmVjdC5ib3R0b207XG4gICAgbGV0IGJ0blggPSBidXR0b25Cb3VuZGluZ1JlY3QueDtcblxuXG4gICAgcHJvamVjdE1vcmVPcHRpb25zQ29udGV4dE1lbnUuc3R5bGUudG9wID0gYnRuQm90dG9tICsgNSArIFwicHhcIjtcbiAgICBpZihzaWRlUGFuZWxJc1JpZ2h0KXtcbiAgICAgICAgXG4gICAgICAgIHByb2plY3RNb3JlT3B0aW9uc0NvbnRleHRNZW51LnN0eWxlLmxlZnQgPSBidG5MZWZ0IC0gMTcwICArIFwicHhcIjtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgcHJvamVjdE1vcmVPcHRpb25zQ29udGV4dE1lbnUuc3R5bGUubGVmdCA9IGJ0bkxlZnQgKyBcInB4XCI7XG4gICAgfVxuXG4gICAgcHJvamVjdE1vcmVPcHRpb25zQ29udGV4dE1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWdlX2Rpc3BsYXlOb25lXCIpID8gcHJvamVjdE1vcmVPcHRpb25zQ29udGV4dE1lbnUuY2xhc3NMaXN0LnJlbW92ZShcImFnZV9kaXNwbGF5Tm9uZVwiKSA6IHByb2plY3RNb3JlT3B0aW9uc0NvbnRleHRNZW51LmNsYXNzTGlzdC5hZGQoXCJhZ2VfZGlzcGxheU5vbmVcIik7XG59XG5cblxuXG5mdW5jdGlvbiBzZWFyY2hQcm9qZWN0SW4oKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJzZWFyY2hQcm9qZWN0SW4oKVwiKVxuICAgIC8vIGZvY3VzUHJvamVjdFNlYXJjaCA9IHRydWU7XG4gICAgLy8gZXh0ZW5zaW9uU3RhdGVGcm9udC5wcm9qZWN0U2VhcmNoQWN0aXZlID0gdHJ1ZTtcbiAgICAvL3dyaXRlU3RhdGVGcm9tRnJvbnQoKTtcbiAgICAvLyBjb25zb2xlLmxvZygncHJvamVjdFNlYXJjaEVsZW1lbnQudGV4dENvbnRlbnQgPSAnLCBwcm9qZWN0U2VhcmNoRWxlbWVudC50ZXh0Q29udGVudCk7XG4gICAgXG4gICAgLy8gRW1wdHkgc2VhcmNoIGNvbnRhaW5lciBpZiBubyBwcmV2aW91cyBzZWFyY2ggc3RyaW5nIGV4aXN0c1xuICAgIGlmICghc2VhcmNoU3RyaW5nRXhpc3RzKSB7XG4gICAgICAgIHByb2plY3RTZWFyY2hFbGVtZW50LmlubmVySFRNTCA9ICc8ZGl2Pjxicj48L2Rpdj4nOyAvLyBkZWZhdWx0IGNvbnRlbnQgb24gJ2NvbnRlbnRlZGl0YWJsZScgZWxlbWVudHMgXG4gICAgICAgIC8vIHNldEludGVydmFsKCgpID0+IHsgc2VhcmNoSW5wdXQuaW5uZXJIVE1MICs9ICc8YnI+JyB9LCA1MCk7XG4gICAgfVxuICAgIHNlYXJjaFN0cmluZ0V4aXN0cyA9IHRydWU7XG4gICAgLy8gY29uc29sZS5sb2coJ2ZvY3VzIHNlYXJjaCAnKVxuICAgIC8vIHByb2plY3RTZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGtleVByZXNzRHVyaW5nU2VhcmNoKVxuICAgIHByb2plY3RTZWFyY2hFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlEb3duRHVyaW5nU2VhcmNoKVxuICAgIC8vIGtleURvd25EdXJpbmdTZWFyY2goKTtcbn1cblxuXG5mdW5jdGlvbiBzZWFyY2hQcm9qZWN0T3V0KCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdzZWFyY2hQcm9qZWN0T3V0KCknKTtcbiAgICBcbiAgICBsZXQgc2VhcmNoU3RyaW5nTGVuZ3RoID0gcHJvamVjdFNlYXJjaEVsZW1lbnQudGV4dENvbnRlbnQubGVuZ3RoO1xuICAgIGlmKHNlYXJjaFN0cmluZ0xlbmd0aCA9PT0gMCl7XG4gICAgICAgIHNlYXJjaFN0cmluZ0V4aXN0cyA9IGZhbHNlO1xuICAgICAgICBwcm9qZWN0U2VhcmNoRWxlbWVudC5pbm5lckhUTUwgPSAnPGRpdj5RICA6ICBTZWFyY2ggLiAuIC48YnI+PC9kaXY+JztcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgc2VhcmNoU3RyaW5nRXhpc3RzID0gdHJ1ZTtcbiAgICB9XG4gICAgcHJvamVjdFNlYXJjaEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleURvd25EdXJpbmdTZWFyY2gpXG59XG5cblxuLy8gUGVyZm9ybSBzZWFyY2ggd2l0aCBzbGlnaHQgZGVsYXkgdG8gbWFrZSBzdXJlIG5ldyBpbnB1dCBpcyB3cml0dGVuIHRvIGNvbnRlbnRFZGl0YW5sZSBpbnB1dFxuYXN5bmMgZnVuY3Rpb24ga2V5RG93bkR1cmluZ1NlYXJjaChldmVudCA6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBcbiAgICAvLyBVc2VyIGp1c3QgZGVsZXRlZCB0aGUgbGFzdCBjaGFyYWN0ZXIgc28gd2UgcmVzZXQgdGhlIGRlZmF1bHQgY29udGVudGVkaXRhYmxlIGVsbWVudCBzdHJ1Y3R1cmVcbiAgICAvLyBpZiB3ZSBjb24ndCBkbyB0aGlzIHRoZSB1c2VyIHdpbGwgaW5hZHZlcnRpZWRseSByZW1vdmUgdGhlIGNvbnRhaW5pbmcgPGRpdj4sIGJyZWFraW5nIHRoZSB0eXBpbmctYmVoYXZpb3VyIVxuICAgIGlmIChldmVudC5rZXkgPT09IFwiQmFja3NwYWNlXCIgJiYgcHJvamVjdFNlYXJjaEVsZW1lbnQudGV4dENvbnRlbnQubGVuZ3RoID09PSAxKXtcbiAgICAgICAgY29uc29sZS5sb2coJ0xhc3QgY2hhcmFjdGVyIGRlbGV0aW9uIHByb3RlY3Rpb24hJyk7XG4gICAgICAgIHByb2plY3RTZWFyY2hFbGVtZW50LmlubmVySFRNTCA9ICc8ZGl2Pjxicj48L2Rpdj4nOyAvLyBkZWZhdWx0IGNvbnRlbnQgb24gJ2NvbnRlbnRlZGl0YWJsZScgZWxlbWVudHMgXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIFxuICAgIC8vIFRoaXMgZG9lcyBub3QgcHJldmVudCBhIHJlcXVlc3Qgb24gZWFjaCBrZXlzdHJva2VcbiAgICAvLyBCVVQgaXQgZW5hYmxlcyByZWFkaW5nIHRoZSBjaGFuZ2Ugb2YgZWFjaCBrZXlzdHJva2UuIFdoZW4gdGhpcyBtZXRob2QgaXMgY2FsbGVkIHRoZSB0ZXh0Q29udGVudCBvZiB0aGUgc2VyYWNoIGJveCBoYXMgbm90IGJlZW4gdXBkYXRlZCEhXG4gICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG5cbiAgICAgICAgcGVyZm9ybVNlYXJjaCgpO1xuXG4gICAgfSwgMTAwKTtcblxufVxuXG5mdW5jdGlvbiBwZXJmb3JtU2VhcmNoKCl7XG4gICAgbGV0IHNlYXJjaFN0cmluZyA6IHN0cmluZyA9IFwiXCI7XG4gICAgaWYoc2VhcmNoU3RyaW5nRXhpc3RzKVxuICAgICAgICBzZWFyY2hTdHJpbmcgPSBwcm9qZWN0U2VhcmNoRWxlbWVudC50ZXh0Q29udGVudDtcbiAgICBlbHNlXG4gICAgICAgIHNlYXJjaFN0cmluZyA9IFwiXCI7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIlNlYXJjaGluZyB3aXRoIHNlYXJjaHN0cmlnbiA9IFwiLCBzZWFyY2hTdHJpbmcpXG4gICAgZmV0Y2hQcm9qZWN0U2VhcmNoKHNlYXJjaFN0cmluZylcbiAgICAgICAgLnRoZW4oKGNvbnRlbnRPYmplY3RBcnJheSkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY29udGVudE9iamVjdEFycmF5KVxuICAgICAgICAgICAgZG9tLnBvcHVsYXRlUHJvamVjdFNlYXJjaFRhYmxlKHByb2plY3RTZWFyY2hUYWJsZSwgY29udGVudE9iamVjdEFycmF5KTtcbiAgICAgICAgfSlcbn1cblxuXG5mdW5jdGlvbiBzaG93UHJvamVjdFRhYmxlKGJ1dHRvbklkIDogc3RyaW5nKXtcbiAgICAvLyBhZ2VfcHJvamVjdEJ1dHRvbk9uXG5cbiAgICAvLyBTZWFyY2ggYm94IFxuICAgIGxldCBzZWFyY2hCb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0U2VhcmNoSW5wdXRcIik7XG4gICAgc2VhcmNoQm94LmNsYXNzTGlzdC5hZGQoXCJhZ2VfZGlzcGxheU5vbmVcIik7XG5cbiAgICAvLyBSZXNldCB0aGUgYnV0dG9uc1xuICAgIGxldCBzZWFyY2hCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0U2VhcmNoQnV0dG9uXCIpXG4gICAgbGV0IGNoaWxkcmVuQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdENoaWxkcmVuQnV0dG9uXCIpXG4gICAgbGV0IHByb3BlcnRpZXNCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0UHJvcGVydGllc0J1dHRvblwiKVxuICAgIHNlYXJjaEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWdlX3Byb2plY3RCdXR0b25PblwiKTtcbiAgICBjaGlsZHJlbkJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWdlX3Byb2plY3RCdXR0b25PblwiKTtcbiAgICBwcm9wZXJ0aWVzQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhZ2VfcHJvamVjdEJ1dHRvbk9uXCIpO1xuXG4gICAgLy8gUmVzZXQgdGhlIFRhYmxlc1xuICAgIGxldCBzZWFyY2hUYWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3Byb2plY3RTZWFyY2hUYWJsZVwiKTtcbiAgICBsZXQgY2hpbGRyZW5UYWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3Byb2plY3RDaGlsZHJlblRhYmxlXCIpO1xuICAgIGxldCBwcm9wZXJ0aWVzVGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0UHJvcGVydGllc1RhYmxlXCIpO1xuICAgIHNlYXJjaFRhYmxlLmNsYXNzTGlzdC5hZGQoXCJhZ2VfZGlzcGxheU5vbmVcIik7XG4gICAgY2hpbGRyZW5UYWJsZS5jbGFzc0xpc3QuYWRkKFwiYWdlX2Rpc3BsYXlOb25lXCIpO1xuICAgIHByb3BlcnRpZXNUYWJsZS5jbGFzc0xpc3QuYWRkKFwiYWdlX2Rpc3BsYXlOb25lXCIpO1xuXG4gICAgLy8gQWN0aXZlIHRoZSBjb3JyZWN0IG9uZVxuICAgIGlmIChidXR0b25JZCA9PT0gXCJhZ2VfcHJvamVjdFNlYXJjaEJ1dHRvblwiKXtcbiAgICAgICAgc2VhcmNoVGFibGUuY2xhc3NMaXN0LnJlbW92ZShcImFnZV9kaXNwbGF5Tm9uZVwiKTtcbiAgICAgICAgc2VhcmNoQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJhZ2VfcHJvamVjdEJ1dHRvbk9uXCIpO1xuICAgICAgICBzZWFyY2hCb3guY2xhc3NMaXN0LnJlbW92ZShcImFnZV9kaXNwbGF5Tm9uZVwiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYnV0dG9uSWQgPT09IFwiYWdlX3Byb2plY3RDaGlsZHJlbkJ1dHRvblwiKXtcbiAgICAgICAgY2hpbGRyZW5UYWJsZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWdlX2Rpc3BsYXlOb25lXCIpO1xuICAgICAgICBjaGlsZHJlbkJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWdlX3Byb2plY3RCdXR0b25PblwiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYnV0dG9uSWQgPT09IFwiYWdlX3Byb2plY3RQcm9wZXJ0aWVzQnV0dG9uXCIpe1xuICAgICAgICBwcm9wZXJ0aWVzVGFibGUuY2xhc3NMaXN0LnJlbW92ZShcImFnZV9kaXNwbGF5Tm9uZVwiKTtcbiAgICAgICAgcHJvcGVydGllc0J1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWdlX3Byb2plY3RCdXR0b25PblwiKTtcbiAgICB9XG4gICAgXG59XG5cbi8vIGZ1bmN0aW9uIHByb2plY3RUaXRsZUNsaWNrZWQodGFibGVSb3c6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4vLyAgICAgY29uc29sZS5sb2coXCJQcm9qZWN0IHRpdGxlIGNsaWNrZWQ6IFwiLCB0YWJsZVJvdylcbi8vIH1cbi8vIGZ1bmN0aW9uIHByb2plY3RTZWFyY2hCdXR0b25DbGlja2VkKHRhYmxlUm93OiBIVE1MRWxlbWVudCkgOiB2b2lkIHtcbi8vICAgICBjb25zb2xlLmxvZyhcIlByb2plY3Qgc2VhcmNoIGNsaWNrZWQ6IFwiLCB0YWJsZVJvdylcbi8vIH1cbi8vIGZ1bmN0aW9uIHByb2plY3RDaGlsZHJlbkJ1dHRvbkNsaWNrZWQodGFibGVSb3c6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4vLyAgICAgY29uc29sZS5sb2coXCJQcm9qZWN0IGNoaWxkcmVuIGNsaWNrZWQ6IFwiLCB0YWJsZVJvdylcbi8vIH1cbi8vIGZ1bmN0aW9uIHByb2plY3RQcm9wZXJ0aWVzQnV0dG9uQ2xpY2tlZCh0YWJsZVJvdzogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbi8vICAgICBjb25zb2xlLmxvZyhcIlByb2plY3QgcHJvcGVydGllcyBjbGlja2VkOiBcIiwgdGFibGVSb3cpXG4vLyB9XG4vLyBmdW5jdGlvbiBwcm9qZWN0TW9yZU9wdGlvbnNCdXR0b25DbGlja2VkKHRhYmxlUm93OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuLy8gICAgIGNvbnNvbGUubG9nKFwiUHJvamVjdCBvcHRpb25zIGNsaWNrZWQ6IFwiLCB0YWJsZVJvdylcbi8vIH1cbi8vIGZ1bmN0aW9uIHByb2plY3RTZWFyY2hSb3dDbGlja2VkKHRhYmxlUm93OiBIVE1MUHJvamVjdFRhYmxlUm93KTogdm9pZCB7XG4vLyAgICAgY29uc29sZS5sb2coXCJUYWJsZSByb3cgY2xpY2tlZDogXCIsIHRhYmxlUm93KVxuLy8gfVxuXG5cbmZ1bmN0aW9uIGZldGNoUHJvamVjdFNlYXJjaChzZWFyY2hTdHJpbmcgOiBzdHJpbmcpIDogUHJvbWlzZTxhbnk+e1xuICAgIHJldHVybiBhZ2VfZGJpcy5Db250ZW50X1NlbGVjdE9uVGl0bGVMaWtlU3RyaW5nKHNlYXJjaFN0cmluZywgXCI1MFwiLCBcIlByb2plY3RcIiwgXCJcIiwgXCJcIilcbiAgICAgICAgLnRoZW4oKGNvbnRlbnRPYmplY3RBcnJheTogYW55KSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjb250ZW50T2JqZWN0QXJyYXkpO1xuICAgICAgICAgICAgcHJvamVjdFNlYXJjaE9iamVjdHMgPSBjb250ZW50T2JqZWN0QXJyYXk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNvbnRlbnRPYmplY3RBcnJheSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IgOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XG4gICAgICAgIH0pXG59XG5cbmZ1bmN0aW9uIGZldGNoUHJvamVjdENoaWxkcmVuKFV1aWQgOiBzdHJpbmcgfCBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBhZ2VfZGJpcy5Db250ZW50RWRnZV9TZWxlY3RDaGlsZE9mVXVpZChVdWlkKVxuICAgICAgICAudGhlbigoY29udGVudEVkZ2VPYmplY3RBcnJheTogYW55KSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjb250ZW50T2JqZWN0QXJyYXkpO1xuICAgICAgICAgICAgcHJvamVjdENvbnRlbnRFZGdlQ2hpbGRyZW4gPSBjb250ZW50RWRnZU9iamVjdEFycmF5O1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Byb2plY3RDb250ZW50RWRnZUNoaWxkcmVuID0gJywgcHJvamVjdENvbnRlbnRFZGdlQ2hpbGRyZW4pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHByb2plY3RDb250ZW50RWRnZUNoaWxkcmVuKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xuICAgICAgICB9KVxufVxuXG5mdW5jdGlvbiBhcHBlbmRDc3MoKSA6IHZvaWR7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmQocHJvamVjdENzcyk7XG59XG5cblxuZnVuY3Rpb24gcmVtb3ZlQ3NzKCkgOiB2b2lkIHtcbiAgICBwcm9qZWN0Q3NzLnJlbW92ZSgpO1xufVxuXG5cblxuXG5leHBvcnQge1xuICAgIGluaXRQcm9qZWN0cyxcbiAgICBhcHBlbmRDc3MsXG4gICAgcmVtb3ZlQ3NzLFxufSIsImltcG9ydCAqIGFzIGZldGNoZXIgZnJvbSBcIi4uL2ZldGNoZXJcIjtcbmltcG9ydCB7IEhUTUxQcm9qZWN0VGFibGVSb3csIEhUTUxUYWJsZUNvbnRlbnRPYmplY3QgfSBmcm9tIFwiLi9zb3VyY2VfZG9tXCI7XG5pbXBvcnQgeyBhZ2VfZGJpcyB9IGZyb20gXCIuLi9kYmktc2VuZFwiO1xuXG5cblxubGV0IHNpZGVQYW5lbDogRWxlbWVudDtcblxubGV0IHNvdXJjZVRpdGxlRWxlbWVudCA6IEhUTUxFbGVtZW50O1xuXG5sZXQgc291cmNlQ2hpbGRyZW5CdXR0b24gOiBIVE1MRWxlbWVudDtcbmxldCBzb3VyY2VQcm9wZXJ0aWVzQnV0dG9uIDogSFRNTEVsZW1lbnQ7XG5cbmxldCBzb3VyY2VDb250YWluZXI6IEVsZW1lbnQ7XG5sZXQgc291cmNlQ3NzOiBIVE1MRWxlbWVudDtcblxubGV0IHNvdXJjZUNoaWxkcmVuVGFibGU6IEhUTUxUYWJsZUVsZW1lbnQ7XG5sZXQgcHJvamVjdENvbnRlbnRFZGdlQ2hpbGRyZW46IGFueTtcblxubGV0IHNvdXJjZVByb3BlcnRpZXNUYWJsZTogSFRNTFRhYmxlQ29udGVudE9iamVjdDtcblxuIFxubGV0IGN1cnJlbnRTb3VyY2VPYmplY3Q6IGFueTtcbmxldCBjdXJyZW50U291cmNlVXVpZDogYW55OyBcbmV4cG9ydCBmdW5jdGlvbiBnZXRDdXJyZW50U291cmNlT2JqZWN0KCk6IGFueSB7IHJldHVybiBzb3VyY2VQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdH07XG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFNvdXJjZVV1aWQoKTogYW55IHsgcmV0dXJuIGN1cnJlbnRTb3VyY2VVdWlkIH07XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRTb3VyY2VDb250YWluZXIoX3NpZGVQYW5lbDogRWxlbWVudCwgX3NvdXJjZU1vcmVPcHRpb25zQ29udGV4dE1lbnU6IEhUTUxEaXZFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ2luaXRTb3VyY2VDb250YWluZXIoLi4uKScpO1xuXG4gICAgc2lkZVBhbmVsID0gX3NpZGVQYW5lbDtcblxuICAgIHNvdXJjZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHNvdXJjZUNvbnRhaW5lci5pZCA9IFwiYWdlX3NvdXJjZUNvbnRhaW5lclwiO1xuICAgIHNvdXJjZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYWdlX3BhbmVsQ29udGFpbmVyXCIsIFwiY29sbGFwc2VkXCIpO1xuICAgIHNvdXJjZUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xpY2tlZFNvdXJjZUNvbnRhaW5lcik7XG4gICAgLy8gc291cmNlQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCBzb3VyY2VQcm9wZXJ0eUZvY3VzZWRPdXQpO1xuICAgIHNvdXJjZUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgc291cmNlRm9jdXNPdXQpO1xuICAgIFxuXG4gICAgZmV0Y2hlci5mZXRjaEh0bWwoXCJzb3VyY2UuaHRtbFwiKVxuICAgICAgICAudGhlbihodG1sID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiSFRNTCA6IFwiLCBodG1sKVxuICAgICAgICAgICAgc291cmNlQ29udGFpbmVyLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgICAgICBzb3VyY2VUaXRsZUVsZW1lbnQgPSBzb3VyY2VDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2Vfc291cmNlVGl0bGVcIik7XG4gICAgICAgICAgICBzb3VyY2VDaGlsZHJlblRhYmxlID0gc291cmNlQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX3NvdXJjZUNoaWxkVGFibGVcIik7XG4gICAgICAgICAgICBzb3VyY2VQcm9wZXJ0aWVzVGFibGUgPSBzb3VyY2VDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2Vfc291cmNlUHJvcGVydGllc1RhYmxlXCIpO1xuXG4gICAgICAgICAgICBzb3VyY2VDaGlsZHJlbkJ1dHRvbiA9IHNvdXJjZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiI2FnZV9zb3VyY2VTZWFyY2hCdXR0b25cIik7XG4gICAgICAgICAgICBzb3VyY2VQcm9wZXJ0aWVzQnV0dG9uID0gc291cmNlQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX3NvdXJjZVByb3BlcnRpZXNCdXR0b25cIik7XG4gICAgICAgIH0pXG5cbiAgICBzb3VyY2VDc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gICAgc291cmNlQ3NzLmlkID0gXCJhZ2Vfc291cmNlU3R5bGVcIjtcbiAgICBmZXRjaGVyLmZldGNoQ3NzKFwic291cmNlLmNzc1wiKVxuICAgICAgICAudGhlbihjc3MgPT4ge1xuICAgICAgICAgICAgc291cmNlQ3NzLmlubmVyVGV4dCA9IGNzcztcbiAgICAgICAgfSlcblxuXG4gICAgc2lkZVBhbmVsLmFwcGVuZChzb3VyY2VDb250YWluZXIpO1xuXG59XG5cbmZ1bmN0aW9uIHNvdXJjZUZvY3VzT3V0KGV2ZW50IDogRm9jdXNFdmVudCl7XG4gICAgbGV0IGZvY3Vzb3V0VGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgIGlmIChmb2N1c291dFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJhZ2Vfc291cmNlQ2hpbGRUYWJsZS1UaXRsZVwiKSl7XG4gICAgICAgIHNvdXJjZUNoaWxkVGl0bGVGb2N1c2VkT3V0KGZvY3Vzb3V0VGFyZ2V0KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZm9jdXNvdXRUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWdlX3NvdXJjZVByb3BWYWx1ZVwiKSl7XG4gICAgICAgIHNvdXJjZVByb3BlcnR5Rm9jdXNlZE91dChmb2N1c291dFRhcmdldCk7XG4gICAgfVxuXG4gICAgLy8gc3dpdGNoIChmb2N1c291dFRhcmdldC5pZCkge1xuICAgIC8vICAgICBjYXNlIFwiYWUtc291cmNlQ2hpbGRUYWJsZS1UaXRsZVwiOlxuICAgIC8vICAgICAgICAgc291cmNlQ2hpbGRUaXRsZUZvY3VzZWRPdXQoZm9jdXNvdXRUYXJnZXQpO1xuICAgIC8vICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgIC8vIGFnZV9zb3VyY2VQcm9wVGFibGVcbiAgICAvLyAgICAgY2FzZSBcImFnZV9zb3VyY2VQcm9wVGFibGUtVGl0bGUtdmFsdWVcIjpcbiAgICAvLyAgICAgY2FzZSBcImFnZV9zb3VyY2VQcm9wVGFibGUtVHlwZS12YWx1ZVwiOlxuICAgIC8vICAgICBjYXNlIFwiYWdlX3NvdXJjZVByb3BUYWJsZS1VdWlkLXZhbHVlXCI6XG4gICAgLy8gICAgIGNhc2UgXCJhZ2Vfc291cmNlUHJvcFRhYmxlLUlBbVNvdXJjZS12YWx1ZVwiOlxuICAgIC8vICAgICAgICAgc291cmNlUHJvcGVydHlGb2N1c2VkT3V0KGZvY3Vzb3V0VGFyZ2V0KTtcbiAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgIC8vICAgICBkZWZhdWx0OlxuICAgIC8vICAgICAgICAgYnJlYWs7XG4gICAgLy8gfVxufVxuXG5mdW5jdGlvbiBzb3VyY2VDaGlsZFRpdGxlRm9jdXNlZE91dChkYXRhRWxlbWVudCA6IEhUTUxFbGVtZW50KSB7XG4gICAgbGV0IHNvdXJjZUNoaWxkUm93ID0gZGF0YUVsZW1lbnQucGFyZW50RWxlbWVudCBhcyBIVE1MUHJvamVjdFRhYmxlUm93O1xuICAgIC8vIGNvbnNvbGUubG9nKCdGT0NVUyBPVVQgU09VUkNFIENISUxEJyk7XG4gICAgLy8gY29uc29sZS5sb2coXCJldmVudC50YXJnZXQgPSBcIiwgZXZlbnQudGFyZ2V0KTtcbiAgICAvLyBjb25zb2xlLmxvZyhcInRoaXMgPSBcIiwgdGhpcyk7XG5cbiAgICAvLyBjb25zb2xlLmxvZygnZGF0YUVsZW1lbnQudGV4dENvbnRlbnQgPSAnLCBkYXRhRWxlbWVudC50ZXh0Q29udGVudCk7XG4gICAgLy8gY29uc29sZS5sb2coJ3NvdXJjZUNoaWxkUm93Lm5vZGVPYmplY3QuY29udGVudC5UaXRsZSA9ICcsIHNvdXJjZUNoaWxkUm93Lm5vZGVPYmplY3QuY29udGVudC5UaXRsZSk7XG4gICAgXG4gICAgc291cmNlQ2hpbGRSb3cubm9kZU9iamVjdC5jb250ZW50LlRpdGxlID0gZGF0YUVsZW1lbnQudGV4dENvbnRlbnQ7XG5cbiAgICBhZ2VfZGJpcy5Db250ZW50X1VwZGF0ZVdpdGhDb250ZW50T2JqZWN0KHNvdXJjZUNoaWxkUm93Lm5vZGVPYmplY3QuY29udGVudClcbiAgICAgICAgLnRoZW4odXBkYXRlZENvbnRlbnRPYmplY3QgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJVcGRhdGVkIHNvdXJjZSBjaGlsZC1yb3cgOiBcIiwgdXBkYXRlZENvbnRlbnRPYmplY3QpXG4gICAgICAgIH0pXG4gICAgLy8gLy8gbGV0IHByb2plY3RDb250ZW50T2JqZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdFByb3BlcnRpZXNUYWJsZVwiKSBhcyBIVE1MVGFibGVDb250ZW50T2JqZWN0O1xuXG4gICAgLy8gY29uc29sZS5sb2coXCJzb3VyY2VDb250ZW50T2JqZWN0LmNvbnRlbnRPYmplY3QgPSBcIiwgc291cmNlUHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QpO1xuXG59XG5cblxuZnVuY3Rpb24gc291cmNlUHJvcGVydHlGb2N1c2VkT3V0KGZvY3Vzb3V0RWxlbWVudDogSFRNTEVsZW1lbnQpe1xuICAgIC8vIGNvbnNvbGUubG9nKCdGT0NVUyBPVVQgUFJPSkVDVCBQUk9QRVJUWScpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiZXZlbnQudGFyZ2V0ID0gXCIsIGV2ZW50LnRhcmdldCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJ0aGlzID0gXCIsIHRoaXMpO1xuXG4gICAgLy8gbGV0IGRhdGFFbGVtZW50ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgIC8vIGNvbnNvbGUubG9nKCdkYXRhRWxlbWVudC50ZXh0Q29udGVudCA9ICcsIGZvY3Vzb3V0RWxlbWVudC50ZXh0Q29udGVudCk7XG4gICAgXG4gICAgLy8gbGV0IHByb2plY3RUYWJsZTogSFRNTFRhYmxlQ29udGVudE9iamVjdCA9IHRoaXM7XG5cblxuICAgIC8vIGNvbnNvbGUubG9nKCcnLCBldmVudC50YXJnZXQuKVxuICAgIHN3aXRjaCAoZm9jdXNvdXRFbGVtZW50LmlkKSB7XG4gICAgICAgIC8vIFRZUEVcbiAgICAgICAgY2FzZSBcImFnZV9zb3VyY2VQcm9wVGFibGUtVHlwZS12YWx1ZVwiOlxuICAgICAgICAgICAgc291cmNlUHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QuVHlwZSA9IGZvY3Vzb3V0RWxlbWVudC50ZXh0Q29udGVudDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyBUSVRMRVxuICAgICAgICBjYXNlIFwiYWdlX3NvdXJjZVByb3BUYWJsZS1UaXRsZS12YWx1ZVwiOlxuICAgICAgICAgICAgc291cmNlUHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QuVGl0bGUgPSBmb2N1c291dEVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBzb3VyY2VUaXRsZUVsZW1lbnQudGV4dENvbnRlbnQgPSBmb2N1c291dEVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgLy8gR09BTFxuICAgICAgICBjYXNlIFwiYWdlX3NvdXJjZVByb3BUYWJsZS1VcmwtdmFsdWVcIjpcbiAgICAgICAgICAgIHNvdXJjZVByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0LlVybCA9IGZvY3Vzb3V0RWxlbWVudC50ZXh0Q29udGVudDtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBhZ2VfZGJpcy5Db250ZW50X1VwZGF0ZVdpdGhDb250ZW50T2JqZWN0KHNvdXJjZVByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0KVxuICAgICAgICAudGhlbih1cGRhdGVkQ29udGVudE9iamVjdCA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGZvY3Vzb3V0RWxlbWVudC5pZCkge1xuICAgICAgICAgICAgICAgIC8vIFRZUEVcbiAgICAgICAgICAgICAgICBjYXNlIFwiYWdlX3NvdXJjZVByb3BUYWJsZS1UeXBlLXZhbHVlXCI6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuYXNzZXJ0KHVwZGF0ZWRDb250ZW50T2JqZWN0LlR5cGUgPT0gc291cmNlUHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QuVHlwZSwgXCInUFVUJyBjb250ZW50IE9iamVjdCBUeXBlIGRvZXMgbm90IG1hdGNoIHRoZSBwcm9qZWN0IHRhYmxlIC5jb250ZW50T2JqZWN0LlR5cGUgIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgLy8gVElUTEVcbiAgICAgICAgICAgICAgICBjYXNlIFwiYWdlX3NvdXJjZVByb3BUYWJsZS1UaXRsZS12YWx1ZVwiOlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmFzc2VydCh1cGRhdGVkQ29udGVudE9iamVjdC5UaXRsZSA9PSBzb3VyY2VQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdC5UaXRsZSwgXCInUFVUJyBjb250ZW50IE9iamVjdCBUaXRsZSBkb2VzIG5vdCBtYXRjaCB0aGUgcHJvamVjdCB0YWJsZSAuY29udGVudE9iamVjdC5UaXRsZSAhXCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAvLyBHT0FMXG4gICAgICAgICAgICAgICAgY2FzZSBcImFnZV9zb3VyY2VQcm9wVGFibGUtVXJsLXZhbHVlXCI6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuYXNzZXJ0KHVwZGF0ZWRDb250ZW50T2JqZWN0LlVybCA9PSBzb3VyY2VQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdC5VcmwsIFwiJ1BVVCcgY29udGVudCBPYmplY3QgR29hbCBkb2VzIG5vdCBtYXRjaCB0aGUgcHJvamVjdCB0YWJsZSAuY29udGVudE9iamVjdC5Hb2FsICFcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9KVxuICAgIC8vIGxldCBwcm9qZWN0Q29udGVudE9iamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3Byb2plY3RQcm9wZXJ0aWVzVGFibGVcIikgYXMgSFRNTFRhYmxlQ29udGVudE9iamVjdDtcblxuICAgIGN1cnJlbnRTb3VyY2VPYmplY3QgPSBzb3VyY2VQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdDtcblxuICAgIC8vIFVwZGF0ZSBUaXRsZXMgaW4gdGhlIGRvbVxuICAgIGxldCBlbGVtZW50V2l0aFNhbWVVdWlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtdXVpZD0nJHtjdXJyZW50U291cmNlT2JqZWN0LlV1aWR9J11gKTtcbiAgICBlbGVtZW50V2l0aFNhbWVVdWlkLmZvckVhY2goKF9lbGVtZW50KSA9PiB7XG4gICAgICAgIGlmKF9lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImFnZV9lbGVtZW50XCIpICYmIF9lbGVtZW50LmlkLmluY2x1ZGVzKFwiVGl0bGVcIikpXG4gICAgICAgICAgICBfZWxlbWVudC50ZXh0Q29udGVudCA9IGZvY3Vzb3V0RWxlbWVudC50ZXh0Q29udGVudDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2VsZW1lbnRXaXRoU2FtZVV1aWQgPSAnLCBfZWxlbWVudCk7XG4gICAgfSlcbiAgICBcbn1cblxuZnVuY3Rpb24gY2xpY2tlZFNvdXJjZUNvbnRhaW5lcihldmVudCA6IE1vdXNlRXZlbnQpe1xuICAgIGxldCBldmVudFRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcblxuICAgIHN3aXRjaCAoZXZlbnRUYXJnZXQuaWQpIHtcbiAgICAgICAgY2FzZSBcImFnZV9zb3VyY2VTZWFyY2hCdXR0b25cIjpcbiAgICAgICAgY2FzZSBcImFnZV9zb3VyY2VQcm9wZXJ0aWVzQnV0dG9uXCI6XG4gICAgICAgICAgICB0b2dnbGVTb3VyY2VUYWJsZXMoZXZlbnRUYXJnZXQuaWQpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcImFnZV9zb3VyY2VOZXdCdXR0b25cIjpcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdOZXcgc291cmNlIGJ1dHRvbiBjbGlja2VkJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIFxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93U291cmNlQ2hpbGRyZW4oKSB7XG4gICAgc291cmNlQ2hpbGRyZW5CdXR0b24uY2xpY2soKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzaG93U291cmNlUHJvcGVydGllcygpe1xuICAgIHNvdXJjZVByb3BlcnRpZXNCdXR0b24uY2xpY2soKTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlU291cmNlVGFibGVzKGJ1dHRvbklEIDogc3RyaW5nKXtcbiAgICBsZXQgY2hpbGRyZW5CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9zb3VyY2VTZWFyY2hCdXR0b25cIik7XG4gICAgbGV0IHByb3BlcnRpZXNCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9zb3VyY2VQcm9wZXJ0aWVzQnV0dG9uXCIpO1xuXG4gICAgc291cmNlQ2hpbGRyZW5UYWJsZS5jbGFzc0xpc3QuYWRkKFwiYWdlX2Rpc3BsYXlOb25lXCIpO1xuICAgIHNvdXJjZVByb3BlcnRpZXNUYWJsZS5jbGFzc0xpc3QuYWRkKFwiYWdlX2Rpc3BsYXlOb25lXCIpO1xuICAgIGNoaWxkcmVuQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhZ2Vfc291cmNlQnV0dG9uT25cIik7XG4gICAgcHJvcGVydGllc0J1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWdlX3NvdXJjZUJ1dHRvbk9uXCIpO1xuICAgIFxuICAgIGlmIChidXR0b25JRCA9PSBcImFnZV9zb3VyY2VTZWFyY2hCdXR0b25cIil7XG4gICAgICAgIHNvdXJjZUNoaWxkcmVuVGFibGUuY2xhc3NMaXN0LnJlbW92ZShcImFnZV9kaXNwbGF5Tm9uZVwiKTtcbiAgICAgICAgY2hpbGRyZW5CdXR0b24uY2xhc3NMaXN0LmFkZChcImFnZV9zb3VyY2VCdXR0b25PblwiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYnV0dG9uSUQgPT0gXCJhZ2Vfc291cmNlUHJvcGVydGllc0J1dHRvblwiKSB7XG4gICAgICAgIHNvdXJjZVByb3BlcnRpZXNUYWJsZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWdlX2Rpc3BsYXlOb25lXCIpO1xuICAgICAgICBwcm9wZXJ0aWVzQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJhZ2Vfc291cmNlQnV0dG9uT25cIik7XG4gICAgfVxuXG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRXaXRoQ29udGVudE9iamVjdChfY29udGVudE9iamVjdCA6IGFueSl7XG4gICAgY29uc29sZS5sb2coJ2xvYWRpbmcgU291cmNlIHBhbmVsIHdpdGggJywgX2NvbnRlbnRPYmplY3QpO1xuXG4gICAgY3VycmVudFNvdXJjZU9iamVjdCA9IF9jb250ZW50T2JqZWN0O1xuXG4gICAgLy8gbGV0IHNvdXJjZU9iamVjdCA9IGV4dGVuc2lvblN0YXRlRnJvbnQuY3VycmVudF9zb3VyY2VPYmplY3Q7XG4gICAgLy8gZXh0ZW5zaW9uU3RhdGVGcm9udC5jdXJyZW50X3NvdXJjZVV1aWQgPSBzb3VyY2VPYmplY3QuVXVpZDtcbiAgICBzb3VyY2VQcm9wZXJ0aWVzVGFibGUuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIHNvdXJjZVByb3BlcnR5Rm9jdXNPdXQpXG4gICAgc291cmNlUHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QgPSBfY29udGVudE9iamVjdDtcbiBcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdlX3NvdXJjZVRpdGxlJykudGV4dENvbnRlbnQgPSBfY29udGVudE9iamVjdC5UaXRsZTtcblxuICAgIGxldCB0Ym9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2Vfc291cmNlUHJvcGVydGllc1RhYmxlLXRib2R5Jyk7XG4gICAgdGJvZHkuaW5uZXJIVE1MID0gJyc7XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBfY29udGVudE9iamVjdCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHtrZXl9OiAke3NvdXJjZU9iamVjdFtrZXldfWApO1xuICAgICAgICBpZiAoa2V5ID09PSAnVHlwZScgfHwga2V5ID09PSAnVGl0bGUnIHx8IGtleSA9PT0gJ1VybCcgfHwga2V5ID09PSAnSUFtU291cmNlJykge1xuXG4gICAgICAgICAgICB0Ym9keS5pbm5lckhUTUwgKz0gYFxuXHRcdFxuXHRcdFx0PHRyPlxuXHRcdFx0XHQ8dGQgaWQ9YWdlX3NvdXJjZVByb3BUYWJsZS0ke2tleX0ta2V5IGNsYXNzPVwiYWdlX2VsZW1lbnRcIiA+JHtrZXl9PC90ZD5cblx0XHRcdFx0PHRkIGlkPWFnZV9zb3VyY2VQcm9wVGFibGUtJHtrZXl9LXZhbHVlIGNsYXNzPVwiYWdlX3NvdXJjZVByb3BWYWx1ZSBhZ2VfZWxlbWVudFwiIGNvbnRlbnRlZGl0YWJsZT1cInRydWVcIiA+JHtfY29udGVudE9iamVjdFtrZXldfTwvdGQ+XG5cdFx0XHQ8L3RyPlxuXHRcdFxuXHRcdGA7XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRib2R5LmlubmVySFRNTCArPSBgXG5cdFx0XG5cdFx0XHQ8dHI+XG5cdFx0XHRcdDx0ZCBpZD1hZ2Vfc291cmNlUHJvcFRhYmxlLSR7a2V5fS1rZXkgY2xhc3M9XCJhZ2VfZWxlbWVudFwiID4ke2tleX08L3RkPlxuXHRcdFx0XHQ8dGQgaWQ9YWdlX3NvdXJjZVByb3BUYWJsZS0ke2tleX0tdmFsdWUgY2xhc3M9XCJhZ2Vfc291cmNlUHJvcFZhbHVlIGFnZV9lbGVtZW50XCI+JHtfY29udGVudE9iamVjdFtrZXldfTwvdGQ+XG5cdFx0XHQ8L3RyPlxuXHRcdFxuXHRcdGA7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8vIC8vIGNvbnNvbGUubG9nKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNhZ2Vfc291cmNlUHJvcGVydGllc1RhYmxlIHRib2R5IHRyJykpXG4gICAgLy8gbGV0IGVkaXRhYmxlU291cmNlUHJvcGVydHlUZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWdlX2VkaXRhYmxlU291cmNlUHJvcGVydHknKTtcbiAgICAvLyAvLyAvLyBjb25zb2xlLmxvZyhlZGl0YWJsZVNvdXJjZVByb3BlcnR5VGQpXG4gICAgLy8gZm9yIChsZXQgZWRpdGFibGVTb3VyY2VQcm9wZXJ0eVRkIG9mIGVkaXRhYmxlU291cmNlUHJvcGVydHlUZHMpIHtcbiAgICAvLyAgICAgLy8gY29uc29sZS5sb2coZWRpdGFibGVTb3VyY2VQcm9wZXJ0eVRkLnRleHRDb250ZW50KTtcbiAgICAvLyAgICAgLy8gY29uc29sZS5sb2cocHJvcGVydHlSb3cudGV4dENvbnRlbnQubGVuZ3RoKVxuICAgIC8vICAgICAvLyBlZGl0YWJsZVNvdXJjZVByb3BlcnR5VGQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCByZWFkU291cmNlUHJvcGVydGllc0Zyb21Eb21BbmRXcml0ZVB1dClcbiAgICAvLyAgICAgZWRpdGFibGVTb3VyY2VQcm9wZXJ0eVRkLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgZWRpdGFibGVTb3VyY2VQcm9wZXJ0eUZvY3VzT3V0KVxuXG4gICAgLy8gfVxuXG4gICAgYXdhaXQgbG9hZFNvdXJjZUNoaWxkcmVuKF9jb250ZW50T2JqZWN0KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbG9hZFNvdXJjZUNoaWxkcmVuKF9jb250ZW50T2JqZWN0IDogYW55KXtcblxuICAgIGxldCBjaGlsZENvbnRlbnRFZGdlT2JqZWN0cyA9IGF3YWl0IGFnZV9kYmlzLkNvbnRlbnRFZGdlX1NlbGVjdENoaWxkT2ZVdWlkKF9jb250ZW50T2JqZWN0LlV1aWQpO1xuXG5cblxuICAgIGxldCB0Ym9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2Vfc291cmNlQ2hpbGRUYWJsZS10Ym9keScpO1xuICAgIHRib2R5LmlubmVySFRNTCA9ICcnO1xuXG4gICAgZm9yIChsZXQgY2hpbGRDb250ZW50RWRnZU9iamVjdCBvZiBjaGlsZENvbnRlbnRFZGdlT2JqZWN0cykge1xuICAgICAgICBsZXQgdGFibGVSb3dIdG1sID0gYFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImFnZV9lbGVtZW50IGFnZV9zb3VyY2VDaGlsZFRhYmxlLVRhYmxlXCIgZGF0YS1VdWlkPVwiJHtjaGlsZENvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnQuVXVpZH1cIj4ke2NoaWxkQ29udGVudEVkZ2VPYmplY3QuY29udGVudC5UYWJsZX08L3RkPlxuXHRcdFx0XHQ8dGQgY2xhc3M9XCJhZ2VfZWxlbWVudCBhZ2Vfc291cmNlQ2hpbGRUYWJsZS1UeXBlXCIgZGF0YS1VdWlkPVwiJHtjaGlsZENvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnQuVXVpZH1cIj4ke2NoaWxkQ29udGVudEVkZ2VPYmplY3QuY29udGVudC5UeXBlfTwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiYWdlX2VsZW1lbnQgYWdlX3NvdXJjZUNoaWxkVGFibGUtVGl0bGVcIiBkYXRhLVV1aWQ9XCIke2NoaWxkQ29udGVudEVkZ2VPYmplY3QuY29udGVudC5VdWlkfVwiIGNvbnRlbnRlZGl0YWJsZT1cInRydWVcIj4ke2NoaWxkQ29udGVudEVkZ2VPYmplY3QuY29udGVudC5UaXRsZX08L3RkPlxuXG4gICAgICAgICAgICBgO1xuICAgICAgICBsZXQgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpIGFzIEhUTUxQcm9qZWN0VGFibGVSb3c7XG4gICAgICAgIHRyLmlkID0gJ2FnZV9zb3VyY2VTZWFyY2hOb2RlLScgKyBjaGlsZENvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnQuVXVpZDtcbiAgICAgICAgdHIubm9kZU9iamVjdCA9IGNoaWxkQ29udGVudEVkZ2VPYmplY3Q7XG4gICAgICAgIC8vIHRyLmFhYSA9IFwiYXNkXCI7XG4gICAgICAgIHRyLnNldEF0dHJpYnV0ZSgnZGF0YS1mdWNrJywgJ2YqY2snKTtcbiAgICAgICAgLy8gdHIuZGF0YXNldC5Ob2RlID0gMTtcbiAgICAgICAgLy8gdHIuZGF0YXNldC5VdWlkID0gY2hpbGRPYmplY3QuVXVpZDtcbiAgICAgICAgdHIuc2V0QXR0cmlidXRlKCdkYXRhLU5vZGUnLCAnMScpO1xuICAgICAgICB0ci5zZXRBdHRyaWJ1dGUoJ2RhdGEtVXVpZCcsIGNoaWxkQ29udGVudEVkZ2VPYmplY3QuY29udGVudC5VdWlkKTtcbiAgICAgICAgLy8gdHIudGFiSW5kZXggPSAxO1xuICAgICAgICB0ci5pbm5lckhUTUwgPSB0YWJsZVJvd0h0bWw7XG4gICAgICAgIC8vIHRyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tTb3VyY2VDaGlsZFJvdyk7XG4gICAgICAgIC8vIHRyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7IGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLm5vZGVPYmplY3QpIH0pO1xuICAgICAgICAvLyBUYXJnZXRzIG9ubHkgdGhlIGxhc3QgKGkuZS4gVGl0bGUpIGNvbHVtblxuICAgICAgICAvLyB0ci5sYXN0RWxlbWVudENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCBhc3luYyAoZXZlbnQpID0+IHtcblxuICAgICAgICAvLyAgICAgbGV0IHV1aWQgPSBldmVudC50YXJnZXQucGFyZW50RWxlbWVudC5ub2RlT2JqZWN0LmNvbnRlbnQuVXVpZDtcbiAgICAgICAgLy8gICAgIGxldCBjb250ZW50T2JqZWN0ID0gZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQubm9kZU9iamVjdC5jb250ZW50O1xuICAgICAgICAvLyAgICAgY29udGVudE9iamVjdC5UaXRsZSA9IGV2ZW50LnRhcmdldC50ZXh0Q29udGVudDtcbiAgICAgICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKFwiQ0NDQ0NDQ0NDQ1wiLCBjb250ZW50T2JqZWN0KVxuICAgICAgICAvLyAgICAgbGV0IHB1dENvbnRlbnRPYmplY3QgPSBhd2FpdCBkYmlzLkNvbnRlbnRfVXBkYXRlV2l0aENvbnRlbnRPYmplY3QoY29udGVudE9iamVjdCk7XG5cbiAgICAgICAgLy8gICAgIGxldCBmZXRjaGVkQ29udGVudE9iamVjdCA9IGF3YWl0IGRiaXMuQ29udGVudF9TZWxlY3RPblV1aWQodXVpZCk7XG5cbiAgICAgICAgLy8gICAgIGF3YWl0IGZldGNoQ3VycmVudFNvdXJjZUNoaWxkcmVuVGhlbldyaXRlVG9TdGF0ZXMoKTtcbiAgICAgICAgLy8gICAgIHBvcHVsYXRlU291cmNlQ2hpbGRUYWJsZUZyb21TdGF0ZSgpO1xuXG4gICAgICAgIC8vICAgICAvLyBjb25zb2xlLmxvZyhcIkRERERERERERERcIiwgZmV0Y2hlZENvbnRlbnRPYmplY3QpXG4gICAgICAgIC8vICAgICAvLyBjb3B5U291cmNlQ2hpbGRUYWJsZUZyb21Eb20oKTtcblxuICAgICAgICAvLyAgICAgLy8gcHV0Q3VycmVudFNvdXJjZU9iamVjdCgpO1xuICAgICAgICAvLyAgICAgLy8gZmV0Y2hDdXJyZW50U291cmNlQ2hpbGRyZW5UaGVuV3JpdGVUb1N0YXRlcygpO1xuICAgICAgICAvLyAgICAgLy8gcG9wdWxhdGVTb3VyY2VDaGlsZFRhYmxlRnJvbVN0YXRlKCk7XG4gICAgICAgIC8vIH0pO1xuICAgICAgICAvLyB0ci5jb250ZW50RWRpdGFibGUgPSAnVHJ1ZSc7XG5cbiAgICAgICAgdGJvZHkuYXBwZW5kKHRyKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codHIpXG4gICAgfVxuICAgIC8vIGNvbnNvbGUudGFibGUoY2hpbGRPYmplY3RzKVxuXG59XG5cbmZ1bmN0aW9uIHNvdXJjZVByb3BlcnR5Rm9jdXNPdXQoZXZlbnQgOiBGb2N1c0V2ZW50KXtcbiAgICBjb25zb2xlLmxvZygnRk9DVVMgT1VUIEZST00gU09VUkNFIFBST1BFUlRZJyk7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvY3VzT25MYXN0Q2hpbGRSb3dUaXRsZSgpe1xuICAgIGxldCB0Ym9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3NvdXJjZUNoaWxkVGFibGUtdGJvZHlcIikgYXMgSFRNTFRhYmxlU2VjdGlvbkVsZW1lbnQ7XG4gICAgLy8gY29uc29sZS5sb2coXCJ0Ym9keSA9IFwiLCB0Ym9keSlcbiAgICBsZXQgbGFzdFJvdyA9IHRib2R5Lmxhc3RFbGVtZW50Q2hpbGQubGFzdEVsZW1lbnRDaGlsZCBhcyBIVE1MVGFibGVDZWxsRWxlbWVudDtcbiAgICAvLyBjb25zb2xlLmxvZyhcImxhc3RSb3cgPSBcIiwgbGFzdFJvdylcblxuICAgIGlmKGxhc3RSb3cudGV4dENvbnRlbnQubGVuZ3RoID09IDApe1xuICAgICAgICBsYXN0Um93LmlubmVySFRNTCA9IFwiPGRpdj48YnI+PC9kaXY+XCJcbiAgICAgICAgbGFzdFJvdy5mb2N1cygpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBsYXN0Um93LmZvY3VzKCk7XG4gICAgICAgICAgICAvLyB0aGlzLnNlbGVjdGlvblN0YXJ0ID0gdGhpcy5zZWxlY3Rpb25FbmQgPSB0aGlzLnZhbHVlLmxlbmd0aDtcbiAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKVxuICAgICAgICAgICAgdmFyIHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKVxuICAgICAgICBcbiAgICAgICAgICAgIHJhbmdlLnNldFN0YXJ0KGxhc3RSb3cuY2hpbGROb2Rlc1swXSwgbGFzdFJvdy5jaGlsZE5vZGVzWzBdLnRleHRDb250ZW50Lmxlbmd0aClcbiAgICAgICAgICAgIHJhbmdlLmNvbGxhcHNlKHRydWUpXG4gICAgICAgIFxuICAgICAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpXG4gICAgICAgICAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpXG5cbiAgICB9XG59XG5cblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRDc3MoKTogdm9pZCB7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmQoc291cmNlQ3NzKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQ3NzKCk6IHZvaWQge1xuICAgIHNvdXJjZUNzcy5yZW1vdmUoKTtcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIG92ZXJsYXkgZnJvbSBcIi4vb3ZlcmxheVwiO1xuXG5cbmxldCBleHRlbnNpb25TdGF0ZUZyb250ID17XG4gICAgYWN0aXZlOiBmYWxzZSxcbn07XG5cblxuLy8gU2V0IHVwIG1vZHVsZXMgYW5kIGZldGNoIGRhdGEsIGJ1dCBkb2VzIG5vdCByZW5kZXIgYW55dGhpbmdcbihmdW5jdGlvbiBpbml0KCkge1xuICAgIG92ZXJsYXkuaW5pdE92ZXJsYXkoKTsgIFxufSkoKTtcblxuXG5cbi8qIFxuICAgIFRPR0dMRVMgVEhFIEVYVEVOU0lPTiBGUk9OVEVORCBVSVxuKi9cbmJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2UpID0+IHtcbiAgICBcbiAgICBpZiAobWVzc2FnZS5uYW1lID09PSAndG9nZ2xlRXh0ZW5zaW9uJykge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRvZ2dsZSBFeGl0ZW5zaW9uIE1lc3NhZ2UgcmVjaWV2ZWQhXCIpXG5cbiAgICAgICAgaWYgKGV4dGVuc2lvblN0YXRlRnJvbnQuYWN0aXZlKXtcbiAgICAgICAgICAgIGV4dGVuc2lvblN0YXRlRnJvbnQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBvdmVybGF5LmhpZGVPdmVybGF5KCk7XG5cbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleHRlbnNpb25TdGF0ZUZyb250LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBvdmVybGF5LnNob3dPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0pO1xuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=