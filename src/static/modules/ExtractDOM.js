

function extractCurrentSourceObject(){
	let currentSource = {};

	currentSource.title = document.getElementById('sourceview-title-field').value;
	currentSource.url = document.getElementById('sourceview-url-field').value;
	currentSource.id = document.getElementById('sourceview-id-field').value;
	currentSource.dateCreated = document.getElementById('sourceview-datecreated-field').value;
	currentSource.hasFile = document.getElementById('sourceview-hasfile-field').value;
	currentSource.fileType = document.getElementById('sourceview-filetype-field').value;
	currentSource.fileEnding = document.getElementById('sourceview-fileending-field').value;
	
	
	//console.log('extracting source: ' + currentSource.id);
	return currentSource;
}

function extractCurrentSourceId(){
	return document.getElementById('sourceview-id-field').value;
}

function extractCurrentSourceFileType(){
	return document.getElementById('sourceview-filetype-field').value;
}

export {
	extractCurrentSourceObject,
	extractCurrentSourceId,
	extractCurrentSourceFileType
}

