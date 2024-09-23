
// ELEMENTS

let overlayContainer;
let overlayElement;
let overlayRightPanel;
let projectContainer;
let sourceContainer;
let clipboardContainer;





let extensionStateFront = {

	active: false,

	current_projectObject: {},
	current_projectSearchObjects: [],
	current_projectChildContentEdges: [],

	current_sourceObject: {},
	current_sourceChildContentEdges: [],

	projectSearchActive: false,
	projectSearchString: '',

	textConcatenationCapturing: false,
	textConcatenationContent: '',

}



function initExtension() {

	console.log("initExtension()")


	initProject();
	initSource();
	initClipboard();



}







function addExtensionActiveEventListener() {

	document.addEventListener('copy', copyEvent)
	document.addEventListener('cut', cutEvent)
	document.addEventListener('paste', pasteEvent)
	document.addEventListener('keydown', keydownActiveExtension)

	console.log('event listerners for active extension added')

}




function removeExtensionActiveEventListener() {

	document.removeEventListener('copy', copyEvent)
	document.removeEventListener('cut', cutEvent)
	document.removeEventListener('paste', pasteEvent)
	document.removeEventListener('keydown', keydownActiveExtension)

	console.log('event listerners for active extension removed')

}



