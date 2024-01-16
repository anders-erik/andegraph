
function extractCurrentSourceObject(){
	let currentSource = {};

	currentSource.title = document.getElementById('sourceview-title-field').value;
	currentSource.url = document.getElementById('sourceview-url-field').value;
	currentSource.id = document.getElementById('sourceview-id-field').value;
	currentSource.dateCreated = document.getElementById('sourceview-datecreated-field').value;
	currentSource.fileName = document.getElementById('sourceview-filename-field').value;
	currentSource.fileExtension = document.getElementById('sourceview-fileextension-field').value;
	currentSource.elementType = document.getElementById('sourceview-elementtype-field').value;
	currentSource.textContent = document.getElementById('sourceview-textcontent-field').value;
	currentSource.nodeType = document.getElementById('sourceview-nodetype-field').value;
	currentSource.nodeTypeType = document.getElementById('sourceview-nodetypetype-field').value;
	
	//console.log('extracting source: ' + currentSource.id);
	return [currentSource];
}

function extractCurrentSourceId(){
	return document.getElementById('sourceview-id-field').value;
}

function extractCurrentSourceFileName(){
	return document.getElementById('sourceview-filename-field').value;
}

function extractCurrentSourceFileType(){
	return document.getElementById('sourceview-elementtype-field').value;
}

function hasFile(){
	let hasfile = document.getElementById('sourceview-filename-field').value;
	return ( hasfile == '' ) ? false : true;
}


export {
	extractCurrentSourceObject,
	extractCurrentSourceId,
	extractCurrentSourceFileName,
	extractCurrentSourceFileType,
	hasFile
}