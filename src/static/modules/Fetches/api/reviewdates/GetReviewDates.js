


async function getReviewDates(nodeId){

	let urlString = `/api/reviewdates/${nodeId}`;

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
	getReviewDates
}
