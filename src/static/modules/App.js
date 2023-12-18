//import { addSourceListContainer, addSourceViewerContainer } from './Containers.js';
//import { createSourcefindPanel, createSourceviewPanel,createVerticalSerperationPanel, createShardlistPanel } from './Panels.js';

import * as Sourcefind from './sourcing/sourcefind/Sourcefind.js';
import * as Sourceview from './sourcing/sourceview/Sourceview.js';
import * as VerticalSeperator from './VerticalSeperator.js';

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

	
	// Fetch and pick first source
	fetchSourcesClicked().then(() => {
		document.getElementById('sourcefind-sourcecard-1').click();

	})


	//log.showToast('showtime');
}


export {
	App
}
