import * as fetcher from "./fetcher";

let sidePanel : Element;

let projectContainer : Element;
let projectCss: HTMLElement;




function initProjects(_sidePanel : Element) : void{
    sidePanel = _sidePanel;

    console.log('OVERLAY TS INIT');

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