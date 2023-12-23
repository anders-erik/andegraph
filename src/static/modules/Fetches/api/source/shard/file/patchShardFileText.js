

async function patchShardFileText(sourceid, shardid, fileEnding, patchText) {


	const options = {
		method: 'PATCH',
		headers: {
		  'Content-Type': 'application/json',
		  'User-Agent': 'firefox',
		  'Content-fileEnding': fileEnding
		},
		body: JSON.stringify({
			"textContent": patchText
		})
		//patchText//JSON.stringify({"textContent": patchText}),
	};

	//let fetchString = `/api/source/${sourceid}/shard/${shardid}/file`;



	//const options = { method: 'PATCH', headers: { 'User-Agent': 'firefox' } };

	let fetchString = `/api/source/${sourceid}/shard/${shardid}/textfile`;

	//console.log(options, fetchString);
	//console.log(options.body.textContent);

	let promise = fetch(fetchString, options)
		.then((response) => response)
		.catch(err => console.error(err));

	return promise;
}


export {
	patchShardFileText
}