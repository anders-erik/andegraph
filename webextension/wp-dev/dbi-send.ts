

let age_apiUrl = 'http://localhost:3000/api/v02';

export function test() : void {

	console.log("Loaded dbi-send.ts")
	
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

	static async Content_SelectOnTitleLikeString(searchString: string, tableLimit: string, includeTable: string, orderColumn: string, desc: string) : Promise<any> {
		let url = age_apiUrl + `/content/Content-SelectOnTitleLikeString?searchString=${searchString}&tableLimit=${tableLimit}&includeTable=${includeTable}&orderColumn=${orderColumn}&desc=${desc}`;
		const options = {
			method: 'GET',
		};

		
		try {
			let response = await fetch(url, options);
			if (!response.ok) {
				console.warn("Fetch returned " + response.status + " from " + age_apiUrl);
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