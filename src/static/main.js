import * as AppFunctions from './modules/App.js';
import { App } from './modules/App.js';
import { GlobalEventHandler } from './modules/globalevents/GlobalEventhandler.js';

let isDev = window.location.pathname.match(/development/);
let app;
// console.log(urlPathBase)

if (isDev) {
	console.log('DEV')

	app = new App('root');
	// app.initGlobalEventHandler(app);

}
else {
	console.log('NOT DEV')

	AppFunctions.initAppFunctions('root');
}





//AppFunctions.loadSourcing();


// API TESTER
import * as apiTester from './modules/Fetches/apitester/ApiTester.js';
// import { GlobalEventHandler } from './modules/globalevents/GlobalEventhandler.js';
//apiTester.testTextFile();

// MODELS
import * as models from './modules/models/models.js';
//console.log(models.generateNewSource())
//console.log(models.generateNewShard())

// UUID 
import { extractUnixTime, extractObjectType } from './modules/utils/uuid.js';
// New source + immediately new shard/child, with associated edge id
//console.log(extractObjectType(92746373136) + ' ' + extractUnixTime(92746373136))
//console.log(extractObjectType(92746381312) + ' ' + extractUnixTime(92746381312))
//console.log(extractObjectType(92746379265) + ' ' + extractUnixTime(92746379265))



