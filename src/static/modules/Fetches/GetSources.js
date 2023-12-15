
import * as BaseFetch from './BaseFetches.js';

/** Replaces 'fetchAllSources'. */
async function GetSources() {
	BaseFetch.fetchAllSources();
}

export {
	GetSources
}
