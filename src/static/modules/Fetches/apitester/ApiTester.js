
import * as api from '../api/api.js';

let testTextFile = async function(){
	console.log('testing api')


	// FILE
	let fileName = '9999.txt'

	let postFileResponse = await api.postFile(createTextFile('POST POST POST', fileName), fileName);
	console.log(postFileResponse)

	let getFileBlob = await api.getFile(fileName);
	printBlobInfo(getFileBlob);

	let putFileResponse = await api.putFile(createTextFile('PUT PUT PUT', fileName), fileName);
	console.log(putFileResponse)

	getFileBlob = await api.getFile(fileName);
	printBlobInfo(getFileBlob);

	let deleteFileResponse = await api.deleteFile(fileName);
	console.log(deleteFileResponse)


	console.log();
}

function createTextFile(content, fileName) {
	//let content = 'POST POST POST';

	let blob = new Blob([content], { type: 'text/plain' });

	let file = new File([blob], fileName, { type: 'text/plain' });

	return file;
}



async function printBlobInfo(blob){
	console.log(blob);
	let slicedBlob = blob.slice(0, 100);
	let fileText = await blob.text();
	console.log('blob text: ')
	console.log(fileText)
}

export {
	testTextFile
}
