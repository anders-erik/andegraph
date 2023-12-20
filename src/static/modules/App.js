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
import * as PropertiesCard from './sourcing/sourceview/propertiescard/PropertiesCard.js';

import * as api from './Fetches/api/api.js';


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

		try {

			//localStorage.setItem("lastLoadedSourceId", "1");

			let lastLoadedSourceId = localStorage.getItem("lastLoadedSourceId");


			// Make sure the source exists!
			api.getSource(lastLoadedSourceId).then((response) => {
	
				if(response.status == 410){
					console.log('Source no longer exists.');
				}
				else {
					PropertiesCard.loadSource(lastLoadedSourceId);
				}

			});

			//PropertiesCard.loadSource(lastLoadedSourceId);

			//let id = listcard.getFirstSourcecardId();

			//let id = localStorage.getItem("defaultSourceId");

			// let id = (window.location.pathname).match(/\d+$/g)
			//document.getElementById(`sourcefind-sourcsecard-${id}`).click();


		} catch (error) {

			console.log('Silent error: Unable to select most recently loaded source.');

		}



	})


	//log.showToast('showtime');
}


export {
	App
}
