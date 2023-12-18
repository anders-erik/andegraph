
async function getSourceSearch() {
	try {
		const response = await fetch('/api/source/search' + '?searchall=1&searchstring=', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.ok) {
			const responseData = await response.json();
			console.log('GET request successful:', responseData);
			return responseData;
		} else {
			throw new Error('GET request failed:', response.status);
		}
	} catch (error) {
		console.error('Error making GET request:', error);
	}
}

export {
	getSourceSearch
}
