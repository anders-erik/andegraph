
async function getSourceFile(id){
	//console.log('loading file for source ' + id);
	try {
		const response = await fetch('/api/source/file/' + id, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
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
	getSourceFile
}
