
async function postFile(file, fileName) {


	const options = {
		method: 'POST',
		headers: {
		  'User-Agent': 'firefox',
		},
		body: file
	};

	let fetchString = `/api/file?fileName=${fileName}`;

	let promise = fetch(fetchString, options)
		.then(response => response)
		.catch(err => console.error(err));

	return promise;
}


export {
	postFile
}