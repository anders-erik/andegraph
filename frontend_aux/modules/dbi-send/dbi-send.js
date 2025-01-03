

// const apiBaseUrl = 'http://localhost:3000';
// const basePath = '/api/v02'
const apiUrl = 'http://localhost:3000/api/v02';



export class dbis {





	/* 
			CONTENT
	 */

	static async Content_InsertOnTable(TableName) {
		const url = apiUrl + `/content/Content-InsertOnTable?Table=${TableName}`;
		const options = {
			method: 'POST'
		};

		let response;

		try {
			response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async Content_SelectOnUuid(Uuid) {
		let url = apiUrl + `/content/Content-SelectOnUuid?Uuid=${Uuid}`;
		const options = {
			method: 'GET',
		};

		let response;

		try {
			response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async Content_UpdateWithContentObject(contentObject) {
		let url = apiUrl + `/content/Content-UpdateWithContentObject`;
		const options = {
			method: 'PUT',
			headers: { "Content-Type": "application/json", },
			body: JSON.stringify(contentObject),
		};

		let response;

		try {
			response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async Content_DropFullOnUuid(Uuid) {
		let url = apiUrl + `/content/Content-DropFullOnUuid?Uuid=${Uuid}`;
		const options = {
			method: 'DELETE',
		};

		let response;

		try {
			response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async Content_SelectOnTitleLikeString(searchString, tableLimit, includeTable, orderColumn, desc) {
		let url = apiUrl + `/content/Content-SelectOnTitleLikeString?searchString=${searchString}&tableLimit=${tableLimit}&includeTable=${includeTable}&orderColumn=${orderColumn}&desc=${desc}`;
		const options = {
			method: 'GET',
		};

		let response;

		try {
			response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async Review_InsertScheduleOnUuid(Uuid, scheduleType) {
		const url = apiUrl + `/content/Review-InsertScheduleOnUuid?Uuid=${Uuid}&scheduleType=${scheduleType}`;
		const options = {
			method: 'POST'
		};

		let response;

		try {
			response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async Review_SelectCurrentReview() {
		let url = apiUrl + `/content/Review-SelectCurrentReview`;
		const options = {
			method: 'GET',
		};

		let response;

		try {
			response = await fetch(url, options);
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
		let url = apiUrl + `/edge/Edge-InsertUuidUuid?Node1Uuid=${Node1Uuid}&Node2Uuid=${Node2Uuid}&Directed=${Directed}&Type=${Type}&Order=${Order}&Path=${Path}`;
		const options = {
			method: 'POST',
		};

		let response;

		try {
			response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async Edge_UpdateWithEdgeObject(edgeObject) {
		let url = apiUrl + `/edge/Edge-UpdateWithEdgeObject`;
		const options = {
			method: 'PUT',
			headers: { "Content-Type": "application/json", },
			body: JSON.stringify(edgeObject),
		};

		let response;

		try {
			response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async Edge_DeleteOnEdgeUuid(edgeUuid) {
		let url = apiUrl + `/edge/Edge-DeleteOnEdgeUuid?edgeUuid=${edgeUuid}`;
		const options = {
			method: 'DELETE',
		};

		let response;

		try {
			response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async Edge_DeleteOnNodeUuids(Uuid1, Uuid2) {
		let url = apiUrl + `/edge/Edge-DeleteOnNodeUuids?Uuid1=${Uuid1}&Uuid2=${Uuid2}`;
		const options = {
			method: 'DELETE',
		};

		let response;

		try {
			response = await fetch(url, options);
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
		let url = apiUrl + `/contentedge/ContentEdge-InsertAdjacentToUuidIntoTable?Uuid=${Uuid}&Directed=${Directed}&Table=${Table}&Type=${Type}&Order=${Order}&Path=${Path}`;
		const options = {
			method: 'POST',
		};

		let response;

		try {
			response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async ContentEdge_SelectChildOfUuid(Uuid) {
		let url = apiUrl + `/contentedge/ContentEdge-SelectChildOfUuid?Uuid=${Uuid}`;
		const options = {
			method: 'GET',
		};

		let response;

		try {
			response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async ContentEdge_SelectParentOfUuid(Uuid) {
		let url = apiUrl + `/contentedge/ContentEdge-SelectParentOfUuid?Uuid=${Uuid}`;
		const options = {
			method: 'GET',
		};

		let response;

		try {
			response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async ContentEdge_SelectUndirectedOfUuid(Uuid) {
		let url = apiUrl + `/contentedge/ContentEdge-SelectUndirectedOfUuid?Uuid=${Uuid}`;
		const options = {
			method: 'GET',
		};

		let response;

		try {
			response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async ContentEdge_SelectAdjacentOfUuid(Uuid) {
		let url = apiUrl + `/contentedge/ContentEdge-SelectAdjacentOfUuid?Uuid=${Uuid}`;
		const options = {
			method: 'GET',
		};

		let response;

		try {
			response = await fetch(url, options);
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

		let url = apiUrl + `/file/${Uuid}?`;
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

		let response;

		try {
			response = await fetch(url, options);
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

		const url = apiUrl + `/file/` + Uuid;
		const options = { method: 'GET' };

		let response;

		try {
			response = await fetch(url, options);
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

		let url = apiUrl + `/file/${Uuid}?`;
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

		let response;

		try {
			response = await fetch(url, options);
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
		let url = apiUrl + `/file/${Uuid}`;
		const options = {
			method: 'DELETE',
		};

		let response;

		try {
			response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}







}










