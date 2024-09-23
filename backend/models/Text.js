
const {newUuid} = require('../utils/uuid-v0.2');
const {currentUnixTime} = require('../utils/TimeDate');

function emptyText(){
	return {
		Uuid: newUuid(),
		Table: 'Text',
		Type: '',
		Title: '',
		TimeCreated: currentUnixTime(),
		TimeLastChange: currentUnixTime(),

		TextContent: '',
		Language: '',
		IAmAuthor: '',
	}
}

module.exports =  {
	emptyText,
}
