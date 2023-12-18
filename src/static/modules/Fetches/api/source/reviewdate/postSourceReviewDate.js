/**
 * 
 * @param {int} sourceid - ID of the source
 * @param {date} reviewdate 
 * @param {int} setschedule 
 * @param {string} schedule 
 * @param {int} offset 
 * @returns 
 */
async function postSourceReviewDates(sourceid, reviewdate, setschedule, schedule, offset) {

	let urlString = `/api/source/reviewdate?`
		+ `sourceid=${sourceid}&`
		+ `reviewdate=${reviewdate}&`
		+ `setschedule=${setschedule}&`
		+ `schedule=${schedule}&`
		+ `offset=${offset}`
	;


	const options = { method: 'POST', headers: { 'User-Agent': 'firefox' } };

	//console.log(urlString);
	//console.log('/api/source/reviewdate?sourceid=1&reviewdate=2023-12-18&setschedule=1&schedule=default&offset=0');
	
	let response = await fetch(urlString, options)
	
	//let sourceReviewDates = await response.json();

	//return sourceReviewDates;


}

export {
	postSourceReviewDates
}