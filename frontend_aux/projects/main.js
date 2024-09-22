
import { dbis } from "../modules/dbi-send/dbi-send.js";

import {context} from "./context.js";
import { projects } from "./projects.js";

projects.populateProjectContainer();


document.addEventListener("click", context.createContextMenuEvent);



// dbis.Content_SelectOnTitleLikeString("", 50, "", "");