import { extractCurrentSourceObject, extractCurrentSourceId, extractCurrentSourceFileType } from './PropertiesCard_Extract.js';
//import * as UpdateDOM from '../../UpdateDOM.js';
import * as PropertiesCard from './PropertiesCard.js';
import * as ViewCard from '../viewcard/Viewcard.js';
//import * as Fetches from '../../../Fetches/BaseFetches.js'
//import { postSourceFile } from '../../../Fetches/api/source/file/PostSourceFile.js';
import * as api from '../../../Fetches/api/api.js';
import * as sourcecard from '../../sourcefind/listcard/sourcecard/Sourcecard.js';


let sourceviewFieldFocusout = async function(e){
	/* 
	console.log('lost focus');
	let object = 
		{
		"id": "12",
		"name": "a",
		"url": "a.org",
		"date": "2023-12-03",
		"completed": "false"
		}
	;
	let objectString = JSON.stringify(object);
 	*/

	PropertiesCard.saveCurrentSource();


	// let currentSourceObject = ExtractDOM.extractCurrentSourceObject();
	
	// //console.log(JSON.stringify(currentSourceObject));
	// //console.log(objectString);

	// Fetches.updateSource(JSON.stringify(currentSourceObject));

	// UpdateDOM.updateSourcefindCard(currentSourceObject.id);

}


async function deleteSourceFromDatabase(){
	console.log();
	//console.log('dummy delete from db :');


	if (confirm("Really delete?!") == true) {

		let sourceId = PropertiesCard.extractCurrentSourceId();
		
		

		ViewCard.removeCurrentFileFromDOM();
		//console.log('unload file');

		sourcecard.removeSourcefindCard( sourceId );
		//console.log('removed sourcecard');

		PropertiesCard.clearSourceviewPropertiescard();
		//console.log('clear properties card');

		api.deleteSource(sourceId);

		console.log('Source: ' + sourceId + ' deleted from database.');
		
	} 
	else {
		console.log('nothing deleted')
	}

	

}


export {
	sourceviewFieldFocusout,
	deleteSourceFromDatabase
	// uploadSourceFilePressed,
	// loadSourceFilePressed,
	
}