
async function getShards(sourceId) {

	let shards;

	const options = { method: 'GET', headers: { 'User-Agent': 'firefox' } };

	let fetchString = `/api/source/${sourceId}/shard`;

	let promise = fetch(fetchString, options)
		.then(response => response.json())
		.then(response => response)
		.catch(err => console.error(err));

	return promise;
}


export {
	getShards
}