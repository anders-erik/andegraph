

import * as App from './modules/App.js';

App.initApp('root');

//App.loadSourcing();


// API TESTER
import * as apiTester from './modules/Fetches/apitester/ApiTester.js';
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



