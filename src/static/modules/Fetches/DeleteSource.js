
import * as BaseFetch from './BaseFetches.js';

/** Replaces 'deleteSource'. */
async function DeleteSource(id) {
	BaseFetch.deleteSource(id);
}

export {
	DeleteSource
}
