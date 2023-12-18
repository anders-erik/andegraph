
async function getSourceReviewDates(sourceid) {

	const options = { method: 'GET', headers: { 'User-Agent': 'firefox' } };

	// https://developer.mozilla.org/en-US/docs/Web/API/Response

	let response = await fetch('/api/source/reviewdate?sourceid=' + sourceid, options)
	
	let sourceReviewDates = await response.json();

	return sourceReviewDates;


}

export {
	getSourceReviewDates
}