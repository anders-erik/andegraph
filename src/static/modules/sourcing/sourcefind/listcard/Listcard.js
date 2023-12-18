

function createSourcefindListcard(){
	let sourcefindList = document.createElement('div');
	sourcefindList.id = 'sourcefind-listcard';
	sourcefindList.classList.add('card');
	//sourcefindList.textContent = 'sourcefind-listcard';
	

	return sourcefindList;
}

export {
	createSourcefindListcard
}