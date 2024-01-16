async function putNode(nodeObject) {


	const options = {
		method: 'PUT',
		headers: {
		  'User-Agent': 'firefox',
		},
		body: nodeObject
	};

	let fetchString = `/api/node/${nodeObject.id}`;

	let promise = fetch(fetchString, options)
		.then(response => response)
		.catch(err => console.error(err));

	return promise;
}


export {
	putNode
}
