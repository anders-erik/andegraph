
import { dbis } from "../modules/dbi-send/dbi-send.js";

import {context} from "./context.js";
import { projectChildren } from "./projectChildren.js";

projectChildren.populateProjectContainer();




document.addEventListener("click", context.createContextMenuEvent);



// dbis.Content_SelectOnTitleLikeString("", 50, "", "");