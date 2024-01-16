
async function postReviewDate(reviewDateObject) {


	const options = {
		method: 'POST',
		headers: {
		  'User-Agent': 'firefox',
		},
		body: reviewDateObject
	};

	let fetchString = `/api/reviewdate/${reviewDateObject.id}`;

	let promise = fetch(fetchString, options)
		.then(response => response)
		.catch(err => console.error(err));

	return promise;
}


export {
	postReviewDate
}