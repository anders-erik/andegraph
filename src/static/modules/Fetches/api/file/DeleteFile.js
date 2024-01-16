
async function deleteFile(fileName){

	let urlString = `/api/file/${fileName}`;

	try {
		const response = await fetch(urlString, {
			method: 'DELETE',
			headers: {
			},
		});

		if (response.ok) {
			
			return response;
		} else {
			throw new Error('GET request failed:', response.status);
		}
	} catch (error) {
		console.error('Error making GET request:', error);
	}


}

export {
	deleteFile
}
