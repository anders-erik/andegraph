
async function postNode(nodeObject, isChild, parentId) {

	const options = {
		method: 'POST',
		headers: {
		  'User-Agent': 'firefox',
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify(nodeObject),
	};

	//console.log(options)

	let fetchString = `/api/node/${nodeObject[0].id}?`
		+ `isChild=${isChild}&`
		+ `parentId=${parentId}`
	;

	let promise = fetch(fetchString, options)
		.then(response => response)
		.catch(err => console.error(err));

	return promise;
}


export {
	postNode
}