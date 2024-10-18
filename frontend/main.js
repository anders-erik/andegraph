import { App } from './modules/App.js';
import * as devServer from "./modules/util/dev-server.js";


/* 
	LOAD APP
*/
let app = new App('root');
app.reloadApp();





/* 
	DEV SERVER
*/

// let isDev = window.location.pathname.match(/development/);
let isDev = true;

if(isDev){ 
	devServer.init();
}
