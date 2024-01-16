

let getTodaysDate = function(){
	let currentTimeDateObject = new Date(Date.now());
	let isoString = currentTimeDateObject.toISOString();
	return isoString.slice(0, 10);
}

export {
	getTodaysDate,
}