
async function postNode(nodeObject, isChild, parentId) {


	const options = {
		method: 'POST',
		headers: {
		  'User-Agent': 'firefox',
		},
		body: nodeObject
	};

	let fetchString = `/api/node/${nodeObject.id}?`
		+ `isChild=${isChild}&`
		+ `parentId=${parentId}`;

	let promise = fetch(fetchString, options)
		.then(response => response)
		.catch(err => console.error(err));

	return promise;
}


export {
	postNode
}