
export {
	newGlobalNodeContext,
}

let globalNodeContext;
let contextContents;
let firstShiftActive = false;
let contextNodeElement;
let contextNodeId = 0;
let contextNodeObject;

function newGlobalNodeContext(){
	
	globalNodeContext = document.createElement('div');
	globalNodeContext.id = 'global-node-context';
	//globalNodeContext.tabIndex = 0;
	
	contextContents = document.createElement('div');
	contextContents.id = 'context-contents';
	contextContents.tabIndex = 0;
	
	globalNodeContext.append(contextContents);
	
	window.addEventListener('keydown', keyListenerGlobalNodeContext)
	// window.addEventListener('keydown', (event) => {
	// 	console.log(event.key)
	// 	console.log('asdfasdf')
	// })

	return globalNodeContext;
}


function keyListenerGlobalNodeContext(event){
	// console.log(event.key)
	// console.log('asdfasdf')
	if(event.key == 'Shift'){
		if(!firstShiftActive){

			firstShiftActive = true;

			setTimeout(() => {
				firstShiftActive = false;
			}, 300);
		}
		else{
			console.log('shift shift!')
			let activeElement = document.activeElement;
			if(activeElement.dataset.nodeId){
				
				globalNodeContext.style.display = 'flex';
				// globalNodeContext.textContent = activeElement.dataset.nodeId;
				// globalNodeContext.focus();
				contextContents.contextContents = activeElement.dataset.nodeId;
				contextContents.focus();

				contextNodeId = activeElement.dataset.nodeId;
				contextNodeElement = activeElement;
				contextNodeObject = activeElement.shard;
			}
		}
	}
	else if(event.key == 'Escape'){
		globalNodeContext.style.display = 'none';
		document.getElementById('shardcard')
		contextNodeElement.focus();
	}
}




