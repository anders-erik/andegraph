//import { addSourceListContainer, addSourceViewerContainer } from './Containers.js';
//import { createSourcefindPanel, createSourceviewPanel,createVerticalSerperationPanel, createShardlistPanel } from './Panels.js';

import * as Sourcefind from './sourcing/sourcefind/Sourcefind.js';
import * as Sourceview from './sourcing/sourceview/Sourceview.js';
import * as VerticalSeperator from './VerticalSeperator.js';
import * as listcard from './sourcing/sourcefind/listcard/Listcard.js';

import * as log from './log/log.js';

// DEV IMPORT
//import { fetchSourcesClicked } from './DOMEvents.js';
import { fetchSourcesClicked } from './sourcing/sourcefind/searchcard/Searchcard.js';


function App(){

	let root = document.getElementById('root');
	
	
	//addSourceListContainer();
	//addSourceViewerContainer();


// 2023-12-14
	root.appendChild(Sourcefind.createSourcefindPanel());
	root.appendChild(VerticalSeperator.createVerticalSerperationPanel(1));
	root.appendChild(Sourceview.createSourceviewPanel());
	root.appendChild(VerticalSeperator.createVerticalSerperationPanel(1));

// 2023-12-03
	//root.appendChild(createSourcefindPanel());
	//root.appendChild(createVerticalSerperationPanel(1));
	//root.appendChild(createSourceviewPanel());
	//root.appendChild(createVerticalSerperationPanel(1));
	//root.appendChild(createShardlistPanel());

	
	//debugger;
	// Fetch and pick first source
	fetchSourcesClicked().then(() => {

		//let id = listcard.getFirstSourcecardId();

		localStorage.setItem("defaultSourceId", "1");
		let id = localStorage.getItem("defaultSourceId");
		//console.log(id);

		// let id = (window.location.pathname).match(/\d+$/g)
		document.getElementById(`sourcefind-sourcecard-${id}`).click();


	})


	//log.showToast('showtime');
}


export {
	App
}
