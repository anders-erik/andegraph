


async function BasePost(_path, _parameters, _headers, _body) {
	try {
		const response = await fetch(
			_path  + '?' + new URLSearchParams(_parameters), 
			{
				method: 'POST',
				headers: _headers,
				body: _body
			}
		);

		// Response is 2XX		 (https://developer.mozilla.org/en-US/docs/Web/API/Response/ok)
		if (response.ok) {
			const responseData = await response.json();
			console.log(`${POST} request successful:`, responseData);
			return responseData;
		} else {
			throw new Error(`${POST} request failed:`, response.status);
		}

	} catch (error) {
		console.error(`Error making ${POST} request:`, error);
	}
}

async function BasePut(_path, _parameters, _headers, _body) {
	try {
		const response = await fetch(
			_path  + '?' + new URLSearchParams(_parameters), 
			{
				method: 'PUT',
				headers: _headers,
				body: _body
			}
		);

		// Response is 2XX		 (https://developer.mozilla.org/en-US/docs/Web/API/Response/ok)
		if (response.ok) {
			const responseData = await response.json();
			console.log(`${POST} request successful:`, responseData);
			return responseData;
		} else {
			throw new Error(`${POST} request failed:`, response.status);
		}

	} catch (error) {
		console.error(`Error making ${POST} request:`, error);
	}
}



// MIDDLEWARE IN PLACE
async function newSource() {
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

// MIDDLEWARE IN PLACE
async function loadSourceFile(id){
	console.log('loading file for source ' + id);
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

// MIDDLEWARE IN PLACE
async function uploadSourceFile(id, file){
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

// MIDDLEWARE IN PLACE
async function updateSource(sourceObject) {
	try {
		const response = await fetch('/api/source', {
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

// MIDDLEWARE IN PLACE
async function fetchAllSources() {
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

// MIDDLEWARE IN PLACE
async function getSource(id) {
	try {
		const response = await fetch('/api/source', {
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


// MIDDLEWARE IN PLACE
async function deleteSource(id) {
	try {
		const response = await fetch('/api/source/' + id, {
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
	BasePost,
	BasePut,

	newSource,
	loadSourceFile,
	uploadSourceFile,
	fetchAllSources,
	getSource,
	updateSource,
	deleteSource
}


