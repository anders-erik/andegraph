
async function putFile(file, fileName) {


	const options = {
		method: 'PUT',
		headers: {
		  'User-Agent': 'firefox',
		},
		body: file
	};

	let fetchString = `/api/file/${fileName}`;

	let promise = fetch(fetchString, options)
		.then(response => response)
		.catch(err => console.error(err));

	return promise;
}


export {
	putFile
}