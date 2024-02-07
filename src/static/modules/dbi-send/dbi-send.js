

const basePath = '/api/v02/content'

export class dbis {

	static async Content_SelectChildOfUuid(Uuid) { return contentGet('Content-SelectChildOfUuid', {'Uuid': Uuid}) };
	static async Node_SelectChildOfUuid(Uuid) { return contentGet('Node-SelectChildOfUuid', {'Uuid': Uuid}) };
	static async NodeEdge_SelectChildOfUuid(Uuid) { return contentGet('NodeEdge-SelectChildOfUuid', {'Uuid': Uuid}) };

}



async function contentGet(functionstring, paramObject){
	let url = basePath + `/${functionstring}?`;

	for (const [key, value] of Object.entries(paramObject)) {
		console.log(`${key}: ${value}`);
		url += `${key}=${value}`;
	  }

	// console.log(url)

	const options = {method: 'GET', body: undefined};

	try {
		const response = await fetch(url, options);
		const data = await response.json();
		return data;
		// console.table(data);
	} catch (error) {
		console.error(error);
	}


}

