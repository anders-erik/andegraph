

function extractCurrentSourceObject(){
	let currentSource = {};

	currentSource.name = document.getElementById('sourceview-name-field').value;
	currentSource.url = document.getElementById('sourceview-url-field').value;
	currentSource.id = document.getElementById('sourceview-id-field').textContent;
	currentSource.date = document.getElementById('sourceview-date-field').textContent;
	
	
	//console.log('extracting source: ' + currentSource.id);
	return currentSource;
}

function extractCurrentSourceId(){
	return document.getElementById('sourceview-id-field').textContent;
}

export {
	extractCurrentSourceObject,
	extractCurrentSourceId
}

