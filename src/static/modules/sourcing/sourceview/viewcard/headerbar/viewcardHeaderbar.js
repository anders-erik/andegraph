
//import { displaySourceFile } from "../Viewcard.js";
import { displaySourceFile, postFile } from "../fileviewer/fileviewer.js";
import { extractCurrentSourceId, loadSource } from "../../propertiescard/PropertiesCard.js";
import * as api from '../../../../Fetches/api/api.js';


function getSourceviewHeaderbar(){
	

	let sourceviewHeaderbar = document.createElement('div');
	sourceviewHeaderbar.id = 'sourceview-headerbar';
	//buttonCard.classList.add('button-card');


	let sourceviewGet = document.createElement('div');
	sourceviewGet.id = 'sourceview-file-get';
	sourceviewGet.classList.add('headerbar-element');
	sourceviewGet.textContent = 'GET file';
	sourceviewGet.addEventListener('click', getSourceFilePressed);
	sourceviewHeaderbar.appendChild(sourceviewGet);



	// File selection input for new source file
	// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
	let sourceviewPost = document.createElement('input');
	sourceviewPost.id = 'sourceview-file-post';
	sourceviewPost.type = 'file';
	sourceviewPost.addEventListener('change', postSourceFilePressed);

	// Set costum label for file selector
	let sourceviewPostLabel = document.createElement('label');
	sourceviewPostLabel.id = 'sourceview-file-post-label';
	sourceviewPostLabel.classList.add('headerbar-element');
	// https://stackoverflow.com/questions/15750290/setting-the-html-label-for-attribute-in-javascript
	sourceviewPostLabel.htmlFor = 'sourceview-file-post';
	sourceviewPostLabel.textContent = 'POST file';
	
	sourceviewHeaderbar.appendChild(sourceviewPost);
	sourceviewHeaderbar.appendChild(sourceviewPostLabel);

	return sourceviewHeaderbar;
}


async function getSourceFilePressed(e){

	//console.log('mock file load');
	displaySourceFile();
	
}



function enablePostButton(){
	document.getElementById('sourceview-file-post-label').classList.remove('disabled-post');
	document.getElementById('sourceview-file-post-label').removeAttribute('disabled');
	document.getElementById('sourceview-file-post').removeAttribute('disabled');
	//console.log('enabled');
}


function disablePostButton(){
	document.getElementById('sourceview-file-post-label').classList.add('disabled-post');
	document.getElementById('sourceview-file-post-label').setAttribute('disabled', 'true');
	document.getElementById('sourceview-file-post').setAttribute('disabled', 'true');
	//console.log('disabled');
}

async function postSourceFilePressed(e){

	console.log("File selected: ", e.target.files[0]);
	
	postFile(e.target.files[0]);
	//console.log('Mock file upload');
	

	//document.getElementById('sourceview-fileending-field').value = 'ending';
	//document.getElementById('sourceview-filetype-field').value = 'type';

	//UpdateDOM.saveCurrentSource();
	//UpdateDOM.loadSource();

}



export {
	getSourceviewHeaderbar,
	enablePostButton,
	disablePostButton
}


