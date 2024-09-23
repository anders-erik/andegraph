

let determineClipboardContentType = function(eventClipboardData){

	if(typeof eventClipboardData.files[0] !== 'undefined'){
		// postFile(dataClipboardEvent.files[0], sourceid, shardid);
		return 'file';
	}
	else if((eventClipboardData || window.clipboardData).getData("text") !== ''){
		//console.log((event.clipboardData || window.clipboardData).getData("text"));

		let clipboardText = (eventClipboardData || window.clipboardData).getData("text");
		let blob = new Blob([clipboardText], { type: 'text/plain' });
		 let file = new File([blob], "clipboard.txt", {type: "text/plain"});

		//postFile(file, sourceid, shardid);
		return 'text';
	}
	else {
		console.log('No file nor text detected.');
		return 'empty';
	}

	//return 'clipboardContentType';
}

export {
	determineClipboardContentType,
}
