// import { importmap_tester_func } from 'test_';
// import { importmap_tester_func } from './modules/importmap-tester.js';
import { importmap_tester_func } from "imim";
// import { importmap_tester_func } from './modules/importmap-tester.js';

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


