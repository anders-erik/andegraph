

let indexNamesArray = ['nodes', 'edges', 'reviewDates', 'file'];
let indexArray = [0, 0, 0, 0];

let secondsSince17b = Math.floor(Date.now() / 1000) - 1700000000
let prevSecondsSince17b = Math.floor(Date.now() / 1000) - 1700000000;

let randomValue4bit = 0;
let tableIndex4bit = 0;
let secondIndex6bit = 0;
let low14 = 0;
let uuid = 0;

// 
// [secondsSInce1.7b (33bit), randomValue4bit, secondIndex6bit, tableIndex4bit]
let uuidArray = [0, 0, 0, 0];

let generate = function (tableName) {
	// console.log();

	secondsSince17b = Math.floor(Date.now() / 1000) - 1700000000;

	if(secondsSince17b != prevSecondsSince17b){
		indexArray.fill(0);
	}
	prevSecondsSince17b = secondsSince17b;


	randomValue4bit,tableIndex4bit, secondIndex6bit, low14, uuid = 0;

	randomValue4bit = Math.floor(Math.random() * 0b10000);
	tableIndex4bit = indexNamesArray.indexOf(tableName);
	secondIndex6bit = indexArray[tableIndex4bit];
	indexArray[tableIndex4bit]++;

	low14 = randomValue4bit * (2 ** 6);
	low14 += secondIndex6bit;
	low14 = low14 * (2 ** 4);
	low14 += tableIndex4bit;

	uuid = secondsSince17b * (2 ** 14);
	uuid += low14;

	// console.log(secondsSince17b)

	// console.log(randomValue4bit)
	// console.log(secondIndex6bit)
	// console.log(tableIndex4bit)
	// console.log(low14.toString(2))

	// console.log(uuid)

	return uuid;
}


let extractUnixTime = function (uuid) {

	let  uuidBI = BigInt(uuid);
	uuidBI = uuidBI >> BigInt(14);

	let unixTimeCreated = Number(uuidBI) + 1700000000;
	
	//console.log(Number(uuidBI));
	//console.log(unixTimeCreated);
	//console.log(Math.floor( Date.now() / 1000 ))


	return unixTimeCreated;

}


let extractObjectType = function (uuid) {

	let objectIndex = uuid & 0b1111;

	
	//console.log(objectIndex);
	//console.log(indexNamesArray[objectIndex]);


	return indexNamesArray[objectIndex];

}


module.exports = {
	generate,
	extractUnixTime,
	extractObjectType
}

