
const {newUuid} = require('../utils/uuid-v0.2');
const {currentUnixTime} = require('../utils/TimeDate');

function emptyNode(){
	return {
		Uuid: newUuid(),
		Table: '',
		Type: '',
		Title: '',
		TimeCreated: currentUnixTime(),
		TimeLastChange: currentUnixTime(),
	}
}

module.exports =  {
	emptyNode,
}
