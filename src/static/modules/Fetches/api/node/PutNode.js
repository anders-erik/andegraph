async function putNode(nodeObject) {


	const options = {
		method: 'PUT',
		headers: {
		  'User-Agent': 'firefox',
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify(nodeObject),
	};

	let fetchString = `/api/node/${nodeObject[0].id}`;

	let promise = fetch(fetchString, options)
		.then(response => response)
		.catch(err => console.error(err));

	return promise;
}


export {
	putNode
}
