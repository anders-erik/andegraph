


let apiBaseUrl = 'http://andegraph.com:3000/';
let basePath = 'api/v02/';

class LeftPanelModel {

	projectUuid = 0;
	projectContentObject = {};
	projectNodeEdges = [];
	searchNodes = [];

	constructor() {
		console.log('new left panel model')
	}


	async updateModelOnNewProjectUuid(newUuid) {
		this.projectUuid = newUuid;
		this.projectContentObject = await Content_SelectOnUuid(this.projectUuid)
		this.projectNodeEdges = await NodeEdge_SelectChildOfUuid(this.projectUuid);
	}

}





async function Content_SelectOnUuid(projectUuid) {

	let functionstring = 'Content-SelectOnUuid';


	let url = apiBaseUrl + basePath + `content/${functionstring}?Uuid=${projectUuid}`;


	const options = { method: 'GET', body: undefined };
	// console.log(url)

	try {
		const response = await fetch(url, options);
		const data = await response.json();
		console.log(response.status, url)
		return data;
		// console.table(data);
	} catch (error) {
		console.log(response.status, url)
		console.error(error);
	}


}


async function NodeEdge_SelectChildOfUuid(projectUuid) {

	let functionstring = 'NodeEdge-SelectChildOfUuid';

	let url = apiBaseUrl + basePath + `node/${functionstring}?Uuid=${projectUuid}`;

	const options = { method: 'GET', body: undefined };
	// console.log(url)

	try {
		const response = await fetch(url, options);
		const data = await response.json();
		console.log(response.status, url)
		// console.log( data)
		return data;
		// console.table(data);
	} catch (error) {
		console.log(response.status, url)
		console.error(error);
	}

}


export {
	LeftPanelModel,
}