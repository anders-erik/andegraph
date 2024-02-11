
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

	static async Node_SelectChildOfUuid(Uuid) { return contentGet('Node-SelectChildOfUuid', { 'Uuid': Uuid }) };
	// static async NodeEdge_SelectChildOfUuid(Uuid) { return contentGet('NodeEdge-SelectChildOfUuid', {'Uuid': Uuid}) };

	static async Project_SelectLikeString(searchString) { return await contentGet('Project-SelectLikeString', { 'searchString': searchString }) };

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
		return data;
		// console.table(data);
	} catch (error) {
		console.error(error);
	}


}

dbisWe.Project_SelectLikeString('')
	.then((data) => {
		// console.log(data)
	})
