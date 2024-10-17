

// let age_apiUrl = 'http://localhost:3000/api/v02';
const defaultApiString = "http://localhost:3000/api/v02";
let age_apiUrl = "";



// ALWAYS START OUT BY GRABBING THE API BASE URL
(()=>{
	
	setApiUrl().then(() => {
		console.log('Loaded dbi-send.ts');

		// notifyDbisUsers();
		apiPathLoaded = true;
	});
	
})();



let apiPathLoaded = false;
const maxApiPathLoadedChecks = 100;
/** 
 * Notifies users of the dbis module that the api path is loaded from file and ready to for use.
 */
export function waitForLoadedApiPath(callbackFn : Function) : void {

		let apiPathCheckCount = 0; // a counter for each caller

		let interval = setInterval(() => {
			if(apiPathCheckCount < maxApiPathLoadedChecks){

				if(apiPathLoaded){
					clearInterval(interval);
					callbackFn();
					// return;
				}
				
				apiPathCheckCount++;
			}
		}, 10);
		
}



/**
 * Try setting the api-path using the local webextension storage. 
 * If the local value is undefined we use the default API path.
 */
export async function setApiUrl(){
	browser.storage.local.get("apiBaseString").then((object) => {

		if(object.apiBaseString === undefined){
			age_apiUrl = defaultApiString;
		}
		else{
			age_apiUrl = object.apiBaseString;
		}

		console.log("Loaded API BASE STRING")
		console.log("object.apiBaseString = ", object.apiBaseString);
	}, onLocalStorageError);
}
function onLocalStorageError(error: Error) {
	console.error(error);
}



browser.runtime.onMessage.addListener((request) : Promise<any> => {
	console.log("Message recieved in dbi-send.ts!");

	if (request.name === "setApiBase") {
		// console.log("1111")
		age_apiUrl = request.apiBaseString;
		return Promise.resolve({ response: "Api updated in content script. [dbi-send.js]", newApiString: age_apiUrl });

	}


	if (request.name === "getApiBase") {
		// console.log("2222")
		
		// Promise.resolve : static method that returns a resolved Promise object with the given value
		return Promise.resolve({ apiString: age_apiUrl });

	}

});

class age_dbis {

	/* 
		CONTENT
	*/

	static async Content_InsertOnTable(TableName : string) {
		const url = age_apiUrl + `/content/Content-InsertOnTable?Table=${TableName}`;
		const options = {
			method: 'POST'
		};

		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				console.warn("Fetch returned " + response.status + " from " + url);
				return [];
			}
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.error(error);
		}
	}
	static async Content_SelectOnUuid(Uuid : string | number) {
		let url = age_apiUrl + `/content/Content-SelectOnUuid?Uuid=${Uuid}`;
		const options = {
			method: 'GET',
		};

		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				console.warn("Fetch returned " + response.status + " from " + url);
				return [];
			}
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.error(error);
		}
	}
	static async Content_UpdateWithContentObject(contentObject : any) {
		let url = age_apiUrl + `/content/Content-UpdateWithContentObject`;
		const options = {
			method: 'PUT',
			headers: { "Content-Type": "application/json", },
			body: JSON.stringify(contentObject),
		};

		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				console.warn("Fetch returned " + response.status + " from " + url);
				return [];
			}
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.error(error);
		}
	}
	static async Content_DropFullOnUuid(Uuid : string | number) {
		let url = age_apiUrl + `/content/Content-DropFullOnUuid?Uuid=${Uuid}`;
		const options = {
			method: 'DELETE',
		};

		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				console.warn("Fetch returned " + response.status + " from " + url);
				return [];
			}
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.error(error);
		}
	}
	static async Content_SelectOnTitleLikeString(searchString: string, tableLimit: string, includeTable: string, orderColumn: string, desc: string) : Promise<any> {
		let url = age_apiUrl + `/content/Content-SelectOnTitleLikeString?searchString=${searchString}&tableLimit=${tableLimit}&includeTable=${includeTable}&orderColumn=${orderColumn}&desc=${desc}`;
		const options = {
			method: 'GET',
		};

		
		try {
			let response = await fetch(url, options);
			if (!response.ok) {
				console.warn("Fetch returned " + response.status + " from " + url);
				return [];
			}
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			// console.log(response.status, url)
			console.error(error);
		}
	}
	static async Review_InsertScheduleOnUuid(Uuid : string | number, scheduleType : string| number) {
		const url = age_apiUrl + `/content/Review-InsertScheduleOnUuid?Uuid=${Uuid}&scheduleType=${scheduleType}`;
		const options = {
			method: 'POST'
		};

		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				console.warn("Fetch returned " + response.status + " from " + url);
				return [];
			}
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
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
			if (!response.ok) {
				console.warn("Fetch returned " + response.status + " from " + url);
				return [];
			}
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.error(error);
		}
	}





	/* 
			CONTENT EDGE
	*/
	static async ContentEdge_InsertAdjacentToUuidIntoTable(Uuid: string | number, Directed: string | number, Table: string, Type: string, Order: string | number, Path: string) {
		let url = age_apiUrl + `/contentedge/ContentEdge-InsertAdjacentToUuidIntoTable?Uuid=${Uuid}&Directed=${Directed}&Table=${Table}&Type=${Type}&Order=${Order}&Path=${Path}`;
		const options = {
			method: 'POST',
		};

		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				console.warn("Fetch returned " + response.status + " from " + url);
				return [];
			}
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.error(error);
		}
	}
	static async ContentEdge_SelectChildOfUuid(Uuid : string | number) {
		let url = age_apiUrl + `/contentedge/ContentEdge-SelectChildOfUuid?Uuid=${Uuid}`;
		const options = {
			method: 'GET',
		};

		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				console.warn("Fetch returned " + response.status + " from " + url);
				return [];
			}
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			// console.log(response.status, url)
			console.error(error);
		}
	}

	static async ContentEdge_SelectParentOfUuid(Uuid : string | number) {
		let url = age_apiUrl + `/contentedge/ContentEdge-SelectParentOfUuid?Uuid=${Uuid}`;
		const options = {
			method: 'GET',
		};

		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				console.warn("Fetch returned " + response.status + " from " + url);
				return [];
			}
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.error(error);
		}
	}
	static async ContentEdge_SelectUndirectedOfUuid(Uuid : string | number) {
		let url = age_apiUrl + `/contentedge/ContentEdge-SelectUndirectedOfUuid?Uuid=${Uuid}`;
		const options = {
			method: 'GET',
		};

		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				console.warn("Fetch returned " + response.status + " from " + url);
				return [];
			}
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.error(error);
		}
	}
	static async ContentEdge_SelectAdjacentOfUuid(Uuid : string | number) {
		let url = age_apiUrl + `/contentedge/ContentEdge-SelectAdjacentOfUuid?Uuid=${Uuid}`;
		const options = {
			method: 'GET',
		};

		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				console.warn("Fetch returned " + response.status + " from " + url);
				return [];
			}
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.error(error);
		}
	}




	/* 
				FILES
	*/

	static async Post_File(Uuid: string | number, file: File, queryParams: string, mimeType: string) {

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
			// console.log(response.status, url)
			console.error(error);
		}
	}



	static async Get_File(Uuid: string | number): Promise<File | any[]> {

		const url = age_apiUrl + `/file/` + Uuid;
		const options = { method: 'GET' };

		try {
			const response = await fetch(url, options);
			// const data = await response.json();
			console.log(response.status, url)
			if (!response.ok) {
				console.warn("Fetch returned " + response.status + " from " + url);
				return [];
			}

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
			// console.log(response.status, url)
			console.error(error);
		}
	}




	static async Put_File(Uuid: string | number, file: File, queryParams: string, mimeType: string) {

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
			if (response.ok) {
				return data;
			}
			else {
				throw new Error('FAILED PUT FROM: Put_File in dbis')
			}
			// console.table(data);
		} catch (error) {
			// console.log(response.status, url)
			console.error(error);
		}
	}



	static async Delete_File(Uuid : string | number) {
		let url = age_apiUrl + `/file/${Uuid}`;
		const options = {
			method: 'DELETE',
		};

		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				console.warn("Fetch returned " + response.status + " from " + url);
				return [];
			}
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			// console.log(response.status, url)
			console.error(error);
		}
	}



};

export {
	age_dbis,
}