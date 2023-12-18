
/**
 * 
 * @param {int} sourceid - ID of the source
 * @param {date} reviewdate 
 * @param {int} alldates 
 * @returns 
 */
async function deleteSourceReviewDate(sourceid, reviewdate, alldates) {

	let urlString = `/api/source/reviewdate?`
		+ `sourceid=${sourceid}&`
		+ `reviewdate=${reviewdate}&`
		+ `alldates=${alldates}`
	;


	const options = { method: 'DELETE', headers: { 'User-Agent': 'firefox' } };

	//console.log(urlString);
	//console.log('/api/source/reviewdate?sourceid=146&reviewdate=2023-12-20&alldates=0');
	
	let response = await fetch(urlString, options)
	
	//let sourceReviewDates = await response.json();

	//return sourceReviewDates;


}

export {
	deleteSourceReviewDate
}



