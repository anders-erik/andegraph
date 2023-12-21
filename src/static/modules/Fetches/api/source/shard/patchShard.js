
async function patchShard(sourceId, shardId, newPrompt) {


	const options = { method: 'PATCH', headers: { 'User-Agent': 'firefox' } };

	let fetchString = `/api/source/${sourceId}/shard/${shardId}?prompt=${newPrompt}`;

	let promise = fetch(fetchString, options)
		.then(response => response.json())
		.then(response => response)
		.catch(err => console.error(err));

	return promise;
}


export {
	patchShard
}