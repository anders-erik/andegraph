

// https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
let imageEndings = [ 'apng', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp' ];
// https://www.canto.com/blog/audio-file-types/
let audioEndings = [ 'm4a', 'flac', 'mp3', 'wav', 'wma', 'aac' ];
// https://www.adobe.com/creativecloud/video/discover/best-video-format.html
let videoEndings = [ 'mp4', 'mov', 'wmv', 'avi', 'AVCHD', 'flv', 'f4v', 'swf', 'mkv', 'webm', 'mpg' ];
let pdfEndings = [ 'pdf' ];
// data
let dataEndings = [ 'json', 'csv', 'tsv' ]
// Textarea endings
let textEndings = ['txt', 'md'];
let codeEndings = [ 'js', 'ts', 'css', 'html', 'cs' ];


function determineFileCategories(selectedFile){

	let fileCategories = {
		mimeType: selectedFile.type,
		fileEnding: 'endend',
		fileType: 'typetype'
	}


	fileCategories.fileEnding = determineFileEnding(selectedFile);

	fileCategories.fileType = determineFileType(fileCategories.mimeType, fileCategories.fileEnding);

	

	//console.log('file type determined here!');

	return fileCategories;
}




function determineFileEnding(selectedFile){

	return selectedFile.name.match(/\w+$/g)[0];

}




function determineFileType(mimeType, fileEnding){

	let fileType = '';




	// TEXTAREA
	let textareaEndings = textEndings.concat(codeEndings);
	//console.log(textareaEndings);
	textareaEndings.forEach(textareaEnding => {
		
		if(fileEnding == textareaEnding){
			//console.log('MATCH : ' + textareaEnding);

			fileType = 'text';
		}
			
	});
	if(fileType !== ''){
		return fileType;
	}



	// PDF
	pdfEndings.forEach(pdfEnding => {
		
		if(fileEnding == pdfEnding){
			//console.log('MATCH : ' + pdfEnding);

			fileType = 'embed';
		}
			
	});
	if(fileType !== ''){
		return fileType;
	}


	
	// IMAGE
	imageEndings.forEach(imageEnding => {
		
		if(fileEnding == imageEnding){
			//console.log('MATCH : ' + imageEnding);

			fileType = 'image';
		}
			
	});
	if(fileType !== ''){
		return fileType;
	}



	// VIDEO
	videoEndings.forEach(videoEnding => {

		if(fileEnding == videoEnding){
			//console.log('MATCH : ' + videoEnding);

			fileType = 'video';
		}
			
	});
	if(fileType !== ''){
		return fileType;
	}




	// AUDIO
	audioEndings.forEach(audioEnding => {

		if(fileEnding == audioEnding){
			//console.log('MATCH : ' + audioEnding);

			fileType = 'audio';
		}
			
	});
	if(fileType !== ''){
		return fileType;
	}




	// DATA
	dataEndings.forEach(dataEnding => {

		if(fileEnding == dataEnding){
			//console.log('MATCH : ' + dataEnding);

			fileType = 'table';
		}
			
	});
	if(fileType !== ''){
		return fileType;
	}
	
	

}






export {
	determineFileCategories
}
