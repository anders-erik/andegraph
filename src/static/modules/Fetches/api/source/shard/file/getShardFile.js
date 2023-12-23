

async function getShardFile(sourceid, shardid) {


	const options = { method: 'GET', headers: { 'User-Agent': 'firefox' } };

	let fetchString = `/api/source/${sourceid}/shard/${shardid}/file`;

	let promise = fetch(fetchString, options)
		.then((response) => response.blob())
		.catch(err => console.error(err));

	return promise;
}


export {
	getShardFile
}