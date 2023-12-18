/**
 * 
 * @param {int} sourceid - ID of the source
 * @param {date} reviewdate 
 * @param {int} complete 
 * @returns 
 */
async function patchSourceReviewDate(sourceid, reviewdate, complete) {

	let urlString = `/api/source/reviewdate?`
		+ `sourceid=${sourceid}&`
		+ `reviewdate=${reviewdate}&`
		+ `complete=${complete}`
	;


	const options = { method: 'PATCH', headers: { 'User-Agent': 'firefox' } };

	//console.log(urlString);
	//console.log('/api/source/reviewdate?sourceid=117&reviewdate=2023-12-17&complete=1');
	
	let response = await fetch(urlString, options)
	
	//let sourceReviewDates = await response.json();

	//return sourceReviewDates;


}

export {
	patchSourceReviewDate
}

