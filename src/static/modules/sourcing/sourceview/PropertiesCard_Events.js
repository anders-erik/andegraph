import { extractCurrentSourceObject, extractCurrentSourceId, extractCurrentSourceFileType } from './PropertiesCard_Extract.js';
//import * as UpdateDOM from '../../UpdateDOM.js';
import * as PropertiesCard from './PropertiesCard.js';
import * as Fetches from '../../Fetches/BaseFetches.js'


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


async function uploadSourceFilePressed(e){
	console.log("File selected: ", e.target.files[0]);
	
	Fetches.uploadSourceFile(extractCurrentSourceId(), e.target.files[0]);

	document.getElementById('sourceview-fileending-field').value = 'ending';
	document.getElementById('sourceview-filetype-field').value = 'type';

	//UpdateDOM.saveCurrentSource();
	//UpdateDOM.loadSource();

}


async function loadSourceFilePressed(e){
	//console.log("File load pressed");
	let currentSourceId = extractCurrentSourceId();

	//console.log(typeof(+document.getElementById('sourceview-hasfile-field').value));

	if(currentSourceId == ''){
		console.log('no source selected')
	}
	else if (+document.getElementById('sourceview-hasfile-field').value != 1) { //sourceview-hasfile-field
		// check if source has a file to load. If not we don't do anything
		console.log('There is no file associated with this source.')
	}
	else{
		let fetchedBlob = await Fetches.loadSourceFile(extractCurrentSourceId());
		// console.log('fetched blob:');
		// console.log(fetchedBlob);
		// console.log('Size : ' + fetchedBlob.slice(1, 100).text().then((obj) => {console.log(obj)}));
		// console.log();
	
		let fileUrl = URL.createObjectURL(fetchedBlob);
		// console.log('file Url:');
		// console.log(fileUrl);
	
		//let viewcard = document.getElementById('sourceview-viewcard');

//sourceview-filetype-field

		//viewcard.style.backgroundImage = 'url(' + fileUrl  + ')';	
		PropertiesCard.displayNewSourceFile(extractCurrentSourceFileType(), fileUrl);
	}

	
}


async function reviewDateClicked(e){
	console.log(e.target.innerHTML);
	
}

export {
	sourceviewFieldFocusout,
	uploadSourceFilePressed,
	loadSourceFilePressed,
	reviewDateClicked
}