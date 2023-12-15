
import * as BaseFetch from './BaseFetches.js';

/** Replaces 'loadSourceFile'. */
async function GetSourceFile(id) {
	BaseFetch.loadSourceFile(id);
}

export {
	GetSourceFile
}
