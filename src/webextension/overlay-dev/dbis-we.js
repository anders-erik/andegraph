
// console.log('dbis-we')



// function fetchData(url) {
// 	return fetch(url)
// 		.then(response => {
// 			if (!response.ok) {
// 				throw new Error('Network response was not ok');
// 			}
// 			return response.json();
// 		})
// 		.catch(error => {
// 			console.error('There was a problem with the fetch operation:', error);
// 		});
// }



const baseUrl = 'http://localhost:3000';
const basePath = '/api/v02'


class dbisWe {

	// static async Content_SelectChildOfUuid(Uuid) { return contentGet('Content-SelectChildOfUuid', {'Uuid': Uuid}) };

	static async Node_SelectChildOfUuid(Uuid) { return nodeGet('Node-SelectChildOfUuid', { 'Uuid': Uuid }) };
	static async NodeEdge_SelectChildOfUuid(Uuid) { return nodeGet('NodeEdge-SelectChildOfUuid', { 'Uuid': Uuid }) };
	// static async NodeEdge_SelectChildOfUuid(Uuid) { return contentGet('NodeEdge-SelectChildOfUuid', {'Uuid': Uuid}) };

	static async Project_SelectLikeString(searchString) { return await contentGet('Project-SelectLikeString', { 'searchString': searchString }) };



	static async Content_SelectOnUuid(Uuid) { return await contentGet('Content-SelectOnUuid', { 'Uuid': Uuid }) };


	static async Content_UpdateOnContentObject(contentObject) { return await contentPut('Content-UpdateOnContentObject', contentObject) };

	static async Content_InsertOnTable(table) { return contentPost('Content-InsertOnTable', { 'Table': table }) };

	static async Content_InsertChildUuidTable(Uuid, childTable) { return contentPost('Content-InsertChildUuidTable', { 'Uuid': Uuid, 'Table': childTable }) };
}



async function contentGet(functionstring, paramObject) {
	let url = baseUrl + basePath + `/content/${functionstring}?`;

	for (const [key, value] of Object.entries(paramObject)) {
		// console.log(`${key}: ${value}`);
		url += `${key}=${value}`;
	}

	// console.log(url)

	const options = { method: 'GET', body: undefined };
	// console.log(url)
	try {
		const response = await fetch(url, options);
		const data = await response.json();
		console.log(response.status, url)
		// console.log(url)
		// console.log(data)
		return data;
		// console.table(data);
	} catch (error) {
		console.error(error);
	}


}

async function nodeGet(functionstring, paramObject) {
	let url = baseUrl + basePath + `/node/${functionstring}?`;

	for (const [key, value] of Object.entries(paramObject)) {
		// console.log(`${key}: ${value}`);
		url += `${key}=${value}`;
	}

	// console.log(url)

	const options = { method: 'GET', body: undefined };
	// console.log(url)
	try {
		const response = await fetch(url, options);
		const data = await response.json();
		console.log(response.status, url)
		// console.log(data)
		return data;
		// console.table(data);
	} catch (error) {
		console.error(error);
	}


}

async function contentPost(functionstring, paramObject) {

	let url = baseUrl + basePath + `/content/${functionstring}`;
	// console.log(url)

	let bodyArray = [];

	for (const [key, value] of Object.entries(paramObject)) {
		// console.log(`${key}: ${value}`);
		// url += `${key}=${value}`;
		bodyArray.push(value);
	}

	const options = {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(bodyArray),
	};
	// console.log(options)

	try {
		const response = await fetch(url, options);
		const data = await response.json();
		console.log(response.status, url)
		if (response.status == 200) {
			return data;
		}
		else {
			throw new Error('FAILED PUT FROM: contentPut in dbis-we')
		}
		// console.table(data);
	} catch (error) {
		console.error(error);
	}


}

async function contentPut(functionstring, putObject) {
	let url = baseUrl + basePath + `/content/${functionstring}`;
	// console.log(url)

	const options = {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify([putObject]),
	};
	// console.log(options)
	try {
		const response = await fetch(url, options);
		// const data = await response.json();
		console.log(response.status, url)
		if (response.status == 200) {
			return;
		}
		else {
			throw new Error('FAILED PUT FROM: contentPut in dbis-we')
		}
		// console.table(data);
	} catch (error) {
		console.error(error);
	}


}

// dbisWe.Project_SelectLikeString('')
// 	.then((data) => {
// 		// console.log(data)
// 	})
