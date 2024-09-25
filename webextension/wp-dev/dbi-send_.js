

// const apiBaseUrl = 'http://localhost:3000';
// const basePath = '/api/v02'
let age_apiUrl = 'http://localhost:3000/api/v02';


browser.runtime.onMessage.addListener((request) => {
	// console.log("Message from the background script:");

	if (request.name === "setApiBase") {

		age_apiUrl = request.apiBaseString;
		return Promise.resolve({ response: "Api updated in content script. [dbi-send.js]", newApiString: age_apiUrl });

	}


	if (request.name === "getApiBase") {

		// age_apiUrl = request.apiBaseString;
		return Promise.resolve({ apiString: age_apiUrl });

	}
	

	// console.log(request.greeting);
	
});



class age_dbis {





	/* 
			CONTENT
	 */

	static async Content_InsertOnTable(TableName) {
		const url = age_apiUrl + `/content/Content-InsertOnTable?Table=${TableName}`;
		const options = {
			method: 'POST'
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async Content_SelectOnUuid(Uuid) {
		let url = age_apiUrl + `/content/Content-SelectOnUuid?Uuid=${Uuid}`;
		const options = {
			method: 'GET',
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async Content_UpdateWithContentObject(contentObject) {
		let url = age_apiUrl + `/content/Content-UpdateWithContentObject`;
		const options = {
			method: 'PUT',
			headers: { "Content-Type": "application/json", },
			body: JSON.stringify(contentObject),
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async Content_DropFullOnUuid(Uuid) {
		let url = age_apiUrl + `/content/Content-DropFullOnUuid?Uuid=${Uuid}`;
		const options = {
			method: 'DELETE',
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async Content_SelectOnTitleLikeString(searchString, tableLimit, includeTable, orderColumn, desc) {
		let url = age_apiUrl + `/content/Content-SelectOnTitleLikeString?searchString=${searchString}&tableLimit=${tableLimit}&includeTable=${includeTable}&orderColumn=${orderColumn}&desc=${desc}`;
		const options = {
			method: 'GET',
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async Review_InsertScheduleOnUuid(Uuid, scheduleType) {
		const url = age_apiUrl + `/content/Review-InsertScheduleOnUuid?Uuid=${Uuid}&scheduleType=${scheduleType}`;
		const options = {
			method: 'POST'
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async Review_SelectCurrentReview() {
		let url = age_apiUrl + `/content/Review-SelectCurrentReview`;
		const options = {
			method: 'GET',
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}











	// EDGE
	static async Edge_InsertUuidUuid(Node1Uuid, Node2Uuid, Directed, Type, Order, Path) {
		let url = age_apiUrl + `/edge/Edge-InsertUuidUuid?Node1Uuid=${Node1Uuid}&Node2Uuid=${Node2Uuid}&Directed=${Directed}&Type=${Type}&Order=${Order}&Path=${Path}`;
		const options = {
			method: 'POST',
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async Edge_UpdateWithEdgeObject(edgeObject) {
		let url = age_apiUrl + `/edge/Edge-UpdateWithEdgeObject`;
		const options = {
			method: 'PUT',
			headers: { "Content-Type": "application/json", },
			body: JSON.stringify(edgeObject),
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async Edge_DeleteOnEdgeUuid(edgeUuid) {
		let url = age_apiUrl + `/edge/Edge-DeleteOnEdgeUuid?edgeUuid=${edgeUuid}`;
		const options = {
			method: 'DELETE',
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async Edge_DeleteOnNodeUuids(Uuid1, Uuid2) {
		let url = age_apiUrl + `/edge/Edge-DeleteOnNodeUuids?Uuid1=${Uuid1}&Uuid2=${Uuid2}`;
		const options = {
			method: 'DELETE',
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}





	// CONTENT-EDGE
	static async ContentEdge_InsertAdjacentToUuidIntoTable(Uuid, Directed, Table, Type, Order, Path) {
		let url = age_apiUrl + `/contentedge/ContentEdge-InsertAdjacentToUuidIntoTable?Uuid=${Uuid}&Directed=${Directed}&Table=${Table}&Type=${Type}&Order=${Order}&Path=${Path}`;
		const options = {
			method: 'POST',
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async ContentEdge_SelectChildOfUuid(Uuid) {
		let url = age_apiUrl + `/contentedge/ContentEdge-SelectChildOfUuid?Uuid=${Uuid}`;
		const options = {
			method: 'GET',
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async ContentEdge_SelectParentOfUuid(Uuid) {
		let url = age_apiUrl + `/contentedge/ContentEdge-SelectParentOfUuid?Uuid=${Uuid}`;
		const options = {
			method: 'GET',
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async ContentEdge_SelectUndirectedOfUuid(Uuid) {
		let url = age_apiUrl + `/contentedge/ContentEdge-SelectUndirectedOfUuid?Uuid=${Uuid}`;
		const options = {
			method: 'GET',
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async ContentEdge_SelectAdjacentOfUuid(Uuid) {
		let url = age_apiUrl + `/contentedge/ContentEdge-SelectAdjacentOfUuid?Uuid=${Uuid}`;
		const options = {
			method: 'GET',
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}











	// FILE (From dbis-we)
	static async Post_File(Uuid, file, queryParams, mimeType) {

		let url = age_apiUrl + `/file/${Uuid}?`;
		// console.log(url)


		for (const [key, value] of Object.entries(queryParams)) {
			// console.log(`${key}: ${value}`);
			url += `${key}=${value}&`;
			// bodyArray.push(value);
		}
		url = url.slice(0, -1);

		const options = {
			method: 'POST',
			headers: {
				"Content-Type": mimeType,
			},
			body: file,
		};
		// console.log(options)
		// console.log(url)

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			if (response.status == 200) {
				return data;
			}
			else {
				throw new Error('FAILED POST FROM: Post_File in dbis')
			}
			// console.table(data);
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}



	static async Get_File(Uuid) {

		const url = age_apiUrl + `/file/` + Uuid;
		const options = { method: 'GET' };

		try {
			const response = await fetch(url, options);
			// const data = await response.json();
			console.log(response.status, url)

			// console.log(response.body)
			let blob = await response.blob()
			let contentType = response.headers.get('content-type');
			let extension = contentType.split('/')[1];
			// console.log('FILEFILE:', response.headers.get('content-type'))
			let file = await new File([blob], `${Uuid}.${extension}`)
			return file;
			// .then(blob => new File([blob], 'testfilename.file'))
			// .then(file => file)
			// .catch(error => console.error(error))
			// .then(file => URL.createObjectURL(file))
			// .then(file => URL.createObjectURL(file))
			// .then(fileUrl => window.open(fileUrl, '_blank'))
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}




	static async Put_File(Uuid, file, queryParams, mimeType) {

		let url = age_apiUrl + `/file/${Uuid}?`;
		// console.log(url)


		for (const [key, value] of Object.entries(queryParams)) {
			// console.log(`${key}: ${value}`);
			url += `${key}=${value}&`;
			// bodyArray.push(value);
		}
		url = url.slice(0, -1);

		const options = {
			method: 'POST',
			headers: {
				"Content-Type": mimeType,
			},
			body: file,
		};
		// console.log(options)
		// console.log(url)

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			if (response.status == 200) {
				return data;
			}
			else {
				throw new Error('FAILED PUT FROM: Put_File in dbis')
			}
			// console.table(data);
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}



	static async Delete_File(Uuid) {
		let url = age_apiUrl + `/file/${Uuid}`;
		const options = {
			method: 'DELETE',
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}














	static async Content_SelectChildOfUuid(Uuid) { return contentGet('Content-SelectChildOfUuid', { 'Uuid': Uuid }) };

	static async Node_SelectChildOfUuid(Uuid) { return contentGet('Node-SelectChildOfUuid', { 'Uuid': Uuid }) };
	static async NodeEdge_SelectChildOfUuid(Uuid) { return contentGet('NodeEdge-SelectChildOfUuid', { 'Uuid': Uuid }) };

}
















// async function contentGet(functionstring, paramObject) {
// 	let url = basePath + `content//${functionstring}?`;

// 	for (const [key, value] of Object.entries(paramObject)) {
// 		console.log(`${key}: ${value}`);
// 		url += `${key}=${value}`;
// 	}

// 	// console.log(url)

// 	const options = { method: 'GET', body: undefined };

// 	try {
// 		const response = await fetch(url, options);
// 		const data = await response.json();
// 		return data;
// 		// console.table(data);
// 	} catch (error) {
// 		console.error(error);
// 	}


// }

