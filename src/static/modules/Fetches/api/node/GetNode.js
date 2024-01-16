


async function getNode(nodeId){

	let urlString = `/api/node/${nodeId}`;

	try {
		const response = await fetch(urlString, {
			method: 'GET',
			headers: {
			},
		});

		if (response.ok) {
			
			return await response.json();
		} else {
			throw new Error('GET request failed:', response.status);
		}
	} catch (error) {
		console.error('Error making GET request:', error);
	}


}

export {
	getNode
}
