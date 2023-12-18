
async function postSourceFile(id, file){
	console.log('uplading');
	console.log(id + '  ' + file);
	console.log(file.type);
	try {
		const response = await fetch('/api/source/file/' + id, {
			method: 'POST',
			headers: {
				'Content-Type': file.type,
			},
			body: file,
		});

		if (response.ok) {
			
			return response.blob();
		} else {
			throw new Error('GET request failed:', response.status);
		}
	} catch (error) {
		console.error('Error making GET request:', error);
	}
}

export {
	postSourceFile
}
