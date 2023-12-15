
import * as BaseFetch from './BaseFetches.js';

/** Replaces 'updateSource'. */
async function PutSource(sourceObject) {
	BaseFetch.updateSource(sourceObject);
}

export {
	PutSource
}
