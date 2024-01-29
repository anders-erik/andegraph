
async function getFile(fileName){

	let urlString = `/api/file/${fileName}`;

	try {
		const response = await fetch(urlString, {
			method: 'GET',
			headers: {
			},
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
	getFile
}