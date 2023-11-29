

async function MakePostRequest(url, data) {
	try {
	  const response = await fetch(url, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	  });
  
	  if (response.ok) {
		const responseData = await response.json();
		console.log('POST request successful:', responseData);
		return responseData;
	  } else {
		throw new Error('POST request failed:', response.status);
	  }
	} catch (error) {
	  console.error('Error making POST request:', error);
	}
  }


async function MakeGetRequest(url) {
	try {
	  const response = await fetch(url, {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json',
		},
	  });
  
	  if (response.ok) {
		const responseData = await response.json();
		console.log('GET request successful:', responseData);
		return responseData;
	  } else {
		throw new Error('GET request failed:', response.status);
	  }
	} catch (error) {
	  console.error('Error making GET request:', error);
	}
  }


export {
	MakePostRequest,
	MakeGetRequest
}