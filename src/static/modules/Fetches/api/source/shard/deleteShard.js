
async function deleteShard(sourceId, shardId) {


	const options = { method: 'DELETE', headers: { 'User-Agent': 'firefox' } };

	let fetchString = `/api/source/${sourceId}/shard/${shardId}`;

	let promise = fetch(fetchString, options)
		.then(response => response)
		.catch(err => console.error(err));

	return promise;
}


export {
	deleteShard
}