
const {newUuid} = require('../utils/uuid-v0.2');
const {currentUnixTime} = require('../utils/TimeDate');

function emptyEvent(){
	return {
		Uuid: newUuid(),
		Table: 'Event',
		Type: '',
		Title: '',
		TimeCreated: currentUnixTime(),
		TimeLastChange: currentUnixTime(),

		StartTime: 0,
		EndTime: 0,
		EventDate: '',
	}
}

module.exports =  {
	emptyEvent,
}
