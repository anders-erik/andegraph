
async function postShard(sourceId) {


	const options = { method: 'POST', headers: { 'User-Agent': 'firefox' } };

	let fetchString = `/api/source/${sourceId}/shard`;

	let promise = fetch(fetchString, options)
		.then(response => response.json())
		.then(response => response)
		.catch(err => console.error(err));

	return promise;
}


export {
	postShard
}