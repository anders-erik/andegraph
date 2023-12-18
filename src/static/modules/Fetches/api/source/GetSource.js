

async function getSource(id) {
	try {
		const response = await fetch('/api/source?' + `sourceid=${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.ok) {
			const responseData = await response.json();
			console.log('GET request successful:', responseData[0]);
			return responseData[0];
		} else {
			throw new Error('GET request failed:', response.status);
		}
	} catch (error) {
		console.error('Error making GET request:', error);
	}
}


export {
	getSource
}
