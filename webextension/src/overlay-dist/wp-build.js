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
                case 'p':
                    // console.log('Alt + p')
                    console.log("textConcatenationContent = ", textConcatenationContent);
                    break;
                case 'r': // new source
                    _projects_projects__WEBPACK_IMPORTED_MODULE_2__.reloadCurrentProject();
                    break;
                case 'n': // new source
                    _projects_projects__WEBPACK_IMPORTED_MODULE_2__.insertNewSourceToActiveProject();
                    break;
                case 'm': // new source
                    _projects_projects__WEBPACK_IMPORTED_MODULE_2__.toggleExtensionLocation();
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
                    stopClipboardTextConcatenation();
                    document.getElementById("age_clipboardContainer").classList.add("collapsed");
                    if (clipboardCodeCheckbox.checked) {
                        yield postNewCodeObjectToCurrentSourceAndFullReloadOfSourceChildren(clipboardTextTypeInput.value, textConcatenationContent);
                    }
                    else {
                        yield postNewTextNodeToCurrentSourceAndFullReloadOfSourceChildren(clipboardTextTypeInput.value, textConcatenationContent);
                    }
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
    overlayContainer.setAttribute("spellcheck", "false");
    overlayContainer.addEventListener("click", extensionClickHandler);
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
        if (_element.classList.contains("age_element") && _element.classList.contains("age_projectRowSearchData"))
            _element.textContent = dataElement.textContent;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDbkMsaURBQW1CLEVBQUUsQ0FBQztRQUcxQixDQUFDO2FBQ0csQ0FBQztZQUNELG1CQUFtQixDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbEMsaURBQW1CLEVBQUUsQ0FBQztRQUUxQixDQUFDO0lBQ0wsQ0FBQztBQUVMLENBQUMsQ0FBQyxDQUFDO0FBR0g7O0dBRUc7QUFDSCxTQUFTLEtBQUs7SUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXJCLG1CQUFtQixDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFFbEMsdURBQXVEO0lBRXZELGlEQUFtQixFQUFFLENBQUM7QUFDMUIsQ0FBQztBQUdEOzs7R0FHRztBQUNILFNBQVMsSUFBSTtJQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEIsbUJBQW1CLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUNuQyxpREFBbUIsRUFBRSxDQUFDO0FBQzFCLENBQUM7QUFHRCxrQ0FBa0M7QUFHbEMsNkJBQTZCO0FBRTdCLDBDQUEwQztBQUUxQyxnQkFBZ0I7QUFFaEIsZ0JBQWdCO0FBQ2hCLGNBQWM7QUFDZCxZQUFZO0FBQ1osSUFBSTtBQUdKLCtCQUErQjtBQUMvQix1QkFBdUI7QUFDdkIsSUFBSTtBQUNKLG1CQUFtQjtBQUVuQiwrQ0FBK0M7QUFDL0MseURBQXlEO0FBQ3pELElBQUk7QUFFSix1QkFBdUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zb3VyY2VzLy4vd2ViZXh0ZW5zaW9uL3dwLWRldi9jbGlwYm9hcmQudHMiLCJ3ZWJwYWNrOi8vc291cmNlcy8uL3dlYmV4dGVuc2lvbi93cC1kZXYvZGJpLXNlbmQudHMiLCJ3ZWJwYWNrOi8vc291cmNlcy8uL3dlYmV4dGVuc2lvbi93cC1kZXYvZmV0Y2hlci50cyIsIndlYnBhY2s6Ly9zb3VyY2VzLy4vd2ViZXh0ZW5zaW9uL3dwLWRldi9vdmVybGF5LnRzIiwid2VicGFjazovL3NvdXJjZXMvLi93ZWJleHRlbnNpb24vd3AtZGV2L3Byb2plY3RzL3Byb2plY3RfZG9tLnRzIiwid2VicGFjazovL3NvdXJjZXMvLi93ZWJleHRlbnNpb24vd3AtZGV2L3Byb2plY3RzL3Byb2plY3RzLnRzIiwid2VicGFjazovL3NvdXJjZXMvLi93ZWJleHRlbnNpb24vd3AtZGV2L3NvdXJjZS9zb3VyY2UudHMiLCJ3ZWJwYWNrOi8vc291cmNlcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zb3VyY2VzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zb3VyY2VzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc291cmNlcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NvdXJjZXMvLi93ZWJleHRlbnNpb24vd3AtZGV2L2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZldGNoZXIgZnJvbSBcIi4vZmV0Y2hlclwiO1xyXG5pbXBvcnQgKiBhcyBzb3VyY2UgZnJvbSBcIi4vc291cmNlL3NvdXJjZVwiO1xyXG5pbXBvcnQgKiBhcyBwcm9qZWN0IGZyb20gXCIuL3Byb2plY3RzL3Byb2plY3RzXCI7XHJcbmltcG9ydCB7IGFnZV9kYmlzIH0gZnJvbSBcIi4vZGJpLXNlbmRcIjtcclxuXHJcbmxldCBzaWRlUGFuZWw6IEVsZW1lbnQ7XHJcblxyXG5cclxubGV0IGNsaXBib2FyZENvbnRhaW5lcjogRWxlbWVudDtcclxubGV0IGNsaXBib2FyZENzczogSFRNTEVsZW1lbnQ7XHJcblxyXG5cclxuLy8gVkFSU1xyXG5sZXQgd2FpdGluZ1NlY29uZFNoaWZ0ID0gMDtcclxubGV0IHdhaXRpbmdTZWNvbmRDdHJsU2hpZnQgPSAwO1xyXG5cclxuXHJcbmxldCBjbGlwYm9hcmRJbm5lciA6IEhUTUxFbGVtZW50O1xyXG5sZXQgY2xpcGJvYXJkQ29kZUNoZWNrYm94IDogSFRNTElucHV0RWxlbWVudDtcclxubGV0IGNsaXBib2FyZFRleHRUeXBlSW5wdXQgOiBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxubGV0IGNsaXBib2FyZENvbmNhdENvbnRlbnRzIDogSFRNTEVsZW1lbnQ7XHJcbmxldCB0ZXh0Q29uY2F0ZW5hdGlvbkNhcHR1cmluZyA6IGJvb2xlYW4gPSBmYWxzZTtcclxubGV0IHRleHRDb25jYXRlbmF0aW9uQ29udGVudCA6IHN0cmluZyA9IFwiXCI7XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdENsaXBib2FyZChfc2lkZVBhbmVsOiBFbGVtZW50KSB7XHJcblx0Ly8gY2xpcGJvYXJkQ29kZUNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRvZ2dsZVNlbGVjdENvZGUpO1xyXG5cclxuXHQvLyB3cml0ZVRleHRDb25jYXRlbmF0aW9uQ29udGVudFRvRG9tKCk7XHJcblxyXG5cdC8vIGlmIChleHRlbnNpb25TdGF0ZUZyb250LnRleHRDb25jYXRlbmF0aW9uQ2FwdHVyaW5nKSB7XHJcblx0Ly8gXHRjbGlwYm9hcmRJbm5lci5jbGFzc0xpc3QuYWRkKCdhZ2VfYWN0aXZlQ2xpcGJvYXJkJyk7XHJcblx0Ly8gfVxyXG5cdC8vIGVsc2Uge1xyXG5cdC8vIFx0Y2xpcGJvYXJkSW5uZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWdlX2FjdGl2ZUNsaXBib2FyZCcpO1xyXG5cdC8vIH1cclxuXHJcblx0LyogXHJcblx0XHJcblx0XHRcdE5FVyBORVcgTkVXIC0gMjAyNC0xMC0wMlxyXG5cdFxyXG5cdCovXHJcblxyXG5cdHNpZGVQYW5lbCA9IF9zaWRlUGFuZWw7XHJcblxyXG5cdGNsaXBib2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdGNsaXBib2FyZENvbnRhaW5lci5pZCA9IFwiYWdlX2NsaXBib2FyZENvbnRhaW5lclwiO1xyXG5cdGNsaXBib2FyZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYWdlX3BhbmVsQ29udGFpbmVyXCIsIFwiY29sbGFwc2VkXCIpO1xyXG5cclxuXHJcblxyXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NvcHknLCBjb3B5RXZlbnQpXHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY3V0JywgY3V0RXZlbnQpXHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncGFzdGUnLCBwYXN0ZUV2ZW50KVxyXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlkb3duQWN0aXZlRXh0ZW5zaW9uKVxyXG5cclxuXHJcblx0ZmV0Y2hlci5mZXRjaEh0bWwoXCJjbGlwYm9hcmQuaHRtbFwiKVxyXG5cdFx0LnRoZW4oaHRtbCA9PiB7XHJcblx0XHRcdGNsaXBib2FyZENvbnRhaW5lci5pbm5lckhUTUwgPSBodG1sO1xyXG5cclxuXHJcblx0XHRcdGNsaXBib2FyZElubmVyID0gY2xpcGJvYXJkQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX2NsaXBib2FyZElubmVyXCIpO1xyXG5cdFx0XHRjbGlwYm9hcmRDb2RlQ2hlY2tib3ggPSBjbGlwYm9hcmRDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2VfY2xpcGJvYXJkQ29kZUNoZWNrYm94XCIpO1xyXG5cdFx0XHRjbGlwYm9hcmRUZXh0VHlwZUlucHV0ID0gY2xpcGJvYXJkQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX2NsaXBib2FyZFRleHRUeXBlSW5wdXRcIik7XHJcblx0XHRcdGNsaXBib2FyZENvbmNhdENvbnRlbnRzID0gY2xpcGJvYXJkQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX2NsaXBib2FyZENvbmNhdENvbnRlbnRcIik7XHJcblx0XHR9KVxyXG5cclxuXHRjbGlwYm9hcmRDc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0Y2xpcGJvYXJkQ3NzLmlkID0gXCJhZ2VfY2xpcGJvYXJkU3R5bGVcIjtcclxuXHRmZXRjaGVyLmZldGNoQ3NzKFwiY2xpcGJvYXJkLmNzc1wiKVxyXG5cdFx0LnRoZW4oY3NzID0+IHtcclxuXHRcdFx0Y2xpcGJvYXJkQ3NzLmlubmVyVGV4dCA9IGNzcztcclxuXHRcdH0pXHJcblxyXG5cdC8vIGNvbnNvbGUubG9nKFwic2lkZVBhbmVsLmlkID0gXCIsIHNpZGVQYW5lbC5pZClcclxuXHJcblx0c2lkZVBhbmVsLmFwcGVuZChjbGlwYm9hcmRDb250YWluZXIpO1xyXG5cclxuIFxyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuLyogXHJcblxyXG5cdENMSVBCT0FSRCBGVU5DVElPTlNcclxuXHJcbiovXHJcblxyXG5cclxuZnVuY3Rpb24gd3JpdGVUZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnRUb0RvbSgpIHtcclxuXHJcblx0bGV0IGNsaXBib2FyZFN0cmluZyA9IHRleHRDb25jYXRlbmF0aW9uQ29udGVudDtcclxuXHRsZXQgY2xpcGJvYXJkSW5uZXJIdG1sID0gJzxkaXY+JyArIGNsaXBib2FyZFN0cmluZy5yZXBsYWNlKC9cXG4vZywgJzxicj4nKSArICc8L2Rpdj4nO1xyXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2VfY2xpcGJvYXJkQ29uY2F0Q29udGVudCcpLmlubmVySFRNTCA9IGNsaXBib2FyZElubmVySHRtbDtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gc3RhcnRDbGlwYm9hcmRUZXh0Q29uY2F0ZW5hdGlvbigpIHtcclxuXHJcblx0dGV4dENvbmNhdGVuYXRpb25DYXB0dXJpbmcgPSB0cnVlO1xyXG5cdC8vIGV4dGVuc2lvblN0YXRlRnJvbnQudGV4dENvbmNhdGVuYXRpb25Db250ZW50ID0gJyc7XHJcblx0Ly8gd3JpdGVUZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnRUb0RvbSgpO1xyXG5cdC8vd3JpdGVTdGF0ZUZyb21Gcm9udCgpO1xyXG5cdC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2VfY2xpcGJvYXJkQ29udGFpbmVyJykuY2xhc3NMaXN0LnJlbW92ZSgnYWdlX2Rpc3BsYXlOb25lJyk7XHJcblx0Y2xpcGJvYXJkSW5uZXIuY2xhc3NMaXN0LmFkZCgnYWdlX2FjdGl2ZUNsaXBib2FyZCcpO1xyXG5cdGNvbnNvbGUubG9nKCdzdGFydCB0ZXh0IGNvbmNhdGVudGF0aW9uIGNhcHR1cmUnKTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFNwYWNlQ2hhcmFjdGVyVG9DYXB0dXJlQ29uY2F0ZW5hdGlvbkNvbnRlbnRzKCkge1xyXG5cdGNvbnNvbGUubG9nKCdhZGRlZCBuZXcgc3BhY2UnKVxyXG5cdGlmICh0ZXh0Q29uY2F0ZW5hdGlvbkNhcHR1cmluZykge1xyXG5cdFx0dGV4dENvbmNhdGVuYXRpb25Db250ZW50ICs9ICcgJztcclxuXHRcdC8vd3JpdGVTdGF0ZUZyb21Gcm9udCgpO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZE5ld0xpbmVUb0NhcHR1cmVDb25jYXRlbmF0aW9uQ29udGVudHMoKSB7XHJcblx0Y29uc29sZS5sb2coJ2FkZGVkIG5ldyBsaW5lJylcclxuXHRpZiAodGV4dENvbmNhdGVuYXRpb25DYXB0dXJpbmcpIHtcclxuXHRcdHRleHRDb25jYXRlbmF0aW9uQ29udGVudCArPSAnXFxuJztcclxuXHRcdC8vd3JpdGVTdGF0ZUZyb21Gcm9udCgpO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0b3BDbGlwYm9hcmRUZXh0Q29uY2F0ZW5hdGlvbigpIHtcclxuXHJcblxyXG5cclxuXHR0ZXh0Q29uY2F0ZW5hdGlvbkNhcHR1cmluZyA9IGZhbHNlO1xyXG5cdHRleHRDb25jYXRlbmF0aW9uQ29udGVudCA9ICcnO1xyXG5cdHdyaXRlVGV4dENvbmNhdGVuYXRpb25Db250ZW50VG9Eb20oKTtcclxuXHRjbGlwYm9hcmRJbm5lci5jbGFzc0xpc3QucmVtb3ZlKCdhZ2VfYWN0aXZlQ2xpcGJvYXJkJyk7XHJcblx0Ly93cml0ZVN0YXRlRnJvbUZyb250KCk7XHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qIFxyXG5cclxuXHRDTElQQk9BUkQgRVZFTlRTXHJcblxyXG4qL1xyXG5cclxuLy8gZnVuY3Rpb24gdG9nZ2xlU2VsZWN0Q29kZSgpIHtcclxuLy8gXHRpZiAoY2xpcGJvYXJkQ29kZUNoZWNrYm94LmNoZWNrZWQpIHtcclxuLy8gXHRcdGNsaXBib2FyZFRleHRUeXBlSW5wdXQuZGlzYWJsZWQgPSBmYWxzZTtcclxuLy8gXHR9XHJcbi8vIFx0ZWxzZSB7XHJcbi8vIFx0XHRjbGlwYm9hcmRUZXh0VHlwZUlucHV0LmRpc2FibGVkID0gdHJ1ZTtcclxuLy8gXHR9XHJcblxyXG4vLyB9XHJcblxyXG5hc3luYyBmdW5jdGlvbiBwYXN0ZUV2ZW50KGV2ZW50IDogQ2xpcGJvYXJkRXZlbnQpIHtcclxuXHQvLyBjb25zb2xlLmxvZygncGFzdGVwYXN0ZScpXHJcblx0Y29uc29sZS5sb2coJ1BBU1RFIEVWRU5UJylcclxuXHQvLyBjb25zb2xlLmxvZyhldmVudC5jbGlwYm9hcmREYXRhLmZpbGVzWzBdKVxyXG5cclxuXHJcblx0XHJcblxyXG5cclxuXHRsZXQgY2xpcGJvYXJkQ29udGVudFR5cGUgPSBkZXRlcm1pbmVDbGlwYm9hcmRDb250ZW50VHlwZShldmVudC5jbGlwYm9hcmREYXRhKTtcclxuXHJcblxyXG5cdGlmIChjbGlwYm9hcmRDb250ZW50VHlwZSA9PT0gJ3RleHQnKSB7XHJcblx0XHRjb25zb2xlLmxvZygnZGVhbCB3aXRoIHRleHQnKTsgXHJcblxyXG5cdFx0bGV0IGNsaXBib2FyZFRleHQgPSAoZXZlbnQuY2xpcGJvYXJkRGF0YSAvKiB8fCB3aW5kb3cuY2xpcGJvYXJkRGF0YSAqLykuZ2V0RGF0YShcInRleHRcIik7XHJcblx0XHRjb25zb2xlLmxvZygnY2xpcGJvYXJkVGV4dCA9ICcsIGNsaXBib2FyZFRleHQpO1xyXG5cdFx0XHJcblxyXG5cdFx0aWYgKHRleHRDb25jYXRlbmF0aW9uQ2FwdHVyaW5nKSB7XHJcblxyXG5cdFx0XHR0ZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnQgKz0gY2xpcGJvYXJkVGV4dDtcclxuXHJcblx0XHRcdHdyaXRlVGV4dENvbmNhdGVuYXRpb25Db250ZW50VG9Eb20oKVxyXG5cclxuXHRcdFx0Ly93cml0ZVN0YXRlRnJvbUZyb250KCk7XHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKGV4dGVuc2lvblN0YXRlRnJvbnQudGV4dENvbmNhdGVuYXRpb25Db250ZW50KTtcclxuXHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Y29uc29sZS5sb2coJ1BBU1RFIFRPIE5FVyBTSEFSRCcpXHJcblxyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhjbGlwYm9hcmRDb2RlQ2hlY2tib3guY2hlY2tlZClcclxuXHJcblx0XHRcdGlmIChjbGlwYm9hcmRDb2RlQ2hlY2tib3guY2hlY2tlZCkge1xyXG5cdFx0XHRcdHBvc3ROZXdDb2RlT2JqZWN0VG9DdXJyZW50U291cmNlQW5kRnVsbFJlbG9hZE9mU291cmNlQ2hpbGRyZW4oY2xpcGJvYXJkVGV4dFR5cGVJbnB1dC52YWx1ZSwgY2xpcGJvYXJkVGV4dClcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRwb3N0TmV3VGV4dE5vZGVUb0N1cnJlbnRTb3VyY2VBbmRGdWxsUmVsb2FkT2ZTb3VyY2VDaGlsZHJlbihjbGlwYm9hcmRUZXh0VHlwZUlucHV0LnZhbHVlLCBjbGlwYm9hcmRUZXh0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvLyBpZiAoc2hhcmRjYXJkLmNvbnRlbnRFZGl0YWJsZSA9PT0gJ3RydWUnKSB7XHJcblx0XHQvLyBcdGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiaW5zZXJ0SFRNTFwiLCBmYWxzZSwgY2xpcGJvYXJkVGV4dCk7XHJcblx0XHQvLyBcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHQvLyB9XHJcblx0XHQvLyBlbHNlIGlmIChzaGFyZE9iamVjdC50ZXh0Q29udGVudCA9PSAnJyAmJiBzaGFyZE9iamVjdC5maWxlTmFtZSA9PSAnJykge1xyXG5cdFx0Ly8gXHRpbnNlcnRTaGFyZGNhcmRUZXh0Q29udGVudChzaGFyZGNhcmQsIGNsaXBib2FyZFRleHQpO1xyXG5cdFx0Ly8gXHQvL3NoYXJkY2FyZC5zaGFyZC5lbGVtZW50VHlwZSA9ICd0ZXh0JztcclxuXHRcdC8vIFx0dXBkYXRlU2hhcmRjYXJkVGV4dENvbnRlbnQoc2hhcmRjYXJkKTtcclxuXHRcdC8vIH1cclxuXHRcdC8vIGVsc2Uge1xyXG5cdFx0Ly8gXHRjb25zb2xlLmxvZygnVGhpcyBzb3VyY2UgYWxyZWFkeSBoYXMgY29udGVudC4gUmV0dXJuaW5nLicpO1xyXG5cclxuXHRcdC8vIH1cclxuXHJcblxyXG5cclxuXHR9XHJcblx0ZWxzZSBpZiAoY2xpcGJvYXJkQ29udGVudFR5cGUgPT09ICdmaWxlJykge1xyXG5cdFx0Y29uc29sZS5sb2coJ2RlYWwgd2l0aCBmaWxlJylcclxuXHJcblx0XHRsZXQgbmV3RmlsZSA9IGV2ZW50LmNsaXBib2FyZERhdGEuZmlsZXNbMF07XHJcblxyXG5cdFx0bGV0IGZpbGVDYXRlZ29yeU9iamVjdCA9IGRldGVybWluZUZpbGVDYXRlZ29yaWVzKG5ld0ZpbGUpO1xyXG5cdFx0Y29uc29sZS5sb2coJ2ZpbGVDYXRlZ29yeU9iamVjdDogJywgZmlsZUNhdGVnb3J5T2JqZWN0KVxyXG5cclxuXHRcdGlmIChmaWxlQ2F0ZWdvcnlPYmplY3QuZmlsZVR5cGUgPT09ICd0eXBldHlwZScpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcignRklMRSBFWFRFTlNJT04gSEFEIE5PIE1BVENISU5HIENPTlRFTlQgVFlQRScpXHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcG9zdEZpbGVRdWVyeVBhcmFtZXRlcnMgPSB7XHJcblx0XHRcdFR5cGU6IGZpbGVDYXRlZ29yeU9iamVjdC5maWxlVHlwZSxcclxuXHRcdFx0VGl0bGU6IFwiXCIsXHJcblx0XHRcdEV4dGVuc2lvbjogZmlsZUNhdGVnb3J5T2JqZWN0LmZpbGVFeHRlbnNpb24sXHJcblx0XHRcdElBbUF1dGhvcjogMCxcclxuXHRcdH1cclxuXHJcblx0XHRwb3N0TmV3RmlsZVRvQ3VycmVudFNvdXJjZUFuZEZ1bGxSZWxvYWRPZlNvdXJjZUNoaWxkcmVuKG5ld0ZpbGUsIHBvc3RGaWxlUXVlcnlQYXJhbWV0ZXJzLCBmaWxlQ2F0ZWdvcnlPYmplY3QubWltZVR5cGUpO1xyXG5cclxuXHRcdC8vIGNvbnNvbGUubG9nKG5ld0ZpbGUpXHJcblxyXG5cdFx0Ly8gY29uc29sZS5sb2coYXdhaXQgYWdlX2RiaXNXZS5maWxlR2V0KDEyMTYyNzI3OTM2MCkpO1xyXG5cclxuXHRcdC8vIGxldCBzb3VyY2VpZCA9IGV4dHJhY3RDdXJyZW50U291cmNlSWQoKTtcclxuXHJcblx0XHQvLyBpZiAoc2hhcmRPYmplY3QuZmlsZU5hbWUgPT0gJycgJiYgc2hhcmRPYmplY3QudGV4dENvbnRlbnQgPT0gJycpIHtcclxuXHRcdC8vIFx0cG9zdEZpbGUoZXZlbnQuY2xpcGJvYXJkRGF0YS5maWxlc1swXSwgc291cmNlaWQsIHNoYXJkaWQpO1xyXG5cdFx0Ly8gXHRjb25zb2xlLmxvZygnbm9ub25vJylcclxuXHRcdC8vIH1cclxuXHRcdC8vIGVsc2Uge1xyXG5cdFx0Ly8gXHRjb25zb2xlLmxvZygnVGhpcyBzb3VyY2UgYWxyZWFkeSBoYXMgY29udGVudC4gUmV0dXJuaW5nLicpO1xyXG5cdFx0Ly8gfVxyXG5cclxuXHJcblxyXG5cdH1cclxuXHJcblxyXG5cclxufVxyXG4vLyBjb25zdCBwYXNwYXMgPSBuZXcgQ2xpcGJvYXJkRXZlbnQoJ3Bhc3RlJyk7XHJcbi8vIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQocGFzcGFzKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBjb3B5RXZlbnQoZXZlbnQgOiBDbGlwYm9hcmRFdmVudCkge1xyXG5cclxuXHQvLyBjb25zb2xlLmxvZygnY29wY29wJylcclxuXHQvLyBjb25zb2xlLmxvZyhldmVudC5jbGlwYm9hcmREYXRhIClcclxuXHQvLyBsZXQgY2JkID0gZXZlbnQuY2xpcGJvYXJkRGF0YSB8fCB3aW5kb3cuY2xpcGJvYXJkRGF0YVxyXG5cdC8vIGxldCBjb3BpZWREYXRhID0gY2JkLmdldERhdGEoJ1RleHQnKTtcclxuXHQvLyBjb25zb2xlLmxvZygnY29waWVkRGF0YScsIGNvcGllZERhdGEpXHJcblxyXG5cdC8vIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSgge1xyXG5cdC8vIFx0Y29tbWFuZDogXCJjb3B5Y29weVwiXHJcblx0Ly8gfSk7XHJcblxyXG5cdGNvbnNvbGUubG9nKCdDT1BZRVZFTlQnKVxyXG5cclxuXHJcblx0Ly8gbmF2aWdhdG9yLmNsaXBib2FyZFxyXG5cdC8vIFx0LnJlYWQoKVxyXG5cdC8vIFx0LnRoZW4oXHJcblx0Ly8gXHRcdChjbGlwVGV4dCkgPT4gKGNvbnNvbGUubG9nKGNsaXBUZXh0KSksXHJcblx0Ly8gXHQpO1xyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gY3V0RXZlbnQoZXZlbnQgOiBLZXlib2FyZEV2ZW50KSB7XHJcblx0Y29uc29sZS5sb2coJ0NVVCBFVkVOVCcpXHJcbn1cclxuXHJcblxyXG5cclxuLyogXHJcblxyXG5cdEhFTFBFUiBGVU5DVElPTlNcclxuXHJcbiovXHJcblxyXG5cclxuXHJcblxyXG5sZXQgZGV0ZXJtaW5lQ2xpcGJvYXJkQ29udGVudFR5cGUgPSBmdW5jdGlvbiAoZXZlbnRDbGlwYm9hcmREYXRhIDogYW55KSB7XHJcblxyXG5cdGlmICh0eXBlb2YgZXZlbnRDbGlwYm9hcmREYXRhLmZpbGVzWzBdICE9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0Ly8gcG9zdEZpbGUoZGF0YUNsaXBib2FyZEV2ZW50LmZpbGVzWzBdLCBzb3VyY2VpZCwgc2hhcmRpZCk7XHJcblx0XHRyZXR1cm4gJ2ZpbGUnO1xyXG5cdH1cclxuXHRlbHNlIGlmICgoZXZlbnRDbGlwYm9hcmREYXRhIC8qIHx8IHdpbmRvdy5jbGlwYm9hcmREYXRhICovKS5nZXREYXRhKFwidGV4dFwiKSAhPT0gJycpIHtcclxuXHRcdC8vY29uc29sZS5sb2coKGV2ZW50LmNsaXBib2FyZERhdGEgfHwgd2luZG93LmNsaXBib2FyZERhdGEpLmdldERhdGEoXCJ0ZXh0XCIpKTtcclxuXHJcblx0XHRsZXQgY2xpcGJvYXJkVGV4dCA9IChldmVudENsaXBib2FyZERhdGEgLyogfHwgd2luZG93LmNsaXBib2FyZERhdGEgKi8pLmdldERhdGEoXCJ0ZXh0XCIpO1xyXG5cdFx0bGV0IGJsb2IgPSBuZXcgQmxvYihbY2xpcGJvYXJkVGV4dF0sIHsgdHlwZTogJ3RleHQvcGxhaW4nIH0pO1xyXG5cdFx0bGV0IGZpbGUgPSBuZXcgRmlsZShbYmxvYl0sIFwiY2xpcGJvYXJkLnR4dFwiLCB7IHR5cGU6IFwidGV4dC9wbGFpblwiIH0pO1xyXG5cclxuXHRcdC8vcG9zdEZpbGUoZmlsZSwgc291cmNlaWQsIHNoYXJkaWQpO1xyXG5cdFx0cmV0dXJuICd0ZXh0JztcclxuXHR9XHJcblx0ZWxzZSB7XHJcblx0XHRjb25zb2xlLmxvZygnTm8gZmlsZSBub3IgdGV4dCBkZXRlY3RlZC4nKTtcclxuXHRcdHJldHVybiAnZW1wdHknO1xyXG5cdH1cclxuXHJcblx0Ly9yZXR1cm4gJ2NsaXBib2FyZENvbnRlbnRUeXBlJztcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbmxldCBleHRlbnNpb25PYmplY3QgOiBhbnkgPSB7XHJcblx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvTWVkaWEvRm9ybWF0cy9JbWFnZV90eXBlc1xyXG5cdGltYWdlOiBbJ2FwbmcnLCAnYXZpZicsICdnaWYnLCAnYm1wJywgJ2pwZycsICdqcGVnJywgJ2pmaWYnLCAncGpwZWcnLCAncGpwJywgJ3BuZycsICdzdmcnLCAnd2VicCddLFxyXG5cdC8vIGh0dHBzOi8vd3d3LmNhbnRvLmNvbS9ibG9nL2F1ZGlvLWZpbGUtdHlwZXMvXHJcblx0YXVkaW86IFsnbTRhJywgJ2ZsYWMnLCAnbXAzJywgJ3dhdicsICd3bWEnLCAnYWFjJ10sXHJcblx0Ly8gaHR0cHM6Ly93d3cuYWRvYmUuY29tL2NyZWF0aXZlY2xvdWQvdmlkZW8vZGlzY292ZXIvYmVzdC12aWRlby1mb3JtYXQuaHRtbFxyXG5cdHZpZGVvOiBbJ21wNCcsICdtb3YnLCAnd212JywgJ2F2aScsICdBVkNIRCcsICdmbHYnLCAnZjR2JywgJ3N3ZicsICdta3YnLCAnd2VibScsICdtcGcnXSxcclxuXHRwZGY6IFsncGRmJ10sXHJcblx0ZGF0YTogWydqc29uJywgJ2NzdicsICd0c3YnLCAnZGInLCAneGxzeCcsICdvZHMnLCAnb2RiJ10sXHJcblx0Ly8gVGV4dGFyZWEgZXh0ZW5zaW9uXHJcblx0dGV4dDogWyd0eHQnLCAnbWQnXSxcclxuXHRjb2RlOiBbJ2pzJywgJ3RzJywgJ2NzcycsICdodG1sJywgJ2NzJ10sXHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gZGV0ZXJtaW5lRmlsZUNhdGVnb3JpZXMoc2VsZWN0ZWRGaWxlIDogYW55KSA6IGFueSB7XHJcblxyXG5cdGxldCBzZWxlY3RlZEZpbGVUeXBlOiBzdHJpbmcgPSBzZWxlY3RlZEZpbGUudHlwZTtcclxuXHRsZXQgZmlsZUNhdGVnb3JpZXMgPSB7XHJcblx0XHRtaW1lVHlwZTogc2VsZWN0ZWRGaWxlVHlwZSxcclxuXHRcdGJhc2VGaWxlTmFtZTogJ2Jhc2VuYW1lJyxcclxuXHRcdGZpbGVFeHRlbnNpb246ICdleHRleHQnLFxyXG5cdFx0ZmlsZVR5cGU6ICd0eXBldHlwZSdcclxuXHR9XHJcblxyXG5cclxuXHJcblx0ZmlsZUNhdGVnb3JpZXMuZmlsZUV4dGVuc2lvbiA9IGRldGVybWluZUZpbGVFeHRlbnNpb24oc2VsZWN0ZWRGaWxlKTtcclxuXHRmaWxlQ2F0ZWdvcmllcy5iYXNlRmlsZU5hbWUgPSBkZXRlcm1pbmVCYXNlRmlsZU5hbWUoc2VsZWN0ZWRGaWxlKTtcclxuXHJcblx0Ly8gZmlsZUNhdGVnb3JpZXMuZmlsZVR5cGUgPSBkZXRlcm1pbmVGaWxlVHlwZShmaWxlQ2F0ZWdvcmllcy5taW1lVHlwZSwgZmlsZUNhdGVnb3JpZXMuZmlsZUVuZGluZyk7XHJcblxyXG5cdC8vIGZpbGVDYXRlZ29yaWVzLmZpbGVUeXBlID0gT2JqZWN0LmVudHJpZXMoZXh0ZW5zaW9uT2JqZWN0KS5mb3JFYWNoKHR5cGVBcnJheSA9PiB0eXBlQXJyYXkuZmlsdGVyKGV4dGVuc2lvbiA9PiBleHRlbnNpb24gPT09IGZpbGVDYXRlZ29yaWVzLmZpbGVFeHRlbnNpb24pKVxyXG5cdGZpbGVDYXRlZ29yaWVzLmZpbGVUeXBlID0gT2JqZWN0LmtleXMoZXh0ZW5zaW9uT2JqZWN0KS5maW5kKHR5cGUgPT4gZXh0ZW5zaW9uT2JqZWN0W3R5cGVdLmluY2x1ZGVzKGZpbGVDYXRlZ29yaWVzLmZpbGVFeHRlbnNpb24pKTtcclxuXHQvLyBjb25zb2xlLmxvZyhmaWxlQ2F0ZWdvcmllcy5maWxlVHlwZSlcclxuXHQvL2NvbnNvbGUubG9nKCdmaWxlIHR5cGUgZGV0ZXJtaW5lZCBoZXJlIScpO1xyXG5cdC8vIGlmIChmaWxlQ2F0ZWdvcmllcy5maWxlRXh0ZW5zaW9uID09PSAnZGInKSB7XHJcblx0Ly8gXHQvLyBodHRwOi8vZmlsZWZvcm1hdHMuYXJjaGl2ZXRlYW0ub3JnL3dpa2kvREJfKFNRTGl0ZSlcclxuXHQvLyBcdGZpbGVDYXRlZ29yaWVzLm1pbWVUeXBlID0gJ2FwcGxpY2F0aW9uL3ZuZC5zcWxpdGUzJztcclxuXHQvLyB9XHJcblx0Y29uc29sZS5sb2coZmlsZUNhdGVnb3JpZXMubWltZVR5cGUpXHJcblx0aWYgKGZpbGVDYXRlZ29yaWVzLm1pbWVUeXBlID09ICcnKSB7XHJcblx0XHQvLyBmaWxlQ2F0ZWdvcmllcy5taW1lVHlwZSA9PSAnYXBwbGljYXRpb24vc3RyZWFtJztcclxuXHRcdGZpbGVDYXRlZ29yaWVzLm1pbWVUeXBlID0gJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSc7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gZmlsZUNhdGVnb3JpZXM7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGRldGVybWluZUZpbGVFeHRlbnNpb24oc2VsZWN0ZWRGaWxlIDogRmlsZSkge1xyXG5cclxuXHRyZXR1cm4gc2VsZWN0ZWRGaWxlLm5hbWUubWF0Y2goL1xcdyskL2cpWzBdO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gZGV0ZXJtaW5lQmFzZUZpbGVOYW1lKHNlbGVjdGVkRmlsZTogRmlsZSkge1xyXG5cclxuXHRyZXR1cm4gc2VsZWN0ZWRGaWxlLm5hbWUubWF0Y2goL14uKig/PVxcLlteLl0rJCkvKVswXTtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qIFxyXG5cclxuXHRDTElQQk9BUkQgRkVUQ0hcclxuXHJcbiovXHJcblxyXG5cclxuYXN5bmMgZnVuY3Rpb24gcG9zdE5ld1RleHROb2RlVG9DdXJyZW50U291cmNlQW5kRnVsbFJlbG9hZE9mU291cmNlQ2hpbGRyZW4odGV4dFR5cGUgOiBzdHJpbmcsIFRleHRDb250ZW50IDogc3RyaW5nKSB7XHJcblxyXG5cdGxldCBzb3VyY2VPYmplY3Q6IGFueSA9IHNvdXJjZS5nZXRDdXJyZW50U291cmNlT2JqZWN0KCk7XHJcblx0aWYoc291cmNlT2JqZWN0ID09IHVuZGVmaW5lZCl7XHJcblx0XHRjb25zb2xlLndhcm4oXCJVbmFibGUgdG8gcG9zdCBuZXcgdGV4dCBvYmplY3QuIE5vIHNlbGVjdGVkIHNvdXJjZU9iamVjdC5cIilcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0XHJcblx0Ly8gbGV0IHNvdXJjZVV1aWQgPSBzb3VyY2VPYmplY3QuVXVpZDtcclxuXHQvLyBsZXQgc291cmNlVXVpZCA9IHNvdXJjZS5nZXRDdXJyZW50U291cmNlVXVpZCgpO1xyXG5cclxuXHQvLyBsZXQgc291cmNlT2JqZWN0OiBhbnkgPSBzb3VyY2UuY3VycmVudFNvdXJjZU9iamVjdDtcclxuXHRsZXQgc291cmNlVXVpZCA9IHNvdXJjZU9iamVjdC5VdWlkO1xyXG5cclxuXHQvLyBjb25zb2xlLmxvZygncG9zdE5ld1RleHROb2RlVG9DdXJyZW50U291cmNlQW5kRnVsbFJlbG9hZE9mU291cmNlQ2hpbGRyZW4oKScpO1xyXG5cdC8vIGNvbnNvbGUubG9nKCdzb3VyY2VVdWlkID0gJywgc291cmNlVXVpZCk7XHJcblx0XHJcblx0XHJcblxyXG5cdC8vIENvbnRlbnRfSW5zZXJ0Q2hpbGRVdWlkVGFibGUoVXVpZCwgY2hpbGRUYWJsZSlcclxuXHRpZiAoc291cmNlVXVpZCAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG5cdFx0Ly8gbGV0IG5ld1RleHRPYmplY3QgPSAoYXdhaXQgYWdlX2RiaXNXZS5Db250ZW50X0luc2VydENoaWxkVXVpZFRhYmxlKGV4dGVuc2lvblN0YXRlRnJvbnQuY3VycmVudF9zb3VyY2VPYmplY3QuVXVpZCwgJ1RleHQnKSkuQ29udGVudDtcclxuXHRcdGxldCBuZXdUZXh0Q29udGVudE9iamVjdCA9IChhd2FpdCBhZ2VfZGJpcy5Db250ZW50RWRnZV9JbnNlcnRBZGphY2VudFRvVXVpZEludG9UYWJsZShzb3VyY2VVdWlkLCAxLCAnVGV4dCcsICcnLCAnJywgJy8nKSkuY29udGVudDtcclxuXHJcblx0XHQvLyBjb25zb2xlLmxvZyhuZXdUZXh0T2JqZWN0KVxyXG5cclxuXHRcdG5ld1RleHRDb250ZW50T2JqZWN0LlRpdGxlID0gVGV4dENvbnRlbnQuc3Vic3RyaW5nKDAsIDI1KTtcclxuXHRcdG5ld1RleHRDb250ZW50T2JqZWN0LlRleHRDb250ZW50ID0gVGV4dENvbnRlbnQ7XHJcblx0XHRuZXdUZXh0Q29udGVudE9iamVjdC5UeXBlID0gdGV4dFR5cGU7XHJcblxyXG5cclxuXHRcdGF3YWl0IGFnZV9kYmlzLkNvbnRlbnRfVXBkYXRlV2l0aENvbnRlbnRPYmplY3QobmV3VGV4dENvbnRlbnRPYmplY3QpO1xyXG5cdFx0XHJcblx0XHQvLyBUT0RPIFxyXG5cdFx0Ly8gVVBEQVRFIFNPVVJDRSBQQU5FTCB4MyBcclxuXHRcdC8vIGF3YWl0IGZldGNoQ3VycmVudFNvdXJjZUNoaWxkcmVuVGhlbldyaXRlVG9TdGF0ZXMoKTtcclxuXHRcdC8vIHBvcHVsYXRlU291cmNlQ2hpbGRUYWJsZUZyb21TdGF0ZSgpO1xyXG5cdFx0YXdhaXQgc291cmNlLmxvYWRXaXRoQ29udGVudE9iamVjdChzb3VyY2VPYmplY3QpO1xyXG5cdFx0c291cmNlLmZvY3VzT25MYXN0Q2hpbGRSb3dUaXRsZSgpO1xyXG5cclxuXHRcdC8vIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0Ly8gfSwgMTAwKTtcclxuXHJcblx0fVxyXG5cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gcG9zdE5ld0NvZGVPYmplY3RUb0N1cnJlbnRTb3VyY2VBbmRGdWxsUmVsb2FkT2ZTb3VyY2VDaGlsZHJlbihUeXBlOiBzdHJpbmcsIENvZGVDb250ZW50OiBzdHJpbmcpIHtcclxuXHJcblx0bGV0IHNvdXJjZU9iamVjdDogYW55ID0gc291cmNlLmdldEN1cnJlbnRTb3VyY2VPYmplY3QoKTtcclxuXHRsZXQgc291cmNlVXVpZCA9IHNvdXJjZU9iamVjdC5VdWlkO1xyXG5cclxuXHRpZiAoc291cmNlT2JqZWN0ID09IHVuZGVmaW5lZCkge1xyXG5cdFx0Y29uc29sZS53YXJuKFwiVW5hYmxlIHRvIHBvc3QgbmV3IGNvZGUgb2JqZWN0LiBObyBzZWxlY3RlZCBzb3VyY2VPYmplY3QuXCIpXHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHQvLyBDb250ZW50X0luc2VydENoaWxkVXVpZFRhYmxlKFV1aWQsIGNoaWxkVGFibGUpXHJcblx0aWYgKHNvdXJjZVV1aWQgIT09IHVuZGVmaW5lZCkge1xyXG5cclxuXHRcdC8vIGxldCBuZXdDb2RlT2JqZWN0ID0gKGF3YWl0IGFnZV9kYmlzV2UuQ29udGVudF9JbnNlcnRDaGlsZFV1aWRUYWJsZShleHRlbnNpb25TdGF0ZUZyb250LmN1cnJlbnRfc291cmNlT2JqZWN0LlV1aWQsICdDb2RlJykpLkNvbnRlbnQ7XHJcblx0XHRsZXQgbmV3Q29kZUNvbnRlbnRPYmplY3QgPSAoYXdhaXQgYWdlX2RiaXMuQ29udGVudEVkZ2VfSW5zZXJ0QWRqYWNlbnRUb1V1aWRJbnRvVGFibGUoc291cmNlVXVpZCwgMSwgJ0NvZGUnLCAnJywgJycsICcvJykpLmNvbnRlbnQ7XHJcblxyXG5cdFx0Ly8gY29uc29sZS5sb2cobmV3VGV4dE9iamVjdClcclxuXHJcblx0XHRuZXdDb2RlQ29udGVudE9iamVjdC5UaXRsZSA9IENvZGVDb250ZW50LnN1YnN0cmluZygwLCAyNSk7XHJcblx0XHRuZXdDb2RlQ29udGVudE9iamVjdC5UeXBlID0gVHlwZTtcclxuXHRcdG5ld0NvZGVDb250ZW50T2JqZWN0LkNvZGVDb250ZW50ID0gQ29kZUNvbnRlbnQ7XHJcblxyXG5cclxuXHRcdGF3YWl0IGFnZV9kYmlzLkNvbnRlbnRfVXBkYXRlV2l0aENvbnRlbnRPYmplY3QobmV3Q29kZUNvbnRlbnRPYmplY3QpO1xyXG5cclxuXHJcblx0XHRhd2FpdCBzb3VyY2UubG9hZFdpdGhDb250ZW50T2JqZWN0KHNvdXJjZU9iamVjdCk7XHJcblx0XHRzb3VyY2UuZm9jdXNPbkxhc3RDaGlsZFJvd1RpdGxlKCk7XHJcblx0fVxyXG5cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gcG9zdE5ld0ZpbGVUb0N1cnJlbnRTb3VyY2VBbmRGdWxsUmVsb2FkT2ZTb3VyY2VDaGlsZHJlbihmaWxlIDogRmlsZSAsIHF1ZXJ5UGFyYW1zIDogYW55ICwgbWltZVR5cGUgOiBzdHJpbmcpIHtcclxuXHJcblx0bGV0IHNvdXJjZU9iamVjdDogYW55ID0gc291cmNlLmdldEN1cnJlbnRTb3VyY2VPYmplY3QoKTtcclxuXHRsZXQgc291cmNlVXVpZCA9IHNvdXJjZU9iamVjdC5VdWlkO1xyXG5cclxuXHRpZiAoc291cmNlT2JqZWN0ID09IHVuZGVmaW5lZCkge1xyXG5cdFx0Y29uc29sZS53YXJuKFwiVW5hYmxlIHRvIHBvc3QgbmV3IGZpbGUuIE5vIHNlbGVjdGVkIHNvdXJjZU9iamVjdC5cIilcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdC8vIGNvbnNvbGUubG9nKHNvdXJjZVV1aWQpXHJcblxyXG5cdC8vIENvbnRlbnRfSW5zZXJ0Q2hpbGRVdWlkVGFibGUoVXVpZCwgY2hpbGRUYWJsZSlcclxuXHRpZiAoc291cmNlVXVpZCAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG5cdFx0Ly8gbGV0IG5ld0ZpbGVPYmplY3QgPSAoYXdhaXQgYWdlX2RiaXNXZS5Db250ZW50X0luc2VydENoaWxkVXVpZFRhYmxlKHNvdXJjZVV1aWQsICdGaWxlJykpLkNvbnRlbnQ7XHJcblx0XHRsZXQgbmV3RmlsZUNvbnRlbnRPYmplY3QgPSAoYXdhaXQgYWdlX2RiaXMuQ29udGVudEVkZ2VfSW5zZXJ0QWRqYWNlbnRUb1V1aWRJbnRvVGFibGUoc291cmNlVXVpZCwgMSwgJ0ZpbGUnLCAnJywgJycsICcvJykpLmNvbnRlbnQ7XHJcblxyXG5cdFx0Ly8gY29uc29sZS5sb2cobmV3VGV4dE9iamVjdClcclxuXHJcblx0XHQvLyBuZXdGaWxlT2JqZWN0LlRpdGxlID0gQ29kZUNvbnRlbnQuc3Vic3RyaW5nKDAsIDI1KTtcclxuXHRcdC8vIG5ld0ZpbGVPYmplY3QuVHlwZSA9IFR5cGU7XHJcblx0XHQvLyBuZXdGaWxlT2JqZWN0LkNvZGVDb250ZW50ID0gQ29kZUNvbnRlbnQ7XHJcblxyXG5cclxuXHRcdC8vIGF3YWl0IGFnZV9kYmlzV2UuQ29udGVudF9VcGRhdGVPbkNvbnRlbnRPYmplY3QobmV3RmlsZU9iamVjdCk7XHJcblx0XHQvLyBhd2FpdCBhZ2VfZGJpc1dlLmZpbGVQb3N0KG5ld0ZpbGVDb250ZW50T2JqZWN0LlV1aWQsIGZpbGUsIHF1ZXJ5UGFyYW1zLCBtaW1lVHlwZSk7XHJcblx0XHRhd2FpdCBhZ2VfZGJpcy5Qb3N0X0ZpbGUobmV3RmlsZUNvbnRlbnRPYmplY3QuVXVpZCwgZmlsZSwgcXVlcnlQYXJhbXMsIG1pbWVUeXBlKTtcclxuXHJcblxyXG5cdFx0Ly8gVE9ETyBVUERBVEUgVVNJTkcgTkVXIFNUUlVDVFVSRVxyXG5cdFx0Ly8gYXdhaXQgZmV0Y2hDdXJyZW50U291cmNlQ2hpbGRyZW5UaGVuV3JpdGVUb1N0YXRlcygpO1xyXG5cdFx0Ly8gcG9wdWxhdGVTb3VyY2VDaGlsZFRhYmxlRnJvbVN0YXRlKCk7XHJcblx0XHRhd2FpdCBzb3VyY2UubG9hZFdpdGhDb250ZW50T2JqZWN0KHNvdXJjZU9iamVjdCk7XHJcblx0XHRzb3VyY2UuZm9jdXNPbkxhc3RDaGlsZFJvd1RpdGxlKCk7XHJcblxyXG5cdFx0Ly8gRm9jdXMgbGFzdCByb3cgdGl0bGUgZm9yIGVhc3kgZWRpdGluZyFcclxuXHRcdC8vIGxldCBfdGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdlX3NvdXJjZUNoaWxkVGFibGUtdGJvZHknKTtcclxuXHRcdC8qIF90Ym9keS5sYXN0RWxlbWVudENoaWxkLmxhc3RFbGVtZW50Q2hpbGQuZm9jdXMoKTsgKi9cclxuXHJcblx0fVxyXG5cdGVsc2Uge1xyXG5cdFx0Y29uc29sZS5sb2coJ05vIHNsZWN0ZWQgc291cmNlLiBDb3VsZG5cInQgUE9TVCBmaWxlLicpXHJcblx0fVxyXG5cclxufVxyXG5cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGtleWRvd25BY3RpdmVFeHRlbnNpb24oa2V5RXZlbnQgOiBLZXlib2FyZEV2ZW50KSB7XHJcblxyXG5cdGxldCBhY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcclxuXHJcblx0aWYgKGFjdGl2ZUVsZW1lbnQuaXNDb250ZW50RWRpdGFibGUpIHtcclxuXHRcdC8vIGNvbnNvbGUubG9nKCdFRElUQUJMRScpXHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHRpZiAoa2V5RXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xyXG5cdFx0c3RvcENsaXBib2FyZFRleHRDb25jYXRlbmF0aW9uKCk7XHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9jbGlwYm9hcmRDb250YWluZXJcIikuY2xhc3NMaXN0LmFkZChcImNvbGxhcHNlZFwiKTtcclxuXHR9XHJcblxyXG5cclxuXHJcblx0aWYgKGtleUV2ZW50LmFsdEtleSkge1xyXG5cclxuXHRcdHN3aXRjaCAoa2V5RXZlbnQua2V5KSB7XHJcblx0XHRcdGNhc2UgJ3AnOlxyXG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKCdBbHQgKyBwJylcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcInRleHRDb25jYXRlbmF0aW9uQ29udGVudCA9IFwiLCB0ZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnQpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSAncic6IC8vIG5ldyBzb3VyY2VcclxuXHRcdFx0XHRwcm9qZWN0LnJlbG9hZEN1cnJlbnRQcm9qZWN0KCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlICduJzogLy8gbmV3IHNvdXJjZVxyXG5cdFx0XHRcdHByb2plY3QuaW5zZXJ0TmV3U291cmNlVG9BY3RpdmVQcm9qZWN0KCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlICdtJzogLy8gbmV3IHNvdXJjZVxyXG5cdFx0XHRcdHByb2plY3QudG9nZ2xlRXh0ZW5zaW9uTG9jYXRpb24oKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgJ3gnOlxyXG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKCdBbHQgKyB4JylcclxuXHRcdFx0XHRsZXQgY2hlY2tlZCA9IGNsaXBib2FyZENvZGVDaGVja2JveC5jaGVja2VkO1xyXG5cdFx0XHRcdGlmIChjaGVja2VkKSB7XHJcblx0XHRcdFx0XHRjbGlwYm9hcmRDb2RlQ2hlY2tib3guY2hlY2tlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdGNsaXBib2FyZENvZGVDaGVja2JveC5jaGVja2VkID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dG9nZ2xlU2VsZWN0Q29kZSgpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSAnWyc6XHJcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coJ0FsdCArIFsnKVxyXG5cdFx0XHRcdHN0YXJ0Q2xpcGJvYXJkVGV4dENvbmNhdGVuYXRpb24oKTtcclxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9jbGlwYm9hcmRDb250YWluZXJcIikuY2xhc3NMaXN0LnJlbW92ZShcImNvbGxhcHNlZFwiKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgJ0VudGVyJzpcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZygnQWx0ICsgRW50ZXInKVxyXG5cdFx0XHRcdGFkZE5ld0xpbmVUb0NhcHR1cmVDb25jYXRlbmF0aW9uQ29udGVudHMoKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSAnLSc6XHJcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coJ0FsdCArIEVudGVyJylcclxuXHRcdFx0XHRhZGRTcGFjZUNoYXJhY3RlclRvQ2FwdHVyZUNvbmNhdGVuYXRpb25Db250ZW50cygpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSAnXSc6IFxyXG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKCdBbHQgKyBdJylcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRzdG9wQ2xpcGJvYXJkVGV4dENvbmNhdGVuYXRpb24oKTtcclxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9jbGlwYm9hcmRDb250YWluZXJcIikuY2xhc3NMaXN0LmFkZChcImNvbGxhcHNlZFwiKTsgXHJcblxyXG5cdFx0XHRcdGlmIChjbGlwYm9hcmRDb2RlQ2hlY2tib3guY2hlY2tlZCkge1xyXG5cdFx0XHRcdFx0YXdhaXQgcG9zdE5ld0NvZGVPYmplY3RUb0N1cnJlbnRTb3VyY2VBbmRGdWxsUmVsb2FkT2ZTb3VyY2VDaGlsZHJlbihjbGlwYm9hcmRUZXh0VHlwZUlucHV0LnZhbHVlLCB0ZXh0Q29uY2F0ZW5hdGlvbkNvbnRlbnQpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0YXdhaXQgcG9zdE5ld1RleHROb2RlVG9DdXJyZW50U291cmNlQW5kRnVsbFJlbG9hZE9mU291cmNlQ2hpbGRyZW4oY2xpcGJvYXJkVGV4dFR5cGVJbnB1dC52YWx1ZSwgdGV4dENvbmNhdGVuYXRpb25Db250ZW50KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblx0aWYgKGtleUV2ZW50LmN0cmxLZXkpIHtcclxuXHJcblx0XHRzd2l0Y2ggKGtleUV2ZW50LmtleSkge1xyXG5cdFx0XHRjYXNlICdgJzpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnQ3RybCArIGAnKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICcvJzpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnQ3RybCArIC8nKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICcuJzpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnQ3RybCArIC4nKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICcsJzpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnQ3RybCArICwnKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdcXFxcJzpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnQ3RybCArIFxcXFwnKVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdcXCcnOlxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdDdHJsICsgXFwnJylcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgJzsnOlxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdDdHJsICsgOycpXHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlICdbJzpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnQ3RybCArIFsnKVxyXG5cclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgJ10nOlxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdDdHJsICsgXScpXHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlU2VsZWN0Q29kZSgpIHtcclxuXHRpZiAoY2xpcGJvYXJkQ29kZUNoZWNrYm94LmNoZWNrZWQpIHtcclxuXHRcdGNsaXBib2FyZFRleHRUeXBlSW5wdXQuZGlzYWJsZWQgPSBmYWxzZTtcclxuXHR9XHJcblx0ZWxzZSB7XHJcblx0XHRjbGlwYm9hcmRUZXh0VHlwZUlucHV0LmRpc2FibGVkID0gdHJ1ZTtcclxuXHR9XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi8vIFRoZSBBbm51bmNpYXRpb24gaXMgYW4gb2lsIHBhaW50aW5nIGJ5IHRoZSBFYXJseSBOZXRoZXJsYW5kaXNoIHBhaW50ZXIgSGFucyBNZW1saW5nLkl0IGRlcGljdHMgdGhlIEFubnVuY2lhdGlvbiwgdGhlIGFyY2hhbmdlbCBHYWJyaWVsJ3MgYW5ub3VuY2VtZW50IHRvIHRoZSBWaXJnaW4gTWFyeSB0aGF0IHNoZSB3b3VsZCBjb25jZWl2ZSBhbmQgYmVjb21lIHRoZSBtb3RoZXIgb2YgSmVzdXMsIGRlc2NyaWJlZCBpbiB0aGUgR29zcGVsIG9mIEx1a2UuIFxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ3NzKCk6IHZvaWQge1xyXG5cdGRvY3VtZW50LmhlYWQuYXBwZW5kKGNsaXBib2FyZENzcyk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQ3NzKCk6IHZvaWQge1xyXG5cdGNsaXBib2FyZENzcy5yZW1vdmUoKTtcclxufSIsIlxuXG5sZXQgYWdlX2FwaVVybCA9ICdodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL3YwMic7XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0KCkgOiB2b2lkIHtcblxuXHRjb25zb2xlLmxvZyhcIkxvYWRlZCBkYmktc2VuZC50c1wiKVxuXHRcbn1cblxuYnJvd3Nlci5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigocmVxdWVzdCkgOiBQcm9taXNlPGFueT4gPT4ge1xuXHRjb25zb2xlLmxvZyhcIk1lc3NhZ2UgcmVjaWV2ZWQgaW4gZGJpLXNlbmQudHMhXCIpO1xuXG5cdGlmIChyZXF1ZXN0Lm5hbWUgPT09IFwic2V0QXBpQmFzZVwiKSB7XG5cdFx0Ly8gY29uc29sZS5sb2coXCIxMTExXCIpXG5cdFx0YWdlX2FwaVVybCA9IHJlcXVlc3QuYXBpQmFzZVN0cmluZztcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgcmVzcG9uc2U6IFwiQXBpIHVwZGF0ZWQgaW4gY29udGVudCBzY3JpcHQuIFtkYmktc2VuZC5qc11cIiwgbmV3QXBpU3RyaW5nOiBhZ2VfYXBpVXJsIH0pO1xuXG5cdH1cblxuXG5cdGlmIChyZXF1ZXN0Lm5hbWUgPT09IFwiZ2V0QXBpQmFzZVwiKSB7XG5cdFx0Ly8gY29uc29sZS5sb2coXCIyMjIyXCIpXG5cdFx0XG5cdFx0Ly8gUHJvbWlzZS5yZXNvbHZlIDogc3RhdGljIG1ldGhvZCB0aGF0IHJldHVybnMgYSByZXNvbHZlZCBQcm9taXNlIG9iamVjdCB3aXRoIHRoZSBnaXZlbiB2YWx1ZVxuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoeyBhcGlTdHJpbmc6IGFnZV9hcGlVcmwgfSk7XG5cblx0fVxuXG59KTtcblxuY2xhc3MgYWdlX2RiaXMge1xuXG5cdC8qIFxuXHRcdENPTlRFTlRcblx0Ki9cblxuXHRzdGF0aWMgYXN5bmMgQ29udGVudF9JbnNlcnRPblRhYmxlKFRhYmxlTmFtZSA6IHN0cmluZykge1xuXHRcdGNvbnN0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnQvQ29udGVudC1JbnNlcnRPblRhYmxlP1RhYmxlPSR7VGFibGVOYW1lfWA7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ1BPU1QnXG5cdFx0fTtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblx0c3RhdGljIGFzeW5jIENvbnRlbnRfU2VsZWN0T25VdWlkKFV1aWQgOiBzdHJpbmcgfCBudW1iZXIpIHtcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudC9Db250ZW50LVNlbGVjdE9uVXVpZD9VdWlkPSR7VXVpZH1gO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cdHN0YXRpYyBhc3luYyBDb250ZW50X1VwZGF0ZVdpdGhDb250ZW50T2JqZWN0KGNvbnRlbnRPYmplY3QgOiBhbnkpIHtcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudC9Db250ZW50LVVwZGF0ZVdpdGhDb250ZW50T2JqZWN0YDtcblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnUFVUJyxcblx0XHRcdGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsIH0sXG5cdFx0XHRib2R5OiBKU09OLnN0cmluZ2lmeShjb250ZW50T2JqZWN0KSxcblx0XHR9O1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiRmV0Y2ggcmV0dXJuZWQgXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIiBmcm9tIFwiICsgdXJsKTtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXHRzdGF0aWMgYXN5bmMgQ29udGVudF9Ecm9wRnVsbE9uVXVpZChVdWlkIDogc3RyaW5nIHwgbnVtYmVyKSB7XG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnQvQ29udGVudC1Ecm9wRnVsbE9uVXVpZD9VdWlkPSR7VXVpZH1gO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdERUxFVEUnLFxuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cdHN0YXRpYyBhc3luYyBDb250ZW50X1NlbGVjdE9uVGl0bGVMaWtlU3RyaW5nKHNlYXJjaFN0cmluZzogc3RyaW5nLCB0YWJsZUxpbWl0OiBzdHJpbmcsIGluY2x1ZGVUYWJsZTogc3RyaW5nLCBvcmRlckNvbHVtbjogc3RyaW5nLCBkZXNjOiBzdHJpbmcpIDogUHJvbWlzZTxhbnk+IHtcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudC9Db250ZW50LVNlbGVjdE9uVGl0bGVMaWtlU3RyaW5nP3NlYXJjaFN0cmluZz0ke3NlYXJjaFN0cmluZ30mdGFibGVMaW1pdD0ke3RhYmxlTGltaXR9JmluY2x1ZGVUYWJsZT0ke2luY2x1ZGVUYWJsZX0mb3JkZXJDb2x1bW49JHtvcmRlckNvbHVtbn0mZGVzYz0ke2Rlc2N9YDtcblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnR0VUJyxcblx0XHR9O1xuXG5cdFx0XG5cdFx0dHJ5IHtcblx0XHRcdGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXHRzdGF0aWMgYXN5bmMgUmV2aWV3X0luc2VydFNjaGVkdWxlT25VdWlkKFV1aWQgOiBzdHJpbmcgfCBudW1iZXIsIHNjaGVkdWxlVHlwZSA6IHN0cmluZ3wgbnVtYmVyKSB7XG5cdFx0Y29uc3QgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudC9SZXZpZXctSW5zZXJ0U2NoZWR1bGVPblV1aWQ/VXVpZD0ke1V1aWR9JnNjaGVkdWxlVHlwZT0ke3NjaGVkdWxlVHlwZX1gO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdQT1NUJ1xuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cdHN0YXRpYyBhc3luYyBSZXZpZXdfU2VsZWN0Q3VycmVudFJldmlldygpIHtcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudC9SZXZpZXctU2VsZWN0Q3VycmVudFJldmlld2A7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0fTtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxuXG5cblxuXG5cdC8qIFxuXHRcdFx0Q09OVEVOVCBFREdFXG5cdCovXG5cdHN0YXRpYyBhc3luYyBDb250ZW50RWRnZV9JbnNlcnRBZGphY2VudFRvVXVpZEludG9UYWJsZShVdWlkOiBzdHJpbmcgfCBudW1iZXIsIERpcmVjdGVkOiBzdHJpbmcgfCBudW1iZXIsIFRhYmxlOiBzdHJpbmcsIFR5cGU6IHN0cmluZywgT3JkZXI6IHN0cmluZyB8IG51bWJlciwgUGF0aDogc3RyaW5nKSB7XG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnRlZGdlL0NvbnRlbnRFZGdlLUluc2VydEFkamFjZW50VG9VdWlkSW50b1RhYmxlP1V1aWQ9JHtVdWlkfSZEaXJlY3RlZD0ke0RpcmVjdGVkfSZUYWJsZT0ke1RhYmxlfSZUeXBlPSR7VHlwZX0mT3JkZXI9JHtPcmRlcn0mUGF0aD0ke1BhdGh9YDtcblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0fTtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblx0c3RhdGljIGFzeW5jIENvbnRlbnRFZGdlX1NlbGVjdENoaWxkT2ZVdWlkKFV1aWQgOiBzdHJpbmcgfCBudW1iZXIpIHtcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudGVkZ2UvQ29udGVudEVkZ2UtU2VsZWN0Q2hpbGRPZlV1aWQ/VXVpZD0ke1V1aWR9YDtcblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnR0VUJyxcblx0XHR9O1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiRmV0Y2ggcmV0dXJuZWQgXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIiBmcm9tIFwiICsgdXJsKTtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGFzeW5jIENvbnRlbnRFZGdlX1NlbGVjdFBhcmVudE9mVXVpZChVdWlkIDogc3RyaW5nIHwgbnVtYmVyKSB7XG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnRlZGdlL0NvbnRlbnRFZGdlLVNlbGVjdFBhcmVudE9mVXVpZD9VdWlkPSR7VXVpZH1gO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cdHN0YXRpYyBhc3luYyBDb250ZW50RWRnZV9TZWxlY3RVbmRpcmVjdGVkT2ZVdWlkKFV1aWQgOiBzdHJpbmcgfCBudW1iZXIpIHtcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvY29udGVudGVkZ2UvQ29udGVudEVkZ2UtU2VsZWN0VW5kaXJlY3RlZE9mVXVpZD9VdWlkPSR7VXVpZH1gO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cdHN0YXRpYyBhc3luYyBDb250ZW50RWRnZV9TZWxlY3RBZGphY2VudE9mVXVpZChVdWlkIDogc3RyaW5nIHwgbnVtYmVyKSB7XG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnRlZGdlL0NvbnRlbnRFZGdlLVNlbGVjdEFkamFjZW50T2ZVdWlkP1V1aWQ9JHtVdWlkfWA7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0fTtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxuXG5cblxuXHQvKiBcblx0XHRcdFx0RklMRVNcblx0Ki9cblxuXHRzdGF0aWMgYXN5bmMgUG9zdF9GaWxlKFV1aWQ6IHN0cmluZyB8IG51bWJlciwgZmlsZTogRmlsZSwgcXVlcnlQYXJhbXM6IHN0cmluZywgbWltZVR5cGU6IHN0cmluZykge1xuXG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2ZpbGUvJHtVdWlkfT9gO1xuXHRcdC8vIGNvbnNvbGUubG9nKHVybClcblxuXG5cdFx0Zm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMocXVlcnlQYXJhbXMpKSB7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhgJHtrZXl9OiAke3ZhbHVlfWApO1xuXHRcdFx0dXJsICs9IGAke2tleX09JHt2YWx1ZX0mYDtcblx0XHRcdC8vIGJvZHlBcnJheS5wdXNoKHZhbHVlKTtcblx0XHR9XG5cdFx0dXJsID0gdXJsLnNsaWNlKDAsIC0xKTtcblxuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XCJDb250ZW50LVR5cGVcIjogbWltZVR5cGUsXG5cdFx0XHR9LFxuXHRcdFx0Ym9keTogZmlsZSxcblx0XHR9O1xuXHRcdC8vIGNvbnNvbGUubG9nKG9wdGlvbnMpXG5cdFx0Ly8gY29uc29sZS5sb2codXJsKVxuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdHJldHVybiBkYXRhO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignRkFJTEVEIFBPU1QgRlJPTTogUG9zdF9GaWxlIGluIGRiaXMnKVxuXHRcdFx0fVxuXHRcdFx0Ly8gY29uc29sZS50YWJsZShkYXRhKTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Ly8gY29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxuXG5cblx0c3RhdGljIGFzeW5jIEdldF9GaWxlKFV1aWQ6IHN0cmluZyB8IG51bWJlcik6IFByb21pc2U8RmlsZSB8IGFueVtdPiB7XG5cblx0XHRjb25zdCB1cmwgPSBhZ2VfYXBpVXJsICsgYC9maWxlL2AgKyBVdWlkO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7IG1ldGhvZDogJ0dFVCcgfTtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHQvLyBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gY29uc29sZS5sb2cocmVzcG9uc2UuYm9keSkgXG5cdFx0XHRsZXQgYmxvYiA9IGF3YWl0IHJlc3BvbnNlLmJsb2IoKVxuXHRcdFx0bGV0IGNvbnRlbnRUeXBlID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpO1xuXHRcdFx0bGV0IGV4dGVuc2lvbiA9IGNvbnRlbnRUeXBlLnNwbGl0KCcvJylbMV07XG5cdFx0XHQvLyBjb25zb2xlLmxvZygnRklMRUZJTEU6JywgcmVzcG9uc2UuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKVxuXHRcdFx0bGV0IGZpbGUgPSBhd2FpdCBuZXcgRmlsZShbYmxvYl0sIGAke1V1aWR9LiR7ZXh0ZW5zaW9ufWApXG5cdFx0XHRyZXR1cm4gZmlsZTtcblx0XHRcdC8vIC50aGVuKGJsb2IgPT4gbmV3IEZpbGUoW2Jsb2JdLCAndGVzdGZpbGVuYW1lLmZpbGUnKSlcblx0XHRcdC8vIC50aGVuKGZpbGUgPT4gZmlsZSlcblx0XHRcdC8vIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSlcblx0XHRcdC8vIC50aGVuKGZpbGUgPT4gVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKSlcblx0XHRcdC8vIC50aGVuKGZpbGUgPT4gVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKSlcblx0XHRcdC8vIC50aGVuKGZpbGVVcmwgPT4gd2luZG93Lm9wZW4oZmlsZVVybCwgJ19ibGFuaycpKVxuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXG5cblxuXG5cdHN0YXRpYyBhc3luYyBQdXRfRmlsZShVdWlkOiBzdHJpbmcgfCBudW1iZXIsIGZpbGU6IEZpbGUsIHF1ZXJ5UGFyYW1zOiBzdHJpbmcsIG1pbWVUeXBlOiBzdHJpbmcpIHtcblxuXHRcdGxldCB1cmwgPSBhZ2VfYXBpVXJsICsgYC9maWxlLyR7VXVpZH0/YDtcblx0XHQvLyBjb25zb2xlLmxvZyh1cmwpXG5cblxuXHRcdGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHF1ZXJ5UGFyYW1zKSkge1xuXHRcdFx0Ly8gY29uc29sZS5sb2coYCR7a2V5fTogJHt2YWx1ZX1gKTtcblx0XHRcdHVybCArPSBgJHtrZXl9PSR7dmFsdWV9JmA7XG5cdFx0XHQvLyBib2R5QXJyYXkucHVzaCh2YWx1ZSk7XG5cdFx0fVxuXHRcdHVybCA9IHVybC5zbGljZSgwLCAtMSk7XG5cblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFwiQ29udGVudC1UeXBlXCI6IG1pbWVUeXBlLFxuXHRcdFx0fSxcblx0XHRcdGJvZHk6IGZpbGUsXG5cdFx0fTtcblx0XHQvLyBjb25zb2xlLmxvZyhvcHRpb25zKVxuXHRcdC8vIGNvbnNvbGUubG9nKHVybClcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRpZiAocmVzcG9uc2Uub2spIHtcblx0XHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdGQUlMRUQgUFVUIEZST006IFB1dF9GaWxlIGluIGRiaXMnKVxuXHRcdFx0fVxuXHRcdFx0Ly8gY29uc29sZS50YWJsZShkYXRhKTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Ly8gY29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxuXG5cblx0c3RhdGljIGFzeW5jIERlbGV0ZV9GaWxlKFV1aWQgOiBzdHJpbmcgfCBudW1iZXIpIHtcblx0XHRsZXQgdXJsID0gYWdlX2FwaVVybCArIGAvZmlsZS8ke1V1aWR9YDtcblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnREVMRVRFJyxcblx0XHR9O1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiRmV0Y2ggcmV0dXJuZWQgXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIiBmcm9tIFwiICsgdXJsKTtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cblxuXG59O1xuXG5leHBvcnQge1xuXHRhZ2VfZGJpcyxcbn0iLCJcbmltcG9ydCB7IHRlc3QgfSBmcm9tIFwiLi9kYmktc2VuZFwiXG50ZXN0KCk7XG5cblxuXG5jb25zdCBodG1sRm9sZGVyID0gJ2h0bWwvJztcbmNvbnN0IGNzc0ZvbGRlciA9ICdjc3MvJztcblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBmZXRjaEh0bWwoZmlsZW5hbWUgOiBzdHJpbmcpIDogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBcbiAgICAgICAgbGV0IHVybCA9IGJyb3dzZXIucnVudGltZS5nZXRVUkwoXG4gICAgICAgICAgICBodG1sRm9sZGVyICsgZmlsZW5hbWVcbiAgICAgICAgKTtcblxuICAgICAgICAvLyB0aGlzIGlzIHRoIGVwcm9taXNlIHRoYXQgd2UgcmV0dXJuIGFuZCBsZXR0aW5nIHRoZSBmZXRjaCBmdW5jdGlvbiBoYW5kbGUgcmVzb2x2aW5nIHRoZSBwcm9taXNlXG4gICAgICAgIHJldHVybiBmZXRjaCh1cmwpXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpXG4gICAgICAgICAgICAudGhlbih0ZXh0ID0+IHRleHQpXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gXCJFcnJvciBpbiAnZmV0Y2hIdG1sJy4gRmlsZTogIGZldGNoZXIudHMgXCIpXG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoQ3NzKGZpbGVuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuXG4gICAgbGV0IHVybCA9IGJyb3dzZXIucnVudGltZS5nZXRVUkwoXG4gICAgICAgIGNzc0ZvbGRlciArIGZpbGVuYW1lXG4gICAgKTtcblxuICAgIC8vIHRoaXMgaXMgdGggZXByb21pc2UgdGhhdCB3ZSByZXR1cm4gYW5kIGxldHRpbmcgdGhlIGZldGNoIGZ1bmN0aW9uIGhhbmRsZSByZXNvbHZpbmcgdGhlIHByb21pc2VcbiAgICByZXR1cm4gZmV0Y2godXJsKVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpXG4gICAgICAgIC50aGVuKHRleHQgPT4gdGV4dClcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IFwiRXJyb3IgaW4gJ2ZldGNoQ3NzJy4gRmlsZTogZmV0Y2hlci50c1wiKVxufVxuXG5cbnR5cGUgVGZldGNoZXIgPSB7XG4gICAgZmV0Y2hIdG1sIDogUHJvbWlzZTxzdHJpbmc+XG59XG5cbmV4cG9ydCB0eXBlIHtcbiAgICBUZmV0Y2hlclxufTtcblxuLy8gZXhwb3J0IHtcbi8vICAgICBmZXRjaEh0bWwgOiBcbi8vIH1cblxuIiwiaW1wb3J0ICogYXMgZmV0Y2hlciBmcm9tIFwiLi9mZXRjaGVyXCI7XG5pbXBvcnQgKiBhcyBwcm9qZWN0cyBmcm9tIFwiLi9wcm9qZWN0cy9wcm9qZWN0c1wiO1xuaW1wb3J0ICogYXMgc291cmNlIGZyb20gXCIuL3NvdXJjZS9zb3VyY2VcIjtcbmltcG9ydCAqIGFzIGNsaXBib2FyZCBmcm9tIFwiLi9jbGlwYm9hcmRcIjtcblxuaW1wb3J0IHsgSFRNTFByb2plY3RDaGlsZFJvdyB9IGZyb20gXCIuL3Byb2plY3RzL3Byb2plY3RfZG9tXCI7XG5cbi8vIGltcG9ydCB7IGFnZV9kYmlzIH0gZnJvbSBcIi4vZGJpLXNlbmRcIjtcblxubGV0IG92ZXJsYXlDb250YWluZXIgOiBFbGVtZW50O1xubGV0IG92ZXJsYXlDc3M6IEhUTUxFbGVtZW50O1xuXG5sZXQgdGFibGVDc3M6IEhUTUxFbGVtZW50O1xuXG4vLyBvdGhlciBjYWNoZWQgZWxlbWVudHNcbmxldCBjb250ZXh0T3ZlcmxheTogRWxlbWVudDtcblxubGV0IHNpZGVQYW5lbDogRWxlbWVudDtcblxuXG5mdW5jdGlvbiBpbml0T3ZlcmxheSgpIDogdm9pZHtcbiAgICBjb25zb2xlLmxvZygnT1ZFUkxBWSBUUyBJTklUJyk7XG5cbiAgICBvdmVybGF5Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgb3ZlcmxheUNvbnRhaW5lci5pZCA9IFwiYWdlX292ZXJsYXlDb250YWluZXJcIjsgXG4gICAgb3ZlcmxheUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJzcGVsbGNoZWNrXCIsXCJmYWxzZVwiKTtcbiAgICBvdmVybGF5Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBleHRlbnNpb25DbGlja0hhbmRsZXIpO1xuICAgIG92ZXJsYXlDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRzb3VyY2VcIiwgKGV2ZW50IDogQ3VzdG9tRXZlbnQpID0+IHtcbiAgICAgICAgc291cmNlLmxvYWRXaXRoQ29udGVudE9iamVjdChldmVudC5kZXRhaWwuY29udGVudE9iamVjdCk7XG4gICAgfSk7XG4gICAgb3ZlcmxheUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibmV3c291cmNlXCIsIChldmVudDogQ3VzdG9tRXZlbnQpID0+IHtcbiAgICAgICAgc291cmNlLmxvYWRXaXRoQ29udGVudE9iamVjdChldmVudC5kZXRhaWwuY29udGVudE9iamVjdCk7XG4gICAgICAgIHNvdXJjZS5zaG93U291cmNlUHJvcGVydGllcygpOyAvLyBNYWtlIHN1cmUgd2UgZ28gdG8gdGhlIHByb3BlcnRpZXMgdGFiIHdoZW4gY3JhdGluZyBhIG5ldyBzb3VyY2UhXG4gICAgfSk7XG4gICAgb3ZlcmxheUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibmV3cHJvamVjdFwiLCAoZXZlbnQ6IEN1c3RvbUV2ZW50KSA9PiB7fSk7XG5cblxuICAgIGZldGNoZXIuZmV0Y2hIdG1sKFwib3ZlcmxheS5odG1sXCIpXG4gICAgICAgIC50aGVuKGh0bWwgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJIVE1MIDogXCIsIGh0bWwpXG4gICAgICAgICAgICBvdmVybGF5Q29udGFpbmVyLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgICAgICBjb250ZXh0T3ZlcmxheSA9IG92ZXJsYXlDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2VfY29udGV4dE92ZXJsYXlcIik7XG4gICAgICAgICAgICAvLyBjb250ZXh0T3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGlkZUNvbnRleHRNZW51cyk7XG4gICAgICAgICAgICBzaWRlUGFuZWwgPSBvdmVybGF5Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX292ZXJsYXlSaWdodFBhbmVsXCIpO1xuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHByb2plY3RzLmluaXRQcm9qZWN0cyhzaWRlUGFuZWwsIGNvbnRleHRPdmVybGF5LnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX21vcmVQcm9qZWN0T3B0aW9uc0NvbnRleHRNZW51XCIpKTsgLy8gUGFzcyB0aGUgY29udGV4dCBtZW51IVxuICAgICAgICAgICAgc291cmNlLmluaXRTb3VyY2VDb250YWluZXIoc2lkZVBhbmVsLCBjb250ZXh0T3ZlcmxheS5xdWVyeVNlbGVjdG9yKFwiI2FnZV9tb3JlU291cmNlT3B0aW9uc0NvbnRleHRNZW51XCIpKTsgLy8gUGFzcyB0aGUgY29udGV4dCBtZW51IVxuICAgICAgICAgICAgY2xpcGJvYXJkLmluaXRDbGlwYm9hcmQoc2lkZVBhbmVsKTtcbiAgICAgICAgfSlcblxuICAgIG92ZXJsYXlDc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gICAgb3ZlcmxheUNzcy5pZCA9IFwiYWdlX292ZXJsYXlTdHlsZVwiO1xuICAgIGZldGNoZXIuZmV0Y2hDc3MoXCJvdmVybGF5LmNzc1wiKVxuICAgIC50aGVuKGNzcyA9PiB7XG4gICAgICAgIG92ZXJsYXlDc3MuaW5uZXJUZXh0ID0gY3NzO1xuICAgIH0pXG5cbiAgICB0YWJsZUNzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgICB0YWJsZUNzcy5pZCA9IFwiYWdlX3RhYmxlU3R5bGVcIjtcbiAgICBmZXRjaGVyLmZldGNoQ3NzKFwidGFibGVzLmNzc1wiKSBcbiAgICAgICAgLnRoZW4oY3NzID0+IHtcbiAgICAgICAgICAgIHRhYmxlQ3NzLmlubmVyVGV4dCA9IGNzcztcbiAgICAgICAgfSlcblxufVxuXG5cblxuZnVuY3Rpb24gZXh0ZW5zaW9uQ2xpY2tIYW5kbGVyKGV2ZW50IDogTW91c2VFdmVudCl7XG5cbiAgICBsZXQgZXZlbnRUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgLy8gY29uc29sZS5sb2coJ19eX15fXl9eX15fXicsIGV2ZW50VGFyZ2V0LmlkKTtcbiAgICBcbiAgICAvKiBcbiAgICAgICAgTk9URTogVEhJUyBIQVMgQkVFTiBNT1ZFRCBUTyBJVFMgT1dOIEVWRU5UIVxuICAgICovXG4gICAgLy8gaWYgKGV2ZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWdlX3Byb2pjaGlsZFRhYmxlUm93XCIpKXtcbiAgICAvLyAgICAgbGV0IHByb2plY3RDaGlsZFJvdyA9IGV2ZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQgYXMgSFRNTFByb2plY3RDaGlsZFJvdztcbiAgICAvLyAgICAgLy8gY29uc29sZS5sb2coJ0NsaWNrZWQgb24gY2hpbGQgcm93IHdpdGggdXVpZCA9ICcsIHByb2plY3RDaGlsZFJvdy5Db250ZW50RWRnZU9iamVjdC5jb250ZW50LlV1aWQpO1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhcIlRPRE86IExPQUQgQ0xJQ0tFRCBTT1VSQ0VTISBcIiwgcHJvamVjdENoaWxkUm93LkNvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnQpO1xuICAgICAgICBcbiAgICAvLyB9XG59XG5cblxuZnVuY3Rpb24gc2hvd092ZXJsYXkoKSA6IHZvaWR7XG4gICAgZG9jdW1lbnQuYm9keS5sYXN0RWxlbWVudENoaWxkLmFmdGVyKG92ZXJsYXlDb250YWluZXIpO1xuXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmQob3ZlcmxheUNzcyk7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmQodGFibGVDc3MpO1xuICAgIHByb2plY3RzLmFwcGVuZENzcygpO1xuICAgIHNvdXJjZS5hcHBlbmRDc3MoKTtcbiAgICBjbGlwYm9hcmQuYXBwZW5kQ3NzKCk7XG4gICAgLy8gZmV0Y2hlci5mZXRjaEh0bWwoXCJvdmVybGF5Lmh0bWxcIilcbiAgICAvLyAgICAgLnRoZW4oaHRtbCA9PiBvdmVybGF5Q29udGFpbmVyLmlubmVySHRtbCA9IGh0bWwpXG59XG5cblxuZnVuY3Rpb24gaGlkZU92ZXJsYXkoKSA6IHZvaWQge1xuICAgIG92ZXJsYXlDb250YWluZXIucmVtb3ZlKCk7XG4gICAgb3ZlcmxheUNzcy5yZW1vdmUoKTtcblxuICAgIHRhYmxlQ3NzLnJlbW92ZSgpO1xuXG4gICAgcHJvamVjdHMucmVtb3ZlQ3NzKCk7XG4gICAgc291cmNlLnJlbW92ZUNzcygpO1xuICAgIGNsaXBib2FyZC5yZW1vdmVDc3MoKTtcbn1cblxuXG5cblxuZXhwb3J0IHtcbiAgICBpbml0T3ZlcmxheSxcbiAgICBzaG93T3ZlcmxheSxcbiAgICBoaWRlT3ZlcmxheSxcbn0iLCJcbmltcG9ydCB7IGFnZV9kYmlzIH0gZnJvbSBcIi4uL2RiaS1zZW5kXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSFRNTFByb2plY3RUYWJsZVJvdyBleHRlbmRzIEhUTUxUYWJsZVJvd0VsZW1lbnQge1xuICAgIG5vZGVPYmplY3Q6IGFueTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSFRNTFRhYmxlQ29udGVudE9iamVjdCBleHRlbmRzIEhUTUxUYWJsZUVsZW1lbnQge1xuICAgIGNvbnRlbnRPYmplY3Q6IGFueTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSFRNTFByb2plY3RDaGlsZFJvdyBleHRlbmRzIEhUTUxUYWJsZVJvd0VsZW1lbnQge1xuICAgIENvbnRlbnRFZGdlT2JqZWN0OiBhbnk7XG4gICAgaXNQcm9qZWN0Q2hpbGRSb3cgOiBib29sZWFuO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBwb3B1bGF0ZVByb3BlcnRpZXNUYWJsZShwcm9wZXJ0aWVzVGFibGU6IEhUTUxUYWJsZUNvbnRlbnRPYmplY3QsIHByb2plY3RDb250ZW50T2JqZWN0OiBhbnkpIHtcblxuICAgIGNvbnNvbGUubG9nKFwicHJvamVjdENvbnRlbnRPYmplY3QgPSBcIiwgcHJvamVjdENvbnRlbnRPYmplY3QpXG5cbiAgICAvLyBsZXQgcHJvamVjdE9iamVjdCA9IGV4dGVuc2lvblN0YXRlRnJvbnQuY3VycmVudF9wcm9qZWN0T2JqZWN0O1xuICAgIGxldCBwcm9qZWN0T2JqZWN0ID0gcHJvamVjdENvbnRlbnRPYmplY3Q7XG5cbiAgICBwcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdCA9IHByb2plY3RDb250ZW50T2JqZWN0O1xuICAgIC8vIHByb3BlcnRpZXNUYWJsZS5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgcHJvamVjdFByb3BlcnR5Rm9jdXNPdXQpXG5cbiAgICAvLyBleHRlbnNpb25TdGF0ZUZyb250LmN1cnJlbnRfcHJvamVjdFV1aWQgPSBwcm9qZWN0T2JqZWN0LlV1aWQ7XG5cbiAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWEtcHJvamVjdFRpdGxlJykudGV4dENvbnRlbnQgPSBwcm9qZWN0T2JqZWN0LlRpdGxlO1xuXG4gICAgLy8gbGV0IHRib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FnZV9wcm9qZWN0UHJvcGVydGllc1RhYmxlLXRib2R5Jyk7XG4gICAgbGV0IHRib2R5ID0gcHJvcGVydGllc1RhYmxlLnF1ZXJ5U2VsZWN0b3IoXCJ0Ym9keVwiKTtcbiAgICB0Ym9keS5pbm5lckhUTUwgPSAnJztcblxuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gcHJvamVjdE9iamVjdCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHtrZXl9OiAke3Byb2plY3RPYmplY3Rba2V5XX1gKTtcbiAgICAgICAgaWYgKGtleSA9PT0gJ1R5cGUnIHx8IGtleSA9PT0gJ1RpdGxlJyB8fCBrZXkgPT09ICdHb2FsJykge1xuXG4gICAgICAgICAgICB0Ym9keS5pbm5lckhUTUwgKz0gYFxuXHRcdFxuXHRcdFx0PHRyPlxuXHRcdFx0XHQ8dGQgaWQ9YWdlX3Byb2pQcm9wVGFibGUtJHtrZXl9LWtleSBjbGFzcz1cImFnZV9lbGVtZW50XCIgPiR7a2V5fTwvdGQ+XG5cdFx0XHRcdDx0ZCBpZD1hZ2VfcHJvalByb3BUYWJsZS0ke2tleX0tdmFsdWUgY2xhc3M9XCJhZ2VfZWxlbWVudFwiIGNvbnRlbnRlZGl0YWJsZT1cInRydWVcIiA+JHtwcm9qZWN0T2JqZWN0W2tleV19PC90ZD5cblx0XHRcdDwvdHI+XG5cdFx0XG5cdFx0YDtcblxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGJvZHkuaW5uZXJIVE1MICs9IGBcblx0XHRcblx0XHRcdDx0cj5cblx0XHRcdFx0PHRkIGlkPWFnZV9wcm9qUHJvcFRhYmxlLSR7a2V5fS1rZXkgY2xhc3M9XCJhZ2VfZWxlbWVudFwiID4ke2tleX08L3RkPlxuXHRcdFx0XHQ8dGQgaWQ9YWdlX3Byb2pQcm9wVGFibGUtJHtrZXl9LXZhbHVlIGNsYXNzPVwiYWdlX2VsZW1lbnRcIj4ke3Byb2plY3RPYmplY3Rba2V5XX08L3RkPlxuXHRcdFx0PC90cj5cblx0XHRcblx0XHRgO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvLyBjb25zb2xlLmxvZyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjYWdlX3Byb2plY3RQcm9wZXJ0aWVzVGFibGUgdGJvZHkgdHInKSlcbiAgICAvLyBsZXQgZWRpdGFibGVQcm9qZWN0UHJvcGVydHlUZHM6IE5vZGVMaXN0T2Y8RWxlbWVudD4gPSB0Ym9keS5xdWVyeVNlbGVjdG9yQWxsKCcuYWdlX2VkaXRhYmxlUHJvamVjdFByb3BlcnR5Jyk7XG4gICAgLy8gY29uc29sZS5sb2coZWRpdGFibGVQcm9qZWN0UHJvcGVydHlUZClcblxuICAgIC8vIEFycmF5LmZyb20oZWRpdGFibGVQcm9qZWN0UHJvcGVydHlUZHMpLmZvckVhY2goKGVkaXRhYmxlUHJvcGVydHlFbGVtZW50KSA9PiB7XG4gICAgLy8gICAgIGVkaXRhYmxlUHJvcGVydHlFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgZWRpdGFibGVQcm9qZWN0UHJvcGVydHlGb2N1c091dClcbiAgICAvLyB9KVxuICAgIC8vIGZvciAobGV0IGVkaXRhYmxlUHJvamVjdFByb3BlcnR5VGQgb2YgZWRpdGFibGVQcm9qZWN0UHJvcGVydHlUZHMpIHtcbiAgICAvLyAgICAgLy8gY29uc29sZS5sb2coZWRpdGFibGVQcm9qZWN0UHJvcGVydHlUZC50ZXh0Q29udGVudCk7XG4gICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKHByb3BlcnR5Um93LnRleHRDb250ZW50Lmxlbmd0aClcblxuICAgIC8vICAgICAvLyBlZGl0YWJsZVByb2plY3RQcm9wZXJ0eVRkLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgcmVhZFByb2plY3RQcm9wZXJ0aWVzRnJvbURvbUFuZFdyaXRlUHV0KVxuICAgIC8vICAgICBlZGl0YWJsZVByb2plY3RQcm9wZXJ0eVRkLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgZWRpdGFibGVQcm9qZWN0UHJvcGVydHlGb2N1c091dClcbiAgICAvLyAgICAgLy8gZWRpdGFibGVQcm9qZWN0UHJvcGVydHlUZC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHBvc3RQcm9qZWN0UHJvcGVydGllcylcbiAgICAvLyB9XG5cbn1cblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBwb3B1bGF0ZUNoaWxkcmVuVGFibGUodGFibGUgOiBIVE1MVGFibGVFbGVtZW50LCBwcm9qZWN0Q2hpbGRDb250ZW50RWRnZXMgOiBhbnkpe1xuXG4gICAgLy8gbGV0IHByb2plY3RDaGlsZENvbnRlbnRFZGdlcyA9IGV4dGVuc2lvblN0YXRlRnJvbnQuY3VycmVudF9wcm9qZWN0Q2hpbGRDb250ZW50RWRnZXM7XG5cbiAgICAvLyBleHRlbnNpb25TdGF0ZUZyb250LmN1cnJlbnRfcHJvamVjdFV1aWQgPSBwcm9qZWN0T2JqZWN0LlV1aWQ7XG5cbiAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWEtcHJvamVjdFRpdGxlJykudGV4dENvbnRlbnQgPSBwcm9qZWN0T2JqZWN0LlRpdGxlO1xuXG5cbiAgICBsZXQgdGJvZHkgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKCd0Ym9keScpO1xuXG4gICAgdGJvZHkuaW5uZXJIVE1MID0gJyc7XG5cbiAgICBmb3IgKGNvbnN0IGNvbnRlbnRFZGdlIG9mIHByb2plY3RDaGlsZENvbnRlbnRFZGdlcykge1xuXG4gICAgICAgIGxldCBuZXdQcm9qZWN0Q2hpbGRSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpIGFzIEhUTUxQcm9qZWN0Q2hpbGRSb3c7XG5cbiAgICAgICAgbmV3UHJvamVjdENoaWxkUm93LmlzUHJvamVjdENoaWxkUm93ID0gdHJ1ZTtcblxuICAgICAgICAvLyBDdXN0b20gZXZlbnQgdG8gc3BlY2lmaWNhbGx5IGxvYWQgdGhlIHNvdXJjZSBmcm9tIHRoZSBvdmVybGF5LXRzIG1vZHVsZVxuICAgICAgICBuZXdQcm9qZWN0Q2hpbGRSb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCA6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICAvLyBodHRwczovL3d3dy5yZWRkaXQuY29tL3Ivd2ViZGV2L2NvbW1lbnRzL3JoZjJtdS9mcmllbmRseV9yZW1pbmRlcl91c2VfZXZlbnRjdXJyZW50dGFyZ2V0X25vdC9cbiAgICAgICAgICAgIGxldCBlbGVtZW50Q3VycmVudFRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQgYXMgSFRNTFByb2plY3RDaGlsZFJvdztcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZXZlbnQuY3VycmVudFRhcmdldCA9IFwiLCBlbGVtZW50Q3VycmVudFRhcmdldClcbiAgICAgICAgICAgIGxldCBsb2Fkc291cmNlRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoIFwibG9hZHNvdXJjZVwiLCB7IFxuICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7Y29udGVudE9iamVjdDogZWxlbWVudEN1cnJlbnRUYXJnZXQuQ29udGVudEVkZ2VPYmplY3QuY29udGVudH0sXG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBfdGhpcyA9IHRoaXMgYXMgSFRNTFByb2plY3RDaGlsZFJvdztcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX3RoaXMgPSBcIiwgX3RoaXMpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJldmVudC50YXJnZXQgPSBcIiwgZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZWxlbWVudEN1cnJlbnRUYXJnZXQuZGlzcGF0Y2hFdmVudChsb2Fkc291cmNlRXZlbnQpO1xuICAgICAgICAgICAgXG4gICAgICAgICB9KVxuXG4gICAgICAgIG5ld1Byb2plY3RDaGlsZFJvdy5pZCA9IGBhZ2VfcHJvamNoaWxkVGFibGVSb3ctJHtjb250ZW50RWRnZS5jb250ZW50LlV1aWR9YDtcbiAgICAgICAgbmV3UHJvamVjdENoaWxkUm93LmNsYXNzTGlzdC5hZGQoXCJhZ2VfcHJvamNoaWxkVGFibGVSb3dcIik7XG4gICAgICAgIG5ld1Byb2plY3RDaGlsZFJvdy5Db250ZW50RWRnZU9iamVjdCA9IGNvbnRlbnRFZGdlO1xuXG4gICAgICAgIG5ld1Byb2plY3RDaGlsZFJvdy5pbm5lckhUTUwgKz0gYFxuXHRcdFxuXHRcdFx0XHQ8dGQgaWQ9YWdlX3Byb2pjaGlsZFRhYmxlLVRhYmxlLSR7Y29udGVudEVkZ2UuY29udGVudC5VdWlkfSBjbGFzcz1cImFnZV9lbGVtZW50XCIgZGF0YS1VdWlkPSR7Y29udGVudEVkZ2UuY29udGVudC5VdWlkfT4ke2NvbnRlbnRFZGdlLmNvbnRlbnQuVGFibGV9PC90ZD5cblx0XHRcdFx0PHRkIGlkPWFnZV9wcm9qY2hpbGRUYWJsZS1UaXRsZS0ke2NvbnRlbnRFZGdlLmNvbnRlbnQuVXVpZH0gY2xhc3M9XCJhZ2VfZWxlbWVudFwiIGRhdGEtVXVpZD0ke2NvbnRlbnRFZGdlLmNvbnRlbnQuVXVpZH0+JHtjb250ZW50RWRnZS5jb250ZW50LlRpdGxlfTwvdGQ+XG5cdFx0XHRcblx0XHRgO1xuXG4gICAgICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBpZD1hZ2VfcHJvamNoaWxkVGFibGVSb3ctJHtub2RlRWRnZS5VdWlkfWApO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBpZD1hZ2VfcHJvamNoaWxkVGFibGVSb3ctJHtub2RlRWRnZS5VdWlkfWApKVxuXG5cbiAgICAgICAgLy8gbmV3UHJvamVjdENoaWxkUm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJvamVjdENoaWxkUm93Q2xpY2tlZClcblxuICAgICAgICB0Ym9keS5hcHBlbmRDaGlsZChuZXdQcm9qZWN0Q2hpbGRSb3cpXG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvcHVsYXRlUHJvamVjdFNlYXJjaFRhYmxlKHByb2plY3RTZWFyY2hUYWJsZSA6IGFueSwgcHJvamVjdE9iamVjdHMgOiBhbnkpOiB2b2lkIHtcbiAgICAvLyBjb25zb2xlLmxvZygnUFJPSkVDVCBUQkFMRSBQT1AnKTtcblxuICAgIC8vIGNoaWxkT2JqZWN0cyA9IGV4dGVuc2lvblN0YXRlRnJvbnQuY3VycmVudF9wcm9qZWN0U2VhcmNoT2JqZWN0cztcblxuICAgIC8vIGxldCBwcm9qZWN0VGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdlX3Byb2plY3RUYWJsZScpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiU1NTU1NTU1NTU1NTU1NTU1MgPSBcIiwgcHJvamVjdE9iamVjdHMubGVuZ3RoKVxuICAgIGxldCB0Ym9keSA9IHByb2plY3RTZWFyY2hUYWJsZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGJvZHknKVswXVxuICAgIC8vIGNvbnNvbGUubG9nKFwidGJvZHkgPSBcIiwgdGJvZHkpO1xuXG4gICAgdGJvZHkuaW5uZXJIVE1MID0gJyc7XG5cbiAgICBmb3IgKGxldCBjaGlsZE9iamVjdCBvZiBwcm9qZWN0T2JqZWN0cykge1xuXG4gICAgICAgIGxldCB0YWJsZVJvd0h0bWwgPSBgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPHRkIGRhdGEtVXVpZD1cIiR7Y2hpbGRPYmplY3QuVXVpZH1cIiBjbGFzcz1cImFnZV9lbGVtZW50IGFnZV9wcm9qZWN0Um93U2VhcmNoRGF0YVwiPiR7Y2hpbGRPYmplY3QuVGFibGV9PC90aD5cbiAgICAgICAgICAgICAgICA8dGQgZGF0YS1VdWlkPVwiJHtjaGlsZE9iamVjdC5VdWlkfVwiIGNsYXNzPVwiYWdlX2VsZW1lbnQgYWdlX3Byb2plY3RSb3dTZWFyY2hEYXRhXCI+JHtjaGlsZE9iamVjdC5UaXRsZX08L3RkPlxuXG4gICAgICAgICAgICBgO1xuICAgICAgICAvLyBsZXQgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgICAgICBsZXQgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpIGFzIEhUTUxQcm9qZWN0VGFibGVSb3c7XG4gICAgICAgIHRyLmlkID0gJ2FnZV9wcm9qZWN0U2VhcmNoUm93LScgKyBjaGlsZE9iamVjdC5VdWlkO1xuICAgICAgICB0ci5jbGFzc0xpc3QuYWRkKCdhZ2VfcHJvamVjdFNlYXJjaFJvdycpO1xuICAgICAgICB0ci5ub2RlT2JqZWN0ID0gY2hpbGRPYmplY3Q7XG4gICAgICAgIC8vIHRyLmRhdGFzZXQuTm9kZSA9IDE7XG4gICAgICAgIC8vIHRyLmRhdGFzZXQuVXVpZCA9IGNoaWxkT2JqZWN0LlV1aWQ7XG4gICAgICAgIC8vIHRyLnNldEF0dHJpYnV0ZSgnZGF0YS1Ob2RlJywgJzEnKTtcbiAgICAgICAgdHIuc2V0QXR0cmlidXRlKCdkYXRhLVV1aWQnLCBjaGlsZE9iamVjdC5VdWlkKTtcbiAgICAgICAgLy8gdHIudGFiSW5kZXggPSAwO1xuICAgICAgICB0ci5pbm5lckhUTUwgPSB0YWJsZVJvd0h0bWw7XG4gICAgICAgIC8vIHRyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tDYWxsYmFjayk7XG4gICAgICAgIC8vIHRyLmNvbnRlbnRFZGl0YWJsZSA9ICdUcnVlJztcblxuICAgICAgICB0Ym9keS5hcHBlbmQodHIpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0cilcbiAgICB9XG5cbn0iLCJpbXBvcnQgKiBhcyBmZXRjaGVyIGZyb20gXCIuLi9mZXRjaGVyXCI7XG5pbXBvcnQgKiBhcyBkb20gZnJvbSBcIi4vcHJvamVjdF9kb21cIjtcbmltcG9ydCB7IEhUTUxQcm9qZWN0VGFibGVSb3csIEhUTUxUYWJsZUNvbnRlbnRPYmplY3QgfSBmcm9tIFwiLi9wcm9qZWN0X2RvbVwiO1xuaW1wb3J0IHthZ2VfZGJpc30gZnJvbSBcIi4uL2RiaS1zZW5kXCI7XG5cblxubGV0IGN1cnJlbnRQcm9qZWN0T2JqZWN0IDogYW55ID0gbnVsbDtcblxubGV0IHNpZGVQYW5lbCA6IEVsZW1lbnQ7XG5sZXQgc2lkZVBhbmVsSXNSaWdodCA6IGJvb2xlYW4gPSB0cnVlO1xuXG5sZXQgcHJvamVjdE1vcmVPcHRpb25zQ29udGV4dE1lbnUgOiBIVE1MRGl2RWxlbWVudDtcblxubGV0IHByb2plY3RDb250YWluZXIgOiBFbGVtZW50O1xubGV0IHByb2plY3RDc3M6IEhUTUxFbGVtZW50O1xuXG5sZXQgcHJvamVjdE1vcmVPcHRpb25zQnV0dG9uIDogSFRNTEVsZW1lbnQ7XG5sZXQgcHJvamVjdE1vcmVPcHRpb25zTWVudTogSFRNTEVsZW1lbnQ7XG5cbmxldCBwcm9qZWN0U2VhcmNoRWxlbWVudCA6IEhUTUxEaXZFbGVtZW50O1xubGV0IHNlYXJjaFN0cmluZ0V4aXN0cyA6IGJvb2xlYW4gPSBmYWxzZTtcblxubGV0IHByb2plY3RTZWFyY2hPYmplY3RzOiBhbnk7XG5sZXQgcHJvamVjdFNlYXJjaFRhYmxlOiBIVE1MVGFibGVFbGVtZW50O1xuXG5sZXQgcHJvamVjdENvbnRlbnRFZGdlQ2hpbGRyZW4gOiBhbnk7XG5sZXQgcHJvamVjdENoaWxkcmVuVGFibGUgOiBIVE1MVGFibGVFbGVtZW50O1xuXG5sZXQgcHJvamVjdFByb3BlcnRpZXNUYWJsZTogSFRNTFRhYmxlQ29udGVudE9iamVjdDtcblxubGV0IHByb2plY3RUaXRsZUVsZW1lbnQgOiBIVE1MRWxlbWVudDtcblxuXG4vLyBpbnRlcmZhY2UgSFRNTFRhYmxlUm93RWxlbWVudCB7XG4vLyAgICAgbm9kZU9iamVjdD86IGFueTtcbi8vIH1cblxuLy8gaW50ZXJmYWNlIEhUTUxQcm9qZWN0VGFibGVSb3cgZXh0ZW5kcyBIVE1MVGFibGVSb3dFbGVtZW50IHtcbi8vICAgICBub2RlT2JqZWN0OiBhbnk7XG4vLyB9XG5cblxuZnVuY3Rpb24gaW5pdFByb2plY3RzKF9zaWRlUGFuZWwgOiBFbGVtZW50LCBfcHJvamVjdE1vcmVPcHRpb25zQ29udGV4dE1lbnUgOiBIVE1MRGl2RWxlbWVudCkgOiB2b2lke1xuICAgIGNvbnNvbGUubG9nKCdPVkVSTEFZIFRTIElOSVQnKTtcblxuICAgIHNpZGVQYW5lbCA9IF9zaWRlUGFuZWw7XG5cbiAgICAvLyBNT1JFIE9QVElPTlMgQ09OVEVYVCBNRU5VXG4gICAgcHJvamVjdE1vcmVPcHRpb25zQ29udGV4dE1lbnUgPSBfcHJvamVjdE1vcmVPcHRpb25zQ29udGV4dE1lbnU7XG4gICAgcHJvamVjdE1vcmVPcHRpb25zQ29udGV4dE1lbnUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrZWRQcm9qZWN0Q29udGV4dE1lbnUpXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGlkZVByb2plY3RDb250ZXh0TWVudSwge2NhcHR1cmU6IGZhbHNlfSk7XG5cbiAgICBwcm9qZWN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcHJvamVjdENvbnRhaW5lci5pZCA9IFwiYWdlX3Byb2plY3RDb250YWluZXJcIjtcbiAgICBwcm9qZWN0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJhZ2VfcGFuZWxDb250YWluZXJcIik7XG4gICAgcHJvamVjdENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdENsaWNrKTtcbiAgICBwcm9qZWN0Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCBwcm9qZWN0UHJvcGVydHlGb2N1c091dCk7XG5cbiAgICBmZXRjaGVyLmZldGNoSHRtbChcInByb2plY3RzLmh0bWxcIilcbiAgICAgICAgLnRoZW4oaHRtbCA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkhUTUwgOiBcIiwgaHRtbClcbiAgICAgICAgICAgIHByb2plY3RDb250YWluZXIuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgICAgIHByb2plY3RUaXRsZUVsZW1lbnQgPSBwcm9qZWN0Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX3Byb2plY3RUaXRsZVwiKTtcbiAgICAgICAgICAgIHByb2plY3RTZWFyY2hUYWJsZSA9IHByb2plY3RDb250YWluZXIucXVlcnlTZWxlY3RvcihcInRhYmxlXCIpO1xuICAgICAgICAgICAgcHJvamVjdENoaWxkcmVuVGFibGUgPSBwcm9qZWN0Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX3Byb2plY3RDaGlsZHJlblRhYmxlXCIpO1xuICAgICAgICAgICAgcHJvamVjdFByb3BlcnRpZXNUYWJsZSA9IHByb2plY3RDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2VfcHJvamVjdFByb3BlcnRpZXNUYWJsZVwiKTtcbiAgICAgICAgICAgIHByb2plY3RTZWFyY2hFbGVtZW50ID0gcHJvamVjdENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiI2FnZV9wcm9qZWN0U2VhcmNoSW5wdXRcIik7XG4gICAgICAgICAgICBwcm9qZWN0U2VhcmNoRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNpblwiLCBzZWFyY2hQcm9qZWN0SW4pO1xuICAgICAgICAgICAgcHJvamVjdFNlYXJjaEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIHNlYXJjaFByb2plY3RPdXQpO1xuXG4gICAgICAgICAgICAvLyBUT0RPIDogZ3JhYiB0aGUgbW9yZSBvcHRpb25zIGNvbnRleHQgbWVudVxuICAgICAgICAgICAgLy8gcHJvamVjdE1vcmVPcHRpb25zTWVudSA9IFxuICAgICAgICAgICAgcHJvamVjdE1vcmVPcHRpb25zQnV0dG9uID0gcHJvamVjdENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiI2FnZV9wcm9qZWN0TW9yZU9wdGlvbnNcIik7XG4gICAgICAgICAgICBsZXQgbW9yZU9wdGlvbnNCYWNrZ3JvdW5kVXJsID0gYnJvd3Nlci5ydW50aW1lLmdldFVSTChcbiAgICAgICAgICAgICAgICBcInJlc291cmNlcy9tb3JlLW9wdGlvbnMucG5nXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBsZXQgYmFja2dyb3VuZFN0cmluZyA9IGB1cmwoJHttb3JlT3B0aW9uc0JhY2tncm91bmRVcmx9KWA7XG4gICAgICAgICAgICBwcm9qZWN0TW9yZU9wdGlvbnNCdXR0b24uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYmFja2dyb3VuZFN0cmluZztcblxuICAgICAgICAgICAgLy8gU2VhcmNoIGljb25cbiAgICAgICAgICAgIGxldCBzZWFyY2hCYWNrZ3JvdW5kVXJsID0gYnJvd3Nlci5ydW50aW1lLmdldFVSTChcbiAgICAgICAgICAgICAgICBcInJlc291cmNlcy9zZWFyY2gtaWNvbi5wbmdcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGxldCBzZWFyY2hCYWNrZ3JvdW5kU3RyaW5nID0gYHVybCgke3NlYXJjaEJhY2tncm91bmRVcmx9KWA7XG4gICAgICAgICAgICBwcm9qZWN0U2VhcmNoRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBzZWFyY2hCYWNrZ3JvdW5kU3RyaW5nO1xuXG4gICAgICAgICAgICBmZXRjaFByb2plY3RTZWFyY2goXCJcIikgLy8gcGVyZm9ybSBzZWFyY2ggb25seSBhZnRlciBndWFyYW50ZWVkIGxvYWRcbiAgICAgICAgICAgICAgICAudGhlbigoY29udGVudE9iamVjdEFycmF5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbnRlbnRPYmplY3RBcnJheSlcbiAgICAgICAgICAgICAgICAgICAgZG9tLnBvcHVsYXRlUHJvamVjdFNlYXJjaFRhYmxlKHByb2plY3RTZWFyY2hUYWJsZSwgcHJvamVjdFNlYXJjaE9iamVjdHMpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0pIFxuICBcbiAgICBwcm9qZWN0Q3NzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgIHByb2plY3RDc3MuaWQgPSBcImFnZV9wcm9qZWN0U3R5bGVcIjtcbiAgICBmZXRjaGVyLmZldGNoQ3NzKFwicHJvamVjdHMuY3NzXCIpXG4gICAgLnRoZW4oY3NzID0+IHtcbiAgICAgICAgcHJvamVjdENzcy5pbm5lclRleHQgPSBjc3M7XG4gICAgfSlcblxuICAgIFxuXG4gICAgY29uc29sZS5sb2coXCJzaWRlUGFuZWwuaWQgPSBcIiwgc2lkZVBhbmVsLmlkKVxuICAgIFxuICAgIHNpZGVQYW5lbC5hcHBlbmQocHJvamVjdENvbnRhaW5lcik7XG5cblxuICAgIFxuICAgIFxuICAgIFxufVxuXG5cblxuXG4vKipcbiAqIEFkZCBuZXcgcHJvamVjdCBvYmplY3QgYW5kXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZU5ld1Byb2plY3QoKSB7XG4gICAgbGV0IG5ld1Byb2plY3RPYmplY3QgPSBhd2FpdCBhZ2VfZGJpcy5Db250ZW50X0luc2VydE9uVGFibGUoXCJQcm9qZWN0XCIpXG4gICAgY3VycmVudFByb2plY3RPYmplY3QgPSBuZXdQcm9qZWN0T2JqZWN0O1xuICAgIC8vIGF3YWl0IGxvYWRQcm9qZWN0V2l0aENvbnRlbnRPYmplY3QobmV3UHJvamVjdE9iamVjdCk7XG4gICAgcmVsb2FkQ3VycmVudFByb2plY3QoKTtcbn1cblxuLyoqXG4gKiAgIFJlbG9hZCB1c2luZyB0aGUgYWxyZWFkeSBzZXQgdmFsdWVzLlxuKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWxvYWRDdXJyZW50UHJvamVjdCgpIHtcbiAgICBhd2FpdCByZWxvYWRDaGlsZHJlblRhYmxlKCk7XG4gICAgYXdhaXQgcmVsb2FkUHJvcGVydGllc1RhYmxlKCk7XG4gICAgYXdhaXQgcmVmcmVzaFByb2plY3RUaXRsZUVsZW1lbnQoKTtcbiAgICBwZXJmb3JtU2VhcmNoKCk7XG59XG5cblxuZnVuY3Rpb24gbG9hZFByb2plY3RXaXRoVXVpZChVdWlkIDogc3RyaW5nIHwgbnVtYmVyKXtcbiAgICBhZ2VfZGJpcy5Db250ZW50X1NlbGVjdE9uVXVpZChVdWlkKVxuICAgICAgICAudGhlbigoY29udGVudE9iamVjdCkgPT4ge1xuICAgICAgICAgICAgbG9hZFByb2plY3RXaXRoQ29udGVudE9iamVjdChjb250ZW50T2JqZWN0KTtcbiAgICAgICAgfSlcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVsb2FkQ2hpbGRyZW5UYWJsZSgpe1xuICAgIGxldCBjb250ZW50RWRnZXMgPSBhd2FpdCBhZ2VfZGJpcy5Db250ZW50RWRnZV9TZWxlY3RDaGlsZE9mVXVpZChjdXJyZW50UHJvamVjdE9iamVjdC5VdWlkKVxuICAgIGRvbS5wb3B1bGF0ZUNoaWxkcmVuVGFibGUocHJvamVjdENoaWxkcmVuVGFibGUsIGNvbnRlbnRFZGdlcyk7XG59XG5hc3luYyBmdW5jdGlvbiByZWxvYWRQcm9wZXJ0aWVzVGFibGUoKSB7XG4gICAgXG4gICAgYWdlX2RiaXMuQ29udGVudF9TZWxlY3RPblV1aWQoY3VycmVudFByb2plY3RPYmplY3QuVXVpZClcbiAgICAgICAgLnRoZW4oKGNvbnRlbnRPYmplY3QpID0+IHtcbiAgICAgICAgICAgIGRvbS5wb3B1bGF0ZVByb3BlcnRpZXNUYWJsZShwcm9qZWN0UHJvcGVydGllc1RhYmxlLCBjb250ZW50T2JqZWN0KTtcbiAgICAgICAgfSkgICBcbn1cbmZ1bmN0aW9uIHJlZnJlc2hQcm9qZWN0VGl0bGVFbGVtZW50KCl7XG4gICAgcHJvamVjdFRpdGxlRWxlbWVudC50ZXh0Q29udGVudCA9IGN1cnJlbnRQcm9qZWN0T2JqZWN0LlRpdGxlO1xufVxuXG5cbmZ1bmN0aW9uIHByb2plY3RQcm9wZXJ0eUZvY3VzT3V0KGV2ZW50OiBGb2N1c0V2ZW50KTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ0ZPQ1VTIE9VVCBQUk9KRUNUIFBST1BFUlRZJyk7XG4gICAgLy8gY29uc29sZS5sb2coXCJldmVudC50YXJnZXQgPSBcIiwgZXZlbnQudGFyZ2V0KTtcbiAgICAvLyBjb25zb2xlLmxvZyhcInRoaXMgPSBcIiwgdGhpcyk7XG5cbiAgICBsZXQgZGF0YUVsZW1lbnQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgLy8gbGV0IHByb2plY3RUYWJsZTogSFRNTFRhYmxlQ29udGVudE9iamVjdCA9IHRoaXM7XG4gICAgXG5cbiAgICAvLyBjb25zb2xlLmxvZygnJywgZXZlbnQudGFyZ2V0LilcbiAgICBzd2l0Y2ggKGRhdGFFbGVtZW50LmlkKSB7XG4gICAgICAgIC8vIFRZUEVcbiAgICAgICAgY2FzZSBcImFnZV9wcm9qUHJvcFRhYmxlLVR5cGUtdmFsdWVcIjpcbiAgICAgICAgICAgIHByb2plY3RQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdC5UeXBlID0gZGF0YUVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgLy8gVElUTEVcbiAgICAgICAgY2FzZSBcImFnZV9wcm9qUHJvcFRhYmxlLVRpdGxlLXZhbHVlXCI6XG4gICAgICAgICAgICBwcm9qZWN0UHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QuVGl0bGUgPSBkYXRhRWxlbWVudC50ZXh0Q29udGVudDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyBHT0FMXG4gICAgICAgIGNhc2UgXCJhZ2VfcHJvalByb3BUYWJsZS1Hb2FsLXZhbHVlXCI6XG4gICAgICAgICAgICBwcm9qZWN0UHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QuR29hbCA9IGRhdGFFbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGFnZV9kYmlzLkNvbnRlbnRfVXBkYXRlV2l0aENvbnRlbnRPYmplY3QocHJvamVjdFByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0KVxuICAgICAgICAudGhlbih1cGRhdGVkQ29udGVudE9iamVjdCA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGRhdGFFbGVtZW50LmlkKSB7XG4gICAgICAgICAgICAgICAgLy8gVFlQRVxuICAgICAgICAgICAgICAgIGNhc2UgXCJhZ2VfcHJvalByb3BUYWJsZS1UeXBlLXZhbHVlXCI6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuYXNzZXJ0KHVwZGF0ZWRDb250ZW50T2JqZWN0LlR5cGUgPT0gcHJvamVjdFByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0LlR5cGUsIFwiJ1BVVCcgY29udGVudCBPYmplY3QgVHlwZSBkb2VzIG5vdCBtYXRjaCB0aGUgcHJvamVjdCB0YWJsZSAuY29udGVudE9iamVjdC5UeXBlICFcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIC8vIFRJVExFXG4gICAgICAgICAgICAgICAgY2FzZSBcImFnZV9wcm9qUHJvcFRhYmxlLVRpdGxlLXZhbHVlXCI6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuYXNzZXJ0KHVwZGF0ZWRDb250ZW50T2JqZWN0LlRpdGxlID09IHByb2plY3RQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdC5UaXRsZSwgXCInUFVUJyBjb250ZW50IE9iamVjdCBUaXRsZSBkb2VzIG5vdCBtYXRjaCB0aGUgcHJvamVjdCB0YWJsZSAuY29udGVudE9iamVjdC5UaXRsZSAhXCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAvLyBHT0FMXG4gICAgICAgICAgICAgICAgY2FzZSBcImFnZV9wcm9qUHJvcFRhYmxlLUdvYWwtdmFsdWVcIjpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5hc3NlcnQodXBkYXRlZENvbnRlbnRPYmplY3QuR29hbCA9PSBwcm9qZWN0UHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QuR29hbCwgXCInUFVUJyBjb250ZW50IE9iamVjdCBHb2FsIGRvZXMgbm90IG1hdGNoIHRoZSBwcm9qZWN0IHRhYmxlIC5jb250ZW50T2JqZWN0LkdvYWwgIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH0pXG4gICAgLy8gbGV0IHByb2plY3RDb250ZW50T2JqZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdFByb3BlcnRpZXNUYWJsZVwiKSBhcyBIVE1MVGFibGVDb250ZW50T2JqZWN0O1xuXG4gICAgLy8gY29uc29sZS5sb2coXCJwcm9qZWN0Q29udGVudE9iamVjdC5jb250ZW50T2JqZWN0ID0gXCIsIHByb2plY3RQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdCk7XG4gICAgY3VycmVudFByb2plY3RPYmplY3QgPSBwcm9qZWN0UHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3Q7XG5cbiAgICByZWZyZXNoUHJvamVjdFRpdGxlRWxlbWVudCgpO1xuXG5cbiAgICAvLyBVcGRhdGUgVGl0bGVzIGluIHRoZSBzZWFyY2hcbiAgICBsZXQgZWxlbWVudFdpdGhTYW1lVXVpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLXV1aWQ9JyR7Y3VycmVudFByb2plY3RPYmplY3QuVXVpZH0nXWApO1xuICAgIGVsZW1lbnRXaXRoU2FtZVV1aWQuZm9yRWFjaCgoX2VsZW1lbnQpID0+IHtcbiAgICAgICAgaWYgKF9lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImFnZV9lbGVtZW50XCIpICYmIF9lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImFnZV9wcm9qZWN0Um93U2VhcmNoRGF0YVwiKSlcbiAgICAgICAgICAgIF9lbGVtZW50LnRleHRDb250ZW50ID0gZGF0YUVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgfSlcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2xpY2tlZFByb2plY3RDb250ZXh0TWVudShldmVudDogTW91c2VFdmVudCl7XG4gICAgbGV0IGV2ZW50VGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgIHN3aXRjaCAoZXZlbnRUYXJnZXQuaWQpIHtcbiAgICAgICAgY2FzZSBcIm5ld1Byb2plY3RCdG5cIjpcbiAgICAgICAgICAgIGF3YWl0IGNyZWF0ZU5ld1Byb2plY3QoKTtcbiAgICAgICAgICAgIHNob3dQcm9qZWN0UHJvcGVydGllcygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJuZXdTb3VyY2VCdG5cIjpcbiAgICAgICAgICAgIGluc2VydE5ld1NvdXJjZVRvQWN0aXZlUHJvamVjdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyZWZyZXNoRXh0ZW5zaW9uXCI6XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCIncmVmcmVzaEV4dGVuc2lvbicgTk9UIEZVTExZIElNUExFTUVOVEVEICEgT05MWSBQUk9KRUNUIElTIFJFRlJFU0hFRFwiKTtcbiAgICAgICAgICAgIHJlbG9hZEN1cnJlbnRQcm9qZWN0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInByaW50Q3VycmVudFByb2plY3RcIjpcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRQcm9qZWN0T2JqZWN0KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGN1cnJlbnRQcm9qZWN0T2JqZWN0KSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm1vdmVFeHRlbnNpb25cIjpcbiAgICAgICAgICAgIHRvZ2dsZUV4dGVuc2lvbkxvY2F0aW9uKCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlRXh0ZW5zaW9uTG9jYXRpb24oKXtcbiAgICAvLyBTaGlmdCBiZXR3ZWVuIGxlZnQgYW5kIHJpZ2h0XG4gICAgaWYgKHNpZGVQYW5lbElzUmlnaHQpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2Vfb3ZlcmxheUNvbnRhaW5lclwiKS5zdHlsZS5qdXN0aWZ5Q29udGVudCA9IFwic3RhcnRcIjtcbiAgICAgICAgc2lkZVBhbmVsSXNSaWdodCA9IGZhbHNlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2Vfb3ZlcmxheUNvbnRhaW5lclwiKS5zdHlsZS5qdXN0aWZ5Q29udGVudCA9IFwiZW5kXCI7XG4gICAgICAgIHNpZGVQYW5lbElzUmlnaHQgPSB0cnVlO1xuICAgIH1cbn1cbiAgICBcbi8vIH1cbi8vIDxidXR0b24gaWQ9XCJyZWZyZXNoRXh0ZW5zaW9uXCIgPiBSZWZyZXNoIGZyb20gc2VydmVyIDwvYnV0dG9uPlxuLy8gICAgIDwgYnV0dG9uIGlkID0gXCJwcmludEN1cnJlbnRQcm9qZWN0XCIgPiBDb3B5IFByb2plY3QgUHJvcGVydGllcyA8L2J1dHRvbj5cbi8vICAgICAgICAgPCBidXR0b24gaWQgPSBcIm1vdmVFeHRlbnNpb25cIiA+IE1vdmUgRXh0ZW5zaW9uIDwvYnV0dG9uPlxuXG5cbi8qKlxuICogQWRkIG5ldyBjaGlsZC1zb3VyY2UsIGZpcmVzIG9mZiB0aGUgbG9hZHNvdXJjZSBDdXRvbUV2ZW50LCBhbmQgdGhlbiByZWxvYWRzIHRoZSBwcm9qZWN0IGNoaWxkIHRhYmxlLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5zZXJ0TmV3U291cmNlVG9BY3RpdmVQcm9qZWN0KCl7XG5cbiAgICBpZiAoY3VycmVudFByb2plY3RPYmplY3QgPT09IHVuZGVmaW5lZCB8fCBjdXJyZW50UHJvamVjdE9iamVjdCA9PT0gbnVsbCl7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk5vIGN1cnJlbnQgUHJvamVjdC4gQ2FuJ3QgYWRkIG5ldyBzb3VyY2UuXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGNvbnRlbnRFZGdlT2JqZWN0OiBhbnkgPSBhd2FpdCBhZ2VfZGJpcy5Db250ZW50RWRnZV9JbnNlcnRBZGphY2VudFRvVXVpZEludG9UYWJsZShjdXJyZW50UHJvamVjdE9iamVjdC5VdWlkLCAxLCAnU291cmNlJywgJycsICcnLCAnLycpXG5cbiAgICAvLyBtYWtlIHN1cmUgd2Ugc2V0IGEgZGVmYXVsdCB1cmwhXG4gICAgbGV0IF9uZXdTb3VyY2VPYmplY3QgPSBjb250ZW50RWRnZU9iamVjdC5jb250ZW50O1xuICAgIF9uZXdTb3VyY2VPYmplY3QuVXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgX25ld1NvdXJjZU9iamVjdC5UaXRsZSA9IGRvY3VtZW50LnRpdGxlO1xuICAgIF9uZXdTb3VyY2VPYmplY3QgPSBhd2FpdCBhZ2VfZGJpcy5Db250ZW50X1VwZGF0ZVdpdGhDb250ZW50T2JqZWN0KF9uZXdTb3VyY2VPYmplY3QpO1xuXG4gICAgLy8gU0VORCBORVcgU09VUkNFIE1FU1NBR0VcbiAgICBsZXQgbmV3c291cmNlRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXCJuZXdzb3VyY2VcIiwge1xuICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICBkZXRhaWw6IHsgY29udGVudE9iamVjdDogX25ld1NvdXJjZU9iamVjdCB9LFxuICAgIH0pO1xuICAgIHByb2plY3RDb250YWluZXIuZGlzcGF0Y2hFdmVudChuZXdzb3VyY2VFdmVudCk7XG4gICAgXG4gICAgLy8gdXBkYXRlIHByb2plY3QgY2hpbGRyZW4gdGFibGVcbiAgICBhZ2VfZGJpcy5Db250ZW50RWRnZV9TZWxlY3RDaGlsZE9mVXVpZChjdXJyZW50UHJvamVjdE9iamVjdC5VdWlkKVxuICAgICAgICAudGhlbigoY29udGVudEVkZ2VzKSA9PiB7XG4gICAgICAgICAgICBkb20ucG9wdWxhdGVDaGlsZHJlblRhYmxlKHByb2plY3RDaGlsZHJlblRhYmxlLCBjb250ZW50RWRnZXMpO1xuICAgICAgICB9KVxuICAgIFxufVxuXG5cbmZ1bmN0aW9uIGhpZGVQcm9qZWN0Q29udGV4dE1lbnUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBsZXQgZXZlbnRUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgLy8gY29uc29sZS5sb2coJ19eX15fXl9eX15fXicsIGV2ZW50VGFyZ2V0LmlkKTtcblxuICAgIGxldCBpc0NvbnRleHRFbGVtZW50OiBib29sZWFuID0gZXZlbnRUYXJnZXQuaWQgPT09IFwiYWdlX21vcmVQcm9qZWN0T3B0aW9uc0NvbnRleHRNZW51XCIgfHwgZXZlbnRUYXJnZXQuaWQgPT09IFwiYWdlX3Byb2plY3RNb3JlT3B0aW9uc1wiO1xuICAgIC8vIGNvbnNvbGUubG9nKCdpc0NvbnRleHRFbGVtZW50ID0gJywgaXNDb250ZXh0RWxlbWVudCk7XG5cbiAgICBpZiAoIWlzQ29udGV4dEVsZW1lbnQpIHtcbiAgICAgICAgbGV0IG9wdGlvbnNDb250ZXh0TWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX21vcmVQcm9qZWN0T3B0aW9uc0NvbnRleHRNZW51XCIpO1xuICAgICAgICBpZiAob3B0aW9uc0NvbnRleHRNZW51ICE9PSBudWxsKVxuICAgICAgICAgICAgb3B0aW9uc0NvbnRleHRNZW51LmNsYXNzTGlzdC5hZGQoXCJhZ2VfZGlzcGxheU5vbmVcIilcbiAgICB9XG59XG5cblxuXG4vKipcbiAqICBNYWluIGNsaWNrIGhhbmRsZXIgaW4gdGhlIHByb2plY3QgY29udGFpbmVyLlxuICogXG4gKiBAcGFyYW0gZXZlbnQgXG4gKi9cblxuZnVuY3Rpb24gcHJvamVjdENsaWNrKGV2ZW50OiBFdmVudCl7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIkNsaWNrIGRldGVjdGVkIGluIHByb2plY3QgY29udGFpbmVyLlwiKTtcbiAgICBsZXQgY2xpY2tUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICBcbi8vIFNFQVJDSCBST1dcbiAgICBpZiAoY2xpY2tUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWdlX3Byb2plY3RSb3dTZWFyY2hEYXRhXCIpKXtcbiAgICAgICAgLy8gZ3JhYiBwYXJlbnQgYmVjYXVzZSB3ZSBjbGlja2VkIG9uIGRhdGEtZWxlbWVudFxuICAgICAgICBsZXQgdGFibGVSb3dUYXJnZXQgPSBjbGlja1RhcmdldC5wYXJlbnRFbGVtZW50IGFzIEhUTUxQcm9qZWN0VGFibGVSb3c7XG4gICAgICAgIGxvYWRQcm9qZWN0V2l0aENvbnRlbnRPYmplY3QodGFibGVSb3dUYXJnZXQubm9kZU9iamVjdCk7XG4gICAgICAgIHNob3dQcm9qZWN0Q2hpbGRyZW4oKTtcbiAgICB9XG4vLyBTRUFSQ0gvQ0hJTERSRU4vUFJPUEVSVElFUyBCVVRUT05cbiAgICBlbHNlIGlmIChcbiAgICAgICAgICAgY2xpY2tUYXJnZXQuaWQgPT0gXCJhZ2VfcHJvamVjdFNlYXJjaEJ1dHRvblwiIFxuICAgICAgICB8fCBjbGlja1RhcmdldC5pZCA9PSBcImFnZV9wcm9qZWN0Q2hpbGRyZW5CdXR0b25cIiBcbiAgICAgICAgfHwgY2xpY2tUYXJnZXQuaWQgPT0gXCJhZ2VfcHJvamVjdFByb3BlcnRpZXNCdXR0b25cIlxuICAgICl7XG4gICAgICAgIC8vIHByb2plY3RTZWFyY2hCdXR0b25DbGlja2VkKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCk7XG4gICAgICAgIHNob3dQcm9qZWN0VGFibGUoY2xpY2tUYXJnZXQuaWQpO1xuICAgIH1cbi8vIE1PUkUgT1BUSU9OUyBCVVRUT05cbiAgICBlbHNlIGlmIChjbGlja1RhcmdldC5pZCA9PSBcImFnZV9wcm9qZWN0TW9yZU9wdGlvbnNcIikge1xuICAgICAgICAvLyBwcm9qZWN0TW9yZU9wdGlvbnNCdXR0b25DbGlja2VkKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCk7XG4gICAgICAgIHRvZ2dsZU1vcmVPcHRpb25zKCk7XG4gICAgfVxuLy8gVElUTEVcbiAgICBlbHNlIGlmIChjbGlja1RhcmdldC5pZCA9PSBcImFnZV9wcm9qZWN0VGl0bGVcIikge1xuICAgICAgICAvLyBUT0dHTEUgUHJvamVjdC9zb3VyY2UgY29udGFpbmVyIGV4cGFuc2lvbnMvY29sbGFwc2VcbiAgICAgICAgbGV0IHByb2plY3RDb250YWluZXJFbGVtZW50IDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0Q29udGFpbmVyXCIpO1xuICAgICAgICBwcm9qZWN0Q29udGFpbmVyRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb2xsYXBzZWRcIikgPyBwcm9qZWN0Q29udGFpbmVyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiY29sbGFwc2VkXCIpIDogcHJvamVjdENvbnRhaW5lckVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImNvbGxhcHNlZFwiKTtcbiAgICAgICAgbGV0IHNvdXJjZUNvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2Vfc291cmNlQ29udGFpbmVyXCIpO1xuICAgICAgICBzb3VyY2VDb250YWluZXJFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImNvbGxhcHNlZFwiKSA/IHNvdXJjZUNvbnRhaW5lckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImNvbGxhcHNlZFwiKSA6IHNvdXJjZUNvbnRhaW5lckVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImNvbGxhcHNlZFwiKTtcblxuICAgIH1cblxuICAgIGVsc2V7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdJZ25vcmVkIFByb2plY3QgQ2xpY2suJyk7XG4gICAgfVxufVxuXG4vKipcbiAqICBsb2FkcyBhbiBleGlzdGluZyBwcm9qZWN0LiBVc3VhbGx5IGZyb20gY2xpY2tpbmcgb24gYSBwcm9qZWN0IGR1cmluZyBzZWFyY2ggT1IgY3JlYXRpbmcgYSBuZXcgcHJvamVjdCBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGxvYWRQcm9qZWN0V2l0aENvbnRlbnRPYmplY3QoX2NvbnRlbnRPYmplY3QgOiBhbnkpe1xuICAgIC8vIFNldCBtb2R1bGUgdmFyaWFibGVcbiAgICBjdXJyZW50UHJvamVjdE9iamVjdCA9IF9jb250ZW50T2JqZWN0O1xuXG4gICAgLy8gc2V0IHRpdGxlXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FnZV9wcm9qZWN0VGl0bGUnKS50ZXh0Q29udGVudCA9IF9jb250ZW50T2JqZWN0LlRpdGxlO1xuXG5cbiAgICBkb20ucG9wdWxhdGVQcm9wZXJ0aWVzVGFibGUocHJvamVjdFByb3BlcnRpZXNUYWJsZSwgX2NvbnRlbnRPYmplY3QpO1xuICAgIC8vIHBvcHVsYXRlIHByb3BlcnRpZXMgdGFibGUgXG4gICAgZmV0Y2hQcm9qZWN0Q2hpbGRyZW4oX2NvbnRlbnRPYmplY3QuVXVpZClcbiAgICAgICAgLnRoZW4oKGNvbnRlbnRFZGdlT2JqZWN0cykgPT4geyBkb20ucG9wdWxhdGVDaGlsZHJlblRhYmxlKHByb2plY3RDaGlsZHJlblRhYmxlLCBwcm9qZWN0Q29udGVudEVkZ2VDaGlsZHJlbikgfVxuICAgICk7XG4gICAgXG4gICAgLy8gc2hvd1Byb2plY3RDaGlsZHJlbigpO1xufVxuXG5mdW5jdGlvbiBzaG93UHJvamVjdENoaWxkcmVuKCl7XG4gICAgLy8gbW92ZSBmb2N1cyB0byB0aGUgY2hpbGRyZW4tdGFiXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdENoaWxkcmVuQnV0dG9uXCIpLmNsaWNrKClcbn1cbmZ1bmN0aW9uIHNob3dQcm9qZWN0UHJvcGVydGllcygpIHtcbiAgICAvLyBtb3ZlIGZvY3VzIHRvIHRoZSBjaGlsZHJlbi10YWJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0UHJvcGVydGllc0J1dHRvblwiKS5jbGljaygpXG59XG5cbmZ1bmN0aW9uIHRvZ2dsZU1vcmVPcHRpb25zKCl7XG4gICAgLy8gY29uc29sZS5sb2coXCJUT0dHTEUgTU9SRSBPUFRJT05TXCIpXG4gICAgbGV0IGJ1dHRvbkJvdW5kaW5nUmVjdCA9IHByb2plY3RNb3JlT3B0aW9uc0J1dHRvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBsZXQgYnRuTGVmdCA9IGJ1dHRvbkJvdW5kaW5nUmVjdC5sZWZ0O1xuICAgIGxldCBidG5SaWdodCA9IGJ1dHRvbkJvdW5kaW5nUmVjdC5yaWdodDtcbiAgICBsZXQgYnRuQm90dG9tID0gYnV0dG9uQm91bmRpbmdSZWN0LmJvdHRvbTtcbiAgICBsZXQgYnRuWCA9IGJ1dHRvbkJvdW5kaW5nUmVjdC54O1xuXG5cbiAgICBwcm9qZWN0TW9yZU9wdGlvbnNDb250ZXh0TWVudS5zdHlsZS50b3AgPSBidG5Cb3R0b20gKyA1ICsgXCJweFwiO1xuICAgIGlmKHNpZGVQYW5lbElzUmlnaHQpe1xuICAgICAgICBcbiAgICAgICAgcHJvamVjdE1vcmVPcHRpb25zQ29udGV4dE1lbnUuc3R5bGUubGVmdCA9IGJ0bkxlZnQgLSAxNzAgICsgXCJweFwiO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBwcm9qZWN0TW9yZU9wdGlvbnNDb250ZXh0TWVudS5zdHlsZS5sZWZ0ID0gYnRuTGVmdCArIFwicHhcIjtcbiAgICB9XG5cbiAgICBwcm9qZWN0TW9yZU9wdGlvbnNDb250ZXh0TWVudS5jbGFzc0xpc3QuY29udGFpbnMoXCJhZ2VfZGlzcGxheU5vbmVcIikgPyBwcm9qZWN0TW9yZU9wdGlvbnNDb250ZXh0TWVudS5jbGFzc0xpc3QucmVtb3ZlKFwiYWdlX2Rpc3BsYXlOb25lXCIpIDogcHJvamVjdE1vcmVPcHRpb25zQ29udGV4dE1lbnUuY2xhc3NMaXN0LmFkZChcImFnZV9kaXNwbGF5Tm9uZVwiKTtcbn1cblxuXG5cbmZ1bmN0aW9uIHNlYXJjaFByb2plY3RJbigpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcInNlYXJjaFByb2plY3RJbigpXCIpXG4gICAgLy8gZm9jdXNQcm9qZWN0U2VhcmNoID0gdHJ1ZTtcbiAgICAvLyBleHRlbnNpb25TdGF0ZUZyb250LnByb2plY3RTZWFyY2hBY3RpdmUgPSB0cnVlO1xuICAgIC8vd3JpdGVTdGF0ZUZyb21Gcm9udCgpO1xuICAgIC8vIGNvbnNvbGUubG9nKCdwcm9qZWN0U2VhcmNoRWxlbWVudC50ZXh0Q29udGVudCA9ICcsIHByb2plY3RTZWFyY2hFbGVtZW50LnRleHRDb250ZW50KTtcbiAgICBcbiAgICAvLyBFbXB0eSBzZWFyY2ggY29udGFpbmVyIGlmIG5vIHByZXZpb3VzIHNlYXJjaCBzdHJpbmcgZXhpc3RzXG4gICAgaWYgKCFzZWFyY2hTdHJpbmdFeGlzdHMpIHtcbiAgICAgICAgcHJvamVjdFNlYXJjaEVsZW1lbnQuaW5uZXJIVE1MID0gJzxkaXY+PGJyPjwvZGl2Pic7IC8vIGRlZmF1bHQgY29udGVudCBvbiAnY29udGVudGVkaXRhYmxlJyBlbGVtZW50cyBcbiAgICAgICAgLy8gc2V0SW50ZXJ2YWwoKCkgPT4geyBzZWFyY2hJbnB1dC5pbm5lckhUTUwgKz0gJzxicj4nIH0sIDUwKTtcbiAgICB9XG4gICAgc2VhcmNoU3RyaW5nRXhpc3RzID0gdHJ1ZTtcbiAgICAvLyBjb25zb2xlLmxvZygnZm9jdXMgc2VhcmNoICcpXG4gICAgLy8gcHJvamVjdFNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywga2V5UHJlc3NEdXJpbmdTZWFyY2gpXG4gICAgcHJvamVjdFNlYXJjaEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleURvd25EdXJpbmdTZWFyY2gpXG4gICAgLy8ga2V5RG93bkR1cmluZ1NlYXJjaCgpO1xufVxuXG5cbmZ1bmN0aW9uIHNlYXJjaFByb2plY3RPdXQoKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ3NlYXJjaFByb2plY3RPdXQoKScpO1xuICAgIFxuICAgIGxldCBzZWFyY2hTdHJpbmdMZW5ndGggPSBwcm9qZWN0U2VhcmNoRWxlbWVudC50ZXh0Q29udGVudC5sZW5ndGg7XG4gICAgaWYoc2VhcmNoU3RyaW5nTGVuZ3RoID09PSAwKXtcbiAgICAgICAgc2VhcmNoU3RyaW5nRXhpc3RzID0gZmFsc2U7XG4gICAgICAgIHByb2plY3RTZWFyY2hFbGVtZW50LmlubmVySFRNTCA9ICc8ZGl2PlEgIDogIFNlYXJjaCAuIC4gLjxicj48L2Rpdj4nO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBzZWFyY2hTdHJpbmdFeGlzdHMgPSB0cnVlO1xuICAgIH1cbiAgICBwcm9qZWN0U2VhcmNoRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5RG93bkR1cmluZ1NlYXJjaClcbn1cblxuXG4vLyBQZXJmb3JtIHNlYXJjaCB3aXRoIHNsaWdodCBkZWxheSB0byBtYWtlIHN1cmUgbmV3IGlucHV0IGlzIHdyaXR0ZW4gdG8gY29udGVudEVkaXRhbmxlIGlucHV0XG5hc3luYyBmdW5jdGlvbiBrZXlEb3duRHVyaW5nU2VhcmNoKGV2ZW50IDogS2V5Ym9hcmRFdmVudCkge1xuICAgIFxuICAgIC8vIFVzZXIganVzdCBkZWxldGVkIHRoZSBsYXN0IGNoYXJhY3RlciBzbyB3ZSByZXNldCB0aGUgZGVmYXVsdCBjb250ZW50ZWRpdGFibGUgZWxtZW50IHN0cnVjdHVyZVxuICAgIC8vIGlmIHdlIGNvbid0IGRvIHRoaXMgdGhlIHVzZXIgd2lsbCBpbmFkdmVydGllZGx5IHJlbW92ZSB0aGUgY29udGFpbmluZyA8ZGl2PiwgYnJlYWtpbmcgdGhlIHR5cGluZy1iZWhhdmlvdXIhXG4gICAgaWYgKGV2ZW50LmtleSA9PT0gXCJCYWNrc3BhY2VcIiAmJiBwcm9qZWN0U2VhcmNoRWxlbWVudC50ZXh0Q29udGVudC5sZW5ndGggPT09IDEpe1xuICAgICAgICBjb25zb2xlLmxvZygnTGFzdCBjaGFyYWN0ZXIgZGVsZXRpb24gcHJvdGVjdGlvbiEnKTtcbiAgICAgICAgcHJvamVjdFNlYXJjaEVsZW1lbnQuaW5uZXJIVE1MID0gJzxkaXY+PGJyPjwvZGl2Pic7IC8vIGRlZmF1bHQgY29udGVudCBvbiAnY29udGVudGVkaXRhYmxlJyBlbGVtZW50cyBcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgXG4gICAgLy8gVGhpcyBkb2VzIG5vdCBwcmV2ZW50IGEgcmVxdWVzdCBvbiBlYWNoIGtleXN0cm9rZVxuICAgIC8vIEJVVCBpdCBlbmFibGVzIHJlYWRpbmcgdGhlIGNoYW5nZSBvZiBlYWNoIGtleXN0cm9rZS4gV2hlbiB0aGlzIG1ldGhvZCBpcyBjYWxsZWQgdGhlIHRleHRDb250ZW50IG9mIHRoZSBzZXJhY2ggYm94IGhhcyBub3QgYmVlbiB1cGRhdGVkISFcbiAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcblxuICAgICAgICBwZXJmb3JtU2VhcmNoKCk7XG5cbiAgICB9LCAxMDApO1xuXG59XG5cbmZ1bmN0aW9uIHBlcmZvcm1TZWFyY2goKXtcbiAgICBsZXQgc2VhcmNoU3RyaW5nIDogc3RyaW5nID0gXCJcIjtcbiAgICBpZihzZWFyY2hTdHJpbmdFeGlzdHMpXG4gICAgICAgIHNlYXJjaFN0cmluZyA9IHByb2plY3RTZWFyY2hFbGVtZW50LnRleHRDb250ZW50O1xuICAgIGVsc2VcbiAgICAgICAgc2VhcmNoU3RyaW5nID0gXCJcIjtcblxuICAgIC8vIGNvbnNvbGUubG9nKFwiU2VhcmNoaW5nIHdpdGggc2VhcmNoc3RyaWduID0gXCIsIHNlYXJjaFN0cmluZylcbiAgICBmZXRjaFByb2plY3RTZWFyY2goc2VhcmNoU3RyaW5nKVxuICAgICAgICAudGhlbigoY29udGVudE9iamVjdEFycmF5KSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjb250ZW50T2JqZWN0QXJyYXkpXG4gICAgICAgICAgICBkb20ucG9wdWxhdGVQcm9qZWN0U2VhcmNoVGFibGUocHJvamVjdFNlYXJjaFRhYmxlLCBjb250ZW50T2JqZWN0QXJyYXkpO1xuICAgICAgICB9KVxufVxuXG5cbmZ1bmN0aW9uIHNob3dQcm9qZWN0VGFibGUoYnV0dG9uSWQgOiBzdHJpbmcpe1xuICAgIC8vIGFnZV9wcm9qZWN0QnV0dG9uT25cblxuICAgIC8vIFNlYXJjaCBib3hcbiAgICBsZXQgc2VhcmNoQm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdFNlYXJjaElucHV0XCIpO1xuICAgIHNlYXJjaEJveC5jbGFzc0xpc3QuYWRkKFwiYWdlX2Rpc3BsYXlOb25lXCIpO1xuXG4gICAgLy8gUmVzZXQgdGhlIGJ1dHRvbnNcbiAgICBsZXQgc2VhcmNoQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdFNlYXJjaEJ1dHRvblwiKVxuICAgIGxldCBjaGlsZHJlbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3Byb2plY3RDaGlsZHJlbkJ1dHRvblwiKVxuICAgIGxldCBwcm9wZXJ0aWVzQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdFByb3BlcnRpZXNCdXR0b25cIilcbiAgICBzZWFyY2hCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFnZV9wcm9qZWN0QnV0dG9uT25cIik7XG4gICAgY2hpbGRyZW5CdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFnZV9wcm9qZWN0QnV0dG9uT25cIik7XG4gICAgcHJvcGVydGllc0J1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWdlX3Byb2plY3RCdXR0b25PblwiKTtcblxuICAgIC8vIFJlc2V0IHRoZSBUYWJsZXNcbiAgICBsZXQgc2VhcmNoVGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0U2VhcmNoVGFibGVcIik7XG4gICAgbGV0IGNoaWxkcmVuVGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0Q2hpbGRyZW5UYWJsZVwiKTtcbiAgICBsZXQgcHJvcGVydGllc1RhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdFByb3BlcnRpZXNUYWJsZVwiKTtcbiAgICBzZWFyY2hUYWJsZS5jbGFzc0xpc3QuYWRkKFwiYWdlX2Rpc3BsYXlOb25lXCIpO1xuICAgIGNoaWxkcmVuVGFibGUuY2xhc3NMaXN0LmFkZChcImFnZV9kaXNwbGF5Tm9uZVwiKTtcbiAgICBwcm9wZXJ0aWVzVGFibGUuY2xhc3NMaXN0LmFkZChcImFnZV9kaXNwbGF5Tm9uZVwiKTtcblxuICAgIC8vIEFjdGl2ZSB0aGUgY29ycmVjdCBvbmVcbiAgICBpZiAoYnV0dG9uSWQgPT09IFwiYWdlX3Byb2plY3RTZWFyY2hCdXR0b25cIil7XG4gICAgICAgIHNlYXJjaFRhYmxlLmNsYXNzTGlzdC5yZW1vdmUoXCJhZ2VfZGlzcGxheU5vbmVcIik7XG4gICAgICAgIHNlYXJjaEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWdlX3Byb2plY3RCdXR0b25PblwiKTtcbiAgICAgICAgc2VhcmNoQm94LmNsYXNzTGlzdC5yZW1vdmUoXCJhZ2VfZGlzcGxheU5vbmVcIik7XG4gICAgfVxuICAgIGVsc2UgaWYgKGJ1dHRvbklkID09PSBcImFnZV9wcm9qZWN0Q2hpbGRyZW5CdXR0b25cIil7XG4gICAgICAgIGNoaWxkcmVuVGFibGUuY2xhc3NMaXN0LnJlbW92ZShcImFnZV9kaXNwbGF5Tm9uZVwiKTtcbiAgICAgICAgY2hpbGRyZW5CdXR0b24uY2xhc3NMaXN0LmFkZChcImFnZV9wcm9qZWN0QnV0dG9uT25cIik7XG4gICAgfVxuICAgIGVsc2UgaWYgKGJ1dHRvbklkID09PSBcImFnZV9wcm9qZWN0UHJvcGVydGllc0J1dHRvblwiKXtcbiAgICAgICAgcHJvcGVydGllc1RhYmxlLmNsYXNzTGlzdC5yZW1vdmUoXCJhZ2VfZGlzcGxheU5vbmVcIik7XG4gICAgICAgIHByb3BlcnRpZXNCdXR0b24uY2xhc3NMaXN0LmFkZChcImFnZV9wcm9qZWN0QnV0dG9uT25cIik7XG4gICAgfVxuICAgIFxufVxuXG4vLyBmdW5jdGlvbiBwcm9qZWN0VGl0bGVDbGlja2VkKHRhYmxlUm93OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuLy8gICAgIGNvbnNvbGUubG9nKFwiUHJvamVjdCB0aXRsZSBjbGlja2VkOiBcIiwgdGFibGVSb3cpXG4vLyB9XG4vLyBmdW5jdGlvbiBwcm9qZWN0U2VhcmNoQnV0dG9uQ2xpY2tlZCh0YWJsZVJvdzogSFRNTEVsZW1lbnQpIDogdm9pZCB7XG4vLyAgICAgY29uc29sZS5sb2coXCJQcm9qZWN0IHNlYXJjaCBjbGlja2VkOiBcIiwgdGFibGVSb3cpXG4vLyB9XG4vLyBmdW5jdGlvbiBwcm9qZWN0Q2hpbGRyZW5CdXR0b25DbGlja2VkKHRhYmxlUm93OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuLy8gICAgIGNvbnNvbGUubG9nKFwiUHJvamVjdCBjaGlsZHJlbiBjbGlja2VkOiBcIiwgdGFibGVSb3cpXG4vLyB9XG4vLyBmdW5jdGlvbiBwcm9qZWN0UHJvcGVydGllc0J1dHRvbkNsaWNrZWQodGFibGVSb3c6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4vLyAgICAgY29uc29sZS5sb2coXCJQcm9qZWN0IHByb3BlcnRpZXMgY2xpY2tlZDogXCIsIHRhYmxlUm93KVxuLy8gfVxuLy8gZnVuY3Rpb24gcHJvamVjdE1vcmVPcHRpb25zQnV0dG9uQ2xpY2tlZCh0YWJsZVJvdzogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbi8vICAgICBjb25zb2xlLmxvZyhcIlByb2plY3Qgb3B0aW9ucyBjbGlja2VkOiBcIiwgdGFibGVSb3cpXG4vLyB9XG4vLyBmdW5jdGlvbiBwcm9qZWN0U2VhcmNoUm93Q2xpY2tlZCh0YWJsZVJvdzogSFRNTFByb2plY3RUYWJsZVJvdyk6IHZvaWQge1xuLy8gICAgIGNvbnNvbGUubG9nKFwiVGFibGUgcm93IGNsaWNrZWQ6IFwiLCB0YWJsZVJvdylcbi8vIH1cblxuXG5mdW5jdGlvbiBmZXRjaFByb2plY3RTZWFyY2goc2VhcmNoU3RyaW5nIDogc3RyaW5nKSA6IFByb21pc2U8YW55PntcbiAgICByZXR1cm4gYWdlX2RiaXMuQ29udGVudF9TZWxlY3RPblRpdGxlTGlrZVN0cmluZyhzZWFyY2hTdHJpbmcsIFwiNTBcIiwgXCJQcm9qZWN0XCIsIFwiXCIsIFwiXCIpXG4gICAgICAgIC50aGVuKChjb250ZW50T2JqZWN0QXJyYXk6IGFueSkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY29udGVudE9iamVjdEFycmF5KTtcbiAgICAgICAgICAgIHByb2plY3RTZWFyY2hPYmplY3RzID0gY29udGVudE9iamVjdEFycmF5O1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjb250ZW50T2JqZWN0QXJyYXkpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yIDogRXJyb3IpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xuICAgICAgICB9KVxufVxuXG5mdW5jdGlvbiBmZXRjaFByb2plY3RDaGlsZHJlbihVdWlkIDogc3RyaW5nIHwgbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gYWdlX2RiaXMuQ29udGVudEVkZ2VfU2VsZWN0Q2hpbGRPZlV1aWQoVXVpZClcbiAgICAgICAgLnRoZW4oKGNvbnRlbnRFZGdlT2JqZWN0QXJyYXk6IGFueSkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY29udGVudE9iamVjdEFycmF5KTtcbiAgICAgICAgICAgIHByb2plY3RDb250ZW50RWRnZUNoaWxkcmVuID0gY29udGVudEVkZ2VPYmplY3RBcnJheTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwcm9qZWN0Q29udGVudEVkZ2VDaGlsZHJlbiA9ICcsIHByb2plY3RDb250ZW50RWRnZUNoaWxkcmVuKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwcm9qZWN0Q29udGVudEVkZ2VDaGlsZHJlbik7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3I6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtcbiAgICAgICAgfSlcbn1cblxuZnVuY3Rpb24gYXBwZW5kQ3NzKCkgOiB2b2lke1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kKHByb2plY3RDc3MpO1xufVxuXG5cbmZ1bmN0aW9uIHJlbW92ZUNzcygpIDogdm9pZCB7XG4gICAgcHJvamVjdENzcy5yZW1vdmUoKTtcbn1cblxuXG5cblxuZXhwb3J0IHtcbiAgICBpbml0UHJvamVjdHMsXG4gICAgYXBwZW5kQ3NzLFxuICAgIHJlbW92ZUNzcyxcbn0iLCJpbXBvcnQgKiBhcyBmZXRjaGVyIGZyb20gXCIuLi9mZXRjaGVyXCI7XG5pbXBvcnQgeyBIVE1MUHJvamVjdFRhYmxlUm93LCBIVE1MVGFibGVDb250ZW50T2JqZWN0IH0gZnJvbSBcIi4vc291cmNlX2RvbVwiO1xuaW1wb3J0IHsgYWdlX2RiaXMgfSBmcm9tIFwiLi4vZGJpLXNlbmRcIjtcblxuXG5cbmxldCBzaWRlUGFuZWw6IEVsZW1lbnQ7XG5cbmxldCBzb3VyY2VUaXRsZUVsZW1lbnQgOiBIVE1MRWxlbWVudDtcblxubGV0IHNvdXJjZUNoaWxkcmVuQnV0dG9uIDogSFRNTEVsZW1lbnQ7XG5sZXQgc291cmNlUHJvcGVydGllc0J1dHRvbiA6IEhUTUxFbGVtZW50O1xuXG5sZXQgc291cmNlQ29udGFpbmVyOiBFbGVtZW50O1xubGV0IHNvdXJjZUNzczogSFRNTEVsZW1lbnQ7XG5cbmxldCBzb3VyY2VDaGlsZHJlblRhYmxlOiBIVE1MVGFibGVFbGVtZW50O1xubGV0IHByb2plY3RDb250ZW50RWRnZUNoaWxkcmVuOiBhbnk7XG5cbmxldCBzb3VyY2VQcm9wZXJ0aWVzVGFibGU6IEhUTUxUYWJsZUNvbnRlbnRPYmplY3Q7XG5cbiBcbmxldCBjdXJyZW50U291cmNlT2JqZWN0OiBhbnk7XG5sZXQgY3VycmVudFNvdXJjZVV1aWQ6IGFueTsgXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFNvdXJjZU9iamVjdCgpOiBhbnkgeyByZXR1cm4gc291cmNlUHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3R9O1xuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRTb3VyY2VVdWlkKCk6IGFueSB7IHJldHVybiBjdXJyZW50U291cmNlVXVpZCB9O1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0U291cmNlQ29udGFpbmVyKF9zaWRlUGFuZWw6IEVsZW1lbnQsIF9zb3VyY2VNb3JlT3B0aW9uc0NvbnRleHRNZW51OiBIVE1MRGl2RWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdpbml0U291cmNlQ29udGFpbmVyKC4uLiknKTtcblxuICAgIHNpZGVQYW5lbCA9IF9zaWRlUGFuZWw7XG5cbiAgICBzb3VyY2VDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzb3VyY2VDb250YWluZXIuaWQgPSBcImFnZV9zb3VyY2VDb250YWluZXJcIjtcbiAgICBzb3VyY2VDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImFnZV9wYW5lbENvbnRhaW5lclwiLCBcImNvbGxhcHNlZFwiKTtcbiAgICBzb3VyY2VDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrZWRTb3VyY2VDb250YWluZXIpO1xuICAgIC8vIHNvdXJjZUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgc291cmNlUHJvcGVydHlGb2N1c2VkT3V0KTtcbiAgICBzb3VyY2VDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIHNvdXJjZUZvY3VzT3V0KTtcbiAgICBcblxuICAgIGZldGNoZXIuZmV0Y2hIdG1sKFwic291cmNlLmh0bWxcIilcbiAgICAgICAgLnRoZW4oaHRtbCA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkhUTUwgOiBcIiwgaHRtbClcbiAgICAgICAgICAgIHNvdXJjZUNvbnRhaW5lci5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgICAgICAgc291cmNlVGl0bGVFbGVtZW50ID0gc291cmNlQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX3NvdXJjZVRpdGxlXCIpO1xuICAgICAgICAgICAgc291cmNlQ2hpbGRyZW5UYWJsZSA9IHNvdXJjZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiI2FnZV9zb3VyY2VDaGlsZFRhYmxlXCIpO1xuICAgICAgICAgICAgc291cmNlUHJvcGVydGllc1RhYmxlID0gc291cmNlQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX3NvdXJjZVByb3BlcnRpZXNUYWJsZVwiKTtcblxuICAgICAgICAgICAgc291cmNlQ2hpbGRyZW5CdXR0b24gPSBzb3VyY2VDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2Vfc291cmNlU2VhcmNoQnV0dG9uXCIpO1xuICAgICAgICAgICAgc291cmNlUHJvcGVydGllc0J1dHRvbiA9IHNvdXJjZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiI2FnZV9zb3VyY2VQcm9wZXJ0aWVzQnV0dG9uXCIpO1xuICAgICAgICB9KVxuXG4gICAgc291cmNlQ3NzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgIHNvdXJjZUNzcy5pZCA9IFwiYWdlX3NvdXJjZVN0eWxlXCI7XG4gICAgZmV0Y2hlci5mZXRjaENzcyhcInNvdXJjZS5jc3NcIilcbiAgICAgICAgLnRoZW4oY3NzID0+IHtcbiAgICAgICAgICAgIHNvdXJjZUNzcy5pbm5lclRleHQgPSBjc3M7XG4gICAgICAgIH0pXG5cblxuICAgIHNpZGVQYW5lbC5hcHBlbmQoc291cmNlQ29udGFpbmVyKTtcblxufVxuXG5mdW5jdGlvbiBzb3VyY2VGb2N1c091dChldmVudCA6IEZvY3VzRXZlbnQpe1xuICAgIGxldCBmb2N1c291dFRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICBpZiAoZm9jdXNvdXRUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWdlX3NvdXJjZUNoaWxkVGFibGUtVGl0bGVcIikpe1xuICAgICAgICBzb3VyY2VDaGlsZFRpdGxlRm9jdXNlZE91dChmb2N1c291dFRhcmdldCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGZvY3Vzb3V0VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImFnZV9zb3VyY2VQcm9wVmFsdWVcIikpe1xuICAgICAgICBzb3VyY2VQcm9wZXJ0eUZvY3VzZWRPdXQoZm9jdXNvdXRUYXJnZXQpO1xuICAgIH1cblxuICAgIC8vIHN3aXRjaCAoZm9jdXNvdXRUYXJnZXQuaWQpIHtcbiAgICAvLyAgICAgY2FzZSBcImFlLXNvdXJjZUNoaWxkVGFibGUtVGl0bGVcIjpcbiAgICAvLyAgICAgICAgIHNvdXJjZUNoaWxkVGl0bGVGb2N1c2VkT3V0KGZvY3Vzb3V0VGFyZ2V0KTtcbiAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgIC8vICAgICAvLyBhZ2Vfc291cmNlUHJvcFRhYmxlXG4gICAgLy8gICAgIGNhc2UgXCJhZ2Vfc291cmNlUHJvcFRhYmxlLVRpdGxlLXZhbHVlXCI6XG4gICAgLy8gICAgIGNhc2UgXCJhZ2Vfc291cmNlUHJvcFRhYmxlLVR5cGUtdmFsdWVcIjpcbiAgICAvLyAgICAgY2FzZSBcImFnZV9zb3VyY2VQcm9wVGFibGUtVXVpZC12YWx1ZVwiOlxuICAgIC8vICAgICBjYXNlIFwiYWdlX3NvdXJjZVByb3BUYWJsZS1JQW1Tb3VyY2UtdmFsdWVcIjpcbiAgICAvLyAgICAgICAgIHNvdXJjZVByb3BlcnR5Rm9jdXNlZE91dChmb2N1c291dFRhcmdldCk7XG4gICAgLy8gICAgICAgICBicmVhaztcbiAgICAvLyAgICAgZGVmYXVsdDpcbiAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgIC8vIH1cbn1cblxuZnVuY3Rpb24gc291cmNlQ2hpbGRUaXRsZUZvY3VzZWRPdXQoZGF0YUVsZW1lbnQgOiBIVE1MRWxlbWVudCkge1xuICAgIGxldCBzb3VyY2VDaGlsZFJvdyA9IGRhdGFFbGVtZW50LnBhcmVudEVsZW1lbnQgYXMgSFRNTFByb2plY3RUYWJsZVJvdztcbiAgICAvLyBjb25zb2xlLmxvZygnRk9DVVMgT1VUIFNPVVJDRSBDSElMRCcpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiZXZlbnQudGFyZ2V0ID0gXCIsIGV2ZW50LnRhcmdldCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJ0aGlzID0gXCIsIHRoaXMpO1xuXG4gICAgLy8gY29uc29sZS5sb2coJ2RhdGFFbGVtZW50LnRleHRDb250ZW50ID0gJywgZGF0YUVsZW1lbnQudGV4dENvbnRlbnQpO1xuICAgIC8vIGNvbnNvbGUubG9nKCdzb3VyY2VDaGlsZFJvdy5ub2RlT2JqZWN0LmNvbnRlbnQuVGl0bGUgPSAnLCBzb3VyY2VDaGlsZFJvdy5ub2RlT2JqZWN0LmNvbnRlbnQuVGl0bGUpO1xuICAgIFxuICAgIHNvdXJjZUNoaWxkUm93Lm5vZGVPYmplY3QuY29udGVudC5UaXRsZSA9IGRhdGFFbGVtZW50LnRleHRDb250ZW50O1xuXG4gICAgYWdlX2RiaXMuQ29udGVudF9VcGRhdGVXaXRoQ29udGVudE9iamVjdChzb3VyY2VDaGlsZFJvdy5ub2RlT2JqZWN0LmNvbnRlbnQpXG4gICAgICAgIC50aGVuKHVwZGF0ZWRDb250ZW50T2JqZWN0ID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVXBkYXRlZCBzb3VyY2UgY2hpbGQtcm93IDogXCIsIHVwZGF0ZWRDb250ZW50T2JqZWN0KVxuICAgICAgICB9KVxuICAgIC8vIC8vIGxldCBwcm9qZWN0Q29udGVudE9iamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3Byb2plY3RQcm9wZXJ0aWVzVGFibGVcIikgYXMgSFRNTFRhYmxlQ29udGVudE9iamVjdDtcblxuICAgIC8vIGNvbnNvbGUubG9nKFwic291cmNlQ29udGVudE9iamVjdC5jb250ZW50T2JqZWN0ID0gXCIsIHNvdXJjZVByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0KTtcblxufVxuXG5cbmZ1bmN0aW9uIHNvdXJjZVByb3BlcnR5Rm9jdXNlZE91dChmb2N1c291dEVsZW1lbnQ6IEhUTUxFbGVtZW50KXtcbiAgICAvLyBjb25zb2xlLmxvZygnRk9DVVMgT1VUIFBST0pFQ1QgUFJPUEVSVFknKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcImV2ZW50LnRhcmdldCA9IFwiLCBldmVudC50YXJnZXQpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwidGhpcyA9IFwiLCB0aGlzKTtcblxuICAgIC8vIGxldCBkYXRhRWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAvLyBjb25zb2xlLmxvZygnZGF0YUVsZW1lbnQudGV4dENvbnRlbnQgPSAnLCBmb2N1c291dEVsZW1lbnQudGV4dENvbnRlbnQpO1xuICAgIFxuICAgIC8vIGxldCBwcm9qZWN0VGFibGU6IEhUTUxUYWJsZUNvbnRlbnRPYmplY3QgPSB0aGlzO1xuXG5cbiAgICAvLyBjb25zb2xlLmxvZygnJywgZXZlbnQudGFyZ2V0LilcbiAgICBzd2l0Y2ggKGZvY3Vzb3V0RWxlbWVudC5pZCkge1xuICAgICAgICAvLyBUWVBFXG4gICAgICAgIGNhc2UgXCJhZ2Vfc291cmNlUHJvcFRhYmxlLVR5cGUtdmFsdWVcIjpcbiAgICAgICAgICAgIHNvdXJjZVByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0LlR5cGUgPSBmb2N1c291dEVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgLy8gVElUTEVcbiAgICAgICAgY2FzZSBcImFnZV9zb3VyY2VQcm9wVGFibGUtVGl0bGUtdmFsdWVcIjpcbiAgICAgICAgICAgIHNvdXJjZVByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0LlRpdGxlID0gZm9jdXNvdXRFbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICAgICAgc291cmNlVGl0bGVFbGVtZW50LnRleHRDb250ZW50ID0gZm9jdXNvdXRFbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIEdPQUxcbiAgICAgICAgY2FzZSBcImFnZV9zb3VyY2VQcm9wVGFibGUtVXJsLXZhbHVlXCI6XG4gICAgICAgICAgICBzb3VyY2VQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdC5VcmwgPSBmb2N1c291dEVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgYWdlX2RiaXMuQ29udGVudF9VcGRhdGVXaXRoQ29udGVudE9iamVjdChzb3VyY2VQcm9wZXJ0aWVzVGFibGUuY29udGVudE9iamVjdClcbiAgICAgICAgLnRoZW4odXBkYXRlZENvbnRlbnRPYmplY3QgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChmb2N1c291dEVsZW1lbnQuaWQpIHtcbiAgICAgICAgICAgICAgICAvLyBUWVBFXG4gICAgICAgICAgICAgICAgY2FzZSBcImFnZV9zb3VyY2VQcm9wVGFibGUtVHlwZS12YWx1ZVwiOlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmFzc2VydCh1cGRhdGVkQ29udGVudE9iamVjdC5UeXBlID09IHNvdXJjZVByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0LlR5cGUsIFwiJ1BVVCcgY29udGVudCBPYmplY3QgVHlwZSBkb2VzIG5vdCBtYXRjaCB0aGUgcHJvamVjdCB0YWJsZSAuY29udGVudE9iamVjdC5UeXBlICFcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIC8vIFRJVExFXG4gICAgICAgICAgICAgICAgY2FzZSBcImFnZV9zb3VyY2VQcm9wVGFibGUtVGl0bGUtdmFsdWVcIjpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5hc3NlcnQodXBkYXRlZENvbnRlbnRPYmplY3QuVGl0bGUgPT0gc291cmNlUHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QuVGl0bGUsIFwiJ1BVVCcgY29udGVudCBPYmplY3QgVGl0bGUgZG9lcyBub3QgbWF0Y2ggdGhlIHByb2plY3QgdGFibGUgLmNvbnRlbnRPYmplY3QuVGl0bGUgIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgLy8gR09BTFxuICAgICAgICAgICAgICAgIGNhc2UgXCJhZ2Vfc291cmNlUHJvcFRhYmxlLVVybC12YWx1ZVwiOlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmFzc2VydCh1cGRhdGVkQ29udGVudE9iamVjdC5VcmwgPT0gc291cmNlUHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3QuVXJsLCBcIidQVVQnIGNvbnRlbnQgT2JqZWN0IEdvYWwgZG9lcyBub3QgbWF0Y2ggdGhlIHByb2plY3QgdGFibGUgLmNvbnRlbnRPYmplY3QuR29hbCAhXCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfSlcbiAgICAvLyBsZXQgcHJvamVjdENvbnRlbnRPYmplY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0UHJvcGVydGllc1RhYmxlXCIpIGFzIEhUTUxUYWJsZUNvbnRlbnRPYmplY3Q7XG5cbiAgICBjdXJyZW50U291cmNlT2JqZWN0ID0gc291cmNlUHJvcGVydGllc1RhYmxlLmNvbnRlbnRPYmplY3Q7XG5cbiAgICAvLyBVcGRhdGUgVGl0bGVzIGluIHRoZSBkb21cbiAgICBsZXQgZWxlbWVudFdpdGhTYW1lVXVpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLXV1aWQ9JyR7Y3VycmVudFNvdXJjZU9iamVjdC5VdWlkfSddYCk7XG4gICAgZWxlbWVudFdpdGhTYW1lVXVpZC5mb3JFYWNoKChfZWxlbWVudCkgPT4ge1xuICAgICAgICBpZihfZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJhZ2VfZWxlbWVudFwiKSAmJiBfZWxlbWVudC5pZC5pbmNsdWRlcyhcIlRpdGxlXCIpKVxuICAgICAgICAgICAgX2VsZW1lbnQudGV4dENvbnRlbnQgPSBmb2N1c291dEVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdlbGVtZW50V2l0aFNhbWVVdWlkID0gJywgX2VsZW1lbnQpO1xuICAgIH0pXG4gICAgXG59XG5cbmZ1bmN0aW9uIGNsaWNrZWRTb3VyY2VDb250YWluZXIoZXZlbnQgOiBNb3VzZUV2ZW50KXtcbiAgICBsZXQgZXZlbnRUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICBzd2l0Y2ggKGV2ZW50VGFyZ2V0LmlkKSB7XG4gICAgICAgIGNhc2UgXCJhZ2Vfc291cmNlU2VhcmNoQnV0dG9uXCI6XG4gICAgICAgIGNhc2UgXCJhZ2Vfc291cmNlUHJvcGVydGllc0J1dHRvblwiOlxuICAgICAgICAgICAgdG9nZ2xlU291cmNlVGFibGVzKGV2ZW50VGFyZ2V0LmlkKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJhZ2Vfc291cmNlTmV3QnV0dG9uXCI6XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTmV3IHNvdXJjZSBidXR0b24gY2xpY2tlZCcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBicmVhaztcbiAgICBcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cblxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd1NvdXJjZUNoaWxkcmVuKCkge1xuICAgIHNvdXJjZUNoaWxkcmVuQnV0dG9uLmNsaWNrKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gc2hvd1NvdXJjZVByb3BlcnRpZXMoKXtcbiAgICBzb3VyY2VQcm9wZXJ0aWVzQnV0dG9uLmNsaWNrKCk7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZVNvdXJjZVRhYmxlcyhidXR0b25JRCA6IHN0cmluZyl7XG4gICAgbGV0IGNoaWxkcmVuQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2Vfc291cmNlU2VhcmNoQnV0dG9uXCIpO1xuICAgIGxldCBwcm9wZXJ0aWVzQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2Vfc291cmNlUHJvcGVydGllc0J1dHRvblwiKTtcblxuICAgIHNvdXJjZUNoaWxkcmVuVGFibGUuY2xhc3NMaXN0LmFkZChcImFnZV9kaXNwbGF5Tm9uZVwiKTtcbiAgICBzb3VyY2VQcm9wZXJ0aWVzVGFibGUuY2xhc3NMaXN0LmFkZChcImFnZV9kaXNwbGF5Tm9uZVwiKTtcbiAgICBjaGlsZHJlbkJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWdlX3NvdXJjZUJ1dHRvbk9uXCIpO1xuICAgIHByb3BlcnRpZXNCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFnZV9zb3VyY2VCdXR0b25PblwiKTtcbiAgICBcbiAgICBpZiAoYnV0dG9uSUQgPT0gXCJhZ2Vfc291cmNlU2VhcmNoQnV0dG9uXCIpe1xuICAgICAgICBzb3VyY2VDaGlsZHJlblRhYmxlLmNsYXNzTGlzdC5yZW1vdmUoXCJhZ2VfZGlzcGxheU5vbmVcIik7XG4gICAgICAgIGNoaWxkcmVuQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJhZ2Vfc291cmNlQnV0dG9uT25cIik7XG4gICAgfVxuICAgIGVsc2UgaWYgKGJ1dHRvbklEID09IFwiYWdlX3NvdXJjZVByb3BlcnRpZXNCdXR0b25cIikge1xuICAgICAgICBzb3VyY2VQcm9wZXJ0aWVzVGFibGUuY2xhc3NMaXN0LnJlbW92ZShcImFnZV9kaXNwbGF5Tm9uZVwiKTtcbiAgICAgICAgcHJvcGVydGllc0J1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWdlX3NvdXJjZUJ1dHRvbk9uXCIpO1xuICAgIH1cblxufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkV2l0aENvbnRlbnRPYmplY3QoX2NvbnRlbnRPYmplY3QgOiBhbnkpe1xuICAgIGNvbnNvbGUubG9nKCdsb2FkaW5nIFNvdXJjZSBwYW5lbCB3aXRoICcsIF9jb250ZW50T2JqZWN0KTtcblxuICAgIGN1cnJlbnRTb3VyY2VPYmplY3QgPSBfY29udGVudE9iamVjdDtcblxuICAgIC8vIGxldCBzb3VyY2VPYmplY3QgPSBleHRlbnNpb25TdGF0ZUZyb250LmN1cnJlbnRfc291cmNlT2JqZWN0O1xuICAgIC8vIGV4dGVuc2lvblN0YXRlRnJvbnQuY3VycmVudF9zb3VyY2VVdWlkID0gc291cmNlT2JqZWN0LlV1aWQ7XG4gICAgc291cmNlUHJvcGVydGllc1RhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCBzb3VyY2VQcm9wZXJ0eUZvY3VzT3V0KVxuICAgIHNvdXJjZVByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0ID0gX2NvbnRlbnRPYmplY3Q7XG4gXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FnZV9zb3VyY2VUaXRsZScpLnRleHRDb250ZW50ID0gX2NvbnRlbnRPYmplY3QuVGl0bGU7XG5cbiAgICBsZXQgdGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdlX3NvdXJjZVByb3BlcnRpZXNUYWJsZS10Ym9keScpO1xuICAgIHRib2R5LmlubmVySFRNTCA9ICcnO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gX2NvbnRlbnRPYmplY3QpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYCR7a2V5fTogJHtzb3VyY2VPYmplY3Rba2V5XX1gKTtcbiAgICAgICAgaWYgKGtleSA9PT0gJ1R5cGUnIHx8IGtleSA9PT0gJ1RpdGxlJyB8fCBrZXkgPT09ICdVcmwnIHx8IGtleSA9PT0gJ0lBbVNvdXJjZScpIHtcblxuICAgICAgICAgICAgdGJvZHkuaW5uZXJIVE1MICs9IGBcblx0XHRcblx0XHRcdDx0cj5cblx0XHRcdFx0PHRkIGlkPWFnZV9zb3VyY2VQcm9wVGFibGUtJHtrZXl9LWtleSBjbGFzcz1cImFnZV9lbGVtZW50XCIgPiR7a2V5fTwvdGQ+XG5cdFx0XHRcdDx0ZCBpZD1hZ2Vfc291cmNlUHJvcFRhYmxlLSR7a2V5fS12YWx1ZSBjbGFzcz1cImFnZV9zb3VyY2VQcm9wVmFsdWUgYWdlX2VsZW1lbnRcIiBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCIgPiR7X2NvbnRlbnRPYmplY3Rba2V5XX08L3RkPlxuXHRcdFx0PC90cj5cblx0XHRcblx0XHRgO1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0Ym9keS5pbm5lckhUTUwgKz0gYFxuXHRcdFxuXHRcdFx0PHRyPlxuXHRcdFx0XHQ8dGQgaWQ9YWdlX3NvdXJjZVByb3BUYWJsZS0ke2tleX0ta2V5IGNsYXNzPVwiYWdlX2VsZW1lbnRcIiA+JHtrZXl9PC90ZD5cblx0XHRcdFx0PHRkIGlkPWFnZV9zb3VyY2VQcm9wVGFibGUtJHtrZXl9LXZhbHVlIGNsYXNzPVwiYWdlX3NvdXJjZVByb3BWYWx1ZSBhZ2VfZWxlbWVudFwiPiR7X2NvbnRlbnRPYmplY3Rba2V5XX08L3RkPlxuXHRcdFx0PC90cj5cblx0XHRcblx0XHRgO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvLyAvLyBjb25zb2xlLmxvZyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjYWdlX3NvdXJjZVByb3BlcnRpZXNUYWJsZSB0Ym9keSB0cicpKVxuICAgIC8vIGxldCBlZGl0YWJsZVNvdXJjZVByb3BlcnR5VGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFnZV9lZGl0YWJsZVNvdXJjZVByb3BlcnR5Jyk7XG4gICAgLy8gLy8gLy8gY29uc29sZS5sb2coZWRpdGFibGVTb3VyY2VQcm9wZXJ0eVRkKVxuICAgIC8vIGZvciAobGV0IGVkaXRhYmxlU291cmNlUHJvcGVydHlUZCBvZiBlZGl0YWJsZVNvdXJjZVByb3BlcnR5VGRzKSB7XG4gICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKGVkaXRhYmxlU291cmNlUHJvcGVydHlUZC50ZXh0Q29udGVudCk7XG4gICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKHByb3BlcnR5Um93LnRleHRDb250ZW50Lmxlbmd0aClcbiAgICAvLyAgICAgLy8gZWRpdGFibGVTb3VyY2VQcm9wZXJ0eVRkLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgcmVhZFNvdXJjZVByb3BlcnRpZXNGcm9tRG9tQW5kV3JpdGVQdXQpXG4gICAgLy8gICAgIGVkaXRhYmxlU291cmNlUHJvcGVydHlUZC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIGVkaXRhYmxlU291cmNlUHJvcGVydHlGb2N1c091dClcblxuICAgIC8vIH1cblxuICAgIGF3YWl0IGxvYWRTb3VyY2VDaGlsZHJlbihfY29udGVudE9iamVjdCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxvYWRTb3VyY2VDaGlsZHJlbihfY29udGVudE9iamVjdCA6IGFueSl7XG5cbiAgICBsZXQgY2hpbGRDb250ZW50RWRnZU9iamVjdHMgPSBhd2FpdCBhZ2VfZGJpcy5Db250ZW50RWRnZV9TZWxlY3RDaGlsZE9mVXVpZChfY29udGVudE9iamVjdC5VdWlkKTtcblxuXG5cbiAgICBsZXQgdGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdlX3NvdXJjZUNoaWxkVGFibGUtdGJvZHknKTtcbiAgICB0Ym9keS5pbm5lckhUTUwgPSAnJztcblxuICAgIGZvciAobGV0IGNoaWxkQ29udGVudEVkZ2VPYmplY3Qgb2YgY2hpbGRDb250ZW50RWRnZU9iamVjdHMpIHtcbiAgICAgICAgbGV0IHRhYmxlUm93SHRtbCA9IGBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJhZ2VfZWxlbWVudCBhZ2Vfc291cmNlQ2hpbGRUYWJsZS1UYWJsZVwiIGRhdGEtVXVpZD1cIiR7Y2hpbGRDb250ZW50RWRnZU9iamVjdC5jb250ZW50LlV1aWR9XCI+JHtjaGlsZENvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnQuVGFibGV9PC90ZD5cblx0XHRcdFx0PHRkIGNsYXNzPVwiYWdlX2VsZW1lbnQgYWdlX3NvdXJjZUNoaWxkVGFibGUtVHlwZVwiIGRhdGEtVXVpZD1cIiR7Y2hpbGRDb250ZW50RWRnZU9iamVjdC5jb250ZW50LlV1aWR9XCI+JHtjaGlsZENvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnQuVHlwZX08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImFnZV9lbGVtZW50IGFnZV9zb3VyY2VDaGlsZFRhYmxlLVRpdGxlXCIgZGF0YS1VdWlkPVwiJHtjaGlsZENvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnQuVXVpZH1cIiBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCI+JHtjaGlsZENvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnQuVGl0bGV9PC90ZD5cblxuICAgICAgICAgICAgYDtcbiAgICAgICAgbGV0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSBhcyBIVE1MUHJvamVjdFRhYmxlUm93O1xuICAgICAgICB0ci5pZCA9ICdhZ2Vfc291cmNlU2VhcmNoTm9kZS0nICsgY2hpbGRDb250ZW50RWRnZU9iamVjdC5jb250ZW50LlV1aWQ7XG4gICAgICAgIHRyLm5vZGVPYmplY3QgPSBjaGlsZENvbnRlbnRFZGdlT2JqZWN0O1xuICAgICAgICAvLyB0ci5hYWEgPSBcImFzZFwiO1xuICAgICAgICB0ci5zZXRBdHRyaWJ1dGUoJ2RhdGEtZnVjaycsICdmKmNrJyk7XG4gICAgICAgIC8vIHRyLmRhdGFzZXQuTm9kZSA9IDE7XG4gICAgICAgIC8vIHRyLmRhdGFzZXQuVXVpZCA9IGNoaWxkT2JqZWN0LlV1aWQ7XG4gICAgICAgIHRyLnNldEF0dHJpYnV0ZSgnZGF0YS1Ob2RlJywgJzEnKTtcbiAgICAgICAgdHIuc2V0QXR0cmlidXRlKCdkYXRhLVV1aWQnLCBjaGlsZENvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnQuVXVpZCk7XG4gICAgICAgIC8vIHRyLnRhYkluZGV4ID0gMTtcbiAgICAgICAgdHIuaW5uZXJIVE1MID0gdGFibGVSb3dIdG1sO1xuICAgICAgICAvLyB0ci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrU291cmNlQ2hpbGRSb3cpO1xuICAgICAgICAvLyB0ci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4geyBjb25zb2xlLmxvZyhldmVudC50YXJnZXQucGFyZW50Tm9kZS5ub2RlT2JqZWN0KSB9KTtcbiAgICAgICAgLy8gVGFyZ2V0cyBvbmx5IHRoZSBsYXN0IChpLmUuIFRpdGxlKSBjb2x1bW5cbiAgICAgICAgLy8gdHIubGFzdEVsZW1lbnRDaGlsZC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgYXN5bmMgKGV2ZW50KSA9PiB7XG5cbiAgICAgICAgLy8gICAgIGxldCB1dWlkID0gZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQubm9kZU9iamVjdC5jb250ZW50LlV1aWQ7XG4gICAgICAgIC8vICAgICBsZXQgY29udGVudE9iamVjdCA9IGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50Lm5vZGVPYmplY3QuY29udGVudDtcbiAgICAgICAgLy8gICAgIGNvbnRlbnRPYmplY3QuVGl0bGUgPSBldmVudC50YXJnZXQudGV4dENvbnRlbnQ7XG4gICAgICAgIC8vICAgICAvLyBjb25zb2xlLmxvZyhcIkNDQ0NDQ0NDQ0NcIiwgY29udGVudE9iamVjdClcbiAgICAgICAgLy8gICAgIGxldCBwdXRDb250ZW50T2JqZWN0ID0gYXdhaXQgZGJpcy5Db250ZW50X1VwZGF0ZVdpdGhDb250ZW50T2JqZWN0KGNvbnRlbnRPYmplY3QpO1xuXG4gICAgICAgIC8vICAgICBsZXQgZmV0Y2hlZENvbnRlbnRPYmplY3QgPSBhd2FpdCBkYmlzLkNvbnRlbnRfU2VsZWN0T25VdWlkKHV1aWQpO1xuXG4gICAgICAgIC8vICAgICBhd2FpdCBmZXRjaEN1cnJlbnRTb3VyY2VDaGlsZHJlblRoZW5Xcml0ZVRvU3RhdGVzKCk7XG4gICAgICAgIC8vICAgICBwb3B1bGF0ZVNvdXJjZUNoaWxkVGFibGVGcm9tU3RhdGUoKTtcblxuICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coXCJEREREREREREREXCIsIGZldGNoZWRDb250ZW50T2JqZWN0KVxuICAgICAgICAvLyAgICAgLy8gY29weVNvdXJjZUNoaWxkVGFibGVGcm9tRG9tKCk7XG5cbiAgICAgICAgLy8gICAgIC8vIHB1dEN1cnJlbnRTb3VyY2VPYmplY3QoKTtcbiAgICAgICAgLy8gICAgIC8vIGZldGNoQ3VycmVudFNvdXJjZUNoaWxkcmVuVGhlbldyaXRlVG9TdGF0ZXMoKTtcbiAgICAgICAgLy8gICAgIC8vIHBvcHVsYXRlU291cmNlQ2hpbGRUYWJsZUZyb21TdGF0ZSgpO1xuICAgICAgICAvLyB9KTtcbiAgICAgICAgLy8gdHIuY29udGVudEVkaXRhYmxlID0gJ1RydWUnO1xuXG4gICAgICAgIHRib2R5LmFwcGVuZCh0cik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRyKVxuICAgIH1cbiAgICAvLyBjb25zb2xlLnRhYmxlKGNoaWxkT2JqZWN0cylcblxufVxuXG5mdW5jdGlvbiBzb3VyY2VQcm9wZXJ0eUZvY3VzT3V0KGV2ZW50IDogRm9jdXNFdmVudCl7XG4gICAgY29uc29sZS5sb2coJ0ZPQ1VTIE9VVCBGUk9NIFNPVVJDRSBQUk9QRVJUWScpO1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb2N1c09uTGFzdENoaWxkUm93VGl0bGUoKXtcbiAgICBsZXQgdGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9zb3VyY2VDaGlsZFRhYmxlLXRib2R5XCIpIGFzIEhUTUxUYWJsZVNlY3Rpb25FbGVtZW50O1xuICAgIC8vIGNvbnNvbGUubG9nKFwidGJvZHkgPSBcIiwgdGJvZHkpXG4gICAgbGV0IGxhc3RSb3cgPSB0Ym9keS5sYXN0RWxlbWVudENoaWxkLmxhc3RFbGVtZW50Q2hpbGQgYXMgSFRNTFRhYmxlQ2VsbEVsZW1lbnQ7XG4gICAgLy8gY29uc29sZS5sb2coXCJsYXN0Um93ID0gXCIsIGxhc3RSb3cpXG5cbiAgICBpZihsYXN0Um93LnRleHRDb250ZW50Lmxlbmd0aCA9PSAwKXtcbiAgICAgICAgbGFzdFJvdy5pbm5lckhUTUwgPSBcIjxkaXY+PGJyPjwvZGl2PlwiXG4gICAgICAgIGxhc3RSb3cuZm9jdXMoKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgbGFzdFJvdy5mb2N1cygpO1xuICAgICAgICAgICAgLy8gdGhpcy5zZWxlY3Rpb25TdGFydCA9IHRoaXMuc2VsZWN0aW9uRW5kID0gdGhpcy52YWx1ZS5sZW5ndGg7XG4gICAgICAgICBcbiAgICAgICAgICAgIHZhciByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKClcbiAgICAgICAgICAgIHZhciBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKClcbiAgICAgICAgXG4gICAgICAgICAgICByYW5nZS5zZXRTdGFydChsYXN0Um93LmNoaWxkTm9kZXNbMF0sIGxhc3RSb3cuY2hpbGROb2Rlc1swXS50ZXh0Q29udGVudC5sZW5ndGgpXG4gICAgICAgICAgICByYW5nZS5jb2xsYXBzZSh0cnVlKVxuICAgICAgICBcbiAgICAgICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKVxuXG4gICAgfVxufVxuXG5cblxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ3NzKCk6IHZvaWQge1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kKHNvdXJjZUNzcyk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNzcygpOiB2b2lkIHtcbiAgICBzb3VyY2VDc3MucmVtb3ZlKCk7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSB7IFRmZXRjaGVyIH0gZnJvbSBcIi4vZmV0Y2hlclwiO1xuXG5cbmltcG9ydCAqIGFzIG92ZXJsYXkgZnJvbSBcIi4vb3ZlcmxheVwiO1xuXG5sZXQgZXh0ZW5zaW9uU3RhdGVGcm9udCA9e1xuICAgIGFjdGl2ZTogZmFsc2UsXG59O1xuXG5cbi8vIFNldCB1cCBtb2R1bGVzIGFuZCBmZXRjaCBkYXRhXG4oZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBvdmVybGF5LmluaXRPdmVybGF5KCk7ICBcblxuICAgIC8vIGxldCBzZXR0aW5nSXRlbSA9IGJyb3dzZXIuc3RvcmFnZS5sb2NhbC5zZXQoeyB0ZXN0OiBcIlZBTFVFXCIgfSk7XG5cbn0pKCk7XG5cblxuLy8gRGlzcGxheSB0aGUgZXh0ZW5zaW9uLWNvbnRhaW5lclxuYnJvd3Nlci5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobWVzc2FnZSkgPT4ge1xuICAgIFxuICAgIGlmIChtZXNzYWdlLm5hbWUgPT09ICd0b2dnbGVFeHRlbnNpb24nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVG9nZ2xlIEV4aXRlbnNpb24gTWVzc2FnZSByZWNpZXZlZCFcIilcblxuICAgICAgICBpZiAoZXh0ZW5zaW9uU3RhdGVGcm9udC5hY3RpdmUpe1xuICAgICAgICAgICAgZXh0ZW5zaW9uU3RhdGVGcm9udC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIG92ZXJsYXkuaGlkZU92ZXJsYXkoKTtcblxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4dGVuc2lvblN0YXRlRnJvbnQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIG92ZXJsYXkuc2hvd092ZXJsYXkoKTtcblxuICAgICAgICB9XG4gICAgfVxuXG59KTtcblxuXG4vKipcbiAqICBTaG93IGluamVjdGVkIGNvbnRhaW5lclxuICovXG5mdW5jdGlvbiBzdGFydCgpIDogdm9pZCB7XG4gICAgY29uc29sZS5sb2coXCJTVEFSVFwiKTtcbiAgICBcbiAgICBleHRlbnNpb25TdGF0ZUZyb250LmFjdGl2ZSA9IHRydWU7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhhd2FpdCBmZXRjaGVyLmZldGNoSHRtbChcIm92ZXJsYXkuaHRtbFwiKSlcblxuICAgIG92ZXJsYXkuc2hvd092ZXJsYXkoKTtcbn1cblxuXG4vKipcbiAqICBcbiAqICBIaWRlIGluamVjdGVkIGNvbnRhaW5lclxuICovXG5mdW5jdGlvbiBzdG9wKCkgOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhcIlNUT1BcIik7XG4gICAgZXh0ZW5zaW9uU3RhdGVGcm9udC5hY3RpdmUgPSBmYWxzZTtcbiAgICBvdmVybGF5LmhpZGVPdmVybGF5KCk7XG59XG5cblxuLy8gY29uc3QgbWVzc2FnZSA9IFwiSGVsbG8gV29ybGQhXCI7XG5cblxuLy8gY29uc29sZS5sb2coXCJUWVBFU0NSSVBUQFwiKVxuXG4vLyBjb25zb2xlLmxvZyhtZXNzYWdlLnRvTG93ZXJDYXNlKCksIFwiMlwiKVxuXG4vLyAvLyBtZXNzYWdlKCk7XG5cbi8vIGxldCB0eXBlQSA9IHtcbi8vICAgICBhOiBcImFcIixcbi8vICAgICBBOiAxLFxuLy8gfVxuXG5cbi8vIGZ1bmN0aW9uIGZ1bmZ1bihfeDogc3RyaW5nKXtcbi8vICAgICBjb25zb2xlLmxvZyhfeCk7XG4vLyB9XG4vLyBmdW5mdW4odHlwZUEuYSk7XG5cbi8vIGZ1bmN0aW9uIGdyZWV0KHBlcnNvbjpzdHJpbmcsIGRhdGU6c3RyaW5nKSB7XG4vLyAgICAgY29uc29sZS5sb2coYEhlbGxvICR7cGVyc29ufSwgdG9kYXkgaXMgJHtkYXRlfSFgKTtcbi8vIH1cblxuLy8gLy8gZ3JlZXQoXCJCcmVuZGFuXCIpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==