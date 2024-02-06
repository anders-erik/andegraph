
const {newUuid} = require('../utils/uuid-v0.2');
const {currentUnixTime} = require('../utils/TimeDate');

function emptyProject(){
	return {
		Uuid: newUuid(),
		Table: 'Project',
		Type: '',
		Title: '',
		TimeCreated: currentUnixTime(),
		TimeLastChange: currentUnixTime(),

		Goal: '',
	}
}

module.exports =  {
	emptyProject,
}
