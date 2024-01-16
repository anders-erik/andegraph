async function deleteNode(nodeId) {
	try {
		const response = await fetch(`/api/node/${nodeId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return response;

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
	deleteNode
}
