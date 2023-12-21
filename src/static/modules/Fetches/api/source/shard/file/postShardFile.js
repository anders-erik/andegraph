

async function postShardFile(file, sourceid, shardid, fileType, fileEnding) {


	const options = {
		method: 'POST',
		headers: {
		  'Content-Type': 'image/jpeg',
		  'User-Agent': 'firefox',
		  'Content-fileType': fileType,
		  'Content-fileEnding': fileEnding
		},
		body: file
	};

	let fetchString = `/api/source/${sourceid}/shard/${shardid}/file`;

	let promise = fetch(fetchString, options)
		.then(response => response.blob())
		.catch(err => console.error(err));

	return promise;
}


export {
	postShardFile
}