
import * as Sourcefind from './sourcefind/Sourcefind.js';
import * as Sourceview from './sourceview/Sourceview.js';

import { fetchSourcesClicked } from './sourcefind/searchcard/Searchcard.js';
import * as PropertiesCard from './sourceview/propertiescard/PropertiesCard.js';

import * as api from '../Fetches/api/api.js';
import { sourcingVertisep1 } from './sourcefind/sourcefind_vertisep.js';
import { sourcingVertisep2 } from './sourceview/sourceview_vertisep.js';
import { createShardingPanel } from './sharding/sharding.js';




let loadSourcing = function(sourceIdToLoad) {
	//console.log('asdf')
	
	//let root = document.getElementById('root');

	let mainContent = document.getElementById('mainContent');
	mainContent.innerHTML = '';
	
	//addSourceListContainer();
	//addSourceViewerContainer();


// 2023-12-14
	mainContent.appendChild(Sourcefind.createSourcefindPanel());
	mainContent.appendChild(sourcingVertisep1());
	mainContent.appendChild(Sourceview.createSourceviewPanel());
	mainContent.appendChild(sourcingVertisep2());
	mainContent.appendChild(createShardingPanel());

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

			//let lastLoadedSourceId;

			if((sourceIdToLoad == '') || (sourceIdToLoad == null)){
				console.log('no sourceid passed. Loading most recent source.');

				sourceIdToLoad = localStorage.getItem("lastLoadedSourceId");
		
			}
			else {
				console.log(sourceIdToLoad);
				
			}
		
			console.log(`Trying to load source id ${sourceIdToLoad}`);
			


			// Make sure the source exists!
			api.getSource(sourceIdToLoad).then((response) => {
	
				if(response.status == 410){
					console.log('Source does not exist.');
				}
				else {
					//history.pushState({}, '', '/sourcing/' + sourceIdToLoad);
					PropertiesCard.loadSource(sourceIdToLoad);
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


}


export {
	loadSourcing
}