
import { dbis } from "../modules/dbi-send/dbi-send.js";

import {context} from "./context.js";
import { sourceChildren } from "./sourceChildren.js";

sourceChildren.populateProjectContainer();




document.addEventListener("click", context.createContextMenuEvent);



// dbis.Content_SelectOnTitleLikeString("", 50, "", "");