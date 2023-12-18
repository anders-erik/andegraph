
export async function patchSource(sourceObject) {
	//console.log(sourceObject);
	try {
		const response = await fetch('/api/source', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: sourceObject,
		});

		if (response.ok) {
			const responseData = await response.json();
			console.log('PATCH request successful:', responseData);
			return responseData;
		} else {
			throw new Error('PATCH request failed:', response.status);
		}
	} catch (error) {
		console.error('Error making PATCH request:', error);
	}
}

