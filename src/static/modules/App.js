import { addSourceListContainer, addSourceViewerContainer } from './Containers.js';

function App(){

	let root = document.getElementById('root');
	root.style.display = 'flex';
	root.style.flexDirection = 'row';
	root.style.backgroundColor = 'red';
	

	addSourceListContainer();
	
	addSourceViewerContainer();

}


export {
	App
}
