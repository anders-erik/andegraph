
async function postReviewDate(reviewDateObject) {


	const options = {
		method: 'POST',
		headers: {
		  'User-Agent': 'firefox',
		  'Content-Type':'application/json',
		},
		body: JSON.stringify(reviewDateObject)
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