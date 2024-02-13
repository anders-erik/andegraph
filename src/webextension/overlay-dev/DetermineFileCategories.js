


let extensionObject = {
	// https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
	image: ['apng', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp'],
	// https://www.canto.com/blog/audio-file-types/
	audio: ['m4a', 'flac', 'mp3', 'wav', 'wma', 'aac'],
	// https://www.adobe.com/creativecloud/video/discover/best-video-format.html
	video: ['mp4', 'mov', 'wmv', 'avi', 'AVCHD', 'flv', 'f4v', 'swf', 'mkv', 'webm', 'mpg'],
	pdf: ['pdf'],
	data: ['json', 'csv', 'tsv'],
	// Textarea extension
	text: ['txt', 'md'],
	code: ['js', 'ts', 'css', 'html', 'cs'],
}



function determineFileCategories(selectedFile) {

	let fileCategories = {
		mimeType: selectedFile.type,
		fileExtension: 'extext',
		fileType: 'typetype'
	}



	fileCategories.fileExtension = determineFileExtension(selectedFile);

	// fileCategories.fileType = determineFileType(fileCategories.mimeType, fileCategories.fileEnding);

	// fileCategories.fileType = Object.entries(extensionObject).forEach(typeArray => typeArray.filter(extension => extension === fileCategories.fileExtension))
	fileCategories.fileType = Object.keys(extensionObject).find(type => extensionObject[type].includes(fileCategories.fileExtension));
	// console.log(fileCategories.fileType)
	//console.log('file type determined here!');

	return fileCategories;
}




function determineFileExtension(selectedFile) {

	return selectedFile.name.match(/\w+$/g)[0];

}











function determineFileType(mimeType, fileExtension) {

	let fileType = '';




	// TEXTAREA
	let textarea = text.concat(code);
	//console.log(textarea);
	textarea.forEach(textareaEnding => {

		if (fileExtension == textareaEnding) {
			//console.log('MATCH : ' + textareaEnding);

			fileType = 'text';
		}

	});
	if (fileType !== '') {
		return fileType;
	}



	// PDF
	pdf.forEach(pdfEnding => {

		if (fileExtension == pdfEnding) {
			//console.log('MATCH : ' + pdfEnding);

			fileType = 'embed';
		}

	});
	if (fileType !== '') {
		return fileType;
	}



	// IMAGE
	image.forEach(imageEnding => {

		if (fileExtension == imageEnding) {
			//console.log('MATCH : ' + imageEnding);

			fileType = 'image';
		}

	});
	if (fileType !== '') {
		return fileType;
	}



	// VIDEO
	video.forEach(videoEnding => {

		if (fileExtension == videoEnding) {
			//console.log('MATCH : ' + videoEnding);

			fileType = 'video';
		}

	});
	if (fileType !== '') {
		return fileType;
	}




	// AUDIO
	audio.forEach(audioEnding => {

		if (fileExtension == audioEnding) {
			//console.log('MATCH : ' + audioEnding);

			fileType = 'audio';
		}

	});
	if (fileType !== '') {
		return fileType;
	}




	// DATA
	data.forEach(dataEnding => {

		if (fileExtension == dataEnding) {
			//console.log('MATCH : ' + dataEnding);

			fileType = 'table';
		}

	});
	if (fileType !== '') {
		return fileType;
	}



}




