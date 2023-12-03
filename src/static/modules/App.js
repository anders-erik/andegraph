//import { addSourceListContainer, addSourceViewerContainer } from './Containers.js';
import { createSourcefindPanel, createSourceviewPanel,createVerticalSerperationPanel, createShardlistPanel } from './Panels.js';

// DEV IMPORT
import { fetchSourcesClicked } from './DOMEvents.js';


function App(){

	let root = document.getElementById('root');
	

	//addSourceListContainer();
	//addSourceViewerContainer();

// 2023-12-03
	root.appendChild(createSourcefindPanel());
	root.appendChild(createVerticalSerperationPanel(1));
	root.appendChild(createSourceviewPanel());
	root.appendChild(createVerticalSerperationPanel(1));
	root.appendChild(createShardlistPanel());

	fetchSourcesClicked();
}


export {
	App
}
