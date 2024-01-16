
// //import { displaySourceFile } from "../Viewcard.js";
// import { displaySourceFile, postFile } from "../fileviewer/fileviewer.js";

import { extractCurrentSourceId } from "../../../../sourceview/propertiescard/PropertiesCard_Extract.js";

// import { extractCurrentSourceId, loadSource } from "../../propertiescard/PropertiesCard.js";

// import * as api from '../../../../Fetches/api/api.js';
import * as api from "../../../../../Fetches/api/api.js";


function getSourceviewHeaderbar(shard){
	

	let shardcardHeaderbar = document.createElement('div');
	//sourceviewHeaderbar.id = 'shardcard-headerbar';
	shardcardHeaderbar.classList.add('shardcard-headerbar')
	//buttonCard.classList.add('button-card');


	let shardcardTitle = document.createElement('input');
	shardcardTitle.id = 'shardcard-title-' + shard.id;
	shardcardTitle.classList.add('shardcard-title');
	shardcardTitle.value = shard.title;
	shardcardTitle.addEventListener('focusout', shardcardPromptFocusout);
	shardcardHeaderbar.appendChild(shardcardTitle);


	let shardcardShardid = document.createElement('div');
	shardcardShardid.id = 'shardcard-shardid-' + shard.id;
	shardcardShardid.classList.add('shardcard-element', 'shardcard-shardid');
	shardcardShardid.textContent = 'Shard ID : ' + shard.id;
	shardcardHeaderbar.appendChild(shardcardShardid);

	let shardcardSourceid = document.createElement('div');
	shardcardSourceid.id = 'shardcard-sourceid-' + shard.id;
	shardcardSourceid.classList.add('shardcard-element', 'shardcard-sourceid');
	shardcardSourceid.textContent = 'Source ID : ' + shard.sourceId;
	shardcardHeaderbar.appendChild(shardcardSourceid);

	let shardcardFileType = document.createElement('div');
	shardcardFileType.id = 'shardcard-filetype-' + shard.id;
	shardcardFileType.classList.add('shardcard-element', 'shardcard-filetype');
	shardcardFileType.textContent = 'File Type : ' + shard.elementType;
	shardcardHeaderbar.appendChild(shardcardFileType);

	let shardcardFileExtension = document.createElement('div');
	shardcardFileExtension.id = 'shardcard-fileending-' + shard.id;
	shardcardFileExtension.classList.add('shardcard-element', 'shardcard-fileending');
	shardcardFileExtension.textContent = 'File Ext. : ' + shard.fileExtension;
	shardcardHeaderbar.appendChild(shardcardFileExtension);

	//shardcardHeaderbar.appendChild();

	return shardcardHeaderbar;
}


function shardcardPromptFocusout(event){
	//console.log('focus out');
	
	let shardid = event.target.id.match(/\d+$/g)[0];
	//console.log(shardid);

	let sourceid = extractCurrentSourceId();
	//console.log(sourceid);

	let newPrompt = event.target.value;
	//console.log(newPrompt);
	
	api.patchShard(sourceid, shardid, newPrompt);

}



export {
	getSourceviewHeaderbar,
}


