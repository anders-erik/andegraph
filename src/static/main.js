
import { App } from './modules/App.js';

let isDev = window.location.pathname.match(/development/);
let app;


if (isDev) {
	console.log('DEV')

	app = new App('root');

}
else {
	console.log('NOT DEV')
	app = new App('root');

	app.reloadApp();
}


