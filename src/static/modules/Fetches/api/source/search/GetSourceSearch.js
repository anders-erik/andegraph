/**
 * 
 * @param {object} searchParameters {
 * 			today: 0,
			dateinterval: 0,
			searchall: 1,
			startdate: '2023-11-12',
			enddate: '2023-12-19',
			searchString: '',
			asc: 0,
			review: 0,
 * 		}
 * @returns 
 */
async function getSourceSearch(searchParameters) {

	let urlString = `/api/source/search?`
		+ `today=${searchParameters.today}&`
		+ `dateinterval=${searchParameters.dateinterval}&`
		+ `searchall=${searchParameters.searchall}&`
		+ `fromdate=${searchParameters.fromdate}&`
		+ `todate=${searchParameters.todate}&`
		+ `searchstring=${searchParameters.searchstring}&`
		+ `asc=${searchParameters.asc}&`
		+ `review=${searchParameters.review}`
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
	getSourceSearch
}
