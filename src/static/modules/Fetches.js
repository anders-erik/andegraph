

async function newSource() {
	try {
		const response = await fetch('source', {
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

async function fetchAllSources() {
	try {
		const response = await fetch('/sources', {
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

async function getSource(id) {
	try {
		const response = await fetch('source', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'id': id,
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
	newSource,
	fetchAllSources,
	getSource
}


