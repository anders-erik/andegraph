

import { dbis } from "../modules/dbi-send/dbi-send.js";

export class projectChildren {

    static async populateProjectContainer(){
        let projectTableBody = document.querySelector("#projectsTableBody");


        const urlParams = new URLSearchParams(window.location.search);
        const uuid = urlParams.get('uuid');
        const title = urlParams.get('title');
        // console.log(myParam);
        document.getElementsByTagName("h1")[0].textContent += ` ${title}`;

        // let projectData = await dbis.Content_SelectOnTitleLikeString("", 50, "Project", "");
        let projectData = await dbis.ContentEdge_SelectChildOfUuid(uuid);
        
        console.log(projectData);


        projectData.forEach(project => {
            let tr = document.createElement("tr");
            tr.id = "projectsTableBody_tr"
            tr.projectNode = project.content;

            let td_1 = document.createElement("td");

            td_1.innerHTML = `
            <a href=\"../source2/index.html?uuid=${project.content.Uuid}&table=${project.content.Table}&title=${project.content.Title}\">
                ${project.content.Title}
            </a>`;

            
            // td_1.textContent = project.Title;

            tr.appendChild(td_1);
            projectTableBody.appendChild(tr);
        });
        // console.log("dd")
    }
}

