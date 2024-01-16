/**
 * 
 * @param {int} parents 
 * @param {int} children 
 * @returns 
 */
async function getNodeAdjacent(nodeId, parents, children) {

	let urlString = `/api/node/adjacent/${nodeId}?`
		+ `parents=${parents}&`
		+ `children=${children}`
	;

	//console.log(urlString);
	//console.log('/api/source/search?today=0&dateinterval=0&searchall=1&fromdate=2023-12-02&todate=2023-12-20&searchstring=');


	try {
		const response = await fetch( urlString , {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.ok) {
			const responseData = await response.json();
			//console.log('GET request successful:', responseData);
			return responseData;
		} else {
			throw new Error('GET request failed:', response.status);
		}
	} catch (error) {
		console.error('Error making GET request:', error);
	}

}

export {
	getNodeAdjacent
}
