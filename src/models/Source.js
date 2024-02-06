
const {newUuid} = require('../utils/uuid-v0.2');
const {currentUnixTime} = require('../utils/TimeDate');

function emptySource(){
	return {
		Uuid: newUuid(),
		Table: 'Source',
		Type: '',
		Title: '',
		TimeCreated: currentUnixTime(),
		TimeLastChange: currentUnixTime(),

		Url: '',
		IAmSource: 0,
	}
}

module.exports =  {
	emptySource,
}
