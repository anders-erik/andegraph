/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
    overlayContainer.addEventListener("loadsource", (event) => { console.log('load source event!', event.detail.contentObject); });
    _fetcher__WEBPACK_IMPORTED_MODULE_0__.fetchHtml("overlay.html")
        .then(html => {
        // console.log("HTML : ", html)
        overlayContainer.innerHTML = html;
        contextOverlay = overlayContainer.querySelector("#age_contextOverlay");
        // contextOverlay.addEventListener("click", hideContextMenus);
        sidePanel = overlayContainer.querySelector("#age_overlayRightPanel");
        // Pass the context menu!
        _projects_projects__WEBPACK_IMPORTED_MODULE_1__.initProjects(sidePanel, contextOverlay.querySelector("#age_moreProjectOptionsContextMenu"));
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
    // fetcher.fetchHtml("overlay.html")
    //     .then(html => overlayContainer.innerHtml = html)
}
function hideOverlay() {
    overlayContainer.remove();
    overlayCss.remove();
    tableCss.remove();
    _projects_projects__WEBPACK_IMPORTED_MODULE_1__.removeCss();
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
/* harmony import */ var _dbi_send__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dbi-send */ "./webextension/wp-dev/dbi-send.ts");

function populatePropertiesTable(propertiesTable, projectContentObject) {
    console.log("projectContentObject = ", projectContentObject);
    // let projectObject = extensionStateFront.current_projectObject;
    let projectObject = projectContentObject;
    propertiesTable.contentObject = projectContentObject;
    propertiesTable.addEventListener("focusout", projectPropertyFocusOut);
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
				<th id=age_projPropTable-${key}-key class="age_element" >${key}</th>
				<td id=age_projPropTable-${key}-value class="age_editableProjectProperty age_element" contenteditable="true" >${projectObject[key]}</td>
			</tr>
		
		`;
        }
        else {
            tbody.innerHTML += `
		
			<tr>
				<th id=age_projPropTable-${key}-key class="age_element" >${key}</th>
				<td id=age_projPropTable-${key}-value class="age_element">${projectObject[key]}</td>
			</tr>
		
		`;
        }
    }
    // console.log(document.querySelectorAll('#age_projectPropertiesTable tbody tr'))
    let editableProjectPropertyTds = tbody.querySelectorAll('.age_editableProjectProperty');
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
function projectPropertyFocusOut(event) {
    console.log('FOCUS OUT PROJECT PROPERTY');
    // console.log("event.target = ", event.target);
    // console.log("this = ", this);
    let dataElement = event.target;
    let projectTable = this;
    // console.log('', event.target.)
    switch (dataElement.id) {
        // TYPE
        case "age_projPropTable-Type-value":
            projectTable.contentObject.Type = dataElement.textContent;
            break;
        // TITLE
        case "age_projPropTable-Title-value":
            projectTable.contentObject.Title = dataElement.textContent;
            break;
        // GOAL
        case "age_projPropTable-Goal-value":
            projectTable.contentObject.Goal = dataElement.textContent;
            break;
        default:
            break;
    }
    _dbi_send__WEBPACK_IMPORTED_MODULE_0__.age_dbis.Content_UpdateWithContentObject(projectTable.contentObject)
        .then(updatedContentObject => {
        // console.log("updatedContentObject = ", updatedContentObject);
        // let updatedString = JSON.stringify(updatedContentObject);
        // let tableObjectString = JSON.stringify(projectTable.contentObject);
        // console.log(updatedString);
        // console.log(tableObjectString);
        // let equality = JSON.stringify(updatedContentObject) == JSON.stringify(projectTable.contentObject);
        // console.log("Equal ? : ", equality)
        // for(let i = 0; i < updatedString.length; i++){
        //     if(updatedString[i] !== tableObjectString[i])
        //         console.log(updatedString[i] + " !== " + tableObjectString[i])
        // }
        // console.log(JSON.stringify(updatedContentObject).length)
        // console.log(JSON.stringify(projectTable.contentObject).length);
        switch (dataElement.id) {
            // TYPE
            case "age_projPropTable-Type-value":
                console.assert(updatedContentObject.Type == projectTable.contentObject.Type, "'PUT' content Object Type does not match the project table .contentObject.Type !");
                break;
            // TITLE
            case "age_projPropTable-Title-value":
                console.assert(updatedContentObject.Type == projectTable.contentObject.Type, "'PUT' content Object Title does not match the project table .contentObject.Title !");
                break;
            // GOAL
            case "age_projPropTable-Goal-value":
                console.assert(updatedContentObject.Type == projectTable.contentObject.Type, "'PUT' content Object Goal does not match the project table .contentObject.Goal !");
                break;
            default:
                break;
        }
    });
    // let projectContentObject = document.getElementById("age_projectPropertiesTable") as HTMLTableContentObject;
    console.log("projectContentObject.contentObject = ", projectTable.contentObject);
    // let eventTarget = event.target as HTMLElement;
    // console.log('eventTarget.textContent = ', eventTarget.textContent);
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
		
				<th id=age_projchildTable-Table-${contentEdge.content.Uuid} class="age_element" data-Uuid=${contentEdge.content.Uuid}>${contentEdge.content.Table}</th>
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
function clickedProjectContextMenu(event) {
    let eventTarget = event.target;
    switch (eventTarget.id) {
        case "btn1":
            console.log(eventTarget.id);
            break;
        case "btn2":
            console.log(eventTarget.id);
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
 *  Main event handler in the project container.
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
        // set title
        document.getElementById('age_projectTitle').textContent = tableRowTarget.nodeObject.Title;
        _project_dom__WEBPACK_IMPORTED_MODULE_1__.populatePropertiesTable(projectPropertiesTable, tableRowTarget.nodeObject);
        // populate properties table 
        fetchProjectChildren(clickTarget.dataset.uuid)
            .then((contentEdgeObjects) => { _project_dom__WEBPACK_IMPORTED_MODULE_1__.populateChildrenTable(projectChildrenTable, projectContentEdgeChildren); });
        // move focus to the children-tab
        document.getElementById("age_projectChildrenButton").click();
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
        // console.log('EMPTY SEARCH STRING');
        searchStringExists = false;
        projectSearchElement.innerHTML = '<div>Q  :  Search . . .<br></div>';
    }
    else {
        searchStringExists = true;
    }
    // extensionStateFront.projectSearchActive = false;
    //writeStateFromFront();
    // focusProjectSearch = false;
    // console.log('focusout search ')
    // projectSearchInput.removeEventListener('keypress', keyPressDuringSearch)
    projectSearchElement.removeEventListener('keydown', keyDownDuringSearch);
}
// Perform search with slight delay to make sure new input is written to contentEditanle input
function keyDownDuringSearch(event) {
    return __awaiter(this, void 0, void 0, function* () {
        // keyEvent.preventDefault();
        // console.log('keyDownDuringSearch()');
        // console.log('event.key = ', event.key);
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
            // console.log("projectSearchElement.textContent = ", projectSearchElement.textContent);
            fetchProjectSearch(projectSearchElement.textContent)
                .then((contentObjectArray) => {
                // console.log(contentObjectArray)
                _project_dom__WEBPACK_IMPORTED_MODULE_1__.populateProjectSearchTable(projectSearchTable, projectSearchObjects);
            });
            // age_dbis.Content_SelectOnTitleLikeString();
            // await fetchProjectSearchThenWriteToStates();
            // populateProjectSearchTableFromState();
        }), 100);
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
function projectTitleClicked(tableRow) {
    console.log("Project title clicked: ", tableRow);
}
function projectSearchButtonClicked(tableRow) {
    console.log("Project search clicked: ", tableRow);
}
function projectChildrenButtonClicked(tableRow) {
    console.log("Project children clicked: ", tableRow);
}
function projectPropertiesButtonClicked(tableRow) {
    console.log("Project properties clicked: ", tableRow);
}
function projectMoreOptionsButtonClicked(tableRow) {
    console.log("Project options clicked: ", tableRow);
}
function projectSearchRowClicked(tableRow) {
    console.log("Table row clicked: ", tableRow);
}
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
    console.log("ToggleExitension Message recieved!");
    if (message.name === 'toggleExtension') {
        if (extensionStateFront.active)
            stop();
        else
            start();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3AtYnVpbGQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxVQUFVLEdBQUcsK0JBQStCLENBQUM7QUFFMUMsU0FBUyxJQUFJO0lBRW5CLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7QUFFbEMsQ0FBQztBQUVELE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sRUFBaUIsRUFBRTtJQUNoRSxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7SUFFaEQsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLFlBQVksRUFBRSxDQUFDO1FBQ25DLHNCQUFzQjtRQUN0QixVQUFVLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUNuQyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxRQUFRLEVBQUUsOENBQThDLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFFaEgsQ0FBQztJQUdELElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxZQUFZLEVBQUUsQ0FBQztRQUNuQyxzQkFBc0I7UUFFdEIsOEZBQThGO1FBQzlGLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBRW5ELENBQUM7QUFFRixDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sUUFBUTtJQUViOztNQUVFO0lBRUYsTUFBTSxDQUFPLHFCQUFxQixDQUFDLFNBQWtCOztZQUNwRCxNQUFNLEdBQUcsR0FBRyxVQUFVLEdBQUcsd0NBQXdDLFNBQVMsRUFBRSxDQUFDO1lBQzdFLE1BQU0sT0FBTyxHQUFHO2dCQUNmLE1BQU0sRUFBRSxNQUFNO2FBQ2QsQ0FBQztZQUVGLElBQUksQ0FBQztnQkFDSixNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQ2xCLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUM7b0JBQ25FLE9BQU8sRUFBRSxDQUFDO2dCQUNYLENBQUM7Z0JBQ0QsTUFBTSxJQUFJLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUM7Z0JBQ2pDLE9BQU8sSUFBSSxDQUFDO1lBQ2IsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEIsQ0FBQztRQUNGLENBQUM7S0FBQTtJQUNELE1BQU0sQ0FBTyxvQkFBb0IsQ0FBQyxJQUFzQjs7WUFDdkQsSUFBSSxHQUFHLEdBQUcsVUFBVSxHQUFHLHNDQUFzQyxJQUFJLEVBQUUsQ0FBQztZQUNwRSxNQUFNLE9BQU8sR0FBRztnQkFDZixNQUFNLEVBQUUsS0FBSzthQUNiLENBQUM7WUFFRixJQUFJLENBQUM7Z0JBQ0osTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDO29CQUNuRSxPQUFPLEVBQUUsQ0FBQztnQkFDWCxDQUFDO2dCQUNELE1BQU0sSUFBSSxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDO2dCQUNqQyxPQUFPLElBQUksQ0FBQztZQUNiLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RCLENBQUM7UUFDRixDQUFDO0tBQUE7SUFDRCxNQUFNLENBQU8sK0JBQStCLENBQUMsYUFBbUI7O1lBQy9ELElBQUksR0FBRyxHQUFHLFVBQVUsR0FBRywwQ0FBMEMsQ0FBQztZQUNsRSxNQUFNLE9BQU8sR0FBRztnQkFDZixNQUFNLEVBQUUsS0FBSztnQkFDYixPQUFPLEVBQUUsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEdBQUc7Z0JBQ2hELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQzthQUNuQyxDQUFDO1lBRUYsSUFBSSxDQUFDO2dCQUNKLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQztvQkFDbkUsT0FBTyxFQUFFLENBQUM7Z0JBQ1gsQ0FBQztnQkFDRCxNQUFNLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQztnQkFDakMsT0FBTyxJQUFJLENBQUM7WUFDYixDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QixDQUFDO1FBQ0YsQ0FBQztLQUFBO0lBQ0QsTUFBTSxDQUFPLHNCQUFzQixDQUFDLElBQXNCOztZQUN6RCxJQUFJLEdBQUcsR0FBRyxVQUFVLEdBQUcsd0NBQXdDLElBQUksRUFBRSxDQUFDO1lBQ3RFLE1BQU0sT0FBTyxHQUFHO2dCQUNmLE1BQU0sRUFBRSxRQUFRO2FBQ2hCLENBQUM7WUFFRixJQUFJLENBQUM7Z0JBQ0osTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDO29CQUNuRSxPQUFPLEVBQUUsQ0FBQztnQkFDWCxDQUFDO2dCQUNELE1BQU0sSUFBSSxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDO2dCQUNqQyxPQUFPLElBQUksQ0FBQztZQUNiLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RCLENBQUM7UUFDRixDQUFDO0tBQUE7SUFDRCxNQUFNLENBQU8sK0JBQStCLENBQUMsWUFBb0IsRUFBRSxVQUFrQixFQUFFLFlBQW9CLEVBQUUsV0FBbUIsRUFBRSxJQUFZOztZQUM3SSxJQUFJLEdBQUcsR0FBRyxVQUFVLEdBQUcseURBQXlELFlBQVksZUFBZSxVQUFVLGlCQUFpQixZQUFZLGdCQUFnQixXQUFXLFNBQVMsSUFBSSxFQUFFLENBQUM7WUFDN0wsTUFBTSxPQUFPLEdBQUc7Z0JBQ2YsTUFBTSxFQUFFLEtBQUs7YUFDYixDQUFDO1lBR0YsSUFBSSxDQUFDO2dCQUNKLElBQUksUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQztvQkFDbkUsT0FBTyxFQUFFLENBQUM7Z0JBQ1gsQ0FBQztnQkFDRCxNQUFNLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQztnQkFDakMsT0FBTyxJQUFJLENBQUM7WUFDYixDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDaEIsb0NBQW9DO2dCQUNwQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RCLENBQUM7UUFDRixDQUFDO0tBQUE7SUFDRCxNQUFNLENBQU8sMkJBQTJCLENBQUMsSUFBc0IsRUFBRSxZQUE2Qjs7WUFDN0YsTUFBTSxHQUFHLEdBQUcsVUFBVSxHQUFHLDZDQUE2QyxJQUFJLGlCQUFpQixZQUFZLEVBQUUsQ0FBQztZQUMxRyxNQUFNLE9BQU8sR0FBRztnQkFDZixNQUFNLEVBQUUsTUFBTTthQUNkLENBQUM7WUFFRixJQUFJLENBQUM7Z0JBQ0osTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDO29CQUNuRSxPQUFPLEVBQUUsQ0FBQztnQkFDWCxDQUFDO2dCQUNELE1BQU0sSUFBSSxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDO2dCQUNqQyxPQUFPLElBQUksQ0FBQztZQUNiLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RCLENBQUM7UUFDRixDQUFDO0tBQUE7SUFDRCxNQUFNLENBQU8sMEJBQTBCOztZQUN0QyxJQUFJLEdBQUcsR0FBRyxVQUFVLEdBQUcscUNBQXFDLENBQUM7WUFDN0QsTUFBTSxPQUFPLEdBQUc7Z0JBQ2YsTUFBTSxFQUFFLEtBQUs7YUFDYixDQUFDO1lBRUYsSUFBSSxDQUFDO2dCQUNKLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQztvQkFDbkUsT0FBTyxFQUFFLENBQUM7Z0JBQ1gsQ0FBQztnQkFDRCxNQUFNLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQztnQkFDakMsT0FBTyxJQUFJLENBQUM7WUFDYixDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QixDQUFDO1FBQ0YsQ0FBQztLQUFBO0lBTUQ7O01BRUU7SUFDRixNQUFNLENBQU8sNkJBQTZCLENBQUMsSUFBc0I7O1lBQ2hFLElBQUksR0FBRyxHQUFHLFVBQVUsR0FBRyxtREFBbUQsSUFBSSxFQUFFLENBQUM7WUFDakYsTUFBTSxPQUFPLEdBQUc7Z0JBQ2YsTUFBTSxFQUFFLEtBQUs7YUFDYixDQUFDO1lBRUYsSUFBSSxDQUFDO2dCQUNKLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQztvQkFDbkUsT0FBTyxFQUFFLENBQUM7Z0JBQ1gsQ0FBQztnQkFDRCxNQUFNLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQztnQkFDakMsT0FBTyxJQUFJLENBQUM7WUFDYixDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDaEIsb0NBQW9DO2dCQUNwQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RCLENBQUM7UUFDRixDQUFDO0tBQUE7Q0FFRDtBQUFBLENBQUM7QUFJRDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5TWdDO0FBQ2pDLCtDQUFJLEVBQUUsQ0FBQztBQUlQLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQztBQUMzQixNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUM7QUFJbEIsU0FBUyxTQUFTLENBQUMsUUFBaUI7SUFFbkMsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQzVCLFVBQVUsR0FBRyxRQUFRLENBQ3hCLENBQUM7SUFFRixpR0FBaUc7SUFDakcsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDO1NBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztTQUNsQixLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQywwQ0FBMEMsQ0FBQztBQUN2RSxDQUFDO0FBR00sU0FBUyxRQUFRLENBQUMsUUFBZ0I7SUFFckMsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQzVCLFNBQVMsR0FBRyxRQUFRLENBQ3ZCLENBQUM7SUFFRixpR0FBaUc7SUFDakcsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDO1NBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztTQUNsQixLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyx1Q0FBdUMsQ0FBQztBQUNoRSxDQUFDO0FBV0QsV0FBVztBQUNYLG1CQUFtQjtBQUNuQixJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakRpQztBQUNXO0FBSWhELHlDQUF5QztBQUV6QyxJQUFJLGdCQUEwQixDQUFDO0FBQy9CLElBQUksVUFBdUIsQ0FBQztBQUU1QixJQUFJLFFBQXFCLENBQUM7QUFFMUIsd0JBQXdCO0FBQ3hCLElBQUksY0FBdUIsQ0FBQztBQUU1QixJQUFJLFNBQWtCLENBQUM7QUFHdkIsU0FBUyxXQUFXO0lBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUUvQixnQkFBZ0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pELGdCQUFnQixDQUFDLEVBQUUsR0FBRyxzQkFBc0IsQ0FBQztJQUM3QyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUscUJBQXFCLENBQUMsQ0FBQztJQUNsRSxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFtQixFQUFFLEVBQUUsR0FBRSxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUMsQ0FBQyxDQUFDO0lBRzFJLCtDQUFpQixDQUFDLGNBQWMsQ0FBQztTQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDVCwrQkFBK0I7UUFDL0IsZ0JBQWdCLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUNsQyxjQUFjLEdBQUcsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDdkUsOERBQThEO1FBQzlELFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUVyRSx5QkFBeUI7UUFDekIsNERBQXFCLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxhQUFhLENBQUMsb0NBQW9DLENBQUMsQ0FBQyxDQUFDO0lBQ3pHLENBQUMsQ0FBQztJQUVOLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsa0JBQWtCLENBQUM7SUFDbkMsOENBQWdCLENBQUMsYUFBYSxDQUFDO1NBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNSLFVBQVUsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO0lBQy9CLENBQUMsQ0FBQztJQUVGLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsZ0JBQWdCLENBQUM7SUFDL0IsOENBQWdCLENBQUMsWUFBWSxDQUFDO1NBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNSLFFBQVEsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO0lBQzdCLENBQUMsQ0FBQztBQUVWLENBQUM7QUFJRCxTQUFTLHFCQUFxQixDQUFDLEtBQWtCO0lBRTdDLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFxQixDQUFDO0lBQzlDLCtDQUErQztJQUUvQzs7TUFFRTtJQUNGLDhFQUE4RTtJQUM5RSw4RUFBOEU7SUFDOUUsMkdBQTJHO0lBQzNHLDhGQUE4RjtJQUU5RixJQUFJO0FBQ1IsQ0FBQztBQUdELFNBQVMsV0FBVztJQUNoQixRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBRXZELFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLHlEQUFrQixFQUFFLENBQUM7SUFDckIsb0NBQW9DO0lBQ3BDLHVEQUF1RDtBQUMzRCxDQUFDO0FBR0QsU0FBUyxXQUFXO0lBQ2hCLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzFCLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUVwQixRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7SUFFbEIseURBQWtCLEVBQUUsQ0FBQztBQUN6QixDQUFDO0FBU0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BHc0M7QUFjaEMsU0FBUyx1QkFBdUIsQ0FBQyxlQUF1QyxFQUFFLG9CQUF5QjtJQUV0RyxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixFQUFFLG9CQUFvQixDQUFDO0lBRTVELGlFQUFpRTtJQUNqRSxJQUFJLGFBQWEsR0FBRyxvQkFBb0IsQ0FBQztJQUV6QyxlQUFlLENBQUMsYUFBYSxHQUFHLG9CQUFvQixDQUFDO0lBQ3JELGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsdUJBQXVCLENBQUM7SUFFckUsZ0VBQWdFO0lBRWhFLGdGQUFnRjtJQUVoRiwyRUFBMkU7SUFDM0UsSUFBSSxLQUFLLEdBQUcsZUFBZSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuRCxLQUFLLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUdyQixLQUFLLE1BQU0sR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQzlCLGdEQUFnRDtRQUNoRCxJQUFJLEdBQUcsS0FBSyxNQUFNLElBQUksR0FBRyxLQUFLLE9BQU8sSUFBSSxHQUFHLEtBQUssTUFBTSxFQUFFLENBQUM7WUFFdEQsS0FBSyxDQUFDLFNBQVMsSUFBSTs7OytCQUdBLEdBQUcsNkJBQTZCLEdBQUc7K0JBQ25DLEdBQUcsa0ZBQWtGLGFBQWEsQ0FBQyxHQUFHLENBQUM7OztHQUduSSxDQUFDO1FBRUksQ0FBQzthQUNJLENBQUM7WUFDRixLQUFLLENBQUMsU0FBUyxJQUFJOzs7K0JBR0EsR0FBRyw2QkFBNkIsR0FBRzsrQkFDbkMsR0FBRyw4QkFBOEIsYUFBYSxDQUFDLEdBQUcsQ0FBQzs7O0dBRy9FLENBQUM7UUFDSSxDQUFDO0lBRUwsQ0FBQztJQUVELGlGQUFpRjtJQUNqRixJQUFJLDBCQUEwQixHQUF3QixLQUFLLENBQUMsZ0JBQWdCLENBQUMsOEJBQThCLENBQUMsQ0FBQztJQUM3Ryx5Q0FBeUM7SUFFekMsZ0ZBQWdGO0lBQ2hGLDRGQUE0RjtJQUM1RixLQUFLO0lBQ0wsc0VBQXNFO0lBQ3RFLDZEQUE2RDtJQUM3RCxxREFBcUQ7SUFFckQseUdBQXlHO0lBQ3pHLDhGQUE4RjtJQUM5Rix1RkFBdUY7SUFDdkYsSUFBSTtBQUVSLENBQUM7QUFFRCxTQUFTLHVCQUF1QixDQUFDLEtBQWlCO0lBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUMxQyxnREFBZ0Q7SUFDaEQsZ0NBQWdDO0lBRWhDLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFxQixDQUFDO0lBQzlDLElBQUksWUFBWSxHQUEyQixJQUFJLENBQUM7SUFFaEQsaUNBQWlDO0lBQ2pDLFFBQVEsV0FBVyxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ3JCLE9BQU87UUFDUCxLQUFLLDhCQUE4QjtZQUMvQixZQUFZLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO1lBQzFELE1BQU07UUFDVixRQUFRO1FBQ1IsS0FBSywrQkFBK0I7WUFDaEMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQztZQUMzRCxNQUFNO1FBQ1YsT0FBTztRQUNQLEtBQUssOEJBQThCO1lBQy9CLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUM7WUFDMUQsTUFBTTtRQUVWO1lBQ0ksTUFBTTtJQUNkLENBQUM7SUFFRCwrQ0FBUSxDQUFDLCtCQUErQixDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUM7U0FDbkUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7UUFDekIsZ0VBQWdFO1FBRWhFLDREQUE0RDtRQUM1RCxzRUFBc0U7UUFFdEUsOEJBQThCO1FBQzlCLGtDQUFrQztRQUVsQyxxR0FBcUc7UUFFckcsc0NBQXNDO1FBRXRDLGlEQUFpRDtRQUNqRCxvREFBb0Q7UUFDcEQseUVBQXlFO1FBQ3pFLElBQUk7UUFFSiwyREFBMkQ7UUFDM0Qsa0VBQWtFO1FBQ2xFLFFBQVEsV0FBVyxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3JCLE9BQU87WUFDUCxLQUFLLDhCQUE4QjtnQkFDL0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLElBQUksWUFBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsa0ZBQWtGLENBQUMsQ0FBQztnQkFDakssTUFBTTtZQUNWLFFBQVE7WUFDUixLQUFLLCtCQUErQjtnQkFDaEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLElBQUksWUFBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsb0ZBQW9GLENBQUMsQ0FBQztnQkFDbkssTUFBTTtZQUNWLE9BQU87WUFDUCxLQUFLLDhCQUE4QjtnQkFDL0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLElBQUksWUFBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsa0ZBQWtGLENBQUMsQ0FBQztnQkFDakssTUFBTTtZQUVWO2dCQUNJLE1BQU07UUFDZCxDQUFDO0lBR0wsQ0FBQyxDQUFDO0lBQ0YsOEdBQThHO0lBRTlHLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLEVBQUUsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBR2pGLGlEQUFpRDtJQUNqRCxzRUFBc0U7QUFFMUUsQ0FBQztBQUdNLFNBQVMscUJBQXFCLENBQUMsS0FBd0IsRUFBRSx3QkFBOEI7SUFFMUYsdUZBQXVGO0lBRXZGLGdFQUFnRTtJQUVoRSxnRkFBZ0Y7SUFHaEYsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUV6QyxLQUFLLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUVyQixLQUFLLE1BQU0sV0FBVyxJQUFJLHdCQUF3QixFQUFFLENBQUM7UUFFakQsSUFBSSxrQkFBa0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBd0IsQ0FBQztRQUU3RSxrQkFBa0IsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFFNUMsMEVBQTBFO1FBQzFFLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQWEsRUFBRSxFQUFFO1lBQzNELGdHQUFnRztZQUNoRyxJQUFJLG9CQUFvQixHQUFHLEtBQUssQ0FBQyxhQUFvQyxDQUFDO1lBQ3RFLDhEQUE4RDtZQUM5RCxJQUFJLGVBQWUsR0FBRyxJQUFJLFdBQVcsQ0FBRSxZQUFZLEVBQUU7Z0JBQ2pELE9BQU8sRUFBRSxJQUFJO2dCQUNiLE1BQU0sRUFBRSxFQUFDLGFBQWEsRUFBRSxvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUM7YUFFdEUsQ0FBQyxDQUFDO1lBQ1AsSUFBSSxLQUFLLEdBQUcsSUFBMkIsQ0FBQztZQUN4QyxrQ0FBa0M7WUFDbEMsZ0RBQWdEO1lBRWhELG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUV2RCxDQUFDLENBQUM7UUFFSCxrQkFBa0IsQ0FBQyxFQUFFLEdBQUcseUJBQXlCLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDNUUsa0JBQWtCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQzFELGtCQUFrQixDQUFDLGlCQUFpQixHQUFHLFdBQVcsQ0FBQztRQUVuRCxrQkFBa0IsQ0FBQyxTQUFTLElBQUk7O3NDQUVGLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxrQ0FBa0MsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLO3NDQUMvRyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksa0NBQWtDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSzs7R0FFbEosQ0FBQztRQUVJLHdFQUF3RTtRQUV4RSxvRkFBb0Y7UUFHcEYsdUVBQXVFO1FBRXZFLEtBQUssQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUM7SUFFekMsQ0FBQztBQUVMLENBQUM7QUFFTSxTQUFTLDBCQUEwQixDQUFDLGtCQUF3QixFQUFFLGNBQW9CO0lBQ3JGLG9DQUFvQztJQUVwQyxtRUFBbUU7SUFFbkUsa0VBQWtFO0lBQ2xFLDZEQUE2RDtJQUM3RCxJQUFJLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0Qsa0NBQWtDO0lBRWxDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBRXJCLEtBQUssSUFBSSxXQUFXLElBQUksY0FBYyxFQUFFLENBQUM7UUFFckMsSUFBSSxZQUFZLEdBQUc7O2lDQUVNLFdBQVcsQ0FBQyxJQUFJLGtEQUFrRCxXQUFXLENBQUMsS0FBSztpQ0FDbkYsV0FBVyxDQUFDLElBQUksa0RBQWtELFdBQVcsQ0FBQyxLQUFLOzthQUV2RyxDQUFDO1FBQ04seUNBQXlDO1FBQ3pDLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUF3QixDQUFDO1FBQzdELEVBQUUsQ0FBQyxFQUFFLEdBQUcsdUJBQXVCLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztRQUNuRCxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3pDLEVBQUUsQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDO1FBQzVCLHVCQUF1QjtRQUN2QixzQ0FBc0M7UUFDdEMsRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbEMsRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLG1CQUFtQjtRQUNuQixFQUFFLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztRQUM1QiwrQ0FBK0M7UUFDL0MsK0JBQStCO1FBRS9CLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakIsa0JBQWtCO0lBQ3RCLENBQUM7QUFFTCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pRcUM7QUFDRDtBQUVBO0FBRXJDLElBQUksU0FBbUIsQ0FBQztBQUV4QixJQUFJLDZCQUE4QyxDQUFDO0FBRW5ELElBQUksZ0JBQTBCLENBQUM7QUFDL0IsSUFBSSxVQUF1QixDQUFDO0FBRTVCLElBQUksd0JBQXNDLENBQUM7QUFDM0MsSUFBSSxzQkFBbUMsQ0FBQztBQUV4QyxJQUFJLG9CQUFxQyxDQUFDO0FBQzFDLElBQUksa0JBQWtCLEdBQWEsS0FBSyxDQUFDO0FBRXpDLElBQUksb0JBQXlCLENBQUM7QUFDOUIsSUFBSSxrQkFBb0MsQ0FBQztBQUV6QyxJQUFJLDBCQUFnQyxDQUFDO0FBQ3JDLElBQUksb0JBQXVDLENBQUM7QUFFNUMsSUFBSSxzQkFBOEMsQ0FBQztBQUduRCxrQ0FBa0M7QUFDbEMsd0JBQXdCO0FBQ3hCLElBQUk7QUFFSiw4REFBOEQ7QUFDOUQsdUJBQXVCO0FBQ3ZCLElBQUk7QUFHSixTQUFTLFlBQVksQ0FBQyxVQUFvQixFQUFFLDhCQUErQztJQUN2RixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFFL0IsU0FBUyxHQUFHLFVBQVUsQ0FBQztJQUV2Qiw0QkFBNEI7SUFDNUIsNkJBQTZCLEdBQUcsOEJBQThCLENBQUM7SUFDL0QsNkJBQTZCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLHlCQUF5QixDQUFDO0lBQ2xGLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7SUFFbEYsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRCxnQkFBZ0IsQ0FBQyxFQUFFLEdBQUcsc0JBQXNCLENBQUM7SUFDN0MsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBRXpELCtDQUFpQixDQUFDLGVBQWUsQ0FBQztTQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDVCwrQkFBK0I7UUFDL0IsZ0JBQWdCLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUNsQyxrQkFBa0IsR0FBRyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0Qsb0JBQW9CLEdBQUcsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDbkYsc0JBQXNCLEdBQUcsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDdkYsb0JBQW9CLEdBQUcsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDakYsb0JBQW9CLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ2xFLG9CQUFvQixDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXBFLDRDQUE0QztRQUM1Qyw0QkFBNEI7UUFDNUIsd0JBQXdCLEdBQUcsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDckYsSUFBSSx3QkFBd0IsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FDakQsNEJBQTRCLENBQy9CLENBQUM7UUFDRixJQUFJLGdCQUFnQixHQUFHLE9BQU8sd0JBQXdCLEdBQUcsQ0FBQztRQUMxRCx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLGdCQUFnQixDQUFDO0lBRXRFLENBQUMsQ0FBQztJQUVOLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsa0JBQWtCLENBQUM7SUFDbkMsOENBQWdCLENBQUMsY0FBYyxDQUFDO1NBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNSLFVBQVUsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO0lBQy9CLENBQUMsQ0FBQztJQUlGLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQztJQUU1QyxTQUFTLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFHbkMsa0JBQWtCLENBQUMsRUFBRSxDQUFDO1NBQ2pCLElBQUksQ0FBQyxDQUFDLGtCQUFrQixFQUFFLEVBQUU7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQztRQUMvQixvRUFBOEIsQ0FBQyxrQkFBa0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0lBQzdFLENBQUMsQ0FBQztBQUdWLENBQUM7QUFFRCxTQUFTLHlCQUF5QixDQUFDLEtBQWlCO0lBQ2hELElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFxQixDQUFDO0lBQzlDLFFBQVEsV0FBVyxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ3JCLEtBQUssTUFBTTtZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztZQUMzQixNQUFNO1FBQ1YsS0FBSyxNQUFNO1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDO1lBQzNCLE1BQU07UUFDVixLQUFLLE1BQU07WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7WUFDM0IsTUFBTTtRQUNWLEtBQUssTUFBTTtZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztZQUMzQixNQUFNO1FBQ1YsS0FBSyxNQUFNO1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDO1lBQzNCLE1BQU07UUFFVjtZQUNJLE1BQU07SUFDZCxDQUFDO0FBRUwsQ0FBQztBQUVELFNBQVMsc0JBQXNCLENBQUMsS0FBaUI7SUFDN0MsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDLE1BQXFCLENBQUM7SUFDOUMsK0NBQStDO0lBRS9DLElBQUksZ0JBQWdCLEdBQVksV0FBVyxDQUFDLEVBQUUsS0FBSyxtQ0FBbUMsSUFBSSxXQUFXLENBQUMsRUFBRSxLQUFLLHdCQUF3QixDQUFDO0lBQ3RJLHdEQUF3RDtJQUV4RCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNwQix3Q0FBd0M7UUFDeEMsSUFBSSxrQkFBa0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDdEYsa0JBQWtCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztJQUN2RCxDQUFDO0FBQ0wsQ0FBQztBQUlEOzs7O0dBSUc7QUFFSCxTQUFTLFlBQVksQ0FBQyxLQUFZO0lBRTlCLHVEQUF1RDtJQUN2RCxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUMsTUFBcUIsQ0FBQztJQUdsRCxhQUFhO0lBQ1QsSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxFQUFDLENBQUM7UUFDNUQsaURBQWlEO1FBQ2pELElBQUksY0FBYyxHQUFHLFdBQVcsQ0FBQyxhQUFvQyxDQUFDO1FBQ3RFLFlBQVk7UUFDWixRQUFRLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBRzFGLGlFQUEyQixDQUFDLHNCQUFzQixFQUFFLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvRSw2QkFBNkI7UUFDN0Isb0JBQW9CLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7YUFDekMsSUFBSSxDQUFDLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxHQUFHLCtEQUF5QixDQUFDLG9CQUFvQixFQUFFLDBCQUEwQixDQUFDLEdBQUMsQ0FDL0csQ0FBQztRQUVGLGlDQUFpQztRQUNqQyxRQUFRLENBQUMsY0FBYyxDQUFDLDJCQUEyQixDQUFDLENBQUMsS0FBSyxFQUFFO0lBQ2hFLENBQUM7SUFDTCxvQ0FBb0M7U0FDM0IsSUFDRSxXQUFXLENBQUMsRUFBRSxJQUFJLHlCQUF5QjtXQUMzQyxXQUFXLENBQUMsRUFBRSxJQUFJLDJCQUEyQjtXQUM3QyxXQUFXLENBQUMsRUFBRSxJQUFJLDZCQUE2QixFQUNyRCxDQUFDO1FBQ0UsMkRBQTJEO1FBQzNELGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0wsc0JBQXNCO1NBQ2IsSUFBSSxXQUFXLENBQUMsRUFBRSxJQUFJLHdCQUF3QixFQUFFLENBQUM7UUFDbEQsZ0VBQWdFO1FBQ2hFLGlCQUFpQixFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUNMLFFBQVE7U0FDQyxJQUFJLFdBQVcsQ0FBQyxFQUFFLElBQUksa0JBQWtCLEVBQUUsQ0FBQztRQUM1QyxvREFBb0Q7UUFDcEQsSUFBSSx1QkFBdUIsR0FBaUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQzVGLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDekssQ0FBQztTQUVHLENBQUM7UUFDRCx5Q0FBeUM7SUFDN0MsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFTLGlCQUFpQjtJQUN0QixxQ0FBcUM7SUFDckMsSUFBSSxrQkFBa0IsR0FBRyx3QkFBd0IsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQzFFLElBQUksT0FBTyxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQztJQUN0QyxJQUFJLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7SUFFMUMsSUFBSSxzQkFBc0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7SUFDMUYsc0JBQXNCLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ25ELHNCQUFzQixDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsU0FBUyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7SUFFeEQsc0JBQXNCLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUN4TCxDQUFDO0FBSUQsU0FBUyxlQUFlO0lBQ3BCLG1DQUFtQztJQUNuQyw2QkFBNkI7SUFDN0Isa0RBQWtEO0lBQ2xELHdCQUF3QjtJQUN4Qix3RkFBd0Y7SUFFeEYsNkRBQTZEO0lBQzdELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ3RCLG9CQUFvQixDQUFDLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLGlEQUFpRDtRQUNyRyw4REFBOEQ7SUFDbEUsQ0FBQztJQUNELCtCQUErQjtJQUMvQix3RUFBd0U7SUFDeEUsb0JBQW9CLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLG1CQUFtQixDQUFDO0lBQ3JFLHlCQUF5QjtBQUM3QixDQUFDO0FBR0QsU0FBUyxnQkFBZ0I7SUFDckIscUNBQXFDO0lBRXJDLElBQUksa0JBQWtCLEdBQUcsb0JBQW9CLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztJQUNqRSxJQUFHLGtCQUFrQixLQUFLLENBQUMsRUFBQyxDQUFDO1FBQ3pCLHNDQUFzQztRQUN0QyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDM0Isb0JBQW9CLENBQUMsU0FBUyxHQUFHLG1DQUFtQyxDQUFDO0lBQ3pFLENBQUM7U0FDRyxDQUFDO1FBQ0Qsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO0lBQzlCLENBQUM7SUFDRCxtREFBbUQ7SUFDbkQsd0JBQXdCO0lBQ3hCLDhCQUE4QjtJQUM5QixrQ0FBa0M7SUFDbEMsMkVBQTJFO0lBQzNFLG9CQUFvQixDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxtQkFBbUIsQ0FBQztBQUM1RSxDQUFDO0FBR0QsOEZBQThGO0FBQzlGLFNBQWUsbUJBQW1CLENBQUMsS0FBcUI7O1FBQ3BELDZCQUE2QjtRQUM3Qix3Q0FBd0M7UUFDeEMsMENBQTBDO1FBRTFDLGdHQUFnRztRQUNoRyw4R0FBOEc7UUFDOUcsSUFBSSxLQUFLLENBQUMsR0FBRyxLQUFLLFdBQVcsSUFBSSxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBQyxDQUFDO1lBQzVFLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUMsQ0FBQztZQUNuRCxvQkFBb0IsQ0FBQyxTQUFTLEdBQUcsaUJBQWlCLENBQUMsQ0FBQyxpREFBaUQ7WUFDckcsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzNCLENBQUM7UUFHRCxvREFBb0Q7UUFDcEQsMklBQTJJO1FBQzNJLFVBQVUsQ0FBQyxHQUFTLEVBQUU7WUFFbEIsd0ZBQXdGO1lBRXhGLGtCQUFrQixDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQztpQkFDL0MsSUFBSSxDQUFDLENBQUMsa0JBQWtCLEVBQUUsRUFBRTtnQkFDekIsa0NBQWtDO2dCQUNsQyxvRUFBOEIsQ0FBQyxrQkFBa0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBQzdFLENBQUMsQ0FBQztZQUVOLDhDQUE4QztZQUU5QywrQ0FBK0M7WUFFL0MseUNBQXlDO1FBRTdDLENBQUMsR0FBRSxHQUFHLENBQUMsQ0FBQztJQUdaLENBQUM7Q0FBQTtBQUdELFNBQVMsZ0JBQWdCLENBQUMsUUFBaUI7SUFDdkMsc0JBQXNCO0lBRXRCLGFBQWE7SUFDYixJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDbEUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUUzQyxvQkFBb0I7SUFDcEIsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyx5QkFBeUIsQ0FBQztJQUNyRSxJQUFJLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLDJCQUEyQixDQUFDO0lBQ3pFLElBQUksZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyw2QkFBNkIsQ0FBQztJQUM3RSxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3JELGNBQWMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDdkQsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBRXpELG1CQUFtQjtJQUNuQixJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDcEUsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBQ3hFLElBQUksZUFBZSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUM1RSxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzdDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDL0MsZUFBZSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUVqRCx5QkFBeUI7SUFDekIsSUFBSSxRQUFRLEtBQUsseUJBQXlCLEVBQUMsQ0FBQztRQUN4QyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2hELFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDbEQsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNsRCxDQUFDO1NBQ0ksSUFBSSxRQUFRLEtBQUssMkJBQTJCLEVBQUMsQ0FBQztRQUMvQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2xELGNBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDeEQsQ0FBQztTQUNJLElBQUksUUFBUSxLQUFLLDZCQUE2QixFQUFDLENBQUM7UUFDakQsZUFBZSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNwRCxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDMUQsQ0FBQztBQUVMLENBQUM7QUFFRCxTQUFTLG1CQUFtQixDQUFDLFFBQXFCO0lBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLEVBQUUsUUFBUSxDQUFDO0FBQ3BELENBQUM7QUFDRCxTQUFTLDBCQUEwQixDQUFDLFFBQXFCO0lBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsUUFBUSxDQUFDO0FBQ3JELENBQUM7QUFDRCxTQUFTLDRCQUE0QixDQUFDLFFBQXFCO0lBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsUUFBUSxDQUFDO0FBQ3ZELENBQUM7QUFDRCxTQUFTLDhCQUE4QixDQUFDLFFBQXFCO0lBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEVBQUUsUUFBUSxDQUFDO0FBQ3pELENBQUM7QUFDRCxTQUFTLCtCQUErQixDQUFDLFFBQXFCO0lBQzFELE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsUUFBUSxDQUFDO0FBQ3RELENBQUM7QUFDRCxTQUFTLHVCQUF1QixDQUFDLFFBQTZCO0lBQzFELE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsUUFBUSxDQUFDO0FBQ2hELENBQUM7QUFHRCxTQUFTLGtCQUFrQixDQUFDLFlBQXFCO0lBQzdDLE9BQU8sK0NBQVEsQ0FBQywrQkFBK0IsQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1NBQ2pGLElBQUksQ0FBQyxDQUFDLGtCQUF1QixFQUFFLEVBQUU7UUFDOUIsbUNBQW1DO1FBQ25DLG9CQUFvQixHQUFHLGtCQUFrQixDQUFDO1FBQzFDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQy9DLENBQUMsQ0FBQztTQUNELEtBQUssQ0FBQyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3JCLE9BQU8sT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzVCLENBQUMsQ0FBQztBQUNWLENBQUM7QUFFRCxTQUFTLG9CQUFvQixDQUFDLElBQXNCO0lBQ2hELE9BQU8sK0NBQVEsQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUM7U0FDOUMsSUFBSSxDQUFDLENBQUMsc0JBQTJCLEVBQUUsRUFBRTtRQUNsQyxtQ0FBbUM7UUFDbkMsMEJBQTBCLEdBQUcsc0JBQXNCLENBQUM7UUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO1FBRXpFLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBQ3ZELENBQUMsQ0FBQztTQUNELEtBQUssQ0FBQyxDQUFDLEtBQVksRUFBRSxFQUFFO1FBQ3BCLE9BQU8sT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzVCLENBQUMsQ0FBQztBQUNWLENBQUM7QUFFRCxTQUFTLFNBQVM7SUFDZCxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNyQyxDQUFDO0FBR0QsU0FBUyxTQUFTO0lBQ2QsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3hCLENBQUM7QUFTQTs7Ozs7OztVQ25ZRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7OztBQ0hxQztBQUVyQyxJQUFJLG1CQUFtQixHQUFFO0lBQ3JCLE1BQU0sRUFBRSxLQUFLO0NBQ2hCLENBQUM7QUFHRixnQ0FBZ0M7QUFDaEMsQ0FBQyxTQUFTLElBQUk7SUFDVixpREFBbUIsRUFBRSxDQUFDO0lBRXRCLGtFQUFrRTtBQUV0RSxDQUFDLENBQUMsRUFBRSxDQUFDO0FBR0wsa0NBQWtDO0FBQ2xDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO0lBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUM7SUFFakQsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLGlCQUFpQixFQUFFLENBQUM7UUFDckMsSUFBSSxtQkFBbUIsQ0FBQyxNQUFNO1lBQzFCLElBQUksRUFBRSxDQUFDOztZQUVQLEtBQUssRUFBRSxDQUFDO0lBQ2hCLENBQUM7QUFFTCxDQUFDLENBQUMsQ0FBQztBQUdIOztHQUVHO0FBQ0gsU0FBUyxLQUFLO0lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVyQixtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBRWxDLHVEQUF1RDtJQUV2RCxpREFBbUIsRUFBRSxDQUFDO0FBQzFCLENBQUM7QUFHRDs7O0dBR0c7QUFDSCxTQUFTLElBQUk7SUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BCLG1CQUFtQixDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDbkMsaURBQW1CLEVBQUUsQ0FBQztBQUMxQixDQUFDO0FBR0Qsa0NBQWtDO0FBR2xDLDZCQUE2QjtBQUU3QiwwQ0FBMEM7QUFFMUMsZ0JBQWdCO0FBRWhCLGdCQUFnQjtBQUNoQixjQUFjO0FBQ2QsWUFBWTtBQUNaLElBQUk7QUFHSiwrQkFBK0I7QUFDL0IsdUJBQXVCO0FBQ3ZCLElBQUk7QUFDSixtQkFBbUI7QUFFbkIsK0NBQStDO0FBQy9DLHlEQUF5RDtBQUN6RCxJQUFJO0FBRUosdUJBQXVCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc291cmNlcy8uL3dlYmV4dGVuc2lvbi93cC1kZXYvZGJpLXNlbmQudHMiLCJ3ZWJwYWNrOi8vc291cmNlcy8uL3dlYmV4dGVuc2lvbi93cC1kZXYvZmV0Y2hlci50cyIsIndlYnBhY2s6Ly9zb3VyY2VzLy4vd2ViZXh0ZW5zaW9uL3dwLWRldi9vdmVybGF5LnRzIiwid2VicGFjazovL3NvdXJjZXMvLi93ZWJleHRlbnNpb24vd3AtZGV2L3Byb2plY3RzL3Byb2plY3RfZG9tLnRzIiwid2VicGFjazovL3NvdXJjZXMvLi93ZWJleHRlbnNpb24vd3AtZGV2L3Byb2plY3RzL3Byb2plY3RzLnRzIiwid2VicGFjazovL3NvdXJjZXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc291cmNlcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc291cmNlcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NvdXJjZXMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zb3VyY2VzLy4vd2ViZXh0ZW5zaW9uL3dwLWRldi9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcblxubGV0IGFnZV9hcGlVcmwgPSAnaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS92MDInO1xuXG5leHBvcnQgZnVuY3Rpb24gdGVzdCgpIDogdm9pZCB7XG5cblx0Y29uc29sZS5sb2coXCJMb2FkZWQgZGJpLXNlbmQudHNcIilcblx0XG59XG5cbmJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKHJlcXVlc3QpIDogUHJvbWlzZTxhbnk+ID0+IHtcblx0Y29uc29sZS5sb2coXCJNZXNzYWdlIHJlY2lldmVkIGluIGRiaS1zZW5kLnRzIVwiKTtcblxuXHRpZiAocmVxdWVzdC5uYW1lID09PSBcInNldEFwaUJhc2VcIikge1xuXHRcdC8vIGNvbnNvbGUubG9nKFwiMTExMVwiKVxuXHRcdGFnZV9hcGlVcmwgPSByZXF1ZXN0LmFwaUJhc2VTdHJpbmc7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IHJlc3BvbnNlOiBcIkFwaSB1cGRhdGVkIGluIGNvbnRlbnQgc2NyaXB0LiBbZGJpLXNlbmQuanNdXCIsIG5ld0FwaVN0cmluZzogYWdlX2FwaVVybCB9KTtcblxuXHR9XG5cblxuXHRpZiAocmVxdWVzdC5uYW1lID09PSBcImdldEFwaUJhc2VcIikge1xuXHRcdC8vIGNvbnNvbGUubG9nKFwiMjIyMlwiKVxuXHRcdFxuXHRcdC8vIFByb21pc2UucmVzb2x2ZSA6IHN0YXRpYyBtZXRob2QgdGhhdCByZXR1cm5zIGEgcmVzb2x2ZWQgUHJvbWlzZSBvYmplY3Qgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgYXBpU3RyaW5nOiBhZ2VfYXBpVXJsIH0pO1xuXG5cdH1cblxufSk7XG5cbmNsYXNzIGFnZV9kYmlzIHtcblxuXHQvKiBcblx0XHRDT05URU5UXG5cdCovXG5cblx0c3RhdGljIGFzeW5jIENvbnRlbnRfSW5zZXJ0T25UYWJsZShUYWJsZU5hbWUgOiBzdHJpbmcpIHtcblx0XHRjb25zdCB1cmwgPSBhZ2VfYXBpVXJsICsgYC9jb250ZW50L0NvbnRlbnQtSW5zZXJ0T25UYWJsZT9UYWJsZT0ke1RhYmxlTmFtZX1gO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdQT1NUJ1xuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cdHN0YXRpYyBhc3luYyBDb250ZW50X1NlbGVjdE9uVXVpZChVdWlkIDogc3RyaW5nIHwgbnVtYmVyKSB7XG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnQvQ29udGVudC1TZWxlY3RPblV1aWQ/VXVpZD0ke1V1aWR9YDtcblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnR0VUJyxcblx0XHR9O1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiRmV0Y2ggcmV0dXJuZWQgXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIiBmcm9tIFwiICsgdXJsKTtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXHRzdGF0aWMgYXN5bmMgQ29udGVudF9VcGRhdGVXaXRoQ29udGVudE9iamVjdChjb250ZW50T2JqZWN0IDogYW55KSB7XG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnQvQ29udGVudC1VcGRhdGVXaXRoQ29udGVudE9iamVjdGA7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ1BVVCcsXG5cdFx0XHRoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLCB9LFxuXHRcdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkoY29udGVudE9iamVjdCksXG5cdFx0fTtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkZldGNoIHJldHVybmVkIFwiICsgcmVzcG9uc2Uuc3RhdHVzICsgXCIgZnJvbSBcIiArIHVybCk7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMsIHVybClcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblx0c3RhdGljIGFzeW5jIENvbnRlbnRfRHJvcEZ1bGxPblV1aWQoVXVpZCA6IHN0cmluZyB8IG51bWJlcikge1xuXHRcdGxldCB1cmwgPSBhZ2VfYXBpVXJsICsgYC9jb250ZW50L0NvbnRlbnQtRHJvcEZ1bGxPblV1aWQ/VXVpZD0ke1V1aWR9YDtcblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnREVMRVRFJyxcblx0XHR9O1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiRmV0Y2ggcmV0dXJuZWQgXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIiBmcm9tIFwiICsgdXJsKTtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXHRzdGF0aWMgYXN5bmMgQ29udGVudF9TZWxlY3RPblRpdGxlTGlrZVN0cmluZyhzZWFyY2hTdHJpbmc6IHN0cmluZywgdGFibGVMaW1pdDogc3RyaW5nLCBpbmNsdWRlVGFibGU6IHN0cmluZywgb3JkZXJDb2x1bW46IHN0cmluZywgZGVzYzogc3RyaW5nKSA6IFByb21pc2U8YW55PiB7XG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnQvQ29udGVudC1TZWxlY3RPblRpdGxlTGlrZVN0cmluZz9zZWFyY2hTdHJpbmc9JHtzZWFyY2hTdHJpbmd9JnRhYmxlTGltaXQ9JHt0YWJsZUxpbWl0fSZpbmNsdWRlVGFibGU9JHtpbmNsdWRlVGFibGV9Jm9yZGVyQ29sdW1uPSR7b3JkZXJDb2x1bW59JmRlc2M9JHtkZXNjfWA7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0fTtcblxuXHRcdFxuXHRcdHRyeSB7XG5cdFx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Ly8gY29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblx0c3RhdGljIGFzeW5jIFJldmlld19JbnNlcnRTY2hlZHVsZU9uVXVpZChVdWlkIDogc3RyaW5nIHwgbnVtYmVyLCBzY2hlZHVsZVR5cGUgOiBzdHJpbmd8IG51bWJlcikge1xuXHRcdGNvbnN0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnQvUmV2aWV3LUluc2VydFNjaGVkdWxlT25VdWlkP1V1aWQ9JHtVdWlkfSZzY2hlZHVsZVR5cGU9JHtzY2hlZHVsZVR5cGV9YDtcblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0bWV0aG9kOiAnUE9TVCdcblx0XHR9O1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKTtcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFwiRmV0Y2ggcmV0dXJuZWQgXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIiBmcm9tIFwiICsgdXJsKTtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cywgdXJsKVxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXHRzdGF0aWMgYXN5bmMgUmV2aWV3X1NlbGVjdEN1cnJlbnRSZXZpZXcoKSB7XG5cdFx0bGV0IHVybCA9IGFnZV9hcGlVcmwgKyBgL2NvbnRlbnQvUmV2aWV3LVNlbGVjdEN1cnJlbnRSZXZpZXdgO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cblxuXG5cblxuXHQvKiBcblx0XHRcdENPTlRFTlQgRURHRVxuXHQqL1xuXHRzdGF0aWMgYXN5bmMgQ29udGVudEVkZ2VfU2VsZWN0Q2hpbGRPZlV1aWQoVXVpZCA6IHN0cmluZyB8IG51bWJlcikge1xuXHRcdGxldCB1cmwgPSBhZ2VfYXBpVXJsICsgYC9jb250ZW50ZWRnZS9Db250ZW50RWRnZS1TZWxlY3RDaGlsZE9mVXVpZD9VdWlkPSR7VXVpZH1gO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdH07XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJGZXRjaCByZXR1cm5lZCBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIGZyb20gXCIgKyB1cmwpO1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Ly8gY29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzLCB1cmwpXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxufTtcblxuZXhwb3J0IHtcblx0YWdlX2RiaXMsXG59IiwiXG5pbXBvcnQgeyB0ZXN0IH0gZnJvbSBcIi4vZGJpLXNlbmRcIlxudGVzdCgpO1xuXG5cblxuY29uc3QgaHRtbEZvbGRlciA9ICdodG1sLyc7XG5jb25zdCBjc3NGb2xkZXIgPSAnY3NzLyc7XG5cblxuXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hIdG1sKGZpbGVuYW1lIDogc3RyaW5nKSA6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgXG4gICAgICAgIGxldCB1cmwgPSBicm93c2VyLnJ1bnRpbWUuZ2V0VVJMKFxuICAgICAgICAgICAgaHRtbEZvbGRlciArIGZpbGVuYW1lXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gdGhpcyBpcyB0aCBlcHJvbWlzZSB0aGF0IHdlIHJldHVybiBhbmQgbGV0dGluZyB0aGUgZmV0Y2ggZnVuY3Rpb24gaGFuZGxlIHJlc29sdmluZyB0aGUgcHJvbWlzZVxuICAgICAgICByZXR1cm4gZmV0Y2godXJsKVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UudGV4dCgpKVxuICAgICAgICAgICAgLnRoZW4odGV4dCA9PiB0ZXh0KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IFwiRXJyb3IgaW4gJ2ZldGNoSHRtbCcuIEZpbGU6ICBmZXRjaGVyLnRzIFwiKVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBmZXRjaENzcyhmaWxlbmFtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcblxuICAgIGxldCB1cmwgPSBicm93c2VyLnJ1bnRpbWUuZ2V0VVJMKFxuICAgICAgICBjc3NGb2xkZXIgKyBmaWxlbmFtZVxuICAgICk7XG5cbiAgICAvLyB0aGlzIGlzIHRoIGVwcm9taXNlIHRoYXQgd2UgcmV0dXJuIGFuZCBsZXR0aW5nIHRoZSBmZXRjaCBmdW5jdGlvbiBoYW5kbGUgcmVzb2x2aW5nIHRoZSBwcm9taXNlXG4gICAgcmV0dXJuIGZldGNoKHVybClcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UudGV4dCgpKVxuICAgICAgICAudGhlbih0ZXh0ID0+IHRleHQpXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBcIkVycm9yIGluICdmZXRjaENzcycuIEZpbGU6IGZldGNoZXIudHNcIilcbn1cblxuXG50eXBlIFRmZXRjaGVyID0ge1xuICAgIGZldGNoSHRtbCA6IFByb21pc2U8c3RyaW5nPlxufVxuXG5leHBvcnQgdHlwZSB7XG4gICAgVGZldGNoZXJcbn07XG5cbi8vIGV4cG9ydCB7XG4vLyAgICAgZmV0Y2hIdG1sIDogXG4vLyB9XG5cbiIsImltcG9ydCAqIGFzIGZldGNoZXIgZnJvbSBcIi4vZmV0Y2hlclwiO1xuaW1wb3J0ICogYXMgcHJvamVjdHMgZnJvbSBcIi4vcHJvamVjdHMvcHJvamVjdHNcIjtcblxuaW1wb3J0IHsgSFRNTFByb2plY3RDaGlsZFJvdyB9IGZyb20gXCIuL3Byb2plY3RzL3Byb2plY3RfZG9tXCI7XG5cbi8vIGltcG9ydCB7IGFnZV9kYmlzIH0gZnJvbSBcIi4vZGJpLXNlbmRcIjtcblxubGV0IG92ZXJsYXlDb250YWluZXIgOiBFbGVtZW50O1xubGV0IG92ZXJsYXlDc3M6IEhUTUxFbGVtZW50O1xuXG5sZXQgdGFibGVDc3M6IEhUTUxFbGVtZW50O1xuXG4vLyBvdGhlciBjYWNoZWQgZWxlbWVudHNcbmxldCBjb250ZXh0T3ZlcmxheTogRWxlbWVudDtcblxubGV0IHNpZGVQYW5lbDogRWxlbWVudDtcblxuXG5mdW5jdGlvbiBpbml0T3ZlcmxheSgpIDogdm9pZHtcbiAgICBjb25zb2xlLmxvZygnT1ZFUkxBWSBUUyBJTklUJyk7XG5cbiAgICBvdmVybGF5Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgb3ZlcmxheUNvbnRhaW5lci5pZCA9IFwiYWdlX292ZXJsYXlDb250YWluZXJcIjsgXG4gICAgb3ZlcmxheUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXh0ZW5zaW9uQ2xpY2tIYW5kbGVyKTtcbiAgICBvdmVybGF5Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2Fkc291cmNlXCIsIChldmVudCA6IEN1c3RvbUV2ZW50KSA9PiB7Y29uc29sZS5sb2coJ2xvYWQgc291cmNlIGV2ZW50IScsIGV2ZW50LmRldGFpbC5jb250ZW50T2JqZWN0KX0pOyBcblxuXG4gICAgZmV0Y2hlci5mZXRjaEh0bWwoXCJvdmVybGF5Lmh0bWxcIilcbiAgICAgICAgLnRoZW4oaHRtbCA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkhUTUwgOiBcIiwgaHRtbClcbiAgICAgICAgICAgIG92ZXJsYXlDb250YWluZXIuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgICAgIGNvbnRleHRPdmVybGF5ID0gb3ZlcmxheUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiI2FnZV9jb250ZXh0T3ZlcmxheVwiKTtcbiAgICAgICAgICAgIC8vIGNvbnRleHRPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoaWRlQ29udGV4dE1lbnVzKTtcbiAgICAgICAgICAgIHNpZGVQYW5lbCA9IG92ZXJsYXlDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2Vfb3ZlcmxheVJpZ2h0UGFuZWxcIik7XG5cbiAgICAgICAgICAgIC8vIFBhc3MgdGhlIGNvbnRleHQgbWVudSFcbiAgICAgICAgICAgIHByb2plY3RzLmluaXRQcm9qZWN0cyhzaWRlUGFuZWwsIGNvbnRleHRPdmVybGF5LnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX21vcmVQcm9qZWN0T3B0aW9uc0NvbnRleHRNZW51XCIpKTtcbiAgICAgICAgfSlcblxuICAgIG92ZXJsYXlDc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gICAgb3ZlcmxheUNzcy5pZCA9IFwiYWdlX292ZXJsYXlTdHlsZVwiO1xuICAgIGZldGNoZXIuZmV0Y2hDc3MoXCJvdmVybGF5LmNzc1wiKVxuICAgIC50aGVuKGNzcyA9PiB7XG4gICAgICAgIG92ZXJsYXlDc3MuaW5uZXJUZXh0ID0gY3NzO1xuICAgIH0pXG5cbiAgICB0YWJsZUNzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgICB0YWJsZUNzcy5pZCA9IFwiYWdlX3RhYmxlU3R5bGVcIjtcbiAgICBmZXRjaGVyLmZldGNoQ3NzKFwidGFibGVzLmNzc1wiKSBcbiAgICAgICAgLnRoZW4oY3NzID0+IHtcbiAgICAgICAgICAgIHRhYmxlQ3NzLmlubmVyVGV4dCA9IGNzcztcbiAgICAgICAgfSlcblxufVxuXG5cblxuZnVuY3Rpb24gZXh0ZW5zaW9uQ2xpY2tIYW5kbGVyKGV2ZW50IDogTW91c2VFdmVudCl7XG5cbiAgICBsZXQgZXZlbnRUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgLy8gY29uc29sZS5sb2coJ19eX15fXl9eX15fXicsIGV2ZW50VGFyZ2V0LmlkKTtcbiAgICBcbiAgICAvKiBcbiAgICAgICAgTk9URTogVEhJUyBIQVMgQkVFTiBNT1ZFRCBUTyBJVFMgT1dOIEVWRU5UIVxuICAgICovXG4gICAgLy8gaWYgKGV2ZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWdlX3Byb2pjaGlsZFRhYmxlUm93XCIpKXtcbiAgICAvLyAgICAgbGV0IHByb2plY3RDaGlsZFJvdyA9IGV2ZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQgYXMgSFRNTFByb2plY3RDaGlsZFJvdztcbiAgICAvLyAgICAgLy8gY29uc29sZS5sb2coJ0NsaWNrZWQgb24gY2hpbGQgcm93IHdpdGggdXVpZCA9ICcsIHByb2plY3RDaGlsZFJvdy5Db250ZW50RWRnZU9iamVjdC5jb250ZW50LlV1aWQpO1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhcIlRPRE86IExPQUQgQ0xJQ0tFRCBTT1VSQ0VTISBcIiwgcHJvamVjdENoaWxkUm93LkNvbnRlbnRFZGdlT2JqZWN0LmNvbnRlbnQpO1xuICAgICAgICBcbiAgICAvLyB9XG59XG5cblxuZnVuY3Rpb24gc2hvd092ZXJsYXkoKSA6IHZvaWR7XG4gICAgZG9jdW1lbnQuYm9keS5sYXN0RWxlbWVudENoaWxkLmFmdGVyKG92ZXJsYXlDb250YWluZXIpO1xuXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmQob3ZlcmxheUNzcyk7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmQodGFibGVDc3MpO1xuICAgIHByb2plY3RzLmFwcGVuZENzcygpO1xuICAgIC8vIGZldGNoZXIuZmV0Y2hIdG1sKFwib3ZlcmxheS5odG1sXCIpXG4gICAgLy8gICAgIC50aGVuKGh0bWwgPT4gb3ZlcmxheUNvbnRhaW5lci5pbm5lckh0bWwgPSBodG1sKVxufVxuXG5cbmZ1bmN0aW9uIGhpZGVPdmVybGF5KCkgOiB2b2lkIHtcbiAgICBvdmVybGF5Q29udGFpbmVyLnJlbW92ZSgpO1xuICAgIG92ZXJsYXlDc3MucmVtb3ZlKCk7XG5cbiAgICB0YWJsZUNzcy5yZW1vdmUoKTtcblxuICAgIHByb2plY3RzLnJlbW92ZUNzcygpO1xufVxuXG5cblxuXG5leHBvcnQge1xuICAgIGluaXRPdmVybGF5LFxuICAgIHNob3dPdmVybGF5LFxuICAgIGhpZGVPdmVybGF5LFxufSIsIlxuaW1wb3J0IHsgYWdlX2RiaXMgfSBmcm9tIFwiLi4vZGJpLXNlbmRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBIVE1MUHJvamVjdFRhYmxlUm93IGV4dGVuZHMgSFRNTFRhYmxlUm93RWxlbWVudCB7XG4gICAgbm9kZU9iamVjdDogYW55O1xufVxuZXhwb3J0IGludGVyZmFjZSBIVE1MVGFibGVDb250ZW50T2JqZWN0IGV4dGVuZHMgSFRNTFRhYmxlRWxlbWVudCB7XG4gICAgY29udGVudE9iamVjdDogYW55O1xufVxuZXhwb3J0IGludGVyZmFjZSBIVE1MUHJvamVjdENoaWxkUm93IGV4dGVuZHMgSFRNTFRhYmxlUm93RWxlbWVudCB7XG4gICAgQ29udGVudEVkZ2VPYmplY3Q6IGFueTtcbiAgICBpc1Byb2plY3RDaGlsZFJvdyA6IGJvb2xlYW47XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHBvcHVsYXRlUHJvcGVydGllc1RhYmxlKHByb3BlcnRpZXNUYWJsZTogSFRNTFRhYmxlQ29udGVudE9iamVjdCwgcHJvamVjdENvbnRlbnRPYmplY3Q6IGFueSkge1xuXG4gICAgY29uc29sZS5sb2coXCJwcm9qZWN0Q29udGVudE9iamVjdCA9IFwiLCBwcm9qZWN0Q29udGVudE9iamVjdClcblxuICAgIC8vIGxldCBwcm9qZWN0T2JqZWN0ID0gZXh0ZW5zaW9uU3RhdGVGcm9udC5jdXJyZW50X3Byb2plY3RPYmplY3Q7XG4gICAgbGV0IHByb2plY3RPYmplY3QgPSBwcm9qZWN0Q29udGVudE9iamVjdDtcblxuICAgIHByb3BlcnRpZXNUYWJsZS5jb250ZW50T2JqZWN0ID0gcHJvamVjdENvbnRlbnRPYmplY3Q7XG4gICAgcHJvcGVydGllc1RhYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCBwcm9qZWN0UHJvcGVydHlGb2N1c091dClcblxuICAgIC8vIGV4dGVuc2lvblN0YXRlRnJvbnQuY3VycmVudF9wcm9qZWN0VXVpZCA9IHByb2plY3RPYmplY3QuVXVpZDtcblxuICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhYS1wcm9qZWN0VGl0bGUnKS50ZXh0Q29udGVudCA9IHByb2plY3RPYmplY3QuVGl0bGU7XG5cbiAgICAvLyBsZXQgdGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdlX3Byb2plY3RQcm9wZXJ0aWVzVGFibGUtdGJvZHknKTtcbiAgICBsZXQgdGJvZHkgPSBwcm9wZXJ0aWVzVGFibGUucXVlcnlTZWxlY3RvcihcInRib2R5XCIpO1xuICAgIHRib2R5LmlubmVySFRNTCA9ICcnO1xuXG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBwcm9qZWN0T2JqZWN0KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGAke2tleX06ICR7cHJvamVjdE9iamVjdFtrZXldfWApO1xuICAgICAgICBpZiAoa2V5ID09PSAnVHlwZScgfHwga2V5ID09PSAnVGl0bGUnIHx8IGtleSA9PT0gJ0dvYWwnKSB7XG5cbiAgICAgICAgICAgIHRib2R5LmlubmVySFRNTCArPSBgXG5cdFx0XG5cdFx0XHQ8dHI+XG5cdFx0XHRcdDx0aCBpZD1hZ2VfcHJvalByb3BUYWJsZS0ke2tleX0ta2V5IGNsYXNzPVwiYWdlX2VsZW1lbnRcIiA+JHtrZXl9PC90aD5cblx0XHRcdFx0PHRkIGlkPWFnZV9wcm9qUHJvcFRhYmxlLSR7a2V5fS12YWx1ZSBjbGFzcz1cImFnZV9lZGl0YWJsZVByb2plY3RQcm9wZXJ0eSBhZ2VfZWxlbWVudFwiIGNvbnRlbnRlZGl0YWJsZT1cInRydWVcIiA+JHtwcm9qZWN0T2JqZWN0W2tleV19PC90ZD5cblx0XHRcdDwvdHI+XG5cdFx0XG5cdFx0YDtcblxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGJvZHkuaW5uZXJIVE1MICs9IGBcblx0XHRcblx0XHRcdDx0cj5cblx0XHRcdFx0PHRoIGlkPWFnZV9wcm9qUHJvcFRhYmxlLSR7a2V5fS1rZXkgY2xhc3M9XCJhZ2VfZWxlbWVudFwiID4ke2tleX08L3RoPlxuXHRcdFx0XHQ8dGQgaWQ9YWdlX3Byb2pQcm9wVGFibGUtJHtrZXl9LXZhbHVlIGNsYXNzPVwiYWdlX2VsZW1lbnRcIj4ke3Byb2plY3RPYmplY3Rba2V5XX08L3RkPlxuXHRcdFx0PC90cj5cblx0XHRcblx0XHRgO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvLyBjb25zb2xlLmxvZyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjYWdlX3Byb2plY3RQcm9wZXJ0aWVzVGFibGUgdGJvZHkgdHInKSlcbiAgICBsZXQgZWRpdGFibGVQcm9qZWN0UHJvcGVydHlUZHM6IE5vZGVMaXN0T2Y8RWxlbWVudD4gPSB0Ym9keS5xdWVyeVNlbGVjdG9yQWxsKCcuYWdlX2VkaXRhYmxlUHJvamVjdFByb3BlcnR5Jyk7XG4gICAgLy8gY29uc29sZS5sb2coZWRpdGFibGVQcm9qZWN0UHJvcGVydHlUZClcblxuICAgIC8vIEFycmF5LmZyb20oZWRpdGFibGVQcm9qZWN0UHJvcGVydHlUZHMpLmZvckVhY2goKGVkaXRhYmxlUHJvcGVydHlFbGVtZW50KSA9PiB7XG4gICAgLy8gICAgIGVkaXRhYmxlUHJvcGVydHlFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgZWRpdGFibGVQcm9qZWN0UHJvcGVydHlGb2N1c091dClcbiAgICAvLyB9KVxuICAgIC8vIGZvciAobGV0IGVkaXRhYmxlUHJvamVjdFByb3BlcnR5VGQgb2YgZWRpdGFibGVQcm9qZWN0UHJvcGVydHlUZHMpIHtcbiAgICAvLyAgICAgLy8gY29uc29sZS5sb2coZWRpdGFibGVQcm9qZWN0UHJvcGVydHlUZC50ZXh0Q29udGVudCk7XG4gICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKHByb3BlcnR5Um93LnRleHRDb250ZW50Lmxlbmd0aClcblxuICAgIC8vICAgICAvLyBlZGl0YWJsZVByb2plY3RQcm9wZXJ0eVRkLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgcmVhZFByb2plY3RQcm9wZXJ0aWVzRnJvbURvbUFuZFdyaXRlUHV0KVxuICAgIC8vICAgICBlZGl0YWJsZVByb2plY3RQcm9wZXJ0eVRkLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgZWRpdGFibGVQcm9qZWN0UHJvcGVydHlGb2N1c091dClcbiAgICAvLyAgICAgLy8gZWRpdGFibGVQcm9qZWN0UHJvcGVydHlUZC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHBvc3RQcm9qZWN0UHJvcGVydGllcylcbiAgICAvLyB9XG5cbn1cblxuZnVuY3Rpb24gcHJvamVjdFByb3BlcnR5Rm9jdXNPdXQoZXZlbnQ6IEZvY3VzRXZlbnQpIDogdm9pZHtcbiAgICBjb25zb2xlLmxvZygnRk9DVVMgT1VUIFBST0pFQ1QgUFJPUEVSVFknKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcImV2ZW50LnRhcmdldCA9IFwiLCBldmVudC50YXJnZXQpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwidGhpcyA9IFwiLCB0aGlzKTtcblxuICAgIGxldCBkYXRhRWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICBsZXQgcHJvamVjdFRhYmxlOiBIVE1MVGFibGVDb250ZW50T2JqZWN0ID0gdGhpcztcblxuICAgIC8vIGNvbnNvbGUubG9nKCcnLCBldmVudC50YXJnZXQuKVxuICAgIHN3aXRjaCAoZGF0YUVsZW1lbnQuaWQpIHtcbiAgICAgICAgLy8gVFlQRVxuICAgICAgICBjYXNlIFwiYWdlX3Byb2pQcm9wVGFibGUtVHlwZS12YWx1ZVwiOlxuICAgICAgICAgICAgcHJvamVjdFRhYmxlLmNvbnRlbnRPYmplY3QuVHlwZSA9IGRhdGFFbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIFRJVExFXG4gICAgICAgIGNhc2UgXCJhZ2VfcHJvalByb3BUYWJsZS1UaXRsZS12YWx1ZVwiOlxuICAgICAgICAgICAgcHJvamVjdFRhYmxlLmNvbnRlbnRPYmplY3QuVGl0bGUgPSBkYXRhRWxlbWVudC50ZXh0Q29udGVudDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyBHT0FMXG4gICAgICAgIGNhc2UgXCJhZ2VfcHJvalByb3BUYWJsZS1Hb2FsLXZhbHVlXCI6XG4gICAgICAgICAgICBwcm9qZWN0VGFibGUuY29udGVudE9iamVjdC5Hb2FsID0gZGF0YUVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICBcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGFnZV9kYmlzLkNvbnRlbnRfVXBkYXRlV2l0aENvbnRlbnRPYmplY3QocHJvamVjdFRhYmxlLmNvbnRlbnRPYmplY3QpXG4gICAgLnRoZW4odXBkYXRlZENvbnRlbnRPYmplY3QgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInVwZGF0ZWRDb250ZW50T2JqZWN0ID0gXCIsIHVwZGF0ZWRDb250ZW50T2JqZWN0KTtcblxuICAgICAgICAvLyBsZXQgdXBkYXRlZFN0cmluZyA9IEpTT04uc3RyaW5naWZ5KHVwZGF0ZWRDb250ZW50T2JqZWN0KTtcbiAgICAgICAgLy8gbGV0IHRhYmxlT2JqZWN0U3RyaW5nID0gSlNPTi5zdHJpbmdpZnkocHJvamVjdFRhYmxlLmNvbnRlbnRPYmplY3QpO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHVwZGF0ZWRTdHJpbmcpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0YWJsZU9iamVjdFN0cmluZyk7XG4gICAgICAgIFxuICAgICAgICAvLyBsZXQgZXF1YWxpdHkgPSBKU09OLnN0cmluZ2lmeSh1cGRhdGVkQ29udGVudE9iamVjdCkgPT0gSlNPTi5zdHJpbmdpZnkocHJvamVjdFRhYmxlLmNvbnRlbnRPYmplY3QpO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRXF1YWwgPyA6IFwiLCBlcXVhbGl0eSlcblxuICAgICAgICAvLyBmb3IobGV0IGkgPSAwOyBpIDwgdXBkYXRlZFN0cmluZy5sZW5ndGg7IGkrKyl7XG4gICAgICAgIC8vICAgICBpZih1cGRhdGVkU3RyaW5nW2ldICE9PSB0YWJsZU9iamVjdFN0cmluZ1tpXSlcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyh1cGRhdGVkU3RyaW5nW2ldICsgXCIgIT09IFwiICsgdGFibGVPYmplY3RTdHJpbmdbaV0pXG4gICAgICAgIC8vIH1cbiAgICAgICAgXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHVwZGF0ZWRDb250ZW50T2JqZWN0KS5sZW5ndGgpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHByb2plY3RUYWJsZS5jb250ZW50T2JqZWN0KS5sZW5ndGgpO1xuICAgICAgICBzd2l0Y2ggKGRhdGFFbGVtZW50LmlkKSB7XG4gICAgICAgICAgICAvLyBUWVBFXG4gICAgICAgICAgICBjYXNlIFwiYWdlX3Byb2pQcm9wVGFibGUtVHlwZS12YWx1ZVwiOlxuICAgICAgICAgICAgICAgIGNvbnNvbGUuYXNzZXJ0KHVwZGF0ZWRDb250ZW50T2JqZWN0LlR5cGUgPT0gcHJvamVjdFRhYmxlLmNvbnRlbnRPYmplY3QuVHlwZSwgXCInUFVUJyBjb250ZW50IE9iamVjdCBUeXBlIGRvZXMgbm90IG1hdGNoIHRoZSBwcm9qZWN0IHRhYmxlIC5jb250ZW50T2JqZWN0LlR5cGUgIVwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIFRJVExFXG4gICAgICAgICAgICBjYXNlIFwiYWdlX3Byb2pQcm9wVGFibGUtVGl0bGUtdmFsdWVcIjpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmFzc2VydCh1cGRhdGVkQ29udGVudE9iamVjdC5UeXBlID09IHByb2plY3RUYWJsZS5jb250ZW50T2JqZWN0LlR5cGUsIFwiJ1BVVCcgY29udGVudCBPYmplY3QgVGl0bGUgZG9lcyBub3QgbWF0Y2ggdGhlIHByb2plY3QgdGFibGUgLmNvbnRlbnRPYmplY3QuVGl0bGUgIVwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIEdPQUxcbiAgICAgICAgICAgIGNhc2UgXCJhZ2VfcHJvalByb3BUYWJsZS1Hb2FsLXZhbHVlXCI6XG4gICAgICAgICAgICAgICAgY29uc29sZS5hc3NlcnQodXBkYXRlZENvbnRlbnRPYmplY3QuVHlwZSA9PSBwcm9qZWN0VGFibGUuY29udGVudE9iamVjdC5UeXBlLCBcIidQVVQnIGNvbnRlbnQgT2JqZWN0IEdvYWwgZG9lcyBub3QgbWF0Y2ggdGhlIHByb2plY3QgdGFibGUgLmNvbnRlbnRPYmplY3QuR29hbCAhXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBcbiAgICB9KVxuICAgIC8vIGxldCBwcm9qZWN0Q29udGVudE9iamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3Byb2plY3RQcm9wZXJ0aWVzVGFibGVcIikgYXMgSFRNTFRhYmxlQ29udGVudE9iamVjdDtcblxuICAgIGNvbnNvbGUubG9nKFwicHJvamVjdENvbnRlbnRPYmplY3QuY29udGVudE9iamVjdCA9IFwiLCBwcm9qZWN0VGFibGUuY29udGVudE9iamVjdCk7XG5cbiAgICBcbiAgICAvLyBsZXQgZXZlbnRUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgLy8gY29uc29sZS5sb2coJ2V2ZW50VGFyZ2V0LnRleHRDb250ZW50ID0gJywgZXZlbnRUYXJnZXQudGV4dENvbnRlbnQpO1xuICAgIFxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBwb3B1bGF0ZUNoaWxkcmVuVGFibGUodGFibGUgOiBIVE1MVGFibGVFbGVtZW50LCBwcm9qZWN0Q2hpbGRDb250ZW50RWRnZXMgOiBhbnkpe1xuXG4gICAgLy8gbGV0IHByb2plY3RDaGlsZENvbnRlbnRFZGdlcyA9IGV4dGVuc2lvblN0YXRlRnJvbnQuY3VycmVudF9wcm9qZWN0Q2hpbGRDb250ZW50RWRnZXM7XG5cbiAgICAvLyBleHRlbnNpb25TdGF0ZUZyb250LmN1cnJlbnRfcHJvamVjdFV1aWQgPSBwcm9qZWN0T2JqZWN0LlV1aWQ7XG5cbiAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWEtcHJvamVjdFRpdGxlJykudGV4dENvbnRlbnQgPSBwcm9qZWN0T2JqZWN0LlRpdGxlO1xuXG5cbiAgICBsZXQgdGJvZHkgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKCd0Ym9keScpO1xuXG4gICAgdGJvZHkuaW5uZXJIVE1MID0gJyc7XG5cbiAgICBmb3IgKGNvbnN0IGNvbnRlbnRFZGdlIG9mIHByb2plY3RDaGlsZENvbnRlbnRFZGdlcykge1xuXG4gICAgICAgIGxldCBuZXdQcm9qZWN0Q2hpbGRSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpIGFzIEhUTUxQcm9qZWN0Q2hpbGRSb3c7XG5cbiAgICAgICAgbmV3UHJvamVjdENoaWxkUm93LmlzUHJvamVjdENoaWxkUm93ID0gdHJ1ZTtcblxuICAgICAgICAvLyBDdXN0b20gZXZlbnQgdG8gc3BlY2lmaWNhbGx5IGxvYWQgdGhlIHNvdXJjZSBmcm9tIHRoZSBvdmVybGF5LXRzIG1vZHVsZVxuICAgICAgICBuZXdQcm9qZWN0Q2hpbGRSb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCA6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICAvLyBodHRwczovL3d3dy5yZWRkaXQuY29tL3Ivd2ViZGV2L2NvbW1lbnRzL3JoZjJtdS9mcmllbmRseV9yZW1pbmRlcl91c2VfZXZlbnRjdXJyZW50dGFyZ2V0X25vdC9cbiAgICAgICAgICAgIGxldCBlbGVtZW50Q3VycmVudFRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQgYXMgSFRNTFByb2plY3RDaGlsZFJvdztcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZXZlbnQuY3VycmVudFRhcmdldCA9IFwiLCBlbGVtZW50Q3VycmVudFRhcmdldClcbiAgICAgICAgICAgIGxldCBsb2Fkc291cmNlRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoIFwibG9hZHNvdXJjZVwiLCB7IFxuICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7Y29udGVudE9iamVjdDogZWxlbWVudEN1cnJlbnRUYXJnZXQuQ29udGVudEVkZ2VPYmplY3QuY29udGVudH0sXG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBfdGhpcyA9IHRoaXMgYXMgSFRNTFByb2plY3RDaGlsZFJvdztcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX3RoaXMgPSBcIiwgX3RoaXMpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJldmVudC50YXJnZXQgPSBcIiwgZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZWxlbWVudEN1cnJlbnRUYXJnZXQuZGlzcGF0Y2hFdmVudChsb2Fkc291cmNlRXZlbnQpO1xuICAgICAgICAgICAgXG4gICAgICAgICB9KVxuXG4gICAgICAgIG5ld1Byb2plY3RDaGlsZFJvdy5pZCA9IGBhZ2VfcHJvamNoaWxkVGFibGVSb3ctJHtjb250ZW50RWRnZS5jb250ZW50LlV1aWR9YDtcbiAgICAgICAgbmV3UHJvamVjdENoaWxkUm93LmNsYXNzTGlzdC5hZGQoXCJhZ2VfcHJvamNoaWxkVGFibGVSb3dcIik7XG4gICAgICAgIG5ld1Byb2plY3RDaGlsZFJvdy5Db250ZW50RWRnZU9iamVjdCA9IGNvbnRlbnRFZGdlO1xuXG4gICAgICAgIG5ld1Byb2plY3RDaGlsZFJvdy5pbm5lckhUTUwgKz0gYFxuXHRcdFxuXHRcdFx0XHQ8dGggaWQ9YWdlX3Byb2pjaGlsZFRhYmxlLVRhYmxlLSR7Y29udGVudEVkZ2UuY29udGVudC5VdWlkfSBjbGFzcz1cImFnZV9lbGVtZW50XCIgZGF0YS1VdWlkPSR7Y29udGVudEVkZ2UuY29udGVudC5VdWlkfT4ke2NvbnRlbnRFZGdlLmNvbnRlbnQuVGFibGV9PC90aD5cblx0XHRcdFx0PHRkIGlkPWFnZV9wcm9qY2hpbGRUYWJsZS1UaXRsZS0ke2NvbnRlbnRFZGdlLmNvbnRlbnQuVXVpZH0gY2xhc3M9XCJhZ2VfZWxlbWVudFwiIGRhdGEtVXVpZD0ke2NvbnRlbnRFZGdlLmNvbnRlbnQuVXVpZH0+JHtjb250ZW50RWRnZS5jb250ZW50LlRpdGxlfTwvdGQ+XG5cdFx0XHRcblx0XHRgO1xuXG4gICAgICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBpZD1hZ2VfcHJvamNoaWxkVGFibGVSb3ctJHtub2RlRWRnZS5VdWlkfWApO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBpZD1hZ2VfcHJvamNoaWxkVGFibGVSb3ctJHtub2RlRWRnZS5VdWlkfWApKVxuXG5cbiAgICAgICAgLy8gbmV3UHJvamVjdENoaWxkUm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJvamVjdENoaWxkUm93Q2xpY2tlZClcblxuICAgICAgICB0Ym9keS5hcHBlbmRDaGlsZChuZXdQcm9qZWN0Q2hpbGRSb3cpXG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvcHVsYXRlUHJvamVjdFNlYXJjaFRhYmxlKHByb2plY3RTZWFyY2hUYWJsZSA6IGFueSwgcHJvamVjdE9iamVjdHMgOiBhbnkpOiB2b2lkIHtcbiAgICAvLyBjb25zb2xlLmxvZygnUFJPSkVDVCBUQkFMRSBQT1AnKTtcblxuICAgIC8vIGNoaWxkT2JqZWN0cyA9IGV4dGVuc2lvblN0YXRlRnJvbnQuY3VycmVudF9wcm9qZWN0U2VhcmNoT2JqZWN0cztcblxuICAgIC8vIGxldCBwcm9qZWN0VGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdlX3Byb2plY3RUYWJsZScpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiU1NTU1NTU1NTU1NTU1NTU1MgPSBcIiwgcHJvamVjdE9iamVjdHMubGVuZ3RoKVxuICAgIGxldCB0Ym9keSA9IHByb2plY3RTZWFyY2hUYWJsZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGJvZHknKVswXVxuICAgIC8vIGNvbnNvbGUubG9nKFwidGJvZHkgPSBcIiwgdGJvZHkpO1xuXG4gICAgdGJvZHkuaW5uZXJIVE1MID0gJyc7XG5cbiAgICBmb3IgKGxldCBjaGlsZE9iamVjdCBvZiBwcm9qZWN0T2JqZWN0cykge1xuXG4gICAgICAgIGxldCB0YWJsZVJvd0h0bWwgPSBgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPHRkIGRhdGEtVXVpZD1cIiR7Y2hpbGRPYmplY3QuVXVpZH1cIiBjbGFzcz1cImFnZV9lbGVtZW50IGFnZV9wcm9qZWN0Um93U2VhcmNoRGF0YVwiPiR7Y2hpbGRPYmplY3QuVGFibGV9PC90aD5cbiAgICAgICAgICAgICAgICA8dGQgZGF0YS1VdWlkPVwiJHtjaGlsZE9iamVjdC5VdWlkfVwiIGNsYXNzPVwiYWdlX2VsZW1lbnQgYWdlX3Byb2plY3RSb3dTZWFyY2hEYXRhXCI+JHtjaGlsZE9iamVjdC5UaXRsZX08L3RkPlxuXG4gICAgICAgICAgICBgO1xuICAgICAgICAvLyBsZXQgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgICAgICBsZXQgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpIGFzIEhUTUxQcm9qZWN0VGFibGVSb3c7XG4gICAgICAgIHRyLmlkID0gJ2FnZV9wcm9qZWN0U2VhcmNoUm93LScgKyBjaGlsZE9iamVjdC5VdWlkO1xuICAgICAgICB0ci5jbGFzc0xpc3QuYWRkKCdhZ2VfcHJvamVjdFNlYXJjaFJvdycpO1xuICAgICAgICB0ci5ub2RlT2JqZWN0ID0gY2hpbGRPYmplY3Q7XG4gICAgICAgIC8vIHRyLmRhdGFzZXQuTm9kZSA9IDE7XG4gICAgICAgIC8vIHRyLmRhdGFzZXQuVXVpZCA9IGNoaWxkT2JqZWN0LlV1aWQ7XG4gICAgICAgIHRyLnNldEF0dHJpYnV0ZSgnZGF0YS1Ob2RlJywgJzEnKTtcbiAgICAgICAgdHIuc2V0QXR0cmlidXRlKCdkYXRhLVV1aWQnLCBjaGlsZE9iamVjdC5VdWlkKTtcbiAgICAgICAgLy8gdHIudGFiSW5kZXggPSAwO1xuICAgICAgICB0ci5pbm5lckhUTUwgPSB0YWJsZVJvd0h0bWw7XG4gICAgICAgIC8vIHRyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tDYWxsYmFjayk7XG4gICAgICAgIC8vIHRyLmNvbnRlbnRFZGl0YWJsZSA9ICdUcnVlJztcblxuICAgICAgICB0Ym9keS5hcHBlbmQodHIpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0cilcbiAgICB9XG5cbn0iLCJpbXBvcnQgKiBhcyBmZXRjaGVyIGZyb20gXCIuLi9mZXRjaGVyXCI7XG5pbXBvcnQgKiBhcyBkb20gZnJvbSBcIi4vcHJvamVjdF9kb21cIjtcbmltcG9ydCB7IEhUTUxQcm9qZWN0VGFibGVSb3csIEhUTUxUYWJsZUNvbnRlbnRPYmplY3QgfSBmcm9tIFwiLi9wcm9qZWN0X2RvbVwiO1xuaW1wb3J0IHthZ2VfZGJpc30gZnJvbSBcIi4uL2RiaS1zZW5kXCI7XG5cbmxldCBzaWRlUGFuZWwgOiBFbGVtZW50O1xuXG5sZXQgcHJvamVjdE1vcmVPcHRpb25zQ29udGV4dE1lbnUgOiBIVE1MRGl2RWxlbWVudDtcblxubGV0IHByb2plY3RDb250YWluZXIgOiBFbGVtZW50O1xubGV0IHByb2plY3RDc3M6IEhUTUxFbGVtZW50O1xuXG5sZXQgcHJvamVjdE1vcmVPcHRpb25zQnV0dG9uIDogSFRNTEVsZW1lbnQ7XG5sZXQgcHJvamVjdE1vcmVPcHRpb25zTWVudTogSFRNTEVsZW1lbnQ7XG5cbmxldCBwcm9qZWN0U2VhcmNoRWxlbWVudCA6IEhUTUxEaXZFbGVtZW50O1xubGV0IHNlYXJjaFN0cmluZ0V4aXN0cyA6IGJvb2xlYW4gPSBmYWxzZTtcblxubGV0IHByb2plY3RTZWFyY2hPYmplY3RzOiBhbnk7XG5sZXQgcHJvamVjdFNlYXJjaFRhYmxlOiBIVE1MVGFibGVFbGVtZW50O1xuXG5sZXQgcHJvamVjdENvbnRlbnRFZGdlQ2hpbGRyZW4gOiBhbnk7XG5sZXQgcHJvamVjdENoaWxkcmVuVGFibGUgOiBIVE1MVGFibGVFbGVtZW50O1xuXG5sZXQgcHJvamVjdFByb3BlcnRpZXNUYWJsZTogSFRNTFRhYmxlQ29udGVudE9iamVjdDtcblxuXG4vLyBpbnRlcmZhY2UgSFRNTFRhYmxlUm93RWxlbWVudCB7XG4vLyAgICAgbm9kZU9iamVjdD86IGFueTtcbi8vIH1cblxuLy8gaW50ZXJmYWNlIEhUTUxQcm9qZWN0VGFibGVSb3cgZXh0ZW5kcyBIVE1MVGFibGVSb3dFbGVtZW50IHtcbi8vICAgICBub2RlT2JqZWN0OiBhbnk7XG4vLyB9XG5cblxuZnVuY3Rpb24gaW5pdFByb2plY3RzKF9zaWRlUGFuZWwgOiBFbGVtZW50LCBfcHJvamVjdE1vcmVPcHRpb25zQ29udGV4dE1lbnUgOiBIVE1MRGl2RWxlbWVudCkgOiB2b2lke1xuICAgIGNvbnNvbGUubG9nKCdPVkVSTEFZIFRTIElOSVQnKTtcblxuICAgIHNpZGVQYW5lbCA9IF9zaWRlUGFuZWw7XG5cbiAgICAvLyBNT1JFIE9QVElPTlMgQ09OVEVYVCBNRU5VXG4gICAgcHJvamVjdE1vcmVPcHRpb25zQ29udGV4dE1lbnUgPSBfcHJvamVjdE1vcmVPcHRpb25zQ29udGV4dE1lbnU7XG4gICAgcHJvamVjdE1vcmVPcHRpb25zQ29udGV4dE1lbnUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrZWRQcm9qZWN0Q29udGV4dE1lbnUpXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGlkZVByb2plY3RDb250ZXh0TWVudSwge2NhcHR1cmU6IGZhbHNlfSk7XG5cbiAgICBwcm9qZWN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcHJvamVjdENvbnRhaW5lci5pZCA9IFwiYWdlX3Byb2plY3RDb250YWluZXJcIjtcbiAgICBwcm9qZWN0Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwcm9qZWN0Q2xpY2spO1xuXG4gICAgZmV0Y2hlci5mZXRjaEh0bWwoXCJwcm9qZWN0cy5odG1sXCIpXG4gICAgICAgIC50aGVuKGh0bWwgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJIVE1MIDogXCIsIGh0bWwpXG4gICAgICAgICAgICBwcm9qZWN0Q29udGFpbmVyLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgICAgICBwcm9qZWN0U2VhcmNoVGFibGUgPSBwcm9qZWN0Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCJ0YWJsZVwiKTtcbiAgICAgICAgICAgIHByb2plY3RDaGlsZHJlblRhYmxlID0gcHJvamVjdENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiI2FnZV9wcm9qZWN0Q2hpbGRyZW5UYWJsZVwiKTtcbiAgICAgICAgICAgIHByb2plY3RQcm9wZXJ0aWVzVGFibGUgPSBwcm9qZWN0Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIjYWdlX3Byb2plY3RQcm9wZXJ0aWVzVGFibGVcIik7XG4gICAgICAgICAgICBwcm9qZWN0U2VhcmNoRWxlbWVudCA9IHByb2plY3RDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2VfcHJvamVjdFNlYXJjaElucHV0XCIpO1xuICAgICAgICAgICAgcHJvamVjdFNlYXJjaEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzaW5cIiwgc2VhcmNoUHJvamVjdEluKTtcbiAgICAgICAgICAgIHByb2plY3RTZWFyY2hFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCBzZWFyY2hQcm9qZWN0T3V0KTtcblxuICAgICAgICAgICAgLy8gVE9ETyA6IGdyYWIgdGhlIG1vcmUgb3B0aW9ucyBjb250ZXh0IG1lbnVcbiAgICAgICAgICAgIC8vIHByb2plY3RNb3JlT3B0aW9uc01lbnUgPSBcbiAgICAgICAgICAgIHByb2plY3RNb3JlT3B0aW9uc0J1dHRvbiA9IHByb2plY3RDb250YWluZXIucXVlcnlTZWxlY3RvcihcIiNhZ2VfcHJvamVjdE1vcmVPcHRpb25zXCIpO1xuICAgICAgICAgICAgbGV0IG1vcmVPcHRpb25zQmFja2dyb3VuZFVybCA9IGJyb3dzZXIucnVudGltZS5nZXRVUkwoXG4gICAgICAgICAgICAgICAgXCJyZXNvdXJjZXMvbW9yZS1vcHRpb25zLnBuZ1wiXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbGV0IGJhY2tncm91bmRTdHJpbmcgPSBgdXJsKCR7bW9yZU9wdGlvbnNCYWNrZ3JvdW5kVXJsfSlgO1xuICAgICAgICAgICAgcHJvamVjdE1vcmVPcHRpb25zQnV0dG9uLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGJhY2tncm91bmRTdHJpbmc7XG5cbiAgICAgICAgfSkgXG4gIFxuICAgIHByb2plY3RDc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gICAgcHJvamVjdENzcy5pZCA9IFwiYWdlX3Byb2plY3RTdHlsZVwiO1xuICAgIGZldGNoZXIuZmV0Y2hDc3MoXCJwcm9qZWN0cy5jc3NcIilcbiAgICAudGhlbihjc3MgPT4ge1xuICAgICAgICBwcm9qZWN0Q3NzLmlubmVyVGV4dCA9IGNzcztcbiAgICB9KVxuXG4gICAgXG5cbiAgICBjb25zb2xlLmxvZyhcInNpZGVQYW5lbC5pZCA9IFwiLCBzaWRlUGFuZWwuaWQpXG4gICAgXG4gICAgc2lkZVBhbmVsLmFwcGVuZChwcm9qZWN0Q29udGFpbmVyKTtcblxuXG4gICAgZmV0Y2hQcm9qZWN0U2VhcmNoKFwiXCIpXG4gICAgICAgIC50aGVuKChjb250ZW50T2JqZWN0QXJyYXkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbnRlbnRPYmplY3RBcnJheSlcbiAgICAgICAgICAgIGRvbS5wb3B1bGF0ZVByb2plY3RTZWFyY2hUYWJsZShwcm9qZWN0U2VhcmNoVGFibGUsIHByb2plY3RTZWFyY2hPYmplY3RzKTtcbiAgICAgICAgfSlcbiAgICBcblxufVxuXG5mdW5jdGlvbiBjbGlja2VkUHJvamVjdENvbnRleHRNZW51KGV2ZW50OiBNb3VzZUV2ZW50KXtcbiAgICBsZXQgZXZlbnRUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgc3dpdGNoIChldmVudFRhcmdldC5pZCkge1xuICAgICAgICBjYXNlIFwiYnRuMVwiOlxuICAgICAgICAgICAgY29uc29sZS5sb2coZXZlbnRUYXJnZXQuaWQpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImJ0bjJcIjpcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50VGFyZ2V0LmlkKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJidG4zXCI6XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudFRhcmdldC5pZClcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYnRuNFwiOlxuICAgICAgICAgICAgY29uc29sZS5sb2coZXZlbnRUYXJnZXQuaWQpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImJ0bjVcIjpcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50VGFyZ2V0LmlkKVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbn1cblxuZnVuY3Rpb24gaGlkZVByb2plY3RDb250ZXh0TWVudShldmVudDogTW91c2VFdmVudCkge1xuICAgIGxldCBldmVudFRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAvLyBjb25zb2xlLmxvZygnX15fXl9eX15fXl9eJywgZXZlbnRUYXJnZXQuaWQpO1xuXG4gICAgbGV0IGlzQ29udGV4dEVsZW1lbnQ6IGJvb2xlYW4gPSBldmVudFRhcmdldC5pZCA9PT0gXCJhZ2VfbW9yZVByb2plY3RPcHRpb25zQ29udGV4dE1lbnVcIiB8fCBldmVudFRhcmdldC5pZCA9PT0gXCJhZ2VfcHJvamVjdE1vcmVPcHRpb25zXCI7XG4gICAgLy8gY29uc29sZS5sb2coJ2lzQ29udGV4dEVsZW1lbnQgPSAnLCBpc0NvbnRleHRFbGVtZW50KTtcblxuICAgIGlmICghaXNDb250ZXh0RWxlbWVudCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkNMSUNLRUQgQ09OVEVYVCBNRU5VIUBcIilcbiAgICAgICAgbGV0IG9wdGlvbnNDb250ZXh0TWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX21vcmVQcm9qZWN0T3B0aW9uc0NvbnRleHRNZW51XCIpO1xuICAgICAgICBvcHRpb25zQ29udGV4dE1lbnUuY2xhc3NMaXN0LmFkZChcImFnZV9kaXNwbGF5Tm9uZVwiKVxuICAgIH1cbn1cblxuXG5cbi8qKlxuICogIE1haW4gZXZlbnQgaGFuZGxlciBpbiB0aGUgcHJvamVjdCBjb250YWluZXIuXG4gKiBcbiAqIEBwYXJhbSBldmVudCBcbiAqL1xuXG5mdW5jdGlvbiBwcm9qZWN0Q2xpY2soZXZlbnQ6IEV2ZW50KXtcblxuICAgIC8vIGNvbnNvbGUubG9nKFwiQ2xpY2sgZGV0ZWN0ZWQgaW4gcHJvamVjdCBjb250YWluZXIuXCIpO1xuICAgIGxldCBjbGlja1RhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcblxuICAgIFxuLy8gU0VBUkNIIFJPV1xuICAgIGlmIChjbGlja1RhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJhZ2VfcHJvamVjdFJvd1NlYXJjaERhdGFcIikpe1xuICAgICAgICAvLyBncmFiIHBhcmVudCBiZWNhdXNlIHdlIGNsaWNrZWQgb24gZGF0YS1lbGVtZW50XG4gICAgICAgIGxldCB0YWJsZVJvd1RhcmdldCA9IGNsaWNrVGFyZ2V0LnBhcmVudEVsZW1lbnQgYXMgSFRNTFByb2plY3RUYWJsZVJvdztcbiAgICAgICAgLy8gc2V0IHRpdGxlXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2VfcHJvamVjdFRpdGxlJykudGV4dENvbnRlbnQgPSB0YWJsZVJvd1RhcmdldC5ub2RlT2JqZWN0LlRpdGxlO1xuXG4gICAgICAgIFxuICAgICAgICBkb20ucG9wdWxhdGVQcm9wZXJ0aWVzVGFibGUocHJvamVjdFByb3BlcnRpZXNUYWJsZSwgdGFibGVSb3dUYXJnZXQubm9kZU9iamVjdCk7XG4gICAgICAgIC8vIHBvcHVsYXRlIHByb3BlcnRpZXMgdGFibGUgXG4gICAgICAgIGZldGNoUHJvamVjdENoaWxkcmVuKGNsaWNrVGFyZ2V0LmRhdGFzZXQudXVpZClcbiAgICAgICAgICAgIC50aGVuKChjb250ZW50RWRnZU9iamVjdHMpID0+IHsgZG9tLnBvcHVsYXRlQ2hpbGRyZW5UYWJsZShwcm9qZWN0Q2hpbGRyZW5UYWJsZSwgcHJvamVjdENvbnRlbnRFZGdlQ2hpbGRyZW4pfVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIG1vdmUgZm9jdXMgdG8gdGhlIGNoaWxkcmVuLXRhYlxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0Q2hpbGRyZW5CdXR0b25cIikuY2xpY2soKVxuICAgIH1cbi8vIFNFQVJDSC9DSElMRFJFTi9QUk9QRVJUSUVTIEJVVFRPTlxuICAgIGVsc2UgaWYgKFxuICAgICAgICAgICBjbGlja1RhcmdldC5pZCA9PSBcImFnZV9wcm9qZWN0U2VhcmNoQnV0dG9uXCIgXG4gICAgICAgIHx8IGNsaWNrVGFyZ2V0LmlkID09IFwiYWdlX3Byb2plY3RDaGlsZHJlbkJ1dHRvblwiIFxuICAgICAgICB8fCBjbGlja1RhcmdldC5pZCA9PSBcImFnZV9wcm9qZWN0UHJvcGVydGllc0J1dHRvblwiXG4gICAgKXtcbiAgICAgICAgLy8gcHJvamVjdFNlYXJjaEJ1dHRvbkNsaWNrZWQoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KTtcbiAgICAgICAgc2hvd1Byb2plY3RUYWJsZShjbGlja1RhcmdldC5pZCk7XG4gICAgfVxuLy8gTU9SRSBPUFRJT05TIEJVVFRPTlxuICAgIGVsc2UgaWYgKGNsaWNrVGFyZ2V0LmlkID09IFwiYWdlX3Byb2plY3RNb3JlT3B0aW9uc1wiKSB7XG4gICAgICAgIC8vIHByb2plY3RNb3JlT3B0aW9uc0J1dHRvbkNsaWNrZWQoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KTtcbiAgICAgICAgdG9nZ2xlTW9yZU9wdGlvbnMoKTtcbiAgICB9XG4vLyBUSVRMRVxuICAgIGVsc2UgaWYgKGNsaWNrVGFyZ2V0LmlkID09IFwiYWdlX3Byb2plY3RUaXRsZVwiKSB7XG4gICAgICAgIC8vIHByb2plY3RUaXRsZUNsaWNrZWQoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KTtcbiAgICAgICAgbGV0IHByb2plY3RDb250YWluZXJFbGVtZW50IDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0Q29udGFpbmVyXCIpO1xuICAgICAgICBwcm9qZWN0Q29udGFpbmVyRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb2xsYXBzZWRcIikgPyBwcm9qZWN0Q29udGFpbmVyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiY29sbGFwc2VkXCIpIDogcHJvamVjdENvbnRhaW5lckVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImNvbGxhcHNlZFwiKTtcbiAgICB9XG5cbiAgICBlbHNle1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnSWdub3JlZCBQcm9qZWN0IENsaWNrLicpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdG9nZ2xlTW9yZU9wdGlvbnMoKXtcbiAgICAvLyBjb25zb2xlLmxvZyhcIlRPR0dMRSBNT1JFIE9QVElPTlNcIilcbiAgICBsZXQgYnV0dG9uQm91bmRpbmdSZWN0ID0gcHJvamVjdE1vcmVPcHRpb25zQnV0dG9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCBidG5MZWZ0ID0gYnV0dG9uQm91bmRpbmdSZWN0LmxlZnQ7XG4gICAgbGV0IGJ0bkJvdHRvbSA9IGJ1dHRvbkJvdW5kaW5nUmVjdC5ib3R0b207XG4gICAgXG4gICAgbGV0IG1vcmVPcHRpb25zQ29udGV4dE1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9tb3JlUHJvamVjdE9wdGlvbnNDb250ZXh0TWVudVwiKTtcbiAgICBtb3JlT3B0aW9uc0NvbnRleHRNZW51LnN0eWxlLmxlZnQgPSBidG5MZWZ0ICsgXCJweFwiO1xuICAgIG1vcmVPcHRpb25zQ29udGV4dE1lbnUuc3R5bGUudG9wID0gYnRuQm90dG9tICsgNSArIFwicHhcIjtcblxuICAgIG1vcmVPcHRpb25zQ29udGV4dE1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWdlX2Rpc3BsYXlOb25lXCIpID8gbW9yZU9wdGlvbnNDb250ZXh0TWVudS5jbGFzc0xpc3QucmVtb3ZlKFwiYWdlX2Rpc3BsYXlOb25lXCIpIDogbW9yZU9wdGlvbnNDb250ZXh0TWVudS5jbGFzc0xpc3QuYWRkKFwiYWdlX2Rpc3BsYXlOb25lXCIpO1xufVxuXG5cblxuZnVuY3Rpb24gc2VhcmNoUHJvamVjdEluKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwic2VhcmNoUHJvamVjdEluKClcIilcbiAgICAvLyBmb2N1c1Byb2plY3RTZWFyY2ggPSB0cnVlO1xuICAgIC8vIGV4dGVuc2lvblN0YXRlRnJvbnQucHJvamVjdFNlYXJjaEFjdGl2ZSA9IHRydWU7XG4gICAgLy93cml0ZVN0YXRlRnJvbUZyb250KCk7XG4gICAgLy8gY29uc29sZS5sb2coJ3Byb2plY3RTZWFyY2hFbGVtZW50LnRleHRDb250ZW50ID0gJywgcHJvamVjdFNlYXJjaEVsZW1lbnQudGV4dENvbnRlbnQpO1xuICAgIFxuICAgIC8vIEVtcHR5IHNlYXJjaCBjb250YWluZXIgaWYgbm8gcHJldmlvdXMgc2VhcmNoIHN0cmluZyBleGlzdHNcbiAgICBpZiAoIXNlYXJjaFN0cmluZ0V4aXN0cykge1xuICAgICAgICBwcm9qZWN0U2VhcmNoRWxlbWVudC5pbm5lckhUTUwgPSAnPGRpdj48YnI+PC9kaXY+JzsgLy8gZGVmYXVsdCBjb250ZW50IG9uICdjb250ZW50ZWRpdGFibGUnIGVsZW1lbnRzIFxuICAgICAgICAvLyBzZXRJbnRlcnZhbCgoKSA9PiB7IHNlYXJjaElucHV0LmlubmVySFRNTCArPSAnPGJyPicgfSwgNTApO1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZygnZm9jdXMgc2VhcmNoICcpXG4gICAgLy8gcHJvamVjdFNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywga2V5UHJlc3NEdXJpbmdTZWFyY2gpXG4gICAgcHJvamVjdFNlYXJjaEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleURvd25EdXJpbmdTZWFyY2gpXG4gICAgLy8ga2V5RG93bkR1cmluZ1NlYXJjaCgpO1xufVxuXG5cbmZ1bmN0aW9uIHNlYXJjaFByb2plY3RPdXQoKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ3NlYXJjaFByb2plY3RPdXQoKScpO1xuICAgIFxuICAgIGxldCBzZWFyY2hTdHJpbmdMZW5ndGggPSBwcm9qZWN0U2VhcmNoRWxlbWVudC50ZXh0Q29udGVudC5sZW5ndGg7XG4gICAgaWYoc2VhcmNoU3RyaW5nTGVuZ3RoID09PSAwKXtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0VNUFRZIFNFQVJDSCBTVFJJTkcnKTtcbiAgICAgICAgc2VhcmNoU3RyaW5nRXhpc3RzID0gZmFsc2U7XG4gICAgICAgIHByb2plY3RTZWFyY2hFbGVtZW50LmlubmVySFRNTCA9ICc8ZGl2PlEgIDogIFNlYXJjaCAuIC4gLjxicj48L2Rpdj4nO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBzZWFyY2hTdHJpbmdFeGlzdHMgPSB0cnVlO1xuICAgIH1cbiAgICAvLyBleHRlbnNpb25TdGF0ZUZyb250LnByb2plY3RTZWFyY2hBY3RpdmUgPSBmYWxzZTtcbiAgICAvL3dyaXRlU3RhdGVGcm9tRnJvbnQoKTtcbiAgICAvLyBmb2N1c1Byb2plY3RTZWFyY2ggPSBmYWxzZTtcbiAgICAvLyBjb25zb2xlLmxvZygnZm9jdXNvdXQgc2VhcmNoICcpXG4gICAgLy8gcHJvamVjdFNlYXJjaElucHV0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywga2V5UHJlc3NEdXJpbmdTZWFyY2gpXG4gICAgcHJvamVjdFNlYXJjaEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleURvd25EdXJpbmdTZWFyY2gpXG59XG5cblxuLy8gUGVyZm9ybSBzZWFyY2ggd2l0aCBzbGlnaHQgZGVsYXkgdG8gbWFrZSBzdXJlIG5ldyBpbnB1dCBpcyB3cml0dGVuIHRvIGNvbnRlbnRFZGl0YW5sZSBpbnB1dFxuYXN5bmMgZnVuY3Rpb24ga2V5RG93bkR1cmluZ1NlYXJjaChldmVudCA6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAvLyBrZXlFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vIGNvbnNvbGUubG9nKCdrZXlEb3duRHVyaW5nU2VhcmNoKCknKTtcbiAgICAvLyBjb25zb2xlLmxvZygnZXZlbnQua2V5ID0gJywgZXZlbnQua2V5KTtcbiAgICBcbiAgICAvLyBVc2VyIGp1c3QgZGVsZXRlZCB0aGUgbGFzdCBjaGFyYWN0ZXIgc28gd2UgcmVzZXQgdGhlIGRlZmF1bHQgY29udGVudGVkaXRhYmxlIGVsbWVudCBzdHJ1Y3R1cmVcbiAgICAvLyBpZiB3ZSBjb24ndCBkbyB0aGlzIHRoZSB1c2VyIHdpbGwgaW5hZHZlcnRpZWRseSByZW1vdmUgdGhlIGNvbnRhaW5pbmcgPGRpdj4sIGJyZWFraW5nIHRoZSB0eXBpbmctYmVoYXZpb3VyIVxuICAgIGlmIChldmVudC5rZXkgPT09IFwiQmFja3NwYWNlXCIgJiYgcHJvamVjdFNlYXJjaEVsZW1lbnQudGV4dENvbnRlbnQubGVuZ3RoID09PSAxKXtcbiAgICAgICAgY29uc29sZS5sb2coJ0xhc3QgY2hhcmFjdGVyIGRlbGV0aW9uIHByb3RlY3Rpb24hJyk7XG4gICAgICAgIHByb2plY3RTZWFyY2hFbGVtZW50LmlubmVySFRNTCA9ICc8ZGl2Pjxicj48L2Rpdj4nOyAvLyBkZWZhdWx0IGNvbnRlbnQgb24gJ2NvbnRlbnRlZGl0YWJsZScgZWxlbWVudHMgXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIFxuICAgIFxuICAgIC8vIFRoaXMgZG9lcyBub3QgcHJldmVudCBhIHJlcXVlc3Qgb24gZWFjaCBrZXlzdHJva2VcbiAgICAvLyBCVVQgaXQgZW5hYmxlcyByZWFkaW5nIHRoZSBjaGFuZ2Ugb2YgZWFjaCBrZXlzdHJva2UuIFdoZW4gdGhpcyBtZXRob2QgaXMgY2FsbGVkIHRoZSB0ZXh0Q29udGVudCBvZiB0aGUgc2VyYWNoIGJveCBoYXMgbm90IGJlZW4gdXBkYXRlZCEhXG4gICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInByb2plY3RTZWFyY2hFbGVtZW50LnRleHRDb250ZW50ID0gXCIsIHByb2plY3RTZWFyY2hFbGVtZW50LnRleHRDb250ZW50KTtcblxuICAgICAgICBmZXRjaFByb2plY3RTZWFyY2gocHJvamVjdFNlYXJjaEVsZW1lbnQudGV4dENvbnRlbnQpXG4gICAgICAgICAgICAudGhlbigoY29udGVudE9iamVjdEFycmF5KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY29udGVudE9iamVjdEFycmF5KVxuICAgICAgICAgICAgICAgIGRvbS5wb3B1bGF0ZVByb2plY3RTZWFyY2hUYWJsZShwcm9qZWN0U2VhcmNoVGFibGUsIHByb2plY3RTZWFyY2hPYmplY3RzKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgLy8gYWdlX2RiaXMuQ29udGVudF9TZWxlY3RPblRpdGxlTGlrZVN0cmluZygpO1xuXG4gICAgICAgIC8vIGF3YWl0IGZldGNoUHJvamVjdFNlYXJjaFRoZW5Xcml0ZVRvU3RhdGVzKCk7XG5cbiAgICAgICAgLy8gcG9wdWxhdGVQcm9qZWN0U2VhcmNoVGFibGVGcm9tU3RhdGUoKTtcblxuICAgIH0sIDEwMCk7XG5cblxufVxuXG5cbmZ1bmN0aW9uIHNob3dQcm9qZWN0VGFibGUoYnV0dG9uSWQgOiBzdHJpbmcpe1xuICAgIC8vIGFnZV9wcm9qZWN0QnV0dG9uT25cblxuICAgIC8vIFNlYXJjaCBib3hcbiAgICBsZXQgc2VhcmNoQm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdFNlYXJjaElucHV0XCIpO1xuICAgIHNlYXJjaEJveC5jbGFzc0xpc3QuYWRkKFwiYWdlX2Rpc3BsYXlOb25lXCIpO1xuXG4gICAgLy8gUmVzZXQgdGhlIGJ1dHRvbnNcbiAgICBsZXQgc2VhcmNoQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdFNlYXJjaEJ1dHRvblwiKVxuICAgIGxldCBjaGlsZHJlbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWdlX3Byb2plY3RDaGlsZHJlbkJ1dHRvblwiKVxuICAgIGxldCBwcm9wZXJ0aWVzQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdFByb3BlcnRpZXNCdXR0b25cIilcbiAgICBzZWFyY2hCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFnZV9wcm9qZWN0QnV0dG9uT25cIik7XG4gICAgY2hpbGRyZW5CdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFnZV9wcm9qZWN0QnV0dG9uT25cIik7XG4gICAgcHJvcGVydGllc0J1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWdlX3Byb2plY3RCdXR0b25PblwiKTtcblxuICAgIC8vIFJlc2V0IHRoZSBUYWJsZXNcbiAgICBsZXQgc2VhcmNoVGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0U2VhcmNoVGFibGVcIik7XG4gICAgbGV0IGNoaWxkcmVuVGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFnZV9wcm9qZWN0Q2hpbGRyZW5UYWJsZVwiKTtcbiAgICBsZXQgcHJvcGVydGllc1RhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VfcHJvamVjdFByb3BlcnRpZXNUYWJsZVwiKTtcbiAgICBzZWFyY2hUYWJsZS5jbGFzc0xpc3QuYWRkKFwiYWdlX2Rpc3BsYXlOb25lXCIpO1xuICAgIGNoaWxkcmVuVGFibGUuY2xhc3NMaXN0LmFkZChcImFnZV9kaXNwbGF5Tm9uZVwiKTtcbiAgICBwcm9wZXJ0aWVzVGFibGUuY2xhc3NMaXN0LmFkZChcImFnZV9kaXNwbGF5Tm9uZVwiKTtcblxuICAgIC8vIEFjdGl2ZSB0aGUgY29ycmVjdCBvbmVcbiAgICBpZiAoYnV0dG9uSWQgPT09IFwiYWdlX3Byb2plY3RTZWFyY2hCdXR0b25cIil7XG4gICAgICAgIHNlYXJjaFRhYmxlLmNsYXNzTGlzdC5yZW1vdmUoXCJhZ2VfZGlzcGxheU5vbmVcIik7XG4gICAgICAgIHNlYXJjaEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWdlX3Byb2plY3RCdXR0b25PblwiKTtcbiAgICAgICAgc2VhcmNoQm94LmNsYXNzTGlzdC5yZW1vdmUoXCJhZ2VfZGlzcGxheU5vbmVcIik7XG4gICAgfVxuICAgIGVsc2UgaWYgKGJ1dHRvbklkID09PSBcImFnZV9wcm9qZWN0Q2hpbGRyZW5CdXR0b25cIil7XG4gICAgICAgIGNoaWxkcmVuVGFibGUuY2xhc3NMaXN0LnJlbW92ZShcImFnZV9kaXNwbGF5Tm9uZVwiKTtcbiAgICAgICAgY2hpbGRyZW5CdXR0b24uY2xhc3NMaXN0LmFkZChcImFnZV9wcm9qZWN0QnV0dG9uT25cIik7XG4gICAgfVxuICAgIGVsc2UgaWYgKGJ1dHRvbklkID09PSBcImFnZV9wcm9qZWN0UHJvcGVydGllc0J1dHRvblwiKXtcbiAgICAgICAgcHJvcGVydGllc1RhYmxlLmNsYXNzTGlzdC5yZW1vdmUoXCJhZ2VfZGlzcGxheU5vbmVcIik7XG4gICAgICAgIHByb3BlcnRpZXNCdXR0b24uY2xhc3NMaXN0LmFkZChcImFnZV9wcm9qZWN0QnV0dG9uT25cIik7XG4gICAgfVxuICAgIFxufVxuXG5mdW5jdGlvbiBwcm9qZWN0VGl0bGVDbGlja2VkKHRhYmxlUm93OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKFwiUHJvamVjdCB0aXRsZSBjbGlja2VkOiBcIiwgdGFibGVSb3cpXG59XG5mdW5jdGlvbiBwcm9qZWN0U2VhcmNoQnV0dG9uQ2xpY2tlZCh0YWJsZVJvdzogSFRNTEVsZW1lbnQpIDogdm9pZCB7XG4gICAgY29uc29sZS5sb2coXCJQcm9qZWN0IHNlYXJjaCBjbGlja2VkOiBcIiwgdGFibGVSb3cpXG59XG5mdW5jdGlvbiBwcm9qZWN0Q2hpbGRyZW5CdXR0b25DbGlja2VkKHRhYmxlUm93OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKFwiUHJvamVjdCBjaGlsZHJlbiBjbGlja2VkOiBcIiwgdGFibGVSb3cpXG59XG5mdW5jdGlvbiBwcm9qZWN0UHJvcGVydGllc0J1dHRvbkNsaWNrZWQodGFibGVSb3c6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coXCJQcm9qZWN0IHByb3BlcnRpZXMgY2xpY2tlZDogXCIsIHRhYmxlUm93KVxufVxuZnVuY3Rpb24gcHJvamVjdE1vcmVPcHRpb25zQnV0dG9uQ2xpY2tlZCh0YWJsZVJvdzogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhcIlByb2plY3Qgb3B0aW9ucyBjbGlja2VkOiBcIiwgdGFibGVSb3cpXG59XG5mdW5jdGlvbiBwcm9qZWN0U2VhcmNoUm93Q2xpY2tlZCh0YWJsZVJvdzogSFRNTFByb2plY3RUYWJsZVJvdyk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKFwiVGFibGUgcm93IGNsaWNrZWQ6IFwiLCB0YWJsZVJvdylcbn1cblxuXG5mdW5jdGlvbiBmZXRjaFByb2plY3RTZWFyY2goc2VhcmNoU3RyaW5nIDogc3RyaW5nKSA6IFByb21pc2U8YW55PntcbiAgICByZXR1cm4gYWdlX2RiaXMuQ29udGVudF9TZWxlY3RPblRpdGxlTGlrZVN0cmluZyhzZWFyY2hTdHJpbmcsIFwiNTBcIiwgXCJQcm9qZWN0XCIsIFwiXCIsIFwiXCIpXG4gICAgICAgIC50aGVuKChjb250ZW50T2JqZWN0QXJyYXk6IGFueSkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY29udGVudE9iamVjdEFycmF5KTtcbiAgICAgICAgICAgIHByb2plY3RTZWFyY2hPYmplY3RzID0gY29udGVudE9iamVjdEFycmF5O1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjb250ZW50T2JqZWN0QXJyYXkpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yIDogRXJyb3IpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xuICAgICAgICB9KVxufVxuXG5mdW5jdGlvbiBmZXRjaFByb2plY3RDaGlsZHJlbihVdWlkIDogc3RyaW5nIHwgbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gYWdlX2RiaXMuQ29udGVudEVkZ2VfU2VsZWN0Q2hpbGRPZlV1aWQoVXVpZClcbiAgICAgICAgLnRoZW4oKGNvbnRlbnRFZGdlT2JqZWN0QXJyYXk6IGFueSkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY29udGVudE9iamVjdEFycmF5KTtcbiAgICAgICAgICAgIHByb2plY3RDb250ZW50RWRnZUNoaWxkcmVuID0gY29udGVudEVkZ2VPYmplY3RBcnJheTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwcm9qZWN0Q29udGVudEVkZ2VDaGlsZHJlbiA9ICcsIHByb2plY3RDb250ZW50RWRnZUNoaWxkcmVuKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwcm9qZWN0Q29udGVudEVkZ2VDaGlsZHJlbik7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3I6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtcbiAgICAgICAgfSlcbn1cblxuZnVuY3Rpb24gYXBwZW5kQ3NzKCkgOiB2b2lke1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kKHByb2plY3RDc3MpO1xufVxuXG5cbmZ1bmN0aW9uIHJlbW92ZUNzcygpIDogdm9pZCB7XG4gICAgcHJvamVjdENzcy5yZW1vdmUoKTtcbn1cblxuXG5cblxuZXhwb3J0IHtcbiAgICBpbml0UHJvamVjdHMsXG4gICAgYXBwZW5kQ3NzLFxuICAgIHJlbW92ZUNzcyxcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgVGZldGNoZXIgfSBmcm9tIFwiLi9mZXRjaGVyXCI7XG5cblxuaW1wb3J0ICogYXMgb3ZlcmxheSBmcm9tIFwiLi9vdmVybGF5XCI7XG5cbmxldCBleHRlbnNpb25TdGF0ZUZyb250ID17XG4gICAgYWN0aXZlOiBmYWxzZSxcbn07XG5cblxuLy8gU2V0IHVwIG1vZHVsZXMgYW5kIGZldGNoIGRhdGFcbihmdW5jdGlvbiBpbml0KCkge1xuICAgIG92ZXJsYXkuaW5pdE92ZXJsYXkoKTsgIFxuXG4gICAgLy8gbGV0IHNldHRpbmdJdGVtID0gYnJvd3Nlci5zdG9yYWdlLmxvY2FsLnNldCh7IHRlc3Q6IFwiVkFMVUVcIiB9KTtcblxufSkoKTtcblxuXG4vLyBEaXNwbGF5IHRoZSBleHRlbnNpb24tY29udGFpbmVyXG5icm93c2VyLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtZXNzYWdlKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJUb2dnbGVFeGl0ZW5zaW9uIE1lc3NhZ2UgcmVjaWV2ZWQhXCIpXG5cbiAgICBpZiAobWVzc2FnZS5uYW1lID09PSAndG9nZ2xlRXh0ZW5zaW9uJykge1xuICAgICAgICBpZiAoZXh0ZW5zaW9uU3RhdGVGcm9udC5hY3RpdmUpXG4gICAgICAgICAgICBzdG9wKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHN0YXJ0KCk7XG4gICAgfVxuXG59KTtcblxuXG4vKipcbiAqICBTaG93IGluamVjdGVkIGNvbnRhaW5lclxuICovXG5mdW5jdGlvbiBzdGFydCgpIDogdm9pZCB7XG4gICAgY29uc29sZS5sb2coXCJTVEFSVFwiKTtcbiAgICBcbiAgICBleHRlbnNpb25TdGF0ZUZyb250LmFjdGl2ZSA9IHRydWU7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhhd2FpdCBmZXRjaGVyLmZldGNoSHRtbChcIm92ZXJsYXkuaHRtbFwiKSlcblxuICAgIG92ZXJsYXkuc2hvd092ZXJsYXkoKTtcbn1cblxuXG4vKipcbiAqICBcbiAqICBIaWRlIGluamVjdGVkIGNvbnRhaW5lclxuICovXG5mdW5jdGlvbiBzdG9wKCkgOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhcIlNUT1BcIik7XG4gICAgZXh0ZW5zaW9uU3RhdGVGcm9udC5hY3RpdmUgPSBmYWxzZTtcbiAgICBvdmVybGF5LmhpZGVPdmVybGF5KCk7XG59XG5cblxuLy8gY29uc3QgbWVzc2FnZSA9IFwiSGVsbG8gV29ybGQhXCI7XG5cblxuLy8gY29uc29sZS5sb2coXCJUWVBFU0NSSVBUQFwiKVxuXG4vLyBjb25zb2xlLmxvZyhtZXNzYWdlLnRvTG93ZXJDYXNlKCksIFwiMlwiKVxuXG4vLyAvLyBtZXNzYWdlKCk7XG5cbi8vIGxldCB0eXBlQSA9IHtcbi8vICAgICBhOiBcImFcIixcbi8vICAgICBBOiAxLFxuLy8gfVxuXG5cbi8vIGZ1bmN0aW9uIGZ1bmZ1bihfeDogc3RyaW5nKXtcbi8vICAgICBjb25zb2xlLmxvZyhfeCk7XG4vLyB9XG4vLyBmdW5mdW4odHlwZUEuYSk7XG5cbi8vIGZ1bmN0aW9uIGdyZWV0KHBlcnNvbjpzdHJpbmcsIGRhdGU6c3RyaW5nKSB7XG4vLyAgICAgY29uc29sZS5sb2coYEhlbGxvICR7cGVyc29ufSwgdG9kYXkgaXMgJHtkYXRlfSFgKTtcbi8vIH1cblxuLy8gLy8gZ3JlZXQoXCJCcmVuZGFuXCIpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==