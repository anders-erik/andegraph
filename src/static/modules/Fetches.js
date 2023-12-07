


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

async function loadSourceFile(id){
	console.log('loading file for source ' + id);
	try {
		const response = await fetch('/sourcefile/' + id, {
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

async function uploadSourceFile(id, file){
	console.log('uplading');
	console.log(id + '  ' + file);
	console.log(file.type);
	try {
		const response = await fetch('/sourcefile/' + id, {
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


async function updateSource(sourceObject) {
	try {
		const response = await fetch('source', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: sourceObject,
		});

		if (response.ok) {
			const responseData = await response.json();
			console.log('PUT request successful:', responseData);
			return responseData;
		} else {
			throw new Error('PUT request failed:', response.status);
		}
	} catch (error) {
		console.error('Error making PUT request:', error);
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

async function deleteSource(id) {
	try {
		const response = await fetch('source/' + id, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		/*
		if (response.ok) {
			const responseData = await response.json();
			console.log('DELETE request successful:', responseData);
			return responseData;
		} else {
			throw new Error('DELETE request failed:', response.status);
		}
		*/
	} catch (error) {
		console.error('Error making DELETE request:', error);
	}
}


export {
	newSource,
	loadSourceFile,
	uploadSourceFile,
	fetchAllSources,
	getSource,
	updateSource,
	deleteSource
}


