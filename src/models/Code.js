
const {newUuid} = require('../utils/uuid-v0.2');
const {currentUnixTime} = require('../utils/TimeDate');

function emptyCode(){
	return {
		Uuid: newUuid(),
		Table: 'Code',
		Type: '',
		Title: '',
		TimeCreated: currentUnixTime(),
		TimeLastChange: currentUnixTime(),

		CodeContent: '',
	}
}

module.exports =  {
	emptyCode,
}
