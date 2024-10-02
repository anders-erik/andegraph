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
/* harmony import */ var _dbi_send__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dbi-send */ "./webextension/wp-dev/dbi-send.ts");
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
    clipboardContainer.classList.add("age_panelContainer");
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
        // let sourceUuid = sourceObject.Uuid;
        // let sourceUuid = source.getCurrentSourceUuid();
        // let sourceObject: any = source.currentSourceObject;
        let sourceUuid = sourceObject.Uuid;
        console.log('postNewTextNodeToCurrentSourceAndFullReloadOfSourceChildren()');
        console.log('sourceUuid = ', sourceUuid);
        // Content_InsertChildUuidTable(Uuid, childTable)
        if (sourceUuid !== undefined) {
            // let newTextObject = (await age_dbisWe.Content_InsertChildUuidTable(extensionStateFront.current_sourceObject.Uuid, 'Text')).Content;
            let newTextContentObject = (yield _dbi_send__WEBPACK_IMPORTED_MODULE_2__.age_dbis.ContentEdge_InsertAdjacentToUuidIntoTable(sourceUuid, 1, 'Text', '', '', '/')).content;
            // console.log(newTextObject)
            newTextContentObject.Title = TextContent.substring(0, 25);
            newTextContentObject.TextContent = TextContent;
            newTextContentObject.Type = textType;
            yield _dbi_send__WEBPACK_IMPORTED_MODULE_2__.age_dbis.Content_UpdateWithContentObject(newTextContentObject);
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
        // Content_InsertChildUuidTable(Uuid, childTable)
        if (sourceUuid !== undefined) {
            // let newCodeObject = (await age_dbisWe.Content_InsertChildUuidTable(extensionStateFront.current_sourceObject.Uuid, 'Code')).Content;
            let newCodeContentObject = (yield _dbi_send__WEBPACK_IMPORTED_MODULE_2__.age_dbis.ContentEdge_InsertAdjacentToUuidIntoTable(sourceUuid, 1, 'Code', '', '', '/')).content;
            // console.log(newTextObject)
            newCodeContentObject.Title = CodeContent.substring(0, 25);
            newCodeContentObject.Type = Type;
            newCodeContentObject.CodeContent = CodeContent;
            yield _dbi_send__WEBPACK_IMPORTED_MODULE_2__.age_dbis.Content_UpdateWithContentObject(newCodeContentObject);
            yield _source_source__WEBPACK_IMPORTED_MODULE_1__.loadWithContentObject(sourceObject);
            _source_source__WEBPACK_IMPORTED_MODULE_1__.focusOnLastChildRowTitle();
        }
    });
}
function postNewFileToCurrentSourceAndFullReloadOfSourceChildren(file, queryParams, mimeType) {
    return __awaiter(this, void 0, void 0, function* () {
        let sourceObject = _source_source__WEBPACK_IMPORTED_MODULE_1__.getCurrentSourceObject();
        let sourceUuid = sourceObject.Uuid;
        console.log(sourceUuid);
        // Content_InsertChildUuidTable(Uuid, childTable)
        if (sourceUuid !== undefined) {
            // let newFileObject = (await age_dbisWe.Content_InsertChildUuidTable(sourceUuid, 'File')).Content;
            let newFileContentObject = (yield _dbi_send__WEBPACK_IMPORTED_MODULE_2__.age_dbis.ContentEdge_InsertAdjacentToUuidIntoTable(sourceUuid, 1, 'File', '', '', '/')).content;
            // console.log(newTextObject)
            // newFileObject.Title = CodeContent.substring(0, 25);
            // newFileObject.Type = Type;
            // newFileObject.CodeContent = CodeContent;
            // await age_dbisWe.Content_UpdateOnContentObject(newFileObject);
            // await age_dbisWe.filePost(newFileContentObject.Uuid, file, queryParams, mimeType);
            yield _dbi_send__WEBPACK_IMPORTED_MODULE_2__.age_dbis.Post_File(newFileContentObject.Uuid, file, queryParams, mimeType);
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
        }
        if (keyEvent.altKey) {
            switch (keyEvent.key) {
                case 'p':
                    // console.log('Alt + p')
                    console.log("textConcatenationContent = ", textConcatenationContent);
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
/* harmony export */   test: () => (/* binding */ test)
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
let age_apiUrl = 'http://localhost:3000/api/v02';
function test() {
    console.log("Loaded dbi-send.ts");
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
/* harmony import */ var _dbi_send__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dbi-send */ "./webextension/wp-dev/dbi-send.ts");

(0,_dbi_send__WEBPACK_IMPORTED_MODULE_0__.test)();
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
    overlayContainer.addEventListener("click", extensionClickHandler);
    overlayContainer.addEventListener("loadsource", (event) => {
        // console.log('load source event!', event.detail.contentObject);
        _source_source__WEBPACK_IMPORTED_MODULE_2__.loadWithContentObject(event.detail.contentObject);
    });
    overlayContainer.addEventListener("newsource", (event) => { });
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
        tr.setAttribute('data-Node', '1');
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
/* harmony export */   removeCss: () => (/* binding */ removeCss)
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



let currentProjectObject;
let sidePanel;
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
    projectContainer.addEventListener("click", projectClick);
    projectContainer.addEventListener("focusout", projectPropertyFocusOut);
    _fetcher__WEBPACK_IMPORTED_MODULE_0__.fetchHtml("projects.html")
        .then(html => {
        // console.log("HTML : ", html)
        projectContainer.innerHTML = html;
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
    });
    projectCss = document.createElement("style");
    projectCss.id = "age_projectStyle";
    _fetcher__WEBPACK_IMPORTED_MODULE_0__.fetchCss("projects.css")
        .then(css => {
        projectCss.innerText = css;
    });
    console.log("sidePanel.id = ", sidePanel.id);
    sidePanel.append(projectContainer);
    fetchProjectSearch("")
        .then((contentObjectArray) => {
        console.log(contentObjectArray);
        _project_dom__WEBPACK_IMPORTED_MODULE_1__.populateProjectSearchTable(projectSearchTable, projectSearchObjects);
    });
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
    console.log("projectContentObject.contentObject = ", projectPropertiesTable.contentObject);
    // let eventTarget = event.target as HTMLElement;
    // console.log('eventTarget.textContent = ', eventTarget.textContent);
}
function clickedProjectContextMenu(event) {
    let eventTarget = event.target;
    switch (eventTarget.id) {
        case "newProjectBtn":
            // console.log(eventTarget.id)
            _dbi_send__WEBPACK_IMPORTED_MODULE_2__.age_dbis.Content_InsertOnTable("Project").then((newProjectObject) => {
                loadProjectWithContentObject(newProjectObject);
                performSearch();
            }); // perform regular search
            break;
        case "newSourceBtn":
            insertNewSourceToActiveProject();
            break;
        case "btn3":
            console.log(eventTarget.id);
            break;
        case "btn4":
            console.log(eventTarget.id);
            break;
        case "btn5":
            console.log(eventTarget.id);
            break;
        default:
            break;
    }
}
/**
 * Add new child-source, fires off the loadsource CutomEvent, and then reloads the project child table.
 */
function insertNewSourceToActiveProject() {
    return __awaiter(this, void 0, void 0, function* () {
        let contentEdgeObject = yield _dbi_send__WEBPACK_IMPORTED_MODULE_2__.age_dbis.ContentEdge_InsertAdjacentToUuidIntoTable(currentProjectObject.Uuid, 1, 'Source', '', '', '/');
        let loadsourceEvent = new CustomEvent("loadsource", {
            bubbles: true,
            detail: { contentObject: contentEdgeObject.content },
        });
        projectContainer.dispatchEvent(loadsourceEvent);
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
        // console.log("CLICKED CONTEXT MENU!@")
        let optionsContextMenu = document.getElementById("age_moreProjectOptionsContextMenu");
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
        // projectTitleClicked(event.target as HTMLElement);
        let projectContainerElement = document.getElementById("age_projectContainer");
        projectContainerElement.classList.contains("collapsed") ? projectContainerElement.classList.remove("collapsed") : projectContainerElement.classList.add("collapsed");
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
    // move focus to the children-tab
    document.getElementById("age_projectChildrenButton").click();
}
function toggleMoreOptions() {
    // console.log("TOGGLE MORE OPTIONS")
    let buttonBoundingRect = projectMoreOptionsButton.getBoundingClientRect();
    let btnLeft = buttonBoundingRect.left;
    let btnBottom = buttonBoundingRect.bottom;
    let moreOptionsContextMenu = document.getElementById("age_moreProjectOptionsContextMenu");
    moreOptionsContextMenu.style.left = btnLeft + "px";
    moreOptionsContextMenu.style.top = btnBottom + 5 + "px";
    moreOptionsContextMenu.classList.contains("age_displayNone") ? moreOptionsContextMenu.classList.remove("age_displayNone") : moreOptionsContextMenu.classList.add("age_displayNone");
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
/* harmony export */   removeCss: () => (/* binding */ removeCss)
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
    sourceContainer.classList.add("age_panelContainer");
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
    // console.log("sourceContentObject.contentObject = ", sourcePropertiesTable.contentObject);
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
// Set up modules and fetch data
(function init() {
    _overlay__WEBPACK_IMPORTED_MODULE_0__.initOverlay();
    // let settingItem = browser.storage.local.set({ test: "VALUE" });
})();
// Display the extension-container
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
/**
 *  Show injected container
 */
function start() {
    console.log("START");
    extensionStateFront.active = true;
    // console.log(await fetcher.fetchHtml("overlay.html"))
    _overlay__WEBPACK_IMPORTED_MODULE_0__.showOverlay();
}
/**
 *
 *  Hide injected container
 */
function stop() {
    console.log("STOP");
    extensionStateFront.active = false;
    _overlay__WEBPACK_IMPORTED_MODULE_0__.hideOverlay();
}
// const message = "Hello World!";
// console.log("TYPESCRIPT@")
// console.log(message.toLowerCase(), "2")
// // message();
// let typeA = {
//     a: "a",
//     A: 1,
// }
// function funfun(_x: string){
//     console.log(_x);
// }
// funfun(typeA.a);
// function greet(person:string, date:string) {
//     console.log(`Hello ${person}, today is ${date}!`);
// }
// // greet("Brendan");

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFNLEdBQUcsS0FBSyxDQUFDO0lBQ25DLGlEQUFtQixFQUFFLENBQUM7QUFDMUIsQ0FBQztBQUdELGtDQUFrQztBQUdsQyw2QkFBNkI7QUFFN0IsMENBQTBDO0FBRTFDLGdCQUFnQjtBQUVoQixnQkFBZ0I7QUFDaEIsY0FBYztBQUNkLFlBQVk7QUFDWixJQUFJO0FBR0osK0JBQStCO0FBQy9CLHVCQUF1QjtBQUN2QixJQUFJO0FBQ0osbUJBQW1CO0FBRW5CLCtDQUErQztBQUMvQyx5REFBeUQ7QUFDekQsSUFBSTtBQUVKLHVCQUF1QiIsInNvdXJjZXMiOlsid2VicGFjazovL3NvdXJjZXMvLi93ZWJleHRlbnNpb24vd3AtZGV2L2NsaXBib2FyZC50cyIsIndlYnBhY2s6Ly9zb3VyY2VzLy4vd2ViZXh0ZW5zaW9uL3dwLWRldi9kYmktc2VuZC50cyIsIndlYnBhY2s6Ly9zb3VyY2VzLy4vd2ViZXh0ZW5zaW9uL3dwLWRldi9mZXRjaGVyLnRzIiwid2VicGFjazovL3NvdXJjZXMvLi93ZWJleHRlbnNpb24vd3AtZGV2L292ZXJsYXkudHMiLCJ3ZWJwYWNrOi8vc291cmNlcy8uL3dlYmV4dGVuc2lvbi93cC1kZXYvcHJvamVjdHMvcHJvamVjdF9kb20udHMiLCJ3ZWJwYWNrOi8vc291cmNlcy8uL3dlYmV4dGVuc2lvbi93cC1kZXYvcHJvamVjdHMvcHJvamVjdHMudHMiLCJ3ZWJwYWNrOi8vc291cmNlcy8uL3dlYmV4dGVuc2lvbi93cC1kZXYvc291cmNlL3NvdXJjZS50cyIsIndlYnBhY2s6Ly9zb3VyY2VzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NvdXJjZXMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NvdXJjZXMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zb3VyY2VzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc291cmNlcy8uL3dlYmV4dGVuc2lvbi93cC1kZXYvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZmV0Y2hlciBmcm9tIFwiLi9mZXRjaGVyXCI7XHJcbmltcG9ydCAqIGFzIHNvdXJjZSBmcm9tIFwiLi9zb3VyY2Uvc291cmNlXCI7XHJcbmltcG9ydCB7IGFnZV9kYmlzIH0gZnJvbSBcIi4vZGJpLXNlbmRcIjtcclxuXHJcbmxldCBzaWRlUGFuZWw6IEVsZW1lbnQ7XHJcblxyXG5cclxubGV0IGNsaXBib2FyZENvbnRhaW5lcjogRWxlbWVudDtcclxubGV0IGNsaXBib2FyZENzczogSFRNTEVsZW1lbnQ7XHJcblxyXG5cclxuLy8gVkFSU1xyXG5sZXQgd2FpdGluZ1NlY29uZFNoaWZ0ID0gMDtcclxubGV0IHdhaXRpbmdTZWNvbmRDdHJsU2hpZnQgPSAwO1xyXG5cclxuXHJcbmxldCBjbGlwYm9hcmRJbm5lciA6IEhUTUxFbGVtZW50O1xyXG5sZXQgY2xpcGJvYXJkQ29kZUNoZWNrYm94IDogSFRNTElucHV0RWxlbWVudDtcclxubGV0IGNsaXBib2FyZFRleHRUeXBlSW5wdXQgOiBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxubGV0IGNsaXBib2FyZENvbmNhdENvbnRlbnRzIDogSFRNTEVsZW1lbnQ7XHJcbmxldCB0ZXh0Q29uY2F0ZW5hdGlvbkNhcHR1cmluZyA6IGJvb2xlYW4gPSBmYWxzZTtcclxubGV0IHRleHRDb25jYXRlbmF0aW9uQ29udGVudCA6IHN0cmluZyA9IFwiXCI7XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdENsaXBib2FyZChfc2lkZVBhbmVsOiBFbGVtZW50KSB7XHJcblx0Ly8gY2xpcGJvYXJkQ29kZUNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRvZ2dsZVNlbGVjdENvZGUpO1xyXG5cclxuXHQvLyB3cml0ZVRleHRDb25jYXRlbmF0aW9uQ29udGVudFRvRG9tKCk7XHJcblxyXG5cdC8vIGlmIChleHRlbnNpb25TdGF0ZUZyb250LnRleHRDb25jYXRlbmF0aW9uQ2FwdHVyaW5nKSB7XHJcblx0Ly8gXHRjbGlwYm9hcmRJbm5lci5jbGFzc0xpc3QuYWRkKCdhZ2VfYWN0aXZlQ2xpcGJvYXJkJyk7XHJcblx0Ly8gfVxyXG5cdC8vIGVsc2Uge1xyXG5cdC8vIFx0Y2xpcGJvYXJkSW5uZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWdlX2FjdGl2ZUNsaXBib2FyZCcpO1xyXG5cdC8vIH1cclxuXHJcblx0LyogXHJcblx0XHJcblx0XHRcdE5FVyBORVcgTkVXIC0gMjAyNC0xMC0wMlxyXG5cdFxyXG5cdCovXHJcblxyXG5cdHNpZGVQYW5lbCA9IF9zaWRlUGFuZWw7XHJcblxyXG5cdGNsaXBib2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdGNsaXBib2FyZENvbnRhaW5lci5pZCA9IFwiYWdlX2NsaXBib2FyZENvbnRhaW5lclwiO1xyXG5cdGNsaXBib2FyZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYWdlX3BhbmVsQ29udGFpbmVyXCIpO1xyXG5cclxuXHJcblxyXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NvcHknLCBjb3B5RXZlbnQpXHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY3V0JywgY3V0RXZlbnQpXHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncGFzdGUnLCBwYXN0ZUV2ZW50KVxyXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlkb3duQWN0aXZlRXh0ZW5zaW9uKVxyXG5cclxuXHJcblx0ZmV0Y2hlci5mZXRjaEh0bWwoXCJjbGlwYm9hcmQuaHRtbFwiKVxyXG5cdFx0LnRoZW4oaHRtbCA9PiB7XHJcblx0XHRcdGNsaXBib2FyZENvbnRhaW5lci5pbm5lckhUTUwgPSBodG1sO1xyXG5cclxuXHJcblx0XHRcdGNsaXBib2FyZElubmVyID0gY2xpcGJvYXJkQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX2NsaXBib2FyZElubmVyXCIpO1xyXG5cdFx0XHRjbGlwYm9hcmRDb2RlQ2hlY2tib3ggPSBjbGlwYm9hcmRDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2VfY2xpcGJvYXJkQ29kZUNoZWNrYm94XCIpO1xyXG5cdFx0XHRjbGlwYm9hcmRUZXh0VHlwZUlucHV0ID0gY2xpcGJvYXJkQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX2NsaXBib2FyZFRleHRUeXBlSW5wdXRcIik7XHJcblx0XHRcdGNsaXBib2FyZENvbmNhdENvbnRlbnRzID0gY2xpcGJvYXJkQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX2NsaXBib2FyZENvbmNhdENvbnRlbnRcIik7XHJcblx0XHR9KVxyXG5cclxuXHRjbGlwYm9hcmRDc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0Y2xpcGJvYXJkQ3NzLmlkID0gXCJhZ2VfY2xpcGJvYXJkU3R5bGVcIjtcclxuXHRmZXRjaGVyLmZldGNoQ3NzKFwiY2xpcGJvYXJkLmNzc1wiKVxyXG5cdFx0LnRoZW4oY3NzID0+IHtcclxuXHRcdFx0Y2xpcGJvYXJkQ3NzLmlubmVyVGV4dCA9IGNzcztcclxuXHRcdH0pXHJcblxyXG5cdC8vIGNvbnNvbGUubG9nKFwic2lkZVBhbmVsLmlkID0gXCIsIHNpZGVQYW5lbC5pZClcclxuXHJcblx0c2lkZVBhbmVsLmFwcGVuZChjbGlwYm9hcmRDb250YWluZXIpO1xyXG5cclxuIFxyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuLyogXHJcblxyXG5cdENMSVBCT0FSRCBGVU5DVElPTlNcclxuXHJcbiovXHJcblxyXG5cclxuZnVuY3Rpb24gd3JpdGVUZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnRUb0RvbSgpIHtcclxuXHJcblx0bGV0IGNsaXBib2FyZFN0cmluZyA9IHRleHRDb25jYXRlbmF0aW9uQ29udGVudDtcclxuXHRsZXQgY2xpcGJvYXJkSW5uZXJIdG1sID0gJzxkaXY+JyArIGNsaXBib2FyZFN0cmluZy5yZXBsYWNlKC9cXG4vZywgJzxicj4nKSArICc8L2Rpdj4nO1xyXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2VfY2xpcGJvYXJkQ29uY2F0Q29udGVudCcpLmlubmVySFRNTCA9IGNsaXBib2FyZElubmVySHRtbDtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gc3RhcnRDbGlwYm9hcmRUZXh0Q29uY2F0ZW5hdGlvbigpIHtcclxuXHJcblx0dGV4dENvbmNhdGVuYXRpb25DYXB0dXJpbmcgPSB0cnVlO1xyXG5cdC8vIGV4dGVuc2lvblN0YXRlRnJvbnQudGV4dENvbmNhdGVuYXRpb25Db250ZW50ID0gJyc7XHJcblx0Ly8gd3JpdGVUZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnRUb0RvbSgpO1xyXG5cdC8vd3JpdGVTdGF0ZUZyb21Gcm9udCgpO1xyXG5cdC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2VfY2xpcGJvYXJkQ29udGFpbmVyJykuY2xhc3NMaXN0LnJlbW92ZSgnYWdlX2Rpc3BsYXlOb25lJyk7XHJcblx0Y2xpcGJvYXJkSW5uZXIuY2xhc3NMaXN0LmFkZCgnYWdlX2FjdGl2ZUNsaXBib2FyZCcpO1xyXG5cdGNvbnNvbGUubG9nKCdzdGFydCB0ZXh0IGNvbmNhdGVudGF0aW9uIGNhcHR1cmUnKTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFNwYWNlQ2hhcmFjdGVyVG9DYXB0dXJlQ29uY2F0ZW5hdGlvbkNvbnRlbnRzKCkge1xyXG5cdGNvbnNvbGUubG9nKCdhZGRlZCBuZXcgc3BhY2UnKVxyXG5cdGlmICh0ZXh0Q29uY2F0ZW5hdGlvbkNhcHR1cmluZykge1xyXG5cdFx0dGV4dENvbmNhdGVuYXRpb25Db250ZW50ICs9ICcgJztcclxuXHRcdC8vd3JpdGVTdGF0ZUZyb21Gcm9udCgpO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZE5ld0xpbmVUb0NhcHR1cmVDb25jYXRlbmF0aW9uQ29udGVudHMoKSB7XHJcblx0Y29uc29sZS5sb2coJ2FkZGVkIG5ldyBsaW5lJylcclxuXHRpZiAodGV4dENvbmNhdGVuYXRpb25DYXB0dXJpbmcpIHtcclxuXHRcdHRleHRDb25jYXRlbmF0aW9uQ29udGVudCArPSAnXFxuJztcclxuXHRcdC8vd3JpdGVTdGF0ZUZyb21Gcm9udCgpO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0b3BDbGlwYm9hcmRUZXh0Q29uY2F0ZW5hdGlvbigpIHtcclxuXHJcblxyXG5cclxuXHR0ZXh0Q29uY2F0ZW5hdGlvbkNhcHR1cmluZyA9IGZhbHNlO1xyXG5cdHRleHRDb25jYXRlbmF0aW9uQ29udGVudCA9ICcnO1xyXG5cdHdyaXRlVGV4dENvbmNhdGVuYXRpb25Db250ZW50VG9Eb20oKTtcclxuXHRjbGlwYm9hcmRJbm5lci5jbGFzc0xpc3QucmVtb3ZlKCdhZ2VfYWN0aXZlQ2xpcGJvYXJkJyk7XHJcblx0Ly93cml0ZVN0YXRlRnJvbUZyb250KCk7XHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qIFxyXG5cclxuXHRDTElQQk9BUkQgRVZFTlRTXHJcblxyXG4qL1xyXG5cclxuLy8gZnVuY3Rpb24gdG9nZ2xlU2VsZWN0Q29kZSgpIHtcclxuLy8gXHRpZiAoY2xpcGJvYXJkQ29kZUNoZWNrYm94LmNoZWNrZWQpIHtcclxuLy8gXHRcdGNsaXBib2FyZFRleHRUeXBlSW5wdXQuZGlzYWJsZWQgPSBmYWxzZTtcclxuLy8gXHR9XHJcbi8vIFx0ZWxzZSB7XHJcbi8vIFx0XHRjbGlwYm9hcmRUZXh0VHlwZUlucHV0LmRpc2FibGVkID0gdHJ1ZTtcclxuLy8gXHR9XHJcblxyXG4vLyB9XHJcblxyXG5hc3luYyBmdW5jdGlvbiBwYXN0ZUV2ZW50KGV2ZW50IDogQ2xpcGJvYXJkRXZlbnQpIHtcclxuXHQvLyBjb25zb2xlLmxvZygncGFzdGVwYXN0ZScpXHJcblx0Y29uc29sZS5sb2coJ1BBU1RFIEVWRU5UJylcclxuXHQvLyBjb25zb2xlLmxvZyhldmVudC5jbGlwYm9hcmREYXRhLmZpbGVzWzBdKVxyXG5cclxuXHJcblx0XHJcblxyXG5cclxuXHRsZXQgY2xpcGJvYXJkQ29udGVudFR5cGUgPSBkZXRlcm1pbmVDbGlwYm9hcmRDb250ZW50VHlwZShldmVudC5jbGlwYm9hcmREYXRhKTtcclxuXHJcblxyXG5cdGlmIChjbGlwYm9hcmRDb250ZW50VHlwZSA9PT0gJ3RleHQnKSB7XHJcblx0XHRjb25zb2xlLmxvZygnZGVhbCB3aXRoIHRleHQnKTsgXHJcblxyXG5cdFx0bGV0IGNsaXBib2FyZFRleHQgPSAoZXZlbnQuY2xpcGJvYXJkRGF0YSAvKiB8fCB3aW5kb3cuY2xpcGJvYXJkRGF0YSAqLykuZ2V0RGF0YShcInRleHRcIik7XHJcblx0XHRjb25zb2xlLmxvZygnY2xpcGJvYXJkVGV4dCA9ICcsIGNsaXBib2FyZFRleHQpO1xyXG5cdFx0XHJcblxyXG5cdFx0aWYgKHRleHRDb25jYXRlbmF0aW9uQ2FwdHVyaW5nKSB7XHJcblxyXG5cdFx0XHR0ZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnQgKz0gY2xpcGJvYXJkVGV4dDtcclxuXHJcblx0XHRcdHdyaXRlVGV4dENvbmNhdGVuYXRpb25Db250ZW50VG9Eb20oKVxyXG5cclxuXHRcdFx0Ly93cml0ZVN0YXRlRnJvbUZyb250KCk7XHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKGV4dGVuc2lvblN0YXRlRnJvbnQudGV4dENvbmNhdGVuYXRpb25Db250ZW50KTtcclxuXHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Y29uc29sZS5sb2coJ1BBU1RFIFRPIE5FVyBTSEFSRCcpXHJcblxyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhjbGlwYm9hcmRDb2RlQ2hlY2tib3guY2hlY2tlZClcclxuXHJcblx0XHRcdGlmIChjbGlwYm9hcmRDb2RlQ2hlY2tib3guY2hlY2tlZCkge1xyXG5cdFx0XHRcdHBvc3ROZXdDb2RlT2JqZWN0VG9DdXJyZW50U291cmNlQW5kRnVsbFJlbG9hZE9mU291cmNlQ2hpbGRyZW4oY2xpcGJvYXJkVGV4dFR5cGVJbnB1dC52YWx1ZSwgY2xpcGJvYXJkVGV4dClcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRwb3N0TmV3VGV4dE5vZGVUb0N1cnJlbnRTb3VyY2VBbmRGdWxsUmVsb2FkT2ZTb3VyY2VDaGlsZHJlbihjbGlwYm9hcmRUZXh0VHlwZUlucHV0LnZhbHVlLCBjbGlwYm9hcmRUZXh0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvLyBpZiAoc2hhcmRjYXJkLmNvbnRlbnRFZGl0YWJsZSA9PT0gJ3RydWUnKSB7XHJcblx0XHQvLyBcdGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiaW5zZXJ0SFRNTFwiLCBmYWxzZSwgY2xpcGJvYXJkVGV4dCk7XHJcblx0XHQvLyBcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHQvLyB9XHJcblx0XHQvLyBlbHNlIGlmIChzaGFyZE9iamVjdC50ZXh0Q29udGVudCA9PSAnJyAmJiBzaGFyZE9iamVjdC5maWxlTmFtZSA9PSAnJykge1xyXG5cdFx0Ly8gXHRpbnNlcnRTaGFyZGNhcmRUZXh0Q29udGVudChzaGFyZGNhcmQsIGNsaXBib2FyZFRleHQpO1xyXG5cdFx0Ly8gXHQvL3NoYXJkY2FyZC5zaGFyZC5lbGVtZW50VHlwZSA9ICd0ZXh0JztcclxuXHRcdC8vIFx0dXBkYXRlU2hhcmRjYXJkVGV4dENvbnRlbnQoc2hhcmRjYXJkKTtcclxuXHRcdC8vIH1cclxuXHRcdC8vIGVsc2Uge1xyXG5cdFx0Ly8gXHRjb25zb2xlLmxvZygnVGhpcyBzb3VyY2UgYWxyZWFkeSBoYXMgY29udGVudC4gUmV0dXJuaW5nLicpO1xyXG5cclxuXHRcdC8vIH1cclxuXHJcblxyXG5cclxuXHR9XHJcblx0ZWxzZSBpZiAoY2xpcGJvYXJkQ29udGVudFR5cGUgPT09ICdmaWxlJykge1xyXG5cdFx0Y29uc29sZS5sb2coJ2RlYWwgd2l0aCBmaWxlJylcclxuXHJcblx0XHRsZXQgbmV3RmlsZSA9IGV2ZW50LmNsaXBib2FyZERhdGEuZmlsZXNbMF07XHJcblxyXG5cdFx0bGV0IGZpbGVDYXRlZ29yeU9iamVjdCA9IGRldGVybWluZUZpbGVDYXRlZ29yaWVzKG5ld0ZpbGUpO1xyXG5cdFx0Y29uc29sZS5sb2coJ2ZpbGVDYXRlZ29yeU9iamVjdDogJywgZmlsZUNhdGVnb3J5T2JqZWN0KVxyXG5cclxuXHRcdGlmIChmaWxlQ2F0ZWdvcnlPYmplY3QuZmlsZVR5cGUgPT09ICd0eXBldHlwZScpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcignRklMRSBFWFRFTlNJT04gSEFEIE5PIE1BVENISU5HIENPTlRFTlQgVFlQRScpXHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcG9zdEZpbGVRdWVyeVBhcmFtZXRlcnMgPSB7XHJcblx0XHRcdFR5cGU6IGZpbGVDYXRlZ29yeU9iamVjdC5maWxlVHlwZSxcclxuXHRcdFx0VGl0bGU6IFwiXCIsXHJcblx0XHRcdEV4dGVuc2lvbjogZmlsZUNhdGVnb3J5T2JqZWN0LmZpbGVFeHRlbnNpb24sXHJcblx0XHRcdElBbUF1dGhvcjogMCxcclxuXHRcdH1cclxuXHJcblx0XHRwb3N0TmV3RmlsZVRvQ3VycmVudFNvdXJjZUFuZEZ1bGxSZWxvYWRPZlNvdXJjZUNoaWxkcmVuKG5ld0ZpbGUsIHBvc3RGaWxlUXVlcnlQYXJhbWV0ZXJzLCBmaWxlQ2F0ZWdvcnlPYmplY3QubWltZVR5cGUpO1xyXG5cclxuXHRcdC8vIGNvbnNvbGUubG9nKG5ld0ZpbGUpXHJcblxyXG5cdFx0Ly8gY29uc29sZS5sb2coYXdhaXQgYWdlX2RiaXNXZS5maWxlR2V0KDEyMTYyNzI3OTM2MCkpO1xyXG5cclxuXHRcdC8vIGxldCBzb3VyY2VpZCA9IGV4dHJhY3RDdXJyZW50U291cmNlSWQoKTtcclxuXHJcblx0XHQvLyBpZiAoc2hhcmRPYmplY3QuZmlsZU5hbWUgPT0gJycgJiYgc2hhcmRPYmplY3QudGV4dENvbnRlbnQgPT0gJycpIHtcclxuXHRcdC8vIFx0cG9zdEZpbGUoZXZlbnQuY2xpcGJvYXJkRGF0YS5maWxlc1swXSwgc291cmNlaWQsIHNoYXJkaWQpO1xyXG5cdFx0Ly8gXHRjb25zb2xlLmxvZygnbm9ub25vJylcclxuXHRcdC8vIH1cclxuXHRcdC8vIGVsc2Uge1xyXG5cdFx0Ly8gXHRjb25zb2xlLmxvZygnVGhpcyBzb3VyY2UgYWxyZWFkeSBoYXMgY29udGVudC4gUmV0dXJuaW5nLicpO1xyXG5cdFx0Ly8gfVxyXG5cclxuXHJcblxyXG5cdH1cclxuXHJcblxyXG5cclxufVxyXG4vLyBjb25zdCBwYXNwYXMgPSBuZXcgQ2xpcGJvYXJkRXZlbnQoJ3Bhc3RlJyk7XHJcbi8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQocGFzcGFzKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBjb3B5RXZlbnQoZXZlbnQgOiBDbGlwYm9hcmRFdmVudCkge1xyXG5cclxuXHQvLyBjb25zb2xlLmxvZygnY29wY29wJylcclxuXHQvLyBjb25zb2xlLmxvZyhldmVudC5jbGlwYm9hcmREYXRhIClcclxuXHQvLyBsZXQgY2JkID0gZXZlbnQuY2xpcGJvYXJkRGF0YSB8fCB3aW5kb3cuY2xpcGJvYXJkRGF0YVxyXG5cdC8vIGxldCBjb3BpZWREYXRhID0gY2JkLmdldERhdGEoJ1RleHQnKTtcclxuXHQvLyBjb25zb2xlLmxvZygnY29waWVkRGF0YScsIGNvcGllZERhdGEpXHJcblxyXG5cdC8vIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSgge1xyXG5cdC8vIFx0Y29tbWFuZDogXCJjb3B5Y29weVwiXHJcblx0Ly8gfSk7XHJcblxyXG5cdGNvbnNvbGUubG9nKCdDT1BZRVZFTlQnKVxyXG5cclxuXHJcblx0Ly8gbmF2aWdhdG9yLmNsaXBib2FyZFxyXG5cdC8vIFx0LnJlYWQoKVxyXG5cdC8vIFx0LnRoZW4oXHJcblx0Ly8gXHRcdChjbGlwVGV4dCkgPT4gKGNvbnNvbGUubG9nKGNsaXBUZXh0KSksXHJcblx0Ly8gXHQpO1xyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gY3V0RXZlbnQoZXZlbnQgOiBLZXlib2FyZEV2ZW50KSB7XHJcblx0Y29uc29sZS5sb2coJ0NVVCBFVkVOVCcpXHJcbn1cclxuXHJcblxyXG5cclxuLyogXHJcblxyXG5cdEhFTFBFUiBGVU5DVElPTlNcclxuXHJcbiovXHJcblxyXG5cclxuXHJcblxyXG5sZXQgZGV0ZXJtaW5lQ2xpcGJvYXJkQ29udGVudFR5cGUgPSBmdW5jdGlvbiAoZXZlbnRDbGlwYm9hcmREYXRhIDogYW55KSB7XHJcblxyXG5cdGlmICh0eXBlb2YgZXZlbnRDbGlwYm9hcmREYXRhLmZpbGVzWzBdICE9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0Ly8gcG9zdEZpbGUoZGF0YUNsaXBib2FyZEV2ZW50LmZpbGVzWzBdLCBzb3VyY2VpZCwgc2hhcmRpZCk7XHJcblx0XHRyZXR1cm4gJ2ZpbGUnO1xyXG5cdH1cclxuXHRlbHNlIGlmICgoZXZlbnRDbGlwYm9hcmREYXRhIC8qIHx8IHdpbmRvdy5jbGlwYm9hcmREYXRhICovKS5nZXREYXRhKFwidGV4dFwiKSAhPT0gJycpIHtcclxuXHRcdC8vY29uc29sZS5sb2coKGV2ZW50LmNsaXBib2FyZERhdGEgfHwgd2luZG93LmNsaXBib2FyZERhdGEpLmdldERhdGEoXCJ0ZXh0XCIpKTtcclxuXHJcblx0XHRsZXQgY2xpcGJvYXJkVGV4dCA9IChldmVudENsaXBib2FyZERhdGEgLyogfHwgd2luZG93LmNsaXBib2FyZERhdGEgKi8pLmdldERhdGEoXCJ0ZXh0XCIpO1xyXG5cdFx0bGV0IGJsb2IgPSBuZXcgQmxvYihbY2xpcGJvYXJkVGV4dF0sIHsgdHlwZTogJ3RleHQvcGxhaW4nIH0pO1xyXG5cdFx0bGV0IGZpbGUgPSBuZXcgRmlsZShbYmxvYl0sIFwiY2xpcGJvYXJkLnR4dFwiLCB7IHR5cGU6IFwidGV4dC9wbGFpblwiIH0pO1xyXG5cclxuXHRcdC8vcG9zdEZpbGUoZmlsZSwgc291cmNlaWQsIHNoYXJkaWQpO1xyXG5cdFx0cmV0dXJuICd0ZXh0JztcclxuXHR9XHJcblx0ZWxzZSB7XHJcblx0XHRjb25zb2xlLmxvZygnTm8gZmlsZSBub3IgdGV4dCBkZXRlY3RlZC4nKTtcclxuXHRcdHJldHVybiAnZW1wdHknO1xyXG5cdH1cclxuXHJcblx0Ly9yZXR1cm4gJ2NsaXBib2FyZENvbnRlbnRUeXBlJztcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbmxldCBleHRlbnNpb25PYmplY3QgOiBhbnkgPSB7XHJcblx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvTWVkaWEvRm9ybWF0cy9JbWFnZV90eXBlc1xyXG5cdGltYWdlOiBbJ2FwbmcnLCAnYXZpZicsICdnaWYnLCAnYm1wJywgJ2pwZycsICdqcGVnJywgJ2pmaWYnLCAncGpwZWcnLCAncGpwJywgJ3BuZycsICdzdmcnLCAnd2VicCddLFxyXG5cdC8vIGh0dHBzOi8vd3d3LmNhbnRvLmNvbS9ibG9nL2F1ZGlvLWZpbGUtdHlwZXMvXHJcblx0YXVkaW86IFsnbTRhJywgJ2ZsYWMnLCAnbXAzJywgJ3dhdicsICd3bWEnLCAnYWFjJ10sXHJcblx0Ly8gaHR0cHM6Ly93d3cuYWRvYmUuY29tL2NyZWF0aXZlY2xvdWQvdmlkZW8vZGlzY292ZXIvYmVzdC12aWRlby1mb3JtYXQuaHRtbFxyXG5cdHZpZGVvOiBbJ21wNCcsICdtb3YnLCAnd212JywgJ2F2aScsICdBVkNIRCcsICdmbHYnLCAnZjR2JywgJ3N3ZicsICdta3YnLCAnd2VibScsICdtcGcnXSxcclxuXHRwZGY6IFsncGRmJ10sXHJcblx0ZGF0YTogWydqc29uJywgJ2NzdicsICd0c3YnLCAnZGInLCAneGxzeCcsICdvZHMnLCAnb2RiJ10sXHJcblx0Ly8gVGV4dGFyZWEgZXh0ZW5zaW9uXHJcblx0dGV4dDogWyd0eHQnLCAnbWQnXSxcclxuXHRjb2RlOiBbJ2pzJywgJ3RzJywgJ2NzcycsICdodG1sJywgJ2NzJ10sXHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gZGV0ZXJtaW5lRmlsZUNhdGVnb3JpZXMoc2VsZWN0ZWRGaWxlIDogYW55KSA6IGFueSB7XHJcblxyXG5cdGxldCBzZWxlY3RlZEZpbGVUeXBlOiBzdHJpbmcgPSBzZWxlY3RlZEZpbGUudHlwZTtcclxuXHRsZXQgZmlsZUNhdGVnb3JpZXMgPSB7XHJcblx0XHRtaW1lVHlwZTogc2VsZWN0ZWRGaWxlVHlwZSxcclxuXHRcdGJhc2VGaWxlTmFtZTogJ2Jhc2VuYW1lJyxcclxuXHRcdGZpbGVFeHRlbnNpb246ICdleHRleHQnLFxyXG5cdFx0ZmlsZVR5cGU6ICd0eXBldHlwZSdcclxuXHR9XHJcblxyXG5cclxuXHJcblx0ZmlsZUNhdGVnb3JpZXMuZmlsZUV4dGVuc2lvbiA9IGRldGVybWluZUZpbGVFeHRlbnNpb24oc2VsZWN0ZWRGaWxlKTtcclxuXHRmaWxlQ2F0ZWdvcmllcy5iYXNlRmlsZU5hbWUgPSBkZXRlcm1pbmVCYXNlRmlsZU5hbWUoc2VsZWN0ZWRGaWxlKTtcclxuXHJcblx0Ly8gZmlsZUNhdGVnb3JpZXMuZmlsZVR5cGUgPSBkZXRlcm1pbmVGaWxlVHlwZShmaWxlQ2F0ZWdvcmllcy5taW1lVHlwZSwgZmlsZUNhdGVnb3JpZXMuZmlsZUVuZGluZyk7XHJcblxyXG5cdC8vIGZpbGVDYXRlZ29yaWVzLmZpbGVUeXBlID0gT2JqZWN0LmVudHJpZXMoZXh0ZW5zaW9uT2JqZWN0KS5mb3JFYWNoKHR5cGVBcnJheSA9PiB0eXBlQXJyYXkuZmlsdGVyKGV4dGVuc2lvbiA9PiBleHRlbnNpb24gPT09IGZpbGVDYXRlZ29yaWVzLmZpbGVFeHRlbnNpb24pKVxyXG5cdGZpbGVDYXRlZ29yaWVzLmZpbGVUeXBlID0gT2JqZWN0LmtleXMoZXh0ZW5zaW9uT2JqZWN0KS5maW5kKHR5cGUgPT4gZXh0ZW5zaW9uT2JqZWN0W3R5cGVdLmluY2x1ZGVzKGZpbGVDYXRlZ29yaWVzLmZpbGVFeHRlbnNpb24pKTtcclxuXHQvLyBjb25zb2xlLmxvZyhmaWxlQ2F0ZWdvcmllcy5maWxlVHlwZSlcclxuXHQvL2NvbnNvbGUubG9nKCdmaWxlIHR5cGUgZGV0ZXJtaW5lZCBoZXJlIScpO1xyXG5cdC8vIGlmIChmaWxlQ2F0ZWdvcmllcy5maWxlRXh0ZW5zaW9uID09PSAnZGInKSB7XHJcblx0Ly8gXHQvLyBodHRwOi8vZmlsZWZvcm1hdHMuYXJjaGl2ZXRlYW0ub3JnL3dpa2kvREJfKFNRTGl0ZSlcclxuXHQvLyBcdGZpbGVDYXRlZ29yaWVzLm1pbWVUeXBlID0gJ2FwcGxpY2F0aW9uL3ZuZC5zcWxpdGUzJztcclxuXHQvLyB9XHJcblx0Y29uc29sZS5sb2coZmlsZUNhdGVnb3JpZXMubWltZVR5cGUpXHJcblx0aWYgKGZpbGVDYXRlZ29yaWVzLm1pbWVUeXBlID09ICcnKSB7XHJcblx0XHQvLyBmaWxlQ2F0ZWdvcmllcy5taW1lVHlwZSA9PSAnYXBwbGljYXRpb24vc3RyZWFtJztcclxuXHRcdGZpbGVDYXRlZ29yaWVzLm1pbWVUeXBlID0gJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSc7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gZmlsZUNhdGVnb3JpZXM7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGRldGVybWluZUZpbGVFeHRlbnNpb24oc2VsZWN0ZWRGaWxlIDogRmlsZSkge1xyXG5cclxuXHRyZXR1cm4gc2VsZWN0ZWRGaWxlLm5hbWUubWF0Y2goL1xcdyskL2cpWzBdO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gZGV0ZXJtaW5lQmFzZUZpbGVOYW1lKHNlbGVjdGVkRmlsZTogRmlsZSkge1xyXG5cclxuXHRyZXR1cm4gc2VsZWN0ZWRGaWxlLm5hbWUubWF0Y2goL14uKig/PVxcLlteLl0rJCkvKVswXTtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qIFxyXG5cclxuXHRDTElQQk9BUkQgRkVUQ0hcclxuXHJcbiovXHJcblxyXG5cclxuYXN5bmMgZnVuY3Rpb24gcG9zdE5ld1RleHROb2RlVG9DdXJyZW50U291cmNlQW5kRnVsbFJlbG9hZE9mU291cmNlQ2hpbGRyZW4odGV4dFR5cGUgOiBzdHJpbmcsIFRleHRDb250ZW50IDogc3RyaW5nKSB7XHJcblxyXG5cdGxldCBzb3VyY2VPYmplY3Q6IGFueSA9IHNvdXJjZS5nZXRDdXJyZW50U291cmNlT2JqZWN0KCk7XHJcblx0Ly8gbGV0IHNvdXJjZVV1aWQgPSBzb3VyY2VPYmplY3QuVXVpZDtcclxuXHQvLyBsZXQgc291cmNlVXVpZCA9IHNvdXJjZS5nZXRDdXJyZW50U291cmNlVXVpZCgpO1xyXG5cclxuXHQvLyBsZXQgc291cmNlT2JqZWN0OiBhbnkgPSBzb3VyY2UuY3VycmVudFNvdXJjZU9iamVjdDtcclxuXHRsZXQgc291cmNlVXVpZCA9IHNvdXJjZU9iamVjdC5VdWlkO1xyXG5cclxuXHRjb25zb2xlLmxvZygncG9zdE5ld1RleHROb2RlVG9DdXJyZW50U291cmNlQW5kRnVsbFJlbG9hZE9mU291cmNlQ2hpbGRyZW4oKScpO1xyXG5cdGNvbnNvbGUubG9nKCdzb3VyY2VVdWlkID0gJywgc291cmNlVXVpZCk7XHJcblx0XHJcblx0XHJcblxyXG5cdC8vIENvbnRlbnRfSW5zZXJ0Q2hpbGRVdWlkVGFibGUoVXVpZCwgY2hpbGRUYWJsZSlcclxuXHRpZiAoc291cmNlVXVpZCAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG5cdFx0Ly8gbGV0IG5ld1RleHRPYmplY3QgPSAoYXdhaXQgYWdlX2RiaXNXZS5Db250ZW50X0luc2VydENoaWxkVXVpZFRhYmxlKGV4dGVuc2lvblN0YXRlRnJvbnQuY3VycmVudF9zb3VyY2VPYmplY3QuVXVpZCwgJ1RleHQnKSkuQ29udGVudDtcclxuXHRcdGxldCBuZXdUZXh0Q29udGVudE9iamVjdCA9IChhd2FpdCBhZ2VfZGJpcy5Db250ZW50RWRnZV9JbnNlcnRBZGphY2VudFRvVXVpZEludG9UYWJsZShzb3VyY2VVdWlkLCAxLCAnVGV4dCcsICcnLCAnJywgJy8nKSkuY29udGVudDtcclxuXHJcblx0XHQvLyBjb25zb2xlLmxvZyhuZXdUZXh0T2JqZWN0KVxyXG5cclxuXHRcdG5ld1RleHRDb250ZW50T2JqZWN0LlRpdGxlID0gVGV4dENvbnRlbnQuc3Vic3RyaW5nKDAsIDI1KTtcclxuXHRcdG5ld1RleHRDb250ZW50T2JqZWN0LlRleHRDb250ZW50ID0gVGV4dENvbnRlbnQ7XHJcblx0XHRuZXdUZXh0Q29udGVudE9iamVjdC5UeXBlID0gdGV4dFR5cGU7XHJcblxyXG5cclxuXHRcdGF3YWl0IGFnZV9kYmlzLkNvbnRlbnRfVXBkYXRlV2l0aENvbnRlbnRPYmplY3QobmV3VGV4dENvbnRlbnRPYmplY3QpO1xyXG5cdFx0XHJcblx0XHQvLyBUT0RPIFxyXG5cdFx0Ly8gVVBEQVRFIFNPVVJDRSBQQU5FTCB4MyBcclxuXHRcdC8vIGF3YWl0IGZldGNoQ3VycmVudFNvdXJjZUNoaWxkcmVuVGhlbldyaXRlVG9TdGF0ZXMoKTtcclxuXHRcdC8vIHBvcHVsYXRlU291cmNlQ2hpbGRUYWJsZUZyb21TdGF0ZSgpO1xyXG5cdFx0YXdhaXQgc291cmNlLmxvYWRXaXRoQ29udGVudE9iamVjdChzb3VyY2VPYmplY3QpO1xyXG5cdFx0c291cmNlLmZvY3VzT25MYXN0Q2hpbGRSb3dUaXRsZSgpO1xyXG5cclxuXHRcdC8vIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0Ly8gfSwgMTAwKTtcclxuXHJcblx0fVxyXG5cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gcG9zdE5ld0NvZGVPYmplY3RUb0N1cnJlbnRTb3VyY2VBbmRGdWxsUmVsb2FkT2ZTb3VyY2VDaGlsZHJlbihUeXBlOiBzdHJpbmcsIENvZGVDb250ZW50OiBzdHJpbmcpIHtcclxuXHJcblx0bGV0IHNvdXJjZU9iamVjdDogYW55ID0gc291cmNlLmdldEN1cnJlbnRTb3VyY2VPYmplY3QoKTtcclxuXHRsZXQgc291cmNlVXVpZCA9IHNvdXJjZU9iamVjdC5VdWlkO1xyXG5cclxuXHQvLyBDb250ZW50X0luc2VydENoaWxkVXVpZFRhYmxlKFV1aWQsIGNoaWxkVGFibGUpXHJcblx0aWYgKHNvdXJjZVV1aWQgIT09IHVuZGVmaW5lZCkge1xyXG5cclxuXHRcdC8vIGxldCBuZXdDb2RlT2JqZWN0ID0gKGF3YWl0IGFnZV9kYmlzV2UuQ29udGVudF9JbnNlcnRDaGlsZFV1aWRUYWJsZShleHRlbnNpb25TdGF0ZUZyb250LmN1cnJlbnRfc291cmNlT2JqZWN0LlV1aWQsICdDb2RlJykpLkNvbnRlbnQ7XHJcblx0XHRsZXQgbmV3Q29kZUNvbnRlbnRPYmplY3QgPSAoYXdhaXQgYWdlX2RiaXMuQ29udGVudEVkZ2VfSW5zZXJ0QWRqYWNlbnRUb1V1aWRJbnRvVGFibGUoc291cmNlVXVpZCwgMSwgJ0NvZGUnLCAnJywgJycsICcvJykpLmNvbnRlbnQ7XHJcblxyXG5cdFx0Ly8gY29uc29sZS5sb2cobmV3VGV4dE9iamVjdClcclxuXHJcblx0XHRuZXdDb2RlQ29udGVudE9iamVjdC5UaXRsZSA9IENvZGVDb250ZW50LnN1YnN0cmluZygwLCAyNSk7XHJcblx0XHRuZXdDb2RlQ29udGVudE9iamVjdC5UeXBlID0gVHlwZTtcclxuXHRcdG5ld0NvZGVDb250ZW50T2JqZWN0LkNvZGVDb250ZW50ID0gQ29kZUNvbnRlbnQ7XHJcblxyXG5cclxuXHRcdGF3YWl0IGFnZV9kYmlzLkNvbnRlbnRfVXBkYXRlV2l0aENvbnRlbnRPYmplY3QobmV3Q29kZUNvbnRlbnRPYmplY3QpO1xyXG5cclxuXHJcblx0XHRhd2FpdCBzb3VyY2UubG9hZFdpdGhDb250ZW50T2JqZWN0KHNvdXJjZU9iamVjdCk7XHJcblx0XHRzb3VyY2UuZm9jdXNPbkxhc3RDaGlsZFJvd1RpdGxlKCk7XHJcblx0fVxyXG5cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gcG9zdE5ld0ZpbGVUb0N1cnJlbnRTb3VyY2VBbmRGdWxsUmVsb2FkT2ZTb3VyY2VDaGlsZHJlbihmaWxlIDogRmlsZSAsIHF1ZXJ5UGFyYW1zIDogYW55ICwgbWltZVR5cGUgOiBzdHJpbmcpIHtcclxuXHJcblx0bGV0IHNvdXJjZU9iamVjdDogYW55ID0gc291cmNlLmdldEN1cnJlbnRTb3VyY2VPYmplY3QoKTtcclxuXHRsZXQgc291cmNlVXVpZCA9IHNvdXJjZU9iamVjdC5VdWlkO1xyXG5cclxuXHRjb25zb2xlLmxvZyhzb3VyY2VVdWlkKVxyXG5cclxuXHQvLyBDb250ZW50X0luc2VydENoaWxkVXVpZFRhYmxlKFV1aWQsIGNoaWxkVGFibGUpXHJcblx0aWYgKHNvdXJjZVV1aWQgIT09IHVuZGVmaW5lZCkge1xyXG5cclxuXHRcdC8vIGxldCBuZXdGaWxlT2JqZWN0ID0gKGF3YWl0IGFnZV9kYmlzV2UuQ29udGVudF9JbnNlcnRDaGlsZFV1aWRUYWJsZShzb3VyY2VVdWlkLCAnRmlsZScpKS5Db250ZW50O1xyXG5cdFx0bGV0IG5ld0ZpbGVDb250ZW50T2JqZWN0ID0gKGF3YWl0IGFnZV9kYmlzLkNvbnRlbnRFZGdlX0luc2VydEFkamFjZW50VG9VdWlkSW50b1RhYmxlKHNvdXJjZVV1aWQsIDEsICdGaWxlJywgJycsICcnLCAnLycpKS5jb250ZW50O1xyXG5cclxuXHRcdC8vIGNvbnNvbGUubG9nKG5ld1RleHRPYmplY3QpXHJcblxyXG5cdFx0Ly8gbmV3RmlsZU9iamVjdC5UaXRsZSA9IENvZGVDb250ZW50LnN1YnN0cmluZygwLCAyNSk7XHJcblx0XHQvLyBuZXdGaWxlT2JqZWN0LlR5cGUgPSBUeXBlO1xyXG5cdFx0Ly8gbmV3RmlsZU9iamVjdC5Db2RlQ29udGVudCA9IENvZGVDb250ZW50O1xyXG5cclxuXHJcblx0XHQvLyBhd2FpdCBhZ2VfZGJpc1dlLkNvbnRlbnRfVXBkYXRlT25Db250ZW50T2JqZWN0KG5ld0ZpbGVPYmplY3QpO1xyXG5cdFx0Ly8gYXdhaXQgYWdlX2RiaXNXZS5maWxlUG9zdChuZXdGaWxlQ29udGVudE9iamVjdC5VdWlkLCBmaWxlLCBxdWVyeVBhcmFtcywgbWltZVR5cGUpO1xyXG5cdFx0YXdhaXQgYWdlX2RiaXMuUG9zdF9GaWxlKG5ld0ZpbGVDb250ZW50T2JqZWN0LlV1aWQsIGZpbGUsIHF1ZXJ5UGFyYW1zLCBtaW1lVHlwZSk7XHJcblxyXG5cclxuXHRcdC8vIFRPRE8gVVBEQVRFIFVTSU5HIE5FVyBTVFJVQ1RVUkVcclxuXHRcdC8vIGF3YWl0IGZldGNoQ3VycmVudFNvdXJjZUNoaWxkcmVuVGhlbldyaXRlVG9TdGF0ZXMoKTtcclxuXHRcdC8vIHBvcHVsYXRlU291cmNlQ2hpbGRUYWJsZUZyb21TdGF0ZSgpO1xyXG5cdFx0YXdhaXQgc291cmNlLmxvYWRXaXRoQ29udGVudE9iamVjdChzb3VyY2VPYmplY3QpO1xyXG5cdFx0c291cmNlLmZvY3VzT25MYXN0Q2hpbGRSb3dUaXRsZSgpO1xyXG5cclxuXHRcdC8vIEZvY3VzIGxhc3Qgcm93IHRpdGxlIGZvciBlYXN5IGVkaXRpbmchXHJcblx0XHQvLyBsZXQgX3Rib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FnZV9zb3VyY2VDaGlsZFRhYmxlLXRib2R5Jyk7XHJcblx0XHQvKiBfdGJvZHkubGFzdEVsZW1lbnRDaGlsZC5sYXN0RWxlbWVudENoaWxkLmZvY3VzKCk7ICovXHJcblxyXG5cdH1cclxuXHRlbHNlIHtcclxuXHRcdGNvbnNvbGUubG9nKCdObyBzbGVjdGVkIHNvdXJjZS4gQ291bGRuXCJ0IFBPU1QgZmlsZS4nKVxyXG5cdH1cclxuXHJcbn1cclxuXHJcblxyXG5hc3luYyBmdW5jdGlvbiBrZXlkb3duQWN0aXZlRXh0ZW5zaW9uKGtleUV2ZW50IDogS2V5Ym9hcmRFdmVudCkge1xyXG5cclxuXHRsZXQgYWN0aXZlRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG5cdGlmIChhY3RpdmVFbGVtZW50LmlzQ29udGVudEVkaXRhYmxlKSB7XHJcblx0XHQvLyBjb25zb2xlLmxvZygnRURJVEFCTEUnKVxyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0aWYgKGtleUV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcclxuXHRcdHN0b3BDbGlwYm9hcmRUZXh0Q29uY2F0ZW5hdGlvbigpO1xyXG5cdH1cclxuXHJcblxyXG5cclxuXHRpZiAoa2V5RXZlbnQuYWx0S2V5KSB7XHJcblxyXG5cdFx0c3dpdGNoIChrZXlFdmVudC5rZXkpIHtcclxuXHRcdFx0Y2FzZSAncCc6XHJcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coJ0FsdCArIHAnKVxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwidGV4dENvbmNhdGVuYXRpb25Db250ZW50ID0gXCIsIHRleHRDb25jYXRlbmF0aW9uQ29udGVudCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlICd4JzpcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZygnQWx0ICsgeCcpXHJcblx0XHRcdFx0bGV0IGNoZWNrZWQgPSBjbGlwYm9hcmRDb2RlQ2hlY2tib3guY2hlY2tlZDtcclxuXHRcdFx0XHRpZiAoY2hlY2tlZCkge1xyXG5cdFx0XHRcdFx0Y2xpcGJvYXJkQ29kZUNoZWNrYm94LmNoZWNrZWQgPSBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRjbGlwYm9hcmRDb2RlQ2hlY2tib3guY2hlY2tlZCA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRvZ2dsZVNlbGVjdENvZGUoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgJ1snOlxyXG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKCdBbHQgKyBbJylcclxuXHRcdFx0XHRzdGFydENsaXBib2FyZFRleHRDb25jYXRlbmF0aW9uKCk7XHJcblxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSAnRW50ZXInOlxyXG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKCdBbHQgKyBFbnRlcicpXHJcblx0XHRcdFx0YWRkTmV3TGluZVRvQ2FwdHVyZUNvbmNhdGVuYXRpb25Db250ZW50cygpXHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlICctJzpcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZygnQWx0ICsgRW50ZXInKVxyXG5cdFx0XHRcdGFkZFNwYWNlQ2hhcmFjdGVyVG9DYXB0dXJlQ29uY2F0ZW5hdGlvbkNvbnRlbnRzKCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlICddJzpcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZygnQWx0ICsgXScpXHJcblx0XHRcdFx0aWYgKGNsaXBib2FyZENvZGVDaGVja2JveC5jaGVja2VkKSB7XHJcblx0XHRcdFx0XHRhd2FpdCBwb3N0TmV3Q29kZU9iamVjdFRvQ3VycmVudFNvdXJjZUFuZEZ1bGxSZWxvYWRPZlNvdXJjZUNoaWxkcmVuKGNsaXBib2FyZFRleHRUeXBlSW5wdXQudmFsdWUsIHRleHRDb25jYXRlbmF0aW9uQ29udGVudClcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRhd2FpdCBwb3N0TmV3VGV4dE5vZGVUb0N1cnJlbnRTb3VyY2VBbmRGdWxsUmVsb2FkT2ZTb3VyY2VDaGlsZHJlbihjbGlwYm9hcmRUZXh0VHlwZUlucHV0LnZhbHVlLCB0ZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnQpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0c3RvcENsaXBib2FyZFRleHRDb25jYXRlbmF0aW9uKCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHRpZiAoa2V5RXZlbnQuY3RybEtleSkge1xyXG5cclxuXHRcdHN3aXRjaCAoa2V5RXZlbnQua2V5KSB7XHJcblx0XHRcdGNhc2UgJ2AnOlxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdDdHJsICsgYCcpXHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJy8nOlxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdDdHJsICsgLycpXHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJy4nOlxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdDdHJsICsgLicpXHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJywnOlxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdDdHJsICsgLCcpXHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ1xcXFwnOlxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdDdHJsICsgXFxcXCcpXHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ1xcJyc6XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ0N0cmwgKyBcXCcnKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSAnOyc6XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ0N0cmwgKyA7JylcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgJ1snOlxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdDdHJsICsgWycpXHJcblxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSAnXSc6XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ0N0cmwgKyBdJylcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVTZWxlY3RDb2RlKCkge1xyXG5cdGlmIChjbGlwYm9hcmRDb2RlQ2hlY2tib3guY2hlY2tlZCkge1xyXG5cdFx0Y2xpcGJvYXJkVGV4dFR5cGVJbnB1dC5kaXNhYmxlZCA9IGZhbHNlO1xyXG5cdH1cclxuXHRlbHNlIHtcclxuXHRcdGNsaXBib2FyZFRleHRUeXBlSW5wdXQuZGlzYWJsZWQgPSB0cnVlO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcblxyXG5cclxuLy8gVGhlIEFubnVuY2lhdGlvbiBpcyBhbiBvaWwgcGFpbnRpbmcgYnkgdGhlIEVhcmx5IE5ldGhlcmxhbmRpc2ggcGFpbnRlciBIYW5zIE1lbWxpbmcuSXQgZGVwaWN0cyB0aGUgQW5udW5jaWF0aW9uLCB0aGUgYXJjaGFuZ2VsIEdhYnJpZWwncyBhbm5vdW5jZW1lbnQgdG8gdGhlIFZpcmdpbiBNYXJ5IHRoYXQgc2hlIHdvdWxkIGNvbmNlaXZlIGFuZCBiZWNvbWUgdGhlIG1vdGhlciBvZiBKZXN1cywgZGVzY3JpYmVkIGluIHRoZSBHb3NwZWwgb2YgTHVrZS4gXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRDc3MoKTogdm9pZCB7XHJcblx0ZG9jdW1lbnQuaGVhZC5hcHBlbmQoY2xpcGJvYXJkQ3NzKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVDc3MoKTogdm9pZCB7XHJcblx0Y2xpcGJvYXJkQ3NzLnJlbW92ZSgpO1xyXG59IiwiXG5cbmxldCBhZ2VfYXBpVXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGkvdjAyJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRlc3QoKSA6IHZvaWQge1xuXG5cdGNvbnNvbGUubG9nKFwiTG9hZGVkIGRiaS1zZW5kLnRzXCIpXG5cdFxufVxuXG5icm93c2VyLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChyZXF1ZXN0KSA6IFByb21pc2U8YW55PiA9PiB7XG5cdGNvbnNvbGUubG9nKFwiTWVzc2FnZSByZWNpZXZlZCBpbiBkYmktc2VuZC50cyFcIik7XG5cblx0aWYgKHJlcXVlc3QubmFtZSA9PT0gXCJzZXRBcGlCYXNlXCIpIHtcblx0XHQvLyBjb25zb2xlLmxvZyhcIjExMTFcIilcblx0XHRhZ2VfYXBpVXJsID0gcmVxdWVzdC5hcGlCYXNlU3RyaW5nO1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoeyByZXNwb25zZTogXCJBcGkgdXBkYXRlZCBpbiBjb250ZW50IHNjcmlwdC4gW2RiaS1zZW5kLmpzXVwiLCBuZXdBcGlTdHJpbmc6IGFnZV9hcGlVcmwgfSk7XG5cblx0fVxuXG5cblx0aWYgKHJlcXVlc3QubmFtZSA9PT0gXCJnZXRBcGlCYXNlXCIpIHtcblx0XHQvLyBjb25zb2xlLmxvZyhcIjIyMjJcIilcblx0XHRcblx0XHQvLyBQcm9taXNlLnJlc29sdmUgOiBzdGF0aWMgbWV0aG9kIHRoYXQgcmV0dXJucyBhIHJlc29sdmVkIFByb21pc2Ugb2JqZWN0IHdpdGggdGhlIGdpdmVuIHZhbHVlXG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IGFwaVN0cmluZzogYWdlX2FwaVVybCB9KTtcblxuXHR9XG5cbn0pO1xuXG5jbGFzcyBhZ2VfZGJpcyB7XG5cblx0LyogXG5cdFx0Q09OVEVOVFxuXHQqL1xuXG5cdHN0YXRpYyBhc3luYyBDb250ZW50X0luc2VydE9uVGFibGUoVGFibGVOYW1lIDogc3RyaW5nKSB7XG5cdFx0Y29uc3QgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudC9Db250ZW50LUluc2VydE9uVGFibGU/VGFibGU9JHtUYWJsZU5hbWV9YDtcblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnUE9TVCdcblx0XHR9O1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiRmV0Y2ggcmV0dXJuZWQgXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIiBmcm9tIFwiICsgdXJsKTtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXHRzdGF0aWMgYXN5bmMgQ29udGVudF9TZWxlY3RPblV1aWQoVXVpZCA6IHN0cmluZyB8IG51bWJlcikge1xuXHRcdGxldCB1cmwgPSBhZ2VfYXBpVXJsICsgYC9jb250ZW50L0NvbnRlbnQtU2VsZWN0T25VdWlkP1V1aWQ9JHtVdWlkfWA7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0fTtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblx0c3RhdGljIGFzeW5jIENvbnRlbnRfVXBkYXRlV2l0aENvbnRlbnRPYmplY3QoY29udGVudE9iamVjdCA6IGFueSkge1xuXHRcdGxldCB1cmwgPSBhZ2VfYXBpVXJsICsgYC9jb250ZW50L0NvbnRlbnQtVXBkYXRlV2l0aENvbnRlbnRPYmplY3RgO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdQVVQnLFxuXHRcdFx0aGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiwgfSxcblx0XHRcdGJvZHk6IEpTT04uc3RyaW5naWZ5KGNvbnRlbnRPYmplY3QpLFxuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cdHN0YXRpYyBhc3luYyBDb250ZW50X0Ryb3BGdWxsT25VdWlkKFV1aWQgOiBzdHJpbmcgfCBudW1iZXIpIHtcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudC9Db250ZW50LURyb3BGdWxsT25VdWlkP1V1aWQ9JHtVdWlkfWA7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ0RFTEVURScsXG5cdFx0fTtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblx0c3RhdGljIGFzeW5jIENvbnRlbnRfU2VsZWN0T25UaXRsZUxpa2VTdHJpbmcoc2VhcmNoU3RyaW5nOiBzdHJpbmcsIHRhYmxlTGltaXQ6IHN0cmluZywgaW5jbHVkZVRhYmxlOiBzdHJpbmcsIG9yZGVyQ29sdW1uOiBzdHJpbmcsIGRlc2M6IHN0cmluZykgOiBQcm9taXNlPGFueT4ge1xuXHRcdGxldCB1cmwgPSBhZ2VfYXBpVXJsICsgYC9jb250ZW50L0NvbnRlbnQtU2VsZWN0T25UaXRsZUxpa2VTdHJpbmc/c2VhcmNoU3RyaW5nPSR7c2VhcmNoU3RyaW5nfSZ0YWJsZUxpbWl0PSR7dGFibGVMaW1pdH0maW5jbHVkZVRhYmxlPSR7aW5jbHVkZVRhYmxlfSZvcmRlckNvbHVtbj0ke29yZGVyQ29sdW1ufSZkZXNjPSR7ZGVzY31gO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdH07XG5cblx0XHRcblx0XHR0cnkge1xuXHRcdFx0bGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiRmV0Y2ggcmV0dXJuZWQgXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIiBmcm9tIFwiICsgdXJsKTtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cdHN0YXRpYyBhc3luYyBSZXZpZXdfSW5zZXJ0U2NoZWR1bGVPblV1aWQoVXVpZCA6IHN0cmluZyB8IG51bWJlciwgc2NoZWR1bGVUeXBlIDogc3RyaW5nfCBudW1iZXIpIHtcblx0XHRjb25zdCB1cmwgPSBhZ2VfYXBpVXJsICsgYC9jb250ZW50L1Jldmlldy1JbnNlcnRTY2hlZHVsZU9uVXVpZD9VdWlkPSR7VXVpZH0mc2NoZWR1bGVUeXBlPSR7c2NoZWR1bGVUeXBlfWA7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ1BPU1QnXG5cdFx0fTtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblx0c3RhdGljIGFzeW5jIFJldmlld19TZWxlY3RDdXJyZW50UmV2aWV3KCkge1xuXHRcdGxldCB1cmwgPSBhZ2VfYXBpVXJsICsgYC9jb250ZW50L1Jldmlldy1TZWxlY3RDdXJyZW50UmV2aWV3YDtcblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnR0VUJyxcblx0XHR9O1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiRmV0Y2ggcmV0dXJuZWQgXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIiBmcm9tIFwiICsgdXJsKTtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXG5cblxuXG5cblx0LyogXG5cdFx0XHRDT05URU5UIEVER0Vcblx0Ki9cblx0c3RhdGljIGFzeW5jIENvbnRlbnRFZGdlX0luc2VydEFkamFjZW50VG9VdWlkSW50b1RhYmxlKFV1aWQ6IHN0cmluZyB8IG51bWJlciwgRGlyZWN0ZWQ6IHN0cmluZyB8IG51bWJlciwgVGFibGU6IHN0cmluZywgVHlwZTogc3RyaW5nLCBPcmRlcjogc3RyaW5nIHwgbnVtYmVyLCBQYXRoOiBzdHJpbmcpIHtcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudGVkZ2UvQ29udGVudEVkZ2UtSW5zZXJ0QWRqYWNlbnRUb1V1aWRJbnRvVGFibGU/VXVpZD0ke1V1aWR9JkRpcmVjdGVkPSR7RGlyZWN0ZWR9JlRhYmxlPSR7VGFibGV9JlR5cGU9JHtUeXBlfSZPcmRlcj0ke09yZGVyfSZQYXRoPSR7UGF0aH1gO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHR9O1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiRmV0Y2ggcmV0dXJuZWQgXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIiBmcm9tIFwiICsgdXJsKTtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXHRzdGF0aWMgYXN5bmMgQ29udGVudEVkZ2VfU2VsZWN0Q2hpbGRPZlV1aWQoVXVpZCA6IHN0cmluZyB8IG51bWJlcikge1xuXHRcdGxldCB1cmwgPSBhZ2VfYXBpVXJsICsgYC9jb250ZW50ZWRnZS9Db250ZW50RWRnZS1TZWxlY3RDaGlsZE9mVXVpZD9VdWlkPSR7VXVpZH1gO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Ly8gY29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgYXN5bmMgQ29udGVudEVkZ2VfU2VsZWN0UGFyZW50T2ZVdWlkKFV1aWQgOiBzdHJpbmcgfCBudW1iZXIpIHtcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudGVkZ2UvQ29udGVudEVkZ2UtU2VsZWN0UGFyZW50T2ZVdWlkP1V1aWQ9JHtVdWlkfWA7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0fTtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblx0c3RhdGljIGFzeW5jIENvbnRlbnRFZGdlX1NlbGVjdFVuZGlyZWN0ZWRPZlV1aWQoVXVpZCA6IHN0cmluZyB8IG51bWJlcikge1xuXHRcdGxldCB1cmwgPSBhZ2VfYXBpVXJsICsgYC9jb250ZW50ZWRnZS9Db250ZW50RWRnZS1TZWxlY3RVbmRpcmVjdGVkT2ZVdWlkP1V1aWQ9JHtVdWlkfWA7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0fTtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblx0c3RhdGljIGFzeW5jIENvbnRlbnRFZGdlX1NlbGVjdEFkamFjZW50T2ZVdWlkKFV1aWQgOiBzdHJpbmcgfCBudW1iZXIpIHtcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudGVkZ2UvQ29udGVudEVkZ2UtU2VsZWN0QWRqYWNlbnRPZlV1aWQ/VXVpZD0ke1V1aWR9YDtcblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnR0VUJyxcblx0XHR9O1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiRmV0Y2ggcmV0dXJuZWQgXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIiBmcm9tIFwiICsgdXJsKTtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXG5cblxuXG5cdC8qIFxuXHRcdFx0XHRGSUxFU1xuXHQqL1xuXG5cdHN0YXRpYyBhc3luYyBQb3N0X0ZpbGUoVXVpZDogc3RyaW5nIHwgbnVtYmVyLCBmaWxlOiBGaWxlLCBxdWVyeVBhcmFtczogc3RyaW5nLCBtaW1lVHlwZTogc3RyaW5nKSB7XG5cblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvZmlsZS8ke1V1aWR9P2A7XG5cdFx0Ly8gY29uc29sZS5sb2codXJsKVxuXG5cblx0XHRmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhxdWVyeVBhcmFtcykpIHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKGAke2tleX06ICR7dmFsdWV9YCk7XG5cdFx0XHR1cmwgKz0gYCR7a2V5fT0ke3ZhbHVlfSZgO1xuXHRcdFx0Ly8gYm9keUFycmF5LnB1c2godmFsdWUpO1xuXHRcdH1cblx0XHR1cmwgPSB1cmwuc2xpY2UoMCwgLTEpO1xuXG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcIkNvbnRlbnQtVHlwZVwiOiBtaW1lVHlwZSxcblx0XHRcdH0sXG5cdFx0XHRib2R5OiBmaWxlLFxuXHRcdH07XG5cdFx0Ly8gY29uc29sZS5sb2cob3B0aW9ucylcblx0XHQvLyBjb25zb2xlLmxvZyh1cmwpXG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0aWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdGQUlMRUQgUE9TVCBGUk9NOiBQb3N0X0ZpbGUgaW4gZGJpcycpXG5cdFx0XHR9XG5cdFx0XHQvLyBjb25zb2xlLnRhYmxlKGRhdGEpO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXG5cblxuXHRzdGF0aWMgYXN5bmMgR2V0X0ZpbGUoVXVpZDogc3RyaW5nIHwgbnVtYmVyKTogUHJvbWlzZTxGaWxlIHwgYW55W10+IHtcblxuXHRcdGNvbnN0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2ZpbGUvYCArIFV1aWQ7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHsgbWV0aG9kOiAnR0VUJyB9O1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcblx0XHRcdC8vIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiRmV0Y2ggcmV0dXJuZWQgXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIiBmcm9tIFwiICsgdXJsKTtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5ib2R5KSBcblx0XHRcdGxldCBibG9iID0gYXdhaXQgcmVzcG9uc2UuYmxvYigpXG5cdFx0XHRsZXQgY29udGVudFR5cGUgPSByZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJyk7XG5cdFx0XHRsZXQgZXh0ZW5zaW9uID0gY29udGVudFR5cGUuc3BsaXQoJy8nKVsxXTtcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdGSUxFRklMRTonLCByZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykpXG5cdFx0XHRsZXQgZmlsZSA9IGF3YWl0IG5ldyBGaWxlKFtibG9iXSwgYCR7VXVpZH0uJHtleHRlbnNpb259YClcblx0XHRcdHJldHVybiBmaWxlO1xuXHRcdFx0Ly8gLnRoZW4oYmxvYiA9PiBuZXcgRmlsZShbYmxvYl0sICd0ZXN0ZmlsZW5hbWUuZmlsZScpKVxuXHRcdFx0Ly8gLnRoZW4oZmlsZSA9PiBmaWxlKVxuXHRcdFx0Ly8gLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKVxuXHRcdFx0Ly8gLnRoZW4oZmlsZSA9PiBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpKVxuXHRcdFx0Ly8gLnRoZW4oZmlsZSA9PiBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpKVxuXHRcdFx0Ly8gLnRoZW4oZmlsZVVybCA9PiB3aW5kb3cub3BlbihmaWxlVXJsLCAnX2JsYW5rJykpXG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cblxuXG5cblx0c3RhdGljIGFzeW5jIFB1dF9GaWxlKFV1aWQ6IHN0cmluZyB8IG51bWJlciwgZmlsZTogRmlsZSwgcXVlcnlQYXJhbXM6IHN0cmluZywgbWltZVR5cGU6IHN0cmluZykge1xuXG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2ZpbGUvJHtVdWlkfT9gO1xuXHRcdC8vIGNvbnNvbGUubG9nKHVybClcblxuXG5cdFx0Zm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMocXVlcnlQYXJhbXMpKSB7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhgJHtrZXl9OiAke3ZhbHVlfWApO1xuXHRcdFx0dXJsICs9IGAke2tleX09JHt2YWx1ZX0mYDtcblx0XHRcdC8vIGJvZHlBcnJheS5wdXNoKHZhbHVlKTtcblx0XHR9XG5cdFx0dXJsID0gdXJsLnNsaWNlKDAsIC0xKTtcblxuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XCJDb250ZW50LVR5cGVcIjogbWltZVR5cGUsXG5cdFx0XHR9LFxuXHRcdFx0Ym9keTogZmlsZSxcblx0XHR9O1xuXHRcdC8vIGNvbnNvbGUubG9nKG9wdGlvbnMpXG5cdFx0Ly8gY29uc29sZS5sb2codXJsKVxuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdGlmIChyZXNwb25zZS5vaykge1xuXHRcdFx0XHRyZXR1cm4gZGF0YTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ZBSUxFRCBQVVQgRlJPTTogUHV0X0ZpbGUgaW4gZGJpcycpXG5cdFx0XHR9XG5cdFx0XHQvLyBjb25zb2xlLnRhYmxlKGRhdGEpO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXG5cblxuXHRzdGF0aWMgYXN5bmMgRGVsZXRlX0ZpbGUoVXVpZCA6IHN0cmluZyB8IG51bWJlcikge1xuXHRcdGxldCB1cmwgPSBhZ2VfYXBpVXJsICsgYC9maWxlLyR7VXVpZH1gO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdERUxFVEUnLFxuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Ly8gY29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxuXG5cbn07XG5cbmV4cG9ydCB7XG5cdGFnZV9kYmlzLFxufSIsIlxuaW1wb3J0IHsgdGVzdCB9IGZyb20gXCIuL2RiaS1zZW5kXCJcbnRlc3QoKTtcblxuXG5cbmNvbnN0IGh0bWxGb2xkZXIgPSAnaHRtbC8nO1xuY29uc3QgY3NzRm9sZGVyID0gJ2Nzcy8nO1xuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoSHRtbChmaWxlbmFtZSA6IHN0cmluZykgOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIFxuICAgICAgICBsZXQgdXJsID0gYnJvd3Nlci5ydW50aW1lLmdldFVSTChcbiAgICAgICAgICAgIGh0bWxGb2xkZXIgKyBmaWxlbmFtZVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIHRoaXMgaXMgdGggZXByb21pc2UgdGhhdCB3ZSByZXR1cm4gYW5kIGxldHRpbmcgdGhlIGZldGNoIGZ1bmN0aW9uIGhhbmRsZSByZXNvbHZpbmcgdGhlIHByb21pc2VcbiAgICAgICAgcmV0dXJuIGZldGNoKHVybClcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLnRleHQoKSlcbiAgICAgICAgICAgIC50aGVuKHRleHQgPT4gdGV4dClcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBcIkVycm9yIGluICdmZXRjaEh0bWwnLiBGaWxlOiAgZmV0Y2hlci50cyBcIilcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hDc3MoZmlsZW5hbWU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG5cbiAgICBsZXQgdXJsID0gYnJvd3Nlci5ydW50aW1lLmdldFVSTChcbiAgICAgICAgY3NzRm9sZGVyICsgZmlsZW5hbWVcbiAgICApO1xuXG4gICAgLy8gdGhpcyBpcyB0aCBlcHJvbWlzZSB0aGF0IHdlIHJldHVybiBhbmQgbGV0dGluZyB0aGUgZmV0Y2ggZnVuY3Rpb24gaGFuZGxlIHJlc29sdmluZyB0aGUgcHJvbWlzZVxuICAgIHJldHVybiBmZXRjaCh1cmwpXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLnRleHQoKSlcbiAgICAgICAgLnRoZW4odGV4dCA9PiB0ZXh0KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gXCJFcnJvciBpbiAnZmV0Y2hDc3MnLiBGaWxlOiBmZXRjaGVyLnRzXCIpXG59XG5cblxudHlwZSBUZmV0Y2hlciA9IHtcbiAgICBmZXRjaEh0bWwgOiBQcm9taXNlPHN0cmluZz5cbn1cblxuZXhwb3J0IHR5cGUge1xuICAgIFRmZXRjaGVyXG59O1xuXG4vLyBleHBvcnQge1xuLy8gICAgIGZldGNoSHRtbCA6IFxuLy8gfVxuXG4iLCJpbXBvcnQgKiBhcyBmZXRjaGVyIGZyb20gXCIuL2ZldGNoZXJcIjtcbmltcG9ydCAqIGFzIHByb2plY3RzIGZyb20gXCIuL3Byb2plY3RzL3Byb2plY3RzXCI7XG5pbXBvcnQgKiBhcyBzb3VyY2UgZnJvbSBcIi4vc291cmNlL3NvdXJjZVwiO1xuaW1wb3J0ICogYXMgY2xpcGJvYXJkIGZyb20gXCIuL2NsaXBib2FyZFwiO1xuXG5pbXBvcnQgeyBIVE1MUHJvamVjdENoaWxkUm93IH0gZnJvbSBcIi4vcHJvamVjdHMvcHJvamVjdF9kb21cIjtcblxuLy8gaW1wb3J0IHsgYWdlX2RiaXMgfSBmcm9tIFwiLi9kYmktc2VuZFwiO1xuXG5sZXQgb3ZlcmxheUNvbnRhaW5lciA6IEVsZW1lbnQ7XG5sZXQgb3ZlcmxheUNzczogSFRNTEVsZW1lbnQ7XG5cbmxldCB0YWJsZUNzczogSFRNTEVsZW1lbnQ7XG5cbi8vIG90aGVyIGNhY2hlZCBlbGVtZW50c1xubGV0IGNvbnRleHRPdmVybGF5OiBFbGVtZW50O1xuXG5sZXQgc2lkZVBhbmVsOiBFbGVtZW50O1xuXG5cbmZ1bmN0aW9uIGluaXRPdmVybGF5KCkgOiB2b2lke1xuICAgIGNvbnNvbGUubG9nKCdPVkVSTEFZIFRTIElOSVQnKTtcblxuICAgIG92ZXJsYXlDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBvdmVybGF5Q29udGFpbmVyLmlkID0gXCJhZ2Vfb3ZlcmxheUNvbnRhaW5lclwiOyBcbiAgICBvdmVybGF5Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBleHRlbnNpb25DbGlja0hhbmRsZXIpO1xuICAgIG92ZXJsYXlDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRzb3VyY2VcIiwgKGV2ZW50IDogQ3VzdG9tRXZlbnQpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2xvYWQgc291cmNlIGV2ZW50IScsIGV2ZW50LmRldGFpbC5jb250ZW50T2JqZWN0KTtcbiAgICAgICAgc291cmNlLmxvYWRXaXRoQ29udGVudE9iamVjdChldmVudC5kZXRhaWwuY29udGVudE9iamVjdCk7XG4gICAgfSk7XG4gICAgb3ZlcmxheUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibmV3c291cmNlXCIsIChldmVudDogQ3VzdG9tRXZlbnQpID0+IHt9KTtcbiAgICBvdmVybGF5Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJuZXdwcm9qZWN0XCIsIChldmVudDogQ3VzdG9tRXZlbnQpID0+IHt9KTtcblxuXG4gICAgZmV0Y2hlci5mZXRjaEh0bWwoXCJvdmVybGF5Lmh0bWxcIilcbiAgICAgICAgLnRoZW4oaHRtbCA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkhUTUwgOiBcIiwgaHRtbClcbiAgICAgICAgICAgIG92ZXJsYXlDb250YWluZXIuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgICAgIGNvbnRleHRPdmVybGF5ID0gb3ZlcmxheUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiI2FnZV9jb250ZXh0T3ZlcmxheVwiKTtcbiAgICAgICAgICAgIC8vIGNvbnRleHRPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoaWRlQ29udGV4dE1lbnVzKTtcbiAgICAgICAgICAgIHNpZGVQYW5lbCA9IG92ZXJsYXlDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2Vfb3ZlcmxheVJpZ2h0UGFuZWxcIik7XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcHJvamVjdHMuaW5pdFByb2plY3RzKHNpZGVQYW5lbCwgY29udGV4dE92ZXJsYXkucXVlcnlTZWxlY3RvcihcIiNhZ2VfbW9yZVByb2plY3RPcHRpb25zQ29udGV4dE1lbnVcIikpOyAvLyBQYXNzIHRoZSBjb250ZXh0IG1lbnUhXG4gICAgICAgICAgICBzb3VyY2UuaW5pdFNvdXJjZUNvbnRhaW5lcihzaWRlUGFuZWwsIGNvbnRleHRPdmVybGF5LnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX21vcmVTb3VyY2VPcHRpb25zQ29udGV4dE1lbnVcIikpOyAvLyBQYXNzIHRoZSBjb250ZXh0IG1lbnUhXG4gICAgICAgICAgICBjbGlwYm9hcmQuaW5pdENsaXBib2FyZChzaWRlUGFuZWwpO1xuICAgICAgICB9KVxuXG4gICAgb3ZlcmxheUNzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgICBvdmVybGF5Q3NzLmlkID0gXCJhZ2Vfb3ZlcmxheVN0eWxlXCI7XG4gICAgZmV0Y2hlci5mZXRjaENzcyhcIm92ZXJsYXkuY3NzXCIpXG4gICAgLnRoZW4oY3NzID0+IHtcbiAgICAgICAgb3ZlcmxheUNzcy5pbm5lclRleHQgPSBjc3M7XG4gICAgfSlcblxuICAgIHRhYmxlQ3NzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgIHRhYmxlQ3NzLmlkID0gXCJhZ2VfdGFibGVTdHlsZVwiO1xuICAgIGZldGNoZXIuZmV0Y2hDc3MoXCJ0YWJsZXMuY3NzXCIpIFxuICAgICAgICAudGhlbihjc3MgPT4ge1xuICAgICAgICAgICAgdGFibGVDc3MuaW5uZXJUZXh0ID0gY3NzO1xuICAgICAgICB9KVxuXG59XG5cblxuXG5mdW5jdGlvbiBleHRlbnNpb25DbGlja0hhbmRsZXIoZXZlbnQgOiBNb3VzZUV2ZW50KXtcblxuICAgIGxldCBldmVudFRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAvLyBjb25zb2xlLmxvZygnX15fXl9eX15fXl9eJywgZXZlbnRUYXJnZXQuaWQpO1xuICAgIFxuICAgIC8qIFxuICAgICAgICBOT1RFOiBUSElTIEhBUyBCRUVOIE1PVkVEIFRPIElUUyBPV04gRVZFTlQhXG4gICAgKi9cbiAgICAvLyBpZiAoZXZlbnRUYXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJhZ2VfcHJvamNoaWxkVGFibGVSb3dcIikpe1xuICAgIC8vICAgICBsZXQgcHJvamVjdENoaWxkUm93ID0gZXZlbnRUYXJnZXQucGFyZW50RWxlbWVudCBhcyBIVE1MUHJvamVjdENoaWxkUm93O1xuICAgIC8vICAgICAvLyBjb25zb2xlLmxvZygnQ2xpY2tlZCBvbiBjaGlsZCByb3cgd2l0aCB1dWlkID0gJywgcHJvamVjdENoaWxkUm93LkNvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnQuVXVpZCk7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKFwiVE9ETzogTE9BRCBDTElDS0VEIFNPVVJDRVMhIFwiLCBwcm9qZWN0Q2hpbGRSb3cuQ29udGVudEVkZ2VPYmplY3QuY29udGVudCk7XG4gICAgICAgIFxuICAgIC8vIH1cbn1cblxuXG5mdW5jdGlvbiBzaG93T3ZlcmxheSgpIDogdm9pZHtcbiAgICBkb2N1bWVudC5ib2R5Lmxhc3RFbGVtZW50Q2hpbGQuYWZ0ZXIob3ZlcmxheUNvbnRhaW5lcik7XG5cbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZChvdmVybGF5Q3NzKTtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZCh0YWJsZUNzcyk7XG4gICAgcHJvamVjdHMuYXBwZW5kQ3NzKCk7XG4gICAgc291cmNlLmFwcGVuZENzcygpO1xuICAgIGNsaXBib2FyZC5hcHBlbmRDc3MoKTtcbiAgICAvLyBmZXRjaGVyLmZldGNoSHRtbChcIm92ZXJsYXkuaHRtbFwiKVxuICAgIC8vICAgICAudGhlbihodG1sID0+IG92ZXJsYXlDb250YWluZXIuaW5uZXJIdG1sID0gaHRtbClcbn1cblxuXG5mdW5jdGlvbiBoaWRlT3ZlcmxheSgpIDogdm9pZCB7XG4gICAgb3ZlcmxheUNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICBvdmVybGF5Q3NzLnJlbW92ZSgpO1xuXG4gICAgdGFibGVDc3MucmVtb3ZlKCk7XG5cbiAgICBwcm9qZWN0cy5yZW1vdmVDc3MoKTtcbiAgICBzb3VyY2UucmVtb3ZlQ3NzKCk7XG4gICAgY2xpcGJvYXJkLnJlbW92ZUNzcygpO1xufVxuXG5cblxuXG5leHBvcnQge1xuICAgIGluaXRPdmVybGF5LFxuICAgIHNob3dPdmVybGF5LFxuICAgIGhpZGVPdmVybGF5LFxufSIsIlxuaW1wb3J0IHsgYWdlX2RiaXMgfSBmcm9tIFwiLi4vZGJpLXNlbmRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBIVE1MUHJvamVjdFRhYmxlUm93IGV4dGVuZHMgSFRNTFRhYmxlUm93RWxlbWVudCB7XG4gICAgbm9kZU9iamVjdDogYW55O1xufVxuZXhwb3J0IGludGVyZmFjZSBIVE1MVGFibGVDb250ZW50T2JqZWN0IGV4dGVuZHMgSFRNTFRhYmxlRWxlbWVudCB7XG4gICAgY29udGVudE9iamVjdDogYW55O1xufVxuZXhwb3J0IGludGVyZmFjZSBIVE1MUHJvamVjdENoaWxkUm93IGV4dGVuZHMgSFRNTFRhYmxlUm93RWxlbWVudCB7XG4gICAgQ29udGVudEVkZ2VPYmplY3Q6IGFueTtcbiAgICBpc1Byb2plY3RDaGlsZFJvdyA6IGJvb2xlYW47XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHBvcHVsYXRlUHJvcGVydGllc1RhYmxlKHByb3BlcnRpZXNUYWJsZTogSFRNTFRhYmxlQ29udGVudE9iamVjdCwgcHJvamVjdENvbnRlbnRPYmplY3Q6IGFueSkge1xuXG4gICAgY29uc29sZS5sb2coXCJwcm9qZWN0Q29udGVudE9iamVjdCA9IFwiLCBwcm9qZWN0Q29udGVudE9iamVjdClcblxuICAgIC8vIGxldCBwcm9qZWN0T2JqZWN0ID0gZXh0ZW5zaW9uU3RhdGVGcm9udC5jdXJyZW50X3Byb2plY3RPYmplY3Q7XG4gICAgbGV0IHByb2plY3RPYmplY3QgPSBwcm9qZWN0Q29udGVudE9iamVjdDtcblxuICAgIHByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0ID0gcHJvamVjdENvbnRlbnRPYmplY3Q7XG4gICAgLy8gcHJvcGVydGllc1RhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCBwcm9qZWN0UHJvcGVydHlGb2N1c091dClcblxuICAgIC8vIGV4dGVuc2lvblN0YXRlRnJvbnQuY3VycmVudF9wcm9qZWN0VXVpZCA9IHByb2plY3RPYmplY3QuVXVpZDtcblxuICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhYS1wcm9qZWN0VGl0bGUnKS50ZXh0Q29udGVudCA9IHByb2plY3RPYmplY3QuVGl0bGU7XG5cbiAgICAvLyBsZXQgdGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdlX3Byb2plY3RQcm9wZXJ0aWVzVGFibGUtdGJvZHknKTtcbiAgICBsZXQgdGJvZHkgPSBwcm9wZXJ0aWVzVGFibGUucXVlcnlTZWxlY3RvcihcInRib2R5XCIpO1xuICAgIHRib2R5LmlubmVySFRNTCA9ICcnO1xuXG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBwcm9qZWN0T2JqZWN0KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGAke2tleX06ICR7cHJvamVjdE9iamVjdFtrZXldfWApO1xuICAgICAgICBpZiAoa2V5ID09PSAnVHlwZScgfHwga2V5ID09PSAnVGl0bGUnIHx8IGtleSA9PT0gJ0dvYWwnKSB7XG5cbiAgICAgICAgICAgIHRib2R5LmlubmVySFRNTCArPSBgXG5cdFx0XG5cdFx0XHQ8dHI+XG5cdFx0XHRcdDx0ZCBpZD1hZ2VfcHJvalByb3BUYWJsZS0ke2tleX0ta2V5IGNsYXNzPVwiYWdlX2VsZW1lbnRcIiA+JHtrZXl9PC90ZD5cblx0XHRcdFx0PHRkIGlkPWFnZV9wcm9qUHJvcFRhYmxlLSR7a2V5fS12YWx1ZSBjbGFzcz1cImFnZV9lbGVtZW50XCIgY29udGVudGVkaXRhYmxlPVwidHJ1ZVwiID4ke3Byb2plY3RPYmplY3Rba2V5XX08L3RkPlxuXHRcdFx0PC90cj5cblx0XHRcblx0XHRgO1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0Ym9keS5pbm5lckhUTUwgKz0gYFxuXHRcdFxuXHRcdFx0PHRyPlxuXHRcdFx0XHQ8dGQgaWQ9YWdlX3Byb2pQcm9wVGFibGUtJHtrZXl9LWtleSBjbGFzcz1cImFnZV9lbGVtZW50XCIgPiR7a2V5fTwvdGQ+XG5cdFx0XHRcdDx0ZCBpZD1hZ2VfcHJvalByb3BUYWJsZS0ke2tleX0tdmFsdWUgY2xhc3M9XCJhZ2VfZWxlbWVudFwiPiR7cHJvamVjdE9iamVjdFtrZXldfTwvdGQ+XG5cdFx0XHQ8L3RyPlxuXHRcdFxuXHRcdGA7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8vIGNvbnNvbGUubG9nKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNhZ2VfcHJvamVjdFByb3BlcnRpZXNUYWJsZSB0Ym9keSB0cicpKVxuICAgIC8vIGxldCBlZGl0YWJsZVByb2plY3RQcm9wZXJ0eVRkczogTm9kZUxpc3RPZjxFbGVtZW50PiA9IHRib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hZ2VfZWRpdGFibGVQcm9qZWN0UHJvcGVydHknKTtcbiAgICAvLyBjb25zb2xlLmxvZyhlZGl0YWJsZVByb2plY3RQcm9wZXJ0eVRkKVxuXG4gICAgLy8gQXJyYXkuZnJvbShlZGl0YWJsZVByb2plY3RQcm9wZXJ0eVRkcykuZm9yRWFjaCgoZWRpdGFibGVQcm9wZXJ0eUVsZW1lbnQpID0+IHtcbiAgICAvLyAgICAgZWRpdGFibGVQcm9wZXJ0eUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCBlZGl0YWJsZVByb2plY3RQcm9wZXJ0eUZvY3VzT3V0KVxuICAgIC8vIH0pXG4gICAgLy8gZm9yIChsZXQgZWRpdGFibGVQcm9qZWN0UHJvcGVydHlUZCBvZiBlZGl0YWJsZVByb2plY3RQcm9wZXJ0eVRkcykge1xuICAgIC8vICAgICAvLyBjb25zb2xlLmxvZyhlZGl0YWJsZVByb2plY3RQcm9wZXJ0eVRkLnRleHRDb250ZW50KTtcbiAgICAvLyAgICAgLy8gY29uc29sZS5sb2cocHJvcGVydHlSb3cudGV4dENvbnRlbnQubGVuZ3RoKVxuXG4gICAgLy8gICAgIC8vIGVkaXRhYmxlUHJvamVjdFByb3BlcnR5VGQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCByZWFkUHJvamVjdFByb3BlcnRpZXNGcm9tRG9tQW5kV3JpdGVQdXQpXG4gICAgLy8gICAgIGVkaXRhYmxlUHJvamVjdFByb3BlcnR5VGQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCBlZGl0YWJsZVByb2plY3RQcm9wZXJ0eUZvY3VzT3V0KVxuICAgIC8vICAgICAvLyBlZGl0YWJsZVByb2plY3RQcm9wZXJ0eVRkLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgcG9zdFByb2plY3RQcm9wZXJ0aWVzKVxuICAgIC8vIH1cblxufVxuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIHBvcHVsYXRlQ2hpbGRyZW5UYWJsZSh0YWJsZSA6IEhUTUxUYWJsZUVsZW1lbnQsIHByb2plY3RDaGlsZENvbnRlbnRFZGdlcyA6IGFueSl7XG5cbiAgICAvLyBsZXQgcHJvamVjdENoaWxkQ29udGVudEVkZ2VzID0gZXh0ZW5zaW9uU3RhdGVGcm9udC5jdXJyZW50X3Byb2plY3RDaGlsZENvbnRlbnRFZGdlcztcblxuICAgIC8vIGV4dGVuc2lvblN0YXRlRnJvbnQuY3VycmVudF9wcm9qZWN0VXVpZCA9IHByb2plY3RPYmplY3QuVXVpZDtcblxuICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhYS1wcm9qZWN0VGl0bGUnKS50ZXh0Q29udGVudCA9IHByb2plY3RPYmplY3QuVGl0bGU7XG5cblxuICAgIGxldCB0Ym9keSA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoJ3Rib2R5Jyk7XG5cbiAgICB0Ym9keS5pbm5lckhUTUwgPSAnJztcblxuICAgIGZvciAoY29uc3QgY29udGVudEVkZ2Ugb2YgcHJvamVjdENoaWxkQ29udGVudEVkZ2VzKSB7XG5cbiAgICAgICAgbGV0IG5ld1Byb2plY3RDaGlsZFJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykgYXMgSFRNTFByb2plY3RDaGlsZFJvdztcblxuICAgICAgICBuZXdQcm9qZWN0Q2hpbGRSb3cuaXNQcm9qZWN0Q2hpbGRSb3cgPSB0cnVlO1xuXG4gICAgICAgIC8vIEN1c3RvbSBldmVudCB0byBzcGVjaWZpY2FsbHkgbG9hZCB0aGUgc291cmNlIGZyb20gdGhlIG92ZXJsYXktdHMgbW9kdWxlXG4gICAgICAgIG5ld1Byb2plY3RDaGlsZFJvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50IDogRXZlbnQpID0+IHtcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vd3d3LnJlZGRpdC5jb20vci93ZWJkZXYvY29tbWVudHMvcmhmMm11L2ZyaWVuZGx5X3JlbWluZGVyX3VzZV9ldmVudGN1cnJlbnR0YXJnZXRfbm90L1xuICAgICAgICAgICAgbGV0IGVsZW1lbnRDdXJyZW50VGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldCBhcyBIVE1MUHJvamVjdENoaWxkUm93O1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJldmVudC5jdXJyZW50VGFyZ2V0ID0gXCIsIGVsZW1lbnRDdXJyZW50VGFyZ2V0KVxuICAgICAgICAgICAgbGV0IGxvYWRzb3VyY2VFdmVudCA9IG5ldyBDdXN0b21FdmVudCggXCJsb2Fkc291cmNlXCIsIHsgXG4gICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkZXRhaWw6IHtjb250ZW50T2JqZWN0OiBlbGVtZW50Q3VycmVudFRhcmdldC5Db250ZW50RWRnZU9iamVjdC5jb250ZW50fSxcblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGV0IF90aGlzID0gdGhpcyBhcyBIVE1MUHJvamVjdENoaWxkUm93O1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJfdGhpcyA9IFwiLCBfdGhpcyk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImV2ZW50LnRhcmdldCA9IFwiLCBldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBlbGVtZW50Q3VycmVudFRhcmdldC5kaXNwYXRjaEV2ZW50KGxvYWRzb3VyY2VFdmVudCk7XG4gICAgICAgICAgICBcbiAgICAgICAgIH0pXG5cbiAgICAgICAgbmV3UHJvamVjdENoaWxkUm93LmlkID0gYGFnZV9wcm9qY2hpbGRUYWJsZVJvdy0ke2NvbnRlbnRFZGdlLmNvbnRlbnQuVXVpZH1gO1xuICAgICAgICBuZXdQcm9qZWN0Q2hpbGRSb3cuY2xhc3NMaXN0LmFkZChcImFnZV9wcm9qY2hpbGRUYWJsZVJvd1wiKTtcbiAgICAgICAgbmV3UHJvamVjdENoaWxkUm93LkNvbnRlbnRFZGdlT2JqZWN0ID0gY29udGVudEVkZ2U7XG5cbiAgICAgICAgbmV3UHJvamVjdENoaWxkUm93LmlubmVySFRNTCArPSBgXG5cdFx0XG5cdFx0XHRcdDx0ZCBpZD1hZ2VfcHJvamNoaWxkVGFibGUtVGFibGUtJHtjb250ZW50RWRnZS5jb250ZW50LlV1aWR9IGNsYXNzPVwiYWdlX2VsZW1lbnRcIiBkYXRhLVV1aWQ9JHtjb250ZW50RWRnZS5jb250ZW50LlV1aWR9PiR7Y29udGVudEVkZ2UuY29udGVudC5UYWJsZX08L3RkPlxuXHRcdFx0XHQ8dGQgaWQ9YWdlX3Byb2pjaGlsZFRhYmxlLVRpdGxlLSR7Y29udGVudEVkZ2UuY29udGVudC5VdWlkfSBjbGFzcz1cImFnZV9lbGVtZW50XCIgZGF0YS1VdWlkPSR7Y29udGVudEVkZ2UuY29udGVudC5VdWlkfT4ke2NvbnRlbnRFZGdlLmNvbnRlbnQuVGl0bGV9PC90ZD5cblx0XHRcdFxuXHRcdGA7XG5cbiAgICAgICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGlkPWFnZV9wcm9qY2hpbGRUYWJsZVJvdy0ke25vZGVFZGdlLlV1aWR9YCk7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGlkPWFnZV9wcm9qY2hpbGRUYWJsZVJvdy0ke25vZGVFZGdlLlV1aWR9YCkpXG5cblxuICAgICAgICAvLyBuZXdQcm9qZWN0Q2hpbGRSb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcm9qZWN0Q2hpbGRSb3dDbGlja2VkKVxuXG4gICAgICAgIHRib2R5LmFwcGVuZENoaWxkKG5ld1Byb2plY3RDaGlsZFJvdylcblxuICAgIH1cblxufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9wdWxhdGVQcm9qZWN0U2VhcmNoVGFibGUocHJvamVjdFNlYXJjaFRhYmxlIDogYW55LCBwcm9qZWN0T2JqZWN0cyA6IGFueSk6IHZvaWQge1xuICAgIC8vIGNvbnNvbGUubG9nKCdQUk9KRUNUIFRCQUxFIFBPUCcpO1xuXG4gICAgLy8gY2hpbGRPYmplY3RzID0gZXh0ZW5zaW9uU3RhdGVGcm9udC5jdXJyZW50X3Byb2plY3RTZWFyY2hPYmplY3RzO1xuXG4gICAgLy8gbGV0IHByb2plY3RUYWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2VfcHJvamVjdFRhYmxlJyk7XG4gICAgLy8gY29uc29sZS5sb2coXCJTU1NTU1NTU1NTU1NTU1NTUyA9IFwiLCBwcm9qZWN0T2JqZWN0cy5sZW5ndGgpXG4gICAgbGV0IHRib2R5ID0gcHJvamVjdFNlYXJjaFRhYmxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0Ym9keScpWzBdXG4gICAgLy8gY29uc29sZS5sb2coXCJ0Ym9keSA9IFwiLCB0Ym9keSk7XG5cbiAgICB0Ym9keS5pbm5lckhUTUwgPSAnJztcblxuICAgIGZvciAobGV0IGNoaWxkT2JqZWN0IG9mIHByb2plY3RPYmplY3RzKSB7XG5cbiAgICAgICAgbGV0IHRhYmxlUm93SHRtbCA9IGBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8dGQgZGF0YS1VdWlkPVwiJHtjaGlsZE9iamVjdC5VdWlkfVwiIGNsYXNzPVwiYWdlX2VsZW1lbnQgYWdlX3Byb2plY3RSb3dTZWFyY2hEYXRhXCI+JHtjaGlsZE9iamVjdC5UYWJsZX08L3RoPlxuICAgICAgICAgICAgICAgIDx0ZCBkYXRhLVV1aWQ9XCIke2NoaWxkT2JqZWN0LlV1aWR9XCIgY2xhc3M9XCJhZ2VfZWxlbWVudCBhZ2VfcHJvamVjdFJvd1NlYXJjaERhdGFcIj4ke2NoaWxkT2JqZWN0LlRpdGxlfTwvdGQ+XG5cbiAgICAgICAgICAgIGA7XG4gICAgICAgIC8vIGxldCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gICAgICAgIGxldCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykgYXMgSFRNTFByb2plY3RUYWJsZVJvdztcbiAgICAgICAgdHIuaWQgPSAnYWdlX3Byb2plY3RTZWFyY2hSb3ctJyArIGNoaWxkT2JqZWN0LlV1aWQ7XG4gICAgICAgIHRyLmNsYXNzTGlzdC5hZGQoJ2FnZV9wcm9qZWN0U2VhcmNoUm93Jyk7XG4gICAgICAgIHRyLm5vZGVPYmplY3QgPSBjaGlsZE9iamVjdDtcbiAgICAgICAgLy8gdHIuZGF0YXNldC5Ob2RlID0gMTtcbiAgICAgICAgLy8gdHIuZGF0YXNldC5VdWlkID0gY2hpbGRPYmplY3QuVXVpZDtcbiAgICAgICAgdHIuc2V0QXR0cmlidXRlKCdkYXRhLU5vZGUnLCAnMScpO1xuICAgICAgICB0ci5zZXRBdHRyaWJ1dGUoJ2RhdGEtVXVpZCcsIGNoaWxkT2JqZWN0LlV1aWQpO1xuICAgICAgICAvLyB0ci50YWJJbmRleCA9IDA7XG4gICAgICAgIHRyLmlubmVySFRNTCA9IHRhYmxlUm93SHRtbDtcbiAgICAgICAgLy8gdHIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja0NhbGxiYWNrKTtcbiAgICAgICAgLy8gdHIuY29udGVudEVkaXRhYmxlID0gJ1RydWUnO1xuXG4gICAgICAgIHRib2R5LmFwcGVuZCh0cik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRyKVxuICAgIH1cblxufSIsImltcG9ydCAqIGFzIGZldGNoZXIgZnJvbSBcIi4uL2ZldGNoZXJcIjtcbmltcG9ydCAqIGFzIGRvbSBmcm9tIFwiLi9wcm9qZWN0X2RvbVwiO1xuaW1wb3J0IHsgSFRNTFByb2plY3RUYWJsZVJvdywgSFRNTFRhYmxlQ29udGVudE9iamVjdCB9IGZyb20gXCIuL3Byb2plY3RfZG9tXCI7XG5pbXBvcnQge2FnZV9kYmlzfSBmcm9tIFwiLi4vZGJpLXNlbmRcIjtcblxuXG5sZXQgY3VycmVudFByb2plY3RPYmplY3QgOiBhbnk7XG5cbmxldCBzaWRlUGFuZWwgOiBFbGVtZW50O1xuXG5sZXQgcHJvamVjdE1vcmVPcHRpb25zQ29udGV4dE1lbnUgOiBIVE1MRGl2RWxlbWVudDtcblxubGV0IHByb2plY3RDb250YWluZXIgOiBFbGVtZW50O1xubGV0IHByb2plY3RDc3M6IEhUTUxFbGVtZW50O1xuXG5sZXQgcHJvamVjdE1vcmVPcHRpb25zQnV0dG9uIDogSFRNTEVsZW1lbnQ7XG5sZXQgcHJvamVjdE1vcmVPcHRpb25zTWVudTogSFRNTEVsZW1lbnQ7XG5cbmxldCBwcm9qZWN0U2VhcmNoRWxlbWVudCA6IEhUTUxEaXZFbGVtZW50O1xubGV0IHNlYXJjaFN0cmluZ0V4aXN0cyA6IGJvb2xlYW4gPSBmYWxzZTtcblxubGV0IHByb2plY3RTZWFyY2hPYmplY3RzOiBhbnk7XG5sZXQgcHJvamVjdFNlYXJjaFRhYmxlOiBIVE1MVGFibGVFbGVtZW50O1xuXG5sZXQgcHJvamVjdENvbnRlbnRFZGdlQ2hpbGRyZW4gOiBhbnk7XG5sZXQgcHJvamVjdENoaWxkcmVuVGFibGUgOiBIVE1MVGFibGVFbGVtZW50O1xuXG5sZXQgcHJvamVjdFByb3BlcnRpZXNUYWJsZTogSFRNTFRhYmxlQ29udGVudE9iamVjdDtcblxuXG4vLyBpbnRlcmZhY2UgSFRNTFRhYmxlUm93RWxlbWVudCB7XG4vLyAgICAgbm9kZU9iamVjdD86IGFueTtcbi8vIH1cblxuLy8gaW50ZXJmYWNlIEhUTUxQcm9qZWN0VGFibGVSb3cgZXh0ZW5kcyBIVE1MVGFibGVSb3dFbGVtZW50IHtcbi8vICAgICBub2RlT2JqZWN0OiBhbnk7XG4vLyB9XG5cblxuZnVuY3Rpb24gaW5pdFByb2plY3RzKF9zaWRlUGFuZWwgOiBFbGVtZW50LCBfcHJvamVjdE1vcmVPcHRpb25zQ29udGV4dE1lbnUgOiBIVE1MRGl2RWxlbWVudCkgOiB2b2lke1xuICAgIGNvbnNvbGUubG9nKCdPVkVSTEFZIFRTIElOSVQnKTtcblxuICAgIHNpZGVQYW5lbCA9IF9zaWRlUGFuZWw7XG5cbiAgICAvLyBNT1JFIE9QVElPTlMgQ09OVEVYVCBNRU5VXG4gICAgcHJvamVjdE1vcmVPcHRpb25zQ29udGV4dE1lbnUgPSBfcHJvamVjdE1vcmVPcHRpb25zQ29udGV4dE1lbnU7XG4gICAgcHJvamVjdE1vcmVPcHRpb25zQ29udGV4dE1lbnUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrZWRQcm9qZWN0Q29udGV4dE1lbnUpXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGlkZVByb2plY3RDb250ZXh0TWVudSwge2NhcHR1cmU6IGZhbHNlfSk7XG5cbiAgICBwcm9qZWN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcHJvamVjdENvbnRhaW5lci5pZCA9IFwiYWdlX3Byb2plY3RDb250YWluZXJcIjtcbiAgICBwcm9qZWN0Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwcm9qZWN0Q2xpY2spO1xuICAgIHByb2plY3RDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIHByb2plY3RQcm9wZXJ0eUZvY3VzT3V0KTtcblxuICAgIGZldGNoZXIuZmV0Y2hIdG1sKFwicHJvamVjdHMuaHRtbFwiKVxuICAgICAgICAudGhlbihodG1sID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiSFRNTCA6IFwiLCBodG1sKVxuICAgICAgICAgICAgcHJvamVjdENvbnRhaW5lci5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgICAgICAgcHJvamVjdFNlYXJjaFRhYmxlID0gcHJvamVjdENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwidGFibGVcIik7XG4gICAgICAgICAgICBwcm9qZWN0Q2hpbGRyZW5UYWJsZSA9IHByb2plY3RDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2VfcHJvamVjdENoaWxkcmVuVGFibGVcIik7XG4gICAgICAgICAgICBwcm9qZWN0UHJvcGVydGllc1RhYmxlID0gcHJvamVjdENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiI2FnZV9wcm9qZWN0UHJvcGVydGllc1RhYmxlXCIpO1xuICAgICAgICAgICAgcHJvamVjdFNlYXJjaEVsZW1lbnQgPSBwcm9qZWN0Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX3Byb2plY3RTZWFyY2hJbnB1dFwiKTtcbiAgICAgICAgICAgIHByb2plY3RTZWFyY2hFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c2luXCIsIHNlYXJjaFByb2plY3RJbik7XG4gICAgICAgICAgICBwcm9qZWN0U2VhcmNoRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgc2VhcmNoUHJvamVjdE91dCk7XG5cbiAgICAgICAgICAgIC8vIFRPRE8gOiBncmFiIHRoZSBtb3JlIG9wdGlvbnMgY29udGV4dCBtZW51XG4gICAgICAgICAgICAvLyBwcm9qZWN0TW9yZU9wdGlvbnNNZW51ID0gXG4gICAgICAgICAgICBwcm9qZWN0TW9yZU9wdGlvbnNCdXR0b24gPSBwcm9qZWN0Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX3Byb2plY3RNb3JlT3B0aW9uc1wiKTtcbiAgICAgICAgICAgIGxldCBtb3JlT3B0aW9uc0JhY2tncm91bmRVcmwgPSBicm93c2VyLnJ1bnRpbWUuZ2V0VVJMKFxuICAgICAgICAgICAgICAgIFwicmVzb3VyY2VzL21vcmUtb3B0aW9ucy5wbmdcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGxldCBiYWNrZ3JvdW5kU3RyaW5nID0gYHVybCgke21vcmVPcHRpb25zQmFja2dyb3VuZFVybH0pYDtcbiAgICAgICAgICAgIHByb2plY3RNb3JlT3B0aW9uc0J1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBiYWNrZ3JvdW5kU3RyaW5nO1xuXG4gICAgICAgICAgICAvLyBTZWFyY2ggaWNvblxuICAgICAgICAgICAgbGV0IHNlYXJjaEJhY2tncm91bmRVcmwgPSBicm93c2VyLnJ1bnRpbWUuZ2V0VVJMKFxuICAgICAgICAgICAgICAgIFwicmVzb3VyY2VzL3NlYXJjaC1pY29uLnBuZ1wiXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbGV0IHNlYXJjaEJhY2tncm91bmRTdHJpbmcgPSBgdXJsKCR7c2VhcmNoQmFja2dyb3VuZFVybH0pYDtcbiAgICAgICAgICAgIHByb2plY3RTZWFyY2hFbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IHNlYXJjaEJhY2tncm91bmRTdHJpbmc7XG5cbiAgICAgICAgfSkgXG4gIFxuICAgIHByb2plY3RDc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gICAgcHJvamVjdENzcy5pZCA9IFwiYWdlX3Byb2plY3RTdHlsZVwiO1xuICAgIGZldGNoZXIuZmV0Y2hDc3MoXCJwcm9qZWN0cy5jc3NcIilcbiAgICAudGhlbihjc3MgPT4ge1xuICAgICAgICBwcm9qZWN0Q3NzLmlubmVyVGV4dCA9IGNzcztcbiAgICB9KVxuXG4gICAgXG5cbiAgICBjb25zb2xlLmxvZyhcInNpZGVQYW5lbC5pZCA9IFwiLCBzaWRlUGFuZWwuaWQpXG4gICAgXG4gICAgc2lkZVBhbmVsLmFwcGVuZChwcm9qZWN0Q29udGFpbmVyKTtcblxuXG4gICAgZmV0Y2hQcm9qZWN0U2VhcmNoKFwiXCIpXG4gICAgICAgIC50aGVuKChjb250ZW50T2JqZWN0QXJyYXkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbnRlbnRPYmplY3RBcnJheSlcbiAgICAgICAgICAgIGRvbS5wb3B1bGF0ZVByb2plY3RTZWFyY2hUYWJsZShwcm9qZWN0U2VhcmNoVGFibGUsIHByb2plY3RTZWFyY2hPYmplY3RzKTtcbiAgICAgICAgfSlcbiAgICBcblxufVxuXG5cblxuZnVuY3Rpb24gcHJvamVjdFByb3BlcnR5Rm9jdXNPdXQoZXZlbnQ6IEZvY3VzRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnRk9DVVMgT1VUIFBST0pFQ1QgUFJPUEVSVFknKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcImV2ZW50LnRhcmdldCA9IFwiLCBldmVudC50YXJnZXQpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwidGhpcyA9IFwiLCB0aGlzKTtcblxuICAgIGxldCBkYXRhRWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAvLyBsZXQgcHJvamVjdFRhYmxlOiBIVE1MVGFibGVDb250ZW50T2JqZWN0ID0gdGhpcztcbiAgICBcblxuICAgIC8vIGNvbnNvbGUubG9nKCcnLCBldmVudC50YXJnZXQuKVxuICAgIHN3aXRjaCAoZGF0YUVsZW1lbnQuaWQpIHtcbiAgICAgICAgLy8gVFlQRVxuICAgICAgICBjYXNlIFwiYWdlX3Byb2pQcm9wVGFibGUtVHlwZS12YWx1ZVwiOlxuICAgICAgICAgICAgcHJvamVjdFByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0LlR5cGUgPSBkYXRhRWxlbWVudC50ZXh0Q29udGVudDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyBUSVRMRVxuICAgICAgICBjYXNlIFwiYWdlX3Byb2pQcm9wVGFibGUtVGl0bGUtdmFsdWVcIjpcbiAgICAgICAgICAgIHByb2plY3RQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdC5UaXRsZSA9IGRhdGFFbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIEdPQUxcbiAgICAgICAgY2FzZSBcImFnZV9wcm9qUHJvcFRhYmxlLUdvYWwtdmFsdWVcIjpcbiAgICAgICAgICAgIHByb2plY3RQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdC5Hb2FsID0gZGF0YUVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgYWdlX2RiaXMuQ29udGVudF9VcGRhdGVXaXRoQ29udGVudE9iamVjdChwcm9qZWN0UHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QpXG4gICAgICAgIC50aGVuKHVwZGF0ZWRDb250ZW50T2JqZWN0ID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoZGF0YUVsZW1lbnQuaWQpIHtcbiAgICAgICAgICAgICAgICAvLyBUWVBFXG4gICAgICAgICAgICAgICAgY2FzZSBcImFnZV9wcm9qUHJvcFRhYmxlLVR5cGUtdmFsdWVcIjpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5hc3NlcnQodXBkYXRlZENvbnRlbnRPYmplY3QuVHlwZSA9PSBwcm9qZWN0UHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QuVHlwZSwgXCInUFVUJyBjb250ZW50IE9iamVjdCBUeXBlIGRvZXMgbm90IG1hdGNoIHRoZSBwcm9qZWN0IHRhYmxlIC5jb250ZW50T2JqZWN0LlR5cGUgIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgLy8gVElUTEVcbiAgICAgICAgICAgICAgICBjYXNlIFwiYWdlX3Byb2pQcm9wVGFibGUtVGl0bGUtdmFsdWVcIjpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5hc3NlcnQodXBkYXRlZENvbnRlbnRPYmplY3QuVGl0bGUgPT0gcHJvamVjdFByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0LlRpdGxlLCBcIidQVVQnIGNvbnRlbnQgT2JqZWN0IFRpdGxlIGRvZXMgbm90IG1hdGNoIHRoZSBwcm9qZWN0IHRhYmxlIC5jb250ZW50T2JqZWN0LlRpdGxlICFcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIC8vIEdPQUxcbiAgICAgICAgICAgICAgICBjYXNlIFwiYWdlX3Byb2pQcm9wVGFibGUtR29hbC12YWx1ZVwiOlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmFzc2VydCh1cGRhdGVkQ29udGVudE9iamVjdC5Hb2FsID09IHByb2plY3RQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdC5Hb2FsLCBcIidQVVQnIGNvbnRlbnQgT2JqZWN0IEdvYWwgZG9lcyBub3QgbWF0Y2ggdGhlIHByb2plY3QgdGFibGUgLmNvbnRlbnRPYmplY3QuR29hbCAhXCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfSlcbiAgICAvLyBsZXQgcHJvamVjdENvbnRlbnRPYmplY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0UHJvcGVydGllc1RhYmxlXCIpIGFzIEhUTUxUYWJsZUNvbnRlbnRPYmplY3Q7XG5cbiAgICBjb25zb2xlLmxvZyhcInByb2plY3RDb250ZW50T2JqZWN0LmNvbnRlbnRPYmplY3QgPSBcIiwgcHJvamVjdFByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0KTtcblxuXG4gICAgLy8gbGV0IGV2ZW50VGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgIC8vIGNvbnNvbGUubG9nKCdldmVudFRhcmdldC50ZXh0Q29udGVudCA9ICcsIGV2ZW50VGFyZ2V0LnRleHRDb250ZW50KTtcblxufVxuXG5mdW5jdGlvbiBjbGlja2VkUHJvamVjdENvbnRleHRNZW51KGV2ZW50OiBNb3VzZUV2ZW50KXtcbiAgICBsZXQgZXZlbnRUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgc3dpdGNoIChldmVudFRhcmdldC5pZCkge1xuICAgICAgICBjYXNlIFwibmV3UHJvamVjdEJ0blwiOlxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXZlbnRUYXJnZXQuaWQpXG4gICAgICAgICAgICBhZ2VfZGJpcy5Db250ZW50X0luc2VydE9uVGFibGUoXCJQcm9qZWN0XCIpLnRoZW4oKG5ld1Byb2plY3RPYmplY3QpID0+IHsgXG4gICAgICAgICAgICAgICAgbG9hZFByb2plY3RXaXRoQ29udGVudE9iamVjdChuZXdQcm9qZWN0T2JqZWN0KTtcbiAgICAgICAgICAgICAgICBwZXJmb3JtU2VhcmNoKCk7XG4gICAgICAgICAgICB9KSAvLyBwZXJmb3JtIHJlZ3VsYXIgc2VhcmNoXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm5ld1NvdXJjZUJ0blwiOlxuICAgICAgICAgICAgaW5zZXJ0TmV3U291cmNlVG9BY3RpdmVQcm9qZWN0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImJ0bjNcIjpcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50VGFyZ2V0LmlkKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJidG40XCI6XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudFRhcmdldC5pZClcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYnRuNVwiOlxuICAgICAgICAgICAgY29uc29sZS5sb2coZXZlbnRUYXJnZXQuaWQpXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxufVxuXG4vKipcbiAqIEFkZCBuZXcgY2hpbGQtc291cmNlLCBmaXJlcyBvZmYgdGhlIGxvYWRzb3VyY2UgQ3V0b21FdmVudCwgYW5kIHRoZW4gcmVsb2FkcyB0aGUgcHJvamVjdCBjaGlsZCB0YWJsZS5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gaW5zZXJ0TmV3U291cmNlVG9BY3RpdmVQcm9qZWN0KCl7XG4gICAgbGV0IGNvbnRlbnRFZGdlT2JqZWN0OiBhbnkgPSBhd2FpdCBhZ2VfZGJpcy5Db250ZW50RWRnZV9JbnNlcnRBZGphY2VudFRvVXVpZEludG9UYWJsZShjdXJyZW50UHJvamVjdE9iamVjdC5VdWlkLCAxLCAnU291cmNlJywgJycsICcnLCAnLycpXG5cbiAgICBsZXQgbG9hZHNvdXJjZUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwibG9hZHNvdXJjZVwiLCB7XG4gICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgIGRldGFpbDogeyBjb250ZW50T2JqZWN0OiBjb250ZW50RWRnZU9iamVjdC5jb250ZW50IH0sXG5cbiAgICB9KTtcbiAgICBwcm9qZWN0Q29udGFpbmVyLmRpc3BhdGNoRXZlbnQobG9hZHNvdXJjZUV2ZW50KTtcbiAgICAgICBcbiAgICBhZ2VfZGJpcy5Db250ZW50RWRnZV9TZWxlY3RDaGlsZE9mVXVpZChjdXJyZW50UHJvamVjdE9iamVjdC5VdWlkKVxuICAgICAgICAudGhlbigoY29udGVudEVkZ2VzKSA9PiB7XG4gICAgICAgICAgICBkb20ucG9wdWxhdGVDaGlsZHJlblRhYmxlKHByb2plY3RDaGlsZHJlblRhYmxlLCBjb250ZW50RWRnZXMpO1xuICAgICAgICB9KVxuICAgIFxufVxuXG5cbmZ1bmN0aW9uIGhpZGVQcm9qZWN0Q29udGV4dE1lbnUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBsZXQgZXZlbnRUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgLy8gY29uc29sZS5sb2coJ19eX15fXl9eX15fXicsIGV2ZW50VGFyZ2V0LmlkKTtcblxuICAgIGxldCBpc0NvbnRleHRFbGVtZW50OiBib29sZWFuID0gZXZlbnRUYXJnZXQuaWQgPT09IFwiYWdlX21vcmVQcm9qZWN0T3B0aW9uc0NvbnRleHRNZW51XCIgfHwgZXZlbnRUYXJnZXQuaWQgPT09IFwiYWdlX3Byb2plY3RNb3JlT3B0aW9uc1wiO1xuICAgIC8vIGNvbnNvbGUubG9nKCdpc0NvbnRleHRFbGVtZW50ID0gJywgaXNDb250ZXh0RWxlbWVudCk7XG5cbiAgICBpZiAoIWlzQ29udGV4dEVsZW1lbnQpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJDTElDS0VEIENPTlRFWFQgTUVOVSFAXCIpXG4gICAgICAgIGxldCBvcHRpb25zQ29udGV4dE1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9tb3JlUHJvamVjdE9wdGlvbnNDb250ZXh0TWVudVwiKTtcbiAgICAgICAgb3B0aW9uc0NvbnRleHRNZW51LmNsYXNzTGlzdC5hZGQoXCJhZ2VfZGlzcGxheU5vbmVcIilcbiAgICB9XG59XG5cblxuXG4vKipcbiAqICBNYWluIGNsaWNrIGhhbmRsZXIgaW4gdGhlIHByb2plY3QgY29udGFpbmVyLlxuICogXG4gKiBAcGFyYW0gZXZlbnQgXG4gKi9cblxuZnVuY3Rpb24gcHJvamVjdENsaWNrKGV2ZW50OiBFdmVudCl7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIkNsaWNrIGRldGVjdGVkIGluIHByb2plY3QgY29udGFpbmVyLlwiKTtcbiAgICBsZXQgY2xpY2tUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICBcbi8vIFNFQVJDSCBST1dcbiAgICBpZiAoY2xpY2tUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWdlX3Byb2plY3RSb3dTZWFyY2hEYXRhXCIpKXtcbiAgICAgICAgLy8gZ3JhYiBwYXJlbnQgYmVjYXVzZSB3ZSBjbGlja2VkIG9uIGRhdGEtZWxlbWVudFxuICAgICAgICBsZXQgdGFibGVSb3dUYXJnZXQgPSBjbGlja1RhcmdldC5wYXJlbnRFbGVtZW50IGFzIEhUTUxQcm9qZWN0VGFibGVSb3c7XG4gICAgICAgIGxvYWRQcm9qZWN0V2l0aENvbnRlbnRPYmplY3QodGFibGVSb3dUYXJnZXQubm9kZU9iamVjdClcbiAgICB9XG4vLyBTRUFSQ0gvQ0hJTERSRU4vUFJPUEVSVElFUyBCVVRUT05cbiAgICBlbHNlIGlmIChcbiAgICAgICAgICAgY2xpY2tUYXJnZXQuaWQgPT0gXCJhZ2VfcHJvamVjdFNlYXJjaEJ1dHRvblwiIFxuICAgICAgICB8fCBjbGlja1RhcmdldC5pZCA9PSBcImFnZV9wcm9qZWN0Q2hpbGRyZW5CdXR0b25cIiBcbiAgICAgICAgfHwgY2xpY2tUYXJnZXQuaWQgPT0gXCJhZ2VfcHJvamVjdFByb3BlcnRpZXNCdXR0b25cIlxuICAgICl7XG4gICAgICAgIC8vIHByb2plY3RTZWFyY2hCdXR0b25DbGlja2VkKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCk7XG4gICAgICAgIHNob3dQcm9qZWN0VGFibGUoY2xpY2tUYXJnZXQuaWQpO1xuICAgIH1cbi8vIE1PUkUgT1BUSU9OUyBCVVRUT05cbiAgICBlbHNlIGlmIChjbGlja1RhcmdldC5pZCA9PSBcImFnZV9wcm9qZWN0TW9yZU9wdGlvbnNcIikge1xuICAgICAgICAvLyBwcm9qZWN0TW9yZU9wdGlvbnNCdXR0b25DbGlja2VkKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCk7XG4gICAgICAgIHRvZ2dsZU1vcmVPcHRpb25zKCk7XG4gICAgfVxuLy8gVElUTEVcbiAgICBlbHNlIGlmIChjbGlja1RhcmdldC5pZCA9PSBcImFnZV9wcm9qZWN0VGl0bGVcIikge1xuICAgICAgICAvLyBwcm9qZWN0VGl0bGVDbGlja2VkKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCk7XG4gICAgICAgIGxldCBwcm9qZWN0Q29udGFpbmVyRWxlbWVudCA6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdENvbnRhaW5lclwiKTtcbiAgICAgICAgcHJvamVjdENvbnRhaW5lckVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29sbGFwc2VkXCIpID8gcHJvamVjdENvbnRhaW5lckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImNvbGxhcHNlZFwiKSA6IHByb2plY3RDb250YWluZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjb2xsYXBzZWRcIik7XG4gICAgfVxuXG4gICAgZWxzZXtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0lnbm9yZWQgUHJvamVjdCBDbGljay4nKTtcbiAgICB9XG59XG5cbi8qKlxuICogIGxvYWRzIGFuIGV4aXN0aW5nIHByb2plY3QuIFVzdWFsbHkgZnJvbSBjbGlja2luZyBvbiBhIHByb2plY3QgZHVyaW5nIHNlYXJjaCBPUiBjcmVhdGluZyBhIG5ldyBwcm9qZWN0IG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gbG9hZFByb2plY3RXaXRoQ29udGVudE9iamVjdChfY29udGVudE9iamVjdCA6IGFueSl7XG4gICAgLy8gU2V0IG1vZHVsZSB2YXJpYWJsZVxuICAgIGN1cnJlbnRQcm9qZWN0T2JqZWN0ID0gX2NvbnRlbnRPYmplY3Q7XG5cbiAgICAvLyBzZXQgdGl0bGVcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdlX3Byb2plY3RUaXRsZScpLnRleHRDb250ZW50ID0gX2NvbnRlbnRPYmplY3QuVGl0bGU7XG5cblxuICAgIGRvbS5wb3B1bGF0ZVByb3BlcnRpZXNUYWJsZShwcm9qZWN0UHJvcGVydGllc1RhYmxlLCBfY29udGVudE9iamVjdCk7XG4gICAgLy8gcG9wdWxhdGUgcHJvcGVydGllcyB0YWJsZSBcbiAgICBmZXRjaFByb2plY3RDaGlsZHJlbihfY29udGVudE9iamVjdC5VdWlkKVxuICAgICAgICAudGhlbigoY29udGVudEVkZ2VPYmplY3RzKSA9PiB7IGRvbS5wb3B1bGF0ZUNoaWxkcmVuVGFibGUocHJvamVjdENoaWxkcmVuVGFibGUsIHByb2plY3RDb250ZW50RWRnZUNoaWxkcmVuKSB9XG4gICAgICAgICk7XG5cbiAgICAvLyBtb3ZlIGZvY3VzIHRvIHRoZSBjaGlsZHJlbi10YWJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0Q2hpbGRyZW5CdXR0b25cIikuY2xpY2soKVxufVxuXG5mdW5jdGlvbiB0b2dnbGVNb3JlT3B0aW9ucygpe1xuICAgIC8vIGNvbnNvbGUubG9nKFwiVE9HR0xFIE1PUkUgT1BUSU9OU1wiKVxuICAgIGxldCBidXR0b25Cb3VuZGluZ1JlY3QgPSBwcm9qZWN0TW9yZU9wdGlvbnNCdXR0b24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgbGV0IGJ0bkxlZnQgPSBidXR0b25Cb3VuZGluZ1JlY3QubGVmdDtcbiAgICBsZXQgYnRuQm90dG9tID0gYnV0dG9uQm91bmRpbmdSZWN0LmJvdHRvbTtcbiAgICBcbiAgICBsZXQgbW9yZU9wdGlvbnNDb250ZXh0TWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX21vcmVQcm9qZWN0T3B0aW9uc0NvbnRleHRNZW51XCIpO1xuICAgIG1vcmVPcHRpb25zQ29udGV4dE1lbnUuc3R5bGUubGVmdCA9IGJ0bkxlZnQgKyBcInB4XCI7XG4gICAgbW9yZU9wdGlvbnNDb250ZXh0TWVudS5zdHlsZS50b3AgPSBidG5Cb3R0b20gKyA1ICsgXCJweFwiO1xuXG4gICAgbW9yZU9wdGlvbnNDb250ZXh0TWVudS5jbGFzc0xpc3QuY29udGFpbnMoXCJhZ2VfZGlzcGxheU5vbmVcIikgPyBtb3JlT3B0aW9uc0NvbnRleHRNZW51LmNsYXNzTGlzdC5yZW1vdmUoXCJhZ2VfZGlzcGxheU5vbmVcIikgOiBtb3JlT3B0aW9uc0NvbnRleHRNZW51LmNsYXNzTGlzdC5hZGQoXCJhZ2VfZGlzcGxheU5vbmVcIik7XG59XG5cblxuXG5mdW5jdGlvbiBzZWFyY2hQcm9qZWN0SW4oKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJzZWFyY2hQcm9qZWN0SW4oKVwiKVxuICAgIC8vIGZvY3VzUHJvamVjdFNlYXJjaCA9IHRydWU7XG4gICAgLy8gZXh0ZW5zaW9uU3RhdGVGcm9udC5wcm9qZWN0U2VhcmNoQWN0aXZlID0gdHJ1ZTtcbiAgICAvL3dyaXRlU3RhdGVGcm9tRnJvbnQoKTtcbiAgICAvLyBjb25zb2xlLmxvZygncHJvamVjdFNlYXJjaEVsZW1lbnQudGV4dENvbnRlbnQgPSAnLCBwcm9qZWN0U2VhcmNoRWxlbWVudC50ZXh0Q29udGVudCk7XG4gICAgXG4gICAgLy8gRW1wdHkgc2VhcmNoIGNvbnRhaW5lciBpZiBubyBwcmV2aW91cyBzZWFyY2ggc3RyaW5nIGV4aXN0c1xuICAgIGlmICghc2VhcmNoU3RyaW5nRXhpc3RzKSB7XG4gICAgICAgIHByb2plY3RTZWFyY2hFbGVtZW50LmlubmVySFRNTCA9ICc8ZGl2Pjxicj48L2Rpdj4nOyAvLyBkZWZhdWx0IGNvbnRlbnQgb24gJ2NvbnRlbnRlZGl0YWJsZScgZWxlbWVudHMgXG4gICAgICAgIC8vIHNldEludGVydmFsKCgpID0+IHsgc2VhcmNoSW5wdXQuaW5uZXJIVE1MICs9ICc8YnI+JyB9LCA1MCk7XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKCdmb2N1cyBzZWFyY2ggJylcbiAgICAvLyBwcm9qZWN0U2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCBrZXlQcmVzc0R1cmluZ1NlYXJjaClcbiAgICBwcm9qZWN0U2VhcmNoRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5RG93bkR1cmluZ1NlYXJjaClcbiAgICAvLyBrZXlEb3duRHVyaW5nU2VhcmNoKCk7XG59XG5cblxuZnVuY3Rpb24gc2VhcmNoUHJvamVjdE91dCgpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnc2VhcmNoUHJvamVjdE91dCgpJyk7XG4gICAgXG4gICAgbGV0IHNlYXJjaFN0cmluZ0xlbmd0aCA9IHByb2plY3RTZWFyY2hFbGVtZW50LnRleHRDb250ZW50Lmxlbmd0aDtcbiAgICBpZihzZWFyY2hTdHJpbmdMZW5ndGggPT09IDApe1xuICAgICAgICBzZWFyY2hTdHJpbmdFeGlzdHMgPSBmYWxzZTtcbiAgICAgICAgcHJvamVjdFNlYXJjaEVsZW1lbnQuaW5uZXJIVE1MID0gJzxkaXY+USAgOiAgU2VhcmNoIC4gLiAuPGJyPjwvZGl2Pic7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHNlYXJjaFN0cmluZ0V4aXN0cyA9IHRydWU7XG4gICAgfVxuICAgIHByb2plY3RTZWFyY2hFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlEb3duRHVyaW5nU2VhcmNoKVxufVxuXG5cbi8vIFBlcmZvcm0gc2VhcmNoIHdpdGggc2xpZ2h0IGRlbGF5IHRvIG1ha2Ugc3VyZSBuZXcgaW5wdXQgaXMgd3JpdHRlbiB0byBjb250ZW50RWRpdGFubGUgaW5wdXRcbmFzeW5jIGZ1bmN0aW9uIGtleURvd25EdXJpbmdTZWFyY2goZXZlbnQgOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgXG4gICAgLy8gVXNlciBqdXN0IGRlbGV0ZWQgdGhlIGxhc3QgY2hhcmFjdGVyIHNvIHdlIHJlc2V0IHRoZSBkZWZhdWx0IGNvbnRlbnRlZGl0YWJsZSBlbG1lbnQgc3RydWN0dXJlXG4gICAgLy8gaWYgd2UgY29uJ3QgZG8gdGhpcyB0aGUgdXNlciB3aWxsIGluYWR2ZXJ0aWVkbHkgcmVtb3ZlIHRoZSBjb250YWluaW5nIDxkaXY+LCBicmVha2luZyB0aGUgdHlwaW5nLWJlaGF2aW91ciFcbiAgICBpZiAoZXZlbnQua2V5ID09PSBcIkJhY2tzcGFjZVwiICYmIHByb2plY3RTZWFyY2hFbGVtZW50LnRleHRDb250ZW50Lmxlbmd0aCA9PT0gMSl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdMYXN0IGNoYXJhY3RlciBkZWxldGlvbiBwcm90ZWN0aW9uIScpO1xuICAgICAgICBwcm9qZWN0U2VhcmNoRWxlbWVudC5pbm5lckhUTUwgPSAnPGRpdj48YnI+PC9kaXY+JzsgLy8gZGVmYXVsdCBjb250ZW50IG9uICdjb250ZW50ZWRpdGFibGUnIGVsZW1lbnRzIFxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBcbiAgICAvLyBUaGlzIGRvZXMgbm90IHByZXZlbnQgYSByZXF1ZXN0IG9uIGVhY2gga2V5c3Ryb2tlXG4gICAgLy8gQlVUIGl0IGVuYWJsZXMgcmVhZGluZyB0aGUgY2hhbmdlIG9mIGVhY2gga2V5c3Ryb2tlLiBXaGVuIHRoaXMgbWV0aG9kIGlzIGNhbGxlZCB0aGUgdGV4dENvbnRlbnQgb2YgdGhlIHNlcmFjaCBib3ggaGFzIG5vdCBiZWVuIHVwZGF0ZWQhIVxuICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuXG4gICAgICAgIHBlcmZvcm1TZWFyY2goKTtcblxuICAgIH0sIDEwMCk7XG5cbn1cblxuZnVuY3Rpb24gcGVyZm9ybVNlYXJjaCgpe1xuICAgIGxldCBzZWFyY2hTdHJpbmcgOiBzdHJpbmcgPSBcIlwiO1xuICAgIGlmKHNlYXJjaFN0cmluZ0V4aXN0cylcbiAgICAgICAgc2VhcmNoU3RyaW5nID0gcHJvamVjdFNlYXJjaEVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgZWxzZVxuICAgICAgICBzZWFyY2hTdHJpbmcgPSBcIlwiO1xuXG4gICAgZmV0Y2hQcm9qZWN0U2VhcmNoKHNlYXJjaFN0cmluZylcbiAgICAgICAgLnRoZW4oKGNvbnRlbnRPYmplY3RBcnJheSkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY29udGVudE9iamVjdEFycmF5KVxuICAgICAgICAgICAgZG9tLnBvcHVsYXRlUHJvamVjdFNlYXJjaFRhYmxlKHByb2plY3RTZWFyY2hUYWJsZSwgY29udGVudE9iamVjdEFycmF5KTtcbiAgICAgICAgfSlcbn1cblxuXG5mdW5jdGlvbiBzaG93UHJvamVjdFRhYmxlKGJ1dHRvbklkIDogc3RyaW5nKXtcbiAgICAvLyBhZ2VfcHJvamVjdEJ1dHRvbk9uXG5cbiAgICAvLyBTZWFyY2ggYm94XG4gICAgbGV0IHNlYXJjaEJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3Byb2plY3RTZWFyY2hJbnB1dFwiKTtcbiAgICBzZWFyY2hCb3guY2xhc3NMaXN0LmFkZChcImFnZV9kaXNwbGF5Tm9uZVwiKTtcblxuICAgIC8vIFJlc2V0IHRoZSBidXR0b25zXG4gICAgbGV0IHNlYXJjaEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3Byb2plY3RTZWFyY2hCdXR0b25cIilcbiAgICBsZXQgY2hpbGRyZW5CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0Q2hpbGRyZW5CdXR0b25cIilcbiAgICBsZXQgcHJvcGVydGllc0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3Byb2plY3RQcm9wZXJ0aWVzQnV0dG9uXCIpXG4gICAgc2VhcmNoQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhZ2VfcHJvamVjdEJ1dHRvbk9uXCIpO1xuICAgIGNoaWxkcmVuQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhZ2VfcHJvamVjdEJ1dHRvbk9uXCIpO1xuICAgIHByb3BlcnRpZXNCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFnZV9wcm9qZWN0QnV0dG9uT25cIik7XG5cbiAgICAvLyBSZXNldCB0aGUgVGFibGVzXG4gICAgbGV0IHNlYXJjaFRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdFNlYXJjaFRhYmxlXCIpO1xuICAgIGxldCBjaGlsZHJlblRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdENoaWxkcmVuVGFibGVcIik7XG4gICAgbGV0IHByb3BlcnRpZXNUYWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3Byb2plY3RQcm9wZXJ0aWVzVGFibGVcIik7XG4gICAgc2VhcmNoVGFibGUuY2xhc3NMaXN0LmFkZChcImFnZV9kaXNwbGF5Tm9uZVwiKTtcbiAgICBjaGlsZHJlblRhYmxlLmNsYXNzTGlzdC5hZGQoXCJhZ2VfZGlzcGxheU5vbmVcIik7XG4gICAgcHJvcGVydGllc1RhYmxlLmNsYXNzTGlzdC5hZGQoXCJhZ2VfZGlzcGxheU5vbmVcIik7XG5cbiAgICAvLyBBY3RpdmUgdGhlIGNvcnJlY3Qgb25lXG4gICAgaWYgKGJ1dHRvbklkID09PSBcImFnZV9wcm9qZWN0U2VhcmNoQnV0dG9uXCIpe1xuICAgICAgICBzZWFyY2hUYWJsZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWdlX2Rpc3BsYXlOb25lXCIpO1xuICAgICAgICBzZWFyY2hCdXR0b24uY2xhc3NMaXN0LmFkZChcImFnZV9wcm9qZWN0QnV0dG9uT25cIik7XG4gICAgICAgIHNlYXJjaEJveC5jbGFzc0xpc3QucmVtb3ZlKFwiYWdlX2Rpc3BsYXlOb25lXCIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChidXR0b25JZCA9PT0gXCJhZ2VfcHJvamVjdENoaWxkcmVuQnV0dG9uXCIpe1xuICAgICAgICBjaGlsZHJlblRhYmxlLmNsYXNzTGlzdC5yZW1vdmUoXCJhZ2VfZGlzcGxheU5vbmVcIik7XG4gICAgICAgIGNoaWxkcmVuQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJhZ2VfcHJvamVjdEJ1dHRvbk9uXCIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChidXR0b25JZCA9PT0gXCJhZ2VfcHJvamVjdFByb3BlcnRpZXNCdXR0b25cIil7XG4gICAgICAgIHByb3BlcnRpZXNUYWJsZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWdlX2Rpc3BsYXlOb25lXCIpO1xuICAgICAgICBwcm9wZXJ0aWVzQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJhZ2VfcHJvamVjdEJ1dHRvbk9uXCIpO1xuICAgIH1cbiAgICBcbn1cblxuLy8gZnVuY3Rpb24gcHJvamVjdFRpdGxlQ2xpY2tlZCh0YWJsZVJvdzogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbi8vICAgICBjb25zb2xlLmxvZyhcIlByb2plY3QgdGl0bGUgY2xpY2tlZDogXCIsIHRhYmxlUm93KVxuLy8gfVxuLy8gZnVuY3Rpb24gcHJvamVjdFNlYXJjaEJ1dHRvbkNsaWNrZWQodGFibGVSb3c6IEhUTUxFbGVtZW50KSA6IHZvaWQge1xuLy8gICAgIGNvbnNvbGUubG9nKFwiUHJvamVjdCBzZWFyY2ggY2xpY2tlZDogXCIsIHRhYmxlUm93KVxuLy8gfVxuLy8gZnVuY3Rpb24gcHJvamVjdENoaWxkcmVuQnV0dG9uQ2xpY2tlZCh0YWJsZVJvdzogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbi8vICAgICBjb25zb2xlLmxvZyhcIlByb2plY3QgY2hpbGRyZW4gY2xpY2tlZDogXCIsIHRhYmxlUm93KVxuLy8gfVxuLy8gZnVuY3Rpb24gcHJvamVjdFByb3BlcnRpZXNCdXR0b25DbGlja2VkKHRhYmxlUm93OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuLy8gICAgIGNvbnNvbGUubG9nKFwiUHJvamVjdCBwcm9wZXJ0aWVzIGNsaWNrZWQ6IFwiLCB0YWJsZVJvdylcbi8vIH1cbi8vIGZ1bmN0aW9uIHByb2plY3RNb3JlT3B0aW9uc0J1dHRvbkNsaWNrZWQodGFibGVSb3c6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4vLyAgICAgY29uc29sZS5sb2coXCJQcm9qZWN0IG9wdGlvbnMgY2xpY2tlZDogXCIsIHRhYmxlUm93KVxuLy8gfVxuLy8gZnVuY3Rpb24gcHJvamVjdFNlYXJjaFJvd0NsaWNrZWQodGFibGVSb3c6IEhUTUxQcm9qZWN0VGFibGVSb3cpOiB2b2lkIHtcbi8vICAgICBjb25zb2xlLmxvZyhcIlRhYmxlIHJvdyBjbGlja2VkOiBcIiwgdGFibGVSb3cpXG4vLyB9XG5cblxuZnVuY3Rpb24gZmV0Y2hQcm9qZWN0U2VhcmNoKHNlYXJjaFN0cmluZyA6IHN0cmluZykgOiBQcm9taXNlPGFueT57XG4gICAgcmV0dXJuIGFnZV9kYmlzLkNvbnRlbnRfU2VsZWN0T25UaXRsZUxpa2VTdHJpbmcoc2VhcmNoU3RyaW5nLCBcIjUwXCIsIFwiUHJvamVjdFwiLCBcIlwiLCBcIlwiKVxuICAgICAgICAudGhlbigoY29udGVudE9iamVjdEFycmF5OiBhbnkpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNvbnRlbnRPYmplY3RBcnJheSk7XG4gICAgICAgICAgICBwcm9qZWN0U2VhcmNoT2JqZWN0cyA9IGNvbnRlbnRPYmplY3RBcnJheTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY29udGVudE9iamVjdEFycmF5KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvciA6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtcbiAgICAgICAgfSlcbn1cblxuZnVuY3Rpb24gZmV0Y2hQcm9qZWN0Q2hpbGRyZW4oVXVpZCA6IHN0cmluZyB8IG51bWJlcik6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIGFnZV9kYmlzLkNvbnRlbnRFZGdlX1NlbGVjdENoaWxkT2ZVdWlkKFV1aWQpXG4gICAgICAgIC50aGVuKChjb250ZW50RWRnZU9iamVjdEFycmF5OiBhbnkpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNvbnRlbnRPYmplY3RBcnJheSk7XG4gICAgICAgICAgICBwcm9qZWN0Q29udGVudEVkZ2VDaGlsZHJlbiA9IGNvbnRlbnRFZGdlT2JqZWN0QXJyYXk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncHJvamVjdENvbnRlbnRFZGdlQ2hpbGRyZW4gPSAnLCBwcm9qZWN0Q29udGVudEVkZ2VDaGlsZHJlbik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocHJvamVjdENvbnRlbnRFZGdlQ2hpbGRyZW4pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XG4gICAgICAgIH0pXG59XG5cbmZ1bmN0aW9uIGFwcGVuZENzcygpIDogdm9pZHtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZChwcm9qZWN0Q3NzKTtcbn1cblxuXG5mdW5jdGlvbiByZW1vdmVDc3MoKSA6IHZvaWQge1xuICAgIHByb2plY3RDc3MucmVtb3ZlKCk7XG59XG5cblxuXG5cbmV4cG9ydCB7XG4gICAgaW5pdFByb2plY3RzLFxuICAgIGFwcGVuZENzcyxcbiAgICByZW1vdmVDc3MsXG59IiwiaW1wb3J0ICogYXMgZmV0Y2hlciBmcm9tIFwiLi4vZmV0Y2hlclwiO1xuaW1wb3J0IHsgSFRNTFByb2plY3RUYWJsZVJvdywgSFRNTFRhYmxlQ29udGVudE9iamVjdCB9IGZyb20gXCIuL3NvdXJjZV9kb21cIjtcbmltcG9ydCB7IGFnZV9kYmlzIH0gZnJvbSBcIi4uL2RiaS1zZW5kXCI7XG5cblxuXG5sZXQgc2lkZVBhbmVsOiBFbGVtZW50O1xuXG5sZXQgc291cmNlVGl0bGVFbGVtZW50IDogSFRNTEVsZW1lbnQ7XG5cbmxldCBzb3VyY2VDb250YWluZXI6IEVsZW1lbnQ7XG5sZXQgc291cmNlQ3NzOiBIVE1MRWxlbWVudDtcblxubGV0IHNvdXJjZUNoaWxkcmVuVGFibGU6IEhUTUxUYWJsZUVsZW1lbnQ7XG5sZXQgcHJvamVjdENvbnRlbnRFZGdlQ2hpbGRyZW46IGFueTtcblxubGV0IHNvdXJjZVByb3BlcnRpZXNUYWJsZTogSFRNTFRhYmxlQ29udGVudE9iamVjdDtcblxuIFxubGV0IGN1cnJlbnRTb3VyY2VPYmplY3Q6IGFueTtcbmxldCBjdXJyZW50U291cmNlVXVpZDogYW55OyBcbmV4cG9ydCBmdW5jdGlvbiBnZXRDdXJyZW50U291cmNlT2JqZWN0KCk6IGFueSB7IHJldHVybiBzb3VyY2VQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdH07XG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFNvdXJjZVV1aWQoKTogYW55IHsgcmV0dXJuIGN1cnJlbnRTb3VyY2VVdWlkIH07XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRTb3VyY2VDb250YWluZXIoX3NpZGVQYW5lbDogRWxlbWVudCwgX3NvdXJjZU1vcmVPcHRpb25zQ29udGV4dE1lbnU6IEhUTUxEaXZFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ2luaXRTb3VyY2VDb250YWluZXIoLi4uKScpO1xuXG4gICAgc2lkZVBhbmVsID0gX3NpZGVQYW5lbDtcblxuICAgIHNvdXJjZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHNvdXJjZUNvbnRhaW5lci5pZCA9IFwiYWdlX3NvdXJjZUNvbnRhaW5lclwiO1xuICAgIHNvdXJjZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYWdlX3BhbmVsQ29udGFpbmVyXCIpO1xuICAgIHNvdXJjZUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xpY2tlZFNvdXJjZUNvbnRhaW5lcik7XG4gICAgLy8gc291cmNlQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCBzb3VyY2VQcm9wZXJ0eUZvY3VzZWRPdXQpO1xuICAgIHNvdXJjZUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgc291cmNlRm9jdXNPdXQpO1xuICAgIFxuXG4gICAgZmV0Y2hlci5mZXRjaEh0bWwoXCJzb3VyY2UuaHRtbFwiKVxuICAgICAgICAudGhlbihodG1sID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiSFRNTCA6IFwiLCBodG1sKVxuICAgICAgICAgICAgc291cmNlQ29udGFpbmVyLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgICAgICBzb3VyY2VUaXRsZUVsZW1lbnQgPSBzb3VyY2VDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2Vfc291cmNlVGl0bGVcIik7XG4gICAgICAgICAgICBzb3VyY2VDaGlsZHJlblRhYmxlID0gc291cmNlQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX3NvdXJjZUNoaWxkVGFibGVcIik7XG4gICAgICAgICAgICBzb3VyY2VQcm9wZXJ0aWVzVGFibGUgPSBzb3VyY2VDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2Vfc291cmNlUHJvcGVydGllc1RhYmxlXCIpO1xuICAgICAgICB9KVxuXG4gICAgc291cmNlQ3NzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgIHNvdXJjZUNzcy5pZCA9IFwiYWdlX3NvdXJjZVN0eWxlXCI7XG4gICAgZmV0Y2hlci5mZXRjaENzcyhcInNvdXJjZS5jc3NcIilcbiAgICAgICAgLnRoZW4oY3NzID0+IHtcbiAgICAgICAgICAgIHNvdXJjZUNzcy5pbm5lclRleHQgPSBjc3M7XG4gICAgICAgIH0pXG5cblxuICAgIHNpZGVQYW5lbC5hcHBlbmQoc291cmNlQ29udGFpbmVyKTtcblxufVxuXG5mdW5jdGlvbiBzb3VyY2VGb2N1c091dChldmVudCA6IEZvY3VzRXZlbnQpe1xuICAgIGxldCBmb2N1c291dFRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICBpZiAoZm9jdXNvdXRUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWdlX3NvdXJjZUNoaWxkVGFibGUtVGl0bGVcIikpe1xuICAgICAgICBzb3VyY2VDaGlsZFRpdGxlRm9jdXNlZE91dChmb2N1c291dFRhcmdldCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGZvY3Vzb3V0VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImFnZV9zb3VyY2VQcm9wVmFsdWVcIikpe1xuICAgICAgICBzb3VyY2VQcm9wZXJ0eUZvY3VzZWRPdXQoZm9jdXNvdXRUYXJnZXQpO1xuICAgIH1cblxuICAgIC8vIHN3aXRjaCAoZm9jdXNvdXRUYXJnZXQuaWQpIHtcbiAgICAvLyAgICAgY2FzZSBcImFlLXNvdXJjZUNoaWxkVGFibGUtVGl0bGVcIjpcbiAgICAvLyAgICAgICAgIHNvdXJjZUNoaWxkVGl0bGVGb2N1c2VkT3V0KGZvY3Vzb3V0VGFyZ2V0KTtcbiAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgIC8vICAgICAvLyBhZ2Vfc291cmNlUHJvcFRhYmxlXG4gICAgLy8gICAgIGNhc2UgXCJhZ2Vfc291cmNlUHJvcFRhYmxlLVRpdGxlLXZhbHVlXCI6XG4gICAgLy8gICAgIGNhc2UgXCJhZ2Vfc291cmNlUHJvcFRhYmxlLVR5cGUtdmFsdWVcIjpcbiAgICAvLyAgICAgY2FzZSBcImFnZV9zb3VyY2VQcm9wVGFibGUtVXVpZC12YWx1ZVwiOlxuICAgIC8vICAgICBjYXNlIFwiYWdlX3NvdXJjZVByb3BUYWJsZS1JQW1Tb3VyY2UtdmFsdWVcIjpcbiAgICAvLyAgICAgICAgIHNvdXJjZVByb3BlcnR5Rm9jdXNlZE91dChmb2N1c291dFRhcmdldCk7XG4gICAgLy8gICAgICAgICBicmVhaztcbiAgICAvLyAgICAgZGVmYXVsdDpcbiAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgIC8vIH1cbn1cblxuZnVuY3Rpb24gc291cmNlQ2hpbGRUaXRsZUZvY3VzZWRPdXQoZGF0YUVsZW1lbnQgOiBIVE1MRWxlbWVudCkge1xuICAgIGxldCBzb3VyY2VDaGlsZFJvdyA9IGRhdGFFbGVtZW50LnBhcmVudEVsZW1lbnQgYXMgSFRNTFByb2plY3RUYWJsZVJvdztcbiAgICAvLyBjb25zb2xlLmxvZygnRk9DVVMgT1VUIFNPVVJDRSBDSElMRCcpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiZXZlbnQudGFyZ2V0ID0gXCIsIGV2ZW50LnRhcmdldCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJ0aGlzID0gXCIsIHRoaXMpO1xuXG4gICAgLy8gY29uc29sZS5sb2coJ2RhdGFFbGVtZW50LnRleHRDb250ZW50ID0gJywgZGF0YUVsZW1lbnQudGV4dENvbnRlbnQpO1xuICAgIC8vIGNvbnNvbGUubG9nKCdzb3VyY2VDaGlsZFJvdy5ub2RlT2JqZWN0LmNvbnRlbnQuVGl0bGUgPSAnLCBzb3VyY2VDaGlsZFJvdy5ub2RlT2JqZWN0LmNvbnRlbnQuVGl0bGUpO1xuICAgIFxuICAgIHNvdXJjZUNoaWxkUm93Lm5vZGVPYmplY3QuY29udGVudC5UaXRsZSA9IGRhdGFFbGVtZW50LnRleHRDb250ZW50O1xuXG4gICAgYWdlX2RiaXMuQ29udGVudF9VcGRhdGVXaXRoQ29udGVudE9iamVjdChzb3VyY2VDaGlsZFJvdy5ub2RlT2JqZWN0LmNvbnRlbnQpXG4gICAgICAgIC50aGVuKHVwZGF0ZWRDb250ZW50T2JqZWN0ID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVXBkYXRlZCBzb3VyY2UgY2hpbGQtcm93IDogXCIsIHVwZGF0ZWRDb250ZW50T2JqZWN0KVxuICAgICAgICB9KVxuICAgIC8vIC8vIGxldCBwcm9qZWN0Q29udGVudE9iamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3Byb2plY3RQcm9wZXJ0aWVzVGFibGVcIikgYXMgSFRNTFRhYmxlQ29udGVudE9iamVjdDtcblxuICAgIC8vIGNvbnNvbGUubG9nKFwic291cmNlQ29udGVudE9iamVjdC5jb250ZW50T2JqZWN0ID0gXCIsIHNvdXJjZVByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0KTtcblxufVxuXG5cbmZ1bmN0aW9uIHNvdXJjZVByb3BlcnR5Rm9jdXNlZE91dChmb2N1c291dEVsZW1lbnQ6IEhUTUxFbGVtZW50KXtcbiAgICAvLyBjb25zb2xlLmxvZygnRk9DVVMgT1VUIFBST0pFQ1QgUFJPUEVSVFknKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcImV2ZW50LnRhcmdldCA9IFwiLCBldmVudC50YXJnZXQpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwidGhpcyA9IFwiLCB0aGlzKTtcblxuICAgIC8vIGxldCBkYXRhRWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAvLyBjb25zb2xlLmxvZygnZGF0YUVsZW1lbnQudGV4dENvbnRlbnQgPSAnLCBmb2N1c291dEVsZW1lbnQudGV4dENvbnRlbnQpO1xuICAgIFxuICAgIC8vIGxldCBwcm9qZWN0VGFibGU6IEhUTUxUYWJsZUNvbnRlbnRPYmplY3QgPSB0aGlzO1xuXG5cbiAgICAvLyBjb25zb2xlLmxvZygnJywgZXZlbnQudGFyZ2V0LilcbiAgICBzd2l0Y2ggKGZvY3Vzb3V0RWxlbWVudC5pZCkge1xuICAgICAgICAvLyBUWVBFXG4gICAgICAgIGNhc2UgXCJhZ2Vfc291cmNlUHJvcFRhYmxlLVR5cGUtdmFsdWVcIjpcbiAgICAgICAgICAgIHNvdXJjZVByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0LlR5cGUgPSBmb2N1c291dEVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgLy8gVElUTEVcbiAgICAgICAgY2FzZSBcImFnZV9zb3VyY2VQcm9wVGFibGUtVGl0bGUtdmFsdWVcIjpcbiAgICAgICAgICAgIHNvdXJjZVByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0LlRpdGxlID0gZm9jdXNvdXRFbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICAgICAgc291cmNlVGl0bGVFbGVtZW50LnRleHRDb250ZW50ID0gZm9jdXNvdXRFbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIEdPQUxcbiAgICAgICAgY2FzZSBcImFnZV9zb3VyY2VQcm9wVGFibGUtVXJsLXZhbHVlXCI6XG4gICAgICAgICAgICBzb3VyY2VQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdC5VcmwgPSBmb2N1c291dEVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgYWdlX2RiaXMuQ29udGVudF9VcGRhdGVXaXRoQ29udGVudE9iamVjdChzb3VyY2VQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdClcbiAgICAgICAgLnRoZW4odXBkYXRlZENvbnRlbnRPYmplY3QgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChmb2N1c291dEVsZW1lbnQuaWQpIHtcbiAgICAgICAgICAgICAgICAvLyBUWVBFXG4gICAgICAgICAgICAgICAgY2FzZSBcImFnZV9zb3VyY2VQcm9wVGFibGUtVHlwZS12YWx1ZVwiOlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmFzc2VydCh1cGRhdGVkQ29udGVudE9iamVjdC5UeXBlID09IHNvdXJjZVByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0LlR5cGUsIFwiJ1BVVCcgY29udGVudCBPYmplY3QgVHlwZSBkb2VzIG5vdCBtYXRjaCB0aGUgcHJvamVjdCB0YWJsZSAuY29udGVudE9iamVjdC5UeXBlICFcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIC8vIFRJVExFXG4gICAgICAgICAgICAgICAgY2FzZSBcImFnZV9zb3VyY2VQcm9wVGFibGUtVGl0bGUtdmFsdWVcIjpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5hc3NlcnQodXBkYXRlZENvbnRlbnRPYmplY3QuVGl0bGUgPT0gc291cmNlUHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QuVGl0bGUsIFwiJ1BVVCcgY29udGVudCBPYmplY3QgVGl0bGUgZG9lcyBub3QgbWF0Y2ggdGhlIHByb2plY3QgdGFibGUgLmNvbnRlbnRPYmplY3QuVGl0bGUgIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgLy8gR09BTFxuICAgICAgICAgICAgICAgIGNhc2UgXCJhZ2Vfc291cmNlUHJvcFRhYmxlLVVybC12YWx1ZVwiOlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmFzc2VydCh1cGRhdGVkQ29udGVudE9iamVjdC5VcmwgPT0gc291cmNlUHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QuVXJsLCBcIidQVVQnIGNvbnRlbnQgT2JqZWN0IEdvYWwgZG9lcyBub3QgbWF0Y2ggdGhlIHByb2plY3QgdGFibGUgLmNvbnRlbnRPYmplY3QuR29hbCAhXCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfSlcbiAgICAvLyBsZXQgcHJvamVjdENvbnRlbnRPYmplY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0UHJvcGVydGllc1RhYmxlXCIpIGFzIEhUTUxUYWJsZUNvbnRlbnRPYmplY3Q7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhcInNvdXJjZUNvbnRlbnRPYmplY3QuY29udGVudE9iamVjdCA9IFwiLCBzb3VyY2VQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdCk7XG5cbn1cblxuZnVuY3Rpb24gY2xpY2tlZFNvdXJjZUNvbnRhaW5lcihldmVudCA6IE1vdXNlRXZlbnQpe1xuICAgIGxldCBldmVudFRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcblxuICAgIHN3aXRjaCAoZXZlbnRUYXJnZXQuaWQpIHtcbiAgICAgICAgY2FzZSBcImFnZV9zb3VyY2VTZWFyY2hCdXR0b25cIjpcbiAgICAgICAgY2FzZSBcImFnZV9zb3VyY2VQcm9wZXJ0aWVzQnV0dG9uXCI6XG4gICAgICAgICAgICB0b2dnbGVTb3VyY2VUYWJsZXMoZXZlbnRUYXJnZXQuaWQpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcImFnZV9zb3VyY2VOZXdCdXR0b25cIjpcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdOZXcgc291cmNlIGJ1dHRvbiBjbGlja2VkJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIFxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIHRvZ2dsZVNvdXJjZVRhYmxlcyhidXR0b25JRCA6IHN0cmluZyl7XG4gICAgbGV0IGNoaWxkcmVuQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2Vfc291cmNlU2VhcmNoQnV0dG9uXCIpO1xuICAgIGxldCBwcm9wZXJ0aWVzQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2Vfc291cmNlUHJvcGVydGllc0J1dHRvblwiKTtcblxuICAgIHNvdXJjZUNoaWxkcmVuVGFibGUuY2xhc3NMaXN0LmFkZChcImFnZV9kaXNwbGF5Tm9uZVwiKTtcbiAgICBzb3VyY2VQcm9wZXJ0aWVzVGFibGUuY2xhc3NMaXN0LmFkZChcImFnZV9kaXNwbGF5Tm9uZVwiKTtcbiAgICBjaGlsZHJlbkJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWdlX3NvdXJjZUJ1dHRvbk9uXCIpO1xuICAgIHByb3BlcnRpZXNCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFnZV9zb3VyY2VCdXR0b25PblwiKTtcbiAgICBcbiAgICBpZiAoYnV0dG9uSUQgPT0gXCJhZ2Vfc291cmNlU2VhcmNoQnV0dG9uXCIpe1xuICAgICAgICBzb3VyY2VDaGlsZHJlblRhYmxlLmNsYXNzTGlzdC5yZW1vdmUoXCJhZ2VfZGlzcGxheU5vbmVcIik7XG4gICAgICAgIGNoaWxkcmVuQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJhZ2Vfc291cmNlQnV0dG9uT25cIik7XG4gICAgfVxuICAgIGVsc2UgaWYgKGJ1dHRvbklEID09IFwiYWdlX3NvdXJjZVByb3BlcnRpZXNCdXR0b25cIikge1xuICAgICAgICBzb3VyY2VQcm9wZXJ0aWVzVGFibGUuY2xhc3NMaXN0LnJlbW92ZShcImFnZV9kaXNwbGF5Tm9uZVwiKTtcbiAgICAgICAgcHJvcGVydGllc0J1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWdlX3NvdXJjZUJ1dHRvbk9uXCIpO1xuICAgIH1cblxufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkV2l0aENvbnRlbnRPYmplY3QoX2NvbnRlbnRPYmplY3QgOiBhbnkpe1xuICAgIGNvbnNvbGUubG9nKCdsb2FkaW5nIFNvdXJjZSBwYW5lbCB3aXRoICcsIF9jb250ZW50T2JqZWN0KTtcblxuICAgIGN1cnJlbnRTb3VyY2VPYmplY3QgPSBfY29udGVudE9iamVjdDtcblxuICAgIC8vIGxldCBzb3VyY2VPYmplY3QgPSBleHRlbnNpb25TdGF0ZUZyb250LmN1cnJlbnRfc291cmNlT2JqZWN0O1xuICAgIC8vIGV4dGVuc2lvblN0YXRlRnJvbnQuY3VycmVudF9zb3VyY2VVdWlkID0gc291cmNlT2JqZWN0LlV1aWQ7XG4gICAgc291cmNlUHJvcGVydGllc1RhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCBzb3VyY2VQcm9wZXJ0eUZvY3VzT3V0KVxuICAgIHNvdXJjZVByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0ID0gX2NvbnRlbnRPYmplY3Q7XG4gXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FnZV9zb3VyY2VUaXRsZScpLnRleHRDb250ZW50ID0gX2NvbnRlbnRPYmplY3QuVGl0bGU7XG5cbiAgICBsZXQgdGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdlX3NvdXJjZVByb3BlcnRpZXNUYWJsZS10Ym9keScpO1xuICAgIHRib2R5LmlubmVySFRNTCA9ICcnO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gX2NvbnRlbnRPYmplY3QpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYCR7a2V5fTogJHtzb3VyY2VPYmplY3Rba2V5XX1gKTtcbiAgICAgICAgaWYgKGtleSA9PT0gJ1R5cGUnIHx8IGtleSA9PT0gJ1RpdGxlJyB8fCBrZXkgPT09ICdVcmwnIHx8IGtleSA9PT0gJ0lBbVNvdXJjZScpIHtcblxuICAgICAgICAgICAgdGJvZHkuaW5uZXJIVE1MICs9IGBcblx0XHRcblx0XHRcdDx0cj5cblx0XHRcdFx0PHRkIGlkPWFnZV9zb3VyY2VQcm9wVGFibGUtJHtrZXl9LWtleSBjbGFzcz1cImFnZV9lbGVtZW50XCIgPiR7a2V5fTwvdGQ+XG5cdFx0XHRcdDx0ZCBpZD1hZ2Vfc291cmNlUHJvcFRhYmxlLSR7a2V5fS12YWx1ZSBjbGFzcz1cImFnZV9zb3VyY2VQcm9wVmFsdWUgYWdlX2VsZW1lbnRcIiBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCIgPiR7X2NvbnRlbnRPYmplY3Rba2V5XX08L3RkPlxuXHRcdFx0PC90cj5cblx0XHRcblx0XHRgO1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0Ym9keS5pbm5lckhUTUwgKz0gYFxuXHRcdFxuXHRcdFx0PHRyPlxuXHRcdFx0XHQ8dGQgaWQ9YWdlX3NvdXJjZVByb3BUYWJsZS0ke2tleX0ta2V5IGNsYXNzPVwiYWdlX2VsZW1lbnRcIiA+JHtrZXl9PC90ZD5cblx0XHRcdFx0PHRkIGlkPWFnZV9zb3VyY2VQcm9wVGFibGUtJHtrZXl9LXZhbHVlIGNsYXNzPVwiYWdlX3NvdXJjZVByb3BWYWx1ZSBhZ2VfZWxlbWVudFwiPiR7X2NvbnRlbnRPYmplY3Rba2V5XX08L3RkPlxuXHRcdFx0PC90cj5cblx0XHRcblx0XHRgO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvLyAvLyBjb25zb2xlLmxvZyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjYWdlX3NvdXJjZVByb3BlcnRpZXNUYWJsZSB0Ym9keSB0cicpKVxuICAgIC8vIGxldCBlZGl0YWJsZVNvdXJjZVByb3BlcnR5VGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFnZV9lZGl0YWJsZVNvdXJjZVByb3BlcnR5Jyk7XG4gICAgLy8gLy8gLy8gY29uc29sZS5sb2coZWRpdGFibGVTb3VyY2VQcm9wZXJ0eVRkKVxuICAgIC8vIGZvciAobGV0IGVkaXRhYmxlU291cmNlUHJvcGVydHlUZCBvZiBlZGl0YWJsZVNvdXJjZVByb3BlcnR5VGRzKSB7XG4gICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKGVkaXRhYmxlU291cmNlUHJvcGVydHlUZC50ZXh0Q29udGVudCk7XG4gICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKHByb3BlcnR5Um93LnRleHRDb250ZW50Lmxlbmd0aClcbiAgICAvLyAgICAgLy8gZWRpdGFibGVTb3VyY2VQcm9wZXJ0eVRkLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgcmVhZFNvdXJjZVByb3BlcnRpZXNGcm9tRG9tQW5kV3JpdGVQdXQpXG4gICAgLy8gICAgIGVkaXRhYmxlU291cmNlUHJvcGVydHlUZC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIGVkaXRhYmxlU291cmNlUHJvcGVydHlGb2N1c091dClcblxuICAgIC8vIH1cblxuICAgIGF3YWl0IGxvYWRTb3VyY2VDaGlsZHJlbihfY29udGVudE9iamVjdCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxvYWRTb3VyY2VDaGlsZHJlbihfY29udGVudE9iamVjdCA6IGFueSl7XG5cbiAgICBsZXQgY2hpbGRDb250ZW50RWRnZU9iamVjdHMgPSBhd2FpdCBhZ2VfZGJpcy5Db250ZW50RWRnZV9TZWxlY3RDaGlsZE9mVXVpZChfY29udGVudE9iamVjdC5VdWlkKTtcblxuXG5cbiAgICBsZXQgdGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdlX3NvdXJjZUNoaWxkVGFibGUtdGJvZHknKTtcbiAgICB0Ym9keS5pbm5lckhUTUwgPSAnJztcblxuICAgIGZvciAobGV0IGNoaWxkQ29udGVudEVkZ2VPYmplY3Qgb2YgY2hpbGRDb250ZW50RWRnZU9iamVjdHMpIHtcbiAgICAgICAgbGV0IHRhYmxlUm93SHRtbCA9IGBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJhZ2VfZWxlbWVudCBhZ2Vfc291cmNlQ2hpbGRUYWJsZS1UYWJsZVwiIGRhdGEtVXVpZD1cIiR7Y2hpbGRDb250ZW50RWRnZU9iamVjdC5jb250ZW50LlV1aWR9XCI+JHtjaGlsZENvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnQuVGFibGV9PC90ZD5cblx0XHRcdFx0PHRkIGNsYXNzPVwiYWdlX2VsZW1lbnQgYWdlX3NvdXJjZUNoaWxkVGFibGUtVHlwZVwiIGRhdGEtVXVpZD1cIiR7Y2hpbGRDb250ZW50RWRnZU9iamVjdC5jb250ZW50LlV1aWR9XCI+JHtjaGlsZENvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnQuVHlwZX08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImFnZV9lbGVtZW50IGFnZV9zb3VyY2VDaGlsZFRhYmxlLVRpdGxlXCIgZGF0YS1VdWlkPVwiJHtjaGlsZENvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnQuVXVpZH1cIiBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCI+JHtjaGlsZENvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnQuVGl0bGV9PC90ZD5cblxuICAgICAgICAgICAgYDtcbiAgICAgICAgbGV0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSBhcyBIVE1MUHJvamVjdFRhYmxlUm93O1xuICAgICAgICB0ci5pZCA9ICdhZ2Vfc291cmNlU2VhcmNoTm9kZS0nICsgY2hpbGRDb250ZW50RWRnZU9iamVjdC5jb250ZW50LlV1aWQ7XG4gICAgICAgIHRyLm5vZGVPYmplY3QgPSBjaGlsZENvbnRlbnRFZGdlT2JqZWN0O1xuICAgICAgICAvLyB0ci5hYWEgPSBcImFzZFwiO1xuICAgICAgICB0ci5zZXRBdHRyaWJ1dGUoJ2RhdGEtZnVjaycsICdmKmNrJyk7XG4gICAgICAgIC8vIHRyLmRhdGFzZXQuTm9kZSA9IDE7XG4gICAgICAgIC8vIHRyLmRhdGFzZXQuVXVpZCA9IGNoaWxkT2JqZWN0LlV1aWQ7XG4gICAgICAgIHRyLnNldEF0dHJpYnV0ZSgnZGF0YS1Ob2RlJywgJzEnKTtcbiAgICAgICAgdHIuc2V0QXR0cmlidXRlKCdkYXRhLVV1aWQnLCBjaGlsZENvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnQuVXVpZCk7XG4gICAgICAgIC8vIHRyLnRhYkluZGV4ID0gMTtcbiAgICAgICAgdHIuaW5uZXJIVE1MID0gdGFibGVSb3dIdG1sO1xuICAgICAgICAvLyB0ci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrU291cmNlQ2hpbGRSb3cpO1xuICAgICAgICAvLyB0ci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4geyBjb25zb2xlLmxvZyhldmVudC50YXJnZXQucGFyZW50Tm9kZS5ub2RlT2JqZWN0KSB9KTtcbiAgICAgICAgLy8gVGFyZ2V0cyBvbmx5IHRoZSBsYXN0IChpLmUuIFRpdGxlKSBjb2x1bW5cbiAgICAgICAgLy8gdHIubGFzdEVsZW1lbnRDaGlsZC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgYXN5bmMgKGV2ZW50KSA9PiB7XG5cbiAgICAgICAgLy8gICAgIGxldCB1dWlkID0gZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQubm9kZU9iamVjdC5jb250ZW50LlV1aWQ7XG4gICAgICAgIC8vICAgICBsZXQgY29udGVudE9iamVjdCA9IGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50Lm5vZGVPYmplY3QuY29udGVudDtcbiAgICAgICAgLy8gICAgIGNvbnRlbnRPYmplY3QuVGl0bGUgPSBldmVudC50YXJnZXQudGV4dENvbnRlbnQ7XG4gICAgICAgIC8vICAgICAvLyBjb25zb2xlLmxvZyhcIkNDQ0NDQ0NDQ0NcIiwgY29udGVudE9iamVjdClcbiAgICAgICAgLy8gICAgIGxldCBwdXRDb250ZW50T2JqZWN0ID0gYXdhaXQgZGJpcy5Db250ZW50X1VwZGF0ZVdpdGhDb250ZW50T2JqZWN0KGNvbnRlbnRPYmplY3QpO1xuXG4gICAgICAgIC8vICAgICBsZXQgZmV0Y2hlZENvbnRlbnRPYmplY3QgPSBhd2FpdCBkYmlzLkNvbnRlbnRfU2VsZWN0T25VdWlkKHV1aWQpO1xuXG4gICAgICAgIC8vICAgICBhd2FpdCBmZXRjaEN1cnJlbnRTb3VyY2VDaGlsZHJlblRoZW5Xcml0ZVRvU3RhdGVzKCk7XG4gICAgICAgIC8vICAgICBwb3B1bGF0ZVNvdXJjZUNoaWxkVGFibGVGcm9tU3RhdGUoKTtcblxuICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coXCJEREREREREREREXCIsIGZldGNoZWRDb250ZW50T2JqZWN0KVxuICAgICAgICAvLyAgICAgLy8gY29weVNvdXJjZUNoaWxkVGFibGVGcm9tRG9tKCk7XG5cbiAgICAgICAgLy8gICAgIC8vIHB1dEN1cnJlbnRTb3VyY2VPYmplY3QoKTtcbiAgICAgICAgLy8gICAgIC8vIGZldGNoQ3VycmVudFNvdXJjZUNoaWxkcmVuVGhlbldyaXRlVG9TdGF0ZXMoKTtcbiAgICAgICAgLy8gICAgIC8vIHBvcHVsYXRlU291cmNlQ2hpbGRUYWJsZUZyb21TdGF0ZSgpO1xuICAgICAgICAvLyB9KTtcbiAgICAgICAgLy8gdHIuY29udGVudEVkaXRhYmxlID0gJ1RydWUnO1xuXG4gICAgICAgIHRib2R5LmFwcGVuZCh0cik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRyKVxuICAgIH1cbiAgICAvLyBjb25zb2xlLnRhYmxlKGNoaWxkT2JqZWN0cylcblxufVxuXG5mdW5jdGlvbiBzb3VyY2VQcm9wZXJ0eUZvY3VzT3V0KGV2ZW50IDogRm9jdXNFdmVudCl7XG4gICAgY29uc29sZS5sb2coJ0ZPQ1VTIE9VVCBGUk9NIFNPVVJDRSBQUk9QRVJUWScpO1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb2N1c09uTGFzdENoaWxkUm93VGl0bGUoKXtcbiAgICBsZXQgdGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9zb3VyY2VDaGlsZFRhYmxlLXRib2R5XCIpIGFzIEhUTUxUYWJsZVNlY3Rpb25FbGVtZW50O1xuICAgIC8vIGNvbnNvbGUubG9nKFwidGJvZHkgPSBcIiwgdGJvZHkpXG4gICAgbGV0IGxhc3RSb3cgPSB0Ym9keS5sYXN0RWxlbWVudENoaWxkLmxhc3RFbGVtZW50Q2hpbGQgYXMgSFRNTFRhYmxlQ2VsbEVsZW1lbnQ7XG4gICAgLy8gY29uc29sZS5sb2coXCJsYXN0Um93ID0gXCIsIGxhc3RSb3cpXG5cbiAgICBpZihsYXN0Um93LnRleHRDb250ZW50Lmxlbmd0aCA9PSAwKXtcbiAgICAgICAgbGFzdFJvdy5pbm5lckhUTUwgPSBcIjxkaXY+PGJyPjwvZGl2PlwiXG4gICAgICAgIGxhc3RSb3cuZm9jdXMoKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgbGFzdFJvdy5mb2N1cygpO1xuICAgICAgICAgICAgLy8gdGhpcy5zZWxlY3Rpb25TdGFydCA9IHRoaXMuc2VsZWN0aW9uRW5kID0gdGhpcy52YWx1ZS5sZW5ndGg7XG4gICAgICAgICBcbiAgICAgICAgICAgIHZhciByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKClcbiAgICAgICAgICAgIHZhciBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKClcbiAgICAgICAgXG4gICAgICAgICAgICByYW5nZS5zZXRTdGFydChsYXN0Um93LmNoaWxkTm9kZXNbMF0sIGxhc3RSb3cuY2hpbGROb2Rlc1swXS50ZXh0Q29udGVudC5sZW5ndGgpXG4gICAgICAgICAgICByYW5nZS5jb2xsYXBzZSh0cnVlKVxuICAgICAgICBcbiAgICAgICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKVxuXG4gICAgfVxufVxuXG5cblxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ3NzKCk6IHZvaWQge1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kKHNvdXJjZUNzcyk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNzcygpOiB2b2lkIHtcbiAgICBzb3VyY2VDc3MucmVtb3ZlKCk7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSB7IFRmZXRjaGVyIH0gZnJvbSBcIi4vZmV0Y2hlclwiO1xuXG5cbmltcG9ydCAqIGFzIG92ZXJsYXkgZnJvbSBcIi4vb3ZlcmxheVwiO1xuXG5sZXQgZXh0ZW5zaW9uU3RhdGVGcm9udCA9e1xuICAgIGFjdGl2ZTogZmFsc2UsXG59O1xuXG5cbi8vIFNldCB1cCBtb2R1bGVzIGFuZCBmZXRjaCBkYXRhXG4oZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBvdmVybGF5LmluaXRPdmVybGF5KCk7ICBcblxuICAgIC8vIGxldCBzZXR0aW5nSXRlbSA9IGJyb3dzZXIuc3RvcmFnZS5sb2NhbC5zZXQoeyB0ZXN0OiBcIlZBTFVFXCIgfSk7XG5cbn0pKCk7XG5cblxuLy8gRGlzcGxheSB0aGUgZXh0ZW5zaW9uLWNvbnRhaW5lclxuYnJvd3Nlci5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobWVzc2FnZSkgPT4ge1xuICAgIFxuICAgIGlmIChtZXNzYWdlLm5hbWUgPT09ICd0b2dnbGVFeHRlbnNpb24nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVG9nZ2xlIEV4aXRlbnNpb24gTWVzc2FnZSByZWNpZXZlZCFcIilcblxuICAgICAgICBpZiAoZXh0ZW5zaW9uU3RhdGVGcm9udC5hY3RpdmUpe1xuICAgICAgICAgICAgZXh0ZW5zaW9uU3RhdGVGcm9udC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIG92ZXJsYXkuaGlkZU92ZXJsYXkoKTtcblxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4dGVuc2lvblN0YXRlRnJvbnQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIG92ZXJsYXkuc2hvd092ZXJsYXkoKTtcblxuICAgICAgICB9XG4gICAgfVxuXG59KTtcblxuXG4vKipcbiAqICBTaG93IGluamVjdGVkIGNvbnRhaW5lclxuICovXG5mdW5jdGlvbiBzdGFydCgpIDogdm9pZCB7XG4gICAgY29uc29sZS5sb2coXCJTVEFSVFwiKTtcbiAgICBcbiAgICBleHRlbnNpb25TdGF0ZUZyb250LmFjdGl2ZSA9IHRydWU7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhhd2FpdCBmZXRjaGVyLmZldGNoSHRtbChcIm92ZXJsYXkuaHRtbFwiKSlcblxuICAgIG92ZXJsYXkuc2hvd092ZXJsYXkoKTtcbn1cblxuXG4vKipcbiAqICBcbiAqICBIaWRlIGluamVjdGVkIGNvbnRhaW5lclxuICovXG5mdW5jdGlvbiBzdG9wKCkgOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhcIlNUT1BcIik7XG4gICAgZXh0ZW5zaW9uU3RhdGVGcm9udC5hY3RpdmUgPSBmYWxzZTtcbiAgICBvdmVybGF5LmhpZGVPdmVybGF5KCk7XG59XG5cblxuLy8gY29uc3QgbWVzc2FnZSA9IFwiSGVsbG8gV29ybGQhXCI7XG5cblxuLy8gY29uc29sZS5sb2coXCJUWVBFU0NSSVBUQFwiKVxuXG4vLyBjb25zb2xlLmxvZyhtZXNzYWdlLnRvTG93ZXJDYXNlKCksIFwiMlwiKVxuXG4vLyAvLyBtZXNzYWdlKCk7XG5cbi8vIGxldCB0eXBlQSA9IHtcbi8vICAgICBhOiBcImFcIixcbi8vICAgICBBOiAxLFxuLy8gfVxuXG5cbi8vIGZ1bmN0aW9uIGZ1bmZ1bihfeDogc3RyaW5nKXtcbi8vICAgICBjb25zb2xlLmxvZyhfeCk7XG4vLyB9XG4vLyBmdW5mdW4odHlwZUEuYSk7XG5cbi8vIGZ1bmN0aW9uIGdyZWV0KHBlcnNvbjpzdHJpbmcsIGRhdGU6c3RyaW5nKSB7XG4vLyAgICAgY29uc29sZS5sb2coYEhlbGxvICR7cGVyc29ufSwgdG9kYXkgaXMgJHtkYXRlfSFgKTtcbi8vIH1cblxuLy8gLy8gZ3JlZXQoXCJCcmVuZGFuXCIpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==