import * as fetcher from "./fetcher";
import {age_dbis} from "./dbi-send";

let sidePanel : Element;

let projectContainer : Element;
let projectCss: HTMLElement;

let projectObjects: any;
let projectTable: any;



function initProjects(_sidePanel : Element) : void{
    console.log('OVERLAY TS INIT');

    sidePanel = _sidePanel;

    projectContainer = document.createElement('div');
    projectContainer.id = "age_projectContainer";

    fetcher.fetchHtml("projects.html")
        .then(html => {
            // console.log("HTML : ", html)
            projectContainer.innerHTML = html;
        }) 
  
    projectCss = document.createElement("style");
    projectCss.id = "age_projectStyle";
    fetcher.fetchCss("projects.css")
    .then(css => {
        projectCss.innerText = css;
    })

    console.log("sidePanel.id = ", sidePanel.id)
    
    sidePanel.append(projectContainer);

    fetchProjects()
        .then((contentObjectArray) => {
            console.log(contentObjectArray)
        })
    
}

function fetchProjects() : Promise<any>{
    return age_dbis.Content_SelectOnTitleLikeString("", "50", "", "", "")
        .then((contentObjectArray: any) => {
            // console.log(contentObjectArray);
            projectObjects = contentObjectArray;
            return Promise.resolve(contentObjectArray);
        })
        .catch((error : Error) => {
            return Promise.reject();
        })
}

function appendCss() : void{
    document.head.append(projectCss);
}


function removeCss() : void {
    projectCss.remove();
}




export {
    initProjects,
    appendCss,
    removeCss,
}