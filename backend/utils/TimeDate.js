


let currentUnixTime = function () {
	
	let UnixMs = Date.now();
	let UnixS = Math.floor( UnixMs / 1000);

	return UnixS;
}


let currentIsoDate = function () {
	
	let currentTimeDateObject = new Date(Date.now());
	let isoString = currentTimeDateObject.toISOString();
	return isoString.slice(0, 10);
}

let UnixTimeToIsoDate = function (UnixTime) {
	
	let currentTimeDateObject = new Date(UnixTime);
	let isoString = currentTimeDateObject.toISOString();
	return isoString.slice(0, 10);
}


module.exports = {
	currentUnixTime,
	currentIsoDate,
	UnixTimeToIsoDate,
}

