

import { dbis } from "../modules/dbi-send/dbi-send.js";

export class projects {

    static async populateProjectContainer(){
        let projectTableBody = document.querySelector("#projectsTableBody");
        
        let projectData = await dbis.Content_SelectOnTitleLikeString("", 50, "Project", "");
        
        // console.log(projectData);


        projectData.forEach(project => {
            let tr = document.createElement("tr");
            tr.id = "projectsTableBody_tr"
            tr.projectNode = project;

            let td_1 = document.createElement("td");

            td_1.innerHTML = `
            <a href="../project/index.html?uuid=${project.Uuid}&title=${project.Title}"">
                ${project.Title}
            </a>`;

            
            // td_1.textContent = project.Title;

            tr.appendChild(td_1);
            projectTableBody.appendChild(tr);
        });
        // console.log("dd")
    }
}

