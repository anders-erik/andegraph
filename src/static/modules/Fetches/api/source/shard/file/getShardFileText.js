

async function getShardFileText(sourceid, shardid) {


	const options = { method: 'GET', headers: { 'User-Agent': 'firefox' } };

	let fetchString = `/api/source/${sourceid}/shard/${shardid}/file`;

	let promise = fetch(fetchString, options)
		.then((response) => response.json())

		.catch(err => console.error(err));

	return promise;
}


export {
	getShardFileText
}