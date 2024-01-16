


async function getReviewDate(reviewDateId){

	let urlString = `/api/reviewdate/${reviewDateId}`;

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
	getReviewDate
}
