
import { displaySourceFile } from "../Viewcard.js";
import { extractCurrentSourceId, loadSource } from "../../propertiescard/PropertiesCard.js";
import * as api from '../../../../Fetches/api/api.js';


function getSourceviewHeaderbar(){
	

	let sourceviewHeaderbar = document.createElement('div');
	sourceviewHeaderbar.id = 'sourceview-headerbar';
	//buttonCard.classList.add('button-card');


	let sourceviewLoad = document.createElement('div');
	sourceviewLoad.id = 'sourceview-file-load';
	sourceviewLoad.classList.add('headerbar-element');
	sourceviewLoad.textContent = 'load';
	sourceviewLoad.addEventListener('click', loadSourceFilePressed);
	sourceviewHeaderbar.appendChild(sourceviewLoad);



	// File selection input for new source file
	// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
	let sourceviewUpload = document.createElement('input');
	sourceviewUpload.id = 'sourceview-file-upload';
	sourceviewUpload.type = 'file';
	sourceviewUpload.addEventListener('change', uploadSourceFilePressed);

	// Set costum label for file selector
	let sourceviewUploadLabel = document.createElement('label');
	sourceviewUploadLabel.id = 'sourceview-file-upload-label';
	sourceviewUploadLabel.classList.add('headerbar-element');
	// https://stackoverflow.com/questions/15750290/setting-the-html-label-for-attribute-in-javascript
	sourceviewUploadLabel.htmlFor = 'sourceview-file-upload';
	sourceviewUploadLabel.textContent = 'upload';
	
	sourceviewHeaderbar.appendChild(sourceviewUpload);
	sourceviewHeaderbar.appendChild(sourceviewUploadLabel);

	return sourceviewHeaderbar;
}

async function loadSourceFilePressed(e){

	//console.log('mock file load');
	//ViewCard.displaySourceFile();
	displaySourceFile();
	
}


async function uploadSourceFilePressed(e){
	console.log("File selected: ", e.target.files[0]);
	
	//console.log('Mock file upload');
	await api.postSourceFile(extractCurrentSourceId(), e.target.files[0]);

	loadSource(extractCurrentSourceId());

	//document.getElementById('sourceview-fileending-field').value = 'ending';
	//document.getElementById('sourceview-filetype-field').value = 'type';

	//UpdateDOM.saveCurrentSource();
	//UpdateDOM.loadSource();

}


export {
	getSourceviewHeaderbar
}


