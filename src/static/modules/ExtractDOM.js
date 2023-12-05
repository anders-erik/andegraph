

function extractCurrentSourceObject(){
	let currentSource = {};

	currentSource.name = document.getElementById('sourceview-name-field').value;
	currentSource.url = document.getElementById('sourceview-url-field').value;
	currentSource.id = document.getElementById('sourceview-id-field').value;
	currentSource.date = document.getElementById('sourceview-date-field').value;
	
	
	//console.log('extracting source: ' + currentSource.id);
	return currentSource;
}

function extractCurrentSourceId(){
	return document.getElementById('sourceview-id-field').value;
}

export {
	extractCurrentSourceObject,
	extractCurrentSourceId
}

