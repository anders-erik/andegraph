
async function getNode(nodeId){

	let urlString = `/api/node/${nodeId}`;

	try {
		const response = await fetch(urlString, {
			method: 'GET',
			headers: {
			},
		});

		if (response.ok) {
			
			return (await response.json())[0];
		}
		else if(response.status == 404) {
			return response;
		}
		else {
			return new Error('GET request failed:', response.status);
		}
	} catch (error) {
		console.error('Error making GET request:', error);
	}


}

export {
	getNode
}
