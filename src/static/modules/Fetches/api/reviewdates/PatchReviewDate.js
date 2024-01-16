/**
 * 
 * @param {int} complete  
 * @returns 
 */
async function patchReviewDate(reviewDateId, complete) {

	let urlString = `/api/reviewdate/${reviewDateId}?`
		+ `complete=${complete}`
	;

	//console.log(urlString);
	//console.log('/api/source/search?today=0&dateinterval=0&searchall=1&fromdate=2023-12-02&todate=2023-12-20&searchstring=');


	try {
		const response = await fetch( urlString , {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.ok) {
			//const responseData = await response.json();
			//console.log('GET request successful:', responseData);
			return response;
		} else {
			throw new Error('GET request failed:', response.status);
		}
	} catch (error) {
		console.error('Error making GET request:', error);
	}

}

export {
	patchReviewDate
}
