
async function postSource() {
	try {
		const response = await fetch('/api/source', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			}
		});

		if (response.ok) {
			const responseData = await response.json();
			console.log('POST request successful:', responseData);
			return responseData;
		} else {
			throw new Error('POST request failed:', response.status);
		}
	} catch (error) {
		console.error('Error making POST request:', error);
	}
}
export {
	postSource
}
