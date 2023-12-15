

function getSourceviewViewcard(){
	let sourceviewViewcard = document.createElement('div');
	sourceviewViewcard.id = 'sourceview-viewcard';
	sourceviewViewcard.classList.add('card');

	return sourceviewViewcard;
}


export {
	getSourceviewViewcard
}