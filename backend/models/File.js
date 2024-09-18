
const {newUuid} = require('../utils/uuid-v0.2');
const {currentUnixTime} = require('../utils/TimeDate');

function emptyFile(){
	return {
		Uuid: newUuid(),
		Table: 'File',
		Type: '',
		Title: '',
		TimeCreated: currentUnixTime(),
		TimeLastChange: currentUnixTime(),

		Extension: '',
		SizeBytes: 0,
		IAmAuthor: 0,
	}
}

module.exports =  {
	emptyFile,
}
