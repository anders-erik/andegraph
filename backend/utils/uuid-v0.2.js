

let secondsSince17b = Math.floor(Date.now() / 1000) - 1700000000
let prevCallSecondsSince17b = Math.floor(Date.now() / 1000) - 1700000000;

let low14 = 0;
let uuid = 0;


let newUuid = function () {
	// console.log();


	secondsSince17b = Math.floor(Date.now() / 1000) - 1700000000;

	if (secondsSince17b != prevCallSecondsSince17b) {
		low14 = 0;
	}
	prevCallSecondsSince17b = secondsSince17b;


	uuid = secondsSince17b * (2 ** 14);
	uuid += low14;

	low14++;

	// console.log(secondsSince17b)

	// console.log(randomValue4bit)
	// console.log(secondIndex6bit)
	// console.log(tableIndex4bit)
	// console.log(low14.toString(2))

	// console.log(uuid)

	return uuid;
}



module.exports = {
	newUuid,
}

