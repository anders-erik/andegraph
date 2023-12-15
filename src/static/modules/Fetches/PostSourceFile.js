
import * as BaseFetch from './BaseFetches.js';

/** Replaces 'uploadSourceFile'. */
async function PostSourceFile(id, file) {
	BaseFetch.uploadSourceFile(id, file);
}

export {
	PostSourceFile
}
